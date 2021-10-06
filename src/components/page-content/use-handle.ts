import { deletePageItemById, TPage } from '@/service/common'
import { IResData } from '@/type'
import { ElMessage } from 'element-plus'
import { reactive, Ref } from 'vue'
import { firstToUpper } from '@/utils/utils'
import store from '@/store'
import { IMenus } from '@/store/types'

interface IPaging {
  pageSize: number
  pageNum: number
}

export default function useHandle(
  page: TPage,
  tableData: Ref<any>,
  emit: (event: 'edit' | 'create', ...args: any[]) => void
) {
  const pagination: IPaging = reactive({
    pageSize: 10,
    pageNum: 1,
  })

  function getInfo(query?: any) {
    store.dispatch(`get${firstToUpper(page)}s`, { ...pagination, ...query })
  }

  const handleEdit = function (_id: number) {
    console.log(_id, page)
    const editData =
      page !== 'menu'
        ? tableData.value.find((item: any) => item._id === _id)
        : findItem(tableData.value, _id)
    emit('edit', editData)
  }

  const handleDelete = async function (_id: number) {
    const res = await deletePageItemById<IResData>(page, _id)
    const success = res.code === 200
    if (!success) {
      ElMessage.error(`删除失败: ${res.msg}`)
      return
    }
    await getInfo()
    ElMessage.success('删除成功~')
  }

  const handleCreate = function () {
    emit('create', {})
  }

  const handleBatchDelete = async function (list: any[]) {
    for (const item of list) {
      const res = await deletePageItemById<IResData>(page, item._id)
      const success = res.code === 200
      if (!success) {
        ElMessage.error(`${item.name} 删除失败: ${res.msg}`)
        return
      }
    }
    await getInfo()
    ElMessage.success('删除成功~')
  }

  function findItem(menus: IMenus[], id: number): any {
    for (const item of menus) {
      const res = findItem(item.children, id)
      if (res) {
        return res
      }
      if (item._id === id) {
        return item
      }
    }
    return undefined
  }

  return {
    handleEdit,
    handleDelete,
    handleCreate,
    handleBatchDelete,
    getInfo,
    pagination,
  }
}
