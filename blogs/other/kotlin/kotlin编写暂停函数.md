---
title: kotlin编写暂停函数
date: 2024-06-20
tags:
  - kotlin
---



### 默认顺序

假设我们在其他地方定义了两个暂停函数，它们执行一些有用的操作，例如某种远程服务调用或计算。

```kotlin
suspend fun doSomethingUsefulOne(): Int {
    delay(1000L) // pretend we are doing something useful here
    return 13
}

suspend fun doSomethingUsefulTwo(): Int {
    delay(1000L) // pretend we are doing something useful here, too
    return 29
}
```

如果我们需要按顺序调用它们，我们该怎么做——首先调用 doSomethingUsefulOne，然后调用 doSomethingUsefulTwo，并计算它们的结果之和？实际上，如果我们使用第一个函数的结果来决定是否需要调用第二个函数或决定如何调用它，我们就会这样做。



我们使用正常的顺序调用，因为协程中的代码与常规代码一样，默认情况下是顺序的

```kotlin
fun main() = runBlocking<Unit> {
    val time = measureTimeMillis {
        val one = doSomethingUsefulOne()
        val two = doSomethingUsefulTwo()
        println("The answer is ${one + two}")
    }
    println("Completed in $time ms")
}

suspend fun doSomethingUsefulOne(): Int {
    delay(1000L) // pretend we are doing something useful here
    return 13
}

suspend fun doSomethingUsefulTwo(): Int {
    delay(1000L) // pretend we are doing something useful here, too
    return 29
}
```

输出：

```
The answer is 42
Completed in 2031 ms
```



### 使用异步并发

如果 doSomethingUsefulOne 和 doSomethingUsefulTwo 的调用之间没有依赖关系，而我们想通过同时执行这两个调用来更快地得到答案，该怎么办？这时 **async** 就可以派上用场了。

从概念上讲，async 就像 launch 一样。它启动一个单独的协程，这是一个轻量级线程，可以与所有其他协程同时工作。**不同之处在于 launch 返回一个 Job，不携带任何结果值，而 async 返回一个 Deferred — 一个轻量级非阻塞未来，代表承诺稍后提供结果**。您可以在延迟值上使用 .await() 来获取其最终结果，但 Deferred 也是一个 Job，因此您可以在需要时取消它。

```kotlin
fun main() = runBlocking<Unit> {
    val time = measureTimeMillis {
        val one = async { doSomethingUsefulOne02() }
        val two = async { doSomethingUsefulTwo02() }
        println("The answer is ${one.await() + two.await()}")
    }
    println("Completed in $time ms")
}

suspend fun doSomethingUsefulOne02(): Int {
    delay(1000L) // pretend we are doing something useful here
    return 13
}

suspend fun doSomethingUsefulTwo02(): Int {
    delay(1000L) // pretend we are doing something useful here, too
    return 29
}
```

输出：

```
The answer is 42
Completed in 1020 ms
```



### 懒惰启动异步

可选地，可以通过将 async 的 start 参数设置为 CoroutineStart.LAZY 来使其变为惰性。在此模式下，它仅在 await 需要其结果时或其 Job 的 start 函数被调用时才启动协程。运行以下示例：

```kotlin
fun main() = runBlocking<Unit> {
    val time = measureTimeMillis {
        val one = async(start = CoroutineStart.LAZY) { doSomethingUsefulOne03() }
        val two = async(start = CoroutineStart.LAZY) { doSomethingUsefulTwo03() }
        // some computation
        one.start() // start the first one
        two.start() // start the second one
        println("The answer is ${one.await() + two.await()}")
    }
    println("Completed in $time ms")
}

suspend fun doSomethingUsefulOne03(): Int {
    delay(1000L) // pretend we are doing something useful here
    return 13
}

suspend fun doSomethingUsefulTwo03(): Int {
    delay(1000L) // pretend we are doing something useful here, too
    return 29
}
```

结果:

```
The answer is 42
Completed in 1026 ms
```

因此，这里定义了两个协程，但并未像上例一样执行，而是通过调用 start 将何时开始执行的控制权交给了程序员。我们首先启动一个，然后启动两个，然后等待各个协程完成。

请注意，如果我们只是在 println 中调用 await，而没有先在各个协程上调用 start，这将导致顺序行为，因为 await 启动协程执行并等待其完成，这不是惰性的预期用例。async(start = CoroutineStart.LAZY) 的用例是在值的计算涉及暂停函数的情况下替代标准惰性函数。



### 异步样式函数

> 这里提供的这种使用异步函数的编程风格仅用于说明，因为它是其他编程语言中的流行风格。出于以下原因，强烈建议不要将此风格用于 Kotlin 协程。

