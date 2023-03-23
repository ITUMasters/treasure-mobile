import { SetterOrUpdater, useRecoilValue, useSetRecoilState } from 'recoil';
import { AuthAtom } from './AuthStore';

export const useAuth = (): boolean => {
  return useRecoilValue(AuthAtom);
};

export const useSetAuth = (): SetterOrUpdater<boolean> => {
  return useSetRecoilState(AuthAtom);
};
