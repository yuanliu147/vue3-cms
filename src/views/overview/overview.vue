<template>
  <div>
    <PieCharts v-if="deptView.data.value.length" :view="deptView" title="部门人数分布" />
    <BarCharts v-if="roleView.data.value.length" :view="roleView" title="角色人数分布" />
  </div>
</template>

<script lang="ts" setup>
import PieCharts from '@/components/page-charts/pie-charts.vue'
import BarCharts from '@/components/page-charts/bar-charts.vue'
import useView from './use-view'

const { deptView, roleView, initData } = useView()
initData()
</script>

<style lang="scss" scoped></style>
