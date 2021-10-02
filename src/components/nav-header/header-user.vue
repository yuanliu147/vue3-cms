<template>
  <div class="header-user">
    <el-avatar class="avatar" :size="25" :src="userInfo.avatar"> </el-avatar>
    <el-dropdown>
      <span class="el-dropdown-link">
        {{ userInfo.name }}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="handleSelf">用户信息</el-dropdown-item>
          <el-dropdown-item divided @click="handleLogout"
            >退出登录</el-dropdown-item
          >
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <PageDialog
      :dialog-data="userInfo"
      :dialog-items="dialogItems"
      :rules="rules"
      page="user"
      :id="userInfo._id"
      :load-data="loadData"
      :otherConfig="otherConfig"
      v-if="userInfo._id"
      ref="dialogRef"
    >
      <el-upload
        :action="uploadUrl"
        name="avatar"
        :show-file-list="false"
        :on-success="uploadSuccess"
        class="upload"
        accept="image/*"
        :headers="headers"
      >
        <el-avatar class="avatar-img" :size="80" :src="userInfo.avatar" />
      </el-upload>
    </PageDialog>
  </div>
</template>

<script lang="ts" setup>
import router from '@/router'
import {
  ElDropdown,
  ElAvatar,
  ElDropdownMenu,
  ElDropdownItem,
  ElUpload,
} from 'element-plus'
import { BASE_URL } from '@/service/base/config'
import { useStore } from '@/store'
import storage from '@/utils/storage'
import { ElMessage } from 'element-plus'
import { computed, ref } from 'vue'
import PageDialog from '../page-dialog/page-dialog.vue'
import { dialogItems, rules } from './dialog.config'
const store = useStore()
const dialogRef = ref<InstanceType<typeof PageDialog>>()

const userInfo = computed(() => store.state.loginModule.userInfo)
const token = computed(() => store.state.loginModule.token)
const headers = computed(
  () => ({ Authorization: `Bearer ${token.value}` } as any)
)
const uploadUrl = computed(() => `${BASE_URL}/upload/avatar`)

const otherConfig = {
  labelWidth: '70px',
  size: 'mini',
  hideRequiredAsterisk: true,
}

const handleLogout = () => {
  store.commit('loginModule/setUserInfo', {})
  storage.clearItem('userInfo')
  router.replace('/login')
}
const handleSelf = () => {
  // #父组件怎么获取子组件并且有expose里面的提示呀
  if (dialogRef.value) {
    ;(dialogRef.value as any).dialogVisible = true
  }
}
const uploadSuccess = async () => {
  const success = await store.dispatch(
    'loginModule/getUserInfo',
    userInfo.value._id
  )
  success && ElMessage.success('更换成功~')
}
const loadData = async () => {
  const success = await store.dispatch(
    'loginModule/getUserInfo',
    userInfo.value._id
  )
  success && ElMessage.success('更新成功~')
}
</script>

<style lang="scss" scoped>
.header-user {
  display: flex;
  align-items: center;
  .avatar {
    margin-right: 5px;
  }

  .upload {
    text-align: center;
    .avatar-img {
      margin: 10px auto;
      display: block;
      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>
