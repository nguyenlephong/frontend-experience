import React, {useState} from "react";
import {Dropdown, Space, Select, Input} from "antd";
import {
  COLORS,
  FORMULA_BLOCK_TYPE_ENUM, FORMULA_OPERATOR_ENUM
} from "./Constant";
import {convertNormalTextToSnakeText} from "./Utils";
import {Copy, Divide, Minus, Plus, Trash, X} from "phosphor-react";


export const FormulaItemBlock = (props) => {
  const {
    item,
    onDeleteItem,
    onUpdateData,
    onCopyItem,
    pTraitOpts,
    functionOpts,
    traitOpts,
    disabled
  } = props;

  const suffixFormulaItem = (
    <Space size={8} align={"center"} wrap={true}>
      <div className={"pointer pd-space-between-center ant-select-suffix unselected-text"}
           style={{pointerEvents: "all"}}
           onClick={() => onCopyItem(item)}>
        <Copy size={16}/>
      </div>
      <div className={`pointer pd-space-between-center unselected-text`}
           style={{pointerEvents: "all"}}
           onClick={() => onDeleteItem(item)}>
        <Trash size={20} color={COLORS.red_r50}/>
      </div>
    </Space>
  );

  const InputStyle = {
    minWidth: 220,
    height: 40
  };
  const getElementByItemType = (type) => {
    switch (type) {
      case FORMULA_BLOCK_TYPE_ENUM.TRAIT:
        const traitElementName = `dropdown_trait_formula_${item.id}`;
        return (
          <div id={traitElementName}>
            <Select
              getPopupContainer={node => node.parentNode}
              size={"large"}
              name={traitElementName}
              defaultValue=""
              style={InputStyle}
              options={traitOpts}
              onChange={(val) => {
                onUpdateData(
                  val,
                  item,
                  traitOpts.find((x) => x.value === val)
                );
              }}
              value={item?.value ? item.value : null}
              suffixIcon={disabled ? null : suffixFormulaItem}
            />

          </div>
        );

      case FORMULA_BLOCK_TYPE_ENUM.FUNCTION:
        const funcElementName = `dropdown_func_formula_${item.id}`;
        return (
          <div id={funcElementName}>
            <Select
              getPopupContainer={node => node.parentNode}
              size={"large"}
              name={funcElementName}
              defaultValue=""
              style={InputStyle}
              options={functionOpts}
              onChange={(val) => {
                onUpdateData(
                  val,
                  item,
                  functionOpts.find((x) => x.value === val)
                );
              }}
              value={item?.value ? item.value : null}
              suffixIcon={disabled ? null : suffixFormulaItem}
            />
          </div>
        );

      case FORMULA_BLOCK_TYPE_ENUM.METRIC_NAME:
        const simplePTraitElementName = `dropdown_simple_p_Trait_formula_${item.id}`;
        return (
          <div id={simplePTraitElementName}>
            <Select
              getPopupContainer={node => node.parentNode}
              size={"large"}
              name={simplePTraitElementName}
              defaultValue=""
              style={InputStyle}
              options={pTraitOpts}
              onChange={(val) => {
                onUpdateData(
                  val,
                  item,
                  pTraitOpts.find((x) => x.value === val)
                );
              }}
              value={item?.value ? item.value : null}
              suffixIcon={disabled ? null : suffixFormulaItem}
            />
          </div>
        );

      case FORMULA_BLOCK_TYPE_ENUM.NUMBER:
        return (
          <div id={item.id}>
            <Input
              key={item?.name}
              disabled={disabled}
              type={"number"}
              size={"large"}
              name={convertNormalTextToSnakeText(`number__${item?.name}`)}
              defaultValue={item?.value ? item?.value : 0}
              onBlur={(e) => onUpdateData(Number(e.target.value), item)}
              suffix={disabled ? null : <div className={"suffix-wrapper"}>{suffixFormulaItem}</div>}
            />
          </div>
        );
      case FORMULA_BLOCK_TYPE_ENUM.OPERATOR:
        return (
          <OperatorAtomicBlock
            type={item.value}
            disabled={disabled}
            onDelete={() => onDeleteItem(item)}
            onChange={(o) => onUpdateData(o, item, item)}
          />
        );
      default:
        return <React.Fragment/>;
    }
  };

  return getElementByItemType(item.type);
};

