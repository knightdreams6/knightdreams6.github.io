import{_ as a,o as e,c as s,b as n}from"./app-d26df8f0.js";const i={},r=n(`<h4 id="_1、查找版本" tabindex="-1"><a class="header-anchor" href="#_1、查找版本" aria-hidden="true">#</a> 1、查找版本</h4><blockquote><p>https://hub.docker.com/_/elasticsearch 目前最新版本为7.6.2</p></blockquote><h4 id="_2、下载镜像" tabindex="-1"><a class="header-anchor" href="#_2、下载镜像" aria-hidden="true">#</a> 2、下载镜像</h4><blockquote><p>elasticsearch没有latest标签版本</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> pull elasticsearch:7.6.2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="_3、创建用户定义的网络-用于连接到连接到同一网络的其他服务" tabindex="-1"><a class="header-anchor" href="#_3、创建用户定义的网络-用于连接到连接到同一网络的其他服务" aria-hidden="true">#</a> 3、创建用户定义的网络（用于连接到连接到同一网络的其他服务）</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> network create somenetwork   // somenetwork为自定义网络名称
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="_4、运行elasticsearch" tabindex="-1"><a class="header-anchor" href="#_4、运行elasticsearch" aria-hidden="true">#</a> 4、运行Elasticsearch</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code> <span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">--name</span> elasticsearch <span class="token parameter variable">--net</span> somenetwork <span class="token parameter variable">-p</span> <span class="token number">9200</span>:9200 <span class="token parameter variable">-p</span> <span class="token number">9300</span>:9300 <span class="token parameter variable">-e</span> <span class="token string">&quot;discovery.type=single-node&quot;</span> elasticsearch:tag
 
 
<span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">--name</span> search <span class="token parameter variable">-p</span> <span class="token number">9200</span>:9200 <span class="token parameter variable">-p</span> <span class="token number">9300</span>:9300 <span class="token parameter variable">-e</span> <span class="token string">&quot;discovery.type=single-node&quot;</span> elasticsearch:7.6.2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_5、安装elasticsearch-analysis-ik" tabindex="-1"><a class="header-anchor" href="#_5、安装elasticsearch-analysis-ik" aria-hidden="true">#</a> 5、安装elasticsearch-analysis-ik</h4><p>下载地址 https://github.com/medcl/elasticsearch-analysis-ik/releases 可以手动下载后上传到服务器，也可以直接下载</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">wget</span> https://github.com/medcl/elasticsearch-analysis-ik/releases/download/v7.6.2/elasticsearch-analysis-ik-7.6.2.zip
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>百度云链接</p><blockquote><p>链接：https://pan.baidu.com/s/10DrsPungYWKdAEtTkXq5CA 提取码：9xn6</p></blockquote><p>进入容器</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> search /bin/bash
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">cd</span> /usr/share/elasticsearch/plugins
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">mkdir</span> ik
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>将解压缩的文件放到该目录下，然后</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> restart search
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,20),c=[r];function l(t,d){return e(),s("div",null,c)}const p=a(i,[["render",l],["__file","dockeranzhuangelasticsearch.html.vue"]]);export{p as default};