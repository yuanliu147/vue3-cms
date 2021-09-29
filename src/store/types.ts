export interface IRootState {
  id: number | null
  name: string | null
}

export interface ILoginState {
  token: string
}

interface IStateWidthModel {
  loginModel: ILoginState
}

export type IStore = IRootState & IStateWidthModel
