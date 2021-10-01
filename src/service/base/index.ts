import store from '@/store'
import { IStore } from '@/store/types'
import { IObject } from '@/type'
import axios, { AxiosRequestConfig } from 'axios'
import { BASE_URL, TIMEOUT } from './config'

axios.defaults.baseURL = BASE_URL
axios.defaults.timeout = TIMEOUT

axios.interceptors.request.use((req) => {
  const tokenStr = (store.state as IStore).loginModule.token
  const token = `Bearer ${tokenStr}`
  req.headers['Authorization'] = token
  return req
})

axios.interceptors.response.use((res): any => {
  return res.data
})

function request<T = any>(config: AxiosRequestConfig): Promise<T> {
  return axios.request<any, T>(config)
}

export function get<T = any>(url: string, params?: IObject): Promise<T> {
  return request<T>({ url, params, method: 'GET' })
}
export function post<T = any>(url: string, data: IObject): Promise<T> {
  return request<T>({ url, data, method: 'POST' })
}
export function delet<T = any>(url: string): Promise<T> {
  return request<T>({ url, method: 'DELETE' })
}
export function patch<T = any>(url: string, data: IObject): Promise<T> {
  return request<T>({ url, data, method: 'PATCH' })
}
