import { IViewData } from '@/components/page-charts/types'

export interface IRootState {
  menus: IMenus[]
  roles: IRoleResData
  depts: IDeptResData
  users: IUserResData
  deptsview: IViewData[]
  roleview: IViewData[]
}

export interface IDept {
  _id: number
  name: string
  leader: string
  createTime: string
  updateTime: string
}

export interface IUser extends IUserInfo {
  createTime: string
  updateTime: string
}

export interface IUserResData {
  list: IUser[]
  total: number
}

export interface IDeptResData {
  list: IDept[]
  total: number
}

export interface IRole {
  _id: number
  name: string
  desc: string
  createTime: string
  updateTime: string
}
export interface IRoleResData {
  list: IRole[]
  total: number
}

export interface IMenus {
  _id: number
  name: string
  icon: string
  path: string
  type: number
  createTime: string
  updateTime: string
  parentId: null | number
  permission: null | string
  children: IMenus[]
}

export interface IUserInfo {
  _id: number
  name: string
  email: string
  cellPhone: string
  sex: number
  state: number
  avatar: string
  roleId: number
  deptId: number
}

export interface ILoginState {
  userInfo: IUserInfo
  token: string
}
export interface ILoginData {
  userInfo: IUserInfo
  token: string
}

interface IStateWidthModel {
  loginModule: ILoginState
}

export type IStore = IRootState & IStateWidthModel
