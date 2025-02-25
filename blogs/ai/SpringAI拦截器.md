---
title: 拦截器Advisors
date: 2025-02-25
tags:
   - AI
   - Spring AI
---



Spring AI Advisors API 提供了一种灵活而强大的方法来拦截、修改和增强 Spring 应用程序中的 AI 驱动交互。通过利用 Advisors API，开发人员可以创建更复杂、可重用且可维护的 AI 组件。

主要优点包括封装重复的生成式 AI 模式、转换发送到和来自大型语言模型 (LLM) 的数据，以及提供跨各种模型和用例的可移植性。

[可以使用ChatClient API](https://docs.spring.io/spring-ai/reference/api/chatclient.html#_advisor_configuration_in_chatclient)配置现有的拦截器，如以下示例所示：

```java
var chatClient = ChatClient.builder(chatModel)
    .defaultAdvisors(
        new MessageChatMemoryAdvisor(chatMemory), // chat-memory advisor
        new QuestionAnswerAdvisor(vectorStore)    // RAG advisor
    )
    .build();

String response = this.chatClient.prompt()
    // Set advisor parameters at runtime
    .advisors(advisor -> advisor.param("chat_memory_conversation_id", "678")
            .param("chat_memory_response_size", 100))
    .user(userText)
    .call()
	.content();
```

建议在构建时使用构建器的`defaultAdvisors()`方法注册拦截器。

拦截器还参与可观察性堆栈，因此可以查看与其执行相关的指标和跟踪。

[了解问答拦截器](https://docs.spring.io/spring-ai/reference/api/retrieval-augmented-generation.html#_questionansweradvisor)



### 核心组件

API 由`CallAroundAdvisor`和组成`CallAroundAdvisorChain`（用于非流式场景）和`StreamAroundAdvisor`和`StreamAroundAdvisorChain`（用于流式场景）。它还包括`AdvisedRequest`来表示未密封的提示请求，`AdvisedResponse`用于表示聊天完成响应。两者都持有一个`advise-context`以在整个拦截器链中共享状态。

`nextAroundCall()`是`nextAroundStream()`关键的拦截器方法，通常执行诸如检查未密封的提示数据、自定义和扩充提示数据、调用拦截器链中的下一个实体、可选地阻止请求、检查聊天完成响应以及引发异常以指示处理错误等操作。

此外该`getOrder()`方法还确定了链中的拦截器顺序，同时`getName()`提供了唯一的拦截器名称。

Spring AI 框架创建的 Advisor Chain 允许按值顺序调用多个拦截器`getOrder()`。值较低的拦截器将首先执行。最后一个拦截器会自动添加，并将请求发送到 LLM。

以下流程图说明拦截器链和聊天模型之间的交互：

1. Spring AI 框架创建一个`AdvisedRequest`来自用户的对象`Prompt`以及一个空`AdvisorContext`对象。
2. 链中的每个拦截器都会处理请求，并可能对其进行修改。或者，它可以选择通过不调用下一个实体来阻止请求。在后一种情况下，拦截器负责填写响应。
3. 框架提供的最终拦截器将请求发送给`Chat Model`。
4. 然后，聊天模型的响应通过拦截器链传回并转换为`AdvisedResponse`。稍后包括共享`AdvisorContext`实例。
5. 每个拦截器都可以处理或修改答复。
6. 最后的`AdvisedResponse`通过提取`ChatCompletion`返回给客户端。



### 拦截器顺序

链中的拦截器执行顺序由`getOrder()`方法决定。需要理解的关键点：

* 具有较低顺序值的拦截器将首先执行。
* 拦截器链以堆栈的形式运行：
  * 链中的第一位拦截器是第一个处理请求的。
  * 它也是最后处理响应的。
* 控制执行顺序：
  * 将顺序设置为接近`Ordered.HIGHEST_PRECEDENCE`以确保拦截器在链中首先执行（第一个用于请求处理，最后一个用于响应处理）。
  * 将顺序设置为接近`Ordered.LOWEST_PRECEDENCE`以确保顾问在链中最后执行（请求处理最后执行，响应处理首先执行）。
* 值越高，优先级越低。
* 如果多个拦截器具有相同的 order 值，则他们的执行顺序无法保证。



### API 概述

关键接口

```java
public interface Advisor extends Ordered {

	String getName();

}
```

同步和反应式 Advisor 的两个子接口

```java
public interface CallAroundAdvisor extends Advisor {

	/**
	 * Around advice that wraps the ChatModel#call(Prompt) method.
	 * @param advisedRequest the advised request
	 * @param chain the advisor chain
	 * @return the response
	 */
	AdvisedResponse aroundCall(AdvisedRequest advisedRequest, CallAroundAdvisorChain chain);

}
```

```java
public interface StreamAroundAdvisor extends Advisor {

	/**
	 * Around advice that wraps the invocation of the advised request.
	 * @param advisedRequest the advised request
	 * @param chain the chain of advisors to execute
	 * @return the result of the advised request
	 */
	Flux<AdvisedResponse> aroundStream(AdvisedRequest advisedRequest, StreamAroundAdvisorChain chain);

}
```

要继续 Advice 链，请在 Advice 实现中使用 `CallAroundAdvisorChain `和 `StreamAroundAdvisorChain`：

```java
public interface CallAroundAdvisorChain {

	AdvisedResponse nextAroundCall(AdvisedRequest advisedRequest);

}
```

```java
public interface StreamAroundAdvisorChain {

	Flux<AdvisedResponse> nextAroundStream(AdvisedRequest advisedRequest);

}
```



### 实现拦截器

要创建拦截器，需实现其中之一`CallAroundAdvisor`或`StreamAroundAdvisor`（或两者）。实现的关键方法是`nextAroundCall()`针对非流式顾问或`nextAroundStream()`流式顾问。



示例

##### 日志拦截器

```java
import lombok.extern.slf4j.Slf4j;
import org.springframework.ai.chat.client.advisor.api.*;
import org.springframework.ai.chat.model.MessageAggregator;
import org.springframework.lang.NonNull;
import reactor.core.publisher.Flux;

/**
 * 日志拦截器
 *
 * @author knight
 */
@Slf4j
public class SimpleLoggerAdvisor implements CallAroundAdvisor, StreamAroundAdvisor {


    @NonNull
    @Override
    public AdvisedResponse aroundCall(@NonNull AdvisedRequest advisedRequest, CallAroundAdvisorChain chain) {

        log.debug("BEFORE: {}", advisedRequest);

        AdvisedResponse advisedResponse = chain.nextAroundCall(advisedRequest);

        log.debug("AFTER: {}", advisedResponse);

        return advisedResponse;
    }

    @NonNull
    @Override
    public Flux<AdvisedResponse> aroundStream(@NonNull AdvisedRequest advisedRequest, StreamAroundAdvisorChain chain) {

        log.debug("BEFORE: {}", advisedRequest);

        Flux<AdvisedResponse> advisedResponses = chain.nextAroundStream(advisedRequest);

        return new MessageAggregator().aggregateAdvisedResponse(advisedResponses,
                advisedResponse -> log.debug("AFTER: {}", advisedResponse));
    }

    @NonNull
    @Override
    public String getName() {
        return this.getClass().getSimpleName();
    }

    @Override
    public int getOrder() {
        return 0;
    }
}
```

> `MessageAggregator `是一个实用程序类，将 Flux 响应聚合到单个 AdvisedResponse 中。这对于记录或观察整个响应（而不是流中的单个项目）的其他处理非常有用。请注意，您无法更改 `MessageAggregator` 中的响应，因为它是只读操作。

##### 重读 (Re2) 拦截器

“[重读可提高大型语言模型的推理能力](https://arxiv.org/pdf/2309.06275)”一文介绍了一种名为重读 (Re2) 的技术，该技术可提高大型语言模型的推理能力。Re2 技术需要像这样增强输入提示：

```java
package cn.knight.learnspringai.advisors;

import org.springframework.ai.chat.client.advisor.api.*;
import org.springframework.lang.NonNull;
import reactor.core.publisher.Flux;

import java.util.Map;

/**
 * 重读拦截器
 *
 * @author knight
 */
public class ReReadingAdvisor implements CallAroundAdvisor, StreamAroundAdvisor {

    private AdvisedRequest before(AdvisedRequest advisedRequest) {

        Map<String, Object> userParams = advisedRequest.userParams();
        userParams.put("re2_input_query", advisedRequest.userText());
        return AdvisedRequest.from(advisedRequest)
                .userText("""
                        {re2_input_query}
                        Read the question again: {re2_input_query}
                        """)
                .userParams(userParams).build();
    }

    @NonNull
    @Override
    public AdvisedResponse aroundCall(@NonNull AdvisedRequest advisedRequest, CallAroundAdvisorChain chain) {
        return chain.nextAroundCall(this.before(advisedRequest));
    }

    @NonNull
    @Override
    public Flux<AdvisedResponse> aroundStream(@NonNull AdvisedRequest advisedRequest, StreamAroundAdvisorChain chain) {
        return chain.nextAroundStream(this.before(advisedRequest));
    }

    @NonNull
    @Override
    public String getName() {
        return this.getClass().getSimpleName();
    }

    @Override
    public int getOrder() {
        return 0;
    }

}
```



#### Spring AI 内置拦截器

##### 聊天记忆拦截器

这些顾问在聊天记忆库中管理对话历史记录：

* `MessageChatMemoryAdvisor`: 检索记忆并将其作为消息集合添加到提示中。此方法可维护对话历史记录的结构。请注意，并非所有 AI 模型都支持此方法。
* `PromptChatMemoryAdvisor`: 检索内存并将其合并到提示的系统文本中。
* `VectorStoreChatMemoryAdvisor`: 从 `VectorStore `检索内存并将其添加到提示的系统文本中。此拦截器对于高效地从大型数据集中搜索和检索相关信息非常有用。

##### 问答拦截器

* `QuestionAnswerAdvisor`: 该拦截器使用向量存储来提供问答功能，实现 RAG（检索增强生成）模式。

##### 内容安全拦截器

* `SafeGuardAdvisor`: 这是一个简单的顾问，旨在防止模型生成有害或不适当的内容。



#### 流式传输与非流式传输

* 非流式顾问处理完整的请求和响应。
* 流顾问使用反应式编程概念（例如，用于响应的 Flux）将请求和响应作为连续流进行处理。

```java
@Override
public Flux<AdvisedResponse> aroundStream(AdvisedRequest advisedRequest, StreamAroundAdvisorChain chain) {

    return  Mono.just(advisedRequest)
            .publishOn(Schedulers.boundedElastic())
            .map(request -> {
                // This can be executed by blocking and non-blocking Threads.
                // Advisor before next section
            })
            .flatMapMany(request -> chain.nextAroundStream(request))
            .map(response -> {
                // Advisor after next section
            });
}
```

