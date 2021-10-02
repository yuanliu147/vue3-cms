import { get, patch } from './base'

export type TPage = 'menu' | 'user' | 'role' | 'dept'

export interface IPaging {
  pageSize: number
  pageNum: number
}

export function getPageList<T = any>(
  page: TPage,
  params?: IPaging
): Promise<T> {
  return get<T>(`/${page}s`, params)
}

export function setPageInfoById<T = any, P = any>(
  page: TPage,
  _id: number,
  data: P
): Promise<T> {
  return patch<T>(`${page}s/${_id}`, data)
}
