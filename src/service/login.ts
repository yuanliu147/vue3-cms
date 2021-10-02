import { IObject } from '@/type'
import { post } from './base'

function login<T = any>(data: IObject): Promise<T> {
  return post<T>('/login', data)
}

export { login }
