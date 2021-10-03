<template>
  <div class="my-table">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <el-table :data="props.tableData" style="width: 100%" border>
      <el-table-column v-if="canDelete" align="center" type="selection" min-width="40" />
      <el-table-column
        v-for="item of props.tableColumn"
        :key="item.prop"
        :prop="item.prop"
        :label="item.label"
        show-overflow-tooltip
        align="center"
        :min-width="item.minWidth"
      >
        <template #default="scope">
          <slot :name="item.prop" :row="(scope as any).row">
            {{ (scope as any).row [item.prop] }}
          </slot>
        </template>
      </el-table-column>
      <el-table-column v-if="canModify || canDelete" align="center" min-width="100" label="操作">
        <template #default="scope">
          <slot name="operator" :row="(scope as any).row"></slot>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { ElTable, ElTableColumn } from 'element-plus'
import type { ITableColumn } from '../types'
import { defineProps } from 'vue'
const props = defineProps<{
  tableData: any[]
  tableColumn: ITableColumn[]
  canDelete: boolean
  canModify: boolean
}>()
</script>

<style lang="scss" scoped>
.header {
  padding: 10px 15px;
}
</style>
