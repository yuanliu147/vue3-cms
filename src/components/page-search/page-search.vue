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
      <template #footer="{ resetForm }">
        <div class="footer">
          <el-button @click="resetForm">重置</el-button>
          <el-button type="primary">搜索</el-button>
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
import { ref, defineProps, reactive } from 'vue'
const props = defineProps<{
  searchData: IObject
  searchItems: formItemType[]
  otherConfig?: IObject
}>()
const formData = ref<IObject>({ ...props.searchData })
const otherConfig = reactive<IObject>({ ...props.otherConfig, size: 'small' })
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
  }
}
</style>
