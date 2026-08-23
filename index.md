---
layout: home

hero:
  name: "Knightdreams"
  text: "Code · Architecture · AI"
  tagline: 记录技术实践、架构思考与开发过程中的问题和解决方案

  image:
    src: /avatar.jpg
    alt: Knightdreams

features:
  - title: 🤖 AI
    details: Spring AI、MCP、LLM、Agent

  - title: ☕ Java
    details: Java、JVM、并发、Spring Boot

  - title: 🏗️ Architecture
    details: 分布式、高并发、系统架构

  - title: 🐳 DevOps
    details: Docker、Kubernetes、Nginx
---

<script setup lang="ts">
import { data } from './.vitepress/blog.data.ts';

const latestPosts = data.posts.slice(0, 12);
const latestPost = data.posts[0];
</script>

<div v-if="latestPost" class="home-actions">
  <a class="home-start-button" :href="latestPost.url">
    开始阅读 →
  </a>
</div>

<div class="home-section-title">
  最新文章
</div>

<BlogList :posts="latestPosts" />