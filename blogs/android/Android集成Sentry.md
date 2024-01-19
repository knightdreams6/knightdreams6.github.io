---
title: Android 集成自托管的Sentry
date: 2024-01-19
tags:
   - android
---

配置文档地址：https://docs.sentry.io/platforms/android/configuration/options/

github仓库地址：https://github.com/getsentry/self-hosted

示例代码仓库地址:  https://gitee.com/knightdreams/android-sentry



#### 自动接入

使用@sentry/wizard安装

npm库：https://www.npmjs.com/package/@sentry/wizard

##### 安装@sentry/wizard

```shell
npm i -g @sentry/wizard
```

##### 执行安装命令

```shell
sentry-wizard -i android
```

##### 根据安装事项安装完成后更改的文件

 AndroidManifest.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools">
    
  	<application
       <!-- 必需：设置您的sentry.io 项目标识符 (DSN) -->
        <meta-data
            android:name="io.sentry.dsn"
            android:value="http://90218af0bc97513e2acbb81b60b70c88@192.168.3.60:9000/5" />

        <!-- 为用户交互启用自动面包屑（点击、滑动、滚动）-->
        <meta-data
            android:name="io.sentry.traces.user-interaction.enable"
            android:value="true" />

        <!-- 启用崩溃截图 -->
        <meta-data
            android:name="io.sentry.attach-screenshot"
            android:value="true" />

        <!-- 启用崩溃视图层次结构 -->
        <meta-data
            android:name="io.sentry.attach-view-hierarchy"
            android:value="true" />

        <!-- 通过设置采样率启用性能 API，在生产环境中进行调整 -->
        <meta-data
            android:name="io.sentry.traces.sample-rate"
            android:value="1.0" />
  	</application>

</manifest>
```



 build.gradle.kts

```kotlin
import io.sentry.android.gradle.extensions.InstrumentationFeature
import io.sentry.android.gradle.instrumentation.logcat.LogcatLevel

