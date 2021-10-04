<template>
  <div class="page-search">
    <MyForm
      v-model:form-data="formData"
      :form-items="searchItems"
      :other-config="otherConfig"
      :layout="{ xs: 24, sm: 12, md: 8, lg: 8, xl: 8 }"
    >
      <template #header>
        <h2 class="header">搜索</h2>
      </template>
      <template #footer>
        <div class="footer">
          <el-button @click="handleReset">重置</el-button>
          <el-button type="primary" @click="handleSearch">搜索</el-button>
        </div>
      </template>
    </MyForm>
  </div>
</template>

<script lang="ts" setup>
import MyForm from '@/base-components/my-form/my-form.vue'
import { ElButton } from 'element-plus'
import { formItemType } from '@/base-components/types'
import { IObject } from '@/type'
import { defineProps, defineEmits, ref } from 'vue'
const props = defineProps<{
  searchItems: formItemType[]
  otherConfig?: IObject
}>()
const emit = defineEmits<{
  (e: 'search', formData: any): void
  (e: 'reset'): void
}>()
const formData = ref({})
const otherConfig = { ...props.otherConfig, size: 'small' }

function handleSearch() {
  emit('search', formData.value)
}
function handleReset() {
  formData.value = {}
  emit('reset')
}
</script>

<style lang="scss" scoped>
.page-search {
  background-color: white;
  padding: 10px 20px;
  .header {
    text-align: center;
  }
  .footer {
    text-align: center;
    white-space: nowrap;
  }
}
</style>
