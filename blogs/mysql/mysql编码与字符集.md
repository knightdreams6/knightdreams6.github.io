---
title: mysql编码与字符集
date: 2021-07-16 09:48:42
tags:
  - mysql
---

#### 一、查看编码

1. 查看数据库编码

   ```sql
   show create database db_name;
   ```

2. 查看表编码

   ```sql
   show create table tab_name;
   ```

3. 查看字段编码

   ```sql
   show full columns from col_name;
   ```

4. 查看系统编码

   ```sql
   SHOW VARIABLES WHERE Variable_name LIKE 'character\_set\_%' OR Variable_name LIKE 'collation%';
   ```

   系统变量

   ```sql
   – character_set_server：默认的内部操作字符集
   
   – character_set_client：客户端来源数据使用的字符集
   
   – character_set_connection：连接层字符集
   
   – character_set_results：查询结果字符集
   
   – character_set_database：当前选中数据库的默认字符集
   
   – character_set_system：系统元数据(字段名等)字符集
   
   – 还有以collation_开头的同上面对应的变量，用来描述字符序。
   ```

   

#### 二、修改编码

1. 修改数据库字符集

   ```sql
   # 把表默认的字符集和所有字符列（CHAR,VARCHAR,TEXT）改为新的字符集：
   ALTER DATABASE db_name DEFAULT CHARACTER SET character_name [COLLATE ...];
   ```

2. 修改表字符集

   ```sql
   ALTER TABLE tab_name DEFAULT CHARACTER SET character_name [COLLATE...];
   
   # 例：
   ALTER TABLE tab_name DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
   ```

3. 修改字段字符集

   ```sql
   ALTER TABLE tbl_name CHANGE c_name c_name CHARACTER SET character_name [COLLATE ...];
   
   # 例：
   ALTER TABLE logtest CHANGE title title VARCHAR(100) CHARACTER SET utf8 COLLATE utf8_general_ci;
   ```

