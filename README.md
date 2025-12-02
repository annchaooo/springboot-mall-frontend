🛒 SpringBoot Mall — 全端電商網站（React + TypeScript + Vite）

這是一個以 Spring Boot 後端 + React 前端 實作的迷你電商網站。
功能包含商品展示、會員註冊 / 登入，以及訂單查詢。
前端畫面採用接近 Figma UI 的卡片式設計，並以 Vite 做為開發環境。

本專案旨在練習 前後端串接、RESTful API 設計、React 前端介面開發
並打造一個可作為作品集展示的完整電商應用

🚀 主要功能 Features

🔹 商品模組

瀏覽商品列表

關鍵字搜尋商品

商品分類篩選

商品卡片模式呈現（含圖片 / 價格 / 庫存）

支援後端分頁（limit / offset）

🔹 會員模組
註冊帳號 /users/register
登入 /users/login

登入後會紀錄：
- userId
- email

用 localStorage 保留登入狀態

🔹 訂單模組
查詢使用者的所有訂單 /users/{userId}/orders
訂單卡片式呈現：
- 訂單編號
- 訂單時間
- 訂單金額
- 訂單商品明細（名稱 / 數量 / 小計）
- 支援分頁


🧱 技術架構 Stack
🔸 前端 Frontend
React 18
TypeScript
Vite 7
React Router v6
Fetch API
CSS Modules / 自訂樣式
LocalStorage（管理登入狀態）

🔸 後端 Backend
Java 17
Spring Boot 3
Spring MVC
Spring Validation
MySQL 8
Maven
