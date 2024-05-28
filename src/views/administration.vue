<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="关键词">
            <el-input
              v-model="formInline.keyword"
              placeholder="请填写关键词"
              clearable
            />
          </el-form-item>
          <el-form-item label="词库">
            <el-select
              v-model="formInline.lexicon"
              placeholder="请选择词库"
              clearable
            >
              <el-option label="Zone one" value="shanghai" />
              <el-option label="Zone two" value="beijing" />
            </el-select>
          </el-form-item>
          <el-form-item label="创建时间">
            <el-date-picker
              v-model="formInline.date"
              type="date"
              placeholder="请选择时间"
              clearable
            />
          </el-form-item>
          <el-form-item label="状态">
            <el-select
              v-model="formInline.state"
              placeholder="请选择状态"
              clearable
            >
              <el-option label="Zone one" value="shanghai" />
              <el-option label="Zone two" value="beijing" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">词库管理</el-button>
            <el-button type="primary" @click="onSubmit">导入词库</el-button>
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <el-button type="primary" @click="onSubmit">重置</el-button>
          </el-form-item>
        </el-form>
      </el-header>
      <el-main> </el-main>
    </el-container>
  </div>
</template>

<script setup>
import { ref } from "vue";
let formInline = ref({
  keyword: "",
  lexicon:'',
  date:'',
  state:'',


});

const onSubmit = ()=>{
  
}


</script>
<style scoped lang="scss"></style>
