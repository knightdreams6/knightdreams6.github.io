---
title: rabbitmq队列与交换机
date: 2020-10-29 12:03:17
tags:
  - mq
---

#### 五种队列

```java
// 获取连接工具类
public class ConnectionUtil {
    public static Connection getConnection() throws IOException, TimeoutException {
        // 定义连接工厂
        ConnectionFactory factory = new ConnectionFactory();
        // 设置服务地址
        factory.setHost("192.168.0.134");
        // 端口
        factory.setPort(5672);
        // 设置账号信息
        factory.setVirtualHost("learn_host");
        factory.setUsername("test");
        factory.setPassword("test");
        // 通过工厂获取连接
        return factory.newConnection();
    }
}
```

##### 1、简单队列（一对一）

> 生产者

```java
public class Send {
    private final static String QUEUE_NAME = "queue_01";
    public static void main(String[] args) throws IOException, TimeoutException {
        // 获取连接
        Connection connection = ConnectionUtil.getConnection();
        // 从连接中创建通道
        Channel channel = connection.createChannel();
        // 声明/创建 队列
        channel.queueDeclare(QUEUE_NAME, false, false, false, null);
        // 消息内容
        String message = "hello RabbiMQ~";
        channel.basicPublish("", QUEUE_NAME, null, message.getBytes());
        System.out.println(" [x] Sent '" + message + "'");
        //关闭通道和连接
        channel.close();
        connection.close();
    }
}
```

> 消费者

```java
public class Recv {
    private final static String QUEUE_NAME = "queue_01";
    public static void main(String[] args) throws IOException, TimeoutException {
        // 获取连接
        Connection connection = ConnectionUtil.getConnection();
        // 创建通道
        Channel channel = connection.createChannel();
        // 声明队列
        channel.queueDeclare(QUEUE_NAME, false, false, false, null);

        // 定义队列消费者
        DeliverCallback deliverCallback = (consumerTag, delivery) ->{
            String message = new String(delivery.getBody(), StandardCharsets.UTF_8);
            System.out.println(" [x] Received '" + message + "'");
        };
        // 监听队列
        channel.basicConsume(QUEUE_NAME, true, deliverCallback, consumerTag -> {});

    }
}
```

##### 2、work模式

```java
public class Recv {

    private final static String QUEUE_NAME = "learn_work";

    public static void main(String[] args) throws IOException, TimeoutException {

        Connection connection = ConnectionUtil.getConnection();
        Channel channel = connection.createChannel();
        // 声明队列
        channel.queueDeclare(QUEUE_NAME, false, false, false, null);

        // 同一时刻服务器只会发送一条消息给消费者
        channel.basicQos(1);

        // 定义队列的消费者
        DeliverCallback deliverCallback = (consumerTag, delivery) ->{
            String message = new String(delivery.getBody(), StandardCharsets.UTF_8);
            System.out.println(" [x] Received '" + message + "'");
            try {
                Thread.sleep(10000);
                // 返回确认状态
                channel.basicAck(delivery.getEnvelope().getDeliveryTag(), false);
            } catch (InterruptedException ignored) {
            }
        };
        // 监听队列，false表示手动返回完成状态，true表示自动
        channel.basicConsume(QUEUE_NAME, false, deliverCallback, consumerTag -> {});
    }
}
```

**轮询分发：**

> 使用任务队列的优点之一就是轻易的并行工作。如果我们积压了很多工作，我们可以通过增加工作者（消费者）来解决这一问题，使得系统的伸缩性更加容易。在默认情况下，rabbitMQ将逐个发送消息到在序列中的下一个消费者（而不考虑任务的时长等等，且是提前一次性分配，并非一个一个分配）**平均每个消费者获得相同的数量**。

**公平分发：**

> 虽然上面的分配法方式也还行，但是有个问题就是：比如：现在有2个消费者，所有的奇数的消息都是繁忙的，而偶数则是轻松的。按照轮询的方式，奇数的任务交给了第一个消费者，所以一直在忙个不停。偶数的任务交给另一个消费者，则立即完成任务，然后闲得不行。而RabbitMQ则是不了解这些的。这是因为当消息进入队列，RabbitMQ就会分派消息。它不看消费者为应答的数目，只是盲目的将消息发给轮询指定的消费者。

我们使用`channel.basicQos( prefetchCount = 1)`方法，来限制RabbitMQ只发不超过1条的消息给同一个消费者。当消息处理完毕后，有了反馈，才会进行第二次发送。当使用公平分发时，必须关闭自动应答，改为手动应答

**模式1：自动确认**

> 只要消息从队列中获取，无论消费者获取到消息后是否成功消息，都认为是消息已经成功消费。

**模式2：手动确认**

> 消费者从队列中获取消息后，服务器会将该消息标记为不可用状态，等待消费者的反馈，如果消费者一直没有反馈，那么该消息将一直处于不可用状态。

##### 3、发布/订阅模式（fanout 交换机）

