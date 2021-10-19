import { get } from './base'

export function getDeptView() {
  return get('/overview/deptnum')
}
export function getRolesView() {
  return get('/overview/rolenum')
}
