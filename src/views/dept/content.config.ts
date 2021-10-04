import { ITableColumn } from '@/base-components/types'

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
  { label: 'id', prop: '_id', minWidth: '50' },
  { label: '名称', prop: 'name', minWidth: '80' },
  { label: '负责人', prop: 'leader', minWidth: '70' },
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
