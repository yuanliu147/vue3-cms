import { formItemType } from '@/base-components/types'
import store from '@/store'
import { FormRulesMap } from 'element-plus/lib/components/form/src/form.type'
import { computed, reactive } from 'vue'

const leaderOptions = computed(() => {
  return store.state.users.list?.map((user) => {
    return {
      label: user.name,
      value: user.name,
    }
  })
})

const deptDialogItems = reactive<formItemType[]>([
  // 数据不能写死
  { type: 'text', field: 'name', label: '名称', placeholder: '请输入部门名称' },
  {
    type: 'select',
    field: 'leader',
    label: '负责人',
    placeholder: '请选择部门负责人',
    selectOptions: leaderOptions.value,
  },
])
const rules: FormRulesMap = {
  name: [
    { required: true, trigger: 'blur', message: '用户不能为空~' },
    { max: 20, message: '长度不能超过20个字符~' },
  ],
  leader: [{ required: true, trigger: 'blur', message: '负责人不能为空' }],
}

export { deptDialogItems, rules }
