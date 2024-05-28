---
title: docker安装RabbitMQ
date: 2024-02-16
tags:
  - docker
---



### 1. 拉取镜像

dockerHub [仓库地址](https://hub.docker.com/_/rabbitmq/tags)

```shell
docker pull rabbitmq:3.9-management
```



### 2.启动

```shell
docker run -d --hostname rabbitmq --name rabbitmq -p 15672:15672 -p 5672:5672 -e RABBITMQ_DEFAULT_USER=guest -e RABBITMQ_DEFAULT_PASS=guest -v ~/docker/rabbitmq:/var/lib/rabbitmq rabbitmq:3.9-management
```

##### 设置默认用户名密码

```shell
-e RABBITMQ_DEFAULT_USER=user -e RABBITMQ_DEFAULT_PASS=password
```

##### 设置默认vhost

```shell
-e RABBITMQ_DEFAULT_VHOST=my_vhost
```

##### 数据持久化

```shell
-v ~/docker/rabbitmq:/var/lib/rabbitmq
```





### 3. 延迟消息插件

[下载地址](https://github.com/rabbitmq/rabbitmq-delayed-message-exchange/releases/download/3.9.0/rabbitmq_delayed_message_exchange-3.9.0.ez)

```shell
docker cp /rabbitmq_delayed_message_exchange-3.9.0.ez rabbit:/plugins
```

```shell
docker exec -it rabbitmq /bin/bash 
```

```shell
cd plugins
```

```shell
rabbitmq-plugins enable rabbitmq_delayed_message_exchange
```

