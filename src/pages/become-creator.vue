<script setup lang="ts">
defineOptions({
  name: 'BecomeCreatorPage',
})

interface SocialMedia {
  id: string
  name: string
  icon: string
  url: string
  isBound: boolean
  isNew: boolean
  isError: boolean
}

// 社交媒体图标 SVG
const socialIcons: Record<string, string> = {
  instagram: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
  tiktok: 'M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z',
  youtube: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
  twitter: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
  link: 'M13.828 7.172a4 4 0 0 1 0 5.656l-4.95 4.95a4 4 0 0 1-5.657-5.657l.707-.707 4.243 4.243a2 2 0 0 0 2.828-2.828L6.586 9.172a2 2 0 0 0-2.828 2.828l.707.707-4.243 4.243a4 4 0 0 1-5.657-5.657l4.95-4.95a4 4 0 0 1 5.657 0z',
}

const username = ref('')
const aboutMe = ref('')
const profileUrl = ref('')
const avatarUrl = ref('')
const backgroundUrl = ref('')
const avatarFile = ref<File | null>(null)
const backgroundFile = ref<File | null>(null)

const socialMediaList = ref<SocialMedia[]>([
  { id: 'instagram', name: 'Instagram', icon: 'instagram', url: '', isBound: false, isNew: false, isError: false },
  { id: 'tiktok', name: 'TikTok', icon: 'tiktok', url: '', isBound: false, isNew: false, isError: false },
  { id: 'youtube', name: 'YouTube', icon: 'youtube', url: '', isBound: false, isNew: false, isError: false },
  { id: 'twitter', name: 'X', icon: 'twitter', url: '', isBound: false, isNew: false, isError: false },
  { id: 'link', name: 'Link', icon: 'link', url: '', isBound: false, isNew: false, isError: false },
])

const tags = ref<string[]>(['Health maintenance', 'Food travel', 'Art design', 'Sport', 'Travel'])
const maxAboutMeLength = 500

// 处理头像上传
function handleAvatarUpload(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    avatarFile.value = file
    avatarUrl.value = URL.createObjectURL(file)
  }
}

// 处理背景上传
function handleBackgroundUpload(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    backgroundFile.value = file
    backgroundUrl.value = URL.createObjectURL(file)
  }
}

// 添加社交媒体
function addSocialMedia(id: string) {
  const social = socialMediaList.value.find(s => s.id === id)
  if (social && !social.isBound) {
    social.isNew = true
    social.url = ''
  }
}

// 确认社交媒体链接
function confirmSocialMedia(id: string) {
  const social = socialMediaList.value.find(s => s.id === id)
  if (social) {
    if (!social.url || social.url.trim() === '') {
      social.isError = true
      return
    }
    social.isBound = true
    social.isNew = false
    social.isError = false
  }
}

// 删除社交媒体
function deleteSocialMedia(id: string) {
  const social = socialMediaList.value.find(s => s.id === id)
  if (social) {
    social.isBound = false
    social.url = ''
    social.isNew = false
    social.isError = false
  }
}

// 获取社交媒体图标类名
function getSocialIconClass(id: string) {
  const social = socialMediaList.value.find(s => s.id === id)
  if (social?.isBound) {
    return 'social-icon-bound'
  }
  return 'social-icon'
}
</script>

