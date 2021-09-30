import {
  ElAvatar,
  ElBadge,
  ElBreadcrumb,
  ElButton,
  ElCard,
  ElContainer,
  ElDropdown,
  ElForm,
  ElInput,
  ElMenu,
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
]

export default function registerElem(app: App): void {
  comps.forEach((comp) => {
    app.use(comp)
  })
}
