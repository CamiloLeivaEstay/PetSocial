import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { SplashScreen } from '@capacitor/splash-screen'
import { App } from './App'
import { isNative } from './lib/native'
import './styles/global.css'
import './styles/interactions.css'

// ?screen=home opens the app directly on a screen (handy while developing).
const startScreen = new URLSearchParams(location.search).get('screen') ?? undefined

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App startScreen={startScreen} />
  </StrictMode>,
)

if (isNative) SplashScreen.hide().catch(() => {})
