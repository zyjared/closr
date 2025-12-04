<script setup lang="ts">
import { APP_NAME } from '~/constants'
import IconHome from './icons/IconHome.vue'
import IconMessage from './icons/IconMessage.vue'
import IconOrder from './icons/IconOrder.vue'

const menus = [
  {
    label: 'Home',
    path: '/home/manage-my-page/become-a-creator',
    icon: IconHome,
  },
  {
    label: 'Order',
    path: '/order',
    icon: IconOrder,
  },
  {
    label: 'Message',
    path: '/message',
    icon: IconMessage,
  },
]

const route = useRoute()

function isActive(path: string) {
  if (path === '/')
    return route.path === '/'
  return route.path.startsWith(path)
}
</script>

<template>
  <aside class="sidebar">
    <div class="logo">
      <div class="logo-text">
        {{ APP_NAME }}
      </div>
    </div>
    <nav class="nav">
      <router-link
        v-for="item in menus"
        :key="item.path"
        :to="item.path"
        class="nav-item"
        :class="{ active: isActive(item.path) }"
      >
        <div class="nav-icon">
          <component :is="item.icon" />
        </div>
        <span class="nav-label">{{ item.label }}</span>
      </router-link>
    </nav>
  </aside>
</template>

<style lang="scss" scoped>
.sidebar {
  width: 240px;
}

.logo {
  height: 74px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;

  &-text {
    height: 34px;
    font: Gotham, sans-serif;
    font-weight: 700;
    font-size: 28px;
    letter-spacing: 0;
  }
}

.nav {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0 30px;

  &-icon {
    width: 20px;
    height: 20px;
  }

  &-item {
    display: flex;
    gap: 8px;
    height: 40px;
    align-items: center;
    padding: 10px 16px;
    border-radius: 8px;
    text-decoration: none;
    color: #1f1f1f;
    box-sizing: border-box;

    &.active {
      background: #1f1f1f;
      color: #fff;
    }
  }
}
</style>
