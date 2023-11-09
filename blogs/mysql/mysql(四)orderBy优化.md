---
title: mysql(四)orderBy优化
date: 2020-10-14 14:16:02
tags:
  - mysql
---

> 在使用order by时，经常出现**Using filesort**，
>
> 因此对于此类sql语句需尽力优化，使其尽量使用**Using index**。

**总结：**

1. MySQL支持两种方式的排序filesort和index，Using index是指MySQL扫描索引本身完成排序。index效率高，filesort效率低。

2. order by 满足两种情况会使用 Using index

   * order by语句使用索引最左前列。
   * 使用where子句与order by子句条件列组合满足索引最左前列。

3. 尽量在索引列上完成排序，遵循索引建立（索引创建的顺序）时的最佳左前缀法则。

4. 如果order by的条件不在索引列上，就会产生Using filesort。

   > filesort有两种排序算法：双路排序和单路排序。

5. 提升order by速度的方式：

   * 在使用order by时，不要用select *，只查询所需的字段。因为当查询字段过多时，会导致sort_buffer不够，从而使用多路排序或进行多次I/O操作
   * 尝试提高sort_buffer_size
   * 尝试提高max_length_for_sort_data

6. group by与order by很类似，其实质是先排序后分组，遵照索引创建顺序的最佳左前缀法则。当无法使用索引列的时候，也要对sort_buffer_size和max_length_for_sort_data参数进行调整。注意where高于having，能写在where中的限定条件就不要去having限定了
