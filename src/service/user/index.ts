import { IUserInfo } from '@/store/types'
import { get, post } from '../base'

function getInfoById<T = any>(_id: number): Promise<T> {
  return get<T>(`/users/${_id}`)
}

function setInfoById<T = any>(_id: number, data: IUserInfo): Promise<T> {
  return post<T>(`users/${_id}`, data)
}

export { getInfoById, setInfoById }
