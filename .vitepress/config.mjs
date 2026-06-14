import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

export default withMermaid({
  title: '程式語言講義',
  description: '從基礎到實戰的 Python / Java / C 完整學習教材',
  lang: 'zh-TW',
  lastUpdated: true,
  cleanUrls: true,
  base: '/python-teaching/',

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
['link', { rel: 'alternate icon', href: '/favicon.ico' }],
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
    logo: '/logo.svg',

    nav: [
      { text: '首頁', link: '/' },
      {
        text: '🐍 Python',
        items: [
          { text: '課程總覽', link: '/python/' },
          { text: '基礎篇', link: '/python/basics/' },
          { text: '進階篇', link: '/python/intermediate/' },
          { text: '實戰篇', link: '/python/advanced/' },
          { text: '演算法', link: '/python/algorithms/' },
          { text: '解題技巧', link: '/python/problem-solving/' },
          { text: '程式碼範例', link: '/python/examples/' },
        ],
      },
      {
        text: '☕ Java',
        items: [
          { text: '課程總覽', link: '/java/' },
          { text: '基礎篇', link: '/java/basics/' },
          { text: '物件導向篇', link: '/java/oop/' },
          { text: '進階語法特色', link: '/java/advanced/' },
        ],
      },
      {
        text: '🔧 C 語言',
        items: [
          { text: '課程總覽', link: '/c/' },
          { text: '基礎篇', link: '/c/basics/' },
        ],
      },
    ],

    sidebar: {
      '/python/': [
        {
          text: '🐍 Python 課程總覽',
          link: '/python/',
          items: [
            { text: '關於本課程', link: '/python/#關於本課程' },
            { text: '學習路徑', link: '/python/#學習路徑' },
          ],
        },
        {
          text: '基礎篇',
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
          text: '進階篇',
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
          text: '實戰篇',
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
          text: '🧠 演算法與資料結構',
          collapsed: false,
          items: [
            { text: '章節介紹', link: '/python/algorithms/' },
            { text: '01 - 程式設計基礎', link: '/python/algorithms/01-程式設計基礎' },
            { text: '02 - 資料結構：雜湊表', link: '/python/algorithms/02-資料結構-雜湊表' },
            { text: '03 - 搜尋法', link: '/python/algorithms/03-搜尋法' },
            { text: '04 - 排序演算法', link: '/python/algorithms/04-排序演算法' },
            { text: '05 - 佇列 (Queue)', link: '/python/algorithms/05-佇列' },
            { text: '06 - 堆疊 (Stack)', link: '/python/algorithms/06-堆疊' },
            { text: '07 - 排列組合', link: '/python/algorithms/07-排列組合' },
            { text: '08 - 樹 (Tree)', link: '/python/algorithms/08-樹' },
            { text: '09 - 進位轉換', link: '/python/algorithms/09-進位轉換' },
            { text: '10 - 迷宮問題', link: '/python/algorithms/10-迷宮' },
            { text: '11 - 遞迴 (Recursion)', link: '/python/algorithms/11-遞迴' },
            { text: '12 - 圖形最短路徑', link: '/python/algorithms/12-最短路徑' },
            { text: '13 - 動態規劃 (DP)', link: '/python/algorithms/13-動態規劃' },
            { text: '14 - 進階模組', link: '/python/algorithms/14-進階模組' },
            { text: '15 - 其他主題', link: '/python/algorithms/15-其他' },
          ],
        },
        {
          text: '🧩 解題技巧與經典問題',
          collapsed: false,
          items: [
            { text: '章節介紹', link: '/python/problem-solving/' },
            { text: '01 - 正規表示式', link: '/python/problem-solving/01-正規表示式' },
            { text: '02 - 鏈結串列', link: '/python/problem-solving/02-鏈結串列' },
            { text: '03 - 字串演算法進階', link: '/python/problem-solving/03-字串演算法進階' },
            { text: '04 - 進階動態規劃', link: '/python/problem-solving/04-進階動態規劃' },
            { text: '05 - 回溯法進階', link: '/python/problem-solving/05-回溯法進階' },
            { text: '06 - 二維陣列與圖論', link: '/python/problem-solving/06-二維陣列與圖論' },
            { text: '07 - 二元樹進階', link: '/python/problem-solving/07-二元樹進階' },
            { text: '08 - 運算式與括號', link: '/python/problem-solving/08-運算式與括號' },
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

      '/java/': [
        {
          text: '☕ Java 課程總覽',
          link: '/java/',
        },
        {
          text: '基礎篇',
          collapsed: false,
          items: [
            { text: '章節介紹', link: '/java/basics/' },
            { text: '01 - 環境安裝與設定', link: '/java/basics/01-環境安裝' },
            { text: '02 - 變數與資料型別', link: '/java/basics/02-變數與資料型別' },
            { text: '03 - 流程控制', link: '/java/basics/03-流程控制' },
            { text: '04 - 函式', link: '/java/basics/04-函式' },
            { text: '05 - 資料結構', link: '/java/basics/05-資料結構' },
            { text: '06 - 字串處理', link: '/java/basics/06-字串處理' },
            { text: '07 - 運算子', link: '/java/basics/07-運算子' },
          ],
        },
        {
          text: '物件導向篇',
          collapsed: false,
          items: [
            { text: '章節介紹', link: '/java/oop/' },
            { text: '01 - 類別與物件', link: '/java/oop/01-類別與物件' },
            { text: '02 - 繼承與多型', link: '/java/oop/02-繼承與多型' },
            { text: '03 - 介面與抽象類別', link: '/java/oop/03-介面與抽象類別' },
            { text: '04 - 套件與存取修飾詞', link: '/java/oop/04-套件與存取修飾詞' },
            { text: '05 - 列舉', link: '/java/oop/05-列舉' },
            { text: '06 - 巢狀類別', link: '/java/oop/06-巢狀類別' },
          ],
        },
        {
          text: '進階語法特色',
          collapsed: false,
          items: [
            { text: '章節介紹', link: '/java/advanced/' },
            { text: '01 - 例外處理', link: '/java/advanced/01-例外處理' },
            { text: '02 - 集合框架', link: '/java/advanced/02-集合框架' },
            { text: '03 - 泛型', link: '/java/advanced/03-泛型' },
            { text: '04 - Lambda 與 Stream', link: '/java/advanced/04-Lambda與Stream' },
            { text: '05 - 多執行緒基礎', link: '/java/advanced/05-多執行緒基礎' },
            { text: '06 - JVM 記憶體管理', link: '/java/advanced/06-JVM記憶體管理' },
            { text: '07 - 註解與反射', link: '/java/advanced/07-註解與反射' },
            { text: '08 - 日期時間 API', link: '/java/advanced/08-日期時間' },
            { text: '09 - 單元測試', link: '/java/advanced/09-單元測試' },
            { text: '10 - 檔案 I/O 串流', link: '/java/advanced/10-檔案IO' },
            { text: '11 - JDBC 資料庫操作', link: '/java/advanced/11-JDBC' },
            { text: '12 - Spring Boot 後端藍圖', link: '/java/advanced/12-SpringBoot藍圖' },
          ],
        },
      ],

      '/c/': [
        {
          text: '🔧 C 語言課程總覽',
          link: '/c/',
        },
        {
          text: '基礎篇',
          collapsed: false,
          items: [
            { text: '章節介紹', link: '/c/basics/' },
            { text: '01 - 環境安裝與設定', link: '/c/basics/01-環境安裝' },
            { text: '02 - 變數與資料型別', link: '/c/basics/02-變數與資料型別' },
            { text: '03 - 流程控制', link: '/c/basics/03-流程控制' },
            { text: '04 - 函式', link: '/c/basics/04-函式' },
            { text: '05 - 陣列與字串', link: '/c/basics/05-陣列與字串' },
            { text: '06 - 指標基礎', link: '/c/basics/06-指標基礎' },
            { text: '07 - 運算子進階', link: '/c/basics/07-運算子進階' },
            { text: '08 - 進階指標', link: '/c/basics/08-進階指標' },
            { text: '09 - 動態記憶體配置', link: '/c/basics/09-動態記憶體配置' },
            { text: '10 - 自訂資料型態', link: '/c/basics/10-自訂資料型態' },
            { text: '11 - 檔案處理', link: '/c/basics/11-檔案處理' },
            { text: '12 - 前置處理器與模組化', link: '/c/basics/12-前置處理器與模組化' },
            { text: '13 - 鏈結串列實作', link: '/c/basics/13-鏈結串列實作' },
            { text: '14 - 儲存類別與型別修飾詞', link: '/c/basics/14-儲存類別與型別修飾詞' },
            { text: '15 - C99/C11 現代語法特性', link: '/c/basics/15-C99C11-現代語法特性' },
            { text: '16 - goto、跨函式跳躍與可變參數', link: '/c/basics/16-goto-跨函式跳躍與可變參數' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/MiaoTWWW/python-teaching' },
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