<template>
  <div class="become-creator-page">
    <div class="page-container">
      <h1 class="page-title">
        Become a creator
      </h1>

      <div class="content-wrapper">
        <!-- 左侧表单区域 -->
        <div class="form-section">
          <!-- Choose your URL -->
          <div class="form-item">
            <label class="form-label">Choose your URL:</label>
            <div class="url-input-wrapper">
              <span class="url-prefix">Closr.so/</span>
              <el-input
                v-model="profileUrl"
                placeholder="Please Enter"
                class="url-input"
              />
            </div>
          </div>

          <!-- Username -->
          <div class="form-item">
            <label class="form-label">Username:</label>
            <el-input
              v-model="username"
              placeholder="Please Enter"
              class="form-input"
            />
          </div>

          <!-- Profile Background -->
          <div class="form-item">
            <label class="form-label">Profile Background:</label>
            <div class="upload-section">
              <div class="upload-box">
                <input
                  type="file"
                  accept="image/*"
                  class="file-input"
                  @change="handleAvatarUpload"
                >
                <div class="upload-placeholder">
                  <span v-if="!avatarUrl" class="upload-icon">+</span>
                  <img v-else :src="avatarUrl" alt="Avatar" class="upload-preview">
                </div>
              </div>
              <div class="upload-box">
                <input
                  type="file"
                  accept="image/*"
                  class="file-input"
                  @change="handleBackgroundUpload"
                >
                <div class="upload-placeholder">
                  <span v-if="!backgroundUrl" class="upload-icon">+</span>
                  <img v-else :src="backgroundUrl" alt="Background" class="upload-preview">
                </div>
              </div>
            </div>
          </div>

          <!-- About me -->
          <div class="form-item">
            <label class="form-label">About me:</label>
            <el-input
              v-model="aboutMe"
              type="textarea"
              :rows="6"
              placeholder="Please Enter"
              :maxlength="maxAboutMeLength"
              show-word-limit
              class="form-textarea"
            />
          </div>

          <!-- Social Media -->
          <div class="form-item">
            <label class="form-label">Social Media:</label>
            <div class="social-media-section">
              <div class="social-icons-row">
                <div
                  v-for="social in socialMediaList"
                  :key="social.id"
                  class="social-icon-wrapper"
                  @click="addSocialMedia(social.id)"
                >
                  <div :class="getSocialIconClass(social.id)">
                    <svg
                      v-if="socialIcons[social.icon]"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      class="social-svg-icon"
                    >
                      <path :d="socialIcons[social.icon]" />
                    </svg>
                    <span v-else class="social-text-icon">{{ social.name.charAt(0) }}</span>
                  </div>
                </div>
              </div>

              <!-- 社交媒体输入区域 -->
              <div class="social-inputs">
                <div
                  v-for="social in socialMediaList.filter(s => s.isBound || s.isNew)"
                  :key="social.id"
                  class="social-input-item"
                >
                  <div class="social-input-header">
                    <svg
                      v-if="socialIcons[social.icon]"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      class="social-header-icon"
                    >
                      <path :d="socialIcons[social.icon]" />
                    </svg>
                    <span v-else class="social-header-text">{{ social.name.charAt(0) }}</span>
                    <span class="social-name">{{ social.name }}</span>
                    <el-button
                      v-if="social.isBound"
                      type="danger"
                      size="small"
                      text
                      class="delete-btn"
                      @click="deleteSocialMedia(social.id)"
                    >
                      🗑️
                    </el-button>
                  </div>
                  <div v-if="social.isNew" class="social-input-content">
                    <el-input
                      v-model="social.url"
                      placeholder="Please enter the link"
                      class="social-url-input"
                    />
                    <el-button
                      type="primary"
                      size="small"
                      class="confirm-btn"
                      @click="confirmSocialMedia(social.id)"
                    >
                      Confirm
                    </el-button>
                    <div v-if="social.isError" class="error-message">
                      <span class="error-icon">✕</span>
                      This URL isn't available. Please try another.
                    </div>
                  </div>
                  <div v-else-if="social.isBound" class="social-bound-url">
                    {{ social.url }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Tags -->
          <div class="form-item">
            <label class="form-label">Tags:</label>
            <div class="tags-section">
              <el-tag
                v-for="tag in tags"
                :key="tag"
                class="tag-item"
              >
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

        <!-- 右侧预览区域 -->
        <div class="preview-section">
          <div class="preview-card">
            <div
              v-if="backgroundUrl"
              class="preview-background"
              :style="{ backgroundImage: `url(${backgroundUrl})` }"
            />
            <div class="preview-content">
              <div class="preview-avatar-wrapper">
                <img
                  v-if="avatarUrl"
                  :src="avatarUrl"
                  alt="Avatar"
                  class="preview-avatar"
                >
                <div v-else class="preview-avatar-placeholder">
                  Please Enter
                </div>
              </div>
              <div v-if="username" class="preview-username">
                {{ username }}
              </div>
              <div v-if="aboutMe" class="preview-about">
                <h3 class="preview-about-title">
                  About me
                </h3>
                <p class="preview-about-text">
                  {{ aboutMe }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.become-creator-page {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 40px 20px;

  .page-container {
    max-width: 1400px;
    margin: 0 auto;
  }

  .page-title {
    font-size: 32px;
    font-weight: 600;
    color: #333;
    margin-bottom: 40px;
  }

  .content-wrapper {
    display: grid;
    grid-template-columns: 1fr 400px;
    gap: 40px;
    align-items: start;
  }

  .form-section {
    background: white;
    border-radius: 12px;
    padding: 40px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .form-item {
    margin-bottom: 32px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .form-label {
    display: block;
    font-size: 16px;
    font-weight: 500;
    color: #333;
    margin-bottom: 12px;
  }

  .url-input-wrapper {
    display: flex;
    align-items: center;
    border: 2px solid #9333ea;
    border-radius: 8px;
    padding: 0 4px;
    background: white;

    .url-prefix {
      padding: 0 12px;
      color: #666;
      font-size: 14px;
    }

    .url-input {
      flex: 1;
      border: none;

      :deep(.el-input__wrapper) {
        box-shadow: none;
        border: none;
      }
    }
  }

  .form-input,
  .form-textarea {
    width: 100%;

    :deep(.el-input__wrapper),
    :deep(.el-textarea__inner) {
      border-radius: 8px;
    }
  }

  .upload-section {
    display: flex;
    gap: 16px;
  }

  .upload-box {
    position: relative;
    width: 120px;
    height: 120px;
    border: 2px dashed #ddd;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      border-color: #9333ea;
    }

    .file-input {
      position: absolute;
      width: 100%;
      height: 100%;
      opacity: 0;
      cursor: pointer;
    }

    .upload-placeholder {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f9f9f9;
      border-radius: 6px;
    }

    .upload-icon {
      font-size: 32px;
      color: #999;
    }

    .upload-preview {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 6px;
    }
  }

  .social-media-section {
    .social-icons-row {
      display: flex;
      gap: 12px;
      margin-bottom: 20px;
    }

    .social-icon-wrapper {
      cursor: pointer;
    }

    .social-icon {
      width: 48px;
      height: 48px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f0f0f0;
      color: #666;
      transition: all 0.3s;

      &:hover {
        background: #e0e0e0;
      }

      .social-svg-icon {
        width: 24px;
        height: 24px;
      }

      .social-text-icon {
        font-size: 20px;
        font-weight: 600;
      }
    }

    .social-icon-bound {
      width: 48px;
      height: 48px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #9333ea;
      color: white;

      .social-svg-icon {
        width: 24px;
        height: 24px;
      }

      .social-text-icon {
        font-size: 20px;
        font-weight: 600;
      }
    }

    .social-inputs {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .social-input-item {
      padding: 12px;
      background: #f9f9f9;
      border-radius: 8px;
    }

    .social-input-header {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 8px;
      font-size: 14px;
      color: #333;

      .social-header-icon {
        width: 20px;
        height: 20px;
        flex-shrink: 0;
      }

      .social-header-text {
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        flex-shrink: 0;
      }
    }

    .social-name {
      flex: 1;
    }

    .delete-btn {
      color: #f56c6c;
    }

    .social-input-content {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .social-url-input {
      flex: 1;
    }

    .confirm-btn {
      align-self: flex-start;
    }

    .error-message {
      display: flex;
      align-items: center;
      gap: 4px;
      color: #f56c6c;
      font-size: 12px;
      margin-top: 4px;

      .error-icon {
        font-weight: bold;
      }
    }

    .social-bound-url {
      color: #666;
      font-size: 14px;
      word-break: break-all;
    }
  }

  .tags-section {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .tag-item {
    border-radius: 16px;
    padding: 6px 16px;
  }

  .form-actions {
    margin-top: 40px;
    text-align: center;
  }

  .continue-btn {
    width: 200px;
    height: 48px;
    font-size: 16px;
    border-radius: 8px;
  }

  .preview-section {
    position: sticky;
    top: 20px;
  }

  .preview-card {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    min-height: 500px;
    position: relative;
  }

  .preview-background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 200px;
    background-size: cover;
    background-position: center;
  }

  .preview-content {
    position: relative;
    padding: 120px 24px 24px;
    text-align: center;
  }

  .preview-avatar-wrapper {
    margin-bottom: 16px;
  }

  .preview-avatar {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    object-fit: cover;
    border: 4px solid white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .preview-avatar-placeholder {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background: #f0f0f0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    color: #999;
    border: 4px solid white;
  }

  .preview-username {
    font-size: 24px;
    font-weight: 600;
    color: #333;
    margin-bottom: 24px;
  }

  .preview-about {
    text-align: left;
    margin-top: 24px;
  }

  .preview-about-title {
    font-size: 18px;
    font-weight: 600;
    color: #333;
    margin-bottom: 12px;
  }

  .preview-about-text {
    font-size: 14px;
    color: #666;
    line-height: 1.6;
    white-space: pre-wrap;
  }
}

// 响应式设计
@media (max-width: 1024px) {
  .become-creator-page {
    .content-wrapper {
      grid-template-columns: 1fr;
    }

    .preview-section {
      position: static;
      margin-top: 40px;
    }
  }
}

@media (max-width: 768px) {
  .become-creator-page {
    padding: 20px 16px;

    .page-title {
      font-size: 24px;
      margin-bottom: 24px;
    }

    .form-section {
      padding: 24px;
    }

    .form-item {
      margin-bottom: 24px;
    }

    .upload-section {
      flex-direction: column;
    }

    .upload-box {
      width: 100%;
      height: 200px;
    }
  }
}
</style>
