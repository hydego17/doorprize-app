import { Howl, HowlOptions } from 'howler';

type AudioType = 'slot' | 'winner';

const audioMap: { [Key in AudioType]: string } = {
  slot: 'https://assets.mixkit.co/sfx/preview/mixkit-slot-machine-win-siren-1929.mp3',
  winner: 'https://assets.mixkit.co/sfx/preview/mixkit-fantasy-game-success-notification-270.mp3',
};

export const createAudio = (type: AudioType, options?: Omit<HowlOptions, 'src'>) => {
  const howl = new Howl({
    src: [audioMap[type]],
    format: ['mp3'],
    html5: true,
    ...options,
  });

  return howl;
};
