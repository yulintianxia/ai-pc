<template>
  <teleport to="body">
    <el-dialog v-model="show" title="新增词库" width="500">
      <el-form
        :model="form"
        ref="ruleForm"
        :rules="rules"
        label-width="auto"
        style="width: 500px"
      >
        <el-form-item
          label="名字"
          prop="name"
          :rules="{
            required: true,
            message: '请填写名字',
          }"
        >
          <el-input
            v-model="form.name"
            maxLength="100"
            placeholder="请输入词库名字"
          />
        </el-form-item>
        <el-form-item
          v-for="(item, index) in form.wordArray"
          :key="key"
          :label="'长尾词' + (index + 1) + ':'"
          :prop="'wordArray.' + [index] + '.value'"
          :rules="{
            required: true,
            message: '请选择长尾词',
          }"
        >
          <el-select
            v-model="item.value"
            @change="changeSelect(item.value, index)"
            placeholder="请选择长尾词"
            clearable
          >
            <el-option
              v-for="(stateItem, index) in stateOptions"
              :value="stateItem.value"
              :key="stateItem.value"
              :label="stateItem.label"
            ></el-option>
          </el-select>
          <el-form-item
            class="el-form-action"
            v-if="form.wordArray.length == index + 1"
          >
            <el-button class="mt-2" @click.prevent="add()"> + </el-button>
            <el-button
              v-if="form.wordArray.length > 1 && index != 0"
              class="mt-2"
              @click.prevent="del()"
            >
              -
            </el-button>
          </el-form-item>
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
import { ref, computed } from "vue";
import type { ComponentSize, FormInstance, FormRules } from "element-plus";
import RuleForm from "@/types/administration.interface.ts";
import { stateOptions } from "@/assets/ts/configOptions.ts";
import { ElMessage } from "element-plus";

let show = ref(false);
let form = ref({
  name: "",
  wordArray: [
    {
      value: "",
    },
  ],
});

interface  Props {
    id:nubmer | undefined
}


const props = withDefaults(defineProps<Props>(), {
   id:''
})

const ruleForm = ref<FormInstance>();
const dialogShow = () => {
  show.value = true;
};

const dialogHide = () => {
  show.value = false;
};



const submitForm = async (formEl: FormInstance | undefined) => {
  console.log("formEl", formEl);
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
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

const changeSelect = (value, index: nubmer) => {
  if (value) {
    form.value.wordArray.forEach((item, formIndex) => {
      if (item.value == value && formIndex != index) {
        ElMessage({
          message: "不能选择重复的长尾词",
          type: "warning",
        });
        form.value.wordArray[index].value = "";
      }
    });
  }
};

const add = () => {
  let checkValue = form.value.wordArray.every(
    (item) => item.value != "" && item.value != undefined
  );
  if (checkValue) {
    form.value.wordArray.push({
      value: "",
    });
  } else {
    ElMessage({
      message: "请把数据填写完整",
      type: "warning",
    });
  }
};

const del = () => {
  form.value.wordArray.pop({
    value: "",
  });
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
.el-form-action {
  margin-top: 20px;
}
</style>
