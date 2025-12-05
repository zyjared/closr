<script setup lang="ts">
import { withBase } from '~/utils/url'

export interface Social {
  id: SocialId
  name?: string
  logo?: string
  value: string
}

const data = defineModel<Social[]>()

const socialMap = {
  instagram: {
    id: 'instagram',
    name: 'Instagram',
    logo: withBase('/logos/instagram.svg'),
  },
  tiktok: {
    id: 'tiktok',
    name: 'TikTok',
    logo: withBase('/logos/tiktok.svg'),
  },
  youtube: {
    id: 'youtube',
    name: 'YouTube',
    logo: withBase('/logos/youtube.svg'),
  },
  x: {
    id: 'x',
    name: 'X',
    logo: withBase('/logos/x.svg'),
  },
  link: {
    id: 'link',
    name: 'Link',
    logo: withBase('/logos/link.svg'),
  },
} as const
type SocialId = keyof typeof socialMap
const logos = Object.values(socialMap)

// todo: 已经确定的才更新 data
interface SelectedSocial extends Required<Social> {
  // 原始值，提交时存储
  raw: string
}
const selectedSocials = ref<SelectedSocial[]>([])
watch(data, (items) => {
  if (items) {
    selectedSocials.value = items.map(item => ({
      ...socialMap[item.id],
      ...item,
      raw: item.value,
    }))
  }
}, { immediate: true })

function addSocial(id: SocialId) {
  selectedSocials.value.push({
    id,
    name: socialMap[id].name,
    logo: socialMap[id].logo,
    value: '',
    raw: '',
  })
}

function shouldConfirm(index: number) {
  const item = selectedSocials.value[index]
  return item.raw !== item.value
}

function confirmSocial(index: number) {
  if (!shouldConfirm(index)) {
    return
  }

  const item = selectedSocials.value[index]
  item.raw = item.value
}

function removeSocial(id: SocialId) {
  const index = selectedSocials.value.findIndex(item => item.id === id)
  if (index !== -1) {
    selectedSocials.value.splice(index, 1)
  }
}

function editSocial(index: number, value: string) {
  const item = selectedSocials.value[index]
  item.value = value
}
</script>

<template>
  <div class="social-list">
    <!-- logos 选项 -->
    <div class="social-logos">
      <div v-for="social in logos" :key="social.id" class="social-logo" @click="addSocial(social.id)">
        <img :src="social.logo" alt="Social Logo">
      </div>
    </div>

    <!-- 已选的 social -->
    <div class="selected-socials">
      <div v-for="(social, idx) in selectedSocials" :key="social.id" class="selected-item">
        <div class="logo">
          <img :src="social.logo" alt="Social Logo" class="logo__img">
        </div>
        <input
          v-model="social.value"
          type="text"
          class="value"
          @input="(e) => editSocial(idx, (e.target as HTMLInputElement).value)"
        >
        <div class="actions">
          <div
            v-if="shouldConfirm(idx) || !social.value"
            class="confirm"
            :class="{ invalid: !social.value }"
            @click="confirmSocial(idx)"
          >
            Confirm
          </div>
          <div v-else class="close" @click="removeSocial(social.id)">
            <IconRemove class="zicon close__svg" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@mixin flex-row {
  display: flex;
  flex-direction: row;
}

@mixin flex-col {
  display: flex;
  flex-direction: column;
}

.social-logos {
  @include flex-row;
  gap: 12px;
  margin-bottom: 8px;
}

.social-logo {
  width: 44px;
  height: 44px;
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: 50%;

  &:hover {
    border: 1px dashed #eaeaea;
  }
}

.selected-socials {
  @include flex-col;

  gap: 8px;

  .selected-item {
    @include flex-row;
    gap: 8px;
    align-items: center;

    input {
      flex: 1;
      font-weight: 400;
      font-size: 14px;
      letter-spacing: 0;
      padding: 14px 8px;
      border-radius: 12px;
      background: #fafafa;
      // color: #bfbfbf;
      font-size: 14px;
      height: 42px;
      outline: none;
      border: none;
      box-sizing: border-box;
    }

    .logo {
      width: 42px;
      height: 42px;
      border-radius: 12px;
      background: #fafafa;
      padding: 2px;
      box-sizing: border-box;

      &__img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .actions {
      text-align: center;
      font-size: 12px;
      width: 81px;

      .close,
      .confirm {
        border: 1px solid #e7e7e7;
        box-sizing: border-box;
        border-radius: 12px;
        height: 42px;
        cursor: pointer;
      }

      .close {
        width: 42px;

        &__svg {
          width: 13.33px;
          height: 13.33px;
          height: 100%;
        }
      }

      .confirm {
        width: 100%;
        text-align: center;
        line-height: 42px;
      }

      .invalid {
        color: #a6a6a6;
        cursor: not-allowed;
      }
    }
  }
}
</style>
