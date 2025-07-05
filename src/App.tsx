import { useState } from 'react'
import './App.css'
import { MonacoEditor } from './components/MonacoEditor'

function App() {
  const [apiKey, setApiKey] = useState('')
  const [model, setModel] = useState('openai/gpt-4o-mini')
  const [prompt, setPrompt] = useState('')
  const [editorContent, setEditorContent] = useState('')

  const handleDebugInsert = () => {
    const sampleText = `// はっかぽ - ハッカーっぽいデモテキスト
import { useState, useEffect } from 'react';

const HackerSimulator = () => {
  const [matrix, setMatrix] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  
  useEffect(() => {
    const interval = setInterval(() => {
      console.log('Accessing mainframe...');
      console.log('Bypassing security protocols...');
      console.log('Connection established.');
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="terminal">
      <h1>SYSTEM ACCESS GRANTED</h1>
      <p>Welcome to the Matrix...</p>
    </div>
  );
};

export default HackerSimulator;`
    
    setEditorContent(sampleText)
  }

  return (
    <div className="h-screen bg-gray-900 text-white flex">
      {/* 左側の設定パネル */}
      <div className="w-1/3 bg-gray-800 p-6 border-r border-gray-700">
        <h1 className="text-2xl font-bold mb-6 text-green-400">はっかぽ</h1>
        
        <div className="space-y-4">
          {/* APIキー入力 */}
          <div>
            <label className="block text-sm font-medium mb-2">APIキー</label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="OpenRouter APIキーを入力"
            />
          </div>
          
          {/* モデル選択 */}
          <div>
            <label className="block text-sm font-medium mb-2">モデル</label>
            <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="openai/gpt-4o-mini">GPT-4o Mini</option>
              <option value="openai/gpt-4.1">GPT-4.1</option>
              <option value="google/gemini-2.5-flash">Gemini 2.5 Flash</option>
              <option value="anthropic/claude-sonnet-4">Claude Sonnet 4</option>
            </select>
          </div>
          
          {/* お題入力 */}
          <div>
            <label className="block text-sm font-medium mb-2">お題</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 h-32 resize-none"
              placeholder="ハッカーっぽいテキストを生成するお題を入力してください"
            />
          </div>
          
          {/* お題送信ボタン */}
          <button
            className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 rounded-md transition-colors"
            onClick={() => console.log('お題送信:', prompt)}
          >
            お題送信
          </button>
          
          {/* デバッグボタン */}
          <button
            className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
            onClick={handleDebugInsert}
          >
            デバッグ: サンプルテキスト挿入
          </button>
        </div>
      </div>
      
      {/* 右側のエディターエリア */}
      <div className="flex-1 p-6">
        <div className="h-full bg-gray-800 rounded-lg border border-gray-700 overflow-hidden flex flex-col">
          <div className="text-xs text-gray-400 p-2 border-b border-gray-700 flex-shrink-0">Monaco Editor</div>
          <div className="flex-1 min-h-0">
            <MonacoEditor
              value={editorContent}
              onChange={setEditorContent}
              language="javascript"
              theme="vs-dark"
              readOnly={false}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
