---
title: Springboot+quartz定时任务
date: 2020-03-23 17:11:04
tags:
  - java
  - Springboot
---

> Quartz是用来实现定时任务的一个框架。如果光说定时任务你可能会说@scheduled也能实现呀。还要Quartz干啥。因为Quartz的功能比@scheduled稍微多一点。主要体现在以下几个方面

* Quart的定时任务可以随时修改。即使任务已经在调度系统中了。你还是可以随时去改变任务的实行时间(@scheduled实现该功能就比较麻烦了)。
* 服务重启之后Quartz的任务会自动拉起来，自动在调度系统里面根据触发器设置的时间执行。
* Quartz支持集群(多台服务器部署了quartz任务，只有有一台服务器执行。而且一台服务器挂了相应的会转到其他服务器执行)。

### 一、Quartz框架主要类介绍

#### 1.1 Job类

> Job用于定义任务的具体逻辑。比如发送邮件等等

```java
public class SendMailJob extends QuartzJobBean {

    @Resource
    private MailService mailService;

    @Override
    protected void executeInternal(JobExecutionContext context) throws JobExecutionException {
        // 可以获取到外部设置的参数
        JobDataMap mergedJobDataMap = context.getMergedJobDataMap();
        // 获取发送人
        mailService.sendSimpleMailMessage(
                mergedJobDataMap.get("to").toString(),
                mergedJobDataMap.get("subject").toString(),
                mergedJobDataMap.get("content").toString());
    }
}
```

MailService看我另一篇博客  Springboot发送邮件

#### 1.2 JobDetail接口

```java
/**
 * 传达给定的job实例的详细属性，JobDetail使用JobBuilder创建、定义
 * Quartz不存储Job类的实例，而是允许通过JobDetail创建一个实例
 * Job具有与之相关联的名称和组
 * 应在单个 Scheduler 中唯一表示它们
 * Trigger 是 Job的机关，一个Job可以指向多个Trigger，但一个Trigger只能指向一个Job
 */
public interface JobDetail extends Serializable, Cloneable {
	// 获取 jobKey，一般由指定的name和group组合形成，若不指定则随机生成
    public JobKey getKey();
    
    // 获取 job描述
    public String getDescription();
    
    // 执行job的具体类，定时任务的动作都在这个类里面完成
    public Class<? extends Job> getJobClass();
    
    // 给job传递参数，job类中context.getMergedJobDataMap() 可以获取到传递的参数
    public JobDataMap getJobDataMap();
    
    // 任务孤立的时候是否需要报错(即没有触发器与之相关联)
    public boolean isDurable();
    
    /**
     * 和@PersistJobDataAfterExecution注解一样
     * PersistJobDataAfterExecution注解是添加在Job类上的：表示 Quartz 将会在成功执行 execute()
     * 方法后（没有抛出异常）更新 JobDetail 的 JobDataMap，下一次执行相同的任务（JobDetail）
     * 将会得到更新后的值，而不是原始的值
     */
    public boolean isPersistJobDataAfterExecution();
	/**
     * 和DisallowConcurrentExecution注解的功能一样
     * DisallowConcurrentExecution注解添加到Job之后，Quartz 将不会同时执行多个 Job 实例，
     * 怕有数据更新的时候不知道取哪一个数据
     */
     public boolean isConcurrentExectionDisallowed();
    
	/**
     * 指示调度程序在遇到“恢复”或“故障转移”情况时是否应重新执行作业
     */
    public boolean requestsRecovery();


    /**
     * JobDetail是通过构建者模式来实现的
     */
    public JobBuilder getJobBuilder();

```

#### 1.3 Trigger接口

> Trigger触发器，设置Job什么时候执行。Quartz框架默认给定四种触发器

|          触发器          |                           使用场景                           |
| :----------------------: | :----------------------------------------------------------: |
|      SimpleTrigger       |   简单触发器，适用于 指定多少时间间隔执行多少次任务的情况    |
|       CronTrigger        |        Cron触发器，通过Cron表达式来控制任务的执行情况        |
| DailyTimeIntervalTrigger | 日期触发器，在给定的时间范围内或指定的星期内以秒、分钟或小时为周期进行重复的清空 |
| CalendarIntervalTrigger  |          日历触发器，根据一个给定的日历时间进行重复          |

#### 1.4 Scheduler接口

> Scheduler调度器，是Quartz框架的心脏，用来管理Trigger和Job，并保证job能在Trigger设置的时间被触发执行。一般情况下，调度器启动之后，不需要进行任何处理

