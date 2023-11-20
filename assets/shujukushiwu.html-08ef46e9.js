import{_ as a,o as n,c as s,b as e}from"./app-bd582996.js";const t={},l=e(`<p>在执行SQL语句的时候，一系列操作必须全部执行，而不能只执行一部分。例如，一个转账操作：</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token operator">-</span> 从id<span class="token operator">=</span><span class="token number">1</span>的账户给id<span class="token operator">=</span><span class="token number">2</span>的账户转账<span class="token number">100</span>元
<span class="token comment">-- 第一步：将id=1的A账户余额减去100</span>
<span class="token keyword">UPDATE</span> accounts <span class="token keyword">SET</span> balance <span class="token operator">=</span> balance <span class="token operator">-</span> <span class="token number">100</span> <span class="token keyword">WHERE</span> id <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token comment">-- 第二步：将id=2的B账户余额加上100</span>
<span class="token keyword">UPDATE</span> accounts <span class="token keyword">SET</span> balance <span class="token operator">=</span> balance <span class="token operator">+</span> <span class="token number">100</span> <span class="token keyword">WHERE</span> id <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这两条SQL语句必须全部执行，如果有一条语句失败，就必须全部撤销。</p><p>这种把多条语句作为一个整体进行操作的功能，被称为数据库的<strong>事务</strong>。数据库事务可以确保该事务范围内的所有操作都可以全部成功或者全部失败。如果事务失败，那么效果就和没有执行这些SQL一样，不会对数据库数据有任何改动。</p><p>可见，数据库事务具有ACID这四个特性：</p><ul><li>A：Atomic 原子性，将所有SQL作为原子工作单元执行，要么全执行，要么全不执行；</li><li>C：Consistent 一执性，事务完成后，所有数据的状态都是一致的，即A账户只要减去了100，B账户则必定加上了100；</li><li>I：Isolation，隔离性，如果有多个事务并发执行，每个事务作出的修改必须与其它事务隔离；</li><li>D：Duration，持久性，即事务完成后，对数据库数据的修改被持久化存储。</li></ul><blockquote><p>对于单条SQL语句，数据库系统自动将其作为一个事务执行，这种事务被称为 <strong>隐形事务</strong>。</p><p>要手动把多条SQL语句作为一个事务执行，使用<code>BEGIN</code> 开启一个事务，使用 <code>COMMIT</code> 提交一个事务，这种事务被称为 <strong>显式事务</strong>。</p></blockquote><p>例如，把上述的转账操作作为一个显式事务：</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">BEGIN</span><span class="token punctuation">;</span>
<span class="token keyword">UPDATE</span> account <span class="token keyword">SET</span> balance <span class="token operator">=</span> balance <span class="token operator">-</span> <span class="token number">100</span> <span class="token keyword">WHERE</span> id <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token keyword">UPDATE</span> account <span class="token keyword">SET</span> balance <span class="token operator">=</span> balance <span class="token operator">+</span> <span class="token number">100</span> <span class="token keyword">WHERE</span> id <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
<span class="token keyword">COMMIT</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>COMMIT</code>是指提交事务，即试图把事务内的所有SQL所做的修改永久保存。如果<code>COMMIT</code>语句执行失败了，整个事务也会失败。</p><p>有些时候，我们希望主动让事务失败，这时，可以用<code>ROLLBACK</code>回滚事务，整个事务会失败：</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">BEGIN</span><span class="token punctuation">;</span>
<span class="token keyword">UPDATE</span> accounts <span class="token keyword">SET</span> balance <span class="token operator">=</span> balance <span class="token operator">-</span> <span class="token number">100</span> <span class="token keyword">WHERE</span> id <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token keyword">UPDATE</span> accounts <span class="token keyword">SET</span> balance <span class="token operator">=</span> balance <span class="token operator">+</span> <span class="token number">100</span> <span class="token keyword">WHERE</span> id <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
<span class="token keyword">ROLLBACK</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>数据库事务是由数据库系统保证的，我们只需要根据业务逻辑使用它就可以。</p></blockquote><h3 id="隔离级别" tabindex="-1"><a class="header-anchor" href="#隔离级别" aria-hidden="true">#</a> 隔离级别</h3><p>对于两个并发执行的事务，如果涉及到<strong>操作同一条记录</strong>的时候，可能会发生问题。因为并发操作会带来数据的<strong>不一致性</strong>，包括<strong>脏读、不可重复读、幻读</strong>等。数据库系统提供了隔离级别来让我们有针对性地选择事务的隔离级别，避免数据不一致的问题。</p><p>SQL标准定义了4种隔离级别，分别对应可能出现的数据不一致的情况：</p><table><thead><tr><th style="text-align:left;">隔离级别(Isolation Level)</th><th style="text-align:left;">脏读(Dirty Read)</th><th style="text-align:left;">不可重复读(Non Repeatable Read)</th><th style="text-align:left;">幻读(Phantom Read)</th></tr></thead><tbody><tr><td style="text-align:left;">读未提交(Read Uncommitted)</td><td style="text-align:left;">Yes</td><td style="text-align:left;">Yes</td><td style="text-align:left;">Yes</td></tr><tr><td style="text-align:left;">读已提交(Read Committed)</td><td style="text-align:left;">-</td><td style="text-align:left;">Yes</td><td style="text-align:left;">Yes</td></tr><tr><td style="text-align:left;">可重复读(Repeatable Read)</td><td style="text-align:left;">-</td><td style="text-align:left;">-</td><td style="text-align:left;">Yes</td></tr><tr><td style="text-align:left;">串行化(Serializable)</td><td style="text-align:left;">-</td><td style="text-align:left;">-</td><td style="text-align:left;">-</td></tr></tbody></table><h5 id="read-uncommitted" tabindex="-1"><a class="header-anchor" href="#read-uncommitted" aria-hidden="true">#</a> Read Uncommitted</h5><p>Read Uncommitted是隔离级别最低的一种事务级别。在这种隔离级别下，<strong>一个事务会读到另一个事务更新后但未提交的数据</strong>，如果另一个事务会滚，那么当前事务读到的数据就是脏数据，这就是<strong>脏读</strong>（Dirty Read）</p><h5 id="read-committed" tabindex="-1"><a class="header-anchor" href="#read-committed" aria-hidden="true">#</a> Read Committed</h5><p>在Read Committed隔离级别下，一个事务可能会遇到不可重复读（Non Repeatable Read）的问题。</p><p>不可重复读是指，在<strong>一个事务内，多次读同一数据，在这个事务还没有结束时，如果另一个事务恰好修改了这个数据</strong>，那么在第一个事务中，两次读取到的数据就可能不一致。</p><h5 id="repeatable-read" tabindex="-1"><a class="header-anchor" href="#repeatable-read" aria-hidden="true">#</a> Repeatable Read</h5><p>在Repeatable Read隔离级别下，一个事务可能会遇到<strong>幻读</strong>（Phantom Read）的问题。</p><p>幻读是指，在一个事务中，第一次查询某条记录，发现没有，但是当试图更新这条不存在的记录时，竟然能成功，并且，再次读取同一条记录，它就神奇地出现了。</p><h5 id="serializable" tabindex="-1"><a class="header-anchor" href="#serializable" aria-hidden="true">#</a> Serializable</h5><p>Serializable是最严格的隔离级别。在此隔离级别下，所有事务按照次序依次执行，因此，脏读、不可重复读、幻读都不会出现。</p><p>虽然Serializable隔离级别下的事务具有最高的安全性，但是，由于事务是串行执行，所以效率会大大下降，应用程序的性能会急剧降低。如果没有特别重要的情景，一般都不会使用Serializable隔离级别。</p><blockquote><p>如果没有指定隔离级别，数据库就会使用默认的隔离级别。在MySQL中，如果使用InnoDB，默认的隔离级别是Repeatable Read。</p></blockquote><h3 id="spring-中事务传播机制" tabindex="-1"><a class="header-anchor" href="#spring-中事务传播机制" aria-hidden="true">#</a> Spring 中事务传播机制</h3><p>Spring 事务传播机制是指，包含多个事务的方法在相互调用时，事务是如何在这些方法间传播的。</p><p>Spring 事务传播机制可使用 @Transactional(propagation=Propagation.REQUIRED) 来定义，Spring 事务传播机制的级别包含以下 7 种：</p><ul><li>Propagation.REQUIRED：默认的事务隔离级别，如果当前存在事务，则加入该事务；如果当前没有事务，则创建一个新的事务。</li><li>Propagation.SUPPORTS：如果当前存在事务，则加入该事务，如果当前没有事务，则创建一个新的事务。</li><li>Propagation.MANDATORY：（mandatory：强制性）如果当前存在事务，则加入该事务；如果当前没有事务，则抛出异常。</li><li>Propagation.REQUIRES_NEW：表示创建一个新的事务，如果当前存在事务，则把当前事务挂起。开启的事务相互独立，互不干扰。</li><li>Propagation.NOT_SUPPORTED：以非事务方式运行，如果当前存在事务，则把当前事务挂起。</li><li>Propagation.NEVER：以非事务方式运行，如果当前存在事务，则抛出异常。</li><li>Propagation.NESTED：如果当前存在事务，则创建一个事务作为当前事务的嵌套事务来运行；如果当前没有事务，则该取值等价于 PROPAGATION_REQUIRED。</li></ul>`,33),o=[l];function p(r,i){return n(),s("div",null,o)}const c=a(t,[["render",p],["__file","shujukushiwu.html.vue"]]);export{c as default};
