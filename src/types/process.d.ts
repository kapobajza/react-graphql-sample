/* eslint-disable @typescript-eslint/no-unused-vars */
import 'process';

global {
  namespace NodeJS {
    interface ProcessEnv {
      BASE_API_URL: string;
    }
  }
}
