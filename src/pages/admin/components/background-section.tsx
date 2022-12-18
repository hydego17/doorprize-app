import { useRef, useState } from 'react';

import { cx } from '@/utils/cx';
import { compressImage } from '@/utils/file';
import { useStore, useUpdateStore } from '@/store';
import Spinner from '@/components/spinner';

const MAX_FILE_SIZE = 10485760; // 10MB

export default function BackgroundSection() {
  const setStore = useUpdateStore();
  const { background } = useStore();

  const inputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resetBg = () => {
    setStore((prev) => ({
      ...prev,
      background: undefined,
    }));
  };

  const openFileDialog = () => {
    if (inputRef.current) inputRef.current.click();
  };

  const handleChange = async (files: FileList | null) => {
    let file = files?.[0];

    setError(null);
    setLoading(true);

    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        setError('File is too large!');
        setLoading(false);
        return;
      }

      let compressedFile = await compressImage(file);
      let reader = new FileReader();
      reader.onloadend = () => {
        let img = reader.result;

        setStore((prev) => ({
          ...prev,
          background: img?.toString(),
        }));
      };
      reader.readAsDataURL(compressedFile);
    }

    setLoading(false);
  };

  return (
    <div>
      <header>
        <h1 className='text-2xl'>Background</h1>

        <div className='mt-8 relative'>
          <input
            ref={inputRef}
            type='file'
            accept='.jpeg,.jpg,.jpe,.png'
            onChange={(e) => handleChange(e.target.files)}
            style={{ display: 'none' }}
          />

          <div className='relative'>
            <div className='animate-show'>
              <div
                role='button'
                onClick={openFileDialog}
                className={cx(
                  ' bg-white min-h-[150px] w-full p-1 centered rounded',
                  'border-2 transition-colors border-slate-300 hover:border-slate-500 border-dashed',
                  error && 'border-red-500 hover:border-red-500'
                )}
              >
                {background ? (
                  <img src={background} onError={resetBg} className='object-cover w-full' />
                ) : (
                  <span className='text-sm'>No Image</span>
                )}
              </div>
            </div>

            <Spinner size='sm' visible={loading} className='absolute inset-0 h-auto w-full bg-white bg-opacity-50' />
          </div>

          <div className='mt-2 text-xs text-center'>
            {error ? <span className='text-red-500'>{error}</span> : <span>Click to change background</span>}
          </div>
        </div>
      </header>
    </div>
  );
}
