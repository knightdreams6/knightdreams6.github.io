import{_ as n,o as s,c as a,b as e}from"./app-d8497c2f.js";const t={},o=e(`<h3 id="forkjoinpool" tabindex="-1"><a class="header-anchor" href="#forkjoinpool" aria-hidden="true">#</a> ForkJoinPool</h3><blockquote><p>UML 类图</p></blockquote><p><img src="https://knight-img.oss-cn-beijing.aliyuncs.com/0acfbf5ee6c511eba4cb28d0eaa3d234.png" alt="image-20210708113135389"></p><h4 id="_1-executor" tabindex="-1"><a class="header-anchor" href="#_1-executor" aria-hidden="true">#</a> 1. Executor</h4><p>执行提交的 Runnable 任务的对象。该接口提供了一种将任务提交与每个任务将如果运行的机制分离的方法，包括线程使用、调度等细节。通常使用<code>Executor</code> 而不是显式创建线程。</p><p>反例：为每个任务<code>new Thread(new(RunnableTask())).start()</code></p><p>可以使用 <code>executor.execute(new RunnableTask())</code></p><p><code>Executor</code> 接口并不严格要求执行是异步的，在最简单的情况下，执行者可以立即再调用者的线程中运行提交的任务</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">DirectExecutor</span> <span class="token keyword">implements</span> <span class="token class-name">Executor</span> <span class="token punctuation">{</span>
   <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">execute</span><span class="token punctuation">(</span><span class="token class-name">Runnable</span> r<span class="token punctuation">)</span> <span class="token punctuation">{</span>
     r<span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>更典型的是，任务在调用者线程之外的某个线程中执行。 下面的执行程序为每个任务生成一个新线程。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">ThreadPerTaskExecutor</span> <span class="token keyword">implements</span> <span class="token class-name">Executor</span> <span class="token punctuation">{</span>
   <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">execute</span><span class="token punctuation">(</span><span class="token class-name">Runnable</span> r<span class="token punctuation">)</span> <span class="token punctuation">{</span>
     <span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span>r<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>许多<code>Executor</code>实现对任务的调度方式和时间施加了某种限制。下面的 executor 将任务的提交序列化到第二个 executor</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">SerialExecutor</span> <span class="token keyword">implements</span> <span class="token class-name">Executor</span> <span class="token punctuation">{</span>
   <span class="token keyword">final</span> <span class="token class-name">Queue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Runnable</span><span class="token punctuation">&gt;</span></span> tasks <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayDeque</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Runnable</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token keyword">final</span> <span class="token class-name">Executor</span> executor<span class="token punctuation">;</span>
   <span class="token class-name">Runnable</span> active<span class="token punctuation">;</span>

   <span class="token class-name">SerialExecutor</span><span class="token punctuation">(</span><span class="token class-name">Executor</span> executor<span class="token punctuation">)</span> <span class="token punctuation">{</span>
     <span class="token keyword">this</span><span class="token punctuation">.</span>executor <span class="token operator">=</span> executor<span class="token punctuation">;</span>
   <span class="token punctuation">}</span>

   <span class="token keyword">public</span> <span class="token keyword">synchronized</span> <span class="token keyword">void</span> <span class="token function">execute</span><span class="token punctuation">(</span><span class="token keyword">final</span> <span class="token class-name">Runnable</span> r<span class="token punctuation">)</span> <span class="token punctuation">{</span>
     tasks<span class="token punctuation">.</span><span class="token function">offer</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Runnable</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
       <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
         <span class="token keyword">try</span> <span class="token punctuation">{</span>
           r<span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
         <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
           <span class="token function">scheduleNext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
         <span class="token punctuation">}</span>
       <span class="token punctuation">}</span>
     <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
     <span class="token keyword">if</span> <span class="token punctuation">(</span>active <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
       <span class="token function">scheduleNext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
     <span class="token punctuation">}</span>
   <span class="token punctuation">}</span>

   <span class="token keyword">protected</span> <span class="token keyword">synchronized</span> <span class="token keyword">void</span> <span class="token function">scheduleNext</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
     <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>active <span class="token operator">=</span> tasks<span class="token punctuation">.</span><span class="token function">poll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
       executor<span class="token punctuation">.</span><span class="token function">execute</span><span class="token punctuation">(</span>active<span class="token punctuation">)</span><span class="token punctuation">;</span>
     <span class="token punctuation">}</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>内存一致性影响：在将Runnable对象提交给Executor之前线程中的操作发生在其执行开始之前，可能在另一个线程中</p><h4 id="_2-executorservice" tabindex="-1"><a class="header-anchor" href="#_2-executorservice" aria-hidden="true">#</a> 2. ExecutorService</h4><p>提供了管理和终止的方法和可以生成<code>Future</code>以跟踪一个或多个任务的进度的方法</p><p>ExecutorService可以关闭，这将导致它拒绝新任务。</p><ul><li><p><code>shutdown</code>方法将允许先前提交的任务在终止之前执行</p></li><li><p><code>shutdownNow</code>方法阻止等待任务开始并尝试停止当前正在执行的任务</p><p>终止时，执行器中没有正在执行的任务，没有等待执行的任务，也没有新的任务可以提交。应关闭未使用的<code>ExecutorService</code>以回收资源</p></li></ul><p>方法<code>submit</code>通过创建和返回可用于取消执行和/或等待完成的<code>Future</code>来扩展基本方法<code>Executor.execute(Runnable)</code>。方法<code>invokeAny</code>和<code>invokeAll</code>执行最常用的批量执行形式，执行一组任务，然后等待至少一个或全部完成</p><p><code>Executors</code>类为此包中提供的执行程序服务提供了工厂方法。</p><p>使用示例：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">NetworkService</span> <span class="token keyword">implements</span> <span class="token class-name">Runnable</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">ServerSocket</span> serverSocket<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">ExecutorService</span> pool<span class="token punctuation">;</span>
    
    <span class="token keyword">public</span> <span class="token class-name">NetworkService</span><span class="token punctuation">(</span><span class="token keyword">int</span> port<span class="token punctuation">,</span> <span class="token keyword">int</span> poolSize<span class="token punctuation">)</span>
       <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
     serverSocket <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ServerSocket</span><span class="token punctuation">(</span>port<span class="token punctuation">)</span><span class="token punctuation">;</span>
     pool <span class="token operator">=</span> <span class="token class-name">Executors</span><span class="token punctuation">.</span><span class="token function">newFixedThreadPool</span><span class="token punctuation">(</span>poolSize<span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
    
   <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// run the service</span>
     <span class="token keyword">try</span> <span class="token punctuation">{</span>
       <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
         pool<span class="token punctuation">.</span><span class="token function">execute</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Handler</span><span class="token punctuation">(</span>serverSocket<span class="token punctuation">.</span><span class="token function">accept</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
       <span class="token punctuation">}</span>
     <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">IOException</span> ex<span class="token punctuation">)</span> <span class="token punctuation">{</span>
       pool<span class="token punctuation">.</span><span class="token function">shutdown</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
     <span class="token punctuation">}</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Handler</span> <span class="token keyword">implements</span> <span class="token class-name">Runnable</span> <span class="token punctuation">{</span>
   <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">Socket</span> socket<span class="token punctuation">;</span>
   <span class="token class-name">Handler</span><span class="token punctuation">(</span><span class="token class-name">Socket</span> socket<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">this</span><span class="token punctuation">.</span>socket <span class="token operator">=</span> socket<span class="token punctuation">;</span> <span class="token punctuation">}</span>
   <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
     <span class="token comment">// read and service request on socket</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 以下方法分两个阶段关闭ExecutorService ，首先通过调用shutdown拒绝传入任务，然后在必要时调用shutdownNow取消任何延迟任务：</span>

<span class="token keyword">void</span> <span class="token function">shutdownAndWaitTermination</span><span class="token punctuation">(</span><span class="token class-name">ExecutorService</span> pool<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 禁止提交新任务</span>
    pool<span class="token punctuation">.</span><span class="token function">shutdown</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
        <span class="token comment">// 等待现有任务终止</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>pool<span class="token punctuation">.</span><span class="token function">awaitTermination</span><span class="token punctuation">(</span><span class="token number">60</span><span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">SECONDS</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 取消当前正在执行的任务</span>
            pool<span class="token punctuation">.</span><span class="token function">shutdownNow</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 等待任务响应被取消</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>pool<span class="token punctuation">.</span><span class="token function">awaitTermination</span><span class="token punctuation">(</span><span class="token number">60</span><span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">SECONDS</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            	<span class="token class-name">System</span><span class="token punctuation">.</span>err<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Pool did not terminate&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> ie<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// （重新）取消如果当前线程也被中断</span>
        pool<span class="token punctuation">.</span><span class="token function">shutdownNow</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 保留中断状态</span>
        <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">interrupt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>    
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>内存一致性影响：在将Runnable或Callable任务提交给ExecutorService之前线程中的操作发生在该任务采取的任何操作之前，而后者又发生在通过Future.get()检索结果之前。</p><h4 id="_3-abstractexecutorservice" tabindex="-1"><a class="header-anchor" href="#_3-abstractexecutorservice" aria-hidden="true">#</a> 3. AbstractExecutorService</h4><p>提供<code>ExecutorService</code>执行方法的默认实现。此类使用newTaskFor返回的<code>RunnableFuture</code>实现<code>submit</code>，<code>invokeAny</code>和<code>invokeAll</code>方法，默认为该包中提供的 <code>FutureTask</code>类。</p><p>例如，<code>sumit(Runnable)</code>的实现创建了一个关联的<code>RunnableFuture</code>，它被执行并返回，子类可以覆盖<code>newTaskFor</code>方法以返回除FutureTask newTaskFor RunnableFuture实现。</p><h4 id="_4-forkjoinpool" tabindex="-1"><a class="header-anchor" href="#_4-forkjoinpool" aria-hidden="true">#</a> 4. ForkJoinPool</h4><p>简介：用于运行<code>ForkJoinTask</code>的<code>ExecutorService</code>. <code>ForkJoinPool</code>为来自非<code>ForkJoinTask</code>客户端的提交以及管理和监控操作提供了入口类</p><p><code>ForkJoinPool</code>与其他类型的<code>ExecutorService</code>主要区别在于采用了工作窃取：池中所有线程都尝试查找并执行提交给池和/或由其他活动任务创建的任务（如果不存在则阻塞等待工作）。</p><p>当大多数任务产生其他子任务时（大多数ForkJoinTask也是如此），以及许多小任务从外部客户端提交到池时，这可以实现高效处理。特别是在将构造函数中将 <code>asyncMode</code> 设置为true时，<code>ForkJoinPool</code>也可能适用于从未加入的事件样式任务。</p><p><strong>静态<code>commonPool()</code>可用并且适用于大多数应用程序</strong>，公共池由未明确提交到指定池的任何 <code>ForkJoinTask</code>使用。使用公共池通常会减少资源使用（其线程再不使用期间缓慢收回，并在后续使用时恢复）。</p><p>对于需要单独或自定义池的应用程序，可以实用给定的目标并行级别构建<code>ForkJoinPool</code>；默认情况下，等于可用处理器的数量。池尝试通过动态添加，挂起或恢复内部工作线程来维持足够的活动（或可用）线程，即使某些任务再等待时加入其他任务时暂停。但是，面对阻塞的 I/O 或其它非托管同步，不能保证进行此类调整。嵌套的 <code>ForkJoinPool.ManagedBlocker</code> 即可支持扩展所容纳的内部类型。</p><p>除了执行和生命周期控制方法之外，该类还提供状态检查方法（例如<code>getStealCount</code>）,旨在帮助开发，调整和监控 fork/join 应用程序。此外，方法<code>toString</code>以一种方便的形式返回池状态的指示以进行非正式监视。</p><p>与其他 <code>ExecutorService</code> 的情况一样，下表总结了三种主要的任务执行方法。这些旨在主要由尚未在当前池中参与分叉/加入计算的客户端使用。这些方法的主要形式接受<code>ForkJoinTask</code>实例，但重载形式也允许混合执行基于纯Runnable或Callable的活动。 但是，已在池中执行的任务通常应改为使用表中列出的计算内形式，除非使用通常不连接的异步事件样式任务，在这种情况下，方法选择之间几乎没有区别。</p><table><thead><tr><th></th><th style="text-align:center;">任务执行方法总结</th><th style="text-align:center;"></th></tr></thead><tbody><tr><td></td><td style="text-align:center;">来自非fork/join客户端的调用</td><td style="text-align:center;">从fork/join计算中调用</td></tr><tr><td>安排异步执行</td><td style="text-align:center;">execute(ForkJoinTask)</td><td style="text-align:center;">ForkJoinTask.fork</td></tr><tr><td>等待并获得结果</td><td style="text-align:center;">invoke(ForkJoinTask)</td><td style="text-align:center;">ForkJoinTask.invoke</td></tr><tr><td>安排exec并获得Future</td><td style="text-align:center;">submit(ForkJoinTask)</td><td style="text-align:center;">ForkJoinTask.fork</td></tr></tbody></table><p>公共池默认使用默认参数构建，但可以通过设置三个系统属性来控制：</p><ul><li><code>java.util.concurrent.ForkJoinPool.common.parallelism</code> - 并行度，非负整数</li><li><code>java.util.concurrent.ForkJoinPool.common.threadFactory - ForkJoinPool.ForkJoinWorkerThreadFactory</code>的类名</li><li><code>java.util.concurrent.ForkJoinPool.common.exceptionHandler - Thread.UncaughtExceptionHandler</code>的类名</li></ul><p>如果存在<code>SecurityManager</code>且未指定工厂，则默认池使用工厂提供未启用<code>Permissions</code>线程。 系统类加载器用于加载这些类。 在建立这些设置时出现任何错误时，将使用默认参数。 通过将 <code>parallelism</code> 属性设置为零和/或使用可能返回null的工厂，可以禁用或限制公共池中线程的使用。 然而，这样做可能会导致未加入的任务永远不会被执行。</p><p>此实现将运行线程的最大数量限制为 32767。尝试创建大于最大数量的池会导致IllegalArgumentException 。 此实现仅在池关闭或内部资源耗尽时拒绝提交的任务（即通过抛出RejectedExecutionException ）。</p>`,39),p=[o];function c(l,i){return s(),a("div",null,p)}const k=n(t,[["render",c],["__file","ForkJoinPool.html.vue"]]);export{k as default};