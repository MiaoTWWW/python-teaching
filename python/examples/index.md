# 📝 程式碼範例

這裡收錄了各篇章中使用的完整程式碼範例，方便你直接參考與執行。

---

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

### 流程控制

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
print(f"成績 {score} 分，等級 {grade}")

# for 迴圈
for i in range(5):
    print(f"第 {i+1} 次迭代")

# while 迴圈 + break
n = 0
while True:
    n += 1
    if n >= 5:
        break
    print(n)
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

# 字典操作
student = {"name": "Alice", "age": 25, "grade": "A"}
for key, value in student.items():
    print(f"{key}: {value}")
```

### 字串處理

```python
# 常用字串方法
text = "  Hello, Python World!  "
print(text.strip())             # 去除前後空白
print(text.lower())             # 轉小寫
print(text.upper())             # 轉大寫
print(text.replace("World", "Taiwan"))
print(text.split(","))          # 分割字串

# f-string 格式化
name = "Python"
version = 3.12
print(f"歡迎使用 {name} {version}！")

# 字串反轉
s = "abcdef"
print(s[::-1])  # fedcba
```

---

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

### 繼承

```python
class Animal:
    def __init__(self, name):
        self.name = name
    def speak(self):
        pass

class Cat(Animal):
    def speak(self):
        return f"{self.name} 說: 喵～"

class Dog(Animal):
    def speak(self):
        return f"{self.name} 說: 汪！"

animals = [Cat("Mimi"), Dog("Buddy")]
for a in animals:
    print(a.speak())
```

### 錯誤處理

```python
# try-except-finally
def divide(a, b):
    try:
        result = a / b
    except ZeroDivisionError:
        print("錯誤：不能除以零！")
        return None
    except TypeError:
        print("錯誤：請輸入數字！")
        return None
    else:
        print(f"{a} / {b} = {result}")
        return result
    finally:
        print("運算結束")

divide(10, 2)   # 正常
divide(10, 0)   # 除以零
divide(10, "a") # 型別錯誤
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

### 裝飾器

```python
import time

def timer(func):
    """計算函式執行時間的裝飾器"""
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)
        elapsed = time.perf_counter() - start
        print(f"{func.__name__} 耗時 {elapsed:.4f} 秒")
        return result
    return wrapper

@timer
def slow_function():
    total = sum(range(10_000_000))
    return total

result = slow_function()
```

---

## 實戰篇範例

### 網路請求

```python
import requests

# 發送 GET 請求
response = requests.get("https://api.github.com")
data = response.json()
print(f"GitHub API 狀態: {data['current_user_url']}")

# 發送 POST 請求
payload = {"title": "測試", "body": "Hello"}
headers = {"Content-Type": "application/json"}
r = requests.post("https://jsonplaceholder.typicode.com/posts",
                  json=payload)
print(f"建立完成，ID: {r.json()['id']}")
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

# CSV 讀寫
import csv
data = [["name", "age"], ["Alice", 25], ["Bob", 30]]
with open("data.csv", "w", newline="", encoding="utf-8") as f:
    writer = csv.writer(f)
    writer.writerows(data)
```

### 資料庫操作

```python
import sqlite3

conn = sqlite3.connect("example.db")
cursor = conn.cursor()

# 建立資料表
cursor.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        age INTEGER
    )
""")

# 插入資料
cursor.execute("INSERT INTO users (name, age) VALUES (?, ?)",
               ("Alice", 25))
conn.commit()

# 查詢資料
cursor.execute("SELECT * FROM users")
for row in cursor.fetchall():
    print(row)

conn.close()
```

### 執行緒

```python
import threading
import time

def worker(name, delay):
    for i in range(3):
        print(f"{name}: 第 {i+1} 次執行")
        time.sleep(delay)

# 建立執行緒
threads = []
for i in range(3):
    t = threading.Thread(target=worker, args=(f"T{i}", 0.5))
    threads.append(t)
    t.start()

# 等待所有執行緒完成
for t in threads:
    t.join()

print("所有執行緒完成")
```

---

## 演算法篇範例

### 二元搜尋法

```python
def binary_search(arr, target):
    """二元搜尋法"""
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1

arr = [1, 3, 5, 7, 9, 11, 13]
print(binary_search(arr, 7))   # 3
print(binary_search(arr, 4))   # -1
```

### 排序（快速排序）

