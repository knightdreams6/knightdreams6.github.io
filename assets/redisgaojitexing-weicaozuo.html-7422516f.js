import{_ as n,o as s,c as a,b as e}from"./app-d26df8f0.js";const i={},t=e(`<h3 id="redis位操作" tabindex="-1"><a class="header-anchor" href="#redis位操作" aria-hidden="true">#</a> redis位操作</h3><blockquote><p>reids位操作也叫位数组操作、bitmap</p><p>它提供了SETBIT、GETBIT、BITCOUNT、BITTOP四个命令用于操作二进制位数组。</p></blockquote><h5 id="setbit" tabindex="-1"><a class="header-anchor" href="#setbit" aria-hidden="true">#</a> SETBIT</h5><p>语法：<code>SETBIT key offset value</code></p><p><code>setbit</code>命令用于写入位数组指定偏移量的二进制位设置值,偏移量从0开始计数，且只允许写入1或者0，如果写入非0和1的值则写入失败：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> setbit bitkey <span class="token number">0</span> <span class="token number">1</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">0</span>
<span class="token comment"># 数据存储为: 0000 0001</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> setbit bitkey <span class="token number">10</span> <span class="token number">1</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">0</span>
<span class="token comment"># 数据存储为: 0000 0100 0000 0001</span>

<span class="token comment"># 写入非0/1的值</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> setbit key2 <span class="token number">0</span> <span class="token number">2</span>
<span class="token punctuation">(</span>error<span class="token punctuation">)</span> ERR bit is not an integer or out of range
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="getbit" tabindex="-1"><a class="header-anchor" href="#getbit" aria-hidden="true">#</a> GETBIT</h5><p>语法：<code>GETBIT key offset</code> 即：命令key的偏移量</p><p>gitbit命令用于获取位数组指定偏移量上的二进制值：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> getbit bitkey <span class="token number">0</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">1</span>
<span class="token comment"># 数据存储如下</span>
<span class="token comment"># 0000 0001</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="bitcount" tabindex="-1"><a class="header-anchor" href="#bitcount" aria-hidden="true">#</a> BITCOUNT</h5><p>语法：<code>BITCOUNT key</code></p><p>bitcount命令用于获取指定key的位数组中值为1的二进制位的数量，之前我们写入了偏移量0的值为1，偏移量10 的值为1，偏移量8的值为0：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> bitcount bitkey
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">2</span>
<span class="token comment"># 数据存储如下</span>
<span class="token comment"># 0000 0100 0000 0001</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="bitop" tabindex="-1"><a class="header-anchor" href="#bitop" aria-hidden="true">#</a> BITOP</h5><p>语法：<code>BITOP operation destkey key [key...]</code></p><p>即：命令 操作 结果 目标key key1 key2...</p><p>bitop命令可以对多个位数组的key进行and（按位与）、or（按位或）、xor（按位异或）运算，并将运算结果设置到destKey中</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> setbit key1 <span class="token number">0</span> <span class="token number">1</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">1</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> setbit key1 <span class="token number">1</span> <span class="token number">1</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">0</span>
<span class="token comment"># key1 = 0000 0011</span>

<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> setbit key2 <span class="token number">0</span> <span class="token number">0</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">0</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> setbit key2 <span class="token number">2</span> <span class="token number">1</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">0</span>
<span class="token comment"># key2 = 0000 0100</span>

<span class="token comment"># 按位与操作</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> bitop and andKey key1 key2
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">1</span>
<span class="token comment"># key1 0000 0011</span>
<span class="token comment"># key2 0000 0100</span>
<span class="token comment"># andKey 0000 0000</span>

<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> getbit andKey <span class="token number">1</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">0</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="底层数据结构分析" tabindex="-1"><a class="header-anchor" href="#底层数据结构分析" aria-hidden="true">#</a> 底层数据结构分析</h3><blockquote><p>SDS是redis中的一种数据结构，叫做简单动态字符串（Simple Dynamic String），并且是一种二进制安全的，在大多数情况下redis中的字符串都用SDS来存储</p></blockquote><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">struct</span> <span class="token class-name">sdshdr</span> <span class="token punctuation">{</span>
    <span class="token comment">// 记录buff数组中已使用字节的数量</span>
    <span class="token comment">// 也是SDS所保存字符串的长度</span>
    <span class="token keyword">int</span> len<span class="token punctuation">;</span>
    
    <span class="token comment">// 记录buff数组中未使用字节的数量</span>
    <span class="token keyword">int</span> free<span class="token punctuation">;</span>
    
    <span class="token comment">// 字节数组，字符串就存储在这个数组中</span>
    <span class="token keyword">char</span> buff<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>SDS的优点：</p><ul><li>时间复杂度为 O(1)</li><li>杜绝缓冲区溢出</li><li>减少修改字符串长度时所需的内存重分配次数</li><li>二进制安全的api操作</li><li>兼容部分C字符串函数</li></ul><p>redis中的位数组采用的是String字符串数据格式来存储，而字符串对象使用的正是上文说的SDS简单动态字符串数据结构。</p><p>一个字节用的是8个二进制位来存储的，也就是8个0或者1，即一个字节可以存储十进制0~127的数字，也即包含了所有的数字、英文大小写字母以及标点符号。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>1Byte <span class="token operator">=</span> 8bit
1KB <span class="token operator">=</span> 1024Byte
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>位数组在redis的存储中，每一个字节也是8位，初始都是：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>0000 0000
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>而位操作就是在对应的offset偏移量上设置0或者1，比如将第3位设置为1：即</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>0000 <span class="token number">1000</span>
<span class="token comment"># 对应的redis操作</span>
setbit key <span class="token number">3</span> <span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在此基础上，如果要在偏移量为13的位置设置1，即：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>setbit key <span class="token number">13</span> <span class="token number">1</span>
<span class="token comment"># 对应的存储为</span>
0010 0000 0000 <span class="token number">1000</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="时间复杂度" tabindex="-1"><a class="header-anchor" href="#时间复杂度" aria-hidden="true">#</a> 时间复杂度</h3><ul><li>GETBIT 命令时间复杂度为 O(1)</li><li>SETBIT 命令时间复杂度为 O(1)</li><li>BITCOUNT 命令时间复杂度 O(n)</li><li>BITOP 命令时间复杂度 O(n)、O(n2)</li></ul><p>我们来看GETBIT以及SETBIT命令的时间复杂度为什么是O(1)，</p><p>当我们执行一个SETBIT key 10086 1的值的时候，reids的计算方式如下：</p><ol><li>获取到要写入位数组中的哪个字节：10086÷8=1260，需要写入到位数组的下标1260的字节</li><li>获取要写入到这个字节的第几位：10086 mod 8 = 6，需要写入到这个字节的下标为6即第7位上去。</li></ol><p>通过这两种计算方式大家可以清晰的看到，位操作的GETBIT和SETBIT都是常量计算，因此它的时间复杂度为O(1)。</p><p>而BITCOUNT命令需要对整个位数组的所有元素进行遍历算出值为1的有多少个，当然redis对于大数据的bit执行bitcount命令会有一整套复杂的优化的算法，但是核心思路还是这个意思，无非是减少部分遍历查询次数。比如以128位为一次遍历，那么他的遍历次数就是所有的位数除以128。</p><p>BITTOP命令则是根据不同的操作有不同的执行方式。比如AND操作，则需要查看位值为1的即可。</p><h3 id="存储空间计算" tabindex="-1"><a class="header-anchor" href="#存储空间计算" aria-hidden="true">#</a> 存储空间计算</h3><p>根据上面的介绍，相信大家已经知道了基于redis的位数组数据结构存储的数据占用内存大小是怎么计算的了。比如有100亿的数据，那么它需要的字节数组：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>1000000000÷8÷1024÷1024≈119.21MB
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>需要注意的是，如果你的数据量不大，那就不要把起始偏移量搞的很大，这样也是占空间的，比如我们只需要存储几百条数据，但是其中的偏移量却很大，这就会造成了很大的内存空间浪费。</p><h3 id="应用场景" tabindex="-1"><a class="header-anchor" href="#应用场景" aria-hidden="true">#</a> 应用场景</h3><p>实际项目开发中有很多业务都适合采用redis的bit来实现。</p><h5 id="用户签到场景" tabindex="-1"><a class="header-anchor" href="#用户签到场景" aria-hidden="true">#</a> 用户签到场景</h5><p>每天的日期字符串作为一个key，用户Id作为offset，统计每天用户的签到情况，总的用户签到数</p><h5 id="活跃用户数统计" tabindex="-1"><a class="header-anchor" href="#活跃用户数统计" aria-hidden="true">#</a> 活跃用户数统计</h5><p>用户日活、月活、留存率等均可以用redis位数组来存储，还是以每天的日期作为key，用户活跃了就写入offset为用户id的位值1。</p><p>同理月活也是如此。</p><h5 id="用户是否在线以及总在线人数统计" tabindex="-1"><a class="header-anchor" href="#用户是否在线以及总在线人数统计" aria-hidden="true">#</a> 用户是否在线以及总在线人数统计</h5><p>同样是使用一个位数组，用户的id映射偏移量，在线标识为1，下线标识为0。即可实现用户上下线查询和总在线人数的统计</p><h5 id="app内用户的全局消息提示小红点" tabindex="-1"><a class="header-anchor" href="#app内用户的全局消息提示小红点" aria-hidden="true">#</a> APP内用户的全局消息提示小红点</h5><p>现在大多数的APP里都有站内信的功能，当有消息的时候，则提示一个小红点，代表用户有新的消息。</p>`,56),p=[t];function l(c,d){return s(),a("div",null,p)}const o=n(i,[["render",l],["__file","redisgaojitexing-weicaozuo.html.vue"]]);export{o as default};