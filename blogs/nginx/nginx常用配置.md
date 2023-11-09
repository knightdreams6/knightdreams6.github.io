---
title: nginx常用配置
date: 2020-10-29 10:06:31
tags:
  - nginx
---

##### 1、将某个端口的所有请求转发到其他地址

```nginx
server {
    listen       80;
    server_name  localhost;
    rewrite ^(.*)$ https://qmeducation.nmyouth.org.cn/$1 permanent; 
    
}

# HTTP 请求转发到 HTTPS
server {
    listen      80;
    server_name www.sherlocked93.club;

    # 单域名重定向
    if ($host = 'www.sherlocked93.club'){
        return 301 https://www.sherlocked93.club$request_uri;
    }
    # 全局非 https 协议时重定向
    if ($scheme != 'https') {
        return 301 https://$server_name$request_uri;
    }

    # 或者全部重定向
    return 301 https://$server_name$request_uri;

    # 以上配置选择自己需要的即可，不用全部加
}
```

##### 2、配置https

```nginx
server {
    listen  443  ssl;
    server_name   www.qmeducation.nmyouth.org.cn;
    # 证书文件地址
    ssl_certificate	/etc/nginx/conf.d/4656399_qmeducation.nmyouth.org.cn.pem;
    # 私钥文件地址
    ssl_certificate_key /etc/nginx/conf.d/4656399_qmeducation.nmyouth.org.cn.key;
    ssl_session_timeout 10m;
}
```

##### 3、将请求转发到本地服务/请求过滤

```nginx
server {
    # 非指定请求全返回 403
    if ( $request_method !~ ^(GET|POST|HEAD)$ ) {
      return 403;
    }

    location /api/ {
        # IP访问限制（只允许IP是 192.168.0.2 机器访问）
        allow 192.168.0.2;
        deny all;
        
        # 在将客户端请求发送给后端服务器之前，更改来自客户端的请求头信息；
        proxy_set_header Host $http_host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header REMOTE-HOST $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_pass http://172.17.0.1:8080/;
    }
    
}
```

##### 4、静态资源文件映射/图片防盗链

```nginx
server {
    listen       80;
  	server_name  static.sherlocked93.club;
  	charset utf-8;    # 防止中文文件名乱码
    
    location /file {
        root /usr/share/nginx/html;
        # 开启静态资源目录
        autoindex on;
        # on(默认)显示文件的确切大小，单位是byte；off显示文件大概大小，单位KB、MB、GB
        autoindex_exact_size off;
        # off(默认)时显示的文件时间为GMT时间；on显示的文件时间为服务器时间
        autoindex_localtime     off;   
    }
    
    # 图片防盗链
    location ~* \.(gif|jpg|jpeg|png|bmp|swf)$ {
        valid_referers none blocked 192.168.0.2;  # 只允许本机 IP 外链引用
        if ($invalid_referer){
            return 403;
        }
    }
}
```

##### 5、单页面应用部署

```nginx
# hash
server {
    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
        try_files $uri $uri/ @router;
    }
}

# history
server {
  listen       80;
  server_name  fe.sherlocked93.club;
  
  location / {
    root       /usr/share/nginx/html/dist;  # vue 打包后的文件夹
    index      index.html index.htm;
    try_files  $uri $uri/ /index.html @rewrites;
    
    expires -1;                          # 首页一般没有强制缓存
    add_header Cache-Control no-cache;
  }
  
  # 接口转发
  location ~ ^/api {
    proxy_pass http://be.sherlocked93.club;
  }
  
  location @rewrites {
    rewrite ^(.+)$ /index.html break;
  }
}
```

##### 6、配置负载均衡

> Nginx 提供了好几种分配方式，默认为 **轮询** 。有以下几种分配方式

1. **轮询** 默认方式，每个请求按时间顺序逐一分配到不同的后端服务器，如果后端服务挂了，能自动剔除；
2. **weight** 权重分配，指定轮询几率，权重越高，在被访问到的概率越大，用于后端服务器性能不均的情况
3. **ip_hash** 每个请求按访问 IP 的hash结果分配，这样这样每个访客固定访问一个后端服务器，可以解决动态网页 session 共享问题。负载均衡每次请求都会重新定位到服务器集群中的某一个，那么已经登录某一个服务器的用户再重新定位到另一个服务器，其登录信息将会丢失，这样显然是不妥的；
4. **fair**（第三方），按后端服务器的响应时间分配，响应时间短的优先分配，依赖第三方插件 nginx-upstream-fair，需要先安装；

