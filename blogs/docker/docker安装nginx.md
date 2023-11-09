---
title: docker安装nginx
date: 2020-05-11 18:23:57
tags:
  - docker
---

#### 1、创建本地挂载目录

```shell
mkdir -p /home/nginx/www /home/nginx/logs /home/nginx/conf /home/nginx/conf.d
```

*  www: 目录将映射为 nginx 容器配置的虚拟目录。
*  logs: 目录将映射为 nginx 容器的日志目录。
*  conf&conf.d: 目录里的配置文件将映射为 nginx 容器的配置文件。

#### 2、创建对应配置文件

**/home/nginx/conf/nginx.conf**

```conf
user  nginx;
worker_processes  1;

error_log  /var/log/nginx/error.log warn;
pid        /var/run/nginx.pid;


events {
    worker_connections  1024;
}


http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    keepalive_timeout  65;

    #gzip  on;

    include /etc/nginx/conf.d/*.conf;
}
```

**/home/nginx/conf.d/default.conf**

```conf
server {
    listen       80;
    server_name  localhost;

    #charset koi8-r;
    #access_log  /var/log/nginx/host.access.log  main;

    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
    }

    #error_page  404              /404.html;

    # redirect server error pages to the static page /50x.html
    #
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }

}
```

**/home/nginx/www/index.html**

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Welcome to nginx!</title>
<style>
    body {
        width: 35em;
        margin: 0 auto;
        font-family: Tahoma, Verdana, Arial, sans-serif;
    }
</style>
</head>
<body>
<h1>docker部署nginx成功!</h1>
</body>
</html>
```

#### 3、部署nginx并挂载本地目录

```shell
docker run -d -p 80:80 --name nginx --privileged=true  -v /home/nginx/www:/usr/share/nginx/html -v /home/nginx/conf/nginx.conf:/etc/nginx/nginx.conf -v /home/nginx/conf.d:/etc/nginx/conf.d -v /home/nginx/logs:/var/log/nginx nginx
```

