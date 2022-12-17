import { useCallback, useEffect } from 'react';

import './slot.css';

const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

function shuffle([...arr]) {
  let m = arr.length;
  while (m) {
    const i = Math.floor(Math.random() * m--);
    [arr[m], arr[i]] = [arr[i], arr[m]];
  }
  return arr;
}

function convertArrayToNumber(arr: any[]) {
  let result = '';
  for (let el of arr) {
    result += el;
  }
  return Number(result);
}

function leftFillNum(num: number, targetLength: number) {
  return num.toString().padStart(targetLength, String(0));
}

const SPIN_DURATION = 10;

export default function SlotComponent() {
  const init = useCallback((firstInit = true, groups = 1, duration = 1) => {
    const doors = document.querySelectorAll<HTMLDivElement>('.door');

    for (const door of doors) {
      if (firstInit) {
        door.dataset.spinned = '0';
      } else if (door.dataset.spinned === '1') {
        return;
      }

      const boxes = door.querySelector<HTMLDivElement>('.boxes');
      const boxesClone = boxes?.cloneNode(false) as HTMLDivElement;

      let content = boxes?.children?.[0]?.textContent;
      let pool = content ? [content] : ['❓'];

      if (boxes && boxesClone) {
        if (!firstInit) {
          const arr: any[] = [];
          for (let n = 0; n < groups; n++) {
            arr.push(...items);
          }
          pool.push(...shuffle(arr));
        }

        for (let i = pool.length - 1; i >= 0; i--) {
          const box = document.createElement('div');
          box.classList.add('box');
          box.style.width = door.clientWidth + 'px';
          box.style.height = door.clientHeight + 'px';
          box.textContent = pool[i];
          boxesClone?.appendChild(box);
        }

        boxesClone.style.transitionDuration = `${duration > 0 ? duration : 1}s`;
        boxesClone.style.transform = `translateY(-${door.clientHeight * (pool.length - 1)}px)`;
        door.replaceChild(boxesClone, boxes);
      }
    }
  }, []);

  async function spin() {
    init(false, SPIN_DURATION, SPIN_DURATION);

    const doors = document.querySelectorAll<HTMLDivElement>('.door');

    return new Promise<number>(async (resolve) => {
      let result: number[] = [];

      for (const door of doors) {
        const boxes = door.querySelector<HTMLDivElement>('.boxes');

        if (boxes) {
          const boxDuration = parseInt(boxes.style.transitionDuration);
          boxes.style.transform = 'translateY(0)';
          await new Promise((resolve) => setTimeout(resolve, boxDuration * 20));

          const boxNumber = boxes?.children?.[0]?.textContent;
          result.push(Number(boxNumber));
        }
      }

      setTimeout(async () => {
        return resolve(convertArrayToNumber(result));
      }, SPIN_DURATION * 1000);
    });
  }

  const handleSpin = async () => {
    const result = await spin();

    console.log(result);
  };

  const handleReset = () => {
    init();
  };

  useEffect(() => {
    init();
  }, [init]);

  return (
    <div>
      <div className='doors'>
        <div className='door'>
          <div className='boxes'>
            <div className='box'></div>
          </div>
        </div>
        <div className='door'>
          <div className='boxes'>
            <div className='box'></div>
          </div>
        </div>
        <div className='door'>
          <div className='boxes'>
            <div className='box'></div>
          </div>
        </div>
        <div className='door'>
          <div className='boxes'>
            <div className='box'></div>
          </div>
        </div>
      </div>

      <div className='mt-4 space-y-4'>
        <button className='btn w-full' onClick={handleSpin}>
          Spin
        </button>

        <button className='btn-outline w-full' onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
}
