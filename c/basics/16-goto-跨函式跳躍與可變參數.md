# 16 - goto、跨函式跳躍與可變參數

> 🎯 **學習目標**：學習 C 語言中三個獨特的底層控制機制——goto 的正確使用方式、setjmp/longjmp 實現非本地跳躍、以及 va_list 實作可變參數函式。

---

## goto 語句

`goto` 是 C 語言中最被汙名化的語法。事實上，**在某些特定場景中，goto 是最好甚至唯一的選擇**。

### 基本語法

```c
#include <stdio.h>

int main() {
    printf("Step 1\n");

    goto skip_something;
    // 跳過中間這行
    printf("你永遠看不到我\n");

skip_something:
    printf("Step 2\n");

    // goto 可以往前跳，也可以往後跳
    return 0;
}
```

### ❌ goto 的濫用——義大利麵程式碼

```c
// ❌ 絕對不要這樣做
int bad_example() {
    int x = 0;
    if (x == 0) goto label1;
label3:
    printf("three\n");
    goto end;
label1:
    printf("one\n");
    goto label2;
label2:
    printf("two\n");
    goto label3;
end:
    return 0;
}
```

> 「程式碼的執行路徑像一盤義大利麵一樣糾纏不清」——這就是濫用 goto 的結果。

### ✅ goto 的正確用法——集中錯誤處理

這是 Linux 核心和許多 C 專案的標準模式：

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
    char *name;
    int *scores;
    int count;
} Student;

int init_student(Student *s, const char *name, int count) {
    int ret = 0;  // 0 = 成功

    s->name = malloc(strlen(name) + 1);
    if (s->name == NULL) {
        ret = -1;           // 錯誤碼
        goto cleanup_none;  // 沒有東西需要清理
    }
    strcpy(s->name, name);

    s->scores = calloc(count, sizeof(int));
    if (s->scores == NULL) {
        ret = -2;
        goto cleanup_name;  // 需要清理 name
    }
    s->count = count;

    // 模擬另一個可能失敗的步驟
    printf("初始化學生 %s（%d 筆成績）\n", s->name, count);
    return 0;  // ✅ 成功

    // 集中錯誤處理區
cleanup_name:
    free(s->name);
    s->name = NULL;
cleanup_none:
    return ret;
}

void free_student(Student *s) {
    free(s->name);
    free(s->scores);
}

int main() {
    Student s;
    if (init_student(&s, "小明", 5) < 0) {
        printf("初始化失敗！\n");
        return 1;
    }
    free_student(&s);
    return 0;
}
```

#### goto 錯誤處理模式的優勢

| 方式 | 問題 |
|------|------|
| ❌ 巢狀 if-else | 越巢越深，最後程式碼歪到螢幕外 |
| ❌ 每個錯誤點都寫 cleanup | 重複、容易遺漏、修改困難 |
| ✅ goto + 單一出口 | 乾淨、可擴展、每個層級知道要清理什麼 |

> 💡 這個模式在 C 語言中如此普遍，以至於 Linux 核心編碼規範明確指出：「**goto 用在集中式錯誤處理是可以接受的**」。

### goto 的限制

```c
// ✅ 可以在同一個函式內跳躍
goto target;
target:

// ❌ 不能跳過 variable-length array（VLA）的宣告
if (1) {
    goto skip;
    int arr[n];  // ❌ 跳過 VLA 宣告是未定義行為
skip:
    ;
}

// ❌ 不能跳到另一個函式
void func1() { goto target; }
void func2() { target: ; }  // ❌ target 標籤不在 func1 的作用域內
```

---

## setjmp / longjmp — 跨函式跳躍

`goto` 只能在同一個函式內跳躍。`setjmp` / `longjmp` 則允許**跨函式跳躍**——就像一個強化版的 goto。

### 概念

```
正常流程：
main() → func1() → func2() → [錯誤！] → longjmp() 
                                    ↓
                              回到 setjmp() 的位置（func1 中）

┌─────────────────────────────────────────────┐
│ 想像一個遙控器：                              │
│ setjmp() = 設定「回到這裡」的書籤              │
│ longjmp() = 按下「回到書籤」的按鈕             │
└─────────────────────────────────────────────┘
```

### 基本範例

```c
#include <stdio.h>
#include <setjmp.h>

jmp_buf env;  // 全域變數，儲存「跳躍點」

void depth2() {
    printf("    depth2 開始\n");
    longjmp(env, 42);  // ⭐ 跳回 setjmp() 的位置，回傳值 42
    printf("    depth2 結束（你永遠看不到這行）\n");
}

void depth1() {
    printf("  depth1 開始\n");
    depth2();
    printf("  depth1 結束（這行也不會執行）\n");
}

int main() {
    printf("main 開始\n");

    int val = setjmp(env);  // ⭐ 設定跳躍點
    if (val == 0) {
        // 第一次執行到這裡（直接呼叫）
        printf("呼叫 depth1（val = %d）\n", val);
        depth1();
    } else {
        // 從 longjmp 跳回來
        printf("跳回來了！（val = %d）\n", val);
    }

    printf("main 結束\n");
    return 0;
}
```

輸出：
```
main 開始
呼叫 depth1（val = 0）
  depth1 開始
    depth2 開始
