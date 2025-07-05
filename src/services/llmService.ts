export interface LLMResponse {
  text: string
  usage?: {
    promptTokens: number
    completionTokens: number
    totalTokens: number
    cost?: number
  }
}

export interface LLMRequest {
  apiKey: string
  model: string
  prompt: string
}

export class LLMService {
  private static readonly API_URL = 'https://openrouter.ai/api/v1/chat/completions'

  static async generateHackerText(request: LLMRequest): Promise<LLMResponse> {
    if (!request.apiKey) {
      throw new Error('API キーが設定されていません')
    }

    if (!request.prompt.trim()) {
      throw new Error('プロンプトが入力されていません')
    }

    const systemPrompt = `あなたはハッカーっぽいプログラムコードやテキストを生成するアシスタントです。
以下の要求に従って、ハッカーっぽい雰囲気のあるプログラムコードを生成してください：

- プログラミング言語は JavaScript、TypeScript、Python、C++、Go など適切なものを選択
- コメントは日本語で記述
- 変数名や関数名は英語で記述
- ハッカーらしい処理内容（セキュリティ、ネットワーク、暗号化、システム監視など）
- 実際に動作する可能性のあるコードを生成
- 不正な処理ではなく、教育的・学習的な内容に留める
- 800-1500文字程度の適度な長さ

重要な制約：
- コードブロック記法（\`\`\`）は絶対に使用しないでください
- Markdown記法は一切使用せず、プレーンテキストとしてコードのみを出力してください
- 説明文、タイトル、見出しは含めないでください
- 出力はプログラムコードのみにしてください`

    try {
      const response = await fetch(this.API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${request.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: request.model,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: request.prompt }
          ],
          temperature: 0.7,
          max_tokens: 2000,
          usage: {
            include: true
          }
        })
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(`API呼び出しエラー: ${response.status} ${response.statusText}${errorData.error?.message ? ` - ${errorData.error.message}` : ''}`)
      }

      const data = await response.json()
      
      if (!data.choices || !data.choices[0] || !data.choices[0].message) {
        throw new Error('APIレスポンスが不正です')
      }

      const text = data.choices[0].message.content
      if (!text) {
        throw new Error('テキストが生成されませんでした')
      }

      return {
        text,
        usage: data.usage ? {
          promptTokens: data.usage.prompt_tokens,
          completionTokens: data.usage.completion_tokens,
          totalTokens: data.usage.total_tokens,
          cost: data.usage.cost
        } : undefined
      }
    } catch (error) {
      if (error instanceof Error) {
        throw error
      }
      throw new Error('予期しないエラーが発生しました')
    }
  }
}