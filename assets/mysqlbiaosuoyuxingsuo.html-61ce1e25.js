import{_ as s,o as n,c as a,b as e}from"./app-5f8194d9.js";const l={},o=e(`<h4 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h4><p>锁是计算机协调多个进程或线程并发访问某一资源的机制。在数据库中，除传统的计算机资源（如CPU、RAM、I/O等）的争用外，数据也是一种供许多用户共享的资源。如何保证数据并发访问的一致性、有效性是所有数据库必须解决的一个问题，锁冲突也是影响数据并发访问性能的一个重要因素。从这个角度来说，锁对数据库而言显得尤其重要，也更加复杂。</p><p>在 MySQL 中，表锁和行锁都是用于控制并发访问的机制。它们可以帮助确保在多个用户同时访问数据库时数据的完整性和一致性。</p><ol><li>表锁（Table Lock）： <ul><li>表锁是在对整张表进行操作时使用的锁定机制。当一个事务获取了对表的锁之后，其他事务就无法对该表进行任何写操作，直到持有锁的事务释放锁为止。</li><li>表锁的优点是简单且开销小，但是其并发性能较差，因为它会导致其他事务无法同时对表进行操作，从而降低了数据库的并发能力。</li></ul></li><li>行锁（Row Lock）： <ul><li>行锁是在对表中的某一行数据进行操作时使用的锁定机制。当一个事务获取了对某行数据的锁之后，其他事务仍然可以对表中的其他行进行操作，只要不涉及到已被锁定的行即可。</li><li>行锁相对于表锁来说，并发性能更好，因为它只会锁定需要操作的具体数据行，而不会限制其他事务对表中其他行的操作。</li></ul></li></ol><p>在实际应用中，通常会根据具体的业务需求和并发访问情况来选择合适的锁定机制。一般来说，如果并发访问比较高，并且需要保证系统的响应速度，那么更倾向于使用行锁；而如果对数据一致性要求不是特别高，并且并发访问量不大，可以考虑使用表锁来简化管理。</p><h4 id="锁的分类" tabindex="-1"><a class="header-anchor" href="#锁的分类" aria-hidden="true">#</a> 锁的分类</h4><ol><li>根据粒度分类： <ul><li>行级锁：针对表中的一行数据加锁，其他事务无法修改该行数据；</li><li>表级锁：锁定整个表，其他事务无法对该表进行修改。</li></ul></li><li>根据持有方式分类： <ul><li>共享锁（S锁）：允许多个事务同时持有锁，但是只能读取，不能修改；</li><li>排他锁（X锁）：只允许一个事务持有锁，可以读取和修改。</li></ul></li></ol><p>假设有两个事务同时对一个表进行写操作，如下所示：</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token comment">-- 事务1</span>
<span class="token keyword">BEGIN</span><span class="token punctuation">;</span>
<span class="token keyword">UPDATE</span> mytable <span class="token keyword">SET</span> column1 <span class="token operator">=</span> <span class="token string">&#39;value1&#39;</span> <span class="token keyword">WHERE</span> id <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>

<span class="token comment">-- 事务2</span>
<span class="token keyword">BEGIN</span><span class="token punctuation">;</span>
<span class="token keyword">UPDATE</span> mytable <span class="token keyword">SET</span> column2 <span class="token operator">=</span> <span class="token string">&#39;value2&#39;</span> <span class="token keyword">WHERE</span> id <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="表锁-偏读" tabindex="-1"><a class="header-anchor" href="#表锁-偏读" aria-hidden="true">#</a> 表锁（偏读）</h5><p>在 MyISAM 存储引擎中，由于使用的是表锁，因此当事务1对表中的某行进行写操作时，整张表都会被锁定，从而阻塞了事务2对表的写操作，直到事务1提交或回滚后才能继续执行事务2。</p><p>这种情况下，如果有多个事务需要对同一张表进行写操作，就会出现表级锁竞争的情况，从而影响数据库的并发性能。</p><p>为了避免表级锁竞争带来的性能问题，可以采取以下措施：</p><ol><li>尽量避免使用 MyISAM 存储引擎，而选择支持行级锁（Row Lock）的 InnoDB 存储引擎。</li><li>如果必须使用 MyISAM 存储引擎，可以尽量将事务的操作拆分成多个小事务，以减少表级锁的持有时间和锁定的范围。</li><li>对于大量写操作的场景，可以使用某些缓存技术、批量操作或异步操作等方式来减少频繁的写操作，从而减少表级锁的使用。</li></ol><h5 id="行锁-偏写" tabindex="-1"><a class="header-anchor" href="#行锁-偏写" aria-hidden="true">#</a> 行锁（偏写）</h5><p>在 InnoDB 存储引擎中，使用的是行级锁（Row Lock），因此当事务1对表中的某行进行写操作时，只会锁定该行，而不会锁定整张表。这意味着其他事务仍然可以并发地对表中的其他行进行读写操作。</p><p>这种情况下，事务2可以继续对表中不被事务1锁定的行进行写操作，而不会被阻塞。只有当事务2需要访问被事务1锁定的行时，才会被阻塞，直到事务1提交或回滚后才能继续执行。</p><p>行级锁的使用可以提高数据库的并发性能，避免了表级锁的竞争和阻塞问题。不同的行级锁之间相互独立，事务可以同时对表中的不同行进行读写操作，从而提高了数据库的并发性。</p><p>需要注意的是，行级锁也可能引发死锁的情况。当多个事务相互等待对方持有的锁时，就会发生死锁。为了避免死锁的发生，可以合理设计事务操作的顺序，或者使用锁超时机制来自动释放被阻塞的事务。</p><p><strong>索引失效会导致行锁升级为表锁</strong></p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token comment"># 例如： b为varchar类型，发生自动转换导致索引失效，从而使锁的级别从行锁升级为表锁</span>
<span class="token keyword">update</span> test_innodb_lock <span class="token keyword">set</span> a <span class="token operator">=</span> <span class="token number">110</span> <span class="token keyword">where</span> b <span class="token operator">=</span> <span class="token number">1000</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>如何锁定某一行</strong></p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> test_innodb_lock <span class="token keyword">where</span> a <span class="token operator">=</span> <span class="token number">7</span> <span class="token keyword">for</span> <span class="token keyword">update</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>行锁分析</strong></p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">show</span> <span class="token keyword">status</span> <span class="token operator">like</span> <span class="token string">&#39;innodb_row_lock%&#39;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>Innodb_row_lock_current_waits：当前正在等待锁定的数量。</li><li>Innodb_row_lock_time：从系统启动到现在锁定的时长。</li><li>Innodb_row_lock_time_avg：每次等待锁所花平均时间。</li><li>Innodb_row_lock_time_max：从系统启动到现在锁等待最长的一次所花的时间。</li><li>Innodb_row_lock_waits：系统启动后到现在总共等待锁的次数。</li></ul><p><strong>优化建议</strong></p><ul><li>尽可能让所有数据都通过索引来完成，避免无索引行升级为表锁。</li><li>合理设计索引，尽量缩小锁的范围。</li><li>尽可能使用较少的检索条件，避免间隙锁。</li><li>尽量控制事务大小，减少锁定资源量和时间长度。</li><li>尽可能降低事务隔离级别。</li></ul><h5 id="间隙锁" tabindex="-1"><a class="header-anchor" href="#间隙锁" aria-hidden="true">#</a> 间隙锁</h5><p>间隙锁（Gap Lock）是一种数据库锁定机制，用于解决并发事务中的幻读问题。</p><p>幻读是指在一个事务中，当对某个范围的数据进行查询时，其他事务插入或删除了符合该范围的数据，导致查询结果发生变化的情况。</p><p>为了解决幻读问题，InnoDB 存储引擎引入了间隙锁。间隙锁锁定了一个范围的键值之间的间隙，阻止其他事务在该间隙中插入新的数据。这样可以确保一个事务在查询某个范围的数据时，其他事务无法插入干扰该查询结果的新数据。</p><p>举个例子来说明间隙锁的作用：</p><p>假设有两个事务同时执行以下操作：</p><ul><li>事务1：<code>SELECT * FROM mytable WHERE id &gt; 100 FOR UPDATE;</code></li><li>事务2：<code>INSERT INTO mytable (id, value) VALUES (150, &#39;new value&#39;);</code></li></ul><p>在没有间隙锁的情况下，事务1可能会返回事务2插入的新数据，导致幻读。但是，如果使用间隙锁，事务1会在查询之前对 id 大于100小于150的范围应用间隙锁，阻止其他事务在该范围内进行插入操作。</p><p>需要注意的是，间隙锁是在可重复读（REPEATABLE READ）隔离级别下才会生效。在读已提交（READ COMMITTED）隔离级别下，InnoDB 存储引擎会使用行锁而不是间隙锁来解决幻读问题。</p><p>间隙锁的使用需要谨慎考虑，因为它会限制并发性能。过多的间隙锁可能导致锁竞争和阻塞问题。在设计数据库结构和查询语句时，需要注意避免过多的间隙锁的产生，以提高系统的并发性能。</p>`,38),i=[o];function p(t,r){return n(),a("div",null,i)}const d=s(l,[["render",p],["__file","mysqlbiaosuoyuxingsuo.html.vue"]]);export{d as default};