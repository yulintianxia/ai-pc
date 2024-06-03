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
              v-model="formInline.file_name"
              placeholder="请输入长尾词名字"
              clearable
            />
          </el-form-item>
          <el-form-item label="时间">
            <el-date-picker
              v-model="formInline.date"
              type="datetimerange"
              range-separator="到"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              :size="size"
              format="YYYY-MM-DD HH:mm:ss"
              value-fomat="YYYY-MM-DD HH:mm:ss"
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
          <el-table-column type="index" width="50" abel="序号" />
          <el-table-column property="file_word_name" label="名字" />
          <el-table-column property="file_path" label="文件" />
          <el-table-column
            property="create_time"
            label="创建时间"
            width="180"
          />
          <el-table-column fixed="right" label="操作" width="200">
            <template #default="scope">
              <el-button
                type="danger"
                size="small"
                @click.prevent="deleteRow(scope.row.file_id)"
              >
                删除
              </el-button>
              <el-button
                type="primary"
                size="small"
                @click.prevent="download(scope.row.file_id)"
              >
                下载
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
    <el-footer>
      <el-pagination
        v-model:current-page="formInline.pageNum"
        v-model:page-size="formInline.pageSize"
        :page-sizes="[10, 20, 30, 40]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="search"
        @current-change="search"
      />
    </el-footer>
  </div>
  <main-dialog ref="dialog" @search="search" class="main-dialog"></main-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { stateOptions } from "@/assets/ts/configOptions.ts";
import { dayjs } from "element-plus";

import MainDialog from "@/components/dialog/administration.vue";
import {
  administrationDel,
  administrationList,
  administrationExPort,
  exportUrl,
} from "@/utils/api.ts";
import { ElMessage, ElMessageBox } from "element-plus";
const dialog = ref("dialog");

const tableData = ref([]);

let formInline = ref({
  file_name: "",
  date: [],
  pageSize: 10,
  pageNum: 1,
});

const total = ref(0);

/* 新增 */
const addRow = () => {
  console.log("dialog", dialog);
  dialog.value.dialogShow();
};

/* 删除操作 */
const deleteRow = (file_id: number) => {
  ElMessageBox.confirm("您确定要删除这个长尾词文件", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      let params = {
        file_id,
      };
      let data = await administrationDel(params);
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

/* 导出 */
const download = async (file_id: number) => {
  let params = {
    file_id,
  };
  let data = await administrationExPort(params);
  console.log("data", data);
  if (data[0].file_url) {
    const { file_url, file_name } = data[0];
    console.log("ile_name", file_name);
    exportUrl(file_url, file_name);
  }
};

const search = async () => {
  const { file_name, date, pageSize, pageNum } = formInline.value;
  let data = {
    file_name,
    pageSize,
    pageNum,
    start_time:
      (date?.length && dayjs(date[0]).format("YYYY-MM-DD HH:mm:ss")) || "",
    end_time:
      (date?.length && dayjs(date[1]).format("YYYY-MM-DD HH:mm:ss")) || "",
  };
  let resp = await administrationList(data);
  if (resp?.data_list) {
    tableData.value = resp?.data_list || [];
    total.value = resp.total;
  }
};

search();
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
