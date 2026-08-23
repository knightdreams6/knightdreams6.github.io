---
title: LLM 核心生成参数详解：Temperature、TopP、TopK 到底怎么调？

date: 2026-08-23 17:23
tags:
  - AI

description: 系统讲解 LLM 常见生成参数 Temperature、TopP、TopK、MaxTokens、RepetitionPenalty、PresencePenalty 与 Seed 的作用、区别及不同业务场景下的推荐配置。
---

# LLM 核心生成参数详解：Temperature、TopP、TopK 到底怎么调？

在接入大语言模型时，经常会看到这些参数：

```java
temperature
topP
topK
maxTokens
repetitionPenalty
presencePenalty
seed
```

它们看起来只是几个数字，但实际上会直接影响模型输出的：

- 稳定性
- 随机性
- 创造性
- 重复程度
- 输出长度
- 可复现性

如果参数设置不合理，就可能出现一些典型问题：

```text
Router 每次判断结果不一致
Agent Tool Calling 参数容易跑偏
JSON 输出格式不稳定
聊天内容重复
创作结果过于保守
Prompt 改写偏离用户原意
```

本文从 Token 采样原理出发，系统解释这些核心参数分别控制什么，以及在 Router、Agent、普通聊天和创作场景中应该如何选择。

---

## 1. 模型到底是怎么生成文本的？

LLM 并不是一次性把整段答案“想出来”。

它的核心过程其实是在不断执行：

```text
已有上下文
    ↓
预测下一个 Token
    ↓
得到一组 Token 概率
    ↓
根据采样策略选择一个 Token
    ↓
追加到上下文
    ↓
继续预测
```

假设输入：

```text
今天天气很好，我们去公园____
```

模型可能预测：

| Token | 概率 |
| --- | ---: |
| 散步 | 50% |
| 玩 | 20% |
| 跑步 | 15% |
| 拍照 | 8% |
| 喂鸽子 | 4% |
| 睡觉 | 2% |
| 写代码 | 1% |

最终模型选择哪个 Token，并不一定永远选择概率最高的“散步”。

它还会受到采样参数影响。

可以先记住：

| 参数 | 主要作用 |
| --- | --- |
| `temperature` | 控制概率分布有多随机 |
| `topP` | 控制多大的累计概率范围可以参与采样 |
| `topK` | 控制最多多少个候选 Token 可以参与采样 |
| `maxTokens` | 控制最多生成多长 |
| `repetitionPenalty` | 降低重复表达 |
| `presencePenalty` | 鼓励产生新的内容 |
| `seed` | 提高结果可复现性 |

一句话记忆：

```text
Temperature       → 有多随机
TopP              → 多大概率范围能参加
TopK              → 最多多少个候选能参加
MaxTokens         → 最多说多长
RepetitionPenalty → 别一直重复
PresencePenalty   → 多说点新的
Seed              → 尽量复现同样结果
```

---

## 2. Temperature：控制随机程度

```java
private Float temperature;
```

`temperature` 是最常见，也是最重要的生成参数之一。

它控制的是：

> 模型在选择下一个 Token 时，对低概率候选有多大的容忍度。

可以简单理解成：

```text
Temperature 越低
→ 概率分布越集中
→ 越倾向选择高概率 Token
→ 输出更加稳定

Temperature 越高
→ 概率分布越平滑
→ 低概率 Token 获得更多机会
→ 输出更加多样
```

假设原始概率：

| Token | 概率 |
| --- | ---: |
| 散步 | 50% |
| 玩 | 20% |
| 跑步 | 15% |
| 拍照 | 8% |
| 喂鸽子 | 4% |
| 其他 | 3% |

### 2.1 低 Temperature

例如：

```java
.temperature(0.1f)
```

概率会进一步向最高概率 Token 集中：

```text
散步    ████████████████████
玩      █
跑步    ▏
拍照    ▏
```

模型很可能稳定生成：

```text
今天天气很好，我们去公园散步。
```

特点：

- 稳定
- 可预测
- 不容易跑偏
- 创造性较低

适合：

- Router
- 意图识别
- Agent 决策
- Tool Calling
- Structured Output
- JSON 生成
- SQL 生成
- 代码生成

### 2.2 高 Temperature

例如：

```java
.temperature(0.9f)
```

概率分布会更加平滑：

```text
散步    ████████
玩      █████
跑步    ████
拍照    ███
喂鸽子  ██
```

结果可能是：

```text
我们去公园拍照。
```

也可能是：

