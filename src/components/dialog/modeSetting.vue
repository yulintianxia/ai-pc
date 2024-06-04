<template>
  <teleport to="body">
    <el-dialog v-model="show" title="配置" width="1200">
      <el-container>
        <el-aside width="600px">
          <el-form :model="form" ref="ruleForm" :rules="rules" label-width="80">
            <el-form-item label="模型名字" requred prop="model_name">
              <el-input
                v-model="form.model_name"
                placeholder="模型名字"
                disabled
              />
            </el-form-item>
            <div
              v-if="form.model_type == 1"
              v-for="(item, index) in form.model_key_list"
              class="config-container"
              :key="index"
            >
              <el-form-item
                label="配置key"
                :prop="'model_key_list.' + [index] + '.model_key'"
                :rules="{
                  required: true,
                  message: '请填写模型key',
                }"
              >
                <el-input v-model="item.model_key" placeholder="模型key" />
              </el-form-item>
              <el-form-item
                label="配置值"
                :prop="'model_key_list.' + [index] + '.model_value'"
                :rules="{
                  required: true,
                  message: '请填写模型值',
                }"
              >
                <el-input v-model="item.model_value" placeholder="模型值" />
              </el-form-item>
              <el-button type="primary" class="mt-2" @click.prevent="add()">
                +
              </el-button>
              <el-button
                class="mt-2"
                @click.prevent="del(index)"
                v-if="form.model_key_list.length > 1"
                type="primary"
              >
                -
              </el-button>
            </div>
            <el-form-item
              class="el-form-action submit_btn"
              v-if="form.model_type == 1"
            >
              <el-button type="primary" @click="submitForm(ruleForm)"
                >保存
              </el-button>
            </el-form-item>
            <div v-else-if="form.model_type == 2">
              <el-form-item
                label="配置key"
                requred
                prop="model_key"
                :rules="{
                  required: true,
                  message: '请填写配置key',
                }"
              >
                <el-input
                  v-model="form.model_key"
                  :autosize="{ minRows: 2 }"
                  type="textarea"
                  placeholder="请使用逗号分割每一个key"
                />
              </el-form-item>

              <el-form-item class="submit_btn">
                <el-button type="primary" @click="submitForm(ruleForm)"
                  >保存
                </el-button>
              </el-form-item>
            </div>

            <el-table
              ref="singleTableRef"
              :data="tableData"
              highlight-current-row
              style="width: 100%"
              border
              class="table-container"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="55" />
              <el-table-column property="model_key_key" label="配置key" />
              <el-table-column property="model_key_value" label="配置value" />
              <el-table-column property="error_num" label="错误次数" />
              <el-table-column
                fixed="right"
                v-if="form.model_type == 2"
                label="操作"
                width="100"
              >
                <template #default="scope">
                  <el-button
                    type="danger"
                    @click.prevent="deleteRow(scope.row.model_key_id)"
                  >
                    删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-footer class="footer-container">
              <el-pagination
                v-model:current-page="searchData.pageNum"
                v-model:page-size="searchData.pageSize"
                :page-sizes="[10, 20, 30, 40]"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
                @size-change="getTableData"
                @current-change="getTableData"
              />
            </el-footer>
          </el-form>
        </el-aside>
        <el-aside class="el-simulation-dialog">
          <div>测试页面结果</div>
        </el-aside>
      </el-container>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="reset(ruleForm)">关闭</el-button>
        </div>
      </template>
    </el-dialog>
  </teleport>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import type { ComponentSize, FormInstance, FormRules } from "element-plus";
import RuleForm from "@/types/administration.interface.ts";
import { configAIkey, editAIid, delKey, AImodeList } from "@/utils/api.ts";
import { ElMessage, ElMessageBox } from "element-plus";
let show = ref(false);
let form = ref({
  model_name: "",
  model_id: "",
  model_key_list: [
    {
      model_key: "",
      model_value: "",
    },
  ],
  model_key: "",
  model_type: "",
});

const emits = defineEmits(["search"]);
const ruleForm = ref<FormInstance>();

const dialogShow = (data: any) => {
  show.value = true;
  console.log("data", data);
  form.value = {
    ...form.value,
    model_name: data.model_name,
    model_id: data.model_id,
    model_type: data.model_type,
  };

  console.log("form", form);
  getTableData();
};

const dialogHide = () => {
  show.value = false;
};
const handleSelectionChange = () => {};

const searchData = ref({
  pageSize: 10,
  pageNum: 1,
});

let total = ref(0);
let tableData = ref([]);

const getTableData = async () => {
  const { pageSize, pageNum } = searchData.value;
  const { model_id } = form.value;
  let params = {
    pageSize,
    pageNum,
    model_id,
  };
  tableData.value = [];
  let resp = await AImodeList(params);
  if (resp?.data_list.length) {
    tableData.value = resp.data_list || [];
    total.value = resp.total;
  }
};

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      let file_id_list = [];
      let resp;
      const { model_id, model_key, model_type, model_key_list } = form.value;
      if (model_type == 2) {
        file_id_list = model_key.split(",");
        let params = {
          model_id,
          model_key_list: file_id_list,
        };
        resp = await configAIkey(params);
        form.value.model_key = "";
        formEl.resetFields();
      } else {
        file_id_list = model_key_list;
        let params = {
          model_id,
          model_key_list: file_id_list,
        };
        resp = await editAIid(params);
      }
      getTableData();

      emits("search");
    } else {
      console.log("error submit!", fields);
    }
  });
};

/* 重置 */
const reset = (formEl: FormInstance | undefined) => {
  formEl.resetFields();
  dialogHide();
  form.value = {
    model_name: "",
    model_id: "",
    model_key_list: [
      {
        model_key: "",
        model_value: "",
      },
    ],
    model_key: "",
    model_type: "",
  };
};

const deleteRow = async (model_key_id: number) => {
  ElMessageBox.confirm("您确定要删除这个key", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      let params = {
        model_key_id,
        model_id: form.value.model_id,
      };
      console.log("params", params);
      let data = await delKey(params);
      ElMessage({
        message: "删除成功",
        type: "success",
      });
      getTableData();
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "取消删除",
      });
    });
};

const add = () => {
  let checkValue = form.value.model_key_list.every(
    (item) =>
      item.model_value != "" &&
      item.model_value != undefined &&
      item.model_key != "" &&
      item.model_key != undefined
  );
  if (checkValue) {
    form.value.model_key_list.push({
      model_value: "",
      model_key: "",
    });
  } else {
    ElMessage({
      message: "请把数据填写完整",
      type: "warning",
    });
  }
};

const del = (index) => {
  form.value.model_key_list.splice(index, 1);
};

defineExpose({
  dialogShow,
  dialogHide,
});
</script>
<style scoped lang="scss">
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style lang="scss">
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
// .el-form-action {
//   margin-top: 20px;
// }
.config-container {
  display: flex;
  justify-content: space-between;
}
.table-container {
  margin-top: 40px;
}
.el-simulation-dialog {
  margin-left: 10px;
}
.mt-2 {
  margin-left: 5px;
}
.submit_btn {
  .el-form-item__content {
    display: flex;
    justify-content: center;
  }
}
.footer-container {
  margin-top: 10px;
}
</style>
