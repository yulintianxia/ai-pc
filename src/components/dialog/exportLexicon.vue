<template>
    <teleport to="body">
      <el-dialog v-model="show" title="添加" width="500">
        <el-form
          :model="form"
          ref="ruleForm"
          :rules="rules"
          label-width="auto"
          style="max-width: 600px"
        >
          <el-form-item label="长尾词名字" prop="file_word_name">
            <el-input
              v-model="form.file_word_name"
              maxLength="100"
              placeholder="请输入长尾词名字"
            />
          </el-form-item>
          <el-form-item label="词库名字" prop="key_word_lib_name">
            <el-input
              v-model="form.key_word_lib_name"
              maxLength="100"
              placeholder="请输入词库名字"
            />
          </el-form-item>
          <el-form-item label="上传文件" prop="up_file" required>
            <el-upload
              class="avatar-uploader"
              :show-file-list="false"
              :http-request="customRequest"
              action="string"
            >
              <el-icon class="avatar-uploader-icon">
                <span v-if="form.up_file">{{ form.fileName }}</span>
                <Plus v-else />
              </el-icon>
            </el-upload>
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
  import { ref } from "vue";
  import type { ComponentSize, FormInstance, FormRules } from "element-plus";
  import {RuleForm} from "@/types/administration.interface";
  import { upfileAPI, exportInWord } from "@/utils/api";
  let show = ref(false);
  let form = ref({
    file_word_name: "",
    key_word_lib_name:"",
    fileUrl: "",
    up_file: "",
    fileName: "",
  });
  
  const emits = defineEmits(["search"]);
  
  const ruleForm = ref<FormInstance>();
  const dialogShow = () => {
    show.value = true;
  };
  
  const dialogHide = () => {
    show.value = false;
  };
  
  const rules = ref<FormRules<RuleForm>>({
    file_word_name: [{ required: true, message: "请填写名字" }],
    key_word_lib_name: [{ required: true, message: "请填写词库名字" }],
    fileUrl: [{ required: true,  message: "请上传文件" }],
  });
  
  /* 假的上传只是展示文件的链接 */
  const customRequest = async (file: File) => {
    let fileUrl = URL.createObjectURL(file.file);
    console.log("fileUrl", fileUrl);
    form.value.fileUrl = fileUrl;
    form.value.up_file = file.file;
    form.value.fileName = file.file.name;
    console.log("file", file);
    console.log("form.value.fileUrl", form.value);
  };
  
  const submitForm = async (formEl: FormInstance | undefined) => {
    console.log("formEl", formEl);
    if (!formEl) return;
    await formEl.validate(async (valid, fields) => {
      if (valid) {
        let formData = new FormData();
        formData.append("up_file", form.value.up_file);
        formData.append("file_word_name", form.value.file_word_name);
        formData.append("key_word_lib_name", form.value.key_word_lib_name);
        let resp = await exportInWord(formData);
        URL.revokeObjectURL(form.value.fileUrl); // 释放url
        reset(formEl);
        emits("search");
      } else {
        console.log("error submit!", fields);
      }
    });
  };
  /* 重置 */
  const reset = (formEl: FormInstance | undefined) => {
    formEl.resetFields();
    form.value.fileUrl = "";
    form.value.fileName = "";
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
    font-size: 18px;
    color: #8c939d;
    width: 150px;
    height: 150px;
    text-align: center;
  }
  </style>
  