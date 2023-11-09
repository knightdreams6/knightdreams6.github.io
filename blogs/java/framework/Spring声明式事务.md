---
title: Spring声明式事务
date: 2020-03-10 18:55:51
tags: 
  - java
  - Spring
---

#### 1、什么是事务

>  事务就是把一系列的动作当成一个独立的工作单元，这些动作要么全部完成，要么全部不起作用。就是把一系列的操作当成原子性去执行。

**事务的四个属性** ACID

1. 原子性（atomicity）事务是原子性操作，由一系列动作组成，事务的原子性确保动作要么全部完成，要么完全不起作用
2. 一致性（consistency）一旦所有事务动作完成，事务就要被提交。数据和资源处于一种满足业务规则的一致性状态中
3. 隔离性（isolation）可能多个事务会同时处理相同的数据，因此每个事务都应该与其他事务隔离开来，防止数据损坏
4. 持久性（durability）事务一旦完成，无论系统发生什么错误，结果都不会受到影响。通常情况下，事务的结果被写到持久化存储器中

#### 2、Spring中的事务管理

> Spring在不同的事务管理API之上定义了一个抽象层，使得开发人员不必了解底层的事务管理API就可以使用Spring的事务管理机制。Spring支持编程式事务管理和声明式的事务管理。

**编程式事务管理**

> 将事务管理代码嵌到业务方法中来控制事务的提交和回滚
>
> 缺点：必须在每个事务操作业务逻辑中包含额外的事务管理代码

**声明式事务管理**

> 一般情况下比编程式事务好用。将事务管理代码从业务方法中分离出来，以声明的方式来实现事务管理。将事务管理作为横切关注点，通过aop方法模块化。Spring中通过Spring AOP框架支持声明式事务管理。

#### 3、事务管理器

 Spring的核心事务管理抽象，管理封装了一组独立于技术的方法，无论使用Spring的哪种事务管理策略（编程式或者声明式）事务管理器都是必须的。

```java
org.springframework.transaction.PlatformTransactionManager
```

**JDBC事务**

```xml
<bean id="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
      <property name="dataSource" ref="dataSource" />
</bean>
```

**Hibernate事务**

```xml
<bean id="transactionManager" class="org.springframework.orm.hibernate3.HibernateTransactionManager">
      <property name="sessionFactory" ref="sessionFactory" />
</bean>
```

**JPA事务**

```xml
<bean id="transactionManager" class="org.springframework.orm.jpa.JpaTransactionManager">
      <property name="sessionFactory" ref="sessionFactory" />
</bean>
```

#### 4、声明式事务属性

##### 4.1 传播行为

> 事务方法被另一个事务方法调用时，必须指定事务应该如何传播。例如方法可能继续在现有事务中运行，也可能开启一个新的事务，并在自己的事务运行。spring中的事务传播行为可以由传播属性指定。**spring指定了7种类传播行为**。

* **REQUIRED**	

  > 如果有事务正在运行，当前的方法就在这个事务内运行，否则就开启一个新的事务，并在自己的事务内运行。默认的传播行为

* **REQUIRED_NEW** 

  > 当前方法必须启动新事务，并在自己的事务内运行，如果有事务正在运行，则将它挂起

* **SUPPORTS**  

  > 如果有事务在运行，当前的方法就在这个事务内运行，否则可以不运行在事务中

* **NOT_SUPPORTED**  

  > 表示该方法不应该运行在事务中。如果存在当前事务，在该方法运行期间，当前事务将被挂起。

* **MANDATORY**   mandatory(强制性的)

  > 表示当前方法必须运行在事务中，如果没有正在运行的事务，就会抛出异常

* **NEVER** 

  > 表示当前方法不应该运行在事务中，如果有正在进行的事务，就会抛出异常

* **NESTED**  

  > 如果有事务在运行，当前的方法就应该在这个事务的嵌套事务内运行。嵌套的事务可以独立于当前事务进行单独地提交或回滚。如果当前事务不存在，那么其行为与REQUIRED一样。

##### 4.2 事务的隔离级别

并发事务会导致发生以下三种类型的问题

* 脏读

  > 发生在一个事务读取了另一个事务改写尚未提交的数据，改写的数据回滚了，那么第一个事务获取的数据无效

* 不可重复度

  > 当同一个事务执行两次以上相同的查询时，每次都得到不同的数据。一般因为另一并发事务在两次查询期间进行了更新

* 幻读：

  > 第一个事务读取了一些数据，此时第二个事务在该表中插入了一些数据，这时第一个数据再读取相同的数据时就会多几行

**不可重复读和幻读的区别**：不可重复读侧重点在相同数据被修改，而幻读是删除或新增



> 从理论上讲，事务应该完全隔离，避免并发事务导致的问题，但是这样可能对性能产生极大影响，因为事务必须按顺序进行了。
>
> 所以在实际的开发中，为了提升性能，事务会以比较低的隔离级别运行。

**spring中事务的隔离级别可以通过隔离属性指定**

* **DEFAULT**  

  > 使用底层数据库默认的隔离级别。大部分数据库隔离级别为READ_COMMITED

* **READ_COMMITED** 

  > 只允许事务读取已经被其他事务提交的更改。可以避免脏读

* **READ_UNCOMMITED**  

  > 允许事务读取未被其他事务提交的更改。什么都不可避免

* **REPEATABLE_READ** 

  > 确保事务可以从一个字段中读取相同的值。在这个事务持续期间，不许其它事务对这个字段进行更新，可以避免脏读，不可重复读