```python
def quick_sort(arr):
    """快速排序"""
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quick_sort(left) + middle + quick_sort(right)

print(quick_sort([3, 6, 8, 10, 1, 2, 1]))  # [1, 1, 2, 3, 6, 8, 10]
```

### 堆疊 (Stack)

```python
# 用列表實作堆疊
stack = []
stack.append(1)    # push
stack.append(2)
stack.append(3)
print(stack.pop()) # 3 (pop)
print(stack.pop()) # 2
print(len(stack))  # 1 (size)

# 中置式轉後置式
def infix_to_postfix(expr):
    precedence = {'+': 1, '-': 1, '*': 2, '/': 2}
    output = []
    stack = []
    for token in expr:
        if token.isdigit():
            output.append(token)
        elif token == '(':
            stack.append(token)
        elif token == ')':
            while stack and stack[-1] != '(':
                output.append(stack.pop())
            stack.pop()
        else:
            while (stack and stack[-1] != '(' and
                   precedence.get(stack[-1], 0) >= precedence.get(token, 0)):
                output.append(stack.pop())
            stack.append(token)
    while stack:
        output.append(stack.pop())
    return ''.join(output)

print(infix_to_postfix("1+2*3"))   # "123*+"
```

### 佇列 (Queue)

```python
from collections import deque

# 使用 deque 實作佇列
queue = deque()
queue.append(1)     # enqueue
queue.append(2)
queue.append(3)
print(queue.popleft())  # 1 (dequeue)
print(queue.popleft())  # 2

# BFS 走訪
def bfs(graph, start):
    visited = set()
    queue = deque([start])
    visited.add(start)
    while queue:
        node = queue.popleft()
        print(node, end=" ")
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)

graph = {
    1: [2, 3],
    2: [4, 5],
    3: [6],
    4: [], 5: [], 6: []
}
bfs(graph, 1)  # 1 2 3 4 5 6
```

### 樹的走訪

```python
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

# 建立樹
root = TreeNode(1)
root.left = TreeNode(2)
root.right = TreeNode(3)
root.left.left = TreeNode(4)
root.left.right = TreeNode(5)

# 前序：根 → 左 → 右
def preorder(node):
    if not node:
        return
    print(node.val, end=" ")
    preorder(node.left)
    preorder(node.right)

# 中序：左 → 根 → 右
def inorder(node):
    if not node:
        return
    inorder(node.left)
    print(node.val, end=" ")
    inorder(node.right)

# 後序：左 → 右 → 根
def postorder(node):
    if not node:
        return
    postorder(node.left)
    postorder(node.right)
    print(node.val, end=" ")

print("前序：", end=""); preorder(root)   # 1 2 4 5 3
print("\n中序：", end=""); inorder(root)    # 4 2 5 1 3
print("\n後序：", end=""); postorder(root)  # 4 5 2 3 1
```

### 遞迴 — 河內塔

```python
def hanoi(n, source, target, auxiliary):
    """河內塔"""
    if n == 1:
        print(f"移動碟子 1 從 {source} 到 {target}")
        return
    hanoi(n-1, source, auxiliary, target)
    print(f"移動碟子 {n} 從 {source} 到 {target}")
    hanoi(n-1, auxiliary, target, source)

hanoi(3, 'A', 'C', 'B')
```

### 動態規劃 — Fibonacci

```python
# 一般遞迴（很慢）
def fib_recursive(n):
    if n <= 1:
        return n
    return fib_recursive(n-1) + fib_recursive(n-2)

# DP Top-Down（記憶化）
def fib_memo(n, memo={}):
    if n in memo:
        return memo[n]
    if n <= 1:
        return n
    memo[n] = fib_memo(n-1, memo) + fib_memo(n-2, memo)
    return memo[n]

# DP Bottom-Up
def fib_dp(n):
    if n <= 1:
        return n
    dp = [0] * (n + 1)
    dp[1] = 1
    for i in range(2, n + 1):
        dp[i] = dp[i-1] + dp[i-2]
    return dp[n]

print(fib_dp(10))   # 55
```

### 動態規劃 — 0/1 背包

```python
def knapsack_01(weights, values, capacity):
    """0/1 背包問題"""
    n = len(weights)
    dp = [0] * (capacity + 1)
    for i in range(n):
        for w in range(capacity, weights[i] - 1, -1):
            dp[w] = max(dp[w], dp[w - weights[i]] + values[i])
    return dp[capacity]

weights = [2, 3, 4, 5]
values = [3, 4, 5, 6]
print(knapsack_01(weights, values, 5))  # 7
```

