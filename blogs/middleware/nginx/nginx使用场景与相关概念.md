---
title: nginx使用场景与相关概念
date: 2020-10-29 10:57:56
tags:
  - nginx
---

#### 1、使用场景

1. 静态资源服务，通过本地文件系统提供服务
2. 反向代理服务，延伸出包括缓存、负载均衡等
3. `API`服务，`OpenResty`等

#### 2、相关概念

##### 2.1 简单请求与非简单请求

1. 请求方法是 `HEAD`、`GET`、`POST` 三种之一；
2. HTTP 头信息不超过右边着几个字段：`Accept`、`Accept-Language`、`Content-Language`、`Last-Event-ID`、`Content-Type` 只限于三个值 `application/x-www-form-urlencoded`、`multipart/form-data`、`text/plain`；

凡是不同时满足这两个条件的，都属于非简单请求。

> 浏览器处理简单请求和非简单请求的方式不一样：

**简单请求**

> 对于简单需求，浏览器会在头信息中增加 `Origin` 字段后直接发出，`Origin` 字段用来说明，本次请求来自的哪个源（协议+域名+端口）
>
> 如果服务器发现 `Origin` 指定的源不在许可范围内，服务器会返回一个正常的 HTTP 回应，浏览器取到回应之后发现回应的头信息中没有包含 `Access-Control-Allow-Origin` 字段，就抛出一个错误给 `XHR` 的 `error` 事件；
>
> 如果服务器发现 `Origin` 指定的域名在许可范围内，服务器返回的响应会多出几个 `Access-Control-` 开头的头信息字段。

**非简单请求**

> 非简单请求是那种对服务器有特殊要求的请求，比如请求方法是 `PUT` 或 `DELETE`，或 `Content-Type` 值为 `application/json`。浏览器会在正式通信之前，发送一次 HTTP 预检 `OPTIONS`请求，先询问服务器，当前网页所在的域名是否在服务器的许可名单之中，以及可以使用哪些 HTTP 请求方法和头信息字段。只有得到肯定答复，浏览器才会发出正式的 `XHR` 请求，否则报错。

##### 2.2 跨域

> 在浏览器上当前访问的网站向另一个网站发送请求获取数据的过程就是**跨域请求**。

```
# 同源的例子
http://example.com/app1/index.html  # 只是路径不同
http://example.com/app2/index.html

http://Example.com:80  # 只是大小写差异
http://example.com

# 不同源的例子
http://example.com/app1   # 协议不同
https://example.com/app2

http://example.com        # host 不同
http://www.example.com
http://myapp.example.com

http://example.com        # 端口不同
http://example.com:8080
```

##### 2.3 正向代理与反向代理

简单的说，一般给客户端做代理的都是正向代理，给服务器做代理的就是反向代理。

> 正向代理对于用户是可见的，反向代理对于与用户是不可见的

##### 2.4 负载均衡

> 单个服务器解决不了的问题，可以使用多个服务器，然后将请求分发到各个服务器上，将负载分发到不同的服务器，这就是**负载均衡**，核心是「分摊压力」。Nginx 实现负载均衡，一般来说指的是将请求转发给服务器集群。

##### 2.5 动静分离

> 为了加快网站的解析速度，可以把动态页面和静态页面由不同的服务器来解析，加快解析速度，降低原来单个服务器的压力。
