import { ElMessage } from 'element-plus'

export function showMessageByCode(code: number, msg: string): void {
  if (code === 200) {
    ElMessage.success(msg)
  } else {
    ElMessage.error(msg)
  }
}
