import { createPageItem, setPageInfoById, TPage } from '@/service/common'
import { IResData } from '@/type'
import { ElMessage } from 'element-plus'
import { Ref } from 'vue'

export default function useSubmit(page: TPage, formData: Ref<any>, id: Ref<number>) {
  async function handleEdit() {
    const res = await setPageInfoById<IResData>(page, id.value, formData.value)
    const success = res.code === 200
    if (!success) {
      ElMessage.error(`操作失败: ${res.msg}`)
      return
    }
    ElMessage.success('操作成功~')
  }
  async function handleCreate() {
    const res = await createPageItem<IResData>(page, formData.value)
    const success = res.code === 200
    if (!success) {
      ElMessage.error(`操作失败: ${res.msg}`)
      return
    }
    ElMessage.success(`操作成功~`)
  }
  return {
    handleEdit,
    handleCreate,
  }
}