```java
/*
 * Quartz Scheduler是一个主要的接口
 * Scheduler维护一个 JobDetail 和 Trigger的注册表。注册后负责在关联Job的时候执行
 * Scheduler是由 SchedulerFactory 产生的，它可以找到并使用已经初始化/创建的调度程序，在它创建之后进入“待机模式”，在调用 start() 方法之前，它会触发所有Job
 * 
 */
public interface Scheduler{
        /**
     * 方法获取的是正在执行的Job
     */
    List<JobExecutionContext> getCurrentlyExecutingJobs() throws SchedulerException;



    /**
     * 获取Scheduler上的监听器ListenerManager， 比如可以监听job,trigger添加移除的状态等
     */
    ListenerManager getListenerManager()  throws SchedulerException;

    /**
     * 把jobDetail添加到调度系统中，并且把任务和Trigger关联起来
     */
    Date scheduleJob(JobDetail jobDetail, Trigger trigger)
            throws SchedulerException;

    /**
     * 开始调度Trigger关联的job
     */
    Date scheduleJob(Trigger trigger) throws SchedulerException;

    /**
     * 开始调度job,同时设置多个
     */
    void scheduleJobs(Map<JobDetail, Set<? extends Trigger>> triggersAndJobs, boolean replace) throws SchedulerException;

    /**
     * 开始调度job,而且这个job可以关联一个或多个触发器Trigger
     */
    void scheduleJob(JobDetail jobDetail, Set<? extends Trigger> triggersForJob, boolean replace) throws SchedulerException;

    /**
     * 从触发器中移除Trigger(Trigger对应的任务会被移除掉)
     */
    boolean unscheduleJob(TriggerKey triggerKey)
            throws SchedulerException;

    /**
     * 从触发器中移除Trigger(Trigger对应的任务会被移除掉)
     */
    boolean unscheduleJobs(List<TriggerKey> triggerKeys)
            throws SchedulerException;

    /**
     * 移除triggerKey，添加newTrigger
     */
    Date rescheduleJob(TriggerKey triggerKey, Trigger newTrigger)
            throws SchedulerException;

    /**
     * 添加job到触发器中，当然这个时候任务是不会执行的，触发关联到了触发器Trigger上
     */
    void addJob(JobDetail jobDetail, boolean replace)
            throws SchedulerException;

    /**
     * 添加任务
     */
    void addJob(JobDetail jobDetail, boolean replace, boolean storeNonDurableWhileAwaitingScheduling)
            throws SchedulerException;

    /**
     * 删除任务
     */
    boolean deleteJob(JobKey jobKey)
            throws SchedulerException;

    /**
     * 删除任务
     */
    boolean deleteJobs(List<JobKey> jobKeys)
            throws SchedulerException;

    /**
     * 立即执行任务
     */
    void triggerJob(JobKey jobKey)
            throws SchedulerException;

    /**
     * 立即执行任务
     */
    void triggerJob(JobKey jobKey, JobDataMap data)
            throws SchedulerException;

    /**
     * 暂停任务
     */
    void pauseJob(JobKey jobKey)
            throws SchedulerException;

    /**
     * 暂停任务
     */
    void pauseJobs(GroupMatcher<JobKey> matcher) throws SchedulerException;

    /**
     * 暂停触发器对应的任务
     */
    void pauseTrigger(TriggerKey triggerKey)
            throws SchedulerException;

    /**
     * 暂停触发器对应的任务
     */
    void pauseTriggers(GroupMatcher<TriggerKey> matcher) throws SchedulerException;

    /**
     * 恢复任务
     */
    void resumeJob(JobKey jobKey)
            throws SchedulerException;

    /**
     * 恢复任务
     */
    void resumeJobs(GroupMatcher<JobKey> matcher) throws SchedulerException;

    /**
     * 恢复触发器对应的任务
     */
    void resumeTrigger(TriggerKey triggerKey)
            throws SchedulerException;

    /**
     * 恢复触发器对应的任务
     */
    void resumeTriggers(GroupMatcher<TriggerKey> matcher) throws SchedulerException;

    /**
     * 暂停所有的任务
     */
    void pauseAll() throws SchedulerException;

    /**
     * 恢复所有的任务
     */
    void resumeAll() throws SchedulerException;

    /**
     * 获取所有任务的jobGroup名字
     */
    List<String> getJobGroupNames() throws SchedulerException;

    /**
     * 获取jobKey
     */
    Set<JobKey> getJobKeys(GroupMatcher<JobKey> matcher) throws SchedulerException;

    /**
     * 获取任务对应的触发器Trigger
     *
     */
    List<? extends Trigger> getTriggersOfJob(JobKey jobKey)
            throws SchedulerException;

    /**
     * 获取所有触发器的Group name
     */
    List<String> getTriggerGroupNames() throws SchedulerException;

    /**
     * 获取TriggerKey
     */
    Set<TriggerKey> getTriggerKeys(GroupMatcher<TriggerKey> matcher) throws SchedulerException;

    /**
     * 获取所有暂停任务对应的触发器的Group Name
     */
    Set<String> getPausedTriggerGroups() throws SchedulerException;

    /**
     * 获取JobDetail
     *
     */
    JobDetail getJobDetail(JobKey jobKey)
            throws SchedulerException;

    /**
     * 获取触发器Trigger
     */
    Trigger getTrigger(TriggerKey triggerKey)
            throws SchedulerException;

    /**
     * 获取触发器的状态
     */
    Trigger.TriggerState getTriggerState(TriggerKey triggerKey)
            throws SchedulerException;

    /**
     * 恢复触发器的状态
     */
    void resetTriggerFromErrorState(TriggerKey triggerKey)
            throws SchedulerException;
    /**
     * 添加Calendar
     * 这里稍微解释下Calendar：Quartz的Calendar可以用于排除一些特定的日期不执行任务
     */
    void addCalendar(String calName, Calendar calendar, boolean replace, boolean updateTriggers)
            throws SchedulerException;

    /**
     * 删除Calendar
     */
    boolean deleteCalendar(String calName) throws SchedulerException;

    /**
     * 获取Calendar
     */
    Calendar getCalendar(String calName) throws SchedulerException;

    /**
     * 获取Calendar对应的名字
     */
    List<String> getCalendarNames() throws SchedulerException;

    /**
     * 中断某个任务
     */
    boolean interrupt(JobKey jobKey) throws UnableToInterruptJobException;

    /**
     * 中断任务
     * JobExecutionContext#getFireInstanceId()
     */
    boolean interrupt(String fireInstanceId) throws UnableToInterruptJobException;

    /**
     * 判断对应job是否存在
     */
    boolean checkExists(JobKey jobKey) throws SchedulerException;

    /**
     * 判断对应触发器是否存在
     */
    boolean checkExists(TriggerKey triggerKey) throws SchedulerException;

}
```



