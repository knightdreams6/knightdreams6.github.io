---
title: Mybatis一对多查询
date: 2020-03-08 08:50:47
tags: 
  - Mybatis
  - java
---

### 根据用户id查询一个用户信息，再读取他发布的帖子（一对多）

```java
// javaBean
public class User implements Serializable {
    private int id;
    private String username;
    // 用户帖子集合
    private List<Post> posts;
}
```

Mapper中如何编写一对多？

> 就是在`resultMap`标签中配置`<collection>`标签,用来存储查询到的文章列表,注意posts代表的是用户实体的文章List集合

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.learn.project.mapper.RoleMapper">

    <!-- 通用查询映射结果 -->
    <resultMap type="com.learn.project.pojo.User" id="resultUserMap">
        <id column="user_id" property="id" />
        <result column="username" property="username" />
        <collection property="posts" ofType="com.learn.project.pojo.Post" column="user_id">
            <id property="postId" column="post_id" javaType="int" jdbcType="INTEGER"/>
            <result property="postName" column="post_name" javaType="string" jdbcType="VARCHAR"/>
        </collection>
    </resultMap>

    <select id="getUser" resultMap="resultUserMap" parameterType="int">
        SELECT u.*, p.*
        FROM project_user u, post p
        WHERE u.user_id = p.user_id
        AND u.user_id = #{userId}
    </select>

</mapper>

```

### 根据帖子ID读取一个帖子的信息，然后再读取这个帖子所属的用户信息

```java
// javaBean
public class Post implements Serializable {
    private int id;
    private String username;
    // 帖子所属用户
    private User user;
}
```

Mapper中如何编写多对一?

> 就是在`resultMap`标签中配置<association></association>标签关联所属的用户实体

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.learn.project.mapper.PostMapper">

    <resultMap id="resultPostType" type="com.learn.project.pojo.Post">
      <result property="postId" column="post_id"/>
      <result property="postName" column="post_name"/>
      <association property="user" javaType="com.learn.project.pojo.User">
          <id property="userId" column="user_id" javaType="int" jdbcType="INTEGER"/>
          <result property="username" column="name" jdbcType="VARCHAR" javaType="string"/>
      </association>
    </resultMap>

    <select id="getPost" resultMap="resultPostType" parameterType="int">
      select u.*, p.*
      FROM project_user u, post p
      WHERE u.user_id = p.user_id
      AND p.post_id = #{postId}
    </select>
</mapper>

```

