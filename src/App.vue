<template>
  <ElConfigProvider :locale="zhCn">
    <router-view> </router-view>
  </ElConfigProvider>
  
</template>

<script lang="ts" setup>
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
</script>

<style lang="scss"></style>
