import { atom } from 'recoil';

export const AuthAtom = atom<boolean>({
  default: false,
  key: 'Auth.Atom',
});
