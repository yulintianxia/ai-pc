<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <el-form
          :inline="true"
          :model="formInline"
          label-width="100px;"
          class="form"
        >
          <el-form-item label="名字">
            <el-input
              v-model="formInline.keyword"
              placeholder="请输入长尾词名字"
              clearable
            />
          </el-form-item>
          <el-form-item label="导入时间">
            <el-date-picker
              v-model="formInline.date"
              type="date"
              range-separator="到"
              placeholder="请填写导入时间"
              clearable
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search">查询</el-button>
          </el-form-item>
        </el-form>
      </el-header>
      <el-main>
        <div class="header-container">
          <el-button type="primary" @click="addRow">添加</el-button>
        </div>
        <el-table
          ref="singleTableRef"
          :data="tableData"
          highlight-current-row
          style="width: 100%"
          border
          class="table-container"
        >
          <el-table-column type="index" width="50" />
          <el-table-column property="name" label="名字" />
          <el-table-column property="address" label="excel名字" />
          <el-table-column property="address" label="导入时间" width="180" />
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
  <main-dialog ref='dialog' class='main-dialog'></main-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { stateOptions } from "@/assets/ts/configOptions.ts";
import MainDialog  from '@/components/dialog/administration.vue';

const dialog = ref('dialog');

let formInline = ref({
  keyword: "",
  date: "",
});

/* 分页 */
const currentPage = ref(1);

// 分页页数
const pages = ref(1);

const handleSizeChange = () => {};

const handleCurrentChange = () => {};

/* 新增 */
const addRow = () => {
  console.log('dialog', dialog);
  dialog.value.dialogShow();

};
</script>
<style lang="scss">
.table-container {
  padding: 10px;
  margin-top: 10px;
}
.table-action {
  margin-top: 20px;
  margin-left: 20px;
}
.header-container {
  margin-top: -10px;
}

</style>
