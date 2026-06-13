# 07 - ITS Python 認證準備

## 🎯 學習目標

- 了解 ITS Python 認證考試的格式與範圍
- 掌握五大核心主題的重點概念
- 熟悉常考題型與答題技巧
- 透過練習題驗證學習成果
- 建立考前衝刺的複習架構

---

## ITS 認證概述

**ITS（Information Technology Specialist）** 是由 Certiport 推出的國際資訊科技專業人員認證，其中 **Python 認證（Exam: 98-381）** 專為初階至中階的 Python 開發者設計。

### 考試格式

| 項目 | 說明 |
|------|------|
| 題數 | 40–60 題 |
| 時間 | 45 分鐘 |
| 題型 | 選擇題、拖曳題、程式碼完成題 |
| 及格分數 | 70%（約 28–42 題正確） |
| 語言 | 英文（關鍵字為英文） |

### 考試範圍與比重

| 主題 | 比重 |
|------|------|
| 資料類型與運算（Data Types） | ~20% |
| 流程控制（Flow Control） | ~25% |
| 函式與模組（Functions & Modules） | ~25% |
| 資料結構（Data Structures） | ~20% |
| 物件導向程式設計（OOP） | ~10% |

---

## 主題重點複習

### 1. 資料類型與運算（~20%）

#### 內建資料類型

```python
# 數值類型
x = 42          # int
y = 3.14        # float
z = 1 + 2j      # complex

# 字串
s1 = "hello"
s2 = 'world'
s3 = f"PI is {3.14:.2f}"  # f-string

# 布林
is_valid = True
is_done = False

# None
result = None
```

#### 型別轉換

```python
int("42")       # 42
float("3.14")   # 3.14
str(100)        # "100"
bool(0)         # False
bool(1)         # True
bool([])        # False（空容器為 False）
```

#### 常用運算子

```python
# 算術
x // y   # 整數除法
x % y    # 取餘數
x ** y   # 指數

# 比較
==  !=  >  <  >=  <=

# 邏輯
and  or  not

# 成員
in  not in

# 身份
is  is not
```

---

### 2. 流程控制（~25%）

#### 條件判斷

```python
# if-elif-else
score = 85
if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
else:
    grade = "D"

# 三元運算子
status = "pass" if score >= 60 else "fail"
```

#### 迴圈

```python
# for 迴圈
for i in range(5):        # 0, 1, 2, 3, 4
    print(i)

for i in range(2, 10, 2):  # 2, 4, 6, 8
    print(i)

for idx, val in enumerate(["a", "b", "c"]):
    print(idx, val)

# while 迴圈
n = 0
while n < 5:
    print(n)
    n += 1

# break / continue
for i in range(10):
    if i == 3:
        continue    # 跳過 3
    if i == 7:
        break       # 停在 7
    print(i)
```

#### 例外處理

```python
try:
    x = int(input("請輸入數字: "))
    result = 10 / x
except ValueError:
    print("請輸入有效數字")
except ZeroDivisionError:
    print("不能除以零")
else:
    print(f"結果: {result}")
finally:
    print("執行完畢")
```

---

### 3. 函式與模組（~25%）

#### 函式定義

```python
# 基本函式
def greet(name):
    return f"Hello, {name}"

# 預設參數
def power(base, exp=2):
    return base ** exp

# 關鍵字參數
power(exp=3, base=2)  # 8

# 可變長度參數
def sum_all(*args):        # tuple
    return sum(args)

def print_info(**kwargs):  # dict
    for k, v in kwargs.items():
        print(f"{k}: {v}")

# 回傳多值
def min_max(lst):
    return min(lst), max(lst)  # tuple
```

#### 變數作用域

```python
x = 10          # 全域變數

def foo():
    global x    # 宣告使用全域 x
    x = 20
    y = 5       # 區域變數
```

#### 匿名函式（lambda）

```python
square = lambda x: x ** 2
sorted([(1, "b"), (2, "a")], key=lambda item: item[1])
```

#### 模組與套件

```python
# 匯入整個模組
import math
math.sqrt(16)

# 匯入特定函式
from random import randint, choice
randint(1, 10)
choice(["a", "b", "c"])

# 別名
import datetime as dt
dt.datetime.now()
```

