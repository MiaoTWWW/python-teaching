# 04 Lambda 與 Stream API

Java 8 引入函數式程式設計特性，讓程式碼更簡潔、更具表達力。

## 函數式介面

只有一個抽象方法的介面，可用 Lambda 實作：

```java
@FunctionalInterface
public interface MyFunction {
    int apply(int x);
}
```

Java 內建常見的函數式介面：

| 介面 | 方法 | 用途 |
|------|------|------|
| `Predicate<T>` | `boolean test(T)` | 條件判斷 |
| `Function<T,R>` | `R apply(T)` | 轉換 |
| `Consumer<T>` | `void accept(T)` | 消費資料 |
| `Supplier<T>` | `T get()` | 提供資料 |
| `Comparator<T>` | `int compare(T,T)` | 排序 |

## Lambda 語法

完整語法：

```java
// (參數) -> { 陳述式 }
(int a, int b) -> { return a + b; }
```

簡化規則（編譯器可推斷時）：

```java
// 型別可省略
(a, b) -> a + b

// 單一參數可省略括號
x -> x * x

// 單一陳述式可省略 return 與大括號
(a, b) -> a + b
```

### 實際應用

```java
// 匿名內部類別（傳統）
Comparator<String> byLengthOld = new Comparator<>() {
    @Override
    public int compare(String a, String b) {
        return Integer.compare(a.length(), b.length());
    }
};

// Lambda（現代）
Comparator<String> byLength = (a, b) -> Integer.compare(a.length(), b.length());
```

### 方法參考（Method Reference）

```java
// Lambda
list.forEach(s -> System.out.println(s));

// 方法參考（更簡潔）
list.forEach(System.out::println);

// 其他形式
String::length           // 實例方法
Math::max                // 靜態方法
Student::new             // 建構子參考
```

## Stream API

Stream 不是資料結構，而是對資料的**操作管線**。

### 常用操作

```java
import java.util.stream.*;

List<String> names = Arrays.asList("Alice", "Bob", "Charlie", "David", "Eve");

// filter：篩選（Predicate）
List<String> longNames = names.stream()
    .filter(name -> name.length() > 3)
    .collect(Collectors.toList());
// [Alice, Charlie, David]

// map：轉換（Function）
List<Integer> nameLengths = names.stream()
    .map(String::length)
    .collect(Collectors.toList());
// [5, 3, 7, 5, 3]

// sorted：排序
List<String> sorted = names.stream()
    .sorted()
    .collect(Collectors.toList());
// [Alice, Bob, Charlie, David, Eve]

// forEach：遍歷
names.stream().forEach(System.out::println);

// count：計數
long count = names.stream()
    .filter(n -> n.startsWith("A"))
    .count();  // 1
```

### 鏈式操作（Method Chaining）

```java
List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

// Stream 管線：過濾 → 轉換 → 限制 → 收集
List<Integer> result = numbers.stream()
    .filter(n -> n % 2 == 0)        // [2, 4, 6, 8, 10]
    .map(n -> n * n)                 // [4, 16, 36, 64, 100]
    .limit(3)                        // [4, 16, 36]
    .collect(Collectors.toList());
```

### Optional

```java
// 傳統 null 檢查
String name = findName(1);
if (name != null) {
    System.out.println(name.toUpperCase());
}

// Optional
Optional<String> nameOpt = findNameOptional(1);
nameOpt.map(String::toUpperCase)
       .ifPresent(System.out::println);

// 提供預設值
String result = nameOpt.orElse("Unknown");
```

## 重點整理

- Lambda 讓函數式介面的實作更簡潔
- 方法參考 `::` 進一步簡化 Lambda
- Stream 操作分為**中間操作**（回傳 Stream）與**終端操作**（產出結果）
- Stream 是惰性的（lazy），遇到終端操作才開始執行
- `Optional` 有效避免 `NullPointerException`
