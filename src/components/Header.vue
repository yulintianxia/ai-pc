<script setup lang="ts">
import { ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import a11Img from "@/assets/imgs/user.png";
import { loginOut } from "@/utils/api.ts";
import { useRouter } from "vue-router";
const isCollapse = ref(true);

const user = ref(localStorage.getItem("user") || "");

console.log(localStorage.getItem("user"));
// 获取父组件传递过来的数据
const showIcon = defineProps({
  isCollapse: Boolean,
});

// 获取父组件自定义的事件
const emit = defineEmits(["changeAside"]);

const router = useRouter();
// 自定义按钮点击事件，侧边栏的收缩按钮
const collapseAside = () => {
  emit("changeAside");
};

// 登出按钮
const LogOut = async () => {
  ElMessageBox.confirm("您确定要退出登录?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      let resp = await loginOut();
      if (resp) {
        localStorage.clear();
        router.push({
          path: "/login",
        });
      }
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "取消",
      });
    });
};
</script>

<template>
  <div>
    <el-header style="display: flex; font-size: 16px">
      <div
        style="
          display: inline-flex;
          flex: 1;
          align-items: center;
          justify-content: left;
        "
      >
        <el-icon
          v-show="!showIcon.isCollapse"
          @click="collapseAside"
          style="color: #303133"
        >
          <Fold />
        </el-icon>
        <el-icon
          v-show="showIcon.isCollapse"
          @click="collapseAside"
          style="color: #303133"
        >
          <Expand />
        </el-icon>
      </div>
      <div class="toolbar">
        <div class="block" style="margin-right: 10px">
          <el-avatar :size="40" :src="a11Img" />
        </div>
        <span>{{ user }}</span>
        <el-dropdown trigger="click">
          <el-icon style="margin-left: 18px; margin-top: 1px; color: #303133">
            <setting />
          </el-icon>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="LogOut">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </el-header>
  </div>
</template>

<style scoped lang="scss">
.el-header {
  width: 100%;
  background-color: #fff;
  color: var(--el-text-color-primary);
  box-shadow: var(--el-box-shadow);
}

.toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
  text-align: right;
}

.el-dropdown-menu__item {
  width: 120px;
}

.icon-color {
  color: white;
}
</style>
