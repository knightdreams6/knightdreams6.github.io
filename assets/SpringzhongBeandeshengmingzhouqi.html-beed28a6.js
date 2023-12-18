import{_ as n,o as s,c as a,b as e}from"./app-c5e7af21.js";const t={},p=e(`<h4 id="基础知识补充" tabindex="-1"><a class="header-anchor" href="#基础知识补充" aria-hidden="true">#</a> 基础知识补充</h4><h5 id="bean创建的三个阶段" tabindex="-1"><a class="header-anchor" href="#bean创建的三个阶段" aria-hidden="true">#</a> Bean创建的三个阶段</h5><blockquote><p>Spring在创建一个Bean时是分为三个步骤的</p></blockquote><ul><li>实例化（可以理解为new一个对象）</li><li>属性注入（可以理解为调用setter方法完成属性注入）</li><li>初始化（可以按照Spring规则配置一些初始化的方法，例如 <code>@PostConstruct</code>注解）</li></ul><h5 id="生命周期的概念" tabindex="-1"><a class="header-anchor" href="#生命周期的概念" aria-hidden="true">#</a> 生命周期的概念</h5><blockquote><p>Bean的生命周期指的就是在上面三个步骤中后置处理器<code>BeanPostprocessor</code>穿插执行的过程</p></blockquote><h5 id="后置处理器的分析" tabindex="-1"><a class="header-anchor" href="#后置处理器的分析" aria-hidden="true">#</a> 后置处理器的分析</h5><p>按照接口进行分类</p><ol><li><p><code>BeanPostProcessor</code>接口</p><blockquote><p>最简单的后置处理器，这种后置处理器只能在初始化前后执行</p></blockquote><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">BeanPostProcessor</span> <span class="token punctuation">{</span>
    
 <span class="token comment">// 初始化前执行的方法</span>
 <span class="token annotation punctuation">@Nullable</span>
 <span class="token keyword">default</span> <span class="token class-name">Object</span> <span class="token function">postProcessBeforeInitialization</span><span class="token punctuation">(</span><span class="token class-name">Object</span> bean<span class="token punctuation">,</span> <span class="token class-name">String</span> beanName<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">BeansException</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> bean<span class="token punctuation">;</span>
 <span class="token punctuation">}</span>    
    
 <span class="token comment">// 初始化后执行的方法</span>
 <span class="token keyword">default</span> <span class="token class-name">Object</span> <span class="token function">postProcessAfterInitialization</span><span class="token punctuation">(</span><span class="token class-name">Object</span> bean<span class="token punctuation">,</span> <span class="token class-name">String</span> beanName<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">BeansException</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> bean<span class="token punctuation">;</span>
 <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p><code>InstantiationAwareBeanPostProcessor</code>接口</p><blockquote><p>在第一种后置处理的基础上进行了一层扩展，可以在Bean的实例化阶段前后执行</p></blockquote><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// 继承了BeanPostProcessor，额外提供了两个方法用于在实例化前后的阶段执行</span>
<span class="token comment">// 因为实例化后紧接着就要进行属性注入，所以这个接口中还提供了一个属性注入的方法</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">InstantiationAwareBeanPostProcessor</span> <span class="token keyword">extends</span> <span class="token class-name">BeanPostProcessor</span> <span class="token punctuation">{</span>
 
    <span class="token comment">// 实例化前执行</span>
	<span class="token annotation punctuation">@Nullable</span>
	<span class="token keyword">default</span> <span class="token class-name">Object</span> <span class="token function">postProcessBeforeInstantiation</span><span class="token punctuation">(</span><span class="token class-name">Class</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span></span> beanClass<span class="token punctuation">,</span> <span class="token class-name">String</span> beanName<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">BeansException</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
 
    <span class="token comment">// 实例化后置</span>
	<span class="token keyword">default</span> <span class="token keyword">boolean</span> <span class="token function">postProcessAfterInstantiation</span><span class="token punctuation">(</span><span class="token class-name">Object</span> bean<span class="token punctuation">,</span> <span class="token class-name">String</span> beanName<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">BeansException</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
    
    <span class="token comment">// 属性注入</span>
	<span class="token annotation punctuation">@Nullable</span>
	<span class="token keyword">default</span> <span class="token class-name">PropertyValues</span> <span class="token function">postProcessProperties</span><span class="token punctuation">(</span><span class="token class-name">PropertyValues</span> pvs<span class="token punctuation">,</span> <span class="token class-name">Object</span> bean<span class="token punctuation">,</span> <span class="token class-name">String</span> beanName<span class="token punctuation">)</span>
			<span class="token keyword">throws</span> <span class="token class-name">BeansException</span> <span class="token punctuation">{</span>

		<span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
    
    <span class="token annotation punctuation">@Deprecated</span>
	<span class="token annotation punctuation">@Nullable</span>
	<span class="token keyword">default</span> <span class="token class-name">PropertyValues</span> <span class="token function">postProcessPropertyValues</span><span class="token punctuation">(</span>
			<span class="token class-name">PropertyValues</span> pvs<span class="token punctuation">,</span> <span class="token class-name">PropertyDescriptor</span><span class="token punctuation">[</span><span class="token punctuation">]</span> pds<span class="token punctuation">,</span> <span class="token class-name">Object</span> bean<span class="token punctuation">,</span> <span class="token class-name">String</span> beanName<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">BeansException</span> <span class="token punctuation">{</span>

		<span class="token keyword">return</span> pvs<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>Spring 内部专用的后置处理器 <code>SmartInstantiationAwareBeanPostProcessor </code>接口</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">SmartInstantiationAwareBeanPostProcessor</span> <span class="token keyword">extends</span> <span class="token class-name">InstantiationAwareBeanPostProcessor</span> <span class="token punctuation">{</span>
 
    <span class="token comment">// 推测bean的类型，例如在属性注入阶段我们就需要知道符合依赖类型的Bean有哪些</span>
    <span class="token annotation punctuation">@Nullable</span>
    <span class="token keyword">default</span> <span class="token class-name">Class</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span></span> <span class="token function">predictBeanType</span><span class="token punctuation">(</span><span class="token class-name">Class</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span></span> beanClass<span class="token punctuation">,</span> <span class="token class-name">String</span> beanName<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">BeansException</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
 
    <span class="token comment">// 推断出所有符合要求的构造函数，在实例化对象的时候我们就需要明确到底使用哪个构造函数</span>
    <span class="token annotation punctuation">@Nullable</span>
    <span class="token keyword">default</span> <span class="token class-name">Constructor</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token function">determineCandidateConstructors</span><span class="token punctuation">(</span><span class="token class-name">Class</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span></span> beanClass<span class="token punctuation">,</span> <span class="token class-name">String</span> beanName<span class="token punctuation">)</span>
        <span class="token keyword">throws</span> <span class="token class-name">BeansException</span> <span class="token punctuation">{</span>

        <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
 
    <span class="token comment">// 获取一个提前暴露的对象，用于解决循环依赖</span>
    <span class="token keyword">default</span> <span class="token class-name">Object</span> <span class="token function">getEarlyBeanReference</span><span class="token punctuation">(</span><span class="token class-name">Object</span> bean<span class="token punctuation">,</span> <span class="token class-name">String</span> beanName<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">BeansException</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> bean<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>一般我们在探究生命周期的时候都不会考虑这种后置处理器的执行</p></li></ol>`,9),c=[p];function o(l,i){return s(),a("div",null,c)}const r=n(t,[["render",o],["__file","SpringzhongBeandeshengmingzhouqi.html.vue"]]);export{r as default};