---

### 4. 資料結構（~20%）

#### List（串列）

```python
lst = [1, 2, 3, 4, 5]
lst.append(6)       # [1, 2, 3, 4, 5, 6]
lst.insert(0, 0)    # [0, 1, 2, 3, 4, 5, 6]
lst.remove(3)       # 移除第一個 3
lst.pop()           # 移除並回傳最後一個
lst.sort()          # 原地排序
lst.reverse()       # 反轉

# 串列推導式
squares = [x**2 for x in range(10) if x % 2 == 0]
```

#### Tuple（元組）

```python
t = (1, 2, 3)       # 不可變
x, y, z = t         # 解構賦值
single = (1,)       # 單元素需加逗號
```

#### Dictionary（字典）

```python
d = {"a": 1, "b": 2, "c": 3}
d["d"] = 4
d.get("e", 0)           # 0（避免 KeyError）
d.keys()                # dict_keys(["a", "b", "c"])
d.values()              # dict_values([1, 2, 3])
d.items()               # dict_items([("a", 1), ...])
d.pop("a")              # 移除並回傳值

# 字典推導式
squares = {x: x**2 for x in range(5)}
```

#### Set（集合）

```python
s = {1, 2, 3, 3, 3}    # {1, 2, 3}（自動去重）
s.add(4)
s.remove(2)

a = {1, 2, 3}
b = {3, 4, 5}
a | b  # 聯集 {1, 2, 3, 4, 5}
a & b  # 交集 {3}
a - b  # 差集 {1, 2}
```

---

### 5. 物件導向程式設計（~10%）

#### 類別與物件

```python
class Animal:
    species = "未知"  # 類別屬性

    def __init__(self, name, age):
        self.name = name  # 實例屬性
        self.age = age

    def speak(self):
        return f"{self.name} 發出聲音"

    @classmethod
    def set_species(cls, s):
        cls.species = s

    @staticmethod
    def info():
        return "這是一個動物類別"

dog = Animal("小黑", 3)
print(dog.speak())  # "小黑 發出聲音"
```

#### 繼承

```python
class Dog(Animal):
    def __init__(self, name, age, breed):
        super().__init__(name, age)
        self.breed = breed

    def speak(self):  # 方法覆寫
        return f"{self.name} 汪汪！"

    def __str__(self):  # 特殊方法
        return f"Dog({self.name}, {self.breed})"
```

#### 封裝

```python
class BankAccount:
    def __init__(self, balance):
        self.__balance = balance  # 私有屬性（name mangling）

    def deposit(self, amount):
        if amount > 0:
            self.__balance += amount

    def get_balance(self):  # getter
        return self.__balance
```

---

## 練習題（20+ 題）

### 題組一：資料類型與運算

**1.** 下列何者為 `3 ** 2 ** 3` 的結果？
A) 729
B) 6561
C) 512
D) 19683

**2.** 執行 `bool([])` 會回傳什麼？
A) True
B) False
C) None
D) 錯誤

**3.** 下列哪個不是 Python 的合法變數名稱？
A) `_name`
B) `2nd_place`
C) `my_var`
D) `__class__`

**4.** `print(type(3.0))` 的輸出為何？
A) `<class 'int'>`
B) `<class 'float'>`
C) `<class 'double'>`
D) `<class 'number'>`

**5.** 執行 `print(0.1 + 0.2 == 0.3)` 的結果為何？
A) True
B) False
C) None
D) 錯誤

---

### 題組二：流程控制

**6.** 下列程式碼輸出為何？
```python
for i in range(3):
    if i == 1:
        break
    print(i)
```
A) 0
B) 0 1
C) 0 1 2
D) 1 2

**7.** 下列何者會印出「通過」？
A) `print("通過") if score >= 60`
B) `print("通過") if score >= 60 else print("")`
C) `"通過" if score >= 60`
D) `print("通過") if score >= 60 else None`

**8.** 下列程式碼輸出為何？
```python
x = 10
while x > 0:
    x -= 3
print(x)
```
A) 0
B) -2
C) 1
D) 3

**9.** `range(5, 0, -1)` 會產生哪些數字？
A) [5, 4, 3, 2, 1]
B) [5, 4, 3, 2, 1, 0]
C) [4, 3, 2, 1, 0]
D) [4, 3, 2, 1]

