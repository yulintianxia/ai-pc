<template>
  <teleport to="body">
    <el-dialog v-model="show" title="配置" width="1200">
      <el-container>
        <el-aside width="800px">
          <el-form :model="form" ref="ruleForm" :rules="rules" label-width="90">
            <el-form-item label="模型名字" requred prop="model_name">
              <el-input v-model="form.model_name" placeholder="模型名字" disabled />
            </el-form-item>
            <el-form-item label="时间间隔" requred prop="user_times" :rules="{
              required: true,
              message: '请填写时间间隔',
            }">
              <el-input v-model="form.user_times" type="text" placeholder="请填写时间间隔(s)" />
            </el-form-item>
            <el-form-item label="请求域名" :rules="{
              required: true,
              message: '请填写模型请求域名',
            }" prop="model_host">
              <el-input v-model="form.model_host" placeholder="域名" />
            </el-form-item>
            <div v-if="form.model_type == 1" v-for="(item, index) in form.model_key_list" class="config-container"
              :key="index">
              <el-form-item label="配置key" :prop="'model_key_list.' + [index] + '.model_key'" :rules="{
                required: true,
                message: '请填写模型key',
              }">
                <el-input v-model="item.model_key" placeholder="模型key" />
              </el-form-item>
              <el-form-item label="配置值" :prop="'model_key_list.' + [index] + '.model_value'" :rules="{
                required: true,
                message: '请填写模型值',
              }">
                <el-input v-model="item.model_value" placeholder="模型值" />
              </el-form-item>
              <el-button type="primary" class="mt-2" @click.prevent="add()">
                +
              </el-button>
              <el-button class="mt-2" @click.prevent="del(index)" v-if="form.model_key_list.length > 1" type="primary">
                -
              </el-button>
            </div>
            <el-form-item class="el-form-action submit_btn" v-if="form.model_type == 1">
              <el-button type="primary" @click="submitForm(ruleForm)">保存
              </el-button>
            </el-form-item>
            <div v-else-if="form.model_type == 2">
              <el-form-item label="配置key" requred prop="model_key" :rules="{
                required: true,
                message: '请填写配置key',
              }">
                <el-input v-model="form.model_key" :autosize="{ minRows: 2 }" type="textarea"
                  placeholder="请使用逗号分割每一个key" />
              </el-form-item>

              <el-form-item class="submit_btn">
                <el-button type="primary" @click="submitForm(ruleForm)">保存
                </el-button>
              </el-form-item>
            </div>
            <el-main class="el-main-container" v-if="form.model_type == 2">
              <div class="header-container">
                <el-button type="danger" @click="deleteRowAll">批量删除</el-button>
                <el-button type="primary" @click="refresh">刷新</el-button>
              </div>
              <el-table ref="singleTableRef" :data="tableData" highlight-current-row style="width: 100%" border
                class="table-container" @selection-change="handleSelectionChange"
                header-cell-class-name="table-header-cell-class">
                <el-table-column type="selection" width="40" />
                <el-table-column property="model_key_value" label="配置value" />
                <el-table-column property="error_num" label="错误次数" />
                <el-table-column property="is_test" label="是否测试">
                  <template #default="scope">
                    {{ scope.row.is_test == 1 ? '已测试' : '未测试' }}
                  </template>

                </el-table-column>
                <el-table-column property="test_time" label="测试时间" />
                <el-table-column property="user_times" label="使用间隔" />
                <el-table-column property="last_user_time" label="上次使用时间" />
                <!-- <el-table-column property="error_num" label="错误状态" /> -->
                <el-table-column fixed="right" label="操作" width="80">
                  <template #default="scope">
                    <el-button type="primary" size="small" @click.prevent="testMode(scope.row.model_key_id)">
                      测试
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-main>
            <el-footer class="footer-container" v-if="form.model_type == 2">
              <el-pagination v-model:current-page="searchData.pageNum" v-model:page-size="searchData.pageSize"
                :page-sizes="[10, 20, 30, 40]" layout="total, sizes, prev, pager, next, jumper" :total="total"
                @size-change="getTableData" @current-change="getTableData" class="page-footer" />
            </el-footer>
          </el-form>
        </el-aside>
        <el-aside class="el-simulation-dialog">
          <div>测试页面结果</div>
        </el-aside>
      </el-container>
      <!-- <template #footer>
        <div class="dialog-footer">
          <el-button @click="reset(ruleForm)">关闭</el-button>
        </div>
      </template> -->
    </el-dialog>
  </teleport>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import type { ComponentSize, FormInstance, FormRules } from "element-plus";
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
  user_times: '',
  model_host: '',

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
    // user_times: data.user_times,
    model_host: data.model_host
  };
  getTableData();
};



// 测试mode
const testMode = (id) => {
  console.log('id');
}

const dialogHide = () => {
  show.value = false;
};


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

    form.value.user_times = resp?.data_list[0].user_times;
    if (Number(form.value.model_type) == 1) {
      // form.value.model_key_list = [];
      let formData = [];
      resp.data_list.forEach((item) => {
        formData.unshift({
          model_key: item.model_key_key,
          model_value: item.model_key_value,
        });
      });
      form.value.model_key_list = formData;


      console.log('form.value.model_key_list', form.value.model_key_list);
    } else {
      tableData.value = resp.data_list || [];
      total.value = resp.total;
    }
  }
};

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      let file_id_list = [];
      let resp;
      const { model_id, model_key, model_type, model_key_list, user_times } = form.value;
      if (Number(model_type) == 2) {
        file_id_list = model_key.split(",");
        let params = {
          model_id,
          model_key_list: file_id_list,
          user_times
        };
        resp = await configAIkey(params);
        form.value.model_key = "";
        formEl.resetFields();
        getTableData();
      } else {
        file_id_list = model_key_list;
        let params = {
          model_id,
          model_key_list: file_id_list,
          user_times
        };
        resp = await editAIid(params);
      }
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

const model_key_id_list = ref([]);

const handleSelectionChange = (val: any) => {
  model_key_id_list.value = [];
  val.forEach((item: any) => {
    model_key_id_list.value.push(item.model_key_id);
  });
};


const deleteRowAll = async () => {
  if (model_key_id_list.value.length == 0) {
    ElMessage({
      type: "info",
      message: "请选择要删除的key",
    });
    return
  }
  ElMessageBox.confirm("您确定要一键删除?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      let params = {
        model_id:form.value.model_id,
        model_key_id_list: model_key_id_list.value
      };
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
      model_key: "",
      model_value: "",
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
