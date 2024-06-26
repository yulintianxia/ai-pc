<template>
  <div class="common-layout">
    <el-container>
      <el-header height="45px">
        <el-form :inline="true" :model="formInline" label-width="auto;" class="form">
          <el-form-item label="词库名字">
            <el-input v-model="formInline.key_word_lib_name" placeholder="请输入词库名字" clearable />
          </el-form-item>
          <el-form-item label="时间">
            <el-date-picker v-model="formInline.date" type="datetimerange" range-separator="到" start-placeholder="开始时间"
              end-placeholder="结束时间" format="YYYY-MM-DD HH:mm:ss" value-fomat="YYYY-MM-DD HH:mm:ss"
              :default-time="defaultTime" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search">查询</el-button>
          </el-form-item>
        </el-form>
      </el-header>
      <el-main class="el-main-container">
        <div class="header-container">
          <el-button type="primary" @click="addRow">添加</el-button>
          <el-button type="primary" @click="exportRow">导入</el-button>
        </div>
        <el-table ref="singleTableRef" :data="tableData" highlight-current-row style="width: 100%" border
          class="table-container" header-cell-class-name='table-header-cell-class'>
          <el-table-column type="index" width="100" label="序号" />
          <el-table-column property="key_word_lib_name" label="词库名字" />
          <el-table-column label="长尾词数量(已生成/总数)" width="240">
            <template #default="scope">
              {{ scope.row.key_word_lib_num }}/{{ scope.row.key_word_lib_sum }}
            </template>
          </el-table-column>
          <el-table-column label="状态" width="200">
            <template #default="scope">
              <div v-if="scope.row.status == 0">未开始</div>
              <div v-else-if="scope.row.status == 1">生成中</div>
              <div v-else-if="scope.row.status == 2">暂停中</div>
              <div v-else-if="scope.row.status == 3">已暂停</div>
              <div v-else-if="scope.row.status == 4">已完成</div>
              <div v-else-if="scope.row.status == 5">状态异常</div>
              <div v-else-if="scope.row.status == 6">已删除</div>
            </template>
          </el-table-column>
          <el-table-column property="create_time" label="创建时间" width="180" />
          <el-table-column fixed="right" label="操作" width="200">
            <template #default="scope">
              <el-button type="primary" size="small" @click.prevent="detail(scope.row.key_word_lib_id)">详情</el-button>
              <el-button type="danger" size="small" @click.prevent="deleteRow(scope.row.key_word_lib_id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
    <el-footer>
      <el-pagination v-model:current-page="formInline.pageNum" v-model:page-size="formInline.pageSize"
        :page-sizes="[10, 20, 30, 40]" layout="total, sizes, prev, pager, next, jumper" :total="total"
        @size-change="search" @current-change="search" class="page-footer" />
    </el-footer>
  </div>
  <main-dialog ref="dialog" @search="search" class="main-dialog"></main-dialog>
  <detail-dialog :id="detailId" ref="detailDialog" class="main-dialog"></detail-dialog>
  <export-lexicon :id="detailId" @search="search" ref="exportLexion" class="main-dialog"></export-lexicon>
</template>

<script setup lang="ts">
import { ref } from "vue";
import MainDialog from "@/components/dialog/lexicon.vue";
import DetailDialog from "@/components/dialog/detailDialog.vue";
import { dayjs } from "element-plus";
import { wordList, delWord, exportInWord } from "@/utils/api";
import { ElMessage, ElMessageBox } from "element-plus";
import ExportLexicon  from "@/components/dialog/exportLexicon.vue";

let formInline = ref({
  key_word_lib_name: "",
  date: [],
  pageSize: 10,
  pageNum: 1,
});

const tableData = ref();

let detailId = ref();
const total = ref(0);
const dialog = ref();
const detailDialog = ref();

const defaultTime = ref<[Date, Date]>([
  new Date(2000, 1, 1, 0, 0, 0),
  new Date(2000, 2, 1, 23, 59, 59),
]);

const search = async () => {
  const { key_word_lib_name, pageSize, pageNum, date } = formInline.value;
  let data = {
    key_word_lib_name,
    pageSize,
    pageNum,
    start_time:
      (date?.length && dayjs(date[0]).format("YYYY-MM-DD HH:mm:ss")) || "",
    end_time:
      (date?.length && dayjs(date[1]).format("YYYY-MM-DD HH:mm:ss")) || "",
  };
  let resp: any = await wordList(data);
  if (resp?.data_list) {
    tableData.value = resp?.data_list || [];
    total.value = resp.total;
  }
};

const exportLexion = ref();

// 导入词库
const exportRow = async () => {
  exportLexion.value.dialogShow();
}

/* 新增 */
const addRow = () => {
  dialog.value.dialogShow();
};

search();

/* 删除操作 */
const deleteRow = (key_word_lib_id: number) => {
  ElMessageBox.confirm("您确定要删除这个词库?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      let params = {
        key_word_lib_id,
      };
      let data = await delWord(params);
      console.log("data", data);
      if (data) {
        ElMessage({
          message: "删除成功",
          type: "success",
        });
        search();
      }
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "取消删除",
      });
    });
};

/* 详情页面展示 */
const detail = (id: nubmer) => {
  console.log("idid", id);
  detailDialog.value.dialogShow(id);
};
</script>
<style lang="scss">
.table-container {
  margin-top: 10px;
}
</style>
