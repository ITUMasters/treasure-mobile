import { useMutation, useQuery } from "@tanstack/react-query";
import {
  apiChangeAccountInfo,
  apiGetAllTreasures,
  apiGetTreasureById,
  apiGetUser,
  apiLogin,
  apiRegister,
} from "./queries";
import { QUERY_KEYS } from "./queryKeys";
import { QuizResponseData, Treasure, User } from "./types";

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
