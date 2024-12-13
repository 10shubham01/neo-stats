<template>
  <div>
    <canvas ref="canvas" />
  </div>
</template>

<script setup lang="ts">
import Chart from 'chart.js/auto';

const props = defineProps<{
  labels: string[];
  data: number[];
  title: string;
}>();

const canvas = ref<HTMLCanvasElement | null>(null);
let chart: Chart | null = null;

onMounted(() => {
  if (canvas.value) {
    chart = new Chart(canvas.value, {
      type: 'line',
      data: {
        labels: props.labels,
        datasets: [
          {
            label: props.title,
            data: props.data,
            borderColor: '#4A90E2',
            tension: 0.4,
          },
        ],
      },
    });
  }
});

watch(props, () => {
  if (chart) {
    chart.data.labels = props.labels;
    chart.data.datasets[0].data = props.data;
    chart.update();
  }
});
</script>
