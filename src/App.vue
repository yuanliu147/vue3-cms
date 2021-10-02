<template>
  <router-view v-slot="{ Component }">
    <transition name="el-fade-in-linear">
      <component :is="Component"></component>
    </transition>
  </router-view>
</template>

<style lang="scss"></style>
