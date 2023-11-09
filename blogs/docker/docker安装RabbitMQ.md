---
title: docker安装RabbitMQ
date: 2020-04-01 08:52:28
tags:
  - docker

---

#### 1. 查找RabbitMQ镜像

```shell
docker search rabbitmq
```

#### 2.拉取RabbitMQ镜像

```shell
docker pull rabbitmq	未包含控制台

docker pull rabbitmq:management  包含控制台
```

#### 3.安装rabbitMQ

```shell
docker run --name rabbitmq -d -p 15672:15672 -p 5672:5672 rabbitmq:management
```

#### 4. 停止、启动重启

```shell
docker stop start restart rabbitmq
```

启动控制台后，可以在浏览器中访问 http://ip:15672  进行访问

RabbitMQ默认的用户名密码 guest



#### 端口开放

```shell
firewall-cmd --zone=public --add-port=8080/tcp --permanent 开启端口
```

> 命令含义： 
>　　　　--zone #作用域 
> 　　　　--add-port=8080/tcp #添加端口，格式为：端口/通讯协议 
> 　　　　--permanent #永久生效
