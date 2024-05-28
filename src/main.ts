import "./assets/main.scss";

import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

// icon 图标引入
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

const app = createApp(App);

// icon 图标挂载(全局注册图标使用)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}


app.use(createPinia());
app.use(router);
app.use(ElementPlus);

app.mount("#app");
