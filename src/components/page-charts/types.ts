import { Ref } from 'vue'

export interface IPieSeries {
  name: string
  radius?: string
  data: Ref<IViewData[]>
}

export interface IViewData {
  value: number
  name: string
}
