---
title: DNS
date: 2020-04-30 09:47:14
tags:
  - 网络
---

> 前言：DNS 是互联网核心协议之一。不管是上网浏览，还是编程开发，都需要了解一点它的知识。

#### 1、DNS 是什么？

DNS （Domain Name System 的缩写）的作用非常简单，就是根据域名查出IP地址。你可以把它想象成一本巨大的电话本。

举例来说，如果你要访问域名`math.stackexchange.com`，首先要通过DNS查出它的IP地址是151.101.129.69。

#### 2、查询过程

虽然只需要返回一个IP地址，但是DNS的查询过程非常复杂，分成多个步骤。

工具软件dig可以显示整个查询过程。

```shell
$ dig math.stackexchange.com
```

#####　2.1 查询参数和统计

```shell
; <<>> DiG 9.11.5-P4-1+security-Debian <<>> math.stackexchange.com
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 22441
;; flags: qr rd ra; QUERY: 1, ANSWER: 4, AUTHORITY: 13, ADDITIONAL: 19
```

##### 2.2 查询内容

> 查询域名`math.stackexchange.com`的A记录，A是address的缩写。

```shell
;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 4096
;; QUESTION SECTION:
;math.stackexchange.com.                IN      A
```

##### 2.3 DNS 的答复

```shell
;; ANSWER SECTION:
math.stackexchange.com. 3537    IN      A       151.101.129.69
math.stackexchange.com. 3537    IN      A       151.101.65.69
math.stackexchange.com. 3537    IN      A       151.101.193.69
math.stackexchange.com. 3537    IN      A       151.101.1.69
```

> 上面结果显示，`math.stackexchange.com`有四个A记录，即四个IP地址。3537是TTL值（Time to live 的缩写），表示缓存时间，即3537秒之内不用重新查询。

##### 2.4 显示`stackexchange.com`的NS记录（Name Server的缩写），即哪些服务器负责管理`stackexchange.com`的DNS记录。

````shell
;; AUTHORITY SECTION:
.                       71919   IN      NS      d.root-servers.net.
.                       71919   IN      NS      h.root-servers.net.
.                       71919   IN      NS      m.root-servers.net.
.                       71919   IN      NS      a.root-servers.net.
.                       71919   IN      NS      g.root-servers.net.
.                       71919   IN      NS      i.root-servers.net.
.                       71919   IN      NS      c.root-servers.net.
.                       71919   IN      NS      e.root-servers.net.
.                       71919   IN      NS      b.root-servers.net.
.                       71919   IN      NS      k.root-servers.net.
.                       71919   IN      NS      j.root-servers.net.
.                       71919   IN      NS      f.root-servers.net.
.                       71919   IN      NS      l.root-servers.net.
````

> 上面结果显示`stackexchange.com`共有四条NS记录，即四个域名服务器，向其中任一台查询就能知道`math.stackexchange.com`的IP地址是什么。

##### 2.5 上面四个域名服务器的ip地址

````
;; ADDITIONAL SECTION:
a.root-servers.net.     83185   IN      A       198.41.0.4
a.root-servers.net.     54302   IN      AAAA    2001:503:ba3e::2:30
b.root-servers.net.     60360   IN      A       199.9.14.201
c.root-servers.net.     56388   IN      A       192.33.4.12
d.root-servers.net.     47502   IN      A       199.7.91.13
e.root-servers.net.     1752    IN      A       192.203.230.10
f.root-servers.net.     56324   IN      A       192.5.5.241
g.root-servers.net.     34831   IN      A       192.112.36.4
g.root-servers.net.     3262    IN      AAAA    2001:500:12::d0d
h.root-servers.net.     60928   IN      A       198.97.190.53
i.root-servers.net.     73571   IN      A       192.36.148.17
i.root-servers.net.     1216    IN      AAAA    2001:7fe::53
j.root-servers.net.     20825   IN      A       192.58.128.30
j.root-servers.net.     1217    IN      AAAA    2001:503:c27::2:30
k.root-servers.net.     56360   IN      A       193.0.14.129
l.root-servers.net.     50960   IN      A       199.7.83.42
m.root-servers.net.     55147   IN      A       202.12.27.33
m.root-servers.net.     1217    IN      AAAA    2001:dc3::35
````

##### 2.6 第六段是DNS服务器的一些传输信息。

```shell
;; Query time: 52 msec
;; SERVER: 114.114.114.114 #53(114.114.114.114)
;; WHEN: 五 4月 16 18:06:50 CST 2021
;; MSG SIZE  rcvd: 674
```

> 上面结果显示，本机的DNS服务器是114.114.114.114，查询端口是53（DNS服务器的默认端口），以及回应长度是674字节。

>  如果不想看到这么多内容，可以使用+short参数。

``` shell
$ dig +short math.stackexchange.com

151.101.193.69
151.101.65.69
151.101.129.69
151.101.1.69
```

#### 3、DNS服务器

下面我们根据前面这个例子，一步步还原，本机到底怎么得到域名math.stackexchange.com的IP地址。

首先，本机一定要知道DNS服务器的IP地址，否则上不了网。通过DNS服务器，才能知道某个域名的IP地址到底是什么。

DNS服务器的IP地址，有可能是动态的，每次上网时由网关分配，这叫做DHCP机制；也有可能是事先指定的固定地址。Linux系统里面，DNS服务器的IP地址保存在/etc/resolv.conf文件。

本机只向自己的DNS服务器查询，dig命令有一个@参数，显示向其他DNS服务器查询的结果。

````shell
$ dig @4.2.2.2 math.stackexchange.com
````

上面命令指定向DNS服务器4.2.2.2查询。

####  4、域名的层级

DNS服务器怎么会知道每个域名的IP地址呢？答案是分级查询。

请仔细看前面的例子，每个域名的尾部都多了一个点。

```shell
;; QUESTION SECTION:
;math.stackexchange.com.                IN      A
```

比如，域名math.stackexchange.com显示为math.stackexchange.com.。这不是疏忽，而是所有域名的尾部，实际上都有一个根域名。

举例来说，www.example.com真正的域名是www.example.com.root，简写为www.example.com.。因为，根域名.root对于所有域名都是一样的，所以平时是省略的。

根域名的下一级，叫做”顶级域名”（top-level domain，缩写为TLD），比如.com、.net；再下一级叫做”次级域名”（second-level domain，缩写为SLD），比如www.example.com里面的.example，这一级域名是用户可以注册的；再下一级是主机名（host），比如www.example.com里面的www，又称为”三级域名”，这是用户在自己的域里面为服务器分配的名称，是用户可以任意分配的。

总结一下，域名的层级结构如下：

```shell
主机名.次级域名.顶级域名.根域名
# 即
host.sld.tld.root
```

#### 5、根域名服务器

DNS服务器根据域名的层级，进行分级查询。

需要明确的是，每一级域名都有自己的NS记录，NS记录指向该级域名的域名服务器。这些服务器知道下一级域名的各种记录。

所谓”分级查询”，就是从根域名开始，依次查询每一级域名的NS记录，直到查到最终的IP地址，过程大致如下。

- 从”根域名服务器”查到”顶级域名服务器”的NS记录和A记录（IP地址）
- 从”顶级域名服务器”查到”次级域名服务器”的NS记录和A记录（IP地址）
- 从”次级域名服务器”查出”主机名”的IP地址

仔细看上面的过程，你可能发现了，没有提到DNS服务器怎么知道”根域名服务器”的IP地址。回答是”根域名服务器”的NS记录和IP地址一般是不会变化的，所以内置在DNS服务器里面。
