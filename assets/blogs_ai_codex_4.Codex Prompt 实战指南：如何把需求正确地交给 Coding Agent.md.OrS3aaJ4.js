import{At as e,Mt as t,Qt as n,lt as r}from"./chunks/framework.DwOUwJQP.js";var i=JSON.parse(`{"title":"Codex Prompt 实战指南：如何把需求正确地交给 Coding Agent","description":"从实际开发角度讲解 Codex Prompt 应该怎么写，重点介绍 Context、Goal、Scope、Constraints、Verification 和 Output 六个核心部分，并提供 Bug 修复、重构、Code Review、调用链分析、单元测试等可直接复用的 Prompt 模板。","frontmatter":{"title":"Codex Prompt 实战指南：如何把需求正确地交给 Coding Agent","date":"2026-08-30 16:00","tags":["AI","Codex","OpenAI"],"description":"从实际开发角度讲解 Codex Prompt 应该怎么写，重点介绍 Context、Goal、Scope、Constraints、Verification 和 Output 六个核心部分，并提供 Bug 修复、重构、Code Review、调用链分析、单元测试等可直接复用的 Prompt 模板。"},"headers":[],"relativePath":"blogs/ai/codex/4.Codex Prompt 实战指南：如何把需求正确地交给 Coding Agent.md","filePath":"blogs/ai/codex/4.Codex Prompt 实战指南：如何把需求正确地交给 Coding Agent.md","lastUpdated":1788090369000}`),a={name:`blogs/ai/codex/4.Codex Prompt 实战指南：如何把需求正确地交给 Coding Agent.md`};function o(r,i,a,o,s,c){return n(),e(`div`,null,[...i[0]||=[t(`<h1 id="codex-prompt-实战指南-如何把需求正确地交给-coding-agent" tabindex="-1"><strong>Codex Prompt 实战指南：如何把需求正确地交给 Coding Agent</strong> <a class="header-anchor" href="#codex-prompt-实战指南-如何把需求正确地交给-coding-agent" aria-label="Permalink to “Codex Prompt 实战指南：如何把需求正确地交给 Coding Agent”">​</a></h1><p>前面几篇我们已经介绍了：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Codex CLI</span></span>
<span class="line"><span>AGENTS.md</span></span>
<span class="line"><span>Slash Commands</span></span>
<span class="line"><span>Plan</span></span>
<span class="line"><span>Permissions</span></span>
<span class="line"><span>Review</span></span></code></pre></div><p>但真正开始使用 Codex 以后，会发现一个非常关键的问题：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>同一个 Codex</span></span>
<span class="line"><span>同一个模型</span></span>
<span class="line"><span>同一个项目</span></span>
<span class="line"><span></span></span>
<span class="line"><span>为什么不同的人使用，</span></span>
<span class="line"><span>效果差距会这么大？</span></span></code></pre></div><p>其中一个非常重要的原因就是：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Prompt</span></span></code></pre></div><p>例如有人会直接告诉 Codex：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>帮我优化一下这个项目。</span></span></code></pre></div><p>这句话看起来没什么问题。</p><p>但对于 Coding Agent 来说：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>优化什么？</span></span>
<span class="line"><span>允许修改哪里？</span></span>
<span class="line"><span>哪些地方不能动？</span></span>
<span class="line"><span>能不能改数据库？</span></span>
<span class="line"><span>能不能升级依赖？</span></span>
<span class="line"><span>要不要跑测试？</span></span>
<span class="line"><span>能不能提交 Git？</span></span>
<span class="line"><span>什么结果才算完成？</span></span></code></pre></div><p>全部没有说明。</p><p>Agent 只能自己判断。</p><p>而 Agent 自己判断得越多：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>结果的不确定性</span></span>
<span class="line"><span>就越高</span></span></code></pre></div><p>所以使用 Coding Agent 时，一个非常重要的能力不是：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>会不会写很长的 Prompt</span></span></code></pre></div><p>而是：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>能不能把任务边界描述清楚</span></span></code></pre></div><p>这一篇就专门讲：</p><blockquote><p>如何把一个真实的软件开发需求，正确地交给 Codex。</p></blockquote><hr><h2 id="_1-coding-agent-prompt-和普通-chat-prompt-不一样" tabindex="-1"><strong>1. Coding Agent Prompt 和普通 Chat Prompt 不一样</strong> <a class="header-anchor" href="#_1-coding-agent-prompt-和普通-chat-prompt-不一样" aria-label="Permalink to “1. Coding Agent Prompt 和普通 Chat Prompt 不一样”">​</a></h2><p>普通 ChatGPT Prompt 很多时候只是：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Question</span></span>
<span class="line"><span>   ↓</span></span>
<span class="line"><span>Answer</span></span></code></pre></div><p>例如：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Java 的 synchronized 和 ReentrantLock 有什么区别？</span></span></code></pre></div><p>AI 回答以后，任务基本结束。</p><p>但 Codex 不一样。</p><p>Codex 更接近：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Task</span></span>
<span class="line"><span>   ↓</span></span>
<span class="line"><span>Understand</span></span>
<span class="line"><span>   ↓</span></span>
<span class="line"><span>Search</span></span>
<span class="line"><span>   ↓</span></span>
<span class="line"><span>Plan</span></span>
<span class="line"><span>   ↓</span></span>
<span class="line"><span>Modify</span></span>
<span class="line"><span>   ↓</span></span>
<span class="line"><span>Execute</span></span>
<span class="line"><span>   ↓</span></span>
<span class="line"><span>Test</span></span>
<span class="line"><span>   ↓</span></span>
<span class="line"><span>Review</span></span></code></pre></div><p>所以你给 Codex 的 Prompt，本质上不是：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>问题</span></span></code></pre></div><p>而更像：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>任务单</span></span></code></pre></div><p>可以理解成：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>普通 Chat Prompt</span></span>
<span class="line"><span>≈ 问一个同事问题</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Codex Prompt</span></span>
<span class="line"><span>≈ 给一个开发者分配任务</span></span></code></pre></div><p>这也是为什么 Coding Agent 的 Prompt 更需要：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>目标</span></span>
<span class="line"><span>范围</span></span>
<span class="line"><span>约束</span></span>
<span class="line"><span>验收标准</span></span></code></pre></div><hr><h2 id="_2-最差的一类-prompt-帮我优化一下" tabindex="-1"><strong>2. 最差的一类 Prompt：帮我优化一下</strong> <a class="header-anchor" href="#_2-最差的一类-prompt-帮我优化一下" aria-label="Permalink to “2. 最差的一类 Prompt：帮我优化一下”">​</a></h2><p>例如：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>帮我优化 UserService。</span></span></code></pre></div><p>这句话最大的问题不是短。</p><p>而是：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>没有边界</span></span></code></pre></div><p>所谓：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>优化</span></span></code></pre></div><p>可能包括：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>修改变量名</span></span>
<span class="line"><span>拆方法</span></span>
<span class="line"><span>改类结构</span></span>
<span class="line"><span>升级依赖</span></span>
<span class="line"><span>修改 SQL</span></span>
<span class="line"><span>增加缓存</span></span>
<span class="line"><span>修改数据库</span></span>
<span class="line"><span>增加线程池</span></span>
<span class="line"><span>修改接口</span></span>
<span class="line"><span>删除旧代码</span></span></code></pre></div><p>Agent 很难知道你真正想要什么。</p><p>甚至：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>你认为是“重构”</span></span>
<span class="line"><span>Agent 认为是“架构升级”</span></span></code></pre></div><p>最后 Diff 可能越来越大。</p><hr><h2 id="_3-更好的-prompt-应该怎么写" tabindex="-1"><strong>3. 更好的 Prompt 应该怎么写？</strong> <a class="header-anchor" href="#_3-更好的-prompt-应该怎么写" aria-label="Permalink to “3. 更好的 Prompt 应该怎么写？”">​</a></h2><p>例如原始需求：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>优化 UserRewardService。</span></span></code></pre></div><p>可以改成：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>优化 UserRewardService 的可读性。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>范围：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>只允许修改：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>- UserRewardService.java</span></span>
<span class="line"><span>- UserRewardServiceImpl.java</span></span>
<span class="line"><span></span></span>
<span class="line"><span>要求：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. 不改变现有业务逻辑</span></span>
<span class="line"><span>2. 不修改 public API</span></span>
<span class="line"><span>3. 不修改数据库结构</span></span>
<span class="line"><span>4. 不新增第三方依赖</span></span>
<span class="line"><span>5. 可以提取重复的 private 方法</span></span>
<span class="line"><span>6. 可以改善变量和方法命名</span></span>
<span class="line"><span></span></span>
<span class="line"><span>验证：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. 编译相关模块</span></span>
<span class="line"><span>2. 运行现有相关测试</span></span>
<span class="line"><span>3. 检查 git diff</span></span>
<span class="line"><span></span></span>
<span class="line"><span>完成后告诉我：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. 修改了什么</span></span>
<span class="line"><span>2. 为什么这样修改</span></span>
<span class="line"><span>3. 测试结果</span></span>
<span class="line"><span>4. 是否存在潜在风险</span></span></code></pre></div><p>这样 Codex 得到的信息就完整很多。</p><hr><h2 id="_4-一个好-prompt-的六个核心部分" tabindex="-1"><strong>4. 一个好 Prompt 的六个核心部分</strong> <a class="header-anchor" href="#_4-一个好-prompt-的六个核心部分" aria-label="Permalink to “4. 一个好 Prompt 的六个核心部分”">​</a></h2><p>可以记一个简单公式：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Codex Prompt</span></span>
<span class="line"><span></span></span>
<span class="line"><span>=</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Context</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>Goal</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>Scope</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>Constraints</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>Verification</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>Output</span></span></code></pre></div><p>中文就是：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>上下文</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>目标</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>范围</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>约束</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>验证</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>输出要求</span></span></code></pre></div><p>这六个部分不一定每次全部写。</p><p>但是对于复杂任务，非常值得明确。</p><hr><h2 id="_5-context-告诉-codex-当前背景" tabindex="-1"><strong>5. Context：告诉 Codex 当前背景</strong> <a class="header-anchor" href="#_5-context-告诉-codex-当前背景" aria-label="Permalink to “5. Context：告诉 Codex 当前背景”">​</a></h2><p>Context 就是：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>上下文</span></span></code></pre></div><p>例如：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>这是一个 Java 17 + Spring Boot 项目。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>当前用户充值流程：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>链上扫描</span></span>
<span class="line"><span>→ DepositRecord</span></span>
<span class="line"><span>→ 确认区块数</span></span>
<span class="line"><span>→ 用户余额入账</span></span></code></pre></div><p>或者：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>用户反馈关闭 SSE 页面以后，</span></span>
<span class="line"><span>后端偶尔出现 Broken pipe 异常日志。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>接口使用 Spring MVC SseEmitter。</span></span></code></pre></div><p>Context 的目的不是把整个项目复制给 Codex。</p><p>因为 Codex 自己可以读代码。</p><p>真正有价值的是：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>代码里不容易知道的信息</span></span></code></pre></div><p>例如：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>为什么要改</span></span>
<span class="line"><span>线上出现了什么问题</span></span>
<span class="line"><span>业务期望是什么</span></span>
<span class="line"><span>哪些行为必须兼容</span></span></code></pre></div><hr><h2 id="_6-context-不要写成项目百科全书" tabindex="-1"><strong>6. Context 不要写成项目百科全书</strong> <a class="header-anchor" href="#_6-context-不要写成项目百科全书" aria-label="Permalink to “6. Context 不要写成项目百科全书”">​</a></h2><p>例如没必要这样：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>我们公司成立于……</span></span>
<span class="line"><span>这个项目从 2022 年开始……</span></span>
<span class="line"><span>一共有 36 个模块……</span></span></code></pre></div><p>除非这些信息和任务直接相关。</p><p>更好的 Context 应该满足：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>和当前任务有关</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>代码中不容易直接推断</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>能够帮助 Agent 做决策</span></span></code></pre></div><p>例如：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>当前 App 旧版本仍然依赖这个 API，</span></span>
<span class="line"><span>所以返回字段不能删除或改名。</span></span></code></pre></div><p>这就是非常高价值的 Context。</p><hr><h2 id="_7-goal-明确到底要完成什么" tabindex="-1"><strong>7. Goal：明确到底要完成什么</strong> <a class="header-anchor" href="#_7-goal-明确到底要完成什么" aria-label="Permalink to “7. Goal：明确到底要完成什么”">​</a></h2><p>Goal 是整个 Prompt 最核心的部分。</p><p>例如：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>修复用户余额重复扣减问题。</span></span></code></pre></div><p>或者：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>给充值确认流程增加幂等保护。</span></span></code></pre></div><p>或者：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>把重复的链上 RPC 请求逻辑抽象成统一 RpcClient。</span></span></code></pre></div><p>一个好的 Goal 应该尽量：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>具体</span></span>
<span class="line"><span>可判断是否完成</span></span></code></pre></div><p>不推荐：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>优化一下</span></span>
<span class="line"><span>完善一下</span></span>
<span class="line"><span>看看有没有问题</span></span>
<span class="line"><span>改得更好一点</span></span></code></pre></div><p>这些词都太模糊。</p><hr><h2 id="_8-scope-限制-codex-可以动哪里" tabindex="-1"><strong>8. Scope：限制 Codex 可以动哪里</strong> <a class="header-anchor" href="#_8-scope-限制-codex-可以动哪里" aria-label="Permalink to “8. Scope：限制 Codex 可以动哪里”">​</a></h2><p>这是 Coding Agent Prompt 中特别重要的一部分。</p><p>例如：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>范围：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>只分析 payment 和 order 模块。</span></span></code></pre></div><p>或者：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>只允许修改：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>UserRewardService.java</span></span>
<span class="line"><span>UserRewardServiceImpl.java</span></span></code></pre></div><p>或者：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>允许修改：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>wallet 模块</span></span>
<span class="line"><span>相关单元测试</span></span>
<span class="line"><span>必要的 migration SQL</span></span></code></pre></div><p>为什么 Scope 很重要？</p><p>因为 Codex 有能力搜索整个 Repository。</p><p>如果没有范围：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>一个小需求</span></span></code></pre></div><p>可能最后变成：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>跨十几个模块修改</span></span></code></pre></div><p>Agent 能力越强：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Scope 越重要</span></span></code></pre></div><hr><h2 id="_9-scope-不一定只写文件" tabindex="-1"><strong>9. Scope 不一定只写文件</strong> <a class="header-anchor" href="#_9-scope-不一定只写文件" aria-label="Permalink to “9. Scope 不一定只写文件”">​</a></h2><p>Scope 可以有很多形式。</p><h3 id="按模块" tabindex="-1">按模块 <a class="header-anchor" href="#按模块" aria-label="Permalink to “按模块”">​</a></h3><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>只处理：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>payment</span></span>
<span class="line"><span>order</span></span></code></pre></div><h3 id="按目录" tabindex="-1">按目录 <a class="header-anchor" href="#按目录" aria-label="Permalink to “按目录”">​</a></h3><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>只允许修改：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>src/main/java/com/example/wallet</span></span>
<span class="line"><span>src/test/java/com/example/wallet</span></span></code></pre></div><h3 id="按文件" tabindex="-1">按文件 <a class="header-anchor" href="#按文件" aria-label="Permalink to “按文件”">​</a></h3><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>只修改：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>UserService.java</span></span>
<span class="line"><span>UserServiceImpl.java</span></span></code></pre></div><h3 id="按行为" tabindex="-1">按行为 <a class="header-anchor" href="#按行为" aria-label="Permalink to “按行为”">​</a></h3><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>只修复 Bug，</span></span>
<span class="line"><span>不要进行额外重构。</span></span></code></pre></div><p>实际使用时可以组合。</p><hr><h2 id="_10-constraints-明确哪些事情不能做" tabindex="-1"><strong>10. Constraints：明确哪些事情不能做</strong> <a class="header-anchor" href="#_10-constraints-明确哪些事情不能做" aria-label="Permalink to “10. Constraints：明确哪些事情不能做”">​</a></h2><p>Constraints 就是：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>约束</span></span></code></pre></div><p>例如：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>要求：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. 不修改现有 API</span></span>
<span class="line"><span>2. 不修改数据库结构</span></span>
<span class="line"><span>3. 不新增依赖</span></span>
<span class="line"><span>4. 保持向后兼容</span></span>
<span class="line"><span>5. 不修改生产配置</span></span>
<span class="line"><span>6. 不提交 Git</span></span></code></pre></div><p>这部分非常重要。</p><p>因为开发任务通常不是：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>只要实现功能就行</span></span></code></pre></div><p>而是：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>在很多限制条件下实现功能</span></span></code></pre></div><p>真正的软件工程就是这样。</p><hr><h2 id="_11-把-禁止事项-单独写出来" tabindex="-1"><strong>11. 把“禁止事项”单独写出来</strong> <a class="header-anchor" href="#_11-把-禁止事项-单独写出来" aria-label="Permalink to “11. 把“禁止事项”单独写出来”">​</a></h2><p>对于风险比较高的任务，可以直接增加：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>禁止：</span></span></code></pre></div><p>例如：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>禁止：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. git push</span></span>
<span class="line"><span>2. git reset --hard</span></span>
<span class="line"><span>3. 修改生产环境配置</span></span>
<span class="line"><span>4. 删除数据库字段</span></span>
<span class="line"><span>5. 修改历史 migration</span></span>
<span class="line"><span>6. 调用生产接口</span></span></code></pre></div><p>虽然这些长期规则更适合写进：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>AGENTS.md</span></span></code></pre></div><p>但如果当前任务特别敏感，也可以在 Prompt 中再次强调。</p><hr><h2 id="_12-verification-怎么证明任务完成了" tabindex="-1"><strong>12. Verification：怎么证明任务完成了？</strong> <a class="header-anchor" href="#_12-verification-怎么证明任务完成了" aria-label="Permalink to “12. Verification：怎么证明任务完成了？”">​</a></h2><p>这是很多 Prompt 最容易遗漏的一部分。</p><p>例如你告诉 Codex：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>修复这个 Bug。</span></span></code></pre></div><p>它修改完代码以后：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>任务完成了吗？</span></span></code></pre></div><p>不一定。</p><p>因为：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>能编译吗？</span></span>
<span class="line"><span>测试通过吗？</span></span>
<span class="line"><span>有没有破坏旧逻辑？</span></span>
<span class="line"><span>Diff 是否符合预期？</span></span></code></pre></div><p>都还不知道。</p><p>所以应该明确：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>验证：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. 编译相关模块</span></span>
<span class="line"><span>2. 运行相关单元测试</span></span>
<span class="line"><span>3. 检查 git diff</span></span></code></pre></div><p>如果是 Maven：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>验证：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. 执行 mvn test</span></span>
<span class="line"><span>2. 如果全量测试过慢，至少运行目标模块测试</span></span>
<span class="line"><span>3. 检查是否存在编译错误</span></span>
<span class="line"><span>4. 检查 git diff</span></span></code></pre></div><p>这会让 Codex 从：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>写完代码</span></span></code></pre></div><p>继续走到：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>验证代码</span></span></code></pre></div><hr><h2 id="_13-verification-是-coding-agent-的核心优势之一" tabindex="-1"><strong>13. Verification 是 Coding Agent 的核心优势之一</strong> <a class="header-anchor" href="#_13-verification-是-coding-agent-的核心优势之一" aria-label="Permalink to “13. Verification 是 Coding Agent 的核心优势之一”">​</a></h2><p>普通 AI 生成代码以后：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>你复制</span></span>
<span class="line"><span>↓</span></span>
<span class="line"><span>你编译</span></span>
<span class="line"><span>↓</span></span>
<span class="line"><span>你发现错误</span></span>
<span class="line"><span>↓</span></span>
<span class="line"><span>你再复制错误回来</span></span></code></pre></div><p>而 Codex 可以：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>修改</span></span>
<span class="line"><span>↓</span></span>
<span class="line"><span>编译</span></span>
<span class="line"><span>↓</span></span>
<span class="line"><span>失败</span></span>
<span class="line"><span>↓</span></span>
<span class="line"><span>读取错误</span></span>
<span class="line"><span>↓</span></span>
<span class="line"><span>继续修复</span></span>
<span class="line"><span>↓</span></span>
<span class="line"><span>再次测试</span></span></code></pre></div><p>所以不要只让 Codex：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Generate</span></span></code></pre></div><p>应该尽量让它：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Generate</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>Verify</span></span></code></pre></div><p>这才真正发挥 Agent 的价值。</p><hr><h2 id="_14-output-最后让-codex-怎么汇报" tabindex="-1"><strong>14. Output：最后让 Codex 怎么汇报？</strong> <a class="header-anchor" href="#_14-output-最后让-codex-怎么汇报" aria-label="Permalink to “14. Output：最后让 Codex 怎么汇报？”">​</a></h2><p>完成任务以后，最好让 Codex给一个结构化总结。</p><p>例如：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>完成后输出：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. 问题根因</span></span>
<span class="line"><span>2. 实现方案</span></span>
<span class="line"><span>3. 修改文件</span></span>
<span class="line"><span>4. 测试结果</span></span>
<span class="line"><span>5. 潜在风险</span></span></code></pre></div><p>为什么有用？</p><p>因为 Coding Agent 可能修改多个文件。</p><p>如果最后只是：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Done.</span></span></code></pre></div><p>开发者还要自己重新梳理。</p><p>而结构化输出可以帮助快速 Review。</p><hr><h2 id="_15-一个完整的通用-prompt-模板" tabindex="-1"><strong>15. 一个完整的通用 Prompt 模板</strong> <a class="header-anchor" href="#_15-一个完整的通用-prompt-模板" aria-label="Permalink to “15. 一个完整的通用 Prompt 模板”">​</a></h2><p>可以长期保存下面这个模板：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>任务：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;要完成什么&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>背景：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;当前问题和必要上下文&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>范围：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;允许分析或修改哪些模块 / 文件&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>要求：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. &lt;要求1&gt;</span></span>
<span class="line"><span>2. &lt;要求2&gt;</span></span>
<span class="line"><span>3. &lt;要求3&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>禁止：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. &lt;禁止事项1&gt;</span></span>
<span class="line"><span>2. &lt;禁止事项2&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>验证：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. 编译相关模块</span></span>
<span class="line"><span>2. 运行相关测试</span></span>
<span class="line"><span>3. 检查 git diff</span></span>
<span class="line"><span></span></span>
<span class="line"><span>完成后输出：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. 问题原因</span></span>
<span class="line"><span>2. 实现方案</span></span>
<span class="line"><span>3. 修改文件</span></span>
<span class="line"><span>4. 测试结果</span></span>
<span class="line"><span>5. 潜在风险</span></span></code></pre></div><p>复杂任务再增加：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>先分析并制定计划。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>不要立即修改代码。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>等方案确认以后再实施。</span></span></code></pre></div><hr><h2 id="_16-模板一-bug-修复" tabindex="-1"><strong>16. 模板一：Bug 修复</strong> <a class="header-anchor" href="#_16-模板一-bug-修复" aria-label="Permalink to “16. 模板一：Bug 修复”">​</a></h2><p>例如：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>任务：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>修复用户关闭 SSE 页面以后，</span></span>
<span class="line"><span>后端出现 Broken pipe 异常日志的问题。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>背景：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>接口使用 Spring MVC SSE。</span></span>
<span class="line"><span>用户主动关闭页面以后，</span></span>
<span class="line"><span>服务端继续向连接写数据时可能抛出异常。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>范围：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>只分析：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>- SSE Controller</span></span>
<span class="line"><span>- SSE Service</span></span>
<span class="line"><span>- GlobalExceptionHandler</span></span>
<span class="line"><span></span></span>
<span class="line"><span>要求：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. 先找到异常真正产生的位置</span></span>
<span class="line"><span>2. 判断这是正常客户端断连还是服务端 Bug</span></span>
<span class="line"><span>3. 不改变现有 SSE API</span></span>
<span class="line"><span>4. 不吞掉其他真正的 IOException</span></span>
<span class="line"><span>5. 只处理与客户端断连相关的异常</span></span>
<span class="line"><span></span></span>
<span class="line"><span>验证：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. 编译相关模块</span></span>
<span class="line"><span>2. 运行相关测试</span></span>
<span class="line"><span>3. 检查 git diff</span></span>
<span class="line"><span></span></span>
<span class="line"><span>完成后输出：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. 根因</span></span>
<span class="line"><span>2. 修改方案</span></span>
<span class="line"><span>3. 修改文件</span></span>
<span class="line"><span>4. 为什么不会影响其他异常</span></span>
<span class="line"><span>5. 测试结果</span></span></code></pre></div><p>这个 Prompt 比：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>帮我修 Broken pipe</span></span></code></pre></div><p>稳定得多。</p><hr><h2 id="_17-模板二-查调用链" tabindex="-1"><strong>17. 模板二：查调用链</strong> <a class="header-anchor" href="#_17-模板二-查调用链" aria-label="Permalink to “17. 模板二：查调用链”">​</a></h2><p>Codex 很适合做：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Repository Search</span></span></code></pre></div><p>例如：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>任务：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>分析 UserBalanceService.opsBalance 的完整调用情况。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>先不要修改代码。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>请：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. 找出所有直接调用方</span></span>
<span class="line"><span>2. 找出间接调用链</span></span>
<span class="line"><span>3. 按业务场景分类</span></span>
<span class="line"><span>4. 标记每个调用是增加余额还是减少余额</span></span>
<span class="line"><span>5. 找出调用涉及的事务</span></span>
<span class="line"><span>6. 找出是否存在异步调用</span></span>
<span class="line"><span>7. 找出是否存在重复入账风险</span></span>
<span class="line"><span></span></span>
<span class="line"><span>最后按照下面格式输出：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>业务场景</span></span>
<span class="line"><span>→ 调用入口</span></span>
<span class="line"><span>→ 调用链</span></span>
<span class="line"><span>→ amount 变化</span></span>
<span class="line"><span>→ 事务</span></span>
<span class="line"><span>→ 幂等机制</span></span>
<span class="line"><span>→ 风险</span></span>
<span class="line"><span></span></span>
<span class="line"><span>不要修改任何文件。</span></span></code></pre></div><p>这比单纯：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>找一下谁调用了 opsBalance</span></span></code></pre></div><p>获得的信息更有价值。</p><hr><h2 id="_18-模板三-重构" tabindex="-1"><strong>18. 模板三：重构</strong> <a class="header-anchor" href="#_18-模板三-重构" aria-label="Permalink to “18. 模板三：重构”">​</a></h2><p>重构任务尤其需要限制范围。</p><p>例如：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>任务：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>重构重复的链上 RPC 调用逻辑。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>目标：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>把 BSC 和 TRON 公共能力抽象到 RpcClient 接口。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>范围：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>只允许修改：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>- RpcClient</span></span>
<span class="line"><span>- BSCRpcClient</span></span>
<span class="line"><span>- TronRpcClient</span></span>
<span class="line"><span>- RpcClientHolder</span></span>
<span class="line"><span>- 相关测试</span></span>
<span class="line"><span></span></span>
<span class="line"><span>要求：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. 不改变现有业务行为</span></span>
<span class="line"><span>2. 不修改数据库结构</span></span>
<span class="line"><span>3. 不修改外部 API</span></span>
<span class="line"><span>4. 不新增第三方依赖</span></span>
<span class="line"><span>5. 保持现有异常处理行为</span></span>
<span class="line"><span>6. 公共逻辑尽量抽象，链特有逻辑保留在实现类</span></span>
<span class="line"><span></span></span>
<span class="line"><span>先不要修改代码。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>先输出：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. 当前重复逻辑</span></span>
<span class="line"><span>2. 建议接口设计</span></span>
<span class="line"><span>3. 需要修改的文件</span></span>
<span class="line"><span>4. 兼容性风险</span></span>
<span class="line"><span>5. 测试方案</span></span>
<span class="line"><span></span></span>
<span class="line"><span>等待确认以后再实施。</span></span></code></pre></div><p>注意这里加入了：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>先不要修改</span></span></code></pre></div><p>因为重构通常值得先 Plan。</p><hr><h2 id="_19-模板四-新增功能" tabindex="-1"><strong>19. 模板四：新增功能</strong> <a class="header-anchor" href="#_19-模板四-新增功能" aria-label="Permalink to “19. 模板四：新增功能”">​</a></h2><p>例如：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>任务：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>增加用户余额冻结功能。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>要求支持：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>freeze</span></span>
<span class="line"><span>unfreeze</span></span>
<span class="line"><span></span></span>
<span class="line"><span>范围：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>wallet 模块。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>要求：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. available balance 不允许小于 0</span></span>
<span class="line"><span>2. freeze 必须幂等</span></span>
<span class="line"><span>3. unfreeze 必须幂等</span></span>
<span class="line"><span>4. 所有余额变化必须记录流水</span></span>
<span class="line"><span>5. 金额使用 BigDecimal</span></span>
<span class="line"><span>6. 保持现有余额查询 API 兼容</span></span>
<span class="line"><span></span></span>
<span class="line"><span>先分析：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. 当前余额表结构</span></span>
<span class="line"><span>2. 当前余额修改入口</span></span>
<span class="line"><span>3. 提现流程</span></span>
<span class="line"><span>4. 充值流程</span></span>
<span class="line"><span>5. 事务边界</span></span>
<span class="line"><span>6. 并发控制</span></span>
<span class="line"><span></span></span>
<span class="line"><span>然后给出实现方案。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>当前阶段不要修改代码。</span></span></code></pre></div><p>这种需求如果直接：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>帮我增加冻结余额</span></span></code></pre></div><p>很容易遗漏：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>事务</span></span>
<span class="line"><span>幂等</span></span>
<span class="line"><span>流水</span></span>
<span class="line"><span>并发</span></span>
<span class="line"><span>兼容</span></span></code></pre></div><hr><h2 id="_20-模板五-code-review" tabindex="-1"><strong>20. 模板五：Code Review</strong> <a class="header-anchor" href="#_20-模板五-code-review" aria-label="Permalink to “20. 模板五：Code Review”">​</a></h2><p>例如：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Review 当前 Git Diff。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>不要修改代码。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>重点检查：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. 空指针</span></span>
<span class="line"><span>2. 边界条件</span></span>
<span class="line"><span>3. 并发问题</span></span>
<span class="line"><span>4. MySQL 事务</span></span>
<span class="line"><span>5. Redis 一致性</span></span>
<span class="line"><span>6. MQ 重复消费</span></span>
<span class="line"><span>7. BigDecimal 精度</span></span>
<span class="line"><span>8. SQL 性能</span></span>
<span class="line"><span>9. 向后兼容</span></span>
<span class="line"><span>10. 安全问题</span></span>
<span class="line"><span></span></span>
<span class="line"><span>对于每个问题输出：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>- 严重程度</span></span>
<span class="line"><span>- 文件</span></span>
<span class="line"><span>- 代码位置</span></span>
<span class="line"><span>- 问题原因</span></span>
<span class="line"><span>- 可能后果</span></span>
<span class="line"><span>- 建议修改方式</span></span>
<span class="line"><span></span></span>
<span class="line"><span>如果没有发现明确问题，不要为了输出内容而猜测问题。</span></span></code></pre></div><p>最后一句很重要：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>不要为了输出内容而猜测问题</span></span></code></pre></div><p>可以减少：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>为了 Review 而 Review</span></span></code></pre></div><p>的情况。</p><hr><h2 id="_21-模板六-单元测试" tabindex="-1"><strong>21. 模板六：单元测试</strong> <a class="header-anchor" href="#_21-模板六-单元测试" aria-label="Permalink to “21. 模板六：单元测试”">​</a></h2><p>例如：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>任务：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>给 RewardService 增加单元测试。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>先阅读现有测试代码，</span></span>
<span class="line"><span>保持项目当前测试风格。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>覆盖：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. level = 1</span></span>
<span class="line"><span>2. level = 8</span></span>
<span class="line"><span>3. amount = null</span></span>
<span class="line"><span>4. amount = 0</span></span>
<span class="line"><span>5. 正常多级奖励</span></span>
<span class="line"><span>6. 边界金额</span></span>
<span class="line"><span>7. 重复业务请求</span></span>
<span class="line"><span></span></span>
<span class="line"><span>要求：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. 不修改生产代码，除非确实无法测试</span></span>
<span class="line"><span>2. 优先复用现有测试工具</span></span>
<span class="line"><span>3. 不新增测试框架</span></span>
<span class="line"><span>4. 测试名称能够表达业务场景</span></span>
<span class="line"><span></span></span>
<span class="line"><span>完成后：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. 运行新增测试</span></span>
<span class="line"><span>2. 输出测试结果</span></span>
<span class="line"><span>3. 说明覆盖了哪些边界条件</span></span></code></pre></div><p>这比：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>帮我写几个测试</span></span></code></pre></div><p>清晰很多。</p><hr><h2 id="_22-模板七-数据库修改" tabindex="-1"><strong>22. 模板七：数据库修改</strong> <a class="header-anchor" href="#_22-模板七-数据库修改" aria-label="Permalink to “22. 模板七：数据库修改”">​</a></h2><p>数据库修改建议更加保守。</p><p>例如：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>任务：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>给 stake_order 增加 settlement_time 字段。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>先不要修改。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>请先分析：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. 当前 Entity</span></span>
<span class="line"><span>2. Mapper</span></span>
<span class="line"><span>3. SQL</span></span>
<span class="line"><span>4. migration 方式</span></span>
<span class="line"><span>5. settlement_flag 的使用位置</span></span>
<span class="line"><span></span></span>
<span class="line"><span>要求：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. 保持旧数据兼容</span></span>
<span class="line"><span>2. 不修改历史 migration</span></span>
<span class="line"><span>3. 提供新的 migration SQL</span></span>
<span class="line"><span>4. 不删除或重命名已有字段</span></span>
<span class="line"><span>5. 分析是否需要索引</span></span>
<span class="line"><span>6. 分析 null 对旧数据的影响</span></span>
<span class="line"><span></span></span>
<span class="line"><span>先给出方案，</span></span>
<span class="line"><span>确认以后再修改。</span></span></code></pre></div><p>对于：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Schema Change</span></span></code></pre></div><p>非常建议：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Plan First</span></span></code></pre></div><hr><h2 id="_23-模板八-性能问题" tabindex="-1"><strong>23. 模板八：性能问题</strong> <a class="header-anchor" href="#_23-模板八-性能问题" aria-label="Permalink to “23. 模板八：性能问题”">​</a></h2><p>例如：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>任务：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>分析用户邀请树查询速度慢的问题。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>当前现象：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>用户下级数量较大时，</span></span>
<span class="line"><span>接口响应时间明显增加。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>先不要修改代码。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>请分析：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. Controller 调用链</span></span>
<span class="line"><span>2. Service 逻辑</span></span>
<span class="line"><span>3. Neo4j Cypher</span></span>
<span class="line"><span>4. 是否存在 N+1 查询</span></span>
<span class="line"><span>5. 是否存在重复查询</span></span>
<span class="line"><span>6. 是否存在不必要的全量加载</span></span>
<span class="line"><span>7. 当前索引是否能够支持查询</span></span>
<span class="line"><span>8. Java 层是否存在低效循环</span></span>
<span class="line"><span></span></span>
<span class="line"><span>输出：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. 性能瓶颈</span></span>
<span class="line"><span>2. 证据</span></span>
<span class="line"><span>3. 优化优先级</span></span>
<span class="line"><span>4. 推荐方案</span></span>
<span class="line"><span>5. 预计影响范围</span></span>
<span class="line"><span></span></span>
<span class="line"><span>不要在没有证据的情况下直接进行大规模重构。</span></span></code></pre></div><p>性能优化特别容易出现：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>凭感觉优化</span></span></code></pre></div><p>所以最好要求：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>先找证据</span></span></code></pre></div><hr><h2 id="_24-模板九-解释陌生项目" tabindex="-1"><strong>24. 模板九：解释陌生项目</strong> <a class="header-anchor" href="#_24-模板九-解释陌生项目" aria-label="Permalink to “24. 模板九：解释陌生项目”">​</a></h2><p>第一次进入项目时可以：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>阅读当前 Repository。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>先不要修改任何文件。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>请分析：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. 项目技术栈</span></span>
<span class="line"><span>2. Maven / Gradle 模块</span></span>
<span class="line"><span>3. 应用启动入口</span></span>
<span class="line"><span>4. Controller 结构</span></span>
<span class="line"><span>5. Service 结构</span></span>
<span class="line"><span>6. 数据库访问方式</span></span>
<span class="line"><span>7. Redis 使用方式</span></span>
<span class="line"><span>8. MQ 使用方式</span></span>
<span class="line"><span>9. 定时任务</span></span>
<span class="line"><span>10. 外部服务调用</span></span>
<span class="line"><span>11. 测试结构</span></span>
<span class="line"><span></span></span>
<span class="line"><span>最后输出：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>项目</span></span>
<span class="line"><span>├── 模块</span></span>
<span class="line"><span>├── 核心业务</span></span>
<span class="line"><span>├── 数据存储</span></span>
<span class="line"><span>├── 消息系统</span></span>
<span class="line"><span>├── 外部依赖</span></span>
<span class="line"><span>└── 测试</span></span>
<span class="line"><span></span></span>
<span class="line"><span>如果某个部分无法从代码确认，</span></span>
<span class="line"><span>明确标记为“未确认”，不要猜测。</span></span></code></pre></div><p>这是非常推荐的新项目开场 Prompt。</p><hr><h2 id="_25-模板十-让-codex-自己修到测试通过" tabindex="-1"><strong>25. 模板十：让 Codex 自己修到测试通过</strong> <a class="header-anchor" href="#_25-模板十-让-codex-自己修到测试通过" aria-label="Permalink to “25. 模板十：让 Codex 自己修到测试通过”">​</a></h2><p>对于边界清晰的任务，可以提高 Agent 自主性：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>修复当前失败的单元测试。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>范围：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>只处理 wallet 模块。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>要求：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. 先运行目标测试确认失败</span></span>
<span class="line"><span>2. 找到根因</span></span>
<span class="line"><span>3. 修复根因，不要仅仅修改测试绕过问题</span></span>
<span class="line"><span>4. 不修改 public API</span></span>
<span class="line"><span>5. 不修改数据库结构</span></span>
<span class="line"><span>6. 不新增依赖</span></span>
<span class="line"><span></span></span>
<span class="line"><span>修改以后重新运行测试。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>如果仍然失败：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>继续分析并修复。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>直到：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>相关测试通过，</span></span>
<span class="line"><span>或者发现无法安全继续的阻塞问题。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>最后输出：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. 根因</span></span>
<span class="line"><span>2. 修改文件</span></span>
<span class="line"><span>3. 修复方式</span></span>
<span class="line"><span>4. 最终测试结果</span></span></code></pre></div><p>这里就体现了 Coding Agent 和普通聊天 AI 的差别：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Run</span></span>
<span class="line"><span>→ Observe</span></span>
<span class="line"><span>→ Fix</span></span>
<span class="line"><span>→ Run Again</span></span></code></pre></div><hr><h2 id="_26-什么时候应该让-codex-先不要修改" tabindex="-1"><strong>26. 什么时候应该让 Codex“先不要修改”？</strong> <a class="header-anchor" href="#_26-什么时候应该让-codex-先不要修改" aria-label="Permalink to “26. 什么时候应该让 Codex“先不要修改”？”">​</a></h2><p>不是所有任务都需要。</p><p>简单任务：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>修复拼写</span></span>
<span class="line"><span>修改变量名</span></span>
<span class="line"><span>增加 null 判断</span></span>
<span class="line"><span>增加简单测试</span></span></code></pre></div><p>可以直接执行。</p><p>但下面这些任务推荐：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>先分析</span></span></code></pre></div><p>例如：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>架构调整</span></span>
<span class="line"><span>数据库修改</span></span>
<span class="line"><span>支付</span></span>
<span class="line"><span>钱包</span></span>
<span class="line"><span>认证</span></span>
<span class="line"><span>权限</span></span>
<span class="line"><span>跨模块重构</span></span>
<span class="line"><span>并发 Bug</span></span>
<span class="line"><span>性能优化</span></span>
<span class="line"><span>复杂线上问题</span></span></code></pre></div><p>可以简单判断：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>如果改错以后回滚成本高</span></span>
<span class="line"><span>→ 先 Plan</span></span></code></pre></div><hr><h2 id="_27-不要把-prompt-写成-微操-agent" tabindex="-1"><strong>27. 不要把 Prompt 写成“微操 Agent”</strong> <a class="header-anchor" href="#_27-不要把-prompt-写成-微操-agent" aria-label="Permalink to “27. 不要把 Prompt 写成“微操 Agent””">​</a></h2><p>Prompt 清晰不代表：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>每一步都必须由人指定</span></span></code></pre></div><p>例如没必要写：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>第一步打开 UserService.java</span></span>
<span class="line"><span>第二步搜索 getUser</span></span>
<span class="line"><span>第三步打开 UserMapper</span></span>
<span class="line"><span>第四步……</span></span></code></pre></div><p>这反而限制 Agent。</p><p>更好的方式是：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>告诉它：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>目标</span></span>
<span class="line"><span>范围</span></span>
<span class="line"><span>约束</span></span>
<span class="line"><span>验证</span></span></code></pre></div><p>至于：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>具体搜索哪些文件</span></span>
<span class="line"><span>先执行 grep 还是 rg</span></span>
<span class="line"><span>先读 Mapper 还是 Service</span></span></code></pre></div><p>可以让 Agent 自己决定。</p><p>也就是：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>控制结果和边界</span></span>
<span class="line"><span>而不是控制每一个动作</span></span></code></pre></div><hr><h2 id="_28-prompt-越长越好吗" tabindex="-1"><strong>28. Prompt 越长越好吗？</strong> <a class="header-anchor" href="#_28-prompt-越长越好吗" aria-label="Permalink to “28. Prompt 越长越好吗？”">​</a></h2><p>不是。</p><p>真正好的 Prompt 是：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>信息密度高</span></span></code></pre></div><p>而不是：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>字数多</span></span></code></pre></div><p>例如：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>修复支付回调重复入账。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>约束：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>- 保持 API 不变</span></span>
<span class="line"><span>- 不修改数据库结构</span></span>
<span class="line"><span>- 使用现有 paymentNo 做幂等</span></span>
<span class="line"><span>- 不新增 Redis 锁</span></span>
<span class="line"><span>- 修改范围只限 payment 模块</span></span>
<span class="line"><span></span></span>
<span class="line"><span>验证：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>- 补重复回调测试</span></span>
<span class="line"><span>- 运行 payment 模块测试</span></span>
<span class="line"><span>- 检查 git diff</span></span></code></pre></div><p>虽然很短，但已经非常清晰。</p><hr><h2 id="_29-哪些东西应该放-agents-md-而不是-prompt" tabindex="-1"><strong>29. 哪些东西应该放 AGENTS.md，而不是 Prompt？</strong> <a class="header-anchor" href="#_29-哪些东西应该放-agents-md-而不是-prompt" aria-label="Permalink to “29. 哪些东西应该放 AGENTS.md，而不是 Prompt？”">​</a></h2><p>如果一条规则：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>每个任务都要重复</span></span></code></pre></div><p>就应该考虑放进：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>AGENTS.md</span></span></code></pre></div><p>例如：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Java 17</span></span>
<span class="line"><span>金额使用 BigDecimal</span></span>
<span class="line"><span>禁止 git push</span></span>
<span class="line"><span>Controller 不返回 Entity</span></span>
<span class="line"><span>修改数据库必须提供 migration</span></span></code></pre></div><p>而 Prompt 更适合：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>当前需求</span></span></code></pre></div><p>例如：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>增加冻结余额</span></span>
<span class="line"><span>修复重复支付</span></span>
<span class="line"><span>重构 RpcClient</span></span></code></pre></div><p>可以简单理解：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>AGENTS.md</span></span>
<span class="line"><span>→ 长期规则</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Prompt</span></span>
<span class="line"><span>→ 当前任务</span></span></code></pre></div><hr><h2 id="_30-一个推荐的-prompt-编写顺序" tabindex="-1"><strong>30. 一个推荐的 Prompt 编写顺序</strong> <a class="header-anchor" href="#_30-一个推荐的-prompt-编写顺序" aria-label="Permalink to “30. 一个推荐的 Prompt 编写顺序”">​</a></h2><p>以后给 Codex 任务时，可以先在脑子里过一遍：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>① 我要它做什么？</span></span>
<span class="line"><span>        ↓</span></span>
<span class="line"><span>② 为什么要做？</span></span>
<span class="line"><span>        ↓</span></span>
<span class="line"><span>③ 允许改哪里？</span></span>
<span class="line"><span>        ↓</span></span>
<span class="line"><span>④ 哪些东西不能动？</span></span>
<span class="line"><span>        ↓</span></span>
<span class="line"><span>⑤ 怎么证明完成了？</span></span>
<span class="line"><span>        ↓</span></span>
<span class="line"><span>⑥ 最后我要它告诉我什么？</span></span></code></pre></div><p>对应：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Goal</span></span>
<span class="line"><span>Context</span></span>
<span class="line"><span>Scope</span></span>
<span class="line"><span>Constraints</span></span>
<span class="line"><span>Verification</span></span>
<span class="line"><span>Output</span></span></code></pre></div><p>这六个问题回答清楚以后，大多数 Prompt 都不会太差。</p><hr><h2 id="_31-最后怎么记" tabindex="-1"><strong>31. 最后怎么记？</strong> <a class="header-anchor" href="#_31-最后怎么记" aria-label="Permalink to “31. 最后怎么记？”">​</a></h2><p>如果只记一个公式：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Codex Prompt</span></span>
<span class="line"><span></span></span>
<span class="line"><span>=</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Context</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>Goal</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>Scope</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>Constraints</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>Verification</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>Output</span></span></code></pre></div><p>也就是：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>背景</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>目标</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>范围</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>约束</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>验证</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>输出</span></span></code></pre></div><p>如果任务复杂，再增加：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Plan First</span></span></code></pre></div><p>于是完整工作方式就是：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>AGENTS.md</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>提供长期项目规则</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Prompt</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>描述当前任务</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Plan</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>复杂任务先设计方案</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Implement</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>Codex 修改代码</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Verification</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>编译 + 测试</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Review</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>Codex Review + Developer Review</span></span></code></pre></div><p>真正高质量地使用 Coding Agent，并不是学会一句：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>“帮我写代码”</span></span></code></pre></div><p>而是学会：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>如何把一个软件工程任务，</span></span>
<span class="line"><span>完整、准确、有边界地交给 Agent。</span></span></code></pre></div><p>当 Prompt 从：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>帮我优化一下</span></span></code></pre></div><p>逐渐变成：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>明确目标</span></span>
<span class="line"><span>明确范围</span></span>
<span class="line"><span>明确约束</span></span>
<span class="line"><span>明确验证</span></span></code></pre></div><p>Codex 的表现通常也会变得：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>更稳定</span></span>
<span class="line"><span>更可控</span></span>
<span class="line"><span>更接近真实的软件工程协作</span></span></code></pre></div><p>而这也是从：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>会使用 AI</span></span></code></pre></div><p>走向：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>会管理 Coding Agent</span></span></code></pre></div><p>非常关键的一步。</p>`,363)]])}var s=r(a,[[`render`,o]]);export{i as __pageData,s as default};