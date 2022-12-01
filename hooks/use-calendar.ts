import { getCalendarAPI } from "./../apis/food";
import { CalendarResponse } from "types/calendar";
import React from "react";
import { useQuery } from "react-query";

interface Props {
  year: number;
  month: number;
}

const useCalendar = ({ year, month }: Props) => {
  const { data, isLoading } = useQuery<CalendarResponse>(
    ["calendar", year, month],
    () => getCalendarAPI({ year, month })
  );
  return { data, isLoading };
};

export default useCalendar;
