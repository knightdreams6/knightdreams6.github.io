---
title: ModelAttribute注解的使用
date: 2020-03-10 15:52:28
tags: 
  - Spring
  - java
---

### @ModelAttribute使用详解

@ModelAttribute最主要的作用是将数据添加到模型对象中，用于视图页面展示时使用。 

@ModelAttribute等价于 model.addAttribute("attributeName", “value”); 但是根据@ModelAttribute注释的位置不同，和其他注解组合使用，致使含义有所不同。具体区别如下：

#### 1、@ModelAttribute注释方法

> 被@ModelAttribute注释的方法会在此controller每个方法执行前被执行，因此对于一个controller映射多个URL的用法来说，要谨慎使用。

##### 1）、注释void返回值方法

```java
@Controller
public class TestModelAttributeController {

    @ModelAttribute
    public void model(@RequestParam String str, Model model){
        model.addAttribute("attribute", str);
    }

    @GetMapping("/hello")
    public String hello(){
        return "hello";
    }
}
```

> http://localhost:8080/ssm/hello.action?str=abc，访问结果：将abc保存model域中

##### 2）、注释返回具体类的方法

```java
    @ModelAttribute
    public Account accountModel(@RequestParam Integer id){
        return accountService.getAccountById(id);
    }
```

> http://localhost:8080/ssm/hello.action?str=abc&id=1  访问结果，将account保存到域中，取出的key为account即类名

##### 3）、ModelAttribute 指定key值

```java
    @ModelAttribute("attributeName")
    public String attributeName(){
        return "knight";
    }
```

> http://localhost:8080/ssm/hello.action?str=abc&id=1 访问结果，可以获取到key为 attributeName 的 value ··knight

##### 4）、与@GetMapping一起注解

```java
    @GetMapping("/hello1")
    @ModelAttribute("attributeName")
    public String hello2(){
        return "hi";
    }
```

> http://localhost:8080/ssm/hello1.action?str=abc&id=1 访问结果，返回视图名为hello1，可以获取到key为 attributeName的value ··· hi



#### 2、@ModelAttribute注释一个方法的参数

##### 1）、从model中获取

```java
    @ModelAttribute("user")
    public Account addAccount(){
        return new Account(1, "lixiao", "10000");
    }

    @RequestMapping(value = "/helloWorld")
    public String hello(@ModelAttribute("user") Account account){
        account.setName("李汶颖");
        return "hello2";
    }
```

> http://localhost:8080/ssm/helloWorld.action 访问结果 返回视图名为hello，可以获取到key为 user 的 value Account{id=1, name='李汶颖', money='10000'}

