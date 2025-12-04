<script setup lang="ts">
interface SocialMedia {
  id: SocialMapKey
  name: string
  logo: string
  value?: string
}

interface FormData {
  url: string
  username: string
  aboutMe: string
  avatar: string
  background?: string
  socials: Required<SocialMedia>[]
  tags: string[]
}

const socialMap = {
  instagram: {
    id: 'instagram',
    name: 'Instagram',
    logo: '/logos/instagram.svg',
  },
  tiktok: {
    id: 'tiktok',
    name: 'TikTok',
    logo: '/logos/tiktok.svg',
  },
  youtube: {
    id: 'youtube',
    name: 'YouTube',
    logo: '/logos/youtube.svg',
  },
  x: {
    id: 'x',
    name: 'X',
    logo: '/logos/x.svg',
  },
  link: {
    id: 'link',
    name: 'Link',
    logo: '/logos/link.svg',
  },
} as const
type SocialMapKey = keyof typeof socialMap
const socialList = Object.values(socialMap)

const username = ref('')
const aboutMe = ref('')
const profileUrl = ref('')
const avatar = ref<string | null>(null)
const background = ref<string | null>(null)
const socials = ref<Required<SocialMedia>[]>([])
const tags = ref<string[]>([])


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

// 添加社交媒体
function addSocialMedia(id: SocialMapKey) {
  if (!socials.value) {
    socials.value = []
  }

  socials.value.push({
    id,
    name: socialMap[id].name,
    logo: socialMap[id].logo,
    value: '',
  })
}

// 确认社交媒体链接
function confirmSocialMedia(id: SocialMapKey) {
  // todo
}

// 删除社交媒体
function deleteSocialMedia(id: SocialMapKey) {
  // todo
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
        <label class="form-label">Choose your URL:</label>
        <div class="url-input-wrapper">
          <input v-model="profileUrl" placeholder="Closr.so/" class="url-input" />
        </div>
      </div>

      <!-- 2. Username -->
      <div class="form-item">
        <label class="form-label">Username:</label>
        <input v-model="username" placeholder="Please Enter" class="form-input" />
      </div>

      <!-- 3. Profile Background -->
      <div class="form-item">
        <label class="form-label">Profile Background:</label>
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
        <label class="form-label">About me:</label>
        <div class="about-me-section">
          <textarea placeholder="Please Enter"  />
          <div class="about-me-length">
            {{ aboutMe.length }} / {{ maxAboutMeLength }}
          </div>
        </div>
      </div>

      <!-- 5. Social Media -->
      <div class="form-item">
        <label class="form-label">Social Media:</label>
        <div class="social-media-section">
          <div class="social-icons-row">
            <div v-for="social in socialList" :key="social.id" class="social-icon-wrapper"
              @click="addSocialMedia(social.id )">
              <img :src="social.logo" alt="Social Icon" class="social-svg-icon">
            </div>
          </div>

          <!-- 社交媒体输入区域 -->
          <div class="social-inputs">
            <div v-for="social in socials" :key="social.id"
              class="social-input-item">
              <div class="social-input-header">
                <span class="social-name">{{ social.name }}</span>
                <el-button type="danger" size="small" text class="delete-btn"
                  @click="deleteSocialMedia(social.id )">
                  🗑️
                </el-button>
              </div>
              <div v-if="!social.value" class="social-input-content">
                <el-input v-model="social.value" placeholder="Please enter the link" class="social-url-input" />
                <el-button type="primary" size="small" class="confirm-btn" @click="confirmSocialMedia(social.id )">
                  Confirm
                </el-button>
                <div v-if="!social.value" class="error-message">
                  <span class="error-icon">✕</span>
                  This URL isn't available. Please try another.
                </div>
              </div>
              <div v-else-if="social.value" class="social-bound-url">
                {{ social.value }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 6. Tags -->
      <div class="form-item">
        <label class="form-label">Tags:</label>
        <div class="tags-section">
          <el-tag v-for="tag in tags" :key="tag" class="tag-item">
            {{ tag }}
          </el-tag>
        </div>
      </div>

      <!-- Continue Button -->
      <div class="form-actions">
        <el-button type="primary" size="large" class="continue-btn">
          Continue
        </el-button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@mixin flex-col {
  display: flex;
  flex-direction: column;
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

        input {
          position: absolute;
          top: 0;
          left: 0;
          opacity: 0;
          width: 100%;
          height: 100%;
          cursor: pointer;
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

    .social-media-section {
      .social-icons-row {
        display: flex;
        gap: 12px;
        margin-bottom: 20px;
      }
    }
  }
}
</style>
