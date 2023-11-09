---
title: javaSE面试题（一）
date: 2019-12-13 11:32:29
tags: 
  - java
---

#### 1、接口和抽象类的区别是什么？

1. 接口的方法默认是public，1.8开始可以有默认实现方法（可以用public、default两种修饰符），抽象类可以有非抽象方法

2. 接口中除了static、final变量不能有其它变量，而抽象类不一定

3. 一个类可以实现多个接口，只能继承一个抽象类。接口可以继承多个接口。

4. 接口方法默认修饰符为public，抽象方法可以有public、protected和default这些修饰符（抽象方法就是为了重写，所以不能用private关键字修饰）

5. 从设计层面说，抽象是对类的抽象，是一种模板设计，而接口是对行为的抽象，是一种行为规范

   > 注：在1.8中，接口可以定义静态方法，且可以直接用接口名调用。实现类和实现不可调用。如果同时实现了两个接口，接口定义了一样的默认方法，则必须重写，不然会报错。

------

#### 2、成员变量与局部变量的区别？

1. 从语法形式上看：成员变量属于类，局部变量属于方法参数或是方法内部定义的变量，成员变量可以用public、static、private等修饰符修饰，而局部变量不能被访问控制修饰符和static修饰符修饰；两者都可以被final修饰
2. 从变量在内存中存储方式来看：如果成员变量使用static修饰，那么这个成员变量是属于类的，如果没有使用static修饰，这个变量是属于实例的。而对象存在于堆内存，局部变量存在于栈内存
3. 从变量在内存中生存时间看：成员变量是对象的一部分，它随着对象的创建而存在，而局部变量随着方法的调用而自动消失。
4. 成员变啦如果没有被赋予初始值，则会以类型的默认值初始化（被final修饰的例外，必须显式地赋值），而局部变量则不会自动赋值

---

#### 3、== 与 equals

> ==：对于引用类型，判断两个对象的地址是否相等；对于基本数据类型，判断两个值是否相等
>
> equals：判断两个对象是否相等，如果类没有覆盖equals()方法。则通过equals()比较该类的两个对象时，等价与“==”比较这两个对象。如果类覆盖了该方法，则根据该方法实现来比较两个对象内容是否相等
>
> 注：String类重写了equals方法，所以两个字符串进行比较时比较的是内容

---

#### 4、hashCode 与 equals

**hashCode简介**

> hashCode()的作用是获取哈希码，也成为了散列码；它实际上返回一个int整数。这个哈希码的作用是确定该对象在哈希表中的索引位置。该方法定义在Object.java中，意味着Java中每个对象都有hashCode()函数
>
> 散列表存储的键值对，它的特点是能根据键快速检索出对应的值，这其中就用到了哈希码。

**为什么要有hashCode？**

> 以“HashSet”检查重复来说明：当你把对象加入HashSet中时，HashSet会先计算对象的Hashcode值来判断该对象存入的位置，同时也会与其他已经加入的对象的 hashcode 值进行比较，如果没有相符的hashcode，HashSet会假设对象没有重复出现。但是如果发现有相同的hashcode值的对象，这时会调用`equals()`方法来检查hashcode相等的对象是否真的相同。如果相同，HashSet就不会让其加入操作成功，如果不同，就会重新散列到其它位置。这样我们就大大减少了equals的次数，相应就大大提高了执行速度。
>
> 通过我们可以看出：`hashCode()` 的作用就是**获取哈希码**，也称为散列码；它实际上是返回一个int整数。这个**哈希码的作用**是确定该对象在哈希表中的索引位置。**hashCode() 在散列表中才有用，在其它情况下没用**。在散列表中hashCode() 的作用是获取对象的散列码，进而确定该对象在散列表中的位置。

**hashCode（）与equals（）的相关规定**

1. 如果两个对象相等，则hashCode一定相同
2. 两个对象相等,对两个对象分别调用equals方法都返回true
3. 两个对象有相同的hashcode值，它们也不一定是相等的
4. **因此，equals 方法被覆盖过，则 hashCode 方法也必须被覆盖**
5. hashCode() 的默认行为是对堆上的对象产生独特值。如果没有重写 hashCode()，则该 class 的两个对象无论如何都不会相等（即使这两个对象指向相同的数据）

---

#### 5、为什么说Java中只有值传递？

**什么是值传递？**

> 值传递是指调用函数时将实际参数**复制**一份传递到函数中，这样在函数中如果对**参数**进行修改，将不会影响到实际参数

**什么是引用传递？**

> 引用传递是指在调用函数时将实际参数的地址**直接**传递到函数中，那么在函数中对**参数**所进行的修改，将影响到实际参数

|          | 值传递                       | 引用传递                     |
| -------- | ---------------------------- | ---------------------------- |
| 根本区别 | 会创建副本（Copy）           | 不创建副本                   |
| 所以     | 在函数中**无法改变**原始对象 | 在函数中**可以改变**原始对象 |

**值传递和引用传递的区别并不是传递的内容。而是实参到底有没有复制一份给形参。**在在判断实参内容有没有受影响的时候，要看传的的是什么，如果你传递的是个地址，那么就看这个地址的变化会不会有影响，而不是看地址指向的对象的变化。就像钥匙和房子的关系。

**所以说，Java中其实还是值传递的，只不过对于对象参数，值的内容是对象的引用。**

```java
package com.learn.juc.jvm;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
class Person{
    private String name;
}

/**
 * @author lixiao
 * @date 2019/12/19 10:08
 */
public class TestTransferValue {

    public void changeValue1(int age){
        age = 30;
    }

    public void changeValue2(Person person){
        person.setName("xxx");
    }

    public void changeValue3(String str){
        str = "xxx";
    }

    public static void main(String[] args) {
        TestTransferValue test = new TestTransferValue();
        int age = 20;
        test.changeValue1(age);
        System.out.println(age);	// 20

        Person person = new Person("abc");
        test.changeValue2(person);
        System.out.println(person);	// xxx

        String str = "abc";	
        test.changeValue3(str);
        System.out.println(str);	// abc
    }
}
```

* 基本数据类型传递复印件
* 引用数据类型传递的是引用
