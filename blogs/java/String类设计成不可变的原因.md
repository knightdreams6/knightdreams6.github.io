---
title: String类设计成不可变的原因
date: 2019-12-13 09:56:47
tags: 
  - java
---

#### 1、Java为什么把String类型设计成不可变？

1. 安全

   > 多线程角度看，如果两个线程同时读取一个字符串，其中一个修改了值，如果字符串可变，那么另一个线程必然读取的数据和之前不同。
   >
   > 类加载角度看，类加载器要用到字符串，不可变性提供了安全性，以便正确的类被加载。譬如你想加载`java.sql.Connection`类，而这个值被改成了`hacked.Connection`，那么会对你的数据库造成不可知的破坏。

2. 高效

   > 由于字符串的不可变，在创建对象时，`hashcode`就被缓存了，不需要重新计算。这也是Map喜欢将字符串作为键的原因。

3. 使用常量池节省空间

   > 因为字符串的不可变性，会有多个引用指向常量池中的同一个地址，节省了堆的空间，如果字符串可变，那么堆就要开辟N多空间来保存字符串了。

   

#### 2、String类为什么不可变？

```java
// 1.8 String
public final class String implements Serializable, Comparable<String>, CharSequence {
 private final char[] value;
 private int hash;
```

> 首先，String类是用final关键字修饰的，表明String不可继承
>
> 其次，String类的主要字段value是个char[]数组，而且使用private final修饰的，表示只允许内部访问且不可改变。

注意：虽然value是不可变的，也只是value这个引用地址不可变，挡不住array数组是可变的事实。所以String类不可变主要是SUN公司的工程师，在后面所有String的方法里很消息的没有去动array里面的元素，并且没有暴露内部成员字段。所以String不可变的关键在于底层的实现，而不是一个final。



#### 3、一个类要被设计成不可变类的规则

1. 其状态被创建后不能再被修改
2. 所有域都应该是 private final的（但只做到这一步还不够，因为如果成员变量是对象，它保存的只是引用，有可能在外部修改其引用指向的值）
3. 其构造函数构造对象期间，this引用没有泄露
4. 只提供成员变量的get方法，不能提供set方法
5. 如果类中包含可变类对象，那么返回给客户端的时候，返回该对象的一个深拷贝



##### 4、String、StringBuffer和StringBuilder区别是什么？

1. 可变性

   > 简单的来说：String 类中使用 final 关键字修饰字符数组来保存字符串，`private　final　char　value[]`，所以 String 对象是不可变的。而StringBuilder 与 StringBuffer 都继承自 AbstractStringBuilder 类，在 AbstractStringBuilder 中也是使用字符数组保存字符串`char[]value` 但是没有用 final 关键字修饰，所以这两种对象都是可变的。

2. 线程安全性

   >  String 中的对象是不可变的，也就可以理解为常量，线程安全。AbstractStringBuilder 是 StringBuilder 与 StringBuffer 的公共父类，定义了一些字符串的基本操作，如 expandCapacity、append、insert、indexOf 等公共方法。StringBuffer 对方法加了同步锁或者对调用的方法加了同步锁，所以是线程安全的。StringBuilder 并没有对方法进行加同步锁，所以是非线程安全的。　

3. 性能

   > 每次对 String 类型进行改变的时候，都会生成一个新的 String 对象，然后将指针指向新的 String 对象。StringBuffer 每次都会对 StringBuffer 对象本身进行操作，而不是生成新的对象并改变对象引用。相同情况下使用 StringBuilder 相比使用 StringBuffer 仅能获得 10%~15% 左右的性能提升，但却要冒多线程不安全的风险。

   **对于三者使用的总结：**

   1. 操作少量的数据: 适用String
   2. 单线程操作字符串缓冲区下操作大量数据: 适用StringBuilder
   3. 多线程操作字符串缓冲区下操作大量数据: 适用StringBuffer

