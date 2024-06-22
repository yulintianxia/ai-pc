<template>
    <teleport to="body">
        <el-dialog v-model="show" title="详情" width="500">
            <el-card>  
                <p class="text item">模型名字:  {{ rowData?.model_name }}</p>
                <p class="text item">模型key:  {{ rowData?.model_key_key }}</p>
                <p class="text item">模型value:  {{ rowData?.model_key_value }}</p>
                <p class="text item">词库名字: {{ rowData?.word_lib_name }}</p>
                <p class="text item">模型请求问题: {{ rowData?.key_question }} </p>
                <p class="text item">模型请求入参: {{ rowData?.parameter }} </p>
                <p class="text item longtext">模型返回结果:  {{ rowData?.answer }}</p>
            </el-card>
        </el-dialog>
    </teleport>
</template>
  
<script setup lang="ts">
import { ref, nextTick } from "vue";

let show = ref(false);

let rowData = ref({});

const dialogShow =  (data) => {
    show.value = true;
    rowData.value = data;
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
    max-height: 300px;
    overflow: auto;
}
</style>
  