import { useMutation, useQuery } from "@tanstack/react-query";
import { apiGetAllQuizzes, apiLogin } from "./queries";
import { QUERY_KEYS } from "./queryKeys";
import { Author, QuizResponseData } from "./types";

type CustomMutationProps = {
  onSuccess?: (data: any) => void;
  onError?: (err: any) => void;
};

const defaultQueryOptions = { cacheTime: 0, refetchOnWindowFocus: false };

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

export const useQuizzes = () => {
  const { data, ...rest } = useQuery({
    queryKey: QUERY_KEYS.quizzes,
    queryFn: apiGetAllQuizzes,
    ...defaultQueryOptions,
  });
  const quizzes: QuizResponseData[] = data?.data?.quizzes;
  return { quizzes: quizzes ?? [], ...rest };
};
