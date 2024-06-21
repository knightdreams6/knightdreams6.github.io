---
title: kotlin协程上下文和调度程序
date: 2024-06-21
tags:
  - kotlin
---



协程始终在某个上下文中执行，该上下文由 CoroutineContext 类型的值表示，该类型在 Kotlin 标准库中定义。

协程上下文是一组各种元素。主要元素是协程的 Job（我们之前见过）及其调度程序（本节将介绍）。



### 调度程序和线程

协程上下文包含一个协程调度程序（参见 CoroutineDispatcher），它决定相应协程使用哪个或哪些线程来执行。协程调度程序可以将协程执行限制到特定线程、将其调度到线程池或让其不受限制地运行。

所有协程构建器（如 launch 和 async）都接受可选的 CoroutineContext 参数，该参数可用于明确指定新协程和其他上下文元素的调度程序。

```kotlin
fun main() = runBlocking<Unit> {
    launch { // context of the parent, main runBlocking coroutine
        println("main runBlocking      : I'm working in thread ${Thread.currentThread().name}")
    }
    launch(Dispatchers.Unconfined) { // not confined -- will work with main thread
        println("Unconfined            : I'm working in thread ${Thread.currentThread().name}")
    }
    launch(Dispatchers.Default) { // will get dispatched to DefaultDispatcher
        println("Default               : I'm working in thread ${Thread.currentThread().name}")
    }
    launch(newSingleThreadContext("MyOwnThread")) { // will get its own new thread
        println("newSingleThreadContext: I'm working in thread ${Thread.currentThread().name}")
    }
}
```

输出：

```
Unconfined            : I'm working in thread main
Default               : I'm working in thread DefaultDispatcher-worker-1
newSingleThreadContext: I'm working in thread MyOwnThread
main runBlocking      : I'm working in thread main
```

当不带参数使用 launch { ... } 时，它会从启动它的 CoroutineScope 继承上下文（以及调度程序）。在这种情况下，它会继承在主线程中运行的主 runBlocking 协程的上下文。

Dispatchers.Unconfined 是一个特殊的调度程序，它似乎也在主线程中运行，但实际上它是一种不同的机制，稍后会解释。

当范围内未明确指定其他调度程序时，将使用默认调度程序。它由 Dispatchers.Default 表示，并使用共享的后台线程池。

newSingleThreadContext 为协程创建一个线程。专用线程是一种非常昂贵的资源。在实际应用中，当不再需要时，必须使用 close 函数将其释放，或者将其存储在顶级变量中并在整个应用中重复使用。



#### Unconfined vs confined dispatcher﻿

Dispatchers.Unconfined 协程调度程序在调用者线程中启动一个协程，但只到第一个暂停点。暂停后，它会在完全由调用的暂停函数决定的线程中恢复协程。非受限调度程序适用于既不消耗 CPU 时间也不更新任何共享数据（如 UI）的、局限于特定线程的协程。

另一方面，调度程序默认从外部 CoroutineScope 继承。特别是，runBlocking 协程的默认调度程序局限于调用者线程，因此继承它可以将执行限制在该线程中，并具有可预测的 FIFO 调度。

```kotlin
fun main() = runBlocking<Unit> {
    launch(Dispatchers.Unconfined) { // not confined -- will work with main thread
        println("Unconfined      : I'm working in thread ${Thread.currentThread().name}")
        delay(500)
        println("Unconfined      : After delay in thread ${Thread.currentThread().name}")
    }
    launch { // context of the parent, main runBlocking coroutine
        println("main runBlocking: I'm working in thread ${Thread.currentThread().name}")
        delay(1000)
        println("main runBlocking: After delay in thread ${Thread.currentThread().name}")
    }
}
```

输出:

```
Unconfined      : I'm working in thread main
main runBlocking: I'm working in thread main
Unconfined      : After delay in thread kotlinx.coroutines.DefaultExecutor
main runBlocking: After delay in thread main
```

因此，从 runBlocking {...} 继承上下文的协程继续在主线程中执行，而不受限制的协程则在延迟函数正在使用的默认执行器线程中恢复。

