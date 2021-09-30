<template>
  <div class="header-user">
    <el-avatar class="avatar" :size="25" icon="el-icon-user-solid"> </el-avatar>
    <el-dropdown>
      <span class="el-dropdown-link">
        {{ name }}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>用户信息</el-dropdown-item>
          <el-dropdown-item divided @click="handleLogout"
            >退出登录</el-dropdown-item
          >
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts" setup>
import router from '@/router'
import { useStore } from '@/store'
import storage from '@/utils/storage'
import { computed } from 'vue'
const store = useStore()
const name = computed(() => store.state.loginModule.userInfo.name)
const handleLogout = () => {
  store.commit('loginModule/setUserInfo', {})
  storage.clearItem('userInfo')
  router.replace('/login')
}
</script>

<style lang="scss" scoped>
.header-user {
  display: flex;
  align-items: center;
  .avatar {
    margin-right: 5px;
  }
}
</style>
