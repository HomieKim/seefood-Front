import { CalendarResponse } from "types/calendar";
import { DietResponse } from "types/post";
import { request } from "./client";

export const getFoodAPI = () => {};

type getCalendarType = ({
  year,
  month,
}: {
  year: number;
  month: number;
}) => Promise<CalendarResponse>;
export const getCalendarAPI: getCalendarType = ({ year, month }) => {
  return request({
    method: "get",
    url: "/food/calendar",
    params: {
      year,
      month,
    },
  }).then((res) => res.data);
};

type getFoodDetailType = ({
  id,
  page,
}: {
  id: number;
  page: number;
}) => Promise<DietResponse>;
export const getFoodDetailAPI: getFoodDetailType = ({ id, page }) => {
  return request({
    method: "get",
    url: "food",
    params: {
      id,
      page,
    },
  }).then((res) => {
    const { data } = res;
    return {
      DietList: data.myDietList,
      nowPage: page,
      isLast: !data.hasNextPage,
    };
  });
};
