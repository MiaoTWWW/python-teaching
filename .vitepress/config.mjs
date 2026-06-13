import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

export default withMermaid({
  title: 'Python 教學講義',
  description: '從基礎到實戰的 Python 完整學習教材',
  lang: 'zh-TW',
  lastUpdated: true,
  cleanUrls: true,
  base: '/python-teaching/',

  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#3776AB' }],
  ],

  mermaid: {
    theme: 'neutral',
    themeVariables: {
      primaryColor: '#7A9BB5',
      primaryTextColor: '#fff',
      primaryBorderColor: '#6B8BA4',
      lineColor: '#9FB8CC',
      secondaryColor: '#D4C5A9',
      tertiaryColor: '#E8E4DF',
    },
    flowchart: {
      padding: 20,
      nodeSpacing: 60,
      rankSpacing: 60,
      htmlLabels: true,
    }
  },
  mermaidPlugin: {
    class: 'mermaid-wrapper',
  },

  themeConfig: {
    logo: '/python-logo.svg',

    nav: [
      { text: '首頁', link: '/' },
      {
        text: 'Python 教學',
        items: [
          { text: '課程總覽', link: '/python/' },
          { text: '基礎篇', link: '/python/basics/' },
          { text: '進階篇', link: '/python/intermediate/' },
          { text: '實戰篇', link: '/python/advanced/' },
        ],
      },
      {
        text: '更多資源',
        items: [
          { text: '官方文檔', link: 'https://docs.python.org/zh-tw/3/' },
          { text: 'PyPI 套件索引', link: 'https://pypi.org/' },
          { text: 'Python 下載', link: 'https://www.python.org/downloads/' },
        ],
      },
    ],

    sidebar: {
      '/python/': [
        {
          text: '課程總覽',
          link: '/python/',
          items: [
            { text: '關於本課程', link: '/python/#關於本課程' },
            { text: '學習路徑', link: '/python/#學習路徑' },
          ],
        },
        {
          text: '🐍 基礎篇',
          collapsed: false,
          items: [
            { text: '章節介紹', link: '/python/basics/' },
            { text: '01 - 環境安裝與設定', link: '/python/basics/01-環境安裝' },
            { text: '02 - 變數與資料型別', link: '/python/basics/02-變數與資料型別' },
            { text: '03 - 流程控制', link: '/python/basics/03-流程控制' },
            { text: '04 - 函式', link: '/python/basics/04-函式' },
            { text: '05 - 資料結構', link: '/python/basics/05-資料結構' },
            { text: '06 - 字串處理', link: '/python/basics/06-字串處理' },
          ],
        },
        {
          text: '⚡ 進階篇',
          collapsed: false,
          items: [
            { text: '章節介紹', link: '/python/intermediate/' },
            { text: '01 - 物件導向程式設計', link: '/python/intermediate/01-物件導向' },
            { text: '02 - 模組與套件', link: '/python/intermediate/02-模組與套件' },
            { text: '03 - 錯誤與例外處理', link: '/python/intermediate/03-錯誤處理' },
            { text: '04 - 檔案 I/O', link: '/python/intermediate/04-檔案IO' },
            { text: '05 - 迭代器與生成器', link: '/python/intermediate/05-迭代器與生成器' },
            { text: '06 - 閉包（Closure）', link: '/python/intermediate/06-閉包' },
            { text: '07 - 裝飾器（Decorator）', link: '/python/intermediate/07-裝飾器' },
            { text: '08 - 關聯、組合與聚合', link: '/python/intermediate/08-關聯組合聚合' },
          ],
        },
        {
          text: '🚀 實戰篇',
          collapsed: false,
          items: [
            { text: '章節介紹', link: '/python/advanced/' },
            { text: '01 - 網路爬蟲', link: '/python/advanced/01-網路爬蟲' },
            { text: '02 - 資料庫操作', link: '/python/advanced/02-資料庫操作' },
            { text: '03 - Web API 開發', link: '/python/advanced/03-Web-API' },
            { text: '04 - 資料科學入門', link: '/python/advanced/04-資料科學入門' },
            { text: '05 - 自動化腳本', link: '/python/advanced/05-自動化腳本' },
            { text: '06 - 執行緒與並行程式設計', link: '/python/advanced/06-執行緒' },
            { text: '07 - ITS Python 認證準備', link: '/python/advanced/07-ITS認證考題' },
          ],
        },
        {
          text: '📝 程式碼範例',
          link: '/python/examples/',
          items: [
            { text: '範例總覽', link: '/python/examples/' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: '#' },
    ],

    editLink: {
      pattern: '',
      text: '',
    },

    footer: {
      copyright: 'Copyright © 2026 ｜ D.S. Li',
    },

    search: {
      provider: 'local',
    },

    outline: {
      label: '本頁目錄',
      level: [2, 3],
    },

    docFooter: {
      prev: '上一頁',
      next: '下一頁',
    },

    lastUpdated: {
      text: '最後更新',
    },

    darkModeSwitchLabel: '深色模式',
    lightModeSwitchTitle: '切換至淺色模式',
    darkModeSwitchTitle: '切換至深色模式',
    sidebarMenuLabel: '目錄',
    returnToTopLabel: '回到頂部',
    langMenuLabel: '語言',
  },
})
