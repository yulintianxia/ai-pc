<template>
    <teleport to="body">
        <el-dialog v-model="show" title="上传" width="700">
            <el-form :model="form" ref="ruleForm" :rules="rules" label-width="auto" style="max-width: 600px">
                <el-form-item label="文章生成任务" prop="article_job_id">
                    <el-select filterable v-model="form.article_job_id" placeholder="请选择文章生成任务" clearable>
                        <el-option v-for="(listItem, index) in taskOptions" :value="listItem.article_job_id"
                            :key="listItem.article_job_id" :label="listItem.article_job_name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="文章上传任务名字" prop="article_up_name">
                    <el-input v-model="form.article_up_name" placeholder="文章上传任务名字" />
                </el-form-item>
                <el-form-item label="选择网站" prop="web_id">
                    <el-select v-model="form.web_id" placeholder="请选择网站名字" @change="getModeOptions" clearable filterable>
                        <el-option v-for="(listItem, index) in webOptions" :value="listItem.web_id" :key="listItem.web_id"
                            :label="listItem.web_name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="网站的模块" prop="web_module_id">
                    <el-select v-model="form.web_module_id" placeholder="请选择网站的模块名字" @change="getColumnOptions" clearable
                        filterable>
                        <el-option v-for="(listItem, index) in webSiteOptions" :value="listItem.web_module_id"
                            :key="listItem.web_module_id" :label="listItem.module_name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="网站的栏目" prop="column_id">
                    <el-select v-model="form.column_id" placeholder="请选择网站的栏目名字" clearable filterable>
                        <el-option v-for="(listItem, index) in columnOptions" :value="listItem.column_id"
                            :key="listItem.column_id" :label="listItem.column_name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="发布速度">
                    <div class="time_speed">
                        <el-input placeholder="时间" v-model="form.speed_0_7">
                            <template #prepend>0-7小时</template>
                            <template #append>秒/篇</template>
                        </el-input>
                        <el-input placeholder="时间" v-model="form.speed_7_24">
                            <template #prepend>7-24小时</template>
                            <template #append>秒/篇</template>
                        </el-input>
                    </div>
                </el-form-item>
                <el-form-item label="图片序号">
                    <div class="time_speed">
                        <el-input placeholder="开始" v-model="form.image_start">
                        </el-input>
                        <span>-</span>
                        <el-input placeholder="结束" v-model="form.image_end">
                        </el-input>
                    </div>
                </el-form-item>
                <el-form-item label="图片路径" prop="image_path">
                    <el-input v-model="form.image_path" placeholder="图片路径" />
                </el-form-item>
                <el-form-item label="图片类型" prop="image_type">
                    <el-select v-model="form.image_type" placeholder="请选择图片类型" clearable filterable>
                        <el-option v-for="(listItem, index) in image_typeOptions" :value="listItem.value"
                            :key="listItem.value" :label="listItem.label"></el-option>
                    </el-select>
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
import { taskNoPage, upLoadArticle, webSettingOptions, webSiteModeOptions, WebColList } from "@/utils/api";
import { image_typeOptions } from '@/assets/ts/configOptions';
let show = ref(false);
let form = ref({
    article_job_id: "",
    article_up_name: "",
    web_id: '',
    web_module_id: '',
    speed_0_7: 5,
    speed_7_24: 15,
    column_id: '',
    image_start: 1001,
    image_end: 1011,
    image_type: '1',
    image_path: 'https://jiangnanx.oss-cn-beijing.aliyuncs.com/chenglid.com/fangcang'
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

const columnOptions = ref([]);

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


interface RuleForm {
    article_job_id: string,
    article_up_name: string,
    web_id: number | string,
    web_module_id: number | string,
    column_id: number | string,
    image_start: number | string,
    image_end: number | string,
    image_type: number | string,
    image_path: string,
}

const rules = ref<FormRules<RuleForm>>({
    article_job_id: [{ required: true, message: "请选择文章生成任务" }],
    article_up_name: [{ required: true, message: "请填写文章上传任务名字" }],
    web_id: [{ required: true, message: "请选择上传网站" }],
    web_module_id: [{ required: true, message: "请选择网站模块" }],
    column_id: [{ required: true, message: "请选择网站栏目" }],
    image_type: [{ required: true, message: "请选择图片类型" }],
    image_path: [{ required: true, message: "请填写图片路径" }]
});
const webOptions = ref([]);

const webSiteOptions = ref([]);

const getOptions = async () => {
    let resp = await webSettingOptions();
    return resp;

};

const getModeOptions = async (value: number) => {
    form.value.web_module_id = '';
    form.value.column_id = '';
    if (value) {
        let data = {
            web_id: value
        }
        let resp = await webSiteModeOptions(data);
        webSiteOptions.value = resp?.data_list || [];
    } else {
        webSiteOptions.value = [];
        columnOptions.value = [];
    }
}

const getColumnOptions = async (value: number) => {
    form.value.column_id = '';
    if (value) {
        let data = {
            web_id: form.value.web_id,
            module_id: value,
        }
        let resp = await WebColList(data);
        columnOptions.value = resp?.data_list || [];
    } else {
        columnOptions.value = [];
    }
}

const getAllOptioins = async () => {
    Promise.allSettled([getOptions(),]).then((data) => {
        webOptions.value = data[0].value?.data_list || [];
        // webSiteOptions.value = data[1].value?.data_list || [];
    })

}




getAllOptioins()


const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate(async (valid, fields) => {
        if (valid) {
            const { article_job_id, article_up_name, web_id, web_module_id, speed_0_7, speed_7_24,
                column_id,
                image_start,
                image_end,
                image_type,
                image_path
            } = form.value;
            let params = {
                article_job_id,
                article_up_name,
                web_id,
                web_module_id,
                speed_0_7,
                speed_7_24,
                column_id,
                image_start,
                image_end,
                image_type,
                image_path
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
    form.value.image_start = 1001;
    form.value.image_end = 1011;
    form.value.speed_0_7 = 5;
    form.value.speed_7_24 = 15;
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

.time_speed {
    display: flex;
}
</style>
  