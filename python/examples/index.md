# 📝 程式碼範例

這裡收錄了各篇章中使用的完整程式碼範例，方便你直接參考與執行。

## 基礎篇範例

### Hello, World!

```python
# 第一個 Python 程式
print("Hello, World!")
```

### 變數與資料型別

```python
# 基本資料型別
name = "Alice"          # 字串 (str)
age = 25                # 整數 (int)
height = 165.5         # 浮點數 (float)
is_student = True       # 布林值 (bool)

print(f"我叫 {name}，今年 {age} 歲")
print(f"身高 {height} 公分，學生身份: {is_student}")
```

### 列表操作

```python
# 列表基本操作
fruits = ["蘋果", "香蕉", "橘子"]
fruits.append("葡萄")      # 新增元素
fruits.remove("香蕉")       # 移除元素
print(fruits)               # ['蘋果', '橘子', '葡萄']

# 列表推導式
squares = [x**2 for x in range(10)]
print(squares)              # [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]
```

## 進階篇範例

### 類別定義

```python
class Dog:
    """狗狗類別"""
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def bark(self):
        return f"{self.name} 說: 汪！"

    def __str__(self):
        return f"{self.name} ({self.age} 歲)"

# 建立物件
my_dog = Dog("Buddy", 3)
print(my_dog.bark())        # Buddy 說: 汪！
print(my_dog)               # Buddy (3 歲)
```

### 生成器

```python
def fibonacci(limit):
    """斐波那契數列生成器"""
    a, b = 0, 1
    while a < limit:
        yield a
        a, b = b, a + b

# 使用生成器
for num in fibonacci(100):
    print(num, end=" ")
# 輸出: 0 1 1 2 3 5 8 13 21 34 55 89
```

## 實戰篇範例

### 網路請求

```python
import requests

# 發送 GET 請求
response = requests.get("https://api.github.com")
data = response.json()

print(f"GitHub API 狀態: {data['current_user_url']}")
```

### 檔案處理

```python
# 使用 with 語句安全讀寫檔案
with open("example.txt", "w", encoding="utf-8") as f:
    f.write("Hello, Python!\n")
    f.write("這是一個檔案操作範例。\n")

# 讀取檔案
with open("example.txt", "r", encoding="utf-8") as f:
    content = f.read()
    print(content)
```

---

> 💡 每個範例都可以直接複製貼上到你的 Python 環境中執行！
