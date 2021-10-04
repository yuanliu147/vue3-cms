import { TPage } from '@/service/common'
import { useStore } from '@/store'
import { computed } from 'vue'

type IStorePage = 'menus' | 'roles' | 'users' | 'depts'

export default function useInit(page: TPage) {
  const store = useStore()
  const tableData = computed(() => {
    if (page !== 'menu') {
      return (store.state[`${page}s` as IStorePage] as any).list
    }
    return store.state[`${page}s` as IStorePage]
  })
  const total = computed(() => {
    if (page !== 'menu') {
      return (store.state[`${page}s` as IStorePage] as any).total
    }
    return 0
  })

  return {
    tableData,
    total,
  }
}
