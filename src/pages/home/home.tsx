import { useStore } from '@/store';

import RandomReveal from '@/components/random-reveal';

export default function HomePage() {
  const { background } = useStore();

  return (
    <div className='animate-show h-screen flex centered'>
      <img src={background} alt='bg' className='fixed object-contain w-full h-full z-[-1] select-none' />

      <section className='w-full'>
        <div className='min-h-[100px] centered p-6'>
          <section className='w-full max-w-[500px]'>
            <RandomReveal />
          </section>
        </div>
      </section>
    </div>
  );
}