### Union-Find

```python
class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [0] * n

    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]

    def union(self, x, y):
        px, py = self.find(x), self.find(y)
        if px == py:
            return False
        if self.rank[px] < self.rank[py]:
            self.parent[px] = py
        elif self.rank[px] > self.rank[py]:
            self.parent[py] = px
        else:
            self.parent[py] = px
            self.rank[px] += 1
        return True

uf = UnionFind(5)
uf.union(0, 1)
uf.union(2, 3)
uf.union(1, 2)
print(uf.find(0) == uf.find(3))  # True (0-1-2-3)
print(uf.find(0) == uf.find(4))  # False
```

---

## 解題技巧範例

### 正規表示式

```python
import re

# 搜尋與提取
text = "聯絡電話：0912-345-678，Email: test@example.com"
phone = re.search(r"09\d{2}-\d{3}-\d{3}", text)
email = re.search(r"[\w.+-]+@[\w-]+\.[\w.]+", text)
print(phone.group())   # 0912-345-678
print(email.group())   # test@example.com

# 分割字串
data = "apple,banana;cherry|date"
print(re.split(r"[,;|]", data))  # ['apple','banana','cherry','date']

# 取代
print(re.sub(r"\d", "*", "密碼: 1234"))  # 密碼: ****
```

### 鏈結串列

```python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def create_linked_list(arr):
    if not arr:
        return None
    head = ListNode(arr[0])
    current = head
    for val in arr[1:]:
        current.next = ListNode(val)
        current = current.next
    return head

def traverse(head):
    current = head
    while current:
        print(current.val, end=" → ")
        current = current.next
    print("None")

# 反轉鏈結串列
def reverse_list(head):
    prev = None
    current = head
    while current:
        next_temp = current.next
        current.next = prev
        prev = current
        current = next_temp
    return prev

head = create_linked_list([1, 2, 3, 4])
traverse(head)               # 1 → 2 → 3 → 4 → None
traverse(reverse_list(head)) # 4 → 3 → 2 → 1 → None
```

### Kadane 演算法

```python
def max_subarray(nums):
    """最大連續子陣列和"""
    max_ending_here = max_so_far = nums[0]
    for num in nums[1:]:
        max_ending_here = max(num, max_ending_here + num)
        max_so_far = max(max_so_far, max_ending_here)
    return max_so_far

print(max_subarray([-2, 1, -3, 4, -1, 2, 1, -5, 4]))  # 6
```

### House Robber

```python
def house_robber(nums):
    if not nums:
        return 0
    if len(nums) == 1:
        return nums[0]
    prev2, prev1 = nums[0], max(nums[0], nums[1])
    for i in range(2, len(nums)):
        curr = max(prev1, prev2 + nums[i])
        prev2, prev1 = prev1, curr
    return prev1

print(house_robber([1, 2, 3, 1]))    # 4
print(house_robber([2, 7, 9, 3, 1])) # 12
```

### 編輯距離

```python
def edit_distance(str1, str2):
    m, n = len(str1), len(str2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(m + 1):
        dp[i][0] = i
    for j in range(n + 1):
        dp[0][j] = j
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if str1[i-1] == str2[j-1]:
                dp[i][j] = dp[i-1][j-1]
            else:
                dp[i][j] = 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])
    return dp[m][n]

print(edit_distance("kitten", "sitting"))  # 3
```

### 回溯法 — N 皇后

```python
def solve_n_queens(n):
    def is_safe(board, row, col):
        for i in range(row):
            if board[i] == col:
                return False
            if abs(board[i] - col) == abs(i - row):
                return False
        return True

    def backtrack(row):
        if row == n:
            result.append(board[:])
            return
        for col in range(n):
            if is_safe(board, row, col):
                board[row] = col
                backtrack(row + 1)
                board[row] = -1

    result = []
    board = [-1] * n
    backtrack(0)
    return result

solutions = solve_n_queens(4)
for sol in solutions:
    for col in sol:
        line = ['.'] * len(sol)
        line[col] = 'Q'
        print(' '.join(line))
    print()
```

---

> 💡 每個範例都可以直接複製貼上到你的 Python 環境中執行！
