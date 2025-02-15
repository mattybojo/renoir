import { Environment } from '../app/app.beans';
import { firebaseConfig } from '../app/app.config';

export const environment: Environment = {
  production: true,
  firebase: firebaseConfig,
  bypassAuthGuard: false
};
