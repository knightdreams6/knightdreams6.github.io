---
title: docker安装elasticsearch
date: 2020-05-08 16:02:11
tags:
  - docker
---

#### 1、查找版本

> https://hub.docker.com/_/elasticsearch		目前最新版本为7.6.2

#### 2、下载镜像

> elasticsearch没有latest标签版本

```shell
docker pull elasticsearch:7.6.2
```

#### 3、创建用户定义的网络（用于连接到连接到同一网络的其他服务）

```shell
docker network create somenetwork   // somenetwork为自定义网络名称
```

#### 4、运行Elasticsearch

```shell
 docker run -d --name elasticsearch --net somenetwork -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" elasticsearch:tag
 
 
docker run -d --name search -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" elasticsearch:7.6.2
```

#### 5、安装elasticsearch-analysis-ik

下载地址 https://github.com/medcl/elasticsearch-analysis-ik/releases 可以手动下载后上传到服务器，也可以直接下载

```shell
wget https://github.com/medcl/elasticsearch-analysis-ik/releases/download/v7.6.2/elasticsearch-analysis-ik-7.6.2.zip
```

百度云链接

> 链接：https://pan.baidu.com/s/10DrsPungYWKdAEtTkXq5CA 
> 提取码：9xn6

进入容器

```shell
docker exec -it search /bin/bash
```

```shell
cd /usr/share/elasticsearch/plugins
```

```shell
mkdir ik
```

将解压缩的文件放到该目录下，然后

```shell
docker restart search
```



