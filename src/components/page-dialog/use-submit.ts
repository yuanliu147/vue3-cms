import { createPageItem, setPageInfoById } from '@/service/common'
import { IResData } from '@/type'
import { ElMessage } from 'element-plus'
import { Ref } from 'vue'

export default function useSubmit(props: Readonly<any>, formData: Ref<any>) {
  async function handleEdit() {
    const res = await setPageInfoById<IResData>(props.page, props.id, formData.value)
    const success = res.code === 200
    if (!success) {
      ElMessage.error(`操作失败: ${res.msg}`)
      return
    }
    await props.loadData()
    ElMessage.success('操作成功~')
  }
  async function handleCreate() {
    const res = await createPageItem<IResData>(props.page, formData.value)
    const success = res.code === 200
    if (!success) {
      ElMessage.error(`操作失败: ${res.msg}`)
      return
    }
    await props.loadData()
    ElMessage.success(`操作成功~`)
  }
  return {
    handleEdit,
    handleCreate,
  }
}
