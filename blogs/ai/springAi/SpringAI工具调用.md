---
title: Spring AI工具调用
date: 2025-03-16
tags:
   - AI
   - Spring AI
---



*工具调用*（也称为*函数调用*）是 AI 应用程序中的常见模式，允许模型与一组 API 或*工具*进行交互，从而增强其功能。

工具主要用于：

* **信息检索**。此类别中的工具可用于从外部来源（例如数据库、Web 服务、文件系统或 Web 搜索引擎）检索信息。目标是增强模型的知识，使其能够回答原本无法回答的问题。因此，它们可用于检索增强生成 (RAG) 场景。例如，可以使用工具检索给定位置的当前天气、检索最新新闻文章或查询数据库中的特定记录。
* **采取行动**。此类别中的工具可用于在软件系统中采取行动，例如发送电子邮件、在数据库中创建新记录、提交表单或触发工作流。目标是自动执行原本需要人工干预或明确编程的任务。例如，可以使用工具为与聊天机器人交互的客户预订航班、在网页上填写表单或在代码生成场景中基于自动化测试 (TDD) 实现 Java 类。

尽管我们通常将*工具调用*称为模型功能，但实际上工具调用逻辑是由客户端应用程序提供的。模型只能请求工具调用并提供输入参数，而应用程序负责根据输入参数执行工具调用并返回结果。模型永远不会访问作为工具提供的任何 API，这是一个关键的安全考虑因素。

Spring AI 提供了便捷的 API 来定义工具、解析来自模型的工具调用请求并执行工具调用。以下部分概述了 Spring AI 中的工具调用功能。

