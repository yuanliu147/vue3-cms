<template>
  <div class="nav-header">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' } as any">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="item of breadList" :key="item.name">
        {{ item.name }}
      </el-breadcrumb-item>
    </el-breadcrumb>
    <div class="content">
      <el-badge is-dot>
        <i class="el-icon-bell" />
      </el-badge>
      <div class="user">
        <HeaderUser />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import HeaderUser from './header-user.vue'
import { ElBreadcrumb, ElBreadcrumbItem, ElBadge } from 'element-plus'
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from '@/store'
import useBread from './use-bread'
const route = useRoute()
const store = useStore()
const currPath = computed(() => route.fullPath)
const menus = computed(() => store.state.menus)
const breadList = ref<any>([])
watch(
  currPath,
  (newPath: string) => {
    if (newPath === '/welcome') {
      breadList.value = [{ name: '欢迎使用' }]
    } else {
      breadList.value = useBread(menus, newPath)
    }
  },
  {
    immediate: true,
  }
)
</script>

<style lang="scss" scoped>
.nav-header {
  height: 100%;
  min-width: 400px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .content {
    display: flex;
    align-items: center;
    .user {
      margin-left: 25px;
    }
  }
}
</style>
