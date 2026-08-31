import{At as e,Mt as t,Qt as n,lt as r}from"./chunks/framework.DwOUwJQP.js";var i=JSON.parse(`{"title":"AGENTS.md 完全指南：如何让 Codex 真正理解你的项目","description":"系统介绍 Codex 中 AGENTS.md 的作用、目录层级、编写原则和实际项目配置方式，并通过 Java Spring Boot、前后端 Monorepo 等示例讲解如何为 Coding Agent 建立稳定、可维护的项目规则。","frontmatter":{"title":"AGENTS.md 完全指南：如何让 Codex 真正理解你的项目","date":"2026-08-30 15:45","tags":["AI","Codex","OpenAI"],"description":"系统介绍 Codex 中 AGENTS.md 的作用、目录层级、编写原则和实际项目配置方式，并通过 Java Spring Boot、前后端 Monorepo 等示例讲解如何为 Coding Agent 建立稳定、可维护的项目规则。"},"headers":[],"relativePath":"blogs/ai/codex/3.AGENTS.md完全指南.md","filePath":"blogs/ai/codex/3.AGENTS.md完全指南.md","lastUpdated":1788090369000}`),a={name:`blogs/ai/codex/3.AGENTS.md完全指南.md`};function o(r,i,a,o,s,c){return n(),e(`div`,null,[...i[0]||=[t(`<h1 id="agents-md-完全指南-如何让-codex-真正理解你的项目" tabindex="-1"><strong>AGENTS.md 完全指南：如何让 Codex 真正理解你的项目</strong> <a class="header-anchor" href="#agents-md-完全指南-如何让-codex-真正理解你的项目" aria-label="Permalink to “AGENTS.md 完全指南：如何让 Codex 真正理解你的项目”">​</a></h1><p>前两篇我们分别介绍了：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>第一篇</span></span>
<span class="line"><span>→ Codex CLI 是什么、怎么使用</span></span>
<span class="line"><span></span></span>
<span class="line"><span>第二篇</span></span>
<span class="line"><span>→ Codex CLI 常用命令和基本工作流</span></span></code></pre></div><p>当真正开始把 Codex 用到日常项目以后，会遇到一个非常现实的问题：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>每开一个新 Session，</span></span>
<span class="line"><span>难道都要重新告诉 Codex：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>我们用 Java 17</span></span>
<span class="line"><span>我们用 Spring Boot</span></span>
<span class="line"><span>金额必须使用 BigDecimal</span></span>
<span class="line"><span>Controller 不能返回 Entity</span></span>
<span class="line"><span>不要执行 git push</span></span>
<span class="line"><span>修改完成必须运行测试</span></span>
<span class="line"><span>……</span></span></code></pre></div><p>显然不应该。</p><p>这就是：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>AGENTS.md</span></span></code></pre></div><p>存在的意义。</p><p>可以先记住一句话：</p><blockquote><p><code>AGENTS.md</code> 是写给 Coding Agent 的项目开发说明。</p></blockquote><p>如果：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>README.md</span></span>
<span class="line"><span>→ 告诉开发者这个项目是什么</span></span></code></pre></div><p>那么：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>AGENTS.md</span></span>
<span class="line"><span>→ 告诉 Agent 在这个项目里应该怎么工作</span></span></code></pre></div><p>一个维护良好的 <code>AGENTS.md</code>，可以显著减少重复 Prompt，让 Codex 更快理解项目结构、开发规范、测试方式和安全边界。</p><p>这一篇就专门讲清楚：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>AGENTS.md 应该写什么？</span></span>
<span class="line"><span>不应该写什么？</span></span>
<span class="line"><span>放在哪里？</span></span>
<span class="line"><span>多模块项目怎么组织？</span></span>
<span class="line"><span>哪些规则最值得写进去？</span></span></code></pre></div><hr><h2 id="_1-为什么需要-agents-md" tabindex="-1"><strong>1. 为什么需要 AGENTS.md？</strong> <a class="header-anchor" href="#_1-为什么需要-agents-md" aria-label="Permalink to “1. 为什么需要 AGENTS.md？”">​</a></h2><p>假设现在有一个 Spring Boot 项目：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>xxx-server</span></span>
<span class="line"><span>├── xxx-api</span></span>
<span class="line"><span>├── xxx-business</span></span>
<span class="line"><span>├── xxx-common</span></span>
<span class="line"><span>├── xxx-framework</span></span>
<span class="line"><span>├── pom.xml</span></span>
<span class="line"><span>└── README.md</span></span></code></pre></div><p>你第一次让 Codex 修改代码：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>增加用户余额查询接口。</span></span></code></pre></div><p>Codex 可以自己阅读项目，然后推断：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Controller 在哪里</span></span>
<span class="line"><span>Service 在哪里</span></span>
<span class="line"><span>Mapper 在哪里</span></span>
<span class="line"><span>项目使用什么 ORM</span></span>
<span class="line"><span>返回值大概是什么格式</span></span></code></pre></div><p>但是很多项目规则，并不能仅仅通过代码可靠推断出来。</p><p>例如：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>金额必须使用 BigDecimal</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Controller 禁止直接返回 Entity</span></span>
<span class="line"><span></span></span>
<span class="line"><span>所有接口统一返回 AjaxResult</span></span>
<span class="line"><span></span></span>
<span class="line"><span>数据库字段不能直接删除</span></span>
<span class="line"><span></span></span>
<span class="line"><span>修改表结构必须提供 migration SQL</span></span>
<span class="line"><span></span></span>
<span class="line"><span>生产配置禁止修改</span></span>
<span class="line"><span></span></span>
<span class="line"><span>未经允许不能 git push</span></span>
<span class="line"><span></span></span>
<span class="line"><span>修改完成必须运行 Maven 测试</span></span></code></pre></div><p>这些规则通常存在于：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>团队经验</span></span>
<span class="line"><span>开发规范</span></span>
<span class="line"><span>口头约定</span></span>
<span class="line"><span>历史事故</span></span>
<span class="line"><span>业务约束</span></span></code></pre></div><p>而不是某一个 Java 文件里。</p><p>如果没有明确告诉 Agent，它只能：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>猜</span></span></code></pre></div><p>而 Coding Agent 最危险的情况之一就是：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>代码写得没问题</span></span>
<span class="line"><span>但不符合你的项目规则</span></span></code></pre></div><p>所以需要一个固定位置，把这些规则告诉它。</p><p>这就是：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>AGENTS.md</span></span></code></pre></div><hr><h2 id="_2-agents-md-可以理解成什么" tabindex="-1"><strong>2. AGENTS.md 可以理解成什么？</strong> <a class="header-anchor" href="#_2-agents-md-可以理解成什么" aria-label="Permalink to “2. AGENTS.md 可以理解成什么？”">​</a></h2><p>可以把一个项目想象成公司。</p><p>开发者入职以后，一般需要知道：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>技术栈是什么</span></span>
<span class="line"><span>目录怎么组织</span></span>
<span class="line"><span>代码规范是什么</span></span>
<span class="line"><span>怎么运行项目</span></span>
<span class="line"><span>怎么执行测试</span></span>
<span class="line"><span>哪些事情不能做</span></span>
<span class="line"><span>提交代码有什么要求</span></span></code></pre></div><p>Coding Agent 进入项目其实也一样。</p><p>所以：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>AGENTS.md</span></span></code></pre></div><p>很像：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Coding Agent 入职手册</span></span></code></pre></div><p>它不是用来解释所有业务代码。</p><p>而是告诉 Agent：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>你进入这个项目以后，</span></span>
<span class="line"><span>应该遵守哪些长期稳定的规则。</span></span></code></pre></div><hr><h2 id="_3-readme-md-和-agents-md-有什么区别" tabindex="-1"><strong>3. README.md 和 AGENTS.md 有什么区别？</strong> <a class="header-anchor" href="#_3-readme-md-和-agents-md-有什么区别" aria-label="Permalink to “3. README.md 和 AGENTS.md 有什么区别？”">​</a></h2><p>这是最常见的问题。</p><p>README 通常写：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>项目介绍</span></span>
<span class="line"><span>功能说明</span></span>
<span class="line"><span>安装方式</span></span>
<span class="line"><span>启动方法</span></span>
<span class="line"><span>部署方式</span></span>
<span class="line"><span>API 文档入口</span></span></code></pre></div><p>例如：</p><div class="language-markdown"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;"># xxx-server</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">用户中心服务。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## Start</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">mvn spring-boot:run</span></span></code></pre></div><p>这些内容主要是：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>给人看</span></span></code></pre></div><p>而 <code>AGENTS.md</code> 更关注：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Agent 修改代码时应该怎么做</span></span></code></pre></div><p>例如：</p><div class="language-markdown"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;"># Project Instructions</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## Coding Rules</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Java 使用 17</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 金额统一使用 BigDecimal</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Controller 不允许直接返回 Entity</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ServiceImpl 放在 service.impl</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## Safety</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 不允许执行 git push</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 不允许修改生产配置</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 不允许连接生产数据库</span></span></code></pre></div><p>可以简单记：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>README.md</span></span>
<span class="line"><span>→ 项目使用说明</span></span>
<span class="line"><span></span></span>
<span class="line"><span>AGENTS.md</span></span>
<span class="line"><span>→ Agent 工作说明</span></span></code></pre></div><p>两者可以有部分重复，但目标不同。</p><hr><h2 id="_4-agents-md-应该放在哪里" tabindex="-1"><strong>4. AGENTS.md 应该放在哪里？</strong> <a class="header-anchor" href="#_4-agents-md-应该放在哪里" aria-label="Permalink to “4. AGENTS.md 应该放在哪里？”">​</a></h2><p>最常见的方式是放在项目根目录：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>xxx-server/</span></span>
<span class="line"><span>├── AGENTS.md</span></span>
<span class="line"><span>├── pom.xml</span></span>
<span class="line"><span>├── README.md</span></span>
<span class="line"><span>├── xxx-api/</span></span>
<span class="line"><span>├── xxx-business/</span></span>
<span class="line"><span>└── xxx-common/</span></span></code></pre></div><p>这样它可以描述整个 Repository 的通用规则。</p><p>例如：</p><div class="language-markdown"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;"># Project Instructions</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## Technology</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Java 17</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Spring Boot</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Maven</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> MyBatis-Plus</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> MySQL</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Redis</span></span></code></pre></div><p>这种规则通常对整个项目都有效。</p><hr><h2 id="_5-怎么确认-codex-识别到了-agents-md" tabindex="-1"><strong>5. 怎么确认 Codex 识别到了 AGENTS.md？</strong> <a class="header-anchor" href="#_5-怎么确认-codex-识别到了-agents-md" aria-label="Permalink to “5. 怎么确认 Codex 识别到了 AGENTS.md？”">​</a></h2><p>进入项目：</p><div class="language-bash"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cd</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> xxx-server</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">codex</span></span></code></pre></div><p>然后：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>/status</span></span></code></pre></div><p>如果当前版本会在状态中展示 Agent 指令信息，可以检查类似：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Agents.md: AGENTS.md</span></span></code></pre></div><p>如果看到：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Agents.md: &lt;none&gt;</span></span></code></pre></div><p>就需要检查：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>① 当前 Directory 是否正确</span></span>
<span class="line"><span>② AGENTS.md 是否放在项目目录</span></span>
<span class="line"><span>③ 文件名是否正确</span></span>
<span class="line"><span>④ 当前 Codex 版本如何展示项目指令</span></span></code></pre></div><p>所以使用 Codex 时，一个很好的习惯是：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>cd project</span></span>
<span class="line"><span>   ↓</span></span>
<span class="line"><span>codex</span></span>
<span class="line"><span>   ↓</span></span>
<span class="line"><span>/status</span></span>
<span class="line"><span>   ↓</span></span>
<span class="line"><span>确认 Directory</span></span>
<span class="line"><span>   ↓</span></span>
<span class="line"><span>确认 AGENTS.md</span></span></code></pre></div><hr><h2 id="_6-可以使用-init-生成-agents-md" tabindex="-1"><strong>6. 可以使用 <code>/init</code> 生成 AGENTS.md</strong> <a class="header-anchor" href="#_6-可以使用-init-生成-agents-md" aria-label="Permalink to “6. 可以使用 /init 生成 AGENTS.md”">​</a></h2><p>如果项目里还没有：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>AGENTS.md</span></span></code></pre></div><p>可以使用 Codex 当前版本提供的初始化能力。</p><p>例如：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>/init</span></span></code></pre></div><p>它可以帮助分析当前 Repository，并生成一份初始的项目说明。</p><p>这个功能很适合：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>第一次给老项目接入 Codex</span></span></code></pre></div><p>因为 Codex 可以从现有代码中识别很多信息：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Java / Node.js / Python</span></span>
<span class="line"><span>Maven / Gradle / npm</span></span>
<span class="line"><span>Spring Boot</span></span>
<span class="line"><span>测试框架</span></span>
<span class="line"><span>目录结构</span></span>
<span class="line"><span>代码风格</span></span></code></pre></div><p>但是需要特别注意：</p><blockquote><p><code>/init</code> 生成的内容更适合作为草稿，而不是最终版本。</p></blockquote><hr><h2 id="_7-为什么不能完全依赖-init" tabindex="-1"><strong>7. 为什么不能完全依赖 <code>/init</code>？</strong> <a class="header-anchor" href="#_7-为什么不能完全依赖-init" aria-label="Permalink to “7. 为什么不能完全依赖 /init？”">​</a></h2><p>因为有些信息可以从代码中发现：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Java 17</span></span>
<span class="line"><span>Spring Boot</span></span>
<span class="line"><span>MyBatis-Plus</span></span>
<span class="line"><span>Maven</span></span>
<span class="line"><span>JUnit</span></span></code></pre></div><p>但有些规则只有团队自己知道：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>旧 App 仍然依赖这个接口</span></span>
<span class="line"><span></span></span>
<span class="line"><span>这张表历史原因不能直接修改</span></span>
<span class="line"><span></span></span>
<span class="line"><span>这个字段虽然没使用但不能删除</span></span>
<span class="line"><span></span></span>
<span class="line"><span>生产环境配置禁止修改</span></span>
<span class="line"><span></span></span>
<span class="line"><span>某个 MQ Consumer 必须保证幂等</span></span>
<span class="line"><span></span></span>
<span class="line"><span>金额计算必须保留 8 位</span></span>
<span class="line"><span></span></span>
<span class="line"><span>数据库变更必须向后兼容</span></span></code></pre></div><p>Codex 很难仅通过代码准确知道这些规则。</p><p>所以正确流程应该是：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>/init</span></span>
<span class="line"><span>   ↓</span></span>
<span class="line"><span>生成初始 AGENTS.md</span></span>
<span class="line"><span>   ↓</span></span>
<span class="line"><span>开发者 Review</span></span>
<span class="line"><span>   ↓</span></span>
<span class="line"><span>补充业务规则</span></span>
<span class="line"><span>   ↓</span></span>
<span class="line"><span>补充安全规则</span></span>
<span class="line"><span>   ↓</span></span>
<span class="line"><span>补充测试规则</span></span>
<span class="line"><span>   ↓</span></span>
<span class="line"><span>长期维护</span></span></code></pre></div><hr><h2 id="_8-agents-md-最应该写什么" tabindex="-1"><strong>8. AGENTS.md 最应该写什么？</strong> <a class="header-anchor" href="#_8-agents-md-最应该写什么" aria-label="Permalink to “8. AGENTS.md 最应该写什么？”">​</a></h2><p>一个比较实用的 <code>AGENTS.md</code>，通常可以分成几类：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Project</span></span>
<span class="line"><span>Technology</span></span>
<span class="line"><span>Architecture</span></span>
<span class="line"><span>Coding Style</span></span>
<span class="line"><span>Database</span></span>
<span class="line"><span>Testing</span></span>
<span class="line"><span>Git</span></span>
<span class="line"><span>Safety</span></span>
<span class="line"><span>Business Rules</span></span></code></pre></div><p>可以理解成：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>AGENTS.md</span></span>
<span class="line"><span>│</span></span>
<span class="line"><span>├── 项目背景</span></span>
<span class="line"><span>├── 技术栈</span></span>
<span class="line"><span>├── 架构规则</span></span>
<span class="line"><span>├── 编码规范</span></span>
<span class="line"><span>├── 数据库规范</span></span>
<span class="line"><span>├── 测试规范</span></span>
<span class="line"><span>├── Git 规范</span></span>
<span class="line"><span>├── 安全边界</span></span>
<span class="line"><span>└── 关键业务规则</span></span></code></pre></div><p>不一定每个项目都需要全部写。</p><p>应该根据项目实际情况调整。</p><hr><h2 id="_9-project-先告诉-agent-这是什么项目" tabindex="-1"><strong>9. Project：先告诉 Agent 这是什么项目</strong> <a class="header-anchor" href="#_9-project-先告诉-agent-这是什么项目" aria-label="Permalink to “9. Project：先告诉 Agent 这是什么项目”">​</a></h2><p>开头可以非常简单：</p><div class="language-markdown"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;"># Project Instructions</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">This repository is a Spring Boot backend service.</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Main business modules:</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> user</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> wallet</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> payment</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> order</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> notification</span></span></code></pre></div><p>或者中文：</p><div class="language-markdown"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;"># 项目说明</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">这是一个 Spring Boot 后端项目。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">主要业务模块：</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 用户</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 钱包</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 支付</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 订单</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 消息通知</span></span></code></pre></div><p>目的不是写产品介绍。</p><p>而是帮助 Agent 快速建立：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Repository Mental Model</span></span></code></pre></div><p>也就是：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>这个仓库大概是干什么的？</span></span></code></pre></div><hr><h2 id="_10-technology-明确技术栈" tabindex="-1"><strong>10. Technology：明确技术栈</strong> <a class="header-anchor" href="#_10-technology-明确技术栈" aria-label="Permalink to “10. Technology：明确技术栈”">​</a></h2><p>这是最适合写入 <code>AGENTS.md</code> 的内容之一。</p><p>例如：</p><div class="language-markdown"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## Technology</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Java 17</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Spring Boot</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Maven</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> MyBatis-Plus</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> MySQL</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Redis</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> RabbitMQ</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> JUnit 5</span></span></code></pre></div><p>为什么需要写？</p><p>因为 Agent 在实现功能时会根据技术栈做选择。</p><p>例如缓存：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Redis</span></span></code></pre></div><p>消息：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>RabbitMQ</span></span></code></pre></div><p>ORM：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>MyBatis-Plus</span></span></code></pre></div><p>如果没有明确说明，Agent 可能：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>引入不需要的新框架</span></span>
<span class="line"><span>使用项目没有采用的技术</span></span>
<span class="line"><span>按照另一套技术习惯生成代码</span></span></code></pre></div><hr><h2 id="_11-architecture-告诉-agent-项目怎么分层" tabindex="-1"><strong>11. Architecture：告诉 Agent 项目怎么分层</strong> <a class="header-anchor" href="#_11-architecture-告诉-agent-项目怎么分层" aria-label="Permalink to “11. Architecture：告诉 Agent 项目怎么分层”">​</a></h2><p>对于 Java 项目尤其重要。</p><p>例如：</p><div class="language-markdown"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## Architecture</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">项目采用：</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Controller</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">→ Service</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">→ Mapper</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">→ Database</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">规则：</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Controller 只负责参数校验和调用 Service</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 业务逻辑必须放在 Service</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Mapper 只负责数据库访问</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Controller 不允许直接调用 Mapper</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Entity 不允许直接返回给客户端</span></span></code></pre></div><p>这样 Codex 在增加接口时，就更容易生成符合项目结构的代码。</p><p>否则它可能直接：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Controller</span></span>
<span class="line"><span>   ↓</span></span>
<span class="line"><span>Mapper</span></span></code></pre></div><p>虽然能运行，但破坏了项目分层。</p><hr><h2 id="_12-coding-style-把长期代码规范写进去" tabindex="-1"><strong>12. Coding Style：把长期代码规范写进去</strong> <a class="header-anchor" href="#_12-coding-style-把长期代码规范写进去" aria-label="Permalink to “12. Coding Style：把长期代码规范写进去”">​</a></h2><p>例如：</p><div class="language-markdown"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## Coding Style</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 使用 Java 17</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 优先使用构造器注入</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 金额统一使用 BigDecimal</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 时间统一使用 LocalDateTime</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 不新增 Lombok @Data</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Service 实现类统一放在 service.impl</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Controller 统一返回 AjaxResult</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Entity 不直接暴露给 API</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 新增公共方法必须有清晰命名</span></span></code></pre></div><p>这类规则特别适合：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>AGENTS.md</span></span></code></pre></div><p>因为它们：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>长期稳定</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>大量任务都会用到</span></span></code></pre></div><p>如果每个 Prompt 都重新说一次，会非常浪费。</p><hr><h2 id="_13-database-数据库规则一定要写清楚" tabindex="-1"><strong>13. Database：数据库规则一定要写清楚</strong> <a class="header-anchor" href="#_13-database-数据库规则一定要写清楚" aria-label="Permalink to “13. Database：数据库规则一定要写清楚”">​</a></h2><p>数据库属于 Coding Agent 修改项目时风险较高的区域。</p><p>例如：</p><div class="language-markdown"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## Database</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 数据库使用 MySQL</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ORM 使用 MyBatis-Plus</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 金额字段 Java 类型统一使用 BigDecimal</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 修改数据库结构必须提供 migration SQL</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 不允许直接删除已有字段</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 不允许修改历史 migration</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 新增索引前先检查是否已有相同或等价索引</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 数据库修改必须考虑向后兼容</span></span></code></pre></div><p>如果项目对生产数据非常敏感，还可以加入：</p><div class="language-markdown"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 不允许连接生产数据库</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 不允许执行 DROP TABLE</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 不允许执行 TRUNCATE</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 不允许在未经确认的情况下批量 UPDATE / DELETE</span></span></code></pre></div><p>这样能明显减少高风险操作。</p><hr><h2 id="_14-testing-告诉-codex-怎么验证修改" tabindex="-1"><strong>14. Testing：告诉 Codex 怎么验证修改</strong> <a class="header-anchor" href="#_14-testing-告诉-codex-怎么验证修改" aria-label="Permalink to “14. Testing：告诉 Codex 怎么验证修改”">​</a></h2><p>Coding Agent 最大的优势之一是：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>不仅写代码</span></span>
<span class="line"><span>还可以自己验证</span></span></code></pre></div><p>所以一定要告诉它：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>测试应该怎么跑</span></span></code></pre></div><p>例如：</p><div class="language-markdown"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## Testing</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">修改 Java 代码后优先执行：</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">\`\`\`bash</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">mvn</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> test</span></span></code></pre></div><p>如果只修改单模块：</p><div class="language-bash"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">mvn</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -pl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> module-name</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> test</span></span></code></pre></div><p>提交结果前：</p><ol><li>确认项目可以编译</li><li>运行相关单元测试</li><li>检查 git diff</li></ol><div class="language-"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span></span></span>
<span class="line"><span>如果项目测试非常慢，也可以写：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>\`\`\`markdown</span></span>
<span class="line"><span>- 不要默认执行所有集成测试</span></span>
<span class="line"><span>- 优先运行与修改模块相关的测试</span></span>
<span class="line"><span>- 如果完整测试预计耗时较长，先运行目标模块测试</span></span></code></pre></div><p>这样 Agent 的行为会更加符合项目实际情况。</p><hr><h2 id="_15-git-告诉-agent-哪些-git-操作可以做" tabindex="-1"><strong>15. Git：告诉 Agent 哪些 Git 操作可以做</strong> <a class="header-anchor" href="#_15-git-告诉-agent-哪些-git-操作可以做" aria-label="Permalink to “15. Git：告诉 Agent 哪些 Git 操作可以做”">​</a></h2><p>Codex 很适合使用：</p><div class="language-bash"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> status</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> diff</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> log</span></span></code></pre></div><p>这些命令帮助理解项目和检查修改。</p><p>但一些 Git 命令风险明显更高。</p><p>因此可以明确：</p><div class="language-markdown"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## Git</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">允许：</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> git status</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> git diff</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> git log</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> git show</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">未经明确授权禁止：</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> git commit</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> git push</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> git reset --hard</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> git clean -fd</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> git rebase</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 强制修改远程分支</span></span></code></pre></div><p>这里的核心原则是：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>读取型 Git 操作</span></span>
<span class="line"><span>→ 通常可以</span></span>
<span class="line"><span></span></span>
<span class="line"><span>破坏性 / 外部写入操作</span></span>
<span class="line"><span>→ 明确限制</span></span></code></pre></div><hr><h2 id="_16-safety-建议每个生产项目都写" tabindex="-1"><strong>16. Safety：建议每个生产项目都写</strong> <a class="header-anchor" href="#_16-safety-建议每个生产项目都写" aria-label="Permalink to “16. Safety：建议每个生产项目都写”">​</a></h2><p>例如：</p><div class="language-markdown"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## Safety</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">未经明确授权：</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 不允许访问生产数据库</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 不允许修改生产环境配置</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 不允许执行 kubectl apply</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 不允许执行 kubectl delete</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 不允许部署服务</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 不允许调用生产环境写接口</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 不允许执行 git push</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 不允许删除文件或目录</span></span></code></pre></div><p>这一部分可以理解成：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Agent Guardrails</span></span></code></pre></div><p>也就是：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Agent 的护栏</span></span></code></pre></div><p>权限系统负责：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Codex 技术上能不能做</span></span></code></pre></div><p>而 <code>AGENTS.md</code> 负责：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>这个项目里应该不应该做</span></span></code></pre></div><p>两者不是完全一样的东西。</p><hr><h2 id="_17-business-rules-真正有价值的部分" tabindex="-1"><strong>17. Business Rules：真正有价值的部分</strong> <a class="header-anchor" href="#_17-business-rules-真正有价值的部分" aria-label="Permalink to “17. Business Rules：真正有价值的部分”">​</a></h2><p>技术栈其实 Codex 很容易从代码里识别。</p><p>真正能提高 Agent 质量的，往往是：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>业务规则</span></span></code></pre></div><p>例如钱包项目：</p><div class="language-markdown"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## Wallet Business Rules</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 所有余额变更必须生成 wallet_transaction</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 余额扣减必须保证幂等</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> amount 必须使用 BigDecimal</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 禁止使用 double 计算金额</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 提现扣款和提现订单创建必须保证事务一致性</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 重复 sourceId 不允许重复入账</span></span></code></pre></div><p>支付项目：</p><div class="language-markdown"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## Payment Business Rules</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> paymentNo 是支付业务唯一标识</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 回调接口必须支持重复通知</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 支付成功状态不可回退</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 第三方回调必须先验签</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 金额比较必须使用 BigDecimal.compareTo</span></span></code></pre></div><p>这种规则非常有价值。</p><p>因为 Agent 单纯读代码，可能只能看到：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>现在是怎么实现的</span></span></code></pre></div><p>而业务规则告诉它：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>必须保证什么</span></span></code></pre></div><p>这两者完全不同。</p><hr><h2 id="_18-一个-spring-boot-项目的完整示例" tabindex="-1"><strong>18. 一个 Spring Boot 项目的完整示例</strong> <a class="header-anchor" href="#_18-一个-spring-boot-项目的完整示例" aria-label="Permalink to “18. 一个 Spring Boot 项目的完整示例”">​</a></h2><p>下面给一个比较实用的版本。</p><div class="language-markdown"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;"># Project Instructions</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## Project</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">这是一个 Java Spring Boot 后端项目。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">主要模块：</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> user</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> wallet</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> payment</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> order</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## Technology</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Java 17</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Spring Boot</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Maven</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> MyBatis-Plus</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> MySQL</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Redis</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> RabbitMQ</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> JUnit 5</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## Architecture</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">项目采用：</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Controller</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">→ Service</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">→ Mapper</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">→ Database</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">规则：</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Controller 只处理 API 层逻辑</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 业务逻辑放在 Service</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Controller 不直接调用 Mapper</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Entity 不直接返回给客户端</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> DTO / VO 根据现有项目风格定义</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## Coding Style</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 金额统一使用 BigDecimal</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 禁止使用 double 处理金额</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 时间优先使用 LocalDateTime</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 不新增 Lombok @Data</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 保持现有包结构</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 不进行与当前任务无关的重构</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## Database</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ORM 使用 MyBatis-Plus</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 修改表结构必须提供 migration SQL</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 不修改历史 migration</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 不直接删除已有字段</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 数据库变更必须考虑向后兼容</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## Testing</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">修改完成后：</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">1.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 编译相关模块</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">2.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 运行相关单元测试</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">3.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 检查 git diff</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">优先：</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">\`\`\`bash</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">mvn</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> test</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">\`\`\`</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">单模块：</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">\`\`\`bash</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">mvn</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -pl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> module-name</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> test</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">\`\`\`</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## Git</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">允许：</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> git status</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> git diff</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> git log</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> git show</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">未经明确授权禁止：</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> git commit</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> git push</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> git reset --hard</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> git clean -fd</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## Safety</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">未经明确授权：</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 不访问生产数据库</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 不修改生产配置</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 不执行生产部署</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 不执行 kubectl 修改命令</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 不调用生产写接口</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## Wallet Rules</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 所有余额变化必须记录流水</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 余额操作必须考虑幂等</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> sourceId 用于业务去重</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 金额必须使用 BigDecimal</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 不允许出现负余额</span></span></code></pre></div><p>这个版本已经可以覆盖很多真实项目。</p><hr><h2 id="_19-agents-md-是不是越长越好" tabindex="-1"><strong>19. AGENTS.md 是不是越长越好？</strong> <a class="header-anchor" href="#_19-agents-md-是不是越长越好" aria-label="Permalink to “19. AGENTS.md 是不是越长越好？”">​</a></h2><p>不是。</p><p>这是非常重要的一点。</p><p>很多人发现 <code>AGENTS.md</code> 有用以后，会开始疯狂往里面加东西：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>数据库所有表结构</span></span>
<span class="line"><span>所有 API</span></span>
<span class="line"><span>所有业务流程</span></span>
<span class="line"><span>所有类说明</span></span>
<span class="line"><span>所有历史 Bug</span></span>
<span class="line"><span>所有部署命令</span></span>
<span class="line"><span>所有需求文档</span></span></code></pre></div><p>最后变成：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>几万行 AGENTS.md</span></span></code></pre></div><p>这通常不是好事情。</p><p>因为 Agent 真正需要的是：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>高价值</span></span>
<span class="line"><span>稳定</span></span>
<span class="line"><span>长期有效</span></span>
<span class="line"><span>与开发行为直接相关</span></span></code></pre></div><p>的信息。</p><p>不是把整个项目文档全部塞进去。</p><hr><h2 id="_20-什么内容不建议写进-agents-md" tabindex="-1"><strong>20. 什么内容不建议写进 AGENTS.md？</strong> <a class="header-anchor" href="#_20-什么内容不建议写进-agents-md" aria-label="Permalink to “20. 什么内容不建议写进 AGENTS.md？”">​</a></h2><p>例如：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>今天临时修改某个接口</span></span>
<span class="line"><span>某个一次性需求</span></span>
<span class="line"><span>当前 Sprint 的任务</span></span>
<span class="line"><span>某个临时 Bug</span></span>
<span class="line"><span>某次线上事故日志</span></span>
<span class="line"><span>完整数据库 DDL</span></span>
<span class="line"><span>几十页 API 文档</span></span>
<span class="line"><span>大量可以直接从代码发现的信息</span></span></code></pre></div><p>这些内容要么：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>很快过期</span></span></code></pre></div><p>要么：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Codex 自己可以读取</span></span></code></pre></div><p>所以没有必要全部放进去。</p><hr><h2 id="_21-判断一条规则该不该写进去" tabindex="-1"><strong>21. 判断一条规则该不该写进去</strong> <a class="header-anchor" href="#_21-判断一条规则该不该写进去" aria-label="Permalink to “21. 判断一条规则该不该写进去”">​</a></h2><p>可以问自己三个问题：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>① 这条规则未来还会用到吗？</span></span>
<span class="line"><span></span></span>
<span class="line"><span>② Codex 能不能轻易从代码里知道？</span></span>
<span class="line"><span></span></span>
<span class="line"><span>③ 如果 Codex 不知道，会不会容易做错？</span></span></code></pre></div><p>例如：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>项目使用 Java 17</span></span></code></pre></div><p>长期有效：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>是</span></span></code></pre></div><p>容易从代码发现：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>是</span></span></code></pre></div><p>但写进去成本很低，所以可以保留。</p><p>再例如：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>余额变更必须生成流水</span></span></code></pre></div><p>长期有效：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>是</span></span></code></pre></div><p>Codex 能否可靠推断：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>不一定</span></span></code></pre></div><p>不知道是否容易出问题：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>非常容易</span></span></code></pre></div><p>这种就非常值得写。</p><hr><h2 id="_22-推荐优先写-不能做错-的规则" tabindex="-1"><strong>22. 推荐优先写“不能做错”的规则</strong> <a class="header-anchor" href="#_22-推荐优先写-不能做错-的规则" aria-label="Permalink to “22. 推荐优先写“不能做错”的规则”">​</a></h2><p>如果 <code>AGENTS.md</code> 不想写得太长，可以优先写：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>违反以后代价最大的规则</span></span></code></pre></div><p>例如：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>金额不能使用 double</span></span>
<span class="line"><span></span></span>
<span class="line"><span>不能访问生产数据库</span></span>
<span class="line"><span></span></span>
<span class="line"><span>不能直接删除数据库字段</span></span>
<span class="line"><span></span></span>
<span class="line"><span>支付回调必须幂等</span></span>
<span class="line"><span></span></span>
<span class="line"><span>余额变更必须记录流水</span></span>
<span class="line"><span></span></span>
<span class="line"><span>不能 git push</span></span>
<span class="line"><span></span></span>
<span class="line"><span>不能破坏现有 API</span></span></code></pre></div><p>这类规则比：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>变量名最好简洁</span></span></code></pre></div><p>重要得多。</p><p>所以：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>AGENTS.md</span></span></code></pre></div><p>不是普通的：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>代码 Style Guide</span></span></code></pre></div><p>它更应该优先表达：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>关键约束</span></span></code></pre></div><hr><h2 id="_23-monorepo-怎么写-agents-md" tabindex="-1"><strong>23. Monorepo 怎么写 AGENTS.md？</strong> <a class="header-anchor" href="#_23-monorepo-怎么写-agents-md" aria-label="Permalink to “23. Monorepo 怎么写 AGENTS.md？”">​</a></h2><p>假设项目是：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>project/</span></span>
<span class="line"><span>├── AGENTS.md</span></span>
<span class="line"><span>├── backend/</span></span>
<span class="line"><span>│   ├── pom.xml</span></span>
<span class="line"><span>│   └── src/</span></span>
<span class="line"><span>├── admin-web/</span></span>
<span class="line"><span>│   ├── package.json</span></span>
<span class="line"><span>│   └── src/</span></span>
<span class="line"><span>└── app/</span></span>
<span class="line"><span>    └── src/</span></span></code></pre></div><p>三个模块技术栈完全不同：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>backend</span></span>
<span class="line"><span>→ Java</span></span>
<span class="line"><span></span></span>
<span class="line"><span>admin-web</span></span>
<span class="line"><span>→ Vue</span></span>
<span class="line"><span></span></span>
<span class="line"><span>app</span></span>
<span class="line"><span>→ Flutter</span></span></code></pre></div><p>如果把所有规则都放在根目录：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>AGENTS.md</span></span></code></pre></div><p>会越来越混乱。</p><p>更合理的是：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>project/</span></span>
<span class="line"><span>├── AGENTS.md</span></span>
<span class="line"><span>├── backend/</span></span>
<span class="line"><span>│   ├── AGENTS.md</span></span>
<span class="line"><span>│   └── ...</span></span>
<span class="line"><span>├── admin-web/</span></span>
<span class="line"><span>│   ├── AGENTS.md</span></span>
<span class="line"><span>│   └── ...</span></span>
<span class="line"><span>└── app/</span></span>
<span class="line"><span>    ├── AGENTS.md</span></span>
<span class="line"><span>    └── ...</span></span></code></pre></div><p>根目录负责：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>全局规则</span></span></code></pre></div><p>子目录负责：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>模块规则</span></span></code></pre></div><hr><h2 id="_24-根-agents-md-应该写什么" tabindex="-1"><strong>24. 根 AGENTS.md 应该写什么？</strong> <a class="header-anchor" href="#_24-根-agents-md-应该写什么" aria-label="Permalink to “24. 根 AGENTS.md 应该写什么？”">​</a></h2><p>例如：</p><div class="language-markdown"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;"># Repository Instructions</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">这是一个 Monorepo。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">目录：</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> backend：Java 后端</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> admin-web：Vue 管理后台</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> app：移动客户端</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">全局规则：</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 不修改生产配置</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 不执行 git push</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 不进行与任务无关的重构</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 修改必须保持向后兼容</span></span></code></pre></div><p>这些规则：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>所有模块都适用</span></span></code></pre></div><p>所以应该放在根目录。</p><hr><h2 id="_25-backend-agents-md-应该写什么" tabindex="-1"><strong>25. backend/AGENTS.md 应该写什么？</strong> <a class="header-anchor" href="#_25-backend-agents-md-应该写什么" aria-label="Permalink to “25. backend/AGENTS.md 应该写什么？”">​</a></h2><p>例如：</p><div class="language-markdown"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;"># Backend Instructions</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## Technology</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Java 17</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Spring Boot</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> MyBatis-Plus</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> MySQL</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Redis</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## Rules</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Controller 不直接调用 Mapper</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 金额使用 BigDecimal</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 修改数据库必须提供 migration</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 修改完成运行 Maven 测试</span></span></code></pre></div><p>这些只对：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>backend</span></span></code></pre></div><p>有效。</p><hr><h2 id="_26-admin-web-agents-md-应该写什么" tabindex="-1"><strong>26. admin-web/AGENTS.md 应该写什么？</strong> <a class="header-anchor" href="#_26-admin-web-agents-md-应该写什么" aria-label="Permalink to “26. admin-web/AGENTS.md 应该写什么？”">​</a></h2><p>例如：</p><div class="language-markdown"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;"># Admin Web Instructions</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## Technology</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Vue 3</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> TypeScript</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Vite</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## Rules</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 使用 Composition API</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 新代码使用 TypeScript</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> API 请求统一放在 api 目录</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 不在组件中直接拼接后端 URL</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 修改完成运行 lint 和 build</span></span></code></pre></div><p>这样 Codex 修改：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>backend</span></span></code></pre></div><p>和：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>admin-web</span></span></code></pre></div><p>时，就可以遵守不同的规则。</p><hr><h2 id="_27-为什么分层-agents-md-很重要" tabindex="-1"><strong>27. 为什么分层 AGENTS.md 很重要？</strong> <a class="header-anchor" href="#_27-为什么分层-agents-md-很重要" aria-label="Permalink to “27. 为什么分层 AGENTS.md 很重要？”">​</a></h2><p>因为大型 Repository 经常存在：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>不同语言</span></span>
<span class="line"><span>不同框架</span></span>
<span class="line"><span>不同测试方式</span></span>
<span class="line"><span>不同代码规范</span></span></code></pre></div><p>如果全部写成：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>一个巨大 AGENTS.md</span></span></code></pre></div><p>Agent 每次处理一个小模块，也要面对大量无关规则。</p><p>分层以后：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Root Rules</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>Module Rules</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>Task</span></span></code></pre></div><p>会更加清晰。</p><p>可以理解成：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>全局配置</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>局部配置</span></span></code></pre></div><hr><h2 id="_28-agents-md-和-prompt-谁优先" tabindex="-1"><strong>28. AGENTS.md 和 Prompt 谁优先？</strong> <a class="header-anchor" href="#_28-agents-md-和-prompt-谁优先" aria-label="Permalink to “28. AGENTS.md 和 Prompt 谁优先？”">​</a></h2><p>可以从用途上理解：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>AGENTS.md</span></span>
<span class="line"><span>→ 长期规则</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Prompt</span></span>
<span class="line"><span>→ 当前任务</span></span></code></pre></div><p>例如 <code>AGENTS.md</code> 写：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>金额统一使用 BigDecimal</span></span>
<span class="line"><span>禁止 git push</span></span>
<span class="line"><span>数据库修改必须提供 migration</span></span></code></pre></div><p>当前 Prompt：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>增加用户冻结余额功能。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>要求：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. 增加 frozenBalance</span></span>
<span class="line"><span>2. 增加 freeze 和 unfreeze 方法</span></span>
<span class="line"><span>3. 保持旧 API 不变</span></span>
<span class="line"><span>4. 增加单元测试</span></span></code></pre></div><p>两者组合起来就是：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>长期项目规则</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>当前任务要求</span></span></code></pre></div><p>所以不要把当前需求全部写入 <code>AGENTS.md</code>。</p><p>也不要每次 Prompt 都重复整个项目规范。</p><hr><h2 id="_29-一个好的-prompt-应该利用-agents-md" tabindex="-1"><strong>29. 一个好的 Prompt 应该利用 AGENTS.md</strong> <a class="header-anchor" href="#_29-一个好的-prompt-应该利用-agents-md" aria-label="Permalink to “29. 一个好的 Prompt 应该利用 AGENTS.md”">​</a></h2><p>没有 <code>AGENTS.md</code> 时，Prompt 可能是：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>增加用户余额冻结功能。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>项目使用 Java17、Spring Boot、MyBatis-Plus。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>金额必须使用 BigDecimal。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Controller 不允许调用 Mapper。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>修改数据库要提供 migration。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>不能 git push。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>修改完成运行测试。</span></span></code></pre></div><p>有了 <code>AGENTS.md</code> 以后，可以变成：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>增加用户余额冻结功能。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>要求：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. 增加冻结和解冻能力</span></span>
<span class="line"><span>2. 保持现有 API 兼容</span></span>
<span class="line"><span>3. 操作必须幂等</span></span>
<span class="line"><span>4. 增加相关测试</span></span>
<span class="line"><span></span></span>
<span class="line"><span>遵循项目 AGENTS.md。</span></span></code></pre></div><p>Prompt 明显更干净。</p><p>这也是 <code>AGENTS.md</code> 最大的价值之一：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>减少重复上下文</span></span></code></pre></div><hr><h2 id="_30-agents-md-不是绝对安全机制" tabindex="-1"><strong>30. AGENTS.md 不是绝对安全机制</strong> <a class="header-anchor" href="#_30-agents-md-不是绝对安全机制" aria-label="Permalink to “30. AGENTS.md 不是绝对安全机制”">​</a></h2><p>这一点一定要注意。</p><p>即使写了：</p><div class="language-markdown"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">不要执行 git push</span></span></code></pre></div><p>也不能把它理解成：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>系统级权限控制</span></span></code></pre></div><p><code>AGENTS.md</code> 本质上仍然是：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>给 Agent 的工作指令</span></span></code></pre></div><p>真正的安全还应该依赖：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Codex Permissions</span></span>
<span class="line"><span>操作确认</span></span>
<span class="line"><span>Git</span></span>
<span class="line"><span>测试环境</span></span>
<span class="line"><span>数据库权限</span></span>
<span class="line"><span>基础设施权限</span></span>
<span class="line"><span>人工 Review</span></span></code></pre></div><p>正确思路应该是：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>AGENTS.md</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>Permissions</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>Git</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>Environment Isolation</span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>Developer Review</span></span></code></pre></div><p>而不是：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>写了 AGENTS.md</span></span>
<span class="line"><span>→ 什么都安全了</span></span></code></pre></div><hr><h2 id="_31-agents-md-也需要维护" tabindex="-1"><strong>31. AGENTS.md 也需要维护</strong> <a class="header-anchor" href="#_31-agents-md-也需要维护" aria-label="Permalink to “31. AGENTS.md 也需要维护”">​</a></h2><p>项目会变化。</p><p>例如：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Java 17</span></span>
<span class="line"><span>→ Java 21</span></span>
<span class="line"><span></span></span>
<span class="line"><span>RabbitMQ</span></span>
<span class="line"><span>→ Kafka</span></span>
<span class="line"><span></span></span>
<span class="line"><span>旧 Mapper</span></span>
<span class="line"><span>→ 新 Repository</span></span>
<span class="line"><span></span></span>
<span class="line"><span>测试命令发生变化</span></span>
<span class="line"><span></span></span>
<span class="line"><span>目录结构重构</span></span></code></pre></div><p>如果 <code>AGENTS.md</code> 一直不更新，就会产生：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>代码已经是新的</span></span>
<span class="line"><span>AGENTS.md 还是旧的</span></span></code></pre></div><p>这时候反而会误导 Agent。</p><p>所以建议：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>架构变化</span></span>
<span class="line"><span>技术栈变化</span></span>
<span class="line"><span>开发规范变化</span></span>
<span class="line"><span>安全规则变化</span></span>
<span class="line"><span>测试流程变化</span></span></code></pre></div><p>时同步更新：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>AGENTS.md</span></span></code></pre></div><hr><h2 id="_32-可以把-agents-md-放进-git-吗" tabindex="-1"><strong>32. 可以把 AGENTS.md 放进 Git 吗？</strong> <a class="header-anchor" href="#_32-可以把-agents-md-放进-git-吗" aria-label="Permalink to “32. 可以把 AGENTS.md 放进 Git 吗？”">​</a></h2><p>如果里面是团队通用项目规则，通常很适合：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>纳入 Git</span></span></code></pre></div><p>这样整个团队使用 Coding Agent 时，都可以共享同一套规则。</p><p>例如：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Developer A</span></span>
<span class="line"><span>Developer B</span></span>
<span class="line"><span>Developer C</span></span>
<span class="line"><span>Codex</span></span></code></pre></div><p>看到的是同一份：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>项目开发约束</span></span></code></pre></div><p>这比每个人自己维护一份 Prompt 更容易保持一致。</p><p>但要注意：</p><blockquote><p>不要在 AGENTS.md 中写密码、Token、密钥等敏感信息。</p></blockquote><p>例如绝对不要写：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Production DB Password = xxx</span></span>
<span class="line"><span>OpenAI API Key = xxx</span></span>
<span class="line"><span>AWS Secret = xxx</span></span></code></pre></div><p>项目规则可以进 Git。</p><p>Secrets 不应该。</p><hr><h2 id="_33-一个更推荐的-agents-md-编写原则" tabindex="-1"><strong>33. 一个更推荐的 AGENTS.md 编写原则</strong> <a class="header-anchor" href="#_33-一个更推荐的-agents-md-编写原则" aria-label="Permalink to “33. 一个更推荐的 AGENTS.md 编写原则”">​</a></h2><p>可以记住：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>少</span></span>
<span class="line"><span>但重要</span></span>
<span class="line"><span></span></span>
<span class="line"><span>短</span></span>
<span class="line"><span>但明确</span></span>
<span class="line"><span></span></span>
<span class="line"><span>稳定</span></span>
<span class="line"><span>而不是临时</span></span>
<span class="line"><span></span></span>
<span class="line"><span>规则</span></span>
<span class="line"><span>而不是百科全书</span></span></code></pre></div><p>如果一条内容可以写成：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>金额统一使用 BigDecimal，禁止使用 double。</span></span></code></pre></div><p>就没必要写五百字解释：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>为什么 Java double 存在 IEEE 754 精度问题……</span></span></code></pre></div><p>Agent 需要的是：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>约束</span></span></code></pre></div><p>而不是重新上一遍 Java 基础课。</p><hr><h2 id="_34-推荐的-agents-md-模板" tabindex="-1"><strong>34. 推荐的 AGENTS.md 模板</strong> <a class="header-anchor" href="#_34-推荐的-agents-md-模板" aria-label="Permalink to “34. 推荐的 AGENTS.md 模板”">​</a></h2><p>最后给一个可以直接作为项目起点的模板。</p><div class="language-markdown"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;"># Project Instructions</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## Project</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">简要说明项目用途和主要模块。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## Technology</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Language:</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Framework:</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Build:</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Database:</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Cache:</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> MQ:</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Test:</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## Architecture</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Controller:</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Service:</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Repository / Mapper:</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> DTO / VO:</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Module boundaries:</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## Coding Style</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 命名规则</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 类型规则</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 金额规则</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 时间规则</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 异常处理规则</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 日志规则</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## Database</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ORM:</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Migration:</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Schema 修改规则:</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 数据兼容规则:</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## Testing</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">修改完成后：</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">1.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 编译</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">2.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 运行相关测试</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">3.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 检查 git diff</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">常用命令：</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">\`\`\`bash</span></span>
<span class="line"><span style="--shiki-light:#c62739;--shiki-dark:#F97583;">&lt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">test command</span><span style="--shiki-light:#c62739;--shiki-dark:#F97583;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">\`\`\`</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## Git</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">允许：</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> git status</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> git diff</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> git log</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">未经明确授权禁止：</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> git commit</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> git push</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> git reset --hard</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> git clean -fd</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## Safety</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">未经明确授权：</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 不访问生产数据库</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 不修改生产配置</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 不部署生产环境</span></span>
<span class="line"><span style="--shiki-light:#c13617;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 不执行破坏性命令</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## Business Rules</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">在这里写最重要、最容易被 Agent 误解的业务约束。</span></span></code></pre></div><p>不需要第一次就把所有内容写满。</p><p>可以：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>先写最重要的</span></span>
<span class="line"><span>   ↓</span></span>
<span class="line"><span>使用 Codex</span></span>
<span class="line"><span>   ↓</span></span>
<span class="line"><span>发现 Agent 经常犯某类错误</span></span>
<span class="line"><span>   ↓</span></span>
<span class="line"><span>把对应规则加入 AGENTS.md</span></span>
<span class="line"><span>   ↓</span></span>
<span class="line"><span>继续迭代</span></span></code></pre></div><p>这其实是最实际的维护方式。</p><hr><h2 id="_35-最后怎么理解-agents-md" tabindex="-1"><strong>35. 最后怎么理解 AGENTS.md？</strong> <a class="header-anchor" href="#_35-最后怎么理解-agents-md" aria-label="Permalink to “35. 最后怎么理解 AGENTS.md？”">​</a></h2><p>如果只记一句话：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>AGENTS.md</span></span>
<span class="line"><span>=</span></span>
<span class="line"><span>Coding Agent 的项目工作手册</span></span></code></pre></div><p>它最适合保存：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>长期规则</span></span>
<span class="line"><span>技术栈</span></span>
<span class="line"><span>架构边界</span></span>
<span class="line"><span>编码规范</span></span>
<span class="line"><span>测试方式</span></span>
<span class="line"><span>安全限制</span></span>
<span class="line"><span>关键业务约束</span></span></code></pre></div><p>而当前需求应该继续放在：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Prompt</span></span></code></pre></div><p>可以简单理解成：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>AGENTS.md</span></span>
<span class="line"><span>→ 在这个项目里应该怎么工作</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Prompt</span></span>
<span class="line"><span>→ 这一次具体要做什么</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Permissions</span></span>
<span class="line"><span>→ 技术上允许做到什么</span></span></code></pre></div><p>三者组合：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>AGENTS.md</span></span>
<span class="line"><span>      +</span></span>
<span class="line"><span>Prompt</span></span>
<span class="line"><span>      +</span></span>
<span class="line"><span>Permissions</span></span>
<span class="line"><span>      ↓</span></span>
<span class="line"><span>Codex Agent Behavior</span></span></code></pre></div><p>对于真正长期使用 Codex 的项目来说：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Prompt 写得好</span></span></code></pre></div><p>当然重要。</p><p>但更进一步应该做到：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>让项目本身就对 Agent 友好</span></span></code></pre></div><p>而 <code>AGENTS.md</code>，就是其中最重要的基础设施之一。</p><p>最终目标不是每次都写一个几百行 Prompt。</p><p>而是让 Codex 进入项目以后，很快知道：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>这是什么项目</span></span>
<span class="line"><span>用什么技术</span></span>
<span class="line"><span>代码应该写在哪里</span></span>
<span class="line"><span>哪些规则必须遵守</span></span>
<span class="line"><span>哪些事情绝对不能做</span></span>
<span class="line"><span>修改完成以后怎么验证</span></span></code></pre></div><p>当这些信息逐渐沉淀到 Repository 中以后，Coding Agent 才会真正从：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>临时的 AI 助手</span></span></code></pre></div><p>变成：</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>能够长期参与项目开发的工程 Agent</span></span></code></pre></div>`,445)]])}var s=r(a,[[`render`,o]]);export{i as __pageData,s as default};