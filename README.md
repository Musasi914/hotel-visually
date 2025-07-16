# Hotel Visually

awaaads で画像をうまく使って思わず行きたくなるようなサイトを 2 つ見つけたので、それを参考にして作ってみる。
あと、半年ぶりに Next.js を使ってみる。

## 📋 概要

このプロジェクトは、Next.js、TypeScript、Tailwind CSS を使用して構築されたホテル関連の Web アプリケーションです。

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

## 🌐 デプロイ

このプロジェクトは以下のプラットフォームでデプロイできます：

- **Vercel**: 推奨（Next.js の開発元）
- **Netlify**
- **AWS Amplify**
- **その他の VPS/ホスティングサービス**

## 🤝 コントリビューション

1. このリポジトリをフォーク
2. 機能ブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add some amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成
