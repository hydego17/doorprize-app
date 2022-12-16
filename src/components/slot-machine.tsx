import { getRandomInt } from '@/utils';
import type { Participant } from '@/types';

function generateIndex(data: any[]) {
  let maxNumber = data.length;
  let generatedIndex = getRandomInt(1, maxNumber);

  return generatedIndex;
}

type SlotMachineProps = {
  data: Participant[];
};

const SlotMachine = ({ data }: SlotMachineProps) => {
  function pickLottery() {
    let index = generateIndex(data);
    let desired = data[index];
  }

  return (
    <div>
      <div id='slot-container' className='flex'>
        <div></div>
      </div>
    </div>
  );
};

export default SlotMachine;
