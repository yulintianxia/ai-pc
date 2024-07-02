<template>
  <div class="common-layout">
    <el-container>
      <el-header height="60px">
        <el-form :inline="true" :model="formInline" label-width="auto" class="form">
          <el-form-item label="文章上传任务" prop="article_up_name">
            <el-input
              v-model="formInline.article_up_name"
              placeholder="请输入文章上传任务"
              clearable
            />
          </el-form-item>
          <el-form-item label="文章生成任务" prop="article_job_name">
            <el-input
              v-model="formInline.article_job_name"
              placeholder="请输入文章生成任务"
              clearable
            />
          </el-form-item>
          <el-form-item label="词库" prop="word_lib_name">
            <el-input
              v-model="formInline.word_lib_name"
              placeholder="请输入词库"
              clearable
            />
          </el-form-item>
          <!-- <el-form-item label="时间">
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
          </el-form-item> -->
          <el-form-item>
            <el-button type="primary" @click="search">查询</el-button>
          </el-form-item>
        </el-form>
      </el-header>
      <el-main class="el-main-container">
        <div class="header-container">
          <el-button type="primary" @click="addRow">上传</el-button>
        </div>
        <el-table ref="singleTableRef" :data="tableData" highlight-current-row style="width: 100%" border
          class="table-container" header-cell-class-name="table-header-cell-class">
          <el-table-column type="index" width="80" label="序号" />
          <el-table-column property="article_up_name" label="文章上传任务名字" />
          <el-table-column property="article_job_name" label="文章生成任务名字" />
          <el-table-column property="word_lib_name" label="词库名字" />
          <el-table-column property="up_status" label="上传状态">
            <template #default="scope">
              <span v-if="scope.row.up_status == 0">未开始</span>
              <span v-else-if="scope.row.up_status == 1">上传中</span>
              <span v-else-if="scope.row.up_status == 2">暂停中</span>
              <span v-else-if="scope.row.up_status == 3">已暂停</span>
              <span v-else-if="scope.row.up_status == 4">已完成</span>
              <span v-else-if="scope.row.up_status == 5">状态异常</span>
              <span v-else-if="scope.row.up_status == 6">已删除</span>
            </template>
          </el-table-column>
          <el-table-column property="web_name" label="网站名字" show-overflow-tooltip />
          <el-table-column property="web_module_name" label="模块名字" show-overflow-tooltip />
          <el-table-column property="error_str" label="异常信息" show-overflow-tooltip />
          <el-table-column fixed="right" label="操作" width="150">
            <template #default="scope">
              <el-button
                 v-if='scope.row.up_status==0 || scope.row.up_status==3 || scope.row.up_status==5'
                @click.prevent="doArticle(scope.row.article_up_id,scope.row.up_status)"
                type="primary" 
                size="small"
              >
                开始
              </el-button>
              <el-button  v-else-if="scope.row.up_status==1"  size="small" type="danger" @click.prevent="doArticle(scope.row.article_up_id, scope.row.up_status)">
                暂停
              </el-button>
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
</template>
  
<script setup lang="ts">
import { ref } from "vue";

import MainDialog from "@/components/dialog/articleUpload.vue";
import { upLoadArticleTask,stopArticle, startArticle } from "@/utils/api";
import { ElMessage, ElMessageBox , dayjs} from "element-plus";
const dialog = ref("dialog");
const tableData = ref([]);

let formInline = ref({
  article_up_name: "",
  article_job_name: '',
  word_lib_name: '',
  pageSize: 10,
  pageNum: 1,
  date: [],
});

const defaultTime = ref<[Date, Date]>([
  new Date(2000, 1, 1, 0, 0, 0),
  new Date(2000, 2, 1, 23, 59, 59),
]);

const total = ref(0);



/* 新增 */
const addRow = () => {
  dialog.value.dialogShow();
};

/* 生成或者停止操作 */
const doArticle = async (article_up_id: number, up_status:number) => {
  let title = up_status == 1 ?'暂停':'开始';
  ElMessageBox.confirm(`您确定要${title}文章生成?`, "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      let params = {
        article_up_id,
      };
      let data;
      if (up_status == 1) {
        data = await stopArticle(params);
      } else {
        data= await startArticle(params);
      }
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
  const { article_up_name, pageSize, pageNum, article_job_name, word_lib_name,date } = formInline.value;
  let data = {
    article_up_name,
    article_job_name,
    word_lib_name,
    start_time:
      (date?.length && dayjs(date[0]).format("YYYY-MM-DD HH:mm:ss")) || "",
    end_time:
      (date?.length && dayjs(date[1]).format("YYYY-MM-DD HH:mm:ss")) || "",
      pageSize,
      pageNum
  };
  let resp = await upLoadArticleTask(data);
  if (resp?.data_list) {
    tableData.value = resp?.data_list || [];
    total.value = resp.total;
  }
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
  