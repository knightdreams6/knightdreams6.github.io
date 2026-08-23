---
title: kotlin协程基础知识
date: 2024-06-07
tags:
  - kotlin
---

协程是可暂停计算的一个实例。它在概念上类似于线程，因为它需要运行一段代码，该代码块与其余代码同时运行。但是，协程并不绑定到任何特定线程。它可以在一个线程中暂停执行，并在另一个线程中恢复执行。

协程可以被认为是轻量级线程，但是存在许多重要的区别，使得它们在实际使用与线程有很大不同。

运行以下代码以获取第一个工作协程：

```kotlin
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import kotlinx.coroutines.runBlocking

fun main() = runBlocking { // this: CoroutineScope
    launch { // 启用一个新的协程并继续
        delay(1000L) // 非阻塞延迟一秒
        println("World!") // 延迟后打印
    }
    println("Hello") // 主协程继续，前一个协程被延迟
}
```

输出

```
Hello
World!
```

[launch](https://kotlinlang.org/api/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines/launch.html)是一个*协程构建器*。它与其余代码同时启动一个新的协程，其余代码继续独立工作。这就是为什么`Hello` 被首先打印出来。

[delay](https://kotlinlang.org/api/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines/delay.html)是一个特殊的*暂停函数*。它会将协程*暂停*一段特定的时间。暂停协程不会*阻塞*底层线程，但允许其他协程运行并使用底层线程执行其代码。

[runBlocking](https://kotlinlang.org/api/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines/run-blocking.html)也是一个协程构建器，它将常规的非协程世界`fun main()`与花括号内的协程代码连接起来`runBlocking { ... }`。在 IDE 中，花括号`this: CoroutineScope`后面的提示会突出显示`runBlocking`。

`runBlocking`意味着运行它的线程（在本例中是主线程）在调用期间被*阻塞*`runBlocking { ... }`，直到里面的所有协程完成执行。在实际代码中很少看到这么使用，因为线程是昂贵的资源，阻塞它们是低效的。

### 结构化并发﻿

**协程遵循结构化并发**原则，这意味着只能在特定的[CoroutineScope](https://kotlinlang.org/api/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines/-coroutine-scope/index.html)中启动新的协程，该 CoroutineScope 限定了协程的生命周期。上面的示例表明[runBlocking](https://kotlinlang.org/api/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines/run-blocking.html)建立了相应的范围，这就是为什么上一个示例在延迟一秒钟后等待直到`World!`打印出来才退出。

在实际应用中，您将启动大量协程。结构化并发可确保它们不会丢失且不会泄漏。外部作用域在其所有子协程完成之前无法完成。结构化并发还可确保正确报告代码中的任何错误并且绝不会丢失。

### 提取函数重构

```kotlin
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import kotlinx.coroutines.runBlocking

fun main() = runBlocking { // this: CoroutineScope
    launch { doWorld() }
    println("Hello")
}

suspend fun doWorld() {
    delay(1000L)
    println("World!")
}
```

### 作用域构建器

除了不同构建器提供的协程作用域外，还可以使用[coroutineScope](https://kotlinlang.org/api/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines/coroutine-scope.html)构建器声明自己的作用域。它会创建一个协程作用域，直到所有启动的子进程完成才会完成。

[runBlocking](https://kotlinlang.org/api/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines/run-blocking.html)和[coroutineScope](https://kotlinlang.org/api/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines/coroutine-scope.html)构建器可能看起来相似，因为它们都等待其主体及其所有子级完成。主要区别在于[runBlocking](https://kotlinlang.org/api/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines/run-blocking.html)方法*会阻止*当前线程等待，而[coroutineScope](https://kotlinlang.org/api/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines/coroutine-scope.html)只是暂停，释放底层线程以供其他用途。由于这种差异，[runBlocking](https://kotlinlang.org/api/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines/run-blocking.html)是一个常规函数，而[coroutineScope](https://kotlinlang.org/api/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines/coroutine-scope.html)是一个暂停函数。

您可以从任何暂停函数中使用。例如，您可以将和`coroutineScope`的并发打印移到函数中：`Hello World suspend fun doWorld()`

```kotlin
fun main() = runBlocking {
    doWorld()
}

suspend fun doWorld() = coroutineScope {  // this: CoroutineScope
    launch {
        delay(1000L)
        println("World!")
    }
    println("Hello")
}
```

### 范围构建器和并发

[协程作用域](https://kotlinlang.org/api/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines/coroutine-scope.html)构建器可在任何挂起函数内使用，以执行多个并发操作。让我们在`doWorld`挂起函数内启动两个并发协程：

```kotlin
import kotlinx.coroutines.coroutineScope
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import kotlinx.coroutines.runBlocking

// Sequentially executes doWorld followed by "Done"
fun main() = runBlocking {
    doWorld()
    println("Done")
}

// Concurrently executes both sections
suspend fun doWorld() = coroutineScope { // this: CoroutineScope
    launch {
        delay(2000L)
        println("World 2")
    }
    launch {
        delay(1000L)
        println("World 1")
    }
    println("Hello")
}
```

输出

```
Hello
World 1
World 2
Done
```

### 明确的工作

[启动](https://kotlinlang.org/api/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines/launch.html)协程构建器返回一个[Job](https://kotlinlang.org/api/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines/-job/index.html)对象，该对象是已启动协程的句柄，可用于显式等待其完成。例如，您可以等待子协程完成，然后打印“Done”字符串：

```kotlin
package org.example.coroutines

import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import kotlinx.coroutines.runBlocking

fun main() = runBlocking {

    val job = launch { // launch a new coroutine and keep a reference to its Job
        delay(1000L)
        println("World!")
    }
    println("Hello")
    job.join() // wait until child coroutine completes
    println("Done")

}
```

输出

```
Hello
World!
Done
```

### 协程是轻量级的

协程比 JVM 线程占用的资源更少。使用线程时耗尽 JVM 可用内存的代码可以使用协程来表达，而不会达到资源限制。例如，以下代码启动 50,000 个不同的协程，每个协程等待 5 秒，然后打印一个句点（“。”），同时消耗很少的内存：

```kotlin
import kotlinx.coroutines.runBlocking
import kotlinx.coroutines.launch
import kotlinx.coroutines.delay

fun main() = runBlocking {
    repeat(50_000) { // launch a lot of coroutines
        launch {
            delay(5000L)
            print(".")
        }
    }
}
```



[原文链接](https://kotlinlang.org/docs/coroutines-basics.html)