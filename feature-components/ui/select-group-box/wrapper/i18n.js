import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      "common": {
        "english": "English",
        "vietnamese": "Vietnamese",
        "dropdown_search_placeholder": "Let me know what you are looking for?",
      },
      "preview": {
        "default": "Default",
        "default_desc": "Show default format according to formula",
        "date_part": "Date part",
        "date_month_year": "Date month year",
        "date_month_year_desc": "Full date display",
        "year": "Year",
        "year_desc": "Show only year",
        "quarter": "Quarter",
        "quarter_desc": "Show results as Quarter of the year",
        "month": "Month",
        "month_desc": "Show only month",
        "week": "Week",
        "week_desc": "Show what week of the month",
        "day": "Day",
        "day_desc": "Show only date",
        "day_of_week": "Day of week",
        "day_of_week_desc": "Show what day of the week",
        "day_of_year": "Day of year",
        "day_of_year_desc": "Show what day of the year",
        "weekday": "Weekday",
        "weekday_desc": "Show Day of the week (Monday, Tuesday,...)",
        "date_difference": "Date difference",
        "day_ago": "Day ago",
        "day_ago_desc": "Show the number of days up to the present, since the event occurred",
        "weeks_ago": "Weeks ago",
        "weeks_ago_desc": "Show the number of Weeks up to the present, since the event occurred",
        "months_ago": "Months ago",
        "months_ago_desc": "Display the number of Months up to the present, since the event occurred",
        "quarters_ago": "Quarters ago",
        "quarters_ago_desc": "Displays the number of quarters up to the present, since the event occurred",
        "years_ago": "Years ago",
        "years_ago_desc": "Show the number of Years up to the present, since the event occurred",
        "numeric": "Numeric",
        "floating_point": "Floating point",
        "floating_point_desc": "Show actual number format",
        "integer": "Integer",
        "integer_desc": "Show integer format",
        "percent": "Integer",
        "percent_desc": "Show % format",
        "financial": "Financial",
        "financial_desc": "Show currency format",
        "preview_output": "Preview Output",
        "output": "Output"
      }
    }
  },
  vi: {
    translation: {
      "common": {
        "english": "Tiếng Anh",
        "vietnamese": "Tiếng Việt",
        "dropdown_search_placeholder": "Hãy cho tôi biết những gì bạn đang tìm kiếm?",
      },
      "preview": {
        "default": "Mặc định",
        "default_desc": "Hiển thị định dạng mặc định theo công thức tính",
        "date_part": "Phần ngày",
        "date_month_year": "Ngày tháng năm",
        "date_month_year_desc": "Hiển thị đầy đủ ngày tháng năm",
        "year": "Năm",
        "year_desc": "Chỉ hiển thị năm",
        "quarter": "Quý",
        "quarter_desc": "Hiển thị kết quả là Quý của năm",
        "month": "Tháng",
        "month_desc": " Chỉ hiển thị tháng",
        "week": "Tuần",
        "week_desc": "Hiển thị tuần thứ bao nhiêu trong tháng",
        "day": "Ngày",
        "day_desc": " Chỉ hiển thị ngày",
        "day_of_week": "Ngày trong tuần",
        "day_of_week_desc": "Hiển thị ngày thứ bao nhiêu trong tuần",
        "day_of_year": "Ngày trong năm",
        "day_of_year_desc": "Hiển thị ngày thứ bao nhiêu trong năm",
        "weekday": "Ngày trong tuần",
        "weekday_desc": "Hiển thị Thứ trong tuần (Thứ hai, Thứ 3,…)",
        "date_difference": "Ngày chênh lệch",
        "day_ago": "Ngày trước",
        "day_ago_desc": "Hiển thị số lượng Ngày tính đến hiện tại, kể từ lúc phát sinh sự kiện",
        "weeks_ago": "Tuần trước",
        "weeks_ago_desc": "Hiển thị số lượng Tuần tính đến hiện tại, kể từ lúc phát sinh sự kiện",
        "months_ago": "Tháng trước",
        "months_ago_desc": "Hiển thị số lượng Tháng tính đến hiện tại, kể từ lúc phát sinh sự kiện",
        "quarters_ago": "Một phần tư trước",
        "quarters_ago_desc": "Hiển thị số lượng Quý tính đến hiện tại, kể từ lúc phát sinh sự kiện",
        "years_ago": "Năm trước",
        "years_ago_desc": "Hiển thị số lượng của Năm tính đến hiện tại, kể từ lúc phát sinh sự kiện",
        "numeric": "Số",
        "floating_point": "Dấu phẩy động",
        "floating_point_desc": "Hiển thị định dạng số thực",
        "integer": "Số nguyên",
        "integer_desc": "Hiển thị định dạng số nguyên",
        "percent": "Số nguyên",
        "percent_desc": "Hiển thị định dạng thị trường %",
        "financial": "Tài chính",
        "financial_desc": "Hiển thị định dạng tiền tệ định dạng",
        "preview_output": "Xem trước đầu ra",
        "output": "Đầu ra"
      }
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;