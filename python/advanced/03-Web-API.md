# 03 - Web API 開發

> 🎯 **學習目標**：使用 FastAPI 建立現代化的 RESTful API。

## 什麼是 RESTful API？

RESTful API 是一種**網路應用程式介面**設計風格，使用 HTTP 方法來操作資源：

| HTTP 方法 | 操作 | SQL 對應 |
|-----------|------|---------|
| GET | 讀取資源 | SELECT |
| POST | 建立資源 | INSERT |
| PUT / PATCH | 更新資源 | UPDATE |
| DELETE | 刪除資源 | DELETE |

## FastAPI 簡介

FastAPI 是現代、快速的 Python Web 框架，特色包括：

- ⚡ 高效能（與 Node.js、Go 相當）
- 📝 自動產生 API 文件
- ✅ 內建資料驗證
- 🔄 非同步支援

### 安裝

```bash
pip install fastapi uvicorn
```

## 第一個 API

```python
# main.py
from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional

app = FastAPI(title="Python API 教學", version="1.0.0")

@app.get("/")
def root():
    return {"message": "Hello, World!"}

@app.get("/hello/{name}")
def hello(name: str):
    return {"message": f"Hello, {name}!"}
```

### 啟動伺服器

```bash
uvicorn main:app --reload

# 輸出：
# INFO: Uvicorn running on http://127.0.0.1:8000
# INFO: Application startup complete.
```

開啟瀏覽器前往：
- API 文件：`http://127.0.0.1:8000/docs`
- 替代文件：`http://127.0.0.1:8000/redoc`

## 路徑參數與查詢參數

```python
from fastapi import FastAPI
from typing import Optional

app = FastAPI()

# 路徑參數
@app.get("/users/{user_id}")
def get_user(user_id: int):  # 型別註記會自動驗證
    return {"user_id": user_id, "name": "Alice"}

# 查詢參數
@app.get("/search/")
def search(
    q: str,
    page: int = 1,           # 預設值
    limit: int = 10,         # 預設值
    sort: Optional[str] = None  # 可選參數
):
    return {
        "query": q,
        "page": page,
        "limit": limit,
        "sort": sort
    }

# 混合使用
@app.get("/items/{item_id}")
def get_item(
    item_id: int,
    detail: bool = False,
    version: Optional[int] = None
):
    return {
        "item_id": item_id,
        "detail": detail,
        "version": version
    }
```

## 請求體（Request Body）

```python
from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional

app = FastAPI()

# 定義資料模型
class Item(BaseModel):
    name: str
    description: Optional[str] = None
    price: float
    tax: Optional[float] = None

class ItemResponse(BaseModel):
    id: int
    name: str
    price: float
    total_price: float

# POST 請求
@app.post("/items/", response_model=ItemResponse)
def create_item(item: Item):
    total_price = item.price + (item.tax or 0)
    return ItemResponse(
        id=1,
        name=item.name,
        price=item.price,
        total_price=total_price
    )
```

## 完整的 CRUD API

```python
from fastapi import FastAPI, HTTPException, status
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

app = FastAPI(title="筆記本 API")

# 資料模型
class Note(BaseModel):
    title: str
    content: str
    tags: List[str] = []

class NoteCreate(BaseModel):
    title: str
    content: str
    tags: List[str] = []

class NoteUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    tags: Optional[List[str]] = None

# 模擬資料庫
notes_db = {}
next_id = 1

# 建立筆記
@app.post("/notes/", status_code=status.HTTP_201_CREATED)
def create_note(note: NoteCreate):
    global next_id
    note_id = next_id
    next_id += 1

    notes_db[note_id] = Note(
        id=note_id,
        title=note.title,
        content=note.content,
        tags=note.tags,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    return notes_db[note_id]

# 取得所有筆記
@app.get("/notes/")
def list_notes(skip: int = 0, limit: int = 10):
    notes = list(notes_db.values())
    return notes[skip:skip + limit]

# 取得單一筆記
@app.get("/notes/{note_id}")
def get_note(note_id: int):
    if note_id not in notes_db:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="筆記不存在"
        )
    return notes_db[note_id]

# 更新筆記
@app.put("/notes/{note_id}")
def update_note(note_id: int, note_update: NoteUpdate):
    if note_id not in notes_db:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="筆記不存在"
        )

    note = notes_db[note_id]
    update_data = note_update.model_dump(exclude_unset=True)

    for field, value in update_data.items():
        setattr(note, field, value)

    note.updated_at = datetime.now()
    notes_db[note_id] = note
    return note

# 刪除筆記
@app.delete("/notes/{note_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_note(note_id: int):
    if note_id not in notes_db:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="筆記不存在"
        )
    del notes_db[note_id]
    return None

# 搜尋筆記
@app.get("/notes/search/")
def search_notes(q: str):
    results = []
    for note in notes_db.values():
        if q.lower() in note.title.lower() or \
           q.lower() in note.content.lower():
            results.append(note)
    return results
```

## 中間件與 CORS

```python
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS 設定（允許前端跨域請求）
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],      # 生產環境應設為特定域名
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 自訂中間件
from fastapi import Request
import time

@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    response.headers["X-Process-Time"] = str(process_time)
    return response
```

## 錯誤處理

```python
from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import JSONResponse

app = FastAPI()

# 自訂例外
class CustomException(Exception):
    def __init__(self, name: str, message: str):
        self.name = name
        self.message = message

# 註冊例外處理器
@app.exception_handler(CustomException)
async def custom_exception_handler(request: Request, exc: CustomException):
    return JSONResponse(
        status_code=418,
        content={
            "error": exc.name,
            "message": exc.message
        }
    )

# 使用
@app.get("/error-demo/")
def error_demo(raise_error: bool = False):
    if raise_error:
        raise CustomException(
            name="demo_error",
            message="這是示範錯誤"
        )
    return {"message": "沒有錯誤"}
```

## 測試 API

使用 `httpx` 進行測試：

```bash
pip install httpx
```

```python
# test_api.py
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Hello, World!"}

def test_create_note():
    response = client.post("/notes/", json={
        "title": "測試筆記",
        "content": "這是一則測試",
        "tags": ["test"]
    })
    assert response.status_code == 201
    data = response.json()
    assert data["title"] == "測試筆記"

def test_get_nonexistent_note():
    response = client.get("/notes/9999")
    assert response.status_code == 404
```

## 重點整理

| 概念 | FastAPI 實作 |
|------|-------------|
| 路由 | `@app.get("/path")` |
| 路徑參數 | `{param}` |
| 查詢參數 | 函式參數 |
| 請求體 | Pydantic model |
| 資料驗證 | 型別註記 + Pydantic |
| API 文件 | `/docs`、`/redoc` |

## 練習題

1. 建立一個待辦事項（Todo）API，支援 CRUD 操作
2. 加入標籤分類功能，可以依標籤篩選待辦事項
3. 實作分頁功能，支援 `page` 和 `limit` 參數
4. 加入錯誤處理和資料驗證
5. 使用 `TestClient` 為你的 API 撰寫測試

---

> 💡 **下一章**：[資料科學入門](./04-資料科學入門)
