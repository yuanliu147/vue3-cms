<template>
  <slot name="header"></slot>
  <el-form
    :model="modelData"
    :rules="rules"
    label-position="right"
    ref="formRef"
    :label-width="labelWidth"
    :size="size"
    :hide-required-asterisk="hideRequiredAsterisk"
  >
    <el-form-item
      v-for="item of formItems"
      :key="item.field"
      :label="item.label"
      :style="{ width: '100%' }"
      :prop="item.field"
    >
      <template v-if="item.type === 'select'">
        <el-select v-model="modelData[item.field]" :style="{ width: '100%' }">
          <el-option
            v-for="option of item.selectOptions"
            :key="option.value"
            :label="option.label"
            :value="option.value"
          />
        </el-select>
      </template>
      <template v-else>
        <el-input
          :type="item.type"
          v-model="modelData[item.field]"
          :placeholder="item.placeholder"
        />
      </template>
    </el-form-item>
  </el-form>
  <slot name="footer" :formRef="formRef"></slot>
</template>

<script setup lang="ts">
import { IObject } from '@/type'
import { ElForm } from 'element-plus'
import { FormRulesMap } from 'element-plus/lib/components/form/src/form.type'
import { reactive, defineProps, defineEmits, watch, ref } from 'vue'
import { formItemType } from '../types'
// 定义props和emits
const props = defineProps<{
  formData: IObject
  formItems: formItemType[]
  rules?: FormRulesMap
  labelWidth?: string
  size?: 'mini' | 'medium' | 'small'
  hideRequiredAsterisk?: boolean
}>()
const emit = defineEmits<{
  (event: 'update:formData', newData: IObject): void
}>()
// 其他内容
const formRef = ref<InstanceType<typeof ElForm>>()
const modelData = reactive<IObject>({ ...props.formData })
watch(modelData, (newData: IObject) => {
  emit('update:formData', newData)
})
</script>

<style scoped></style>
