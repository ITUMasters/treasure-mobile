import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import {
  apiChangeAccountInfo,
  apiDownloadImage,
  apiGetAllTreasures,
  apiGetCompletedTreasures,
  apiGetHintsByTreasureId,
  apiGetLeaderboardByTreasureId,
  apiGetLocations,
  apiGetTreasureById,
  apiGetTreasureByPageId,
  apiGetTreasureSubmissionByInteractionId,
  apiGetUser,
  apiGetWeeklyChallenge,
  apiJoin,
  apiJoinToChallenge,
  apiLogin,
  apiPurchaseHint,
  apiRegister,
  apiTreasureSubmission,
  apiUploadImage,
} from "./queries";
import { QUERY_KEYS } from "./queryKeys";
import {
  Hint,
  QuizResponseData,
  Treasure,
  TreasureSubmission,
  User,
} from "./types";

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
    queryKey: ["user", userId],
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

export const useTreasureByPageId = (
  pageId: number,
  regionId: number | null
) => {
  const { data, ...rest } = useQuery({
    queryKey: [QUERY_KEYS.treasureByPageId, pageId, regionId],
    queryFn: () => apiGetTreasureByPageId(pageId, regionId),
    ...defaultQueryOptions,
  });
  const treasures: Treasure[] = data?.data.entities;
  const pageCount: number = data?.data.pageCount;

  return { treasures: treasures, pageCount: pageCount, ...rest };
};

function parseURL(url: string) {
  let size = url.length;
  let answer = "";
  for (let i = size - 1; i >= 0; i--) {
    if (url[i] !== "/") {
      answer += url[i];
    } else {
      break;
    }
  }
  return Number(answer.split("").reverse());
}

export const useInfiniteTreasureByPageId = (
  pageId: number,
  regionId: number | null
) => {
  const { data, ...rest } = useInfiniteQuery({
    queryKey: [QUERY_KEYS.infiniteTreasureByPageId, pageId, regionId],
    queryFn: ({ pageParam = 1 }) => apiGetTreasureByPageId(pageParam, regionId),

    getNextPageParam: (lastPage, allPages) => {
      const pageParam = parseURL(lastPage.request.responseURL);
      if (lastPage.data.pageCount !== pageParam) {
        return pageParam + 1;
      }
    },
  });

  let treasures: Treasure[] = [];
  for (let i = 0; data?.pages && i < data?.pages.length; i++) {
    treasures.push(data?.pages[i].data.entities);
  }
  const pageCount: number = data?.pages[0]?.data.pageCount;

  return { treasures: treasures.flat(), pageCount: pageCount, ...rest };
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

export const useJoinMutation = ({
  onSuccess,
  onError,
}: CustomMutationProps = {}) => {
  return useMutation({
    mutationFn: apiJoin,
    onSuccess: (data) => {
      onSuccess?.(data);
    },
    onError: (err) => {
      onError?.(err);
    },
  });
};

export const useTreasureSubmission = ({
  onSuccess,
  onError,
}: CustomMutationProps = {}) => {
  return useMutation({
    mutationFn: apiTreasureSubmission,
    onSuccess: (data) => {
      onSuccess?.(data);
    },
    onError: (err) => {
      onError?.(err);
    },
  });
};

export const useTreasureSubmissionByInteractionId = (interactionId: number) => {
  const { data, ...rest } = useQuery({
    queryKey: ["TreasureSubmissionByInteractionId", interactionId],
    queryFn: () => apiGetTreasureSubmissionByInteractionId(interactionId),
    ...defaultQueryOptions,
  });
  const treasureSubmissions: TreasureSubmission[] = data?.data.entities;

  return { treasureSubmissions: treasureSubmissions, ...rest };
};

export const useUploadImageMutation = ({
  onSuccess,
  onError,
}: CustomMutationProps = {}) => {
  return useMutation({
    mutationFn: apiUploadImage,
    onSuccess: (data) => {
      onSuccess?.(data);
    },
    onError: (err) => {
      onError?.(err);
    },
  });
};

export const useCompletedTreasures = () => {
  //Github bug!
  const { data, ...rest } = useQuery({
    queryKey: ["CompletedTreasures"],
    queryFn: apiGetCompletedTreasures,
    ...defaultQueryOptions,
  });
  const completedTreasures: any[] = data?.data.entities;

  return { completedTreasures: completedTreasures, ...rest };
};

export const useLeaderboard = (treasureId: number) => {
  const { data, ...rest } = useQuery({
    queryKey: ["Leaderboard", treasureId],
    queryFn: () => apiGetLeaderboardByTreasureId(treasureId),
    ...defaultQueryOptions,
  });
  const leaderboard: any = data?.data;
  return { leaderboard: leaderboard, ...rest };
};

export const useDownloadedImage = (imageName: string) => {
  const { data, ...rest } = useQuery({
    queryKey: ["DownloadedImage", imageName],
    queryFn: () => apiDownloadImage(imageName),
    ...defaultQueryOptions,
  });
  const image: Blob = data?.data;
  return { image: image, ...rest };
};

export const useWeeklyChallenge = () => {
  const { data, ...rest } = useQuery({
    queryKey: ["WeeklyChallenge"],
    queryFn: apiGetWeeklyChallenge,
    ...defaultQueryOptions,
  });
  const weeklyChallenge: any = data?.data;
  return { weeklyChallenge: weeklyChallenge, ...rest };
};

export const useJoinToChallengeMutation = ({
  onSuccess,
  onError,
}: CustomMutationProps = {}) => {
  return useMutation({
    mutationFn: apiJoinToChallenge,
    onSuccess: (data) => {
      onSuccess?.(data);
    },
    onError: (err) => {
      onError?.(err);
    },
  });
};
export const useLocations = () => {
  const { data, ...rest } = useQuery({
    queryKey: ["Locations"],
    queryFn: () => apiGetLocations(),
    ...defaultQueryOptions,
  });
  const locations: any = data?.data;
  return { locations: locations, ...rest };
};
