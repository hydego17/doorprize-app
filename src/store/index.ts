import { useUpdateAtom, useAtomValue, atomWithStorage } from 'jotai/utils';
import type { Participant } from '@/types';

type Store = {
  participants: Participant[];
  winners: Participant[];
  background?: string;
};

const globalStore = atomWithStorage<Store>('store', {
  participants: [],
  winners: [],
  background: '/assets/bg-phr.jpg',
});

export const useStore = () => useAtomValue(globalStore);

export const useUpdateStore = () => useUpdateAtom(globalStore);
