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
        :collapse-transition="false"
        router
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
              <Folder /></el-icon><span>管理</span>
          </template>
          <!-- <el-menu-item index="/taskManagement">任务管理</el-menu-item> -->
          <el-menu-item index="/articleManagement">任务管理</el-menu-item>
          <el-menu-item index="/articleTaskManagement">文章生成任务管理</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="3">
          <template #title>
            <el-icon>
              <Setting /> </el-icon
            ><span>设置</span>
          </template>

          <el-menu-item index="/webSettings">网站设置</el-menu-item>
          <el-menu-item index="/websiteModel">网站模块设置</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="4">
          <template #title>
            <el-icon>
              <Monitor /> </el-icon><span>AI大数据</span>
          </template>
          <el-menu-item index="/modeSettings">AI模型</el-menu-item>
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
