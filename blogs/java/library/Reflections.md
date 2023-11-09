---
title: Reflections的使用
date: 2023-09-04 17:10
tags:
  - java
---



> 仓库地址 

* reflections: https://github.com/ronmamo/reflections

  ```xml
      <dependency>
        <groupId>org.reflections</groupId>
        <artifactId>reflections</artifactId>
      </dependency>
  ```

  

##### 如何扫描指定包下包含指定注解的类？

> 假设扫描@Mapper

```java
Reflections reflections = new Reflections(
    new ConfigurationBuilder().setParallel(true).forPackages("packageName")
        .setScanners(Scanners.TypesAnnotated));
Set<Class<?>> classes = reflections.getTypesAnnotatedWith(Mapper.class);
```



##### 如何扫描指定包下包含指定注解的方法？

> 假设扫描@Transaction

```java
Reflections reflections = new Reflections(
    new ConfigurationBuilder().setParallel(true).forPackages("packageName")
        .setScanners(Scanners.MethodsAnnotated));
Set<Method> methods = reflections.getMethodsAnnotatedWith(Transaction.class);
```



##### 如何扫描指定包下继承/实现某个类的子类？

> 假设扫描 `ServiceImpl` 子类

```java
Reflections reflections = new Reflections(
    new ConfigurationBuilder().setParallel(true).forPackages("packageName")
        .setScanners(Scanners.SubTypes));
Set<Class<? extends ServiceImpl>> classes = reflections.getSubTypesOf(ServiceImpl.class);
```
