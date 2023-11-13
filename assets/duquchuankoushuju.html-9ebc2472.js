import{_ as n,o as s,c as a,b as p}from"./app-8a583c06.js";const t={},e=p(`<div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token comment">//</span>
<span class="token comment">// Created by knight on 2023/11/10.</span>
<span class="token comment">//</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;windows.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;iostream&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;vector&gt;</span></span>

<span class="token comment">// 设置开始标识位</span>
<span class="token keyword">const</span> <span class="token keyword">char</span> PACKET_START<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token number">0x4d</span><span class="token punctuation">,</span> <span class="token number">0x45</span><span class="token punctuation">,</span> <span class="token number">0x50</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> <span class="token keyword">char</span> PACKET_START_LENGTH <span class="token operator">=</span> <span class="token keyword">sizeof</span><span class="token punctuation">(</span>PACKET_START<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 设置结束标识位</span>
<span class="token keyword">const</span> <span class="token keyword">char</span> PACKET_END<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token number">0x53</span><span class="token punctuation">,</span> <span class="token number">0x4C</span><span class="token punctuation">,</span> <span class="token number">0x44</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> <span class="token keyword">char</span> PACKET_END_LENGTH <span class="token operator">=</span> <span class="token keyword">sizeof</span><span class="token punctuation">(</span>PACKET_END<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> <span class="token keyword">int</span> PACKET_LENGTH <span class="token operator">=</span> <span class="token number">1207</span><span class="token punctuation">;</span>


<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token keyword">int</span> argc<span class="token punctuation">,</span> <span class="token keyword">char</span> <span class="token operator">*</span>argv<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 创建串口句柄</span>
    HANDLE serialHandle <span class="token operator">=</span> <span class="token function">CreateFile</span><span class="token punctuation">(</span><span class="token string">&quot;COM4&quot;</span><span class="token punctuation">,</span> GENERIC_READ<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">,</span> OPEN_EXISTING<span class="token punctuation">,</span> FILE_ATTRIBUTE_NORMAL<span class="token punctuation">,</span>
                                     <span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>serialHandle <span class="token operator">==</span> INVALID_HANDLE_VALUE<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;Failed to open serial port.&quot;</span> <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    DCB dcbSerialParams <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token number">0</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token comment">// 设置结构体长度</span>
    dcbSerialParams<span class="token punctuation">.</span>DCBlength <span class="token operator">=</span> <span class="token keyword">sizeof</span><span class="token punctuation">(</span>dcbSerialParams<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 使用GetCommState函数获取当前串口的配置参数，并将其存储到dcbSerialParams中</span>
    <span class="token function">GetCommState</span><span class="token punctuation">(</span>serialHandle<span class="token punctuation">,</span> <span class="token operator">&amp;</span>dcbSerialParams<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 设置串口的波特率为921600，即设置通信速率为921600 bps</span>
    dcbSerialParams<span class="token punctuation">.</span>BaudRate <span class="token operator">=</span> <span class="token number">921600</span><span class="token punctuation">;</span>
    <span class="token comment">// 将数据位设置为8位</span>
    dcbSerialParams<span class="token punctuation">.</span>ByteSize <span class="token operator">=</span> <span class="token number">8</span><span class="token punctuation">;</span>
    <span class="token comment">// 设置停止位为1.5个位</span>
    dcbSerialParams<span class="token punctuation">.</span>StopBits <span class="token operator">=</span> ONE5STOPBITS<span class="token punctuation">;</span>
    <span class="token comment">// 设置奇偶校验位为无校验。</span>
    dcbSerialParams<span class="token punctuation">.</span>Parity <span class="token operator">=</span> NOPARITY<span class="token punctuation">;</span>

    <span class="token comment">// 将配置好的参数应用到串口</span>
    <span class="token function">SetCommState</span><span class="token punctuation">(</span>serialHandle<span class="token punctuation">,</span> <span class="token operator">&amp;</span>dcbSerialParams<span class="token punctuation">)</span><span class="token punctuation">;</span>

    DWORD bytesRead<span class="token punctuation">;</span>

    std<span class="token double-colon punctuation">::</span>vector<span class="token operator">&lt;</span><span class="token keyword">char</span><span class="token operator">&gt;</span> receivedData<span class="token punctuation">;</span>
    <span class="token keyword">int</span> dataSize <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

    std<span class="token double-colon punctuation">::</span>vector<span class="token operator">&lt;</span><span class="token keyword">char</span><span class="token operator">&gt;</span> <span class="token function">buffer</span><span class="token punctuation">(</span>PACKET_LENGTH<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token function">ReadFile</span><span class="token punctuation">(</span>serialHandle<span class="token punctuation">,</span> buffer<span class="token punctuation">.</span><span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> PACKET_LENGTH<span class="token punctuation">,</span> <span class="token operator">&amp;</span>bytesRead<span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 追加接收到的数据到 receivedData</span>
        receivedData<span class="token punctuation">.</span><span class="token function">insert</span><span class="token punctuation">(</span>receivedData<span class="token punctuation">.</span><span class="token function">end</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> buffer<span class="token punctuation">.</span><span class="token function">begin</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> buffer<span class="token punctuation">.</span><span class="token function">begin</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> bytesRead<span class="token punctuation">)</span><span class="token punctuation">;</span>
        dataSize <span class="token operator">+=</span> <span class="token generic-function"><span class="token function">static_cast</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token keyword">int</span><span class="token operator">&gt;</span></span></span><span class="token punctuation">(</span>bytesRead<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 查找完整的包</span>
        <span class="token keyword">int</span> headerIndex<span class="token punctuation">;</span>  <span class="token comment">// 头部索引，用于记录找到的包的起始位置</span>
        <span class="token keyword">int</span> packetSize<span class="token punctuation">;</span>  <span class="token comment">// 包大小，用于记录找到的包的长度</span>

        <span class="token comment">// 如果数据大小比包长度小则继续接收</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>dataSize <span class="token operator">&lt;</span> PACKET_LENGTH<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">continue</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 查找完整的包</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> dataSize <span class="token operator">-</span> PACKET_LENGTH<span class="token punctuation">;</span> <span class="token operator">++</span>i<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>receivedData<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">!=</span> PACKET_START<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">||</span> receivedData<span class="token punctuation">[</span>i <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">!=</span> PACKET_START<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">||</span>
                receivedData<span class="token punctuation">[</span>i <span class="token operator">+</span> <span class="token number">2</span><span class="token punctuation">]</span> <span class="token operator">!=</span> PACKET_START<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">continue</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

            <span class="token comment">// 包起始位置</span>
            headerIndex <span class="token operator">=</span> i<span class="token punctuation">;</span>
            packetSize <span class="token operator">=</span> i <span class="token operator">+</span> PACKET_LENGTH<span class="token punctuation">;</span>

            <span class="token comment">// 在剩余数据中查找结束标记</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> j <span class="token operator">=</span> packetSize<span class="token punctuation">;</span> j <span class="token operator">&lt;=</span> dataSize <span class="token operator">-</span> PACKET_LENGTH<span class="token punctuation">;</span> <span class="token operator">++</span>j<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>receivedData<span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">==</span> PACKET_END<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> receivedData<span class="token punctuation">[</span>j <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">==</span> PACKET_END<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span>
                    receivedData<span class="token punctuation">[</span>j <span class="token operator">+</span> <span class="token number">2</span><span class="token punctuation">]</span> <span class="token operator">==</span> PACKET_END<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token comment">// 包结束标记</span>
                    packetSize <span class="token operator">=</span> j <span class="token operator">+</span> PACKET_LENGTH<span class="token punctuation">;</span>
                    <span class="token keyword">break</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>

            <span class="token keyword">if</span> <span class="token punctuation">(</span>packetSize <span class="token operator">-</span> headerIndex <span class="token operator">==</span> PACKET_LENGTH<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">// 获取去除头尾的数据包</span>
                std<span class="token double-colon punctuation">::</span>vector<span class="token operator">&lt;</span><span class="token keyword">char</span><span class="token operator">&gt;</span> <span class="token function">packet</span><span class="token punctuation">(</span>receivedData<span class="token punctuation">.</span><span class="token function">begin</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> headerIndex <span class="token operator">+</span> PACKET_START_LENGTH<span class="token punctuation">,</span>
                                         receivedData<span class="token punctuation">.</span><span class="token function">begin</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> packetSize <span class="token operator">-</span> PACKET_END_LENGTH<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token comment">// todo 处理数据包</span>

                dataSize <span class="token operator">=</span> <span class="token generic-function"><span class="token function">static_cast</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token keyword">int</span><span class="token operator">&gt;</span></span></span><span class="token punctuation">(</span>receivedData<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

                <span class="token keyword">if</span> <span class="token punctuation">(</span>dataSize <span class="token operator">&lt;</span> PACKET_LENGTH<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token keyword">break</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>

            <span class="token comment">// 移除处理过的当前包</span>
            receivedData<span class="token punctuation">.</span><span class="token function">erase</span><span class="token punctuation">(</span>receivedData<span class="token punctuation">.</span><span class="token function">begin</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> receivedData<span class="token punctuation">.</span><span class="token function">begin</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> packetSize<span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">// 重新检查剩余数据中是否存在完整的包</span>
            i <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1),o=[e];function c(l,i){return s(),a("div",null,o)}const k=n(t,[["render",c],["__file","duquchuankoushuju.html.vue"]]);export{k as default};
