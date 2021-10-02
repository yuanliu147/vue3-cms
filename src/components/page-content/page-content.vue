<template>
  <div class="page-content">
    <MyTable
      v-loading="loading"
      :table-data="tableData"
      :table-column="tableColumn"
    >
      <template
        v-for="item of tableColumn"
        :key="item.prop"
        #[item.prop]="{ row }"
      >
        <template v-if="item.type === 'image'">
          <img width="40" height="40" class="image" :src="row[item.prop]" />
        </template>
        <template v-else-if="item.type === 'enum'">
          {{ item.map(row[item.prop]) }}
        </template>
        <template v-else>
          {{ row[item.prop] }}
        </template>
      </template>
    </MyTable>
  </div>
</template>

<script lang="ts" setup>
import MyTable from '@/base-components/my-table/my-table.vue'
import type { ITableColumn } from '@/base-components/types'
import { defineProps } from 'vue'
import useInit from './use-init'
const props = defineProps<{
  tableColumn: ITableColumn[]
  page: 'user' | 'role' | 'dept' // 此处未考虑menu
}>()

const { loading, tableData } = useInit(props)
</script>

<style lang="scss" scoped>
.page-content {
  padding: 10px 20px;
  margin-top: 10px;
  background-color: white;
}
</style>
