import{_ as n,o as s,c as e,b as a}from"./app-d26df8f0.js";const t={},l=a(`<h4 id="nginx配置语法" tabindex="-1"><a class="header-anchor" href="#nginx配置语法" aria-hidden="true">#</a> Nginx配置语法</h4><p>nginx.conf 结构图可以这样概括</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code>main        <span class="token comment"># 全局配置，对全局生效</span>
├── events  <span class="token comment"># 配置影响 Nginx 服务器或与用户的网络连接</span>
├── http    <span class="token comment"># 配置代理，缓存，日志定义等绝大多数功能和第三方模块的配置</span>
│   ├── upstream <span class="token comment"># 配置后端服务器具体地址，负载均衡配置不可或缺的部分</span>
│   ├── server   <span class="token comment"># 配置虚拟主机的相关参数，一个 http 块中可以有多个 server 块</span>
│   ├── server
│   │   ├── location  <span class="token comment"># server 块可以包含多个 location 块，location 指令用于匹配 uri</span>
│   │   ├── location
│   │   └── ...
│   └── ...
└── ...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>一个 Nginx 配置文件的结构就像 <code>nginx.conf</code> 显示的那样，配置文件的语法规则：</p><ol><li>配置文件由指令与指令块构成；</li><li>每条指令以 <code>;</code> 分号结尾，指令与参数间以空格符号分隔；</li><li>指令块以 <code>{}</code> 大括号将多条指令组织在一起；</li><li><code>include</code> 语句允许组合多个配置文件以提升可维护性；</li><li>使用 <code>#</code> 符号添加注释，提高可读性；</li><li>使用 <code>$</code> 符号使用变量；</li><li>部分指令的参数支持正则表达式；</li></ol><h5 id="典型配置" tabindex="-1"><a class="header-anchor" href="#典型配置" aria-hidden="true">#</a> 典型配置</h5><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token comment"># 运行用户，默认即是nginx，可以不进行设置</span>
<span class="token directive"><span class="token keyword">user</span> nginx</span><span class="token punctuation">;</span>
<span class="token comment"># Nginx 进程数，一般设置为和 CPU 核数一样</span>
<span class="token directive"><span class="token keyword">worker_processes</span>  <span class="token number">1</span></span><span class="token punctuation">;</span>
<span class="token comment"># Nginx 的错误日志存放目录</span>
<span class="token directive"><span class="token keyword">error_log</span>  /var/log/nginx/error.log warn</span><span class="token punctuation">;</span>
<span class="token comment"># Nginx 服务启动时的 pid 存放位置</span>
<span class="token directive"><span class="token keyword">pid</span>        /var/run/nginx.pid</span><span class="token punctuation">;</span>

<span class="token directive"><span class="token keyword">events</span></span> <span class="token punctuation">{</span>
    <span class="token comment"># 使用epoll的I/O模型(如果不知道Nginx该使用哪种轮询方法，会自动选择一个最适合你操作系统的)</span>
    <span class="token directive"><span class="token keyword">use</span> epoll</span><span class="token punctuation">;</span>     
     <span class="token comment"># 每个进程允许最大并发数</span>
    <span class="token directive"><span class="token keyword">worker_connections</span> <span class="token number">1024</span></span><span class="token punctuation">;</span>  
<span class="token punctuation">}</span>

<span class="token comment"># 配置使用最频繁的部分，代理、缓存、日志定义等绝大多数功能和第三方模块的配置都在这里设置</span>
<span class="token directive"><span class="token keyword">http</span></span> <span class="token punctuation">{</span>   
    <span class="token comment"># 设置日志模式</span>
    <span class="token directive"><span class="token keyword">log_format</span>  main  <span class="token string">&#39;<span class="token variable">$remote_addr</span> - <span class="token variable">$remote_user</span> [<span class="token variable">$time_local]</span> &quot;<span class="token variable">$request</span>&quot; &#39;</span>
                      <span class="token string">&#39;<span class="token variable">$status</span> <span class="token variable">$body_bytes_sent</span> &quot;<span class="token variable">$http_referer</span>&quot; &#39;</span>
                      <span class="token string">&#39;&quot;<span class="token variable">$http_user_agent</span>&quot; &quot;<span class="token variable">$http_x_forwarded_for</span>&quot;&#39;</span></span><span class="token punctuation">;</span>

    <span class="token comment"># Nginx访问日志存放位置</span>
    <span class="token directive"><span class="token keyword">access_log</span>  /var/log/nginx/access.log  main</span><span class="token punctuation">;</span>   

    <span class="token comment"># 开启高效传输模式</span>
    <span class="token directive"><span class="token keyword">sendfile</span>            <span class="token boolean">on</span></span><span class="token punctuation">;</span>   
    <span class="token comment"># 减少网络报文段的数量</span>
    <span class="token directive"><span class="token keyword">tcp_nopush</span>          <span class="token boolean">on</span></span><span class="token punctuation">;</span>   
    <span class="token directive"><span class="token keyword">tcp_nodelay</span>         <span class="token boolean">on</span></span><span class="token punctuation">;</span>
    <span class="token comment"># 保持连接的时间，也叫超时时间，单位秒</span>
    <span class="token directive"><span class="token keyword">keepalive_timeout</span>   <span class="token number">65</span></span><span class="token punctuation">;</span>  
    <span class="token directive"><span class="token keyword">types_hash_max_size</span> <span class="token number">2048</span></span><span class="token punctuation">;</span>

    <span class="token comment"># 文件扩展名与类型映射表</span>
    <span class="token directive"><span class="token keyword">include</span>             /etc/nginx/mime.types</span><span class="token punctuation">;</span>     
    <span class="token comment"># 默认文件类型</span>
    <span class="token directive"><span class="token keyword">default_type</span>        application/octet-stream</span><span class="token punctuation">;</span>   

    <span class="token comment"># 加载子配置项</span>
    <span class="token comment"># include /etc/nginx/conf.d/*.conf;</span>
    
    <span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
        <span class="token comment"># 配置监听的端口</span>
    	<span class="token directive"><span class="token keyword">listen</span>       <span class="token number">80</span></span><span class="token punctuation">;</span>       
        <span class="token comment"># 配置的域名</span>
    	<span class="token directive"><span class="token keyword">server_name</span>  localhost</span><span class="token punctuation">;</span>    
    	
    	<span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span>
            <span class="token comment"># 网站根目录</span>
    		<span class="token directive"><span class="token keyword">root</span>   /usr/share/nginx/html</span><span class="token punctuation">;</span>  
            <span class="token comment"># 默认首页文件</span>
    		<span class="token directive"><span class="token keyword">index</span>  index.html index.htm</span><span class="token punctuation">;</span>   
            <span class="token comment"># 禁止访问的ip地址，可以为all</span>
    		<span class="token directive"><span class="token keyword">deny</span> 172.168.22.11</span><span class="token punctuation">;</span>   
            <span class="token comment"># 允许访问的ip地址，可以为all</span>
    		<span class="token directive"><span class="token keyword">allow</span> 172.168.33.44</span><span class="token punctuation">;</span>
    	<span class="token punctuation">}</span>
    	
        <span class="token comment"># 默认50x 400x对应的访问页面</span>
    	<span class="token directive"><span class="token keyword">error_page</span> <span class="token number">500</span> <span class="token number">502</span> <span class="token number">503</span> <span class="token number">504</span> /50x.html</span><span class="token punctuation">;</span>  
    	<span class="token directive"><span class="token keyword">error_page</span> <span class="token number">400</span> <span class="token number">404</span> error.html</span><span class="token punctuation">;</span>  
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="全局变量" tabindex="-1"><a class="header-anchor" href="#全局变量" aria-hidden="true">#</a> 全局变量</h5><p>Nginx 有一些常用的全局变量，你可以在配置的任何位置使用它们，如下表：</p><table><thead><tr><th style="text-align:left;">全局变量名</th><th style="text-align:left;">功能</th></tr></thead><tbody><tr><td style="text-align:left;"><code>$host</code></td><td style="text-align:left;">请求信息中的 <code>Host</code>，如果请求中没有 <code>Host</code> 行，则等于设置的服务器名，不包含端口</td></tr><tr><td style="text-align:left;"><code>$request_method</code></td><td style="text-align:left;">客户端请求类型，如 <code>GET</code>、<code>POST</code></td></tr><tr><td style="text-align:left;"><code>$remote_addr</code></td><td style="text-align:left;">客户端的 <code>IP</code> 地址</td></tr><tr><td style="text-align:left;"><code>$args</code></td><td style="text-align:left;">请求中的参数</td></tr><tr><td style="text-align:left;"><code>$arg_PARAMETER</code></td><td style="text-align:left;"><code>GET</code> 请求中变量名 PARAMETER 参数的值，例如：<code>$http_user_agent</code>(Uaer-Agent 值), <code>$http_referer</code>...</td></tr><tr><td style="text-align:left;"><code>$content_length</code></td><td style="text-align:left;">请求头中的 <code>Content-length</code> 字段</td></tr><tr><td style="text-align:left;"><code>$http_user_agent</code></td><td style="text-align:left;">客户端agent信息</td></tr><tr><td style="text-align:left;"><code>$http_cookie</code></td><td style="text-align:left;">客户端cookie信息</td></tr><tr><td style="text-align:left;"><code>$remote_addr</code></td><td style="text-align:left;">客户端的IP地址</td></tr><tr><td style="text-align:left;"><code>$remote_port</code></td><td style="text-align:left;">客户端的端口</td></tr><tr><td style="text-align:left;"><code>$http_user_agent</code></td><td style="text-align:left;">客户端agent信息</td></tr><tr><td style="text-align:left;"><code>$server_protocol</code></td><td style="text-align:left;">请求使用的协议，如 <code>HTTP/1.0</code>、<code>HTTP/1.1</code></td></tr><tr><td style="text-align:left;"><code>$server_addr</code></td><td style="text-align:left;">服务器地址</td></tr><tr><td style="text-align:left;"><code>$server_name</code></td><td style="text-align:left;">服务器名称</td></tr><tr><td style="text-align:left;"><code>$server_port</code></td><td style="text-align:left;">服务器的端口号</td></tr><tr><td style="text-align:left;"><code>$scheme</code></td><td style="text-align:left;">HTTP 方法（如http，https）</td></tr></tbody></table><p>还有更多的内置预定义变量，可以直接搜索关键字「nginx内置预定义变量」可以看到一堆博客写这个，这些变量都可以在配置文件中直接使用。</p>`,11),i=[l];function c(d,o){return s(),e("div",null,i)}const r=n(t,[["render",c],["__file","nginxpeizhiyufa.html.vue"]]);export{r as default};
