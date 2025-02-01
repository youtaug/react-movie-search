# 映画検索アプリ (React)

このプロジェクトは、React を使った映画検索アプリです。OMDb API を利用し、映画タイトルをはじめとする情報を取得して表示します。  
また、以下のような機能を備えています。

- **タイトル / 年 / 種類** (映画・シリーズ・ゲーム) で検索  
- **ローカルストレージ** に基づく検索履歴機能  
- **ダークモード切り替え**  
- **映画カードクリックで詳細データ (Plot) を取得表示**

![スクリーンショットの例](https://via.placeholder.com/600x300?text=App+Screenshot)

---

## 主な使用技術

- **React 18 (create-react-app)**  
- **JavaScript (ES2020+)**  
- **OMDb API**  
- **localStorage** (検索履歴の保存)  

---

## セットアップ

1. **リポジトリをクローン**

   ```bash
   git clone https://github.com/youtaug/react-movie-search.git
   cd react-movie-search

2. **依存パッケージをインストール**

    ```bash
    npm install

3. **開発サーバーを起動**

 ```bash
    npm sta
    
使い方
画面上部にあるフォームで、タイトル / 公開年 / 種類 を指定し「検索」ボタンを押します。
一致する作品がある場合は下部に一覧表示されます。
ダークモード切り替えボタン を押すと、背景色が暗くなり文字が明るくなります。
検索履歴 が最大 5 件まで保存され、次回起動時もリストからワンクリックで再検索可能です。
映画カードをクリック すると、詳細情報（Plot や監督など）が表示されます。


**ディレクトリ構成**

react-movie-search/
├─ .env                      # APIキー
├─ public/
├─ src/
│   ├─ components/
│   │   ├─ MovieSearch.js    # 検索フォーム
│   │   ├─ MovieList.js      # 検索結果の一覧
│   │   └─ MovieCard.js      # 各映画カード (詳細取得機能つき)
│   ├─ App.js                # アプリ全体の状態管理/ダークモード/履歴管理
│   ├─ App.css               # スタイル (ダークモード切り替え)
│   └─ index.js
└─ package.json


作者 / youtaig277@gmail.com
名前 / yutas
GitHub youtaug
