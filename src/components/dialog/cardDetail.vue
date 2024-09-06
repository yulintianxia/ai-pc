<template>
    <teleport to="body">
        <el-dialog v-model="show" title="详情" width="800">
            <el-card>  
                <p class="text item longtext">{{ article_str}}</p>
            </el-card>
        </el-dialog>
    </teleport>
</template>
  
<script setup lang="ts">
import { ref, nextTick } from "vue";

let show = ref(false);

let article_str = ref({});

const dialogShow =  (data) => {
    show.value = true;
    article_str.value = data;
};


defineExpose({
    dialogShow,
})

</script>
<style scoped lang="scss">
.item {
    margin-top:5px;
}
.longtext {
    max-height: 500px;
    overflow: auto;
}
</style>
  