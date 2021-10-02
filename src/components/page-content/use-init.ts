import { ITableColumn } from '@/base-components/types'
import { IPaging } from '@/service/common'
import { useStore } from '@/store'
import { firstToUpper } from '@/utils/utils'
import { computed, ref } from 'vue'
interface IProp {
  tableColumn: ITableColumn[]
  page: 'user' | 'role' | 'dept' // 此处未考虑menu
}
type TPages = 'users' | 'roles' | 'depts'
export default function useInit(props: Readonly<IProp>) {
  const store = useStore()
  const loading = ref(true)
  const pagination: IPaging = {
    pageSize: 10,
    pageNum: 1,
  }
  store.dispatch(`get${firstToUpper(props.page)}s`, pagination).then(() => {
    loading.value = false
  })
  const tableData = computed(() => store.state[`${props.page}s` as TPages].list)

  return {
    loading,
    tableData,
  }
}
