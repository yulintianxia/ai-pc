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
          <el-form-item label="名字">
            <el-input
              v-model="formInline.name"
              placeholder="请输入名字"
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
          <el-table-column property="num" label="长尾词数量(总数/已生成)" />
          <el-table-column label="状态" width="120">
            <template #default="scope">
              <el-switch
                v-model="scope.row.state"
                class="mb-2"
                style="
                  --el-switch-on-color: #13ce66;
                  --el-switch-off-color: #ff4949;
                "
                active-text="已生成"
                disabled
                inactive-text="未生成"
              />
            </template>
          </el-table-column>
          <el-table-column property="date" label="导入时间" width="180" />
          <el-table-column fixed="right" label="操作" width="120">
            <template #default="scope">
              <el-button link @click.prevent="detail(scope.row.id)"
                >详情</el-button
              >
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
  <main-dialog ref="dialog" class="main-dialog"></main-dialog>
  <detail-dialog
    :id="detailId"
    ref="detailDialog"
    class="main-dialog"
  ></detail-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { stateOptions } from "@/assets/ts/configOptions.ts";
import MainDialog from "@/components/dialog/lexicon.vue";
import DetailDialog from "@/components/dialog/detailDialog.vue";

let formInline = ref({
  name: "",
  date: "",
  state: "",
});

const tableData = ref([
  {
    name: "测试名字",
    num: 1000,
    state: 1,
    date: " 2024-05-30",
  },
]);

let detailId: nubmer | undefined = ref();

const dialog = ref();
const detailDialog = ref();

/* 分页 */
const currentPage = ref(1);

// 分页页数
const pages = ref(1);

const handleSizeChange = () => {};

const handleCurrentChange = () => {};

const search = () => {};
/* 新增 */
const addRow = () => {
  dialog.value.dialogShow();
};

/* 详情页面展示 */
const detail = (id: nubmer) => {
  detailId.value = id;
  detailDialog.value.dialogShow();
};
</script>
<style lang="scss">
.table-container {
  padding: 10px;
  margin-top: 20px;
}
</style>
