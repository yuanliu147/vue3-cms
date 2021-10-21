import { formItemType } from '@/base-components/types'
import store from '@/store'
import { IMenus } from '@/store/types'
import { FormRulesMap } from 'element-plus/lib/components/form/src/form.type'
import { computed, reactive } from 'vue'

const querySearch = (queryString: string, cb: (arg: any[]) => any) => {
  const list = [{ value: 'create:'}, { value: 'update:'}, {value: 'delete:'}] // 联想输入得是对象含value
  const results = list.map((item) => ({ value: item.value += queryString}))
  cb(results)
}

function getMenus(menus: IMenus[], list: IMenus[]) {
  for (const item of menus) {
    if (item.type !== 3) {
      list.push(item)
    }
    getMenus(item.children, list)
  }
}

const parentOptions = computed(() => {
  const menus = store.state.menus
  const list: IMenus[] = []
  getMenus(menus, list)
  return list.map((menu) => {
    return {
      label: menu.name,
      value: menu._id,
    }
  })
})

const menuDialogItems = reactive<formItemType[]>([
  // 数据不能写死
  { type: 'text', field: 'name', label: '名称', placeholder: '请输入菜单名称' },
  {
    type: 'select',
    field: 'type',
    label: '类型',
    placeholder: '请选择菜单类型',
    selectOptions: [
      { label: '一级菜单', value: 1 },
      { label: '二级菜单', value: 2 },
      { label: '三级菜单', value: 3 },
    ],
  },
  { type: 'text', field: 'path', label: '路径', placeholder: '请输入菜单路径' },
  {
    type: 'select',
    field: 'parentId',
    label: '父级菜单',
    placeholder: '请选择父级菜单',
    selectOptions: parentOptions.value,
  },
  {
    type: 'text',
    field: 'icon',
    label: '图标',
    placeholder: '请输入菜单图标/一级菜单才会显示',
  },
  {
    type: 'auto',
    field: 'permission',
    label: '权限',
    placeholder: '输入菜单名称以获取可选权限',
    querySearch: querySearch,
  },
])
const rules: FormRulesMap = {
  name: [
    { required: true, trigger: 'blur', message: '用户不能为空~' },
    { max: 20, message: '长度不能超过20个字符~' },
  ],
  type: [{ required: true, trigger: 'blur', message: '类型不能为空' }],
}

export { menuDialogItems, rules }