> 一个消费者将消息首先发送到交换器，交换器绑定到多个队列，然后被监听该队列的消费者所接收并消费。

> 生产者

```java
public class Send {

    private final static String EXCHANGE_NAME = "learn_exchange_fanout";

    public static void main(String[] args) throws IOException, TimeoutException {
        Connection connection = ConnectionUtil.getConnection();
        Channel channel = connection.createChannel();

        // 声明exchange交换机
        channel.exchangeDeclare(EXCHANGE_NAME, BuiltinExchangeType.FANOUT);

        // 消息内容
        // 消息没有发送到队列绑定的交换机时，消息将丢失，因为交换机没有存储能力
        String message = "Hello exchange!";
        channel.basicPublish(EXCHANGE_NAME, "", null, message.getBytes());
        System.out.println(" [x] Sent '" + message + "'");

        channel.close();
        connection.close();
    }
}
```

> 消费者

```java
public class Recv {

    private final static String EXCHANGE_NAME = "learn_exchange_fanout";

    private final static String QUEUE_NAME = "lean_work1";

    public static void main(String[] args) throws IOException, TimeoutException {
        Connection connection = ConnectionUtil.getConnection();
        Channel channel = connection.createChannel();
        // 声明队列
        channel.queueDeclare(QUEUE_NAME, false,  false, false, null);
        // 绑定队列到交换机
        channel.queueBind(QUEUE_NAME, EXCHANGE_NAME, "");
        // 同一时刻服务器只会发一条消息给消费者
        channel.basicQos(1);

        // 定义队列的消费者
        DeliverCallback deliverCallback = ((consumerTag, delivery) -> {
            String message = new String(delivery.getBody(), StandardCharsets.UTF_8);
            System.out.println(" [x] Received '" + message + "'");

            try {
                Thread.sleep(10);
            } catch (InterruptedException ignored) {
            }
            channel.basicAck(delivery.getEnvelope().getDeliveryTag(), false);
        });

        channel.basicConsume(QUEUE_NAME, false, deliverCallback, consumerTag -> {});
    }
}
```

该模式下，**一个消费者将消息首先发送到交换器，交换器绑定到多个队列，然后被监听该队列的消费者所接收并消费。**

**应用场景**

　　比如一个商城系统需要在管理员上传商品新的图片时，前台系统必须更新图片，日志系统必须记录相应的日志，那么就可以将两个队列绑定到图片上传交换器上，一个用于前台系统更新图片，另一个用于日志系统记录日志。

##### 4、路由模式（direct 类型交换机）

> 　　生产者将消息发送到direct交换器，在绑定队列和交换器的时候有一个路由key，生产者发送的消息会指定一个路由key，那么消息只会发送到相应key相同的队列，接着监听该队列的消费者消费消息。
>
> 　　**也就是让消费者有选择性的接收消息。**

```java
 // (生产者) 声明交换器，类型为direct
 channel.exchangeDeclare(EXCHANGE_NAME, BuiltinExchangeType.DIRECT);
```

　**应用场景**

　　利用消费者能够有选择性的接收消息的特性，比如我们商城系统的后台管理系统对于商品进行修改、删除、新增操作都需要更新前台系统的界面展示，而查询操作确不需要，那么这两个队列分开接收消息就比较好。

##### 5、主题模式

> 上面的路由模式是根据路由key进行完整的匹配（完全相等才发送消息），这里的通配符模式通俗的来讲就是模糊匹配。

```java
// (生产者) 声明交换器，类型为topic
 channel.exchangeDeclare(EXCHANGE_NAME, BuiltinExchangeType.TOPIC);
```



#### 四种交换机

> 前面的五种队列模式实际上只有三种，第一种简单队列，第二种工作模式，剩下的三种都是和交换器绑定的。
>
> 交换器分为四种，分别是：direct、fanout、topic和 headers。
>
> 前面三种分别对应路由模式、发布订阅模式和通配符模式，headers 交换器允许匹配 AMQP 消息的 header 而非路由键，除此之外，header 交换器和 direct 交换器完全一致，但是性能却差很多，因此基本上不会用到该交换器，这里也不详细介绍。
>
> direct Exchange是RabbitMQ Broker的默认Exchange，它有一个特别的属性对一些简单的应用来说是非常有用的，在使用这个类型的
>
> Exchange时，可以不必指定routing key的名字，在此类型下创建的Queue有一个默认的routing key，这个routing key一般同Queue同名。
>

##### 1、 direct

> 如果路由键完全匹配的话，消息才会被投放到相应的队列

##### 2、fanout

> 当发送一条消息到fanout交换器上时，它会把消息投放到所有附加在此交换器上的队列。

##### 3、topic

> 设置模糊的绑定方式，“*”操作符将“.”视为分隔符，匹配单个字符；“#”操作符没有分块的概念，它将任意“.”均视为关键字的匹配部分，能够匹配多个字符。
