import { ITableColumn } from '@/base-components/types'
import store from '@/store'

const mapState = (id: number) => {
  return ['在职', '离职', '试用'][id]
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

const formateTime = (time: number) => {
  const timeStr = '00' + time
  return timeStr.slice(-2)
}

const mapUTCTime = (time: Date) => {
  const date = new Date(time)
  const year = date.getFullYear()
  const mouth = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()

  return `${year}-${mouth}-${day} ${formateTime(hour)}:${formateTime(
    minutes
  )}:${formateTime(seconds)}`
}

const setStyle = (code: number) => {
  if (code === 0) {
    return ''
  } else if (code === 1) {
    return 'danger'
  } else {
    return 'info'
  }
}

export const tableColumns: ITableColumn[] = [
  { label: 'id', prop: '_id', minWidth: '50' },
  { label: '用户名', prop: 'name', minWidth: '70' },
  { label: '头像', prop: 'avatar', type: 'image', minWidth: '80' },
  {
    label: '状态',
    prop: 'state',
    type: 'enum',
    map: mapState,
    minWidth: '70',
    style: setStyle,
  },
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
  {
    label: '创建时间',
    prop: 'createTime',
    type: 'time',
    minWidth: '160',
    map: mapUTCTime,
  },
  {
    label: '更新时间',
    prop: 'updateTime',
    type: 'time',
    minWidth: '160',
    map: mapUTCTime,
  },
]
