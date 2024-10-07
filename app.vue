<script setup lang="ts">
const model = ref(0);
</script>

<template>
  <div class="min-h-screen bg-slate-100">
    <Counter v-model="model" />
  </div>
</template>
