---
title: SpringSecurity
date: 2022-01-02 19:32:01
tags:
  - Spring
---

官方文档：https://docs.spring.io/spring-security/reference/

### 体系结构

#### 过滤器

Spring Security 的 Servlet 支持是基于 Servlet Filters的。

客户端向应用程序发送请求，容器创建一个 FilterChain，其中包含根据请求 URI 的路径处理 HttpServletRequest 的 Filters 和 Servlet。在 Spring MVC 应用程序中，Servlet 是 DispatcherServlet 的一个实例。 一个 Servlet 最多可以处理一个 HttpServletRequest 和 HttpServletResponse。 但是，可以使用多个过滤器来：

- 防止下游过滤器或 Servlet 被调用。在这种情况下，过滤器通常会写入HttpServletResponse。
- 修改下游Filters和Servlet使用的HttpServletRequest或HttpServletResponse

`FilterChain` 使用示例

```java
public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) {
	// do something before the rest of the application
    chain.doFilter(request, response); // invoke the rest of the application
    // do something after the rest of the application
}
```

> 由于过滤器仅影响下游过滤器和 Servlet，因此调用每个过滤器的顺序非常重要



#### 委托过滤器代理

Spring提供了一个名为 `DelegatingFilterProxy` 的过滤器实现，它允许在 Servlet 容器的生命周期和 Spring 的 `ApplicationContext` 之间进行桥接。Servlet 容器允许使用自己的标准注册过滤器，但它不知道Spring定义的bean。`DelegatingFilterProxy` 可以通过标准 Servlet 容器机制注册，但将所有工作委托给实现 Filter 的 Spring Bean。 

`DelegatingFilterProxy` 伪代码示例

```
public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) {
	// 延迟获取已注册为 Spring Bean 的过滤器
	Filter delegate = getFilterBean(someBeanName);
	// 将工作委托给 Spring Bean
	delegate.doFilter(request, response);
}
```

`DelegatingFilterProxy` 的另一个好处是它允许延迟查找 Filter bean 实例。这很重要，因为容器需要再启动之前注册 Filter实例，但是，Spring通常使用 `ContextLoaderListener` 来加载 `Spring Bean` ，这需要注册过滤器实例之后才完成



#### 过滤链代理

Spring Security 的 Servlet 支持包含在 FilterChainProxy 中。FilterChainProxy 是 Spring Security 提供的一个特殊的 Filter，它允许通过 SecurityFilterChain 委托给许多 Filter 实例。 由于 FilterChainProxy 是一个 Bean，它通常被包装在一个 DelegatingFilterProxy 中。



#### Security过滤链

FilterChainProxy 使用 SecurityFilterChain 来确定应为此请求调用哪些 Spring 安全过滤器。

SecurityFilterChain 中的安全过滤器通常是 Bean，但他们注册到 FilterChainProxy 而不是 DelegatingFilterProxy。因为FilterChainProxy 比直接向 Servlet 容器或 DelegatingFilterProxy 注册提供了许多优势。首先，它为 Spring Security 的所有 Servlet支持提供了一个起点。因此如果尝试对 Spring Security进行debug，那么FilterChainProxy中添加调试点是一个好的选择。

其次，由于 FilterChainProxy是 Spring Security 使用的核心，它可以执行不被视为可选的任务，例如，它清除 SecurityContext 以避免内存泄漏。 它还应用 Spring Security 的 HttpFirewall 来保护应用程序免受某些类型的攻击。

此外，它在确定合适应该调用 SecurityFilterChain 方面提供了更大的灵活性。在Servlet容器中，仅根据URL 调用过滤器。但是，在FilterChainProxy 可以利用 RequestMatcher 接口根据 HttpServletRequest 中的任何内容确定是否继续执行。

实际上，FilterChainProxy 可用于确定应使用哪个 SecurityFilterChain。这允许为应用程序的不同部分提供完全独立的配置。



#### Security过滤器

安全过滤器通过 SecurityFilterChain API 插入到 FilterChainProxy中。过滤器的顺序很重要

以下是Spring Security Filter 排序的完整列表：

###### 1、ChannelProcessingFilter

确定当前请求是否符合配置的协议。用来过滤请求必须用https协议、http协议、或随便用哪个协议都行.

###### 2、WebAsyncManagerIntegrationFilter

使WebAsyncTask可以从SecurityContextHolder获取身份认证信息

###### 3、SecurityContextPersistenceFilter

- 如果存在共享对象`SecurityContextRepository`，则使用它作为安全上下文存储库，否则创建一个实现类型为`HttpSessionSecurityContextRepository`的存储库并使用
- 如果配置器`SessionManagementConfigurer`中配置的会话创建策略`SessionCreationPolicy`为`ALWAYS`的话,则将过滤器属性`forceEagerSessionCreation`设置为`true`

###### 4、HeaderWriterFilter

写入安全相关的响应头  [防止漏洞过滤 http headers]

###### 5、CorsFilter

处理跨域请求

###### 6、CsrfFilter

使用同步器令牌模式过滤 CSRF 攻击。通常， `CsrfTokenRepository`实现选择将CsrfToken存储在HttpSession ， `HttpSessionCsrfTokenRepository`由`LazyCsrfTokenRepository`包装。 这比将令牌存储在可由客户端应用程序修改的 cookie 中更受欢迎。

###### 7、LogoutFilter

轮询一系列LogoutHandler 。 处理程序应按需要的顺序指定。 通常， 需要调用注销处理程序TokenBasedRememberMeServices和SecurityContextLogoutHandler 

