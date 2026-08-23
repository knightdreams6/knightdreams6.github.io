---
title: 博客
sidebar: false
outline: false
---

<script setup lang="ts">
import { data } from '../.vitepress/blog.data.ts';
</script>

# 博客

<div class="blog-page-header">
  <div>
    <p>记录技术实践、架构思考与开发过程中的问题和解决方案。</p>
  </div>

  <span>
    共 {{ data.posts.length }} 篇文章
  </span>
</div>

<BlogList :posts="data.posts" />