/// <reference types="vite/client" />
/// 对环境变量或者vue的变量进行扩展
declare module "*.vue" {
    import type { DefineComponent } from "vue";
    const vueComponent: DefineComponent<{}, {}, any>;
    export default vueComponent;
  }

  interface ImportMetaEnv {
    readonly BASE_URL: string
    readonly VITE_APP_TITLE: string
    // 更多环境变量...
  }
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
