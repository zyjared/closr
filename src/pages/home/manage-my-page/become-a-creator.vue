<script setup lang="ts">
import type { FormData as ApplyCreatorFormData } from '~/components/ApplyCreator.vue'
import { withBase } from '~/utils/url'

const formData = ref<ApplyCreatorFormData>({
  url: '',
  username: '',
  aboutMe: '',
  avatar: '',
  background: '',
  socials: [{
    id: 'instagram',
    name: 'Instagram',
    logo: withBase('/logos/instagram.svg'),
    value: 'https://www.instagram.com',
  }],
  tags: [],
})

watch(formData, (data) => {
  // eslint-disable-next-line no-console
  console.log(data)
}, { deep: true })
</script>

<template>
  <div class="container">
    <ApplyCreator v-model="formData" class="apply-creator" />

    <div class="" />
  </div>
</template>

<style lang="scss" scoped>
.apply-creator {
}
</style>