### 二、Spring Boot里面使用Quartz框架

* 第一步引入

```xml
		<!-- quartz -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-quartz</artifactId>
        </dependency>
```

* 第二步，配置Quartz运行需要的一些参数，application.yml文件里面配置。每个参数对应的值大家可以根据自己的实际情况修改

```yaml
spring:
  # 定时器
  quartz:
    job-store-type: jdbc
    jdbc:
      # always：总是执行初始化
      # embedded：只初始化内存数据库（默认值）如h2
      # never：从不初始化
      initialize-schema: embedded
    properties:
      org:
        quartz:
          dataSource:
            quartzDataSource:
              driver: com.mysql.cj.jdbc.Driver
              URL: jdbc:mysql://192.168.0.113:3306/test?characterEncoding=utf8&useSSL=false&serverTimezone=Asia/Shanghai
              user: root
              password: 123
          scheduler:
            instanceName: MySchduler
            instanceId: AUTO
          jobStore:
            class: org.quartz.impl.jdbcjobstore.JobStoreTX
            driverDelegateClass: org.quartz.impl.jdbcjobstore.StdJDBCDelegate
            tablePrefix: qrtz_
            # 是否开启集群
            isClustered: false
            # 集群检查间隔
            clusterCheckinInterval: 10000
            useProperties: false
            dataSource: quartzDataSource
          threadPool:
            class: org.quartz.simpl.SimpleThreadPool
            threadCount: 10
            threadPriority: 5
            threadsInheritContextClassLoaderOfInitializingThread: true

```

* 第三步，创建Quartz需要的11张表(这是Quartz双机热备的基础)。Quartz相关建表语句在org.quartz.impl.jdbcjobstore包下都能找到，里面有各种各样数据库的建表语句。比如实例中我们用的是sql，innodb引擎。所以对应的建表语句文件为tables_mysql_innodb.sql文件
  

#### 表信息解析



**小Demo: 每天12点 18点指定发送邮件定时任务**

项目链接： https://gitee.com/knightdreams/learn-spring-quartz

