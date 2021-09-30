import { createStore, Store, useStore as useOriginStore } from 'vuex'
import storage from '@/utils/storage'
import { IRootState, IStore } from './types'
import loginModule from './modules/login'

export default createStore<IRootState>({
  state: {
    menus: storage.getItem('menus') ?? [],
  },
  mutations: {
    setMenus(state, menus) {
      state.menus = menus
    },
  },
  actions: {},
  modules: {
    loginModule,
  },
})

export function useStore(): Store<IStore> {
  return useOriginStore<IStore>()
}
