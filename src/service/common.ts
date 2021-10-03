import { delet, get, patch, post } from './base'

export type TPage = 'menu' | 'user' | 'role' | 'dept'

export interface IPaging {
  pageSize: number
  pageNum: number
}

export function getPageList<T = any>(page: TPage, params?: IPaging): Promise<T> {
  return get<T>(`/${page}s`, params)
}

export function setPageInfoById<T = any, P = any>(page: TPage, _id: number, data: P): Promise<T> {
  return patch<T>(`${page}s/${_id}`, data)
}

export function deletePageItemById<T = any>(page: TPage, _id: number) {
  return delet<T>(`${page}s/${_id}`)
}

export function createPageItem<T = any, P = any>(page: TPage, data: P) {
  return post<T>(`${page}s`, data)
}
