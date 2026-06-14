# 12 Spring Boot 後端開發藍圖

> 本章作為整份 Java 講義的結尾，帶領讀者從純語言學習過渡到實際的後端開發。這不是完整的 Spring Boot 教程，而是一張**藍圖**，讓你知道下一步該往哪走。

## 為什麼要學 Spring Boot？

Spring Boot 是當今 Java 後端開發**最主流的框架**，它簡化了 Spring 框架的設定，讓開發者可以快速建立獨立的、可直接執行的生產級應用。

| 特色 | 說明 |
|------|------|
| **自動設定** | 根據依賴自動配置 Spring 環境 |
| **嵌入伺服器** | 內建 Tomcat，不需額外部署 |
| **生產就緒** | 提供健康檢查、指標監控 |
| **生態豐富** | Spring Cloud、Spring Security、Spring Data 完整整合 |

## MVC 架構模式

Spring Boot 採用 **MVC（Model-View-Controller）** 模式：

```
用戶端 → Controller（控制器） → Service（商業邏輯） → Repository（資料存取） → 資料庫
```

| 層次 | 職責 | 範例 |
|------|------|------|
| **Controller** | 處理 HTTP 請求與回應 | `@RestController`、`@RequestMapping` |
| **Service** | 封裝商業邏輯 | `@Service` |
| **Repository** | 資料庫存取 | `@Repository`、JPA Repository |
| **Model / Entity** | 資料模型 | `@Entity` 對應資料表 |

## 建立第一個 REST API

### 1. 專案結構

```
my-app/
├── src/main/java/com/example/
│   ├── MyApplication.java        // 啟動類別
│   ├── controller/
│   │   └── StudentController.java
│   ├── service/
│   │   └── StudentService.java
│   ├── repository/
│   │   └── StudentRepository.java
│   └── entity/
│       └── Student.java
├── src/main/resources/
│   └── application.properties    // 設定檔
└── pom.xml                       // Maven 依賴
```

### 2. 啟動類別

```java
package com.example;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MyApplication {
    public static void main(String[] args) {
        SpringApplication.run(MyApplication.class, args);
    }
}
```

### 3. Entity（資料模型）

使用 JPA（Java Persistence API）將 Java 物件對應到資料表：

```java
package com.example.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "students")
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private Integer age;

    private Double score;

    // 必須有無參數建構子（JPA 要求）
    public Student() {}

    // Getter / Setter
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Integer getAge() { return age; }
    public void setAge(Integer age) { this.age = age; }

    public Double getScore() { return score; }
    public void setScore(Double score) { this.score = score; }
}
```

### 4. Repository（資料存取層）

Spring Data JPA 會自動實作基本 CRUD：

```java
package com.example.repository;

import com.example.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface StudentRepository extends JpaRepository<Student, Long> {
    // 根據方法名稱自動產生查詢
    List<Student> findByName(String name);
    List<Student> findByAgeGreaterThan(Integer age);
}
```

### 5. Service（商業邏輯層）

```java
package com.example.service;

import com.example.entity.Student;
import com.example.repository.StudentRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class StudentService {

    private final StudentRepository repository;

    // 建構子注入（Spring 自動注入依賴）
    public StudentService(StudentRepository repository) {
        this.repository = repository;
    }

    public List<Student> findAll() {
        return repository.findAll();
    }

    public Student findById(Long id) {
        return repository.findById(id).orElseThrow(
            () -> new RuntimeException("學生不存在，id=" + id));
    }

    public Student save(Student student) {
        return repository.save(student);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
```

### 6. Controller（API 層）

```java
package com.example.controller;

import com.example.entity.Student;
import com.example.service.StudentService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/students")
public class StudentController {

    private final StudentService service;

    public StudentController(StudentService service) {
        this.service = service;
    }

    // GET /api/students - 查詢全部
    @GetMapping
    public List<Student> getAll() {
        return service.findAll();
    }

    // GET /api/students/1 - 查詢單筆
    @GetMapping("/{id}")
    public Student getById(@PathVariable Long id) {
        return service.findById(id);
    }

    // POST /api/students - 新增
    @PostMapping
    public Student create(@RequestBody Student student) {
        return service.save(student);
    }

    // PUT /api/students/1 - 更新
    @PutMapping("/{id}")
    public Student update(@PathVariable Long id, @RequestBody Student student) {
        student.setId(id);
        return service.save(student);
    }

    // DELETE /api/students/1 - 刪除
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
```

