---
title: nginx配置语法
date: 2020-10-29 11:46:29
tags:
  - nginx
---

#### Nginx配置语法

nginx.conf 结构图可以这样概括

```nginx
main        # 全局配置，对全局生效
├── events  # 配置影响 Nginx 服务器或与用户的网络连接
├── http    # 配置代理，缓存，日志定义等绝大多数功能和第三方模块的配置
│   ├── upstream # 配置后端服务器具体地址，负载均衡配置不可或缺的部分
│   ├── server   # 配置虚拟主机的相关参数，一个 http 块中可以有多个 server 块
│   ├── server
│   │   ├── location  # server 块可以包含多个 location 块，location 指令用于匹配 uri
│   │   ├── location
│   │   └── ...
│   └── ...
└── ...
```

一个 Nginx 配置文件的结构就像 `nginx.conf` 显示的那样，配置文件的语法规则：

1. 配置文件由指令与指令块构成；
2. 每条指令以 `;` 分号结尾，指令与参数间以空格符号分隔；
3. 指令块以 `{}` 大括号将多条指令组织在一起；
4. `include` 语句允许组合多个配置文件以提升可维护性；
5. 使用 `#` 符号添加注释，提高可读性；
6. 使用 `$` 符号使用变量；
7. 部分指令的参数支持正则表达式；

##### 典型配置

```nginx
# 运行用户，默认即是nginx，可以不进行设置
user nginx;
# Nginx 进程数，一般设置为和 CPU 核数一样
worker_processes  1;
# Nginx 的错误日志存放目录
error_log  /var/log/nginx/error.log warn;
# Nginx 服务启动时的 pid 存放位置
pid        /var/run/nginx.pid;

events {
    # 使用epoll的I/O模型(如果不知道Nginx该使用哪种轮询方法，会自动选择一个最适合你操作系统的)
    use epoll;     
     # 每个进程允许最大并发数
    worker_connections 1024;  
}

# 配置使用最频繁的部分，代理、缓存、日志定义等绝大多数功能和第三方模块的配置都在这里设置
http {   
    # 设置日志模式
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    # Nginx访问日志存放位置
    access_log  /var/log/nginx/access.log  main;   

    # 开启高效传输模式
    sendfile            on;   
    # 减少网络报文段的数量
    tcp_nopush          on;   
    tcp_nodelay         on;
    # 保持连接的时间，也叫超时时间，单位秒
    keepalive_timeout   65;  
    types_hash_max_size 2048;

    # 文件扩展名与类型映射表
    include             /etc/nginx/mime.types;     
    # 默认文件类型
    default_type        application/octet-stream;   

    # 加载子配置项
    # include /etc/nginx/conf.d/*.conf;
    
    server {
        # 配置监听的端口
    	listen       80;       
        # 配置的域名
    	server_name  localhost;    
    	
    	location / {
            # 网站根目录
    		root   /usr/share/nginx/html;  
            # 默认首页文件
    		index  index.html index.htm;   
            # 禁止访问的ip地址，可以为all
    		deny 172.168.22.11;   
            # 允许访问的ip地址，可以为all
    		allow 172.168.33.44;
    	}
    	
        # 默认50x 400x对应的访问页面
    	error_page 500 502 503 504 /50x.html;  
    	error_page 400 404 error.html;  
    }
}
```

##### 全局变量

Nginx 有一些常用的全局变量，你可以在配置的任何位置使用它们，如下表：

| 全局变量名         | 功能                                                         |
| :----------------- | :----------------------------------------------------------- |
| `$host`            | 请求信息中的 `Host`，如果请求中没有 `Host` 行，则等于设置的服务器名，不包含端口 |
| `$request_method`  | 客户端请求类型，如 `GET`、`POST`                             |
| `$remote_addr`     | 客户端的 `IP` 地址                                           |
| `$args`            | 请求中的参数                                                 |
| `$arg_PARAMETER`   | `GET` 请求中变量名 PARAMETER 参数的值，例如：`$http_user_agent`(Uaer-Agent 值), `$http_referer`... |
| `$content_length`  | 请求头中的 `Content-length` 字段                             |
| `$http_user_agent` | 客户端agent信息                                              |
| `$http_cookie`     | 客户端cookie信息                                             |
| `$remote_addr`     | 客户端的IP地址                                               |
| `$remote_port`     | 客户端的端口                                                 |
| `$http_user_agent` | 客户端agent信息                                              |
| `$server_protocol` | 请求使用的协议，如 `HTTP/1.0`、`HTTP/1.1`                    |
| `$server_addr`     | 服务器地址                                                   |
| `$server_name`     | 服务器名称                                                   |
| `$server_port`     | 服务器的端口号                                               |
| `$scheme`          | HTTP 方法（如http，https）                                   |

还有更多的内置预定义变量，可以直接搜索关键字「nginx内置预定义变量」可以看到一堆博客写这个，这些变量都可以在配置文件中直接使用。
