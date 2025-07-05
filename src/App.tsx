import { useState, useEffect } from 'react'
import './App.css'
import { MonacoEditor } from './components/MonacoEditor'
import { TextPreviewModal } from './components/TextPreviewModal'
import { useHackerTyping } from './hooks/useHackerTyping'
import { useKeyboardListener } from './hooks/useKeyboardListener'
import { LLMService } from './services/llmService'

function App() {
  const [apiKey, setApiKey] = useState('')
  const [model, setModel] = useState('openai/gpt-4o-mini')
  const [prompt, setPrompt] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [charsPerKeyPress, setCharsPerKeyPress] = useState(5)
  
  const {
    generatedText,
    displayedText,
    typingState,
    error,
    isGenerating,
    setGeneratedText,
    addMultipleCharacters,
    reset,
    setError,
    setGenerating
  } = useHackerTyping()

  // localStorage からAPIキーを読み込み
  useEffect(() => {
    const savedApiKey = localStorage.getItem('hakkapo-api-key')
    if (savedApiKey) {
      setApiKey(savedApiKey)
    }
  }, [])

  // APIキーをlocalStorageに保存
  const handleApiKeyChange = (value: string) => {
    setApiKey(value)
    localStorage.setItem('hakkapo-api-key', value)
  }

  // 複数文字を一度に追加する関数
  const handleKeyPress = () => {
    addMultipleCharacters(charsPerKeyPress)
  }

  useKeyboardListener({
    onKeyPress: handleKeyPress,
    isEnabled: typingState === 'ready' || typingState === 'typing'
  })

  const handleGenerateText = async () => {
    if (!apiKey.trim()) {
      setError('APIキーを入力してください')
      return
    }

    if (!prompt.trim()) {
      setError('プロンプトを入力してください')
      return
    }

    setError(null)
    setGenerating(true)
    reset()

    try {
      const response = await LLMService.generateHackerText({
        apiKey,
        model,
        prompt
      })
      
      setGeneratedText(response.text)
    } catch (error) {
      setError(error instanceof Error ? error.message : '予期しないエラーが発生しました')
    } finally {
      setGenerating(false)
    }
  }

  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (generatedText) {
      setIsModalOpen(true)
    }
  }

  return (
    <div className="h-screen bg-black text-green-400 flex font-mono">
      {/* 左側の設定パネル */}
      <div className="w-1/3 bg-black p-6 border-r border-green-400/30">
        <h1 className="text-2xl font-bold mb-6 text-center">
          <div className="ascii-glow mb-2">
            <span className="block text-green-400 text-xs">
                __  _____    __ __ __ __ ___    ____  ____ 
            </span>
            <span className="block text-green-400 text-xs">
               / / / /   |  / //_// //_//   |  / __ \/ __ \
            </span>
            <span className="block text-green-400 text-xs">
              / /_/ / /| | / ,&lt;  / ,&lt;  / /| | / /_/ / / / /
            </span>
            <span className="block text-green-400 text-xs">
             / __  / ___ |/ /| |/ /| |/ ___ |/ ____/ /_/ / 
            </span>
            <span className="block text-green-400 text-xs">
            /_/ /_/_/  |_/_/ |_/_/ |_/_/  |_/_/    \____/  
            </span>
          </div>
          <span className="block text-cyan-400 text-xs mt-2 animate-pulse">
            <span className="text-green-400">{'>'}</span> INITIALIZING HACKER SIMULATOR v2.1.3...
          </span>
          <span className="block text-cyan-400/50 text-xs mt-1">
            [SYSTEM_READY] [NEURAL_LINK_ACTIVE]
          </span>
        </h1>
        
        {/* エラーメッセージ */}
        {error && (
          <div className="mb-4 p-3 bg-black border border-red-500/50 rounded-md shadow-lg shadow-red-500/20">
            <p className="text-red-400 text-sm font-bold">
              <span className="text-red-500">ERROR:</span> {error}
            </p>
          </div>
        )}
        
        {/* 状態表示 */}
        <div className="mb-4 p-3 bg-black border border-green-400/30 rounded-md shadow-lg shadow-green-400/20">
          <p className="text-xs text-cyan-400">
            <span className="text-green-400">SYSTEM STATUS:</span> 
            <span className="text-green-400 ml-2 font-bold">{
              typingState === 'idle' ? 'STANDBY' :
              typingState === 'generating' ? 'GENERATING...' :
              typingState === 'ready' ? 'READY TO HACK' :
              typingState === 'typing' ? 'HACKING IN PROGRESS...' :
              typingState === 'completed' ? 'HACK COMPLETE' : 'UNKNOWN'
            }</span>
          </p>
          {generatedText && (
            <p className="text-xs text-cyan-400 mt-1">
              <span className="text-green-400">PROGRESS:</span> {displayedText.length} / {generatedText.length} bytes
            </p>
          )}
        </div>
        
        <div className="space-y-4">
          {/* APIキー入力 */}
          <div>
            <label className="block text-sm font-medium mb-2 text-cyan-400">
              <span className="text-green-400">{'>'}</span> API_KEY
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => handleApiKeyChange(e.target.value)}
              className="w-full px-3 py-2 bg-black border border-green-400/50 rounded-md focus:outline-none focus:border-green-400 focus:shadow-lg focus:shadow-green-400/25 text-green-400 placeholder-green-400/50"
              placeholder="ENTER_OPENROUTER_API_KEY..."
            />
          </div>
          
          {/* モデル選択 */}
          <div>
            <label className="block text-sm font-medium mb-2 text-cyan-400">
              <span className="text-green-400">{'>'}</span> LLM_MODEL
            </label>
            <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="w-full px-3 py-2 bg-black border border-green-400/50 rounded-md focus:outline-none focus:border-green-400 focus:shadow-lg focus:shadow-green-400/25 text-green-400"
            >
              <option value="openai/gpt-4o-mini">GPT-4o Mini</option>
              <option value="openai/gpt-4.1">GPT-4.1</option>
              <option value="google/gemini-2.5-flash">Gemini 2.5 Flash</option>
              <option value="anthropic/claude-sonnet-4">Claude Sonnet 4</option>
            </select>
          </div>
          
          {/* タイピング速度設定 */}
          <div>
            <label className="block text-sm font-medium mb-2 text-cyan-400">
              <span className="text-green-400">{'>'}</span> HACK_SPEED
            </label>
            <input
              type="number"
              min="1"
              max="10"
              value={charsPerKeyPress}
              onChange={(e) => setCharsPerKeyPress(Math.max(1, Math.min(10, parseInt(e.target.value) || 1)))}
              className="w-full px-3 py-2 bg-black border border-green-400/50 rounded-md focus:outline-none focus:border-green-400 focus:shadow-lg focus:shadow-green-400/25 text-green-400 placeholder-green-400/50"
              placeholder="5"
            />
            <p className="text-xs text-cyan-400/70 mt-1">1 byte/keystroke (slow) ~ 10 bytes/keystroke (fast)</p>
          </div>
          
          {/* お題入力 */}
          <div>
            <label className="block text-sm font-medium mb-2 text-cyan-400">
              <span className="text-green-400">{'>'}</span> TARGET_SPECIFICATION
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full px-3 py-2 bg-black border border-green-400/50 rounded-md focus:outline-none focus:border-green-400 focus:shadow-lg focus:shadow-green-400/25 text-green-400 placeholder-green-400/50 h-32 resize-none"
              placeholder="ENTER_HACKING_OBJECTIVE..."
            />
          </div>
          
          {/* お題送信ボタン */}
          <button
            className="w-full px-4 py-2 bg-black border border-green-400 text-green-400 hover:bg-green-400/10 hover:shadow-lg hover:shadow-green-400/50 disabled:border-gray-600 disabled:text-gray-600 disabled:cursor-not-allowed rounded-md transition-all duration-200 font-bold"
            onClick={handleGenerateText}
            onContextMenu={handleRightClick}
            disabled={isGenerating}
          >
            {isGenerating ? '>>> GENERATING_PAYLOAD...' : '>>> EXECUTE_HACK'}
          </button>
        </div>
      </div>
      
      {/* 右側のエディターエリア */}
      <div className="flex-1 p-6">
        <div className="h-full bg-black rounded-lg border border-green-400/30 overflow-hidden flex flex-col shadow-lg shadow-green-400/20">
          <div className="text-xs text-cyan-400 p-3 border-b border-green-400/30 flex-shrink-0 bg-black">
            <span className="text-green-400">{'>'}</span> TERMINAL_OUTPUT 
            <span className="ml-4 text-green-400/70">
              [SECURE_CONNECTION_ESTABLISHED]
            </span>
            {typingState === 'typing' && (
              <span className="ml-2 text-green-400 animate-pulse">█</span>
            )}
          </div>
          <div className="flex-1 min-h-0">
            <MonacoEditor
              value={displayedText}
              onChange={() => {}}
              language="javascript"
              theme="vs-dark"
              readOnly={true}
            />
          </div>
        </div>
      </div>
      
      {/* モーダル */}
      <TextPreviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        text={generatedText}
        title="生成されたテキスト"
      />
    </div>
  )
}

export default App
