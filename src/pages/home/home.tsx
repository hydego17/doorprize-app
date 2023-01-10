import { CgMaximize, CgMinimize } from 'react-icons/cg';

import { useStore } from '@/store';
import { useFullScreen } from '@/lib/fscreen';
import Navbar from '@/components/navbar';

import Lottery from './components/lottery';

/**
 * Doorprize user-facing page
 */
export default function HomePage() {
  const { background } = useStore();

  const fullscreen = useFullScreen();

  const handleFullScreen = () => {
    if (fullscreen.active) {
      fullscreen.exit();
    } else {
      fullscreen.enter();
    }
  };

  return (
    <>
      <Navbar hidden={fullscreen.active} />

      <div ref={fullscreen.ref}>
        <div className='h-screen flex centered'>
          <img src={background} alt='background' className='absolute object-contain w-full h-full z-[-1] select-none' />
          <section className='w-full'>
            <div className='min-h-[100px] centered p-6'>
              <section className='w-full max-w-[500px]'>
                <Lottery />
              </section>
            </div>
          </section>
        </div>

        <button
          role='button'
          onClick={handleFullScreen}
          className='fixed z-[99999] right-4 bottom-4 bg-slate-200 opacity-50 transition hover:opacity-80 p-2 rounded text-2xl'
        >
          {fullscreen.active ? <CgMinimize /> : <CgMaximize />}
        </button>
      </div>
    </>
  );
}
