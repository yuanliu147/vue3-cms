<template>
  <slot name="header"></slot>
  <el-form
    :model="modelData"
    :rules="rules"
    label-position="right"
    ref="formRef"
    v-bind="otherConfig"
  >
    <el-row :gutter="10">
      <template v-for="item of formItems" :key="item.field">
        <el-col v-bind="layout">
          <el-form-item :label="item.label" :style="{ width: '100%' }" :prop="item.field">
            <template v-if="item.type === 'select'">
              <el-select
                v-model="modelData[item.field]"
                :style="{ width: '100%' }"
                :placeholder="item.placeholder"
              >
                <el-option
                  v-for="option of item.selectOptions"
                  :key="option.value"
                  :label="option.label"
                  :value="option.value"
                />
              </el-select>
            </template>
            <template v-else-if="item.type === 'auto'">
              <el-autocomplete
                popper-class="my-autocomplete"
                style="width: 100%"
                v-model="modelData[item.field]"
                :trigger-on-focus="false"
                :fetch-suggestions="item?.querySearch"
                :placeholder="item.placeholder"
              ></el-autocomplete>
            </template>
            <template v-else>
              <el-input
                :type="item.type"
                v-model="modelData[item.field]"
                :placeholder="item.placeholder"
              />
            </template>
          </el-form-item>
        </el-col>
      </template>
    </el-row>
  </el-form>
  <slot name="footer" :formRef="formRef" :resetForm="resetForm"></slot>
</template>

<script setup lang="ts">
import { IObject } from '@/type'
import {
  ElForm,
  ElRow,
  ElCol,
  ElFormItem,
  ElSelect,
  ElOption,
  ElInput,
  ElAutocomplete,
} from 'element-plus'
import { FormRulesMap } from 'element-plus/lib/components/form/src/form.type'
import { defineProps, defineEmits, watch, ref } from 'vue'
import { formItemType, ILayout } from '../types'
// 定义props和emits
const props = defineProps<{
  formData: IObject
  formItems: formItemType[]
  rules?: FormRulesMap
  otherConfig?: IObject
  layout: ILayout
}>()
const emit = defineEmits<{
  (event: 'update:formData', newData: IObject): void
}>()
// 其他内容
const formRef = ref<InstanceType<typeof ElForm>>()
const modelData = ref<IObject>({ ...props.formData })
console.log(modelData.value)
watch(
  () => props.formData,
  (newData) => {
    modelData.value = newData
  }
)

watch(
  modelData,
  (newData: IObject) => {
    emit('update:formData', newData)
  },
  { deep: true }
)

function resetForm() {
  formRef.value?.resetFields()
}
</script>

<style lang="scss" scoped>
.footer {
  width: 100%;
  text-align: center;
}
.my-autocomplete li {
  line-height: normal;
  padding: 7px;
}
.my-autocomplete li .name {
  text-overflow: ellipsis;
  overflow: hidden;
}
.my-autocomplete li .addr {
  font-size: 12px;
  color: #b4b4b4;
}
.my-autocomplete li .highlighted .addr {
  color: #ddd;
}
</style>
