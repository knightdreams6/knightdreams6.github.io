---
title: Redis内存满了怎么办
date: 2019-12-12 17:18:49
tags: 
  - redis
---

### 1. 通过配置文件配置

> redis.conf 添加设置内存大小，	maxmemory  100mb
>
> 也可以启动时传参指定配置



### 2.通过命令修改

> config set maxmemory 100mb

> config get maxmemory

注意：如果不设置maxmemory或设置为0，64位系统不限制内存，32位系统最多使用3GB内存。



### redis的内存淘汰

> 配置的内存用完的时候，继续添加数据时，redis定义了集中策略处理这种情况

- noeviction（默认策略）对于写请求不再提供服务，直接返回错误（DEL请求和部分特殊请求除外）
- allkeys-lru：从所有key中使用LRU算法进行淘汰
- volatile-lru：从设置了过期时间的key中使用LRU算法进行淘汰
- allkeys-random：从所有key中随机淘汰数据
- volatile-random：从设置了过期时间的key中随机淘汰
- volatile-ttl：在设置了过期时间的key中，根据key的过期时间进行淘汰，越早过期的越优先被淘汰

注意：当时用volatile-lru、volatile-random、volatile-ttl这三种策略时，如果没有key可以被淘汰，则和noeviction一样返回错误



##### 如何获取及设置内存淘汰策略?

> config get maxmemory-policy

> config set maxmemory-policy volatile-lru



##### LRU算法？

> LRU(Least Recently Used)，即最近最少使用，是一种缓存置换算法。在使用内存作为缓存的时候，缓存的大小一般是固定的。当缓存被沾满，这个时候继续往缓存中添加数据时，就需要淘汰一部分老的数据，释放空间来存储新的数据。
>
> 核心思想：如果一个数据在最近一段时间没有被用到，那么将来被使用到的可能性也很小，所以就可以被淘汰掉。



### LRU在Redis中的实现

##### 近似LRU算法

Redis使用的是近似LRU算法，它跟常规的LRU算法还不太一样。近似LRU算法通过随机采样法淘汰数据，每次随机出5（默认）个key，从里面淘汰最近最少使用的key。

> 可以通过配置 max memory-samples参数修改采样数量。 这个参数配置的越大，淘汰的结果越接近于严格的LRU算法

Redis为了实现近似LRU算法，给每个key增加了一个额外的24bit字段，用于存储该key最后一次被访问的时间。



##### Redis3.0对近似LRU的优化

新算法会维护一个候选池（大小为16）池中的数据根据访问时间进行排序，第一次随机选取的key都会放入池中，随后每次随机选取的key只有在访问时间小于池中最小的时间才会放入池中，直到候选池被放满，当放满后，如果有新的key需要放入，则将池中最后访问时间最大（最近被访问）的移除。

当需要淘汰的时候，直接从池中选取最近访问时间最小（最久没被访问）的key淘汰掉就行。



##### LFU算法

`Reids4.0`新增一种淘汰策略，它的全称是 Least Frequently Used，它的核心思想是根据key的最近被访问的频率进行淘汰，很少被访问的优先被淘汰，被访问的多的则被留下来。

LFU算法能更好的表示一个key被访问的热度。

LFU一共有两种策略：

- volatile-lfu：在设置了过期时间的key中使用LFU算法淘汰key
- allkeys-lfu：在所有的key中使用LFU算法淘汰数据



