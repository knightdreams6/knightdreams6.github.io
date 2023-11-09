---
title: Mybatis执行一条Sql语句的流程
date: 2020-11-25 15:07:39
tags:
  - Mybatis
  - java
---

Mybatis执行一条Sql语句的流程

Creating a new SqlSession   

SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@564a1de4] was not registered for synchronization because synchronization is not active

o.s.jdbc.datasource.DataSourceUtils - Fetching JDBC Connection from DataSource

c.b.d.d.DynamicRoutingDataSource - dynamic-datasource switch to the datasource named [slave]


o.m.s.t.SpringManagedTransaction - JDBC Connection [HikariProxyConnection@2147330770 wrapping com.mysql.cj.jdbc.ConnectionImpl@6f03dead] will not be managed by Spring

org.mybatis.spring.SqlSessionUtils - Closing non transactional SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@564a1de4]



##### 1、通过SqlSessionFactory创建SqlSession

> SqlSession 是 MyBatis 暴露给外部使用的统一接口层，所有和数据库打交道的操作都通过 SqlSession 这层。

`SqlSession`对象创建的流程：

1. 通过`SqlSessionFactoryBuilder`解析配置构建`Configuration`然后通过构造方法创建`DefaultSqlSessionFactory`
2. 通过`DefaultSqlSessionFactory`的`openSession()`方法调用`openSessionFromDataSource()`方法创建`DefaultSqlSession`

##### 2、MapperProxy

> 通过 SqlSession 获取 Mapper对象流程

1. 通过`DefaultSession`获取`Configuration`
2. 通过`Configuration`的`getMapper()`获取`MapperRegistry`
3. 通过`MapperRegister`的`getMapper()`方法调用`mapperProxyFactory.newInstance(sqlSession)`获取最终的Mpper
4. mapper执行sql的底层其实是MapperProxy对象，通过动态代理获取该对象，执行查询操作

> MapperRegistry 是 Configuration 的一个属性，MapperRegistry 缓存了 MapperProxyFactory 的 Map 集合，也就是说在解析完配置文件后， knownMappers 集合数据已经在 Configuration 对象中存在了。

##### 3、Exector

> SqlSession 中的 JDBC 操作部分最终都会委派给 Exector 实现。
>
> 根据 Exector 执行的时序图，可以抽象出的主要类是：SqlSession、Exector、StatementHandler、ParameterHandler、ResultSetHandler。
>
> StatementHandler 接口是 MyBatis 的核心接口之一，它是 Exector 接口实现的基础。StatementHandler 的主要功能很多，例如创建 Statement 对象，为 SQL 语句绑定实参，执行 SQL 语句，将结果集映射成结果对象。
>
> StatementHandler 类中包含了 ParameterHandler 和 ResultSetHandler 的属性。ParameterHandler 的主要功能是为 SQL 语句绑定实参，也就是使用传入的参数替换 SQL 语句中的“?”占位符。ResultSetHandler 的主要功能是将结果集映射成结果对象。



##### 为什么 Mapper 接口可以调用方法？

> Mapper接口的真实对象是 `org.apache.ibatis.binding.MapperProxy`

```java
public class MapperProxy<T> implements InvocationHandler, Serializable {

  @Override
  public Object invoke(Object proxy, Method method, Object[] args) throws 		Throwable {
    try {
      if (Object.class.equals(method.getDeclaringClass())) {
        return method.invoke(this, args);
      } else if (method.isDefault()) {
        if (privateLookupInMethod == null) {
          return invokeDefaultMethodJava8(proxy, method, args);
        } else {
          return invokeDefaultMethodJava9(proxy, method, args);
        }
      }
    } catch (Throwable t) {
      throw ExceptionUtil.unwrapThrowable(t);
    }
    final MapperMethod mapperMethod = cachedMapperMethod(method);
    return mapperMethod.execute(sqlSession, args);
  }
}
```

通过上面的源码内容，可以得出如下结论：

* Mapper的真实对象是 MapperProxy
* MapperProxy 继承 InvocationHandler，实现 invoke 方法；
* MapperProxyFactory 的 newInstance 方法，通过 JDK 动态代理的方式创建了一个 MapperProxy 的代理类；

MyBatis 的 Mapper 是通过动态代理实现的，调用 Mapper 的任何方法都会执行 MapperProxy 的 invoke 方法。

MyBatis 使用的动态代理和通常的动态代理有点区别，没有实现类，只有接口。
