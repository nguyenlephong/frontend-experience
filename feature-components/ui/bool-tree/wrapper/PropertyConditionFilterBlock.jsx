import React from "react";
import { Col, Row, Space } from "antd";
import { Copy, Trash } from "phosphor-react";
import { COLORS } from "./constant";

const PropertyConditionFilterBlock = (props) => {

  const {type, data, onCopy, onDelete, onAddNode, } = props;

  return (
    <div key={data?.mainData} className={"pd-flex-start fw"}>
      <div className={`left-line ${type}`}/>
      <Row className={`condition-block fw`}>
        <Col>
          <div className={"pd-flex-start"}>
            Your custom logics
          </div>
        </Col>

        <Col className={"pd-flex-center"} id={`button-action-condition-block-${data.id}`}>

          <Space size={12} align={"center"}>
            <div onClick={() => onAddNode(type === "or" ? "and" : "or", data)}
                 className={`btn-type ${type === "or" ? "and-outline" : "or-outline"}`}>
              <span> + {type === "and" ? "Or" : "And" }</span>
            </div>
            <div onClick={() => onCopy(data)} className={"btn-small-copy pointer"}>
              <Copy size={20} color={COLORS.neutral_n60}/>
            </div>
            <div onClick={() => onDelete(data.id)} className={"btn-small-delete pointer"}>
              <Trash size={20} color={COLORS.red_r50}/>
            </div>
          </Space>

        </Col>
      </Row>
    </div>
  );
};

export default PropertyConditionFilterBlock