```text
我们去公园喂鸽子。
```

特点：

- 多样性更高
- 创造性更强
- 多次生成结果差异更大
- 稳定性下降

更适合：

- 创意写作
- 角色聊天
- 头脑风暴
- 广告文案
- Prompt 扩写

可以粗略理解成：

```text
0.1  Router / Intent
0.3  Agent / Code / 图片编辑 Prompt
0.5  普通聊天 / 图生视频 Prompt
0.7  文生图 Prompt
0.9  创意写作
```

> 注意：不同模型对 `temperature` 的支持范围并不完全一致。有的模型使用 `0~1`，有的允许到 `2`，也有模型会忽略部分采样参数，应以具体模型文档为准。

---

## 3. TopP：控制概率候选范围

```java
private Double topP;
```

`topP` 又叫：

```text
Nucleus Sampling
核采样
```

它控制的是：

> 按概率从高到低排序后，累计多少概率范围内的 Token 可以参与采样。

例如：

| Token | 概率 | 累计概率 |
| --- | ---: | ---: |
| 散步 | 50% | 50% |
| 玩 | 20% | 70% |
| 跑步 | 15% | 85% |
| 拍照 | 8% | 93% |
| 喂鸽子 | 4% | 97% |
| 睡觉 | 2% | 99% |
| 写代码 | 1% | 100% |

如果设置：

```java
.topP(0.7)
```

累计达到 70% 时，候选池基本已经满足要求：

```text
散步
玩
```

后面的低概率候选就不会参与。

如果设置：

```java
.topP(0.9)
```

候选范围扩大，大致可能包括：

```text
散步
玩
跑步
拍照
```

所以可以记成：

```text
TopP 小
→ 候选范围小
→ 更稳定

TopP 大
→ 候选范围大
→ 更多样
```

---

## 4. TopK：限制候选数量

```java
private Integer topK;
```

`topK` 和 `topP` 都是在缩小 Token 候选池，但逻辑不同：

```text
TopK 看数量
TopP 看累计概率
```

例如：

```text
A  40%
B  25%
C  15%
D  10%
E   5%
F   3%
G   2%
```

设置：

```java
.topK(3)
```

只允许概率最高的三个 Token：

```text
A
B
C
```

其他候选直接排除。

因此：

```text
topK = 1
```

意味着候选池最多只有一个 Token，行为会非常保守。

而：

```text
topK = 50
```

意味着最多允许前 50 个 Token 进入后续采样过程。

实际业务中，如果没有明确的调优依据，通常建议：

> `topK` 优先使用模型默认值。

相比 `temperature` 和 `topP`，很多业务没有必要主动调整 `topK`。

---

## 5. Temperature、TopP、TopK 到底有什么区别？

这是最容易混淆的三个参数。

可以这样记：

```text
Temperature
→ 调整候选之间的概率差距

TopK
→ 最多允许多少个候选

TopP
→ 累计多大的概率范围可以参与
```

一个用于理解的简化流程：

```text
模型输出 Logits
        ↓
Temperature
调整概率分布
        ↓
候选筛选
TopK / TopP
        ↓
Sampling
随机采样
        ↓
得到下一个 Token
```

例如：

```java
.temperature(0.7f)
.topP(0.9)
.topK(50)
```

可以粗略理解为：

```text
允许一定随机性
    ↓
限制候选范围
    ↓
从保留下来的 Token 中采样
```

需要特别注意：

> TopK 和 TopP 的具体执行顺序、实现细节与概率归一化方式可能因模型服务、推理框架而不同，上面的流程主要用于帮助理解，而不是所有模型内部实现的严格标准流程。

---

## 6. RepetitionPenalty：减少重复表达

```java
private Float repetitionPenalty;
```

`repetitionPenalty` 用于降低模型重复已经生成内容的概率。

通常：

```text
1.0
```

表示不额外进行重复惩罚。

例如没有惩罚时：

```text
Spring AI 是一个 AI 框架，Spring AI 可以帮助开发 AI 应用，
Spring AI 还可以提供……
```

模型不断重复：

```text
Spring AI
Spring AI
Spring AI
```

设置：

```java
.repetitionPenalty(1.1f)
```

可能变成：

```text
Spring AI 是一个 AI 应用开发框架，它可以帮助开发者接入模型，
同时提供 Tool Calling、Structured Output 等能力。
```

常见理解：

```text
1.0
→ 不额外惩罚

1.05
→ 轻微降低重复

1.1
→ 更明显降低重复

1.2+
→ 谨慎使用
```

