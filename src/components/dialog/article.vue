<template>
  <teleport to="body">
    <el-dialog v-model="show" :title="title" width="800">
      <el-form
        :model="form"
        ref="ruleForm"
        :rules="rules"
        label-width="auto"
        style="max-width: 800px"
      >
        <el-form-item label="文章生成任务名字" prop="article_job_name">
          <el-input
            v-model="form.article_job_name"
            placeholder="文章生成任务名字"
          />
        </el-form-item>
        <el-form-item label="模型" prop="model_id">
          <el-select v-model="form.model_id" placeholder="请选择模型" clearable>
            <el-option
              v-for="(listItem, index) in modeList"
              :value="listItem.value + ''"
              :key="listItem.value"
              :label="listItem.label"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="关键词词库列表" required>
          <br />
          <div class="search-container">
            <el-form-item label="词库名字" class="label-name">
              <el-input
                v-model="formInline.key_word_lib_name"
                placeholder="请输入词库名字"
                clearable
              />
             
            </el-form-item>
            <el-form-item >
                <el-button type="primary"  style='margin-left:20px;' @click="search()">搜索</el-button>
            </el-form-item>
          </div>
          <el-table
            ref="multipleTableRef"
            :data="tableData"
            highlight-current-row
            style="width: 100%"
            border
            class="table-container"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55" />
            <el-table-column property="key_word_lib_name" label="词库名字" />
            <el-table-column label="长尾词数量(总数/已生成)">
              <template #default="scope">
                {{ scope.row.key_word_lib_num }}/{{
                  scope.row.key_word_lib_sum
                }}
              </template>
            </el-table-column>
            <el-table-column label="状态" width="120">
              <template #default="scope">
                <div v-if="scope.row.status == 0">未开始</div>
                <div v-else-if="scope.row.status == 1">生成中</div>
                <div v-else-if="scope.row.status == 2">暂停中</div>
                <div v-else-if="scope.row.status == 3">已暂停</div>
                <div v-else-if="scope.row.status == 4">已完成</div>
                <div v-else-if="scope.row.status == 5">状态异常</div>
                <div v-else-if="scope.row.status == 6">已删除</div>
              </template>
            </el-table-column>
            <el-table-column
              property="create_time"
              label="创建时间"
              width="180"
            />
          </el-table>
          <el-pagination
            v-model:current-page="formInline.pageNum"
            v-model:page-size="formInline.pageSize"
            :page-sizes="[10, 20, 30, 40]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="search"
            @current-change="search"
          />
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
import { AImodeList, addTask, wordList } from "@/utils/api.ts";
let show = ref(false);
let form = ref({
  article_job_name: "",
  key_word_lib_list: [],
//   model_id: "",
model_id: '5',
});

let title = "新增";

let formInline = ref({
  pageNum: 1,
  pageSize: 10,
  key_word_lib_name: "",
});
const multipleTableRef = ref();


let total = ref(0);

let tableData = ref([]);

const search = async () => {
  const { key_word_lib_name, pageSize, pageNum } = formInline.value;
  let data = {
    key_word_lib_name,
    pageSize,
    pageNum,
  };
  let resp = await wordList(data);
  if (resp?.data_list) {
    tableData.value = resp?.data_list || [];
    total.value = resp.total;
  }
};

search();

const editData = ref(null);

let modeList = ref([]);

const getOptions = async () => {
  let resp = await AImodeList();
  console.log("resp");
  if (resp.data_list.length) {
    modeList.value = resp.data_list || [];
  }
};
getOptions();

const emits = defineEmits(["search"]);

const ruleForm = ref<FormInstance>();
const dialogShow = async (data) => {
  show.value = true;
  if (data) {
    nextTick(() => {
      setTimeout(() => {
        title = "修改";
        const { article_job_name, key_word_lib_list, model_id } = data;
        form.value = {
          article_job_name,
          key_word_lib_list,
          model_id,
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
  article_job_name: [{ required: true, message: "请文章生成任务名字" }],
  model_id: [{ required: true, message: "请选择模型" }],
  //   key_word_lib_list: [{ required: true, message: "请选择关键词词库列表" }],
});

const dialog = ref("dialog");

/* 新增 */
const addRow = () => {
  dialog.value.dialogShow();
};

const submitForm = async (formEl: FormInstance | undefined) => {
  console.log("formEl", formEl);
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      const { article_job_name, key_word_lib_list, model_id } = form.value;
      let data = {
        article_job_name,
        key_word_lib_list,
        model_id,
      };
     let resp = await addTask(data);
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
  multipleTableRef.value!.clearSelection()
};

defineExpose({
  dialogShow,
  dialogHide,
});


const handleSelectionChange = (val) => {
    // multipleSelection.value = val;
    form.value.key_word_lib_list =[];
    val.forEach(item => {
        form.value.key_word_lib_list.push(item.key_word_lib_id)
    });
}

</script>
<style scoped lang="scss">
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.label-name {
  :deep(.el-form-item__label-wrap) {
    margin-left: 0 !important;
  }
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
.search-container {
  display: flex;
  justify-content: space-between;
}
.table-container {
  padding: 0 !important;
  margin: 10px 0;
}
</style>
