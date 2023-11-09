---
title: docker安装mysql主从复制
date: 2020-10-15 16:04:24
tags:
  - docker
  - mysql
---

##### 1、目录配置文件准备

```shell
mkdir -p /home/mysql/master/data
mkdir -p /home/mysql/slave1/data
```

> 默认的my.cnf配置文件

```cnf
# The MySQL  Server configuration file.
#
# For explanations see
# http://dev.mysql.com/doc/mysql/en/server-system-variables.html

[mysqld]
pid-file        = /var/run/mysqld/mysqld.pid
socket          = /var/run/mysqld/mysqld.sock
datadir         = /var/lib/mysql
secure-file-priv= NULL

# Custom config should go here
!includedir /etc/mysql/conf.d/
```

> 从服务器配置文件

```cnf
vim /home/mysql/master/my.cnf

在默认的配置文件后添加
server-id=200
innodb_flush_log_at_trx_commit=2
sync_binlog=1
relay_log_recovery=0
```

> 主服务器配置文件

```cnf
server-id=100
innodb_flush_log_at_trx_commit=2
sync_binlog=1
```

##### 2、启动主从mysql镜像服务

```shell
docker run --restart always -p 3309:3306 --name mysql_master -v /home/mysql/master/my.cnf:/etc/mysql/my.cnf -v /home/mysql/master/data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=123 -d mysql
```

```shell
docker run --restart always -p 3310:3306 --name mysql_slave1 -v /home/mysql/slave1/my.cnf:/etc/mysql/my.cnf -v /home/mysql/slave1/data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=123 -d mysql
```

##### 3、在master数据库中创建从机账号并添加权限

```sql
# 创建用户
create user 'slave1'@'%' identified with mysql_native_password by 'slave1';
# 赋予权限
grant replication slave on *.* to 'slave1'@'%';
# 刷新权限
flush PRIVILEGES;

# 通过该命令获取 File/Position字段（从数据库中要使用）
show master status;
```

##### 4、在slave数据库中配置主数据库账号等信息

```sql
# master_host 主数据库容器ip (可以通过 docker network inspect 网络id查看容器ip)
# master_port 主数据库内部端口
# master_user 主数据创建的从数据库用户
# master_password 主数据创建的从数据库用户密码
# master_log_file 第三步获取的File字段
# master_log_pos 第三步获取的Position字段
change master to master_host='172.17.0.7', master_port=3306, master_user='slave1', master_password='slave1',master_log_file='binlog.000002', master_log_pos=3549;

# 开启slave模式
start slave;

# 此时可通过 show slave status 命令查看slave是否设置成功
Slave_IO_Running: Yes Slave_SQL_Running: Yes 说明slave设置成功
```

