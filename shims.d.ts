declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<object, object, any>
  export default component
}

// 同 vite.config.ts 中的 base 配置
declare const BASE: string
