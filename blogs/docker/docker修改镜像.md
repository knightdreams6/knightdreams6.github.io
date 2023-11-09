---
title: docker修改镜像地址
date: 2020-05-08 15:48:33
tags:
  - docker
---

#### 1. 编辑或新增 `/etc/docker/daemon.json` 文件

> 这里使用网易镜像地址

`vim /etc/docker/daemon.json`

```json
{
  "registry-mirrors": [ "http://hub-mirror.c.163.com" ]
}
```



#### 2. 重新加载并重启docker

```shell
sudo systemctl daemon-reload

sudo systemctl restart docker
```



#### 3. 查看配置

>  Registry Mirrors:
>
> ​	https://hub-mirror.c.163.com/

```shell
docker info
```