注销后，将重定向到由配置的LogoutSuccessHandler或logoutSuccessUrl确定的 URL，具体取决于使用的构造函数。

###### 8、OAuth2AuthorizationRequestRedirectFilter

拦截`/oauth2/authorization`请求并构造`OAuth2AuthorizationRequest`，然后重定向到`authorizationRequestUri`进行请求授权。

###### 9、Saml2WebSsoAuthenticationRequestFilter

这个需要用到 `Spring Security SAML` 模块，这是一个基于 `SMAL` 的 `SSO` 单点登录请求认证过滤器。

###### 10、X509AuthenticationFilter

`X509` 认证过滤器。可以通过 `HttpSecurity#X509()` 来启用和配置相关功能。

###### 11、AbstractPreAuthenticatedProcessingFilter

AbstractPreAuthenticatedProcessingFilter 处理处理经过预先认证的身份验证请求的过滤器的基类，其中认证主体已经由外部系统进行了身份验证。 目的只是从传入请求中提取主体上的必要信息，而不是对它们进行身份验证。

可以继承该类进行具体实现并通过 HttpSecurity#addFilter 方法来添加个性化的AbstractPreAuthenticatedProcessingFilter 。

###### 12、CasAuthenticationFilter

`CAS` 单点登录认证过滤器 。依赖 Spring Security CAS 模块

###### 13、OAuth2LoginAuthenticationFilter

用于 OAuth 2.0 登录的AbstractAuthenticationProcessingFilter的实现。

此身份验证Filter处理授权代码授权流的 OAuth 2.0 授权响应，并将OAuth2LoginAuthenticationToken委托给AuthenticationManager以登录最终用户。

OAuth 2.0 授权响应处理如下：

- 假设最终用户（资源所有者）已授予对客户端的访问权限，授权服务器会将code和state参数附加到redirect_uri （在授权请求中提供）并将最终用户的用户代理重定向回此Filter （客户端）。 然后，此Filter将使用收到的code创建一个OAuth2LoginAuthenticationToken并将其委托给AuthenticationManager进行身份验证。
- 身份验证成功后，将创建OAuth2AuthenticationToken （代表最终用户Principal ）并使用OAuth2AuthorizedClientRepository将其关联到Authorized Client 。
- 最后返回OAuth2AuthenticationToken并最终存放在SecurityContextRepository ，完成认证处理。

###### 14、Saml2WebSsoAuthenticationFilter

> 这个需要用到 `Spring Security SAML` 模块，这是一个基于 `SMAL` 的 `SSO` 单点登录认证过滤器

###### 15、[`UsernamePasswordAuthenticationFilter`](https://docs.spring.io/spring-security/reference/servlet/authentication/passwords/form.html#servlet-authentication-usernamepasswordauthenticationfilter)

