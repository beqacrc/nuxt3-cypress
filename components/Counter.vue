<script setup lang="ts">
interface Props {
  min?: number;
  max?: number;
}

const props = withDefaults(defineProps<Props>(), {
  min: -10,
  max: 10,
});

const modelValue = defineModel<number>({
  required: true,
});

const increment = () => {
  if (modelValue.value < (props.max ?? Infinity)) {
    modelValue.value++;
  }
};

const decrement = () => {
  if (modelValue.value > (props.min ?? -Infinity)) {
    modelValue.value--;
  }
};
</script>

<template>
  <div class="counter-wrapper flex items-center space-x-4">
    <button
      @click="decrement"
      data-cy="decrement"
      :disabled="modelValue <= min"
      class="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 disabled:opacity-50"
    >
      -
    </button>
    <span class="text-xl" data-cy="model-value">{{ modelValue }}</span>
    <button
      @click="increment"
      :disabled="modelValue >= max"
      data-cy="increment"
      class="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 disabled:opacity-50"
    >
      +
    </button>
  </div>
</template>