跳回來了！（val = 42）
main 結束
```

### 實務應用：深度巢狀錯誤處理

當錯誤發生在巢狀函式深處時，`longjmp` 可以直接回到頂層的錯誤處理區：

```c
#include <stdio.h>
#include <setjmp.h>
#include <stdlib.h>

jmp_buf error_handler;
#define ERROR_NETWORK  1
#define ERROR_FILE     2
#define ERROR_MEMORY   3

void connect_to_server() {
    printf("  連接到伺服器...\n");
    // 模擬網路錯誤
    longjmp(error_handler, ERROR_NETWORK);
}

void read_config() {
    printf(" 讀取設定檔...\n");
    connect_to_server();
    printf(" 設定檔讀取完成\n");
}

void process_data() {
    printf(" 處理資料...\n");
    read_config();
    printf(" 資料處理完成\n");
}

int main() {
    int err = setjmp(error_handler);

    if (err == 0) {
        // 正常流程
        printf("開始處理...\n");
        process_data();
        printf("全部完成！\n");
    } else {
        // 錯誤處理（無論多深都會跳回來）
        switch (err) {
            case ERROR_NETWORK:
                printf("❗ 網路錯誤\n");
                break;
            case ERROR_FILE:
                printf("❗ 檔案錯誤\n");
                break;
            case ERROR_MEMORY:
                printf("❗ 記憶體不足\n");
                break;
        }
        // 進行清理工作...
    }

    return 0;
}
```

### 與例外處理的類比

```c
// C 語言的模擬
jmp_buf try_block;

void risky_function() {
    if (something_bad) longjmp(try_block, 1);
}

// 使用方式類似 try-catch
if (setjmp(try_block) == 0) {
    // try 區塊
    risky_function();
} else {
    // catch 區塊
    handle_error();
}
```

> ⚠️ **注意**：`setjmp` / `longjmp` 有以下限制：
> 1. `longjmp` 跳回時，`setjmp` 所在函式中的區域變數**值是不確定的**——如果它們被修改過，需要加 `volatile` 確保正確
> 2. 不要在 `setjmp` 的條件表達式中使用複雜運算
> 3. 資源管理要小心——`longjmp` 會跳過 `malloc` 後的 `free`

```c
#include <stdio.h>
#include <setjmp.h>

jmp_buf env;

void func() {
    int normal_var = 10;
    volatile int vol_var = 10;

    normal_var = 20;
    vol_var = 20;

    longjmp(env, 1);

    // 跳回去之後：
    // normal_var 的值可能是 10 或 20（不確定！）
    // vol_var 的值確定是 20
}

int main() {
    if (setjmp(env) == 0) {
        func();
    } else {
        // normal_var 無法存取（在 func 的作用域內）
        // 這是 setjmp/longjmp 的已知陷阱
    }
    return 0;
}
```

---

## va_list — 可變參數函式

`printf` 可以接收任意數量的參數——這種函式就是透過 `stdarg.h` 提供的機制實作的。

### 基本步驟

使用可變參數的四個步驟：

| 步驟 | 巨集/型別 | 說明 |
|------|----------|------|
| 1 | `va_list ap` | 宣告一個參數列表變數 |
| 2 | `va_start(ap, last_named)` | 初始化參數列表 |
| 3 | `va_arg(ap, type)` | 逐一取得參數 |
| 4 | `va_end(ap)` | 清理參數列表 |

### 範例：自訂求和函式

```c
#include <stdio.h>
#include <stdarg.h>     // 需要引入這個標頭檔

// count 是參數個數，後面跟著 count 個 int
int sum(int count, ...) {
    va_list args;           // 1. 宣告
    int total = 0;

    va_start(args, count);  // 2. 初始化（最後一個具名參數）

    for (int i = 0; i < count; i++) {
        int val = va_arg(args, int);  // 3. 取得下一個 int 參數
        total += val;
    }

    va_end(args);           // 4. 清理
    return total;
}

int main() {
    printf("sum(2, 10, 20) = %d\n", sum(2, 10, 20));       // 30
    printf("sum(5, 1,2,3,4,5) = %d\n", sum(5, 1,2,3,4,5)); // 15
    printf("sum(0) = %d\n", sum(0));                        // 0

    return 0;
}
```

### 實作自己的 printf

```c
#include <stdio.h>
#include <stdarg.h>

void my_printf(const char *format, ...) {
    va_list args;
    va_start(args, format);

    for (const char *p = format; *p != '\0'; p++) {
        if (*p != '%') {
            putchar(*p);
            continue;
        }

        switch (*++p) {  // 跳到格式指定字元
            case 'd': {
                int val = va_arg(args, int);
                printf("%d", val);
                break;
            }
            case 'f': {
                double val = va_arg(args, double);
                // ⚠️ 在可變參數中，float 會自動提升為 double
                printf("%f", val);
                break;
            }
            case 's': {
                char *val = va_arg(args, char*);
                printf("%s", val);
                break;
            }
            case 'c': {
                int val = va_arg(args, int);
                // ⚠️ char 會自動提升為 int
                putchar(val);
                break;
            }
            case '%':
                putchar('%');
                break;
            default:
                putchar('%');
                putchar(*p);
        }
    }

    va_end(args);
}

