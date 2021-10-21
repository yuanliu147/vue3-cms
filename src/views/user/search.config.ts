import { formItemType } from '@/base-components/types'
import store from '@/store'
import { computed, Ref } from 'vue'

const depts = computed(() => {
  return store.state.depts.list?.map((item) => ({
    label: item.name,
    value: item._id,
  }))
})

export const searchItems: Ref<formItemType[]> = computed(() => [
  { field: '_id', label: 'id', placeholder: '请输入用户id', type: 'text' },
  { field: 'name', label: '用户名', placeholder: '请输入用户名', type: 'text' },
  { field: 'email', label: '邮箱', placeholder: '请输入邮箱', type: 'text' },
  {
    field: 'cellPhone',
    label: '手机号',
    placeholder: '请输入手机号',
    type: 'text',
  },
  {
    type: 'select',
    field: 'deptId',
    label: '部门',
    placeholder: '请选择部门',
    selectOptions: depts.value,
  },
  {
    field: 'state',
    label: '状态',
    placeholder: '请输入用户状态',
    type: 'select',
    selectOptions: [
      { label: '在职', value: 0 },
      { label: '离职', value: 1 },
      { label: '试用期', value: 2 },
    ],
  },
])
