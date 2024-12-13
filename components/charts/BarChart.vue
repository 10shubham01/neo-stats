<template>
  <div class="h-fit bg-white pb-32 sm:pb-0">
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
      type: 'bar',
      data: {
        labels: props.labels,
        datasets: [
          {
            label: props.title,
            data: props.data,
            backgroundColor: 'red',
            borderColor: 'red',
            borderWidth: 1,
            hoverBackgroundColor: 'red',

          },
        ],

      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'top' },
        },
        scales: {
          x: { beginAtZero: true },
          y: { beginAtZero: true },
        },
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
