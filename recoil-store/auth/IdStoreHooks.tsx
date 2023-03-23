import { SetterOrUpdater, useRecoilValue, useSetRecoilState } from "recoil";
import { IdAtom } from "./IdStore";

export const useId = (): number => {
  return useRecoilValue(IdAtom);
};

export const useSetId = (): SetterOrUpdater<number> => {
  return useSetRecoilState(IdAtom);
};
