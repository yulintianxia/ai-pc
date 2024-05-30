<template>
  <teleport to="body">
    <el-dialog v-model="show" title="新增长尾词" width="500">
      <el-form
        :model="form"
        ref="ruleForm"
        :rules="rules"
        label-width="auto"
        style="max-width: 600px"
      >
        <el-form-item label="名字" prop="name">
          <el-input v-model="form.name" maxLength='100' placeholder="请输入长尾词名字" />
        </el-form-item>
        <el-form-item label="上传文件" prop="imgUrl">
          <el-upload
            class="avatar-uploader"
            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
            :show-file-list="false"
          >
            <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="reset(ruleForm)">取消</el-button>
          <el-button type="primary" @click="submitForm(ruleForm)">提交
          </el-button>
        </div>
      </template>
    </el-dialog>
  </teleport>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { ComponentSize, FormInstance, FormRules } from "element-plus";
import RuleForm from "@/types/administration.interface.ts";
let show = ref(false);
let form = ref({
  name: "",
  imgUrl: "",
});

const ruleForm = ref<FormInstance>();
const dialogShow = () => {
  show.value = true;
};

const dialogHide = () => {
  show.value = false;
};

const rules = ref<FormRules<RuleForm>>({
  name: [{ required: true, message: "请填写名字" }],
  imgUrl: [{ required: true }],
});


const dialog = ref('dialog');

/* 新增 */
const addRow = () => {
  console.log('dialog', dialog);
  dialog.value.dialogShow();

};

const submitForm = async (formEl: FormInstance | undefined) => {
    console.log('formEl',formEl);
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
        
    } else {
      console.log('error submit!', fields)
    }
  })
}
/* 重置 */
const reset = (formEl: FormInstance | undefined)=>{
    formEl.resetFields();
    dialogHide();
}

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
