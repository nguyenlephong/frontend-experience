import React from 'react';
import {Col, Row, Radio, RadioChangeEvent} from "antd";
import {OptionItemType, FORMAT_CONFIG} from "./SelectGroupBox.constant";
import {useSetState} from "ahooks";
import {useTranslation} from "react-i18next";
import moment from "moment";
import PSelectGroupBox from "./PSelectGroupBox";
import "./PSelectGroupBox.style.scss";
import i18n from "i18next";
const viLocale = require("moment/locale/vi");
const enLocale = require("moment/locale/en-au");

type PreviewFormatWrapperBoxPropType = {}
type PreviewState = {
  value: string;
  language: string;
  selected: null | OptionItemType
}
const PreviewFormatWrapperBox = (props: PreviewFormatWrapperBoxPropType) => {
  const {t} = useTranslation()
  const [preview, setPreview] = useSetState<PreviewState>({
    value: "integer",
    selected: null,
    language: "en"
  })

  const getOption = () => {
    const options: OptionItemType[] = [
      {
        label: "preview.default",
        value: "default",
        options: [
          {
            label: "preview.default",
            value: "default",
            description: "preview.default_desc",
          }
        ]
      },
      {
        label: "preview.date_part",
        value: "date_part",
        options: [
          {
            label: "preview.date_month_year",
            value: "date_month_year",
            description: "preview.date_month_year_desc"
          },
          {
            label: "preview.year",
            value: "year",
            description: "preview.year_desc"
          },
          {
            label: "preview.quarter",
            value: "quarter",
            description: "preview.quarter_desc"
          },
          {
            label: "preview.month",
            value: "month",
            description: "preview.month_desc"
          },
          {
            label: "preview.week",
            value: "week",
            description: "preview.week_desc"
          },
          {
            label: "preview.day",
            value: "day",
            description: "preview.day_desc"
          },
          {
            label: "preview.day_of_week",
            value: "day_of_week",
            description: "preview.day_of_week_desc"
          },
          {
            label: "preview.day_of_year",
            value: "day_of_year",
            description: "preview.day_of_year_desc"
          },
          {
            label: "preview.weekday",
            value: "weekday",
            description: "preview.weekday_desc"
          },
        ]
      },
      {
        label: "preview.date_difference",
        value: "date_difference",
        options: [
          {
            label: "preview.day_ago",
            value: "day_ago",
            preview: moment().subtract(Math.floor(Math.random() * 10) + 1, 'days').fromNow(),
            description: "preview.day_ago_desc"
          },
          {
            label: "preview.weeks_ago",
            value: "weeks_ago",
            preview: moment().subtract(Math.floor(Math.random() * 10) + 1, 'weeks').fromNow(),
            description: "preview.weeks_ago_desc"
          },
          {
            label: "preview.months_ago",
            value: "months_ago",
            preview: moment().subtract(Math.floor(Math.random() * 10) + 1, 'months').fromNow(),
            description: "preview.months_ago_desc"
          },
          {
            label: "preview.quarters_ago",
            value: "quarters_ago",
            preview: moment().subtract(Math.floor(Math.random() * 10) + 1, 'quarters').fromNow(),
            description: "preview.quarters_ago_desc"
          },
          {
            label: "preview.years_ago",
            value: "years_ago",
            preview: moment().subtract(Math.floor(Math.random() * 10) + 1, 'years').fromNow(),
            description: "preview.years_ago_desc"
          }
        ]
      },
      {
        label: "preview.numeric",
        value: "numeric",
        options: [
          {
            label: "preview.floating_point",
            value: "floating_point",
            preview: "27,17",
            description: "preview.floating_point_desc"
          },
          {
            label: "preview.integer",
            value: "integer",
            preview: "27",
            description: "preview.integer_desc"
          },
          {
            label: "preview.percent",
            value: "percent",
            preview: "50%",
            description: "preview.percent_desc"
          },
          {
            label: "preview.financial",
            value: "financial",
            preview: "100 VND",
            description: "preview.financial_desc"
          }
        ]
      }
    ]
    options.forEach(option => {
      if (option.value === "date_part") {
        option.options?.forEach((child: OptionItemType) => {
          switch (child.value) {
            case "date_month_year":
              child["preview"] = moment().format(FORMAT_CONFIG.DATE_FORMAT);
              break

            case "year":
              child["preview"] = moment().year().toString();
              break

            case "quarter":
              child["preview"] = moment().quarter().toString();
              break

            case "month":
              child["preview"] = `${moment().month() + 1}`;
              break

            case "week":
              child["preview"] = moment().weeks().toString();
              break

            case "day":
              child["preview"] = moment().date().toString();
              break

            case "day_of_week":
              child["preview"] = moment().isoWeekday().toString();
              break

            case "day_of_year":
              child["preview"] = moment().dayOfYear().toString();
              break

            case "weekday":
              child["preview"] = moment().format("dddd");
              break

            default:
              child["preview"] = ""
              break
          }
        })
      }
    })
    return options;
  }

  const onChangeLanguage = async (lang: string) => {
    setPreview({language: lang})
    await i18n.changeLanguage(lang);
    if (lang === "vi") moment.locale("vi", viLocale);
    if (lang === "en") moment.locale("en", enLocale)
  }
  return (
    <React.Fragment>
      <div className="page">
        <div className="container">
          <Row gutter={[24, 24]}>
            <Col xs={24}>
              <Radio.Group
                onChange={(e: RadioChangeEvent) => onChangeLanguage(e.target.value)}
                value={preview.language}>
                <Radio value={"en"}>{t("common.english")}</Radio>
                <Radio value={"vi"}>{t("common.vietnamese")}</Radio>
              </Radio.Group>
            </Col>
            <Col xs={24} md={12} className={"pd-flex-start"}>
              <PSelectGroupBox
                //@ts-ignore
                label={t("preview.output")}
                isTranslate={true}
                disabled={false}
                onChange={(opt: OptionItemType) => setPreview({selected: opt, value: opt.value})}
                value={preview.value}
                options={getOption()}/>
            </Col>
            <Col xs={24} md={12}>
              <div className="lbf">{t("preview.preview_output")}</div>
              <div className={"output-value"}>{preview.selected?.preview}</div>
            </Col>
          </Row>
        </div>
      </div>

    </React.Fragment>
  );
};


export default PreviewFormatWrapperBox;