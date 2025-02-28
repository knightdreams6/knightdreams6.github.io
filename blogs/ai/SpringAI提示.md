---
title: 提示
date: 2025-02-28
tags:
   - AI
   - Spring AI
---



提示是引导 AI 模型生成特定输出的输入。这些提示的设计和措辞会显著影响模型的响应。

在 Spring AI 中与 AI 模型交互的最低级别上，处理 Spring AI 中的提示有点类似于管理 Spring MVC 中的“视图”。这涉及创建带有动态内容占位符的大量文本。然后根据用户请求或应用程序中的其他代码替换这些占位符。另一个类比是包含某些表达式的占位符的 SQL 语句。

随着 Spring AI 的发展，它将引入更高级别的抽象来与 AI 模型进行交互。本节中描述的基础类在角色和功能方面可以比作 JDBC。`ChatModel`例如，该类类似于 JDK 中的核心 JDBC 库。该类`ChatClient`可以比作`JdbcClient`，它建立在`ChatModel`之上，并通过 提供更高级的构造`Advisor` 来考虑过去与模型的交互，用额外的上下文文档扩充提示，并引入代理行为。

在人工智能领域，提示的结构一直在演变。最初，提示是简单的字符串。随着时间的推移，它们逐渐包含特定输入的占位符，例如“USER:”，人工智能模型可以识别这些输入。OpenAI 通过在人工智能模型处理多个消息字符串之前将它们分类为不同的角色，为提示引入了更多结构。



### API 概述

#### 提示 Prompt

通常使用 `ChatModel`的 `call()` 方法，该方法接受 `Prompt `实例并返回 `ChatResponse`。

`Prompt `类充当一系列有组织的 Message 对象和请求`ChatOptions `的容器。每条 Message 在提示中都体现了独特的角色，其内容和意图各不相同。这些角色可以包含各种元素，从用户查询到 AI 生成的响应再到相关背景信息。这种安排可以实现与 AI 模型的复杂而详细的交互，因为提示是由多条消息构成的，每条消息在对话中都扮演着特定的角色。

下面是 `Prompt`类的截断版本，为了简洁起见，省略了构造函数和实用方法：

```java
public class Prompt implements ModelRequest<List<Message>> {

    private final List<Message> messages;

    private ChatOptions chatOptions;
}
```

`Message`接口封装了提示文本、元数据属性集合以及称为 `MessageType ` 的分类。

```java
public interface Content {

	String getContent();

	Map<String, Object> getMetadata();
}

public interface Message extends Content {

	MessageType getMessageType();
}
```

多模式消息类型还实现了 MediaContent 接口，提供了媒体内容对象的列表。

```java
public interface MediaContent extends Content {

	Collection<Media> getMedia();

}
```

`Message`接口的各种实现对应 AI 模型可以处理的不同类别的消息。模型根据对话角色区分消息类别。

如下所述，这些角色通过 `MessageType`进行有效映射。

#### 角色

每条消息都分配有特定的角色。这些角色对消息进行分类，为 AI 模型阐明提示的每个部分的背景和目的。这种结构化方法增强了与 AI 沟通的细微差别和有效性，因为提示的每个部分在交互中都发挥着独特而明确的作用。

主要角色是：

* 系统角色 System Role：指导人工智能的行为和响应方式，设置人工智能解释和回复输入的参数或规则。这类似于在发起对话之前向人工智能提供指令。
* 用户角色 User Role：代表用户的输入——他们向 AI 提出的问题、命令或陈述。此角色至关重要，因为它构成了 AI 响应的基础。
* 助手角色 Assistant Role ：AI 对用户输入的响应。这不仅仅是一个答案或反应，对于保持对话的流畅性至关重要。通过跟踪 AI 之前的响应（其“助手角色”消息），系统可确保连贯且上下文相关的交互。助手消息也可能包含功能工具调用请求信息。它就像 AI 中的一项特殊功能，在需要执行特定功能（例如计算、获取数据或不仅仅是谈话的其他任务）时使用。
* 工具/功能角色 Tool/Function Role：工具/功能角色专注于响应工具调用助手消息返回附加信息。

角色在 Spring AI 中表示为枚举，如下所示

```java
public enum MessageType {

	USER("user"),

	ASSISTANT("assistant"),

	SYSTEM("system"),

	TOOL("tool");

    ...
}
```

#### 提示模板

