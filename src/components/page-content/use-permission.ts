import { TPage } from '@/service/common'
import { useStore } from '@/store'

import { findItem } from '@/utils/utils'
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
