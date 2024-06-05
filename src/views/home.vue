<template>
   <div class='container'></div>
</template>

<script setup lang='ts'>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import AIimg from  "@/assets/imgs/user.png";
</script>
<style scoped lang='scss'>
.container {
   width:100%;
  height: calc(100vh - 140px);
  background:url('../assets/imgs/ai.webp');
  background-size:100%;
}

</style>