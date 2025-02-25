---
title: 结构化输出转换器
date: 2025-02-25
tags:
   - AI
   - Spring AI
---



LLM 生成结构化输出的能力对于依赖可靠解析输出值的下游应用程序非常重要。开发人员希望快速将 AI 模型的结果转换为可传递给其他应用程序函数和方法的数据类型，例如 JSON、XML 或 Java 类。

Spring AI`Structured Output Converters`帮助将 LLM 输出转换为结构化格式。如下图所示，此方法围绕 LLM 文本完成端点运行：

使用通用完成 API 从大型语言模型 (LLM) 生成结构化输出需要仔细处理输入和输出。结构化输出转换器在 LLM 调用之前和之后起着至关重要的作用，确保实现所需的输出结构。

在 LLM 调用之前，转换器会将格式说明附加到提示中，为模型提供生成所需输出结构的明确指导。这些说明充当蓝图，塑造模型的响应以符合指定的格式。

在 LLM 调用之后，转换器会获取模型的输出文本并将其转换为结构化类型的实例。此转换过程涉及解析原始文本输出并将其映射到相应的结构化数据表示，例如 JSON、XML 或特定于域的数据结构。

> `StructuredOutputConverter`最大努力将模型输出转换为结构化输出。AI 模型不能保证按要求返回结构化输出。模型可能无法理解提示或无法按要求生成结构化输出。考虑实施验证机制以确保模型输出符合预期。

