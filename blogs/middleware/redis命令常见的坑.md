---
title: redis命令常见的坑
date: 2020-10-29 12:03:17
tags:
  - redis
---

##### 1、过期时间意外丢失?

> SET 除了可以设置 key-value 之外，还可以设置 key 的过期时间，就像下面这样：

```shell
127.0.0.1:6379> set testkey val1 EX 60
OK
127.0.0.1:6379> TTL testkey
(integer) 56
```

> 此时如果你想修改 key 的值，但只是单纯地使用 SET 命令，而没有加上「过期时间」的参数，那这个 key 的过期时间将会被「擦除」。

```shell
127.0.0.1:6379> SET testkey val2
OK
127.0.0.1:6379> TTL testkey  // key永远不过期了！
(integer) -1
```

导致这个问题的原因在于： **SET命令如果不设置过期时间，那么Redis会自动「擦除」这个 key 的过期时间**

##### 2、DEL 竟然也会阻塞Redis?

**删除一个 key 的耗时，与这个 key 的类型有关。**

Redis 官方文档在介绍 DEL 命令时，是这样描述的：

- key 是 String 类型，DEL 时间复杂度是 O(1)
- key 是 `List/Hash/Set/ZSet `类型，DEL 时间复杂度是 O(M)，M 为元素数量

**也就是说，如果你要删除的是一个非 String 类型的 key，这个 key 的元素越多，那么在执行 DEL 时耗时就越久！**

所以，当你在删除 `List/Hash/Set/ZSet `类型的 key 时，一定要格外注意，不能无脑执行 DEL，而是应该用以下方式删除：

1. 查询元素数量：执行 `LLEN/HLEN/SCARD/ZCARD` 命令
2. 判断元素数量：如果元素数量较少，可直接执行 DEL 删除，否则分批删除
3. 分批删除：执行` LRANGE/HSCAN/SSCAN/ZSCAN` +` LPOP/RPOP/HDEL/SREM/ZREM` 删除

##### 3、RANDOMKEY 竟然也会阻塞 Redis？

如果你想随机查看 Redis 中的一个 key，通常会使用 `RANDOMKEY` 这个命令。这个命令会从 Redis 中「随机」取出一个 key。

Redis 清理过期 key，是采用定时清理 + 懒惰清理 2 种方式结合来做的。

RANDOMKEY 在随机拿出一个 key 后，首先会先检查这个 key 是否已过期。如果该 key 已经过期，那么 Redis 会删除它，这个过程就是**懒惰清理**。

但清理完了还不能结束，Redis 还要找出一个「不过期」的 key，返回给客户端。

**如果此时 Redis 中，有大量 key 已经过期，但还未来得及被清理掉，那这个循环就会持续很久才能结束，而且，这个耗时都花费在了清理过期 key + 寻找不过期 key 上。**

如果在 slave 上执行 RANDOMEKY，那么问题会更严重！

主要原因就在于，slave 自己是不会清理过期 key。当一个 key 要过期时，master 会先清理删除它，之后 master 向 slave 发送一个 DEL 命令，告知 slave 也删除这个 key，以此达到主从库的数据一致性。

**由于大量 key 都已过期，那 slave 就会寻找不到符合条件的 key，此时就会陷入「死循环」！也就是说，在 slave 上执行 RANDOMKEY，有可能会造成整个 Redis 实例卡死！**

这其实是 Redis 的一个 Bug，这个 Bug 一直持续到 5.0 才被修复。

修复的解决方案是，在 slave 上执行 RANDOMKEY 时，会先判断整个实例所有 key 是否都设置了过期时间，如果是，为了避免长时间找不到符合条件的 key，**slave 最多只会在哈希表中寻找 100 次**，无论是否能找到，都会退出循环。

这个方案就是增加上了一个最大重试次数，这样一来，就避免了陷入死循环。

##### 4、O(1) 复杂度的 SETBIT, 竟然会导致Redis OOM?

在使用 Redis 的 String 类型时，除了直接写入一个字符串之外，还可以把它当做 bitmap 来用。

具体来讲就是，我们可以把一个 String 类型的 key，拆分成一个个 bit 来操作，就像下面这样：

```shell
127.0.0.1:6379> SETBIT testkey 10 1
(integer) 1
127.0.0.1:6379> GETBIT testkey 10
(integer) 1
```

其中，操作的每一个 bit 位叫做 offset。

但是，这里有一个坑，你需要注意起来。

如果这个 key 不存在，或者 key 的内存使用很小，此时你要操作的 offset 非常大，那么 Redis 就需要分配「更大的内存空间」，这个操作耗时就会变长，影响性能。

所以，当你在使用 SETBIT 时，也一定要注意 offset 的大小，操作过大的 offset 也会引发 Redis 卡顿。

##### 5、执行 `MONITOR` 也会导致 Redis OOM？

当你在执行 MONITOR 命令时，Redis 会把每一条命令写到客户端的「输出缓冲区」中，然后客户端从这个缓冲区读取服务端返回的结果。

但是，如果你的 Redis QPS 很高，这将会导致这个输出缓冲区内存持续增长，占用 Redis 大量的内存资源，如果恰好你的机器的内存资源不足，那 Redis 实例就会面临被 OOM 的风险。

所以，你需要谨慎使用 MONITOR，尤其在 QPS 很高的情况下。
