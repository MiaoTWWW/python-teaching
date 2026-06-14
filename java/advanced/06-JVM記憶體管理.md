# 06 JVM 記憶體管理

## JVM 架構概覽

Java Virtual Machine（JVM）是 Java 跨平台的基石：

```
┌─────────────────────────────────────┐
│          Class Loader               │  → 載入 .class 位元碼
├─────────────────────────────────────┤
│          Runtime Data Areas         │
│  ┌──────────┐  ┌──────────────────┐ │
│  │  Stack   │  │      Heap       │ │
│  │ (執行緒) │  │  (所有物件)     │ │
│  ├──────────┤  ├──────────────────┤ │
│  │   PC     │  │   Method Area    │ │
│  │ Register │  │  (類別資訊)     │ │
│  ├──────────┤  └──────────────────┘ │
│  │Native    │                       │
│  │Method    │                       │
│  │Stack     │                       │
│  └──────────┘                       │
├─────────────────────────────────────┤
│   Execution Engine                  │
│   ┌──────┐ ┌──────┐ ┌──────────┐  │
│   │Inter-│ │ JIT  │ │  GC     │  │
│   │preter│ │Compiler│ │蒐集器  │  │
│   └──────┘ └──────┘ └──────────┘  │
└─────────────────────────────────────┘
```

## Stack vs Heap

| 特性 | Stack（堆疊） | Heap（堆積） |
|------|-------------|-------------|
| 儲存內容 | 基本型別 + 物件參考 | 所有物件實例 + 陣列 |
| 生命週期 | 方法執行結束即釋放 | GC 回收 |
| 執行緒 | 每個執行緒獨立 | 所有執行緒共享 |
| 大小 | 較小（預設 1MB） | 較大 |
| 存取速度 | 快速 | 較慢 |

```java
public class MemoryExample {
    public static void main(String[] args) {
        int x = 10;              // x 在 stack
        String s = "Hello";      // s（參考）在 stack，"Hello" 在 heap
        Student stu = new Student("Alice");  // stu（參考）在 stack，物件在 heap
    }
}
```

## 垃圾回收（Garbage Collection）

GC 自動回收不再被參考的物件，程式設計師**不需要**手動釋放記憶體。

### 判斷可回收的條件

```java
Student stu = new Student("Alice");
stu = null;  // 原本的 Student 物件不再被參考，可被 GC 回收
```

### GC 演算法演進

| 版本 | GC | 特性 |
|------|-----|------|
| Java 8 預設 | **Parallel GC** | 吞吐量優先 |
| Java 9+ 預設 | **G1GC** | 低延遲，分割 region |
| Java 11+ | **ZGC** | 極低延遲（<10ms） |
| Java 12+ | **Shenandoah** | 與應用執行緒並行 |

### 觸發 GC 的方式

```java
System.gc();  // 建議 JVM 執行 GC（不保證立即執行）
```

::: tip
不需要也**不應**頻繁呼叫 `System.gc()`，JVM 會自動決定最佳 GC 時機。
:::

## JVM 調優參數

常用 JVM 啟動參數：

```bash
# 設定堆積大小
-Xms512m    # 初始 heap 大小 512MB
-Xmx2g      # 最大 heap 大小 2GB

# 設定 GC 演算法
-XX:+UseG1GC           # 使用 G1GC
-XX:+UseZGC            # 使用 ZGC（Java 11+）
-XX:+UseStringDeduplication  # 啟用字串去重

# 偵錯與監控
-XX:+PrintGCDetails    # 列印 GC 詳細資訊
-XX:+HeapDumpOnOutOfMemoryError  # OOM 時自動 dump heap
```

## 記憶體洩漏（Memory Leak）示意

雖然 Java 有 GC，但某些寫法仍會造成洩漏：

```java
// ❌ 錯誤示範：靜態集合不斷累積
public class LeakExample {
    private static List<byte[]> cache = new ArrayList<>();

    public void addData() {
        cache.add(new byte[1024 * 1024]);  // 每次呼叫都增加 1MB，永不釋放
    }
}
```

## 重點整理

- Stack 存基本型別與參考；Heap 存物件
- GC 自動回收無參考的物件
- 現代 Java 預設使用 G1GC，追求低延遲
- JVM 調優常用 `-Xms` / `-Xmx` 設定 heap 大小
- 雖有 GC，仍需注意靜態集合等不當用法導致的記憶體洩漏
