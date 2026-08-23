---
title: mysql数据迁移
date: 2020-05-08 15:48:33
tags:
  - mysql
---

需求:

> 将 /home/imaboss/bank_imaboss 下所有.sql文件备份到一个新的docker[mysql5.7]中

#### 1. 下载镜像

```shell
sudo docker pull mysql:5.7
```

#### 2. 启动容器

```shell
sudo docker run --name mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123 -d mysql:5.7 --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci --lower_case_table_names=1
```

#### 3. 汇总所有.sql文件生成sqlAll.sql文件

```python
import os

path = "/home/imaboss/bank_imaboss"

summaryFileName = "sqlAll.sql"

fileList = os.listdir(path)

# 打开文件
file = open(path + "/" + summaryFileName, "w")

result = [];

for fileName in fileList:
	if fileName != summaryFileName:
		result.append('source /home/bank_imaboss/'+fileName+";\n")

file.writelines(result)
```

#### 4. 拷贝到容器

```shell
sudo docker cp /home/imaboss/bank_imaboss/ mysql:/home/
```

#### 5. 进入容器

```shell
sudo docker exec -it mysql /bin/bash
```

#### 6. 链接mysql

```shell
#  --default-character-set=utf8  防止中文乱码
mysql -u root -p --default-character-set=utf8 
```

#### 7.执行sqlAll.sql

```sql
use imaboss;
source /home/bank_imaboss/sqlAll.sql
```