> `StructuredOutputConverter`用于 LLM[工具调用](https://docs.spring.io/spring-ai/reference/api/tools.html)，因为此功能本身默认提供结构化输出。



### 结构化输出 API

该`StructuredOutputConverter`接口允许您获取结构化输出，例如将输出映射到 Java 类或来自基于文本的 AI 模型输出的值数组。接口定义如下：

```java
public interface StructuredOutputConverter<T> extends Converter<String, T>, FormatProvider {

}
```

它结合了 Spring [Converter](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/core/convert/converter/Converter.html)接口和`FormatProvider`接口

```java
public interface FormatProvider {
	String getFormat();
}
```

下图显示了使用结构化输出 API 时的数据流。

`FormatProvider`为 AI 模型提供特定的格式指南，使其能够生成可使用 转换为指定目标类型的文本输出。`T`以下`Converter`是此类格式说明的示例：

>  您的回复应采用 JSON 格式。
>  JSON 的数据结构应该与这个 Java 类匹配：java.util.HashMap
> 不包含任何解释，仅提供遵循此格式且无偏差的符合 RFC8259 的 JSON 响应。

格式说明通常使用[PromptTemplate](https://docs.spring.io/spring-ai/reference/api/prompt.html#_prompttemplate)附加到用户输入的末尾，如下所示：

```java
 StructuredOutputConverter outputConverter = ...
    String userInputTemplate = """
        ... user text input ....
        {format}
        """; // user input with a "format" placeholder.
    Prompt prompt = new Prompt(
       new PromptTemplate(
			   this.userInputTemplate,
          Map.of(..., "format", outputConverter.getFormat()) // replace the "format" placeholder with the converter's format.
       ).createMessage());
```

Converter<String, T> 负责将模型的输出文本转换为指定类型的实例`T`



#### 可用的转换器

当前, Spring AI 提供 `AbstractConversionServiceOutputConverter`, `AbstractMessageOutputConverter`, `BeanOutputConverter`, `MapOutputConverter` and `ListOutputConverter` 实现:

* `AbstractConversionServiceOutputConverter<T>` - 提供预配置的  [GenericConversionService](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/core/convert/support/GenericConversionService.html)，用于将 LLM 输出转换为所需格式。不提供默认的 `FormatProvider ` 实现。
* `AbstractMessageOutputConverter<T>`- 提供预配置的 [MessageConverter](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/jms/support/converter/MessageConverter.html)，用于将 LLM 输出转换为所需格式。不提供默认的`FormatProvider`实现。
* `BeanOutputConverter<T>`- 配置了指定的 Java 类（例如 Bean）或[ParameterizedTypeReference](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/core/ParameterizedTypeReference.html)，此转换器采用一种`FormatProvider`实现，指示 AI 模型生成符合 的 JSON 响应`DRAFT_2020_12`，该响应`JSON Schema`派生自指定的 Java 类。随后，它利用 将`ObjectMapper`JSON 输出反序列化为目标类的 Java 对象实例。
* `MapOutputConverter `使用 FormatProvider 实现扩展 `AbstractMessageOutputConverter `的功能，该实现可指导 AI 模型生成符合 RFC8259 的 JSON 响应。此外，它还包含一个转换器实现，该实现利用提供的 `MessageConverter `将 JSON 负载转换为 `java.util.Map<String, Object>` 实例。
* `ListOutputConverter `扩展 `AbstractConversionServiceOutputConverter `并包含针对逗号分隔列表输出量身定制的 `FormatProvider `实现。转换器实现使用提供的 `ConversionService `将模型文本输出转换为` java.util.List`。



#### 使用转换器

##### Bean 输出转换器

以下示例显示如何使用`BeanOutputConverter`来生成演员的电影作品。

代表演员电影作品的目标记录：

```java
record ActorsFilms(String actor, List<String> movies) {
}
```

以下是如何使用高级、流畅的`ChatClient`API 应用 BeanOutputConverter：

```java
ActorsFilms actorsFilms = ChatClient.create(chatModel).prompt()
        .user(u -> u.text("Generate the filmography of 5 movies for {actor}.")
                    .param("actor", "Tom Hanks"))
        .call()
        .entity(ActorsFilms.class);
```

`ChatModel`或者直接使用低级API：

```java
BeanOutputConverter<ActorsFilms> beanOutputConverter =
    new BeanOutputConverter<>(ActorsFilms.class);

String format = this.beanOutputConverter.getFormat();

String actor = "Tom Hanks";

String template = """
        Generate the filmography of 5 movies for {actor}.
        {format}
        """;
            
Generation generation = chatModel.call(
    new PromptTemplate(this.template, Map.of("actor", this.actor, "format", this.format)).create()).getResult();

ActorsFilms actorsFilms = this.beanOutputConverter.convert(this.generation.getOutput().getContent());            
```



##### 生成的架构中的属性排序

通过注释支持`BeanOutputConverter`在生成的 JSON 架构中自定义属性排序`@JsonPropertyOrder`。此注释允许您指定属性在架构中出现的确切顺序，而不管它们在类或记录中的声明顺序如何。

例如，为了确保`ActorsFilms`记录中的属性的特定顺序：

```java
@JsonPropertyOrder({"actor", "movies"})
record ActorsFilms(String actor, List<String> movies) {}
```



##### 通用 Bean 类型

使用`ParameterizedTypeReference`构造函数指定更复杂的目标类结构。例如，表示演员及其电影作品的列表：

```java
List<ActorsFilms> actorsFilms = ChatClient.create(chatModel).prompt()
        .user("Generate the filmography of 5 movies for Tom Hanks and Bill Murray.")
        .call()
        .entity(new ParameterizedTypeReference<List<ActorsFilms>>() {});
```

`ChatModel`或者直接使用低级API：

```java
BeanOutputConverter<List<ActorsFilms>> outputConverter = new BeanOutputConverter<>(
        new ParameterizedTypeReference<List<ActorsFilms>>() { });

String format = this.outputConverter.getFormat();
String template = """
        Generate the filmography of 5 movies for Tom Hanks and Bill Murray.
        {format}
        """;

Prompt prompt = new PromptTemplate(this.template, Map.of("format", this.format)).create();

Generation generation = chatModel.call(this.prompt).getResult();

List<ActorsFilms> actorsFilms = this.outputConverter.convert(this.generation.getOutput().getContent());
```



##### Map 输出转换器

以下代码片段展示了如何使用`MapOutputConverter`将模型输出转换为地图中的数字列表。

```java
Map<String, Object> result = ChatClient.create(chatModel).prompt()
        .user(u -> u.text("Provide me a List of {subject}")
                    .param("subject", "an array of numbers from 1 to 9 under they key name 'numbers'"))
        .call()
        .entity(new ParameterizedTypeReference<Map<String, Object>>() {});
```

`ChatModel`或者直接使用低级API

```java
MapOutputConverter mapOutputConverter = new MapOutputConverter();

String format = this.mapOutputConverter.getFormat();
String template = """
        Provide me a List of {subject}
        {format}
        """;

Prompt prompt = new PromptTemplate(this.template,
        Map.of("subject", "an array of numbers from 1 to 9 under they key name 'numbers'", "format", this.format)).create();

Generation generation = chatModel.call(this.prompt).getResult();

Map<String, Object> result = this.mapOutputConverter.convert(this.generation.getOutput().getContent());
```



##### List 输出转换器

以下代码片段展示了如何使用`ListOutputConverter`将模型输出转换为冰淇淋口味列表。



#### 支持的 AI 模型

| 模型                                                         | 集成测试示例                                                 |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [OpenAI](https://docs.spring.io/spring-ai/reference/api/chat/openai-chat.html) | [OpenAiChatModelIT](https://github.com/spring-projects/spring-ai/blob/main/models/spring-ai-openai/src/test/java/org/springframework/ai/openai/chat/OpenAiChatModelIT.java) |
| [Anthropic Claude 3](https://docs.spring.io/spring-ai/reference/api/chat/anthropic-chat.html) | [AnthropicChatModelIT.java](https://github.com/spring-projects/spring-ai/blob/main/models/spring-ai-anthropic/src/test/java/org/springframework/ai/anthropic/AnthropicChatModelIT.java) |
| [Azure OpenAI](https://docs.spring.io/spring-ai/reference/api/chat/azure-openai-chat.html) | [AzureOpenAiChatModelIT.java](https://github.com/spring-projects/spring-ai/blob/main/models/spring-ai-azure-openai/src/test/java/org/springframework/ai/azure/openai/AzureOpenAiChatModelIT.java) |
| [Mistral AI](https://docs.spring.io/spring-ai/reference/api/chat/mistralai-chat.html) | [MistralAiChatModelIT.java](https://github.com/spring-projects/spring-ai/blob/main/models/spring-ai-mistral-ai/src/test/java/org/springframework/ai/mistralai/MistralAiChatModelIT.java) |
| [Ollama](https://docs.spring.io/spring-ai/reference/api/chat/ollama-chat.html) | [OllamaChatModelIT.java](https://github.com/spring-projects/spring-ai/blob/main/models/spring-ai-ollama/src/test/java/org/springframework/ai/ollama/OllamaChatModelIT.java) |
| [Vertex AI Gemini](https://docs.spring.io/spring-ai/reference/api/chat/vertexai-gemini-chat.html) | [VertexAiGeminiChatModelIT.java](https://github.com/spring-projects/spring-ai/blob/main/models/spring-ai-vertex-ai-gemini/src/test/java/org/springframework/ai/vertexai/gemini/VertexAiGeminiChatModelIT.java) |



#### 内置的json模式

一些 AI 模型提供专用的配置选项来生成结构化（通常是 JSON）输出。

* [OpenAI Structured Outputs](https://docs.spring.io/spring-ai/reference/api/chat/openai-chat.html#_structured_outputs)输出可以确保您的模型生成严格符合您提供的 JSON 模式的响应。您可以选择 JSON_OBJECT 来保证模型生成的消息是有效的 JSON，或者 `JSON_SCHEMA `带有提供的模式，保证模型将生成与您提供的模式匹配的响应（`spring.ai.openai.chat.options.responseFormat` 配置）。
* [Azure OpenAI](https://docs.spring.io/spring-ai/reference/api/chat/azure-openai-chat.html) - 提供 `spring.ai.azure.openai.chat.options.responseFormat` 指定模型必须输出的格式。设置为 `{ "type": "json_object" }` 可启用 JSON 模式，从而保证模型生成的消息是有效的 JSON。

- [Ollama](https://docs.spring.io/spring-ai/reference/api/chat/ollama-chat.html) - 提供 `spring.ai.ollama.chat.options.format` 配置指定返回响应的格式。目前，唯一接受的值是“json”。
- [Mistral AI](https://docs.spring.io/spring-ai/reference/api/chat/mistralai-chat.html) - 提供 `spring.ai.mistralai.chat.options.responseFormat` 选项来指定返回响应的格式。将其设置为 { "type": "json_object" } 可启用 JSON 模式，从而保证模型生成的消息是有效的 JSON。
