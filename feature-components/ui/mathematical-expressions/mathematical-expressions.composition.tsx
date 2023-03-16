import React, {useMemo} from 'react';
import {MathematicalExpressions} from './mathematical-expressions';
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";
import FormulaBuilderBlock from "./wrapper/FormulaBuilderBlock";
import {useSetState} from "ahooks";
import "./wrapper/FormulaBuilder.style.scss";
import {Row, Col} from "antd"
import {evaluateFormula} from "./wrapper/Service";

type IState = {
  formula: any[];
  pTraitOptions?: any[];
  traitOptions?: any[];
  functionOptions?: any[];
  disabled: boolean;
}
export const BasicMathematicalExpressions = () => {
  const [state, setState] = useSetState<IState>({
    formula: [],
    disabled: false,
    pTraitOptions: [
      {
        "id": 3131,
        "label": "Buyers in 60 days",
        "description": "p-Trait is a user-level calculations that will be kept updated on a real-time basis. These computations are based on events.",
        "type": "simple",
        "category": "ptrait",
        "resultType": "num",
        "startDate": 1678861919,
        "lastExecution": 0,
        "status": "active",
        "dateRange": {
          "filterType": "absolute",
          "values": {
            "startDate": 1677603600,
            "endDate": 1682009999
          }
        },
        "metricFormat": "default",
        "value": 3131
      },
      {
        "id": 3126,
        "label": "Buyers in 90 days",
        "description": "p-Trait is a user-level calculations that will be kept updated on a real-time basis. These computations are based on events.",
        "type": "simple",
        "category": "ptrait",
        "resultType": "num",
        "startDate": 1678787261,
        "lastExecution": 0,
        "status": "active",
        "dateRange": {
          "filterType": "life_time",
          "values": {
            "startDate": 0,
            "endDate": 0
          }
        },
        "metricFormat": "integer",
        "value": 3126
      },
      {
        "id": 3121,
        "label": "test in segment",
        "description": "test in segment",
        "type": "simple",
        "category": "ptrait",
        "resultType": "num",
        "startDate": 1678430950,
        "lastExecution": 1678906870,
        "status": "active",
        "dateRange": {
          "filterType": "life_time",
          "values": {
            "startDate": 0,
            "endDate": 0
          }
        },
        "metricFormat": "default",
        "value": 3121
      },
    ],
    traitOptions: [
      {
        "ptraitName": "frequency_value_this_year",
        "ptraitType": "number",
        "ptraitDisplayName": "Frequency Value This Year",
        "id": "frequency_value_this_year",
        "label": "Frequency Value This Year",
        "value": "frequency_value_this_year"
      },
      {
        "ptraitName": "minimum_balance_alert",
        "ptraitType": "number",
        "ptraitDisplayName": "Minimum Balance Alert",
        "id": "minimum_balance_alert",
        "label": "Minimum Balance Alert",
        "value": "minimum_balance_alert"
      },
      {
        "ptraitName": "total_view",
        "ptraitType": "number",
        "ptraitDisplayName": "Total View",
        "id": "total_view",
        "label": "Total View",
        "value": "total_view"
      },
      {
        "ptraitName": "c_point_spent_points",
        "ptraitType": "number",
        "ptraitDisplayName": "C Point Spent Points",
        "id": "c_point_spent_points",
        "label": "C Point Spent Points",
        "value": "c_point_spent_points"
      },
      {
        "ptraitName": "c_point_available_points",
        "ptraitType": "number",
        "ptraitDisplayName": "C Point Available Points",
        "id": "c_point_available_points",
        "label": "C Point Available Points",
        "value": "c_point_available_points"
      },
      {
        "ptraitName": "total_conversation_number",
        "ptraitType": "number",
        "ptraitDisplayName": "Total Conversation Number",
        "id": "total_conversation_number",
        "label": "Total Conversation Number",
        "value": "total_conversation_number"
      },
      {
        "ptraitName": "bi_recency_point",
        "ptraitType": "number",
        "ptraitDisplayName": "Bi Recency Point",
        "id": "bi_recency_point",
        "label": "Bi Recency Point",
        "value": "bi_recency_point"
      },
      {
        "ptraitName": "recency",
        "ptraitType": "number",
        "ptraitDisplayName": "Recency",
        "id": "recency",
        "label": "Recency",
        "value": "recency"
      },
      {
        "ptraitName": "bi_frequency_value_this_year",
        "ptraitType": "number",
        "ptraitDisplayName": "Bi Frequency Value This Year",
        "id": "bi_frequency_value_this_year",
        "label": "Bi Frequency Value This Year",
        "value": "bi_frequency_value_this_year"
      },
      {
        "ptraitName": "c_point_waiting_points",
        "ptraitType": "number",
        "ptraitDisplayName": "C Point Waiting Points",
        "id": "c_point_waiting_points",
        "label": "C Point Waiting Points",
        "value": "c_point_waiting_points"
      },
      {
        "ptraitName": "recency_point",
        "ptraitType": "number",
        "ptraitDisplayName": "Recency Point",
        "id": "recency_point",
        "label": "Recency Point",
        "value": "recency_point"
      },
      {
        "ptraitName": "district",
        "ptraitType": "number",
        "ptraitDisplayName": "District",
        "id": "district",
        "label": "District",
        "value": "district"
      },
      {
        "ptraitName": "email_notification",
        "ptraitType": "string",
        "ptraitDisplayName": "Email Notification",
        "id": "email_notification",
        "label": "Email Notification",
        "value": "email_notification"
      }
    ],
    functionOptions: [
      {
        "id": "now",
        "label": "now()",
        "value": "now"
      }
    ],
  })

  const evaluate = useMemo(() => {
    return evaluateFormula(state.formula);
  }, [state.formula])

  return (
    <MathematicalExpressions>
      <div className={"wrapper-condition-block"}>
        <Row gutter={[12, 12]}>
          {/*@ts-ignore*/}
          <DndProvider backend={HTML5Backend}>
            <FormulaBuilderBlock
              disabled={state.disabled}
              //@ts-ignore
              data={state.formula}
              alias={"ptrait"}
              pTraitOptions={state.pTraitOptions}
              traitOptions={state.traitOptions}
              functionOptions={state.functionOptions}
              updateDataFormula={(v: any[]) => setState({formula: v})}
            />
          </DndProvider>

          <Col xs={24}>
            <div className="json-viewer">{JSON.stringify(evaluate, null, 2)}</div>
          </Col>
        </Row>
      </div>
    </MathematicalExpressions>
  );
}