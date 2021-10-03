<template>
  <div class="page-content">
    <MyTable
      v-loading="loading"
      :table-data="tableData"
      :table-column="tableColumn"
      :can-delete="canDelete"
      :can-modify="canModify"
      @create="handleCreate"
    >
      <template #header>
        <el-button size="small" v-if="canDelete" type="danger">批量删除</el-button>
        <el-button size="small" v-if="canCreate" type="primary" @click="handleCreate"
          >新增</el-button
        >
      </template>
      <template v-for="item of tableColumn" :key="item.prop" #[item.prop]="{ row }">
        <template v-if="row[item.prop] == null">
          <el-tag type="danger"> 空 </el-tag>
        </template>
        <template v-else-if="item.type === 'image'">
          <img width="40" height="40" class="image" :src="row[item.prop]" />
        </template>
        <template v-else-if="item.type === 'enum'">
          <template v-if="item.style">
            <el-tag :type="item.style(row[item.prop])">
              {{ item.map(row[item.prop]) }}
            </el-tag>
          </template>
          <template v-else>
            {{ item.map(row[item.prop]) }}
          </template>
        </template>
        <template v-else>
          {{ row[item.prop] }}
        </template>
      </template>
      <template #operator="{ row }">
        <div class="operator">
          <div class="edit" v-if="canModify" @click="handleEdit(row._id)">
            <i class="el-icon-edit" />
            <span>编辑</span>
          </div>
          <div class="delete" v-if="canDelete" @click="handleDelete(row._id)">
            <i class="el-icon-delete" />
            <span>删除</span>
          </div>
        </div>
      </template>
    </MyTable>
    <el-pagination
      class="pagination"
      v-model:page-size="pagination.pageSize"
      v-model:current-page="pagination.pageNum"
      background
      layout="prev, pager, next"
      :total="total"
      @current-change="getInfo"
    >
    </el-pagination>

    <PageDialog
      :dialog-items="userDialogItems"
      :dialog-data="dialogData"
      page="user"
      :other-config="dialogOtherConfig"
      :load-data="getInfo"
      :id="_id"
      ref="dialogRef"
    />
  </div>
</template>

<script lang="ts" setup>
import MyTable from '@/base-components/my-table/my-table.vue'
import { ElTag, ElPagination, ElButton } from 'element-plus'
import type { ITableColumn } from '@/base-components/types'
import { defineProps, ref } from 'vue'
import useInit from './use-init'
import usePermission from './use-permission'
import useHandle from './use-handle'
import PageDialog from '../page-dialog/page-dialog.vue'
import { userDialogItems } from '@/pages-config/user.dialog'
const props = defineProps<{
  tableColumn: ITableColumn[]
  page: 'user' | 'role' | 'dept' // 此处未考虑menu
}>()
const dialogOtherConfig = {
  labelWidth: '70px',
  hideRequiredAsterisk: true,
}
const dialogRef = ref<any>()

function setShow() {
  if (dialogRef.value) {
    dialogRef.value.dialogVisible = true
  }
}

const { loading, tableData, total, pagination, getInfo } = useInit(props)
getInfo()
const { canDelete, canCreate, canModify } = usePermission(props.page)
const { handleEdit, handleDelete, handleCreate, dialogData, _id } = useHandle(
  props.page,
  getInfo,
  tableData,
  setShow
)
</script>

<style lang="scss" scoped>
.page-content {
  padding: 10px 20px;
  margin-top: 20px;
  background-color: white;
  .empty {
    padding: 5px 0;
    font-size: 10px;
  }
  .pagination {
    text-align: right;
    margin: 10px;
  }
  .operator {
    display: flex;
    align-items: center;
    font-size: 12px;
    justify-content: space-around;
    .edit {
      color: rgb(15, 77, 211);
      cursor: pointer;
    }
    .delete {
      color: rgb(226, 107, 92);
      cursor: pointer;
    }
  }
}
</style>
