---
title: volatile关键字
date: 2021-12-23 15:40:12
tags:
  - java
  - concurrency	
---

### volatile简介

> 说到 volatile，就不得不讲解一下并发编程中的三个概念：原子性、可见性和有序性。

#### 1、原子性

>  即一个操作或者多个操作，要么全部执行并且执行的过程不会被任何因素打断，要么都不执行。

举个最简单的例子，大家想一下假如为一个64位的`long`类型变量赋值过程不具备原子性的话，会发生什么后果？

一个线程执行到这个语句时，假设为一个64位的变量赋值包括两个过程：为低32位赋值、为高32位赋值。那么就可能发生一种情况：当将低32位数值写入之后，突然被中断，而此时又有一个线程去读取`i`的值，那么读取到的就是错误的数据。

#### 2、可见性

> 可见性是指当多个线程访问同一个变量时，一个线程修改了这个变量的值，其他线程能够立即看得到修改的值

比如下面这段代码：

```java
// 线程1执行的代码
int i = 0;
i = 10;

// 线程2执行的代码
j = i;
```

假若执行线程1的是`CPU1`，执行线程2的是`CPU2`。当线程1执行 i = 10 这句时，会先把i的初始值加载到`CPU1`的高速缓存中，然后赋值为10，那么在`CPU1`的高速缓存当中i的值变为10了，却没有立即写入到主存当中。

此时线程2执行 j = i，它会先去主存读取i的值并加载到`CPU2`的缓存当中，注意此时内存当中i的值还是0，那么就会使得j的值为0，而不是10。

这就是可见性问题，线程1对变量i修改了之后，线程2没有立即看到线程1修改的值。

#### 3、有序性

即程序执行的顺序按照代码的先后顺序执行。举个例子

```java
int i = 0;
boolean flag = false;
i = 1;	// 语句1
flag = true;	// 语句2
```

上面代码定义了一个 int 型变量和一个 boolean型变量，然后分别对两个变量进行赋值操作，从代码顺序上看，语句1是在语句2前面的，那么`JVM`在真正执行这段代码的时候会保证语句1一定会在语句2前面执行吗？不一定，为什么呢？这里可能会发生指令重排序（Instruction Reorder）。

指令重排序是指处理器为了提高程序运行效率，可能会对输入代码进行优化，它不保证程序中各个语句的执行先后顺序同代码中的顺序一致，但是它会保证程序最终执行结果和代码顺序执行的结果是一致的。

比如上面的代码中，语句1和语句2谁先执行对最终的程序结果并没有影响，那么就有可能在执行过程中，语句2先执行而语句1后执行。处理器在进行重排序时是会考虑指令之间的数据依赖性，如果一个指令2必须用到指令1的结果，那么处理器会保证指令1会在指令2之前执行。

Java内存模型具备一些先天的"有序性"，即不需要通过任何手段就能够得到保证的有序性，这个通常也称为 happens-before 原则。如果两个操作的执行次序无法从happens-before原则推导出来，那么就不能保证它们的有序性，虚拟机可以随意地对它们进行重排序。

##### happen-before 原则

1. 顺序执行规则(对单个线程而言)：一个线程内，按照代码顺序，该线程的每个动作都happen-before其后续的动作
2. volatile变量读写规则：对一个volatile变量的写操作一定会happen-before后续对该变量的读操作
3. 多线程启动规则：Thread对象的start方法happen-before该线程的run方法中的任何一个动作，包括在run方法中启动的任何子线程
4. 多线程终止规则：线程中所有的操作都先行发生于线程的终止检测。一个线程启动了一个子线程，并且调用了子线程的join方法等待其结束。那么当子线程运行结束时，父线程后续的所有操作都可以看到子线程run方法中的执行结果
5. 线程中断规则：可以调用一个线程的interrupt方法来中断线程，这个调用happen-before对该线程的中断检查
6. 隐式锁规则：unlock操作一定happen-before 后面对同一个锁的lock操作。前一个线程对同步代码块的执行结果对于后续获得锁的线程都是可见的
7. 传递规则：如果操作A先行于操作B，而操作B又先行发生于操作C，则可以得出操作A先行发生于操作C
8. 对象终结规则：一个对象的初始化完成 happen-before 它的finalize() 方法的开始



### volatile 的作用

前面的只是都是为介绍 volatile 做的铺垫

volatile 关键字的作用：

1. 实现 long/double 类型变量的原子操作
2. 禁止指令重排序
3. 保证变量的可见性 

当一个变量被 volatile 修饰后，就不会被编译器放到寄存器中取存储。在读取该变量时，应用就不会从寄存器中获取该变量的值，而是从内存（高速缓存）中获取。

volatile 有时也被认为是一种轻量级的“锁”，因为其与锁有两个相似的功能：

1. 保证变量的内存可见性

2. 防止指令重排序

   > 注意：volatile可以保证对变量本身读写操作的原子性，但不具备排他性。

