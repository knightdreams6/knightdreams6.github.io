<template>
  <div>
    <a :href="resumePdf" target="_blank">点击查看附件简历</a>
    <h3>以下为简历中提到做过的部分项目/模块示例：</h3>
    <div>
      <h5>消息推送模块</h5>
      <el-carousel :autoplay="false" height="460px" arrow="always">
        <el-carousel-item v-for="item in messagePushImgSrcList" :key="item">
          <el-image :hide-on-click-modal="true" :src="item"
                    :infinite="false"/>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div>
      <h5>风险认证模块</h5>
      <el-carousel :autoplay="false" height="520px" arrow="always">
        <el-carousel-item v-for="item in apiRiskImgSrcList" :key="item">
          <el-image :hide-on-click-modal="true" :src="item"
                    :infinite="false"/>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div>
      <h5>存储模块</h5>
      <el-carousel :autoplay="false" height="520px" arrow="always">
        <el-carousel-item v-for="item in storageImgSrcList" :key="item">
          <el-image :hide-on-click-modal="true" :src="item"
                    :infinite="false"/>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div>
      <h5>TMS工作站</h5>
      <el-carousel :autoplay="false" height="520px" arrow="always">
        <el-carousel-item v-for="item in tmsStationImgSrcList" :key="item">
          <el-image :hide-on-click-modal="true" :src="item"
                    :infinite="false"/>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div>
      <h5>TMS模拟器</h5>
      <el-carousel :autoplay="false" height="580px" arrow="always">
        <el-carousel-item v-for="item in tmsMockImgSrcList" :key="item"
                          style="display: flex; justify-content: center; align-items: center">
          <el-image :hide-on-click-modal="true" :src="item"
                    :infinite="false"/>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div>
      <h5>启动器</h5>
      <el-carousel :autoplay="false" height="520px" arrow="always">
        <el-carousel-item v-for="item in launcherImgSrcList" :key="item">
          <el-image :hide-on-click-modal="true" :src="item"
                    :infinite="false"/>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div>
      <h5>个人开源项目</h5>
      <el-carousel :autoplay="false" height="500px" arrow="always">
        <el-carousel-item v-for="item in openImgSrcList" :key="item">
          <el-image :hide-on-click-modal="true" :src="item"
                    :infinite="false"/>
        </el-carousel-item>
      </el-carousel>
    </div>
    
    <div>
      <h3>感谢观看～</h3>
      <h5>联系方式：</h5>
      <ul>
        <li>电话：18735182285</li>
        <li>微信：li1766376716</li>
      </ul>
      <el-image style="width: 400px; height: 500px" :src="wxImgSrc"/>
    </div>
  </div>

</template>


<script lang="ts" setup>
import {onMounted, ref} from 'vue'

const hostname = ref('');
const resumePdf = ref('');
const wxImgSrc = ref('');
const messagePushImgSrcList = ref([]);
const apiRiskImgSrcList = ref([]);
const storageImgSrcList = ref([]);
const tmsStationImgSrcList = ref([]);
const tmsMockImgSrcList = ref([]);
const launcherImgSrcList = ref([]);
const openImgSrcList = ref([]);

// https://v2.vuepress.vuejs.org/zh/advanced/cookbook/usage-of-client-config.html#%E4%BD%BF%E7%94%A8%E7%BB%84%E5%90%88%E5%BC%8F-api
onMounted(() => {
  hostname.value = window.location.origin + "/resume/"
  
  resumePdf.value = hostname.value + 'resume.pdf'
  
  const messagePushImg = ['messagePush1.jpeg', 'messagePush2.jpeg', 'messagePush3.jpeg', 'messagePush4.jpeg']
  messagePushImgSrcList.value = messagePushImg.map(src => hostname.value + src)
  
  const apiRiskImg = ['apiRisk1.jpeg', 'apiRisk2.jpeg']
  apiRiskImgSrcList.value = apiRiskImg.map(src => hostname.value + src)
  
  const storageImg = ['storage1.jpeg', 'storage2.jpeg', 'storage3.jpeg']
  storageImgSrcList.value = storageImg.map(src => hostname.value + src)
  
  const tmsStationImg = ['tmsStation1.jpeg', 'tmsStation2.jpeg', 'tmsStation3.jpeg', 'tmsStation4.jpeg']
  tmsStationImgSrcList.value = tmsStationImg.map(src => hostname.value + src)
  
  const tmsMockImg = ['tmsMock1.jpeg', 'tmsMock2.jpeg', 'tmsMock3.jpeg', 'tmsMock4.jpeg']
  tmsMockImgSrcList.value = tmsMockImg.map(src => hostname.value + src)
  
  const launcherImg = ['launcher1.jpeg', 'launcher2.jpeg']
  launcherImgSrcList.value = launcherImg.map(src => hostname.value + src)
  
  const openImg = ['open.jpeg', 'open1.jpeg', 'open2.jpeg', 'open3.jpeg', 'open4.jpeg', 'open5.jpeg', 'open6.jpeg', 'open7.jpeg', 'open8.jpeg']
  openImgSrcList.value = openImg.map(src => hostname.value + src)
  
  wxImgSrc.value = hostname.value + 'wx.jpeg'
})


</script>

<style scoped>
</style>
