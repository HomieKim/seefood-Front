import { atom } from "recoil";
export const uploadImageAtom = atom<File | null>({
  key: "uploadImage",
  default: null,
});

export const nowCategoryAtom = atom<string>({
  key: "nowCategory",
  default: "",
});

export const tagsAtom = atom<Array<string>>({
  key: "tags",
  default: [],
});

export const preViewUrlAtom = atom<string | null>({
  key: "preview",
  default: null,
});
