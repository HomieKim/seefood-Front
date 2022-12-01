export type Calendar = {
  date: string;
  cal: number;
};

type CalendarResponse = {
  dateInfoList: Array<{
    date: string;
    dietImageList: Array<string>;
    kcal: number;
  }>;
};
