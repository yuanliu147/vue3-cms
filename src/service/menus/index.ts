import { get } from '../base'

export function getMenusById<T = any>(): Promise<T> {
  return get<T>('/menus')
}
