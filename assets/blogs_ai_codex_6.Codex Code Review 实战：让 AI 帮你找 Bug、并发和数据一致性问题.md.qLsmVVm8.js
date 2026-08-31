import{At as e,Mt as t,Qt as n,lt as r}from"./chunks/framework.DwOUwJQP.js";var i=JSON.parse(`{"title":"Codex Code Review 实战：让 AI 帮你找 Bug、并发和数据一致性问题","description":"深入介绍如何使用 Codex 进行 Code Review，从 Git Diff、Review Prompt、严重程度分级，到 Java Spring Boot 项目中的空指针、事务、并发、幂等、BigDecimal、SQL 性能和数据一致性检查，并给出可直接复用的 Review 模板。","frontmatter":{"title":"Codex Code Review 实战：让 AI 帮你找 Bug、并发和数据一致性问题","date":"2026-08-30 16:25","tags":["AI","Codex","OpenAI"],"description":"深入介绍如何使用 Codex 进行 Code Review，从 Git Diff、Review Prompt、严重程度分级，到 Java Spring Boot 项目中的空指针、事务、并发、幂等、BigDecimal、SQL 性能和数据一致性检查，并给出可直接复用的 Review 模板。"},"headers":[],"relativePath":"blogs/ai/codex/6.Codex Code Review 实战：让 AI 帮你找 Bug、并发和数据一致性问题.md","filePath":"blogs/ai/codex/6.Codex Code Review 实战：让 AI 帮你找 Bug、并发和数据一致性问题.md","lastUpdated":1788090369000}`),a={name:`blogs/ai/codex/6.Codex Code Review 实战：让 AI 帮你找 Bug、并发和数据一致性问题.md`};function o(r,i,a,o,s,c){return n(),e(`div`,null,[...i[0]||=[t(`<h1 id="codex-code-review-实战-让-ai-帮你找-bug、并发和数据一致性问题" tabindex="-1"><strong>Codex Code Review 实战：让 AI 帮你找 Bug、并发和数据一致性问题</strong> <a class="header-anchor" href="#codex-code-review-实战-让-ai-帮你找-bug、并发和数据一致性问题" aria-label="Permalink to “Codex Code Review 实战：让 AI 帮你找 Bug、并发和数据一致性问题”">​</a></h1><p>前面几篇我们已经建立了一套比较完整的 Codex 工作方式：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Read</span></span>
<span class="line"><span>   ↓</span></span>
<span class="line"><span>Understand</span></span>
<span class="line"><span>   ↓</span></span>
<span class="line"><span>Plan</span></span>
<span class="line"><span>   ↓</span></span>
<span class="line"><span>Implement</span></span>
<span class="line"><span>   ↓</span></span>
<span class="line"><span>Test</span></span></code></pre></div><p>代码写完、测试通过以后，是不是就结束了？</p><p>还没有。</p><p>真实的软件开发通常还有非常重要的一步：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Code Review</span></span></code></pre></div><p>过去 Code Review 主要依赖：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>开发者自己检查</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>同事 Review</span></span></code></pre></div><p>现在使用 Codex 以后，可以在正式提交之前增加一层：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>AI Review</span></span></code></pre></div><p>于是流程变成：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Implement</span></span>
<span class="line"><span>   ↓</span></span>
<span class="line"><span>Test</span></span>
<span class="line"><span>   ↓</span></span>
<span class="line"><span>Codex Review</span></span>
<span class="line"><span>   ↓</span></span>
<span class="line"><span>Developer Review</span></span>
<span class="line"><span>   ↓</span></span>
<span class="line"><span>Commit / PR</span></span></code></pre></div><p>Codex 非常适合做第一轮代码审查，因为它可以：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>读取 Git Diff</span></span>
<span class="line"><span>搜索相关代码</span></span>
<span class="line"><span>追踪调用链</span></span>
<span class="line"><span>检查上下文</span></span>
<span class="line"><span>分析边界条件</span></span>
<span class="line"><span>寻找潜在 Bug</span></span></code></pre></div><p>但 Code Review 也不是简单输入一句：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>帮我看看代码有没有问题</span></span></code></pre></div><p>就结束了。</p><p>如果 Review Prompt 太模糊，Codex 很容易：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>只检查代码风格</span></span>
<span class="line"><span>输出一些无关建议</span></span>
<span class="line"><span>为了找问题而找问题</span></span>
<span class="line"><span>忽略真正高风险的业务逻辑</span></span></code></pre></div><p>这一篇就专门讲：</p><blockquote><p>如何让 Codex 真正参与 Code Review，而不是只做一次表面的代码点评。</p></blockquote><hr><h2 id="_1-为什么测试通过以后还需要-review" tabindex="-1"><strong>1. 为什么测试通过以后还需要 Review？</strong> <a class="header-anchor" href="#_1-为什么测试通过以后还需要-review" aria-label="Permalink to “1. 为什么测试通过以后还需要 Review？”">​</a></h2><p>因为：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>测试通过</span></span>
<span class="line"><span>≠</span></span>
<span class="line"><span>代码一定正确</span></span></code></pre></div><p>测试只能证明：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>已经覆盖到的场景</span></span></code></pre></div><p>没有出现问题。</p><p>但真实代码还可能存在：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>未覆盖的边界条件</span></span>
<span class="line"><span>并发问题</span></span>
<span class="line"><span>事务问题</span></span>
<span class="line"><span>幂等问题</span></span>
<span class="line"><span>性能问题</span></span>
<span class="line"><span>安全问题</span></span>
<span class="line"><span>兼容性问题</span></span>
<span class="line"><span>可维护性问题</span></span></code></pre></div><p>例如：</p><div class="language-java"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#c62739;--shiki-dark:#F97583;">if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (balance.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">compareTo</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(amount) </span><span style="--shiki-light:#c62739;--shiki-dark:#F97583;">&gt;=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    balance </span><span style="--shiki-light:#c62739;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> balance.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">subtract</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(amount);</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    updateBalance</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(balance);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>单线程测试可能全部通过。</p><p>但是两个请求同时进入：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Request A</span></span>
<span class="line"><span>读取 balance = 100</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Request B</span></span>
<span class="line"><span>读取 balance = 100</span></span></code></pre></div><p>两边都认为：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>余额足够</span></span></code></pre></div><p>于是可能产生：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>并发一致性问题</span></span></code></pre></div><p>普通功能测试未必能够发现。</p><p>而 Review 可以从：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>代码结构</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>调用关系</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>并发模型</span></span></code></pre></div><p>进一步分析。</p><hr><h2 id="_2-codex-review-最适合放在哪个阶段" tabindex="-1"><strong>2. Codex Review 最适合放在哪个阶段？</strong> <a class="header-anchor" href="#_2-codex-review-最适合放在哪个阶段" aria-label="Permalink to “2. Codex Review 最适合放在哪个阶段？”">​</a></h2><p>推荐：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>需求</span></span>
<span class="line"><span>   ↓</span></span>
<span class="line"><span>Plan</span></span>
<span class="line"><span>   ↓</span></span>
<span class="line"><span>Implement</span></span>
<span class="line"><span>   ↓</span></span>
<span class="line"><span>Test</span></span>
<span class="line"><span>   ↓</span></span>
<span class="line"><span>Review</span></span>
<span class="line"><span>   ↓</span></span>
<span class="line"><span>Developer Review</span></span>
<span class="line"><span>   ↓</span></span>
<span class="line"><span>Commit</span></span></code></pre></div><p>为什么不建议代码刚写一半就进行完整 Review？</p><p>因为：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>代码还没完成</span></span>
<span class="line"><span>Diff 还在变化</span></span>
<span class="line"><span>测试还没跑</span></span></code></pre></div><p>这时候 Review 很容易浪费上下文。</p><p>更适合在：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>功能基本完成</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>相关测试通过</span></span></code></pre></div><p>以后进行。</p><hr><h2 id="_3-review-的第一步-先看-git-diff" tabindex="-1"><strong>3. Review 的第一步：先看 Git Diff</strong> <a class="header-anchor" href="#_3-review-的第一步-先看-git-diff" aria-label="Permalink to “3. Review 的第一步：先看 Git Diff”">​</a></h2><p>Codex 做 Review 时，最重要的输入之一就是：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Git Diff</span></span></code></pre></div><p>开发者平时也会：</p><div class="language-bash"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> status</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> diff</span></span></code></pre></div><p>Codex 同样可以基于这些变更理解：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>这次到底改了什么</span></span></code></pre></div><p>例如：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>修改了 5 个文件</span></span>
<span class="line"><span></span></span>
<span class="line"><span>UserBalance.java</span></span>
<span class="line"><span>UserBalanceService.java</span></span>
<span class="line"><span>UserBalanceServiceImpl.java</span></span>
<span class="line"><span>WalletTransactionType.java</span></span>
<span class="line"><span>UserBalanceServiceTest.java</span></span></code></pre></div><p>相比让 Codex：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>重新 Review 整个 Repository</span></span></code></pre></div><p>基于当前 Diff 更容易聚焦：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>本次变更</span></span></code></pre></div><hr><h2 id="_4-为什么-review-不应该只看-diff" tabindex="-1"><strong>4. 为什么 Review 不应该只看 Diff？</strong> <a class="header-anchor" href="#_4-为什么-review-不应该只看-diff" aria-label="Permalink to “4. 为什么 Review 不应该只看 Diff？”">​</a></h2><p>只看 Diff 也存在问题。</p><p>例如当前修改：</p><div class="language-java"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">userBalanceService.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">opsBalance</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(uid, amount);</span></span></code></pre></div><p>仅仅看这一行，很难判断：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>opsBalance 内部是否有事务？</span></span>
<span class="line"><span>是否幂等？</span></span>
<span class="line"><span>是否允许 amount 为负？</span></span>
<span class="line"><span>是否记录流水？</span></span></code></pre></div><p>所以真正有效的 Review 应该是：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Git Diff</span></span>
<span class="line"><span>   +</span></span>
<span class="line"><span>Relevant Context</span></span></code></pre></div><p>也就是：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>先看变更</span></span>
<span class="line"><span>再读取相关上下文</span></span></code></pre></div><p>可以直接告诉 Codex：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Review 当前 Git Diff。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>必要时读取相关调用方、被调用方法、Entity、Mapper 和测试，</span></span>
<span class="line"><span>不要只根据 Diff 表面判断。</span></span></code></pre></div><hr><h2 id="_5-不推荐-帮我-review-一下" tabindex="-1"><strong>5. 不推荐：帮我 Review 一下</strong> <a class="header-anchor" href="#_5-不推荐-帮我-review-一下" aria-label="Permalink to “5. 不推荐：帮我 Review 一下”">​</a></h2><p>例如：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>帮我 Review 当前代码。</span></span></code></pre></div><p>问题和之前的：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>帮我优化一下</span></span></code></pre></div><p>很类似。</p><p>Codex 不知道你最关心：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>代码风格？</span></span>
<span class="line"><span>Bug？</span></span>
<span class="line"><span>性能？</span></span>
<span class="line"><span>事务？</span></span>
<span class="line"><span>安全？</span></span>
<span class="line"><span>兼容性？</span></span></code></pre></div><p>结果很可能输出：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>这个方法可以拆分</span></span>
<span class="line"><span>变量名可以更清晰</span></span>
<span class="line"><span>建议增加注释</span></span></code></pre></div><p>这些不是完全没价值。</p><p>但如果这是一个：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>钱包扣款</span></span></code></pre></div><p>需求，真正应该优先关注的可能是：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>重复扣款</span></span>
<span class="line"><span>超额扣款</span></span>
<span class="line"><span>并发</span></span>
<span class="line"><span>事务</span></span>
<span class="line"><span>幂等</span></span></code></pre></div><p>所以 Review 也需要：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>明确目标</span></span></code></pre></div><hr><h2 id="_6-一个通用的-review-prompt" tabindex="-1"><strong>6. 一个通用的 Review Prompt</strong> <a class="header-anchor" href="#_6-一个通用的-review-prompt" aria-label="Permalink to “6. 一个通用的 Review Prompt”">​</a></h2><p>可以直接使用：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Review 当前 Git Diff。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>不要修改代码。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>必要时读取相关上下文，</span></span>
<span class="line"><span>不要只检查 Diff 表面。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>重点检查：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. 明确的逻辑 Bug</span></span>
<span class="line"><span>2. 空指针</span></span>
<span class="line"><span>3. 边界条件</span></span>
<span class="line"><span>4. 异常处理</span></span>
<span class="line"><span>5. 并发问题</span></span>
<span class="line"><span>6. 事务问题</span></span>
<span class="line"><span>7. 幂等问题</span></span>
<span class="line"><span>8. 数据一致性</span></span>
<span class="line"><span>9. 性能问题</span></span>
<span class="line"><span>10. 向后兼容</span></span>
<span class="line"><span>11. 安全问题</span></span>
<span class="line"><span>12. 测试遗漏</span></span>
<span class="line"><span></span></span>
<span class="line"><span>对于每个问题输出：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>- 严重程度</span></span>
<span class="line"><span>- 文件</span></span>
<span class="line"><span>- 代码位置</span></span>
<span class="line"><span>- 问题原因</span></span>
<span class="line"><span>- 触发条件</span></span>
<span class="line"><span>- 可能后果</span></span>
<span class="line"><span>- 建议修复方式</span></span>
<span class="line"><span></span></span>
<span class="line"><span>只报告有明确依据的问题。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>如果无法确认，</span></span>
<span class="line"><span>标记为“需要确认”，不要当成确定 Bug。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>不要为了输出内容而猜测问题。</span></span></code></pre></div><p>最后几句话非常重要。</p><hr><h2 id="_7-为什么要告诉-codex-不要为了-review-而找问题" tabindex="-1"><strong>7. 为什么要告诉 Codex“不要为了 Review 而找问题”？</strong> <a class="header-anchor" href="#_7-为什么要告诉-codex-不要为了-review-而找问题" aria-label="Permalink to “7. 为什么要告诉 Codex“不要为了 Review 而找问题”？”">​</a></h2><p>AI 做 Review 时可能存在一个倾向：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>用户让我找问题</span></span>
<span class="line"><span>↓</span></span>
<span class="line"><span>那我最好输出几个问题</span></span></code></pre></div><p>于是可能出现：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>理论上可以优化</span></span>
<span class="line"><span>可能存在风险</span></span>
<span class="line"><span>建议考虑……</span></span></code></pre></div><p>但这些问题：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>不一定真实</span></span></code></pre></div><p>所以应该明确：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>没有问题也可以说没有发现明确问题。</span></span></code></pre></div><p>例如：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>只报告能够从代码中得到明确证据的问题。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>如果只是风格偏好，</span></span>
<span class="line"><span>不要作为 Bug 输出。</span></span></code></pre></div><p>这会明显提高 Review 结果的信噪比。</p><hr><h2 id="_8-review-结果最好按严重程度分级" tabindex="-1"><strong>8. Review 结果最好按严重程度分级</strong> <a class="header-anchor" href="#_8-review-结果最好按严重程度分级" aria-label="Permalink to “8. Review 结果最好按严重程度分级”">​</a></h2><p>不是所有问题都一样重要。</p><p>例如：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>变量名不够清晰</span></span></code></pre></div><p>和：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>可能导致用户重复扣款</span></span></code></pre></div><p>显然不是一个级别。</p><p>可以让 Codex 使用：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>P0</span></span>
<span class="line"><span>P1</span></span>
<span class="line"><span>P2</span></span>
<span class="line"><span>P3</span></span></code></pre></div><p>例如：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>P0</span></span>
<span class="line"><span>→ 严重数据 / 资金 / 安全事故</span></span>
<span class="line"><span></span></span>
<span class="line"><span>P1</span></span>
<span class="line"><span>→ 高概率生产 Bug</span></span>
<span class="line"><span></span></span>
<span class="line"><span>P2</span></span>
<span class="line"><span>→ 边界条件 / 性能 / 维护风险</span></span>
<span class="line"><span></span></span>
<span class="line"><span>P3</span></span>
<span class="line"><span>→ 低风险改进</span></span></code></pre></div><p>或者：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Critical</span></span>
<span class="line"><span>High</span></span>
<span class="line"><span>Medium</span></span>
<span class="line"><span>Low</span></span></code></pre></div><p>重点不是具体名称。</p><p>而是：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>让开发者快速知道先看什么</span></span></code></pre></div><hr><h2 id="_9-一个推荐的严重程度定义" tabindex="-1"><strong>9. 一个推荐的严重程度定义</strong> <a class="header-anchor" href="#_9-一个推荐的严重程度定义" aria-label="Permalink to “9. 一个推荐的严重程度定义”">​</a></h2><p>可以直接写进 Prompt：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>严重程度：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>P0：</span></span>
<span class="line"><span>可能导致资金错误、数据损坏、严重安全问题。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>P1：</span></span>
<span class="line"><span>可能导致主要业务错误、重复执行、事务不一致。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>P2：</span></span>
<span class="line"><span>边界条件 Bug、明显性能问题、异常处理问题。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>P3：</span></span>
<span class="line"><span>低风险维护性问题。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>不要把纯代码风格问题标记为 P0/P1。</span></span></code></pre></div><p>这样 Review 结果会更容易处理。</p><hr><h2 id="_10-java-review-空指针" tabindex="-1"><strong>10. Java Review：空指针</strong> <a class="header-anchor" href="#_10-java-review-空指针" aria-label="Permalink to “10. Java Review：空指针”">​</a></h2><p>Java 项目中非常常见。</p><p>例如：</p><div class="language-java"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">User user </span><span style="--shiki-light:#c62739;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> userMapper.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">selectById</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(uid);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#c62739;--shiki-dark:#F97583;">return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> user.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getName</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span></code></pre></div><p>如果：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>user 不存在</span></span></code></pre></div><p>就会：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>NullPointerException</span></span></code></pre></div><p>Review 时可以让 Codex 重点检查：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Mapper 查询结果</span></span>
<span class="line"><span>Map.get</span></span>
<span class="line"><span>List.get</span></span>
<span class="line"><span>Optional</span></span>
<span class="line"><span>外部 API 返回值</span></span>
<span class="line"><span>JSON 字段</span></span>
<span class="line"><span>数据库 nullable 字段</span></span></code></pre></div><p>Prompt：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>重点检查所有新代码中的 null 假设。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>特别关注：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>- Mapper 查询可能返回 null</span></span>
<span class="line"><span>- Map.get</span></span>
<span class="line"><span>- 外部接口返回值</span></span>
<span class="line"><span>- nullable 数据库字段</span></span>
<span class="line"><span>- List 为空</span></span></code></pre></div><hr><h2 id="_11-java-review-bigdecimal" tabindex="-1"><strong>11. Java Review：BigDecimal</strong> <a class="header-anchor" href="#_11-java-review-bigdecimal" aria-label="Permalink to “11. Java Review：BigDecimal”">​</a></h2><p>资金项目中非常重要。</p><p>常见错误：</p><div class="language-java"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#c62739;--shiki-dark:#F97583;">if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (amount.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">doubleValue</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() </span><span style="--shiki-light:#c62739;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>或者：</p><div class="language-java"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#c62739;--shiki-dark:#F97583;">new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> BigDecimal</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0.1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre></div><p>或者：</p><div class="language-java"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">amount.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">equals</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#c62739;--shiki-dark:#F97583;">new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> BigDecimal</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;1.00&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">))</span></span></code></pre></div><p>可能存在：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>精度</span></span>
<span class="line"><span>scale</span></span>
<span class="line"><span>比较行为</span></span></code></pre></div><p>问题。</p><p>Review 可以明确：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>检查所有金额处理：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. 是否使用 BigDecimal</span></span>
<span class="line"><span>2. 是否使用 double / float</span></span>
<span class="line"><span>3. compareTo 是否正确</span></span>
<span class="line"><span>4. 除法是否指定 scale 和 rounding</span></span>
<span class="line"><span>5. 是否可能产生负余额</span></span>
<span class="line"><span>6. 金额单位是否一致</span></span></code></pre></div><p>对于：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>支付</span></span>
<span class="line"><span>钱包</span></span>
<span class="line"><span>奖励</span></span>
<span class="line"><span>结算</span></span></code></pre></div><p>这应该是固定检查项。</p><hr><h2 id="_12-java-review-事务" tabindex="-1"><strong>12. Java Review：事务</strong> <a class="header-anchor" href="#_12-java-review-事务" aria-label="Permalink to “12. Java Review：事务”">​</a></h2><p>Spring 项目另一个重点：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>@Transactional</span></span></code></pre></div><p>例如：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>创建提现订单</span></span>
<span class="line"><span>   ↓</span></span>
<span class="line"><span>扣减余额</span></span></code></pre></div><p>如果：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>订单创建成功</span></span>
<span class="line"><span>余额扣减失败</span></span></code></pre></div><p>应该怎么办？</p><p>或者反过来：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>余额扣了</span></span>
<span class="line"><span>订单没创建</span></span></code></pre></div><p>就可能出现：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>数据不一致</span></span></code></pre></div><p>Review 时应该检查：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>事务边界</span></span>
<span class="line"><span>事务传播</span></span>
<span class="line"><span>异常是否触发回滚</span></span>
<span class="line"><span>自调用</span></span>
<span class="line"><span>异步方法</span></span>
<span class="line"><span>跨服务调用</span></span></code></pre></div><hr><h2 id="_13-一个事务-review-prompt" tabindex="-1"><strong>13. 一个事务 Review Prompt</strong> <a class="header-anchor" href="#_13-一个事务-review-prompt" aria-label="Permalink to “13. 一个事务 Review Prompt”">​</a></h2><p>例如：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>重点 Review 当前修改中的事务一致性。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>请检查：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. 哪些方法有 @Transactional</span></span>
<span class="line"><span>2. 事务边界是否覆盖完整业务操作</span></span>
<span class="line"><span>3. 是否存在 Spring 自调用导致事务失效</span></span>
<span class="line"><span>4. 是否捕获异常以后没有重新抛出</span></span>
<span class="line"><span>5. 是否存在 checked exception 不回滚</span></span>
<span class="line"><span>6. 是否在事务中执行耗时 RPC</span></span>
<span class="line"><span>7. 是否存在数据库成功但 MQ / RPC 失败</span></span>
<span class="line"><span>8. 是否存在余额变化与流水不一致</span></span>
<span class="line"><span></span></span>
<span class="line"><span>只报告能够结合实际代码说明的问题。</span></span></code></pre></div><p>这比：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>看看事务有没有问题</span></span></code></pre></div><p>更有效。</p><hr><h2 id="_14-java-review-并发" tabindex="-1"><strong>14. Java Review：并发</strong> <a class="header-anchor" href="#_14-java-review-并发" aria-label="Permalink to “14. Java Review：并发”">​</a></h2><p>并发 Bug 是 AI Review 很值得尝试的领域之一。</p><p>例如：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>读取余额</span></span>
<span class="line"><span>↓</span></span>
<span class="line"><span>判断余额</span></span>
<span class="line"><span>↓</span></span>
<span class="line"><span>扣减余额</span></span></code></pre></div><p>在单线程中完全正常。</p><p>但两个线程：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Thread A</span></span>
<span class="line"><span>Read 100</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Thread B</span></span>
<span class="line"><span>Read 100</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Thread A</span></span>
<span class="line"><span>-80</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Thread B</span></span>
<span class="line"><span>-80</span></span></code></pre></div><p>就可能出现问题。</p><p>所以 Review 时可以重点搜索：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>read-modify-write</span></span></code></pre></div><p>模式。</p><p>例如：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>查询</span></span>
<span class="line"><span>↓</span></span>
<span class="line"><span>Java 判断</span></span>
<span class="line"><span>↓</span></span>
<span class="line"><span>更新</span></span></code></pre></div><p>然后分析：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>是否存在锁</span></span>
<span class="line"><span>乐观锁</span></span>
<span class="line"><span>CAS</span></span>
<span class="line"><span>条件 UPDATE</span></span>
<span class="line"><span>数据库事务</span></span>
<span class="line"><span>唯一约束</span></span></code></pre></div><hr><h2 id="_15-并发-review-模板" tabindex="-1"><strong>15. 并发 Review 模板</strong> <a class="header-anchor" href="#_15-并发-review-模板" aria-label="Permalink to “15. 并发 Review 模板”">​</a></h2><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>重点 Review 当前修改中的并发安全。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>检查：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. 是否存在 read-modify-write</span></span>
<span class="line"><span>2. 两个请求同时执行会发生什么</span></span>
<span class="line"><span>3. 是否依赖先查后改</span></span>
<span class="line"><span>4. 是否存在乐观锁</span></span>
<span class="line"><span>5. 是否存在数据库条件更新</span></span>
<span class="line"><span>6. 是否存在唯一约束</span></span>
<span class="line"><span>7. Redis 锁是否可能过期</span></span>
<span class="line"><span>8. 锁粒度是否正确</span></span>
<span class="line"><span>9. 是否存在重复执行</span></span>
<span class="line"><span>10. 是否可能产生负余额</span></span>
<span class="line"><span></span></span>
<span class="line"><span>对于每个并发问题，</span></span>
<span class="line"><span>给出一个具体的双请求执行时序。</span></span></code></pre></div><p>最后一句特别有用。</p><p>不要只让 Codex 说：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>可能存在并发问题</span></span></code></pre></div><p>而是要求它：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>给出执行时序</span></span></code></pre></div><hr><h2 id="_16-什么叫-给出并发执行时序" tabindex="-1"><strong>16. 什么叫“给出并发执行时序”？</strong> <a class="header-anchor" href="#_16-什么叫-给出并发执行时序" aria-label="Permalink to “16. 什么叫“给出并发执行时序”？”">​</a></h2><p>例如：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>初始余额：100</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Request A</span></span>
<span class="line"><span>→ 查询余额 = 100</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Request B</span></span>
<span class="line"><span>→ 查询余额 = 100</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Request A</span></span>
<span class="line"><span>→ 判断 100 &gt;= 80</span></span>
<span class="line"><span>→ 成功</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Request B</span></span>
<span class="line"><span>→ 判断 100 &gt;= 80</span></span>
<span class="line"><span>→ 成功</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Request A</span></span>
<span class="line"><span>→ 更新余额 20</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Request B</span></span>
<span class="line"><span>→ 更新余额 20</span></span></code></pre></div><p>最终：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>系统记录两次扣款</span></span>
<span class="line"><span>余额却只减少一次</span></span></code></pre></div><p>或者根据实现产生：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>负余额</span></span></code></pre></div><p>这种 Review 结果就非常有价值。</p><p>因为它给出了：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Bug 如何真实发生</span></span></code></pre></div><hr><h2 id="_17-review-幂等" tabindex="-1"><strong>17. Review：幂等</strong> <a class="header-anchor" href="#_17-review-幂等" aria-label="Permalink to “17. Review：幂等”">​</a></h2><p>涉及：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>支付回调</span></span>
<span class="line"><span>充值</span></span>
<span class="line"><span>提现</span></span>
<span class="line"><span>MQ</span></span>
<span class="line"><span>定时任务</span></span>
<span class="line"><span>第三方通知</span></span></code></pre></div><p>都应该重点检查：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Idempotency</span></span></code></pre></div><p>也就是：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>同一个业务请求执行两次，</span></span>
<span class="line"><span>结果是否仍然正确？</span></span></code></pre></div><p>例如支付回调：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>第一次</span></span>
<span class="line"><span>→ 入账 100</span></span>
<span class="line"><span></span></span>
<span class="line"><span>第三方重试</span></span>
<span class="line"><span>→ 再次回调</span></span>
<span class="line"><span></span></span>
<span class="line"><span>第二次</span></span>
<span class="line"><span>→ 还能不能再入账 100？</span></span></code></pre></div><p>如果可以：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>严重 Bug</span></span></code></pre></div><hr><h2 id="_18-幂等-review-模板" tabindex="-1"><strong>18. 幂等 Review 模板</strong> <a class="header-anchor" href="#_18-幂等-review-模板" aria-label="Permalink to “18. 幂等 Review 模板”">​</a></h2><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>重点检查当前修改的幂等性。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>对于所有：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>- API</span></span>
<span class="line"><span>- MQ Consumer</span></span>
<span class="line"><span>- 定时任务</span></span>
<span class="line"><span>- 支付回调</span></span>
<span class="line"><span>- 充值确认</span></span>
<span class="line"><span>- 重试逻辑</span></span>
<span class="line"><span></span></span>
<span class="line"><span>分析：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>同一个业务请求执行两次会发生什么？</span></span>
<span class="line"><span></span></span>
<span class="line"><span>重点检查：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. 是否存在业务唯一 ID</span></span>
<span class="line"><span>2. 是否存在数据库唯一约束</span></span>
<span class="line"><span>3. 是否只在 Java 层判断</span></span>
<span class="line"><span>4. 判断和写入是否原子</span></span>
<span class="line"><span>5. 并发重复请求是否仍然安全</span></span>
<span class="line"><span>6. 失败重试是否可能重复执行副作用</span></span>
<span class="line"><span></span></span>
<span class="line"><span>如果发现问题，</span></span>
<span class="line"><span>给出重复执行的具体路径。</span></span></code></pre></div><hr><h2 id="_19-review-数据库唯一约束" tabindex="-1"><strong>19. Review：数据库唯一约束</strong> <a class="header-anchor" href="#_19-review-数据库唯一约束" aria-label="Permalink to “19. Review：数据库唯一约束”">​</a></h2><p>很多代码看起来有幂等判断：</p><div class="language-java"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#c62739;--shiki-dark:#F97583;">if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#c62739;--shiki-dark:#F97583;">!</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">exists</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(sourceId)) {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    insert</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(record);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>但并发情况下：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Request A</span></span>
<span class="line"><span>exists = false</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Request B</span></span>
<span class="line"><span>exists = false</span></span>
<span class="line"><span></span></span>
<span class="line"><span>A insert</span></span>
<span class="line"><span></span></span>
<span class="line"><span>B insert</span></span></code></pre></div><p>如果数据库没有：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>UNIQUE</span></span></code></pre></div><p>仍然可能重复。</p><p>所以涉及业务唯一性的 Review，要同时检查：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Java 判断</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>数据库约束</span></span></code></pre></div><p>而不是只看 Service。</p><hr><h2 id="_20-review-mq-重复消费" tabindex="-1"><strong>20. Review：MQ 重复消费</strong> <a class="header-anchor" href="#_20-review-mq-重复消费" aria-label="Permalink to “20. Review：MQ 重复消费”">​</a></h2><p>MQ Consumer 通常必须考虑：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>消息重复</span></span></code></pre></div><p>例如：</p><div class="language-java"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">@</span><span style="--shiki-light:#c62739;--shiki-dark:#F97583;">RabbitListener</span></span>
<span class="line"><span style="--shiki-light:#c62739;--shiki-dark:#F97583;">public</span><span style="--shiki-light:#c62739;--shiki-dark:#F97583;"> void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> handle</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(OrderPaidEvent event) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    rewardService.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">reward</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(event.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getUid</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(), event.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getAmount</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">());</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>Review 应该继续问：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>MQ 重投以后怎么办？</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Consumer 崩溃重启怎么办？</span></span>
<span class="line"><span></span></span>
<span class="line"><span>业务执行成功但 ACK 失败怎么办？</span></span>
<span class="line"><span></span></span>
<span class="line"><span>reward 是否幂等？</span></span></code></pre></div><p>所以对于 MQ 代码：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>消费成功</span></span></code></pre></div><p>不是唯一关注点。</p><p>还应该看：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>重复消费</span></span>
<span class="line"><span>失败重试</span></span>
<span class="line"><span>ACK</span></span>
<span class="line"><span>死信</span></span>
<span class="line"><span>副作用</span></span></code></pre></div><hr><h2 id="_21-review-sql-性能" tabindex="-1"><strong>21. Review：SQL 性能</strong> <a class="header-anchor" href="#_21-review-sql-性能" aria-label="Permalink to “21. Review：SQL 性能”">​</a></h2><p>Code Review 也可以检查性能。</p><p>例如：</p><div class="language-java"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#c62739;--shiki-dark:#F97583;">for</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (Long uid </span><span style="--shiki-light:#c62739;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> uids) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    User user </span><span style="--shiki-light:#c62739;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> userMapper.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">selectById</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(uid);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>可能产生：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>N + 1</span></span></code></pre></div><p>如果：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>uids = 1000</span></span></code></pre></div><p>就可能执行：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>1000 次 SQL</span></span></code></pre></div><p>Review 时可以要求：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>检查新增代码是否存在：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. 循环 SQL</span></span>
<span class="line"><span>2. N+1</span></span>
<span class="line"><span>3. 全表查询</span></span>
<span class="line"><span>4. 无分页大结果集</span></span>
<span class="line"><span>5. 不必要的 count</span></span>
<span class="line"><span>6. 缺失索引的查询条件</span></span>
<span class="line"><span>7. 重复数据库查询</span></span></code></pre></div><hr><h2 id="_22-review-redis" tabindex="-1"><strong>22. Review：Redis</strong> <a class="header-anchor" href="#_22-review-redis" aria-label="Permalink to “22. Review：Redis”">​</a></h2><p>Redis 相关代码可以重点检查：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Key</span></span>
<span class="line"><span>TTL</span></span>
<span class="line"><span>并发</span></span>
<span class="line"><span>缓存一致性</span></span>
<span class="line"><span>序列化</span></span>
<span class="line"><span>缓存穿透</span></span>
<span class="line"><span>缓存击穿</span></span>
<span class="line"><span>锁</span></span></code></pre></div><p>例如：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>数据库更新成功</span></span>
<span class="line"><span>↓</span></span>
<span class="line"><span>Redis 删除失败</span></span></code></pre></div><p>会不会导致：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>旧缓存继续存在？</span></span></code></pre></div><p>如果是 Redis Lock：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>锁有没有唯一 owner？</span></span>
<span class="line"><span>释放锁时是否可能删掉别人的锁？</span></span>
<span class="line"><span>TTL 是否可能提前过期？</span></span>
<span class="line"><span>业务执行时间是否超过 TTL？</span></span></code></pre></div><p>这些都很适合专项 Review。</p><hr><h2 id="_23-review-接口兼容性" tabindex="-1"><strong>23. Review：接口兼容性</strong> <a class="header-anchor" href="#_23-review-接口兼容性" aria-label="Permalink to “23. Review：接口兼容性”">​</a></h2><p>一个很容易被忽略的问题是：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>代码逻辑没 Bug</span></span>
<span class="line"><span>但是 API 不兼容了</span></span></code></pre></div><p>例如：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>字段改名</span></span>
<span class="line"><span>字段删除</span></span>
<span class="line"><span>类型变化</span></span>
<span class="line"><span>null 行为变化</span></span>
<span class="line"><span>错误码变化</span></span>
<span class="line"><span>分页结构变化</span></span>
<span class="line"><span>枚举值变化</span></span></code></pre></div><p>如果还有：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>旧 App</span></span>
<span class="line"><span>第三方调用方</span></span>
<span class="line"><span>其他微服务</span></span></code></pre></div><p>就可能直接出问题。</p><p>Review Prompt：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>检查当前 Diff 的向后兼容性。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>重点检查：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. API 字段删除</span></span>
<span class="line"><span>2. 字段改名</span></span>
<span class="line"><span>3. 字段类型变化</span></span>
<span class="line"><span>4. null 行为变化</span></span>
<span class="line"><span>5. 枚举变化</span></span>
<span class="line"><span>6. 错误码变化</span></span>
<span class="line"><span>7. 默认值变化</span></span>
<span class="line"><span>8. 数据库字段兼容</span></span>
<span class="line"><span>9. 旧调用方是否仍然可用</span></span></code></pre></div><hr><h2 id="_24-review-异常处理" tabindex="-1"><strong>24. Review：异常处理</strong> <a class="header-anchor" href="#_24-review-异常处理" aria-label="Permalink to “24. Review：异常处理”">​</a></h2><p>常见问题：</p><div class="language-java"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#c62739;--shiki-dark:#F97583;">try</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    doSomething</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">} </span><span style="--shiki-light:#c62739;--shiki-dark:#F97583;">catch</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (Exception </span><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">e</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    log.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">error</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;error&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, e);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>异常被：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>吃掉</span></span></code></pre></div><p>以后，调用方可能认为：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>执行成功</span></span></code></pre></div><p>特别是事务方法中：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>catch</span></span>
<span class="line"><span>↓</span></span>
<span class="line"><span>不抛出</span></span></code></pre></div><p>可能导致事务行为和预期不同。</p><p>Review 可以检查：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>异常是否被吞</span></span>
<span class="line"><span>错误码是否正确</span></span>
<span class="line"><span>是否错误重试</span></span>
<span class="line"><span>是否重复记录日志</span></span>
<span class="line"><span>是否暴露敏感信息</span></span></code></pre></div><hr><h2 id="_25-review-测试是否真的有效" tabindex="-1"><strong>25. Review：测试是否真的有效</strong> <a class="header-anchor" href="#_25-review-测试是否真的有效" aria-label="Permalink to “25. Review：测试是否真的有效”">​</a></h2><p>有测试不代表测试有价值。</p><p>例如：</p><div class="language-java"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">@</span><span style="--shiki-light:#c62739;--shiki-dark:#F97583;">Test</span></span>
<span class="line"><span style="--shiki-light:#c62739;--shiki-dark:#F97583;">void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> testFreeze</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    assertTrue</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>当然没意义。</p><p>更现实的问题是：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>测试只覆盖正常路径</span></span></code></pre></div><p>没有覆盖：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>余额不足</span></span>
<span class="line"><span>重复请求</span></span>
<span class="line"><span>并发</span></span>
<span class="line"><span>null</span></span>
<span class="line"><span>异常</span></span>
<span class="line"><span>回滚</span></span>
<span class="line"><span>边界值</span></span></code></pre></div><p>所以 Code Review 也应该 Review：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Test Diff</span></span></code></pre></div><p>例如：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>检查新增测试是否真正覆盖本次修改风险。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>重点关注：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. 正常路径</span></span>
<span class="line"><span>2. 边界值</span></span>
<span class="line"><span>3. 异常路径</span></span>
<span class="line"><span>4. 重复执行</span></span>
<span class="line"><span>5. 并发</span></span>
<span class="line"><span>6. 事务回滚</span></span>
<span class="line"><span>7. 历史数据兼容</span></span>
<span class="line"><span></span></span>
<span class="line"><span>指出当前修改中重要但没有测试覆盖的场景。</span></span></code></pre></div><hr><h2 id="_26-不要让-codex-自动修改所有-review-问题" tabindex="-1"><strong>26. 不要让 Codex 自动修改所有 Review 问题</strong> <a class="header-anchor" href="#_26-不要让-codex-自动修改所有-review-问题" aria-label="Permalink to “26. 不要让 Codex 自动修改所有 Review 问题”">​</a></h2><p>这是一个很重要的习惯。</p><p>第一次 Review 推荐：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>只输出问题</span></span>
<span class="line"><span>不要修改代码</span></span></code></pre></div><p>为什么？</p><p>因为 Review 阶段的目标是：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>发现问题</span></span></code></pre></div><p>如果一边 Review：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>一边自动修改</span></span></code></pre></div><p>就会导致：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>原始 Diff</span></span>
<span class="line"><span>↓</span></span>
<span class="line"><span>Review</span></span>
<span class="line"><span>↓</span></span>
<span class="line"><span>产生新 Diff</span></span>
<span class="line"><span>↓</span></span>
<span class="line"><span>新的代码又没有 Review</span></span></code></pre></div><p>流程会变得混乱。</p><p>更好的方式：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Review</span></span>
<span class="line"><span>   ↓</span></span>
<span class="line"><span>问题列表</span></span>
<span class="line"><span>   ↓</span></span>
<span class="line"><span>Developer 判断</span></span>
<span class="line"><span>   ↓</span></span>
<span class="line"><span>选择问题</span></span>
<span class="line"><span>   ↓</span></span>
<span class="line"><span>Fix</span></span>
<span class="line"><span>   ↓</span></span>
<span class="line"><span>Test</span></span>
<span class="line"><span>   ↓</span></span>
<span class="line"><span>Review Again</span></span></code></pre></div><hr><h2 id="_27-review-发现问题以后怎么修" tabindex="-1"><strong>27. Review 发现问题以后怎么修？</strong> <a class="header-anchor" href="#_27-review-发现问题以后怎么修" aria-label="Permalink to “27. Review 发现问题以后怎么修？”">​</a></h2><p>例如 Codex 输出：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>P1</span></span>
<span class="line"><span></span></span>
<span class="line"><span>UserBalanceServiceImpl.java</span></span>
<span class="line"><span></span></span>
<span class="line"><span>freeze() 存在并发超额冻结风险。</span></span></code></pre></div><p>不要直接：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>全部修复。</span></span></code></pre></div><p>可以：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>修复 Review 中的 P1-1。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>要求：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. 使用项目现有乐观锁机制</span></span>
<span class="line"><span>2. 不新增 Redis 锁</span></span>
<span class="line"><span>3. 不修改 API</span></span>
<span class="line"><span>4. 增加并发测试</span></span>
<span class="line"><span></span></span>
<span class="line"><span>完成后运行相关测试。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>不要处理其他 Review 项。</span></span></code></pre></div><p>这样修改范围更可控。</p><hr><h2 id="_28-修复以后再-review-一次" tabindex="-1"><strong>28. 修复以后再 Review 一次</strong> <a class="header-anchor" href="#_28-修复以后再-review-一次" aria-label="Permalink to “28. 修复以后再 Review 一次”">​</a></h2><p>完整闭环应该是：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Review</span></span>
<span class="line"><span>   ↓</span></span>
<span class="line"><span>Find Issue</span></span>
<span class="line"><span>   ↓</span></span>
<span class="line"><span>Fix</span></span>
<span class="line"><span>   ↓</span></span>
<span class="line"><span>Test</span></span>
<span class="line"><span>   ↓</span></span>
<span class="line"><span>Review Again</span></span></code></pre></div><p>因为：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>修 Bug</span></span></code></pre></div><p>本身也可能：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>产生新 Bug</span></span></code></pre></div><p>尤其涉及：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>并发</span></span>
<span class="line"><span>事务</span></span>
<span class="line"><span>数据库</span></span></code></pre></div><p>最好重新检查。</p><hr><h2 id="_29-一个资金业务专项-review-模板" tabindex="-1"><strong>29. 一个资金业务专项 Review 模板</strong> <a class="header-anchor" href="#_29-一个资金业务专项-review-模板" aria-label="Permalink to “29. 一个资金业务专项 Review 模板”">​</a></h2><p>如果项目涉及：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>钱包</span></span>
<span class="line"><span>支付</span></span>
<span class="line"><span>充值</span></span>
<span class="line"><span>提现</span></span>
<span class="line"><span>奖励</span></span>
<span class="line"><span>结算</span></span></code></pre></div><p>可以直接保存下面这套：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Review 当前 Git Diff。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>不要修改代码。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>这是资金相关代码，</span></span>
<span class="line"><span>优先检查正确性和数据一致性，</span></span>
<span class="line"><span>不要优先讨论代码风格。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>重点检查：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. 重复入账</span></span>
<span class="line"><span>2. 重复扣款</span></span>
<span class="line"><span>3. 超额扣款</span></span>
<span class="line"><span>4. 负余额</span></span>
<span class="line"><span>5. BigDecimal 精度</span></span>
<span class="line"><span>6. 事务边界</span></span>
<span class="line"><span>7. 异常回滚</span></span>
<span class="line"><span>8. 并发 read-modify-write</span></span>
<span class="line"><span>9. 幂等</span></span>
<span class="line"><span>10. 数据库唯一约束</span></span>
<span class="line"><span>11. MQ 重复消费</span></span>
<span class="line"><span>12. 定时任务重复执行</span></span>
<span class="line"><span>13. 流水和余额是否一致</span></span>
<span class="line"><span>14. sourceId / businessId 去重</span></span>
<span class="line"><span>15. API 向后兼容</span></span>
<span class="line"><span></span></span>
<span class="line"><span>必要时读取：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>- Service</span></span>
<span class="line"><span>- Mapper</span></span>
<span class="line"><span>- Entity</span></span>
<span class="line"><span>- SQL</span></span>
<span class="line"><span>- 调用方</span></span>
<span class="line"><span>- 测试</span></span>
<span class="line"><span></span></span>
<span class="line"><span>每个问题输出：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>严重程度：</span></span>
<span class="line"><span>文件：</span></span>
<span class="line"><span>位置：</span></span>
<span class="line"><span>问题：</span></span>
<span class="line"><span>触发路径：</span></span>
<span class="line"><span>后果：</span></span>
<span class="line"><span>证据：</span></span>
<span class="line"><span>建议：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>只报告有实际代码依据的问题。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>无法确认时明确标记“需要确认”。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>不要为了输出 Review 内容而猜测问题。</span></span></code></pre></div><hr><h2 id="_30-一个普通-java-项目的-review-模板" tabindex="-1"><strong>30. 一个普通 Java 项目的 Review 模板</strong> <a class="header-anchor" href="#_30-一个普通-java-项目的-review-模板" aria-label="Permalink to “30. 一个普通 Java 项目的 Review 模板”">​</a></h2><p>如果不是资金系统，可以使用更通用的版本：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Review 当前 Git Diff。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>不要修改代码。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>重点检查：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. 逻辑正确性</span></span>
<span class="line"><span>2. null</span></span>
<span class="line"><span>3. 边界条件</span></span>
<span class="line"><span>4. 异常处理</span></span>
<span class="line"><span>5. 资源释放</span></span>
<span class="line"><span>6. 事务</span></span>
<span class="line"><span>7. 并发</span></span>
<span class="line"><span>8. 性能</span></span>
<span class="line"><span>9. SQL</span></span>
<span class="line"><span>10. 安全</span></span>
<span class="line"><span>11. API 兼容</span></span>
<span class="line"><span>12. 测试覆盖</span></span>
<span class="line"><span></span></span>
<span class="line"><span>必要时读取相关上下文。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>只报告明确、可操作的问题。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>不要输出纯个人代码风格偏好。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>按照 P0 / P1 / P2 / P3 排序。</span></span></code></pre></div><hr><h2 id="_31-review-可以拆成多轮" tabindex="-1"><strong>31. Review 可以拆成多轮</strong> <a class="header-anchor" href="#_31-review-可以拆成多轮" aria-label="Permalink to “31. Review 可以拆成多轮”">​</a></h2><p>对于大型 Diff，一次 Review 所有问题可能效果并不好。</p><p>例如：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>50 个文件</span></span>
<span class="line"><span>3000 行修改</span></span></code></pre></div><p>可以拆成：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>第一轮</span></span>
<span class="line"><span>→ Correctness</span></span>
<span class="line"><span></span></span>
<span class="line"><span>第二轮</span></span>
<span class="line"><span>→ Concurrency &amp; Transaction</span></span>
<span class="line"><span></span></span>
<span class="line"><span>第三轮</span></span>
<span class="line"><span>→ Performance</span></span>
<span class="line"><span></span></span>
<span class="line"><span>第四轮</span></span>
<span class="line"><span>→ Compatibility</span></span>
<span class="line"><span></span></span>
<span class="line"><span>第五轮</span></span>
<span class="line"><span>→ Tests</span></span></code></pre></div><p>例如第一轮：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>只检查业务正确性。</span></span></code></pre></div><p>第二轮：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>只检查事务、并发和幂等。</span></span></code></pre></div><p>这种：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>专项 Review</span></span></code></pre></div><p>通常比：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>一次检查所有东西</span></span></code></pre></div><p>更加深入。</p><hr><h2 id="_32-什么情况下值得多轮-review" tabindex="-1"><strong>32. 什么情况下值得多轮 Review？</strong> <a class="header-anchor" href="#_32-什么情况下值得多轮-review" aria-label="Permalink to “32. 什么情况下值得多轮 Review？”">​</a></h2><p>比较适合：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>大型重构</span></span>
<span class="line"><span>支付</span></span>
<span class="line"><span>钱包</span></span>
<span class="line"><span>认证</span></span>
<span class="line"><span>数据库迁移</span></span>
<span class="line"><span>跨模块修改</span></span>
<span class="line"><span>复杂并发</span></span>
<span class="line"><span>高风险线上修复</span></span></code></pre></div><p>简单需求：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>修改一个 DTO</span></span></code></pre></div><p>就没必要：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Review 五轮</span></span></code></pre></div><p>仍然应该按照：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>风险</span></span></code></pre></div><p>决定 Review 深度。</p><hr><h2 id="_33-codex-review-不能替代人工-review" tabindex="-1"><strong>33. Codex Review 不能替代人工 Review</strong> <a class="header-anchor" href="#_33-codex-review-不能替代人工-review" aria-label="Permalink to “33. Codex Review 不能替代人工 Review”">​</a></h2><p>这是必须明确的一点。</p><p>Codex 可以帮助：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>扫描 Diff</span></span>
<span class="line"><span>追踪调用</span></span>
<span class="line"><span>发现模式</span></span>
<span class="line"><span>检查边界</span></span>
<span class="line"><span>寻找潜在风险</span></span></code></pre></div><p>但是它并不知道所有：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>产品规则</span></span>
<span class="line"><span>历史背景</span></span>
<span class="line"><span>线上约束</span></span>
<span class="line"><span>团队决策</span></span>
<span class="line"><span>隐藏业务需求</span></span></code></pre></div><p>例如：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>一个字段看起来完全没用了</span></span></code></pre></div><p>Codex 可能建议删除。</p><p>但你知道：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>旧版 App 仍然依赖</span></span></code></pre></div><p>所以最终责任仍然属于：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Developer</span></span></code></pre></div><hr><h2 id="_34-ai-review-最合理的位置是什么" tabindex="-1"><strong>34. AI Review 最合理的位置是什么？</strong> <a class="header-anchor" href="#_34-ai-review-最合理的位置是什么" aria-label="Permalink to “34. AI Review 最合理的位置是什么？”">​</a></h2><p>不是：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>AI Review</span></span>
<span class="line"><span>替代</span></span>
<span class="line"><span>Human Review</span></span></code></pre></div><p>而是：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Developer</span></span>
<span class="line"><span>   ↓</span></span>
<span class="line"><span>Codex First Review</span></span>
<span class="line"><span>   ↓</span></span>
<span class="line"><span>修复明显问题</span></span>
<span class="line"><span>   ↓</span></span>
<span class="line"><span>Human Review</span></span></code></pre></div><p>可以理解成：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>AI</span></span>
<span class="line"><span>→ 第一层过滤器</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Developer</span></span>
<span class="line"><span>→ 最终决策者</span></span></code></pre></div><p>这样可以减少很多：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>低级错误</span></span>
<span class="line"><span>明显遗漏</span></span>
<span class="line"><span>重复劳动</span></span></code></pre></div><p>把人工精力留给：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>业务</span></span>
<span class="line"><span>架构</span></span>
<span class="line"><span>设计</span></span>
<span class="line"><span>风险判断</span></span></code></pre></div><hr><h2 id="_35-推荐的完整-codex-review-工作流" tabindex="-1"><strong>35. 推荐的完整 Codex Review 工作流</strong> <a class="header-anchor" href="#_35-推荐的完整-codex-review-工作流" aria-label="Permalink to “35. 推荐的完整 Codex Review 工作流”">​</a></h2><p>最终可以固定成：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>① 完成实现</span></span>
<span class="line"><span>      ↓</span></span>
<span class="line"><span>② 运行测试</span></span>
<span class="line"><span>      ↓</span></span>
<span class="line"><span>③ git status</span></span>
<span class="line"><span>      ↓</span></span>
<span class="line"><span>④ git diff</span></span>
<span class="line"><span>      ↓</span></span>
<span class="line"><span>⑤ Codex Review</span></span>
<span class="line"><span>      ↓</span></span>
<span class="line"><span>⑥ 按严重程度检查问题</span></span>
<span class="line"><span>      ↓</span></span>
<span class="line"><span>⑦ 修复确认的问题</span></span>
<span class="line"><span>      ↓</span></span>
<span class="line"><span>⑧ 再次运行测试</span></span>
<span class="line"><span>      ↓</span></span>
<span class="line"><span>⑨ 再次 Review</span></span>
<span class="line"><span>      ↓</span></span>
<span class="line"><span>⑩ Developer Review</span></span>
<span class="line"><span>      ↓</span></span>
<span class="line"><span>⑪ Commit / PR</span></span></code></pre></div><p>如果是高风险代码：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>普通 Review</span></span>
<span class="line"><span>   ↓</span></span>
<span class="line"><span>事务专项 Review</span></span>
<span class="line"><span>   ↓</span></span>
<span class="line"><span>并发专项 Review</span></span>
<span class="line"><span>   ↓</span></span>
<span class="line"><span>幂等专项 Review</span></span>
<span class="line"><span>   ↓</span></span>
<span class="line"><span>兼容性 Review</span></span></code></pre></div><hr><h2 id="_36-最后怎么理解-codex-code-review" tabindex="-1"><strong>36. 最后怎么理解 Codex Code Review？</strong> <a class="header-anchor" href="#_36-最后怎么理解-codex-code-review" aria-label="Permalink to “36. 最后怎么理解 Codex Code Review？”">​</a></h2><p>如果只记一句话：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>不要让 Codex 只评价代码写得好不好。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>要让它寻找：</span></span>
<span class="line"><span>什么情况下这段代码会出错。</span></span></code></pre></div><p>一个好的 Review 不是：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>建议优化方法命名。</span></span></code></pre></div><p>而是能够告诉你：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>当两个提现请求同时到达时：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>A 和 B 都读取 balance = 100</span></span>
<span class="line"><span></span></span>
<span class="line"><span>A 判断余额足够</span></span>
<span class="line"><span>B 也判断余额足够</span></span>
<span class="line"><span></span></span>
<span class="line"><span>然后两个请求都执行扣减</span></span>
<span class="line"><span></span></span>
<span class="line"><span>当前实现没有乐观锁、</span></span>
<span class="line"><span>条件 UPDATE 或其他并发保护</span></span>
<span class="line"><span></span></span>
<span class="line"><span>因此可能产生重复扣款或余额错误。</span></span></code></pre></div><p>这才是真正有价值的：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Code Review</span></span></code></pre></div><p>最终可以把整个 Codex 开发流程串起来：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>AGENTS.md</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>Prompt</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>Explore</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>Plan</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>Implement</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>Test</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>Review</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>Developer Review</span></span></code></pre></div><p>其中 Review 解决的是：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>代码已经写出来以后，</span></span>
<span class="line"><span>还有哪些问题没有被测试发现？</span></span></code></pre></div><p>当 Codex 不再只是：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>帮你写代码</span></span></code></pre></div><p>而开始参与：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>理解需求</span></span>
<span class="line"><span>设计方案</span></span>
<span class="line"><span>实现代码</span></span>
<span class="line"><span>执行测试</span></span>
<span class="line"><span>检查 Diff</span></span>
<span class="line"><span>Code Review</span></span></code></pre></div><p>它才真正从一个：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>AI 代码生成器</span></span></code></pre></div><p>变成：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>参与软件工程全过程的 Coding Agent</span></span></code></pre></div>`,455)]])}var s=r(a,[[`render`,o]]);export{i as __pageData,s as default};