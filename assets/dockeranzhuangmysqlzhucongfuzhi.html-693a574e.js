import{_ as s,o as a,c as n,b as e}from"./app-738c8638.js";const l={},i=e(`<h5 id="_1、目录配置文件准备" tabindex="-1"><a class="header-anchor" href="#_1、目录配置文件准备" aria-hidden="true">#</a> 1、目录配置文件准备</h5><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /home/mysql/master/data
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /home/mysql/slave1/data
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>默认的my.cnf配置文件</p></blockquote><div class="language-cnf line-numbers-mode" data-ext="cnf"><pre class="language-cnf"><code># The MySQL  Server configuration file.
#
# For explanations see
# http://dev.mysql.com/doc/mysql/en/server-system-variables.html

[mysqld]
pid-file        = /var/run/mysqld/mysqld.pid
socket          = /var/run/mysqld/mysqld.sock
datadir         = /var/lib/mysql
secure-file-priv= NULL

# Custom config should go here
!includedir /etc/mysql/conf.d/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>从服务器配置文件</p></blockquote><div class="language-cnf line-numbers-mode" data-ext="cnf"><pre class="language-cnf"><code>vim /home/mysql/master/my.cnf

在默认的配置文件后添加
server-id=200
innodb_flush_log_at_trx_commit=2
sync_binlog=1
relay_log_recovery=0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>主服务器配置文件</p></blockquote><div class="language-cnf line-numbers-mode" data-ext="cnf"><pre class="language-cnf"><code>server-id=100
innodb_flush_log_at_trx_commit=2
sync_binlog=1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="_2、启动主从mysql镜像服务" tabindex="-1"><a class="header-anchor" href="#_2、启动主从mysql镜像服务" aria-hidden="true">#</a> 2、启动主从mysql镜像服务</h5><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">--restart</span> always <span class="token parameter variable">-p</span> <span class="token number">3309</span>:3306 <span class="token parameter variable">--name</span> mysql_master <span class="token parameter variable">-v</span> /home/mysql/master/my.cnf:/etc/mysql/my.cnf <span class="token parameter variable">-v</span> /home/mysql/master/data:/var/lib/mysql <span class="token parameter variable">-e</span> <span class="token assign-left variable">MYSQL_ROOT_PASSWORD</span><span class="token operator">=</span><span class="token number">123</span> <span class="token parameter variable">-d</span> mysql
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">--restart</span> always <span class="token parameter variable">-p</span> <span class="token number">3310</span>:3306 <span class="token parameter variable">--name</span> mysql_slave1 <span class="token parameter variable">-v</span> /home/mysql/slave1/my.cnf:/etc/mysql/my.cnf <span class="token parameter variable">-v</span> /home/mysql/slave1/data:/var/lib/mysql <span class="token parameter variable">-e</span> <span class="token assign-left variable">MYSQL_ROOT_PASSWORD</span><span class="token operator">=</span><span class="token number">123</span> <span class="token parameter variable">-d</span> mysql
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h5 id="_3、在master数据库中创建从机账号并添加权限" tabindex="-1"><a class="header-anchor" href="#_3、在master数据库中创建从机账号并添加权限" aria-hidden="true">#</a> 3、在master数据库中创建从机账号并添加权限</h5><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token comment"># 创建用户</span>
<span class="token keyword">create</span> <span class="token keyword">user</span> <span class="token string">&#39;slave1&#39;</span><span class="token variable">@&#39;%&#39;</span> identified <span class="token keyword">with</span> mysql_native_password <span class="token keyword">by</span> <span class="token string">&#39;slave1&#39;</span><span class="token punctuation">;</span>
<span class="token comment"># 赋予权限</span>
<span class="token keyword">grant</span> <span class="token keyword">replication</span> slave <span class="token keyword">on</span> <span class="token operator">*</span><span class="token punctuation">.</span><span class="token operator">*</span> <span class="token keyword">to</span> <span class="token string">&#39;slave1&#39;</span><span class="token variable">@&#39;%&#39;</span><span class="token punctuation">;</span>
<span class="token comment"># 刷新权限</span>
flush <span class="token keyword">PRIVILEGES</span><span class="token punctuation">;</span>

<span class="token comment"># 通过该命令获取 File/Position字段（从数据库中要使用）</span>
<span class="token keyword">show</span> master <span class="token keyword">status</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="_4、在slave数据库中配置主数据库账号等信息" tabindex="-1"><a class="header-anchor" href="#_4、在slave数据库中配置主数据库账号等信息" aria-hidden="true">#</a> 4、在slave数据库中配置主数据库账号等信息</h5><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token comment"># master_host 主数据库容器ip (可以通过 docker network inspect 网络id查看容器ip)</span>
<span class="token comment"># master_port 主数据库内部端口</span>
<span class="token comment"># master_user 主数据创建的从数据库用户</span>
<span class="token comment"># master_password 主数据创建的从数据库用户密码</span>
<span class="token comment"># master_log_file 第三步获取的File字段</span>
<span class="token comment"># master_log_pos 第三步获取的Position字段</span>
change master <span class="token keyword">to</span> master_host<span class="token operator">=</span><span class="token string">&#39;172.17.0.7&#39;</span><span class="token punctuation">,</span> master_port<span class="token operator">=</span><span class="token number">3306</span><span class="token punctuation">,</span> master_user<span class="token operator">=</span><span class="token string">&#39;slave1&#39;</span><span class="token punctuation">,</span> master_password<span class="token operator">=</span><span class="token string">&#39;slave1&#39;</span><span class="token punctuation">,</span>master_log_file<span class="token operator">=</span><span class="token string">&#39;binlog.000002&#39;</span><span class="token punctuation">,</span> master_log_pos<span class="token operator">=</span><span class="token number">3549</span><span class="token punctuation">;</span>

<span class="token comment"># 开启slave模式</span>
<span class="token keyword">start</span> slave<span class="token punctuation">;</span>

<span class="token comment"># 此时可通过 show slave status 命令查看slave是否设置成功</span>
Slave_IO_Running: Yes Slave_SQL_Running: Yes 说明slave设置成功
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,15),r=[i];function t(c,o){return a(),n("div",null,r)}const p=s(l,[["render",t],["__file","dockeranzhuangmysqlzhucongfuzhi.html.vue"]]);export{p as default};
