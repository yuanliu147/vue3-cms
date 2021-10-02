<template>
  <div class="my-table">
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column
        v-for="item of tableColumn"
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
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { ElTable, ElTableColumn } from 'element-plus'
import type { ITableColumn } from '../types'
import { defineProps } from 'vue-demi'
const props = defineProps<{
  tableData: any[]
  tableColumn: ITableColumn[]
}>()
</script>

<style lang="scss" scoped></style>
