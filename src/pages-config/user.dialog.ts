import { formItemType } from '@/base-components/types'
import store from '@/store'
import { FormRulesMap } from 'element-plus/lib/components/form/src/form.type'
import { computed, reactive } from 'vue'

const rolesOptions = computed(() => {
  return store.state.roles.list.map((role) => {
    return {
      label: role.name,
      value: role._id,
    }
  })
})
const deptOptions = computed(() => {
  return store.state.depts.list.map((dept) => {
    return {
      label: dept.name,
      value: dept._id,
    }
  })
})

const userDialogItems = reactive<formItemType[]>([
  // 数据不能写死
  { type: 'text', field: 'name', label: '用户名', placeholder: '请输入用户名' },
  { type: 'text', field: 'email', label: '邮箱', placeholder: '请输入邮箱' },
  {
    type: 'text',
    field: 'cellPhone',
    label: '手机号',
    placeholder: '请输入手机号',
  },
  {
    type: 'select',
    field: 'sex',
    label: '性别',
    placeholder: '请选择性别',
    selectOptions: [
      { label: '男', value: 0 },
      { label: '女', value: 1 },
    ],
  },
  {
    type: 'select',
    field: 'state',
    label: '状态',
    placeholder: '请选择状态',
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
    placeholder: '请选择角色',
    selectOptions: rolesOptions.value,
  },
  {
    type: 'select',
    field: 'deptId',
    label: '部门',
    placeholder: '请选择部门',
    selectOptions: deptOptions.value,
  },
])

const rules: FormRulesMap = {
  name: [
    { required: true, trigger: 'blur', message: '用户不能为空~' },
    { max: 20, message: '长度不能超过20个字符~' },
  ],
  email: [{ type: 'email', trigger: 'blur', message: '请输入正确的邮箱' }],
  cellPhone: [{ max: 20, message: '长度不能超过20个字符~' }],
}

export { userDialogItems, rules }