int main() {
    my_printf("Hello, %s! 分數：%d / %d，平均：%.1f\n",
              "小明", 85, 100, 85.0);
    return 0;
}
```

### 類型提升陷阱

在可變參數中，整數和浮點數會自動「提升」：

| 宣告的型別 | 實際上 va_arg 要讀取的型別 |
|-----------|-------------------------|
| `char` | `int` |
| `short` | `int` |
| `float` | `double` |
| `int` | `int` |
| `double` | `double` |

```c
#include <stdio.h>
#include <stdarg.h>

void print_values(int count, ...) {
    va_list args;
    va_start(args, count);

    for (int i = 0; i < count; i++) {
        double val = va_arg(args, double);  // 一律用 double 讀取
        printf("%.2f ", val);
    }
    printf("\n");

    va_end(args);
}

int main() {
    // 傳入 float 和 double 都可以
    print_values(3, 1.5f, 2.5, 3.0f);
    // 輸出：1.50 2.50 3.00 （float 自動提升為 double）
    return 0;
}
```

### 哨兵終止模式（不需傳入個數）

```c
#include <stdio.h>
#include <stdarg.h>

double average(double first, ...) {
    // 用 0.0 作為終止標記
    double sum = first;
    int count = 1;

    va_list args;
    va_start(args, first);

    double val;
    while ((val = va_arg(args, double)) != 0.0) {
        sum += val;
        count++;
    }

    va_end(args);

    return sum / count;
}

int main() {
    // 最後一個 0.0 是終止信號
    printf("平均：%.2f\n", average(85.5, 92.0, 78.5, 88.0, 0.0));
    return 0;
}
```

> ⚠️ 哨兵模式有風險——如果呼叫者忘記最後的哨兵值，函式會一直讀取堆疊上的垃圾數據，導致未定義行為。

### vprintf — 封裝 printf 風格函式

當你需要把 `va_list` 傳給另一個函式時，使用 `v...` 版本的 printf：

```c
#include <stdio.h>
#include <stdarg.h>

void log_message(const char *level, const char *format, ...) {
    va_list args;
    va_start(args, format);

    printf("[%s] ", level);
    vprintf(format, args);   // ✅ vprintf 接受 va_list

    va_end(args);
}

void error(const char *format, ...) {
    va_list args;
    va_start(args, format);

    fprintf(stderr, "[ERROR] ");
    vfprintf(stderr, format, args);  // ✅ vfprintf

    va_end(args);
}

int main() {
    log_message("INFO", "使用者 %s 登入成功\n", "小明");
    log_message("WARN", "磁碟空間剩餘 %d%%\n", 15);
    error("無法開啟檔案：%s\n", "config.ini");

    return 0;
}
```

---

## 三者的比較

| 機制 | 頭檔 | 跳躍範圍 | 典型用途 |
|------|------|---------|---------|
| `goto` | 無 | 同一個函式內 | 集中錯誤處理、跳出巢狀迴圈 |
| `setjmp`/`longjmp` | `<setjmp.h>` | 跨函式（同一個執行緒） | 深度巢狀錯誤恢復、模擬例外處理 |
| `va_list` | `<stdarg.h>` | 不涉及跳躍 | 可變參數函式（printf 風格） |

---

## 本章重點整理

| 主題 | 要點 |
|------|------|
| goto 的正確用法 | 集中錯誤處理（single exit point pattern） |
| goto 的濫用 | 造成義大利麵程式碼，永遠不要亂跳 |
| setjmp/longjmp | 跨函式跳躍，類比 try-catch |
| setjmp 回傳值 | 0 = 直接呼叫，非 0 = longjmp 跳回 |
| volatile + jmp_buf | 確保區域變數在 longjmp 後值正確 |
| va_list | 可變參數的四步驟：start → arg → arg → end |
| 型別提升 | float → double, char/short → int |
| vprintf 系列 | 封裝可變參數函式時的標準方式 |

---

## 練習題

### 練習 1：goto 錯誤處理

撰寫一個 `read_user_data()` 函式，依序配置三個緩衝區，每個配置都可能失敗。使用 goto 模式進行錯誤清理。

### 練習 2：可變參數格式化

使用 `va_list` 實作 `void print_csv(int count, ...)`，將所有參數以逗號分隔輸出。例如 `print_csv(4, "A", "B", "C", "D")` 輸出 `A,B,C,D`。

### 練習 3：log 封裝

使用 `vprintf` 封裝一個 `log_to_file(FILE *fp, const char *format, ...)` 函式，將格式化訊息寫入指定的檔案。

### 練習 4：setjmp 模擬 try-catch

使用 `setjmp` / `longjmp` 模擬一個簡單的 try-catch 機制，支援至少三種不同的錯誤類型。

---

至此，C 語言基礎篇共 16 章全部完成！🎉

前往 [目錄](./index.md) 回顧所有章節 🚀
