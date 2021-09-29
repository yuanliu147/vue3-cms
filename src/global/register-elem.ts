import { ElButton, ElCard, ElForm, ElInput } from 'element-plus'
import { App } from 'vue-demi'

const comps = [ElButton, ElForm, ElInput, ElCard]

export default function registerElem(app: App): void {
  comps.forEach((comp) => {
    app.use(comp)
  })
}
