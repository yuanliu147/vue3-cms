import { RouteRecordRaw } from 'vue-router'

const User = () => import('@/views/user/user.vue' /* webpackChunkName: 'User' */)
const Menu = () => import('@/views/menu/menu.vue' /* webpackChunkName: 'Menu' */)
const Role = () => import('@/views/role/role.vue' /* webpackChunkName: 'Role' */)
const Dept = () => import('@/views/dept/dept.vue' /* webpackChunkName: 'Department' */)
const Leave = () => import('@/views/leave/leave.vue' /* webpackChunkName: 'Leave' */)
const Pending = () =>
  import('@/views/pending/pending.vue' /* webpackChunkName: 'Pending' */)

export const allRoutes: RouteRecordRaw[] = [
  {
    path: '/system/user',
    name: '用户管理',
    component: User,
  },
  {
    path: '/system/menu',
    name: '菜单管理',
    component: Menu,
  },
  {
    path: '/system/role',
    name: '角色管理',
    component: Role,
  },
  {
    path: '/system/dept',
    name: '部门管理',
    component: Dept,
  },
  {
    path: '/approval/leave',
    name: '休假申请',
    component: Leave,
  },
  {
    path: '/approval/pending',
    name: '待我审批',
    component: Pending,
  },
]
