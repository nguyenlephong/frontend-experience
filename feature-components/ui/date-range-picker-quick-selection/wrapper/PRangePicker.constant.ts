import moment from "moment";

export type PRangePickerPropType = {
  antdProps: any;
  primeProps: any;
}

export const getLabelDateRangeByEnum = {
  life_time: "Life time",
  day: "Today",
  yesterday: "Yesterday",
  week: "This week",
  month: "This Month",
  last_7_days: "Last 7 days",
  last_30_days: "Last 30 days",
  last_14_days: "Last 14 days",
  last_90_days: "Last 90 days"
};

export const FORMAT_CONFIG = {
  TIME_FORMAT: "HH:mm",
  DAY_MONTH_FORMAT: "DD/MM",
  MONTH_YEAR_FORMAT: "MM/YYYY",
  DATE_FORMAT: "DD/MM/YYYY",
  DATE_FORMAT_TEXT: "DD MMM YYYY",
  DATE_TIME_FORMAT: "DD/MM/yyyy HH:mm:ss",
  DATE_TIME_CAMPAIGN_FORMAT: "DD/MM/YYYY - HH:mm",
  DATE_REVERT_FORMAT: "YYYY-MM-DD",
};

export const dateRangeQuickSelectionEnum = {
  life_time: "life_time",
  hour: "hour",
  today: "day",
  yesterday: "yesterday",
  this_week: "week",
  this_month: "month",
  last7Days: "last_7_days",
  last14Days: "last_14_days",
  last30Days: "last_30_days",
  last90Days: "last_90_days",
  absolute: "absolute"
};

export const dateRange = {
  today: [moment().startOf("day"), moment().endOf("day"), dateRangeQuickSelectionEnum.today],
  yesterday: [
    moment().subtract(1, "days").startOf("day"),
    moment().subtract(1, "days").endOf("day"),
    dateRangeQuickSelectionEnum.yesterday
  ],
  lifetime: [moment(), moment(), dateRangeQuickSelectionEnum.life_time],
  thisWeek: [moment().startOf("week"), moment().endOf("day"), dateRangeQuickSelectionEnum.this_week],
  lastWeek: [
    moment().subtract(1, "weeks").startOf("week").startOf("day"),
    moment().subtract(1, "weeks").endOf("week").endOf("day")
  ],
  last7Days: [moment().subtract(7, "days").startOf("day"), moment(), dateRangeQuickSelectionEnum.last7Days],
  last14Days: [moment().subtract(2, "weeks").startOf("day"), moment(), dateRangeQuickSelectionEnum.last14Days],
  last15Days: [moment().subtract(2, "weeks").subtract(1, "days").startOf("day"), moment()],
  last30Days: [moment().subtract(30, "days").startOf("day"), moment(), dateRangeQuickSelectionEnum.last30Days],
  thisMonth: [moment().startOf("month"), moment().endOf("day"), dateRangeQuickSelectionEnum.this_month],
  lastMonth: [
    moment().subtract(1, "months").startOf("month"),
    moment().subtract(1, "months").endOf("month")
  ],
  lastQuarter: [
    moment().subtract(3, "months").startOf("month"),
    moment().subtract(1, "months").endOf("month")
  ],
  last90Days: [moment().subtract(90, "days"), moment(), dateRangeQuickSelectionEnum.last90Days],
  lastHaftYear: [
    moment().startOf("years"),
    moment().startOf("years").add(5, "months").endOf("month")
  ],
  lastHaftBeginYear: [
    moment().startOf("years"),
    moment().startOf("years").add(5, "months").endOf("month")
  ],
  lastHaftEndYear: [
    moment().startOf("years"),
    moment().startOf("years").add(5, "months").endOf("month")
  ],
  thisYear: [moment().startOf("year"), moment().endOf("day")],
  lastYear: [
    moment().subtract(1, "years").startOf("year"),
    moment().subtract(1, "years").endOf("year")
  ],
  last2Year: [
    moment().subtract(2, "years").startOf("year"),
    moment().subtract(1, "years").endOf("year")
  ]
};


export const pTraitDateRangeQuickSelection = {
  Lifetime: dateRange.lifetime,
  Today: dateRange.today,
  Yesterday: dateRange.yesterday,
  "This week": dateRange.thisWeek,
  "This Month": dateRange.thisMonth,
  "Last 7 Days": dateRange.last7Days,
  "Last 14 Days": dateRange.last14Days,
  "Last 30 Days": dateRange.last30Days,
  "Last 90 days": dateRange.last90Days
};