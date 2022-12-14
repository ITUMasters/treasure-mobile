import { useCallback, useState } from 'react';

export type ModalController = {
  isOpen: boolean;
  close: () => void;
  open: () => void;
};

export const useModal = (initialValue = false): ModalController => {
  const [isOpen, setIsOpen] = useState(initialValue);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  return { open, close, isOpen };
};

