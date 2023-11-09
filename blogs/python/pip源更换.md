---
title: pip源更换
date: 2020-08-08 11:10:58
tags:
  - python
---

> Centos下pip下载源更换

#### 1、新建文件夹

```shell
mkdir ~/.pip
```

#### 2、新建文件并填充内容

```shell
vi ~/.pip/pip.conf （.表示是隐藏文件夹）
```

pip.conf

```conf
[global]
index-url = http://mirrors.aliyun.com/pypi/simple/
[install]
trusted-host = mirrors.aliyun.com
```



##### 国内镜像源

1. 清华：https://pypi.tuna.tsinghua.edu.cn/simple
2. 阿里云：http://mirrors.aliyun.com/pypi/simple/
3. 中国科技大学： https://pypi.mirrors.ustc.edu.cn/simple/
4. 豆瓣：http://pypi.douban.com/simple/
