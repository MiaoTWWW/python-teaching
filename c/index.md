# 🔧 C 語言教學講義

> 🎯 **學習目標**：從零開始學習 C 語言，掌握基礎語法、記憶體操作與程式設計思維，為系統程式設計與嵌入式開發扎下穩固根基。

---

C 語言由 Dennis Ritchie 於 1972 年在貝爾實驗室開發，至今仍是**系統程式設計的基石**。作業系統核心、嵌入式系統、編譯器、資料庫引擎無不使用 C 語言，其高效能與低階記憶體控制能力無可取代。

## 為什麼學習 C 語言？

| 優勢 | 說明 |
|------|------|
| ⚡ **高效能** | 編譯式語言，執行速度接近機器碼 |
| 🧠 **深入底層** | 直接操作記憶體，理解電腦運作本質 |
| 🔧 **廣泛應用** | 作業系統、嵌入式、韌體、驅動程式 |
| 🌍 **影響深遠** | C 語法深刻影響 C++、Java、C#、Go 等語言 |

## 本課程內容

### 基礎篇（16 章）

| 章節 | 主題 | 核心內容 |
|------|------|---------|
| 01 | 環境安裝與設定 | GCC/MinGW、VS Code、Hello World、編譯與執行、註解 |
| 02 | 變數與資料型別 | int/float/double/char、sizeof、const、printf/scanf 格式 |
| 03 | 流程控制 | if/else、switch、for/while/do-while、break/continue |
| 04 | 函式 | 函式定義、原型、傳值呼叫、作用域 |
| 05 | 陣列與字串 | 一維/多維陣列、字元陣列、string.h |
| 06 | 指標基礎 | `*`/`&`/NULL、指標算術、陣列與指標關係 |
| 07 | 運算子進階 | 位元運算、複合指定、三元運算子、逗號運算子、優先順序 |
| 08 | 進階指標 | 多層指標、函式指標、回傳指標、陣列指標 vs 指標陣列 |
| 09 | 動態記憶體配置 | malloc/calloc/realloc/free、記憶體洩漏、懸空指標 |
| 10 | 自訂資料型態 | struct/union/enum、typedef、位元欄位、對齊與填補 |
| 11 | 檔案處理 | fopen/fclose、fprintf/fscanf、fread/fwrite、fseek/ftell |
| 12 | 前置處理器與模組化 | #define 巨集、條件編譯、include guard、多檔案專案 |
| 13 | 鏈結串列實作 | 節點結構、增刪改查、雙向鏈結串列、反轉與偵測環 |
| 14 | 儲存類別與型別修飾詞 | static/extern/register、const/volatile/restrict、生命週期與連結 |
| 15 | C99/C11 現代語法特性 | 複合字面常數、具名初始值、彈性陣列成員、_Generic、_Static_assert、匿名結構 |
| 16 | goto、跨函式跳躍與可變參數 | goto 錯誤處理模式、setjmp/longjmp、va_list 可變參數函式 |

## 學習路徑

```mermaid
flowchart LR
  A[環境安裝] --> B[變數與型別]
  B --> C[流程控制]
  C --> D[函式]
  D --> E[陣列與字串]
  E --> F[指標基礎]
  F --> G[運算子進階]
  G --> H[進階指標]
  H --> I[動態記憶體]
  I --> J[自訂資料型態]
  J --> K[檔案處理]
  K --> L[前置處理器]
  L --> M[鏈結串列]
  M --> N[儲存類別]
  N --> O[C99/C11]
  O --> P[goto/跳躍/可變參數]
  
  style A fill:#283593,color:#fff
  style B fill:#283593,color:#fff
  style C fill:#283593,color:#fff
  style D fill:#283593,color:#fff
  style E fill:#283593,color:#fff
  style F fill:#3949AB,color:#fff
  style G fill:#3949AB,color:#fff
  style H fill:#3949AB,color:#fff
  style I fill:#3949AB,color:#fff
  style J fill:#3949AB,color:#fff
  style K fill:#5C6BC0,color:#fff
  style L fill:#5C6BC0,color:#fff
  style M fill:#5C6BC0,color:#fff
  style N fill:#7986CB,color:#fff
  style O fill:#7986CB,color:#fff
  style P fill:#7986CB,color:#fff
```

## C 與 Python 的快速對照

| 概念 | Python | C |
|------|--------|----|
| 輸出 | `print("Hello")` | `printf("Hello");` |
| 變數宣告 | `x = 10`（動態） | `int x = 10;`（靜態） |
| 條件判斷 | `if x > 0:` | `if (x > 0) { }` |
| 迴圈 | `for i in range(5):` | `for (int i = 0; i < 5; i++)` |
| 函式 | `def foo():` | `void foo() { }` |
| 陣列 | `arr = [1, 2, 3]` | `int arr[] = {1, 2, 3};` |

立即從 [第一章：環境安裝與設定](./basics/01-環境安裝) 開始！
