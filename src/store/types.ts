export interface IRootState {
  menus: IMenus[]
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

export interface ILoginState {
  userInfo: IUserInfo
  token: string
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

export interface ILoginData {
  userInfo: IUserInfo
  token: string
}

interface IStateWidthModel {
  loginModule: ILoginState
}

export type IStore = IRootState & IStateWidthModel
