import { atom } from 'recoil';

export const NavbarOpenAtom = atom<boolean>({
  default: true,
  key: 'NavbarOpen.Atom',
});

