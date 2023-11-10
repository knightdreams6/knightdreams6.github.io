import{_ as e,o,c as d,a as c}from"./app-830c5607.js";const n={},r=c('<p><code>Java</code>中的锁分为以下几种：</p><ul><li>乐观锁、悲观锁</li><li>独享锁、共享锁</li><li>公平锁、非公平锁</li><li>互斥锁、读写锁</li><li>可重入锁</li><li>分段锁</li><li>锁升级（无锁 - &gt; 偏向锁 - &gt; 轻量级锁 - &gt; 重量级锁） <code>jdk1.6</code></li></ul><p>这些锁的分类并不全是指锁的状态，有的指锁的特性，有的指锁的设计。</p><h5 id="_1、-乐观锁-悲观锁-概念" tabindex="-1"><a class="header-anchor" href="#_1、-乐观锁-悲观锁-概念" aria-hidden="true">#</a> 1、 乐观锁 &amp; 悲观锁 （概念）</h5><p><strong>乐观锁：</strong> 乐观锁认为一个线程去拿数据的时候不会有其他线程对数据进行更改，所以不会上锁</p><p>​ 实现方式：<code>CAS</code> 机制、版本号机制</p><p><strong>悲观锁：</strong> 悲观锁认为一个线程去拿数据时一定会有其他线程对数据进行更改。所以一个线程在拿数据的时候都会加锁，这样别的线程想修改这个数据时就会阻塞。比如<code>synchronized</code>关键字的实现就是悲观锁。</p><h5 id="_2、独享锁-共享锁-概念" tabindex="-1"><a class="header-anchor" href="#_2、独享锁-共享锁-概念" aria-hidden="true">#</a> 2、独享锁 &amp; 共享锁 （概念）</h5><p><strong>独享锁：</strong> 该锁一次只能被一个线程所持有</p><p><strong>共享锁：</strong> 该锁可以被多个线程所持有</p><p><code>synchronized</code>、<code>ReentrantLock</code> 、<code>ReentranReadWriteLock.WriteLock</code> 是独享锁</p><p><code>ReentranReadWriteLock.ReadLock</code> 是共享锁</p><p>独享锁与共享锁通过 <code>AQS(AbstractQueuedSynchronizer)</code>来实现的，通过实现不同的方法，来实现独享或共享</p><h5 id="_3、互斥锁-读写锁-实现" tabindex="-1"><a class="header-anchor" href="#_3、互斥锁-读写锁-实现" aria-hidden="true">#</a> 3、互斥锁 &amp; 读写锁 （实现）</h5><p><strong>互斥锁</strong> 的具体实现就是 <code>synchronized</code>、<code>ReentrantLock</code>。<code>ReentrantLock</code>是<code>JDK1.5</code>的新特性，采用<code>ReentrantLock</code>可以完全替代替换<code>synchronized</code>传统的锁机制，更加灵活。</p><p><strong>读写锁</strong> 的具体实现就是 <code>ReadWriteLock</code></p><h5 id="_4、可重入锁" tabindex="-1"><a class="header-anchor" href="#_4、可重入锁" aria-hidden="true">#</a> 4、可重入锁</h5><blockquote><p>对于同一个线程在外层方法获取锁的时候，在进入内层方法时也会自动获取锁</p></blockquote><p>优点：避免死锁</p><p>举例：<code>ReentrantLock</code>、<code>synchronized</code></p><h5 id="_5、公平锁-非公平锁" tabindex="-1"><a class="header-anchor" href="#_5、公平锁-非公平锁" aria-hidden="true">#</a> 5、公平锁 &amp; 非公平锁</h5><p><strong>公平锁：</strong> 多个线程相互竞争时要排队，多个线程按照申请锁的顺序来获取。</p><p>​ 比如 <code>new ReentranctLock(true)</code></p><p><strong>非公平锁：</strong> 多个线程相互竞争时，先尝试插队，插队失败再排队。效率相对高</p><p>​ 比如：<code>synchronized</code> 、<code>new ReentrantLock()</code></p><h5 id="_6、分段锁" tabindex="-1"><a class="header-anchor" href="#_6、分段锁" aria-hidden="true">#</a> 6、分段锁</h5><p>分段锁并不是具体的一种锁，而是一种锁的设计。</p><p>分段锁的设计目的是细化锁的粒度，当操作不需要更新整个数组的时候，就仅仅针对数组中的一项进行加锁操作。<code>ConcurrentHashMap</code>底层就用了分段锁，使用<code>Segment</code>，就可以进行并发使用了，而<code>HashMap</code>是非线程安全的就差在了分段锁上。</p><h5 id="_7、偏向锁-轻量级锁-重量级锁" tabindex="-1"><a class="header-anchor" href="#_7、偏向锁-轻量级锁-重量级锁" aria-hidden="true">#</a> 7、偏向锁 &amp; 轻量级锁 &amp; 重量级锁</h5><p><code>JDK 1.6</code> 为了减少获得锁和释放锁所带来的性能消耗，在<code>JDK 1.6</code>里引入4种锁的状态： <strong>无锁、偏向锁、 轻量级锁和重量级锁，<strong>它会随着多线程的竞争情况</strong>逐渐升级</strong>，但<strong>不能降级</strong>。</p><p>大多数情况下，锁不仅不存在多线程竞争，而且总是由同一个线程获得，为了不让这个线程每次获得锁都需要<code>CAS</code>操作的性能消耗，就引入了<strong>偏向锁</strong>。当一个线程访问对象并且获取锁时，会在对象头里存储锁偏向的这个线程的ID，以后该线程再访问该对象时只需判断对象头的<code>Mark Word</code>里是否有这个线程的ID，如果有就不需要进行<code>CAS</code>操作，这就是偏向锁。</p><p>当线程竞争更激烈时，偏向锁就会升级为<strong>轻量级锁</strong>，轻量级锁认为虽然竞争存在，但是理想情况下竞争的程度很低，通过自旋方式等待一会儿上一个线程就会释放锁，但是当<strong>自旋</strong>超过了一定的次数，或者一个线程持有锁，一个线程在自旋，又来了第三个线程访问时（反正就是竞争又增大了），轻量级锁就会膨胀为<strong>重量级锁</strong>，重量级锁就是<code>Synchronized</code>，重量级锁会使除了当前拥有锁的线程以外的线程都阻塞。</p>',32),a=[r];function t(s,i){return o(),d("div",null,a)}const h=e(n,[["render",t],["__file","javasuodefenlei.html.vue"]]);export{h as default};
