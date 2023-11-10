import { defineClientConfig } from '@vuepress/client'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import resume from "./components/resume.vue";

export default defineClientConfig({
  enhance({ app, router, siteData }) {
    app.use(ElementPlus);
    app.component("resume", resume);
  },
})