Spring AI 中提示模板的一个关键组件是`PromptTemplate`类。该类使用Terence Parr 开发的OSS [StringTemplate](https://www.stringtemplate.org/)`PromptTemplate`引擎来构建和管理提示。该类旨在促进结构化提示的创建，然后将其发送到 AI 模型进行处理

```java
public class PromptTemplate implements PromptTemplateActions, PromptTemplateMessageActions {

    // Other methods to be discussed later
}
```

此类实现的接口支持提示创建的不同方面：

`PromptTemplateStringActions`专注于创建和渲染提示字符串，代表提示生成的最基本形式。

`PromptTemplateMessageActions`通过生成和操作对象，可以实现快速创作`Message`。

`PromptTemplateActions`旨在返回`Prompt`对象，该对象可以传递`ChatModel`给生成响应。



### 示例用法

```java
PromptTemplate promptTemplate = new PromptTemplate("Tell me a {adjective} joke about {topic}");

Prompt prompt = promptTemplate.create(Map.of("adjective", adjective, "topic", topic));

return chatModel.call(prompt).getResult();
```



```java
String userText = """
    Tell me about three famous pirates from the Golden Age of Piracy and why they did.
    Write at least a sentence for each pirate.
    """;
Message userMessage = new UserMessage(userText);

String systemText = """
  You are a helpful AI assistant that helps people find information.
  Your name is {name}
  You should reply to the user's request with your name and also in the style of a {voice}.
  """;
      
SystemPromptTemplate systemPromptTemplate = new SystemPromptTemplate(systemText);
Message systemMessage = systemPromptTemplate.createMessage(Map.of("name", name, "voice", voice));

Prompt prompt = new Prompt(List.of(userMessage, systemMessage));

List<Generation> response = chatModel.call(prompt).getResults();
```

这显示了如何使用来构建`Prompt`实例，以使用系统角色传入占位符值。然后将带有角色的消息与角色的消息组合以形成提示。然后将提示传递给 ChatModel 以获得生成响应。`SystemPromptTemplate``Message``user``system`



#### 使用资源而不是原始字符串

Spring AI 支持`org.springframework.core.io.Resource`抽象，因此您可以将提示数据放在可直接在 中使用的文件中`PromptTemplate`。例如，您可以在 Spring 托管组件中定义一个字段来检索`Resource`。

```java
@Value("classpath:/prompts/system-message.st")
private Resource systemResource;
```

然后将该资源直接传递给`SystemPromptTemplate`。

```java
SystemPromptTemplate systemPromptTemplate = new SystemPromptTemplate(systemResource);
```



### 创建有效的提示

在制定提示时，整合几个关键组件以确保清晰度和有效性非常重要：

- **说明**：向 AI 提供清晰直接的说明，类似于与人交流的方式。这种清晰度对于帮助 AI“理解”预期至关重要。
- **外部背景**：在必要时，包括相关背景信息或人工智能响应的具体指导。这种“外部背景”构成提示的框架，并帮助人工智能掌握整体情况。
- **用户输入**：这是最直接的部分——用户的直接请求或问题构成提示的核心。
- **输出指示器**：这方面可能比较棘手。它涉及指定 AI 响应所需的格式，例如 JSON。但是，请注意，AI 可能并不总是严格遵循此格式。例如，它可能会在实际 JSON 数据之前添加“这是您的 JSON”之类的短语，或者有时会生成不准确的 JSON 类结构。

在制作提示时，向 AI 提供预期问答格式的示例非常有益。这种做法有助于 AI“理解”查询的结构和意图，从而提供更精确、更相关的响应。虽然本文档没有深入探讨这些技术，但它们为进一步探索 AI 提示工程提供了一个起点。

以下是可供进一步调查的资源列表。

#### 简单技巧

- **[文本摘要](https://www.promptingguide.ai/introduction/examples.en#text-summarization)**：
  将大量文本缩减为简洁的摘要，捕捉关键点和主要思想，同时省略不太重要的细节。
- **[问答](https://www.promptingguide.ai/introduction/examples.en#question-answering)**：
  侧重于根据用户提出的问题从提供的文本中得出具体答案。它是针对查询精确定位和提取相关信息。
- **[文本分类](https://www.promptingguide.ai/introduction/examples.en#text-classification)**：
  系统地将文本分类到预定义的类别或组中，分析文本并根据其内容将其分配给最合适的类别。
- **[对话](https://www.promptingguide.ai/introduction/examples.en#conversation)**：
  创建交互式对话，让人工智能可以与用户进行来回交流，模拟自然的对话流程。
- **[代码生成](https://www.promptingguide.ai/introduction/examples.en#code-generation)**：
  根据特定的用户要求或描述生成功能代码片段，将自然语言指令转换为可执行代码。

#### 高级技术

- **[零样本](https://www.promptingguide.ai/techniques/zeroshot)、[少样本学习](https://www.promptingguide.ai/techniques/fewshot)**：
  使模型能够利用特定问题类型的极少或没有先前的示例做出准确的预测或响应，并使用学习到的概括来理解和执行新任务。
- **[思路链](https://www.promptingguide.ai/techniques/cot)**：
  链接多个 AI 响应，以创建连贯且具有上下文意识的对话。它有助于 AI 保持讨论的线索，确保相关性和连续性。
- **[ReAct（推理 + 行动）](https://www.promptingguide.ai/techniques/react)**：
  在这种方法中，人工智能首先分析输入（推理），然后确定最合适的行动或响应方案。它将理解与决策结合在一起。

#### Microsoft 指南

- **[提示创建和优化框架](https://github.com/microsoft/guidance)**：
  微软提供了一种结构化的方法来开发和完善提示。该框架指导用户创建有效的提示，从 AI 模型中引出所需的响应，优化交互以提高清晰度和效率。