> 无限制调度程序是一种高级机制，在某些特殊情况下非常有用，即不需要调度协程以便稍后执行，或者会产生不良副作用，因为协程中的某些操作必须立即执行。无限制调度程序不应在一般代码中使用。



### 使用日志debug

另一种不使用 Coroutine Debugger 调试线程应用程序的方法是在每个日志语句的日志文件中打印线程名称。日志框架普遍支持此功能。使用协程时，线程名称本身并不能提供太多上下文，因此 kotlinx.coroutines 包含调试功能以使其更容易。

使用 -Dkotlinx.coroutines.debug JVM 选项运行以下代码：

```kotlin
fun log(msg: String) = println("[${Thread.currentThread().name}] $msg")

// -Dkotlinx.coroutines.debug JVM option:
fun main() = runBlocking<Unit> {
    val a = async {
        log("I'm computing a piece of the answer")
        6
    }
    val b = async {
        log("I'm computing another piece of the answer")
        7
    }
    log("The answer is ${a.await() * b.await()}")
}
```

输出：

```
[main @coroutine#2] I'm computing a piece of the answer
[main @coroutine#3] I'm computing another piece of the answer
[main @coroutine#1] The answer is 42
```



### 在线程之间跳转

```kotlin
fun log04(msg: String) = println("[${Thread.currentThread().name}] $msg")

fun main() {
    newSingleThreadContext("Ctx1").use { ctx1 ->
        newSingleThreadContext("Ctx2").use { ctx2 ->
            runBlocking(ctx1) {
                log04("Started in ctx1")
                withContext(ctx2) {
                    log04("Working in ctx2")
                }
                log04("Back to ctx1")
            }
        }
    }
}
```

它演示了几种新技术。一种是使用显式指定上下文的 runBlocking，另一种是使用 withContext 函数在仍停留在同一协程中的情况下更改协程的上下文，如下面的输出所示：

```
[Ctx1 @coroutine#1] Started in ctx1
[Ctx2 @coroutine#1] Working in ctx2
[Ctx1 @coroutine#1] Back to ctx1
```

请注意，此示例还使用了 Kotlin 标准库中的 use 函数，在不再需要使用 newSingleThreadContext 创建的线程时释放它们。



### 协程的子级

当一个协程在另一个协程的 CoroutineScope 中启动时，它会通过 CoroutineScope.coroutineContext 继承其上下文，而新协程的作业将成为父协程作业的子级。当父协程被取消时，其所有子级也会被递归取消。

但是，这种父子关系可以通过以下两种方式之一明确覆盖：

1. 当在启动协程时明确指定不同的范围（例如 GlobalScope.launch）时，它不会从父范围继承作业。

2. 当将不同的作业对象作为新协程的上下文传递时（如下例所示），它会覆盖父范围的作业。

在这两种情况下，启动的协程都不与启动它的范围绑定，而是独立运行。

```kotlin
fun main() = runBlocking<Unit> {
    // launch a coroutine to process some kind of incoming request
    val request = launch {
        // it spawns two other jobs
        launch(Job()) {
            println("job1: I run in my own Job and execute independently!")
            delay(1000)
            println("job1: I am not affected by cancellation of the request")
        }
        // and the other inherits the parent context
        launch {
            delay(100)
            println("job2: I am a child of the request coroutine")
            delay(1000)
            println("job2: I will not execute this line if my parent request is cancelled")
        }
    }
    delay(500)
    request.cancel() // cancel processing of the request
    println("main: Who has survived request cancellation?")
    delay(1000) // delay the main thread for a second to see what happens
}
```

输出：

```
job1: I run in my own Job and execute independently!
job2: I am a child of the request coroutine
main: Who has survived request cancellation?
job1: I am not affected by cancellation of the request
```



### 父级职责

父级协程始终等待其所有子级协程完成。父级协程不必明确跟踪其启动的所有子级协程，也不必在最后使用 Job.join 等待它们：

```kotlin
fun main() = runBlocking<Unit> {
    // launch a coroutine to process some kind of incoming request
    val request = launch {
        repeat(3) { i -> // launch a few children jobs
            launch  {
                delay((i + 1) * 200L) // variable delay 200ms, 400ms, 600ms
                println("Coroutine $i is done")
            }
        }
        println("request: I'm done and I don't explicitly join my children that are still active")
    }
    request.join() // wait for completion of the request, including all its children
    println("Now processing of the request is complete")
}
```

