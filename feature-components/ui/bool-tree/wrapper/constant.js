import { cloneDeep } from "lodash";
import { uuidByte } from "./utils";

export const stepInit = {
  name: "",
  type: "string",
  operator: "",
  value: "",
};

export const mainDataInit = {
  steps: [
    {
      id: uuidByte(),
      ...cloneDeep(stepInit),
    },
  ],
};

export const styleAnd = {
  delay: true,
  borderStyle: "solid",
  borderColor: "#0A495C",
  borderWidth: 3,
  fromAnchor: "center",
  toAnchor: "left",
  orientation: "h",
  zIndex: 5,
  className: "line-and--style",
};

export const styleOr = {
  delay: true,
  borderStyle: "solid",
  borderColor: "#7b5514",
  borderWidth: 3,
  fromAnchor: "center",
  toAnchor: "left",
  orientation: "h",
  zIndex: 5,
  className: "line-and--style",
};

export const getLineStyleByType = (type) => type === "and" ? styleAnd : styleOr

export const COLORS = {
  neutral_n60: "#81818D",
  red_r50: "#D15A54",
};
