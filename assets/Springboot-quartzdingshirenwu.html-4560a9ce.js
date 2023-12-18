import{_ as n,o as s,c as a,b as e}from"./app-c5e7af21.js";const t={},c=e(`<blockquote><p>Quartz是用来实现定时任务的一个框架。如果光说定时任务你可能会说@scheduled也能实现呀。还要Quartz干啥。因为Quartz的功能比@scheduled稍微多一点。主要体现在以下几个方面</p></blockquote><ul><li>Quart的定时任务可以随时修改。即使任务已经在调度系统中了。你还是可以随时去改变任务的实行时间(@scheduled实现该功能就比较麻烦了)。</li><li>服务重启之后Quartz的任务会自动拉起来，自动在调度系统里面根据触发器设置的时间执行。</li><li>Quartz支持集群(多台服务器部署了quartz任务，只有有一台服务器执行。而且一台服务器挂了相应的会转到其他服务器执行)。</li></ul><h3 id="一、quartz框架主要类介绍" tabindex="-1"><a class="header-anchor" href="#一、quartz框架主要类介绍" aria-hidden="true">#</a> 一、Quartz框架主要类介绍</h3><h4 id="_1-1-job类" tabindex="-1"><a class="header-anchor" href="#_1-1-job类" aria-hidden="true">#</a> 1.1 Job类</h4><blockquote><p>Job用于定义任务的具体逻辑。比如发送邮件等等</p></blockquote><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SendMailJob</span> <span class="token keyword">extends</span> <span class="token class-name">QuartzJobBean</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Resource</span>
    <span class="token keyword">private</span> <span class="token class-name">MailService</span> mailService<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">executeInternal</span><span class="token punctuation">(</span><span class="token class-name">JobExecutionContext</span> context<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">JobExecutionException</span> <span class="token punctuation">{</span>
        <span class="token comment">// 可以获取到外部设置的参数</span>
        <span class="token class-name">JobDataMap</span> mergedJobDataMap <span class="token operator">=</span> context<span class="token punctuation">.</span><span class="token function">getMergedJobDataMap</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 获取发送人</span>
        mailService<span class="token punctuation">.</span><span class="token function">sendSimpleMailMessage</span><span class="token punctuation">(</span>
                mergedJobDataMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;to&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                mergedJobDataMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;subject&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                mergedJobDataMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;content&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>MailService看我另一篇博客 Springboot发送邮件</p><h4 id="_1-2-jobdetail接口" tabindex="-1"><a class="header-anchor" href="#_1-2-jobdetail接口" aria-hidden="true">#</a> 1.2 JobDetail接口</h4><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
 * 传达给定的job实例的详细属性，JobDetail使用JobBuilder创建、定义
 * Quartz不存储Job类的实例，而是允许通过JobDetail创建一个实例
 * Job具有与之相关联的名称和组
 * 应在单个 Scheduler 中唯一表示它们
 * Trigger 是 Job的机关，一个Job可以指向多个Trigger，但一个Trigger只能指向一个Job
 */</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">JobDetail</span> <span class="token keyword">extends</span> <span class="token class-name">Serializable</span><span class="token punctuation">,</span> <span class="token class-name">Cloneable</span> <span class="token punctuation">{</span>
	<span class="token comment">// 获取 jobKey，一般由指定的name和group组合形成，若不指定则随机生成</span>
    <span class="token keyword">public</span> <span class="token class-name">JobKey</span> <span class="token function">getKey</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    
    <span class="token comment">// 获取 job描述</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getDescription</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    
    <span class="token comment">// 执行job的具体类，定时任务的动作都在这个类里面完成</span>
    <span class="token keyword">public</span> <span class="token class-name">Class</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span> <span class="token keyword">extends</span> <span class="token class-name">Job</span><span class="token punctuation">&gt;</span></span> <span class="token function">getJobClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    
    <span class="token comment">// 给job传递参数，job类中context.getMergedJobDataMap() 可以获取到传递的参数</span>
    <span class="token keyword">public</span> <span class="token class-name">JobDataMap</span> <span class="token function">getJobDataMap</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    
    <span class="token comment">// 任务孤立的时候是否需要报错(即没有触发器与之相关联)</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">isDurable</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    
    <span class="token doc-comment comment">/**
     * 和@PersistJobDataAfterExecution注解一样
     * PersistJobDataAfterExecution注解是添加在Job类上的：表示 Quartz 将会在成功执行 execute()
     * 方法后（没有抛出异常）更新 JobDetail 的 JobDataMap，下一次执行相同的任务（JobDetail）
     * 将会得到更新后的值，而不是原始的值
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">isPersistJobDataAfterExecution</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token doc-comment comment">/**
     * 和DisallowConcurrentExecution注解的功能一样
     * DisallowConcurrentExecution注解添加到Job之后，Quartz 将不会同时执行多个 Job 实例，
     * 怕有数据更新的时候不知道取哪一个数据
     */</span>
     <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">isConcurrentExectionDisallowed</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    
	<span class="token doc-comment comment">/**
     * 指示调度程序在遇到“恢复”或“故障转移”情况时是否应重新执行作业
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">requestsRecovery</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>


    <span class="token doc-comment comment">/**
     * JobDetail是通过构建者模式来实现的
     */</span>
    <span class="token keyword">public</span> <span class="token class-name">JobBuilder</span> <span class="token function">getJobBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1-3-trigger接口" tabindex="-1"><a class="header-anchor" href="#_1-3-trigger接口" aria-hidden="true">#</a> 1.3 Trigger接口</h4><blockquote><p>Trigger触发器，设置Job什么时候执行。Quartz框架默认给定四种触发器</p></blockquote><table><thead><tr><th style="text-align:center;">触发器</th><th style="text-align:center;">使用场景</th></tr></thead><tbody><tr><td style="text-align:center;">SimpleTrigger</td><td style="text-align:center;">简单触发器，适用于 指定多少时间间隔执行多少次任务的情况</td></tr><tr><td style="text-align:center;">CronTrigger</td><td style="text-align:center;">Cron触发器，通过Cron表达式来控制任务的执行情况</td></tr><tr><td style="text-align:center;">DailyTimeIntervalTrigger</td><td style="text-align:center;">日期触发器，在给定的时间范围内或指定的星期内以秒、分钟或小时为周期进行重复的清空</td></tr><tr><td style="text-align:center;">CalendarIntervalTrigger</td><td style="text-align:center;">日历触发器，根据一个给定的日历时间进行重复</td></tr></tbody></table><h4 id="_1-4-scheduler接口" tabindex="-1"><a class="header-anchor" href="#_1-4-scheduler接口" aria-hidden="true">#</a> 1.4 Scheduler接口</h4><blockquote><p>Scheduler调度器，是Quartz框架的心脏，用来管理Trigger和Job，并保证job能在Trigger设置的时间被触发执行。一般情况下，调度器启动之后，不需要进行任何处理</p></blockquote><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">/*
 * Quartz Scheduler是一个主要的接口
 * Scheduler维护一个 JobDetail 和 Trigger的注册表。注册后负责在关联Job的时候执行
 * Scheduler是由 SchedulerFactory 产生的，它可以找到并使用已经初始化/创建的调度程序，在它创建之后进入“待机模式”，在调用 start() 方法之前，它会触发所有Job
 * 
 */</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">Scheduler</span><span class="token punctuation">{</span>
        <span class="token doc-comment comment">/**
     * 方法获取的是正在执行的Job
     */</span>
    <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">JobExecutionContext</span><span class="token punctuation">&gt;</span></span> <span class="token function">getCurrentlyExecutingJobs</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">SchedulerException</span><span class="token punctuation">;</span>



    <span class="token doc-comment comment">/**
     * 获取Scheduler上的监听器ListenerManager， 比如可以监听job,trigger添加移除的状态等
     */</span>
    <span class="token class-name">ListenerManager</span> <span class="token function">getListenerManager</span><span class="token punctuation">(</span><span class="token punctuation">)</span>  <span class="token keyword">throws</span> <span class="token class-name">SchedulerException</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 把jobDetail添加到调度系统中，并且把任务和Trigger关联起来
     */</span>
    <span class="token class-name">Date</span> <span class="token function">scheduleJob</span><span class="token punctuation">(</span><span class="token class-name">JobDetail</span> jobDetail<span class="token punctuation">,</span> <span class="token class-name">Trigger</span> trigger<span class="token punctuation">)</span>
            <span class="token keyword">throws</span> <span class="token class-name">SchedulerException</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 开始调度Trigger关联的job
     */</span>
    <span class="token class-name">Date</span> <span class="token function">scheduleJob</span><span class="token punctuation">(</span><span class="token class-name">Trigger</span> trigger<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">SchedulerException</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 开始调度job,同时设置多个
     */</span>
    <span class="token keyword">void</span> <span class="token function">scheduleJobs</span><span class="token punctuation">(</span><span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">JobDetail</span><span class="token punctuation">,</span> <span class="token class-name">Set</span><span class="token punctuation">&lt;</span><span class="token operator">?</span> <span class="token keyword">extends</span> <span class="token class-name">Trigger</span><span class="token punctuation">&gt;</span><span class="token punctuation">&gt;</span></span> triggersAndJobs<span class="token punctuation">,</span> <span class="token keyword">boolean</span> replace<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">SchedulerException</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 开始调度job,而且这个job可以关联一个或多个触发器Trigger
     */</span>
    <span class="token keyword">void</span> <span class="token function">scheduleJob</span><span class="token punctuation">(</span><span class="token class-name">JobDetail</span> jobDetail<span class="token punctuation">,</span> <span class="token class-name">Set</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span> <span class="token keyword">extends</span> <span class="token class-name">Trigger</span><span class="token punctuation">&gt;</span></span> triggersForJob<span class="token punctuation">,</span> <span class="token keyword">boolean</span> replace<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">SchedulerException</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 从触发器中移除Trigger(Trigger对应的任务会被移除掉)
     */</span>
    <span class="token keyword">boolean</span> <span class="token function">unscheduleJob</span><span class="token punctuation">(</span><span class="token class-name">TriggerKey</span> triggerKey<span class="token punctuation">)</span>
            <span class="token keyword">throws</span> <span class="token class-name">SchedulerException</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 从触发器中移除Trigger(Trigger对应的任务会被移除掉)
     */</span>
    <span class="token keyword">boolean</span> <span class="token function">unscheduleJobs</span><span class="token punctuation">(</span><span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">TriggerKey</span><span class="token punctuation">&gt;</span></span> triggerKeys<span class="token punctuation">)</span>
            <span class="token keyword">throws</span> <span class="token class-name">SchedulerException</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 移除triggerKey，添加newTrigger
     */</span>
    <span class="token class-name">Date</span> <span class="token function">rescheduleJob</span><span class="token punctuation">(</span><span class="token class-name">TriggerKey</span> triggerKey<span class="token punctuation">,</span> <span class="token class-name">Trigger</span> newTrigger<span class="token punctuation">)</span>
            <span class="token keyword">throws</span> <span class="token class-name">SchedulerException</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 添加job到触发器中，当然这个时候任务是不会执行的，触发关联到了触发器Trigger上
     */</span>
    <span class="token keyword">void</span> <span class="token function">addJob</span><span class="token punctuation">(</span><span class="token class-name">JobDetail</span> jobDetail<span class="token punctuation">,</span> <span class="token keyword">boolean</span> replace<span class="token punctuation">)</span>
            <span class="token keyword">throws</span> <span class="token class-name">SchedulerException</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 添加任务
     */</span>
    <span class="token keyword">void</span> <span class="token function">addJob</span><span class="token punctuation">(</span><span class="token class-name">JobDetail</span> jobDetail<span class="token punctuation">,</span> <span class="token keyword">boolean</span> replace<span class="token punctuation">,</span> <span class="token keyword">boolean</span> storeNonDurableWhileAwaitingScheduling<span class="token punctuation">)</span>
            <span class="token keyword">throws</span> <span class="token class-name">SchedulerException</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 删除任务
     */</span>
    <span class="token keyword">boolean</span> <span class="token function">deleteJob</span><span class="token punctuation">(</span><span class="token class-name">JobKey</span> jobKey<span class="token punctuation">)</span>
            <span class="token keyword">throws</span> <span class="token class-name">SchedulerException</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 删除任务
     */</span>
    <span class="token keyword">boolean</span> <span class="token function">deleteJobs</span><span class="token punctuation">(</span><span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">JobKey</span><span class="token punctuation">&gt;</span></span> jobKeys<span class="token punctuation">)</span>
            <span class="token keyword">throws</span> <span class="token class-name">SchedulerException</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 立即执行任务
     */</span>
    <span class="token keyword">void</span> <span class="token function">triggerJob</span><span class="token punctuation">(</span><span class="token class-name">JobKey</span> jobKey<span class="token punctuation">)</span>
            <span class="token keyword">throws</span> <span class="token class-name">SchedulerException</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 立即执行任务
     */</span>
    <span class="token keyword">void</span> <span class="token function">triggerJob</span><span class="token punctuation">(</span><span class="token class-name">JobKey</span> jobKey<span class="token punctuation">,</span> <span class="token class-name">JobDataMap</span> data<span class="token punctuation">)</span>
            <span class="token keyword">throws</span> <span class="token class-name">SchedulerException</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 暂停任务
     */</span>
    <span class="token keyword">void</span> <span class="token function">pauseJob</span><span class="token punctuation">(</span><span class="token class-name">JobKey</span> jobKey<span class="token punctuation">)</span>
            <span class="token keyword">throws</span> <span class="token class-name">SchedulerException</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 暂停任务
     */</span>
    <span class="token keyword">void</span> <span class="token function">pauseJobs</span><span class="token punctuation">(</span><span class="token class-name">GroupMatcher</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">JobKey</span><span class="token punctuation">&gt;</span></span> matcher<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">SchedulerException</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 暂停触发器对应的任务
     */</span>
    <span class="token keyword">void</span> <span class="token function">pauseTrigger</span><span class="token punctuation">(</span><span class="token class-name">TriggerKey</span> triggerKey<span class="token punctuation">)</span>
            <span class="token keyword">throws</span> <span class="token class-name">SchedulerException</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 暂停触发器对应的任务
     */</span>
    <span class="token keyword">void</span> <span class="token function">pauseTriggers</span><span class="token punctuation">(</span><span class="token class-name">GroupMatcher</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">TriggerKey</span><span class="token punctuation">&gt;</span></span> matcher<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">SchedulerException</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 恢复任务
     */</span>
    <span class="token keyword">void</span> <span class="token function">resumeJob</span><span class="token punctuation">(</span><span class="token class-name">JobKey</span> jobKey<span class="token punctuation">)</span>
            <span class="token keyword">throws</span> <span class="token class-name">SchedulerException</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 恢复任务
     */</span>
    <span class="token keyword">void</span> <span class="token function">resumeJobs</span><span class="token punctuation">(</span><span class="token class-name">GroupMatcher</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">JobKey</span><span class="token punctuation">&gt;</span></span> matcher<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">SchedulerException</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 恢复触发器对应的任务
     */</span>
    <span class="token keyword">void</span> <span class="token function">resumeTrigger</span><span class="token punctuation">(</span><span class="token class-name">TriggerKey</span> triggerKey<span class="token punctuation">)</span>
            <span class="token keyword">throws</span> <span class="token class-name">SchedulerException</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 恢复触发器对应的任务
     */</span>
    <span class="token keyword">void</span> <span class="token function">resumeTriggers</span><span class="token punctuation">(</span><span class="token class-name">GroupMatcher</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">TriggerKey</span><span class="token punctuation">&gt;</span></span> matcher<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">SchedulerException</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 暂停所有的任务
     */</span>
    <span class="token keyword">void</span> <span class="token function">pauseAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">SchedulerException</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 恢复所有的任务
     */</span>
    <span class="token keyword">void</span> <span class="token function">resumeAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">SchedulerException</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 获取所有任务的jobGroup名字
     */</span>
    <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> <span class="token function">getJobGroupNames</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">SchedulerException</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 获取jobKey
     */</span>
    <span class="token class-name">Set</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">JobKey</span><span class="token punctuation">&gt;</span></span> <span class="token function">getJobKeys</span><span class="token punctuation">(</span><span class="token class-name">GroupMatcher</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">JobKey</span><span class="token punctuation">&gt;</span></span> matcher<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">SchedulerException</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 获取任务对应的触发器Trigger
     *
     */</span>
    <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span> <span class="token keyword">extends</span> <span class="token class-name">Trigger</span><span class="token punctuation">&gt;</span></span> <span class="token function">getTriggersOfJob</span><span class="token punctuation">(</span><span class="token class-name">JobKey</span> jobKey<span class="token punctuation">)</span>
            <span class="token keyword">throws</span> <span class="token class-name">SchedulerException</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 获取所有触发器的Group name
     */</span>
    <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> <span class="token function">getTriggerGroupNames</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">SchedulerException</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 获取TriggerKey
     */</span>
    <span class="token class-name">Set</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">TriggerKey</span><span class="token punctuation">&gt;</span></span> <span class="token function">getTriggerKeys</span><span class="token punctuation">(</span><span class="token class-name">GroupMatcher</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">TriggerKey</span><span class="token punctuation">&gt;</span></span> matcher<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">SchedulerException</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 获取所有暂停任务对应的触发器的Group Name
     */</span>
    <span class="token class-name">Set</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> <span class="token function">getPausedTriggerGroups</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">SchedulerException</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 获取JobDetail
     *
     */</span>
    <span class="token class-name">JobDetail</span> <span class="token function">getJobDetail</span><span class="token punctuation">(</span><span class="token class-name">JobKey</span> jobKey<span class="token punctuation">)</span>
            <span class="token keyword">throws</span> <span class="token class-name">SchedulerException</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 获取触发器Trigger
     */</span>
    <span class="token class-name">Trigger</span> <span class="token function">getTrigger</span><span class="token punctuation">(</span><span class="token class-name">TriggerKey</span> triggerKey<span class="token punctuation">)</span>
            <span class="token keyword">throws</span> <span class="token class-name">SchedulerException</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 获取触发器的状态
     */</span>
    <span class="token class-name">Trigger<span class="token punctuation">.</span>TriggerState</span> <span class="token function">getTriggerState</span><span class="token punctuation">(</span><span class="token class-name">TriggerKey</span> triggerKey<span class="token punctuation">)</span>
            <span class="token keyword">throws</span> <span class="token class-name">SchedulerException</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 恢复触发器的状态
     */</span>
    <span class="token keyword">void</span> <span class="token function">resetTriggerFromErrorState</span><span class="token punctuation">(</span><span class="token class-name">TriggerKey</span> triggerKey<span class="token punctuation">)</span>
            <span class="token keyword">throws</span> <span class="token class-name">SchedulerException</span><span class="token punctuation">;</span>
    <span class="token doc-comment comment">/**
     * 添加Calendar
     * 这里稍微解释下Calendar：Quartz的Calendar可以用于排除一些特定的日期不执行任务
     */</span>
    <span class="token keyword">void</span> <span class="token function">addCalendar</span><span class="token punctuation">(</span><span class="token class-name">String</span> calName<span class="token punctuation">,</span> <span class="token class-name">Calendar</span> calendar<span class="token punctuation">,</span> <span class="token keyword">boolean</span> replace<span class="token punctuation">,</span> <span class="token keyword">boolean</span> updateTriggers<span class="token punctuation">)</span>
            <span class="token keyword">throws</span> <span class="token class-name">SchedulerException</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 删除Calendar
     */</span>
    <span class="token keyword">boolean</span> <span class="token function">deleteCalendar</span><span class="token punctuation">(</span><span class="token class-name">String</span> calName<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">SchedulerException</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 获取Calendar
     */</span>
    <span class="token class-name">Calendar</span> <span class="token function">getCalendar</span><span class="token punctuation">(</span><span class="token class-name">String</span> calName<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">SchedulerException</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 获取Calendar对应的名字
     */</span>
    <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> <span class="token function">getCalendarNames</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">SchedulerException</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 中断某个任务
     */</span>
    <span class="token keyword">boolean</span> <span class="token function">interrupt</span><span class="token punctuation">(</span><span class="token class-name">JobKey</span> jobKey<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">UnableToInterruptJobException</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 中断任务
     * JobExecutionContext#getFireInstanceId()
     */</span>
    <span class="token keyword">boolean</span> <span class="token function">interrupt</span><span class="token punctuation">(</span><span class="token class-name">String</span> fireInstanceId<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">UnableToInterruptJobException</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 判断对应job是否存在
     */</span>
    <span class="token keyword">boolean</span> <span class="token function">checkExists</span><span class="token punctuation">(</span><span class="token class-name">JobKey</span> jobKey<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">SchedulerException</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 判断对应触发器是否存在
     */</span>
    <span class="token keyword">boolean</span> <span class="token function">checkExists</span><span class="token punctuation">(</span><span class="token class-name">TriggerKey</span> triggerKey<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">SchedulerException</span><span class="token punctuation">;</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="二、spring-boot里面使用quartz框架" tabindex="-1"><a class="header-anchor" href="#二、spring-boot里面使用quartz框架" aria-hidden="true">#</a> 二、Spring Boot里面使用Quartz框架</h3><ul><li>第一步引入</li></ul><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code>		<span class="token comment">&lt;!-- quartz --&gt;</span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>spring-boot-starter-quartz<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>第二步，配置Quartz运行需要的一些参数，application.yml文件里面配置。每个参数对应的值大家可以根据自己的实际情况修改</li></ul><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token comment"># 定时器</span>
  <span class="token key atrule">quartz</span><span class="token punctuation">:</span>
    <span class="token key atrule">job-store-type</span><span class="token punctuation">:</span> jdbc
    <span class="token key atrule">jdbc</span><span class="token punctuation">:</span>
      <span class="token comment"># always：总是执行初始化</span>
      <span class="token comment"># embedded：只初始化内存数据库（默认值）如h2</span>
      <span class="token comment"># never：从不初始化</span>
      <span class="token key atrule">initialize-schema</span><span class="token punctuation">:</span> embedded
    <span class="token key atrule">properties</span><span class="token punctuation">:</span>
      <span class="token key atrule">org</span><span class="token punctuation">:</span>
        <span class="token key atrule">quartz</span><span class="token punctuation">:</span>
          <span class="token key atrule">dataSource</span><span class="token punctuation">:</span>
            <span class="token key atrule">quartzDataSource</span><span class="token punctuation">:</span>
              <span class="token key atrule">driver</span><span class="token punctuation">:</span> com.mysql.cj.jdbc.Driver
              <span class="token key atrule">URL</span><span class="token punctuation">:</span> jdbc<span class="token punctuation">:</span>mysql<span class="token punctuation">:</span>//192.168.0.113<span class="token punctuation">:</span>3306/test<span class="token punctuation">?</span>characterEncoding=utf8<span class="token important">&amp;useSSL=false&amp;serverTimezone=Asia/Shanghai</span>
              <span class="token key atrule">user</span><span class="token punctuation">:</span> root
              <span class="token key atrule">password</span><span class="token punctuation">:</span> <span class="token number">123</span>
          <span class="token key atrule">scheduler</span><span class="token punctuation">:</span>
            <span class="token key atrule">instanceName</span><span class="token punctuation">:</span> MySchduler
            <span class="token key atrule">instanceId</span><span class="token punctuation">:</span> AUTO
          <span class="token key atrule">jobStore</span><span class="token punctuation">:</span>
            <span class="token key atrule">class</span><span class="token punctuation">:</span> org.quartz.impl.jdbcjobstore.JobStoreTX
            <span class="token key atrule">driverDelegateClass</span><span class="token punctuation">:</span> org.quartz.impl.jdbcjobstore.StdJDBCDelegate
            <span class="token key atrule">tablePrefix</span><span class="token punctuation">:</span> qrtz_
            <span class="token comment"># 是否开启集群</span>
            <span class="token key atrule">isClustered</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
            <span class="token comment"># 集群检查间隔</span>
            <span class="token key atrule">clusterCheckinInterval</span><span class="token punctuation">:</span> <span class="token number">10000</span>
            <span class="token key atrule">useProperties</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
            <span class="token key atrule">dataSource</span><span class="token punctuation">:</span> quartzDataSource
          <span class="token key atrule">threadPool</span><span class="token punctuation">:</span>
            <span class="token key atrule">class</span><span class="token punctuation">:</span> org.quartz.simpl.SimpleThreadPool
            <span class="token key atrule">threadCount</span><span class="token punctuation">:</span> <span class="token number">10</span>
            <span class="token key atrule">threadPriority</span><span class="token punctuation">:</span> <span class="token number">5</span>
            <span class="token key atrule">threadsInheritContextClassLoaderOfInitializingThread</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>第三步，创建Quartz需要的11张表(这是Quartz双机热备的基础)。Quartz相关建表语句在org.quartz.impl.jdbcjobstore包下都能找到，里面有各种各样数据库的建表语句。比如实例中我们用的是sql，innodb引擎。所以对应的建表语句文件为tables_mysql_innodb.sql文件</li></ul><h4 id="表信息解析" tabindex="-1"><a class="header-anchor" href="#表信息解析" aria-hidden="true">#</a> 表信息解析</h4><p><strong>小Demo: 每天12点 18点指定发送邮件定时任务</strong></p><p>项目链接： https://gitee.com/knightdreams/learn-spring-quartz</p>`,24),l=[c];function p(i,o){return s(),a("div",null,l)}const d=n(t,[["render",p],["__file","Springboot-quartzdingshirenwu.html.vue"]]);export{d as default};
