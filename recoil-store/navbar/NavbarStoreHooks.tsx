import { SetterOrUpdater, useRecoilValue, useSetRecoilState } from 'recoil';
import { NavbarOpenAtom } from '../navbar/NavbarStore';

export const useNavbarOpen = (): boolean => {
  return useRecoilValue(NavbarOpenAtom);
};

export const useSetNavbarOpen = (): SetterOrUpdater<boolean> => {
  return useSetRecoilState(NavbarOpenAtom);
};

