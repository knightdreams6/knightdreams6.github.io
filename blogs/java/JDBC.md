---
title: JDBC
date: 2020-03-10 18:31:11
tags: 
  - java
---

#### 1、什么是JDBC？

> JDBC（**J**ava **D**ata**B**ase **C**onnectivity）是Java和数据库之间的一个桥梁，是一个规范而不是一个实现。就是用了让JAVA代码能更好的与数据库连接而由数据库厂商提供的接口，

#### 2、JDBC步骤

```java
package com.learn;

import java.sql.*;

/**
 * @author lixiao
 * @date 2020/3/10 18:35
 */
public class JDBC {

    public static void main(String[] args) throws ClassNotFoundException, SQLException {
        // 1.注册驱动
        Class.forName("com.mysql.cj.jdbc.Driver");
        // 2.获得连接
        String url = "jdbc:mysql://192.168.3.222:3306/ssm?useSSL=false&serverTimezone=Hongkong&useUnicode=true&characterEncoding=utf-8&nullCatalogMeansCurrent=true&autoReconnect=true&allowPublicKeyRetrieval=true";
        String username = "root";
        String password = "lxydmysql@123";
        Connection connection = DriverManager.getConnection(url, username, password);
        // 3.获取平台执行语句
        Statement statement = connection.createStatement();
        // 4.执行SQL语句
        String sql = "SELECT * FROM account where id = 1";
        ResultSet resultSet = statement.executeQuery(sql);
        // 5.处理结果
        while(resultSet.next()){
            System.out.println(resultSet.getString(2));
        }
        // 6.释放资源
        statement.close();
        connection.close();

    }
}
```

#### 3、相对于Statement，PreparedStatement的优点是什么？

* 防止SQL注入，因为它会对特殊字符转义
* 可以用来动态查询
* PreparedStatement进行预编译，执行更快
