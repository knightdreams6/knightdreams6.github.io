import { defineConfig } from 'vitepress';
import { createBlogSidebar } from './sidebar.ts';

const blogSidebar = createBlogSidebar();

export default defineConfig({
  ignoreDeadLinks: true,
  title: "Knightdreams'Blog",
  description: 'Knightdreams 技术博客',
  lang: 'zh-CN',
  appearance: 'dark',
  cleanUrls: true,
  lastUpdated: true,

  themeConfig: {
    logo: '/logo.png',

    nav: [
      {
        text: '首页',
        link: '/'
      },
      {
        text: '博客',
        link: '/blogs/'
      }
    ],

    sidebar: {
      '/blogs/': blogSidebar,

      '/docs/': [
        {
          text: '关于',
          items: [
            {
              text: '简历',
              link: '/docs/resume'
            }
          ]
        }
      ]
    },

    outline: {
      level: [2, 3],
      label: '本页目录'
    },

    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: '搜索',
                buttonAriaLabel: '搜索'
              },
              modal: {
                noResultsText: '没有找到相关结果',
                resetButtonTitle: '清除查询',
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                  closeText: '关闭'
                }
              }
            }
          }
        }
      }
    },

    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },

    lastUpdated: {
      text: '最后更新于'
    }
  }
});