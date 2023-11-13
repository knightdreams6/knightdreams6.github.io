<template>
  <div>
    <h3>以下为简历中提到做过的部分项目/模块示例：</h3>
    <el-alert title="Tips: 点击图片查看更多" type="info"/>
    <div>
      <h5>消息推送模块</h5>
      <el-image :hide-on-click-modal="true" :src="messagePushImgSrcList[0]" :preview-src-list="messagePushImgSrcList"
                :infinite="false"/>
    </div>
    <div>
      <h5>风险认证模块</h5>
      <el-image :hide-on-click-modal="true" :src="apiRiskImgSrcList[0]" :preview-src-list="apiRiskImgSrcList"
                :infinite="false"/>
    </div>
    <div>
      <h5>存储模块</h5>
      <el-image :hide-on-click-modal="true" :src="storageImgSrcList[0]" :preview-src-list="storageImgSrcList"
                :infinite="false"/>
    </div>
    <div>
      <h5>TMS工作站</h5>
      <el-image :hide-on-click-modal="true" :src="tmsStationImgSrcList[0]" :preview-src-list="tmsStationImgSrcList"
                :infinite="false"/>
    </div>
    <div>
      <h5>TMS模拟器</h5>
      <el-image :hide-on-click-modal="true" :src="tmsMockImgSrcList[0]" :preview-src-list="tmsMockImgSrcList"
                :infinite="false"/>
    </div>
    <div>
      <h5>启动器</h5>
      <el-image :hide-on-click-modal="true" :src="launcherImgSrcList[0]" :preview-src-list="launcherImgSrcList"
                :infinite="false"/>
    </div>
    <div>
      <h5>个人开源项目</h5>
      <el-image :hide-on-click-modal="true" :src="openImgSrcList[0]" :preview-src-list="openImgSrcList"
                :infinite="false"/>
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
  
  const openImg = ['open1.jpeg', 'open2.jpeg', 'open3.jpeg', 'open4.jpeg', 'open5.jpeg', 'open6.jpeg', 'open7.jpeg']
  openImgSrcList.value = openImg.map(src => hostname.value + src)
  
  wxImgSrc.value = hostname.value + 'wx.jpeg'
})


</script>

<style scoped>
</style>
