import storage from '@/utils/storage'
import { Module } from 'vuex'
import { ILoginState, IRootState } from './types'

const loginModule: Module<ILoginState, IRootState> = {
  state() {
    return {
      token: storage.getItem('token') ?? null,
    }
  },
}

export default loginModule