### 7. 設定檔（application.properties）

```properties
# 資料庫連線
spring.datasource.url=jdbc:mysql://localhost:3306/school
spring.datasource.username=root
spring.datasource.password=your_password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA 設定
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect

# 伺服器埠號（預設 8080）
server.port=8080
```

### 8. 測試 API

```bash
# 查詢全部
curl http://localhost:8080/api/students

# 查詢單筆
curl http://localhost:8080/api/students/1

# 新增
curl -X POST http://localhost:8080/api/students \
  -H "Content-Type: application/json" \
  -d '{"name":"小明","age":20,"score":95.5}'
```

## RESTful API 設計原則

| HTTP 方法 | 路徑 | 操作 | 對應 CRUD |
|-----------|------|------|-----------|
| `GET` | `/api/students` | 查詢全部 | Read |
| `GET` | `/api/students/{id}` | 查詢單筆 | Read |
| `POST` | `/api/students` | 新增 | Create |
| `PUT` | `/api/students/{id}` | 完整更新 | Update |
| `PATCH` | `/api/students/{id}` | 部分更新 | Update |
| `DELETE` | `/api/students/{id}` | 刪除 | Delete |

命名慣例：
- **名詞複數**：`/students` 而非 `/student` 或 `/getStudents`
- **巢狀資源**：`/students/{id}/courses`
- **查詢參數**：`/students?age=20&score=90`

## JWT 身分驗證概念

JWT（JSON Web Token）是一種輕量的身分驗證機制，常用於前後端分離的應用：

```
登入 → 伺服器驗證 → 回傳 JWT Token → 前端儲存 Token →
後續請求帶上 Token → 伺服器驗證 Token → 回應資料
```

### JWT 結構

```
header.payload.signature
```

| 部分 | 內容 | 範例 |
|------|------|------|
| **Header** | 演算法與型別 | `{"alg":"HS256","typ":"JWT"}` |
| **Payload** | 使用者資料與過期時間 | `{"sub":"小明","exp":1718000000}` |
| **Signature** | 簽名（防竄改） | 使用密鑰對 header + payload 簽名 |

### 在 Spring Boot 中整合 JWT

```java
// 產生 Token
String token = Jwts.builder()
    .subject(user.getUsername())
    .issuedAt(new Date())
    .expiration(new Date(System.currentTimeMillis() + 86400000)) // 24h
    .signWith(SignatureAlgorithm.HS256, secretKey)
    .compact();

// 驗證 Token
Claims claims = Jwts.parser()
    .setSigningKey(secretKey)
    .build()
    .parseClaimsJws(token)
    .getBody();
```

實務上會搭配 **Spring Security** 建立過濾器（Filter），自動從 HTTP Header 取出 `Authorization: Bearer <token>` 進行驗證。

## 學習路徑建議

從這份講義的基礎到實務後端開發，建議的路徑：

```
Java 基礎 → OOP → 進階語法 → JDBC → Spring Boot 入門
                                          ↓
                                    RESTful API 設計
                                          ↓
                                    Spring Data JPA
                                          ↓
                                    Spring Security + JWT
                                          ↓
                                    Docker 部署 → CI/CD
```

## 重點整理

- Spring Boot 簡化了 Spring 框架的設定，是 Java 後端的主流選擇
- MVC 架構分為 Controller → Service → Repository 三層
- JPA Entity 透過註解對應資料庫表格
- Spring Data JPA 可自動產生 CRUD 實作
- RESTful API 遵循名詞複數路徑與 HTTP 方法對應 CRUD 的設計原則
- JWT 提供無狀態的身分驗證，適合現代前後端分離架構
- 從 JDBC → Spring Boot → REST API → JWT，是逐步邁向實務的學習曲線
