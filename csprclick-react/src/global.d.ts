import { ICSPRClickSDK } from '@make-software/csprclick-core-types';

export {};

declare global {
  interface Window {
    csprclick?: ICSPRClickSDK;
  }
}

declare module '*.css' {
  const classes: { [key: string]: string };
  export default classes;
}
