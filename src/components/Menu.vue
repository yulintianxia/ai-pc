<template>
  <el-menu
    active-text-color="#ffd04b"
    background-color="#545c64"
    class="el-menu-vertical"
    default-active="2"
    text-color="#fff"
    @open="handleOpen"
    @close="handleClose"
  >
    <el-sub-menu index="1">
      <template #title>
        <el-icon><icon-menu /></el-icon>
        <span>长尾词</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="1-1">长尾词生成</el-menu-item>
        <el-menu-item index="1-2">长尾词管理</el-menu-item>
        <el-menu-item index="1-2">词库管理</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
    <el-sub-menu index="2">
      <template #title>
        <el-icon><icon-menu /></el-icon>
        <span>内容</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="2-1">新建任务</el-menu-item>
        <el-menu-item index="2-2">任务管理</el-menu-item>
        <el-menu-item index="2-3">文章管理</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
  </el-menu>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from "@element-plus/icons-vue";

const isCollapse = ref(true);
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
</script>

<style>
.el-menu-vertical:not(.el-menu--collapse) {
  width: 200px;
  min-height: 90vh;
}
.el-menu-vertical {
    
}
</style>