设置过高并不一定更好。

模型可能为了避免重复，连正常应该重复出现的：

```text
类名
变量名
技术术语
产品名称
```

也刻意替换掉，最终导致内容不自然甚至技术表达不准确。

---

## 7. PresencePenalty：鼓励模型探索新内容

```java
private Float presencePenalty;
```

`presencePenalty` 关注的是：

> 某个 Token 或概念是否已经出现过。

如果已经出现，提高 Presence Penalty 后，它再次出现的倾向会降低，从而促使模型尝试新的内容方向。

例如 Prompt：

```text
给我一些 AI 产品创意。
```

`presencePenalty = 0` 时：

```text
AI 聊天助手
AI 客服助手
AI 写作助手
AI 编程助手
AI 学习助手
```

方向比较集中。

提高：

```java
.presencePenalty(0.5f)
```

可能得到：

```text
AI 健身教练
智能旅行规划
会议决策系统
互动故事生成
智能衣橱管理
```

可以简单理解：

```text
PresencePenalty 越高
→ 越鼓励模型探索之前没有出现过的方向
```

对于以下任务一般不建议主动提高：

```text
Router
Intent
Agent Decision
Tool Calling
Structured Output
```

因为这些场景需要的是准确性，而不是“想出更多不同方向”。

---

## 8. RepetitionPenalty 和 PresencePenalty 有什么区别？

它们看起来都在处理“重复”，但目标并不完全相同。

| 参数 | 主要目标 |
| --- | --- |
| `repetitionPenalty` | 避免重复词句和表达 |
| `presencePenalty` | 鼓励探索尚未出现的内容 |

可以简单记成：

```text
RepetitionPenalty
→ 别一直重复说

PresencePenalty
→ 尝试说点新的
```

另外需要注意：

> 不同模型供应商对 Penalty 参数的定义并不完全一致，有些模型支持 `frequencyPenalty / presencePenalty`，有些使用 `repetitionPenalty`，计算公式也可能不同，不建议把不同模型之间的数值直接横向比较。

---

## 9. Seed：提高结果可复现性

```java
private Integer seed;
```

`seed` 是随机数种子。

例如：

```java
.seed(1234)
```

在以下条件基本一致时：

```text
Model
Prompt
System Prompt
History
Temperature
TopP
TopK
Seed
```

模型通常更容易生成相同或相近的结果。

Seed 特别适合：

```text
单元测试
Prompt 回归测试
Router 测试
Agent 调试
模型参数对比
```

例如测试 Router：

```text
Case 1：帮我画一只猫
Case 2：再来一张
Case 3：换成夜晚
Case 4：把这张图片做成视频
Case 5：你觉得这张图片怎么样？
```

固定：

```java
.seed(1234)
```

可以尽量减少随机因素干扰。

但要注意：

> Seed 通常只能提高可复现性，并不代表结果能够 100% 完全一致。

只要模型版本、推理引擎、硬件环境、上下文或服务端实现发生变化，都可能造成结果差异。

---

## 10. MaxTokens：限制最大输出长度

```java
private Integer maxTokens;
```

`maxTokens` 控制：

> 单次请求最多允许模型生成多少 Token。

例如：

```java
.maxTokens(1200)
```

表示模型最多允许输出大约 1200 个 Token。

但需要注意：

```text
Token ≠ 汉字数
Token ≠ 字符数
Token ≠ 英文单词数
```

Token 是经过模型 Tokenizer 切分后的基本单位。

不同模型的 Tokenizer 也可能不同。

### 10.1 Context Window

模型通常存在最大上下文窗口，例如：

```text
128K Token
```

一般需要满足：

```text
输入 Token
+
输出 Token
<=
Context Window
```

例如当前：

```text
Context Window = 128K
Prompt + History = 120K
```

理论上留给输出的空间就只剩约：

```text
8K
```

因此 `maxTokens` 会同时影响：

- 最大输出长度
- 请求延迟
- Token 成本
- Context Window 使用
- 是否可能被截断

---

## 11. 参数应该怎么分类？

可以把常见生成参数分成四类：

```text
LLM Generation Parameters
│
├── 采样控制
│   ├── temperature
│   ├── topP
│   └── topK
│
├── 内容控制
│   ├── repetitionPenalty
│   └── presencePenalty
│
├── 长度控制
│   └── maxTokens
│
└── 可复现性
    └── seed
```

如果再按照业务重要程度分类：

### 11.1 第一优先级

```text
temperature
topP
maxTokens
```

