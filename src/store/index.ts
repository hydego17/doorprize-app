import { useUpdateAtom, useAtomValue, atomWithStorage } from 'jotai/utils';
import type { Participant } from '@/types';
// import defaultParticipant from '@/participants.json';

type Store = {
  participants: Participant[];
  winners: Participant[];
  background?: string;
};

const globalStore = atomWithStorage<Store>('store', {
  participants: [],
  winners: [],
  background: '/assets/PHR-background.jpg',
});

export const useStore = () => useAtomValue(globalStore);

export const useUpdateStore = () => useUpdateAtom(globalStore);
