# 進階語法特色

> 從「會寫 Java」到「寫好 Java」的關鍵一步。本章涵蓋真實開發中一定會用到的語言機制與實務工具。

## 章節地圖

| 章節 | 主題 | 你將學會 |
|------|------|---------|
| **01** | 例外處理 | try-catch-finally 結構、throw / throws、常見內建例外、自訂例外類別 |
| **02** | 集合框架 | List（ArrayList / LinkedList）、Set（HashSet / TreeSet）、Map（HashMap / TreeMap）、Iterator 遍歷 |
| **03** | 泛型 | 泛型類別與方法、型別參數限制（extends）、通配符 ?、泛型在集合中的應用 |
| **04** | Lambda 與 Stream | 函式式介面、Lambda 語法、方法參考、Stream API 資料過濾 / 轉換 / 收集 |
| **05** | 多執行緒基礎 | Thread 類別與 Runnable 介面、執行緒生命週期、synchronized 同步、wait / notify |
| **06** | JVM 記憶體管理 | Stack vs Heap、GC 機制、記憶體洩漏案例、JVM 參數調優概念 |
| **07** | 註解與反射 | @Override 等內建註解、自訂註解、反射取得類別資訊、動態呼叫方法 |
| **08** | 日期時間 API | java.time 套件（LocalDate / LocalTime / LocalDateTime）、時區處理、格式化與解析 |
| **09** | 單元測試 | JUnit 5 入門、@Test / @BeforeEach / 斷言方法、測試驅動開發基本概念 |
| **10** | 檔案 I/O 串流 | File 類別、InputStream / OutputStream、Reader / Writer、Buffered 串流、物件序列化、NIO 簡介 |
| **11** | JDBC 資料庫操作 | MySQL 連線建立、CRUD 操作、PreparedStatement 防 SQL 注入、交易管理（commit / rollback） |
| **12** | Spring Boot 後端藍圖 | MVC 架構、JPA Entity / Repository / Service / Controller 完整範例、RESTful API 設計、JWT 身分驗證概念、學習路徑建議 |

## 學習路徑

### 核心語法（必讀）

```
01 例外處理 ← 讓程式不會輕易當掉
    ↓
02 集合框架 + 03 泛型 ← 處理大批資料的標準方式
    ↓
04 Lambda 與 Stream ← 現代 Java 最常用的簡潔寫法
```

### 工具與機制（建議讀）

```
05 多執行緒 ← 讓程式同時做多件事
06 JVM 記憶體 ← 理解你的程式到底怎麼跑
07 註解與反射 ← 框架底層的原理
08 日期時間 ← 處理時間的標準 API
09 單元測試 ← 寫出可驗證的可靠程式
```

### 實務應用（銜接真實開發）

```
10 檔案 I/O ← 讀寫檔案的完整體系
    ↓
11 JDBC ← 資料庫操作入門
    ↓
12 Spring Boot 藍圖 ← 整合所有所學，踏入後端開發
```

::: tip
本講義最終章（12 Spring Boot 藍圖）是整份 Java 教學的收尾，展示如何將之前學過的所有概念（OOP、集合、I/O、JDBC）應用到一個真實的 Web 專案中。
:::

## 學完之後你能做到

- 寫出具備完整錯誤處理的穩健程式
- 熟練使用集合框架與泛型處理資料
- 用 Lambda 與 Stream API 寫出簡潔的資料處理管線
- 了解多執行緒與 JVM 記憶體的基本運作
- 具備使用 JDBC 操作資料庫的能力
- 理解 Spring Boot 的 MVC 架構與 RESTful API 設計
- 為整合認證授權（JWT + Spring Security）等實務需求打好基礎