这是绝大多数业务最值得关注的三个参数。

### 11.2 第二优先级

```text
topK
repetitionPenalty
presencePenalty
```

通常在出现明确问题后再针对性调整。

### 11.3 辅助参数

```text
seed
```

更多用于测试、回归和调试。

---

## 12. 不同业务场景怎么选？

下面这些参数不是“标准答案”，更适合作为第一版调试基线。

最终仍然应该针对：

```text
具体模型
+
具体 Prompt
+
具体业务数据
```

进行实际测试。

| 场景 | Temperature | TopP | RepetitionPenalty | PresencePenalty |
| --- | ---: | ---: | ---: | ---: |
| Router / 意图识别 | `0.1` | `0.8` | `1.0` | `0.0` |
| Agent / Tool Calling | `0.1~0.3` | `0.8` | `1.0` | `0.0` |
| 代码生成 | `0.1~0.3` | `0.8` | `1.0` | `0.0` |
| 普通 AI 问答 | `0.3~0.6` | `0.85~0.9` | `1.0` | `0.0` |
| 图片编辑 Prompt | `0.3` | `0.85` | `1.0` | `0.0` |
| 图生视频 Prompt | `0.5` | `0.9` | `1.0` | `0.1` |
| 文生图 Prompt | `0.7` | `0.9` | `1.05` | `0.2` |
| 角色聊天 | `0.6~0.9` | `0.9~1.0` | `1.05` | `0.1~0.3` |
| 创意写作 | `0.8~1.0` | `0.9~1.0` | `1.05~1.1` | `0.2~0.5` |

`topK` 建议优先保持模型默认值，除非经过实际测试确认确实需要调整。

---

## 13. Router 应该怎么配置？

Router 和普通聊天最大的区别是：

> Router 追求的不是创造力，而是稳定、准确、可预测。

典型流程：

```text
用户请求
    ↓
Intent 判断
    ↓
模型选择
    ↓
风险判断
    ↓
Prompt 构造
    ↓
Structured Output
```

这类任务应该明显降低随机性。

可以从下面这组参数开始：

```java
DashScopeChatOptions.builder()
        .temperature(0.1)
        .topP(0.8)
        .repetitionPenalty(1.0f)
        .presencePenalty(0.0f)
        .seed(1234)
        .maxTokens(1200)
        .build();
```

但需要注意：

Router 的准确率主要依赖：

```text
System Prompt
    >
Structured Output Schema
    >
业务规则
    >
Few-shot Examples
    >
Temperature
    >
TopP / TopK
```

采样参数只能让 Router 更稳定。

它无法弥补一个设计不清晰的 Prompt。

例如如果 System Prompt 对：

```text
TEXT_TO_IMAGE
IMAGE_EDIT
IMAGE_TO_VIDEO
CHAT
```

边界定义本身就模糊，把：

```java
.temperature(0.0)
```

也不会自动解决问题。

---

## 14. Agent / Tool Calling 怎么配置？

Agent 通常也属于确定性任务。

因为模型需要完成：

```text
理解任务
    ↓
判断是否调用工具
    ↓
选择 Tool
    ↓
生成 Tool Arguments
```

如果随机性过高，很容易出现：

```text
本来应该调用 search，却直接回答
本来不需要 Tool，却强行调用
Tool Arguments 字段不稳定
枚举值生成错误
```

推荐从：

```java
.temperature(0.1f)
.topP(0.8)
.repetitionPenalty(1.0f)
.presencePenalty(0.0f)
```

开始调试。

对于 Agent：

> Prompt、Tool Schema 和参数约束，通常比把 Temperature 从 0.2 调到 0.1 更重要。

---

## 15. 创作类 Prompt 应该怎么配置？

这里有一个非常重要的区分。

下面讨论的：

```java
temperature
topP
presencePenalty
```

控制的是：

> 用 LLM 生成或改写图片 / 视频 Prompt 时的文本生成行为。

它们并不等价于真正的：

```text
图片生成模型参数
视频生成模型参数
```

例如：

```text
LLM
用户："画一只猫"
    ↓
生成完整 Prompt
"一只橘色猫坐在窗边..."
    ↓
Image Model
真正生成图片
```

这里调整 Temperature，影响的是第一步的 Prompt 扩写。

不是直接控制图片模型的随机种子、CFG、Steps 等生成参数。

### 15.1 文生图 Prompt

目标：

> 保留用户核心意图，同时适当补充构图、光线、环境、材质和视觉风格。

