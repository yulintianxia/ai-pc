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
        <el-form-item label="网站名字" prop="web_name">
          <el-input v-model="form.web_name" placeholder="请输入网站名字" />
        </el-form-item>
        <el-form-item label="网站类型" prop="web_type">
          <el-select
            v-model="form.web_type"
            placeholder="请选择网站类型"
            clearable
          >
            <el-option
              v-for="(listItem, index) in typeOptions"
              :value="listItem.value+''"
              :key="listItem.value"
              :label="listItem.label"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="网址" prop="web_address">
          <el-input v-model="form.web_address" placeholder="请输入网址" />
        </el-form-item>
        <el-form-item label="后台账户" prop="web_user_account">
          <el-input
            v-model="form.web_user_account"
            placeholder="请输入后台账户"
          />
        </el-form-item>
        <el-form-item label="后台密码" prop="web_password">
          <el-input v-model="form.web_password" placeholder="请输入后台密码" />
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
import { typeOptions } from "@/assets/ts/configOptions.ts";
import {
    webSettingAdd,
    webSettingUpdate
} from "@/utils/api.ts";
let show = ref(false);
let form = ref({
  web_name: "",
  web_type: '1',
  web_address: "",
  web_user_account: "",
  web_password: "",
});

let title = ref('添加');

const editData = ref(null);
const webOptions = ref([]);
const emits = defineEmits(["search"]);

const ruleForm = ref<FormInstance>();
const dialogShow = async (data) => {
  show.value = true;
  title.value ='添加';
  if (data) {
    console.log('data',data);
    nextTick(() => {
      setTimeout(() => {
        title.value = "修改";
        const {
          web_name,
          web_type,
          web_address,
          web_user_account,
          web_password,
          web_id
        } = data;
        form.value = {
          web_name,
          web_type,
          web_address,
          web_user_account,
          web_password,
          web_id,
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
  web_name: [{ required: true, message: "请填写网站名字" }],
  web_type: [{ required: true, message: "请选择网站类型" }],
  web_address: [{ required: true, message: "请填写网址" }],
  web_user_account: [{ required: true, message: "请填写后台账号" }],
  web_password: [{ required: true, message: "请填写后台密码" }],
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
      const { web_id, web_name, web_type, web_address, web_user_account,  web_password} =
        form.value;
      let data = {
        web_name,
        web_type,
        web_address,
        web_user_account,
        web_password
      };
      let resp;
      if (editData.value) {
        data = {
          ...data,
          web_id,
        };
        resp = await webSettingUpdate(data);
      } else {
        resp = await webSettingAdd(data);
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
