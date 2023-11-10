<template>
<!--  <el-carousel :interval="4000" type="card" height="400px">-->
<!--    <el-carousel-item v-for="item in tmsStationImgSrcList" :key="item">-->

<!--    </el-carousel-item>-->
<!--  </el-carousel>-->
    <div>
      <div>
        <h5>消息推送</h5>
        <el-image :hide-on-click-modal="true" :src="messagePushImgSrcList[0]"  :preview-src-list="messagePushImgSrcList"></el-image>
      </div>
      <div>
        <h5>启动器</h5>
        <el-image :hide-on-click-modal="true" :src="messagePushImgSrcList[0]"  :preview-src-list="messagePushImgSrcList"></el-image>
      </div>
      <div>
        <h5>TMS工作站</h5>
        <el-image :hide-on-click-modal="true" :src="tmsStationImgSrcList[0]"  :preview-src-list="tmsStationImgSrcList"></el-image>
      </div>
      <div>
        <h5>TMS模拟器</h5>
        <el-image :hide-on-click-modal="true" :src="tmsMockImgSrcList[0]"  :preview-src-list="tmsMockImgSrcList"></el-image>
      </div>
    </div>

</template>


<script lang="ts" setup>

const hostname = window.location.origin + "/resume/";

const tmsStationImg = ['tmsStation1.jpeg', 'tmsStation2.jpeg', 'tmsStation3.jpeg', 'tmsStation4.jpeg']
const tmsMockImg = ['tmsMock1.jpeg', 'tmsMock2.jpeg', 'tmsMock3.jpeg', 'tmsMock4.jpeg']
const messagePushImg = ['messagePush1.jpeg', 'messagePush2.jpeg', 'messagePush3.jpeg']

const tmsStationImgSrcList = tmsStationImg.map(src => hostname + src)
const tmsMockImgSrcList = tmsMockImg.map(src => hostname + src)
const messagePushImgSrcList = messagePushImg.map(src => hostname + src)

</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 400px;
  margin: 0;
  text-align: center;
}
</style>