推荐起点：

```java
.temperature(0.7f)
.topP(0.9)
.repetitionPenalty(1.05f)
.presencePenalty(0.2f)
.maxTokens(1500)
```

这类场景可以允许一定创造性。

例如用户：

```text
画一只猫
```

模型可以合理补全成：

```text
一只橘色短毛猫坐在窗边，柔和的午后阳光从侧面照射，
浅景深，毛发细节清晰，自然摄影风格……
```

但不能变成：

```text
一只猫驾驶宇宙飞船飞向火星
```

所以创造性仍然需要受到用户原始意图约束。

### 15.2 图片编辑 Prompt

图片编辑与文生图完全不同。

核心目标是：

> 用户让你改什么，就改什么；没有要求修改的内容尽量保持不变。

例如：

```text
把天空换成夜晚
```

正确目标应该是：

```text
天空 → 夜晚
人物 → 保持
构图 → 保持
建筑 → 保持
主体身份 → 保持
```

所以随机性应该明显低于文生图：

```java
.temperature(0.3f)
.topP(0.85)
.repetitionPenalty(1.0f)
.presencePenalty(0.0f)
.maxTokens(1200)
```

对于图片编辑：

> 忠实执行指令 > 创造性。

### 15.3 图生视频 Prompt

图生视频需要在原始图片基础上增加：

```text
主体运动
环境动态
镜头运动
时间变化
```

例如静态图片：

```text
女孩站在海边
```

可以生成：

```text
女孩的头发被海风轻轻吹动，裙摆自然摆动，
远处海浪缓慢翻涌，镜头轻微向前推进。
```

它需要一定创造力，但不能破坏原始图片主体。

因此通常介于图片编辑和文生图之间：

```java
.temperature(0.5f)
.topP(0.9)
.repetitionPenalty(1.0f)
.presencePenalty(0.1f)
.maxTokens(1200)
```

---

## 16. 为什么不建议同时疯狂调整所有参数？

很多人调模型时容易这样：

```text
temperature 从 0.5 → 0.7
topP 从 0.8 → 0.95
topK 从 20 → 50
presencePenalty 从 0 → 0.5
repetitionPenalty 从 1 → 1.2
```

最后发现结果变了，却不知道究竟是谁导致的。

更推荐：

```text
先固定 Prompt
    ↓
只调 Temperature
    ↓
确定基本随机程度
    ↓
再调 TopP
    ↓
出现重复再调 Penalty
    ↓
最后根据需要调整其他参数
```

也就是说：

> 一次只改变一个主要变量。

否则很难建立可靠的模型参数经验。

---

## 17. 一个更实用的调参顺序

实际业务里，建议按照这个顺序调试：

```text
① Prompt / System Prompt
        ↓
② Structured Output / Tool Schema
        ↓
③ Temperature
        ↓
④ TopP
        ↓
⑤ MaxTokens
        ↓
⑥ Repetition / Presence Penalty
        ↓
⑦ TopK
        ↓
⑧ Seed
```

为什么 Prompt 排第一？

因为很多所谓“模型不稳定”，其实根本不是参数问题。

例如：

```text
角色边界没定义
Intent 边界模糊
JSON Schema 太宽松
Tool 描述不清楚
上下文混入无关信息
```

这些问题，单纯调整 Temperature 很难真正解决。

---

## 18. 最终怎么记？

如果只记住七句话：

```text
Temperature
→ 有多随机

TopP
→ 多大概率范围能参加

TopK
→ 最多多少个候选能参加

MaxTokens
→ 最多生成多长

RepetitionPenalty
→ 少重复

PresencePenalty
→ 多探索

Seed
→ 尽量复现
```

然后再记一个业务原则：

```text
Router / Agent / Tool Calling
→ 稳定优先

普通聊天
→ 稳定与自然平衡

文生图 / 创意写作
→ 适当增加多样性

图片编辑
→ 指令忠实度优先

图生视频
→ 在忠于原图的基础上增加合理动态
```

最后，还有一个比参数本身更重要的原则：

> 不要脱离具体模型讨论“最佳参数”。

同样的：

```java
.temperature(0.7)
```

在不同模型、不同服务商、不同 Prompt、不同任务下，结果可能完全不同。

所以这些参数更应该被看作：

> 调试起点，而不是标准答案。

真正稳定的生产配置，一定来自：

```text
业务测试集
+
Prompt 回归测试
+
模型实际表现
+
持续评估
```

而不是单纯复制一组所谓的“最佳参数”。
