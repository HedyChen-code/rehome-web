# 物拾Re:home

## 專案簡介

`物拾Re:home` 是一個使用 React + Vite 開發的二手家居電商平台示範專案。它整合前台購物體驗與後台管理功能，包含商品瀏覽、購物車、結帳流程、收購說明，以及後台商品、訂單與收購單管理。

## 線上作品連結

- 前台作品：https://hedychen-code.github.io/rehome-web/
- 後台登入：https://hedychen-code.github.io/rehome-web/#/admin/login

## 功能展示

- 首頁輪播展示品牌訊息與特色主題
- 商品列表瀏覽、分類、篩選與搜尋
- 商品詳細頁面查看商品資訊與加入購物車
- 購物車管理、更新商品數量與移除商品
- 結帳頁面提交訂單並完成交易流程
- 收購說明頁面展示收購流程與表單
- 後台登入驗證與管理介面
- 管理商品、訂單與收購清單

## 核心功能

- 前台購物體驗
  - 商品瀏覽與分類
  - 商品詳細頁面
  - 購物車功能
  - 結帳流程
  - 收購說明與申請流程
- 後台管理功能
  - 管理員登入驗證
  - 產品管理（上架 / 下架 / 編輯）
  - 訂單管理
  - 收購申請清單查詢
- 系統整合
  - 使用 REST API 取得商品與訂單資料
  - 使用 `.env` 設定 API 基底網址與路徑
  - 前後台路由切換與權限保護

## 技術棧

- React 19
- Vite 7
- React Router 7
- Redux Toolkit
- Axios
- React Hook Form
- React Hot Toast
- Swiper
- Bootstrap 5
- Sass
- gh-pages（部署用）

## 本地安裝與啟動

1. 下載專案並進入資料夾：
   ```bash
   git clone https://github.com/hedychen-code/rehome-web.git
   cd rehome-web
   ```
2. 安裝依賴：
   ```bash
   npm install
   ```
3. 啟動開發伺服器：
   ```bash
   npm run dev
   ```
4. 建置生產版本：
   ```bash
   npm run build
   ```
5. 本地預覽生產結果：
   ```bash
   npm run preview
   ```

## 環境變數說明

此專案使用 Vite 環境變數，主要設定 API 基底網址與專案 API 路徑。

範例 `.env`：

```env
VITE_API_BASE=https://ec-course-api.hexschool.io/v2
VITE_API_PATH=rehome
```

- `VITE_API_BASE`：API 伺服器根網址
- `VITE_API_PATH`：專案 API 路徑

## 主要資料夾結構

```
src/
  api/                # API 呼叫封裝
  assets/             # 全域樣式、圖示與字型
  components/         # 共用元件，例如 Modal、Toast、ProtectedRoute
  hooks/              # 自訂 Hook
  layout/             # 前台與後台版面配置
  slice/              # Redux slice
  store/              # Redux store 設定
  utils/              # 工具函式與驗證邏輯
  views/              # 前台與後台頁面
```

### 重點資料夾說明

- `src/api/`：與 API 互動的函式封裝
- `src/layout/`：前台與後台共用版面框架
- `src/components/`：可重用的 UI 元件與共用元件
- `src/views/front/`：前台頁面，例如 Home、Products、Cart、Checkout
- `src/views/admin/`：後台頁面，例如 AdminHome、AdminProducts、AdminOrders
- `src/slice/`：Redux 狀態管理邏輯
- `src/assets/scss/`：Sass 樣式與變數設定

## 團隊分工

- JiaMori：提案發想者、購物車串接、GitHub 協作規範
- Celia：自製收購API、售物意向表單、專業產圖户
- JanJan：首頁、簡報製作
- kashiwatei：商品搜尋頁、大量篩選條件
- 畢卡索：商品詳情頁、細節優化調整、後台建立

## 未來規劃

- 加入使用者會員系統與註冊登入功能
- 增加後台報表、銷售分析與圖表呈現
- 優化效能與使用者互動體驗
