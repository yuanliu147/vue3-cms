<template>
  <ElCard>
    <h2>{{ title }}</h2>
    <MyCharts :options="options" />
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

const options = computed<echarts.EChartsOption>(() => {
  return {
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'horizontal',
      left: 'left',
    },
    series: [
      {
        name: props.view?.name,
        type: 'pie',
        radius: props.view?.radius,
        data: props.view?.data.value,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  }
})
</script>
