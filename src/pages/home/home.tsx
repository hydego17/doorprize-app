import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import { useStore } from '@/store';
import Lottery from './components/lottery';

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
      className='fixed z-[99999] right-4 bottom-4 bg-slate-200 opacity-50 transition hover:opacity-80 p-2 rounded w-10 h-10'
    >
      {active ? (
        <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
          <path
            stroke='#000'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M7 2v5H2M17 2v5h5M2 17h5v5M22 17h-5v5'
          ></path>
        </svg>
      ) : (
        <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
          <path
            stroke='#000'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M2 7V2h5M22 7V2h-5M7 22H2v-5M17 22h5v-5'
          ></path>
        </svg>
      )}
    </button>
  );
};
