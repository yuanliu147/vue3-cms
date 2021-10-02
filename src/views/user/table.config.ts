import { ITableColumn } from '@/base-components/types'
import store from '@/store'

const mapState = (id: number) => {
  return ['在职', '离职', '试用期'][id]
}
const mapRole = (id: number) => {
  const roles = store.state?.roles?.list ?? []
  const target = roles.find((item) => item._id === id)
  return target?.name ?? null
}
const mapDept = (id: number) => {
  const depts = store.state?.depts?.list ?? []
  const target = depts.find((item) => item._id === id)
  return target?.name ?? null
}

export const tableColumns: ITableColumn[] = [
  { label: '用户名', prop: 'name', minWidth: '60' },
  { label: '头像', prop: 'avatar', type: 'image', minWidth: '80' },
  { label: '状态', prop: 'state', type: 'enum', map: mapState, minWidth: '60' },
  { label: '邮箱', prop: 'email', minWidth: '140' },
  { label: '手机号', prop: 'cellPhone', minWidth: '120' },
  {
    label: '角色',
    prop: 'roleId',
    type: 'enum',
    map: mapRole,
    minWidth: '100',
  },
  { label: '部门', prop: 'deptId', type: 'enum', map: mapDept, minWidth: '80' },
  { label: '创建时间', prop: 'createTime', type: 'time', minWidth: '160' },
  { label: '更新时间', prop: 'updateTime', type: 'time', minWidth: '160' },
]
