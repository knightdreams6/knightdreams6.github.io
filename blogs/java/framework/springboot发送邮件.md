---
title: springboot发送邮件
date: 2020-03-23 17:21:27
tags:
  - java
  - Springboot
---



##### 依赖

```xml
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-mail</artifactId>
        </dependency>
```

##### 配置

```yaml
spring:
  mail:
    host: 邮箱host
    default-encoding: UTF-8
    username: 邮箱地址
    password: 授权码
```

##### 工具类

```java
package com.learn.springquartz.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.File;
import java.util.Map;

/**
 * @author li'xiao
 * @version 1.0
 * @date 2020-03-20 10:18
 */
@Slf4j
@Service
public class MailService {

    @Resource
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String sender;

    /**
     * 发送普通邮件
     * @param to 收件人
     * @param subject 主题
     * @param content 内容
     */
    public void sendSimpleMailMessage(String to, String subject, String content){
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(sender);
        message.setTo(to);
        message.setSubject(subject);
        message.setText(content);
        try {
            mailSender.send(message);
            log.info("发送简单邮件成功");
        } catch (Exception e) {
            log.error("发送简单邮件时发生异常!", e);
        }
    }
    /**
     * 发送普通邮件 多人
     * @param tos 收件人
     * @param subject 主题
     * @param content 内容
     */
    public void sendSimpleMailMessage(String[] tos, String subject, String content){
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(sender);
        message.setTo(tos);
        message.setSubject(subject);
        message.setText(content);
        try {
            mailSender.send(message);
            log.info("发送简单邮件成功");
        } catch (Exception e) {
            log.error("发送简单邮件时发生异常!", e);
        }
    }


    /**
     * 发送 HTML 邮件
     *
     * @param to      收件人
     * @param subject 主题
     * @param content 内容
     */
    public void sendHTMLMimeMessage(String to, String subject, String content) {
        MimeMessage message = mailSender.createMimeMessage();
        try {
            //true表示需要创建一个multipart message
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setFrom(sender);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(content, true);
            mailSender.send(message);
        } catch (MessagingException e) {
            log.error("发送HTML Mail时发生异常！", e);
        }
    }


    /**
     * 发送 HTML 邮件 多人
     *
     * @param tos     收件人
     * @param subject 主题
     * @param content 内容
     */
    public void sendHTMLMimeMessage(String[] tos, String subject, String content) {
        MimeMessage message = mailSender.createMimeMessage();
        try {
            //true表示需要创建一个multipart message
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setFrom(sender);
            helper.setTo(tos);
            helper.setSubject(subject);
            helper.setText(content, true);
            mailSender.send(message);
        } catch (MessagingException e) {
            log.error("发送HTML Mail时发生异常！", e);
        }
    }


    /**
     * 发送带附件的邮件
     *
     * @param to       收件人
     * @param subject  主题
     * @param content  内容
     * @param attachFile 附件
     */
    public void sendAttachmentMimeMessage(String to, String subject, String content, File attachFile) {
        MimeMessage message = mailSender.createMimeMessage();
        try {
            //true表示需要创建一个multipart message
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setFrom(sender);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(content, true);

            FileSystemResource file = new FileSystemResource(attachFile);
            String fileName = file.getFilename();
            assert fileName != null;
            helper.addAttachment(fileName, file);

            mailSender.send(message);
        } catch (MessagingException e) {
            log.error("发送带附件的MimeMessage时发生异常！", e);
        }
    }


    /**
     * 发送带附件的邮件  多人
     *
     * @param tos      收件人
     * @param subject  主题
     * @param content  内容
     * @param attachFile 附件
     */
    public void sendAttachmentMimeMessage(String[] tos, String subject, String content, File attachFile) {
        MimeMessage message = mailSender.createMimeMessage();
        try {
            //true表示需要创建一个multipart message
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setFrom(sender);
            helper.setTo(tos);
            helper.setSubject(subject);
            helper.setText(content, true);

            FileSystemResource file = new FileSystemResource(attachFile);
            String fileName = file.getFilename();
            assert fileName != null;
            helper.addAttachment(fileName, file);

            mailSender.send(message);
        } catch (MessagingException e) {
            log.error("发送带附件的MimeMessage时发生异常！", e);
        }
    }


    /**
     * 发送带静态文件的邮件
     *
     * @param to       收件人
     * @param subject  主题
     * @param content  内容
     * @param rscIdMap 需要替换的静态文件
     */
    public void sendPicMessage(String to, String subject, String content, Map<String, String> rscIdMap) {
        MimeMessage message = mailSender.createMimeMessage();
        try {
            //true表示需要创建一个multipart message
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setFrom(sender);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(content, true);

            for (Map.Entry<String, String> entry : rscIdMap.entrySet()) {
                FileSystemResource file = new FileSystemResource(new File(entry.getValue()));
                helper.addInline(entry.getKey(), file);
            }
            mailSender.send(message);
        } catch (MessagingException e) {
            log.error("发送带静态文件的MimeMessage时发生异常！", e);
        }
    }



    /**
     * 发送带静态文件的邮件  多人
     *
     * @param tos       收件人
     * @param subject  主题
     * @param content  内容
     * @param rscIdMap 需要替换的静态文件
     */
    public void sendPicMessage(String[] tos, String subject, String content, Map<String, String> rscIdMap) {
        MimeMessage message = mailSender.createMimeMessage();
        try {
            //true表示需要创建一个multipart message
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setFrom(sender);
            helper.setTo(tos);
            helper.setSubject(subject);
            helper.setText(content, true);

            for (Map.Entry<String, String> entry : rscIdMap.entrySet()) {
                FileSystemResource file = new FileSystemResource(new File(entry.getValue()));
                helper.addInline(entry.getKey(), file);
            }
            mailSender.send(message);
        } catch (MessagingException e) {
            log.error("发送带静态文件的MimeMessage时发生异常！", e);
        }
    }
}

```

