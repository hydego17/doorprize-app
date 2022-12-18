import { useState } from 'react';
import { useResetStore } from '@/store';
import Modal from '@/components/modal';

import WinnerSection from './components/winner-section';
import FormSection from './components/form-section';
import BackgroundSection from './components/background-section';

/**
 * Doorprize admin page
 */
export default function AdminPage() {
  const resetStore = useResetStore();

  const [confirmModalOpened, setConfirmModalOpened] = useState(false);

  const handleConfirmReset = () => {
    setConfirmModalOpened(true);
  };

  const handleReset = () => {
    resetStore();
    setConfirmModalOpened(false);
  };

  return (
    <div className='min-h-screen bg-slate-100 p-8'>
      <header className='flex items-center justify-between bg-blue-600 py-4 px-6 rounded-lg'>
        <h1 className='font-bol text-2xl text-white'>Doorprize Admin</h1>
        <button className='btn-outline' onClick={handleConfirmReset}>
          Reset
        </button>
      </header>

      <div className='mt-8 flex justify-between gap-8'>
        <section className='w-[25%] h-fit rounded-lg border-2 border-slate-300 border-dashed p-6'>
          <WinnerSection />
        </section>

        <section className='flex-1 h-fit rounded-lg border-2 border-slate-300 border-dashed p-6'>
          <FormSection />
        </section>

        <section className='w-[25%] h-fit rounded-lg border-2 border-slate-300 border-dashed p-6'>
          <BackgroundSection />
        </section>
      </div>

      <Modal opened={confirmModalOpened} onClose={() => setConfirmModalOpened(false)}>
        <div className='p-6'>
          <h1 className='text-xl'>Reset Data</h1>
          <div className='my-4'>Are you sure want to reset data?</div>
          <div className='flex justify-end gap-3'>
            <button className='btn-outline' onClick={() => setConfirmModalOpened(false)}>
              Cancel
            </button>
            <button className='btn-danger' onClick={handleReset}>
              Reset Data
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
