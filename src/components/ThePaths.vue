<script setup lang="ts">
const route = useRoute()

// manager-my-page/become-a-creator
// -> [Manager My Page Become A Creator]

function formateName(name: string) {
  return name.split('-')
    .map(n => n.charAt(0).toUpperCase() + n.slice(1))
    .join(' ')
}

const paths = computed(() => {
  return route.path
    .split('/')
    .filter(Boolean)
    .map(p => formateName(p))
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
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0;
}
</style>
