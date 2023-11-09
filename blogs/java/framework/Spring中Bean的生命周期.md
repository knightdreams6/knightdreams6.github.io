---
title: Spring中Bean的生命周期
date: 2020-10-13 17:34:59
tags:
  - Spring
---

#### 基础知识补充

##### Bean创建的三个阶段

> Spring在创建一个Bean时是分为三个步骤的

* 实例化（可以理解为new一个对象）
* 属性注入（可以理解为调用setter方法完成属性注入）
* 初始化（可以按照Spring规则配置一些初始化的方法，例如 `@PostConstruct`注解）

##### 生命周期的概念

> Bean的生命周期指的就是在上面三个步骤中后置处理器`BeanPostprocessor`穿插执行的过程

##### 后置处理器的分析

按照接口进行分类

1. `BeanPostProcessor`接口

   > 最简单的后置处理器，这种后置处理器只能在初始化前后执行

   ```java
   public interface BeanPostProcessor {
       
    // 初始化前执行的方法
    @Nullable
    default Object postProcessBeforeInitialization(Object bean, String beanName) throws BeansException {
     return bean;
    }    
       
    // 初始化后执行的方法
    default Object postProcessAfterInitialization(Object bean, String beanName) throws BeansException {
     return bean;
    }
   
   }
   ```

2. `InstantiationAwareBeanPostProcessor`接口

   > 在第一种后置处理的基础上进行了一层扩展，可以在Bean的实例化阶段前后执行

   ```java
   // 继承了BeanPostProcessor，额外提供了两个方法用于在实例化前后的阶段执行
   // 因为实例化后紧接着就要进行属性注入，所以这个接口中还提供了一个属性注入的方法
   public interface InstantiationAwareBeanPostProcessor extends BeanPostProcessor {
    
       // 实例化前执行
   	@Nullable
   	default Object postProcessBeforeInstantiation(Class<?> beanClass, String beanName) throws BeansException {
   		return null;
   	}
    
       // 实例化后置
   	default boolean postProcessAfterInstantiation(Object bean, String beanName) throws BeansException {
   		return true;
   	}
       
       // 属性注入
   	@Nullable
   	default PropertyValues postProcessProperties(PropertyValues pvs, Object bean, String beanName)
   			throws BeansException {
   
   		return null;
   	}
       
       @Deprecated
   	@Nullable
   	default PropertyValues postProcessPropertyValues(
   			PropertyValues pvs, PropertyDescriptor[] pds, Object bean, String beanName) throws BeansException {
   
   		return pvs;
   	}
   ```

3. Spring 内部专用的后置处理器 `SmartInstantiationAwareBeanPostProcessor `接口

   ```java
   public interface SmartInstantiationAwareBeanPostProcessor extends InstantiationAwareBeanPostProcessor {
    
       // 推测bean的类型，例如在属性注入阶段我们就需要知道符合依赖类型的Bean有哪些
       @Nullable
       default Class<?> predictBeanType(Class<?> beanClass, String beanName) throws BeansException {
           return null;
       }
    
       // 推断出所有符合要求的构造函数，在实例化对象的时候我们就需要明确到底使用哪个构造函数
       @Nullable
       default Constructor<?>[] determineCandidateConstructors(Class<?> beanClass, String beanName)
           throws BeansException {
   
           return null;
       }
    
       // 获取一个提前暴露的对象，用于解决循环依赖
       default Object getEarlyBeanReference(Object bean, String beanName) throws BeansException {
           return bean;
       }
   
   }
   ```

   一般我们在探究生命周期的时候都不会考虑这种后置处理器的执行

