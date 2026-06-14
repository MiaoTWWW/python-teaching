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

### 基礎篇（6 章）

| 章節 | 主題 | 核心內容 |
|------|------|---------|
| 01 | 環境安裝與設定 | GCC/MinGW、VS Code、Hello World、編譯與執行 |
| 02 | 變數與資料型別 | int/float/double/char、sizeof、const、printf 格式 |
| 03 | 流程控制 | if/else、switch、for/while/do-while、break/continue |
| 04 | 函式 | 函式定義、原型、傳值呼叫、作用域 |
| 05 | 陣列與字串 | 一維/多維陣列、字元陣列、string.h |
| 06 | 指標基礎 | `*`/`&`/NULL、指標算術、陣列與指標關係 |

## 學習路徑

```mermaid
flowchart LR
  A[環境安裝] --> B[變數與型別]
  B --> C[流程控制]
  C --> D[函式]
  D --> E[陣列與字串]
  E --> F[指標基礎]
  F --> G[⚡ 進階主題敬請期待]
  
  style A fill:#283593,color:#fff
  style B fill:#283593,color:#fff
  style C fill:#283593,color:#fff
  style D fill:#283593,color:#fff
  style E fill:#283593,color:#fff
  style F fill:#5C6BC0,color:#fff
  style G fill:#7986CB,color:#fff
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
