import { formItemType } from '@/base-components/types'
import store from '@/store'
import { computed } from 'vue'

const users = computed(() => {
  return store.state.users.list.map((user) => {
    return {
      label: user.name,
      value: user.name,
    }
  })
})

export const searchItems: formItemType[] = [
  { field: '_id', label: 'id', placeholder: '请输入用户id', type: 'text' },
  { field: 'name', label: '名称', placeholder: '请输入部门', type: 'text' },
  {
    type: 'select',
    field: 'leader',
    label: '负责人',
    placeholder: '请选择负责人',
    selectOptions: users.value,
  },
]
