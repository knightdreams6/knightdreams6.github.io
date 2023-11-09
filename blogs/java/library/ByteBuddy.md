---
title: ByteBuddy的使用
date: 2023-09-04 18:19
tags:
  - java
---



> 仓库地址 

* byte-buddy: https://github.com/raphw/byte-buddy

  ```xml
      <dependency>
          <groupId>net.bytebuddy</groupId>
          <artifactId>byte-buddy</artifactId>
      </dependency>
  ```

  

##### 如何动态给某个类添加注解?

> 假设给类上添加`@DS`

```java
ByteBuddyAgent.install();

AnnotationDescription description = AnnotationDescription.Latent.Builder.ofType(DS.class)
        .define("value", "ds").build();
    new ByteBuddy().redefine(clazz).annotateType(description).make().load(clazz.getClassLoader(),
        ClassReloadingStrategy.fromInstalledAgent());
```



##### 如何动态给某个方法添加注解?

> 假设给方法上添加`@DS`

```java
ByteBuddyAgent.install();

// 要添加注解的方法
Method[] methods = ...;

AnnotationDescription description = AnnotationDescription.Latent.Builder.ofType(DS.class)
        .define("value", "ds").build();
new ByteBuddy().redefine(clazz).annotateType(description).visit(new MemberAttributeExtension.ForMethod().annotateMethod(description).on(ElementMatchers.anyOf(transactionMethods))).make().load(clazz.getClassLoader(), ClassReloadingStrategy.fromInstalledAgent()).getLoaded();
```



##### 如何动态移除方法上的注解?

https://github.com/raphw/byte-buddy/issues/917

> 假设要移除类上的`@GlobalTransactional`

```java
private static AsmVisitorWrapper.ForDeclaredMethods.MethodVisitorWrapper methodTransactionRemover() {
    return new AsmVisitorWrapper.ForDeclaredMethods.MethodVisitorWrapper() {
        @Override
        public net.bytebuddy.jar.asm.MethodVisitor wrap(TypeDescription typeDescription,
                MethodDescription methodDescription, net.bytebuddy.jar.asm.MethodVisitor methodVisitor,
                Implementation.Context context, TypePool typePool, int writeFlag, int readFlag) {
            return new MethodVisitor(Opcodes.ASM7, methodVisitor) {
                @Override
                public AnnotationVisitor visitAnnotation(String desc, boolean visible) {
                    if (Type.getDescriptor(GlobalTransactional.class).equals(desc)) {
                        return null;
                    }
                    return super.visitAnnotation(desc, visible);
                }
            };
        }
    };
}

ByteBuddyAgent.install();

// 要移除注解的方法
Method[] methods = ...;

new ByteBuddy().redefine(clazz).annotateType(description).visit(new AsmVisitorWrapper.ForDeclaredMethods()
.method(ElementMatchers.anyOf(transactionMethods),methodTransactionRemover())).make().load(clazz.getClassLoader(), ClassReloadingStrategy.fromInstalledAgent()).getLoaded();
```