输出:

```
request: I'm done and I don't explicitly join my children that are still active
Coroutine 0 is done
Coroutine 1 is done
Coroutine 2 is done
Now processing of the request is complete
```



### 命名协程以便于调试

当协程经常记录日志并且您只需要关联来自同一协程的日志记录时，自动分配的 ID 非常有用。但是，当协程与特定请求的处理或执行某些特定后台任务相关联时，最好明确命名它以进行调试。CoroutineName 上下文元素的用途与线程名称相同。当调试模式打开时，它包含在执行此协程的线程名称中。

以下示例演示了此概念：

```kotlin
fun log08(msg: String) = println("[${Thread.currentThread().name}] $msg")

// -Dkotlinx.coroutines.debug
fun main() = runBlocking(CoroutineName("main")) {
    log08("Started main coroutine")
    // run two background value computations
    val v1 = async(CoroutineName("v1coroutine")) {
        delay(500)
        log08("Computing v1")
        6
    }
    val v2 = async(CoroutineName("v2coroutine")) {
        delay(1000)
        log08("Computing v2")
        7
    }
    log08("The answer for v1 * v2 = ${v1.await() * v2.await()}")
}
```

输出：

```
[main @main#1] Started main coroutine
[main @v1coroutine#2] Computing v1
[main @v2coroutine#3] Computing v2
[main @main#1] The answer for v1 * v2 = 42
```



### 组合上下文元素

有时我们需要为协程上下文定义多个元素。我们可以使用 + 运算符。例如，我们可以同时使用显式指定的调度程序和显式指定的名称来启动协程：

```kotlin
// -Dkotlinx.coroutines.debug
fun main() = runBlocking<Unit> {
    launch(Dispatchers.Default + CoroutineName("test")) {
        println("I'm working in thread ${Thread.currentThread().name}")
    }
}
```

输出:

```
I'm working in thread DefaultDispatcher-worker-1 @test#2
```



### 协程作用域

让我们将关于上下文、子级和作业的知识放在一起。假设我们的应用程序有一个具有生命周期的对象，但该对象不是协程。例如，我们正在编写一个 Android 应用程序，并在 Android 活动的上下文中启动各种协程来执行异步操作以获取和更新数据、制作动画等。当活动被销毁时，所有这些协程都必须取消，以避免内存泄漏。当然，我们可以手动操作上下文和作业来绑定活动及其协程的生命周期，但 kotlinx.coroutines 提供了一个封装它的抽象：CoroutineScope。您应该已经熟悉协程范围，因为所有协程构建器都声明为它的扩展。

我们通过创建与活动生命周期绑定的 CoroutineScope 实例来管理协程的生命周期。CoroutineScope 实例可以通过 CoroutineScope() 或 MainScope() 工厂函数创建。前者创建通用范围，而后者为 UI 应用程序创建范围并使用 Dispatchers.Main 作为默认调度程序：

```kotlin
class Activity {
	private val mainScope = MainScope()

fun destroy() {
	mainScope.cancel()
}
// 未完待续...
```

现在，我们可以使用定义的 mainScope 在此 Activity 范围内启动协程。为了演示，我们启动了十个延迟不同时间的协程：

```kotlin
// class Activity continues
    fun doSomething() {
        // launch ten coroutines for a demo, each working for a different time
        repeat(10) { i ->
            mainScope.launch {
                delay((i + 1) * 200L) // variable delay 200ms, 400ms, ... etc
                println("Coroutine $i is done")
            }
        }
    }
} // class Activity ends
```

在主函数中，我们创建活动，调用测试 doSomething 函数，并在 500 毫秒后销毁活动。这将取消从 doSomething 启动的所有协程。我们可以看到，因为在活动销毁后，即使我们等待更长时间，也不会再打印任何消息。

