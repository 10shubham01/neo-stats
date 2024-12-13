<template>
  <div class="relative flex h-screen flex-col overflow-scroll">
    <div class="absolute top-0 -z-10 h-1/2 w-full overflow-hidden">
      <img src="/public/world-globe-america 1.svg" alt="world-globe" class="absolute -top-1/2 sm:top-[-280%]" :class="loading ? 'animate-spin' : 'animate-none'">
    </div>
    <h1 class="z-10 mb-6 mt-20 text-center text-xl font-bold text-white sm:text-3xl">
      Journey Through Space <br> <span class="text-sm sm:text-lg"> Pick Your Start and End Dates for Neo Stats!</span>
    </h1>
    <div class="flex justify-between px-10 sm:px-20">
      <date-picker v-model="dateValue" :formatter="{ date: 'YYYY-MM-DD', month: 'MMM' }" separator=" to " placeholder="Select Start Date and End Date" as-single use-range />
      <button class="mx-2 rounded-lg border bg-blue-700 px-10 text-white disabled:opacity-55" :disabled="!dateValue.startDate" @click="fetchAsteroids">
        Submit
      </button>
    </div>
    <div v-if="!loading && data" class="z-20  mt-10 p-10 sm:mb-10 sm:p-20">
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <div class="rounded-lg bg-white p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl">
          <h2 class="text-xl font-semibold text-gray-700">
            Fastest Asteroid
          </h2>
          <p class="text-gray-600">
            ID: {{ fastestAsteroid?.id || 'N/A' }}
          </p>
          <p class="text-gray-600">
            Speed: {{ fastestAsteroid?.speed || 'N/A' }} km/h
          </p>
        </div>
        <div class="rounded-lg bg-white p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl">
          <h2 class="text-xl font-semibold text-gray-700">
            Closest Asteroid
          </h2>
          <p class="text-gray-600">
            ID: {{ closestAsteroid?.id || 'N/A' }}
          </p>
          <p class="text-gray-600">
            Distance: {{ closestAsteroid?.distance || 'N/A' }} km
          </p>
        </div>
        <div class="rounded-lg bg-white p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl">
          <h2 class="text-xl font-semibold text-gray-700">
            Average Asteroids Size
          </h2>
          <p class="text-gray-600">
            {{ averageSize || 'N/A' }} km
          </p>
        </div>
      </div>

      <ChartsBarChart
        :labels="chartLabels"
        :data="chartData"
        title="Number of Asteroids Per Day"
        class="mt-8"
      />
    </div>
    <div v-if="!data" class=" mt-10 bg-gradient-to-b from-black to-white bg-clip-text px-4 text-center text-3xl font-bold  text-transparent sm:px-20 sm:text-8xl">
      <h1>Unlock cosmic secrets and see what the asteroids have been up to in your chosen time frame!</h1>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Asteroid, AsteroidData } from '~/types';

const { $get } = useAxios();
const { raiseToast } = useToast();
const data = ref<AsteroidData | null>(null);
const loading = ref(false);
const error = ref<string | null>(null);
const dateValue = ref({
  startDate: '',
  endDate: '',
});

async function fetchAsteroids() {
  loading.value = true;
  try {
    const response = await $get<AsteroidData>(`/rest/v1/feed?START_DATE=${dateValue.value.startDate}&END_DATE=${dateValue.value.endDate}`);
    data.value = response;
  }
  catch (err: any) {
    raiseToast(error.value = err.message || 'Failed to load asteroid data', 'ERROR');
  }
  finally {
    loading.value = false;
  }
}

const chartLabels = computed(() =>
  data.value
    ? Object.keys(data.value.near_earth_objects)
    : [],
);
const chartData = computed(() =>
  chartLabels.value.map(date =>
    data.value?.near_earth_objects[date]?.length || 0,
  ),
);

const fastestAsteroid = computed((): Asteroid | null => {
  if (!data.value)
    return null;
  let maxSpeed = 0;
  let asteroid = null;

  for (const date of Object.keys(data.value.near_earth_objects)) {
    for (const obj of data.value.near_earth_objects[date]) {
      const speed = Number.parseFloat(obj.close_approach_data[0].relative_velocity.kilometers_per_hour);
      if (speed > maxSpeed) {
        maxSpeed = speed;
        asteroid = {
          id: obj.id,
          name: obj.name,
          speed: maxSpeed,
        };
      }
    }
  }
  return asteroid;
});

const closestAsteroid = computed((): Asteroid | null => {
  if (!data.value)
    return null;
  let minDistance = Infinity;
  let asteroid = null;

  for (const date of Object.keys(data.value.near_earth_objects)) {
    for (const obj of data.value.near_earth_objects[date]) {
      const distance = Number.parseFloat(obj.close_approach_data[0].miss_distance.kilometers);
      if (distance < minDistance) {
        minDistance = distance;
        asteroid = {
          id: obj.id,
          name: obj.name,
          distance: minDistance,
        };
      }
    }
  }
  return asteroid;
});

const averageSize = computed((): string | null => {
  if (!data.value)
    return null;
  let totalSize = 0;
  let count = 0;

  for (const date of Object.keys(data.value.near_earth_objects)) {
    for (const obj of data.value.near_earth_objects[date]) {
      const minDiameter = obj.estimated_diameter.kilometers.estimated_diameter_min;
      const maxDiameter = obj.estimated_diameter.kilometers.estimated_diameter_max;
      totalSize += (minDiameter + maxDiameter) / 2;
      count++;
    }
  }
  return count > 0 ? (totalSize / count).toFixed(2) : 'N/A';
});
</script>
