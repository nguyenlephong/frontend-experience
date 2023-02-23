import React from "react";

export const FORMAT_CONFIG = {
  TIME_FORMAT: "HH:mm",
  DAY_MONTH_FORMAT: "DD/MM",
  MONTH_YEAR_FORMAT: "MM/YYYY",
  DATE_FORMAT: "DD/MM/YYYY",
  DATE_FORMAT_TEXT: "DD MMM YYYY",
  DATE_TIME_FORMAT: "DD/MM/yyyy HH:mm:ss",
  DATE_TIME_CAMPAIGN_FORMAT: "DD/MM/YYYY - HH:mm",
  DATE_REVERT_FORMAT: "YYYY-MM-DD",
};


export type OptionItemType = {
  label: string;
  value: string;
  preview?: string;
  description?: string;
  options?: OptionItemType[] | [];
}

export type GroupTreeSelectBoxPropType = {
  id?: string;
  disabled?: boolean;
  isTranslate?: boolean;
  stylesCustom?: React.CSSProperties;
  visible?: boolean;
  setVisible?: (status: boolean) => void;
  options: OptionItemType[];
  onChange: (opt: OptionItemType) => void;
  value: undefined | string;
  label?: string;
}

export type PGroupSelectBoxState = {
  domId: string;
  isVisible: boolean;
  displayName: null | string;
  select: null | OptionItemType;
  opts: OptionItemType[] | [];


}