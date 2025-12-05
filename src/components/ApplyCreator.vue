<script setup lang="ts">
import type { Social } from './SocialList.vue'
import { withBase } from '~/utils/url'

// interface FormData {
//   url: string
//   username: string
//   aboutMe: string
//   avatar: string
//   background?: string
//   socials: Required<SocialMedia>[]
//   tags: string[]
// }

const username = ref('')
const aboutMe = ref('')
const profileUrl = ref('')
const avatar = ref<string | null>(null)
const background = ref<string | null>(null)
const socials = ref<Required<Social>[]>([
  {
    id: 'instagram',
    name: 'Instagram',
    logo: withBase('/logos/instagram.svg'),
    value: 'https://www.instagram.com',
  },
])
const tags = ref<string[]>([])

const presetTags = [
  '🤖 Health maintenance',
  '🍚 Food travel',
  '🎯 Art design',
  '🏀 Sport',
  '🎹 Travel',
]

// 最大 about me 长度
const maxAboutMeLength = 500

// 头像上传
function handleAvatarUpload(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    avatar.value = URL.createObjectURL(file)
  }
}

// 背景上传
function handleBackgroundUpload(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    background.value = URL.createObjectURL(file)
  }
}

// 操作 tag 选中状态
function toggleTag(tag: string) {
  if (tags.value.includes(tag)) {
    tags.value = tags.value.filter(t => t !== tag)
  }
  else {
    tags.value.push(tag)
  }
}
</script>

<template>
  <div class="container">
    <div class="header">
      Become a creator
    </div>

    <div class="form">
      <!-- 1. Choose your URL -->
      <div class="form-item">
        <label class="form-label">Choose your URL</label>
        <div class="url-input-wrapper">
          <input v-model="profileUrl" placeholder="Closr.so/" class="url-input">
        </div>
      </div>

      <!-- 2. Username -->
      <div class="form-item">
        <label class="form-label">Username</label>
        <input v-model="username" placeholder="Please Enter" class="form-input">
      </div>

      <!-- 3. Profile Background -->
      <div class="form-item">
        <label class="form-label">Profile Background</label>
        <div class="upload-section">
          <div class="upload-box">
            <input type="file" accept="image/*" class="file-input" @change="handleAvatarUpload">
            <div class="upload-placeholder">
              <IconPlus v-if="!avatar" class="zicon" />
              <img v-else :src="avatar" alt="Avatar" class="upload-preview">
            </div>
          </div>
          <div class="upload-box">
            <input type="file" accept="image/*" class="file-input" @change="handleBackgroundUpload">
            <div class="upload-placeholder">
              <IconPlus v-if="!background" class="zicon" />
              <img v-else :src="background" alt="Background" class="upload-preview">
            </div>
          </div>
        </div>
      </div>

      <!-- 4. About me -->
      <div class="form-item">
        <label class="form-label">About me</label>
        <div class="about-me-section">
          <textarea placeholder="Please Enter" />
          <div class="about-me-length">
            {{ aboutMe.length }} / {{ maxAboutMeLength }}
          </div>
        </div>
      </div>

      <!-- 5. Social Media -->
      <div class="form-item">
        <label class="form-label">Social Media</label>
        <div class="social-media-section">
          <SocialList v-model="socials" />
        </div>
      </div>

      <!-- 6. Tags -->
      <div class="form-item">
        <label class="form-label">Tags</label>
        <div class="tags-section">
          <span
            v-for="tag in presetTags"
            :key="tag"
            class="tag"
            type="info"
            :class="{ active: tags.includes(tag) }"
            @click="toggleTag(tag)"
          >
            {{ tag }}
          </span>
        </div>
      </div>

      <!-- Continue Button -->
      <div class="form-actions">
        <button class="continue">
          Continue
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@mixin flex-col {
  display: flex;
  flex-direction: column;
}

@mixin flex-row {
  display: flex;
  flex-direction: row;
}

.container {
  width: 665px;
  padding: 20px;
  border-radius: 20px;
  background: #fff;
  box-sizing: border-box;
}

.header {
  margin-bottom: 36px;
  font-weight: 700;
  font-size: 24px;
  letter-spacing: 0px;
}

.form {
  @include flex-col;
  gap: 20px;

  // 左侧进度计数器
  counter-reset: form-item;

  .form-item {
    @include flex-col;
    gap: 12px;

    .label {
      font-weight: 700;
      font-size: 20px;
      line-height: 1.35;
      letter-spacing: 0;
      color: #1f1f1f;
    }

    input,
    .about-me-section {
      font-weight: 400;
      font-size: 14px;
      letter-spacing: 0;
      padding: 16px 12px;
      border-radius: 12px;
      height: 48px;
      background: #fafafa;
      // color: #bfbfbf;
      width: 100%;
      outline: none;
      border: none;
      box-sizing: border-box;
    }

    input::placeholder,
    textarea::placeholder {
      color: #bfbfbf;
    }

    .upload-section {
      display: flex;
      gap: 16px;

      .upload-box {
        position: relative;
        // background: #fafafa;
        color: #bfbfbf;
        border-radius: 12px;
        border: 1px dashed #eaeaea;
        height: 120px;
        width: 120px;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;

        input {
          position: absolute;
          top: 0;
          left: 0;
          opacity: 0;
          width: 100%;
          height: 100%;
          cursor: pointer;
        }

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      .upload-box:nth-child(2) {
        flex: 1;
      }
    }

    .about-me-section {
      padding: 13px;
      height: fit-content;

      textarea {
        resize: none;
        font-size: 14px;
        line-height: 18px;
        border: none;
        outline: none;
        // color: #ccc;
        width: 100%;
        padding: 0;
        height: 72px;
        background-color: transparent;
      }

      .about-me-length {
        padding-top: 10px;
        font-size: 12px;
        color: #ccc;
        text-align: right;
        font-size: 12px;
      }
    }

    .tags-section {
      @include flex-row;
      flex-wrap: wrap;
      gap: 12px;
      font-size: 14px;

      .tag {
        display: block;
        cursor: pointer;
        padding: 12px;
        border-radius: 12px;
        background: #fafafa;
        border: 1px solid transparent;
        box-sizing: border-box;

        &.active {
          border: 1px solid #1f1f1f;
        }
      }
    }

    // 左侧进度
    position: relative;
    counter-increment: form-item;
    padding-left: 40px; // 序号宽 + 间距 16px

    &::before {
      position: absolute;
      left: 0;
      top: 0;
      content: counter(form-item);
      display: inline-block;
      margin-right: 12px;
      font-size: 16px;
      width: 28px;
      height: 28px;
      text-align: center;
      background: #fafafa;
      border-radius: 50%;
      border: 1px solid #979797;
      box-sizing: border-box;
    }

    &::after {
      content: '';
      position: absolute;
      // 100% - 序号高 28px - 间距 20px - 优化 2px
      // 优化 2px ，使得上下多偏移 1px
      height: calc(100% - 10px);
      left: 14px;
      top: 29px;
      width: 1px;
      border-left: 1px dashed #eaeaea;
    }

    &:nth-last-child(2)::after {
      display: none;
    }
  }

  .form-actions {
    padding-left: 40px;

    .continue {
      height: 42px;
      padding: 12px 48px;
      font-size: 14px;
      background-color: #3478ff;
      color: #fff;
      border-radius: 52px;
      outline: none;
      border: none;
      cursor: pointer;
    }
  }
}
</style>
