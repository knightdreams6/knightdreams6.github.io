---
title: linux与windows启动springboot命令
date: 2020-09-30 17:50:02
tags:
  - java
  - Springboot
---

##### Windows

> .bat文件 启动jar包后关闭黑窗口

```bat
@echo off
	%1 mshta vbscript:CreateObject("WScript.Shell").Run("%~s0 ::",0,FALSE)(window.close)&&exit
java -jar demo-0.0.1-SNAPSHOT.jar > log.file 2>&1 &
```



##### linux

> 首页后台永久启动，会把日志输出到新建的log.file文件

```shell
nohup java -jar demo-0.0.1-SNAPSHOT.jar > log.file 2>&1 &
```

> 非首次后台永久启动，会把日志追加到已存在的log.file文件

```shell
nohup java -jar demo-0.0.1-SNAPSHOT.jar >> log.file 2>&1 &
```



> nohup( no hang up)是不挂断运行命令,当账户退出或终端关闭时,程序仍然运行。
>
> nobup command(命令) #缺省情况下会将所有输出重定向到一个叫nohup.out的文件，除非另外指定，这里就指定标准输出重定向到log.file文件。
>
> 2>&1的意思就是将错误重定向到标准输出，因为标准输出已然重定向到了log.file，所以这里错误信息和标准输出都重定向输到了log.file文件当中
>
> 最后的&是让程序在后台运行

