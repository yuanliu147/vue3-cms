import { formItemType } from '@/base-components/types'
import { IAccount } from '@/views/types'
import { FormRulesMap } from 'element-plus/lib/components/form/src/form.type'
import { ref } from 'vue-demi'
export const formItems: formItemType[] = [
  {
    type: 'text',
    field: 'name',
    label: '用户',
    placeholder: '请输入用户名',
  },
  {
    type: 'password',
    field: 'password',
    label: '密码',
    placeholder: '请输入密码',
  },
]

export const rules: FormRulesMap = {
  name: [
    { required: true, trigger: 'blur', message: '请输入用户名' },
    { max: 20, message: '长度在20个字符以内' },
  ],
  password: [
    { required: true, trigger: 'blur', message: '请输入密码' },
    { max: 40, message: '长度在40个字符以内' },
  ],
}

export const userAccount = ref<IAccount>({
  name: 'liuer',
  password: '123456',
})
