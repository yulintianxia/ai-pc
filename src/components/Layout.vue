<script setup lang="ts">
import { reactive, toRefs } from "vue";
import MenuList from "@/components/Menu.vue";
import MainBody from '@/components/MainBody.vue';
const state = reactive({
  circleUrl:
    "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
});
const { circleUrl } = toRefs(state);

const handleCommand = ()=>{
 
}

</script>
<template>
  <div class="common-layout">
    <el-container class="el-container-hg">
      <el-header class="el-header-padding">
        <div class="layout-header">
          <div class="avatar">
            <el-avatar :size="40" :src="circleUrl" />
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link">小红</span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
      </el-header>
      <el-container>
        <el-aside class="side" width="200px">
          <menu-list></menu-list>
        </el-aside>
        <el-main>
          <main-body>
             <slot></slot>
          </main-body>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<style scoped lang="scss">
.layout-header {
  background-color: rgb(67, 74, 80);
  color: black;
  height: 100%;
}
.common-layout {
  width: 100%;
  height: 100vh;
}
.el-header-padding {
  padding: 0;
}
.el-container-hg {
  height: 100vh;
}
.avatar {
  width: 100px;
  display: flex;
  align-items: center;
  float: right;
  margin-right: 30px;
  margin-top:10px;
}
.el-dropdown-link {
  color:white;
  margin-left:30px;
}
</style>
