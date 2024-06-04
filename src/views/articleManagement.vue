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
          <el-form-item label="文章任务名字">
            <el-input
              v-model="formInline.article_job_name"
              placeholder="请输入文章任务名字"
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
          <el-table-column property="article_job_name" label="文章任务名字" />
          <el-table-column property="article_sum" label="文章数量" />
          <el-table-column property="job_status" label="文章状态" />
          <el-table-column
            property="create_time"
            label="创建时间"
            width="180"
          />
          <el-table-column
            property="update_time"
            label="更新时间"
            width="180"
          />
          <el-table-column fixed="right" label="操作" width="200">
            <template #default="scope">
              <el-button
                @click.prevent="doArticle(scope.row.article_job_id)"
                type="primary" 
              >
                开始
              </el-button>
              <el-button  type="danger" @click.prevent="doArticle(scope.row.article_job_id)">
                暂停
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
import MainDialog from "@/components/dialog/article.vue";
import {
  taskList,
  startTask,
  stopTask 
} from "@/utils/api.ts";
import { ElMessage, ElMessageBox } from "element-plus";
const dialog = ref("dialog");

const tableData = ref([]);

let formInline = ref({
  article_job_name:'',
  date: [],
  pageSize: 10,
  pageNum: 1,
});

const total = ref(0);

/* 新增 */
const addRow = () => {
  dialog.value.dialogShow();
};

/* 生成或者停止操作 */
const doArticle = async (article_job_id: number) => {

  
  ElMessageBox.confirm("您确定要生成文章", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      let params = {
        article_job_id,
      };
      let data = await startTask(params);
      console.log("data", data);
      if (data) {
        ElMessage({
          message: "成功",
          type: "success",
        });
        search();
      }
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "取消",
      });
    });
};

const search = async () => {
  const { article_job_name, date, pageSize, pageNum } =
    formInline.value;
  let data = {
    article_job_name,
    start_time:
      (date?.length && dayjs(date[0]).format("YYYY-MM-DD HH:mm:ss")) || "",
    end_time:
      (date?.length && dayjs(date[1]).format("YYYY-MM-DD HH:mm:ss")) || "",
      pageSize,
      pageNum
  };
  let resp = await taskList(data);
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