* **SERIALIZABLE** 

  > 确保事务可以从一个表中读取相同的行，在这个事务持续期间，禁止其他事务对该表执行插入，更新，删除。所有的并发问题都能避免，但是性能比较低。

**注意**：事务的隔离级别需要底层数据库引擎的支持，而不是应用程序或者框架的支持

>  Oracle支持2种事务隔离级别：READ_COMMITED，SERIALIZABLE
>
> MySQL支持4种事务隔离级别

##### 4.3 回滚规则

> 默认情况下只有未检查异常（RuntimeException和Error类型的异常）会导致事务回滚。事务的回滚规则可以通过属性管理
> rollbackFor：遇到时必须进行回滚
>
> noRollbackFor：一组异常类，遇到时必须不能回滚 

##### 4.4 只读属性

>  如果事务只读数据但不修改可以通过配置只读事务属性，帮助数据库引擎优化事务。只读事务属性：表示这个事务只读读取数据，但是不更新数据

#### 5、声明式管理事务

```xml
	<!-- 1. 配置事务管理器 -->
	<bean id="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
		<property name="dataSource" ref="dataSource"></property>
	</bean>
	<!-- 2. 配置事务属性 -->
	<!--<tx:advice>元素声明事务通知-->
	<tx:advice id="txAdvice" transaction-manager="transactionManager">
		<tx:attributes>
			<!-- 根据方法名指定事务的属性 -->
			<tx:method name="*"/>
			<!--propagation配置事务传播行为-->
			<tx:method name="purchase" propagation="REQUIRES_NEW"/>
			<!--isolation配置事务的隔离级别-->
			<tx:method name="update*" isolation="SERIALIZABLE"/>
			<!--rollback-for配置事务遇到异常必须回滚，no-rollback-for配置事务遇到异常必须不能回滚-->
			<tx:method name="add*" rollback-for="java.io.IOException" no-rollback-for="com.dmsd.spring.tx.BookStockException"/>
			<!--read-only配置事务只读属性-->
			<tx:method name="find*" read-only="true"/>
			<!--timeout配置事务的超时属性-->
			<tx:method name="get*" timeout="3"/>
		</tx:attributes>
	</tx:advice>
	
	<!-- 3. 配置事务切入点, 以及把事务切入点和事务属性关联起来 -->
	<aop:config>
		<aop:pointcut expression="execution(* com.atguigu.spring.tx.xml.service.*.*(..))" 
			id="txPointCut"/>
		<aop:advisor advice-ref="txAdvice" pointcut-ref="txPointCut"/>	
	</aop:config>
```

##### 5.2用 @Transactional 注解声明式地管理事务

   Spring中注解的方式@Transactional标注事务方法。为了将方法定义为支持事务处理，可以在方法上添加@Transactional注解。根据Spring AOP基于代理机制，只能标注公有方法。如果在类上标注@Transactional注解，那么这个类中所有公有方法都会被定义为支持事务。

```xml
   <!-- 配置事务管理器 -->
	<bean id="transactionManager" 
		class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
		<property name="dataSource" ref="dataSource"></property>
	</bean>
	<!-- 启用事务注解 -->
	<tx:annotation-driven transaction-manager="transactionManager"/>
```

在方法上添加

```java
   // 添加事务注解
   // 1.使用 propagation 指定事务的传播行为, 即当前的事务方法被另外一个事务方法调用时
   //   如何使用事务, 默认取值为 REQUIRED, 即使用调用方法的事务  REQUIRES_NEW: 方法自己的事务, 调用的事务方法的事务被挂起. 
   // 2.使用 isolation 指定事务的隔离级别, 最常用的取值为 READ_COMMITTED
   // 3.默认情况下 Spring 的声明式事务对所有的运行时异常进行回滚. 也可以通过对应的属性进行设置. 通常情况下取默认值即可. 
   // 4.使用 readOnly 指定事务是否为只读. 表示这个事务只读取数据但不更新数据, 
   //   这样可以帮助数据库引擎优化事务. 若真的事一个只读取数据库值的方法, 应设置 readOnly=true
   // 5.使用 timeout 指定强制回滚之前事务可以占用的时间.
	@Transactional(propagation=Propagation.REQUIRES_NEW,
			isolation=Isolation.READ_COMMITTED,
			noRollbackFor={UserAccountException.class},
			rollbackFor = IOException.class,
			readOnly=false,
			timeout=3)
	@Override
	public void purchase(String username, String isbn) {}
```

#### 6、事务失效

​    因为spring事务是基于aop的代理机制，当方法中调用this本身的方法时候即使在this的方法标明事务注解，但是事务注解会失效。如下

```java
@Transactional
@Override
public void purchase(String username, String isbn) {
	this.update(username, isbn);
}
 
@Transactional
public void update(String username, String isbn) {
	//1. 获取书的单价
	int price = bookShopDao.findBookPriceByIsbn(isbn);
	//2. 更新数的库存
	bookShopDao.updateBookStock(isbn);
	//3. 更新用户余额
	bookShopDao.updateUserAccount(username, price);
}
```
原因：因为调用this本身方法不走代理机制，这个时候可以通过配置解决这个问题。

解决事务失效
在配置中添加如下内容

```xml
<!--开启aspectj代理，并暴露aop代理到ThreadLocal-->
<aop:aspectj-autoproxy expose-proxy="true"/>
```

将上述调用的地方改成如下

```java
@Transactional
@Override
public void purchase(String username, String isbn) {
	((BookShopServiceImpl)AopContext.currentProxy()).update(username, isbn);
}
```

