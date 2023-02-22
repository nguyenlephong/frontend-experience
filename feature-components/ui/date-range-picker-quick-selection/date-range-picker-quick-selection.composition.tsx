import React, {useState} from 'react';
import {DateRangePickerQuickSelection} from './date-range-picker-quick-selection';
import PRangePicker from "./wrapper/PRangePicker";
import {Row, Col} from "antd";
import {pTraitDateRangeQuickSelection} from "./wrapper/PRangePicker.constant";
import "./wrapper/PRangePicker.style.scss";

export const BasicDateRangePickerQuickSelection = () => {
  const [date, setDate] = useState<null | any[]>(null);

  return (
    <DateRangePickerQuickSelection>
      <div className="page">
        <div className="container">
          <div className="lbf">Date Range</div>
          <Row gutter={[24, 24]}>
            <Col xs={24}>
              <PRangePicker
                antdProps={{
                  id: "p-Trait-time-limit-date-range",
                  allowClear: false,
                  className: "cdp__date-picker input-style",
                  onChange: (dates: any[]) => setDate(dates),
                  ranges: pTraitDateRangeQuickSelection,
                  key: date
                }}
                primeProps={{
                  type: "quick_selection",
                  selection: date ? date[2] : null,
                  value: date
                }}
              />
            </Col>

            {date && (
              <Col xs={24}>
                <div className={"json-viewer"}>
                  {JSON.stringify(date, null, 2)}
                </div>
              </Col>
            )}
          </Row>
        </div>
      </div>
    </DateRangePickerQuickSelection>
  );
}