---
title: mysql(一)索引
date: 2020-09-03 17:01:05
tags:
  - mysql
---

#### 1、索引是什么

> `Mysql`官方对索引的定义：索引（Index）是帮助`Mysql`高效获取数据的 **数据结构**。因此索引的本质就是 **数据结构**。索引的目的在于提高查询效率，可类比字典、书籍的目录等这种形式。
>
> 可简单理解为“**排好序的快速查找数据结构**”。在数据之外，数据库系统还维护者 **满足特定查找算法的数据结构，**这些数据结构以某种方式指向数据，这样就可以在这些数据结构上实现 **高级查找算法，**这种数据结构就是 **索引。**
>
> 一般来说，索引本身也很大，不可能全部存储在内存中，因此索引往往以 **索引文件**的形式存储在磁盘上。
>
> 平常所说的索引，如果没有特别指明，都是B树索引。其中聚集索引、次要索引、覆盖索引、前缀索引、唯一索引默认都是用B树。
>
> 通过`show index from tablename`可以查看表的索引情况。



#### 2、索引的优缺点

优点

1. 类似大学图书馆的书目索引，提高数据的检索效率，降低数据库的IO成本。
2. 通过索引列对数据进行排序，降低数据的排序成本，从而降低CPU的消耗。

缺点

1. 索引实际上也是一张表，该表保存了主键与索引字段，并指向实体表的记录，所以索引列也要**占用空间**。
2. 虽然索引大大提高了查询效率，但是**降低**了更新表的速度，如insert、update和delete操作。因为更新表时，`Mysql`不仅要保存数据，还要保存索引文件每次更新的索引列字段，并且在更新操作后，会**更新**相应字段索引的信息。
3. 索引只是提高查询效率的一个因素，如果你的`MySQL`有大量的数据表，就需要花时间研究建立最优秀的索引或优化查询语句。



#### 3、索引分类

1. 单值索引：一个索引只包含单个列，一个表可以有多个单值索引
2. 唯一索引：索引列的值必须唯一，但允许有空值，主键就是唯一索引
3. 复合索引：一个索引包含多个列

索引的结构：

> BTREE索引；Hash索引；Full-Text索引；R-Tree索引。



#### 4、基本语法

##### 4.1 创建索引

```sql
create [unique] index indexname on tablename(columnname(length));
alter table tablename add index indexname (columnname(length));
```

注：如果是char、varchar类型的字段，length可以小于字段实际长度；如果是blob、text类型，必须指定length。

##### 4.2 删除索引

```sql
drop index indexname on tablename;
```

##### 4.3 查看索引

```java
show index from tablename;
```

##### 4.4 其他创建索引的方式

```sql
# 添加主键索引
ALTER TABLE `table_name` ADD PRIMARY KEY (`column`) 

# 添加唯一索引
ALTER TABLE `table_name` ADD UNIQUE (`column`)

# 添加全文索引
ALTER TABLE `table_name` ADD FULLTEXT (`column`)

# 添加普通索引
ALTER TABLE `table_name` ADD INDEX index_name (`column`)

# 添加组合索引
ALTER TABLE `table_name` ADD INDEX index_name (`column1`, `column2`, `column3`)
```



#### 5、建立索引与否的具体情况

##### 5.1 需建立索引的情况

1. 主键自动建立唯一索引
2. 频繁作为查询条件的字段
3. 查询中与其他表关联的字段，外键关系建立索引
4. 高并发下趋向创建组合索引
5. 查询中排序的字段，排序字段若通过索引去访问将大大提高排序速度
6. 查询中通过或分组的字段

##### 5.2 不需要建立索引的情况

1. 表记录太少
2. 经常增删改的表
3. 数据重复且平均分配的字段，如国籍、性别，不适合创建索引

