import React, {useState} from "react";
import {useSetState} from "ahooks";
import {cloneDeep} from "lodash";
import {uuidByte} from "./utils";
import {getLineStyleByType, mainDataInit} from "./constant";
import {Col, Empty, Row, Space, Switch} from "antd";
import {CaretDown} from "phosphor-react";
import PropertyConditionFilterBlock from "./PropertyConditionFilterBlock";
import {SteppedLineTo} from "react-lineto";
import {BoolTreeProps} from "../bool-tree";

type ObjectNestedType = {
  [key: string]: any | ObjectNestedType | null;
}


export type TreeNode = {
  id: string;
  parentId: string;
  mainData: ObjectNestedType | null;
  isParent: boolean;
  level: number;
  type: null | "and" | "or" | undefined | string;
  
}

function BooleanTreeConditionFilterContainerTSX({children}: BoolTreeProps) {
  let alias = "eventFilter";
  const withinClass = "tree-wrapper" + alias;
  
  const [dataMetrics, setDataMetrics] = useState<TreeNode[]>([]);
  const [rootItem, setRootItem] = useState<TreeNode | any>({});
  const [state, setState] = useSetState({
    enabled: true,
    disabled: false,
    event: "",
    isViewDataStructure: false
  });
  
  const onUpdateData = (dataCurrent: TreeNode[]) => {
    setDataMetrics(dataCurrent);
  };
  
  const onCopy = (child: TreeNode) => {
    let dataClone = cloneDeep(child);
    
    let dataCurrent = [...dataMetrics];
    let indexInsert = dataCurrent.findIndex((x) => x.id === child.id);
    let newItem = {
      ...dataClone, id: uuidByte(),
    };
    
    dataCurrent.splice(indexInsert + 1, 0, newItem);
    setDataMetrics(dataCurrent);
  };
  
  const isParentHasChild = (parentId: string, dataCurrent: TreeNode[]) => {
    const childList = dataCurrent.filter((x) => x.parentId === parentId);
    const childListLength = childList?.length;
    return childListLength > 0;
  };
  
  const onDelete = (id: string, dataArg: TreeNode[]) => {
    let dataCurrent = [...(dataArg || dataMetrics)];
    let findItem = dataCurrent.find((x) => x.id === id);
    let parentId = findItem?.parentId;
    let ind = dataCurrent.findIndex((x) => x.id === id);
    dataCurrent.splice(ind, 1);
    setDataMetrics(dataCurrent);
    if (parentId && !isParentHasChild(parentId, dataCurrent)) {
      onDelete(parentId, dataCurrent);
    }
  };
  
  const addBlockWithType = (type: string) => {
    if (dataMetrics.length > 0) {
      if (type === "and" && rootItem.type === "or") return;
      if (type === "or" && rootItem.type === "and") return;
    }
    
    let dataCurrent = [...dataMetrics];
    let root = {...rootItem};
    if (dataCurrent.length === 0) {
      root = {
        id: uuidByte(), parentId: null, mainData: {
          steps: [{
            id: "ahihi_0107", name: "", type: "string", operator: "", value: "",
          },],
        }, isParent: true, level: 1, type: type, propertyName: "", propertyType: "", operator: "", argument: "",
      };
      dataCurrent.push(root);
      setRootItem(root);
    }
    
    const parentId = root?.id;
    let newItem: TreeNode = {
      id: uuidByte(),
      parentId: parentId,
      mainData: {...cloneDeep(mainDataInit)},
      isParent: false,
      level: root.level,
      type: null
    };
    dataCurrent.push(newItem);
    setDataMetrics(dataCurrent);
  };
  
  const updateData = (id: string, value: TreeNode) => {
    let dataCurrent = [...dataMetrics];
    let itemUpdate = dataCurrent.findIndex((x) => x.id === id);
    dataCurrent.splice(itemUpdate, 1, value);
    setDataMetrics(dataCurrent);
  };
  
  const changeRootType = (child: TreeNode) => {
    let dataCurrent = [...dataMetrics];
    let itemUpdate = dataCurrent.find((x) => x.id === child.id);
    if (!itemUpdate) return;
    itemUpdate.type = child.type === "and" ? "or" : "and";
    setDataMetrics(dataCurrent);
  };
  
  const onAddNode = (type: string, nodeCurrent: TreeNode) => {
    let dataCurrent = [...dataMetrics];
    let root = dataCurrent.find(x => x.id === nodeCurrent.parentId);
    if (!root) return;
    
    const parentId = root?.id;
    let nodeType: TreeNode = {
      id: uuidByte(),
      parentId: parentId,
      mainData: null,
      isParent: true,
      level: nodeCurrent.level,
      type: type,
    };
    
    const newLevel = nodeCurrent.level + 1;
    
    const nodeCurrentChangeIndex = dataCurrent.findIndex(x => x.id === nodeCurrent.id);
    dataCurrent[nodeCurrentChangeIndex].isParent = false;
    dataCurrent[nodeCurrentChangeIndex].parentId = nodeType.id;
    dataCurrent[nodeCurrentChangeIndex].level = newLevel;
    
    const newNode = {
      id: uuidByte(),
      parentId: nodeType.id,
      mainData: {...cloneDeep(mainDataInit)},
      isParent: false,
      level: newLevel,
      type: null,
      propertyName: "",
      propertyType: "",
      operator: "",
      argument: "",
    };
    dataCurrent.push(newNode);
    dataCurrent.push(nodeType);
    setDataMetrics(dataCurrent);
  };
  
  const renderTreeChildren = (childData: TreeNode, rootId: string) => {
    const childId = childData.id;
    const renderList = dataMetrics.filter((x) => x.parentId === childId);
    return (
      <React.Fragment key={childData.id}>
        <div className={`tree-item tree-item-child-${childId}`}>
          <div
            className={`child-${childId} btn-root ${childData.type} btn-small-${childData.type}`}
            onClick={() => changeRootType(childData)}>
            <Space size={8}>
              <div>{childData.type}</div>
              <CaretDown size={14} id={`ic-arrow-down-${childData.type}`}/>
            </Space>
          </div>
          
          <div className={"fw"}>
            {renderList.map((item, itemInd) => {
              if (item.parentId === null || item.level > childData.level + 1) return <React.Fragment
                key={"emp_" + item.level}/>;
              if (item.isParent) return renderTreeChildren(item, `child-${item.parentId}`);
              return (<React.Fragment key={item.id}>
                <div className={`wrapper-item-condition item-${item.id}`}>
                  <PropertyConditionFilterBlock
                    ind={itemInd}
                    disabled={state.disabled}
                    updateData={(value: TreeNode) => updateData(item.id, value)}
                    onUpdateData={onUpdateData}
                    data={item}
                    event={state.event}
                    type={childData.type}
                    onAddNode={onAddNode}
                    onCopy={onCopy}
                    onDelete={onDelete}
                  />
                </div>
                {/*@ts-ignore*/}
                <SteppedLineTo
                  key={item.id}
                  within={withinClass}
                  from={`child-${childId}`}
                  to={`item-${item.id}`}
                  {...getLineStyleByType(childData.type)}
                />
              </React.Fragment>);
            })}
          </div>
        </div>
        
        {/*@ts-ignore*/}
        <SteppedLineTo
          key={rootItem.id}
          within={withinClass}
          from={rootId}
          to={`child-${childId}`}
          {...getLineStyleByType(rootItem.type)}
        />
      </React.Fragment>);
  };
  
  return (
    <React.Fragment>
      <div className="page" id={"boolean-tree-filter-condition-page"} data-testid={"boolean-tree-filter-condition-page"}>
        <div className="container">
          <Row gutter={[24, 24]}>
            <Col xs={24}>
              <div className="cdp_switch--group fw pd-space-between-center">
                <Space size={12}>
                  <Space>
                    <Switch
                      disabled={state.disabled}
                      id={`vs__switch--ab-test`}
                      className="cdp_switch-primary"
                      onChange={(check) => setState({enabled: check})}
                      checked={state?.enabled}
                    />
                    <div
                      className={`cdp_switch--label ${state.disabled ? "not-allow" : "pointer"}`}
                      onClick={state.disabled ? () => {
                      } : () => setState({enabled: !state.enabled})}>
                      Boolean tree condition filter
                    </div>
                  </Space>
                  
                  <Space>
                    <Switch
                      disabled={state.disabled}
                      id={`vs__switch--result`}
                      className="cdp_switch-primary"
                      onChange={(check) => setState({isViewDataStructure: check})}
                      checked={state?.isViewDataStructure}
                    />
                    <div
                      className={`cdp_switch--label ${state.disabled ? "not-allow" : "pointer"}`}
                      onClick={state.disabled ? () => {
                      } : () => setState({isViewDataStructure: !state.isViewDataStructure})}>
                      Show data structure
                    </div>
                  </Space>
                </Space>
                
                {state?.enabled && !state.disabled && (<div className={"pd-flex-end btn-action-right"}>
                  <Space size={12}>
                    <div
                      onClick={() => addBlockWithType("or")}
                      className={`btn-small-or ${(rootItem.type === "and" && dataMetrics.length > 0) ? "disabled" : ""}`}>
                      + Or
                    </div>
                    <div
                      onClick={() => addBlockWithType("and")}
                      className={`btn-small-and ${(rootItem.type === "or" && dataMetrics.length > 0) ? "disabled" : ""}`}>
                      + And
                    </div>
                    
                    <div
                      onClick={() => {
                        setDataMetrics([])
                        setRootItem({})
                      }}
                      className={`btn-small-and`}>
                      - Reset data
                    </div>
                  
                  </Space>
                </div>)}
              </div>
            </Col>
            
            {state?.enabled && (
              <Col xs={24}>
                <div className={"wrapper-condition-block"} id={"metric-block-condition"}>
                  <div className={"tree-wrapper " + withinClass}>
                    <div className={"tree-item"}>
                      {dataMetrics?.length > 1 && (<div
                        className={`root-${alias}-${rootItem.id} btn-root ${rootItem.type} btn-small-${rootItem.type}`}
                        onClick={() => changeRootType(rootItem)}>
                        <Space size={8}>
                          <div>{rootItem.type}</div>
                          <CaretDown size={14} id={`ic-arrow-down-${rootItem.type}`}/>
                        </Space>
                      </div>)}
                      
                      <div className={"fw"}>
                        {dataMetrics?.map((item, ind) => {
                          if (item.parentId === null || item.level > rootItem.level) return <React.Fragment
                            key={"emp_" + ind}/>;
                          if (item.isParent) return renderTreeChildren(item, `root-${alias}-${item.parentId}`);
                          return (
                            <React.Fragment key={item.id}>
                              <div
                                className={`wrapper-item-condition item-${alias}-${item.id}`}>
                                <PropertyConditionFilterBlock
                                  ind={ind}
                                  disabled={state.disabled}
                                  updateData={(value: TreeNode) => {
                                    updateData(item.id, value);
                                  }}
                                  onUpdateData={onUpdateData}
                                  data={item}
                                  event={state.event}
                                  type={rootItem.type}
                                  onAddNode={onAddNode}
                                  onCopy={onCopy}
                                  onDelete={onDelete}
                                />
                              </div>
                              {/*@ts-ignore*/}
                              <SteppedLineTo
                                key={item.id}
                                within={withinClass}
                                from={`root-${alias}-${rootItem.id}`}
                                to={`item-${alias}-${item.id}`}
                                {...getLineStyleByType(rootItem.type)}
                              />
                            </React.Fragment>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  
                  
                  {dataMetrics?.length < 1 && (<div className={`empty-wrapper`}>
                    <Empty
                      image={Empty.PRESENTED_IMAGE_SIMPLE}
                      description={"Không có dữ liệu"}>
                      <span>Hãy nhấn button '+ And' hoặc '+ Or' để tạo mới một condition.</span>
                    </Empty>
                  </div>)}
                </div>
              </Col>)}
            
            {state.isViewDataStructure && (
              <Col xs={24}>
                <div className="json-viewer">{JSON.stringify(dataMetrics, null, 2)}</div>
              </Col>
            )}
          </Row>
        </div>
      </div>
    </React.Fragment>
  )
}

export default BooleanTreeConditionFilterContainerTSX;
