---
title: ForkJoinPool
date: 2021-07-17 14:06:51
tags:
  - java
---

### ForkJoinPool

> UML 类图

![image-20210708113135389](https://knight-img.oss-cn-beijing.aliyuncs.com/0acfbf5ee6c511eba4cb28d0eaa3d234.png)



#### 1. Executor

执行提交的 Runnable 任务的对象。该接口提供了一种将任务提交与每个任务将如果运行的机制分离的方法，包括线程使用、调度等细节。通常使用`Executor` 而不是显式创建线程。

反例：为每个任务`new Thread(new(RunnableTask())).start()`

可以使用 `executor.execute(new RunnableTask())`

`Executor` 接口并不严格要求执行是异步的，在最简单的情况下，执行者可以立即再调用者的线程中运行提交的任务

```java
class DirectExecutor implements Executor {
   public void execute(Runnable r) {
     r.run();
   }
}
```

更典型的是，任务在调用者线程之外的某个线程中执行。 下面的执行程序为每个任务生成一个新线程。

```java
class ThreadPerTaskExecutor implements Executor {
   public void execute(Runnable r) {
     new Thread(r).start();
   }
}
```

许多`Executor`实现对任务的调度方式和时间施加了某种限制。下面的 executor 将任务的提交序列化到第二个 executor

```java
class SerialExecutor implements Executor {
   final Queue<Runnable> tasks = new ArrayDeque<Runnable>();
   final Executor executor;
   Runnable active;

   SerialExecutor(Executor executor) {
     this.executor = executor;
   }

   public synchronized void execute(final Runnable r) {
     tasks.offer(new Runnable() {
       public void run() {
         try {
           r.run();
         } finally {
           scheduleNext();
         }
       }
     });
     if (active == null) {
       scheduleNext();
     }
   }

   protected synchronized void scheduleNext() {
     if ((active = tasks.poll()) != null) {
       executor.execute(active);
     }
   }
}
```

内存一致性影响：在将Runnable对象提交给Executor之前线程中的操作发生在其执行开始之前，可能在另一个线程中



#### 2. ExecutorService

提供了管理和终止的方法和可以生成`Future`以跟踪一个或多个任务的进度的方法

ExecutorService可以关闭，这将导致它拒绝新任务。 

* `shutdown`方法将允许先前提交的任务在终止之前执行

* `shutdownNow`方法阻止等待任务开始并尝试停止当前正在执行的任务

  终止时，执行器中没有正在执行的任务，没有等待执行的任务，也没有新的任务可以提交。应关闭未使用的`ExecutorService`以回收资源

方法`submit`通过创建和返回可用于取消执行和/或等待完成的`Future`来扩展基本方法`Executor.execute(Runnable)`。方法`invokeAny`和`invokeAll`执行最常用的批量执行形式，执行一组任务，然后等待至少一个或全部完成

`Executors`类为此包中提供的执行程序服务提供了工厂方法。

使用示例：

```java
class NetworkService implements Runnable {
    private final ServerSocket serverSocket;
    private final ExecutorService pool;
    
    public NetworkService(int port, int poolSize)
       throws IOException {
     serverSocket = new ServerSocket(port);
     pool = Executors.newFixedThreadPool(poolSize);
   }
    
   public void run() { // run the service
     try {
       for (;;) {
         pool.execute(new Handler(serverSocket.accept()));
       }
     } catch (IOException ex) {
       pool.shutdown();
     }
   }
}

class Handler implements Runnable {
   private final Socket socket;
   Handler(Socket socket) { this.socket = socket; }
   public void run() {
     // read and service request on socket
   }
}

// 以下方法分两个阶段关闭ExecutorService ，首先通过调用shutdown拒绝传入任务，然后在必要时调用shutdownNow取消任何延迟任务：

void shutdownAndWaitTermination(ExecutorService pool) {
    // 禁止提交新任务
    pool.shutdown();
    try {
        // 等待现有任务终止
        if(!pool.awaitTermination(60, TimeUnit.SECONDS)) {
            // 取消当前正在执行的任务
            pool.shutdownNow();
            // 等待任务响应被取消
            if (!pool.awaitTermination(60, TimeUnit.SECONDS)){
            	System.err.println("Pool did not terminate");
            }
        }
    } catch (InterruptedException ie) {
        // （重新）取消如果当前线程也被中断
        pool.shutdownNow();
        // 保留中断状态
        Thread.currentThread().interrupt();
   }
}    
```

内存一致性影响：在将Runnable或Callable任务提交给ExecutorService之前线程中的操作发生在该任务采取的任何操作之前，而后者又发生在通过Future.get()检索结果之前。   



#### 3. AbstractExecutorService

提供`ExecutorService`执行方法的默认实现。此类使用newTaskFor返回的`RunnableFuture`实现`submit`，`invokeAny`和`invokeAll`方法，默认为该包中提供的 `FutureTask`类。

例如，`sumit(Runnable)`的实现创建了一个关联的`RunnableFuture`，它被执行并返回，子类可以覆盖`newTaskFor`方法以返回除FutureTask newTaskFor RunnableFuture实现。



#### 4. ForkJoinPool

 简介：用于运行`ForkJoinTask`的`ExecutorService`. `ForkJoinPool`为来自非`ForkJoinTask`客户端的提交以及管理和监控操作提供了入口类

`ForkJoinPool`与其他类型的`ExecutorService`主要区别在于采用了工作窃取：池中所有线程都尝试查找并执行提交给池和/或由其他活动任务创建的任务（如果不存在则阻塞等待工作）。

当大多数任务产生其他子任务时（大多数ForkJoinTask也是如此），以及许多小任务从外部客户端提交到池时，这可以实现高效处理。特别是在将构造函数中将 `asyncMode` 设置为true时，`ForkJoinPool`也可能适用于从未加入的事件样式任务。

**静态`commonPool()`可用并且适用于大多数应用程序**，公共池由未明确提交到指定池的任何 `ForkJoinTask`使用。使用公共池通常会减少资源使用（其线程再不使用期间缓慢收回，并在后续使用时恢复）。

对于需要单独或自定义池的应用程序，可以实用给定的目标并行级别构建`ForkJoinPool`；默认情况下，等于可用处理器的数量。池尝试通过动态添加，挂起或恢复内部工作线程来维持足够的活动（或可用）线程，即使某些任务再等待时加入其他任务时暂停。但是，面对阻塞的 I/O 或其它非托管同步，不能保证进行此类调整。嵌套的 `ForkJoinPool.ManagedBlocker` 即可支持扩展所容纳的内部类型。

除了执行和生命周期控制方法之外，该类还提供状态检查方法（例如`getStealCount`）,旨在帮助开发，调整和监控 fork/join 应用程序。此外，方法`toString`以一种方便的形式返回池状态的指示以进行非正式监视。

与其他 `ExecutorService` 的情况一样，下表总结了三种主要的任务执行方法。这些旨在主要由尚未在当前池中参与分叉/加入计算的客户端使用。这些方法的主要形式接受`ForkJoinTask`实例，但重载形式也允许混合执行基于纯Runnable或Callable的活动。 但是，已在池中执行的任务通常应改为使用表中列出的计算内形式，除非使用通常不连接的异步事件样式任务，在这种情况下，方法选择之间几乎没有区别。

|                      |      任务执行方法总结       |                       |
| -------------------- | :-------------------------: | :-------------------: |
|                      | 来自非fork/join客户端的调用 | 从fork/join计算中调用 |
| 安排异步执行         |    execute(ForkJoinTask)    |   ForkJoinTask.fork   |
| 等待并获得结果       |    invoke(ForkJoinTask)     |  ForkJoinTask.invoke  |
| 安排exec并获得Future |    submit(ForkJoinTask)     |   ForkJoinTask.fork   |

公共池默认使用默认参数构建，但可以通过设置三个系统属性来控制：

* `java.util.concurrent.ForkJoinPool.common.parallelism` - 并行度，非负整数
* `java.util.concurrent.ForkJoinPool.common.threadFactory - ForkJoinPool.ForkJoinWorkerThreadFactory`的类名
* `java.util.concurrent.ForkJoinPool.common.exceptionHandler - Thread.UncaughtExceptionHandler`的类名

如果存在`SecurityManager`且未指定工厂，则默认池使用工厂提供未启用`Permissions`线程。 系统类加载器用于加载这些类。 在建立这些设置时出现任何错误时，将使用默认参数。 通过将 `parallelism` 属性设置为零和/或使用可能返回null的工厂，可以禁用或限制公共池中线程的使用。 然而，这样做可能会导致未加入的任务永远不会被执行。



此实现将运行线程的最大数量限制为 32767。尝试创建大于最大数量的池会导致IllegalArgumentException 。
此实现仅在池关闭或内部资源耗尽时拒绝提交的任务（即通过抛出RejectedExecutionException ）。

