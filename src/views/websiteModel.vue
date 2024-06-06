<template>
  <div class="common-layout">
    <el-container>
      <el-header height="90px">
        <el-form
          :inline="true"
          :model="formInline"
          label-width="auto;"
          class="form"
        >
          <el-form-item label="网站名字" prop="web_id">
            <el-select
              v-model="formInline.web_id"
              placeholder="请选择网站名字"
              clearable
            >
              <el-option
                v-for="(listItem, index) in webOptions"
                :value="listItem.web_id"
                :key="listItem.web_id"
                :label="listItem.web_name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="模块名字">
            <el-input
              v-model="formInline.module_name"
              placeholder="请输入模块名字"
              clearable
            />
          </el-form-item>
          <el-form-item label="模块PID">
            <el-input
              v-model="formInline.module_num"
              placeholder="请输入模块PID"
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
              format="YYYY-MM-DD HH:mm:ss"
              value-fomat="YYYY-MM-DD HH:mm:ss"
              :default-time="defaultTime"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search">查询</el-button>
          </el-form-item>
        </el-form>
      </el-header>
      <el-main class="el-main-container">
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
          header-cell-class-name='table-header-cell-class'
        >
          <el-table-column type="index" width="80" label="序号" />
          <el-table-column property="web_name" label="网站名字" />
          <el-table-column property="module_name" label="模块名字" />
          <el-table-column property="module_num" label="模块PID" />
          <el-table-column
            property="create_time"
            label="创建时间"
            width="180"
          />
          <el-table-column fixed="right" label="操作" width="200">
            <template #default="scope">
              <el-button   size="small" type="primary" @click.prevent="editRow(scope.row)">
                修改
              </el-button>
              <el-button
              size="small"
                @click.prevent="deleteRow(scope.row.web_module_id)"
                type="danger"
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
        v-model:current-page="formInline.pageNum"
        v-model:page-size="formInline.pageSize"
        :page-sizes="[10, 20, 30, 40]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="search"
        @current-change="search"
        class="page-footer"
      />
    </el-footer>
  </div>
  <main-dialog ref="dialog" @search="search" class="main-dialog"></main-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import MainDialog from "@/components/dialog/websiteMode.vue";
import {
  webSiteModeEdit,
  webSiteModeList,
  webSiteModeDel,
  webSettingOptions,
} from "@/utils/api.ts";
import { ElMessage, ElMessageBox, dayjs } from "element-plus";
const dialog = ref("dialog");

const webOptions = ref([]);

const getOptions = async () => {
  let resp = await webSettingOptions();
  console.log("resp");
  if (resp.data_list.length) {
    webOptions.value = resp.data_list || [];
  }
};

const defaultTime = ref<[Date, Date]>([
  new Date(2000, 1, 1, 0, 0, 0),
  new Date(2000, 2, 1, 23, 59, 59),
]);


getOptions();

const tableData = ref([]);

let formInline = ref({
  web_name: "",
  web_id: "",
  module_name: "",
  module_num: "",
  date: [],
  pageSize: 10,
  pageNum: 1,
});

const total = ref(0);

/* 新增 */
const addRow = () => {
  dialog.value.dialogShow();
};

/* 删除操作 */
const deleteRow = async (web_module_id: number) => {
  ElMessageBox.confirm("您确定要删除这个网站模块?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      let params = {
        web_module_id,
      };
      let data = await webSiteModeDel(params);
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

const search = async () => {
  const { web_name, module_name, module_num, web_id, date, pageSize, pageNum } =
    formInline.value;
  let data = {
    web_name,
    pageSize,
    pageNum,
    module_name,
    module_num,
    web_id,
    start_time:
      (date?.length && dayjs(date[0]).format("YYYY-MM-DD HH:mm:ss")) || "",
    end_time:
      (date?.length && dayjs(date[1]).format("YYYY-MM-DD HH:mm:ss")) || "",
  };
  let resp = await webSiteModeList(data);
  if (resp?.data_list) {
    tableData.value = resp?.data_list || [];
    total.value = resp.total;
  }
};

const editRow = (data) => {
  dialog.value.dialogShow(data);
};

search();
</script>
<style lang="scss">
.table-container {
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
<style lang="scss" scoped>
.el-main-container {
  height: calc(100vh - 260px);
}
</style>

