import { useEffect, useRef } from 'react'
import * as monaco from 'monaco-editor'

interface MonacoEditorProps {
  value: string
  onChange?: (value: string) => void
  language?: string
  theme?: string
  readOnly?: boolean
}

export const MonacoEditor = ({ 
  value, 
  onChange, 
  language = 'javascript', 
  theme = 'vs-dark',
  readOnly = false 
}: MonacoEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null)
  const monacoRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null)

  useEffect(() => {
    if (!editorRef.current) return

    // Monaco Editorの初期化
    const editor = monaco.editor.create(editorRef.current, {
      value: value,
      language: language,
      theme: theme,
      readOnly: readOnly,
      automaticLayout: true,
      fontSize: 14,
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      wordWrap: 'on',
      lineNumbers: 'on',
      folding: true,
      contextmenu: false,
      selectOnLineNumbers: true,
      glyphMargin: false,
      lineDecorationsWidth: 0,
      lineNumbersMinChars: 3,
    })

    monacoRef.current = editor

    // 値の変更を監視
    if (onChange) {
      editor.onDidChangeModelContent(() => {
        onChange(editor.getValue())
      })
    }

    // クリーンアップ
    return () => {
      if (monacoRef.current) {
        monacoRef.current.dispose()
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 外部からの値の変更を反映
  useEffect(() => {
    if (monacoRef.current && monacoRef.current.getValue() !== value) {
      monacoRef.current.setValue(value)
    }
  }, [value])

  // レイアウトの再計算を強制（コンテナサイズ変更時）
  useEffect(() => {
    const handleResize = () => {
      if (monacoRef.current) {
        monacoRef.current.layout()
      }
    }

    window.addEventListener('resize', handleResize)
    // 初期化後に少し遅延してレイアウトを更新
    const timer = setTimeout(() => {
      if (monacoRef.current) {
        monacoRef.current.layout()
      }
    }, 100)

    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(timer)
    }
  }, [])

  return (
    <div 
      ref={editorRef} 
      className="w-full h-full"
      style={{ minHeight: '400px' }}
    />
  )
}