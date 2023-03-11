import React, {HTMLAttributes} from "react";

declare global {
  interface Window { NativeDisplayOptions: any; }
}


export type NativeDisplayAttribute = {
  "title": string;
  "summary": string;
  "profile-id": string;
  "recipe-id": string;
  "template-url": string;
  "catalog-size": string | number;
  [key: string]: any;
}

export type NativeDisplayCustomElement<T> = Partial<T & HTMLAttributes<T> & {
  children: any
}>;

export type NativeDisplayOption = {
  enable: boolean;
  options: {
    showLog: boolean;
    host: string;
  }
}

export type NativeDisplayConfiguration = {
  [key: string]: any
}

export type NativeDisplayStyle = {
  [key: string]: any
}

export interface INativeDisplay {
  initWebComponent: (options: NativeDisplayOption) => void;
}


declare global {
  namespace JSX {
    interface ExtendedNativeDisplayFromDiv
      extends React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
        > {
      "title": string;
      "summary": string;
      "profile-id": string;
      "recipe-id": string;
      "template-url": string;
      "catalog-size": string | number;
    }

    interface IntrinsicElements {
      ['web-native-display']: NativeDisplayCustomElement<any>;
    }
  }
}