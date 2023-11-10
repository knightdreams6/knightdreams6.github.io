import{_ as a,o as e,c as n,a as s}from"./app-830c5607.js";const o={},t=s(`<h5 id="windows" tabindex="-1"><a class="header-anchor" href="#windows" aria-hidden="true">#</a> Windows</h5><blockquote><p>.bat文件 启动jar包后关闭黑窗口</p></blockquote><div class="language-bat line-numbers-mode" data-ext="bat"><pre class="language-bat"><code>@echo off
	%1 mshta vbscript:CreateObject(&quot;WScript.Shell&quot;).Run(&quot;%~s0 ::&quot;,0,FALSE)(window.close)&amp;&amp;exit
java -jar demo-0.0.1-SNAPSHOT.jar &gt; log.file 2&gt;&amp;1 &amp;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="linux" tabindex="-1"><a class="header-anchor" href="#linux" aria-hidden="true">#</a> linux</h5><blockquote><p>首页后台永久启动，会把日志输出到新建的log.file文件</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">nohup</span> <span class="token function">java</span> <span class="token parameter variable">-jar</span> demo-0.0.1-SNAPSHOT.jar <span class="token operator">&gt;</span> log.file <span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span><span class="token file-descriptor important">&amp;1</span> <span class="token operator">&amp;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote><p>非首次后台永久启动，会把日志追加到已存在的log.file文件</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">nohup</span> <span class="token function">java</span> <span class="token parameter variable">-jar</span> demo-0.0.1-SNAPSHOT.jar <span class="token operator">&gt;&gt;</span> log.file <span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span><span class="token file-descriptor important">&amp;1</span> <span class="token operator">&amp;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote><p>nohup( no hang up)是不挂断运行命令,当账户退出或终端关闭时,程序仍然运行。</p><p>nobup command(命令) #缺省情况下会将所有输出重定向到一个叫nohup.out的文件，除非另外指定，这里就指定标准输出重定向到log.file文件。</p><p>2&gt;&amp;1的意思就是将错误重定向到标准输出，因为标准输出已然重定向到了log.file，所以这里错误信息和标准输出都重定向输到了log.file文件当中</p><p>最后的&amp;是让程序在后台运行</p></blockquote>`,9),i=[t];function l(p,r){return e(),n("div",null,i)}const d=a(o,[["render",l],["__file","linuxyuwindowsqidongspringbootmingling.html.vue"]]);export{d as default};
