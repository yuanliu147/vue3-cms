import { formItemType } from '@/base-components/types'
import { FormRulesMap } from 'element-plus/lib/components/form/src/form.type'

const dialogItems: formItemType[] = [
  { type: 'text', field: 'name', label: '用户名' },
  { type: 'text', field: 'email', label: '邮箱' },
  { type: 'text', field: 'cellPhone', label: '手机号' },
  {
    type: 'select',
    field: 'sex',
    label: '性别',
    selectOptions: [
      { label: '男', value: 0 },
      { label: '女', value: 1 },
    ],
  },
  {
    type: 'select',
    field: 'state',
    label: '状态',
    selectOptions: [
      { label: '在职', value: 0 },
      { label: '离职', value: 1 },
      { label: '试用期', value: 2 },
    ],
  },
  {
    type: 'select',
    field: 'roleId',
    label: '角色',
    selectOptions: [
      { label: '超级管理员', value: 1001 },
      { label: '部门经理', value: 1002 },
      { label: '普通用户', value: 1003 },
    ],
  },
  {
    type: 'select',
    field: 'deptId',
    label: '部门',
    selectOptions: [
      { label: '人事部', value: 12301 },
      { label: '客服部', value: 12302 },
      { label: '运营部', value: 12303 },
      { label: '研发部', value: 12304 },
      { label: '保卫部', value: 12306 },
      { label: '秘书部', value: 12307 },
      { label: '总裁部', value: 123010 },
      { label: '测试部', value: 123012 },
    ],
  },
]

const rules: FormRulesMap = {
  name: [
    { required: true, trigger: 'blur', message: '用户不能为空~' },
    { max: 20, message: '长度不能超过20个字符~' },
  ],
  email: [{ type: 'email', trigger: 'blur', message: '请输入正确的邮箱' }],
  cellPhone: [{ max: 20, message: '长度不能超过20个字符~' }],
}

export { dialogItems, rules }
