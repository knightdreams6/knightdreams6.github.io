---
title: mysq(五)表锁与行锁
date: 2020-10-15 09:16:49
tags:
  - mysql
---

> 前言：锁是计算机协调多个进程或线程并发访问某一资源的机制。在数据库中，除传统的计算机资源（如CPU、RAM、I/O等）的争用外，数据也是一种供许多用户共享的资源。如何保证数据并发访问的一致性、有效性是所有数据库必须解决的一个问题，锁冲突也是影响数据并发访问性能的一个重要因素。从这个角度来说，锁对数据库而言显得尤其重要，也更加复杂。

##### 1、锁的分类

从数据操作的类型来分：读锁(共享锁) 和 写锁(排他锁)

从数据操作粒度来分：表锁和行锁

##### 2、表锁（偏读）

> 特点：偏向MyISAM存储引擎，开销小，加锁快，无死锁，锁定粒度大，发生锁冲突的概率最高，并发度低。下面通过案例来说明表锁的一些情况。

1. 创建mylock表，并插入5条数据。注意数据引擎使用的是MyISAM。

   ```sql
   drop table if exists mylock;
   CREATE TABLE mylock (
       id INT PRIMARY KEY auto_increment,
       name VARCHAR (20) NOT NULL
   ) ENGINE MyISAM DEFAULT charset = utf8;
   insert into mylock (name) values ('a');
   insert into mylock (name) values ('b');
   insert into mylock (name) values ('c');
   insert into mylock (name) values ('d');
   insert into mylock (name) values ('e');
   ```

2. 手动增加表锁命令

   ```sql
   lock table tablename1 read/write(write),tablename2 read/write(write);
   ```

3. 查看表是否被加锁

   ```sql
   # 如果In_user显示不为0，则表示表被加锁
   show open tables;
   ```

4. 释放表锁命令

   ```sql
   unlock tables;
   ```

5. 读锁与写锁

   > 加读锁时，当前会话读正常，写报错；其他会话读正常，写阻塞
   >
   > 加写锁时，当前会话与读写都正常；其他会话读写都阻塞

##### 3、行锁（偏写）

> 锁偏向InnoDB存储引擎，开销大，加锁慢，会出现死锁，锁定粒度小，发生锁冲突的概率低，但并发度高。

1. 创建相关测试表tb_innodb_lock，注意数据库引擎为InnoDB。

   ```sql
   drop table if exists test_innodb_lock;
   CREATE TABLE test_innodb_lock (
       a INT (11),
       b VARCHAR (20) 
   ) ENGINE INNODB DEFAULT charset = utf8;
   insert into test_innodb_lock values (1,'a');
   insert into test_innodb_lock values (2,'b');
   insert into test_innodb_lock values (3,'c');
   insert into test_innodb_lock values (4,'d');
   insert into test_innodb_lock values (5,'e');
   ```

   > 当我们操作的同一行数据，而由于InnoDB为行锁，在A会话未提交时，B会话只有阻塞等待。如果操作不同行，则不会出现阻塞情况

2. 索引失效会导致行锁升级为表锁

   ```sql
   # b为varchar类型，发生自动转换导致索引失效，从而使锁的级别从行锁升级为表锁
   update test_innodb_lock set a = 110 where b = 1000;
   ```

3. 间隙锁的危害

   3.1 间隙锁的定义

   > 当我们使用**范围条件而不是相等条件**检索数据时，并请求共享或排他锁时，InnoDB会给 **符合条件** 的已有数据记录的索引项加锁，对于键值在条件范围内但不存在的记录，叫作“间隙（GAP）”。InnoDB也会对这个“间隙”加锁，这种锁机制就是所谓的间隙锁。（Next-Key锁）

   3.2 间隙锁的危害

   > 因为在Query执行过程中通过范围查找的话，会锁定整个范围内的所有索引键值，即使这个索引不存在。间隙锁有一个比较致命的弱点，就是当锁定一个范围键值后，即使某些不存在的键值也会被无辜的锁定，而造成在锁定的时候无法插入锁定值范围内的任何数据。在某些场景下这个可能会对性能造成很大的危害。

4. 如何锁定某一行

   > 利用 for update

   ```sql
   select * from test_innodb_lock where a = 7 for update
   ```

5. 行锁分析

   ```sql
   show status like 'innodb_row_lock%';
   ```

   > Innodb_row_lock_current_waits：当前正在等待锁定的数量。
   >
   > Innodb_row_lock_time：从系统启动到现在锁定的时长。
   >
   > Innodb_row_lock_time_avg：每次等待锁所花平均时间。
   >
   > Innodb_row_lock_time_max：从系统启动到现在锁等待最长的一次所花的时间。
   >
   > Innodb_row_lock_waits：系统启动后到现在总共等待锁的次数。

6. 优化建议

   6.1 尽可能让所有数据都通过索引来完成，避免无索引行升级为表锁。

   6.2 合理设计索引，尽量缩小锁的范围。

   6.3 尽可能使用较少的检索条件，避免间隙锁。

   6.4 尽量控制事务大小，减少锁定资源量和时间长度。

   6.5 尽可能降低事务隔离级别。

