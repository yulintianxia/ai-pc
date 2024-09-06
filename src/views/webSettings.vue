<template>
  <div class="common-layout">
    <el-container>
      <el-header height="45px">
        <el-form
          :inline="true"
          :model="formInline"
          label-width="auto;"
          class="form"
        >
          <el-form-item label="网站名字">
            <el-input
              v-model="formInline.web_name"
              placeholder="请输入网站名字"
              clearable
            />
          </el-form-item>
          <!-- <el-form-item label="网站类型" prop="web_type">
            <el-select
            filterable
              v-model="formInline.web_type"
              placeholder="请选择网站类型"
              clearable
            >
              <el-option
                v-for="(listItem, index) in typeOptions"
                :value="listItem.value + ''"
                :key="listItem.value"
                :label="listItem.label"
              ></el-option>
            </el-select>
          </el-form-item> -->

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
        <div class="table-container">
          <el-table
            ref="singleTableRef"
            :data="tableData"
            highlight-current-row
            style="width: 100%"
            border
            class="table-container"
            header-cell-class-name='table-header-cell-class'
          >
          <!-- <el-table-column type="selection" width="55" /> -->
          <el-table-column type="index" width="100" label="序号" />
            <el-table-column property="web_name" label="网站名字" />
            <!-- <el-table-column property="web_type" label="网站类型">
              <template #default="scope">
                {{ scope.row.web_type == 1 ? "易优" : "非易优" }}
              </template>
            </el-table-column> -->
            <el-table-column property="web_address" label="网址" />
            <el-table-column property="web_user_account" label="后台账户" />
            <el-table-column property="web_password" label="后台密码" />
            <el-table-column
              property="create_time"
              label="创建时间"
              width="180"
            />
            <el-table-column fixed="right" label="操作" width="200">
              <template #default="scope">
             
                <el-button type="primary"  size="small" @click.prevent="editRow(scope.row)">
                  修改
                </el-button>
                <el-button
                  @click.prevent="deleteRow(scope.row.web_id)"
                  type="danger"
                  size="small"
                >
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
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
import MainDialog from "@/components/dialog/webSetting.vue";
import { webSettingDel, webSettingList } from "@/utils/api";
import { ElMessage, ElMessageBox } from "element-plus";
import { typeOptions } from "@/assets/ts/configOptions";
import { dayjs } from "element-plus";

const dialog = ref("dialog");

const tableData = ref([]);

let formInline = ref({
  web_name: "",
  web_type: "",
  date: [],
  pageSize: 10,
  pageNum: 1,
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

/* 删除操作 */
const deleteRow = async (web_id: number) => {
  ElMessageBox.confirm("您确定要删除这个网站设置?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      let params = {
        web_id,
      };
      let data = await webSettingDel(params);
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
  const { web_name, web_type, date, pageSize, pageNum } = formInline.value;
  let data = {
    web_name,
    pageSize,
    pageNum,
    web_type,
    start_time:
      (date?.length && dayjs(date[0]).format("YYYY-MM-DD HH:mm:ss")) || "",
    end_time:
      (date?.length && dayjs(date[1]).format("YYYY-MM-DD HH:mm:ss")) || "",
  };
  let resp = await webSettingList(data);
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
<style lang="scss" scoped>
.table-container {
  margin-top: 10px;
  padding:0;
}
.table-action {
  margin-top: 20px;
  margin-left: 20px;
}
.header-container {
  margin-top: -10px;
}
.main-container {
  display: flex;
  flex-direction: column; /* 垂直方向排列子元素 */
}

</style>
