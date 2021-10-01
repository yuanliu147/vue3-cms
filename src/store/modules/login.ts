import storage from '@/utils/storage'
import router from '@/router'
import { Module } from 'vuex'
import {
  ILoginState,
  IMenus,
  IRootState,
  ILoginData,
  IUserInfo,
} from '../types'
import { login } from '@/service/login'
import { IResData } from '@/type'
import { loadRoutes, showMessageByRes } from '@/utils/utils'
import { getInfoById } from '@/service/user'
import { ElMessage } from 'element-plus'
import { getPageList } from '@/service'
const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      userInfo: storage.getItem('userInfo') ?? {},
      token: storage.getItem('token'),
    }
  },
  mutations: {
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    },
    setToken(state, token) {
      state.token = token
    },
  },
  actions: {
    async login({ commit }, account) {
      const loginRes = await login<IResData<ILoginData>>(account)
      showMessageByRes(loginRes)
      if (loginRes.data) {
        const { userInfo, token } = loginRes.data
        commit('setUserInfo', userInfo)
        storage.setItem('userInfo', userInfo)
        commit('setToken', token)
        storage.setItem('token', token)
      }

      // 获取菜单列表
      const menusRes = await getPageList<IResData<IMenus[]>>('menu')
      showMessageByRes(menusRes)
      const menus = menusRes.data
      commit('setMenus', menus, { root: true })
      storage.setItem('menus', menus)
      menus && loadRoutes(router, menus)
      return loginRes.code === 200
    },
    async getUserInfo({ state, commit }) {
      const _id = state.userInfo._id
      const infoRes = await getInfoById<IResData<IUserInfo>>(_id)
      if (infoRes.code === 200) {
        const info = infoRes.data
        commit('setUserInfo', info)
        storage.setItem('userInfo', info)
      } else {
        ElMessage.error('更新信息失败')
      }
      return infoRes.code === 200
    },
  },
}

export default loginModule
