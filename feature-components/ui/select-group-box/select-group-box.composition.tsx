import React from 'react';
import {SelectGroupBox} from './select-group-box';
import './wrapper/i18n';
import PreviewFormatWrapperBox from "./wrapper/PreviewFormatWrapperBox";


export const BasicSelectGroupBox = () => {
  return (
    <SelectGroupBox>
      <PreviewFormatWrapperBox/>
    </SelectGroupBox>
  );
}