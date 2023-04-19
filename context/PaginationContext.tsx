import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { PaginationContextProps } from '../theme/types';
type ContextProviderProps = {
  children: ReactNode;
};
const PaginationContext = createContext<PaginationContextProps>({
  pagination: true,
  toggle: () => undefined,
});

export const PaginationContextProvider = ({
  children,
}: ContextProviderProps) => {
  const [pagination, setCurrentPagination] = useState(false);

  const toggle = useCallback(() => {
    setCurrentPagination(!pagination);
  }, [pagination]);

  const paginationContextValueMemoized = useMemo(
    () => ({
      pagination,
      toggle,
    }),
    [pagination, toggle],
  );

  return (
    <PaginationContext.Provider value={paginationContextValueMemoized}>
      {children}
    </PaginationContext.Provider>
  );
};

export const usePagination = () => {
  return useContext(PaginationContext);
};

