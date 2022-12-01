import { atom } from "recoil";

export const foodSearchAtom = atom<Array<string>>({
  key: "food_search",
  default: [],
});

export const selectedFoodAtom = atom<Array<string>>({
  key: "selected_food",
  default: [],
});
