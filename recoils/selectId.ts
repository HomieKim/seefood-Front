import { atom } from 'recoil';

export const selectedId = atom<number>({
  key:'selectedId',
  default:0,
});