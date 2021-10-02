import { get } from './base'

function getInfoById<T = any>(_id: number): Promise<T> {
  return get<T>(`/users/${_id}`)
}

export { getInfoById }
