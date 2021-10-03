<template>
  <div>
    <PageSearch :search-data="searchData" :search-items="searchItems" :other-config="otherConfig" />
    <PageContent :table-column="tableColumns" page="user" />
  </div>
</template>

<script lang="ts" setup>
import PageSearch from '@/components/page-search/page-search.vue'
import PageContent from '@/components/page-content/page-content.vue'
import { searchItems } from './search.config'
import { tableColumns } from './table.config'
import { reactive } from 'vue'
import type { ISearch } from './types'
import { useStore } from '@/store'
const store = useStore()
const searchData = reactive<ISearch>({})
const otherConfig = {
  labelWidth: '80px',
}

store.dispatch('getUsers')
</script>

<style lang="scss" scoped></style>
