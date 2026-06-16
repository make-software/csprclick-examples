import { ICSPRClickSDK, CsprClickInitOptions } from '@make-software/csprclick-core-types';
import { ClickUIOptions  } from '@make-software/csprclick-core-types/clickui';


export {};

declare global {
  interface Window {
    csprclick?: ICSPRClickSDK;
    clickUIOptions: ClickUIOptions;
    clickSDKOptions: CsprClickInitOptions;
  }
}

declare module '*.css' {
  const classes: { [key: string]: string };
  export default classes;
}


declare module '@make-software/cspr-design' {
 export const themeConfig: any;
}