**10.** 下列程式碼輸出為何？
```python
for i in range(4):
    if i % 2 == 0:
        continue
    print(i, end=" ")
```
A) 1 3
B) 0 2
C) 0 1 2 3
D) 0 2 4

---

### 題組三：函式與模組

**11.** 下列程式碼輸出為何？
```python
def func(a, b=[]):
    b.append(a)
    return b

print(func(1))
print(func(2))
```
A) [1] [2]
B) [1] [1, 2]
C) [2] [1, 2]
D) 錯誤

**12.** 下列哪個是正確的 lambda 語法？
A) `lambda x, y: x + y`
B) `lambda x, y: return x + y`
C) `lambda (x, y): x + y`
D) `lambda x; y: x + y`

**13.** `math.floor(-3.7)` 的結果為何？
A) -3
B) -4
C) 3
D) 4

**14.** 下列程式碼執行後 `x` 的值為何？
```python
x = 5
def change():
    x = 10
change()
```
A) 5
B) 10
C) None
D) 錯誤

**15.** `sum(range(1, 6))` 的結果為何？
A) 10
B) 15
C) 20
D) 21

---

### 題組四：資料結構

**16.** `sorted([3, 1, 2], reverse=True)` 的結果為何？
A) [1, 2, 3]
B) [3, 2, 1]
C) [3, 1, 2]
D) 錯誤

**17.** 下列何者不能做為 dictionary 的 key？
A) 整數
B) 字串
C) 串列
D) 元組

**18.** 下列程式碼輸出為何？
```python
d = {"x": 10, "y": 20}
d["z"] = d.get("z", 0) + 5
print(d)
```
A) `{'x': 10, 'y': 20, 'z': 5}`
B) `{'x': 10, 'y': 20, 'z': 0}`
C) `{'x': 10, 'y': 20}`
D) 錯誤

**19.** `list({1, 2, 3, 2, 1})` 的結果為何？
A) [1, 2, 3]
B) [1, 2, 3, 2, 1]
C) {1, 2, 3}
D) 錯誤

**20.** 下列哪個程式碼會產生 `[1, 4, 9, 16, 25]`？
A) `[x**2 for x in range(6)]`
B) `[x**2 for x in range(1, 6)]`
C) `[x**2 for x in [1..5]]`
D) `[x*2 for x in range(1, 6)]`

---

### 題組五：OOP 與綜合

**21.** 下列程式碼輸出為何？
```python
class A:
    def __init__(self, x):
        self.x = x

a = A(5)
print(hasattr(a, "x"))
```
A) True
B) False
C) None
D) 錯誤

**22.** 下列何者是正確的繼承語法？
A) `class Dog extends Animal:`
B) `class Dog(Animal):`
C) `class Dog : Animal`
D) `class Dog <- Animal:`

**23.** 關於 `__init__` 方法的敘述，何者正確？
A) 必須回傳 self
B) 在物件建立時自動呼叫
C) 只能定義一個建構子
D) 沒有 self 參數也可以

**24.** 下列程式碼輸出為何？
```python
class Parent:
    def show(self):
        print("Parent")

class Child(Parent):
    def show(self):
        print("Child")

obj = Child()
obj.show()
```
A) Parent
B) Child
C) 錯誤
D) None

**25.** 執行 `isinstance(3.14, (int, float))` 會回傳？
A) True
B) False
C) None
D) 錯誤

---

## 常見考試陷阱

1. **浮點數精度問題** — `0.1 + 0.2 != 0.3`，比較浮點數時應用 `round()` 或 `math.isclose()`
2. **可變預設參數** — 函式預設值為可變物件（如 list）時，會在不同呼叫間共享
3. **變數作用域** — 函式內直接賦值會建立區域變數，需用 `global` 宣告
4. **淺拷貝 vs 深拷貝** — `list.copy()` 只拷貝第一層，嵌套物件仍共享
5. **`is` vs `==`** — `is` 比較身份（記憶體位置），`==` 比較值
6. **字串不可變** — `s[0] = "a"` 會拋出 `TypeError`
7. **集合無順序** — set 不保證元素順序
8. **例外處理順序** — `except` 子句從上到下匹配，子類別例外應寫在前面
9. **切片邊界** — `s[:n]` 取前 n 個，`s[-1]` 取最後一個
10. **`and` / `or` 短路求值** — `False and x` 不會執行 x，`True or x` 也不會

