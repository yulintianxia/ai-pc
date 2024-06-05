<template>
  <teleport to="body">
    <el-dialog v-model="show" title="详情" width="800">
      <el-main>
        <el-table
          ref="singleTableRef"
          :data="tableData"
          highlight-current-row
          border
          class="table-container"
          header-cell-class-name='table-header-cell-class'
        >
        <el-table-column type="index" width="100" label="序号" />
          <el-table-column property="key_word_lib_name" label="词库名字" />
          <el-table-column property="key_word_name" label="长尾词组合" />
          <el-table-column fixed="right" label="操作" width="160">
            <template #default="scope">
              <el-button

                type="primary"
                size="small"
                @click.prevent="
                  edifRow(scope.row.key_word_id, scope.row.key_word_name)
                "
              >
                编辑
              </el-button>
              <el-button
                type="danger"
                size="small"
                @click.prevent="deleteRow(scope.row.key_word_id)"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
      <el-footer>
        <el-pagination
          v-model:current-page="searchData.pageNum"
          v-model:page-size="searchData.pageSize"
          :page-sizes="[10, 50, 100, 200]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="search"
          @current-change="search"
          class="page-footer"
        />
      </el-footer>
      <el-dialog v-model="showWord" width="500" title="编辑" append-to-body>
        <el-form
          :model="form"
          ref="ruleForm"
          :rules="rules"
          label-width="auto"
          style="max-width: 500"
        >
          <el-form-item label="关键词" prop="key_word_name">
            <el-input v-model="form.key_word_name" placeholder="请输入关键词" />
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
    </el-dialog>
  </teleport>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { keywordList, delDetail, editDetail } from "@/utils/api.ts";
import { ElMessage, ElMessageBox } from "element-plus";
import type { ComponentSize, FormInstance, FormRules } from "element-plus";

let id = ref("");
let total = ref(0);
let searchData = ref({
  pageNum: 1,
  pageSize: 10,
});
let show = ref(false);
const dialogShow = (key_word_lib_id) => {
  show.value = true;
  id.value = key_word_lib_id;
  search();
};

let form = ref({
  key_word_name: "",
});

interface RuleForm {
  key_word_name: string;
}

const rules = ref<FormRules<RuleForm>>({
  key_word_name: [{ required: true, message: "请填写名字" }],
});

const showWord = ref(false);

const ruleForm = ref();
const dialogHide = () => {
  show.value = false;
};

const wordHideFun = () => {
  showWord.value = false;
};

const wordShowFun = (name: string) => {
  showWord.value = true;
  form.value.key_word_name = name;
};
let editId = "";
const edifRow = (id: nubmer, name: string) => {
  wordShowFun(name);
  editId = id;
};

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      let params = {
        key_word_lib_id: id.value,
        key_word_id: editId,
        key_word_name: form.value.key_word_name,
      };
      let resp = await editDetail(params);
      if (resp) {
        reset(formEl);
        search();
      }
    } else {
      console.log("error submit!", fields);
    }
  });
};

const reset = (formEl: FormInstance | undefined) => {
  formEl.resetFields();
  wordHideFun();
};

defineExpose({
  dialogShow,
  dialogHide,
});
let tableData = ref([]);

const search = async () => {
  let params = {
    pageNum: searchData.value.pageNum,
    pageSize: searchData.value.pageSize,
    key_word_lib_id: id.value,
  };
  console.log("params", params);
  let resp = await keywordList(params);
  if (resp?.data_list) {
    tableData.value = resp?.data_list || [];
    total.value = resp.total;
  }
};

/* 删除操作 */
const deleteRow = (key_word_id: nubmer) => {
  ElMessageBox.confirm("您确定要删除这个关键词?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      let params = {
        key_word_lib_id: id.value,
        key_word_id,
      };
      console.log("id.value");
      let data = await delDetail(params);
      console.log("data", data);
      if (data) {
        ElMessage({
          message: "删除成功",
          type: "success",
        });
        search();
      }
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "取消删除",
      });
    });
};
</script>
<style scoped lang="scss"></style>
