import { useState } from 'react';
import { useRandomReveal } from 'react-random-reveal';
import Confetti from 'react-confetti';
import { TbX } from 'react-icons/tb';

import { useStore, useUpdateStore } from '@/store';
import { createAudio } from '@/utils/audio';
import { getRandomInt } from '@/utils';
import type { Participant } from '@/types';
import Modal from '@/components/modal';

const slotAudio = createAudio('slot', {
  sprite: { slot: [0, 4060] },
});

const winnerAudio = createAudio('winner');

const statusLabelMap = {
  loading: 'LOADING...',
  done: 'DONE',
  idle: 'START',
};

export default function Lottery() {
  const setStore = useUpdateStore();
  const { participants } = useStore();

  const isReady = !!participants.length;

  const [status, setStatus] = useState('idle');
  const [winner, setWinner] = useState<Participant | undefined>();
  const [winnerModalOpened, setModalOpened] = useState(false);

  const handleReset = () => {
    setStatus('idle');
    setModalOpened(false);
    setWinner(undefined);
  };

  const handleStart = () => {
    if (!isReady) return;
    if (status !== 'idle') return;

    setStatus('loading');
    slotAudio.play('slot');

    let maxNumber = participants.length;
    let generatedIndex = getRandomInt(1, maxNumber);
    let picked = participants[generatedIndex];

    setWinner(picked);
  };

  const handleFinishSlotAnimation = () => {
    if (winner) {
      setStore((prev) => ({
        ...prev,
        participants: [...prev.participants.filter((p) => p.slot !== winner.slot)],
        winners: [...prev.winners, winner],
      }));
    }

    setStatus('done');

    setTimeout(() => {
      setModalOpened(true);
      winnerAudio.play();
    }, 750);
  };

  return (
    <div>
      <div>
        {winner ? (
          <NumberSlot number={winner.slot} onComplete={handleFinishSlotAnimation} />
        ) : (
          <SlotBoxes characters={['0', '0', '0', '0']} />
        )}
      </div>

      <div className='mt-4 space-y-4'>
        <button disabled={!isReady || status === 'loading'} className='btn btn-lg w-full' onClick={handleStart}>
          {statusLabelMap[status]}
        </button>
      </div>

      <Modal size='md' opened={winnerModalOpened} closeOnClickOutside={false}>
        <div className='text-center p-8 relative'>
          <button
            role='button'
            onClick={handleReset}
            className='absolute right-2 top-2 p-1 h-fit rounded text-slate-600 hover:bg-slate-100 transition'
          >
            <TbX size={20} />
          </button>

          <div className='py-10'>
            <div className='space-y-2'>
              <div className='text-lg font-medium text-slate-600'>Selamat kepada pemenang:</div>
              <div className='text-5xl font-bold leading-tight'>{winner?.name}</div>
            </div>

            <hr className='my-10' />

            <div className='space-y-2'>
              <div className='text-lg font-medium text-slate-600'>Nomor undian:</div>
              <div className='text-5xl font-bold'>{winner?.slot}</div>
            </div>
          </div>
        </div>
      </Modal>

      {winnerModalOpened && <Confetti />}
    </div>
  );
}

const NumberSlot = ({ number, onComplete }) => {
  const winnerSlotNumber = useRandomReveal({
    isPlaying: true,
    duration: 4,
    characters: number,
    revealEasing: 'easeOutQuad',
    characterSet: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
    revealDuration: 0.025,
    onComplete,
  });

  return <SlotBoxes characters={winnerSlotNumber} />;
};

const SlotBoxes = ({ characters }) => {
  return (
    <div className='flex'>
      {characters.map((text, i) => {
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
  );
};
