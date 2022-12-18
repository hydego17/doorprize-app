import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import { CgMaximize, CgMinimize } from 'react-icons/cg';
import { useStore } from '@/store';

import Lottery from './components/lottery';

/**
 * Doorprize user-facing page
 */
export default function HomePage() {
  const { background } = useStore();

  const fullScreenHandle = useFullScreenHandle();

  const handleFullScreen = () => {
    if (fullScreenHandle.active) {
      fullScreenHandle.exit();
    } else {
      fullScreenHandle.enter();
    }
  };

  return (
    <FullScreen handle={fullScreenHandle}>
      <FullScreenButton onClick={handleFullScreen} active={fullScreenHandle.active} />

      <div className='h-screen flex centered'>
        <img src={background} alt='background' className='fixed object-contain w-full h-full z-[-1] select-none' />
        <section className='w-full'>
          <div className='min-h-[100px] centered p-6'>
            <section className='w-full max-w-[500px]'>
              <Lottery />
            </section>
          </div>
        </section>
      </div>
    </FullScreen>
  );
}

const FullScreenButton = ({ onClick, active }) => {
  return (
    <button
      role='button'
      onClick={onClick}
      className='fixed z-[99999] right-4 bottom-4 bg-slate-200 opacity-50 transition hover:opacity-80 p-2 rounded text-2xl'
    >
      {active ? <CgMinimize /> : <CgMaximize />}
    </button>
  );
};
