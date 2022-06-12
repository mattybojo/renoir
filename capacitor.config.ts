import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.mattybojo.renoir',
  appName: 'Renoir',
  webDir: 'www',
  bundledWebRuntime: false,
  server: {
    iosScheme: 'ionic'
  }
};

export default config;
