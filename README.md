# Hotel Visually

awaaads で画像をうまく使って思わず行きたくなるようなサイトを見つけたので、それを参考にして作ってみる。

- https://capsules.moyra.co/
- https://fame-estate.com/

あと、半年ぶりに Next.js を使ってみる。

## 📋 概要

このプロジェクトは、Next.js、TypeScript、Tailwind CSS を使用して構築されたホテル関連の Web アプリケーションです。

## 📝 学び

- 文字を定数に登録する

## 🚀 技術スタック

- **フレームワーク**: Next.js 15.4.1
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS 4
- **React**: 19.1.0
- **開発ツール**: Turbopack

## 📦 インストール

```bash
# 依存関係をインストール
npm install
```

## 🛠️ 開発

```bash
# 開発サーバーを起動
npm run dev
```

開発サーバーは [http://localhost:3000](http://localhost:3000) で起動します。

## 🏗️ ビルド

```bash
# プロダクションビルド
npm run build

# プロダクションサーバーを起動
npm start
```

## 🔍 リント

```bash
# コードの品質チェック
npm run lint
```

## 📁 プロジェクト構造

```
hotel-visually/
├── public/          # 静的ファイル
├── src/
│   └── app/        # Next.js App Router
│       ├── layout.tsx
│       ├── page.tsx
│       └── globals.css
├── package.json
├── next.config.ts
├── tsconfig.json
└── tailwind.config.js
```

## 🎨 カスタマイズ

### スタイリング

- Tailwind CSS を使用してスタイリングを行っています
- `src/app/globals.css`でグローバルスタイルを定義

### コンポーネント

- `src/app/page.tsx`でメインページを実装
- 必要に応じて`src/components/`ディレクトリを作成してコンポーネントを整理
