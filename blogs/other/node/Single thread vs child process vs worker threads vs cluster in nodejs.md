---
title: Single thread vs child process vs worker threads vs cluster in nodejs
date: 2023-11-10
tags:
  - node
---

# Single thread vs child process vs worker threads vs cluster in nodejs


### 问题

执行输入-输出绑定操作，例如响应 Http 请求、与数据库对话、与其他服务器对话，是 Nodejs 应用程序的亮点领域。 这是因为它的单线程特性使得能够以较低的系统资源消耗快速处理许多请求。 但是，执行 CPU 密集型操作（例如计算数字的斐波那契数或检查数字是否为素数或繁重的机器学习内容）将使应用程序陷入困境，因为无论您有多少个核心，节点都只使用 CPU 的单个核心。

如果我们在 Web 应用程序的上下文中运行这种繁重的 CPU 密集型操作，节点的单线程将被阻塞，因此 Web 服务器将无法响应任何请求，因为它正忙于计算我们的大斐波那契或其他东西。

```javascript
const express = require("express")
const app = express()

app.get("/getfibonacci", (req: any, res: any) => {
  const startTime = new Date()
  const result = fibonacci(parseInt(req.query.number)) //parseInt is for converting string to number
  const endTime = new Date()
  res.json({
    number: parseInt(req.query.number),
    fibonacci: result,
    time: endTime.getTime() - startTime.getTime() + "ms",
  })
})

app.get("/testrequest", (req: any, res: any) => {
  res.send("I am unblocked now")
})

const fibonacci = (n: number): number => {
  if (n <= 1) {
    return 1
  }

  return fibonacci(n - 1) + fibonacci(n - 2)
}

app.listen(3000, () => console.log("listening on port 3000"))
```



### 解决

* child processes
* cluster
* worker threads



#### child processes

child_process 模块提供了生成拥有自己的内存的新进程的能力。 这些进程之间的通信是通过操作系统提供的IPC（进程间通信）建立的。

我们关心的这个模块内部主要有3个方法。

child_process.spawn()
child_process.fork()
child_process.exec()



##### child_process.spawn()

该方法用于异步生成子进程。 该子进程可以是可以从终端运行的任何命令。

spawn 采用以下语法：spawn("要运行的命令","参数数组",optionsObject)

optionsObject 有多种设置，可以在 Nodejs 官方文档中找到。

下面的代码使用参数 -lash 和查询字符串中的目录名称生成一个 ls（列表目录）进程，并将其输出发回。

**childspawnServer.js**

```javascript
const express = require("express")
const app = express()
const { spawn } = require("child_process") //equal to const spawn = require('child_process').spawn

app.get("/ls", (req, res) => {
  const ls = spawn("ls", ["-lash", req.query.directory])
  ls.stdout.on("data", data => {
    //Pipe (connection) between stdin,stdout,stderr are established between the parent
    //node.js process and spawned subprocess and we can listen the data event on the stdout

    res.write(data.toString()) //date would be coming as streams(chunks of data)
    // since res is a writable stream,we are writing to it
  })
  ls.on("close", code => {
    console.log(`child process exited with code ${code}`)
    res.end() //finally all the written streams are send back when the subprocess exit
  })
})

app.listen(7000, () => console.log("listening on port 7000"))
```



##### child_process.fork() 

child_process.fork() 专门用于生成新的 Nodejs 进程。 与spawn一样，返回的childProcess对象将具有内置的IPC通信通道，允许消息在父进程和子进程之间来回传递。

fork 采用以下语法：- fork("模块路径","参数数组","optionsObject")

optionsObject 有多种设置，可以在 Nodejs 官方文档中找到。

使用fork()，我们可以通过fork一个单独的nodejs进程并在该进程中执行函数并在完成时将答案返回给父进程来解决上面讨论的问题。 这样，父进程就不会被阻塞，可以继续响应请求。

```javascript
const express = require("express")
const app = express()
const { fork } = require("child_process")

app.get("/isprime", (req, res) => {
  const childProcess = fork("./forkedchild.js") //the first argument to fork() is the name of the js file to be run by the child process
  childProcess.send({ number: parseInt(req.query.number) }) //send method is used to send message to child process through IPC
  const startTime = new Date()
  childProcess.on("message", message => {
    //on("message") method is used to listen for messages send by the child process
    const endTime = new Date()
    res.json({
      ...message,
      time: endTime.getTime() - startTime.getTime() + "ms",
    })
  })
})

app.get("/testrequest", (req, res) => {
  res.send("I am unblocked now")
})

app.listen(3636, () => console.log("listening on port 3636"))
```



**forkedchild.js**

```js
process.on("message", message => {
  //child process is listening for messages by the parent process
  const result = fibonacci(message.number)
  process.send(result)
  process.exit() // make sure to use exit() to prevent orphaned processes
})

const fibonacci = (n: number): number => {
  if (n <= 1) {
    return 1
  }

  return fibonacci(n - 1) + fibonacci(n - 2)
}
```



注意事项

> 为每个子进程分配单独的内存，这意味着存在时间和资源开销。



#### Cluster

集群主要用于垂直（为现有机器添加更多功能）扩展您的 Nodejs Web 服务器。 它构建在 child_process 模块之上。 在 Http 服务器中，集群模块使用 child_process.fork() 自动分叉进程并建立主从架构，其中父进程以循环方式将传入请求分发给子进程。 理想情况下，分叉的进程数应等于您的计算机具有的 CPU 核心数。

让我们使用 cluster 模块构建一个 Express 服务器。

