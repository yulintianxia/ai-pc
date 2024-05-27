<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
</script>
<template>
  <div>这是登录页面</div>
</template>
<style scoped lang="scss">
div{
  color:red;
}
</style>
