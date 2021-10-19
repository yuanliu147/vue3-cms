<template>
  <ElCard>
    <h2>{{ title }}</h2>
    <MyCharts :options="options" :style="{ height: '300px', width: '400px' }" />
  </ElCard>
</template>

<script lang="ts" setup>
import { ElCard } from 'element-plus'
import * as echarts from 'echarts'
import MyCharts from '@/base-components/my-charts/my-charts.vue'
import { computed, defineProps } from 'vue'
import { IPieSeries } from './types'

const props = defineProps<{
  title: string
  view: IPieSeries
}>()
console.log(props.view.data.value.map((item) => item.name))
const options = computed<echarts.EChartsOption>(() => {
  return {
    xAxis: {
      type: 'category',
      data: props.view.data.value.map((item) => item.name),
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: props.view.data.value.map((item) => item.value),
        type: 'bar',
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)',
        },
      },
    ],
  }
})
</script>
