
export const METRIC_CATEGORY_ENUM = {
  METRIC: "metric",
  PTRAIT: "ptrait",
};

export const METRICS_STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  COMPUTING: "computing",
  METRICS_STATUS_DRAFT: "draft",
  METRICS_STATUS_DELETED: "deleted",
  METRICS_STATUS_PAUSED: "draft" || "paused",
};

export const METRIC_TYPE_ENUM = {
  SIMPLE: "simple",
  FORMULA: "formula",
};


export const FORMULA_BLOCK_TYPE_ENUM = {
  TRAIT: "trait",
  NUMBER: "number",
  METRIC_NAME: "metric_name",
  FUNCTION: "func",
  OPERATOR: "operator",
};

export const FORMULA_OPERATOR_ENUM = {
  PLUS: "+",
  MINUS: "-",
  MULTIPLE: "*",
  DIVIDE: "/",
  PARENTHESES_LEFT: "(",
  PARENTHESES_RIGHT: ")"
};

export const COLORS = {
  neutral_n60: "#81818D",
  red_r50: "#D15A54",
};