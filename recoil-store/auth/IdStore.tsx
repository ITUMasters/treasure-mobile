import { atom } from 'recoil';

export const IdAtom = atom<number>({
  default: 0,
  key: 'Id.Atom',
});
