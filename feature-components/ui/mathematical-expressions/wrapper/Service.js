import {FORMULA_BLOCK_TYPE_ENUM} from "./Constant"
import {compile} from "mathjs";

export const evaluateFormula = (formulas) => {
  if (!formulas) return {valid: false, message: "List of formula is empty"};

  let mathematicalExpressions = ""; // "(number) * (trait + pTrait) + now";
  let scope = {};

  const getMathematical = (formula) => {
    switch (formula.type) {
      case FORMULA_BLOCK_TYPE_ENUM.METRIC_NAME:
        let metric = formula.type + `_${formula.id}`;
        scope[metric] = 1;
        return metric;

      case FORMULA_BLOCK_TYPE_ENUM.TRAIT:
        let trait = formula.type + `_${formula.id}`;
        scope[trait] = 1;
        return trait;

      case FORMULA_BLOCK_TYPE_ENUM.NUMBER:
      case FORMULA_BLOCK_TYPE_ENUM.OPERATOR:
        return formula.value;

      case FORMULA_BLOCK_TYPE_ENUM.FUNCTION:
        let func = formula.value.replaceAll("(", "").replaceAll(")", "") + `_${formula.id}`;
        scope[func] = 1;
        return func;

      default:
        return "";
    }
  };

  formulas.forEach(item => {
    mathematicalExpressions += " " + getMathematical(item) + " ";
  });

  console.info("MetricsBuilderService: Mathematical expressions:", mathematicalExpressions);
  console.info("MetricsBuilderService: Scope:", scope);

  try {
    compile(mathematicalExpressions);
    return {
      valid: true,
      message: "Mathematical expressions is valid"
    };
  } catch (e) {
    console.error("MetricsBuilderService: compile with an error:", e.message);
    return {
      valid: false,
      message: e.message
    };
  }
};