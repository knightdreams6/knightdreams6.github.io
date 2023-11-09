---
title: maven命令
date: 2020-11-26 19:24:35
tags:	
  - java
---

#### Maven 命令

##### 查看maven的版本及配置信息

`mvn -version`               

##### 构建java项目

`mvn archetype:create   -DgroupId=    DartifactId= `   

##### 创建web项目

`mvn archetype:create   -DgroupId=    DartifactId=    -DarchetypeArtifactId=maven-archetype-webapp `

##### 编译项目代码

`mvn compile`	

##### 打包项目

`mvn package`	

##### 打包项目时跳过单元测试

`mvn package -Dmaven.test.skip=true `

##### 清除编译生成的target文件夹内容

`mvn clean` ,可以配合相应命令使用 如 mvn clean package, mvn clean test

##### 打包后将其安装在本地仓库

`mvn install`	

##### 打包后将其安装到pom文件中配置的远程仓库 

`mvn deploy`	

##### 显示所有已经解析的所有依赖

`mvn dependency:list`	

##### 以树形结构展示项目中的依赖

`mvn dependency:tree`	

##### 对项目中的依赖进行分析,依赖未使用,使用但未引入

`mvn dependency:analyze`	

##### 生成站点目录

`mvn site	`
