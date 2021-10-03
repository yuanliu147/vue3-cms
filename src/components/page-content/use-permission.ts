import { TPage } from '@/service/common'
import { useStore } from '@/store'
import { IMenus } from '@/store/types'
import { computed } from 'vue'

export default function usePermission(page: TPage) {
  const store = useStore()
  const canDelete = computed(() => findItem(store.state.menus, `delete:${page}`))
  const canModify = computed(() => findItem(store.state.menus, `update:${page}`))
  const canCreate = computed(() => findItem(store.state.menus, `create:${page}`))
  return {
    canDelete,
    canModify,
    canCreate,
  }
}

function findItem(menus: Readonly<IMenus[]>, condition: string): boolean {
  for (const item of menus) {
    if (item.permission === condition) {
      return true
    }
    if (item.children.length) {
      return findItem(item.children, condition)
    }
  }
  return false
}
