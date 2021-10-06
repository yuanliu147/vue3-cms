<template>
  <div>
    <PageContent
      :table-column="tableColumns"
      page="menu"
      @create="handleCreate"
      @edit="handleEdit"
      ref="contentRef"
    />
    <PageDialog
      :dialog-items="menuDialogItems"
      :rules="rules"
      page="menu"
      :dialog-data="dialogData"
      @submit="handleReset"
      ref="dialogRef"
    />
  </div>
</template>

<script lang="ts" setup>
import PageContent from '@/components/page-content/page-content.vue'
import PageDialog from '@/components/page-dialog/page-dialog.vue'
import { ref } from 'vue'
import { tableColumns } from './content.config'
import { menuDialogItems, rules } from './dialog.config'

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
