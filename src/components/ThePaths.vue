<script setup lang="ts">
const route = useRoute()

/**
 * become-a-creator
 * -> Become A Creator
 */
function formatName(name: string) {
  return name.split('-')
    .map(n => n.charAt(0).toUpperCase() + n.slice(1))
    .join(' ')
}

const paths = computed(() => {
  return route.path
    .split('/')
    .filter(Boolean)
    .map(formatName)
})
</script>

<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item v-for="path in paths" :key="path">
      {{ path }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<style lang="scss" scoped>
.el-breadcrumb {
  &__inner {
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0;
  }

  :deep(.el-breadcrumb__item:last-of-type .el-breadcrumb__inner) {
    font-weight: 700 !important;
  }
}
</style>