我们可以定义异步样式的函数，使用异步协程构建器异步调用 doSomethingUsefulOne 和 doSomethingUsefulTwo，并使用 GlobalScope 引用来退出结构化并发。我们用“...Async”后缀命名此类函数，以强调它们仅启动异步计算，并且需要使用生成的延迟值来获取结果。

GlobalScope 是一个微妙的 API，它可能以非平凡的方式产生适得其反的效果，其中一种将在下面解释，因此您必须明确选择使用带有 @OptIn(DelicateCoroutinesApi::class) 的 GlobalScope。

请注意，这些 xxxAsync 函数不是暂停函数。它们可以在任何地方使用。但是，它们的使用始终意味着其操作与调用代码异步（此处表示并发）执行。

以下示例显示了它们在协程之外的使用：

```kotlin
// note that we don't have `runBlocking` to the right of `main` in this example
fun main() {
    val time = measureTimeMillis {
        // we can initiate async actions outside of a coroutine
        val one = somethingUsefulOneAsync()
        val two = somethingUsefulTwoAsync()
        // but waiting for a result must involve either suspending or blocking.
        // here we use `runBlocking { ... }` to block the main thread while waiting for the result
        runBlocking {
            println("The answer is ${one.await() + two.await()}")
        }
    }
    println("Completed in $time ms")
}

@OptIn(DelicateCoroutinesApi::class)
fun somethingUsefulOneAsync() = GlobalScope.async {
    doSomethingUsefulOne04()
}

@OptIn(DelicateCoroutinesApi::class)
fun somethingUsefulTwoAsync() = GlobalScope.async {
    doSomethingUsefulTwo04()
}

suspend fun doSomethingUsefulOne04(): Int {
    delay(1000L) // pretend we are doing something useful here
    return 13
}

suspend fun doSomethingUsefulTwo04(): Int {
    delay(1000L) // pretend we are doing something useful here, too
    return 29
}
```

输出：

```
The answer is 42
Completed in 1063 ms
```

考虑一下，如果在 val one = somethingUsefulOneAsync() 行和 one.await() 表达式之间代码中存在一些逻辑错误，程序会抛出异常，程序正在执行的操作会中止，会发生什么情况。通常，全局错误处理程序可以捕获此异常，记录并向开发人员报告错误，但程序可以继续执行其他操作。但是，这里 somethingUsefulOneAsync 仍在后台运行，即使启动它的操作已中止。如以下部分所示，结构化并发不会发生此问题。



### 使用异步进行结构化并发

让我们以 Concurrent 使用异步为例，并提取一个同时执行 doSomethingUsefulOne 和 doSomethingUsefulTwo 并返回其结果总和的函数。由于异步协程构建器被定义为 CoroutineScope 的扩展，因此我们需要将其放在范围内，这就是 coroutineScope 函数所提供的：

这样，如果 concurrentSum 函数的代码内部出现问题并引发异常，则其范围内启动的所有协程都将被取消。

```kotlin
fun main() = runBlocking<Unit> {
    val time = measureTimeMillis {
        println("The answer is ${concurrentSum()}")
    }
    println("Completed in $time ms")
}

suspend fun concurrentSum(): Int = coroutineScope {
    val one = async { doSomethingUsefulOne05() }
    val two = async { doSomethingUsefulTwo05() }
    one.await() + two.await()
}

suspend fun doSomethingUsefulOne05(): Int {
    delay(1000L) // pretend we are doing something useful here
    return 13
}

suspend fun doSomethingUsefulTwo05(): Int {
    delay(1000L) // pretend we are doing something useful here, too
    return 29
}
```

结果：

```
The answer is 42
Completed in 1028 ms
```



取消总是通过协程层次结构传播：

```kotlin
fun main() = runBlocking<Unit> {
    try {
        failedConcurrentSum()
    } catch(e: ArithmeticException) {
        println("Computation failed with ArithmeticException")
    }
}

suspend fun failedConcurrentSum(): Int = coroutineScope {
    val one = async<Int> {
        try {
            delay(Long.MAX_VALUE) // Emulates very long computation
            42
        } finally {
            println("First child was cancelled")
        }
    }
    val two = async<Int> {
        println("Second child throws an exception")
        throw ArithmeticException()
    }
    one.await() + two.await()
}
```

请注意，当其中一个子进程（即两个）失败时，第一个异步进程和正在等待的父进程都会被取消：

```
Second child throws an exception
First child was cancelled
Computation failed with ArithmeticException
```

[原文链接](https://kotlinlang.org/docs/composing-suspending-functions.html)