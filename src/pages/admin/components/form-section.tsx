import React, { useState } from 'react';

import { cx } from '@/utils';
import { useStore, useUpdateStore } from '@/store';
import type { Participant } from '@/types';

function leftFillNum(num: number, targetLength: number) {
  return num.toString().padStart(targetLength, String(0));
}

function formatParticipantData(input: string) {
  return new Promise<Participant[]>((resolve, reject) => {
    let data = input
      .toString()
      .replace(/\t/g, ' ')
      .split(/\r?\n/)
      .map((entry) => {
        let dataEntry = entry.split(' ');
        let slotNum = dataEntry[0] ?? '0';
        let name = dataEntry[1] ?? '';

        if (!name || !slotNum) {
          reject('Wrong format!');
        }

        let slot = leftFillNum(Number(slotNum), 4);

        return { slot, name } as Participant;
      });

    return resolve(data);
  });
}

export default function FormSection() {
  const setStore = useUpdateStore();
  const { participants } = useStore();

  const total = participants.length;
  const showParticipants = !!participants.length;

  const [input, setInput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isEdit, setIsEdit] = useState(false);

  const handleSaveInput = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input) return;

    setError(null);

    await formatParticipantData(input)
      .then((data) => {
        setStore((prev) => ({
          ...prev,
          participants: data,
          winners: [],
        }));

        setInput('');
        setIsEdit(false);
      })
      .catch((err) => {
        setError(err as string);
      });
  };

  const handleChange = (value: string) => {
    setError(null);
    setInput(value);
  };

  return (
    <div>
      <header>
        <h1 className='text-2xl'>Participants {total ? `(${total})` : ''}</h1>
      </header>
      <div className='mt-8'>
        {showParticipants && (
          <div className='animate-show bg-white border-2 rounded divide-y max-h-[500px] overflow-auto'>
            <table className='table-container w-full'>
              <thead className='bg-slate-300'>
                <tr>
                  <th className='px-4 py-2 border-r text-center'>Nomor Undian</th>
                  <th colSpan={4} className='px-4 py-2 text-center'>
                    Nama Peserta
                  </th>
                </tr>
              </thead>
              <tbody>
                {participants.map((p) => (
                  <tr key={p.slot} className='border-b'>
                    <td width='30%' className='px-4 py-1 border-r text-center'>
                      {p.slot}
                    </td>
                    <td colSpan={4} className='px-4 py-1 text-center'>
                      {p.name}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div className='mt-8'>
        {isEdit ? (
          <form onSubmit={handleSaveInput} className='animate-show space-y-4'>
            <div>
              <textarea
                autoFocus
                onFocus={(e) => {
                  e.currentTarget.scrollIntoView();
                }}
                name='participant'
                placeholder='copy from sheet + paste here'
                value={input}
                onChange={(e) => handleChange(e.target.value)}
                className={cx(
                  'p-2 border w-full rounded',
                  error ? 'ring-1 ring-red-500 border-red-500 focus:outline-red-500' : ''
                )}
                rows={6}
              />

              {error && <div className='text-red-500 text-sm font-medium'>{error}</div>}
            </div>

            <button type='submit' disabled={!input} className='btn w-full'>
              Save
            </button>
          </form>
        ) : (
          <div className='animate-show'>
            <button onClick={() => setIsEdit(true)} className='btn w-full'>
              {showParticipants ? 'New Participants' : 'Add Participant'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