换句话说可以有多个线程同时对某个volatile修饰的变量进行写操作。而我们前文讲到的 `Synchronized`关键字修饰的方法只允许一个线程同时访问，其它线程需要获取锁才能访问。使用锁可能会导致线程的上下文切换（系统用户态和内核态的切换），但是使用volatile不会出现这种情况

由于存在多线程并发访问的情况，因此在实际开发中常常出现一些意想不到的情况。比如下列代码：

```java
volatile int a = 1;
volatile int b = a + 1;
volatile int c = a++;
volatile int count = 10;
volatile boolean flag = true;
```

第二行和第三行代码存在多个变量的操作。在多线程环境下并不能保证整个操作的原子性。一般使用volatile的方式形如其它几行代码所示的那样。

如果要保证volatile变量写操作的原子性，在等号右侧的赋值操作中不能出现被多线程共享的变量，哪怕该变量也是被volatile修饰的也不行。

> 在日常代码开发中要记住：多线程环境下，volatile只保证可见性，不保证原子性。

**举例1**：假如线程1先执行，线程2后执行。

```java

//线程1
 boolean  stop =  false ;
 while (!stop){
      doSomething();
 }
 
 //线程2
 stop =  true ;
```

这是一段很经典的代码。日常开发中，在中断线程时会采用这种办法标记。但事实上，这段代码会完全正确运行么？即一定会将线程中断么？不一定，也许在大多数时候，这个代码能够把线程中断，但是也有可能会导致无法中断线程。

因为每个线程在运行过程中都有自己的工作内存，线程1在运行的时候，会将stop变量的值拷贝一份放在自己的工作内存当中。当线程2更改了stop变量的值之后，还没来得及写入主存当中，就转去做其他事情时，线程1由于不知道线程2对stop变量的更改，因此还会一直循环下去。

但是用volatile修饰之后就变得不一样了。

1. 使用volatile关键字会强制将修改的值立即写入主存

2. 使用volatile关键字的话，当线程2进行修改时，会导致线程1的工作内存中缓存变量stop的缓存行无效（反映到硬件层的话，就是CPU的L1缓存或者L2缓存中对应的缓存行无效）

3. 由于线程1的工作内存中缓存变量stop的缓存行无效，所以线程1再次读取变量stop的值时会去主存读取。

   那么在线程2修改stop值时（这里包括两个操作，修改线程2工作内存中的值，然后将修改后的值写入到主存），会使得线程1的工作内存中缓存变量stop的缓存行无效，然后线程1读取时，发现自己的缓存行无效，它会等待缓存行对应的主存地址被更新之后，然后去对应的主存读取最新的值。那么线程1读取到的就是最新的正确的值。

**举例2**：多线程环境下，不能保证多个线程操作的原子性

```java
public class TestVolatile {
     public volatile int inc = 0;
 
     public void increase() {
         inc++;
    }
 
     public static void main(String[] args) throws InterruptedException {
         final TestVolatile test = new TestVolatile();
         Vector<Thread> threads = new Vector<>();
         for (int i = 0; i < 10; i++) {
             Thread thread = new Thread(() -> {
                 for (int j = 0; j < 1000; j++) {
                     test.increase();
                }
            });
             threads.add(thread);
             thread.start();
        }
 
         System.out.println("========started=======");
         //保证前面的线程都执行完
         for (Thread t : threads) {
             t.join();
        }
         System.out.println("========end=======");
         System.out.println(test.inc);
    }
 }
```

运行上述程序，看看结果是多少？

很多人说是10000，实际运行发现并非每次都是10000。也有可能是一个小于10000的数。

虽然volatile保证了可见性，在每个线程中对`inc`自增完之后，在其他线程中都能看到修改后的值。但是volatile不能保证对变量操作的原子性。

我们知道，自增操作是不具备原子性的，它包括读取变量的原始值、进行加1操作、写入工作内存。自增操作的三个子操作可能会分割开执行。

假如某个时刻变量inc的值为10，线程1对变量进行自增操作，线程1先读取了变量inc的原始值，然后线程1被阻塞了；然后线程2对变量进行自增操作，线程2也去读取变量inc的原始值，由于线程1只是对变量inc进行读取操作，而没有对变量进行修改操作，所以不会导致线程2的工作内存中缓存变量inc的缓存行无效，线程2会直接去主存读取inc的值，发现inc的值是10，然后进行加1操作，并把11写入工作内存，最后写入主存。

然后线程1接着进行加1操作，由于已经读取过了inc的值，此时在线程1的工作内存中inc的值仍然为10，所以线程1对inc进行加1操作后inc的值为11，然后将11写入工作内存，最后写入主存。

所以两个线程分别进行了一次自增操作后，inc只增加了1。

可能有人会有疑问，前面不是说一个线程在修改volatile变量时，会让缓存行无效吗？然后其他线程去读就会读到新的值。确实，这个就是上面的happens-before规则中的volatile变量规则。但是线程1对变量进行读取操作之后，被阻塞了的话，并没有对inc变量的值进行修改。虽然volatile能保证线程2对变量inc的值读取是从内存中读取的，但是由于线程1还没有进行修改，所以线程2不会看到线程1即将修改的值。

