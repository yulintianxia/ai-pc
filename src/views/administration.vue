<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <el-form
          :inline="true"
          :model="formInline"
          label-width="80px;"
          class="form"
        >
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
              type="daterange"
              range-separator="到"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              :size="size"
              clearable
            />
          </el-form-item>
          <el-form-item label="状态">
            <el-select
              v-model="formInline.state"
              placeholder="请选择状态"
              clearable
            >
              <el-option
                v-for="(item, index) in stateOptions"
                :value="item.value"
                :key="item.value"
                :label="item.label"
              ></el-option>
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
      <el-main>
        <div class='table-action'>
           <el-button type="primary" @click="cleanBtn">字符清洗</el-button>
        </div>
        <el-table
          ref="singleTableRef"
          :data="tableData"
          highlight-current-row
          style="width: 100%"
          border
          @current-change="handleCurrentChange"
          class="table-container"
        >
          <el-table-column type="index" width="50" />
          <el-table-column property="ID" label="ID" />
          <el-table-column property="name" label="词库" />
          <el-table-column property="address" label="长尾词" />
          <el-table-column label="状态" width="120">
            <template #default="scope">
              <el-switch
                v-model="scope.row.state"
                class="mb-2"
                style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949; "
                active-text="已生成"
                disabled
                inactive-text="未生成"
              />
            </template>
          </el-table-column>
          <el-table-column property="address" label="导入时间" width="180" />
          <el-table-column property="address" label="生成时间" width="180" />
          <el-table-column fixed="right" label="操作" width="120">
            <template #default="scope">
              <el-button
                link
                type="danger"
                size="small"
                @click.prevent="deleteRow(scope.$index)"
              >
                删除
              </el-button>
              <el-button
                link
                type="primary"
                size="small"
                @click.prevent="editRow(scope.$index)"
              >
                修改
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
        
    </el-container>
    <el-footer>
      <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize4"
      :page-sizes="[100, 200, 300, 400]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    </el-footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { stateOptions } from "@/assets/ts/configOptions.ts";

let formInline = ref({
  keyword: "",
  lexicon: "",
  date: "",
  state: "",
});

/* 分页 */
const  currentPage = ref(1);

// 分页页数
const pages = ref(1);


const handleSizeChange =()=>{


}


const handleCurrentChange = () => {};




const onSubmit = () => {};

// 删除
const deleteRow = () => {};

// 修改
const editRow = () => {};
</script>
<style lang="scss">
.table-container {
  padding: 10px;
  margin-top: 20px;
}
.table-action {
   margin-top:20px;
   margin-left:20px;
}
</style>
