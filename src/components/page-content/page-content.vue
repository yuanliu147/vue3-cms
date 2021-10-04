<template>
  <div class="page-content">
    <MyTable
      :table-data="tableData"
      :table-column="tableColumn"
      :can-delete="canDelete"
      :can-modify="canModify"
      @create="handleCreate"
      v-model:selection="selectionList"
    >
      <template #header>
        <div class="header">
          <el-button
            size="small"
            v-if="canDelete && page === 'user'"
            type="danger"
            @click="handleBatchDelete(selectionList)"
            >批量删除</el-button
          >
          <el-button size="small" v-if="canCreate" type="primary" @click="handleCreate"
            >新增</el-button
          >
        </div>
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
        <template v-else-if="item.type === 'time'">
          {{ item.map(row[item.prop]) }}
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
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue'
import MyTable from '@/base-components/my-table/my-table.vue'
import { ElTag, ElPagination, ElButton } from 'element-plus'
import type { ITableColumn } from '@/base-components/types'
import type { TPage } from '@/service/common'
import useInit from './use-init'
import usePermission from './use-permission'
import useHandle from './use-handle'
import storage from '@/utils/storage'
export default defineComponent({
  name: 'PageContent',
  props: {
    tableColumn: {
      type: Array as PropType<ITableColumn[]>,
      required: true,
    },
    page: {
      type: String as PropType<TPage>,
      required: true,
    },
  },
  components: {
    MyTable,
    ElTag,
    ElPagination,
    ElButton,
  },
  emits: ['edit', 'create'],
  setup(props, { emit }) {
    const selectionList = ref<any[]>([])
    const page = computed(() => props.page)
    const { tableData, total } = useInit(page.value)
    const { canDelete, canCreate, canModify } = usePermission(page)
    const {
      handleEdit,
      handleDelete,
      handleCreate,
      handleBatchDelete,
      getInfo,
      pagination,
    } = useHandle(page.value, tableData, emit)
    getInfo(pagination)
    return {
      selectionList,
      tableData,
      total,
      pagination,
      getInfo,
      // permission
      canDelete,
      canCreate,
      canModify,
      // handleEvent
      handleEdit,
      handleDelete,
      handleCreate,
      handleBatchDelete,
    }
  },
})
</script>

<style lang="scss" scoped>
.page-content {
  padding: 10px 20px;
  margin-top: 20px;
  background-color: white;
  .header {
    white-space: nowrap;
  }
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
