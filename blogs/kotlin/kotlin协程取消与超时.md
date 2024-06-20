---
title: kotlin协程取消与超时
date: 2024-06-20
tags:
  - kotlin
---

### 取消协程执行﻿

在长时间运行的应用程序中，您可能需要对后台协程进行细粒度控制。例如，用户可能关闭了启动协程的页面，现在不再需要其结果，并且可以取消其操作。

[launch](https://kotlinlang.org/api/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines/launch.html)函数一个可用于取消正在运行的协程的[job](https://kotlinlang.org/api/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines/-job/index.html)

```kotlin
fun main() = runBlocking {
    val job = launch {
        repeat(1000) { i ->
            println("job: I'm sleeping $i ...")
            delay(500L)
        }
    }
    delay(1300L) // delay a bit
    println("main: I'm tired of waiting!")
//    job.cancel() // cancels the job
//    job.join() // waits for job's completion
    job.cancelAndJoin()
    println("main: Now I can quit.")
}
```

输出：

```
job: I'm sleeping 0 ...
job: I'm sleeping 1 ...
job: I'm sleeping 2 ...
main: I'm tired of waiting!
main: Now I can quit.
```

一旦 main 调用`job.cancel`，我们就看不到来自其他协程的任何输出，因为它已被取消。还有一个[Job](https://kotlinlang.org/api/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines/-job/index.html)扩展函数[cancelAndJoin](https://kotlinlang.org/api/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines/cancel-and-join.html)，它结合了[cancel](https://kotlinlang.org/api/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines/cancel.html)和[join](https://kotlinlang.org/api/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines/-job/join.html)调用。



### 取消是协作的

协程取消是协作的。**协程代码必须协作才能取消**。kotlinx.coroutines 中的所有挂起函数都是可取消的。它们检查协程是否取消，并在取消时抛出 CancellationException。但是，**如果协程正在计算中工作并且没有检查取消，则无法取消**，如下例所示：

```kotlin
fun main() = runBlocking {
    val startTime = currentTimeMillis()
    val job = launch(Dispatchers.Default) {
        var nextPrintTime = startTime
        var i = 0
        while (i < 5) { // computation loop, just wastes CPU
            // print a message twice a second
            if (currentTimeMillis() >= nextPrintTime) {
                println("job: I'm sleeping ${i++} ...")
                nextPrintTime += 500L
            }
        }
    }
    delay(1300L) // delay a bit
    println("main: I'm tired of waiting!")
    job.cancelAndJoin() // cancels the job and waits for its completion
    println("main: Now I can quit.")
}
```

输出：

```
job: I'm sleeping 0 ...
job: I'm sleeping 1 ...
job: I'm sleeping 2 ...
main: I'm tired of waiting!
job: I'm sleeping 3 ...
job: I'm sleeping 4 ...
main: Now I can quit.
```

运行它，你会发现它即使在取消后仍会继续打印“我正在睡觉”，直到作业在五次迭代后自行完成。

通过捕获 CancellationException 并且不重新抛出它，可以观察到同样的问题：

```kotlin
fun main() = runBlocking {
    val job = launch(Dispatchers.Default) {
        repeat(5) { i ->
            try {
                // print a message twice a second
                println("job: I'm sleeping $i ...")
                delay(500)
            } catch (e: Exception) {
                // log the exception
                println(e)
            }
        }
    }
    delay(1300L) // delay a bit
    println("main: I'm tired of waiting!")
    job.cancelAndJoin() // cancels the job and waits for its completion
    println("main: Now I can quit.")
}
```

输出：

```
job: I'm sleeping 0 ...
job: I'm sleeping 1 ...
job: I'm sleeping 2 ...
main: I'm tired of waiting!
kotlinx.coroutines.JobCancellationException: StandaloneCoroutine was cancelled; job=StandaloneCoroutine{Cancelling}@3fbfa674
job: I'm sleeping 3 ...
kotlinx.coroutines.JobCancellationException: StandaloneCoroutine was cancelled; job=StandaloneCoroutine{Cancelling}@3fbfa674
job: I'm sleeping 4 ...
kotlinx.coroutines.JobCancellationException: StandaloneCoroutine was cancelled; job=StandaloneCoroutine{Cancelling}@3fbfa674
main: Now I can quit.
```

虽然捕获异常是一种反模式，但这个问题可能以更微妙的方式出现，比如当使用 runCatching 函数时，它不会重新抛出 CancellationException。



### 使计算代码可取消

有两种方法可以使计算代码可取消。第一种方法是定期调用检查取消的挂起函数。有一个yield函数是实现此目的的不错选择。另一种方法是明确检查取消状态。让我们尝试后一种方法。

将上一个示例中的while (i < 5)替换为while (isActive)并重新运行它。

```kotlin
fun main() = runBlocking {
    val startTime = currentTimeMillis()
    val job = launch(Dispatchers.Default) {
        var nextPrintTime = startTime
        var i = 0
        while (isActive) { // cancellable computation loop
            // print a message twice a second
            if (currentTimeMillis() >= nextPrintTime) {
                println("job: I'm sleeping ${i++} ...")
                nextPrintTime += 500L
            }
        }
    }
    delay(1300L) // delay a bit
    println("main: I'm tired of waiting!")
    job.cancelAndJoin() // cancels the job and waits for its completion
    println("main: Now I can quit.")
}
```

输出：

```
job: I'm sleeping 0 ...
job: I'm sleeping 1 ...
job: I'm sleeping 2 ...
main: I'm tired of waiting!
main: Now I can quit.
```

如你所见，现在这个循环被取消了。isActive 是一个可通过 CoroutineScope 对象在协程内部使用的扩展属性。



### 使用 finally 关闭资源

可取消挂起函数在取消时会抛出 CancellationException，这可以按常规方式处理。例如，try {...} finally {...} 表达式和 Kotlin 的 use 函数在协程取消时正常执行其终止操作：

```kotlin
fun main() = runBlocking {
    val job = launch {
        try {
            repeat(1000) { i ->
                println("job: I'm sleeping $i ...")
                delay(500L)
            }
        } finally {
            println("job: I'm running finally")
        }
    }
    delay(1300L) // delay a bit
    println("main: I'm tired of waiting!")
    job.cancelAndJoin() // cancels the job and waits for its completion
    println("main: Now I can quit.")
}
```

输出：

```
job: I'm sleeping 0 ...
job: I'm sleeping 1 ...
job: I'm sleeping 2 ...
main: I'm tired of waiting!
job: I'm running finally
main: Now I can quit.
```



### 运行不可取消(non-cancellable)的块

任何试图在上例的 finally 块中使用暂停函数的行为都会导致 CancellationException，因为运行此代码的协程已被取消。通常，这不是问题，因为所有行为良好的关闭操作（关闭文件、取消作业或关闭任何类型的通信通道）通常都是非阻塞的，并且不涉及任何暂停函数。然而，在极少数情况下，当你需要在已取消的协程中暂停时，你可以使用 withContext 函数和 NonCancellable 上下文将相应的代码包装在 withContext(NonCancellable) {...} 中，如下例所示：

```kotlin
fun main() = runBlocking {
    val job = launch {
        try {
            repeat(1000) { i ->
                println("job: I'm sleeping $i ...")
                delay(500L)
            }
        } finally {
            withContext(NonCancellable) {
                println("job: I'm running finally")
                delay(1000L)
                println("job: And I've just delayed for 1 sec because I'm non-cancellable")
            }
        }
    }
    delay(1300L) // delay a bit
    println("main: I'm tired of waiting!")
    job.cancelAndJoin() // cancels the job and waits for its completion
    println("main: Now I can quit.")
}
```

输出：

```
job: I'm sleeping 0 ...
job: I'm sleeping 1 ...
job: I'm sleeping 2 ...
main: I'm tired of waiting!
job: I'm running finally
job: And I've just delayed for 1 sec because I'm non-cancellable
main: Now I can quit.
```



### 超时

取消执行协程的最明显的实际原因是**其执行时间已超过某个超时值**。虽然您可以手动跟踪对相应作业的引用，并启动单独的协程以在延迟后取消跟踪的协程，但有一个现成的 withTimeout 函数可以执行此操作。请看以下示例：

```kotlin
fun main() = runBlocking {
    withTimeout(1300L) {
        repeat(1000) { i ->
            println("I'm sleeping $i ...")
            delay(500L)
        }
    }
}
```

输出：

```
I'm sleeping 0 ...
I'm sleeping 1 ...
I'm sleeping 2 ...
Exception in thread "main" kotlinx.coroutines.TimeoutCancellationException: Timed out waiting for 1300 ms
	at kotlinx.coroutines.TimeoutKt.TimeoutCancellationException(Timeout.kt:188)
	at kotlinx.coroutines.TimeoutCoroutine.run(Timeout.kt:156)
	at kotlinx.coroutines.EventLoopImplBase$DelayedRunnableTask.run(EventLoop.common.kt:505)
	at kotlinx.coroutines.EventLoopImplBase.processNextEvent(EventLoop.common.kt:263)
	at kotlinx.coroutines.DefaultExecutor.run(DefaultExecutor.kt:105)
	at java.base/java.lang.Thread.run(Thread.java:1583)
```

withTimeout 抛出的 TimeoutCancellationException 是 CancellationException 的子类。我们之前没有看到过控制台上打印的堆栈跟踪。这是因为在取消的协程中，CancellationException 被认为是协程完成的正常原因。但是，在这个例子中，我们在主函数内部使用了 withTimeout。

由于取消只是一种异常，因此所有资源都以通常的方式关闭。如果您需要针对任何类型的超时执行一些其他操作，您可以将带有超时的代码包装在 try {...} catch (e: TimeoutCancellationException) {...} 块中，或者使用与 withTimeout 类似的 withTimeoutOrNull 函数，但在超时时返回 null 而不是抛出异常：

```kotlin
fun main() = runBlocking {
    val result = withTimeoutOrNull(1300L) {
        repeat(1000) { i ->
            println("I'm sleeping $i ...")
            delay(500L)
        }
        "Done" // will get cancelled before it produces this result
    }
    println("Result is $result")
}
```

输出：

```
I'm sleeping 0 ...
I'm sleeping 1 ...
I'm sleeping 2 ...
Result is null
```



### 异步超时和资源

withTimeout 中的超时事件相对于其块中运行的代码是异步的，并且可能随时发生，甚至在从超时块内部返回之前。如果您在块内打开或获取一些需要在块外关闭或释放的资源，请记住这一点。

例如，在这里我们使用 Resource 类模拟可关闭的资源，该资源类通过增加获取的计数器并在其 close 函数中减少计数器来简单地跟踪创建了多少次。现在让我们创建许多协程，每个协程在 withTimeout 块的末尾创建一个资源并在块外释放资源。我们添加了一个小的延迟，以便更有可能在 withTimeout 块已经完成时发生超时，这将导致资源泄漏。

```kotlin
var acquired = 0

class Resource {
    init { acquired++ } // Acquire the resource
    fun close() { acquired-- } // Release the resource
}

fun main() {
    runBlocking {
        repeat(10_000) { // Launch 10K coroutines
            launch {
                val resource = withTimeout(60) { // Timeout of 60 ms
                    delay(50) // Delay for 50 ms
                    Resource() // Acquire a resource and return it from withTimeout block
                }
                resource.close() // Release the resource
            }
        }
    }
    // Outside of runBlocking all coroutines have completed
    println(acquired) // Print the number of resources still acquired
}
```

输出：

```
不一定是0
```

为了解决这个问题，您可以将对资源的引用存储在变量中，而不是从 withTimeout 块返回它。

```kotlin
var acquired10 = 0

class Resource10 {
    init { acquired10++ } // Acquire the resource
    fun close() { acquired10-- } // Release the resource
}

fun main() {
    runBlocking {
        repeat(10_000) { // Launch 10K coroutines
            launch {
                var resource: Resource10? = null // Not acquired yet
                try {
                    withTimeout(60) { // Timeout of 60 ms
                        delay(50) // Delay for 50 ms
                        resource = Resource10() // Store a resource to the variable if acquired
                    }
                    // We can do something else with the resource here
                } finally {
                    resource?.close() // Release the resource if it was acquired
                }
            }
        }
    }
    // Outside of runBlocking all coroutines have completed
    println(acquired10) // Print the number of resources still acquired
}
```



[原文链接](https://kotlinlang.org/docs/cancellation-and-timeouts.html)

