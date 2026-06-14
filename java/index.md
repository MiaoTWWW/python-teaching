# ☕ Java 教學講義

> **一次編寫，到處執行（Write Once, Run Anywhere）** — Java 自 1995 年誕生以來，一直是企業級應用與後端開發的主流語言。本教材從零開始，逐步深入，最終帶領你通往 Spring Boot 實務後端開發的大門。

## 課程地圖

| 篇章 | 章數 | 涵蓋範圍 |
|------|------|---------|
| **基礎篇** | 7 章 | 語法入門、變數、流程控制、函式、陣列、字串、運算子 |
| **物件導向篇** | 6 章 | 類別與物件、繼承、介面、套件、列舉、巢狀類別 |
| **進階語法特色** | 12 章 | 例外處理、集合、泛型、Lambda、多執行緒、JVM、反射、日期時間、單元測試、I/O、JDBC、Spring Boot 藍圖 |
| **合計** | **25 章** | 從完全不會到寫出 RESTful API |

---

## 基礎篇（7 章）

從零開始，熟悉 Java 的基本語法與程式邏輯。

| # | 章節 | 學習重點 |
|---|------|---------|
| 01 | 環境安裝與設定 | JDK 安裝配置、Hello World、編譯執行原理、IDE 使用 |
| 02 | 變數與資料型別 | 基本型別、常數、型別轉換、var、Math 類別、Wrapper Classes 與 autoboxing |
| 03 | 流程控制 | if-else / switch、for / while / do-while、break / continue、Scanner 輸入、printf 輸出 |
| 04 | 函式 | 方法定義、參數傳遞、回傳值、方法多載（Overload）、遞迴 |
| 05 | 資料結構 | 一維與多維陣列、Arrays 工具類別（sort / binarySearch / fill / copyOf） |
| 06 | 字串處理 | String 不可變性、常用方法、StringBuilder / StringBuffer |
| 07 | 運算子 | 算術、關係、邏輯、位元、指派、三元運算子、優先級 |

::: tip 給初學者
建議依序閱讀 01 → 02 → 07 → 03 → 04 → 05 → 06，先建立變數與運算觀念再進入流程控制。
:::

## 物件導向篇（6 章）

Java 的核心 — 學會用物件的思維設計程式。

| # | 章節 | 學習重點 |
|---|------|---------|
| 01 | 類別與物件 | 類別定義、建構子、this、static、封裝與 Getter/Setter |
| 02 | 繼承與多型 | extends、super、Override / Overload、向上/向下轉型、final |
| 03 | 介面與抽象類別 | abstract 類別、interface 定義與實作、default 方法 |
| 04 | 套件與存取修飾詞 | package、public / private / protected、jar 檔 |
| 05 | 列舉 | enum 語法、自訂欄位方法、switch 搭配 enum、狀態機應用 |
| 06 | 巢狀類別 | 靜態巢狀類別、內部類別、區域類別、匿名類別 |

## 進階語法特色（12 章）

從「會寫 Java」到「寫好 Java」的關鍵一步，並銜接真實開發場景。

| # | 章節 | 學習重點 |
|---|------|---------|
| 01 | 例外處理 | try-catch-finally、throw / throws、自訂例外 |
| 02 | 集合框架 | ArrayList / LinkedList、HashSet / TreeSet、HashMap / TreeMap |
| 03 | 泛型 | 泛型類別方法、型別限制、通配符 |
| 04 | Lambda 與 Stream | 函式式介面、Lambda 語法、Stream 過濾/轉換/收集 |
| 05 | 多執行緒基礎 | Thread / Runnable、同步 synchronized、wait / notify |
| 06 | JVM 記憶體管理 | Stack / Heap、GC 機制、記憶體洩漏、JVM 參數調優 |
| 07 | 註解與反射 | 內建與自訂註解、反射取得類別資訊、動態呼叫 |
| 08 | 日期時間 API | LocalDate / LocalDateTime、時區、格式化解析 |
| 09 | 單元測試 | JUnit 5、@Test、斷言方法、TDD 概念 |
| 10 | 檔案 I/O 串流 | File、InputStream/OutputStream、Reader/Writer、Buffered、序列化、NIO |
| 11 | JDBC 資料庫操作 | MySQL 連線、CRUD、PreparedStatement、交易管理 |
| 12 | Spring Boot 後端藍圖 | MVC 架構、JPA、RESTful API 設計、JWT 驗證概念、學習路徑 |

## 學習路徑總覽

```
基礎篇 (01-07)
    ↓
物件導向篇 (01-06)
    ↓
進階篇 01-04（例外、集合、泛型、Lambda） ← 必讀核心
    ↓
進階篇 05-09（多執行緒、JVM、反射、日期、測試） ← 推薦閱讀
    ↓
進階篇 10-11（檔案 I/O、JDBC） ← 銜接實務
    ↓
進階篇 12（Spring Boot 藍圖） ← 最終整合，開啟後端開發之路
```

## 學完這份講義你將能

- ✅ 獨立撰寫具備 OOP 設計的 Java 應用程式
- ✅ 使用集合框架、泛型、Stream API 處理複雜資料
- ✅ 理解 JVM 記憶體模型與多執行緒基本概念
- ✅ 透過 JDBC 操作關聯式資料庫
- ✅ 理解 Spring Boot 的 MVC 架構與 RESTful API 設計
- ✅ 具備繼續深入 Spring Boot、Spring Security、微服務等領域的扎實基礎

---

> 📖 點擊左側導覽選單開始學習，或從基礎篇第 01 章（環境安裝）出發。
