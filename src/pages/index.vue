<script setup lang="ts" generic="T extends any, O extends any">
defineOptions({
  name: 'IndexPage',
})

const router = useRouter()

function goHome() {
  router.push('/home/manage-my-page/become-a-creator')
}

goHome()
</script>

<template>
  <div />
</template>