```javascript
const cluster = require("cluster")
const http = require("http")
const cpuCount = require("os").cpus().length //returns no of cores our cpu have

if (cluster.isMaster) {
  masterProcess()
} else {
  childProcess()
}

function masterProcess() {
  console.log(`Master process ${process.pid} is running`)

  //fork workers.

  for (let i = 0; i < cpuCount; i++) {
    console.log(`Forking process number ${i}...`)
    cluster.fork() //creates new node js processes
  }
  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`)
    cluster.fork() //forks a new process if any process dies
  })
}

function childProcess() {
  const express = require("express")
  const app = express()
  //workers can share TCP connection

  app.get("/", (req, res) => {
    res.send(`hello from server ${process.pid}`)
  })

  app.listen(5555, () =>
    console.log(`server ${process.pid} listening on port 5555`)
  )
}
```

当我们运行上面的代码时，发生的情况是 cluster.isMaster 第一次为 true 并且 masterProcess() 函数被执行。 这个函数分叉了 4 个 NodeJS 进程（我的 cpu 中有 4 个核心），每当分叉另一个进程时，都会再次运行相同的文件，但这次 cluster.isMaster 将为 false，因为该进程现在是一个子进程，因为它是分叉的。 因此控制转到 else 条件。 结果，childProcess() 函数执行了 4 次，并创建了 4 个 Express 服务器实例。 后续请求以循环方式分发到四台服务器。 这有助于我们 100% 使用 CPU。 Node js 文档还指出，有一些内置的智能功能可以避免工作进程过载。

集群模块是垂直扩展简单 Nodejs 服务器的最简单、最快的方法。 为了实现更高级和弹性的扩展，可以使用 docker 容器和 Kubernetes 等工具。



#### worker threads

本质上，工作线程和子进程之间的区别就像线程和进程之间的区别一样。理想情况下，创建的线程数应等于 cpu 核心数。

让我们比较默认的单线程和多线程与工作线程的性能。

**singleThreadServer.js**

```javascript
const express = require("express")
const app = express()

function sumOfPrimes(n) {
  var sum = 0
  for (var i = 2; i <= n; i++) {
    for (var j = 2; j <= i / 2; j++) {
      if (i % j == 0) {
        break
      }
    }
    if (j > i / 2) {
      sum += i
    }
  }
  return sum
}

app.get("/sumofprimes", (req, res) => {
  const startTime = new Date().getTime()
  const sum = sumOfPrimes(req.query.number)
  const endTime = new Date().getTime()
  res.json({
    number: req.query.number,
    sum: sum,
    timeTaken: (endTime - startTime) / 1000 + " seconds",
  })
})

app.listen(6767, () => console.log("listening on port 6767"))
```



**sumOfPrimesWorker.js**

```javascript
const { workerData, parentPort } = require("worker_threads")
//workerData will be the second argument of the Worker constructor in multiThreadServer.js

const start = workerData.start
const end = workerData.end

var sum = 0
for (var i = start; i <= end; i++) {
  for (var j = 2; j <= i / 2; j++) {
    if (i % j == 0) {
      break
    }
  }
  if (j > i / 2) {
    sum += i
  }
}

parentPort.postMessage({
  //send message with the result back to the parent process
  start: start,
  end: end,
  result: sum,
})
```



**multiThreadServer.js**

```javascript
const express = require("express")
const app = express()
const { Worker } = require("worker_threads")

function runWorker(workerData) {
  return new Promise((resolve, reject) => {
    //first argument is filename of the worker
    const worker = new Worker("./sumOfPrimesWorker.js", {
      workerData,
    })
    worker.on("message", resolve) //This promise is gonna resolve when messages comes back from the worker thread
    worker.on("error", reject)
    worker.on("exit", code => {
      if (code !== 0) {
        reject(new Error(`Worker stopped with exit code ${code}`))
      }
    })
  })
}

function divideWorkAndGetSum() {
  // we are hardcoding the value 600000 for simplicity and dividing it
  //into 4 equal parts

  const start1 = 2
  const end1 = 150000
  const start2 = 150001
  const end2 = 300000
  const start3 = 300001
  const end3 = 450000
  const start4 = 450001
  const end4 = 600000
  //allocating each worker seperate parts
  const worker1 = runWorker({ start: start1, end: end1 })
  const worker2 = runWorker({ start: start2, end: end2 })
  const worker3 = runWorker({ start: start3, end: end3 })
  const worker4 = runWorker({ start: start4, end: end4 })
  //Promise.all resolve only when all the promises inside the array has resolved
  return Promise.all([worker1, worker2, worker3, worker4])
}

app.get("/sumofprimeswiththreads", async (req, res) => {
  const startTime = new Date().getTime()
  const sum = await divideWorkAndGetSum()
    .then(
      (
        values //values is an array containing all the resolved values
      ) => values.reduce((accumulator, part) => accumulator + part.result, 0) //reduce is used to sum all the results from the workers
    )
    .then(finalAnswer => finalAnswer)

  const endTime = new Date().getTime()
  res.json({
    number: 600000,
    sum: sum,
    timeTaken: (endTime - startTime) / 1000 + " seconds",
  })
})

app.listen(7777, () => console.log("listening on port 7777"))
```



### 结论

尽管 Node js 为多线程提供了强大的支持，但这并不一定意味着我们应该始终使我们的 Web 应用程序成为多线程。

 Node js 的构建方式是默认的单线程行为优于 Web 服务器的多线程行为，因为 Web 服务器往往是 IO 绑定的，而 Nodejs 非常适合用最少的系统资源处理异步 IO 操作 Nodejs 因这个特性而闻名。

 另一个线程或进程的额外开销和复杂性使得程序员很难处理简单的 IO 任务。 

但在某些情况下，Web 服务器执行 CPU 密集型操作，在这种情况下，启动工作线程或子进程并委托该任务确实很容易。 因此，我们的设计架构实际上可以归结为应用程序的需求和要求，我们应该据此做出决策。
