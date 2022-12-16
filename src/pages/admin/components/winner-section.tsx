import { useStore } from '@/store';

export default function WinnerSection() {
  const { winners } = useStore();

  const showWinners = !!winners.length;
  const total = winners.length;

  return (
    <div>
      <header>
        <h1 className='text-2xl'>Winners {total ? `(${total})` : ''}</h1>
      </header>
      {showWinners && (
        <div className='-mx-2 mt-8 flex flex-wrap gap-2 w-fit rounded max-h-[500px] overflow-auto'>
          {winners.map((person) => (
            <div key={person.slot} className='py-1 px-3 bg-white border rounded-lg shadow-sm flex items-center gap-4'>
              <div className='text-sm'>
                {person.slot} - {person.name}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
