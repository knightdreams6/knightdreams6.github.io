import{_ as n,o as s,c as a,a as t}from"./app-830c5607.js";const p={},e=t(`<blockquote><p>windows平台 socket server</p></blockquote><h5 id="winsocketserver-h" tabindex="-1"><a class="header-anchor" href="#winsocketserver-h" aria-hidden="true">#</a> winSocketServer.h</h5><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token comment">//</span>
<span class="token comment">// Created by knight on 2023/9/1.</span>
<span class="token comment">//</span>

<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">pragma</span> <span class="token expression">once</span></span>

class WinSocket <span class="token punctuation">{</span>
public<span class="token operator">:</span>
    <span class="token function">WinSocket</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token operator">~</span><span class="token function">WinSocket</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    bool <span class="token function">Start</span><span class="token punctuation">(</span><span class="token keyword">int</span> port<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">void</span> <span class="token function">Stop</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">const</span><span class="token punctuation">;</span>
    <span class="token punctuation">[</span><span class="token punctuation">[</span>nodiscard<span class="token punctuation">]</span><span class="token punctuation">]</span> SOCKET <span class="token function">Accept</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">const</span><span class="token punctuation">;</span>

private<span class="token operator">:</span>
    SOCKET serverSocket<span class="token punctuation">;</span>

    <span class="token keyword">static</span> bool <span class="token function">Initialize</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">Cleanup</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="winsocketserver-cpp" tabindex="-1"><a class="header-anchor" href="#winsocketserver-cpp" aria-hidden="true">#</a> winSocketServer.cpp</h5><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token comment">//</span>
<span class="token comment">// Created by knight on 2023/9/1.</span>
<span class="token comment">//</span>

<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;winsock.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;iostream&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&quot;winSocketServer.h&quot;</span></span>

<span class="token class-name">WinSocket</span><span class="token double-colon punctuation">::</span><span class="token function">WinSocket</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token function">serverSocket</span><span class="token punctuation">(</span>INVALID_SOCKET<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token class-name">WinSocket</span><span class="token double-colon punctuation">::</span><span class="token operator">~</span><span class="token function">WinSocket</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">Stop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">bool</span> <span class="token class-name">WinSocket</span><span class="token double-colon punctuation">::</span><span class="token function">Start</span><span class="token punctuation">(</span><span class="token keyword">int</span> port<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">Initialize</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;Failed to initialize winsock&quot;</span> <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    serverSocket <span class="token operator">=</span> <span class="token function">socket</span><span class="token punctuation">(</span>AF_INET<span class="token punctuation">,</span> SOCK_STREAM<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>serverSocket <span class="token operator">==</span> INVALID_SOCKET<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;Failed to create socket&quot;</span> <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
        <span class="token function">Cleanup</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 设置 Socket 地址信息</span>
    sockaddr_in serverAddr<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
    serverAddr<span class="token punctuation">.</span>sin_family <span class="token operator">=</span> AF_INET<span class="token punctuation">;</span>
    serverAddr<span class="token punctuation">.</span>sin_port <span class="token operator">=</span> <span class="token function">htons</span><span class="token punctuation">(</span>port<span class="token punctuation">)</span><span class="token punctuation">;</span>
    serverAddr<span class="token punctuation">.</span>sin_addr<span class="token punctuation">.</span>s_addr <span class="token operator">=</span> INADDR_ANY<span class="token punctuation">;</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">bind</span><span class="token punctuation">(</span>serverSocket<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">sockaddr</span><span class="token operator">*</span><span class="token punctuation">)</span><span class="token operator">&amp;</span>serverAddr<span class="token punctuation">,</span> <span class="token keyword">sizeof</span><span class="token punctuation">(</span>serverAddr<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">==</span> SOCKET_ERROR<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;Failed to bind socket&quot;</span> <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
        <span class="token function">Cleanup</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">listen</span><span class="token punctuation">(</span>serverSocket<span class="token punctuation">,</span> SOMAXCONN<span class="token punctuation">)</span> <span class="token operator">==</span> SOCKET_ERROR<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;Failed to listen&quot;</span> <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
        <span class="token function">Cleanup</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;Server started, waiting for client connections...&quot;</span> <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">void</span> <span class="token class-name">WinSocket</span><span class="token double-colon punctuation">::</span><span class="token function">Stop</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">const</span> <span class="token punctuation">{</span>
    <span class="token function">closesocket</span><span class="token punctuation">(</span>serverSocket<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">Cleanup</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">bool</span> <span class="token class-name">WinSocket</span><span class="token double-colon punctuation">::</span><span class="token function">Initialize</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    WSADATA wsaData<span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token function">WSAStartup</span><span class="token punctuation">(</span><span class="token function">MAKEWORD</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>wsaData<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">void</span> <span class="token class-name">WinSocket</span><span class="token double-colon punctuation">::</span><span class="token function">Cleanup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">WSACleanup</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

SOCKET <span class="token class-name">WinSocket</span><span class="token double-colon punctuation">::</span><span class="token function">Accept</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">const</span> <span class="token punctuation">{</span>
    SOCKET clientSocket <span class="token operator">=</span> <span class="token function">accept</span><span class="token punctuation">(</span>serverSocket<span class="token punctuation">,</span> <span class="token keyword">nullptr</span><span class="token punctuation">,</span> <span class="token keyword">nullptr</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>clientSocket <span class="token operator">==</span> INVALID_SOCKET<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> INVALID_SOCKET<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> clientSocket<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="main" tabindex="-1"><a class="header-anchor" href="#main" aria-hidden="true">#</a> main</h5><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 初始化serverSocket</span>
    <span class="token keyword">bool</span> startSocketFlag <span class="token operator">=</span> winSocket<span class="token punctuation">.</span><span class="token function">Start</span><span class="token punctuation">(</span>端口号<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>startSocketFlag<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
	<span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        SOCKET clientSocket <span class="token operator">=</span> winSocket<span class="token punctuation">.</span><span class="token function">Accept</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>clientSocket <span class="token operator">==</span> INVALID_SOCKET<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">continue</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// todo 处理与客户端的数据交互</span>

        <span class="token function">closesocket</span><span class="token punctuation">(</span>clientSocket<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="如何对tcp链接身份进行认证" tabindex="-1"><a class="header-anchor" href="#如何对tcp链接身份进行认证" aria-hidden="true">#</a> 如何对tcp链接身份进行认证？</h5><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token comment">/**
 * 身份认证信息读取
 * @param clientSocket
 * @return 身份认证信息字符串标识
 */</span>
std<span class="token double-colon punctuation">::</span>string <span class="token function">identity</span><span class="token punctuation">(</span>SOCKET clientSocket<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">char</span> identityBuffer<span class="token punctuation">[</span><span class="token number">10</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token function">memset</span><span class="token punctuation">(</span>identityBuffer<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token keyword">sizeof</span><span class="token punctuation">(</span>identityBuffer<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">recv</span><span class="token punctuation">(</span>clientSocket<span class="token punctuation">,</span> identityBuffer<span class="token punctuation">,</span> <span class="token keyword">sizeof</span><span class="token punctuation">(</span>identityBuffer<span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    std<span class="token double-colon punctuation">::</span>string <span class="token function">identityStr</span><span class="token punctuation">(</span>identityBuffer<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> identityStr<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="如何处理tcp粘包" tabindex="-1"><a class="header-anchor" href="#如何处理tcp粘包" aria-hidden="true">#</a> 如何处理tcp粘包？</h5><blockquote><p>规定每包的长度与头尾</p></blockquote><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token keyword">const</span> <span class="token keyword">int</span> PACKET_LENGTH <span class="token operator">=</span> <span class="token number">2407</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> <span class="token keyword">char</span> PACKET_START<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token number">0x4d</span><span class="token punctuation">,</span> <span class="token number">0x45</span><span class="token punctuation">,</span> <span class="token number">0x50</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> <span class="token keyword">char</span> PACKET_END<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token number">0x53</span><span class="token punctuation">,</span> <span class="token number">0x4C</span><span class="token punctuation">,</span> <span class="token number">0x44</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">void</span> <span class="token function">packet</span><span class="token punctuation">(</span><span class="token keyword">int</span> clientSocket<span class="token punctuation">)</span> <span class="token punctuation">{</span>
     std<span class="token double-colon punctuation">::</span>vector<span class="token operator">&lt;</span><span class="token keyword">char</span><span class="token operator">&gt;</span> <span class="token function">buffer</span><span class="token punctuation">(</span>PACKET_LENGTH<span class="token punctuation">)</span><span class="token punctuation">;</span>
     std<span class="token double-colon punctuation">::</span>vector<span class="token operator">&lt;</span><span class="token keyword">char</span><span class="token operator">&gt;</span> receivedData<span class="token punctuation">;</span>
     <span class="token keyword">int</span> dataSize <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    
     <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> bytesRead <span class="token operator">=</span> <span class="token function">recv</span><span class="token punctuation">(</span>clientSocket<span class="token punctuation">,</span> buffer<span class="token punctuation">.</span><span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> PACKET_LENGTH<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>bytesRead <span class="token operator">&lt;=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">break</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// 追加接收到的数据到 receivedData</span>
        receivedData<span class="token punctuation">.</span><span class="token function">insert</span><span class="token punctuation">(</span>receivedData<span class="token punctuation">.</span><span class="token function">end</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> buffer<span class="token punctuation">.</span><span class="token function">begin</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> buffer<span class="token punctuation">.</span><span class="token function">begin</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> bytesRead<span class="token punctuation">)</span><span class="token punctuation">;</span>
        dataSize <span class="token operator">+=</span> bytesRead<span class="token punctuation">;</span>
        <span class="token comment">// 查找完整的包</span>
        <span class="token keyword">int</span> headerIndex<span class="token punctuation">;</span>  <span class="token comment">// 头部索引，用于记录找到的包的起始位置</span>
        <span class="token keyword">int</span> packetSize<span class="token punctuation">;</span>  <span class="token comment">// 包大小，用于记录找到的包的长度</span>
        <span class="token comment">// // 如果数据大小比包长度小则继续接收</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>dataSize <span class="token operator">&lt;</span> PACKET_LENGTH<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">continue</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// 查找完整的包</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> dataSize <span class="token operator">-</span> PACKET_LENGTH<span class="token punctuation">;</span> <span class="token operator">++</span>i<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>receivedData<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">==</span> PACKET_START<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> receivedData<span class="token punctuation">[</span>i <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">==</span> PACKET_START<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span>
                receivedData<span class="token punctuation">[</span>i <span class="token operator">+</span> <span class="token number">2</span><span class="token punctuation">]</span> <span class="token operator">==</span> PACKET_START<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">// 找到了包起始位置</span>
                headerIndex <span class="token operator">=</span> i<span class="token punctuation">;</span>
                packetSize <span class="token operator">=</span> i <span class="token operator">+</span> PACKET_LENGTH<span class="token punctuation">;</span>

                <span class="token comment">// 在剩余数据中查找结束标记</span>
                <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> j <span class="token operator">=</span> packetSize<span class="token punctuation">;</span> j <span class="token operator">&lt;=</span> dataSize <span class="token operator">-</span> PACKET_LENGTH<span class="token punctuation">;</span> <span class="token operator">++</span>j<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token keyword">if</span> <span class="token punctuation">(</span>receivedData<span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">==</span> PACKET_END<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> receivedData<span class="token punctuation">[</span>j <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">==</span> PACKET_END<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span>
                        receivedData<span class="token punctuation">[</span>j <span class="token operator">+</span> <span class="token number">2</span><span class="token punctuation">]</span> <span class="token operator">==</span> PACKET_END<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        <span class="token comment">// 找到了包的结束标记</span>
                        packetSize <span class="token operator">=</span> j <span class="token operator">+</span> PACKET_LENGTH<span class="token punctuation">;</span>
                        <span class="token keyword">break</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>

                <span class="token comment">// 处理完整的包</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>packetSize <span class="token operator">-</span> headerIndex <span class="token operator">==</span> PACKET_LENGTH<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    
                    <span class="token comment">// todo 处理接收到的包数据</span>
                    
                    <span class="token comment">// 更新接收到的数据和数据大小</span>
                    receivedData<span class="token punctuation">.</span><span class="token function">erase</span><span class="token punctuation">(</span>receivedData<span class="token punctuation">.</span><span class="token function">begin</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> receivedData<span class="token punctuation">.</span><span class="token function">begin</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> packetSize<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    dataSize <span class="token operator">=</span> <span class="token generic-function"><span class="token function">static_cast</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token keyword">int</span><span class="token operator">&gt;</span></span></span><span class="token punctuation">(</span>receivedData<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
					
                    <span class="token comment">// 如果处理完数据比包长度小则结束该循环</span>
                    <span class="token keyword">if</span> <span class="token punctuation">(</span>dataSize <span class="token operator">&lt;</span> PACKET_LENGTH<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        <span class="token keyword">break</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>

                    <span class="token comment">// 重新检查剩余数据中是否存在完整的包</span>
                    i <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
     <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,12),o=[e];function c(i,l){return s(),a("div",null,o)}const k=n(p,[["render",c],["__file","winsock.html.vue"]]);export{k as default};
