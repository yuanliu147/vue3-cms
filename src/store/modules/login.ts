import storage from '@/utils/storage'
import router from '@/router'
import { Module } from 'vuex'
import { ILoginState, IMenus, IRootState, IUserInfo } from '../types'
import { login } from '@/service/login/login'
import { IResData } from '@/type'
import { loadRoutes, showMessageByRes } from '@/utils/utils'
import { getMenusById } from '@/service/menus'
const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      userInfo: storage.getItem('userInfo') ?? {},
    }
  },
  mutations: {
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    },
  },
  actions: {
    async login({ commit }, account) {
      const loginRes = await login<IResData<IUserInfo>>(account)
      const loginSuccess = showMessageByRes(loginRes)
      if (!loginSuccess) {
        return
      }
      const userInfo = loginRes.data
      commit('setUserInfo', userInfo)
      storage.setItem('userInfo', userInfo)

      // 获取菜单列表
      const menusRes = await getMenusById<IResData<IMenus[]>>()
      const menusSucc = showMessageByRes(menusRes)
      if (!menusSucc) {
        return
      }
      const menus = menusRes.data
      commit('setMenus', menus, { root: true })
      storage.setItem('menus', menus)
      menus && loadRoutes(router, menus)
      return loginSuccess
    },
  },
}

export default loginModule
