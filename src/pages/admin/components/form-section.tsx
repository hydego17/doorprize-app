import React, { useState } from 'react';

import { cx } from '@/utils/cx';
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
        let [slotNum, ...names] = entry.split(/\s+/g);
        let name = names.join(' ');
        if (!name || !slotNum) reject('Wrong format!');
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

    try {
      // format input
      let data = await formatParticipantData(input);

      // set into store
      setStore((prev) => ({
        ...prev,
        participants: data,
        winners: [],
      }));

      // reset state
      setInput('');
      setIsEdit(false);
      //
    } catch (err) {
      setError(err as string);
    }
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

      <hr className='my-4' />

      <div>
        {isEdit ? (
          <form onSubmit={handleSaveInput} className='animate-show space-y-4'>
            <h2 className='font-bold'>Add New Participants</h2>

            <div>
              <textarea
                autoFocus
                onFocus={(e) => {
                  e.currentTarget.scrollIntoView();
                }}
                name='participant'
                placeholder='copy from sheet or excel + paste here'
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

            <div className='flex gap-2'>
              <button type='button' onClick={() => setIsEdit(false)} className='btn-outline w-full'>
                Cancel
              </button>
              <button type='submit' disabled={!input} className='btn w-full'>
                Save
              </button>
            </div>
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
