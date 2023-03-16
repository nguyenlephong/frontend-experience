import React from "react";
import {Col, Row} from "antd";
import CardDrag from "./CardDrag";
import {FormulaItemBlock} from "./FormulaAtomic";
import {
  FORMULA_BLOCK_TYPE_ENUM,
  FORMULA_OPERATOR_ENUM
} from "./Constant";
import {array_move_item, uuidByte} from "./Utils";


const FormulaBuilderBlock = (props) => {
  const {data, updateDataFormula, disabled, category, traitOptions, pTraitOptions, functionOptions} = props;

  const onUpdateData = (val, item, choose) => {
    const dataCurrent = [...data];
    let itemUpdate = dataCurrent.find((x) => x.id === item.id);
    itemUpdate.value = val;
    itemUpdate.name = choose?.name;
    itemUpdate.meta_data = choose;
    updateDataFormula(dataCurrent);
  };

  const onDeleteItem = (item) => {
    const dataCurrent = [...data];
    let ind = dataCurrent.findIndex((x) => x.id === item.id);
    dataCurrent.splice(ind, 1);
    updateDataFormula(dataCurrent);
  };

  const onCreateOperatorItem = (value) => {
    const dataCurrent = [...data];
    let defaultValue =
      value === FORMULA_BLOCK_TYPE_ENUM.OPERATOR
        ? FORMULA_OPERATOR_ENUM.PLUS
        : value === FORMULA_BLOCK_TYPE_ENUM.NUMBER
          ? 0
          : "";
    let item = {
      id: uuidByte(),
      type: value,
      name: "",
      value: defaultValue,
      data: null
    };
    dataCurrent.push(item);
    updateDataFormula(dataCurrent);
  };

  const onCopyItem = (item) => {
    const dataCurrent = [...data];
    let ind = dataCurrent.findIndex((x) => x.id === item.id);
    let newItem = {
      ...item,
      id: uuidByte()
    };
    dataCurrent.splice(ind + 1, 0, newItem);
    updateDataFormula(dataCurrent);
  };

  const moveCard = (id, afterId) => {
    const cardIndex = data.findIndex((x) => x.id === id);
    const afterIndex = data.findIndex((x) => x.id === afterId);

    let dataUpdate = array_move_item([...data], cardIndex, afterIndex);
    updateDataFormula(dataUpdate);
  };

  return (
    <Col xs={24}>
      <div className={"formula-builder-block__wrapper"}>
        <div className={"form-title uppercase"}>
          Create a formula <span className={"required-star"}>*</span>
        </div>
        <div className={"form-desc"}>
          Select simple p-Trait or add a number and use math items to create a p-Trait
        </div>

        {!disabled && <FormulaOperationActionBar onCreateOperatorItem={onCreateOperatorItem}/>}

        <div className={"form-content"}>
          <div style={{minWidth: 80, fontWeight: "bold"}} className={"pd-pd-right-12"}>
            p-Trait =
          </div>
          <div className={"formula-block"}>
            <Row gutter={[12, 12]} justify={"start"}>
              {data?.map((item) => {
                return (
                  <Col key={item.id} className={"col-drag"}>
                    <CardDrag key={item.id} id={item.id} moveCard={moveCard}>
                      <FormulaItemBlock
                        disabled={disabled}
                        onUpdateData={onUpdateData}
                        onCopyItem={onCopyItem}
                        onDeleteItem={onDeleteItem}
                        item={item}
                        category={category}
                        metricOpts={pTraitOptions}
                        pTraitOpts={pTraitOptions}
                        traitOpts={traitOptions}
                        functionOpts={functionOptions}
                      />
                    </CardDrag>
                  </Col>
                );
              })}

            </Row>
          </div>
        </div>

      </div>
    </Col>
  );
};

export default FormulaBuilderBlock;

const FormulaOperationActionBar = (props) => {
  const {onCreateOperatorItem} = props;
  return (
    <div className={"form-action-bar"}>
      <div
        className={"btn-s orange unselected-text" }
        id={"btn-add-a-math-operator"}
        onClick={() => onCreateOperatorItem(FORMULA_BLOCK_TYPE_ENUM.OPERATOR)}
      >
        + Math
      </div>
      <div
        className={"btn-s green unselected-text"}
        id={"btn-add-a-number"}
        onClick={() => onCreateOperatorItem(FORMULA_BLOCK_TYPE_ENUM.NUMBER)}
      >
        + Number
      </div>
      <div
        className={"btn-s blue unselected-text"}
        id={"btn-add-a-function"}
        onClick={() => onCreateOperatorItem(FORMULA_BLOCK_TYPE_ENUM.FUNCTION)}
      >
        + Function
      </div>
      <div
        className={"btn-s gray unselected-text"}
        id={"btn-add-a-simple-p-trait"}
        onClick={() => onCreateOperatorItem(FORMULA_BLOCK_TYPE_ENUM.METRIC_NAME)}
      >
        + p-Trait
      </div>
      <div
        className={"btn-s gray unselected-text"}
        id={"btn-add-a-trait"}
        onClick={() => onCreateOperatorItem(FORMULA_BLOCK_TYPE_ENUM.TRAIT)}
      >
        + Trait
      </div>
    </div>
  );
};