# Hakkapo – ハッカータイピングシミュレータ 🚀

> どんなキーを叩いても **マトリックスグリーンの AI コード** が流れ出し、ブラウザだけでメインフレームに侵入している気分を味わえます。

```
    __  _____    __ __ __ __ ___    ____  ____ 
   / / / /   |  / //_// //_//   |  / __ \/ __ \
  / /_/ / /| | / ,<  / ,<  / /| | / /_/ / / / /
 / __  / ___ |/ /| |/ /| |/ ___ |/ ____/ /_/ / 
/_/ /_/_/  |_/_/ |_/_/ |_/_/  |_/_/    \____/  
```

Hakkapo は、Monaco エディタ上に AI が生成したソースコードをタイピング風に流し込むブラウザアプリです。プロンプトやモデル、速度を自由に設定して、配信やプレゼンで「ハッカー演出」を簡単に実現できます。

---

## ✨ 特長

- **AI ペイロード生成** – OpenRouter API を利用して、JavaScript/TypeScript、Python、Go、C++ などのリアルなコードを生成
- **キーボードマッシュ入力** – 1 回のキー入力で N バイト（可変）が出力され、激しいタイピングを演出
- **Monaco Editor** – シンタックスハイライト付きの本格的なコードビューワ
- **複数 LLM モデルに対応** – GPT-4o Mini、GPT-4.1、Gemini 2.5 Flash、Claude Sonnet 4 など
- **モーダルプレビュー** – `EXECUTE_HACK` ボタンを右クリックすると全文プレビュー
- **ステータス表示** – システム状態、進捗カウンタ、エラーメッセージ、API キーをローカル保存
- **完全クライアントサイド** – React + Vite のみでバックエンド不要

---

## 🚀 クイックスタート

1. **クローン & インストール**

   ```bash
   git clone https://github.com/YOUR_USERNAME/hakkapo.git
   cd hakkapo
   npm install
   ```

2. **開発サーバ起動**

   ```bash
   npm run dev
   ```

   ブラウザで `http://localhost:5173` を開きます。（ポートは CLI 出力を確認）

3. **OpenRouter API キーを入力**

   - <https://openrouter.ai> から API キーを取得
   - 左ペインの `API_KEY` フィールドに貼り付け（`localStorage` に保存されます）

4. **ハック開始！**

   - プロンプトに生成したいコードの概要を入力（例: *「Go でネットワークスキャナを書いて」*）
   - **>>> EXECUTE_HACK** をクリック
   - キーボードを適当に連打してコードの雨を楽しむ

---

## 🛠️ プロダクションビルド

```bash
npm run build      # ./dist にバンドル
npm run preview    # 本番ビルドをローカルでプレビュー
```

静的サイトとして配信可能です。（GitHub Pages、Vercel、Netlify 等）  
`vite.config.ts` で `base: "/hakkapo/"` を設定しています。別のパスで公開する場合は適宜変更してください。

---

## ⚙️ 設定項目

| 設定                     | 場所                                     | デフォルト |
| ------------------------ | ---------------------------------------- | ---------- |
| OpenRouter API キー      | UI 左ペイン (`localStorage`)             | –          |
| LLM モデル               | ドロップダウン                           | `openai/gpt-4o-mini` |
| 1 文字あたりの出力バイト | 数値入力 (`1 – 10`)                      | `5`        |

システムプロンプトや温度、トークン数は `src/services/llmService.ts` を編集して調整できます。

---

## 🏗️ 技術スタック

- **React 18 + TypeScript**
- **Vite** – 超高速開発サーバ
- **Tailwind CSS** – サイバーパンク UI
- **Monaco Editor** – 本格エディタ表示

---

## 📂 プロジェクト構成 (抜粋)

```
hakkapo/
├─ src/
│  ├─ components/          # MonacoEditor, TextPreviewModal
│  ├─ hooks/               # useHackerTyping, useKeyboardListener
│  ├─ services/            # llmService (OpenRouter クライアント)
│  └─ App.tsx              # メイン UI
└─ vite.config.ts          # Vite + Tailwind 設定
```

---

## 🙏 コントリビュート

改善案や新機能（テーマ、効果音、追加モデルなど）大歓迎です！

1. リポジトリをフォーク  
2. `git checkout -b feat/your-feature`  
3. 変更をコミット  
4. プルリクエストを作成  

---

## 📜 ライセンス

本プロジェクトは **MIT License** で公開しています。詳細は [LICENSE](LICENSE) を参照してください。

---

### 免責事項

Hakkapo はデモ・教育目的の *ジョークアプリ* です。  
生成されるコードの安全性・正確性・実用性は保証しません。利用は自己責任でお願いします。
