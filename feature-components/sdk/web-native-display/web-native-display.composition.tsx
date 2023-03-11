import React, {useEffect} from 'react';
import { WebNativeDisplay } from './web-native-display';
import {NativeDisplay} from "./wrapper/sdk";

export const BasicWebNativeDisplay = () => {
  useEffect(() => {
    NativeDisplay.initWebComponent({
      enable: true,
      options: {
        showLog: true,
        host: "https://nguyenlephong.github.io"
      }
    })
  }, [])
  return (
    <WebNativeDisplay>
      <web-native-display
        title={"Recommendation for you"}
        summary={"List of product"}
        template-url={"https://webapp-demo.primedatacdp.com/template/product.template.html"}
        profile-id={"51cc156fbd91486eac4616b8973bd767"}
        recipe-id={"51cc156fbd91486eac4616b8973bd767"}
      />
    </WebNativeDisplay>
  );
}