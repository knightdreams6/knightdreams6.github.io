---
title: mysql(二)explain
date: 2020-10-14 10:56:20
tags:
  - mysql
---

> explain（执行计划），使用explain关键字可以模拟优化器执行sql查询语句，从而知道MySQL是如何处理sql语句。explain主要用于分析查询语句或表结构的性能瓶颈。

##### 1、explain的作用

> 通过explain+sql语句可以知道如下内容：

1. 表的读取顺序。（对应id）
2. 数据读取操作的操作类型。（对应select_type）
3. 哪些索引可以使用。（对应possible_keys）
4. 哪些索引被实际使用。（对应key）
5. 表直接的引用。（对应ref）
6. 每张表有多少行被优化器查询。（对应rows）

##### 2、explain包含的信息

1. id

   > select查询的序列号，包含一组数字，表示查询中执行select子句或操作表的顺序，该字段通常与table字段搭配来分析。
   >
   > id相同，执行顺序从上到下。
   >
   > id不同，如果是子查询，id的序号会递增，id值越大执行优先级越高

2. select_type

   > 查询的类型，主要用于区别普通查询、联合查询、子查询等复杂的查询。
   >
   > SIMPLE: 简单的select查询，查询中不包含子查询或union查询
   >
   > PRIMARY: 查询中若包含任何复杂的子部分，最外层查询也就是最后加载的为PRIMARY
   >
   > SUBQUERY: 在select或where列表中包含了子查询，就被标记为SUBQUERY
   >
   > DERIVED: 在from列表中包含的子查询会被标记为DERIVED（衍生），MySQL会递归执行这些子查询，将结果放在临时表中
   >
   > UNION RESULT: 从union表获取结果的select

3. table

   > 显示sql操作属于哪个表的

4. partitions

   > 官方定义为The matching partitions（匹配的分区），该字段应该是看table所在的分区吧（不晓得理解错误没）。值为NULL表示表未被分区。

5. type

   > 表示查询所使用的访问类型，type的值主要有八种，该值表示查询的sql语句好坏，从最好到最差依次为：**system>const>eq_ref>ref>range>index>ALL。**
   >
   > 一般来说，需保证查询至少达到range级别，最好能达到ref。

6. possible_keys和key、key_len

   > possible_keys：显示可能应用在表中的索引，可能一个或多个。查询涉及到的字段若存在索引，则该索引将被列出，但不一定被查询实际使用。
   >
   > key：实际中使用的索引，如为NULL，则表示未使用索引。若查询中使用了覆盖索引，则该索引和查询的select字段重叠。
   >
   > key_len：表示索引中所使用的字节数，可通过该列计算查询中使用的索引长度。在不损失精确性的情况下，长度越短越好。key_len显示的值为索引字段的最大可能长度，并非实际使用长度，即key_len是根据表定义计算而得，并不是通过表内检索出的。
   >
   > 注：在使用索引查询时，当条件越精确，key_len的长度可能会越长，所以在不影响结果的情况下，key_len的值越短越好。

7. ref

   > 显示关联的字段。如果使用常数等值查询，则显示const，如果是连接查询，则会显示关联的字段。

8. rows

   > 根据表统计信息及索引选用情况大致估算出找到所需记录所要读取的行数。该值越小越好

9. filtered

   > 百分比值，表示存储引擎返回的数据经过滤后，剩下多少满足查询条件记录数量的比例。

10. Extra

    > 显示十分重要的额外信息。其取值有以下几个：
    >
    > **Using filesort**：表明mysql会对数据使用一个外部的索引排序，而不是按照表内的索引顺序进行读取。mysql中无法利用索引完成的排序操作称为“文件排序”。出现Using filesort就非常危险了，在数据量非常大的时候几乎“九死一生”。**出现Using filesort尽快优化sql语句。**
    >
    > **Using temporary**：使用了临时表保存中间结果，常见于排序order by和分组查询group by。非常危险，“十死无生”，急需优化。
    >
    > **Using index**：表明相应的select操作中使用了覆盖索引，避免访问表的额外数据行，效率不错。如果没有同时出现Using where，表明索引用来读取数据而非执行查找动作。如果同时出现了Using where，表明索引被用来执行索引键值的查找

    **使用优先级Using index>Using filesort（九死一生）>Using temporary（十死无生）。也就说出现后面两项表明sql语句是非常烂的，急需优化！！！**

    

    ##### 3、连接索引的建立

    **left join（左连接）：右表创建索引。**

    **right join（右连接）：左表创建索引。**

