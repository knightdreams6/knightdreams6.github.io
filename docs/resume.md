---
title: 简历
sidebar: false
outline: false
---

<script setup lang="ts">
import { withBase } from 'vitepress';

const resumePdf = withBase('/resume/resume.pdf');
const wxImgSrc = withBase('/resume/wx.jpeg');

const buildImages = (images: string[]) => {
  return images.map(image => withBase(`/resume/${image}`));
};

const whistleAppImgSrcList = buildImages([
  'whistle_1.jpg',
  'whistle_2.jpg',
  'whistle_3.jpg',
  'whistle_4.jpg',
  'whistle_5.jpg',
  'whistle_6.jpg',
  'whistle_7.jpg',
  'whistle_8.jpg',
  'whistle_9.jpg'
]);

const messagePushImgSrcList = buildImages([
  'messagePush1.jpeg',
  'messagePush2.jpeg',
  'messagePush3.jpeg',
  'messagePush4.jpeg'
]);

const apiRiskImgSrcList = buildImages([
  'apiRisk1.jpeg',
  'apiRisk2.jpeg'
]);

const storageImgSrcList = buildImages([
  'storage1.jpeg',
  'storage2.jpeg',
  'storage3.jpeg'
]);

const tmsStationImgSrcList = buildImages([
  'tmsStation1.jpeg',
  'tmsStation2.jpeg',
  'tmsStation3.jpeg',
  'tmsStation4.jpeg'
]);

const tmsMockImgSrcList = buildImages([
  'tmsMock1.jpeg',
  'tmsMock2.jpeg',
  'tmsMock3.jpeg',
  'tmsMock4.jpeg'
]);

const launcherImgSrcList = buildImages([
  'launcher1.jpeg',
  'launcher2.jpeg'
]);

const openImgSrcList = buildImages([
  'open.jpeg',
  'open1.jpeg',
  'open2.jpeg',
  'open3.jpeg',
  'open4.jpeg',
  'open5.jpeg',
  'open6.jpeg',
  'open7.jpeg',
  'open8.jpeg'
]);
</script>

# 简历

<div class="resume-header">
  <a
    :href="resumePdf"
    target="_blank"
    class="resume-download"
  >
    查看附件简历 →
  </a>
</div>

## 项目 / 模块示例

### 海外短视频直播

<el-carousel
:autoplay="false"
height="800px"
arrow="always"
>
<el-carousel-item
v-for="item in whistleAppImgSrcList"
:key="item"
>
    <div class="resume-image-container">
      <el-image
        :src="item"
        :preview-src-list="whistleAppImgSrcList"
        :preview-teleported="true"
        :infinite="false"
        :hide-on-click-modal="true"
        fit="contain"
      />
    </div>
  </el-carousel-item>
</el-carousel>

### 消息推送模块

<el-carousel
:autoplay="false"
height="460px"
arrow="always"
>
<el-carousel-item
v-for="item in messagePushImgSrcList"
:key="item"
>
    <div class="resume-image-container">
      <el-image
        :src="item"
        :preview-src-list="messagePushImgSrcList"
        :preview-teleported="true"
        :infinite="false"
        :hide-on-click-modal="true"
        fit="contain"
      />
    </div>
  </el-carousel-item>
</el-carousel>

### 风险认证模块

<el-carousel
:autoplay="false"
height="520px"
arrow="always"
>
<el-carousel-item
v-for="item in apiRiskImgSrcList"
:key="item"
>
    <div class="resume-image-container">
      <el-image
        :src="item"
        :preview-src-list="apiRiskImgSrcList"
        :preview-teleported="true"
        :infinite="false"
        :hide-on-click-modal="true"
        fit="contain"
      />
    </div>
  </el-carousel-item>
</el-carousel>

### 存储模块

<el-carousel
:autoplay="false"
height="520px"
arrow="always"
>
<el-carousel-item
v-for="item in storageImgSrcList"
:key="item"
>
    <div class="resume-image-container">
      <el-image
        :src="item"
        :preview-src-list="storageImgSrcList"
        :preview-teleported="true"
        :infinite="false"
        :hide-on-click-modal="true"
        fit="contain"
      />
    </div>
  </el-carousel-item>
</el-carousel>

### TMS 工作站

<el-carousel
:autoplay="false"
height="520px"
arrow="always"
>
<el-carousel-item
v-for="item in tmsStationImgSrcList"
:key="item"
>
    <div class="resume-image-container">
      <el-image
        :src="item"
        :preview-src-list="tmsStationImgSrcList"
        :preview-teleported="true"
        :infinite="false"
        :hide-on-click-modal="true"
        fit="contain"
      />
    </div>
  </el-carousel-item>
</el-carousel>

### TMS 模拟器

<el-carousel
:autoplay="false"
height="580px"
arrow="always"
>
<el-carousel-item
v-for="item in tmsMockImgSrcList"
:key="item"
>
    <div class="resume-image-container">
      <el-image
        :src="item"
        :preview-src-list="tmsMockImgSrcList"
        :preview-teleported="true"
        :infinite="false"
        :hide-on-click-modal="true"
        fit="contain"
      />
    </div>
  </el-carousel-item>
</el-carousel>

### 启动器

<el-carousel
:autoplay="false"
height="520px"
arrow="always"
>
<el-carousel-item
v-for="item in launcherImgSrcList"
:key="item"
>
    <div class="resume-image-container">
      <el-image
        :src="item"
        :preview-src-list="launcherImgSrcList"
        :preview-teleported="true"
        :infinite="false"
        :hide-on-click-modal="true"
        fit="contain"
      />
    </div>
  </el-carousel-item>
</el-carousel>

### 个人开源项目

<el-carousel
:autoplay="false"
height="500px"
arrow="always"
>
<el-carousel-item
v-for="item in openImgSrcList"
:key="item"
>
    <div class="resume-image-container">
      <el-image
        :src="item"
        :preview-src-list="openImgSrcList"
        :preview-teleported="true"
        :infinite="false"
        :hide-on-click-modal="true"
        fit="contain"
      />
    </div>
  </el-carousel-item>
</el-carousel>

## 联系方式

- 电话：17765817730
- 微信：li1766376716

<div class="resume-wechat">
  <el-image
    :src="wxImgSrc"
    :preview-src-list="[wxImgSrc]"
    :preview-teleported="true"
    fit="contain"
  />
</div>

## 感谢观看～