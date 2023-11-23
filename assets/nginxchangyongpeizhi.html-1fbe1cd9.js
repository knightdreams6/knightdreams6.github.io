import{_ as n,o as s,c as a,b as e}from"./app-738c8638.js";const i={},t=e(`<h5 id="_1、将某个端口的所有请求转发到其他地址" tabindex="-1"><a class="header-anchor" href="#_1、将某个端口的所有请求转发到其他地址" aria-hidden="true">#</a> 1、将某个端口的所有请求转发到其他地址</h5><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">listen</span>       <span class="token number">80</span></span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">server_name</span>  localhost</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">rewrite</span> ^(.*)$ https://qmeducation.nmyouth.org.cn/<span class="token variable">$1</span> permanent</span><span class="token punctuation">;</span> 
    
<span class="token punctuation">}</span>

<span class="token comment"># HTTP 请求转发到 HTTPS</span>
<span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">listen</span>      <span class="token number">80</span></span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">server_name</span> www.sherlocked93.club</span><span class="token punctuation">;</span>

    <span class="token comment"># 单域名重定向</span>
    <span class="token directive"><span class="token keyword">if</span> (<span class="token variable">$host</span> = <span class="token string">&#39;www.sherlocked93.club&#39;</span>)</span><span class="token punctuation">{</span>
        <span class="token directive"><span class="token keyword">return</span> <span class="token number">301</span> https://www.sherlocked93.club<span class="token variable">$request_uri</span></span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment"># 全局非 https 协议时重定向</span>
    <span class="token directive"><span class="token keyword">if</span> (<span class="token variable">$scheme</span> != <span class="token string">&#39;https&#39;</span>)</span> <span class="token punctuation">{</span>
        <span class="token directive"><span class="token keyword">return</span> <span class="token number">301</span> https://<span class="token variable">$server_name</span><span class="token variable">$request_uri</span></span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment"># 或者全部重定向</span>
    <span class="token directive"><span class="token keyword">return</span> <span class="token number">301</span> https://<span class="token variable">$server_name</span><span class="token variable">$request_uri</span></span><span class="token punctuation">;</span>

    <span class="token comment"># 以上配置选择自己需要的即可，不用全部加</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="_2、配置https" tabindex="-1"><a class="header-anchor" href="#_2、配置https" aria-hidden="true">#</a> 2、配置https</h5><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">listen</span>  <span class="token number">443</span>  ssl</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">server_name</span>   www.qmeducation.nmyouth.org.cn</span><span class="token punctuation">;</span>
    <span class="token comment"># 证书文件地址</span>
    <span class="token directive"><span class="token keyword">ssl_certificate</span>	/etc/nginx/conf.d/4656399_qmeducation.nmyouth.org.cn.pem</span><span class="token punctuation">;</span>
    <span class="token comment"># 私钥文件地址</span>
    <span class="token directive"><span class="token keyword">ssl_certificate_key</span> /etc/nginx/conf.d/4656399_qmeducation.nmyouth.org.cn.key</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">ssl_session_timeout</span> <span class="token number">10m</span></span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="_3、将请求转发到本地服务-请求过滤" tabindex="-1"><a class="header-anchor" href="#_3、将请求转发到本地服务-请求过滤" aria-hidden="true">#</a> 3、将请求转发到本地服务/请求过滤</h5><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
    <span class="token comment"># 非指定请求全返回 403</span>
    <span class="token directive"><span class="token keyword">if</span> ( <span class="token variable">$request_method</span> !~ ^(GET|POST|HEAD)$ )</span> <span class="token punctuation">{</span>
      <span class="token directive"><span class="token keyword">return</span> <span class="token number">403</span></span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token directive"><span class="token keyword">location</span> /api/</span> <span class="token punctuation">{</span>
        <span class="token comment"># IP访问限制（只允许IP是 192.168.0.2 机器访问）</span>
        <span class="token directive"><span class="token keyword">allow</span> 192.168.0.2</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">deny</span> all</span><span class="token punctuation">;</span>
        
        <span class="token comment"># 在将客户端请求发送给后端服务器之前，更改来自客户端的请求头信息；</span>
        <span class="token directive"><span class="token keyword">proxy_set_header</span> Host <span class="token variable">$http_host</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">proxy_set_header</span> X-Real-IP <span class="token variable">$remote_addr</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">proxy_set_header</span> REMOTE-HOST <span class="token variable">$remote_addr</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">proxy_set_header</span> X-Forwarded-For <span class="token variable">$proxy_add_x_forwarded_for</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">proxy_pass</span> http://172.17.0.1:8080/</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="_4、静态资源文件映射-图片防盗链" tabindex="-1"><a class="header-anchor" href="#_4、静态资源文件映射-图片防盗链" aria-hidden="true">#</a> 4、静态资源文件映射/图片防盗链</h5><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">listen</span>       <span class="token number">80</span></span><span class="token punctuation">;</span>
  	<span class="token directive"><span class="token keyword">server_name</span>  static.sherlocked93.club</span><span class="token punctuation">;</span>
  	<span class="token directive"><span class="token keyword">charset</span> utf-8</span><span class="token punctuation">;</span>    <span class="token comment"># 防止中文文件名乱码</span>
    
    <span class="token directive"><span class="token keyword">location</span> /file</span> <span class="token punctuation">{</span>
        <span class="token directive"><span class="token keyword">root</span> /usr/share/nginx/html</span><span class="token punctuation">;</span>
        <span class="token comment"># 开启静态资源目录</span>
        <span class="token directive"><span class="token keyword">autoindex</span> <span class="token boolean">on</span></span><span class="token punctuation">;</span>
        <span class="token comment"># on(默认)显示文件的确切大小，单位是byte；off显示文件大概大小，单位KB、MB、GB</span>
        <span class="token directive"><span class="token keyword">autoindex_exact_size</span> <span class="token boolean">off</span></span><span class="token punctuation">;</span>
        <span class="token comment"># off(默认)时显示的文件时间为GMT时间；on显示的文件时间为服务器时间</span>
        <span class="token directive"><span class="token keyword">autoindex_localtime</span>     <span class="token boolean">off</span></span><span class="token punctuation">;</span>   
    <span class="token punctuation">}</span>
    
    <span class="token comment"># 图片防盗链</span>
    <span class="token directive"><span class="token keyword">location</span> ~* \\.(gif|jpg|jpeg|png|bmp|swf)$</span> <span class="token punctuation">{</span>
        <span class="token directive"><span class="token keyword">valid_referers</span> none blocked 192.168.0.2</span><span class="token punctuation">;</span>  <span class="token comment"># 只允许本机 IP 外链引用</span>
        <span class="token directive"><span class="token keyword">if</span> (<span class="token variable">$invalid_referer</span>)</span><span class="token punctuation">{</span>
            <span class="token directive"><span class="token keyword">return</span> <span class="token number">403</span></span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="_5、单页面应用部署" tabindex="-1"><a class="header-anchor" href="#_5、单页面应用部署" aria-hidden="true">#</a> 5、单页面应用部署</h5><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token comment"># hash</span>
<span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span>
        <span class="token directive"><span class="token keyword">root</span>   /usr/share/nginx/html</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">index</span>  index.html index.htm</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">try_files</span> <span class="token variable">$uri</span> <span class="token variable">$uri</span>/ @router</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment"># history</span>
<span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
  <span class="token directive"><span class="token keyword">listen</span>       <span class="token number">80</span></span><span class="token punctuation">;</span>
  <span class="token directive"><span class="token keyword">server_name</span>  fe.sherlocked93.club</span><span class="token punctuation">;</span>
  
  <span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">root</span>       /usr/share/nginx/html/dist</span><span class="token punctuation">;</span>  <span class="token comment"># vue 打包后的文件夹</span>
    <span class="token directive"><span class="token keyword">index</span>      index.html index.htm</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">try_files</span>  <span class="token variable">$uri</span> <span class="token variable">$uri</span>/ /index.html @rewrites</span><span class="token punctuation">;</span>
    
    <span class="token directive"><span class="token keyword">expires</span> -1</span><span class="token punctuation">;</span>                          <span class="token comment"># 首页一般没有强制缓存</span>
    <span class="token directive"><span class="token keyword">add_header</span> Cache-Control no-cache</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  
  <span class="token comment"># 接口转发</span>
  <span class="token directive"><span class="token keyword">location</span> ~ ^/api</span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">proxy_pass</span> http://be.sherlocked93.club</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  
  <span class="token directive"><span class="token keyword">location</span> @rewrites</span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">rewrite</span> ^(.+)$ /index.html break</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="_6、配置负载均衡" tabindex="-1"><a class="header-anchor" href="#_6、配置负载均衡" aria-hidden="true">#</a> 6、配置负载均衡</h5><blockquote><p>Nginx 提供了好几种分配方式，默认为 <strong>轮询</strong> 。有以下几种分配方式</p></blockquote><ol><li><strong>轮询</strong> 默认方式，每个请求按时间顺序逐一分配到不同的后端服务器，如果后端服务挂了，能自动剔除；</li><li><strong>weight</strong> 权重分配，指定轮询几率，权重越高，在被访问到的概率越大，用于后端服务器性能不均的情况</li><li><strong>ip_hash</strong> 每个请求按访问 IP 的hash结果分配，这样这样每个访客固定访问一个后端服务器，可以解决动态网页 session 共享问题。负载均衡每次请求都会重新定位到服务器集群中的某一个，那么已经登录某一个服务器的用户再重新定位到另一个服务器，其登录信息将会丢失，这样显然是不妥的；</li><li><strong>fair</strong>（第三方），按后端服务器的响应时间分配，响应时间短的优先分配，依赖第三方插件 nginx-upstream-fair，需要先安装；</li></ol><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">http</span></span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">upstream</span> myserver</span> <span class="token punctuation">{</span>
  	<span class="token comment"># ip_hash;  # ip_hash 方式</span>
    <span class="token comment"># fair;   # fair 方式</span>
    <span class="token directive"><span class="token keyword">server</span> 127.0.0.1:8081</span><span class="token punctuation">;</span>  <span class="token comment"># 负载均衡目的服务地址</span>
    <span class="token directive"><span class="token keyword">server</span> 127.0.0.1:8080</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">server</span> 127.0.0.1:8082 weight=10</span><span class="token punctuation">;</span>  <span class="token comment"># weight 方式，不写默认为 1</span>
  <span class="token punctuation">}</span>
  
  <span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span>
    	<span class="token directive"><span class="token keyword">proxy_pass</span> http://myserver</span><span class="token punctuation">;</span>
      	<span class="token directive"><span class="token keyword">proxy_connect_timeout</span> <span class="token number">10</span></span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="_7、配置cors跨域" tabindex="-1"><a class="header-anchor" href="#_7、配置cors跨域" aria-hidden="true">#</a> 7、配置cors跨域</h5><ol><li><p>使用反向代理解决跨域</p><p>通常我们会约定对后端服务的请求加上 <code>/apis/</code> 前缀或者其他的 path 来和对静态资源的请求加以区分，此时我们可以这样配置：</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">server</span></span><span class="token punctuation">{</span>
    <span class="token comment"># 请求跨域，约定代理后端服务请求path以/apis/开头</span>
    <span class="token directive"><span class="token keyword">location</span> ^~/apis/</span> <span class="token punctuation">{</span>
        <span class="token comment"># 这里重写了请求，将正则匹配中的第一个分组的path拼接到真正的请求后面，并用break停止后续匹配</span>
        <span class="token directive"><span class="token keyword">rewrite</span> ^/apis/(.*)$ /<span class="token variable">$1</span> break</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">proxy_pass</span> be.sherlocked93.club</span><span class="token punctuation">;</span>

        <span class="token comment"># 两个域名之间cookie的传递与回写</span>
        <span class="token directive"><span class="token keyword">proxy_cookie_domain</span> be.sherlocked93.club fe.sherlocked93.club</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>配置header解决跨域</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
  <span class="token directive"><span class="token keyword">listen</span>       <span class="token number">80</span></span><span class="token punctuation">;</span>
  <span class="token directive"><span class="token keyword">server_name</span>  be.sherlocked93.club</span><span class="token punctuation">;</span>
  
	<span class="token directive"><span class="token keyword">add_header</span> <span class="token string">&#39;Access-Control-Allow-Origin&#39;</span> <span class="token variable">$http_origin</span></span><span class="token punctuation">;</span>   <span class="token comment"># 全局变量获得当前请求origin，带cookie的请求不支持*</span>
	<span class="token directive"><span class="token keyword">add_header</span> <span class="token string">&#39;Access-Control-Allow-Credentials&#39;</span> <span class="token string">&#39;true&#39;</span></span><span class="token punctuation">;</span>    <span class="token comment"># 为 true 可带上 cookie</span>
	<span class="token directive"><span class="token keyword">add_header</span> <span class="token string">&#39;Access-Control-Allow-Methods&#39;</span> <span class="token string">&#39;GET, POST, OPTIONS&#39;</span></span><span class="token punctuation">;</span>  <span class="token comment"># 允许请求方法</span>
	<span class="token directive"><span class="token keyword">add_header</span> <span class="token string">&#39;Access-Control-Allow-Headers&#39;</span> <span class="token variable">$http_access_control_request_headers</span></span><span class="token punctuation">;</span>  <span class="token comment"># 允许请求的 header，可以为 *</span>
	<span class="token directive"><span class="token keyword">add_header</span> <span class="token string">&#39;Access-Control-Expose-Headers&#39;</span> <span class="token string">&#39;Content-Length,Content-Range&#39;</span></span><span class="token punctuation">;</span>
	
  <span class="token directive"><span class="token keyword">if</span> (<span class="token variable">$request_method</span> = <span class="token string">&#39;OPTIONS&#39;</span>)</span> <span class="token punctuation">{</span>
		<span class="token directive"><span class="token keyword">add_header</span> <span class="token string">&#39;Access-Control-Max-Age&#39;</span> <span class="token number">1728000</span></span><span class="token punctuation">;</span>   <span class="token comment"># OPTIONS 请求的有效期，在有效期内不用发出另一条预检请求</span>
		<span class="token directive"><span class="token keyword">add_header</span> <span class="token string">&#39;Content-Type&#39;</span> <span class="token string">&#39;text/plain; charset=utf-8&#39;</span></span><span class="token punctuation">;</span>
		<span class="token directive"><span class="token keyword">add_header</span> <span class="token string">&#39;Content-Length&#39;</span> <span class="token number">0</span></span><span class="token punctuation">;</span>
    
		<span class="token directive"><span class="token keyword">return</span> <span class="token number">204</span></span><span class="token punctuation">;</span>                  <span class="token comment"># 200 也可以</span>
	<span class="token punctuation">}</span>
  
	<span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span>
		<span class="token directive"><span class="token keyword">root</span>  /usr/share/nginx/html/be</span><span class="token punctuation">;</span>
		<span class="token directive"><span class="token keyword">index</span> index.html</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ol><h5 id="_8、配置pc或移动设备" tabindex="-1"><a class="header-anchor" href="#_8、配置pc或移动设备" aria-hidden="true">#</a> 8、配置PC或移动设备</h5><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
  <span class="token directive"><span class="token keyword">listen</span> <span class="token number">80</span></span><span class="token punctuation">;</span>
	<span class="token directive"><span class="token keyword">server_name</span> fe.sherlocked93.club</span><span class="token punctuation">;</span>

	<span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span>
		<span class="token directive"><span class="token keyword">root</span>  /usr/share/nginx/html/pc</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">if</span> (<span class="token variable">$http_user_agent</span> ~* <span class="token string">&#39;(Android|webOS|iPhone|iPad|BlackBerry)&#39;</span>)</span> <span class="token punctuation">{</span>
          <span class="token directive"><span class="token keyword">root</span> /usr/share/nginx/html/mobile</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
		<span class="token directive"><span class="token keyword">index</span> index.html</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="最佳实践" tabindex="-1"><a class="header-anchor" href="#最佳实践" aria-hidden="true">#</a> 最佳实践</h4><ol><li>为了使 Nginx 配置更易于维护，建议为每个服务创建一个单独的配置文件，存储在 <code>/etc/nginx/conf.d</code> 目录，根据需求可以创建任意多个独立的配置文件。</li><li>独立的配置文件，建议遵循以下命名约定 <code>&lt;服务&gt;.conf</code>，比如域名是<code>sherlocked93.club</code>，那么你的配置文件的应该是这样的 <code>/etc/nginx/conf.d/sherlocked93.club.conf</code>，如果部署多个服务，也可以在文件名中加上 Nginx 转发的端口号，比如 <code>sherlocked93.club.8080.conf</code>，如果是二级域名，建议也都加上 <code>fe.sherlocked93.club.conf</code>。</li><li>常用的、复用频率比较高的配置可以放到 <code>/etc/nginx/snippets</code> 文件夹，在 Nginx 的配置文件中需要用到的位置 include 进去，以功能来命名，并在每个 snippet 配置文件的开头注释标明主要功能和引入位置，方便管理。比如之前的 <code>gzip</code>、<code>cors</code> 等常用配置，我都设置了 snippet。</li><li>Nginx 日志相关目录，内以 <code>域名.type.log</code> 命名（比如<code>be.sherlocked93.club.access.log</code> 和 <code>be.sherlocked93.club.error.log</code> ）位于 <code>/var/log/nginx/</code> 目录中，为每个独立的服务配置不同的访问权限和错误日志文件，这样查找错误时，会更加方便快捷。</li></ol>`,20),c=[t];function p(l,o){return s(),a("div",null,c)}const r=n(i,[["render",p],["__file","nginxchangyongpeizhi.html.vue"]]);export{r as default};
