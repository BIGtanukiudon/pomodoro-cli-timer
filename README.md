# pomodoro-cli-timer

CLI 版ポモドーロタイマー

## 実行環境構築＆実行手順

### 環境

- Node
- npm

### 実行環境構築

#### 1. パッケージインストール

```cmd
npm install
```

#### 2. 実行ファイルのビルド

```cmd
npm run build
```

#### 3. `.env`ファイルの作成

`.env.template`ファイルをコピーし、`.env`へリネームします。

#### 4. 実行

```cmd
npm start
```

## `.env`ファイルについて

各種項目については以下です。

| 項目                  | 内容         | デフォルト値 |
| --------------------- | ------------ | ------------ |
| WORK_MINUTES          | 作業分数     | 25           |
| REST_MINUTES          | 休憩分数     | 5            |
| TERM                  | ターム       | 3            |
| IS_NOTIFICATION_SOUND | 通知音の有無 | 0(False)     |
