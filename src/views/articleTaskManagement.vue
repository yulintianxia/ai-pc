<template>
    <div class="common-layout">
        <el-container>
            <el-header height="55px">
                <el-form :inline="true" :model="formInline" label-width="auto;" class="form">
                    <el-form-item label="任务名字" prop="article_obj_id">
                        <el-select filterable v-model="formInline.article_obj_id" placeholder="请选择任务" clearable>
                            <el-option v-for="(listItem, index) in taskOptions" :value="listItem.article_obj_id"
                                :key="listItem.article_obj_id" :label="listItem.article_job_name"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="关键词" prop="key_word">
                        <el-input v-model="formInline.key_word" placeholder="请输入关键词" clearable />
                    </el-form-item>
                    <el-form-item label="文章生成状态" prop="is_success">
                        <el-select v-model="formInline.is_success" placeholder="请选择文章生成状态" clearable>
                            <el-option v-for="(listItem, index) in artcleStateOptions" :value="listItem.value"
                                :key="listItem.value" :label="listItem.label"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="文章上传状态" prop="up_status">
                        <el-select v-model="formInline.up_status" placeholder="请选择文章生成状态" clearable>
                            <el-option v-for="(listItem, index) in artcleUpfileOptions" :value="listItem.value"
                                :key="listItem.value" :label="listItem.label"></el-option>
                        </el-select>
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
                <el-table ref="singleTableRef" :data="tableData" highlight-current-row style="width: 100%" border
                    class="table-container" header-cell-class-name='table-header-cell-class'>
                    <el-table-column type="index" width="50" label="序号" />
                    <el-table-column property="article_job_name" label="任务名字" />
                    <el-table-column property="key_word" label="关键词" />
                    <el-table-column property="file_path" label="文章文件路径" />
                    <el-table-column property="file_name" label="文章文件名字" />
                    <el-table-column property="is_success" label="文章生成状态">
                        <template #default="scope">
                            <span v-if="scope.row.is_success == 1">已生成</span>
                            <span v-else-if="scope.row.is_success == 2">生成异常</span>
                            <span v-else>写入异常</span>
                        </template>
                    </el-table-column>
                    <el-table-column property="error_str" label="文章生成异常描述" />
                    <el-table-column property="up_status" label="文章上传状态">
                        <template #default="scope">
                            <span v-if="scope.row.up_status == 0">未上传</span>
                            <span v-else-if="scope.row.up_status == 1">上传成功</span>
                            <span v-else>上传失败</span>
                        </template>
                    </el-table-column>
                    <!-- 上传的网站[{"web_id": web_id, "web_name": web_name, 'web_module_name': web_module_name, 'web_module_id': module_id}] -->
                    <el-table-column property="up_web" show-overflow-tooltip label="上传的网站">
                        <template #default="scope">
                            <!-- <span>网站的名字: {{ scope.row.web_name || '' }}</span></br>
                            <span>网站模块名字: {{ scope.row.web_module_name || '' }}</span> -->
                           <div v-for="(item,index) in scope.row.up_web">
                            <div>{{ item.web_name || '' }}:{{ item.web_module_name || '' }}</div>
                           </div>
                        </template>
                    </el-table-column>
                    <el-table-column property="create_time" label="创建时间" width="120" />
                    <el-table-column property="update_time" label="更新时间" width="120" />
                    <el-table-column fixed="right" label="操作" width="150">
                        <template #default="scope">
                            <el-button type="danger" size="small" @click.prevent="deleteRow(scope.row.article_txt_id)">
                                删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
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
import MainDialog from "@/components/dialog/article.vue";
import {
    deleteListPage,
    taskListPage,
    taskNoPage
} from "@/utils/api";
import { ElMessage, ElMessageBox, dayjs } from "element-plus";
import { artcleStateOptions, artcleUpfileOptions } from '../../src/assets/ts/configOptions';
const dialog = ref("dialog");
const tableData = ref([]);
const taskOptions = ref([]);

let formInline = ref({
    article_obj_id:'',
    key_word: '',
    is_success: '',
    up_status: '',
    date: [],
    pageSize: 10,
    pageNum: 1,
 
});

const getTaskOPtions = async()=>{
    let data = await taskNoPage();
    // if()
    console.log('data00',data.data_list.length);
    if (data.data_list.length) {
        taskOptions.value = data.data_list;
    } else {
        taskOptions.value = []
    }

}

getTaskOPtions();

const defaultTime = ref<[Date, Date]>([
    new Date(2000, 1, 1, 0, 0, 0),
    new Date(2000, 2, 1, 23, 59, 59),
]);

const total = ref(0);

/* 删除操作 */
const deleteRow = (article_txt_id: number) => {
    ElMessageBox.confirm("您确定要删除这个长尾词文件?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
    })
        .then(async () => {
            let params = {
                article_txt_id,
            };
            let data = await deleteListPage(params);
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

const search = async () => {
    const { article_obj_id, date, pageSize, pageNum, key_word, is_success, up_status } = formInline.value;
    let data = {
        article_obj_id,
        key_word,
        is_success,
        up_status,
        start_time:
            (date?.length && dayjs(date[0]).format("YYYY-MM-DD HH:mm:ss")) || "",
        end_time:
            (date?.length && dayjs(date[1]).format("YYYY-MM-DD HH:mm:ss")) || "",
        pageSize,
        pageNum
    };
    let resp = await taskListPage(data);
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
}

.table-action {
    margin-top: 20px;
    margin-left: 20px;
}

.el-main-container {
    margin-top: 30px;
}
</style>
  