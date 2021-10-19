import { createStore, Store, useStore as useOriginStore } from 'vuex'
import storage from '@/utils/storage'
import type {
  IDeptResData,
  IMenus,
  IRoleResData,
  IRootState,
  IStore,
  IUserResData,
} from './types'
import { getPageList } from '@/service/common'
import loginModule from './modules/login'
import { IResData } from '@/type'
import { ElMessage } from 'element-plus'
import { loadRoutes } from '@/utils/utils'
import router from '@/router'
import { getDeptView, getRolesView } from '@/service/view'

export default createStore<IRootState>({
  state: {
    menus: storage.getItem('menus') ?? [],
    roles: storage.getItem('roles') ?? {},
    depts: storage.getItem('depts') ?? {},
    users: storage.getItem('users') ?? {},
    deptsview: storage.getItem('deptsview') ?? [],
    roleview: storage.getItem('roleview') ?? [],
  },
  mutations: {
    setMenus(state, menus) {
      state.menus = menus
    },
    setRoles(state, roles) {
      state.roles = roles
    },
    setDepts(state, depts) {
      state.depts = depts
    },
    setUsers(state, users) {
      state.users = users
    },
    setDeptsView(state, views) {
      state.deptsview = views
    },
    setRoleView(state, views) {
      state.roleview = views
    },
  },
  actions: {
    async getUsers({ commit }, params: any) {
      const usersRes = await getPageList<IResData<IUserResData>>('user', params)
      const success = usersRes.code === 200
      if (!success) {
        ElMessage.error(`用户列表获取失败: ${usersRes.msg}`)
        return
      }
      const users = usersRes.data
      commit('setUsers', users)
      storage.setItem('users', users)
      return users?.list
    },
    async getMenus({ commit }) {
      const menusRes = await getPageList<IResData<IMenus[]>>('menu')
      const success = menusRes.code === 200
      if (!success) {
        ElMessage.error(`菜单列表获取失败: ${menusRes.msg}`)
        return
      }
      const menus = menusRes.data
      commit('setMenus', menus)
      storage.setItem('menus', menus)
      menus && loadRoutes(router, menus)
    },
    async getRoles({ commit }, params: any) {
      const rolesRes = await getPageList<IResData<IRoleResData>>('role', params)
      const success = rolesRes.code === 200
      if (!success) {
        ElMessage.error(`角色列表获取失败: ${rolesRes.msg}`)
        return
      }
      const roles = rolesRes.data
      commit('setRoles', roles)
      storage.setItem('roles', roles)
    },
    async getDepts({ commit }, params: any) {
      const deptsRes = await getPageList<IResData<IDeptResData>>('dept', params)
      const success = deptsRes.code === 200
      if (!success) {
        ElMessage.error(`部门列表获取失败: ${deptsRes.msg}`)
        return
      }
      const depts = deptsRes.data
      commit('setDepts', depts)
      storage.setItem('depts', depts)
    },
    async getDeptsView({ commit }) {
      const deptViewRes = await getDeptView()
      const success = deptViewRes.code === 200
      if (!success) {
        ElMessage.error(`视图数据获取失败: ${deptViewRes.msg}`)
        console.log(deptViewRes)
        return
      }
      const deptsView = deptViewRes.data
      commit('setDeptsView', deptsView)
      storage.setItem('deptsView', deptsView)
    },
    async getRoleView({ commit }) {
      const rolesViewRes = await getRolesView()
      const success = rolesViewRes.code === 200
      if (!success) {
        ElMessage.error(`视图数据获取失败: ${rolesViewRes.msg}`)
        console.log(rolesViewRes)
        return
      }
      const rolesView = rolesViewRes.data
      commit('setRoleView', rolesView)
      storage.setItem('rolesView', rolesView)
    },
  },
  modules: {
    loginModule,
  },
})

export function useStore(): Store<IStore> {
  return useOriginStore<IStore>()
}