plugins {
    id("io.sentry.android.gradle") version "4.2.0"
}
sentry {
    org.set("sentry")
    projectName.set("android")

    // this will upload your source code to Sentry to show it as part of the stack traces
    // disable if you don't want to expose your sources
    includeSourceContext.set(true)
    authToken.set("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")

    // Disables or enables the handling of Proguard mapping for Sentry.
    // If enabled the plugin will generate a UUID and will take care of
    // uploading the mapping to Sentry. If disabled, all the logic
    // related to proguard mapping will be excluded.
    // Default is enabled.
    includeProguardMapping.set(true)

    // Whether the plugin should attempt to auto-upload the mapping file to Sentry or not.
    // If disabled the plugin will run a dry-run and just generate a UUID.
    // The mapping file has to be uploaded manually via sentry-cli in this case.
    // Default is enabled.
    autoUploadProguardMapping.set(true)

    // Experimental flag to turn on support for GuardSquare's tools integration (Dexguard and External Proguard).
    // If enabled, the plugin will try to consume and upload the mapping file produced by Dexguard and External Proguard.
    // Default is disabled.
    dexguardEnabled.set(false)

    // Disables or enables the automatic configuration of Native Symbols
    // for Sentry. This executes sentry-cli automatically so
    // you don't need to do it manually.
    // Default is disabled.
    uploadNativeSymbols.set(false)

    // Whether the plugin should attempt to auto-upload the native debug symbols to Sentry or not.
    // If disabled the plugin will run a dry-run.
    // Default is enabled.
    autoUploadNativeSymbols.set(true)

    // Does or doesn't include the source code of native code for Sentry.
    // This executes sentry-cli with the --include-sources param. automatically so
    // you don't need to do it manually.
    // Default is disabled.
    includeNativeSources.set(false)

    // Generates a JVM (Java, Kotlin, etc.) source bundle and uploads your source code to Sentry.
    // This enables source context, allowing you to see your source
    // code as part of your stack traces in Sentry.
    includeSourceContext.set(false)

    // Configure additional directories to be included in the source bundle which is used for
    // source context. The directories should be specified relative to the Gradle module/project's
    // root. For example, if you have a custom source set alongside 'main', the parameter would be
    // 'src/custom/java'.
    additionalSourceDirsForSourceContext.set(emptySet())

    // Enable or disable the tracing instrumentation.
    // Does auto instrumentation for specified features through bytecode manipulation.
    // Default is enabled.
    tracingInstrumentation {
        enabled.set(true)

        // Specifies a set of instrumentation features that are eligible for bytecode manipulation.
        // Defaults to all available values of InstrumentationFeature enum class.
        features.set(setOf(InstrumentationFeature.DATABASE, InstrumentationFeature.FILE_IO, InstrumentationFeature.OKHTTP, InstrumentationFeature.COMPOSE))

        // Enable or disable logcat instrumentation through bytecode manipulation.
        // Default is enabled.
        logcat {
            enabled.set(true)

            // Specifies a minimum log level for the logcat breadcrumb logging.
            // Defaults to LogcatLevel.WARNING.
            minLevel.set(LogcatLevel.WARNING)
        }

        // The set of glob patterns to exclude from instrumentation. Classes matching any of these
        // patterns in the project's sources and dependencies JARs won't be instrumented by the Sentry
        // Gradle plugin.
        //
        // Don't include the file extension. Filtering is done on compiled classes and
        // the .class suffix isn't included in the pattern matching.
        //
        // Example usage:
        // ```
        // excludes.set(setOf("com/example/donotinstrument/**", "**/*Test"))
        // ```
        //
        // Only supported when using Android Gradle plugin (AGP) version 7.4.0 and above.
        excludes.set(emptySet())
    }

    // Enable auto-installation of Sentry components (sentry-android SDK and okhttp, timber, fragment and compose integrations).
    // Default is enabled.
    // Only available v3.1.0 and above.
    autoInstallation {
        enabled.set(true)

        // Specifies a version of the sentry-android SDK and fragment, timber and okhttp integrations.
        //
        // This is also useful, when you have the sentry-android SDK already included into a transitive dependency/module and want to
        // align integration versions with it (if it's a direct dependency, the version will be inferred).
        //
        // NOTE: if you have a higher version of the sentry-android SDK or integrations on the classpath, this setting will have no effect
        // as Gradle will resolve it to the latest version.
        //
        // Defaults to the latest published Sentry version.
        sentryVersion.set("7.2.0")
    }

    // Disables or enables dependencies metadata reporting for Sentry.
    // If enabled, the plugin will collect external dependencies and
    // upload them to Sentry as part of events. If disabled, all the logic
    // related to the dependencies metadata report will be excluded.
    //
    // Default is enabled.
    //
    includeDependenciesReport.set(true)

    // Whether the plugin should send telemetry data to Sentry.
    // If disabled the plugin won't send telemetry data.
    // This is auto disabled if running against a self hosted instance of Sentry.
    // Default is enabled.
    telemetry.set(true)
}
```



 MainActivity.kt

```kotlin
    try {
        throw Exception("This app uses Sentry! :)")
    } catch (e: Exception) {
        Sentry.captureException(e)
    }
```



#### 注意事项

1. 需要开启联网权限 (AndroidManifest.xml 中添加)
   ```xml
   <uses-permission android:name="android.permission.INTERNET" />
   <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
   ```

2. 高版本android需开启允许http访问(如果自托管的服务地址为http)

   src/res/xml 下添加  network_security_config.xml 

   ```xml
   <?xml version="1.0" encoding="utf-8"?>
   <network-security-config>
       <base-config cleartextTrafficPermitted="true" />
   </network-security-config>
   ```

    AndroidManifest.xml 添加配置

   ```xml
   <application
       android:networkSecurityConfig="@xml/network_security_config"
   </application>
   ```

3. debug 

   添加该meta-data可对sentry进行debug

   ```xml
   <meta-data
       android:name="io.sentry.debug"
       android:value="true" />
   ```
