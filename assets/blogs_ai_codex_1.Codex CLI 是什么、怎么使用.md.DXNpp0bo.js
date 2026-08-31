import{At as e,Mt as t,Qt as n,lt as r}from"./chunks/framework.DwOUwJQP.js";var i=JSON.parse(`{"title":"Codex CLI 入门指南：从安装、AGENTS.md 到 Plan 模式","description":"从零开始介绍 OpenAI Codex CLI，包括 Codex 是什么、如何安装和启动、如何使用 AGENTS.md 提供项目规则、Plan 模式的作用、权限机制、常用命令，以及实际开发中的推荐工作流。","frontmatter":{"title":"Codex CLI 入门指南：从安装、AGENTS.md 到 Plan 模式","date":"2026-08-30 15:17","tags":["AI","Codex","OpenAI"],"description":"从零开始介绍 OpenAI Codex CLI，包括 Codex 是什么、如何安装和启动、如何使用 AGENTS.md 提供项目规则、Plan 模式的作用、权限机制、常用命令，以及实际开发中的推荐工作流。"},"headers":[],"relativePath":"blogs/ai/codex/1.Codex CLI 是什么、怎么使用.md","filePath":"blogs/ai/codex/1.Codex CLI 是什么、怎么使用.md","lastUpdated":1788090369000}`),a={name:`blogs/ai/codex/1.Codex CLI 是什么、怎么使用.md`};function o(r,i,a,o,s,c){return n(),e(`div`,null,[...i[0]||=[t(`<h1 id="codex-cli-入门指南-从安装、agents-md-到-plan-模式" tabindex="-1"><strong>Codex CLI 入门指南：从安装、AGENTS.md 到 Plan 模式</strong> <a class="header-anchor" href="#codex-cli-入门指南-从安装、agents-md-到-plan-模式" aria-label="Permalink to “Codex CLI 入门指南：从安装、AGENTS.md 到 Plan 模式”">​</a></h1><p>最近 AI 编程工具越来越多：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>GitHub Copilot</span></span>
<span class="line"><span>Cursor</span></span>
<span class="line"><span>Claude Code</span></span>
<span class="line"><span>Codex</span></span>
<span class="line"><span>...</span></span></code></pre></div><p>但 Codex 和传统的“AI 代码补全”有一个很明显的区别。</p><p>传统 AI 编程工具更像：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>你写代码</span></span>
<span class="line"><span>   ↓</span></span>
<span class="line"><span>AI 帮你补几行</span></span></code></pre></div><p>而 Codex 更接近：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>你告诉它要做什么</span></span>
<span class="line"><span>        ↓</span></span>
<span class="line"><span>Codex 阅读整个项目</span></span>
<span class="line"><span>        ↓</span></span>
<span class="line"><span>分析代码结构</span></span>
<span class="line"><span>        ↓</span></span>
<span class="line"><span>制定修改方案</span></span>
<span class="line"><span>        ↓</span></span>
<span class="line"><span>修改多个文件</span></span>
<span class="line"><span>        ↓</span></span>
<span class="line"><span>执行命令</span></span>
<span class="line"><span>        ↓</span></span>
<span class="line"><span>运行测试</span></span>
<span class="line"><span>        ↓</span></span>
<span class="line"><span>检查修改结果</span></span></code></pre></div><p>也就是说，它不是单纯的：</p><p>Code Completion</p><p>而更接近一个：</p><p>Coding Agent。</p><p>OpenAI 对 Codex 的定位也是用于编写、审查和交付代码的编程 Agent，并且现在可以在 ChatGPT、IDE、终端等多个环境中使用。(<a href="https://openai.com/codex/?utm_source=chatgpt.com" target="_blank" rel="noreferrer">OpenAI</a>)</p><p>本文主要介绍开发者最常使用的一种方式：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Codex CLI</span></span></code></pre></div><p>也就是直接在终端里使用 Codex。</p><hr><h2 id="_1-codex-到底是什么" tabindex="-1"><strong>1. Codex 到底是什么？</strong> <a class="header-anchor" href="#_1-codex-到底是什么" aria-label="Permalink to “1. Codex 到底是什么？”">​</a></h2><p>假设现在有这样一个 Java 项目：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>xxx-server</span></span>
<span class="line"><span>├── xxx-api</span></span>
<span class="line"><span>├── xxx-business</span></span>
<span class="line"><span>├── xxx-common</span></span>
<span class="line"><span>├── xxx-framework</span></span>
<span class="line"><span>└── pom.xml</span></span></code></pre></div><p>以前我们使用 ChatGPT 时，可能会这样：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>复制代码</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>粘贴给 ChatGPT</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>问它哪里有问题</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>复制修改后的代码</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>手动改回项目</span></span></code></pre></div><p>如果涉及十几个文件，这套流程会非常麻烦。</p><p>Codex CLI 的思路不同。</p><p>你直接进入项目：</p><div class="language-bash"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cd</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> xxx-server</span></span></code></pre></div><p>启动：</p><div class="language-bash"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">codex</span></span></code></pre></div><p>然后告诉它：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>帮我分析用户登录流程，找出 token 刷新逻辑在哪里，</span></span>
<span class="line"><span>先不要修改代码。</span></span></code></pre></div><p>Codex 可以自己读取：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Controller</span></span>
<span class="line"><span>Service</span></span>
<span class="line"><span>Mapper</span></span>
<span class="line"><span>Entity</span></span>
<span class="line"><span>Configuration</span></span>
<span class="line"><span>pom.xml</span></span>
<span class="line"><span>application.yml</span></span></code></pre></div><p>然后沿着调用链分析。</p><p>如果你继续说：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>现在帮我增加 refresh token 过期时间配置，</span></span>
<span class="line"><span>修改完成后执行相关测试。</span></span></code></pre></div><p>它就可以直接在项目中修改文件。</p><p>因此更准确地说：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>ChatGPT</span></span>
<span class="line"><span>≈ 你把代码拿给 AI</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Codex CLI</span></span>
<span class="line"><span>≈ AI 进入你的代码仓库工作</span></span></code></pre></div><hr><h2 id="_2-codex-cli-能做什么" tabindex="-1"><strong>2. Codex CLI 能做什么？</strong> <a class="header-anchor" href="#_2-codex-cli-能做什么" aria-label="Permalink to “2. Codex CLI 能做什么？”">​</a></h2><p>一个比较完整的 Codex 工作流程可能是：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>需求</span></span>
<span class="line"><span> ↓</span></span>
<span class="line"><span>阅读项目</span></span>
<span class="line"><span> ↓</span></span>
<span class="line"><span>搜索代码</span></span>
<span class="line"><span> ↓</span></span>
<span class="line"><span>分析依赖</span></span>
<span class="line"><span> ↓</span></span>
<span class="line"><span>制定方案</span></span>
<span class="line"><span> ↓</span></span>
<span class="line"><span>修改代码</span></span>
<span class="line"><span> ↓</span></span>
<span class="line"><span>执行 Maven / Gradle / npm</span></span>
<span class="line"><span> ↓</span></span>
<span class="line"><span>运行测试</span></span>
<span class="line"><span> ↓</span></span>
<span class="line"><span>查看 Git Diff</span></span>
<span class="line"><span> ↓</span></span>
<span class="line"><span>继续修复</span></span></code></pre></div><p>例如可以直接告诉它：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>分析这个项目的支付模块。</span></span></code></pre></div><p>或者：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>找出所有调用 UserBalanceService.opsBalance 的地方，</span></span>
<span class="line"><span>解释每个调用场景。</span></span></code></pre></div><p>甚至：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>把这个接口从同步处理改成异步处理，</span></span>
<span class="line"><span>不要改变现有 API，</span></span>
<span class="line"><span>修改完成后运行相关单元测试。</span></span></code></pre></div><p>对于复杂任务，Codex 的价值并不是：</p><p>帮你生成一段代码。</p><p>而是：</p><p>帮你完成一整个代码修改任务。</p><hr><h2 id="_3-安装-codex-cli" tabindex="-1"><strong>3. 安装 Codex CLI</strong> <a class="header-anchor" href="#_3-安装-codex-cli" aria-label="Permalink to “3. 安装 Codex CLI”">​</a></h2><p>安装之后可以先执行：</p><div class="language-bash"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">codex</span></span></code></pre></div><p>进入交互模式。</p><p>第一次使用时通常需要进行账户登录或相关授权。</p><p>Codex 目前可以与 ChatGPT 账户配合使用，不同 ChatGPT 套餐对应的 Codex 使用额度可能不同。(<a href="https://help-lb.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan?utm_source=chatgpt.com" target="_blank" rel="noreferrer">OpenAI Help Center</a>)</p><hr><h2 id="_4-一定要在项目目录启动-codex" tabindex="-1"><strong>4. 一定要在项目目录启动 Codex</strong> <a class="header-anchor" href="#_4-一定要在项目目录启动-codex" aria-label="Permalink to “4. 一定要在项目目录启动 Codex”">​</a></h2><p>这是新手非常容易忽略的一点。</p><p>假设你的项目位于：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>~/IdeaProjects/xxx</span></span></code></pre></div><p>最好：</p><div class="language-bash"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cd</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ~/IdeaProjects/xxx</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">codex</span></span></code></pre></div><p>而不是直接在：</p><div class="language-bash"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#c62739;--shiki-dark:#F97583;">~</span></span></code></pre></div><p>运行：</p><div class="language-bash"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">codex</span></span></code></pre></div><p>为什么？</p><p>因为 Codex 的工作目录决定了：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>它主要从哪里开始读取项目</span></span>
<span class="line"><span>它可以看到什么代码</span></span>
<span class="line"><span>它会在哪里寻找项目规则</span></span>
<span class="line"><span>它修改哪些文件</span></span></code></pre></div><p>启动 Codex 后，可以使用：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>/status</span></span></code></pre></div><p>查看当前 Session 状态。</p><p>例如可能看到类似：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Model:           gpt-5.6-sol</span></span>
<span class="line"><span>Directory:       ~/IdeaProjects/xxx</span></span>
<span class="line"><span>Permissions:     Workspace</span></span>
<span class="line"><span>Agents.md:       AGENTS.md</span></span>
<span class="line"><span>Collaboration:   Default</span></span></code></pre></div><p>这里最值得关注的是：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Model</span></span>
<span class="line"><span>Directory</span></span>
<span class="line"><span>Permissions</span></span>
<span class="line"><span>Agents.md</span></span>
<span class="line"><span>Collaboration mode</span></span></code></pre></div><p>其中：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Directory</span></span></code></pre></div><p>最好就是你的项目根目录。</p><hr><h2 id="_5-第一次进入项目-不要急着让-codex-改代码" tabindex="-1"><strong>5. 第一次进入项目，不要急着让 Codex 改代码</strong> <a class="header-anchor" href="#_5-第一次进入项目-不要急着让-codex-改代码" aria-label="Permalink to “5. 第一次进入项目，不要急着让 Codex 改代码”">​</a></h2><p>很多人第一次使用 Coding Agent 时会这样：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>帮我重构整个订单模块。</span></span></code></pre></div><p>然后就开始让模型修改。</p><p>这通常不是一个好习惯。</p><p>更推荐先让 Codex：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>阅读项目</span></span></code></pre></div><p>例如：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>阅读这个项目，分析整体技术栈和目录结构，</span></span>
<span class="line"><span>先不要修改任何文件。</span></span></code></pre></div><p>或者：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>分析这个 Spring Boot 项目。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>重点说明：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. 模块划分</span></span>
<span class="line"><span>2. Controller / Service / Mapper 结构</span></span>
<span class="line"><span>3. 数据库访问方式</span></span>
<span class="line"><span>4. Redis 使用方式</span></span>
<span class="line"><span>5. MQ 使用方式</span></span>
<span class="line"><span>6. 定时任务</span></span>
<span class="line"><span>7. 外部服务调用</span></span>
<span class="line"><span></span></span>
<span class="line"><span>先不要修改代码。</span></span></code></pre></div><p>这样做有两个好处。</p><p>第一：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>让 Codex 建立项目上下文</span></span></code></pre></div><p>第二：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>你可以检查 Codex 对项目的理解是否正确</span></span></code></pre></div><p>如果连项目结构都理解错了，就不应该马上让它进行大范围修改。</p><hr><h2 id="_6-codex-最重要的文件之一-agents-md" tabindex="-1"><strong>6. Codex 最重要的文件之一：AGENTS.md</strong> <a class="header-anchor" href="#_6-codex-最重要的文件之一-agents-md" aria-label="Permalink to “6. Codex 最重要的文件之一：AGENTS.md”">​</a></h2><p>如果你长期使用 Codex，强烈建议了解：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>AGENTS.md</span></span></code></pre></div><p>它可以简单理解为：</p><p>给 Coding Agent 阅读的项目开发说明。</p><p>OpenAI 官方也建议使用 <code>AGENTS.md</code> 为 Codex 提供持久的项目上下文，例如命名规范、业务规则、项目特殊约束以及测试方式。(<a href="https://cdn.openai.com/pdf/6a2631dc-783e-479b-b1a4-af0cfbd38630/how-openai-uses-codex.pdf?utm_source=chatgpt.com" target="_blank" rel="noreferrer">OpenAI</a>)</p><p>例如：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>xxx/</span></span>
<span class="line"><span>├── AGENTS.md</span></span>
<span class="line"><span>├── pom.xml</span></span>
<span class="line"><span>├── xxx-api</span></span>
<span class="line"><span>├── xxx-business</span></span>
<span class="line"><span>└── xxx-common</span></span></code></pre></div><p>你可以在里面写：</p><div class="language-markdown"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;"># Project Instructions</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## Technology</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Java 17</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Spring Boot</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> MyBatis-Plus</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> MySQL</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Redis</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> RabbitMQ</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## Coding Style</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Service 接口统一放在 service 包</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ServiceImpl 必须放在 service.impl</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Entity 不允许直接返回给 Controller</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Controller 统一返回 AjaxResult</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 禁止新增 Lombok @Data</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## Database</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">修改数据库结构时：</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 必须提供 migration SQL</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 不允许直接删除已有字段</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 金额统一使用 BigDecimal</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## Testing</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">修改完成后优先执行：</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">\`\`\`bash</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">mvn</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> test</span></span></code></pre></div><p>如果只修改单模块：</p><div class="language-bash"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">mvn</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -pl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> module-name</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> test</span></span></code></pre></div><p>未经明确要求：</p><ul><li>不要提交 Git Commit</li><li>不要修改生产环境配置</li><li>不要删除数据库 migration</li></ul><div class="language-"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>这样以后你不用每次告诉 Codex：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>\`\`\`text</span></span>
<span class="line"><span>我们项目是 Java17。</span></span>
<span class="line"><span>我们使用 MyBatis-Plus。</span></span>
<span class="line"><span>金额必须 BigDecimal。</span></span>
<span class="line"><span>Controller 不允许直接返回 Entity。</span></span></code></pre></div><p>因为这些长期规则已经写进：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>AGENTS.md</span></span></code></pre></div><hr><h2 id="_7-如何生成-agents-md" tabindex="-1"><strong>7. 如何生成 AGENTS.md？</strong> <a class="header-anchor" href="#_7-如何生成-agents-md" aria-label="Permalink to “7. 如何生成 AGENTS.md？”">​</a></h2><p>Codex 提供了初始化工作流。</p><p>可以在项目中尝试：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>/init</span></span></code></pre></div><p>OpenAI 官方说明中，<code>/init</code> 可以为当前项目生成 <code>AGENTS.md</code> 的初始结构。(<a href="https://help-lb.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan?utm_source=chatgpt.com" target="_blank" rel="noreferrer">OpenAI Help Center</a>)</p><p>第一次进入一个成熟项目时，可以先运行：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>/init</span></span></code></pre></div><p>然后再人工检查生成结果。</p><p>注意：</p><p>不建议完全依赖自动生成的 AGENTS.md。</p><p>因为 Codex 可以从代码里推断：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Java 版本</span></span>
<span class="line"><span>Spring Boot 版本</span></span>
<span class="line"><span>Maven 模块</span></span>
<span class="line"><span>目录结构</span></span></code></pre></div><p>但很多真正重要的东西它无法从代码中准确推断。</p><p>例如：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>这张表禁止直接更新</span></span>
<span class="line"><span>这个接口必须保持兼容</span></span>
<span class="line"><span>线上使用的是哪个配置中心</span></span>
<span class="line"><span>测试环境有什么特殊规则</span></span>
<span class="line"><span>金额统一保留几位</span></span>
<span class="line"><span>哪些模块不允许重构</span></span>
<span class="line"><span>Git 提交规范是什么</span></span></code></pre></div><p>这些应该由开发者自己补充。</p><hr><h2 id="_8-agents-md-是怎么生效的" tabindex="-1"><strong>8. AGENTS.md 是怎么生效的？</strong> <a class="header-anchor" href="#_8-agents-md-是怎么生效的" aria-label="Permalink to “8. AGENTS.md 是怎么生效的？”">​</a></h2><p>AGENTS.md 并不只是一个普通 README。</p><p>它主要是：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>开发者</span></span>
<span class="line"><span>   ↓</span></span>
<span class="line"><span>告诉 Codex</span></span>
<span class="line"><span>   ↓</span></span>
<span class="line"><span>在这个目录下工作时必须遵守什么规则</span></span></code></pre></div><p>例如：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>project/</span></span>
<span class="line"><span>├── AGENTS.md</span></span>
<span class="line"><span>├── backend/</span></span>
<span class="line"><span>│   ├── src/</span></span>
<span class="line"><span>│   └── pom.xml</span></span>
<span class="line"><span>└── frontend/</span></span>
<span class="line"><span>    ├── AGENTS.md</span></span>
<span class="line"><span>    └── src/</span></span></code></pre></div><p>可以理解为：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>project/AGENTS.md</span></span></code></pre></div><p>控制整个项目。</p><p>而：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>frontend/AGENTS.md</span></span></code></pre></div><p>可以针对前端目录提供更具体的规则。</p><p>更深层目录中的 AGENTS.md 可以提供更局部、更具体的说明。OpenAI 关于 AGENTS.md 的说明也强调，其规则通常按照所在目录向下作用，较深层的文件可以覆盖更上层的规则。(<a href="https://openai.com/zh-Hans-CN/index/introducing-codex/?utm_source=chatgpt.com" target="_blank" rel="noreferrer">OpenAI</a>)</p><p>这对于 Monorepo 特别有用：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>project</span></span>
<span class="line"><span>├── backend</span></span>
<span class="line"><span>│   └── Java</span></span>
<span class="line"><span>│</span></span>
<span class="line"><span>├── admin-web</span></span>
<span class="line"><span>│   └── Vue</span></span>
<span class="line"><span>│</span></span>
<span class="line"><span>└── app</span></span>
<span class="line"><span>    └── Flutter</span></span></code></pre></div><p>三个项目可以拥有不同规则。</p><hr><h2 id="_9-readme-md-和-agents-md-有什么区别" tabindex="-1"><strong>9. README.md 和 AGENTS.md 有什么区别？</strong> <a class="header-anchor" href="#_9-readme-md-和-agents-md-有什么区别" aria-label="Permalink to “9. README.md 和 AGENTS.md 有什么区别？”">​</a></h2><p>很多人第一次看到 AGENTS.md 会问：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>那 README.md 不就够了吗？</span></span></code></pre></div><p>并不完全一样。</p><p>README 更偏向：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>给人看</span></span></code></pre></div><p>例如：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>项目介绍</span></span>
<span class="line"><span>安装教程</span></span>
<span class="line"><span>启动方法</span></span>
<span class="line"><span>功能说明</span></span>
<span class="line"><span>API 使用方法</span></span></code></pre></div><p>而 AGENTS.md 更偏向：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>给 Coding Agent 看</span></span></code></pre></div><p>例如：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>修改代码必须遵守什么</span></span>
<span class="line"><span>哪些目录不能动</span></span>
<span class="line"><span>测试怎么执行</span></span>
<span class="line"><span>命名规则是什么</span></span>
<span class="line"><span>数据库修改有什么约束</span></span>
<span class="line"><span>提交代码前做哪些检查</span></span></code></pre></div><p>可以简单理解：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>README.md</span></span>
<span class="line"><span>→ 这个项目是什么</span></span>
<span class="line"><span></span></span>
<span class="line"><span>AGENTS.md</span></span>
<span class="line"><span>→ 在这个项目里应该怎么干活</span></span></code></pre></div><p>当然两者可以有部分内容重叠。</p><hr><h2 id="_10-codex-的-plan-模式是什么" tabindex="-1"><strong>10. Codex 的 Plan 模式是什么？</strong> <a class="header-anchor" href="#_10-codex-的-plan-模式是什么" aria-label="Permalink to “10. Codex 的 Plan 模式是什么？”">​</a></h2><p>这是 Codex 非常重要的一种使用思路。</p><p>对于简单修改：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>把 UserService 里的一个变量名改掉</span></span></code></pre></div><p>一般不需要复杂规划。</p><p>但如果任务变成：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>把目前的余额更新机制改成基于流水账本，</span></span>
<span class="line"><span>同时保证原有充值、提现、奖励逻辑兼容。</span></span></code></pre></div><p>就不应该马上开始写代码。</p><p>更适合：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>先 Plan</span></span>
<span class="line"><span>再执行</span></span></code></pre></div><p>Plan 模式的核心思想是：</p><p>先理解问题并形成实施方案，而不是直接修改代码。</p><p>新版 Codex 中存在面向规划的协作方式，具体可用命令和入口会随着 Codex CLI 版本变化；当前版本应以 <code>/help</code> 显示的能力为准。Codex 社区和官方产品演进中也已经提供了专门的规划工作方式。(<a href="https://developers.openai.com/community?utm_source=chatgpt.com" target="_blank" rel="noreferrer">OpenAI Developers</a>)</p><p>即使当前版本没有直接暴露某个固定的 <code>/plan</code> 命令，也完全可以通过 Prompt 实现同样的工作流：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>先进入规划阶段。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>阅读相关代码并分析实现方案。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>要求：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. 不修改任何文件</span></span>
<span class="line"><span>2. 找出涉及的模块和类</span></span>
<span class="line"><span>3. 说明当前实现</span></span>
<span class="line"><span>4. 给出修改方案</span></span>
<span class="line"><span>5. 分析风险</span></span>
<span class="line"><span>6. 给出测试方案</span></span>
<span class="line"><span></span></span>
<span class="line"><span>等方案确认以后再修改代码。</span></span></code></pre></div><p>这实际上就是：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Plan First</span></span></code></pre></div><hr><h2 id="_11-为什么复杂任务一定要先-plan" tabindex="-1"><strong>11. 为什么复杂任务一定要先 Plan？</strong> <a class="header-anchor" href="#_11-为什么复杂任务一定要先-plan" aria-label="Permalink to “11. 为什么复杂任务一定要先 Plan？”">​</a></h2><p>假设需求是：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>增加用户余额冻结功能。</span></span></code></pre></div><p>如果直接告诉 Codex：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>帮我实现。</span></span></code></pre></div><p>它可能马上：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>新增字段</span></span>
<span class="line"><span>修改 Entity</span></span>
<span class="line"><span>修改 Mapper</span></span>
<span class="line"><span>修改 Service</span></span>
<span class="line"><span>增加 SQL</span></span></code></pre></div><p>但真正的问题可能是：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>冻结余额是否单独建表？</span></span>
<span class="line"><span>冻结后 available_balance 怎么计算？</span></span>
<span class="line"><span>旧数据怎么迁移？</span></span>
<span class="line"><span>提现逻辑是否受影响？</span></span>
<span class="line"><span>并发扣款如何处理？</span></span>
<span class="line"><span>是否需要流水？</span></span>
<span class="line"><span>解冻是否幂等？</span></span></code></pre></div><p>如果先 Plan：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>需求</span></span>
<span class="line"><span> ↓</span></span>
<span class="line"><span>搜索相关代码</span></span>
<span class="line"><span> ↓</span></span>
<span class="line"><span>理解当前架构</span></span>
<span class="line"><span> ↓</span></span>
<span class="line"><span>分析影响范围</span></span>
<span class="line"><span> ↓</span></span>
<span class="line"><span>设计方案</span></span>
<span class="line"><span> ↓</span></span>
<span class="line"><span>确认</span></span>
<span class="line"><span> ↓</span></span>
<span class="line"><span>实现</span></span></code></pre></div><p>错误率通常会明显降低。</p><p>因此对于下面这些任务，非常建议先规划：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>架构调整</span></span>
<span class="line"><span>数据库修改</span></span>
<span class="line"><span>大规模重构</span></span>
<span class="line"><span>支付逻辑</span></span>
<span class="line"><span>钱包逻辑</span></span>
<span class="line"><span>权限系统</span></span>
<span class="line"><span>登录认证</span></span>
<span class="line"><span>接口迁移</span></span>
<span class="line"><span>并发问题</span></span>
<span class="line"><span>性能优化</span></span>
<span class="line"><span>跨模块修改</span></span></code></pre></div><hr><h2 id="_12-一个比较好的-plan-prompt" tabindex="-1"><strong>12. 一个比较好的 Plan Prompt</strong> <a class="header-anchor" href="#_12-一个比较好的-plan-prompt" aria-label="Permalink to “12. 一个比较好的 Plan Prompt”">​</a></h2><p>实际可以这样告诉 Codex：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>分析用户充值确认流程。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>先不要修改代码。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>请完成：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. 找到充值扫描入口</span></span>
<span class="line"><span>2. 找到充值确认逻辑</span></span>
<span class="line"><span>3. 找到余额入账逻辑</span></span>
<span class="line"><span>4. 画出完整调用链</span></span>
<span class="line"><span>5. 分析幂等机制</span></span>
<span class="line"><span>6. 分析可能存在的并发问题</span></span>
<span class="line"><span>7. 给出改进方案</span></span>
<span class="line"><span>8. 列出需要修改的文件</span></span>
<span class="line"><span></span></span>
<span class="line"><span>完成分析以后停止，不要执行修改。</span></span></code></pre></div><p>这个 Prompt 的重点并不是写得很长。</p><p>而是明确：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>当前阶段只分析</span></span>
<span class="line"><span>不要实施</span></span></code></pre></div><p>等方案确认后再说：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>按方案实施。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>要求：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. 只修改刚才列出的文件</span></span>
<span class="line"><span>2. 不改变现有接口</span></span>
<span class="line"><span>3. 保持向后兼容</span></span>
<span class="line"><span>4. 修改完成后运行相关测试</span></span>
<span class="line"><span>5. 最后总结所有修改</span></span></code></pre></div><p>这时候 Codex 才开始执行。</p><hr><h2 id="_13-codex-的-permission-是什么" tabindex="-1"><strong>13. Codex 的 Permission 是什么？</strong> <a class="header-anchor" href="#_13-codex-的-permission-是什么" aria-label="Permalink to “13. Codex 的 Permission 是什么？”">​</a></h2><p>Coding Agent 和普通聊天 AI 最大的区别之一是：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>它真的可以执行操作。</span></span></code></pre></div><p>例如：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>读取文件</span></span>
<span class="line"><span>修改文件</span></span>
<span class="line"><span>运行 Maven</span></span>
<span class="line"><span>运行 npm</span></span>
<span class="line"><span>执行 Git</span></span>
<span class="line"><span>执行 shell 命令</span></span></code></pre></div><p>因此 Codex 存在权限控制。</p><p>在：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>/status</span></span></code></pre></div><p>中可能看到：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Permissions: Workspace</span></span></code></pre></div><p>可以简单理解为：</p><p>Codex 当前拥有什么范围的操作权限。</p><p>实际权限策略会根据客户端、版本、配置和运行环境不同而变化。</p><p>Codex 的设计原则之一就是区分：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>安全的本地操作</span></span></code></pre></div><p>和：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>高风险 / 外部 / 破坏性操作</span></span></code></pre></div><p>例如 OpenAI 的模型指导中建议，可以允许 Agent 主动进行读取文件、修改范围内代码、执行非破坏性测试等本地操作，而对于外部写入、破坏性操作、付费操作或明显扩大任务范围的行为要求确认。(<a href="https://developers.openai.com/api/docs/guides/latest-model?utm_source=chatgpt.com" target="_blank" rel="noreferrer">OpenAI Developers</a>)</p><p>这也是使用 Coding Agent 时非常重要的安全边界。</p><hr><h2 id="_14-不要一上来就给最高权限" tabindex="-1"><strong>14. 不要一上来就给最高权限</strong> <a class="header-anchor" href="#_14-不要一上来就给最高权限" aria-label="Permalink to “14. 不要一上来就给最高权限”">​</a></h2><p>虽然更高权限意味着：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>少确认</span></span>
<span class="line"><span>执行更快</span></span></code></pre></div><p>但同时意味着：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Agent 可以做更多事情</span></span></code></pre></div><p>对于第一次接触 Codex 的开发者，更建议：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>先保持比较保守的权限</span></span></code></pre></div><p>观察它通常会执行哪些操作。</p><p>例如修改 Java 项目，它可能执行：</p><div class="language-bash"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">grep</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">find</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> diff</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">mvn</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> test</span></span></code></pre></div><p>这些通常问题不大。</p><p>但如果涉及：</p><div class="language-bash"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">rm</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> reset</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">docker</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">kubectl</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ssh</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">mysql</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">psql</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">curl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 生产接口</span></span></code></pre></div><p>风险就完全不同了。</p><p>因此最好明确告诉 Codex：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>未经确认不要：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. 删除文件</span></span>
<span class="line"><span>2. 执行 git reset</span></span>
<span class="line"><span>3. 执行 git push</span></span>
<span class="line"><span>4. 修改生产配置</span></span>
<span class="line"><span>5. 连接生产数据库</span></span>
<span class="line"><span>6. 执行 kubectl 修改命令</span></span>
<span class="line"><span>7. 调用生产环境写接口</span></span></code></pre></div><p>甚至可以直接写入：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>AGENTS.md</span></span></code></pre></div><hr><h2 id="_15-status-是非常实用的命令" tabindex="-1"><strong>15.</strong> <strong><code>/status</code></strong> <strong>是非常实用的命令</strong> <a class="header-anchor" href="#_15-status-是非常实用的命令" aria-label="Permalink to “15. /status 是非常实用的命令”">​</a></h2><p>平时使用 Codex，可以经常查看：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>/status</span></span></code></pre></div><p>它可以帮助确认当前会话状态。</p><p>尤其需要注意：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Model</span></span>
<span class="line"><span>Directory</span></span>
<span class="line"><span>Permissions</span></span>
<span class="line"><span>Agents.md</span></span>
<span class="line"><span>Collaboration mode</span></span>
<span class="line"><span>Usage</span></span></code></pre></div><p>例如：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Directory: ~</span></span></code></pre></div><p>如果你本来打算修改：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>~/IdeaProjects/xxx</span></span></code></pre></div><p>那就说明当前目录可能不对。</p><p>如果：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Agents.md: &lt;none&gt;</span></span></code></pre></div><p>说明当前没有检测到项目级 AGENTS.md。</p><p>如果使用量比较高，也可以通过 <code>/status</code> 查看当前 Codex 额度相关状态。OpenAI 的帮助文档也明确提到，可以在活跃 CLI Session 中通过 <code>/status</code> 查看使用情况。(<a href="https://help-lb.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan?utm_source=chatgpt.com" target="_blank" rel="noreferrer">OpenAI Help Center</a>)</p><hr><h2 id="_16-help-应该是第一个记住的命令" tabindex="-1"><strong>16.</strong> <strong><code>/help</code></strong> <strong>应该是第一个记住的命令</strong> <a class="header-anchor" href="#_16-help-应该是第一个记住的命令" aria-label="Permalink to “16. /help 应该是第一个记住的命令”">​</a></h2><p>Codex 还在快速更新。</p><p>因此网上看到的命令：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>可能已经新增</span></span>
<span class="line"><span>可能已经改名</span></span>
<span class="line"><span>可能只存在于某个客户端</span></span>
<span class="line"><span>可能只存在于某个版本</span></span></code></pre></div><p>所以最可靠的方法其实是：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>/help</span></span></code></pre></div><p>查看：</p><p>当前安装版本真正支持哪些命令。</p><p>特别是：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Plan</span></span>
<span class="line"><span>Collaboration Mode</span></span>
<span class="line"><span>Model</span></span>
<span class="line"><span>Permission</span></span>
<span class="line"><span>Review</span></span>
<span class="line"><span>Context</span></span></code></pre></div><p>这一类功能变化相对快。</p><p>不要完全依赖几个月以前的博客。</p><hr><h2 id="_17-不需要把所有命令都背下来" tabindex="-1"><strong>17. 不需要把所有命令都背下来</strong> <a class="header-anchor" href="#_17-不需要把所有命令都背下来" aria-label="Permalink to “17. 不需要把所有命令都背下来”">​</a></h2><p>刚开始使用 Codex，其实记住几个概念就够了：</p><table tabindex="0"><thead><tr><th><strong>功能</strong></th><th><strong>用途</strong></th></tr></thead><tbody><tr><td><code>/help</code></td><td>查看当前版本支持的命令</td></tr><tr><td><code>/status</code></td><td>查看当前 Session 状态</td></tr><tr><td><code>/init</code></td><td>初始化项目 Agent 指令</td></tr><tr><td>Model 相关命令</td><td>切换或查看模型</td></tr><tr><td>Review 相关能力</td><td>审查代码修改</td></tr><tr><td>Plan / Collaboration</td><td>控制 Agent 的工作方式</td></tr></tbody></table><p>具体命令应该以：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>/help</span></span></code></pre></div><p>输出为准。</p><p>因为 Codex CLI 的版本迭代速度非常快。</p><hr><h2 id="_18-codex-不只是-问问题" tabindex="-1"><strong>18. Codex 不只是“问问题”</strong> <a class="header-anchor" href="#_18-codex-不只是-问问题" aria-label="Permalink to “18. Codex 不只是“问问题””">​</a></h2><p>普通聊天 AI 的使用方式通常是：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Q → A</span></span></code></pre></div><p>但 Codex 更适合：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Task → Action</span></span></code></pre></div><p>例如不要只问：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>这个 Bug 怎么修？</span></span></code></pre></div><p>而可以说：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>分析这个 Bug。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>找到根因以后直接修复，</span></span>
<span class="line"><span>运行相关测试，</span></span>
<span class="line"><span>最后告诉我：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. 根因是什么</span></span>
<span class="line"><span>2. 修改了哪些文件</span></span>
<span class="line"><span>3. 为什么这样修改</span></span>
<span class="line"><span>4. 测试结果</span></span></code></pre></div><p>这样 Codex 就从：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>顾问</span></span></code></pre></div><p>变成：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>执行者</span></span></code></pre></div><p>这才是 Coding Agent 更大的价值。</p><hr><h2 id="_19-给-codex-的-prompt-应该怎么写" tabindex="-1"><strong>19. 给 Codex 的 Prompt 应该怎么写？</strong> <a class="header-anchor" href="#_19-给-codex-的-prompt-应该怎么写" aria-label="Permalink to “19. 给 Codex 的 Prompt 应该怎么写？”">​</a></h2><p>很多人以为 Coding Agent Prompt 越长越好。</p><p>其实并不是。</p><p>一个好的 Codex Prompt 更重要的是明确四件事：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>目标</span></span>
<span class="line"><span>范围</span></span>
<span class="line"><span>约束</span></span>
<span class="line"><span>验证</span></span></code></pre></div><p>例如：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>修复订单重复支付问题。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>范围：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>只分析 payment 和 order 模块。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>约束：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. 不改变现有 API</span></span>
<span class="line"><span>2. 不修改数据库结构</span></span>
<span class="line"><span>3. 保持现有返回格式</span></span>
<span class="line"><span>4. 不提交 Git</span></span>
<span class="line"><span></span></span>
<span class="line"><span>验证：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>修改完成后运行相关 Maven 测试，</span></span>
<span class="line"><span>并检查 git diff。</span></span></code></pre></div><p>这比：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>帮我看看支付代码有没有问题然后优化一下</span></span></code></pre></div><p>有效得多。</p><hr><h2 id="_20-一个通用-codex-prompt-模板" tabindex="-1"><strong>20. 一个通用 Codex Prompt 模板</strong> <a class="header-anchor" href="#_20-一个通用-codex-prompt-模板" aria-label="Permalink to “20. 一个通用 Codex Prompt 模板”">​</a></h2><p>可以长期保存一个模板：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>任务：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;我要完成什么&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>范围：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;允许修改哪些模块 / 文件&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>要求：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. &lt;要求1&gt;</span></span>
<span class="line"><span>2. &lt;要求2&gt;</span></span>
<span class="line"><span>3. &lt;要求3&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>禁止：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. &lt;不要做什么&gt;</span></span>
<span class="line"><span>2. &lt;不要修改什么&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>验证：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. 执行相关测试</span></span>
<span class="line"><span>2. 检查编译</span></span>
<span class="line"><span>3. 检查 git diff</span></span>
<span class="line"><span></span></span>
<span class="line"><span>完成后输出：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. 问题原因</span></span>
<span class="line"><span>2. 实现方案</span></span>
<span class="line"><span>3. 修改文件</span></span>
<span class="line"><span>4. 测试结果</span></span>
<span class="line"><span>5. 潜在风险</span></span></code></pre></div><p>对于复杂需求，可以再加一句：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>先分析并制定计划，不要立即修改代码。</span></span></code></pre></div><hr><h2 id="_21-codex-最适合做哪些事情" tabindex="-1"><strong>21. Codex 最适合做哪些事情？</strong> <a class="header-anchor" href="#_21-codex-最适合做哪些事情" aria-label="Permalink to “21. Codex 最适合做哪些事情？”">​</a></h2><p>个人比较推荐 Codex 用在下面几类任务。</p><h3 id="_21-1-阅读陌生项目" tabindex="-1"><strong>21.1 阅读陌生项目</strong> <a class="header-anchor" href="#_21-1-阅读陌生项目" aria-label="Permalink to “21.1 阅读陌生项目”">​</a></h3><p>例如：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>分析这个项目的登录流程。</span></span>
<span class="line"><span>这个项目的 MQ 消息是怎么流转的？</span></span>
<span class="line"><span>解释这个项目的数据库结构。</span></span></code></pre></div><p>这种任务特别适合 Codex。</p><p>因为它可以直接搜索整个 Repository。</p><hr><h3 id="_21-2-查调用链" tabindex="-1"><strong>21.2 查调用链</strong> <a class="header-anchor" href="#_21-2-查调用链" aria-label="Permalink to “21.2 查调用链”">​</a></h3><p>例如：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>找出 UserBalanceService.opsBalance 的所有调用方，</span></span>
<span class="line"><span>按照业务类型分类。</span></span></code></pre></div><p>相比手动 IDE：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Find Usages</span></span></code></pre></div><p>Codex 还可以进一步解释：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>为什么调用</span></span>
<span class="line"><span>业务含义</span></span>
<span class="line"><span>上下游关系</span></span>
<span class="line"><span>风险</span></span></code></pre></div><hr><h3 id="_21-3-修-bug" tabindex="-1"><strong>21.3 修 Bug</strong> <a class="header-anchor" href="#_21-3-修-bug" aria-label="Permalink to “21.3 修 Bug”">​</a></h3><p>例如：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>用户关闭 SSE 页面后后端出现 Broken pipe。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>分析异常产生的位置，</span></span>
<span class="line"><span>判断是否需要处理，</span></span>
<span class="line"><span>如果需要则修改异常处理逻辑。</span></span></code></pre></div><p>Codex 可以：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>搜索异常</span></span>
<span class="line"><span>↓</span></span>
<span class="line"><span>找到 Controller</span></span>
<span class="line"><span>↓</span></span>
<span class="line"><span>找到 GlobalExceptionHandler</span></span>
<span class="line"><span>↓</span></span>
<span class="line"><span>分析 Tomcat</span></span>
<span class="line"><span>↓</span></span>
<span class="line"><span>修改代码</span></span>
<span class="line"><span>↓</span></span>
<span class="line"><span>跑测试</span></span></code></pre></div><hr><h3 id="_21-4-重构" tabindex="-1"><strong>21.4 重构</strong> <a class="header-anchor" href="#_21-4-重构" aria-label="Permalink to “21.4 重构”">​</a></h3><p>例如：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>把重复的链上 RPC 请求逻辑提取成统一 RpcClient，</span></span>
<span class="line"><span>保持现有业务行为不变。</span></span></code></pre></div><p>这种涉及多个文件的修改比单纯复制代码给聊天模型更适合 Codex。</p><hr><h3 id="_21-5-写测试" tabindex="-1"><strong>21.5 写测试</strong> <a class="header-anchor" href="#_21-5-写测试" aria-label="Permalink to “21.5 写测试”">​</a></h3><p>例如：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>给 RewardService 增加单元测试。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>覆盖：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. level = 1</span></span>
<span class="line"><span>2. level = 8</span></span>
<span class="line"><span>3. null amount</span></span>
<span class="line"><span>4. amount = 0</span></span>
<span class="line"><span>5. 多级奖励</span></span></code></pre></div><p>Codex 可以先分析现有测试框架，然后按照项目风格添加测试。</p><hr><h3 id="_21-6-code-review" tabindex="-1"><strong>21.6 Code Review</strong> <a class="header-anchor" href="#_21-6-code-review" aria-label="Permalink to “21.6 Code Review”">​</a></h3><p>例如：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>检查当前 Git Diff。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>重点关注：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. 空指针</span></span>
<span class="line"><span>2. 并发问题</span></span>
<span class="line"><span>3. 数据一致性</span></span>
<span class="line"><span>4. BigDecimal 精度</span></span>
<span class="line"><span>5. SQL 性能</span></span>
<span class="line"><span>6. 向后兼容</span></span>
<span class="line"><span></span></span>
<span class="line"><span>不要修改代码，只输出 Review。</span></span></code></pre></div><p>这也是非常推荐的一种用法。</p><hr><h2 id="_22-不要让-codex-无限制修改整个项目" tabindex="-1"><strong>22. 不要让 Codex 无限制修改整个项目</strong> <a class="header-anchor" href="#_22-不要让-codex-无限制修改整个项目" aria-label="Permalink to “22. 不要让 Codex 无限制修改整个项目”">​</a></h2><p>例如下面这个 Prompt 风险很高：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>优化整个项目。</span></span></code></pre></div><p>因为：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>优化</span></span></code></pre></div><p>本身几乎没有边界。</p><p>Codex 可能认为：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>改目录是优化</span></span>
<span class="line"><span>改类名是优化</span></span>
<span class="line"><span>升级依赖是优化</span></span>
<span class="line"><span>重写 Service 是优化</span></span>
<span class="line"><span>修改 SQL 是优化</span></span>
<span class="line"><span>删除代码也是优化</span></span></code></pre></div><p>更好的写法：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>优化 UserRewardService 的可读性。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>只允许修改：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>UserRewardService.java</span></span>
<span class="line"><span>UserRewardServiceImpl.java</span></span>
<span class="line"><span></span></span>
<span class="line"><span>要求：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. 不改变任何业务逻辑</span></span>
<span class="line"><span>2. 不修改 public API</span></span>
<span class="line"><span>3. 不修改数据库</span></span>
<span class="line"><span>4. 不增加依赖</span></span>
<span class="line"><span>5. 完成后运行相关测试</span></span></code></pre></div><p>Agent 的能力越强：</p><p>任务边界反而越重要。</p><hr><h2 id="_23-git-是使用-codex-最重要的安全网" tabindex="-1"><strong>23. Git 是使用 Codex 最重要的安全网</strong> <a class="header-anchor" href="#_23-git-是使用-codex-最重要的安全网" aria-label="Permalink to “23. Git 是使用 Codex 最重要的安全网”">​</a></h2><p>使用 Coding Agent 之前，非常推荐确保项目已经进入 Git 管理。</p><p>开始任务之前：</p><div class="language-bash"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> status</span></span></code></pre></div><p>确保当前代码状态清楚。</p><p>Codex 修改之后：</p><div class="language-bash"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> diff</span></span></code></pre></div><p>检查修改。</p><p>最好保持：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>一个任务</span></span>
<span class="line"><span>=</span></span>
<span class="line"><span>一组清晰 Diff</span></span></code></pre></div><p>而不是让 Codex连续修改十几个不同需求。</p><p>推荐流程：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>任务 A</span></span>
<span class="line"><span> ↓</span></span>
<span class="line"><span>Codex 修改</span></span>
<span class="line"><span> ↓</span></span>
<span class="line"><span>Review Diff</span></span>
<span class="line"><span> ↓</span></span>
<span class="line"><span>测试</span></span>
<span class="line"><span> ↓</span></span>
<span class="line"><span>Commit</span></span>
<span class="line"><span></span></span>
<span class="line"><span>任务 B</span></span>
<span class="line"><span> ↓</span></span>
<span class="line"><span>Codex 修改</span></span>
<span class="line"><span> ↓</span></span>
<span class="line"><span>Review Diff</span></span>
<span class="line"><span> ↓</span></span>
<span class="line"><span>测试</span></span>
<span class="line"><span> ↓</span></span>
<span class="line"><span>Commit</span></span></code></pre></div><p>这样出了问题非常容易回滚。</p><hr><h2 id="_24-一个推荐的-codex-实际开发流程" tabindex="-1"><strong>24. 一个推荐的 Codex 实际开发流程</strong> <a class="header-anchor" href="#_24-一个推荐的-codex-实际开发流程" aria-label="Permalink to “24. 一个推荐的 Codex 实际开发流程”">​</a></h2><p>如果是一个成熟项目，我比较推荐：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>① cd 项目目录</span></span>
<span class="line"><span>        ↓</span></span>
<span class="line"><span>② codex</span></span>
<span class="line"><span>        ↓</span></span>
<span class="line"><span>③ /status</span></span>
<span class="line"><span>        ↓</span></span>
<span class="line"><span>④ 检查 AGENTS.md</span></span>
<span class="line"><span>        ↓</span></span>
<span class="line"><span>⑤ 让 Codex 阅读相关模块</span></span>
<span class="line"><span>        ↓</span></span>
<span class="line"><span>⑥ 复杂任务先 Plan</span></span>
<span class="line"><span>        ↓</span></span>
<span class="line"><span>⑦ 确认方案</span></span>
<span class="line"><span>        ↓</span></span>
<span class="line"><span>⑧ 开始修改</span></span>
<span class="line"><span>        ↓</span></span>
<span class="line"><span>⑨ Codex 执行测试</span></span>
<span class="line"><span>        ↓</span></span>
<span class="line"><span>⑩ Review Git Diff</span></span>
<span class="line"><span>        ↓</span></span>
<span class="line"><span>⑪ 人工检查</span></span>
<span class="line"><span>        ↓</span></span>
<span class="line"><span>⑫ Git Commit</span></span></code></pre></div><p>不要变成：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>需求</span></span>
<span class="line"><span> ↓</span></span>
<span class="line"><span>AI</span></span>
<span class="line"><span> ↓</span></span>
<span class="line"><span>直接上线</span></span></code></pre></div><p>正确思路应该是：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Developer</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>定义目标和边界</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>Codex</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>分析 + 实现 + 测试</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>Developer</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>Review</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>上线</span></span></code></pre></div><p>Codex 是：</p><p>工程能力放大器。</p><p>而不是：</p><p>生产环境自动驾驶。</p><hr><h2 id="_25-新手最值得养成的几个习惯" tabindex="-1"><strong>25. 新手最值得养成的几个习惯</strong> <a class="header-anchor" href="#_25-新手最值得养成的几个习惯" aria-label="Permalink to “25. 新手最值得养成的几个习惯”">​</a></h2><p>如果刚开始使用 Codex，只建议先养成下面这些习惯：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>进入正确项目目录再启动 Codex</span></span>
<span class="line"><span></span></span>
<span class="line"><span>复杂任务先分析，不要直接改</span></span>
<span class="line"><span></span></span>
<span class="line"><span>维护好 AGENTS.md</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Prompt 明确范围和禁止事项</span></span>
<span class="line"><span></span></span>
<span class="line"><span>让 Codex 自己运行测试</span></span>
<span class="line"><span></span></span>
<span class="line"><span>修改完成一定检查 git diff</span></span>
<span class="line"><span></span></span>
<span class="line"><span>高风险操作不要随便授权</span></span></code></pre></div><p>这些习惯比背几十个 Codex 命令更重要。</p><hr><h2 id="_26-codex、chatgpt-和-ide-ai-应该怎么分工" tabindex="-1"><strong>26. Codex、ChatGPT 和 IDE AI 应该怎么分工？</strong> <a class="header-anchor" href="#_26-codex、chatgpt-和-ide-ai-应该怎么分工" aria-label="Permalink to “26. Codex、ChatGPT 和 IDE AI 应该怎么分工？”">​</a></h2><p>可以简单这样理解。</p><h3 id="chatgpt" tabindex="-1"><strong>ChatGPT</strong> <a class="header-anchor" href="#chatgpt" aria-label="Permalink to “ChatGPT”">​</a></h3><p>适合：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>学习知识</span></span>
<span class="line"><span>理解概念</span></span>
<span class="line"><span>架构讨论</span></span>
<span class="line"><span>技术选型</span></span>
<span class="line"><span>独立代码示例</span></span></code></pre></div><h3 id="ide-ai" tabindex="-1"><strong>IDE AI</strong> <a class="header-anchor" href="#ide-ai" aria-label="Permalink to “IDE AI”">​</a></h3><p>适合：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>代码补全</span></span>
<span class="line"><span>当前文件修改</span></span>
<span class="line"><span>快速生成小函数</span></span></code></pre></div><h3 id="codex" tabindex="-1"><strong>Codex</strong> <a class="header-anchor" href="#codex" aria-label="Permalink to “Codex”">​</a></h3><p>适合：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>整个 Repository</span></span>
<span class="line"><span>多文件修改</span></span>
<span class="line"><span>跨模块分析</span></span>
<span class="line"><span>自动执行测试</span></span>
<span class="line"><span>重构</span></span>
<span class="line"><span>Bug 修复</span></span>
<span class="line"><span>Code Review</span></span>
<span class="line"><span>复杂工程任务</span></span></code></pre></div><p>不是谁替代谁。</p><p>而是：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>ChatGPT</span></span>
<span class="line"><span>→ 思考和讨论</span></span>
<span class="line"><span></span></span>
<span class="line"><span>IDE</span></span>
<span class="line"><span>→ 写代码时辅助</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Codex</span></span>
<span class="line"><span>→ 把一个工程任务交给 Agent 执行</span></span></code></pre></div><hr><h2 id="_27-最后怎么理解-codex" tabindex="-1"><strong>27. 最后怎么理解 Codex？</strong> <a class="header-anchor" href="#_27-最后怎么理解-codex" aria-label="Permalink to “27. 最后怎么理解 Codex？”">​</a></h2><p>如果只记住一句话：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Codex 不是一个更聪明的代码补全工具。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Codex 是一个可以进入你的项目、</span></span>
<span class="line"><span>读取代码、执行命令、修改文件并验证结果的 Coding Agent。</span></span></code></pre></div><p>然后记住三个核心概念：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>AGENTS.md</span></span>
<span class="line"><span>→ 告诉 Codex 在这个项目里应该怎么工作</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Plan</span></span>
<span class="line"><span>→ 复杂任务先想清楚，再开始修改</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Permissions</span></span>
<span class="line"><span>→ 决定 Codex 可以做到什么程度</span></span></code></pre></div><p>最后再记住一个最实用的开发流程：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Read</span></span>
<span class="line"><span> ↓</span></span>
<span class="line"><span>Plan</span></span>
<span class="line"><span> ↓</span></span>
<span class="line"><span>Implement</span></span>
<span class="line"><span> ↓</span></span>
<span class="line"><span>Test</span></span>
<span class="line"><span> ↓</span></span>
<span class="line"><span>Review</span></span></code></pre></div><p>也就是：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>先读懂</span></span>
<span class="line"><span>再规划</span></span>
<span class="line"><span>再实现</span></span>
<span class="line"><span>再测试</span></span>
<span class="line"><span>最后人工 Review</span></span></code></pre></div><p>当你开始按照这种方式使用 Codex，就会发现：</p><p>以前使用 AI 编程更多是在问：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>这段代码应该怎么写？</span></span></code></pre></div><p>而使用 Coding Agent 以后，问题会逐渐变成：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>这个任务应该怎么完成？</span></span></code></pre></div><p>这也是 AI 编程从：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Code Generation</span></span></code></pre></div><p>走向：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Agentic Software Engineering</span></span></code></pre></div><p>最明显的变化。</p>`,437)]])}var s=r(a,[[`render`,o]]);export{i as __pageData,s as default};