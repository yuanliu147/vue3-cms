<template>
  <div>
    <PageSearch
      :search-items="searchItems"
      :other-config="{ labelWidth: '80px' }"
      @search="handleSearch"
      @reset="handleReset"
    />
    <PageContent
      :table-column="tableColumns"
      page="user"
      ref="contentRef"
      @create="handleCreate"
      @edit="handleEdit"
    />
    <PageDialog
      :dialog-items="userDialogItems"
      :dialog-data="dialogData"
      page="user"
      ref="dialogRef"
      @submit="handleReset"
    />
  </div>
</template>

<script lang="ts" setup>
import PageSearch from '@/components/page-search/page-search.vue'
import PageContent from '@/components/page-content/page-content.vue'
import PageDialog from '@/components/page-dialog/page-dialog.vue'
import { userDialogItems } from '@/pages-config/user.dialog'

import { searchItems } from './search.config'
import { tableColumns } from './content.config'
import { ref } from 'vue'

const dialogData = ref({})
const dialogRef = ref<InstanceType<typeof PageDialog>>()
const contentRef = ref<InstanceType<typeof PageContent>>()

function handleSearch(formData: any) {
  contentRef.value?.getInfo(formData)
}

function handleReset() {
  contentRef.value?.getInfo()
}

function handleCreate(data: any) {
  dialogData.value = data
  if (dialogRef.value) {
    dialogRef.value.dialogVisible = true
  }
}

function handleEdit(data: any) {
  dialogData.value = data
  if (dialogRef.value) {
    dialogRef.value.dialogVisible = true
  }
}
</script>

<style lang="scss" scoped></style>
