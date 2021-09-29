type Type = 'text' | 'password'
export interface formItemType {
  type: Type // 标签类型
  label: string
  field: string // 对应form的model属性绑定的对象的属性
  placeholder: string
}
