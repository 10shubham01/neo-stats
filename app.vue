<template>
  <div>
    <h1 class="bg-red-500 text-3xl font-bold underline">
      Hello world!
    </h1>
    {{ }}
  </div>
</template>

<script lang="ts" setup>
async function getData() {
  try {
    const data = await useAxios({ baseURL: 'custom' }).$get(`/todos/1`);
    const data1 = await useAxios().$get(`/todos/1`);

    console.log(data, data1);
  }
  catch {

  }
}

getData();
</script>
