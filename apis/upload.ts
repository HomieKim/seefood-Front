import { request } from "./client";

type searchFoodType = (name: string) => Promise<Array<string>>;
export const searchFoodAPI: searchFoodType = (name) => {
  return request({
    method: "get",
    url: "/food/search",
    params: {
      name,
    },
  }).then((res) => {
    return res.data.foodNames;
  });
};
