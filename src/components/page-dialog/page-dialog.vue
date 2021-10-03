<template>
  <el-dialog v-model="dialogVisible" width="30%" center destroy-on-close>
    <slot> </slot>
    <MyForm
      v-model:form-data="formData"
      :form-items="dialogItems"
      :rules="rules"
      :other-config="otherConfig"
      :layout="{ xs: 24, sm: 24, md: 24, lg: 24, xl: 24 }"
    >
    </MyForm>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">{{ submitText }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineExpose, watch, computed, Ref } from 'vue'
import MyForm from '@/base-components/my-form/my-form.vue'
import { ElDialog, ElButton } from 'element-plus'
import { IObject } from '@/type'
import { formItemType } from '../../base-components/types'
import { FormRulesMap } from 'element-plus/lib/components/form/src/form.type'
import { TPage } from '@/service/common'
import useSubmit from './use-submit'
const props = defineProps<{
  dialogData: IObject
  dialogItems: formItemType[]
  rules?: FormRulesMap
  otherConfig?: IObject
  page: TPage
  id?: number
  loadData: () => any
}>()

const formData: Ref<any> = ref<any>({ ...props.dialogData })
const dialogVisible = ref(false)
const dataChange = ref(false)
const submitText = computed(() => (dataChange.value ? '提交' : '确定'))
const { handleCreate, handleEdit } = useSubmit(props, formData)
watch(
  () => props.dialogData,
  (newData) => {
    formData.value = { ...newData }
  }
)
watch(
  formData,
  (newData: IObject) => {
    dataChange.value = false
    for (const [key, value] of Object.entries(newData)) {
      if (value !== props.dialogData[key]) {
        dataChange.value = true
        return
      }
    }
  },
  { deep: true }
)

const handleSubmit = async () => {
  if (!dataChange.value) {
    dialogVisible.value = false
    return
  }
  if (props.id) {
    await handleEdit()
  } else {
    await handleCreate()
  }
  dataChange.value = false
  dialogVisible.value = false
}

defineExpose({
  dialogVisible,
})
</script>

<style lang="scss" scoped></style>
