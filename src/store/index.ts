import { createStore, Store, useStore as useOriginStore } from 'vuex'
import storage from '@/utils/storage'
import { IRootState, IStore } from './types'
import loginModule from './loginModule'

export default createStore<IRootState>({
  state: {
    id: storage.getItem('id') ?? null,
    name: storage.getItem('name') ?? null,
  },
  mutations: {},
  actions: {},
  modules: {
    loginModule,
  },
})

export function useStore(): Store<IStore> {
  return useOriginStore<IStore>()
}
