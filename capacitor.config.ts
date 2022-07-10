import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.mattybojo.renoirhq',
  appName: 'RenoirHQ',
  webDir: 'www',
  bundledWebRuntime: false,
  server: {
    iosScheme: 'ionic'
  }
};

export default config;
