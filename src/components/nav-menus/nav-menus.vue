<template>
  <div class="nav-menu">
    <div class="header">
      <img class="img" src="@/assets/logo.svg" />
      <h2 class="title">vue3 cms</h2>
    </div>
    <el-menu
      :default-active="activeMenu"
      background-color="#052646"
      text-color="#eee"
      active-text-color="#097ae9"
      router
      :style="{ border: 'none' }"
    >
      <template v-for="menu of menus" :key="menu._id">
        <el-sub-menu v-if="menu.type === 1" :index="menu.path">
          <template #title>
            <i :class="menu.icon" />
            <span>{{ menu.name }}</span>
          </template>
          <el-menu-item
            v-for="item of menu.children"
            :key="item._id"
            :index="item.path"
          >
            {{ item.name }}
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item v-else-if="menu.type === 2" :index="menu.path">
          {{ menu.name }}
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useStore } from '@/store'
import { computed } from 'vue'
import { ElMenu, ElSubMenu, ElMenuItem } from 'element-plus'
const store = useStore()
const route = useRoute()
const menus = computed(() => store.state.menus)
const activeMenu = computed(() => route.fullPath)
</script>

<style lang="scss" scoped>
.nav-menu {
  width: 100%;
  border: none;
  background-color: #052646;
  .header {
    display: flex;
    align-items: center;
    overflow: hidden;
    padding: 5px 10px;
    .img {
      width: 40px;
      height: 40px;
      margin-right: 10px;
    }
    .title {
      color: #0080ff;
      white-space: nowrap;
      font-size: 16px;
    }
  }
}
</style>
