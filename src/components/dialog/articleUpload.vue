<template>
    <teleport to="body">
        <el-dialog v-model="show" title="上传" width="500">
            <el-form :model="form" ref="ruleForm" :rules="rules" label-width="auto" style="max-width: 600px">
                <el-form-item label="文章生成任务" prop="article_job_id">
                    <el-select filterable v-model="form.article_job_id" placeholder="请选择文章生成任务" clearable>
                        <el-option v-for="(listItem, index) in taskOptions" :value="listItem.article_obj_id"
                            :key="listItem.article_obj_id" :label="listItem.article_job_name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="文章上传任务名字" prop="article_txt_name">
                    <el-input v-model="form.article_txt_name" placeholder="文章上传任务名字" />
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
import { RuleForm } from "@/types/administration.interface";
import { taskNoPage,upLoadArticle  } from "@/utils/api";
let show = ref(false);
let form = ref({
    article_job_id: "",
    article_txt_name: "",
});

const emits = defineEmits(["search"]);

const ruleForm = ref<FormInstance>();
const dialogShow = () => {
    show.value = true;
};

const dialogHide = () => {
    show.value = false;
};

const taskOptions = ref([])
//查询状态列表    ('0', "未开始"),     ('1', "生成中"),     ('2', "暂停中"),     ('3', "已暂停"),     ('4', "已完成"),     ('5', "状态异常"),     ('6', "已删除"),
const getTaskOPtions = async () => {
    let params = {
        job_status_list: [4]
    }
    let data = await taskNoPage(params);
    if (data?.data_list.length) {
        taskOptions.value = data.data_list;
    } else {
        taskOptions.value = []
    }
}

getTaskOPtions();

const rules = ref<FormRules<RuleForm>>({
    article_job_id: [{ required: true, message: "请选择文章生成任务" }],
    article_txt_name: [{ required: true, message: "请填写文章上传任务名字" }],
});


const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate(async (valid, fields) => {
        if (valid) {
            const { article_job_id, article_txt_name} = form.value;
            let params = {
                article_job_id,
                article_txt_name
            }
            let data = await upLoadArticle(params)
            
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
  