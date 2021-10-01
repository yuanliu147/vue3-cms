import {
  ElAvatar,
  ElBadge,
  ElBreadcrumb,
  ElButton,
  ElCard,
  ElContainer,
  ElDialog,
  ElDropdown,
  ElForm,
  ElInput,
  ElMenu,
  ElSelect,
  ElUpload,
} from 'element-plus'
import { App } from 'vue'

const comps = [
  ElButton,
  ElForm,
  ElInput,
  ElCard,
  ElContainer,
  ElMenu,
  ElBreadcrumb,
  ElBadge,
  ElDropdown,
  ElAvatar,
  ElDialog,
  ElSelect,
  ElUpload,
]

export default function registerElem(app: App): void {
  comps.forEach((comp) => {
    app.use(comp)
  })
}
