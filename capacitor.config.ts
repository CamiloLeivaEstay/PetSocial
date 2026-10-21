import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'cl.petsocial.app',
  appName: 'PetSocial',
  webDir: 'dist',
  plugins: {
    SplashScreen: { launchShowDuration: 0, backgroundColor: '#4700D8' },
    SystemBars: { insetsHandling: 'css' },
  },
  ios: { contentInset: 'never' },
}

export default config
