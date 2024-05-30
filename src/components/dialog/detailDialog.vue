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
        >
          <el-table-column type="index" width="50" />
          <el-table-column property="name" label="长尾词组合" />
          <el-table-column fixed="right" label="操作" width="120">
            <template #default="scope">
              <el-button
                link
                type="danger"
                size="small"
                @click.prevent="deleteRow(scope.$index)"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
      <el-footer>
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize4"
          :page-sizes="[100, 200, 300, 400]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </el-footer>
    </el-dialog>
  </teleport>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";

let show = ref(false);
const dialogShow = () => {
  show.value = true;
};

const dialogHide = () => {
  show.value = false;
};

defineExpose({
  dialogShow,
  dialogHide,
});
</script>
<style scoped lang="scss"></style>
