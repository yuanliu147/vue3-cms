<template>
  <el-dialog v-model="dialogVisible" width="40%" center>
    <slot> </slot>
    <MyForm
      v-model:form-data="formData"
      :form-items="dialogItems"
      :rules="rules"
      v-bind="otherConfig"
    />
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
import { IObject, IResData } from '@/type'
import { formItemType } from '../../base-components/types'
import { FormRulesMap } from 'element-plus/lib/components/form/src/form.type'
import { setPageInfoById, TPage } from '@/service'
import { showMessageByRes } from '@/utils/utils'
const props = defineProps<{
  dialogData: IObject
  dialogItems: formItemType[]
  rules?: FormRulesMap
  otherConfig?: IObject
  page: TPage
  id: number
}>()

const formData = ref<IObject>({ ...props.dialogData })
const dialogVisible = ref(false)
const dataChange = ref(false)
const submitText = computed(() => (dataChange.value ? '修改' : '确定'))

watch(formData, (newData: IObject) => {
  dataChange.value = false
  for (const [key, value] of Object.entries(props.dialogData)) {
    if (newData[key] !== value) {
      dataChange.value = true
      return
    }
  }
})

const handleSubmit = async () => {
  if (dataChange.value) {
    const res = await setPageInfoById<IResData>(
      props.page,
      props.id,
      formData.value
    )
    showMessageByRes(res)
    /**
     * !注意：此处虽然将服务器的数据修改了，但是本地数据并未修改
     */
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
