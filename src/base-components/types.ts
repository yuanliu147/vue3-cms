import { Ref } from 'vue-demi'

export interface formItemType {
  type: 'text' | 'password' | 'select' | 'auto' // 标签类型
  label: string
  field: string // 对应form的model属性绑定的对象的属性
  placeholder?: string
  selectOptions?: ISelectOption[]
  querySearch?: (str: string, callback: (arg: any[]) => any) => any
}

interface ISelectOption {
  label: string
  value: any
}

export interface ILayout {
  xs: number
  sm: number
  md: number
  lg: number
  xl: number
}

export interface ITableColumn {
  prop: string
  label: string
  type?: 'image' | 'enum' | 'time' | 'icon' | 'tree'
  map?: any
  minWidth?: string
  style?: any
  treeProp?: any
}
