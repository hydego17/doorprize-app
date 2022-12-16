import { useRef } from 'react';

import { useStore, useUpdateStore } from '@/store';
import { cx } from '@/utils';

export default function BackgroundSection() {
  const setStore = useUpdateStore();
  const { background } = useStore();

  const inputRef = useRef<HTMLInputElement>(null);

  const resetBg = () => {
    setStore((prev) => ({
      ...prev,
      background: undefined,
    }));
  };

  const openFileDialog = () => {
    if (inputRef.current) inputRef.current.click();
  };

  const handleChange = (files: FileList | null) => {
    let file = files?.[0];

    if (file) {
      let reader = new FileReader();

      reader.onloadend = () => {
        let img = reader.result;

        setStore((prev) => ({
          ...prev,
          background: img?.toString(),
        }));
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <header>
        <h1 className='text-2xl'>Background</h1>

        <div className='mt-8'>
          <input
            ref={inputRef}
            type='file'
            accept='.jpeg,.jpg,.jpe,.png'
            onChange={(e) => handleChange(e.target.files)}
            style={{ display: 'none' }}
          />

          {background ? (
            <div>
              <div
                role='button'
                onClick={openFileDialog}
                className={cx(
                  ' bg-white w-full p-1 centered rounded',
                  'border-2 transition-colors border-slate-300 hover:border-slate-500 border-dashed'
                )}
              >
                <img src={background} onError={resetBg} className='object-cover w-full' />
              </div>

              <div className='mt-2 text-xs text-center'>Click to change background</div>
            </div>
          ) : (
            <div
              role='button'
              onClick={openFileDialog}
              className={cx(
                ' bg-white w-full p-8 centered rounded',
                'border-2 transition-colors border-slate-300 hover:border-slate-500 border-dashed'
              )}
            >
              Ganti Background
            </div>
          )}
        </div>
      </header>
    </div>
  );
}
