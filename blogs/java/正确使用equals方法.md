---
title: 正确使用equals方法
date: 2023-03-22 15:12:43
tags:
  - java
---

#### 1. 正确使用 equals 方法

> Object 的 equals 方法容易抛出空指针异常，应使用常量或确定有值得对象来调用equals

```java
// 不能使用值为null的引用类型变量来调用非静态方法，否则抛出异常
String str = null;
if(str.equals("str2")){
    ...
} else {
    ...
}
```

```java
// 将判断语句翻转调用则会执行else
"SnailClimb".equals(str);// false
```

推荐使用 `java.util.Objects#equals`(JDK7引入的工具类)

> Objects.equals(null, "str"); // false

```java
public static boolean equals(Object a, Object b) {
    // 可以避免空指针异常。如果a==null的话此时a.equals(b)就不会得到执行，避免出现空指针异常。
    return (a == b) || (a != null && a.equals(b));
}
```

* 每种原始类型都有默认值一样，如int默认值为 0，boolean 的默认值为 false，null 是任何引用类型的默认值，不严格的说是所有 Object 类型的默认值。
* 可以使用 == 或者 != 操作来比较null值，但是不能使用其他算法或者逻辑操作。在Java中 `null == null`将返回true。
* 不能使用一个值为null的引用类型变量来调用非静态方法，否则会抛出异常

---

#### 2. 整型包装类值的比较

所有整型包装类对象值的比较必须使用equals方法。先看下面这个例子：

```java
Integer x = 3;
Integer y = 3;
System.out.println(x == y);// true
Integer a = new Integer(3);
Integer b = new Integer(3);
System.out.println(a == b);//false
System.out.println(a.equals(b));//true
```

当使用自动装箱方式创建一个Integer对象时，当数值在-128 ~127时，会将创建的 Integer 对象缓存起来，当下次再出现该数值时，直接从缓存中取出对应的Integer对象。所以上述代码中，x和y引用的是相同的Integer对象。

---

#### 3. BigDecimal

##### 3.1 BigDecimal的用处

**浮点数之间的等值判断，基本数据类型不能用 == 比较，包装数据类型不能用 equals判断**

```java
float a = 1.0f - 0.9f;
float b = 0.9f - 0.8f;
System.out.println(a);// 0.100000024
System.out.println(b);// 0.099999964
System.out.println(a == b);// false
```

**精度丢失，使用 BigDecimal 来定义浮点数的值，再进行浮点数的运算操作**

```java
BigDecimal a = new BigDecimal("1.0");
BigDecimal b = new BigDecimal("0.9");
BigDecimal c = new BigDecimal("0.8");
BigDecimal x = a.subtract(b);// 0.1
BigDecimal y = b.subtract(c);// 0.1
System.out.println(x.equals(y));// true
```

##### 3.2 BigDecimal 的大小比较

`a.compareTo(b)` : 返回 -1 表示小于，0 表示 等于， 1表示 大于。

```java
BigDecimal a = new BigDecimal("1.0");
BigDecimal b = new BigDecimal("0.9");
System.out.println(a.compareTo(b));// 1
```

##### 3.3 BigDecimal 保留几位小数

通过 `setScale`方法设置保留几位小数以及保留规则。保留规则有挺多种，不需要记，IDEA会提示。

```java
BigDecimal m = new BigDecimal("1.255433");
BigDecimal n = m.setScale(3,BigDecimal.ROUND_HALF_DOWN);
System.out.println(n);// 1.255
```

##### 3.4 BigDecimal 的使用注意事项

注意：在使用 BigDecimal 时，为了防止精度丢失，推荐使用它的 `BigDecimal(String)` 构造方法来创建对象，

《阿里巴巴规范手册》规定禁止使用构造方法 `BigDecimal(Double)` 的方式把double值转为 BigDecimal对象

优先推荐使用入参为String的构造方法，或使用 BigDecimal的valueOf方法，此方法内部执行了Double的toString，而Double的toString按double的实际能表达的精度对尾数进行了截断。

##### 3.5 总结

BigDecimal 主要用来操作（大）浮点数，BigInteger 主要用来操作大整数（超过 long 类型）。

BigDecimal 的实现利用到了 BigInteger, 所不同的是 BigDecimal 加入了小数位的概念

---

#### 4. 基本数据类型和包装数据类型的使用

《阿里巴巴开发手册》

* 【强制】所有的 POJO 类的属性必须使用包装数据类型
* 【强制】RPC方法的返回值和参数必须使用包装数据类型
* 【推荐】所有的局部变量使用基本数据类型

比如我们如果自定义了一个Student类,其中有一个属性是成绩score,如果用Integer而不用int定义,一次考试,学生可能没考,值是null,也可能考了,但考了0分,值是0,这两个表达的状态明显不一样.

**说明** :POJO 类属性没有初值是提醒使用者在需要使用时，必须自己显式地进行赋值，任何 NPE 问题，或者入库检查，都由使用者来保证。

**正例** : 数据库的查询结果可能是 null，因为自动拆箱，用基本数据类型接收有 NPE 风险。

**反例** : 比如显示成交总额涨跌情况，即正负 x%，x 为基本数据类型，调用的 RPC 服务，调用不成功时，返回的是默认值，页面显示为 0%，这是不合理的，应该显示成中划线。所以包装数据类型的 null 值，能够表示额外的信息，如:远程调用失败，异常退出。