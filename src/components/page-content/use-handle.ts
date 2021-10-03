import { deletePageItemById, TPage } from '@/service/common'
import { IResData } from '@/type'
import { ElMessage } from 'element-plus'
import { Ref, ref } from 'vue'

export default function useHandle(
  page: TPage,
  getInfo: () => any,
  tableData: Ref<any>,
  setShow: () => void
) {
  const dialogData: Ref<any> = ref<any>({})
  const _id = ref<number>()
  const handleEdit = function (id: number) {
    _id.value = id
    dialogData.value = tableData.value.find((item: any) => item._id === id)
    setShow()
    console.log('edit', id)
  }

  const handleDelete = async function (_id: number) {
    const res = await deletePageItemById<IResData>(page, _id)
    const success = res.code
    if (!success) {
      ElMessage.error(`删除失败: ${res.msg}`)
      return
    }
    await getInfo()
    ElMessage.success('删除成功~')
  }

  const handleCreate = function () {
    _id.value = undefined
    dialogData.value = {}
    setShow()
    console.log('create')
  }

  return {
    handleEdit,
    handleDelete,
    handleCreate,
    dialogData,
    _id,
  }
}
