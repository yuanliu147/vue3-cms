type Type = 'text' | 'password' | 'select'
export interface formItemType {
  type: Type // 标签类型
  label: string
  field: string // 对应form的model属性绑定的对象的属性
  placeholder?: string
  selectOptions?: ISelectOption[]
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
  type?: 'image' | 'enum' | 'time'
  map?: any
  minWidth?: string
}
