<template>
  <teleport to="body">
    <el-dialog v-model="show" :title="title" width="500">
      <el-form
        :model="form"
        ref="ruleForm"
        :rules="rules"
        label-width="auto"
        style="max-width: 600px"
      >
        <el-form-item label="网站名字" prop="web_id">
          <el-select
            v-model="form.web_id"
            placeholder="请选择网站名字"
            clearable
            filterable
            :disabled="editData"
          >
            <el-option
              v-for="(listItem, index) in webOptions"
              :value="listItem.web_id+''"
              :key="listItem.web_id"
              :label="listItem.web_name"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="网站名字" prop="web_name">
          <el-input v-model="form.web_name" placeholder="请输入网站名字" />
        </el-form-item> -->
        <el-form-item label="模块名字" prop="module_name">
          <el-input v-model="form.module_name" placeholder="请输入模块名字" />
        </el-form-item>
        <el-form-item label="模块ID" prop="module_num">
          <el-input v-model="form.module_num" placeholder="请输入模块ID" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="reset(ruleForm)">取消</el-button>
          <el-button type="primary" @click="submitForm(ruleForm)"
            >提交
          </el-button>
        </div>
      </template>
    </el-dialog>
  </teleport>
</template>

<script setup lang="ts">
import { ref, nextTick } from "vue";
import type { ComponentSize, FormInstance, FormRules } from "element-plus";
import RuleForm from "@/types/administration.interface.ts";
import { webSiteModeAdd, webSettingOptions, webSiteModeEdit } from "@/utils/api.ts";
let show = ref(false);
let form = ref({
  web_id: "",
  //   web_name: "",
  module_name: "",
  module_num: "",
});

let title = ref('添加');

const editData = ref(null);

const webOptions = ref([]);
const emits = defineEmits(["search"]);

const getOptions = async () => {
  let resp = await webSettingOptions();
  if (resp.data_list.length) {
    webOptions.value = resp.data_list || [];
    console.log("resp.data_list.length", resp.data_list);
  }
};

const ruleForm = ref<FormInstance>();
const dialogShow = async(data) => {
   await getOptions()
  show.value = true;
  editData.value =false;
  if (data) {
    nextTick(() => {
      setTimeout(() => {
        title.value = "修改";
        const { web_id, web_name, module_name, module_num, web_module_id } = data;
        form.value = {
          web_id,
          module_name,
          module_num,
          web_module_id
        };
        editData.value = true;
      }, 500);
    });
  } 
};

const dialogHide = () => {
  show.value = false;
};

const rules = ref<FormRules<RuleForm>>({
  web_id: [{ required: true, message: "请选择网站id" }],
  //   web_name: [{ required: true, message: "请填写网站名字" }],
  module_name: [{ required: true, message: "请填写模块名字" }],
  module_num: [{ required: true, message: "请填写模块ID" }],
});

const dialog = ref("dialog");

/* 新增 */
const addRow = () => {
  console.log("dialog", dialog);
  dialog.value.dialogShow();
};

const submitForm = async (formEl: FormInstance | undefined) => {
  console.log("formEl", formEl);
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      const { web_id, web_name, module_name, module_num,web_module_id } = form.value;
      let data = {
        web_id,
        // web_name,
        module_name,
        module_num,
      };
      let resp;
      if (editData.value) {
        data ={
            ...data,
            web_module_id
        }
        resp = await webSiteModeEdit(data);
      } else {
         resp = await webSiteModeAdd(data);
      }
      
      if (resp) {
        reset(formEl);
        emits("search");
      }
    } else {
      console.log("error submit!", fields);
    }
  });
};
/* 重置 */
const reset = (formEl: FormInstance | undefined) => {
  formEl.resetFields();
  dialogHide();
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
</style>
