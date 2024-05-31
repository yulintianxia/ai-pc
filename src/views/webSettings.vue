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
            <el-table-column type="index" width="50" abel="序号" />
            <el-table-column property="web_type" label="类型" />
            <el-table-column property="web_name" label="名称" />
            <el-table-column
              property="web_address"
              label="后台网址"
              width="180"
            />
            <el-table-column
              property="create_time"
              label="板块设置"
              width="180"
            />
            <el-table-column
              property="create_time"
              label="发布状态"
              width="180"
            />
            <el-table-column fixed="right" label="操作" width="120">
              <template #default="scope">
                <el-button
                  @click.prevent="deleteRow(scope.row.file_id)"
                  type="danger">
                  删除
                </el-button>
                <el-button
                  link
          
                  size="small"
                  @click.prevent="deleteRow(scope.row.file_id)"
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
          v-model:current-page="formInline.pageNum"
          v-model:page-size="formInline.pageSize"
          :page-sizes="[10, 20, 30, 40]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </el-footer>
    </div>
    <main-dialog ref="dialog" class="main-dialog"></main-dialog>
  </template>
  
  <script setup lang="ts">
  import { ref } from "vue";
  import { stateOptions } from "@/assets/ts/configOptions.ts";
  import MainDialog from "@/components/dialog/administration.vue";
  import { administrationDel, administrationList } from "@/utils/api.ts";
  import { ElMessage } from "element-plus";
  const dialog = ref("dialog");
  
  const tableData = ref([]);
  
  let formInline = ref({
    file_name: "",
    date: "",
    pageSize: 10,
    pageNum: 1,
  });
  
  const total = ref(0);
  
  const handleSizeChange = () => {
    search()
  };
  
  const handleCurrentChange = () => {
    search()
  };
  
  /* 新增 */
  const addRow = () => {
    console.log("dialog", dialog);
    dialog.value.dialogShow();
  };
  
  /* 删除操作 */
  const deleteRow = async (file_id: number) => {
    let params = {
      file_id
    }
    let data = await administrationDel(params);
    console.log('data',data);
    if (data) {
      ElMessage({
        message: "删除成功",
        type: "success",
      });
    }
  };
  
  const search = async () => {
    const { file_name, date, pageSize, pageNum } = formInline.value;
    let data = {
      file_name,
      date,
      pageSize,
      pageNum,
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
  