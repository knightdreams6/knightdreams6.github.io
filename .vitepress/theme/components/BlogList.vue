<script setup lang="ts">
import type { BlogPost } from '../../blog.data.ts';

defineProps<{
  posts: BlogPost[];
}>();
</script>

<template>
  <div class="blog-list">
    <article v-for="post in posts" :key="post.url" class="blog-card">
      <div class="blog-card-header">
        <a class="blog-title" :href="post.url">
          {{ post.title }}
        </a>

        <span v-if="post.date" class="blog-date">
          {{ post.date }}
        </span>
      </div>

      <p v-if="post.description" class="blog-description">
        {{ post.description }}
      </p>

      <a class="blog-read-more" :href="post.url">
        阅读全文
        <span>→</span>
      </a>
    </article>
  </div>
</template>