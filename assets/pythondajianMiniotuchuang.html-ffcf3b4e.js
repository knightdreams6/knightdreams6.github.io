import{_ as n,o as s,c as a,b as t}from"./app-d26df8f0.js";const p={},e=t(`<h4 id="minioupload-py" tabindex="-1"><a class="header-anchor" href="#minioupload-py" aria-hidden="true">#</a> minioUpload.py</h4><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>
<span class="token keyword">import</span> os
<span class="token keyword">import</span> time
<span class="token keyword">import</span> uuid
<span class="token keyword">import</span> sys
<span class="token keyword">from</span> minio <span class="token keyword">import</span> Minio
<span class="token keyword">from</span> minio<span class="token punctuation">.</span>error <span class="token keyword">import</span> MinioException
<span class="token keyword">import</span> warnings
<span class="token keyword">import</span> urllib<span class="token punctuation">.</span>request

warnings<span class="token punctuation">.</span>filterwarnings<span class="token punctuation">(</span><span class="token string">&#39;ignore&#39;</span><span class="token punctuation">)</span>
images <span class="token operator">=</span> sys<span class="token punctuation">.</span>argv<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">:</span><span class="token punctuation">]</span>
<span class="token comment"># Minio url</span>
minioHost <span class="token operator">=</span> <span class="token string">&quot;修改为你的minio地址&quot;</span>
<span class="token comment"># 桶名称</span>
bucketName <span class="token operator">=</span> <span class="token string">&quot;blog&quot;</span>
<span class="token comment"># 桶地址</span>
imageBucket <span class="token operator">=</span> <span class="token string">&quot;http://&quot;</span> <span class="token operator">+</span> minioHost <span class="token operator">+</span> <span class="token string">&quot;/&quot;</span> <span class="token operator">+</span> bucketName <span class="token operator">+</span> <span class="token string">&quot;/&quot;</span>
<span class="token comment"># 桶内分组</span>
name <span class="token operator">=</span> <span class="token string">&#39;&#39;</span>
<span class="token comment"># 当前日期</span>
date <span class="token operator">=</span> time<span class="token punctuation">.</span>strftime<span class="token punctuation">(</span><span class="token string">&quot;%Y%m&quot;</span><span class="token punctuation">,</span> time<span class="token punctuation">.</span>localtime<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment"># 最终链接地址前缀</span>
finalUrlPreSuffix <span class="token operator">=</span> imageBucket <span class="token operator">+</span> name <span class="token operator">+</span> <span class="token string">&quot;/&quot;</span> <span class="token operator">+</span> date <span class="token operator">+</span> <span class="token string">&quot;/&quot;</span>
<span class="token comment"># 临时路径</span>
tempPath <span class="token operator">=</span> os<span class="token punctuation">.</span>getcwd<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;/temp/&quot;</span>

<span class="token comment"># secure为True的话第一项会填充为https://</span>
minioClient <span class="token operator">=</span> Minio<span class="token punctuation">(</span>minioHost<span class="token punctuation">,</span>
                    access_key<span class="token operator">=</span><span class="token string">&#39;minioadmin&#39;</span><span class="token punctuation">,</span> secret_key<span class="token operator">=</span><span class="token string">&#39;minioadmin&#39;</span><span class="token punctuation">,</span> secure<span class="token operator">=</span><span class="token boolean">False</span><span class="token punctuation">)</span>
result <span class="token operator">=</span> <span class="token string">&quot;Upload Success:\\n&quot;</span>


<span class="token comment"># 下载网络图片到本地</span>
<span class="token keyword">def</span> <span class="token function">download</span><span class="token punctuation">(</span>image_url<span class="token punctuation">)</span><span class="token punctuation">:</span>
    local_path <span class="token operator">=</span> tempPath <span class="token operator">+</span> image_url<span class="token punctuation">.</span>split<span class="token punctuation">(</span><span class="token string">&#39;/&#39;</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span>
    urllib<span class="token punctuation">.</span>request<span class="token punctuation">.</span>urlretrieve<span class="token punctuation">(</span>image_url<span class="token punctuation">,</span> local_path<span class="token punctuation">)</span>
    <span class="token keyword">return</span> local_path


<span class="token comment"># 　循环上传文件</span>
<span class="token keyword">for</span> image <span class="token keyword">in</span> images<span class="token punctuation">:</span>
    <span class="token keyword">if</span> os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>isfile<span class="token punctuation">(</span>image<span class="token punctuation">)</span><span class="token punctuation">:</span>
        file_type <span class="token operator">=</span> os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>splitext<span class="token punctuation">(</span>image<span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span>
        new_file_name <span class="token operator">=</span> <span class="token builtin">str</span><span class="token punctuation">(</span>uuid<span class="token punctuation">.</span>uuid1<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span>replace<span class="token punctuation">(</span><span class="token string">&#39;-&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">)</span> <span class="token operator">+</span> file_type
    <span class="token comment"># 处理网络图片</span>
    <span class="token keyword">elif</span> image<span class="token punctuation">.</span>startswith<span class="token punctuation">(</span><span class="token string">&quot;https://&quot;</span><span class="token punctuation">)</span> <span class="token keyword">or</span> image<span class="token punctuation">.</span>startswith<span class="token punctuation">(</span><span class="token string">&quot;http://&quot;</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">if</span> image<span class="token punctuation">.</span>endswith<span class="token punctuation">(</span><span class="token string">&quot;.png&quot;</span><span class="token punctuation">)</span> <span class="token keyword">or</span> image<span class="token punctuation">.</span>endswith<span class="token punctuation">(</span><span class="token string">&quot;.jpg&quot;</span><span class="token punctuation">)</span> <span class="token keyword">or</span> image<span class="token punctuation">.</span>endswith<span class="token punctuation">(</span><span class="token string">&quot;.jpeg&quot;</span><span class="token punctuation">)</span> <span class="token keyword">or</span> image<span class="token punctuation">.</span>endswith<span class="token punctuation">(</span><span class="token string">&quot;.gif&quot;</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
            url <span class="token operator">=</span> image<span class="token punctuation">.</span>split<span class="token punctuation">(</span><span class="token string">&quot;/&quot;</span><span class="token punctuation">)</span>
            <span class="token keyword">if</span> <span class="token builtin">len</span><span class="token punctuation">(</span>url<span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token number">1</span><span class="token punctuation">:</span>
                <span class="token comment"># 先把网图下载到本地</span>
                image <span class="token operator">=</span> download<span class="token punctuation">(</span>image<span class="token punctuation">)</span>
                new_file_name <span class="token operator">=</span> url<span class="token punctuation">[</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span>
            <span class="token keyword">else</span><span class="token punctuation">:</span>
                result <span class="token operator">=</span> result <span class="token operator">+</span> <span class="token string">&quot;error: file path is invalid!&quot;</span>
                <span class="token keyword">continue</span>
        <span class="token keyword">else</span><span class="token punctuation">:</span>
            result <span class="token operator">=</span> result <span class="token operator">+</span> <span class="token string">&quot;error: script code supports .png .jpg .jpeg .gif files!&quot;</span>
            <span class="token keyword">continue</span>
    <span class="token keyword">else</span><span class="token punctuation">:</span>
        result <span class="token operator">=</span> result <span class="token operator">+</span> <span class="token string">&quot;error: image is not a file and does not start with https or http!&quot;</span>
        <span class="token keyword">continue</span>
    <span class="token keyword">try</span><span class="token punctuation">:</span>
        minioClient<span class="token punctuation">.</span>fput_object<span class="token punctuation">(</span>bucket_name<span class="token operator">=</span>bucketName<span class="token punctuation">,</span> object_name<span class="token operator">=</span>name <span class="token operator">+</span> <span class="token string">&quot;/&quot;</span> <span class="token operator">+</span> date <span class="token operator">+</span> <span class="token string">&quot;/&quot;</span> <span class="token operator">+</span> new_file_name<span class="token punctuation">,</span>
                                file_path<span class="token operator">=</span>image<span class="token punctuation">)</span>
        <span class="token keyword">if</span> image<span class="token punctuation">.</span>__contains__<span class="token punctuation">(</span>tempPath<span class="token punctuation">)</span><span class="token punctuation">:</span>
            <span class="token comment"># 删除临时图片</span>
            os<span class="token punctuation">.</span>remove<span class="token punctuation">(</span>image<span class="token punctuation">)</span>
        result <span class="token operator">=</span> result <span class="token operator">+</span> finalUrlPreSuffix <span class="token operator">+</span> new_file_name <span class="token operator">+</span> <span class="token string">&quot;\\n&quot;</span>
    <span class="token keyword">except</span> MinioException <span class="token keyword">as</span> err<span class="token punctuation">:</span>
        result <span class="token operator">=</span> result <span class="token operator">+</span> <span class="token string">&quot;error: minio upload exception \\n&quot;</span>

<span class="token keyword">print</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),o=[e];function i(c,l){return s(),a("div",null,o)}const r=n(p,[["render",i],["__file","pythondajianMiniotuchuang.html.vue"]]);export{r as default};
