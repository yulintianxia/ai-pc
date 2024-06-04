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
          <el-form-item label="模型" prop="model_id">
            <el-select
              v-model="formInline.model_id"
              placeholder="请选择模型"
              clearable
            >
              <el-option
                v-for="(item, index) in aiTypeOptions"
                :value="item.model_id"
                :key="item.model_id"
                :label="item.model_name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search">查询</el-button>
          </el-form-item>
        </el-form>
      </el-header>
      <el-main class="main-container">
        <div class="table-container">
          <el-table
            ref="singleTableRef"
            :data="tableData"
            highlight-current-row
            style="width: 100%"
            border
            class="table-container"
          >
            <el-table-column type="index" width="50" abel="序号" />
            <el-table-column property="model_name" label="模型名字" />
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
                <el-button type="primary" @click.prevent="editRow(scope.row)">
                  配置
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
      />
    </el-footer>
  </div>
  <main-dialog ref="dialog" @search="search" class="main-dialog"></main-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import MainDialog from "@/components/dialog/modeSetting.vue";
import { AImodeListPage,AImodeList } from "@/utils/api.ts";

const dialog = ref("dialog");
const tableData = ref([]);
let formInline = ref({
  model_id: "",
});

const total = ref(0);

/* 新增 */
const addRow = () => {
  dialog.value.dialogShow();
};


let aiTypeOptions = ref([]);

const getOptions = async()=>{
  let resp = await AImodeListPage();
  if (resp?.length) {
    aiTypeOptions.value = resp;
  }
}

getOptions();

const search = async () => {
  const { model_id, pageSize, pageNum } = formInline.value;
  let data = {
    model_id,
  };
  let resp = await AImodeListPage(data);
  console.log('resp',resp);
  if (resp?.length) {
    tableData.value = resp || [];
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
.main-container {
  display: flex;
  flex-direction: column; /* 垂直方向排列子元素 */
}
.table-container {
  flex: 1; /* 占据剩余空间 */
  overflow-y: auto; /* 如果内容过多，出现垂直滚动条 */
}
</style>