当用户提交他们的用户名和密码，则`UsernamePasswordAuthenticationFilter`创建一个`UsernamePasswordAuthenticationToken`其是一种类型的[`Authentication`](https://docs.spring.io/spring-security/reference/servlet/authentication/architecture.html#servlet-authentication-authentication)通过提取从所述用户名和密码`HttpServletRequest`。

接下来，将`UsernamePasswordAuthenticationToken`传递到`AuthenticationManager`要进行身份验证的 。`AuthenticationManager`外观的详细信息取决于[用户信息的存储方式](https://docs.spring.io/spring-security/reference/servlet/authentication/passwords/index.html#servlet-authentication-unpwd-storage)。

如果身份验证失败

- 该[SecurityContextHolder中](https://docs.spring.io/spring-security/reference/servlet/authentication/architecture.html#servlet-authentication-securitycontextholder)被清除出去。
- `RememberMeServices.loginFail`被调用。如果记住我没有配置，这是一个空操作。
- `AuthenticationFailureHandler` 被调用。

如果身份验证成功

- `SessionAuthenticationStrategy` 收到新登录通知。
- 该[认证](https://docs.spring.io/spring-security/reference/servlet/authentication/architecture.html#servlet-authentication-authentication)被设置在[SecurityContextHolder中](https://docs.spring.io/spring-security/reference/servlet/authentication/architecture.html#servlet-authentication-securitycontextholder)。
- `RememberMeServices.loginSuccess`被调用。如果记住我没有配置，这是一个空操作。
- `ApplicationEventPublisher`发布一个`InteractiveAuthenticationSuccessEvent`.
- 在`AuthenticationSuccessHandler`被调用。通常，这`SimpleUrlAuthenticationSuccessHandler`将重定向到[`ExceptionTranslationFilter`](https://docs.spring.io/spring-security/reference/servlet/architecture.html#servlet-exceptiontranslationfilter)我们重定向到登录页面时保存的请求。

###### 16、OpenIDAuthenticationFilter

基于`OpenID` 认证协议的认证过滤器。 你需要在依赖中依赖额外的相关模块才能启用它。

###### 17、DefaultLoginPageGeneratingFilter

生成默认的登录页。默认 `/login` 。

###### 18、DefaultLogoutPageGeneratingFilter

生成默认的退出页。 默认 `/logout` 。

###### 19、ConcurrentSessionFilter

ConcurrentSessionFilter 主要用来判断session是否过期以及更新最新的访问时间。其流程为：

session 检测，如果不存在直接放行去执行下一个过滤器。存在则进行下一步。
根据sessionid从SessionRegistry中获取SessionInformation，从SessionInformation中获取session是否过期；没有过期则更新SessionInformation中的访问日期；
如果过期，则执行doLogout()方法，这个方法会将session无效，并将 SecurityContext 中的Authentication中的权限置空，同时在SecurityContenxtHoloder中清除SecurityContext然后查看是否有跳转的 expiredUrl，如果有就跳转，没有就输出提示信息。
ConcurrentSessionFilter 通过SessionManagementConfigurer 来进行配置。

###### 20、[`DigestAuthenticationFilter`](https://docs.spring.io/spring-security/reference/servlet/authentication/passwords/digest.html#servlet-authentication-digest)

Digest`身份验证是 `Web` 应用程序中流行的可选的身份验证机制 。`DigestAuthenticationFilter` 能够处理 `HTTP` 头中显示的摘要式身份验证凭据。可以通过 `HttpSecurity#addFilter()` 来启用和配置相关功能。

###### 21、BearerTokenAuthenticationFilter

验证包含 OAuth 2.0 Bearer Token 的 请求。 此过滤器应与可以验证BearerTokenAuthenticationToken的AuthenticationManager BearerTokenAuthenticationToken 。

###### 22、[`BasicAuthenticationFilter`](https://docs.spring.io/spring-security/reference/servlet/authentication/passwords/basic.html#servlet-authentication-basic)

和`Digest`身份验证一样都是`Web` 应用程序中流行的可选的身份验证机制 。 `BasicAuthenticationFilter` 负责处理 `HTTP` 头中显示的基本身份验证凭据。这个 **Spring Security** 的 **Spring Boot** 自动配置默认是启用的 。

###### 23、RequestCacheAwareFilter

用于用户认证成功后，重新恢复因为登录被打断的请求。当匿名访问一个需要授权的资源时。会跳转到认证处理逻辑，此时请求被缓存。在认证逻辑处理完毕后，从缓存中获取最开始的资源请求进行再次请求。

RequestCacheAwareFilter 通过 HttpScurity#requestCache() 及相关方法引入其配置对象 RequestCacheConfigurer 来进行配置。

###### 24、SecurityContextHolderAwareRequestFilter

用来 实现j2ee中 Servlet Api 一些接口方法, 比如 getRemoteUser 方法、isUserInRole 方法，在使用 Spring Security 时其实就是通过这个过滤器来实现的。

SecurityContextHolderAwareRequestFilter 通过 HttpSecurity.servletApi() 及相关方法引入其配置对象 ServletApiConfigurer 来进行配置。

###### 25、JaasApiIntegrationFilter

适用于JAAS （Java 认证授权服务）。 如果 SecurityContextHolder 中拥有的 Authentication 是一个 JaasAuthenticationToken，那么该 JaasApiIntegrationFilter 将使用包含在 JaasAuthenticationToken 中的 Subject 继续执行 FilterChain。

###### 26、RememberMeAuthenticationFilter

处理 **记住我** 功能的过滤器。

`RememberMeAuthenticationFilter` 通过 `HttpSecurity.rememberMe()` 及相关方法引入其配置对象 `RememberMeConfigurer` 来进行配置。

###### 27、AnonymousAuthenticationFilter

匿名认证过滤器。对于 Spring Security 来说，所有对资源的访问都是有 Authentication 的。对于无需登录（UsernamePasswordAuthenticationFilter ）直接可以访问的资源，会授予其匿名用户身份。

AnonymousAuthenticationFilter 通过 HttpSecurity.anonymous() 及相关方法引入其配置对象 AnonymousConfigurer 来进行配置。

###### 28、OAuth2AuthorizationCodeGrantFilter

表示 OAuth 2.0 授权代码授权，它处理 OAuth 2.0 授权响应的处理。

- 假设最终用户（资源所有者）已授予对客户端的访问权限，则授权服务器会将[`code`](https://docs.spring.io/spring-security/site/docs/current/api/org/springframework/security/oauth2/core/endpoint/OAuth2ParameterNames.html#CODE)和 [`state`](https://docs.spring.io/spring-security/site/docs/current/api/org/springframework/security/oauth2/core/endpoint/OAuth2ParameterNames.html#STATE)参数附加到 [`redirect_uri`](https://docs.spring.io/spring-security/site/docs/current/api/org/springframework/security/oauth2/core/endpoint/OAuth2ParameterNames.html#REDIRECT_URI)（在授权请求中提供）并将最终用户的用户代理重定向回此`Filter`（客户端）。
- `Filter`然后，这将[`OAuth2AuthorizationCodeAuthenticationToken`](https://docs.spring.io/spring-security/site/docs/current/api/org/springframework/security/oauth2/client/authentication/OAuth2AuthorizationCodeAuthenticationToken.html)使用[`code`](https://docs.spring.io/spring-security/site/docs/current/api/org/springframework/security/oauth2/core/endpoint/OAuth2ParameterNames.html#CODE)接收到的创建一个 并将其 委托给 [`AuthenticationManager`](https://docs.spring.io/spring-security/site/docs/current/api/org/springframework/security/authentication/AuthenticationManager.html)进行身份验证。
- 身份验证成功后，[`Authorized Client`](https://docs.spring.io/spring-security/site/docs/current/api/org/springframework/security/oauth2/client/OAuth2AuthorizedClient.html)通过[`client`](https://docs.spring.io/spring-security/site/docs/current/api/org/springframework/security/oauth2/client/authentication/OAuth2AuthorizationCodeAuthenticationToken.html#getClientRegistration())将[`access token`](https://docs.spring.io/spring-security/site/docs/current/api/org/springframework/security/oauth2/client/authentication/OAuth2AuthorizationCodeAuthenticationToken.html#getAccessToken()) 与当前相关联 `Principal`并通过 [`OAuth2AuthorizedClientRepository`](https://docs.spring.io/spring-security/site/docs/current/api/org/springframework/security/oauth2/client/web/OAuth2AuthorizedClientRepository.html).

###### 29、SessionManagementFilter

Session 管理器过滤器，内部维护了一个 SessionAuthenticationStrategy 用于管理 Session 。

SessionManagementFilter 通过 HttpScurity#sessionManagement() 及相关方法引入其配置对象 SessionManagementConfigurer 来进行配置。

30、[`ExceptionTranslationFilter`](https://docs.spring.io/spring-security/reference/servlet/architecture.html#servlet-exceptiontranslationfilter)

在[`ExceptionTranslationFilter`](https://docs.spring.io/spring-security/site/docs/5.6.0/api/org/springframework/security/web/access/ExceptionTranslationFilter.html)允许的翻译[`AccessDeniedException`](https://docs.spring.io/spring-security/site/docs/5.6.0/api/org/springframework/security/access/AccessDeniedException.html)和[`AuthenticationException`](https://docs.spring.io/spring-security/site/docs/5.6.0/api//org/springframework/security/core/AuthenticationException.html)到HTTP响应。

`ExceptionTranslationFilter`作为[安全过滤器](https://docs.spring.io/spring-security/reference/servlet/architecture.html#servlet-security-filters)之一插入到[FilterChainProxy](https://docs.spring.io/spring-security/reference/servlet/architecture.html#servlet-filterchainproxy)中。

1. 首先`ExceptionTranslationFilter`调用`FilterChain.doFilter(request, response)`应用程序的其余部分。
2. 如果用户未通过身份验证或者是`AuthenticationException`，则*启动身份验证*。
   - 该[SecurityContextHolder中](https://docs.spring.io/spring-security/reference/servlet/authentication/architecture.html#servlet-authentication-securitycontextholder)被清除出
   - 将`HttpServletRequest`被保存在[`RequestCache`](https://docs.spring.io/spring-security/site/docs/5.6.0/api/org/springframework/security/web/savedrequest/RequestCache.html)。当用户成功认证时，`RequestCache`用于重放原始请求。
   - `AuthenticationEntryPoint`用于从客户机请求的凭证。例如，它可能会重定向到登录页面或发送`WWW-Authenticate`标头。
   - 否则，如果是`AccessDeniedException`，则*拒绝访问*。将`AccessDeniedHandler`被调用，以拒绝提手接近。

###### 31、[`FilterSecurityInterceptor`](https://docs.spring.io/spring-security/reference/servlet/authorization/authorize-requests.html#servlet-authorization-filtersecurityinterceptor)

这个过滤器决定了访问特定路径应该具备的权限，访问的用户的角色，权限是什么？访问的路径需要什么样的角色和权限？这些判断和处理都是由该类进行的

1. 首先从[SecurityContextHolder](https://docs.spring.io/spring-security/reference/servlet/authentication/architecture.html#servlet-authentication-securitycontextholder)`FilterSecurityInterceptor`获取[身份验证](https://docs.spring.io/spring-security/reference/servlet/authentication/architecture.html#servlet-authentication-authentication)。
2. 其次，`FilterSecurityInterceptor`创建一个[`FilterInvocation`](https://docs.spring.io/spring-security/site/docs/5.6.0/api/org/springframework/security/web/FilterInvocation.html)从`HttpServletRequest`，`HttpServletResponse`和`FilterChain`被传入`FilterSecurityInterceptor`。
3. 接下来，它通过`FilterInvocation`to`SecurityMetadataSource`来获取`ConfigAttributes`
4. 最后，经过`Authentication`，`FilterInvocation`以及`ConfigAttribute`年代到`AccessDecisionManager`。
   1. 如果授权被拒绝，`AccessDeniedException`则抛出an 。在这种情况下，[`ExceptionTranslationFilter`](https://docs.spring.io/spring-security/reference/servlet/architecture.html#servlet-exceptiontranslationfilter)处理`AccessDeniedException`.
   2. 如果授予访问权限，则`FilterSecurityInterceptor`继续使用允许应用程序正常处理的[FilterChain](https://docs.spring.io/spring-security/reference/servlet/architecture.html#servlet-filters-review)。

默认情况下，Spring Security 的授权将要求对所有请求进行身份验证。显式配置如下所示：

```java
protected void configure(HttpSecurity http) throws Exception {
	http
		// ...
		.authorizeHttpRequests(authorize -> authorize
			.anyRequest().authenticated()
		);
}
```

我们可以通过按优先顺序添加更多规则来配置 Spring Security 以具有不同的规则。

```java
protected void configure(HttpSecurity http) throws Exception {
	http
		// ...
		.authorizeHttpRequests(authorize -> authorize
			.mvcMatchers("/resources/**", "/signup", "/about")
                               // 任何用户都可以访问请求。
                               .permitAll()
			// 	任何以“/admin/”开头的 URL 将被限制为具有“ROLE_ADMIN”角色的用户。您会注意到，由于我们正在调用该hasRole方法，因此不需要指定“ROLE_”前缀。                              
			.mvcMatchers("/admin/**").hasRole("ADMIN")
			// 任何以“/db/”开头的 URL 都要求用户同时拥有“ROLE_ADMIN”和“ROLE_DBA”。您会注意到，由于我们使用的是hasRole表达式，因此不需要指定“ROLE_”前缀。                               
			.mvcMatchers("/db/**").access("hasRole('ADMIN') and hasRole('DBA')")
			.anyRequest().denyAll()
		);
}
```

###### 32、SwitchUserFilter

> `SwitchUserFilter` 是用来做账户切换的。默认的切换账号的`url`为`/login/impersonate`，默认注销切换账号的`url`为`/logout/impersonate`，默认的账号参数为`username` 。
>
> 可以通过此类实现自定义的账户切换。



### 防止漏洞利用

#### CSRF

##### 什么是 CSRF 攻击？

**Cross-site request forgery** 跨站点请求伪造，是一种类型的恶意[攻击](https://en.wikipedia.org/wiki/Exploit_(computer_security))一个的[网站](https://en.wikipedia.org/wiki/Website)的情况下擅自命令从提交的[用户](https://en.wikipedia.org/wiki/User_(computing))Web 应用程序信任的。恶意网站可以通过多种方式传输此类命令；例如，特制的图像标签、隐藏表单和[JavaScript](https://en.wikipedia.org/wiki/JavaScript) XMLHttpRequests 都可以在没有用户交互甚至不知情的情况下工作。与[跨站脚本](https://en.wikipedia.org/wiki/Cross-site_scripting)不同 (XSS)，它利用用户对特定站点的信任，CSRF 利用站点对用户浏览器的信任。

在 CSRF 攻击中，无辜的最终用户被攻击者诱骗提交了一个他们不想要的 Web 请求。这可能会导致在网站上执行操作，包括无意中泄露客户端或服务器数据、更改会话状态或操纵最终用户的帐户。

##### 防范CSRF攻击

之所以可能发生CSRF攻击，是因为受害者网站的HTTP请求和攻击者网站的请求完全相同。这意味着无法拒绝来自邪恶网站的请求并允许来自银行网站的请求。为了防止 CSRF 攻击，我们需要确保请求中存在恶意站点无法提供的内容，以便我们可以区分这两个请求。

Spring 提供了两种机制来防止 CSRF 攻击：

- 该[同步标记模式](https://docs.spring.io/spring-security/reference/features/exploits/csrf.html#csrf-protection-stp)
- 在会话 cookie 上指定[SameSite 属性](https://docs.spring.io/spring-security/reference/features/exploits/csrf.html#csrf-protection-ssa)

> 两种保护都要求[安全方法必须是幂等的](https://docs.spring.io/spring-security/reference/features/exploits/csrf.html#csrf-protection-idempotent)

为了使CSRF[保护](https://docs.spring.io/spring-security/reference/features/exploits/csrf.html#csrf-protection)工作，应用程序必须确保[“安全”的 HTTP 方法是幂等的](https://tools.ietf.org/html/rfc7231#section-4.2.1)。这意味着，与HTTP方法请求`GET`，`HEAD`，`OPTIONS`，和`TRACE`不应该改变应用程序的状态。

##### 同步器令牌模式

防止 CSRF 攻击的主要和最全面的方法是使用[同步器令牌模式](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html#synchronizer-token-pattern)。该解决方案是为了确保每个 HTTP 请求除了我们的会话 cookie 之外，还必须在 HTTP 请求中存在一个安全的随机生成值，称为 CSRF 令牌。

提交 HTTP 请求时，服务器必须查找预期的 CSRF 令牌并将其与 HTTP 请求中的实际 CSRF 令牌进行比较。如果值不匹配，则应拒绝 HTTP 请求。

这项工作的关键是实际的 CSRF 令牌应该位于浏览器不会自动包含的 HTTP 请求的一部分中。例如，在 HTTP 参数或 HTTP 标头中要求实际 CSRF 令牌将防止 CSRF 攻击。在 cookie 中要求实际的 CSRF 令牌是行不通的，因为浏览器会自动将 cookie 包含在 HTTP 请求中。

我们可以放宽期望，为每个更新应用程序状态的 HTTP 请求只需要实际的 CSRF 令牌。为此，我们的应用程序必须确保[安全的 HTTP 方法是幂等的](https://docs.spring.io/spring-security/reference/features/exploits/csrf.html#csrf-protection-idempotent)。这提高了可用性，因为我们希望允许使用来自外部站点的链接链接到我们的网站。此外，我们不希望在 HTTP GET 中包含随机令牌，因为这会导致令牌泄漏。

```java
 protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
                .anyRequest().authenticated().and()
                .formLogin().and()
                // 默认已启用 CSRF 保护，并将 csrf token 存储在 session 中
                http.csrf().csrfTokenRepository(new LazyCsrfTokenRepository(new HttpSessionCsrfTokenRepository()));
    }
```



**相同站点属性**

一种防止[CSRF 攻击](https://docs.spring.io/spring-security/reference/features/exploits/csrf.html#csrf)的新兴方法是在 cookie 上指定[SameSite 属性](https://tools.ietf.org/html/draft-west-first-party-cookies)。服务器可以`SameSite`在设置 cookie 时指定该属性，以指示当来自外部站点时不应发送 cookie。

> Spring Security 不直接控制会话 cookie 的创建，因此它不提供对 SameSite 属性的支持。 [Spring Session](https://spring.io/projects/spring-session)为`SameSite`基于 servlet 的应用程序中的属性提供支持。Spring Framework 的[CookieWebSessionIdResolver](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/web/server/session/CookieWebSessionIdResolver.html)为`SameSite`基于 WebFlux 的应用程序中的属性提供开箱即用的支持。

例如，具有该`SameSite`属性的HTTP 响应标头可能如下所示：

```
Set-Cookie: JSESSIONID=randomid; Domain=bank.example.com; Secure; HttpOnly; SameSite=Lax
```

`SameSite`属性的有效值为：

- `Strict`- 指定时，来自[同一站点的](https://tools.ietf.org/html/draft-west-first-party-cookies-07#section-2.1)任何请求都将包含 cookie。否则，cookie 将不会包含在 HTTP 请求中。
- `Lax`- 当来自[同一个站点](https://tools.ietf.org/html/draft-west-first-party-cookies-07#section-2.1)或当请求来自顶级导航并且[方法是幂等的](https://docs.spring.io/spring-security/reference/features/exploits/csrf.html#csrf-protection-idempotent)时，将发送指定的 cookie 。否则，cookie 将不会包含在 HTTP 请求中。

随着`SameSite`我们的会话cookie属性集，浏览器将继续发送`JSESSIONID`从银行网站来请求的cookie。但是，浏览器将不再发送`JSESSIONID`带有来自恶意网站的传输请求的cookie。由于会话不再出现在来自恶意网站的传输请求中，因此应用程序可以免受 CSRF 攻击。

在使用属性来防止 CSRF 攻击时，应该注意一些重要的[考虑因素](https://tools.ietf.org/html/draft-west-first-party-cookies-07#section-5)`SameSite`。

将该`SameSite`属性设置为`Strict`提供了更强的防御，但可能会使用户感到困惑。考虑一个用户保持登录到托管在[https://social.example.com](https://social.example.com/)的社交媒体网站。用户在[https://email.example.org](https://email.example.org/)收到一封电子邮件，其中包含指向社交媒体网站的链接。如果用户点击链接，他们理所当然地希望通过社交媒体网站的身份验证。但是，如果`SameSite`属性是`Strict`cookie，则不会发送 cookie，因此不会对用户进行身份验证。

> 我们可以`SameSite`通过实施[gh-7537](https://github.com/spring-projects/spring-security/issues/7537)来提高针对 CSRF 攻击的保护和可用性。

另一个明显的考虑是，为了`SameSite`保护用户的属性，浏览器必须支持该`SameSite`属性。大多数现代浏览器都[支持 SameSite 属性](https://developer.mozilla.org/en-US/docs/Web/HTTP/headers/Set-Cookie#Browser_compatibility)。但是，仍在使用的旧浏览器可能不会。

出于这个原因，通常建议使用该`SameSite`属性作为深度防御，而不是针对 CSRF 攻击的唯一保护。



##### 何时使用CSRF 保护

什么时候应该使用 CSRF 保护？建议是对普通用户可以由浏览器处理的任何请求使用 CSRF 保护。如果您只创建供非浏览器客户端使用的服务，可能不需要 CSRF 保护。



#####  CSRF 和无状态浏览器应用程序

如果我的应用程序是无状态的怎么办？这并不一定意味着您受到保护。事实上，如果用户不需要在 Web 浏览器中针对给定请求执行任何操作，他们可能仍然容易受到 CSRF 攻击。

例如，考虑一个应用程序，它使用一个自定义 cookie，其中包含用于身份验证的所有状态而不是 JSESSIONID。当进行 CSRF 攻击时，自定义 cookie 将与请求一起发送，方式与我们之前示例中发送 JSESSIONID cookie 的方式相同。此应用程序将容易受到 CSRF 攻击。

使用基本身份验证的应用程序也容易受到 CSRF 攻击。该应用程序很容易受到攻击，因为浏览器会自动在任何请求中包含用户名和密码，其方式与我们之前示例中发送 JSESSIONID cookie 的方式相同。



#### Http Headers

Spring Security 提供了一组默认的与安全相关的 HTTP 响应头来提供安全的默认值

```
Cache-Control: no-cache, no-store, max-age=0, must-revalidate
Pragma: no-cache
Expires: 0
X-Content-Type-Options: nosniff
# 仅添加到HTTPS请求上
Strict-Transport-Security: max-age=31536000 ; includeSubDomains
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
```

配置示例

```java
@EnableWebSecurity
public class WebSecurityConfig extends
		WebSecurityConfigurerAdapter {

	@Override
	protected void configure(HttpSecurity http) {
		http
			// ...
			.headers(headers -> headers
                 // 自定义默认安全响应头
				.frameOptions(frameOptions -> frameOptions
					.sameOrigin()
				)
                 // 除非明确列出，否则不要使用任何默认标头
				.defaultsDisabled()
                 // 自定义缓存控制标头
                .cacheControl(withDefaults())
                 // 禁用所有HTTP 安全标头
                .disable()
			);
	}
}
```

**Cache Control**

Spring Security 的默认设置是禁用缓存以保护用户的内容

如果用户通过身份验证查看敏感信息然后注销，我们不希望恶意用户能够点击后退按钮查看敏感信息。默认发送的缓存控制头是：

```
Cache-Control: no-cache, no-store, max-age=0, must-revalidate
Pragma: no-cache
Expires: 0

```

默认情况下，Spring Security 默认添加这些响应头。自己可以提供缓存控制响应头覆盖默认值。这允许应用程序确保可以缓存 CSS 和 JavaScript 等静态资源。

```java
	@Override
	protected void configure(HttpSecurity http) {
		http
			// ...
			.headers(headers -> headers
                 // 禁用缓存控制
				.cacheControl(cache -> cache.disable())
			);
	}

```



**Content Type Options**

浏览器会通过猜测未指定内容类型的资源的内容类型来改善用户体验。例如如果浏览器遇到没有指定内容类型的 JavaScript 文件，它可以猜测内容类型然后运行它。

内容嗅探的问题在于，这允许恶意用户使用多语言（即作为多种内容类型有效的文件）来执行 XSS 攻击

默认情况下，Spring Security 通过向 HTTP 响应添加以下头来禁用内容嗅探

```
X-Content-Type-Options: nosniff

```

```java
	@Override
	protected void configure(HttpSecurity http) {
		http
			// ...
			.headers(headers -> headers
                 // 禁用内容类型选项
				.cacheControl(cache -> cache.disable())
			);
	}

```



**Http Strict Transport Security (HSTS)**

当使用 http 访问网站时，如果省略 https 协议，则可能容易收到中间人攻击。即使网站执行重定向到 https，恶意用户也可以拦截初始 http 请求并操纵响应。

许多用户省略了 https 协议，这就是创建该响应头的原因。一旦将域名添加为 HSTS 主机，浏览器就可以提前知道该域名的任何请求都应该被解释为https。这大大降低了中间人攻击发生的可能性。

> HSTS 标头仅注入到 HTTPS 响应中。为了让浏览器确认响应头，浏览器必须首先信任签署用于建立连接的 SSL 证书的 CA（不仅仅是 SSL 证书）。

将站点标记为 HSTS 主机的一种方法是将主机预加载到浏览器中。另一种方法是将`Strict-Transport-Security`标头添加到响应中。例如，Spring Security 的默认行为是添加以下标头，指示浏览器将域视为 HSTS 主机一年（一年大约有 31536000 秒）：

```
Strict-Transport-Security: max-age=31536000 ; includeSubDomains ; preload

```

[可选] `includeSubDomains` 指令指示浏览器子域也应该被视为 HSTS 域

[可选] `preload` 指令指示浏览器应该将域作为 HSTS 域预加载到浏览器中

```java
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http
			// ...
			.headers(headers -> headers
                // 显示定义参数
				.httpStrictTransportSecurity(hsts -> hsts
					.includeSubDomains(true)
					.preload(true)
					.maxAgeInSeconds(31536000)
				)
			);
	}

```



**X-Frame-Options**

允许将您的网站添加到框架可能是一个安全问题。例如，使用巧妙的 CSS 样式用户可能会被诱骗点击他们不想要的东西。例如，登录银行的用户可能会单击授予其他用户访问权限的按钮。这种攻击被称为[点击劫持](https://en.wikipedia.org/wiki/Clickjacking)。

有多种方法可以缓解点击劫持攻击。例如，为了保护旧浏览器免受点击劫持攻击，您可以使用[断帧代码](https://www.owasp.org/index.php/Clickjacking_Defense_Cheat_Sheet#Best-for-now_Legacy_Browser_Frame_Breaking_Script)。虽然并不完美，但对于旧版浏览器来说，断帧代码是最好的选择。

解决点击劫持的更现代方法是使用[X-Frame-Options](https://developer.mozilla.org/en-US/docs/HTTP/X-Frame-Options)标头。

默认情况下，Spring Security 使用以下标头禁用 iframe 中的渲染页面：

```
X-Frame-Options: DENY

```

```java
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http
			// ...
			.headers(headers -> headers
				.frameOptions(frameOptions -> frameOptions
					.sameOrigin()
				)
			);
	}

```



**X-XSS-Protection**

一些浏览器内置了对过滤反射 XSS 攻击的支持。虽然不是万无一失的，但确实有助于 XSS 保护。

过滤通常默认启用，因此添加标头通常只是确保启用它并指示浏览器在检测到 XSS 攻击时要执行的操作。例如，过滤器可能会尝试以侵入性最小的方式更改内容以仍然呈现所有内容。有时，这种类型的替换本身就可能成为 XSS 漏洞。相反最好阻止内容而不是尝试修复它。

默认情况下，Spring Security 使用以下标头阻止内容：

```
X-XSS-Protection: 1; mode=block

```

```java
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http
			// ...
			.headers(headers -> headers
                // 关闭浏览器过滤
				.xssProtection(xss -> xss
					.block(false)
				)
			);
	}

```



**Content Security Policy(CSP)**

内容安全政策是一种机制，web应用程序可以利用它来缓解内容注入漏洞，例如例如跨站点脚本 (XSS)。CSP 是一种声明性策略，它为 Web 应用程序作者提供了一种工具，用于声明并最终通知客户端（用户代理）Web 应用程序期望加载资源的来源。

Web 应用程序可以通过在响应中包含以下 HTTP 标头之一来使用 CSP：

- `Content-Security-Policy`
- `Content-Security-Policy-Report-Only`

这两个响应头都用作向客户端提供安全策略的机制。安全策略包含一组安全策略指令，每个指令负责声明对特定资源表示的限制

内容安全策略示例

```
Content-Security-Policy: script-src https://trustedscripts.example.com

```

尝试从`script-src`指令中声明的内容以外的其他来源加载脚本将被用户代理阻止。此外，如果在安全策略中声明了[report-uri](https://www.w3.org/TR/CSP2/#directive-report-uri)指令，则用户代理将向声明的 URL 报告违规。

给定以下响应标头，该策略声明可以从两个可能来源之一加载脚本。

```
Content-Security-Policy-Report-Only: script-src 'self' https://trustedscripts.example.com; report-uri /csp-report-endpoint/

```

```java
	@Override
	protected void configure(HttpSecurity http) {
		http
			// ...
			.headers(headers -> headers
				.contentSecurityPolicy(csp -> csp
					.policyDirectives("script-src 'self' https://trustedscripts.example.com; object-src https://trustedplugins.example.com; report-uri /csp-report-endpoint/")
				)
                // 启用 CSPreport-only标头
                .reportOnly()
			);
	}

```



**Referrer Policy**

引用策略是一种机制，web应用程序可以利用该机制来管理引用字段，该字段包含用户所在的最后一页。

Spring Security 的做法是使用[Referrer Policy](https://www.w3.org/TR/referrer-policy/) header，它提供了不同的[策略](https://www.w3.org/TR/referrer-policy/#referrer-policies)：

示例

```
Referrer-Policy: same-origin

```

```java
	@Override
	protected void configure(HttpSecurity http) {
		http
			// ...
			.headers(headers -> headers
				.referrerPolicy(referrer -> referrer
					.policy(ReferrerPolicy.SAME_ORIGIN)
				)
			);
	}

```



**Feature Policy**

[功能策略](https://wicg.github.io/feature-policy/)是一种机制，允许 Web 开发人员有选择地启用、禁用和修改浏览器中某些 API 和 Web 功能的行为。

示例

```
Feature-Policy: geolocation 'self'

```

借助功能策略，开发人员可以选择加入一组“策略”，以便浏览器强制执行整个站点中使用的特定功能。这些策略限制站点可以访问哪些 API 或修改浏览器的某些功能的默认行为。

```java
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http
			// ...
			.headers(headers -> headers
				.featurePolicy("geolocation 'self'")
			);
	}

```



**Permissions Policy**

[权限策略](https://w3c.github.io/webappsec-permissions-policy/)是一种机制，允许 Web 开发人员有选择地启用、禁用和修改浏览器中某些 API 和 Web 功能的行为。

示例

```
Permissions-Policy: geolocation=(self)

```

借助权限策略，开发人员可以为浏览器选择一组“策略”，以强制执行整个站点中使用的特定功能。这些策略限制站点可以访问哪些 API 或修改浏览器的某些功能的默认行为。

```java
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http
			// ...
			.headers(headers -> headers
				.permissionsPolicy(permissions -> permissions
					.policy("geolocation=(self)")
				)
			);
	}

```



**Clear Site Data**

[清除站点数据](https://www.w3.org/TR/clear-site-data/)是一种机制，当 HTTP 响应包含以下标头时，可以通过该机制[删除](https://www.w3.org/TR/clear-site-data/)任何浏览器端数据（cookie、本地存储等）：

```
Clear-Site-Data: "cache", "cookies", "storage", "executionContexts"

```

这是在注销时执行的一个很好的清理操作。

可以使用以下配置在注销时发送

```java
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http
			// ...
			.logout()
				.addLogoutHandler(new HeaderWriterLogoutHandler(new ClearSiteDataHeaderWriter(CACHE, COOKIES)));
	}

```



**Custom Headers**

Spring Security 有一些机制可以方便地将更常见的安全标头添加到您的应用程序中。但是，它还提供挂钩以启用添加自定义标头。

```java
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http
			// ...
			.headers(headers -> headers
				.addHeaderWriter(new StaticHeadersWriter("X-Custom-Security-Header","header-value"))
			);
	}

```



#### Http 请求

所有基于 HTTP 的通信，包括[静态资源](https://www.troyhunt.com/heres-why-your-static-website-needs-https/)，都应该[使用 TLS](https://cheatsheetseries.owasp.org/cheatsheets/Transport_Layer_Protection_Cheat_Sheet.html)进行保护。

作为一个框架，Spring Security 不处理 HTTP 连接，因此不直接提供对 HTTPS 的支持。但是它提供了许多有助于使用 HTTPS 的功能。

**Redirect to https**

当客户端使用 HTTP 时，Spring Security可以配置为在Servlet和WebFlux环境中重定向到HTTPS

```java
@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends
		WebSecurityConfigurerAdapter {

	@Override
	protected void configure(HttpSecurity http) {
		http
			// ...
			.requiresChannel(channel -> channel
				.anyRequest().requiresSecure()
			);
	}
}

```



**Strict Transport Security**

Spring Security 提供对[Strict Transport Security 的](https://docs.spring.io/spring-security/reference/features/exploits/headers.html#headers-hsts)支持并默认启用它。

**Proxy Server Configuration**

使用代理服务器时，确保正确的配置应用程序很重要。例如许多应用程序将有一个负载均衡器，通过将请求转发到位于[https://192.168.1:8080](https://192.168.0.1:8080/)的应用程序服务器来响应对https://example.com/的请求。如果没有适当的配置，应用程序服务器将不知道负载均衡器的存在，并将请求视为客户端请求[https://192.168.1:8080](https://192.168.0.1:8080/)。

要解决此问题，您可以使用[RFC 7239](https://tools.ietf.org/html/rfc7239)来指定正在使用负载平衡器。要使应用程序意识到这一点，您需要配置应用程序服务器以识别 X-Forwarded 标头。例如，Tomcat 使用[RemoteIpValve，](https://tomcat.apache.org/tomcat-8.0-doc/api/org/apache/catalina/valves/RemoteIpValve.html)而 Jetty 使用[ForwardedRequestCustomizer](https://www.eclipse.org/jetty/javadoc/jetty-9/org/eclipse/jetty/server/ForwardedRequestCustomizer.html)。或者，Spring 用户可以利用[ForwardedHeaderFilter](https://github.com/spring-projects/spring-framework/blob/v4.3.3.RELEASE/spring-web/src/main/java/org/springframework/web/filter/ForwardedHeaderFilter.java)。

Spring Boot 用户可以使用该`server.forward-headers-strategy`属性来配置应用程序。
