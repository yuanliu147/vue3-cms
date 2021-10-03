import { IMenus } from '@/store/types'
import { ComputedRef } from 'vue'

export default function useBread(menus: ComputedRef<IMenus[]>, newPath: string): any[] {
  const breadList: any[] = []
  for (const menu of menus.value) {
    if (menu.type === 1) {
      const item = menu.children.find((item) => item.path === newPath)
      if (item) {
        breadList.push({ name: menu.name })
        breadList.push({ name: item.name })
      }
      continue
    }
    if (menu.path === newPath) {
      breadList.push({ name: menu.name })
    }
  }
  return breadList
}
