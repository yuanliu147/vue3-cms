import { ElMessage } from 'element-plus'

export function showMessageByCode(code: number, msg: string) {
  if(code === 200) {
    ElMessage.success(msg)
  } else {
    ElMessage.error(msg)
  }
}
