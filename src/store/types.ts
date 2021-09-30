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
}

export interface IUserInfo {
  token?: string
  _id?: number
  name?: string
}

interface IStateWidthModel {
  loginModule: ILoginState
}

export type IStore = IRootState & IStateWidthModel
