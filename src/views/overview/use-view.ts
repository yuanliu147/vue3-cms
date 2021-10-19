import { useStore } from '@/store'
import { computed } from 'vue'
import { IPieSeries } from '@/components/page-charts/types'
export default function useView() {
  const store = useStore()
  function initData() {
    store.dispatch('getDeptsView')
    store.dispatch('getRoleView')
  }
  const deptView = computed<IPieSeries>(() => ({
    name: '部门人数分布',
    radius: '45%',
    data: computed(() => store.state.deptsview),
  }))

  const roleView = computed<IPieSeries>(() => ({
    name: '角色人数分布',
    data: computed(() => store.state.roleview),
  }))
  return {
    deptView,
    initData,
    roleView,
  }
}
