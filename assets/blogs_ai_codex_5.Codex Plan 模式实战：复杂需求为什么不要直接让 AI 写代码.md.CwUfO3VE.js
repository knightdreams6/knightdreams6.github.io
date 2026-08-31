import{At as e,Mt as t,Qt as n,lt as r}from"./chunks/framework.DwOUwJQP.js";var i=JSON.parse(`{"title":"Codex Plan 模式实战：复杂需求为什么不要直接让 AI 写代码","description":"深入介绍 Codex 中 Plan First 的开发方式，讲解复杂需求为什么应该先阅读代码、分析影响范围、制定实施方案，再进入编码阶段，并通过 Java Spring Boot、数据库、钱包、支付和重构等实际场景演示完整工作流。","frontmatter":{"title":"Codex Plan 模式实战：复杂需求为什么不要直接让 AI 写代码","date":"2026-08-30 16:18","tags":["AI","Codex","OpenAI"],"description":"深入介绍 Codex 中 Plan First 的开发方式，讲解复杂需求为什么应该先阅读代码、分析影响范围、制定实施方案，再进入编码阶段，并通过 Java Spring Boot、数据库、钱包、支付和重构等实际场景演示完整工作流。"},"headers":[],"relativePath":"blogs/ai/codex/5.Codex Plan 模式实战：复杂需求为什么不要直接让 AI 写代码.md","filePath":"blogs/ai/codex/5.Codex Plan 模式实战：复杂需求为什么不要直接让 AI 写代码.md","lastUpdated":1788090369000}`),a={name:`blogs/ai/codex/5.Codex Plan 模式实战：复杂需求为什么不要直接让 AI 写代码.md`};function o(r,i,a,o,s,c){return n(),e(`div`,null,[...i[0]||=[t(`<h1 id="codex-plan-模式实战-复杂需求为什么不要直接让-ai-写代码" tabindex="-1"><strong>Codex Plan 模式实战：复杂需求为什么不要直接让 AI 写代码</strong> <a class="header-anchor" href="#codex-plan-模式实战-复杂需求为什么不要直接让-ai-写代码" aria-label="Permalink to “Codex Plan 模式实战：复杂需求为什么不要直接让 AI 写代码”">​</a></h1><p>前面几篇我们已经介绍了：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Codex CLI</span></span>
<span class="line"><span>AGENTS.md</span></span>
<span class="line"><span>常用命令</span></span>
<span class="line"><span>Prompt</span></span></code></pre></div><p>到了这里，已经可以把一个比较完整的任务交给 Codex。</p><p>例如：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>给用户表增加一个 nickname 字段，</span></span>
<span class="line"><span>补充对应 DTO 和查询接口，</span></span>
<span class="line"><span>修改完成后运行相关测试。</span></span></code></pre></div><p>这种需求通常比较简单。</p><p>Codex 可以：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>阅读代码</span></span>
<span class="line"><span>   ↓</span></span>
<span class="line"><span>找到相关文件</span></span>
<span class="line"><span>   ↓</span></span>
<span class="line"><span>修改代码</span></span>
<span class="line"><span>   ↓</span></span>
<span class="line"><span>运行测试</span></span></code></pre></div><p>但是如果需求变成：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>把现在的余额系统增加“冻结余额”能力，</span></span>
<span class="line"><span>同时保证充值、提现、转账和奖励逻辑不受影响。</span></span></code></pre></div><p>情况就完全不同了。</p><p>因为这个需求背后可能涉及：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>数据库</span></span>
<span class="line"><span>余额模型</span></span>
<span class="line"><span>钱包流水</span></span>
<span class="line"><span>提现</span></span>
<span class="line"><span>转账</span></span>
<span class="line"><span>事务</span></span>
<span class="line"><span>并发</span></span>
<span class="line"><span>幂等</span></span>
<span class="line"><span>旧接口兼容</span></span>
<span class="line"><span>历史数据</span></span></code></pre></div><p>如果直接告诉 Codex：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>帮我实现。</span></span></code></pre></div><p>它可能很快就开始修改代码。</p><p>问题是：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>它真的已经理解整个影响范围了吗？</span></span></code></pre></div><p>这就是复杂任务为什么需要：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Plan First</span></span></code></pre></div><p>也就是：</p><blockquote><p>先规划，再实现。</p></blockquote><hr><h2 id="_1-什么是-plan" tabindex="-1"><strong>1. 什么是 Plan？</strong> <a class="header-anchor" href="#_1-什么是-plan" aria-label="Permalink to “1. 什么是 Plan？”">​</a></h2><p>Plan 可以简单理解成：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>在修改代码之前，</span></span>
<span class="line"><span>先把这个任务想清楚。</span></span></code></pre></div><p>完整过程更接近：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Requirement</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>Read</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>Understand</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>Explore</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>Plan</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>Confirm</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>Implement</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>Test</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>Review</span></span></code></pre></div><p>而不是：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Requirement</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>Write Code</span></span></code></pre></div><p>Plan 阶段最重要的特点是：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>先不修改代码</span></span></code></pre></div><p>Codex 当前的任务主要是：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>阅读</span></span>
<span class="line"><span>搜索</span></span>
<span class="line"><span>分析</span></span>
<span class="line"><span>推理</span></span>
<span class="line"><span>设计</span></span></code></pre></div><p>等方案明确以后，再进入：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Implement</span></span></code></pre></div><hr><h2 id="_2-plan-和-plan-不是完全一回事" tabindex="-1"><strong>2. Plan 和 <code>/plan</code> 不是完全一回事</strong> <a class="header-anchor" href="#_2-plan-和-plan-不是完全一回事" aria-label="Permalink to “2. Plan 和 /plan 不是完全一回事”">​</a></h2><p>这里需要先区分两个概念。</p><p>第一个是：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Plan</span></span></code></pre></div><p>也就是：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>规划阶段</span></span></code></pre></div><p>第二个是：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>/plan</span></span></code></pre></div><p>也就是某个 Codex CLI 版本可能提供的具体交互入口或协作方式。</p><p>Codex CLI 仍然在持续更新。</p><p>不同版本中：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Plan</span></span>
<span class="line"><span>Collaboration Mode</span></span>
<span class="line"><span>Slash Command</span></span>
<span class="line"><span>交互入口</span></span></code></pre></div><p>可能发生变化。</p><p>因此当前版本到底提供什么命令，应该优先查看：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>/help</span></span></code></pre></div><p>但无论当前版本有没有一个固定的：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>/plan</span></span></code></pre></div><p>都不影响我们使用：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Plan First</span></span></code></pre></div><p>因为完全可以直接告诉 Codex：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>先进入规划阶段。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>阅读相关代码并给出实现方案。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>当前阶段不要修改任何文件。</span></span></code></pre></div><p>本质上就是：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Plan</span></span></code></pre></div><hr><h2 id="_3-为什么不能复杂需求一上来就-implement" tabindex="-1"><strong>3. 为什么不能复杂需求一上来就 Implement？</strong> <a class="header-anchor" href="#_3-为什么不能复杂需求一上来就-implement" aria-label="Permalink to “3. 为什么不能复杂需求一上来就 Implement？”">​</a></h2><p>假设需求是：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>增加用户余额冻结功能。</span></span></code></pre></div><p>如果直接：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>帮我实现用户余额冻结功能。</span></span></code></pre></div><p>Codex 可能看到：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>user_balance</span></span></code></pre></div><p>然后马上设计：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>balance</span></span>
<span class="line"><span>frozen_balance</span></span></code></pre></div><p>接着修改：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Entity</span></span>
<span class="line"><span>Mapper</span></span>
<span class="line"><span>Service</span></span>
<span class="line"><span>SQL</span></span></code></pre></div><p>表面上看：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>功能实现了</span></span></code></pre></div><p>但真实业务可能还有：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>提现应该扣 available 还是 balance？</span></span>
<span class="line"><span></span></span>
<span class="line"><span>转账时冻结余额能不能使用？</span></span>
<span class="line"><span></span></span>
<span class="line"><span>冻结失败以后是否需要流水？</span></span>
<span class="line"><span></span></span>
<span class="line"><span>解冻是不是幂等？</span></span>
<span class="line"><span></span></span>
<span class="line"><span>一个订单能不能重复 freeze？</span></span>
<span class="line"><span></span></span>
<span class="line"><span>旧用户 frozen_balance 怎么初始化？</span></span>
<span class="line"><span></span></span>
<span class="line"><span>并发 freeze 是否可能超额冻结？</span></span>
<span class="line"><span></span></span>
<span class="line"><span>冻结和扣款之间是什么关系？</span></span></code></pre></div><p>如果这些问题没有先想清楚：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>代码写得越快</span></span>
<span class="line"><span>风险反而越大</span></span></code></pre></div><hr><h2 id="_4-coding-agent-最大的问题不是不会写代码" tabindex="-1"><strong>4. Coding Agent 最大的问题不是不会写代码</strong> <a class="header-anchor" href="#_4-coding-agent-最大的问题不是不会写代码" aria-label="Permalink to “4. Coding Agent 最大的问题不是不会写代码”">​</a></h2><p>现在的 Coding Agent 往往很擅长：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>生成代码</span></span>
<span class="line"><span>修改多个文件</span></span>
<span class="line"><span>执行命令</span></span>
<span class="line"><span>修复编译错误</span></span></code></pre></div><p>真正困难的是：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>它是否理解了正确的问题？</span></span></code></pre></div><p>如果问题理解错了：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>高质量代码</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>错误方案</span></span>
<span class="line"><span>=</span></span>
<span class="line"><span>高质量地实现错误需求</span></span></code></pre></div><p>所以复杂任务中最重要的并不是：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>让 Codex 快点写</span></span></code></pre></div><p>而是：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>先确认它准备怎么写</span></span></code></pre></div><p>这就是 Plan 的价值。</p><hr><h2 id="_5-哪些任务建议先-plan" tabindex="-1"><strong>5. 哪些任务建议先 Plan？</strong> <a class="header-anchor" href="#_5-哪些任务建议先-plan" aria-label="Permalink to “5. 哪些任务建议先 Plan？”">​</a></h2><p>不是所有任务都需要。</p><p>例如：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>修改变量名</span></span>
<span class="line"><span>修复拼写</span></span>
<span class="line"><span>增加 null 判断</span></span>
<span class="line"><span>增加简单 DTO 字段</span></span>
<span class="line"><span>补一个简单测试</span></span></code></pre></div><p>一般可以直接实现。</p><p>但下面这些任务，非常建议先 Plan：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>架构调整</span></span>
<span class="line"><span>数据库结构修改</span></span>
<span class="line"><span>跨模块重构</span></span>
<span class="line"><span>支付逻辑</span></span>
<span class="line"><span>钱包逻辑</span></span>
<span class="line"><span>登录认证</span></span>
<span class="line"><span>权限系统</span></span>
<span class="line"><span>接口迁移</span></span>
<span class="line"><span>并发问题</span></span>
<span class="line"><span>数据一致性</span></span>
<span class="line"><span>性能优化</span></span>
<span class="line"><span>复杂线上 Bug</span></span>
<span class="line"><span>大型依赖升级</span></span></code></pre></div><p>可以用一个简单标准判断：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>如果改错以后代价比较高</span></span>
<span class="line"><span>→ 先 Plan</span></span></code></pre></div><hr><h2 id="_6-plan-阶段到底应该做什么" tabindex="-1"><strong>6. Plan 阶段到底应该做什么？</strong> <a class="header-anchor" href="#_6-plan-阶段到底应该做什么" aria-label="Permalink to “6. Plan 阶段到底应该做什么？”">​</a></h2><p>一个比较完整的 Plan 通常应该回答：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>① 当前代码是怎么工作的？</span></span>
<span class="line"><span></span></span>
<span class="line"><span>② 需求会影响哪些模块？</span></span>
<span class="line"><span></span></span>
<span class="line"><span>③ 需要修改哪些文件？</span></span>
<span class="line"><span></span></span>
<span class="line"><span>④ 数据模型是否需要变化？</span></span>
<span class="line"><span></span></span>
<span class="line"><span>⑤ API 是否会变化？</span></span>
<span class="line"><span></span></span>
<span class="line"><span>⑥ 有没有兼容性问题？</span></span>
<span class="line"><span></span></span>
<span class="line"><span>⑦ 有没有事务和并发风险？</span></span>
<span class="line"><span></span></span>
<span class="line"><span>⑧ 有没有幂等问题？</span></span>
<span class="line"><span></span></span>
<span class="line"><span>⑨ 怎么测试？</span></span>
<span class="line"><span></span></span>
<span class="line"><span>⑩ 怎么判断实现完成？</span></span></code></pre></div><p>所以 Plan 不是：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>列一个 TODO List</span></span></code></pre></div><p>而是：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>建立完整的修改模型</span></span></code></pre></div><hr><h2 id="_7-第一步-先让-codex-阅读现状" tabindex="-1"><strong>7. 第一步：先让 Codex 阅读现状</strong> <a class="header-anchor" href="#_7-第一步-先让-codex-阅读现状" aria-label="Permalink to “7. 第一步：先让 Codex 阅读现状”">​</a></h2><p>不要直接问：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>这个功能应该怎么设计？</span></span></code></pre></div><p>最好先让 Codex：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>理解当前实现</span></span></code></pre></div><p>例如：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>分析当前用户余额系统。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>先不要修改代码。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>请找到：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. 余额数据结构</span></span>
<span class="line"><span>2. 余额查询入口</span></span>
<span class="line"><span>3. 所有余额增加入口</span></span>
<span class="line"><span>4. 所有余额扣减入口</span></span>
<span class="line"><span>5. 钱包流水</span></span>
<span class="line"><span>6. 提现流程</span></span>
<span class="line"><span>7. 转账流程</span></span>
<span class="line"><span>8. 事务控制</span></span>
<span class="line"><span>9. 幂等机制</span></span>
<span class="line"><span>10. 相关测试</span></span>
<span class="line"><span></span></span>
<span class="line"><span>完成以后总结当前余额系统的完整调用关系。</span></span></code></pre></div><p>这一步可以叫：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Explore</span></span></code></pre></div><p>也就是：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>探索代码</span></span></code></pre></div><hr><h2 id="_8-为什么-explore-和-plan-最好分开" tabindex="-1"><strong>8. 为什么 Explore 和 Plan 最好分开？</strong> <a class="header-anchor" href="#_8-为什么-explore-和-plan-最好分开" aria-label="Permalink to “8. 为什么 Explore 和 Plan 最好分开？”">​</a></h2><p>因为：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>没有理解现状</span></span>
<span class="line"><span>就很难设计正确方案</span></span></code></pre></div><p>例如 Agent 一开始可能认为：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>余额只在 UserBalanceService 修改</span></span></code></pre></div><p>但搜索以后发现：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>充值</span></span>
<span class="line"><span>奖励</span></span>
<span class="line"><span>提现</span></span>
<span class="line"><span>转账</span></span>
<span class="line"><span>后台补单</span></span></code></pre></div><p>都存在不同入口。</p><p>这时候 Plan 自然会发生变化。</p><p>所以更可靠的流程是：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Explore</span></span>
<span class="line"><span>   ↓</span></span>
<span class="line"><span>建立事实</span></span>
<span class="line"><span>   ↓</span></span>
<span class="line"><span>Plan</span></span>
<span class="line"><span>   ↓</span></span>
<span class="line"><span>设计修改</span></span></code></pre></div><p>而不是：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>猜测当前架构</span></span>
<span class="line"><span>   ↓</span></span>
<span class="line"><span>直接 Plan</span></span></code></pre></div><hr><h2 id="_9-plan-阶段要求-codex-给出-证据" tabindex="-1"><strong>9. Plan 阶段要求 Codex 给出“证据”</strong> <a class="header-anchor" href="#_9-plan-阶段要求-codex-给出-证据" aria-label="Permalink to “9. Plan 阶段要求 Codex 给出“证据””">​</a></h2><p>这是一个非常实用的技巧。</p><p>不要只让 Codex说：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>余额修改主要在 WalletService。</span></span></code></pre></div><p>可以要求：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>说明判断依据。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>列出：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>- 文件</span></span>
<span class="line"><span>- 类</span></span>
<span class="line"><span>- 方法</span></span>
<span class="line"><span>- 调用关系</span></span></code></pre></div><p>例如：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>请基于实际代码分析。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>每个结论尽量指出：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>文件</span></span>
<span class="line"><span>类名</span></span>
<span class="line"><span>方法名</span></span>
<span class="line"><span></span></span>
<span class="line"><span>如果无法从代码确认，</span></span>
<span class="line"><span>明确标记“未确认”，不要猜测。</span></span></code></pre></div><p>这样 Plan 会更可靠。</p><hr><h2 id="_10-第二步-分析影响范围" tabindex="-1"><strong>10. 第二步：分析影响范围</strong> <a class="header-anchor" href="#_10-第二步-分析影响范围" aria-label="Permalink to “10. 第二步：分析影响范围”">​</a></h2><p>理解现状以后，再让 Codex回答：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>这个需求会影响哪里？</span></span></code></pre></div><p>例如冻结余额功能：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>请分析增加冻结余额以后可能影响的范围。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>至少检查：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. 余额查询</span></span>
<span class="line"><span>2. 提现</span></span>
<span class="line"><span>3. 内部转账</span></span>
<span class="line"><span>4. 充值</span></span>
<span class="line"><span>5. 奖励</span></span>
<span class="line"><span>6. 后台人工调整余额</span></span>
<span class="line"><span>7. 钱包流水</span></span>
<span class="line"><span>8. 定时任务</span></span>
<span class="line"><span>9. 数据统计</span></span>
<span class="line"><span>10. API 返回结构</span></span></code></pre></div><p>最终可能得到：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>wallet</span></span>
<span class="line"><span>├── balance</span></span>
<span class="line"><span>├── transaction</span></span>
<span class="line"><span>├── withdraw</span></span>
<span class="line"><span>├── transfer</span></span>
<span class="line"><span>└── reward</span></span></code></pre></div><p>这一步叫：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Impact Analysis</span></span></code></pre></div><p>也就是：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>影响分析</span></span></code></pre></div><hr><h2 id="_11-为什么影响分析很重要" tabindex="-1"><strong>11. 为什么影响分析很重要？</strong> <a class="header-anchor" href="#_11-为什么影响分析很重要" aria-label="Permalink to “11. 为什么影响分析很重要？”">​</a></h2><p>很多 Bug 并不是：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>新代码本身写错</span></span></code></pre></div><p>而是：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>新代码破坏了旧逻辑</span></span></code></pre></div><p>例如增加：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>frozenBalance</span></span></code></pre></div><p>提现改了。</p><p>但是：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>后台余额统计</span></span></code></pre></div><p>还在直接读取：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>balance</span></span></code></pre></div><p>于是：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>用户端余额</span></span>
<span class="line"><span>后台余额</span></span>
<span class="line"><span>财务余额</span></span></code></pre></div><p>出现不同结果。</p><p>这种问题只有在修改之前进行：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Impact Analysis</span></span></code></pre></div><p>才更容易发现。</p><hr><h2 id="_12-第三步-让-codex-给出具体修改方案" tabindex="-1"><strong>12. 第三步：让 Codex 给出具体修改方案</strong> <a class="header-anchor" href="#_12-第三步-让-codex-给出具体修改方案" aria-label="Permalink to “12. 第三步：让 Codex 给出具体修改方案”">​</a></h2><p>完成 Explore 和 Impact Analysis 以后，再进入真正的 Plan。</p><p>例如：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>基于刚才的分析，</span></span>
<span class="line"><span>给出实现用户余额冻结功能的方案。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>要求：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. 明确数据模型怎么修改</span></span>
<span class="line"><span>2. 明确 Service API</span></span>
<span class="line"><span>3. 明确 freeze 流程</span></span>
<span class="line"><span>4. 明确 unfreeze 流程</span></span>
<span class="line"><span>5. 明确最终扣款流程</span></span>
<span class="line"><span>6. 说明事务边界</span></span>
<span class="line"><span>7. 说明幂等方案</span></span>
<span class="line"><span>8. 说明并发控制</span></span>
<span class="line"><span>9. 说明旧数据兼容</span></span>
<span class="line"><span>10. 说明测试方案</span></span>
<span class="line"><span></span></span>
<span class="line"><span>列出预计需要修改的文件。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>当前阶段仍然不要修改代码。</span></span></code></pre></div><p>注意最后一句：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>仍然不要修改代码</span></span></code></pre></div><p>这样可以避免 Agent 在 Plan 过程中提前开始实施。</p><hr><h2 id="_13-一个好的-plan-应该具体到什么程度" tabindex="-1"><strong>13. 一个好的 Plan 应该具体到什么程度？</strong> <a class="header-anchor" href="#_13-一个好的-plan-应该具体到什么程度" aria-label="Permalink to “13. 一个好的 Plan 应该具体到什么程度？”">​</a></h2><p>太粗：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>1. 修改数据库</span></span>
<span class="line"><span>2. 修改 Service</span></span>
<span class="line"><span>3. 增加测试</span></span></code></pre></div><p>这种 Plan 几乎没有意义。</p><p>比较好的 Plan 应该至少说明：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>改什么</span></span>
<span class="line"><span>为什么改</span></span>
<span class="line"><span>在哪里改</span></span>
<span class="line"><span>怎么验证</span></span>
<span class="line"><span>有什么风险</span></span></code></pre></div><p>例如：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>1. user_balance 增加 frozen_balance</span></span>
<span class="line"><span></span></span>
<span class="line"><span>原因：</span></span>
<span class="line"><span>需要区分可用余额和冻结余额。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>兼容：</span></span>
<span class="line"><span>默认值为 0，保证历史用户数据兼容。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>2. UserBalanceService 增加 freeze/unfreeze</span></span>
<span class="line"><span></span></span>
<span class="line"><span>freeze：</span></span>
<span class="line"><span>available balance 减少</span></span>
<span class="line"><span>frozen balance 增加</span></span>
<span class="line"><span></span></span>
<span class="line"><span>要求：</span></span>
<span class="line"><span>同一业务 sourceId 必须幂等。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>3. WalletTransaction 增加 FREEZE / UNFREEZE 类型</span></span>
<span class="line"><span></span></span>
<span class="line"><span>用于记录冻结和解冻流水。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>4. 增加并发测试</span></span>
<span class="line"><span></span></span>
<span class="line"><span>验证两个并发 freeze 不会导致 available balance &lt; 0。</span></span></code></pre></div><p>这才是真正有实施价值的 Plan。</p><hr><h2 id="_14-plan-最重要的输出之一-文件清单" tabindex="-1"><strong>14. Plan 最重要的输出之一：文件清单</strong> <a class="header-anchor" href="#_14-plan-最重要的输出之一-文件清单" aria-label="Permalink to “14. Plan 最重要的输出之一：文件清单”">​</a></h2><p>我非常推荐让 Codex 在 Plan 最后列出：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>预计修改文件</span></span></code></pre></div><p>例如：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>预计修改：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. UserBalance.java</span></span>
<span class="line"><span>2. UserBalanceService.java</span></span>
<span class="line"><span>3. UserBalanceServiceImpl.java</span></span>
<span class="line"><span>4. WalletTransactionType.java</span></span>
<span class="line"><span>5. UserBalanceMapper.xml</span></span>
<span class="line"><span>6. V20260830__add_frozen_balance.sql</span></span>
<span class="line"><span>7. UserBalanceServiceTest.java</span></span></code></pre></div><p>为什么很有用？</p><p>因为你可以快速判断：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>修改范围是不是合理？</span></span></code></pre></div><p>如果一个简单需求突然出现：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>修改 37 个文件</span></span></code></pre></div><p>就应该检查：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>是不是方案设计过度了？</span></span></code></pre></div><hr><h2 id="_15-plan-也是控制-scope-的工具" tabindex="-1"><strong>15. Plan 也是控制 Scope 的工具</strong> <a class="header-anchor" href="#_15-plan-也是控制-scope-的工具" aria-label="Permalink to “15. Plan 也是控制 Scope 的工具”">​</a></h2><p>上一篇讲 Prompt 时，我们介绍了：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Scope</span></span></code></pre></div><p>Plan 可以进一步验证 Scope。</p><p>例如你告诉 Codex：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>只允许修改 wallet 模块。</span></span></code></pre></div><p>但 Plan 分析以后发现：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>order 模块也依赖余额接口</span></span></code></pre></div><p>这时候 Codex 不应该偷偷修改：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>order</span></span></code></pre></div><p>而应该告诉你：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>当前 Scope 可能不足。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>原因：</span></span>
<span class="line"><span>order 模块直接依赖旧余额行为。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>建议：</span></span>
<span class="line"><span>扩大范围到 order，</span></span>
<span class="line"><span>或者保持旧接口兼容。</span></span></code></pre></div><p>这就是 Plan 的另一个价值：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>在真正修改前暴露冲突</span></span></code></pre></div><hr><h2 id="_16-第四步-人工-review-plan" tabindex="-1"><strong>16. 第四步：人工 Review Plan</strong> <a class="header-anchor" href="#_16-第四步-人工-review-plan" aria-label="Permalink to “16. 第四步：人工 Review Plan”">​</a></h2><p>Plan 生成以后：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>不要马上回复“开始”</span></span></code></pre></div><p>先看几个重点。</p><h3 id="是否理解需求" tabindex="-1"><strong>是否理解需求？</strong> <a class="header-anchor" href="#是否理解需求" aria-label="Permalink to “是否理解需求？”">​</a></h3><p>例如你要：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>冻结余额</span></span></code></pre></div><p>Agent 是否误解成：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>锁定整个账户</span></span></code></pre></div><h3 id="修改范围是否合理" tabindex="-1"><strong>修改范围是否合理？</strong> <a class="header-anchor" href="#修改范围是否合理" aria-label="Permalink to “修改范围是否合理？”">​</a></h3><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>应该改 5 个文件</span></span>
<span class="line"><span>却准备改 30 个文件？</span></span></code></pre></div><h3 id="有没有改变-api" tabindex="-1"><strong>有没有改变 API？</strong> <a class="header-anchor" href="#有没有改变-api" aria-label="Permalink to “有没有改变 API？”">​</a></h3><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>本来要求兼容</span></span>
<span class="line"><span>结果 Plan 准备删除旧字段？</span></span></code></pre></div><h3 id="有没有引入新依赖" tabindex="-1"><strong>有没有引入新依赖？</strong> <a class="header-anchor" href="#有没有引入新依赖" aria-label="Permalink to “有没有引入新依赖？”">​</a></h3><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>现有能力能解决</span></span>
<span class="line"><span>却准备增加新框架？</span></span></code></pre></div><h3 id="数据库方案是否安全" tabindex="-1"><strong>数据库方案是否安全？</strong> <a class="header-anchor" href="#数据库方案是否安全" aria-label="Permalink to “数据库方案是否安全？”">​</a></h3><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>有没有删除字段？</span></span>
<span class="line"><span>有没有修改历史 migration？</span></span></code></pre></div><h3 id="测试是否覆盖关键风险" tabindex="-1"><strong>测试是否覆盖关键风险？</strong> <a class="header-anchor" href="#测试是否覆盖关键风险" aria-label="Permalink to “测试是否覆盖关键风险？”">​</a></h3><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>并发</span></span>
<span class="line"><span>幂等</span></span>
<span class="line"><span>边界</span></span>
<span class="line"><span>异常</span></span></code></pre></div><p>Plan Review 本质上就是：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>在代码产生之前做一次设计 Review</span></span></code></pre></div><hr><h2 id="_17-修改-plan-而不是让-codex-重新猜" tabindex="-1"><strong>17. 修改 Plan，而不是让 Codex 重新猜</strong> <a class="header-anchor" href="#_17-修改-plan-而不是让-codex-重新猜" aria-label="Permalink to “17. 修改 Plan，而不是让 Codex 重新猜”">​</a></h2><p>如果 Plan 大体正确，但某些地方不满意，可以直接修改。</p><p>例如：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>方案整体可以。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>调整以下几点：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. 不新增 Redis 分布式锁</span></span>
<span class="line"><span>2. 使用现有数据库乐观锁</span></span>
<span class="line"><span>3. 不新增 wallet_freeze 表</span></span>
<span class="line"><span>4. frozen_balance 直接放 user_balance</span></span>
<span class="line"><span>5. API 返回保持完全兼容</span></span>
<span class="line"><span></span></span>
<span class="line"><span>基于这些约束重新整理最终 Plan。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>仍然不要修改代码。</span></span></code></pre></div><p>这比：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>不行，重新想</span></span></code></pre></div><p>更有效。</p><p>因为你保留了：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>已经正确的部分</span></span></code></pre></div><p>只调整：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>有问题的决策</span></span></code></pre></div><hr><h2 id="_18-第五步-明确批准-implement" tabindex="-1"><strong>18. 第五步：明确批准 Implement</strong> <a class="header-anchor" href="#_18-第五步-明确批准-implement" aria-label="Permalink to “18. 第五步：明确批准 Implement”">​</a></h2><p>Plan 确认以后，再告诉 Codex：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>按最终方案实施。</span></span></code></pre></div><p>最好继续保留关键约束：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>按最终 Plan 实施。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>要求：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. 只修改 Plan 中列出的文件</span></span>
<span class="line"><span>2. 如果实施过程中发现必须扩大范围，先停止并说明原因</span></span>
<span class="line"><span>3. 不修改现有 public API</span></span>
<span class="line"><span>4. 不新增第三方依赖</span></span>
<span class="line"><span>5. 不提交 Git</span></span>
<span class="line"><span>6. 修改完成后执行计划中的测试</span></span>
<span class="line"><span>7. 最后检查 git diff</span></span></code></pre></div><p>这时候 Codex 才正式进入：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Implement</span></span></code></pre></div><hr><h2 id="_19-implement-阶段不要让-plan-失效" tabindex="-1"><strong>19. Implement 阶段不要让 Plan 失效</strong> <a class="header-anchor" href="#_19-implement-阶段不要让-plan-失效" aria-label="Permalink to “19. Implement 阶段不要让 Plan 失效”">​</a></h2><p>一个常见情况是：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Plan 很好</span></span></code></pre></div><p>但是实现过程中 Agent 发现新问题，然后开始：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>自由发挥</span></span></code></pre></div><p>所以可以提前约定：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>如果发现 Plan 与实际代码不一致：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>不要自行扩大任务。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>先说明：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. 发现了什么</span></span>
<span class="line"><span>2. 为什么原 Plan 不成立</span></span>
<span class="line"><span>3. 建议怎么调整</span></span></code></pre></div><p>这个规则对于复杂项目非常有价值。</p><p>因为：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Plan</span></span></code></pre></div><p>不是为了做完以后好看。</p><p>而是为了：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>控制实施过程</span></span></code></pre></div><hr><h2 id="_20-第六步-test" tabindex="-1"><strong>20. 第六步：Test</strong> <a class="header-anchor" href="#_20-第六步-test" aria-label="Permalink to “20. 第六步：Test”">​</a></h2><p>代码修改完成以后，不要直接结束。</p><p>应该按照 Plan 中的验证方案执行：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Compile</span></span>
<span class="line"><span>   ↓</span></span>
<span class="line"><span>Unit Test</span></span>
<span class="line"><span>   ↓</span></span>
<span class="line"><span>Integration Test</span></span>
<span class="line"><span>   ↓</span></span>
<span class="line"><span>Git Diff</span></span></code></pre></div><p>例如：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>完成实现以后：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. 编译 wallet 模块</span></span>
<span class="line"><span>2. 运行 UserBalanceServiceTest</span></span>
<span class="line"><span>3. 运行提现相关测试</span></span>
<span class="line"><span>4. 运行转账相关测试</span></span>
<span class="line"><span>5. 检查 git diff</span></span></code></pre></div><p>如果测试失败：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Codex</span></span>
<span class="line"><span>↓</span></span>
<span class="line"><span>读取错误</span></span>
<span class="line"><span>↓</span></span>
<span class="line"><span>分析</span></span>
<span class="line"><span>↓</span></span>
<span class="line"><span>修复</span></span>
<span class="line"><span>↓</span></span>
<span class="line"><span>重新测试</span></span></code></pre></div><p>这才是完整 Agent Workflow。</p><hr><h2 id="_21-plan-阶段就应该设计测试" tabindex="-1"><strong>21. Plan 阶段就应该设计测试</strong> <a class="header-anchor" href="#_21-plan-阶段就应该设计测试" aria-label="Permalink to “21. Plan 阶段就应该设计测试”">​</a></h2><p>不要等代码写完才问：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>应该测什么？</span></span></code></pre></div><p>因为测试本身也是设计的一部分。</p><p>例如冻结余额：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>正常冻结</span></span>
<span class="line"><span>余额不足</span></span>
<span class="line"><span>重复冻结</span></span>
<span class="line"><span>正常解冻</span></span>
<span class="line"><span>重复解冻</span></span>
<span class="line"><span>并发冻结</span></span>
<span class="line"><span>冻结后提现</span></span>
<span class="line"><span>冻结后转账</span></span>
<span class="line"><span>异常回滚</span></span>
<span class="line"><span>历史用户 frozenBalance = 0</span></span></code></pre></div><p>如果 Plan 阶段已经列出这些测试：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>实现方案</span></span></code></pre></div><p>往往也会更加完整。</p><p>因为测试会反过来暴露：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>设计遗漏</span></span></code></pre></div><hr><h2 id="_22-第七步-review" tabindex="-1"><strong>22. 第七步：Review</strong> <a class="header-anchor" href="#_22-第七步-review" aria-label="Permalink to “22. 第七步：Review”">​</a></h2><p>测试通过以后，继续：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Review 当前 Git Diff。</span></span></code></pre></div><p>例如：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Review 当前冻结余额功能的 Git Diff。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>重点检查：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. 是否存在超额冻结</span></span>
<span class="line"><span>2. 是否存在重复冻结</span></span>
<span class="line"><span>3. 是否存在重复解冻</span></span>
<span class="line"><span>4. 事务是否完整</span></span>
<span class="line"><span>5. 异常是否正确回滚</span></span>
<span class="line"><span>6. 钱包流水是否一致</span></span>
<span class="line"><span>7. 是否破坏旧 API</span></span>
<span class="line"><span>8. 是否存在 BigDecimal 精度问题</span></span>
<span class="line"><span>9. 是否有与当前需求无关的修改</span></span>
<span class="line"><span></span></span>
<span class="line"><span>不要修改代码，只输出 Review 结果。</span></span></code></pre></div><p>于是完整流程变成：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Explore</span></span>
<span class="line"><span>   ↓</span></span>
<span class="line"><span>Plan</span></span>
<span class="line"><span>   ↓</span></span>
<span class="line"><span>Plan Review</span></span>
<span class="line"><span>   ↓</span></span>
<span class="line"><span>Implement</span></span>
<span class="line"><span>   ↓</span></span>
<span class="line"><span>Test</span></span>
<span class="line"><span>   ↓</span></span>
<span class="line"><span>Code Review</span></span>
<span class="line"><span>   ↓</span></span>
<span class="line"><span>Developer Review</span></span></code></pre></div><hr><h2 id="_23-一个完整的-plan-prompt-模板" tabindex="-1"><strong>23. 一个完整的 Plan Prompt 模板</strong> <a class="header-anchor" href="#_23-一个完整的-plan-prompt-模板" aria-label="Permalink to “23. 一个完整的 Plan Prompt 模板”">​</a></h2><p>下面这个模板可以直接保存：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>任务：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;需求&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>当前阶段只做分析和规划，</span></span>
<span class="line"><span>不要修改任何文件。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>第一步：理解现状</span></span>
<span class="line"><span></span></span>
<span class="line"><span>请阅读相关代码并说明：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. 当前实现</span></span>
<span class="line"><span>2. 主要调用链</span></span>
<span class="line"><span>3. 数据模型</span></span>
<span class="line"><span>4. 事务边界</span></span>
<span class="line"><span>5. 相关测试</span></span>
<span class="line"><span></span></span>
<span class="line"><span>第二步：影响分析</span></span>
<span class="line"><span></span></span>
<span class="line"><span>分析这个需求可能影响：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. 模块</span></span>
<span class="line"><span>2. API</span></span>
<span class="line"><span>3. 数据库</span></span>
<span class="line"><span>4. 异步任务</span></span>
<span class="line"><span>5. 缓存</span></span>
<span class="line"><span>6. MQ</span></span>
<span class="line"><span>7. 兼容性</span></span>
<span class="line"><span></span></span>
<span class="line"><span>第三步：给出方案</span></span>
<span class="line"><span></span></span>
<span class="line"><span>请给出：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. 实现思路</span></span>
<span class="line"><span>2. 数据结构变化</span></span>
<span class="line"><span>3. API 变化</span></span>
<span class="line"><span>4. 具体修改点</span></span>
<span class="line"><span>5. 并发和事务处理</span></span>
<span class="line"><span>6. 幂等方案</span></span>
<span class="line"><span>7. 兼容方案</span></span>
<span class="line"><span>8. 测试方案</span></span>
<span class="line"><span>9. 风险</span></span>
<span class="line"><span></span></span>
<span class="line"><span>最后列出：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>预计修改的文件清单。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>要求：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>- 基于实际代码分析</span></span>
<span class="line"><span>- 无法确认的信息明确标记“未确认”</span></span>
<span class="line"><span>- 不要为了完成 Plan 而猜测</span></span>
<span class="line"><span>- 当前阶段不要修改代码</span></span></code></pre></div><hr><h2 id="_24-java-spring-boot-重构-plan-示例" tabindex="-1"><strong>24. Java / Spring Boot 重构 Plan 示例</strong> <a class="header-anchor" href="#_24-java-spring-boot-重构-plan-示例" aria-label="Permalink to “24. Java / Spring Boot 重构 Plan 示例”">​</a></h2><p>假设需求：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>把多个链 RPC Client 抽象成统一接口。</span></span></code></pre></div><p>可以：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>分析当前链 RPC 实现。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>目标：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>将不同链的公共 RPC 能力抽象为 RpcClient。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>当前阶段不要修改代码。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>请：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. 找到所有 RPC Client</span></span>
<span class="line"><span>2. 找到所有调用方</span></span>
<span class="line"><span>3. 对比不同 Client 的公共能力</span></span>
<span class="line"><span>4. 对比链特有能力</span></span>
<span class="line"><span>5. 分析当前依赖关系</span></span>
<span class="line"><span>6. 判断哪些方法适合进入 RpcClient</span></span>
<span class="line"><span>7. 判断哪些逻辑应该保留在具体实现</span></span>
<span class="line"><span>8. 分析是否需要 RpcClientHolder / Factory</span></span>
<span class="line"><span>9. 分析异常模型是否需要统一</span></span>
<span class="line"><span>10. 分析现有调用方的迁移成本</span></span>
<span class="line"><span></span></span>
<span class="line"><span>给出最终接口设计。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>列出：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>- 新增文件</span></span>
<span class="line"><span>- 修改文件</span></span>
<span class="line"><span>- 删除文件</span></span>
<span class="line"><span>- 测试文件</span></span>
<span class="line"><span></span></span>
<span class="line"><span>要求：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>不改变现有业务行为，</span></span>
<span class="line"><span>不新增第三方依赖，</span></span>
<span class="line"><span>保持现有调用兼容性。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>先输出 Plan。</span></span></code></pre></div><hr><h2 id="_25-数据库变更-plan-示例" tabindex="-1"><strong>25. 数据库变更 Plan 示例</strong> <a class="header-anchor" href="#_25-数据库变更-plan-示例" aria-label="Permalink to “25. 数据库变更 Plan 示例”">​</a></h2><p>数据库修改更应该先 Plan。</p><p>例如：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>需求：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>给 stake_order 增加 settlement_time。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>当前阶段不要修改。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>请先分析：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. stake_order Entity</span></span>
<span class="line"><span>2. Mapper</span></span>
<span class="line"><span>3. Mapper XML</span></span>
<span class="line"><span>4. 所有 settlement_flag 使用位置</span></span>
<span class="line"><span>5. 结算任务</span></span>
<span class="line"><span>6. 查询接口</span></span>
<span class="line"><span>7. 统计代码</span></span>
<span class="line"><span>8. migration 规则</span></span>
<span class="line"><span></span></span>
<span class="line"><span>然后设计方案。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>要求：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. 不修改历史 migration</span></span>
<span class="line"><span>2. 新增独立 migration</span></span>
<span class="line"><span>3. 旧数据必须兼容</span></span>
<span class="line"><span>4. 分析 settlement_time 是否允许 null</span></span>
<span class="line"><span>5. 分析是否需要索引</span></span>
<span class="line"><span>6. 不删除现有 settlement_flag</span></span>
<span class="line"><span>7. 保持旧 API 兼容</span></span>
<span class="line"><span></span></span>
<span class="line"><span>最后给出：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>数据库变更</span></span>
<span class="line"><span>Java 变更</span></span>
<span class="line"><span>测试方案</span></span>
<span class="line"><span>回滚风险</span></span>
<span class="line"><span>修改文件清单</span></span>
<span class="line"><span></span></span>
<span class="line"><span>不要修改代码。</span></span></code></pre></div><hr><h2 id="_26-bug-plan-和功能-plan-不完全一样" tabindex="-1"><strong>26. Bug Plan 和功能 Plan 不完全一样</strong> <a class="header-anchor" href="#_26-bug-plan-和功能-plan-不完全一样" aria-label="Permalink to “26. Bug Plan 和功能 Plan 不完全一样”">​</a></h2><p>新功能通常关注：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>怎么实现</span></span></code></pre></div><p>Bug 更应该先关注：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>根因是什么</span></span></code></pre></div><p>例如：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>用户偶尔出现重复入账。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>先不要修复。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>请：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. 找出所有入账入口</span></span>
<span class="line"><span>2. 找出 DepositRecord 状态变化</span></span>
<span class="line"><span>3. 找出余额更新方法</span></span>
<span class="line"><span>4. 找出定时任务是否可能重复执行</span></span>
<span class="line"><span>5. 找出 MQ / 重试机制</span></span>
<span class="line"><span>6. 找出唯一键</span></span>
<span class="line"><span>7. 找出事务边界</span></span>
<span class="line"><span>8. 找出幂等判断</span></span>
<span class="line"><span></span></span>
<span class="line"><span>要求：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>先证明可能的重复入账路径。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>不要直接增加 Redis 锁或数据库锁。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>先输出：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>根因假设</span></span>
<span class="line"><span>→ 代码证据</span></span>
<span class="line"><span>→ 复现路径</span></span>
<span class="line"><span>→ 修复方案</span></span>
<span class="line"><span>→ 测试方案</span></span></code></pre></div><p>这里特别重要的是：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>不要先给解决方案</span></span>
<span class="line"><span>先找根因</span></span></code></pre></div><hr><h2 id="_27-性能优化-plan-应该先找瓶颈" tabindex="-1"><strong>27. 性能优化 Plan 应该先找瓶颈</strong> <a class="header-anchor" href="#_27-性能优化-plan-应该先找瓶颈" aria-label="Permalink to “27. 性能优化 Plan 应该先找瓶颈”">​</a></h2><p>性能问题也不能直接：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>帮我优化。</span></span></code></pre></div><p>应该：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>分析接口响应慢的问题。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>当前阶段不要修改代码。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>请检查：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. SQL 数量</span></span>
<span class="line"><span>2. 单条 SQL 执行方式</span></span>
<span class="line"><span>3. 是否 N+1</span></span>
<span class="line"><span>4. Redis</span></span>
<span class="line"><span>5. RPC</span></span>
<span class="line"><span>6. MQ</span></span>
<span class="line"><span>7. 循环</span></span>
<span class="line"><span>8. parallelStream</span></span>
<span class="line"><span>9. 大对象加载</span></span>
<span class="line"><span>10. 分页</span></span>
<span class="line"><span>11. 索引</span></span>
<span class="line"><span>12. 日志</span></span>
<span class="line"><span></span></span>
<span class="line"><span>先找出有代码证据的性能瓶颈。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>按照：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>P0</span></span>
<span class="line"><span>P1</span></span>
<span class="line"><span>P2</span></span>
<span class="line"><span></span></span>
<span class="line"><span>给出优化优先级。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>不要在没有证据的情况下进行架构重构。</span></span></code></pre></div><p>Plan 的核心还是：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Evidence First</span></span></code></pre></div><hr><h2 id="_28-plan-不要写得过度复杂" tabindex="-1"><strong>28. Plan 不要写得过度复杂</strong> <a class="header-anchor" href="#_28-plan-不要写得过度复杂" aria-label="Permalink to “28. Plan 不要写得过度复杂”">​</a></h2><p>Plan 很重要。</p><p>但也不能变成：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>任何一个小修改</span></span>
<span class="line"><span>都先分析 30 分钟</span></span></code></pre></div><p>例如：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>把 timeout 从 5 秒改成 10 秒</span></span></code></pre></div><p>如果位置已经明确：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>直接改</span></span></code></pre></div><p>就可以。</p><p>可以简单按照风险分级。</p><h3 id="低风险" tabindex="-1"><strong>低风险</strong> <a class="header-anchor" href="#低风险" aria-label="Permalink to “低风险”">​</a></h3><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>拼写</span></span>
<span class="line"><span>变量名</span></span>
<span class="line"><span>简单配置</span></span>
<span class="line"><span>简单测试</span></span></code></pre></div><p>直接：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Implement</span></span></code></pre></div><h3 id="中风险" tabindex="-1"><strong>中风险</strong> <a class="header-anchor" href="#中风险" aria-label="Permalink to “中风险”">​</a></h3><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>单模块功能</span></span>
<span class="line"><span>Service 修改</span></span>
<span class="line"><span>接口逻辑</span></span>
<span class="line"><span>普通 Bug</span></span></code></pre></div><p>可以：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Quick Plan</span></span>
<span class="line"><span>→ Implement</span></span></code></pre></div><h3 id="高风险" tabindex="-1"><strong>高风险</strong> <a class="header-anchor" href="#高风险" aria-label="Permalink to “高风险”">​</a></h3><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>数据库</span></span>
<span class="line"><span>支付</span></span>
<span class="line"><span>钱包</span></span>
<span class="line"><span>认证</span></span>
<span class="line"><span>并发</span></span>
<span class="line"><span>架构</span></span>
<span class="line"><span>跨模块</span></span></code></pre></div><p>建议：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Explore</span></span>
<span class="line"><span>→ Detailed Plan</span></span>
<span class="line"><span>→ Review</span></span>
<span class="line"><span>→ Implement</span></span></code></pre></div><hr><h2 id="_29-plan-不是让-codex-取代技术决策" tabindex="-1"><strong>29. Plan 不是让 Codex 取代技术决策</strong> <a class="header-anchor" href="#_29-plan-不是让-codex-取代技术决策" aria-label="Permalink to “29. Plan 不是让 Codex 取代技术决策”">​</a></h2><p>还有一个误区：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>既然 Codex 会 Plan，</span></span>
<span class="line"><span>那所有架构决策都让它决定。</span></span></code></pre></div><p>不应该。</p><p>更合理的是：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Codex</span></span>
<span class="line"><span>→ 搜索代码</span></span>
<span class="line"><span>→ 提取事实</span></span>
<span class="line"><span>→ 分析方案</span></span>
<span class="line"><span>→ 提醒风险</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Developer</span></span>
<span class="line"><span>→ 结合业务</span></span>
<span class="line"><span>→ 做关键决策</span></span></code></pre></div><p>特别是：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>数据库模型</span></span>
<span class="line"><span>资金安全</span></span>
<span class="line"><span>架构边界</span></span>
<span class="line"><span>兼容策略</span></span>
<span class="line"><span>生产风险</span></span></code></pre></div><p>最终仍然应该由开发者负责。</p><p>Plan 的价值是：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>提高决策质量</span></span></code></pre></div><p>而不是：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>取消人的决策</span></span></code></pre></div><hr><h2 id="_30-plan-和-agents-md-怎么配合" tabindex="-1"><strong>30. Plan 和 AGENTS.md 怎么配合？</strong> <a class="header-anchor" href="#_30-plan-和-agents-md-怎么配合" aria-label="Permalink to “30. Plan 和 AGENTS.md 怎么配合？”">​</a></h2><p>可以这样理解：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>AGENTS.md</span></span>
<span class="line"><span>→ 长期项目规则</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Prompt</span></span>
<span class="line"><span>→ 当前需求</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Plan</span></span>
<span class="line"><span>→ 当前需求的实施方案</span></span></code></pre></div><p>例如：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>AGENTS.md：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>金额使用 BigDecimal</span></span>
<span class="line"><span>数据库必须 migration</span></span>
<span class="line"><span>禁止 git push</span></span></code></pre></div><p>Prompt：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>增加冻结余额功能</span></span></code></pre></div><p>Plan：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>具体修改哪些表</span></span>
<span class="line"><span>哪些 Service</span></span>
<span class="line"><span>事务怎么设计</span></span>
<span class="line"><span>怎么保证幂等</span></span>
<span class="line"><span>怎么测试</span></span></code></pre></div><p>三者各自解决不同问题。</p><hr><h2 id="_31-plan-和-prompt-的关系" tabindex="-1"><strong>31. Plan 和 Prompt 的关系</strong> <a class="header-anchor" href="#_31-plan-和-prompt-的关系" aria-label="Permalink to “31. Plan 和 Prompt 的关系”">​</a></h2><p>上一篇我们总结：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Prompt</span></span>
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
<span class="line"><span>Output</span></span></code></pre></div><p>对于复杂任务，可以进一步变成：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Prompt</span></span>
<span class="line"><span>   ↓</span></span>
<span class="line"><span>Explore</span></span>
<span class="line"><span>   ↓</span></span>
<span class="line"><span>Plan</span></span>
<span class="line"><span>   ↓</span></span>
<span class="line"><span>Confirm</span></span>
<span class="line"><span>   ↓</span></span>
<span class="line"><span>Implement</span></span>
<span class="line"><span>   ↓</span></span>
<span class="line"><span>Verification</span></span>
<span class="line"><span>   ↓</span></span>
<span class="line"><span>Review</span></span></code></pre></div><p>所以 Plan 不是独立存在的。</p><p>它是：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>复杂 Prompt</span></span></code></pre></div><p>进入实现之前的重要阶段。</p><hr><h2 id="_32-一个推荐的真实开发工作流" tabindex="-1"><strong>32. 一个推荐的真实开发工作流</strong> <a class="header-anchor" href="#_32-一个推荐的真实开发工作流" aria-label="Permalink to “32. 一个推荐的真实开发工作流”">​</a></h2><p>以后遇到复杂需求，可以固定使用：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>① git status</span></span>
<span class="line"><span>       ↓</span></span>
<span class="line"><span>② codex</span></span>
<span class="line"><span>       ↓</span></span>
<span class="line"><span>③ /status</span></span>
<span class="line"><span>       ↓</span></span>
<span class="line"><span>④ 阅读 AGENTS.md</span></span>
<span class="line"><span>       ↓</span></span>
<span class="line"><span>⑤ 给出任务 Prompt</span></span>
<span class="line"><span>       ↓</span></span>
<span class="line"><span>⑥ Explore</span></span>
<span class="line"><span>       ↓</span></span>
<span class="line"><span>⑦ Impact Analysis</span></span>
<span class="line"><span>       ↓</span></span>
<span class="line"><span>⑧ Plan</span></span>
<span class="line"><span>       ↓</span></span>
<span class="line"><span>⑨ Developer Review Plan</span></span>
<span class="line"><span>       ↓</span></span>
<span class="line"><span>⑩ Implement</span></span>
<span class="line"><span>       ↓</span></span>
<span class="line"><span>⑪ Compile / Test</span></span>
<span class="line"><span>       ↓</span></span>
<span class="line"><span>⑫ Codex Review</span></span>
<span class="line"><span>       ↓</span></span>
<span class="line"><span>⑬ git diff</span></span>
<span class="line"><span>       ↓</span></span>
<span class="line"><span>⑭ Developer Review</span></span>
<span class="line"><span>       ↓</span></span>
<span class="line"><span>⑮ Commit</span></span></code></pre></div><p>这里最关键的变化就是：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>需求</span></span></code></pre></div><p>和：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>写代码</span></span></code></pre></div><p>之间多了一层：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Plan</span></span></code></pre></div><hr><h2 id="_33-最后怎么理解-plan" tabindex="-1"><strong>33. 最后怎么理解 Plan？</strong> <a class="header-anchor" href="#_33-最后怎么理解-plan" aria-label="Permalink to “33. 最后怎么理解 Plan？”">​</a></h2><p>如果只记一句话：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Plan 的目的不是让 Codex 多说一点。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>而是在代码真正被修改之前，</span></span>
<span class="line"><span>先暴露错误理解、遗漏范围和设计风险。</span></span></code></pre></div><p>简单任务：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Prompt</span></span>
<span class="line"><span>→ Implement</span></span></code></pre></div><p>复杂任务：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Prompt</span></span>
<span class="line"><span>→ Explore</span></span>
<span class="line"><span>→ Plan</span></span>
<span class="line"><span>→ Review</span></span>
<span class="line"><span>→ Implement</span></span></code></pre></div><p>尤其涉及：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Money</span></span>
<span class="line"><span>Database</span></span>
<span class="line"><span>Concurrency</span></span>
<span class="line"><span>Authentication</span></span>
<span class="line"><span>Architecture</span></span>
<span class="line"><span>Compatibility</span></span></code></pre></div><p>更应该：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Think Before Write</span></span></code></pre></div><p>最终可以把 Codex 的完整工作方式记成：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Read</span></span>
<span class="line"><span>   ↓</span></span>
<span class="line"><span>Understand</span></span>
<span class="line"><span>   ↓</span></span>
<span class="line"><span>Plan</span></span>
<span class="line"><span>   ↓</span></span>
<span class="line"><span>Implement</span></span>
<span class="line"><span>   ↓</span></span>
<span class="line"><span>Test</span></span>
<span class="line"><span>   ↓</span></span>
<span class="line"><span>Review</span></span></code></pre></div><p>其中：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Read</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>Understand</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>Plan</span></span></code></pre></div><p>解决的是：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>做正确的事情</span></span></code></pre></div><p>而：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Implement</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>Test</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>Review</span></span></code></pre></div><p>解决的是：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>把事情正确地做完</span></span></code></pre></div><p>当你开始真正使用这种方式以后，会发现 Coding Agent 的价值不再只是：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>帮我快速生成代码</span></span></code></pre></div><p>而是：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>帮助我完成一个完整的软件工程任务</span></span></code></pre></div><p>这才是 Plan First 真正重要的原因。</p>`,437)]])}var s=r(a,[[`render`,o]]);export{i as __pageData,s as default};