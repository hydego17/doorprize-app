import WinnerSection from './components/winner-section';
import FormSection from './components/form-section';
import BackgroundSection from './components/background-section';

export default function AdminPage() {
  return (
    <div className='min-h-screen bg-slate-100 py-8'>
      <div className='p-10 flex justify-center gap-8'>
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
    </div>
  );
}
