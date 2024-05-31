<script setup lang="ts">
import { ref } from "vue";

const settings = defineProps({
  collapse: Boolean,
  width: String,
});

const iconColor = ref("color:#F8FAFB");
</script>

<template>
  <el-aside :width="settings.width">
    <el-scrollbar>
      <el-menu
        :collapse="settings.collapse"
        active-text-color="#F8FAFB"
        background-color="#1A1C1E"
        text-color="#74767A"
        router="true"
      >
        <el-sub-menu index="1">
          <template #title>
            <el-icon>
              <Menu /> </el-icon><span>长尾词</span>
          </template>
          <el-menu-item index="/administration">长尾词管理</el-menu-item>
          <el-menu-item index="/lexicon">词库管理</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="2">
          <template #title>
            <el-icon>
              <Message /> </el-icon
            ><span>内容</span>
          </template>
          <el-menu-item index="/newTask">新建任务</el-menu-item>
          <el-menu-item index="/taskManagement">任务管理</el-menu-item>
          <el-menu-item index="/articleManagement">任务管理</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="3">
          <template #title>
            <el-icon>
              <Message /> </el-icon
            ><span>设置</span>
          </template>
          <el-menu-item index="/modeSettings">模型设置</el-menu-item>
          <el-menu-item index="/webSettings">网站设置</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>

<style scoped lang="scss">
.el-aside {
  height: 100vh;
  overflow: hidden;
  box-shadow: var(--el-box-shadow-lighter);
}

.el-scrollbar {
  height: 100vh;
  overflow: hidden;
  background-color: #1a1c1e;
}

.el-menu {
  border-right: none;
}
</style>
