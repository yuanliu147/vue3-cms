<template>
  <el-container class="home">
    <el-aside class="menus">
      <NavMenus />
    </el-aside>
    <el-container>
      <el-header class="header">
        <NavHeader />
      </el-header>
      <el-main class="content">
        <router-view v-slot="{ Component }">
          <transition name="el-fade-in-linear" mode="out-in">
            <component :is="Component"></component>
          </transition>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import NavMenus from '@/components/nav-menus/nav-menus.vue'
import NavHeader from '@/components/nav-header/nav-header.vue'
import { ElContainer, ElAside, ElHeader, ElMain } from 'element-plus'
</script>

<style lang="scss" scoped>
.home {
  height: 100vh;
  .menus {
    background-color: #052646;
    width: 200px;
  }
  .header {
    border-bottom: 1px solid #666;
    height: 60px;
    min-width: 400px;
  }
  .content {
    height: 100%;
    background-color: #eee;
    min-width: 400px;
  }
}
</style>
