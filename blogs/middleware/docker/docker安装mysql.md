---
title: docker安装mysql
date: 2020-05-06 12:37:43
tags:
  - docker
  - mysql
---

### 1、拉取mysql镜像

```shell
docker pull mysql	
```

### 2、安装mysql

```shell
docker run --name mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123 -d mysql --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci --lower_case_table_names=1
```

### 3、开启端口

```shell
firewall-cmd –zone=public –add-port=3306/tcp –permanent  // 开启端口

firewall-cmd --reload	// 重启使其生效
```

### lower_case_table_names参数

> 查看当前大小写敏感配置  show global variables like '%lower_case%';

* lower_case_table_names:   此参数不可动态修改，必须重启数据库
* lower_case_table_names=0 表名存储为给定的大小写，比较是区分大小的
* lower_case_table_names=1 表名存储在磁盘是小写的，比较的时候是不区分大小写
* lower_case_table_names=2 表名存储在磁盘是大写的，比较的时候比较的是小写的

不同系统下的配置

> `linux`下 数据库名与表名是严格区分大小写的；
>
> 表的别名是严格区分大小写的；
>
> 列名与列的别名在所有清空下均是忽略大小写的；
>
> 变量名也是严格区分大小写的；
>
> `windows`与`mac OS`都不区分大小写
>
> `unix`下lower_case_table_names默认值为 0 .Windows下默认值是 1 .Mac OS X下默认值是 2 .

### 常见问题

**mysql 2059 authentication plugin 'caching_sha2_password'**

> ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY '123456';
>
> flush privileges;
>
> restart
