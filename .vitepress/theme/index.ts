import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import ElementPlus from 'element-plus';
import BlogList from './components/BlogList.vue';

import 'element-plus/dist/index.css';
import './custom.css';

export default {
    extends: DefaultTheme,

    enhanceApp({ app }) {
        app.use(ElementPlus);
        app.component('BlogList', BlogList);
    }
} satisfies Theme;