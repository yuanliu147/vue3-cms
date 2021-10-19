<template>
  <div ref="chartsRef" :style="style"></div>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts'
import { ref, onMounted, withDefaults, defineProps } from 'vue'

interface IStyle {
  height: string
  width: string
}

const chartsRef = ref<HTMLElement>()
const props = withDefaults(
  defineProps<{
    options: echarts.EChartsOption
    style?: IStyle
  }>(),
  {
    style: () => ({ height: '300px', width: '300px' }),
  }
)
onMounted(() => {
  const myCharts = echarts.init(chartsRef.value!)
  console.log(chartsRef.value, myCharts)
  myCharts.setOption(props.options)
})
</script>

<style lang="scss" scoped></style>