> 检查[聊天模型比较，](https://docs.spring.io/spring-ai/reference/api/chat/comparison.html)了解哪些 AI 模型支持工具调用。



### 快速入门

让我们看看如何开始在 Spring AI 中使用工具调用。我们将实现两个简单的工具：一个用于信息检索，一个用于采取行动。信息检索工具将用于获取用户时区的当前日期和时间。行动工具将用于设置指定时间的闹钟。

#### 信息检索

AI 模型无法获取实时信息。任何需要了解当前日期或天气预报等信息的问题都无法由模型回答。但是，我们可以提供一个可以检索这些信息的工具，并让模型在需要获取实时信息时调用此工具。

让我们在一个类中实现一个工具来获取用户时区的当前日期和时间`DateTimeTools`。该工具不带任何参数。Spring `LocaleContextHolder`Framework 中的 可以提供用户的时区。该工具将被定义为带有 注释的方法`@Tool`。为了帮助模型理解是否以及何时调用此工具，我们将提供该工具功能的详细描述。

```java
class DateTimeTools {

    @Tool(description = "Get the current date and time in the user's timezone")
    String getCurrentDateTime() {
        return LocalDateTime.now().atZone(LocaleContextHolder.getTimeZone().toZoneId()).toString();
    }

}
```

接下来，让我们将工具提供给模型。在此示例中，我们将使用`ChatClient`与模型交互。我们将通过方法传递 的实例，将该工具提供给模型`DateTimeTools`。`tools()`当模型需要知道当前日期和时间时，它将请求调用该工具。在内部，`ChatClient`将调用该工具并将结果返回给模型，然后模型将使用工具调用结果生成对原始问题的最终响应。

```java
ChatModel chatModel = ...

String response = ChatClient.create(chatModel)
        .prompt("What day is tomorrow?")
        .tools(new DateTimeTools())
        .call()
        .content();

System.out.println(response);
```

输出结果如下：

```
Tomorrow is 2015-10-21.
```

可以重试再次提出相同的问题。这次，不要向模型提供该工具。输出将类似于：

```
I am an AI and do not have access to real-time information. Please provide the current date so I can accurately determine what day tomorrow will be.
```

如果没有这个工具，模型就不知道如何回答问题，因为它没有能力确定当前的日期和时间。

#### 采取行动

人工智能模型可用于生成实现某些目标的计划。例如，模型可以生成预订丹麦之旅的计划。但是，模型无法执行该计划。这就是工具的作用所在：它们可用于执行模型生成的计划。

在上一个示例中，我们使用了一个工具来确定当前日期和时间。在此示例中，我们将定义第二个工具，用于在特定时间设置闹钟。目标是设置从现在起 10 分钟后的闹钟，因此我们需要向模型提供这两个工具来完成此任务。

我们将新工具添加到`DateTimeTools`与之前相同的类中。新工具将采用单个参数，即 ISO-8601 格式的时间。然后，该工具将向控制台打印一条消息，表明已为给定时间设置了闹钟。与之前一样，该工具被定义为带有注释的方法`@Tool`，我们还使用它来提供详细描述，以帮助模型了解何时以及如何使用该工具。

接下来，让我们将这两个工具都提供给模型。我们将使用`ChatClient`与模型交互。我们将通过方法传递 的实例，将工具提供给模型`DateTimeTools`。`tools()`当我们要求设置 10 分钟后的闹钟时，模型首先需要知道当前日期和时间。然后，它将使用当前日期和时间来计算闹钟时间。最后，它将使用闹钟工具来设置闹钟。在内部，`ChatClient`将处理来自模型的任何工具调用请求并将任何工具调用执行结果发送回它，以便模型可以生成最终响应。

```java
ChatModel chatModel = ...

String response = ChatClient.create(chatModel)
        .prompt("Can you set an alarm 10 minutes from now?")
        .tools(new DateTimeTools())
        .call()
        .content();

System.out.println(response);
```

在应用程序日志中，您可以检查闹钟是否已在正确的时间设置。



## 概述

Spring AI 通过一组灵活的抽象来支持工具调用，这些抽象允许您以一致的方式定义、解析和执行工具。本节概述了 Spring AI 中工具调用的主要概念和组件。

1. 当我们想让模型可以使用某个工具时，我们会将其定义包含在聊天请求中。每个工具定义都包含一个名称、一个描述以及输入参数的架构。
2. 当模型决定调用某个工具时，它会发送一个响应，其中包含工具名称和根据定义的模式建模的输入参数。
3. 应用程序负责使用工具名称来识别工具并使用提供的输入参数来执行该工具。
4. 工具调用的结果由应用程序处理。
5. 应用程序将工具调用结果发送回模型。
6. 该模型使用工具调用结果作为附加上下文来生成最终响应。

工具是工具调用的构建块，它们由 `ToolCallback`接口建模。Spring AI 提供内置支持，用于从方法和函数指定 `ToolCallback`，但您始终可以定义自己的 `ToolCallback`实现以支持更多用例。

`ChatModel`实现透明地将工具调用请求分派到相应的 `ToolCallback`实现，并将工具调用结果发送回模型，最终生成最终响应。他们使用 `ToolCallingManager` 接口执行此操作，该接口负责管理工具执行生命周期。

`ChatClient`和 `ChatModel`都接受 `ToolCallback`对象列表，以使工具可用于模型和最终将执行它们的 `ToolCallingManager`。

除了直接传递 `ToolCallback`对象外，您还可以传递工具名称列表，这些列表将使用 `ToolCallbackResolver`接口动态解析。
以下部分将详细介绍所有这些概念和 `API`，包括如何自定义和扩展它们以支持更多用例。



### 方法作为工具

Spring AI 提供了内置支持，可以通过两种方式从方法中指定工具（即工具回调）：

* 声明式地使用`@Tool`注解
* 以编程方式，使用低级`MethodToolCallback`实现。

#### 声明性规范：`@Tool`

可以通过用 注释将方法转变为工具`@Tool`。

```java
class DateTimeTools {

    @Tool(description = "Get the current date and time in the user's timezone")
    String getCurrentDateTime() {
        return LocalDateTime.now().atZone(LocaleContextHolder.getTimeZone().toZoneId()).toString();
    }

}
```

注释`@Tool`允许您提供有关该工具的关键信息：

- `name`：工具的名称。如果未提供，则将使用方法名称。AI 模型在调用工具时使用此名称来识别工具。因此，不允许在同一个类中有两个同名的工具。对于特定聊天请求，模型可用的所有工具中的名称必须是唯一的。
- `description`：工具的描述，模型可以使用该描述来了解何时以及如何调用该工具。如果未提供，方法名称将用作工具描述。但是，强烈建议提供详细的描述，因为这对于模型了解工具的用途及其使用方法至关重要。如果无法提供良好的描述，则可能导致模型在应该使用工具时未使用或错误地使用工具。
- `returnDirect`：工具结果是否应直接返回给客户端或传回给模型。有关更多详细信息，请参阅[直接返回。](https://docs.spring.io/spring-ai/reference/1.0/api/tools.html#_return_direct)
- `resultConverter`：`ToolCallResultConverter`用于将工具调用的结果转换为要`String object`发送回 AI 模型的实现。有关更多详细信息，请参阅[结果转换。](https://docs.spring.io/spring-ai/reference/1.0/api/tools.html#_result_conversion)

方法可以是静态的，也可以是实例的，并且可以具有任意可见性（公共、受保护、包私有或私有）。包含该方法的类可以是顶级类或嵌套类，也可以具有任意可见性（只要它在您计划实例化它的地方是可访问的）。

> `@Tool`只要包含方法的类是 Spring bean（例如）， Spring AI 就会为带注释的方法提供内置的 AOT 编译支持`@Component`。否则，您需要向 GraalVM 编译器提供必要的配置。例如，通过使用注释类`@RegisterReflection(memberCategories = MemberCategory.INVOKE_DECLARED_METHODS)`。

您可以为该方法定义任意数量的参数（包括无参数），并且可以使用大多数类型（基元、POJO、枚举、列表、数组、映射等）。同样，该方法可以返回大多数类型，包括`void`。如果该方法返回值，则返回类型必须是可序列化类型，因为结果将被序列化并发送回模型。

> 某些类型不受支持。有关更多详细信息， 请参阅[方法工具限制。](https://docs.spring.io/spring-ai/reference/1.0/api/tools.html#_method_tool_limitations)

Spring AI 将自动为带注释的方法的输入参数生成 JSON 模式`@Tool`。模型使用该模式来了解如何调用工具并准备工具请求。`@ToolParam`注释可用于提供有关输入参数的其他信息，例如描述或参数是必需的还是可选的。默认情况下，所有输入参数都被视为必需的。

```java
class DateTimeTools {

    @Tool(description = "Set a user alarm for the given time")
    void setAlarm(@ToolParam(description = "Time in ISO-8601 format") String time) {
        LocalDateTime alarmTime = LocalDateTime.parse(time, DateTimeFormatter.ISO_DATE_TIME);
        System.out.println("Alarm set for " + alarmTime);
    }

}
```

注释`@ToolParam`允许您提供有关工具参数的关键信息：

* `description`：参数的描述，模型可以使用该描述来更好地理解如何使用该参数。例如，参数应采用什么格式、允许使用哪些值等等。
* `required`：参数是必需的还是可选的。默认情况下，所有参数都被视为必需的。

如果参数被注释为`@Nullable`，则它将被视为可选的，除非使用`@ToolParam`注释明确标记为需要。

除了`@ToolParam`注解之外，您还可以使用`@Schema`Swagger 或`@JsonProperty`Jackson 的注解。有关更多详细信息，请参阅[JSON Schema](https://docs.spring.io/spring-ai/reference/1.0/api/tools.html#_json_schema)。

##### 添加工具`ChatClient`

使用声明式规范方法时，您可以`tools()`在调用时将工具类实例传递给方法`ChatClient`。此类工具仅适用于它们添加到的特定聊天请求。

```java
ChatClient.create(chatModel)
    .prompt("What day is tomorrow?")
    .tools(new DateTimeTools())
    .call()
    .content();
```

在底层，`ChatClient`将在工具类实例中生成一个`ToolCallback`from each`@Tool`注释方法并将它们传递给模型。如果您希望`ToolCallback`自己生成，则可以使用`ToolCallbacks`实用程序类。

```java
ToolCallback[] dateTimeTools = ToolCallbacks.from(new DateTimeTools());
```

##### 添加默认工具`ChatClient`

使用声明式规范方法时，您可以`ChatClient.Builder`通过将工具类实例传递给`defaultTools()`方法添加默认工具。如果同时提供默认工具和运行时工具，则运行时工具将完全覆盖默认工具。

> `ChatClient`默认工具在由相同构建的 所有实例执行的所有聊天请求之间共享`ChatClient.Builder`。它们对于在不同聊天请求中常用的工具很有用，但如果使用不当，它们也可能很危险，冒着在它们不应该可用时使它们可用的风险。

```java
ChatModel chatModel = ...
ChatClient chatClient = ChatClient.builder(chatModel)
    .defaultTools(new DateTimeTools())
    .build();
```

##### 添加工具`ChatModel`

使用声明式规范方法时，您可以将工具类实例传递给用于调用`toolCallbacks()`的方法。此类工具仅适用于它们添加到的特定聊天请求。`ToolCallingChatOptions` `ChatModel`

```java
ChatModel chatModel = ...
ToolCallback[] dateTimeTools = ToolCallbacks.from(new DateTimeTools());
ChatOptions chatOptions = ToolCallingChatOptions.builder()
    .toolCallbacks(dateTimeTools)
    .build():
Prompt prompt = new Prompt("What day is tomorrow?", chatOptions);
chatModel.call(prompt);
```

##### 添加默认工具`ChatModel`

使用声明式规范方法时，可以在`ChatModel`构造时通过将工具类实例传递给用于创建的实例`toolCallbacks()`的方法来添加默认工具。 如果同时提供了默认工具和运行时工具，则运行时工具将完全覆盖默认工具。`ToolCallingChatOptions` `ChatModel`

> 默认工具在该实例执行的所有聊天请求之间共享`ChatModel`。它们对于在不同聊天请求之间常用的工具很有用，但如果使用不当，它们也可能很危险，可能会在它们不应该可用时让它们可用。

```java
ToolCallback[] dateTimeTools = ToolCallbacks.from(new DateTimeTools());
ChatModel chatModel = OllamaChatModel.builder()
    .ollamaApi(new OllamaApi())
    .defaultOptions(ToolCallingChatOptions.builder()
            .toolCallbacks(dateTimeTools)
            .build())
    .build();
```

##### 方法工具限制

以下类型目前不支持作为工具使用的方法的参数或返回类型：

- `Optional`
- 异步类型（`CompletableFuture`例如`Future`）
- 反应类型（例如`Flow`、`Mono`、`Flux`）
- 函数类型（例如`Function`、`Supplier`、`Consumer`）。

使用基于函数的工具规范方法支持函数类型。有关更多详细信息，请参阅[函数作为工具。](https://docs.spring.io/spring-ai/reference/1.0/api/tools.html#_functions_as_tools)



#### 函数作为工具

Spring AI 提供内置支持，可以从函数中指定工具，可以使用低级`FunctionToolCallback`实现以编程方式指定，也`@Bean`可以在运行时动态解析。

##### 程序规范：`FunctionToolCallback`

您可以通过以编程方式构建 `FunctionToolCallback ` 将功能类型（`Function`、`Supplier`、`Consumer`或 `BiFunction`）转变为工具。

```java
public class WeatherService implements Function<WeatherRequest, WeatherResponse> {
    public WeatherResponse apply(WeatherRequest request) {
        return new WeatherResponse(30.0, Unit.C);
    }
}

public enum Unit { C, F }
public record WeatherRequest(String location, Unit unit) {}
public record WeatherResponse(double temp, Unit unit) {}
```

允许`FunctionToolCallback.Builder`您构建`FunctionToolCallback`实例并提供有关该工具的关键信息：

* `name`：工具的名称。AI 模型使用此名称在调用工具时识别该工具。因此，不允许在同一上下文中有两个同名的工具。对于特定聊天请求，模型可用的所有工具中的名称必须是唯一的。必填。
* `toolFunction`：代表工具方法的功能对象（`Function`、`Supplier`、`Consumer`或`BiFunction`）。必填。
* `description`：工具的描述，模型可以使用该描述来了解何时以及如何调用该工具。如果未提供，方法名称将用作工具描述。但是，强烈建议提供详细的描述，因为这对于模型了解工具的用途及其使用方法至关重要。如果无法提供良好的描述，则可能导致模型在应该使用工具时未使用或错误地使用工具。
* `inputType`：函数输入的类型。必填。
* `inputSchema`：工具输入参数的 JSON 架构。如果未提供，将根据 自动生成架构`inputType`。您可以使用`@ToolParam`注释提供有关输入参数的其他信息，例如描述或参数是必需的还是可选的。默认情况下，所有输入参数都被视为必需的。有关更多详细信息，请参阅[JSON 架构。](https://docs.spring.io/spring-ai/reference/1.0/api/tools.html#_json_schema)
* `toolMetadata`：`ToolMetadata`定义其他设置的实例，例如是否应将结果直接返回给客户端以及要使用的结果转换器。您可以使用`ToolMetadata.Builder`类来构建它。
* `toolCallResultConverter`：`ToolCallResultConverter`用于将工具调用的结果转换为`String`要发送回 AI 模型的对象。如果未提供，则将使用默认转换器 ( `DefaultToolCallResultConverter`)。

允许`ToolMetadata.Builder`您构建`ToolMetadata`实例并定义该工具的其他设置：

- `returnDirect`：工具结果是否应直接返回给客户端或传回给模型。有关更多详细信息，请参阅[直接返回。](https://docs.spring.io/spring-ai/reference/1.0/api/tools.html#_return_direct)

```java
ToolCallback toolCallback = FunctionToolCallback
    .builder("currentWeather", new WeatherService())
    .description("Get the weather in location")
    .inputType(WeatherRequest.class)
    .build();
```

函数的输入和输出可以是`Void`或 POJO。输入和输出 POJO 必须是可序列化的，因为结果将被序列化并发送回模型。函数以及输入和输出类型必须是公共的。



### 工具执行

工具执行是使用提供的输入参数调用工具并返回结果的过程。工具执行由接口处理`ToolCallingManager`，接口负责管理工具执行生命周期。

```java
public interface ToolCallingManager {

	/**
	 * Resolve the tool definitions from the model's tool calling options.
	 */
	List<ToolDefinition> resolveToolDefinitions(ToolCallingChatOptions chatOptions);

	/**
	 * Execute the tool calls requested by the model.
	 */
	ToolExecutionResult executeToolCalls(Prompt prompt, ChatResponse chatResponse);

}
```

如果您正在使用任何 Spring AI Spring Boot Starters，`DefaultToolCallingManager`则是接口的自动配置实现`ToolCallingManager`。您可以通过提供自己的 bean 来自定义工具执行行为`ToolCallingManager`。

```java
@Bean
ToolCallingManager toolCallingManager() {
    return ToolCallingManager.builder().build();
}
```

默认情况下，Spring AI 会在每个实现中为您透明地管理工具执行生命周期`ChatModel`。但您可以选择退出此行为并自行控制工具执行。本节介绍这两种情况。

#### 框架控制的工具执行

使用默认行为时，Spring AI 将自动拦截来自模型的任何工具调用请求，调用该工具并将结果返回给模型。所有这一切都由每个 `ChatModel` 实现使用 `ToolCallingManager` 为您透明地完成。

1. 当我们想要让模型可以使用某个工具时，我们会将其定义包含在聊天请求（`Prompt`）中，并调用`ChatModel`将请求发送到 AI 模型的 API。
2. 当模型决定调用某个工具时，它会发送一个响应（`ChatResponse`），其中包含工具名称和根据定义的模式建模的输入参数。
3. 将`ChatModel`工具调用请求发送到`ToolCallingManager`API。
4. 负责`ToolCallingManager`识别要调用的工具并使用提供的输入参数执行它。
5. 工具调用的结果返回给`ToolCallingManager`。
6. 将`ToolCallingManager`工具执行结果返回给`ChatModel`。
7. 将`ChatModel`工具执行结果发送回AI模型（`ToolResponseMessage`）。
8. AI模型使用工具调用结果作为附加上下文生成最终响应，并通过 `ChatClient` 将其发送回调用者（`ChatResponse`）。

> 目前，与模型交换的有关工具执行的内部消息未向用户公开。如果需要访问这些消息，则应使用用户控制的工具执行方法。

#### 用户控制的工具执行

在某些情况下，您更愿意自己控制工具执行生命周期。您可以通过`internalToolExecutionEnabled`将 的属性设置为 来实现`ToolCallingChatOptions`这一点`false`。当您使用此选项调用 时`ChatModel`，工具执行将委托给调用者，让您完全控制工具执行生命周期。您有责任检查 中的工具调用`ChatResponse`并使用 执行它们`ToolCallingManager`。

以下示例演示了用户控制工具执行方法的最小实现：

```java
ChatModel chatModel = ...
ToolCallingManager toolCallingManager = ToolCallingManager.builder().build();

ChatOptions chatOptions = ToolCallingChatOptions.builder()
    .toolCallbacks(new CustomerTools())
    .internalToolExecutionEnabled(false)
    .build();

Prompt prompt = new Prompt("Tell me more about the customer with ID 42", chatOptions);

ChatResponse chatResponse = chatModel.call(prompt);

while (chatResponse.hasToolCalls()) {
    ToolExecutionResult toolExecutionResult = toolCallingManager.executeToolCalls(prompt, chatResponse);

    prompt = new Prompt(toolExecutionResult.conversationHistory(), chatOptions);

    chatResponse = chatModel.call(prompt);
}

System.out.println(chatResponse.getResult().getOutput().getText());
```

> 当选择用户控制的工具执行方法时，我们建议使用 来`ToolCallingManager`管理工具调用操作。这样，您就可以从 Spring AI 为工具执行提供的内置支持中受益。但是，没有什么可以阻止您实现自己的工具执行逻辑。



#### 异常处理

当工具调用失败时，异常将作为 进行传播，`ToolExecutionException`可以捕获该异常来处理错误。`ToolExecutionExceptionProcessor`可用于处理 ，`ToolExecutionException`结果有两种：要么生成错误消息并发送回 AI 模型，要么抛出异常并由调用者处理。

```java
@FunctionalInterface
public interface ToolExecutionExceptionProcessor {

	/**
	 * Convert an exception thrown by a tool to a String that can be sent back to the AI
	 * model or throw an exception to be handled by the caller.
	 */
	String process(ToolExecutionException exception);

}
```

如果您正在使用任何 Spring AI Spring Boot Starters，`DefaultToolExecutionExceptionProcessor`则是`ToolExecutionExceptionProcessor`接口的自动配置实现。默认情况下，错误消息将发送回模型。`DefaultToolExecutionExceptionProcessor`构造函数允许您将`alwaysThrow`属性设置为`true`或`false`。如果`true`，则会抛出异常，而不是将错误消息发送回模型。

```java
@Bean
ToolExecutionExceptionProcessor toolExecutionExceptionProcessor() {
    return new DefaultToolExecutionExceptionProcessor(true);
}
```

> 如果您定义了自己的实现，请确保在方法中作为工具执行逻辑的一部分发生错误时`ToolCallback`抛出。 `ToolExecutionException``call()`

`ToolExecutionExceptionProcessor`默认情况下`ToolCallingManager`( ) 在内部使用`DefaultToolCallingManager`来处理工具执行期间的异常。有关工具执行生命周期的更多详细信息，请参阅[工具执行。](https://docs.spring.io/spring-ai/reference/1.0/api/tools.html#_tool_execution)



###  工具解析器

将工具传递给模型的主要方法是在`ToolCallback`调用`ChatClient`或时提供（s），使用[方法作为工具](https://docs.spring.io/spring-ai/reference/1.0/api/tools.html#_methods_as_tools)和[函数作为工具](https://docs.spring.io/spring-ai/reference/1.0/api/tools.html#_functions_as_tools)`ChatModel`中描述的策略之一。

但是，Spring AI 还支持在运行时使用`ToolCallbackResolver`接口动态解析工具。

```java
public interface ToolCallbackResolver {

	/**
	 * Resolve the {@link ToolCallback} for the given tool name.
	 */
	@Nullable
	ToolCallback resolve(String toolName);

}
```

使用此方法时：

- 在客户端，您可以向`ChatClient`或`ChatModel`而不是`ToolCallback`(s) 提供工具名称。
- 在服务器端，`ToolCallbackResolver`实现负责将工具名称解析为相应的`ToolCallback`实例。

默认情况下，Spring AI 依赖于`DelegatingToolCallbackResolver`将工具解析委托给`ToolCallbackResolver`实例列表：

- 解析来自`SpringBeanToolCallbackResolver`类型的 Spring bean 的工具。有关更多详细信息，请参阅[动态规范： 。](https://docs.spring.io/spring-ai/reference/1.0/api/tools.html#_dynamic_specification_bean)`Function` `Supplier` `Consumer` `BiFunction`[`@Bean`](https://docs.spring.io/spring-ai/reference/1.0/api/tools.html#_dynamic_specification_bean)
- `StaticToolCallbackResolver`从静态实例列表中解析工具。`ToolCallback`使用 Spring Boot 自动配置时，此解析器会自动配置`ToolCallback`应用程序上下文中定义的所有类型的 bean。

如果您依赖 Spring Boot 自动配置，则可以通过提供自定义`ToolCallbackResolver`bean 来定制解析逻辑。

```java
@Bean
ToolCallbackResolver toolCallbackResolver(List<FunctionCallback> toolCallbacks) {
    StaticToolCallbackResolver staticToolCallbackResolver = new StaticToolCallbackResolver(toolCallbacks);
    return new DelegatingToolCallbackResolver(List.of(staticToolCallbackResolver));
}
```

`ToolCallbackResolver`由 内部使用，`ToolCallingManager`在运行时动态解析工具，支持[框架控制的工具执行](https://docs.spring.io/spring-ai/reference/1.0/api/tools.html#_framework_controlled_tool_execution)和[用户控制的工具执行](https://docs.spring.io/spring-ai/reference/1.0/api/tools.html#_user_controlled_tool_execution)。
