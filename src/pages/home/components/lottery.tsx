import { useState } from 'react';
import { useRandomReveal } from 'react-random-reveal';
import Confetti from 'react-confetti';

import { useStore, useUpdateStore } from '@/store';
import { getRandomInt } from '@/utils';
import type { Participant } from '@/types';
import Modal from '@/components/modal';

export default function Lottery() {
  const setStore = useUpdateStore();
  const { participants } = useStore();

  const isReady = !!participants.length;
  // const maxDigits = participants[0]?.slot?.length;

  const [winner, setWinner] = useState<Participant | undefined>();
  const [winnerModalOpened, setModalOpened] = useState(false);

  const handleStart = () => {
    if (!isReady) return;

    let maxNumber = participants.length;
    let generatedIndex = getRandomInt(1, maxNumber);
    let picked = participants[generatedIndex];

    setWinner(picked);
  };

  const handleShowWinner = () => {
    if (!winner) return;
    setTimeout(() => {
      setModalOpened(true);
    }, 500);
  };

  const characters = useRandomReveal({
    isPlaying: !!winner,
    duration: 2,
    characters: winner?.slot || '0000',
    revealEasing: 'easeOutQuad',
    characterSet: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
    revealDuration: 0.025,
    onComplete: () => {
      handleShowWinner();

      if (winner) {
        setStore((prev) => ({
          ...prev,
          participants: [...prev.participants.filter((p) => p.slot !== winner.slot)],
          winners: [...prev.winners, winner],
        }));
      }
    },
  });

  const characterReveal = !!winner ? characters : ['0', '0', '0', '0'];

  return (
    <div>
      <div className='flex'>
        {characterReveal.map((text, i) => {
          let id = `${String(text)}-${i}`;

          return (
            <div
              key={id}
              className='bg-white border flex-1 aspect-square w-full min-w-[60px] lg:min-w-[100px] overflow-hidden rounded m-1 centered'
            >
              <div className='centered text-3xl lg:text-5xl font-bold'>{text}</div>
            </div>
          );
        })}
      </div>

      <div className='mt-4 space-y-4'>
        <button disabled={!isReady} className='btn w-full' onClick={handleStart}>
          Start
        </button>
      </div>

      <Modal opened={winnerModalOpened} withOverlay={true} overlayBlur={false}>
        <div className='text-center py-8'>
          <div className='space-y-2'>
            <div className='font-medium text-slate-600'>Selamat kepada pemenang:</div>
            <div className='text-4xl font-bold'>{winner?.name}</div>
          </div>

          <hr className='my-6' />

          <div className='space-y-2'>
            <div className='font-medium text-slate-600'>Nomor undian:</div>
            <div className='text-4xl font-bold'>{winner?.slot}</div>
          </div>
        </div>
      </Modal>

      {winnerModalOpened && <Confetti />}
    </div>
  );
}
