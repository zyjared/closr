<script setup lang="ts">
</script>

<template>
  <div class="home">
    <ThePaths class="paths" />

    <RouterView />
  </div>
</template>

<style lang="scss" scoped>
.home {
  margin: 0 auto;
  width: fit-content;
}

.paths {
  margin-bottom: 24px;
}
</style>
