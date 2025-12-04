<script setup lang="ts">
import { User as IconUser } from '@element-plus/icons-vue'

interface User {
  username?: string
  avatar?: string
  id?: string
  isVerified?: boolean // 是否已认证
}

export interface Props {
  user: User
}

defineProps<Props>()
</script>

<template>
  <div class="topbar">
    <div class="settings">
      <div class="user">
        <!-- 头像：若无则默认 -->
        <ElAvatar :src="user.avatar" :size="40" />

        <!-- 用户资料 -->
        <div class="info">
          <div class="username">
            <span class="username__text">{{ user.username || `user-${user.id}` }}</span>

            <IconVerified v-if="user.isVerified" class="zicon" />
            <IconUnverified v-else class="zicon" />
          </div>

          <div class="id">
            ID:{{ user.id }}
          </div>
        </div>
      </div>

      <!-- 下拉菜单 -->
      <IconBottom class="settings-more__icon" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.topbar {
  display: flex;
  align-items: center;
  justify-content: end;
  padding: 17px 36px 17px 16px;
  box-sizing: border-box;
}

.settings {
  display: flex;
  align-items: center;
  width: 188px;
  gap: 16px;

  .user {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;

    .info {
      width: 100px;
      display: flex;
      flex-direction: column;
      gap: 1px;

      .username {
        display: flex;
        align-items: center;
        gap: 7px;

        &__text {
          font-family: Gotham, sans-serif;
          font-weight: 500;
          font-size: 16px;
          letter-spacing: 0;
        }
      }

      .id {
        font-size: 12px;
        color: #bfbfbf;

        font-family: Gotham;
        font-weight: 400;
        font-size: 12px;
        line-height: 100%;
        letter-spacing: 0;
      }
    }
  }
}
</style>
