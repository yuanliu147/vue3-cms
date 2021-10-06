import { ITableColumn } from '@/base-components/types'

function mapType(type: number) {
  const map = ['一级菜单', '二级菜单', '按钮']
  return map[type - 1]
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
export const tableColumns: ITableColumn[] = [
  { label: '名称', prop: 'name', minWidth: '100' },
  { label: '类型', prop: 'type', type: 'enum', minWidth: '80', map: mapType },
  {
    label: '路径',
    prop: 'path',
    minWidth: '120',
  },
  { label: '图标', prop: 'icon', minWidth: '80', type: 'icon' },
  { label: '权限', prop: 'permission', minWidth: '100' },
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
