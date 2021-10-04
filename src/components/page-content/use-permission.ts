import { TPage } from '@/service/common'
import { useStore } from '@/store'
import { IMenus } from '@/store/types'
import { computed, Ref } from 'vue'

export default function usePermission(page: Ref<TPage>) {
  const store = useStore()
  const canDelete = computed(() => findItem(store.state.menus, `delete:${page.value}`))
  const canModify = computed(() => findItem(store.state.menus, `update:${page.value}`))
  const canCreate = computed(() => findItem(store.state.menus, `create:${page.value}`))
  return {
    canDelete,
    canModify,
    canCreate,
  }
}

function findItem(menus: Readonly<IMenus[]>, condition: string): boolean {
  for (const item of menus) {
    if (findItem(item.children, condition)) {
      return true
    }
    if (item.permission === condition) {
      return true
    }
  }
  return false
}
