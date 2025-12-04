<script setup lang="ts">
import type { Props as TheTopbarProps } from '~/components/TheTopbar.vue'
import { withBase } from './utils/url'

const user = ref<TheTopbarProps['user']>({
  username: 'John Doe',
  avatar: withBase('/avatar.png'),
  id: '1234567890',
  isVerified: false,
})
</script>

<template>
  <main class="container">
    <TheSidebar class="sidebar" />
    <div class="right">
      <TheTopbar class="topbar" :user="user" />
      <div class="content">
        <RouterView />
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.container {
  position: relative;

  .sidebar {
    position: absolute;
    height: 100%;
  }

  .right {
    margin-left: 240px;

    .content {
      margin-right: 16px;
      border-radius: 16px;
      background: #fafafa;
      padding: 28px 0;
      min-height: calc(100vh - 74px - 16px);
      box-sizing: border-box;
    }
  }
}
</style>
