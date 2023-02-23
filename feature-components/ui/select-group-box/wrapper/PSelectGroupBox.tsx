import React, { useEffect } from 'react';
import {GroupTreeSelectBoxPropType, OptionItemType, PGroupSelectBoxState} from './SelectGroupBox.constant';
import {useTranslation} from "react-i18next";
import {useSetState} from "ahooks";
import {TFunction} from "i18next";
import {uuidByte} from "./utils";
import {cloneDeep} from "lodash";
import {Button, Dropdown, Input} from "antd";
import {CaretDown} from "phosphor-react";
import Fuse from "fuse.js";

const PSelectGroupBox = (props: GroupTreeSelectBoxPropType) => {
  const {t} = useTranslation()
  const {disabled, stylesCustom, id, options, isTranslate, onChange, value, label} = props;

  const [stateOfBox, setStateOfBox] = useSetState<PGroupSelectBoxState>({
    domId: uuidByte(),
    isVisible: false,
    displayName: null,
    select: null,
    opts: options || []
  })

  useEffect(() => {
    setStateOfBox({opts: options})
  }, [options])

  const searchOptionItemByValue = (valueOfOpt: string) => {
    let result = null
    options.forEach((item: OptionItemType) => {
      if (item.value === valueOfOpt) return result = item;
      if (item.options && item.options.length > 0) {
        item.options.forEach((child: OptionItemType) => {
          if (child.value === valueOfOpt) return result = child;
        })
      }
    })
    return result;
  }

  useEffect(() => {
    if (value) {
      let optItemSearch: OptionItemType | null = searchOptionItemByValue(value)
      if (optItemSearch !== null) {
        setStateOfBox({
          select: optItemSearch,
          // @ts-ignore
          displayName: isTranslate ? t(optItemSearch.label) : optItemSearch.label
        })
        onChange(optItemSearch)
      }
    }
  }, [value])

  const getOptionAfterTranslate = (listOfOpt: OptionItemType[]) => {
    const translated: OptionItemType[] = cloneDeep(listOfOpt)
    translated.forEach((item: OptionItemType) => {
      item.label = t(item.label);
      //@ts-ignore
      if (item.description) item.description = t(item.description);
      if (item.options && item.options.length > 0) {
        item.options.forEach((child: OptionItemType) => {
          child.label = t(child.label);
          //@ts-ignore
          if (child.description) child.description = t(child.description);
        })
      }
    })
    return translated;
  }

  const onSearch = (v: string) => {
    if (v.trim().length === 0) return setStateOfBox({opts: options});

    const optionTranslate = isTranslate ? getOptionAfterTranslate(props.options) : props.options
    const searchResult: OptionItemType[] = []
    optionTranslate.forEach((item: OptionItemType) => {
      if (item.options && item.options?.length > 0) {
        const fuse = new Fuse(item.options, {
          includeScore: true,
          keys: ['label', 'description'],
          threshold: 0.8,
          distance: 100,
          minMatchCharLength: 3,
        })

        const results = fuse.search(v)
        const arrFilter = results.map((res: { item: any; }) => {
          return {...res.item}
        })

        if (arrFilter.length > 0) {
          searchResult.push({
            ...item,
            options: arrFilter
          })
        }
      }

    })

    setStateOfBox({opts: searchResult})
  }

  const onChangeOpt = (optItem: OptionItemType) => {
    setStateOfBox({
      select: optItem,
      displayName: isTranslate ? t(optItem.label) : optItem.label
    })
    onChange(optItem)
  }

  return (
    <div className={"fw"}>
      {label && <div className="lbf">{label} <span className={"required-star"}>*</span></div>}
      <Dropdown
        disabled={disabled}
        open={stateOfBox.isVisible}
        onOpenChange={(state) => setStateOfBox({isVisible: state})}
        trigger={["click"]}
        overlay={
          <div className={"dropdown-box-container"}>
            <div className="input-search">
              <Input
                onChange={e => onSearch(e.target.value)}
                style={{
                  height: 40,
                  boxSizing: `border-box`,
                  borderRadius: 8,
                  color: "#141415",
                  transition: "all 0.3s ease",
                }}
                //@ts-ignore
                placeholder={t("common.dropdown_search_placeholder")}
              />
            </div>
            <div className={"options"}>
              {stateOfBox.opts.map(item => {
                return (
                  <OptionItem
                    key={item.value}
                    option={item}
                    t={isTranslate ? t : null}
                    onClick={onChangeOpt}/>
                )
              })}
            </div>
          </div>
        }
        getPopupContainer={(trigger: HTMLElement) => trigger.parentNode as HTMLElement}
        placement="bottomLeft">
        <Button
          id={id ? id : stateOfBox.domId}
          className={`select-group-box`}
          style={stylesCustom ? stylesCustom : {}}>
          <div>
            <span style={{color: stateOfBox.displayName ? "" : "#b7b7b8"}}>
              {stateOfBox.displayName || "Select an item"}
            </span>
          </div>
          <div className={"d-flex"}>
            <CaretDown className={"ic-down-arrow"} size={16}/>
          </div>
        </Button>
      </Dropdown>
    </div>
  )
}

export default PSelectGroupBox;

type OptionItemPropType = {
  option: OptionItemType;
  t?: TFunction | null;
  onClick: (optItem: OptionItemType) => void;
}
const OptionItem = (props: OptionItemPropType) => {
  const {option, onClick, t} = props;
  const hasOptions = option.options && option.options?.length > 0
  const getDescription = () => {
    if (hasOptions) return <React.Fragment/>
    return <div className={"description"}>{t ? t(`${option.description}`) : option.description}</div>
  }
  const getChildOption = () => {
    if (!option.options || option.options?.length === 0) return <React.Fragment/>
    let listOfOptionToRender = option.options.map((item: OptionItemType) => {
      return (
        <OptionItem key={item.value} t={t} option={item} onClick={onClick}/>
      )
    })

    listOfOptionToRender.push(<div className={"option-divider-bar"}/>)
    return listOfOptionToRender;
  }
  return (
    <div className={`option-item ${hasOptions && "group"}`} onClick={hasOptions ? () => {
    } : () => onClick(option)}>
      <div className={`title ${hasOptions && "group"}`}>{t ? t(option.label) : option.label}</div>
      {getDescription()}
      {getChildOption()}
    </div>
  )
}