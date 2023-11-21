---
title: MQTT
date: 2023-11-20
tags:
  - concept
  - protocol
---

##### 什么是？

`MQTT (Message Queuing Telemetry Transport)` 是一种轻量级的、给基于发布/订阅模式的通信协议，常被用于物联网之间的低宽带、高延迟的通讯。该协议的特点包括简单、开销小、易于实现和支持断线重连等。

在MQTT协议中，设备可以充当发布者（Publisher），向特定的主题（Topic）发布消息；同时也可以充当订阅者（Subscriber），订阅某个或某些主题，接收感兴趣的消息。MQTT协议支持多种消息质量等级（QoS），以满足不同场景下的消息传递需求。



##### 工作原理

1. **发布者（Publisher）**：发布者负责将消息发布到消息代理（Broker）上。
2. **订阅者（Subscriber）**：订阅者向消息代理订阅感兴趣的主题（Topic）。
3. **消息代理（Broker）**：消息代理负责接收发布者发布的消息，并将消息分发给订阅了相关主题的订阅者。

具体的工作流程如下：

* 发布者发布消息到指定的主题上
* 消息代理接收到发布的消息，并根据订阅者的订阅消息，将消息推送给对应订阅者
* 订阅者接收到推送的消息，并进行相应的处理



##### 消息质量等级（QoS）

消息质量等级（QoS，Quality of Service）是指在消息传递过程中对消息传输的可靠性和交付保证的级别。在 MQTT 协议中，定义了三种不同的消息质量等级：

1. 最多一次（At most once）：
    * 消息发布者发送消息后，不会收到任何确认，消息可能会丢失或重复。
    * 这种级别适用于实时性不高、对消息丢失容忍度较高的场景。
2. 至少一次（At least once）：
    * 消息发布者发送消息后，会收到确认，如果没有收到确认，则会重新发送消息。
    * 这种级别能够保证消息不会丢失，但有可能会出现重复传输的情况。
3. 恰好一次（Exactly once）：
    * 确保每条消息只被传输一次，通过消息 deduplication 和消息序号来实现。
    * 这种级别提供了最高的可靠性，确保消息的精确交付，但会增加通讯的开销和复杂性。



##### 与HTTP协议对比

1. MQTT是一种轻量级的发布/订阅消息传输协议，相较于HTTP协议，MQTT的通信开销更小，适用于网络带宽有限或设备资源受限的场景，例如物联网设备和传感器等。而HTTP协议相对较重，每次通信都需要建立和关闭连接，并且传输较多的头部信息，因此在这方面开销较大。
2. MQTT支持异步通信，基于发布/订阅模式。发布者和订阅者之间松耦合，不需要直接建立实时连接，适用于实时监控、事件推送等场景。而HTTP通常是同步请求/响应模式，客户端需要主动向服务器发送请求，服务器返回响应后才能继续下一步操作。
3. MQTT协议具有保持连接和推送特性。MQTT客户端与服务器可以保持长连接，服务器能够主动推送消息到客户端，适用于需要实时数据更新的应用场景。相比之下，HTTP通常是短连接，需要客户端定期轮询或者采用长轮询的方式来实现实时数据更新，增加了额外的开销和复杂性。



##### 如何保证MQTT通信的安全性?

1. **TLS/SSL加密通信**：使用TLS/SSL协议对MQTT通信进行加密传输，防止数据被窃听和篡改。可以通过配置MQTT代理服务器支持TLS/SSL协议，或者使用专门提供MQTT+TLS/SSL服务的云平台。
2. **MQTT认证机制**：MQTT代理服务器可以配置用户名和密码验证机制，只有携带正确的用户名和密码的客户端才能连接到MQTT代理服务器。
3. **基于客户端证书的身份验证**：客户端可以使用数字证书进行身份验证，只有携带正确的数字证书的客户端才能连接到MQTT代理服务器。
4. **订阅主题级别的访问控制**：MQTT代理服务器可以对每个主题进行权限控制，只有拥有访问权限的客户端才能订阅该主题。
5. **防火墙策略**：通过防火墙限制MQTT端口的开放范围，只允许特定的IP地址或网络访问MQTT代理服务器，从而增强其安全性。



##### 如何处理断开连接或重新连接时的消息丢失问题？

1. **持久会话（Persistent Session）**：MQTT允许客户端创建持久会话，这意味着客户端可以在断开连接后重新连接，并且会话状态得以保留。在创建连接时，客户端可以选择是否创建持久会话。如果客户端使用持久会话，那么在重新连接后，之前订阅的主题信息和未接收的消息将被恢复，从而避免了消息丢失的问题。
2. **遗嘱消息（Will Message）**：客户端可以在连接时设置遗嘱消息，当客户端异常断开连接时，MQTT代理服务器会发布这条遗嘱消息到指定的主题上。这样订阅了该主题的其他客户端就可以收到这条消息，从而得知客户端异常断开连接的情况。
3. **QoS级别设置**：MQTT支持不同的服务质量等级（QoS），通过设置合适的QoS级别，可以确保消息在断开连接或重新连接时得到适当的处理。比如使用QoS级别为1或2的消息传输，可以在消息发布时进行确认和重传，从而保证消息的可靠传输。
4. **客户端持久化**：在客户端应用中，可以将待发送的消息进行本地持久化存储，当连接断开后再次连接时，可以重新发送这些消息，从而避免消息丢失的问题。



##### 在MQTT中，什么是主题（Topic）？如何使用主题进行消息过滤和订阅？

在MQTT中，主题（Topic）是消息的标识符，用于区分不同类型或者不同来源的消息。MQTT中的主题采用层级结构，使用斜线（/）进行分割。

例如，一个温度传感器可以使用以下主题发布消息：

```
Codesensors/temperature/living-room
```

其中，sensors是一级主题，temperature是二级主题，living-room是三级主题。在订阅主题时，可以使用通配符（通配符只能出现在主题字符串中间）来实现更灵活的订阅方式，主要有以下两种通配符：

- **+**：表示单层级别的通配符。例如，订阅主题 `sensors/temperature/+` 可以匹配到 `sensors/temperature/living-room` 和 `sensors/temperature/bed-room` 等主题，但无法匹配到 `sensors/temperature` 或 `sensors/temperature/living-room/room-1` 等主题。
- **#**：表示多层级别的通配符。例如，订阅主题 `sensors/#` 可以匹配到 `sensors/temperature/living-room`、`sensors/temperature/bed-room`、`sensors/light/living-room`、`sensors/light/bed-room` 等所有以 `sensors/` 为前缀的主题。



##### MQTT Broker是什么？它的作用是什么

MQTT Broker是MQTT协议的服务器端，它的主要功能是接收客户端发布的消息和转发订阅的消息。MQTT Broker是分布式系统的关键组件，负责处理消息路由、消息存储、消息过滤等一系列任务，确保消息的可靠传递和处理。

在MQTT中，客户端可以连接到任何一个MQTT Broker，并向该Broker发布和订阅消息。Broker之间可以通过网络连接进行通信，从而实现分布式系统的构建。当客户端发布消息时，MQTT Broker会将该消息转发给所有订阅了相关主题的客户端；当客户端订阅一个主题时，MQTT Broker会将消息转发给该客户端以实现消息的推送。



##### 相关开源类库

* emqx： https://github.com/emqx/emqx
* mosquitto: https://github.com/eclipse/mosquitto
* eclipse-paho：https://github.com/eclipse/paho.mqtt.java
* hivemq-mqtt：https://github.com/hivemq/hivemq-mqtt-client
* hivemq-community-edition：https://github.com/hivemq/hivemq-community-edition 