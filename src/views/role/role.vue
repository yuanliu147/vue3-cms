<template>
  <div>
    <PageContent
      :table-column="tableColumns"
      page="role"
      @create="handleCreate"
      ref="contentRef"
      @edit="handleEdit"
    />
    <PageDialog
      :dialog-items="roleDialogItems"
      :dialog-data="dialogData"
      page="role"
      ref="dialogRef"
      @submit="handleReset"
    >
      <template #permission>
        <el-tree
          :data="menus"
          :props="treeProp"
          show-checkbox
          node-key="_id"
          @check="handleCheck"
          ref="treeRef"
          :default-checked-keys="dialogData.menusIds"
        />
      </template>
    </PageDialog>
  </div>
</template>

<script lang="ts" setup>
import PageContent from '@/components/page-content/page-content.vue'
import PageDialog from '@/components/page-dialog/page-dialog.vue'
import { ElTree } from 'element-plus'
import { tableColumns } from './content.config'
import { roleDialogItems, treeProp } from './dialog.config'
import { computed, ref } from 'vue'
import { useStore } from '@/store'
import { IMenus } from '@/store/types'
const store = useStore()
const menus = computed(() => store.state.menus)

interface IRole {
  menusIds?: number[]
  name: string
  desc: string
  permission?: any[]
}

const dialogData = ref<IRole>({
  menusIds: [],
  name: '',
  desc: '',
})
const treeRef = ref<InstanceType<typeof ElTree>>()
const dialogRef = ref<InstanceType<typeof PageDialog>>()
const contentRef = ref<InstanceType<typeof PageContent>>()

function handleCheck(data: IMenus, checkedObj: any) {
  dialogData.value.menusIds = [].concat(
    checkedObj.checkedKeys,
    checkedObj.halfCheckedKeys
  )
  console.log(dialogData.value)
}

function handleSearch(formData: any) {
  contentRef.value?.getInfo(formData)
}
function handleReset() {
  contentRef.value?.getInfo()
}

function handleCreate(data: any) {
  dialogData.value = data
  if (dialogRef.value) {
    dialogRef.value.dialogVisible = true
  }
}

function handleEdit(data: any) {
  dialogData.value = data
  // defaultKeys.value = dialogData.value.permission.map(item => item._id)
  console.log(dialogData.value)
  dialogData.value.menusIds = dialogData.value?.permission?.map((item) => item._id)
  if (dialogRef.value) {
    dialogRef.value.dialogVisible = true
  }
}
</script>

<style lang="scss" scoped>
.tree {
  text-align: center;
}
</style>
