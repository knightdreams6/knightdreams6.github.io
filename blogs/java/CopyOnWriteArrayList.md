---
title: CopyOnWriteArrayList
date: 2021-12-16 22:27:17
tags:
  - java
  - concurrency	
---

#### 简介

`ArrayList` 在读线程读取时如果有写线程在写数据的时候，基于 fast-fail 机制，会抛出 `ConcurrentModificationException`, 也就是说 `ArrayList` 并不是一个线程安全的容器，当然可以使用 `Vector` 或者使用 `Collections` 的静态方法将其包装成一个线程安全的类，但是这些方式都是采用关键字 `Synchronized` 对方法进行修饰，利用独占锁来保证线程安全。但是由于独占锁在同一时刻只有一个线程能获取到对象监视器，很显然这种方式效率不是太高。

回到业务场景中，有很多业务往往是**读多写少**的，比如系统配置的信息，除了在初始进行系统配置的时候需要写入数据，其他大部分时刻其他模块之后对系统信息只需要进行读取。如果在这种情况使用  `Vector` 或者使用 `Collections` 转换方式是不合理的，因为尽管多个读线程从同一个数据容器中读取数据，但是读线程对数据容器的数据不会发生修改。很自然而然的我们会联想到`ReenTrantReadWriteLock` 通过**读写分离**的思想使得读读之间不会阻塞，但是，如果仅仅是将list通过读写锁（`ReentrantReadWriteLock`）进行再一次封装的话，由于读写锁的特性，当写锁被写线程获取后，读写线程都会被阻塞

Doug Lea大师就为我们提供`CopyOnWriteArrayList`容器可以保证线程安全，保证读写之间在任何时候都不会被阻塞，`CopyOnWriteArrayList`也被广泛应用于很多业务场景之中，



#### COW 的设计思想

回到上面所说的，如果简单的使用读写锁的话，在写锁被获取之后，读写线程都被阻塞，只有当写锁被释放后读线程才有机会获取到锁从而读取到最新的数据，站在 **读线程的角度看，即读线程任何时候都是获取到最新的数据，满足数据实时性。** 既然我们说道要进行优化，必然有 `trade-off`，我们就可以 **牺牲数据实时性满足数据的最终一致性即可。** 而 **`CopyOnWriteArrayList`就是通过写时复制的思想来通过延时更新的策略来实现数据的最终一致性，并且能够保证读线程间不阻塞。**

COW通俗的理解是 **当我们往一个容器添加元素的时候，不直接往当前容器添加，而是先将当前容器进行Copy，复制出一个新的容器，然后往新的容器里添加元素，添加完元素之后，再将原容器的引用指向新的容器。** 对COW容器进行并发读的时候，不需要加锁，因为当前容器不会添加任何元素，所以COW容器也是 **一种读写分离的思想，延时更新的策略是通过在写的时候针对的是不同的数据容器来实现的吗，放弃数据实时性达到数据的最终一致性。**



#### `CopyOnWriteArrayList`的实现原理

实际上`CopyOnWriteArrayList`内部维护的就是一个数组

```java
// 数组，只能通过 getArray/setArray访问
private transient volatile Object[] array;
```

并且该数组引用是被 `volatile` 修饰，注意这里 **仅仅修饰的是数组引用，** volatile很重要的一条性质是它能够够保证可见性



##### get方法实现原理

```java
    private E get(Object[] a, int index) {
        return (E) a[index];
    }

    /**
     * {@inheritDoc}
     *
     * @throws IndexOutOfBoundsException {@inheritDoc}
     */
    public E get(int index) {
        return get(getArray(), index);
    }

    final Object[] getArray() {
        return array;
    }
```

可以看出来get方法实现非常简单，几乎就是一个“单线程”程序，没有对多线程添加任何的线程安全控制，也没有加锁也没有CAS操作等等，原因是，所有的读线程只是会读取数据容器中的数据，并不会进行修改。



##### add方法实现原理

```java
	public boolean add(E e) {
        final ReentrantLock lock = this.lock;
        // 1.使用lock，保证写线程在同一时刻只有一个
        lock.lock();
        try {
            // 2.获取旧数组引用
            Object[] elements = getArray();
            int len = elements.length;
            // 3.创建新数组,并将就数组的数据复制到新数组中
            Object[] newElements = Arrays.copyOf(elements, len + 1);
            // 4.往新数组中添加新的数据
            newElements[len] = e;
            // 5.将旧数组引用指向新的数组
            setArray(newElements);
            return true;
        } finally {
            lock.unlock();
        }
    }
```

需要注意以下几点

1. 采用 `ReentrantLock`, 保证同一时刻只有一个写线程正在进行数组的复制，否则内存会有多份被复制的数据
2. 数组被 `volatile` 修饰，因此将旧的数组引用指向新的数组，根据 `volatile` 的 `happens-before` 规则，写线程对数组引用的修改对读线程是可见的。
3. 由于在写数据的时候，是在新的数组中插入数据的，从而保证读写是在两个不同的数据容器中进行操作。



#### 总结

##### COW 与 读写锁的区别

**相同点**

1. 两者都是通过读写分离的思想实现的
2. 读线程间是互不阻塞的

**不同点**

​	对于读线程而言，为了实现数据实时性，在读锁被获取后，读线程会等待或者当读锁被获取后，写线程等待，从而解决“脏读”的问题。而COW则完全放开了牺牲数据实时性而保证数据最终一致性，即读线程对数据的更新是延时感知的，因此读线程不会存在等待的情况



##### 为什么需要复制数组?

对volatile变量写happens-before读，读线程不是能够感知到volatile变量的变化的吗?

原因是，volatile 修饰的**仅仅**是**数组引用**，**数组中的元素的修改时不能保证可见性的。**因此COW采用的是新旧两个数据容器。



##### COW的缺点

1. **内存占用问题：** 因为在写操作时，内存中会存在两个对象数组；
2. **数据一致性问题：** COW容器只能保证数据的最终一致性，不能保证数据的实时一致性。如果希望写入的数据马上能读到，请不要使用COW容器