export const OperatorAtomicBlock = (props) => {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const {type, onChange, onDelete, disabled} = props;

  const getIconOperator = (typeIcon) => {
    switch (typeIcon) {
      case FORMULA_OPERATOR_ENUM.PLUS:
        return <Plus size={16} weight={"bold"}/>;
      case FORMULA_OPERATOR_ENUM.MINUS:
        return <Minus size={16} weight={"bold"}/>;
      case FORMULA_OPERATOR_ENUM.MULTIPLE:
        return <X size={16} weight={"bold"}/>;
      case FORMULA_OPERATOR_ENUM.DIVIDE:
        return <Divide size={16} weight={"bold"}/>;
      case FORMULA_OPERATOR_ENUM.PARENTHESES_LEFT:
        return <span style={{fontSize: 22}} color={COLORS.green_g50}>{`(`}</span>;
      case FORMULA_OPERATOR_ENUM.PARENTHESES_RIGHT:
        return <span style={{fontSize: 22}} color={COLORS.green_g50}>{`)`}</span>;
      default:
        return <Plus size={16}/>;
    }
  };

  const onChooseOperator = (operator) => {
    onChange(operator);
    setIsOpenDropdown(false);
  };

  return (
    <Dropdown
      visible={isOpenDropdown}
      trigger={["click"]}
      disabled={disabled}
      onVisibleChange={setIsOpenDropdown}
      onBlur={() => setIsOpenDropdown(false)}
      overlay={
        <DropdownPopupSelectOperator
          onClose={() => setIsOpenDropdown(false)}
          onDelete={onDelete}
          onChooseOperator={onChooseOperator}
        />
      }
      placement="bottomLeft">
      <div onClick={() => setIsOpenDropdown(true)} className={`operator-atomic-block pointer`}>
        {getIconOperator(type)}
      </div>
    </Dropdown>
  );
};

const operators = [
  {
    id: 0,
    name: "Plus",
    value: FORMULA_OPERATOR_ENUM.PLUS,
    icon: <Plus size={16}/>
  },
  {
    id: 1,
    name: "Minus",
    value: FORMULA_OPERATOR_ENUM.MINUS,
    icon: <Minus size={16}/>
  },
  {
    id: 2,
    name: "Multiple",
    value: FORMULA_OPERATOR_ENUM.MULTIPLE,
    icon: <X size={16}/>
  },
  {
    id: 3,
    name: "Divide",
    value: FORMULA_OPERATOR_ENUM.DIVIDE,
    icon: <Divide size={16}/>
  },
  {
    id: 4,
    name: "Parentheses Left",
    value: FORMULA_OPERATOR_ENUM.PARENTHESES_LEFT,
    icon: <div className={"ic-parentheses left"}>{`( `}</div>
  },
  {
    id: 5,
    name: "Parentheses Right",
    value: FORMULA_OPERATOR_ENUM.PARENTHESES_RIGHT,
    icon: <div className={"ic-parentheses right"}>{` )`}</div>
  }
];

export const DropdownPopupSelectOperator = (props) => {
  const {onClose, onDelete} = props;

  const onChange = (item) => {
    props.onChooseOperator(item.value);
  };

  return (
    <div className={"operator-popup"}>
      <div className={"p-title "}>
        <div>Add a math item</div>
        <div className={"pointer"} onClick={onClose}>
          <X color={COLORS.neutral_n60} size={14} id={"ic-close"}/>
        </div>
      </div>

      <div className={"p-content"}>
        {operators.map((item) => {
          return (
            <div key={item.id} className={"o-item"} onClick={() => onChange(item)}>
              {item.icon}
              <div className={"o-name"}>{item.name}</div>
            </div>
          );
        })}
      </div>

      <div onClick={onDelete} className={"p-footer pd-flex-start"}>
        <Trash size={16} color={COLORS.red_r50}/>
        <div className={"o-name"}>Delete item</div>
      </div>
    </div>
  );
};