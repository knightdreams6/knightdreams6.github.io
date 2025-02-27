---
title: 矢量数据库
date: 2025-02-27
tags:
   - AI
   - Spring AI
---



矢量数据库是一种特殊类型的数据库，在人工智能应用中发挥着至关重要的作用。

在向量数据库中，查询与传统的关系数据库不同。它们不是进行精确匹配，而是执行相似性搜索。当给定一个向量作为查询时，向量数据库会返回与查询向量“相似”的向量。有关如何在高级层面计算这种相似性的更多详细信息，请参阅[向量相似性](https://docs.spring.io/spring-ai/reference/api/vectordbs/understand-vectordbs.html#vectordbs-similarity)。

向量数据库用于将您的数据与 AI 模型集成。使用它们的第一步是将您的数据加载到向量数据库中。然后，当要将用户查询发送到 AI 模型时，首先检索一组类似的文档。然后，这些文档作为用户问题的上下文，并与用户的查询一起发送到 AI 模型。这种技术称为[检索增强生成 (RAG)](https://docs.spring.io/spring-ai/reference/concepts.html#concept-rag)。

以下部分介绍了使用多个矢量数据库实现的 Spring AI 接口以及一些高级示例用法。

### API 概述

`VectorStore`本节作为Spring AI 框架内的接口及其相关类的指南。

Spring AI 提供了一个抽象的API，用于通过`VectorStore`接口与矢量数据库进行交互。

以下是`VectorStore`接口定义：

```java
public interface VectorStore extends DocumentWriter {

    default String getName() {
		return this.getClass().getSimpleName();
	}

    void add(List<Document> documents);

    void delete(List<String> idList);

    void delete(Filter.Expression filterExpression);

    default void delete(String filterExpression) { ... };

    List<Document> similaritySearch(String query);

    List<Document> similaritySearch(SearchRequest request);

    default <T> Optional<T> getNativeClient() {
		return Optional.empty();
	}
}
```

以及相关的`SearchRequest` builder：

```java
public class SearchRequest {

	public static final double SIMILARITY_THRESHOLD_ACCEPT_ALL = 0.0;

	public static final int DEFAULT_TOP_K = 4;

	private String query = "";

	private int topK = DEFAULT_TOP_K;

	private double similarityThreshold = SIMILARITY_THRESHOLD_ACCEPT_ALL;

	@Nullable
	private Filter.Expression filterExpression;

    public static Builder from(SearchRequest originalSearchRequest) {
		return builder().query(originalSearchRequest.getQuery())
			.topK(originalSearchRequest.getTopK())
			.similarityThreshold(originalSearchRequest.getSimilarityThreshold())
			.filterExpression(originalSearchRequest.getFilterExpression());
	}

	public static class Builder {

		private final SearchRequest searchRequest = new SearchRequest();

		public Builder query(String query) {
			Assert.notNull(query, "Query can not be null.");
			this.searchRequest.query = query;
			return this;
		}

		public Builder topK(int topK) {
			Assert.isTrue(topK >= 0, "TopK should be positive.");
			this.searchRequest.topK = topK;
			return this;
		}

		public Builder similarityThreshold(double threshold) {
			Assert.isTrue(threshold >= 0 && threshold <= 1, "Similarity threshold must be in [0,1] range.");
			this.searchRequest.similarityThreshold = threshold;
			return this;
		}

		public Builder similarityThresholdAll() {
			this.searchRequest.similarityThreshold = 0.0;
			return this;
		}

		public Builder filterExpression(@Nullable Filter.Expression expression) {
			this.searchRequest.filterExpression = expression;
			return this;
		}

		public Builder filterExpression(@Nullable String textExpression) {
			this.searchRequest.filterExpression = (textExpression != null)
					? new FilterExpressionTextParser().parse(textExpression) : null;
			return this;
		}

		public SearchRequest build() {
			return this.searchRequest;
		}

	}

	public String getQuery() {...}
	public int getTopK() {...}
	public double getSimilarityThreshold() {...}
	public Filter.Expression getFilterExpression() {...}
}
```

要将数据插入矢量数据库，请将其封装在`Document`对象中。该类`Document`封装了来自数据源（例如 PDF 或 Word 文档）的内容，并包括以字符串表示的文本。它还包含键值对形式的元数据，包括文件名等详细信息。

插入向量数据库后，文本内容会`float[]`使用嵌入模型转换为数值数组（或称为向量嵌入）。嵌入模型（例如[Word2Vec](https://en.wikipedia.org/wiki/Word2vec)、[GLoVE](https://en.wikipedia.org/wiki/GloVe_(machine_learning))和[BERT](https://en.wikipedia.org/wiki/BERT_(language_model))或 OpenAI 的`text-embedding-ada-002`）用于将单词、句子或段落转换为这些向量嵌入。

向量数据库的作用是存储这些嵌入并促进相似性搜索。它本身不会生成嵌入。要创建向量嵌入，`EmbeddingModel`应使用。

接口中的方法`similaritySearch`允许检索与给定查询字符串相似的文档。可以使用以下参数对这些方法进行微调：

- `k`：一个整数，指定要返回的相似文档的最大数量。这通常称为“前 K 个”搜索或“K 个最近邻居”（KNN）。
- `threshold`：范围从 0 到 1 的双精度值，值越接近 1，相似度越高。默认情况下，如果您将阈值设置为 0.75，则仅返回相似度高于此值的文档。
- `Filter.Expression`：用于传递流畅的 DSL（领域特定语言）表达式的类，其功能类似于 SQL 中的“where”子句，但它仅适用于 的元数据键值对`Document`。
- `filterExpression`：基于 ANTLR4 的外部 DSL，接受字符串形式的过滤器表达式。例如，对于国家/地区、年份等元数据键`isActive`，您可以使用如下表达式：`country == 'UK' && year >= 2020 && isActive == true.`

[在元数据过滤器](https://docs.spring.io/spring-ai/reference/api/vectordbs.html#metadata-filters)`Filter.Expression`部分中可以找到更多信息。



### 架构初始化

某些向量存储需要在使用前初始化其后端架构。默认情况下不会为您初始化。您必须选择加入，方法是将 传递`boolean`给适当的构造函数参数，或者如果使用 Spring Boot，则将适当的`initialize-schema`属性设置为`true`in`application.properties`或`application.yml`。查看您正在使用的向量存储的文档以获取特定的属性名称



### 批处理策略

使用向量存储时，通常需要嵌入大量文档。虽然一次调用即可嵌入所有文档似乎很简单，但这种方法可能会导致问题。嵌入模型将文本处理为标记，并具有最大标记限制，通常称为上下文窗口大小。此限制限制了单个嵌入请求中可以处理的文本量。尝试在一次调用中嵌入过多的标记可能会导致错误或嵌入被截断。

为了解决此令牌限制问题，Spring AI 实施了批处理策略。此方法将大量文档分解为适合嵌入模型最大上下文窗口的较小批次。批处理不仅解决了令牌限制问题，还可以提高性能并更有效地使用 API 速率限制。

Spring AI 通过`BatchingStrategy`界面提供此功能，允许根据标记计数以子批次形式处理文档。

核心`BatchingStrategy`接口定义如下：

```java
public interface BatchingStrategy {
    List<List<Document>> batch(List<Document> documents);
}
```

该接口定义了一个方法，`batch`该方法接受文档列表并返回文档批次列表。

####  默认实现

Spring AI 提供了一个名为 的默认实现`TokenCountBatchingStrategy`。此策略根据文档的 token 计数对其进行批处理，确保每个批次不超过计算出的最大输入 token 计数。

`TokenCountBatchingStrategy`主要特点：

1. 使用[OpenAI 的最大输入令牌数](https://platform.openai.com/docs/guides/embeddings/embedding-models)(8191) 作为默认上限。
2. 包含储备百分比（默认 10%）来为潜在开销提供缓冲。
3. 计算实际最大输入令牌数为：`actualMaxInputTokenCount = originalMaxInputTokenCount * (1 - RESERVE_PERCENTAGE)`

该策略估计每个文档的标记数，将它们分组为批次且不超过最大输入标记数，并且如果单个文档超出此限制则引发异常。

还可以自定义`TokenCountBatchingStrategy`以更好地满足您的特定要求。这可以通过在 Spring Boot 类中使用自定义参数创建新实例来实现`@Configuration`。

下面是一个如何创建自定义`TokenCountBatchingStrategy`bean 的示例：

```java
@Configuration
public class EmbeddingConfig {
    @Bean
    public BatchingStrategy customTokenCountBatchingStrategy() {
        return new TokenCountBatchingStrategy(
            EncodingType.CL100K_BASE,  // Specify the encoding type
            8000,                      // Set the maximum input token count
            0.1                        // Set the reserve percentage
        );
    }
}
```

在此配置中：

1. `EncodingType.CL100K_BASE`：指定用于标记化的编码类型。此编码类型用于`JTokkitTokenCountEstimator`准确估计标记计数。
2. `8000`：设置最大输入标记数。此值应小于或等于嵌入模型的最大上下文窗口大小。
3. `0.1`：设置预留百分比。从最大输入令牌数中预留的令牌百分比。这会为处理过程中可能增加的令牌数创建一个缓冲区。

默认情况下，此构造函数用于`Document.DEFAULT_CONTENT_FORMATTER`内容格式化和`MetadataMode.NONE`元数据处理。如果您需要自定义这些参数，可以使用带有附加参数的完整构造函数。

一旦定义，这个自定义`TokenCountBatchingStrategy`bean 将自动被应用程序中的实现`EmbeddingModel`使用，取代默认策略。

内部`TokenCountBatchingStrategy`使用`TokenCountEstimator`（具体来说，`JTokkitTokenCountEstimator`）来计算 token 计数以实现高效批处理。这可确保根据指定的编码类型准确估计 token。

此外，`TokenCountBatchingStrategy`它还允许您传入您自己的`TokenCountEstimator`接口实现，从而提供灵活性。此功能使您能够使用根据您的特定需求量身定制的自定义令牌计数策略。例如：

```java
TokenCountEstimator customEstimator = new YourCustomTokenCountEstimator();
TokenCountBatchingStrategy strategy = new TokenCountBatchingStrategy(
		this.customEstimator,
    8000,  // maxInputTokenCount
    0.1,   // reservePercentage
    Document.DEFAULT_CONTENT_FORMATTER,
    MetadataMode.NONE
);
```

#### 定制实施

虽然`TokenCountBatchingStrategy`提供了强大的默认实现，但您可以自定义批处理策略以满足您的特定需求。这可以通过 Spring Boot 的自动配置来完成。

要自定义批处理策略，请`BatchingStrategy`在 Spring Boot 应用程序中定义一个 bean：

```java
@Configuration
public class EmbeddingConfig {
    @Bean
    public BatchingStrategy customBatchingStrategy() {
        return new CustomBatchingStrategy();
    }
}
```



### VectorStore 实现

* [Azure Vector Search](https://docs.spring.io/spring-ai/reference/api/vectordbs/azure.html)
* [Apache Cassandra](https://docs.spring.io/spring-ai/reference/api/vectordbs/apache-cassandra.html)
* [Chroma Vector Store](https://docs.spring.io/spring-ai/reference/api/vectordbs/chroma.html)
* [Elasticsearch Vector Store](https://docs.spring.io/spring-ai/reference/api/vectordbs/elasticsearch.html)
* [GemFire Vector Store](https://docs.spring.io/spring-ai/reference/api/vectordbs/gemfire.html)
* [MariaDB Vector Store](https://docs.spring.io/spring-ai/reference/api/vectordbs/mariadb.html)
* [Milvus Vector Store](https://docs.spring.io/spring-ai/reference/api/vectordbs/milvus.html)
* [MongoDB Atlas Vector Store](https://docs.spring.io/spring-ai/reference/api/vectordbs/mongodb.html) 
* [Neo4j Vector Store](https://docs.spring.io/spring-ai/reference/api/vectordbs/neo4j.html)
* [OpenSearch Vector Store](https://docs.spring.io/spring-ai/reference/api/vectordbs/opensearch.html)
* [Oracle Vector Store](https://docs.spring.io/spring-ai/reference/api/vectordbs/oracle.html)
* [PgVector Store](https://docs.spring.io/spring-ai/reference/api/vectordbs/pgvector.html)
* [Pinecone Vector Store](https://docs.spring.io/spring-ai/reference/api/vectordbs/pinecone.html)
* [Qdrant Vector Store](https://docs.spring.io/spring-ai/reference/api/vectordbs/qdrant.html) 
* [Redis Vector Store](https://docs.spring.io/spring-ai/reference/api/vectordbs/redis.html)
* [SAP Hana Vector Store](https://docs.spring.io/spring-ai/reference/api/vectordbs/hana.html)
* [Typesense Vector Store](https://docs.spring.io/spring-ai/reference/api/vectordbs/typesense.html)
* [Weaviate Vector Store](https://docs.spring.io/spring-ai/reference/api/vectordbs/weaviate.html)
* [SimpleVectorStore](https://github.com/spring-projects/spring-ai/blob/main/spring-ai-core/src/main/java/org/springframework/ai/vectorstore/SimpleVectorStore.java)



### 示例用法

要计算向量数据库的嵌入，需要选择与正在使用的高级 AI 模型相匹配的嵌入模型。

例如，在 OpenAI 的 ChatGPT 中，我们使用`OpenAiEmbeddingModel`和一个名为 的模型`text-embedding-ada-002`。

Spring Boot starter 对 OpenAI 的自动配置使得`EmbeddingModel`在 Spring 应用程序上下文中可以实现依赖注入。

将数据加载到向量存储中的一般用法是在批处理作业中执行的，首先将数据加载到 Spring AI 的`Document`类中，然后调用该`save`方法。

给定`String`一个源文件的引用，该文件表示一个 JSON 文件，其中包含我们要加载到矢量数据库中的数据，我们使用 Spring AI`JsonReader`加载 JSON 中的特定字段，将它们分成小块，然后将这些小块传递给矢量存储实现。该`VectorStore`实现计算嵌入并将 JSON 和嵌入存储在矢量数据库中：

```java
  @Autowired
  VectorStore vectorStore;

  void load(String sourceFile) {
            JsonReader jsonReader = new JsonReader(new FileSystemResource(sourceFile),
                    "price", "name", "shortDescription", "description", "tags");
            List<Document> documents = jsonReader.get();
            this.vectorStore.add(documents);
  }
```

之后，当用户问题传递到 AI 模型中时，会进行相似性搜索以检索类似的文档，然后将其“塞入”提示中作为用户问题的上下文。

```java
String question = <question from user>
   List<Document> similarDocuments = store.similaritySearch(this.question);
```

可以将附加选项传递到`similaritySearch`方法中来定义要检索的文档数量以及相似性搜索的阈值。



### 元数据过滤器

#### 过滤字符串

可以将类似 SQL 的过滤表达式作为`String`其中一个`similaritySearch`重载传递。

* `"country == 'BG'"`
* `"genre == 'drama' && year >= 2020"`
* `"genre in ['comedy', 'documentary', 'drama']"`

#### 过滤器.表达式

```java
FilterExpressionBuilder b = new FilterExpressionBuilder();
Expression expression = this.b.eq("country", "BG").build();
```

可以使用以下运算符构建复杂的表达式：

```
EQUALS: '=='
MINUS : '-'
PLUS: '+'
GT: '>'
GE: '>='
LT: '<'
LE: '<='
NE: '!='
```

可以使用以下运算符组合表达式：

```
AND: 'AND' | 'and' | '&&';
OR: 'OR' | 'or' | '||';
```

示例

```java
Expression exp = b.and(b.eq("genre", "drama"), b.gte("year", 2020)).build();
```

还可以使用以下运算符：

```
IN: 'IN' | 'in';
NIN: 'NIN' | 'nin';
NOT: 'NOT' | 'not';
```

示例

```java
Expression exp = b.and(b.eq("genre", "drama"), b.gte("year", 2020)).build();
```



### 从矢量存储中删除文档

Vector Store 接口提供了多种删除文档的方法，允许通过特定的文档 ID 或使用过滤表达式删除数据。

#### 按文档 ID 删除

```java
void delete(List<String> idList);
```

示例

```java
// Create and add document
Document document = new Document("The World is Big",
    Map.of("country", "Netherlands"));
vectorStore.add(List.of(document));

// Delete document by ID
vectorStore.delete(List.of(document.getId()));
```

#### 按过滤表达式删除

```java
void delete(Filter.Expression filterExpression);
```

```java
// Create test documents with different metadata
Document bgDocument = new Document("The World is Big",
    Map.of("country", "Bulgaria"));
Document nlDocument = new Document("The World is Big",
    Map.of("country", "Netherlands"));

// Add documents to the store
vectorStore.add(List.of(bgDocument, nlDocument));

// Delete documents from Bulgaria using filter expression
Filter.Expression filterExpression = new Filter.Expression(
    Filter.ExpressionType.EQ,
    new Filter.Key("country"),
    new Filter.Value("Bulgaria")
);
vectorStore.delete(filterExpression);

// Verify deletion with search
SearchRequest request = SearchRequest.builder()
    .query("World")
    .filterExpression("country == 'Bulgaria'")
    .build();
List<Document> results = vectorStore.similaritySearch(request);
// results will be empty as Bulgarian document was deleted
```

####  按字符串过滤表达式删除

```java
void delete(String filterExpression);
```

示例

```java
// Create and add documents
Document bgDocument = new Document("The World is Big",
    Map.of("country", "Bulgaria"));
Document nlDocument = new Document("The World is Big",
    Map.of("country", "Netherlands"));
vectorStore.add(List.of(bgDocument, nlDocument));

// Delete Bulgarian documents using string filter
vectorStore.delete("country == 'Bulgaria'");

// Verify remaining documents
SearchRequest request = SearchRequest.builder()
    .query("World")
    .topK(5)
    .build();
List<Document> results = vectorStore.similaritySearch(request);
// results will only contain the Netherlands document
```

#### 调用删除 API 时的错误处理

所有删除方法在发生错误时都可能抛出异常：

最佳做法是将删除操作包装在 try-catch 块中：

示例用法

```java
try {
    vectorStore.delete("country == 'Bulgaria'");
}
catch (Exception  e) {
    logger.error("Invalid filter expression", e);
}
```

#### 文档版本控制用例

一种常见的情况是管理文档版本，您需要上传文档的新版本并删除旧版本。以下是使用过滤表达式处理此问题的方法：

示例

```java
// Create initial document (v1) with version metadata
Document documentV1 = new Document(
    "AI and Machine Learning Best Practices",
    Map.of(
        "docId", "AIML-001",
        "version", "1.0",
        "lastUpdated", "2024-01-01"
    )
);

// Add v1 to the vector store
vectorStore.add(List.of(documentV1));

// Create updated version (v2) of the same document
Document documentV2 = new Document(
    "AI and Machine Learning Best Practices - Updated",
    Map.of(
        "docId", "AIML-001",
        "version", "2.0",
        "lastUpdated", "2024-02-01"
    )
);

// First, delete the old version using filter expression
Filter.Expression deleteOldVersion = new Filter.Expression(
    Filter.ExpressionType.AND,
    Arrays.asList(
        new Filter.Expression(
            Filter.ExpressionType.EQ,
            new Filter.Key("docId"),
            new Filter.Value("AIML-001")
        ),
        new Filter.Expression(
            Filter.ExpressionType.EQ,
            new Filter.Key("version"),
            new Filter.Value("1.0")
        )
    )
);

vectorStore.delete(deleteOldVersion);

// Add the new version
vectorStore.add(List.of(documentV2));

// Verify only v2 exists
SearchRequest request = SearchRequest.builder()
    .query("AI and Machine Learning")
    .filterExpression("docId == 'AIML-001'")
    .build();
List<Document> results = vectorStore.similaritySearch(request);
// results will contain only v2 of the document
```

也可以使用字符串过滤表达式完成相同的操作：

```java
// Delete old version using string filter
vectorStore.delete("docId == 'AIML-001' AND version == '1.0'");

// Add new version
vectorStore.add(List.of(documentV2));
```

#### 删除文档时的性能注意事项

* 当确切知道要删除哪些文档时，按 ID 列表删除通常会更快。
* 基于过滤器的删除可能需要扫描索引来找到匹配的文档；但是，这是向量存储实现特定的。
* 大型删除操作应分批进行，以避免系统超负荷。
* 考虑在根据文档属性删除时使用过滤表达式，而不是先收集 ID。

####  理解向量

[理解向量](https://docs.spring.io/spring-ai/reference/api/vectordbs/understand-vectordbs.html)
