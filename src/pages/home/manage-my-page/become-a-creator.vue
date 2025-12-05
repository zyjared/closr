<script setup lang="ts">
import type { FormData as CreatorApplyFormData } from '~/components/CreatorApply.vue'
import { withBase } from '~/utils/url'

const formData = reactive<CreatorApplyFormData>({
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
    <CreatorApply v-model="formData" class="apply" />
    <CreatorPreview :profile="formData" class="preview" />
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  gap: 16px;
  width: 100%;

  .apply {
    flex: 1;
    max-width: 665px;
  }

  .preview {
    width: 393px;
  }
}
</style>
