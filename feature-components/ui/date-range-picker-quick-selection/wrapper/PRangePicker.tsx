import React, {useRef, useState} from "react";
import {Button, DatePicker, Space} from "antd";
import {get} from "lodash";
import {FORMAT_CONFIG, getLabelDateRangeByEnum, PRangePickerPropType} from "./PRangePicker.constant";
import {CalendarBlank} from "phosphor-react";
import {uuidByte} from "./utils";
import moment from "moment";

const {RangePicker} = DatePicker;
const PRangePicker = (props: PRangePickerPropType) => {
  const datePickerRef = useRef(null);
  const [open, setOpen] = useState<boolean>(false);

  const onBlurDateRange = () => {
    //@ts-ignore
    datePickerRef.current.blur();
    setOpen(false);
  };

  const getTextDateRender = (data: any) => {
    //@ts-ignore
    if (data.selection !== "absolute") return getLabelDateRangeByEnum[data.selection];
    if (!data.selection) return "Không có dữ liệu, chọn một ngày để hiển thị";
    let fromDate = moment(get(data, "value[0]")).format(FORMAT_CONFIG.DATE_FORMAT);
    let toDate = moment(get(data, "value[1]")).format(FORMAT_CONFIG.DATE_FORMAT);
    return fromDate + " - " + toDate;
  };

  const uuid = props.antdProps?.id ? props.antdProps.id : uuidByte();

  return (
    <React.Fragment>
      <div className={"pd-space-between-center"}>

        <div
          id={uuid}
          className={"pd-space-between-center pointer " + props.antdProps?.className}
          style={{
            border: "1px solid #d6d6d7",
            width: "100%",
            padding: "4px 12px"
          }}
          onClick={() => setOpen(true)}>
          {getTextDateRender(props.primeProps)}

          <CalendarBlank size={16} weight="light"/>
        </div>

        {/*@ts-ignore*/}
        <RangePicker
          {...props.antdProps}
          style={{visibility: "hidden", width: 0, height: 0, padding: 0}}
          onChange={(dates, dateString) => {
            setOpen(false);
            props.antdProps.onChange(dates, dateString);
          }}
          open={open}
          placement="bottomRight"
          ref={datePickerRef}
          getPopupContainer={() => document.getElementById(uuid)}
          renderExtraFooter={() => {
            return (
              <Space size={16}>
                <Button onClick={onBlurDateRange} className={"btn-outline default"}>
                  Close
                </Button>
                <Button
                  onClick={onBlurDateRange}
                  id={"ca__btn-save-date-range"}
                  className={"btn-fill green"}>
                  Save
                </Button>
              </Space>
            );
          }}
        />
      </div>
    </React.Fragment>
  );
};

export default PRangePicker;