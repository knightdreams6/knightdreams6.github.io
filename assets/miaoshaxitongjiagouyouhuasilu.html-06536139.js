import{_ as t,o,c as r,a as s}from"./app-830c5607.js";const p={},n=s('<h3 id="一、秒杀业务为什么难做" tabindex="-1"><a class="header-anchor" href="#一、秒杀业务为什么难做" aria-hidden="true">#</a> 一、秒杀业务为什么难做</h3><p>1）im系统，例如qq或者微博，每个人都读自己的数据（好友列表、群列表、个人信息）；</p><p>2）微博系统，每个人读你关注的人的数据，一个人读多个人的数据；</p><p>3）秒杀系统，库存只有一份，所有人会在集中的时间读和写这些数据，多个人读一个数据。</p><p>例如：小米手机每周二的秒杀，可能手机只有1万部，但瞬时进入的流量可能是几百几千万。</p><p>又例如：12306抢票，票是有限的，库存一份，瞬时流量非常多，都读相同的库存。<strong>读写冲突，锁非常严重，这是秒杀业务难的地方</strong>。那我们怎么优化秒杀业务的架构呢？</p><h3 id="二、优化方向" tabindex="-1"><a class="header-anchor" href="#二、优化方向" aria-hidden="true">#</a> 二、优化方向</h3><p>优化方向有两个（今天就讲这两个点）：</p><p>（1）<strong>将请求尽量拦截在系统上游</strong>（不要让锁冲突落到数据库上去）。传统秒杀系统之所以挂，请求都压倒了后端数据层，数据读写锁冲突严重，并发高响应慢，几乎所有请求都超时，流量虽大，下单成功的有效流量甚小。以12306为例，一趟火车其实只有2000张票，200w个人来买，基本没有人能买成功，请求有效率为0。</p><p>（2）<strong>充分利用缓存</strong>，秒杀买票，这是一个典型的读多些少的应用场景，大部分请求是车次查询，票查询，下单和支付才是写请求。一趟火车其实只有2000张票，200w个人来买，最多2000个人下单成功，其他人都是查询库存，写比例只有0.1%，读比例占99.9%，非常适合使用缓存来优化。好，后续讲讲怎么个“将请求尽量拦截在系统上游”法，以及怎么个“缓存”法，讲讲细节。</p><h3 id="三、常见秒杀架构" tabindex="-1"><a class="header-anchor" href="#三、常见秒杀架构" aria-hidden="true">#</a> 三、<strong>常见秒杀架构</strong></h3><p>（1）<strong>浏览器端</strong>，最上层，会执行到一些JS代码</p><p>（2）<strong>站点层</strong>，这一层会访问后端数据，拼html页面返回给浏览器</p><p>（3）<strong>服务层</strong>，向上游屏蔽底层数据细节，提供数据访问</p><p>（4）<strong>数据层</strong>，最终的库存是存在这里的，mysql是一个典型（当然还有会缓存）</p><h3 id="四、各层次优化细节" tabindex="-1"><a class="header-anchor" href="#四、各层次优化细节" aria-hidden="true">#</a> 四、各层次优化细节</h3><p><strong>第一层，客户端怎么优化（浏览器层，APP层）</strong></p><p>（a）<strong>产品层面</strong>，用户点击“查询”或者“购票”后，按钮置灰，禁止用户重复提交请求；</p><p>（b）<strong>JS层面</strong>，限制用户在x秒之内只能提交一次请求；</p><p><strong>第二层，站点层面的请求拦截</strong></p><blockquote><p>去重依据，(这类业务一般都需要登录，用uid即可。)在<strong>站点层面</strong>，对uid进行请求计数和去重，甚至不需要统一存储计数，直接站点层内存存储（这样计数会不准，但最简单）。一个uid，5秒只准透过1个请求，这样又能拦住99%的for循环请求。</p><p>5s只透过一个请求，其余的请求怎么办？缓存，页面缓存，同一个uid，限制访问频度，做页面缓存，x秒内到达站点层的请求，均返回同一页面。同一个item的查询，例如车次，做页面缓存，x秒内到达站点层的请求，均返回同一页面。如此限流，既能保证用户有良好的用户体验（没有返回404）又能保证系统的健壮性（利用页面缓存，把请求拦截在站点层了）。</p><p>页面缓存不一定要保证所有站点返回一致的页面，直接放在每个站点的内存也是可以的。优点是简单，坏处是http请求落到不同的站点，返回的车票数据可能不一样，这是站点层的请求拦截与缓存优化。</p></blockquote><p><strong>第三层服务层来拦截（反正就是不要让请求落到数据库上去）</strong></p><blockquote><p>服务层怎么拦截？大哥，我是服务层，我清楚的知道小米只有1万部手机，我清楚的知道一列火车只有2000张车票，我透10w个请求去数据库有什么意义呢？没错，<strong>请求队列！</strong></p><p>对于写请求，做请求队列，每次只透有限的写请求去数据层（下订单，支付这样的写业务）</p><p>1w部手机，只透1w个下单请求去db</p><p>3k张火车票，只透3k个下单请求去db</p><p>如果均成功再放下一批，如果库存不够则队列里的写请求全部返回“已售完”。</p><p>对于读请求，怎么优化？cache抗，不管是memcached还是redis，单机抗个每秒10w应该都是没什么问题的。如此限流，只有非常少的写请求，和非常少的读缓存mis的请求会透到数据层去，又有99.9%的请求被拦住了。</p></blockquote><p>【转自】微信公众号： 架构师之路</p>',24),a=[n];function e(i,h){return o(),r("div",null,a)}const g=t(p,[["render",e],["__file","miaoshaxitongjiagouyouhuasilu.html.vue"]]);export{g as default};
