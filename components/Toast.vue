<template>
  <div class="fixed right-5 top-5 z-50 space-y-3">
    <div
      v-for="(toast, index) in toasts"
      :key="toast.id"
      :class="`flex items-center px-4 py-2 rounded-lg shadow-lg text-white ${
        toast.type === 'SUCCESS'
          ? 'bg-green-500'
          : toast.type === 'ERROR'
            ? 'bg-red-500'
            : 'bg-gray-800'
      }`"
      class="animate-[toast_3s_ease_in_out]"
    >
      <span class="flex-1">{{ toast.message }}</span>
      <button
        class="ml-4 text-white hover:text-gray-300"
        @click="removeToast(index)"
      >
        &times;
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const { toasts, removeToast } = useToast();
</script>