## 應試策略

- **時間管理**：45 分鐘約 50 題，每題控制在 50 秒內
- **先跳過難題**：超過 1 分鐘沒頭緒就先標記，回頭再寫
- **刪去法**：排除明顯錯誤的選項，提高猜對機率
- **注意關鍵字**：題目中的「not」、「always」、「never」、「except」等字
- **讀完所有選項**：選擇「最佳」答案，而非第一個看似正確的
- **程式碼題逐步追蹤**：在紙上或心裡逐步執行，記錄變數變化
- **檢查邊界條件**：特別注意 `range` 邊界、空容器、負數情況
- **複習題目**：留 5 分鐘檢查被標記的題目

---

## 解答與解析

| 題號 | 答案 | 解析 |
|------|------|------|
| 1 | B | `**` 為右結合：`3 ** (2 ** 3) = 3 ** 8 = 6561` |
| 2 | B | 空串列、空字典、空集合、0、None 在布林語境皆為 False |
| 3 | B | 變數名稱不能以數字開頭 |
| 4 | B | `3.0` 是 float 型別 |
| 5 | B | 浮點數二進位表示造成精度誤差，`0.1 + 0.2 = 0.30000000000000004` |
| 6 | A | `i == 1` 時 `break` 跳出迴圈，只印出 0 |
| 7 | B | Python 三元運算子語法為 `A if condition else B` |
| 8 | B | 迴圈：10→7→4→1→-2，跳出時 `x = -2` |
| 9 | A | `range(5, 0, -1)` 從 5 遞減到 1 |
| 10 | A | `continue` 跳過偶數，只印出 1 和 3 |
| 11 | B | 可變預設參數 `b` 在不同呼叫間共享，第一次 `[1]`，第二次 `[1, 2]` |
| 12 | A | lambda 不需 `return`，會自動回傳表達式結果 |
| 13 | B | `floor` 往負無限大取整，`-3.7` → `-4` |
| 14 | A | 函式內的 `x` 是區域變數，不影響外層的 `x` |
| 15 | B | `range(1, 6)` → 1+2+3+4+5 = 15 |
| 16 | B | `reverse=True` 降冪排序 |
| 17 | C | 串列（list）是可變的（unhashable），不能做為 dict key |
| 18 | A | `d.get("z", 0)` 回傳 0，加 5 後設為 `"z": 5` |
| 19 | A | set 會自動去重，轉為 list 後為 `[1, 2, 3]`（順序不定，但此例為 1, 2, 3） |
| 20 | B | `range(1, 6)` 產生 1~5，平方後得 1, 4, 9, 16, 25 |
| 21 | A | `a` 有 `x` 屬性，`hasattr` 回傳 True |
| 22 | B | Python 使用 `class Child(Parent):` 語法繼承 |
| 23 | B | `__init__` 在建立物件時自動呼叫，不需手動調用 |
| 24 | B | `Child` 覆寫了 `show` 方法，呼叫子類別版本 |
| 25 | A | `3.14` 是 `float` 的實例，`isinstance` 回傳 True |

---

## 重點整理

| 主題 | 核心要點 |
|------|----------|
| **資料類型** | int / float / str / bool 轉換、運算子優先級、浮點數精度 |
| **流程控制** | if-elif-else、for / while 迴圈、break / continue 時機 |
| **函式與模組** | 參數傳遞（位置/關鍵字/預設/*args/**kwargs）、作用域、lambda |
| **資料結構** | list / tuple / dict / set 的操作與特性、推導式 |
| **OOP** | class、`__init__`、繼承、方法覆寫、封裝、特殊方法 |
| **常見陷阱** | 可變預設參數、is vs ==、淺拷貝、短路求值 |
| **應試技巧** | 時間分配、刪去法、邊界檢查、預留檢查時間 |

> **考前提醒**：熟練閱讀程式碼的執行路徑，特別注意變數作用域和可變物件的行為。ITS 認證考題注重實戰能力，理解「為什麼」比背誦「是什麼」更重要！
