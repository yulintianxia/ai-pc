<template>
    <div class="common-layout">
        <el-container>
            <el-header height="85px">
                <el-form :inline="true" :model="formInline" label-width="auto;" class="form">
                    <el-form-item label="模型" prop="model_id">
                        <el-select filterable v-model="formInline.model_id" placeholder="请选择下拉模型" clearable>
                            <el-option v-for="(listItem, index) in modeListOptions" :value="listItem.model_id"
                                :key="listItem.model_id" :label="listItem.model_name"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="模型key">
                        <el-input v-model="formInline.model_key_value" placeholder="请输入模型key" clearable />
                    </el-form-item>
                    <el-form-item label="词库">
                        <el-input v-model="formInline.word_lib_name" placeholder="请输入词库名字" clearable />
                    </el-form-item>
                    <el-form-item label="问题">
                        <el-input v-model="formInline.key_question" placeholder="请输入文章问题" clearable />
                    </el-form-item>
                    <el-form-item label="入参">
                        <el-input v-model="formInline.parameter" placeholder="请输入模型请求入参" clearable />
                    </el-form-item>
                    <el-form-item label="回答">
                        <el-input v-model="formInline.answer" placeholder="请输入模型返回回答" clearable />
                    </el-form-item>
                    <el-form-item label="时间">
                        <el-date-picker v-model="formInline.date" type="datetimerange" range-separator="到"
                            start-placeholder="开始时间" end-placeholder="结束时间" format="YYYY-MM-DD HH:mm:ss"
                            value-fomat="YYYY-MM-DD HH:mm:ss" :default-time="defaultTime" />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="search">查询</el-button>
                    </el-form-item>
                </el-form>
            </el-header>
            <el-main class="el-main-container">
                <div class="table-container">
                    <el-table ref="singleTableRef" :data="tableData" highlight-current-row style="width: 100%" border
                        class="table-container" header-cell-class-name='table-header-cell-class'>
                        <el-table-column type="index" width="60" label="序号" />
                        <el-table-column property="model_name" label="模型名字" />
                        <el-table-column property="model_key_key" label="模型key" show-overflow-tooltip />
                        <el-table-column property="model_key_value" label="模型value" show-overflow-tooltip />
                        <el-table-column property="word_lib_name" label="词库名字" />
                        <el-table-column property="key_question" label="模型请求问题" width="120" show-overflow-tooltip />
                        <el-table-column property="parameter" label="模型请求入参" width="120" show-overflow-tooltip />
                        <el-table-column property="answer" label="模型返回结果" width="120" show-overflow-tooltip />
                        <el-table-column property="create_time" label="创建时间" width="180" />
                        <el-table-column property="update_time" label="更新时间" width="180" />
                    </el-table>
                </div>
            </el-main>
        </el-container>
        <el-footer>
            <el-pagination v-model:current-page="formInline.pageNum" v-model:page-size="formInline.pageSize"
                :page-sizes="[10, 20, 30, 40]" layout="total, sizes, prev, pager, next, jumper" :total="total"
                @size-change="search" @current-change="search" class="page-footer" />
        </el-footer>
    </div>
    <main-dialog ref="dialog" @search="search" class="main-dialog"></main-dialog>
</template>
  
<script setup lang="ts">
import { ref } from "vue";
import MainDialog from "@/components/dialog/webSetting.vue";
import { logPage, AImodeListPage, modeList } from "@/utils/api";
import { ElMessage, ElMessageBox } from "element-plus";
import { typeOptions } from "@/assets/ts/configOptions";
import { dayjs } from "element-plus";

const dialog = ref("dialog");
const tableData = ref([]);
let formInline = ref({
    model_id: "",
    model_key_value: "",
    word_lib_name: '',
    key_question: '',
    parameter: '',
    answer: '',
    date: [],
    pageSize: 10,
    pageNum: 1,
});

const defaultTime = ref<[Date, Date]>([
    new Date(2000, 1, 1, 0, 0, 0),
    new Date(2000, 2, 1, 23, 59, 59),
]);

let modeListOptions = ref([]);

const getOptions = async()=>{
    let data:any = await AImodeListPage();
    if (data?.length) {
        modeListOptions.value = data;
    } else {
        modeListOptions.value = []
    }
}


getOptions();



const total = ref(0);

const search = async () => {
    const { model_id, model_key_value, word_lib_name, date, pageSize, pageNum, key_question, parameter, answer } = formInline.value;
    let data = {
        model_id,
        pageSize,
        pageNum,
        model_key_value,
        word_lib_name,
        key_question,
        parameter,
        answer,
        start_time:
            (date?.length && dayjs(date[0]).format("YYYY-MM-DD HH:mm:ss")) || "",
        end_time:
            (date?.length && dayjs(date[1]).format("YYYY-MM-DD HH:mm:ss")) || "",
    };
    let resp = await logPage(data);
    if (resp?.data_list) {
        tableData.value = resp?.data_list || [];
        total.value = resp.total;
    }
};

search();
</script>
<style lang="scss" scoped>
.table-container {
    margin-top: 10px;
    padding: 0;
}

.table-action {
    margin-top: 20px;
    margin-left: 20px;
}

.header-container {
    margin-top: -10px;
}

.main-container {
    display: flex;
    flex-direction: column;
    /* 垂直方向排列子元素 */
}
</style>
  