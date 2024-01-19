import{_ as n,o as s,c as a,b as e}from"./app-5f8194d9.js";const t={},i=e(`<p>配置文档地址：https://docs.sentry.io/platforms/android/configuration/options/</p><p>github仓库地址：https://github.com/getsentry/self-hosted</p><p>示例代码仓库地址: https://gitee.com/knightdreams/android-sentry</p><h4 id="自动接入" tabindex="-1"><a class="header-anchor" href="#自动接入" aria-hidden="true">#</a> 自动接入</h4><p>使用@sentry/wizard安装</p><p>npm库：https://www.npmjs.com/package/@sentry/wizard</p><h5 id="安装-sentry-wizard" tabindex="-1"><a class="header-anchor" href="#安装-sentry-wizard" aria-hidden="true">#</a> 安装@sentry/wizard</h5><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">npm</span> i <span class="token parameter variable">-g</span> @sentry/wizard
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h5 id="执行安装命令" tabindex="-1"><a class="header-anchor" href="#执行安装命令" aria-hidden="true">#</a> 执行安装命令</h5><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>sentry-wizard <span class="token parameter variable">-i</span> android
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h5 id="根据安装事项安装完成后更改的文件" tabindex="-1"><a class="header-anchor" href="#根据安装事项安装完成后更改的文件" aria-hidden="true">#</a> 根据安装事项安装完成后更改的文件</h5><p>AndroidManifest.xml</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token prolog">&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>manifest</span> <span class="token attr-name"><span class="token namespace">xmlns:</span>android</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>http://schemas.android.com/apk/res/android<span class="token punctuation">&quot;</span></span>
    <span class="token attr-name"><span class="token namespace">xmlns:</span>tools</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>http://schemas.android.com/tools<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    
  	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>application</span>
       <span class="token attr-name">&lt;!--</span> <span class="token attr-name">必需：设置您的sentry.io</span> <span class="token attr-name">项目标识符</span> <span class="token attr-name">(DSN)</span> <span class="token attr-name">--</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta-data</span>
            <span class="token attr-name"><span class="token namespace">android:</span>name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>io.sentry.dsn<span class="token punctuation">&quot;</span></span>
            <span class="token attr-name"><span class="token namespace">android:</span>value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>http://90218af0bc97513e2acbb81b60b70c88@192.168.3.60:9000/5<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>

        <span class="token comment">&lt;!-- 为用户交互启用自动面包屑（点击、滑动、滚动）--&gt;</span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta-data</span>
            <span class="token attr-name"><span class="token namespace">android:</span>name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>io.sentry.traces.user-interaction.enable<span class="token punctuation">&quot;</span></span>
            <span class="token attr-name"><span class="token namespace">android:</span>value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>true<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>

        <span class="token comment">&lt;!-- 启用崩溃截图 --&gt;</span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta-data</span>
            <span class="token attr-name"><span class="token namespace">android:</span>name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>io.sentry.attach-screenshot<span class="token punctuation">&quot;</span></span>
            <span class="token attr-name"><span class="token namespace">android:</span>value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>true<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>

        <span class="token comment">&lt;!-- 启用崩溃视图层次结构 --&gt;</span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta-data</span>
            <span class="token attr-name"><span class="token namespace">android:</span>name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>io.sentry.attach-view-hierarchy<span class="token punctuation">&quot;</span></span>
            <span class="token attr-name"><span class="token namespace">android:</span>value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>true<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>

        <span class="token comment">&lt;!-- 通过设置采样率启用性能 API，在生产环境中进行调整 --&gt;</span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta-data</span>
            <span class="token attr-name"><span class="token namespace">android:</span>name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>io.sentry.traces.sample-rate<span class="token punctuation">&quot;</span></span>
            <span class="token attr-name"><span class="token namespace">android:</span>value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>1.0<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
  	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>application</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>manifest</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>build.gradle.kts</p><div class="language-kotlin line-numbers-mode" data-ext="kt"><pre class="language-kotlin"><code><span class="token keyword">import</span> io<span class="token punctuation">.</span>sentry<span class="token punctuation">.</span>android<span class="token punctuation">.</span>gradle<span class="token punctuation">.</span>extensions<span class="token punctuation">.</span>InstrumentationFeature
<span class="token keyword">import</span> io<span class="token punctuation">.</span>sentry<span class="token punctuation">.</span>android<span class="token punctuation">.</span>gradle<span class="token punctuation">.</span>instrumentation<span class="token punctuation">.</span>logcat<span class="token punctuation">.</span>LogcatLevel

plugins <span class="token punctuation">{</span>
    <span class="token function">id</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;io.sentry.android.gradle&quot;</span></span><span class="token punctuation">)</span> version <span class="token string-literal singleline"><span class="token string">&quot;4.2.0&quot;</span></span>
<span class="token punctuation">}</span>
sentry <span class="token punctuation">{</span>
    org<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;sentry&quot;</span></span><span class="token punctuation">)</span>
    projectName<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;android&quot;</span></span><span class="token punctuation">)</span>

    <span class="token comment">// this will upload your source code to Sentry to show it as part of the stack traces</span>
    <span class="token comment">// disable if you don&#39;t want to expose your sources</span>
    includeSourceContext<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span>
    authToken<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;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&quot;</span></span><span class="token punctuation">)</span>

    <span class="token comment">// Disables or enables the handling of Proguard mapping for Sentry.</span>
    <span class="token comment">// If enabled the plugin will generate a UUID and will take care of</span>
    <span class="token comment">// uploading the mapping to Sentry. If disabled, all the logic</span>
    <span class="token comment">// related to proguard mapping will be excluded.</span>
    <span class="token comment">// Default is enabled.</span>
    includeProguardMapping<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span>

    <span class="token comment">// Whether the plugin should attempt to auto-upload the mapping file to Sentry or not.</span>
    <span class="token comment">// If disabled the plugin will run a dry-run and just generate a UUID.</span>
    <span class="token comment">// The mapping file has to be uploaded manually via sentry-cli in this case.</span>
    <span class="token comment">// Default is enabled.</span>
    autoUploadProguardMapping<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span>

    <span class="token comment">// Experimental flag to turn on support for GuardSquare&#39;s tools integration (Dexguard and External Proguard).</span>
    <span class="token comment">// If enabled, the plugin will try to consume and upload the mapping file produced by Dexguard and External Proguard.</span>
    <span class="token comment">// Default is disabled.</span>
    dexguardEnabled<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span>

    <span class="token comment">// Disables or enables the automatic configuration of Native Symbols</span>
    <span class="token comment">// for Sentry. This executes sentry-cli automatically so</span>
    <span class="token comment">// you don&#39;t need to do it manually.</span>
    <span class="token comment">// Default is disabled.</span>
    uploadNativeSymbols<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span>

    <span class="token comment">// Whether the plugin should attempt to auto-upload the native debug symbols to Sentry or not.</span>
    <span class="token comment">// If disabled the plugin will run a dry-run.</span>
    <span class="token comment">// Default is enabled.</span>
    autoUploadNativeSymbols<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span>

    <span class="token comment">// Does or doesn&#39;t include the source code of native code for Sentry.</span>
    <span class="token comment">// This executes sentry-cli with the --include-sources param. automatically so</span>
    <span class="token comment">// you don&#39;t need to do it manually.</span>
    <span class="token comment">// Default is disabled.</span>
    includeNativeSources<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span>

    <span class="token comment">// Generates a JVM (Java, Kotlin, etc.) source bundle and uploads your source code to Sentry.</span>
    <span class="token comment">// This enables source context, allowing you to see your source</span>
    <span class="token comment">// code as part of your stack traces in Sentry.</span>
    includeSourceContext<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span>

    <span class="token comment">// Configure additional directories to be included in the source bundle which is used for</span>
    <span class="token comment">// source context. The directories should be specified relative to the Gradle module/project&#39;s</span>
    <span class="token comment">// root. For example, if you have a custom source set alongside &#39;main&#39;, the parameter would be</span>
    <span class="token comment">// &#39;src/custom/java&#39;.</span>
    additionalSourceDirsForSourceContext<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token function">emptySet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

    <span class="token comment">// Enable or disable the tracing instrumentation.</span>
    <span class="token comment">// Does auto instrumentation for specified features through bytecode manipulation.</span>
    <span class="token comment">// Default is enabled.</span>
    tracingInstrumentation <span class="token punctuation">{</span>
        enabled<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span>

        <span class="token comment">// Specifies a set of instrumentation features that are eligible for bytecode manipulation.</span>
        <span class="token comment">// Defaults to all available values of InstrumentationFeature enum class.</span>
        features<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token function">setOf</span><span class="token punctuation">(</span>InstrumentationFeature<span class="token punctuation">.</span>DATABASE<span class="token punctuation">,</span> InstrumentationFeature<span class="token punctuation">.</span>FILE_IO<span class="token punctuation">,</span> InstrumentationFeature<span class="token punctuation">.</span>OKHTTP<span class="token punctuation">,</span> InstrumentationFeature<span class="token punctuation">.</span>COMPOSE<span class="token punctuation">)</span><span class="token punctuation">)</span>

        <span class="token comment">// Enable or disable logcat instrumentation through bytecode manipulation.</span>
        <span class="token comment">// Default is enabled.</span>
        logcat <span class="token punctuation">{</span>
            enabled<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span>

            <span class="token comment">// Specifies a minimum log level for the logcat breadcrumb logging.</span>
            <span class="token comment">// Defaults to LogcatLevel.WARNING.</span>
            minLevel<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>LogcatLevel<span class="token punctuation">.</span>WARNING<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// The set of glob patterns to exclude from instrumentation. Classes matching any of these</span>
        <span class="token comment">// patterns in the project&#39;s sources and dependencies JARs won&#39;t be instrumented by the Sentry</span>
        <span class="token comment">// Gradle plugin.</span>
        <span class="token comment">//</span>
        <span class="token comment">// Don&#39;t include the file extension. Filtering is done on compiled classes and</span>
        <span class="token comment">// the .class suffix isn&#39;t included in the pattern matching.</span>
        <span class="token comment">//</span>
        <span class="token comment">// Example usage:</span>
        <span class="token comment">// \`\`\`</span>
        <span class="token comment">// excludes.set(setOf(&quot;com/example/donotinstrument/**&quot;, &quot;**/*Test&quot;))</span>
        <span class="token comment">// \`\`\`</span>
        <span class="token comment">//</span>
        <span class="token comment">// Only supported when using Android Gradle plugin (AGP) version 7.4.0 and above.</span>
        excludes<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token function">emptySet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// Enable auto-installation of Sentry components (sentry-android SDK and okhttp, timber, fragment and compose integrations).</span>
    <span class="token comment">// Default is enabled.</span>
    <span class="token comment">// Only available v3.1.0 and above.</span>
    autoInstallation <span class="token punctuation">{</span>
        enabled<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span>

        <span class="token comment">// Specifies a version of the sentry-android SDK and fragment, timber and okhttp integrations.</span>
        <span class="token comment">//</span>
        <span class="token comment">// This is also useful, when you have the sentry-android SDK already included into a transitive dependency/module and want to</span>
        <span class="token comment">// align integration versions with it (if it&#39;s a direct dependency, the version will be inferred).</span>
        <span class="token comment">//</span>
        <span class="token comment">// NOTE: if you have a higher version of the sentry-android SDK or integrations on the classpath, this setting will have no effect</span>
        <span class="token comment">// as Gradle will resolve it to the latest version.</span>
        <span class="token comment">//</span>
        <span class="token comment">// Defaults to the latest published Sentry version.</span>
        sentryVersion<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;7.2.0&quot;</span></span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// Disables or enables dependencies metadata reporting for Sentry.</span>
    <span class="token comment">// If enabled, the plugin will collect external dependencies and</span>
    <span class="token comment">// upload them to Sentry as part of events. If disabled, all the logic</span>
    <span class="token comment">// related to the dependencies metadata report will be excluded.</span>
    <span class="token comment">//</span>
    <span class="token comment">// Default is enabled.</span>
    <span class="token comment">//</span>
    includeDependenciesReport<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span>

    <span class="token comment">// Whether the plugin should send telemetry data to Sentry.</span>
    <span class="token comment">// If disabled the plugin won&#39;t send telemetry data.</span>
    <span class="token comment">// This is auto disabled if running against a self hosted instance of Sentry.</span>
    <span class="token comment">// Default is enabled.</span>
    telemetry<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>MainActivity.kt</p><div class="language-kotlin line-numbers-mode" data-ext="kt"><pre class="language-kotlin"><code>    <span class="token keyword">try</span> <span class="token punctuation">{</span>
        <span class="token keyword">throw</span> <span class="token function">Exception</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;This app uses Sentry! :)&quot;</span></span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>e<span class="token operator">:</span> Exception<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        Sentry<span class="token punctuation">.</span><span class="token function">captureException</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="注意事项" tabindex="-1"><a class="header-anchor" href="#注意事项" aria-hidden="true">#</a> 注意事项</h4><ol><li><p>需要开启联网权限 (AndroidManifest.xml 中添加)</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>uses-permission</span> <span class="token attr-name"><span class="token namespace">android:</span>name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>android.permission.INTERNET<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>uses-permission</span> <span class="token attr-name"><span class="token namespace">android:</span>name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>android.permission.ACCESS_NETWORK_STATE<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>高版本android需开启允许http访问(如果自托管的服务地址为http)</p><p>src/res/xml 下添加 network_security_config.xml</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token prolog">&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>network-security-config</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>base-config</span> <span class="token attr-name">cleartextTrafficPermitted</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>true<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>network-security-config</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>AndroidManifest.xml 添加配置</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code>&lt;application
    android:networkSecurityConfig=&quot;@xml/network_security_config&quot;
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>application</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>debug</p><p>添加该meta-data可对sentry进行debug</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta-data</span>
    <span class="token attr-name"><span class="token namespace">android:</span>name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>io.sentry.debug<span class="token punctuation">&quot;</span></span>
    <span class="token attr-name"><span class="token namespace">android:</span>value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>true<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ol>`,19),l=[i];function p(o,c){return s(),a("div",null,l)}const d=n(t,[["render",p],["__file","AndroidjichengSentry.html.vue"]]);export{d as default};
