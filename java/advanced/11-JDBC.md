# 11 JDBC 資料庫操作

## 什麼是 JDBC？

JDBC（Java Database Connectivity）是 Java 標準的資料庫連線 API，讓 Java 程式可以統一的方式操作不同的關聯式資料庫（MySQL、PostgreSQL、Oracle 等）。

```
Java 程式 → JDBC API → JDBC 驅動程式 → 資料庫
```

## 環境準備

### 1. 下載 JDBC 驅動

以 MySQL 為例，下載 [MySQL Connector/J](https://dev.mysql.com/downloads/connector/j/)，取得 `mysql-connector-j-x.x.x.jar`。

### 2. 加入專案

- **純手動**：將 `.jar` 放在專案目錄，編譯時指定 classpath
  ```bash
  javac -cp mysql-connector-j-x.x.x.jar Main.java
  java -cp .;mysql-connector-j-x.x.x.jar Main
  ```
- **Maven**（推薦）：在 `pom.xml` 中加入依賴：
  ```xml
  <dependency>
      <groupId>com.mysql</groupId>
      <artifactId>mysql-connector-j</artifactId>
      <version>8.x.x</version>
  </dependency>
  ```

## JDBC 標準步驟

使用 JDBC 操作資料庫有固定的五個步驟：

```java
import java.sql.*;

public class JdbcDemo {
    public static void main(String[] args) {
        // 1. 載入驅動（JDBC 4+ 可省略）
        // Class.forName("com.mysql.cj.jdbc.Driver");

        String url = "jdbc:mysql://localhost:3306/school";
        String user = "root";
        String password = "your_password";

        try (
            // 2. 建立連線
            Connection conn = DriverManager.getConnection(url, user, password);
            // 3. 建立 Statement
            Statement stmt = conn.createStatement();
            // 4. 執行 SQL
            ResultSet rs = stmt.executeQuery("SELECT * FROM students")
        ) {
            // 5. 處理結果
            while (rs.next()) {
                int id = rs.getInt("id");
                String name = rs.getString("name");
                int age = rs.getInt("age");
                System.out.println(id + "：" + name + "，" + age + "歲");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        // 連線在 try-with-resources 結束後自動關閉
    }
}
```

## CRUD 操作

### 查詢（SELECT）

```java
public class QueryDemo {
    public static void main(String[] args) throws SQLException {
        String url = "jdbc:mysql://localhost:3306/school";
        try (Connection conn = DriverManager.getConnection(url, "root", "password");
             Statement stmt = conn.createStatement()) {

            // 查詢全部
            ResultSet rs = stmt.executeQuery("SELECT * FROM students WHERE age >= 18");

            while (rs.next()) {
                System.out.printf("id=%d, name=%s, age=%d%n",
                    rs.getInt("id"),
                    rs.getString("name"),
                    rs.getInt("age"));
            }
        }
    }
}
```

### 新增（INSERT）

```java
String sql = "INSERT INTO students (name, age, score) VALUES ('王五', 22, 88.5)";
int rows = stmt.executeUpdate(sql);
System.out.println("影響行數：" + rows);
```

### 更新（UPDATE）

```java
String sql = "UPDATE students SET score = 95 WHERE name = '王五'";
int rows = stmt.executeUpdate(sql);
```

### 刪除（DELETE）

```java
String sql = "DELETE FROM students WHERE id = 3";
int rows = stmt.executeUpdate(sql);
```

::: tip
`executeQuery()` 用於 SELECT，回傳 `ResultSet`；`executeUpdate()` 用於 INSERT/UPDATE/DELETE，回傳受影響的行數。
:::

## PreparedStatement（預防 SQL 注入）

直接拼接字串的方式容易造成 **SQL 注入攻擊**，應改用 `PreparedStatement`：

```java
// ❌ 危險寫法（SQL 注入漏洞）
String name = "小明'; DROP TABLE students; --";
Statement stmt = conn.createStatement();
stmt.executeQuery("SELECT * FROM students WHERE name = '" + name + "'");

// ✅ 安全寫法（PreparedStatement）
String sql = "SELECT * FROM students WHERE name = ? AND age > ?";
try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
    pstmt.setString(1, name);   // 第一個 ? 設為字串
    pstmt.setInt(2, 20);        // 第二個 ? 設為整數

    ResultSet rs = pstmt.executeQuery();
    while (rs.next()) {
        System.out.println(rs.getString("name"));
    }
}
```

`PreparedStatement` 的好處：
- **防止 SQL 注入**：參數值會被正確跳脫
- **效能較佳**：可預編譯，重複使用
- **可讀性高**：`?` 佔位符比字串拼接更清晰

## 交易管理（Transaction）

預設每句 SQL 都會自動提交。若要將多個操作視為一個原子單位，需關閉自動提交：

```java
try (Connection conn = DriverManager.getConnection(url, user, password)) {
    conn.setAutoCommit(false);  // 關閉自動提交

    try {
        String sql1 = "UPDATE accounts SET balance = balance - 1000 WHERE id = 1";
        String sql2 = "UPDATE accounts SET balance = balance + 1000 WHERE id = 2";

        try (Statement stmt = conn.createStatement()) {
            stmt.executeUpdate(sql1);
            // 模擬錯誤（若這裡拋出例外，sql1 的變更也會被撤銷）
            // if (true) throw new RuntimeException("轉帳失敗");
            stmt.executeUpdate(sql2);
        }

        conn.commit();  // 兩筆操作都成功 → 提交
        System.out.println("轉帳成功");
    } catch (Exception e) {
        conn.rollback();  // 任一操作失敗 → 全部回滾
        System.out.println("轉帳失敗，已回滾：" + e.getMessage());
    }
}
```

## 資料庫連線設定範例

建立一個工具類別統一管理連線資訊：

```java
import java.sql.*;

public class DBUtils {
    private static final String URL = "jdbc:mysql://localhost:3306/school?useSSL=false&serverTimezone=Asia/Taipei";
    private static final String USER = "root";
    private static final String PASSWORD = "password";

    public static Connection getConnection() throws SQLException {
        return DriverManager.getConnection(URL, USER, PASSWORD);
    }

    public static void close(Connection conn, Statement stmt, ResultSet rs) {
        try { if (rs != null) rs.close(); } catch (SQLException e) { e.printStackTrace(); }
        try { if (stmt != null) stmt.close(); } catch (SQLException e) { e.printStackTrace(); }
        try { if (conn != null) conn.close(); } catch (SQLException e) { e.printStackTrace(); }
    }
}
```

## 重點整理

- JDBC 是 Java 操作關聯式資料庫的標準 API
- 五步驟：載入驅動 → 建立連線 → 建立 Statement → 執行 SQL → 處理結果
- `PreparedStatement` 可預防 SQL 注入，是實務標準做法
- `executeQuery()` 用於查詢，`executeUpdate()` 用於增刪改
- `setAutoCommit(false)` + `commit()` / `rollback()` 實現交易控制
- 使用 `try-with-resources` 確保連線正確關閉
