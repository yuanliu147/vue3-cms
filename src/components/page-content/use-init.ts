import { ITableColumn } from '@/base-components/types'
import { IPaging } from '@/service/common'
import { useStore } from '@/store'
import { firstToUpper } from '@/utils/utils'
import { computed, reactive, ref } from 'vue'
interface IProp {
  tableColumn: ITableColumn[]
  page: 'user' | 'role' | 'dept' // 此处未考虑menu
}
type TPages = 'users' | 'roles' | 'depts'
export default function useInit(props: Readonly<IProp>) {
  const store = useStore()
  const loading = ref(true)
  const pagination: IPaging = reactive({
    pageSize: 10,
    pageNum: 1,
  })
  const tableData = computed(() => store.state[`${props.page}s` as TPages].list)
  const total = computed(() => store.state[`${props.page}s` as TPages].total)

  function getInfo() {
    loading.value = true
    store.dispatch(`get${firstToUpper(props.page)}s`, pagination).then(() => {
      loading.value = false
    })
  }

  return {
    loading,
    tableData,
    total,
    pagination,
    getInfo,
  }
}
