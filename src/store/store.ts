import { useUpdateAtom, useAtomValue, atomWithStorage } from 'jotai/utils';
import type { Participant } from '@/types';

type Store = {
  participants: Participant[];
  winners: Participant[];
  background?: string;
};

const defaultValue: Store = {
  participants: [],
  winners: [],
  background: '/assets/PHR-background.jpg',
};

const globalStore = atomWithStorage<Store>('store', defaultValue);

export const useStore = () => useAtomValue(globalStore);

export const useUpdateStore = () => useUpdateAtom(globalStore);

export const useResetStore = () => {
  const updateStore = useUpdateAtom(globalStore);

  const reset = (storeValue = defaultValue) => {
    updateStore(storeValue);
  };

  return reset;
};
