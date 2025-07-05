# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.
- ユーザーへは日本語で回答してください。思考は英語を使用して構いません。
- ユーザーが別途開発用サーバーを起動するため、あなたが開発用サーバーを起動する必要はありません。

## Project Overview

Hakkapo is a React + TypeScript application that simulates a "hacker-like" text editor experience. Users can input random keystrokes and the application will display pre-generated text from LLM APIs character by character, creating an entertaining coding simulation.

## Architecture

- **Frontend**: React 19 with TypeScript, styled using Tailwind CSS 4
- **Code Editor**: Monaco Editor for the main text editing interface
- **LLM Integration**: OpenRouter API for generating hacker-themed text content
- **Build System**: Vite with SWC for fast development and builds

## Key Components

- **Settings Panel** (`src/App.tsx`): API key input, model selection, and prompt submission
- **Editor Interface** (`src/components/MonacoEditor.tsx`): Monaco-based editor that displays generated text
- **Input Handler**: Monitors keyboard input to trigger character-by-character text display (not yet implemented)
- **LLM Service**: Handles OpenRouter API calls for content generation (not yet implemented)

## Development Commands

```bash
# Start development server (with host flag for external access)
npm run dev

# Build for production (includes TypeScript compilation)
npm run build

# Lint code using ESLint
npm run lint

# Preview production build
npm run preview
```

## Current Implementation Status

The application is currently in initial development with:
- Basic UI layout with settings panel and Monaco editor
- Debug functionality for inserting sample text
- Proper TypeScript configuration with strict mode
- Modern ESLint configuration with React hooks support
- Vite build system with SWC for fast compilation

**Missing Features:**
- LLM API integration and service layer
- Keyboard input monitoring system
- Character-by-character text display logic
- Modal for generated text preview
- State management for LLM responses

## LLM API Integration

The application uses OpenRouter (https://openrouter.ai/api/v1/chat/completions) to access various LLM models:

- **Primary Models**: OpenAI GPT-4.1, GPT-4.1-mini, Google Gemini 2.5 Flash, Claude Sonnet 4
- **Authentication**: Bearer token via API key
- **Request Format**: Standard OpenAI-compatible chat completions
- **Usage Tracking**: Include `usage: { include: true }` for cost monitoring

## File Structure

- `src/App.tsx` - Main application component with settings UI and editor integration
- `src/components/MonacoEditor.tsx` - Monaco editor wrapper component
- `documents/00-idea.txt` - Japanese project specification
- `documents/how_to_use-LLMAPI.md` - Comprehensive OpenRouter API documentation
- `vite.config.ts` - Build configuration with React SWC and Tailwind
- `eslint.config.js` - Modern ESLint configuration

## Implementation Notes

- The app generates text content based on user-provided prompts
- Keyboard input triggers character-by-character display of pre-generated content
- Right-click on prompt submission button shows generated text in modal
- Focus on creating an entertaining "hacker typing" simulation experience
- Monaco Editor is configured with dark theme and hacker-appropriate settings