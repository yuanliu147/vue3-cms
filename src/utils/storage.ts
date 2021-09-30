const nameSpace = 'vue3-cms'
export default {
  getStorage() {
    return JSON.parse(window.localStorage.getItem(nameSpace) || '{}')
  },
  getItem(key: string) {
    return this.getStorage()[key]
  },
  setItem(key: string, value: any) {
    const temp = this.getStorage()
    temp[key] = value
    window.localStorage.setItem(nameSpace, JSON.stringify(temp))
  },
  clearItem(key: string) {
    const temp = this.getStorage()
    delete temp[key]
    window.localStorage.setItem(nameSpace, JSON.stringify(temp))
  },
  clearAll() {
    window.localStorage.removeItem(nameSpace)
  },
}
