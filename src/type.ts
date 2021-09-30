export interface IObject {
  [key: string]: any
}

export interface IResData<T = any> {
  code: number
  data?: T
  msg: string
}
