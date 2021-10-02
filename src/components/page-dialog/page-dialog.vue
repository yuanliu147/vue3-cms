<template>
  <el-dialog v-model="dialogVisible" width="30%" center>
    <slot> </slot>
    <MyForm
      v-model:form-data="formData"
      :form-items="dialogItems"
      :rules="rules"
      :other-config="otherConfig"
      :layout="{ xs: 24, sm: 24, md: 24, lg: 24, xl: 24 }"
    ></MyForm>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">{{
          submitText
        }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineExpose, watch, computed } from 'vue'
import MyForm from '@/base-components/my-form/my-form.vue'
import { ElDialog, ElButton } from 'element-plus'
import { IObject, IResData } from '@/type'
import { formItemType } from '../../base-components/types'
import { FormRulesMap } from 'element-plus/lib/components/form/src/form.type'
import { setPageInfoById, TPage } from '@/service/common'
const props = defineProps<{
  dialogData: IObject
  dialogItems: formItemType[]
  rules?: FormRulesMap
  otherConfig?: IObject
  page: TPage
  id: number
  loadData: () => any
}>()

const formData = ref<IObject>({ ...props.dialogData })
const dialogVisible = ref(false)
const dataChange = ref(false)
const submitText = computed(() => (dataChange.value ? '提交' : '确定'))

watch(
  formData,
  (newData: IObject) => {
    dataChange.value = false
    for (const [key, value] of Object.entries(props.dialogData)) {
      if (newData[key] !== value) {
        dataChange.value = true
        return
      }
    }
  },
  { deep: true }
)

const handleSubmit = async () => {
  if (dataChange.value) {
    await setPageInfoById<IResData>(props.page, props.id, formData.value)
    await props.loadData()
    dataChange.value = false
  } else {
    dialogVisible.value = false
  }
}

defineExpose({
  dialogVisible,
})
</script>

<style lang="scss" scoped></style>
