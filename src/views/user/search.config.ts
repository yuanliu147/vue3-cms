import { formItemType } from '@/base-components/types'

export const searchItems: formItemType[] = [
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
    field: 'sex',
    label: '性别',
    placeholder: '请输入用户性别',
    selectOptions: [
      { label: '男', value: 0 },
      { label: '女', value: 1 },
    ],
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
]
