---
title: mysql主从复制
date: 2020-10-15 09:17:15
tags:
  - mysql
---

##### 1、主从复制的基本原理

slave会从master读取binlog来进行数据同步。主要有以下三个步骤：

1. master将改变记录到二进制日志（binary log），这些记录过程叫做二进制日志事件（binary log events）。
2. slave将master的binary log events拷贝到中继日志（relay log）。
3. slave重做中继日志中的事件，将改变应用到自己的数据库中。MySQL的复制是异步且串行化的。

##### 2、主从复制的规则

1. 每个slave只能有一个master。（一对一）

2. 每个slave只能有一个唯一的服务器ID。

3. 每个master可以有多个slave。（一对多）

   在主从复制过程中，最大的问题就是延时。



#### my.cnf配置

##### innodb_flush_log_at_trx_commit

> 0：log buffer 将每秒一次地写入到 log file中，并且 log file的flush（刷到磁盘）操作同时进行。该模式下在事务提交的时候，不会主动触发写入磁盘的操作。（该模式速度最快，但不太安全，mysqld进程的崩溃会导致上一秒钟所有事务数据的丢失。）
>
> 1： 每次事务提交时MySQL都会把log buffer的数据写入log file，并且flush(刷到磁盘)中去，该模式为系统默认该模式是。最安全的， 但也是最慢的一种方式。在mysqld 服务崩溃或者服务器主机crash的情况下，binary log 只有可能丢失最多一个语句或者一个事务。
>
> 2：每次事务提交时MySQL都会把log buffer的数据写入log file，但是flush(刷到磁盘)操作并不会同时进行。该模式下，MySQL会每秒执行一次 flush(刷到磁盘)操作。当设置为2，该模式速度较快，也比0安全，只有在操作系统崩溃或者系统断电的情况下，上一秒钟所有事务数据才可能丢失。
