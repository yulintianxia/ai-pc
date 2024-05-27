/// <reference types="vite/client" />
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