问题的根源在于自增操作不是原子性操作，有多个细分的步骤；而且volatile无法保证对变量的任何操作都是原子性的。

可以使用synchronized、Lock或者原子类解决上面的问题。

increase方法可以做如下的改造。

synchronized

```java
public synchronized void increase() {
         inc++;
}
```

Lock

```java
public void increase() {
      try {
          lock.lock();
          inc++;
      } finally {
          lock.unlock();
      }
}
```

原子类

```java
public AtomicInteger inc = new AtomicInteger();
public void increase() {
    inc.getAndIncrement();
}
```



**举例3** :`volatile`对有序性的保证

volatile关键字可以禁止指令重排序。比如下列代码。

```java
 int x =  2 ;         //语句1
 int y =  0 ;         //语句2
 boolean volatile flag =  true ;   //语句3
 int x =  4 ;         //语句4
 int y = - 1 ;        //语句5
```

由于flag变量为volatile修饰的变量，在编译器进行指令重排序的时，不会将语句3放到语句1、语句2前面；也不会把语句3放到语句4、语句5后面。但是要注意语句1和语句2的顺序、语句4和语句5的顺序是不作任何保证的。执行到语句3时，语句1和语句2必定是执行完毕了的；且语句1和语句2的执行结果对语句3、语句4、语句5是可见的。

再比如下列代码，这是我们经常会遇到的场景。

```java
// 线程1:
 config = loadConfig();    // 语句1
 inited =  true ;          // 语句2
 
// 线程2:
 while (!inited ){
    sleep();
 }
 doSomethingWithConfig(config);
```

由于指令重排序的缘故，可能语句2会在语句1之前执行，这就可能导致config还没加载完成，线程2中就使用未初始化的config去进行操作，导致程序出错。如果用volatile关键字对inited变量进行修饰，就不会出现这种问题了，因为当执行到语句2时，必定能保证前一行初始化config的代码已经执行完毕。

**举例4**：`volatile`可见性的保证：比较使用volatile与否的效果

```java

public class MyThread extends Thread {
     private volatile int count = 0;
 
     public int getCount() {
         return count;
    }
 
     public void setCount(int count) {
         this.count = count;
    }
 
     @Override
     public void run() {
         while (true) {
             System.out.println(count);
             count++;
             try {
                 sleep(500);
            } catch (InterruptedException e) {
                 e.printStackTrace();
            }
        }
    }
 
     public static void main(String[] args) {
         MyThread tt = new MyThread();
         tt.start();
         while (true) {
             if (tt.getCount() == 10) {
                 tt.setCount(20);
            }
        }
    }
 }
```

本例中，当给count变量加上了volatile关键字时，main线程的set方法会修改主内存的count变量，同时tt线程取count值的时候会从主内存取而不是本地内存取，因此保持了两个线程数据的一致性。

如果不使用volatile修饰count变量，则在主线程修改了count为20时不会反映到线程tt上，tt上打印的count还是10、11...



### volatile 的原理

对volatile变量的读写操作，本质上都是通过 **内存屏障** 来执行的。

##### 内存屏障提供以下功能：

1. 确保指令重排序时不会把其后面的指令排到内存屏障之前的位置，也不会把前面的指令排到内存屏障的后面；即在执行到内存屏障这句指令时，在它前面的操作已经全部完成。
2. 它会强制将对缓存的修改操作立即写入主存
3. 如果是写操作，它会导致其它CPU中对应的缓存行无效

##### 4中常见的内存屏障

1. Release Barrier: 防止下面的volatile代码行和上面的所有操作指令重排序
2. Store Barrier： 刷新处理器的缓存，确保该存储屏障之前的所有操作所生成的结果对于其它处理器来说都是可见的
3. Load Barrier：刷新处理器缓存
4. Acquire Barrier：防止上面的volatile读取操作与下面的代码的所有操作指令重排序

一句话总结内存屏障的作用：防止指令重排序，实现变量内存的可见性。

1. 对于读操作，volatile 可以保证该操作与之后的所有读写操作都不会进行指令重排序
2. 对于写操作，volatile 可以保证该操作与之前的所有读写操作都不会进行执行重排序

我们之前介绍的 synchronized 锁同样具备保存变量内存可见性和防止指令重排序功能。

```java
monitorenter
 //此处插入内存屏障(Acquire Barrier:获取屏障)
 ......
 //此处插入内存屏障(Release Barrier:释放屏障)
monitorenter
```

volatile就是通过内存屏障(Memory Barrier)实现防止指令重排序的。

比如下面这段Java代码，实际上在volatile修饰的变量前后插入了内存屏障。此处以注释方式标记。

```java
int a = 1;
String str = "hello";
//此处插入内存屏障(Release Barrier:释放屏障)
volatile boolean flag = true ;// 赋值操作即写入操作
//此处插入内存屏障(Store Barrier:存储屏障)
//此处插入内存屏障(Load Barrier:加载屏障)
boolean flag2 = flag;
//此处插入内存屏障(Acquire Barrier:获取屏障)
int b = 1;
String str2 = "hello2";
```