```nginx
http {
    upstream myserver {
  	# ip_hash;  # ip_hash 方式
    # fair;   # fair 方式
    server 127.0.0.1:8081;  # 负载均衡目的服务地址
    server 127.0.0.1:8080;
    server 127.0.0.1:8082 weight=10;  # weight 方式，不写默认为 1
  }
  
  server {
    location / {
    	proxy_pass http://myserver;
      	proxy_connect_timeout 10;
    }
  }
}
```

##### 7、配置cors跨域

1. 使用反向代理解决跨域

   通常我们会约定对后端服务的请求加上 `/apis/` 前缀或者其他的 path 来和对静态资源的请求加以区分，此时我们可以这样配置：

   ```nginx
   server{
       # 请求跨域，约定代理后端服务请求path以/apis/开头
       location ^~/apis/ {
           # 这里重写了请求，将正则匹配中的第一个分组的path拼接到真正的请求后面，并用break停止后续匹配
           rewrite ^/apis/(.*)$ /$1 break;
           proxy_pass be.sherlocked93.club;
   
           # 两个域名之间cookie的传递与回写
           proxy_cookie_domain be.sherlocked93.club fe.sherlocked93.club;
       }
   }
   ```

2. 配置header解决跨域

   ```nginx
   server {
     listen       80;
     server_name  be.sherlocked93.club;
     
   	add_header 'Access-Control-Allow-Origin' $http_origin;   # 全局变量获得当前请求origin，带cookie的请求不支持*
   	add_header 'Access-Control-Allow-Credentials' 'true';    # 为 true 可带上 cookie
   	add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';  # 允许请求方法
   	add_header 'Access-Control-Allow-Headers' $http_access_control_request_headers;  # 允许请求的 header，可以为 *
   	add_header 'Access-Control-Expose-Headers' 'Content-Length,Content-Range';
   	
     if ($request_method = 'OPTIONS') {
   		add_header 'Access-Control-Max-Age' 1728000;   # OPTIONS 请求的有效期，在有效期内不用发出另一条预检请求
   		add_header 'Content-Type' 'text/plain; charset=utf-8';
   		add_header 'Content-Length' 0;
       
   		return 204;                  # 200 也可以
   	}
     
   	location / {
   		root  /usr/share/nginx/html/be;
   		index index.html;
   	}
   }
   ```

##### 8、配置PC或移动设备

```nginx
server {
  listen 80;
	server_name fe.sherlocked93.club;

	location / {
		root  /usr/share/nginx/html/pc;
        if ($http_user_agent ~* '(Android|webOS|iPhone|iPad|BlackBerry)') {
          root /usr/share/nginx/html/mobile;
        }
		index index.html;
	}
}
```



#### 最佳实践

1. 为了使 Nginx 配置更易于维护，建议为每个服务创建一个单独的配置文件，存储在 `/etc/nginx/conf.d` 目录，根据需求可以创建任意多个独立的配置文件。
2. 独立的配置文件，建议遵循以下命名约定 `<服务>.conf`，比如域名是`sherlocked93.club`，那么你的配置文件的应该是这样的 `/etc/nginx/conf.d/sherlocked93.club.conf`，如果部署多个服务，也可以在文件名中加上 Nginx 转发的端口号，比如 `sherlocked93.club.8080.conf`，如果是二级域名，建议也都加上 `fe.sherlocked93.club.conf`。
3. 常用的、复用频率比较高的配置可以放到 `/etc/nginx/snippets` 文件夹，在 Nginx 的配置文件中需要用到的位置 include 进去，以功能来命名，并在每个 snippet 配置文件的开头注释标明主要功能和引入位置，方便管理。比如之前的 `gzip`、`cors` 等常用配置，我都设置了 snippet。
4. Nginx 日志相关目录，内以 `域名.type.log` 命名（比如`be.sherlocked93.club.access.log` 和 `be.sherlocked93.club.error.log` ）位于 `/var/log/nginx/` 目录中，为每个独立的服务配置不同的访问权限和错误日志文件，这样查找错误时，会更加方便快捷。
