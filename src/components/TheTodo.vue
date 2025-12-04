<script setup lang="ts">
defineProps<{
  desc?: string
}>()
</script>

<template>
  <div class="todo">
    <h2>
      Todo
    </h2>
    <p v-if="desc">
      {{ desc }}
    </p>
  </div>
</template>

<style lang="scss" scoped>
.todo {
  height: 100%;
  font-size: 42px;
  font-weight: 700;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h2 {
    margin: 0 0 12px 0;
  }

  p {
    font-size: 16px;
    margin: 0;
    color: #666;
  }
}
</style>
