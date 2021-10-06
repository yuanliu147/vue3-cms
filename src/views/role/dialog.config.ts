import { formItemType } from '@/base-components/types'
import { FormRulesMap } from 'element-plus/lib/components/form/src/form.type'
import { TreeOptionProps } from 'element-plus/lib/components/tree/src/tree.type'
import { reactive } from 'vue'

const roleDialogItems = reactive<formItemType[]>([
  // 数据不能写死
  { type: 'text', field: 'name', label: '名称', placeholder: '请输入角色名称' },
  {
    type: 'text',
    field: 'desc',
    label: '描述',
    placeholder: '请输入角色描述',
  },
])
const rules: FormRulesMap = {
  name: [
    { required: true, trigger: 'blur', message: '名称不能为空~' },
    { max: 20, message: '长度不能超过20个字符~' },
  ],
}

const treeProp: TreeOptionProps = { label: 'name', children: 'children', disabled: '' }

export { roleDialogItems, rules, treeProp }
