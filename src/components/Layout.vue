<script setup lang='ts'>
import { ref } from 'vue'
// 组件注册
import Header from '@/components/Header.vue'
import Aside from '@/components/Aside.vue'


const asideSettings = ref({
    isCollapse:true,
    width:'200'
})

// 给子组件绑定事件，通过子组件emit从而改变父组件的值
const changeAside = ()=>{
   asideSettings.value.isCollapse = !asideSettings.value.isCollapse
   if(asideSettings.value.isCollapse){
    asideSettings.value.width = "64"
   }else{
    asideSettings.value.width = "200"
   }
}

</script>
<template>
  <el-container style="min-height: 100vh;min-width: 100vw;overflow: hidden;">
    <Aside :collapse="asideSettings.isCollapse" :width="asideSettings.width"></Aside>
    <el-container style="height: 100vh;width:100%;display: flex;flex-direction: column;">
      <Header :isCollapse="asideSettings.isCollapse"  @changeAside="changeAside"></Header>
      <el-main>
        <div>
          <h3 class='title'>文本内容</h3>
         <el-divider></el-divider>
        </div>
         <div class='main-container'>
          <slot></slot>
         </div>
      </el-main>
    </el-container>
  </el-container>
</template>


<style scoped lang='scss'>

body{
  background-color: #eee;
  max-width: 100vw;
  overflow: hidden;
}

.el-main {
  width: 100%;
  padding: 0;
  height: 100vh;
  overflow-x: hidden;
}
.title {
  margin:20px 10px;
}
.main-container {
  margin:20px 10px;
}
</style>
