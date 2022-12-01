import { atom } from "recoil";

export const profileImageAtom = atom<string>({
  key: "profile_image",
  default: "",
});

export const weightAtom = atom<number>({
  key: "profile_weight",
  default: 0,
});

export const heightAtom = atom<number>({
  key: "profile_height",
  default: 0,
});

export const nickNameAtom = atom<string>({
  key: "profile_nickname",
  default: "",
});
