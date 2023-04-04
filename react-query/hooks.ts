import { useMutation, useQuery } from "@tanstack/react-query";
import {
  apiChangeAccountInfo,
  apiGetAllTreasures,
  apiGetHintsByTreasureId,
  apiGetTreasureById,
  apiGetTreasureByPageId,
  apiGetUser,
  apiLogin,
  apiPurchaseHint,
  apiRegister,
} from "./queries";
import { QUERY_KEYS } from "./queryKeys";
import { Hint, QuizResponseData, Treasure, User } from "./types";

type CustomMutationProps = {
  onSuccess?: (data: any) => void;
  onError?: (err: any) => void;
};

const defaultQueryOptions = { cacheTime: 0, refetchOnWindowFocus: false };

export const useRegisterMutation = ({
  onSuccess,
  onError,
}: CustomMutationProps = {}) => {
  return useMutation({
    mutationFn: apiRegister,
    onSuccess: (data) => {
      onSuccess?.(data);
    },
    onError: (err) => {
      onError?.(err);
    },
  });
};

export const useLoginMutation = ({
  onSuccess,
  onError,
}: CustomMutationProps = {}) => {
  return useMutation({
    mutationFn: apiLogin,
    onSuccess: (data) => {
      onSuccess?.(data);
    },
    onError: (err) => {
      onError?.(err);
    },
  });
};

export const useUser = (userId: number) => {
  const { data, ...rest } = useQuery({
    queryKey: QUERY_KEYS.user,
    queryFn: () => apiGetUser(userId),
    ...defaultQueryOptions,
  });
  const user: User = data?.data;
  return { user: user, ...rest };
};

export const useAccountChangeMutation = ({
  onSuccess,
  onError,
}: CustomMutationProps = {}) => {
  return useMutation({
    mutationFn: apiChangeAccountInfo,
    onSuccess: (data) => {
      onSuccess?.(data);
    },
    onError: (err) => {
      onError?.(err);
    },
  });
};

export const useAllTreasures = () => {
  const { data, ...rest } = useQuery({
    queryKey: QUERY_KEYS.allTreasures,
    queryFn: apiGetAllTreasures,
    ...defaultQueryOptions,
  });
  const treasures: Treasure[] = data?.data.entities;
  return { treasures: treasures, ...rest };
};

export const useTreasureById = (treasureId: number) => {
  const { data, ...rest } = useQuery({
    queryKey: QUERY_KEYS.treasureById,
    queryFn: () => apiGetTreasureById(treasureId),
    ...defaultQueryOptions,
  });
  const treasure: Treasure = data?.data;
  return { treasure: treasure, ...rest };
};

export const useTreasureByPageId = (pageId: number, regionId = 25) => {
  const { data, ...rest } = useQuery({
    queryKey: [QUERY_KEYS.treasureByPageId, pageId, regionId],
    queryFn: () => apiGetTreasureByPageId(pageId, regionId),
    ...defaultQueryOptions,
  });

  const treasures: Treasure[] = data?.data.entities;
  const pageCount: number = data?.data.pageCount;

  return { treasures: treasures, pageCount: pageCount, ...rest };
};

export const useHintsByTreasureId = (treasureId: number) => {
  const { data, ...rest } = useQuery({
    queryKey: ["HintsByTreasureId", treasureId],
    queryFn: () => apiGetHintsByTreasureId(treasureId),
    ...defaultQueryOptions,
  });
  const hints: Hint[] = data?.data.entities;

  return { hints: hints, ...rest };
};

export const useHintPurchaseMutation = ({
  onSuccess,
  onError,
}: CustomMutationProps = {}) => {
  return useMutation({
    mutationFn: apiPurchaseHint,
    onSuccess: (data) => {
      onSuccess?.(data);
    },
    onError: (err) => {
      onError?.(err);
    },
  });
};