```kotlin
class Activity {
    private val mainScope = CoroutineScope(Dispatchers.Default) // use Default for test purposes

    fun destroy() {
        mainScope.cancel()
    }

    fun doSomething() {
        // launch ten coroutines for a demo, each working for a different time
        repeat(10) { i ->
            mainScope.launch {
                delay((i + 1) * 200L) // variable delay 200ms, 400ms, ... etc
                println("Coroutine $i is done")
            }
        }
    }
} // class Activity ends

fun main() = runBlocking<Unit> {
    val activity = Activity()
    activity.doSomething() // run test function
    println("Launched coroutines")
    delay(500L) // delay for half a second
    println("Destroying activity!")
    activity.destroy() // cancels all coroutines
    delay(1000) // visually confirm that they don't work
}
```

输出：

```
Launched coroutines
Coroutine 0 is done
Coroutine 1 is done
Destroying activity!
```

如您所见，只有前两个协程打印了消息，其他协程都通过在 Activity.destroy() 中调用一次 job.cancel() 来取消。

> 请注意，Android 对所有具有生命周期的实体中的协程范围均提供第一方支持。请参阅[相应的文档](https://developer.android.com/topic/libraries/architecture/coroutines#lifecyclescope)。



### 线程本地数据

有时，能够将一些线程本地数据传递到协程或协程之间会很方便。但是，由于它们不绑定到任何特定线程，如果手动完成，这可能会导致样板。

对于 ThreadLocal，asContextElement 扩展函数可以解决这个问题。它创建一个额外的上下文元素，该元素保留给定 ThreadLocal 的值，并在协程每次切换其上下文时恢复它。

```kotlin
val threadLocal = ThreadLocal<String?>() // declare thread-local variable

fun main() = runBlocking<Unit> {
    threadLocal.set("main")
    println("Pre-main, current thread: ${Thread.currentThread()}, thread local value: '${threadLocal.get()}'")
    val job = launch(Dispatchers.Default + threadLocal.asContextElement(value = "launch")) {
        println("Launch start, current thread: ${Thread.currentThread()}, thread local value: '${threadLocal.get()}'")
        yield()
        println("After yield, current thread: ${Thread.currentThread()}, thread local value: '${threadLocal.get()}'")
    }
    job.join()
    println("Post-main, current thread: ${Thread.currentThread()}, thread local value: '${threadLocal.get()}'")
}
```

在此示例中，我们使用 Dispatchers.Default 在后台线程池中启动一个新的协程，因此它在与线程池不同的线程上工作，但它仍然具有我们使用 threadLocal.asContextElement(value = "launch") 指定的线程局部变量的值，无论协程在哪个线程上执行。因此，输出（带调试）为：

```
Pre-main, current thread: Thread[#1,main,5,main], thread local value: 'main'
Launch start, current thread: Thread[#22,DefaultDispatcher-worker-2,5,main], thread local value: 'launch'
After yield, current thread: Thread[#22,DefaultDispatcher-worker-2,5,main], thread local value: 'launch'
Post-main, current thread: Thread[#1,main,5,main], thread local value: 'main'
```

很容易忘记设置相应的上下文元素。如果运行协程的线程不同，则从协程访问的线程局部变量可能会具有意外值。为避免这种情况，建议使用ensurePresent方法并在使用不当时快速失败。

ThreadLocal具有一流的支持，可以与kotlinx.coroutines提供的任何原语一起使用。但它有一个关键的限制：当线程局部发生变异时，新值不会传播到协程调用者（因为上下文元素无法跟踪所有ThreadLocal对象访问），并且更新的值会在下一次暂停时丢失。使用[withContext](https://kotlinlang.org/api/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines/with-context.html)更新协程中线程局部的值，有关更多详细信息，请参阅[asContextElement](https://kotlinlang.org/api/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines/as-context-element.html)。

或者，可以将值存储在可变框中，例如类Counter（var i：Int），而可变框又存储在线程局部变量中。但是，在这种情况下，您完全有责任同步此可变框中变量的潜在并发修改。

对于高级用法，例如与日志记录 MDC、事务上下文或内部使用线程本地传递数据的任何其他库的集成，请参阅应实现的 [ThreadContextElement](https://kotlinlang.org/api/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines/-thread-context-element/) 接口的文档。



[原文链接](https://kotlinlang.org/docs/coroutine-context-and-dispatchers.html)