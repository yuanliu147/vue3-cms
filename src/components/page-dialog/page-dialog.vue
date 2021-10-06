<template>
  <el-dialog v-model="dialogVisible" width="30%" center destroy-on-close>
    <slot name="header"> </slot>
    <MyForm
      v-model:form-data="formData"
      :form-items="dialogItems"
      :rules="rules"
      :other-config="{ labelWidth: '70px', hideRequiredAsterisk: true }"
      :layout="{ xs: 24, sm: 24, md: 24, lg: 24, xl: 24 }"
    >
    </MyForm>
    <div class="permission">
      <slot name="permission"></slot>
    </div>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">{{ submitText }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { ref, watch, computed, Ref, PropType, defineComponent } from 'vue'
import MyForm from '@/base-components/my-form/my-form.vue'
import { ElDialog, ElButton } from 'element-plus'
import { IObject } from '@/type'
import { formItemType } from '../../base-components/types'
import { FormRulesMap } from 'element-plus/lib/components/form/src/form.type'
import { TPage } from '@/service/common'
import useSubmit from './use-submit'
export default defineComponent({
  name: 'PageDialog',
  components: {
    ElDialog,
    ElButton,
    MyForm,
  },
  props: {
    dialogData: {
      type: Object,
      required: true,
    },
    dialogItems: {
      type: Array as PropType<formItemType[]>,
      required: true,
    },
    rules: {
      type: Object as PropType<FormRulesMap>,
      default: () => ({}),
    },
    page: {
      type: String as PropType<TPage>,
      required: true,
    },
  },
  emits: ['submit'],
  setup(props, { emit }) {
    const formData: Ref<any> = ref<any>({ ...props.dialogData })
    const dialogVisible = ref(false)
    const dataChange = ref(false)
    const submitText = computed(() => (dataChange.value ? '提交' : '确定'))
    const action = ref<'create' | 'edit'>(formData.value._id ? 'edit' : 'create')
    const editId = ref<number>(-1)

    const { handleCreate, handleEdit } = useSubmit(props.page, formData, editId)

    watch(
      () => props.dialogData,
      (newData) => {
        for (const item of props.dialogItems) {
          formData.value[item.field] = newData[item.field]
        }
        if (newData._id) {
          // #可以根据其传过来的初始值来判断是编辑还是创建
          editId.value = newData._id
          action.value = 'edit'
        } else {
          action.value = 'create'
          editId.value = -1
        }
      },
      { deep: true }
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
      if (action.value === 'edit') {
        await handleEdit()
      } else {
        await handleCreate()
      }
      emit('submit')
      dataChange.value = false
      dialogVisible.value = false
    }

    return {
      dialogVisible,
      formData,
      submitText,
      handleSubmit,
      action,
    }
  },
})
</script>

<style lang="scss" scoped>
.permission {
  padding-left: 25%;
}
</style>
