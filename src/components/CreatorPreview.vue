<script setup lang="ts">
import type { FormData as CreatorApplyFormData } from './CreatorApply.vue'

const { profile } = defineProps<{
  profile: CreatorApplyFormData
}>()
</script>

<template>
  <div class="creator-preview">
    <div class="bg">
      <img v-if="profile.background" :src="profile.background" alt="Background">
    </div>

    <div class="header">
      <div class="avatar">
        <el-avatar :size="140" :src="profile.avatar" shape="square" />
        <IconVerified class="verified" />
      </div>
      <div class="username">
        {{ profile.username || 'Please Enter' }}
      </div>
    </div>

    <div class="about-me">
      <div class="about-me-title">
        About Me
      </div>
      <div
        class="about-me-content"
        :class="{ empty: !profile.aboutMe }"
      >
        {{ profile.aboutMe || 'Please Enter' }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.creator-preview {
  // width: 393px;
  height: fit-content;
  box-sizing: border-box;
  padding: 20px;
  border-radius: 20px;
  background: #fff;
  overflow: hidden;
  position: relative;

  .bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 120px;
    background: #3278ff;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .header {
    position: relative;
    text-align: center;
    padding-top: 30px;

    .avatar {
      width: fit-content;
      margin: 0 auto;
      position: relative;

      .el-avatar {
        --el-avatar-bg-color: #fafafa;
        --el-avatar-border-radius: 12px;
        border: 1px dashed #eaeaea;
        box-sizing: border-box;
      }

      .verified {
        position: absolute;
        bottom: -4px;
        right: -10px;
        width: 32px;
        height: 32px;
      }
    }

    .username {
      padding-top: 12px;
      font-size: 26px;
      font-weight: 700;
    }
  }

  .about-me {
    margin-top: 36px;

    &-title {
      font-size: 24px;
      font-weight: 700;
      margin-bottom: 12px;
    }

    &-content {
      font-size: 16px;
      line-height: 1.35;

      &.empty {
        color: #808080;
      }
    }
  }
}
</style>
