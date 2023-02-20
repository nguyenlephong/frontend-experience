export const ATTR_TEMPLATE_CONFIGS = {
  TINY_EDITOR_KEY: "3ti6lf1kghzyrs66kit97o9w0nf3a9hty5f98hb2cnpch3z6"
}

export const cssForContentOfEditor = `
p:empty {
  padding-bottom: 1rem;
}
body { font-family:Helvetica,Arial,sans-serif; font-size:14px }

.mce-content-body:not([dir=rtl])[data-mce-placeholder]:not(.mce-visualblocks)::before {
  left: 12px;
}


.grid-container {
  display: grid;
  column-gap: 50px;
  grid-template-columns: auto auto auto;
  background-color: #2196F3;
  padding: 10px;
}

.grid-item {
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(0, 0, 0, 0.8);
  padding: 20px;
  font-size: 30px;
  text-align: center;
}

.btn-attr-template {
  height: 28px;

  background: #5A9DFB;
  border-radius: 8px;

  padding: 0 12px;
  width: fit-content;
  color: #fff;
  text-align: center;
  border: unset;
  margin-top: 4px;
}


.attr-ic {
  color: #fff !important;
  margin-left: 8px;
}

.btn-close {
  cursor: pointer;
  font-size: 16px;
  z-index: 9890909000;
  color: #fff;
}

.standard {
  background: #5A9DFB;
}

.custom {
  background: #90DDB5;
}

.catalog {
  background: #E87B6F;
}

.recommended {
  background: #9D8BFA;
}

.text-attr-template {
  display: inline-block;
}

.mce-content-body  {
  padding: 12px;
  border-radius: 4px;
}

.attr-select-wrap {
  height: 28px;

  background: #5A9DFB;
  border-radius: 8px;

  padding: 4px 12px;
  width: fit-content;
  color: #fff;
  text-align: left;
  border: unset;
}

.trait-wrapper-popover {
  padding: 12px;
  border-radius: 4px;
  width: fit-content;
  overflow: auto;
  display: inline;
}

.trait-item-opt {
  padding: 4px 12px;
  cursor: pointer;
}

.trait-item-opt:hover {
  background: #d7ecff;
  color: #1d81e9;
}

.trait-wrapper-popover:hover::after {
  background: #d7ecff;
  color: #1d81e9;
}

`
export type AttrTemplateState = {
  isLoadEditor: boolean;
  disabled: boolean;
  enabled: boolean;
  isFocusing: boolean;
  editorValue: string;
  htmlBody: undefined | any;
  opts: AttributeItem[]
}

export type AttributeItem = {
  id: string;
  name: string;
  title: string;
  category: string;
  value: string;
}

export type AttributeTemplatePropType = {
  disabled: any;
  listOfAttributes: any[];
  id: string;
  name?: string;
  tinyKey: string;
  autoFocus: boolean | null;
  onChange: (v: any, e: any) => void;
  onFocus: (e: any) => void;
  isPlainText?: boolean;
  defaultValue?: string | any;
  config: any;
  height?: number;
  onBlur(convertHtmlToTemplate1: string, convertHtmlToPlainText1: string): void;
}