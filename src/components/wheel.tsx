import React, { useEffect, useState } from 'react';

type WheelProps = {
  segments: string[];
  segColors: string[];
  onFinished(winner: any): void;
  clicked: boolean;
  winningSegment?: any;
  primaryColor: string;
  contrastColor: string;
  buttonText: string;
  isOnlyOnce: boolean;
  size: number;
  upDuration: number;
  downDuration: number;
};

const WheelComponent = ({
  segments,
  segColors,
  winningSegment,
  onFinished,
  clicked,
  primaryColor = 'black',
  contrastColor = 'white',
  buttonText = 'Spin',
  isOnlyOnce = true,
  size = 290,
  upDuration = 100,
  downDuration = 1000,
}: WheelProps) => {
  let currentSegment = '';
  let isStarted = false;

  const [isFinished, setFinished] = useState(false);

  let timerHandle: number | NodeJS.Timer = 0;
  const timerDelay = segments.length;
  let angleCurrent = 0;
  let angleDelta = 0;
  let canvasContext: CanvasRenderingContext2D | null = null;

  let maxSpeed = Math.PI / segments.length;

  const upTime = segments.length * upDuration;
  const downTime = segments.length * downDuration;
  let spinStart = 0;
  let frames = 0;
  const centerX = 300;
  const centerY = 300;

  useEffect(() => {
    wheelInit();
  });

  const wheelInit = () => {
    initCanvas();
    wheelDraw();
  };

  const initCanvas = () => {
    let canvas = document.getElementById('canvas') as HTMLCanvasElement;

    if (navigator.userAgent.indexOf('MSIE') !== -1) {
      canvas = document.createElement('canvas');
      //   canvas.setAttribute('width', '1000px');
      //   canvas.setAttribute('height', '500px');
      canvas.setAttribute('id', 'canvas');
      document.getElementById('wheel')?.appendChild(canvas);
    }
    // canvas.addEventListener('click', spin, false);
    canvasContext = canvas.getContext('2d');
  };

  const spin = () => {
    isStarted = true;

    if (timerHandle === 0) {
      spinStart = new Date().getTime();
      maxSpeed = Math.PI / segments.length;
      frames = 0;
      timerHandle = setInterval(onTimerTick, timerDelay);
    }
  };

  useEffect(() => {
    if (clicked) {
      spin();
    }
  }, [clicked]);

  const onTimerTick = () => {
    frames++;
    draw();
    const duration = new Date().getTime() - spinStart;
    let progress = 0;
    let finished = false;
    if (duration < upTime) {
      progress = duration / upTime;
      angleDelta = maxSpeed * Math.sin((progress * Math.PI) / 2);
    } else {
      if (winningSegment) {
        if (currentSegment === winningSegment && frames > segments.length) {
          progress = duration / upTime;
          angleDelta = maxSpeed * Math.sin((progress * Math.PI) / 2 + Math.PI / 2);
          progress = 1;
        } else {
          progress = duration / downTime;
          angleDelta = maxSpeed * Math.sin((progress * Math.PI) / 2 + Math.PI / 2);
        }
      } else {
        progress = duration / downTime;
        angleDelta = maxSpeed * Math.sin((progress * Math.PI) / 2 + Math.PI / 2);
      }
      if (progress >= 1) finished = true;
    }

    angleCurrent += angleDelta;
    while (angleCurrent >= Math.PI * 2) angleCurrent -= Math.PI * 2;
    if (finished) {
      setFinished(true);
      onFinished(currentSegment);
      clearInterval(timerHandle);
      timerHandle = 0;
      angleDelta = 0;
    }
  };

  const wheelDraw = () => {
    clear();
    drawWheel();
    drawNeedle();
  };

  const draw = () => {
    clear();
    drawWheel();
    drawNeedle();
  };

  const drawSegment = (key: number, lastAngle: number, angle: number) => {
    const ctx = canvasContext;
    const value = segments[key];
    if (ctx) {
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, size, lastAngle, angle, false);
      ctx.lineTo(centerX, centerY);
      ctx.closePath();
      ctx.fillStyle = segColors[key];
      ctx.fill();
      ctx.stroke();
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate((lastAngle + angle) / 2);
      ctx.fillStyle = contrastColor;
      ctx.font = 'bold 14px sans-serif';
      ctx.fillText(value.substr(0, 21), size / 1.5 + 20, 0);
      ctx.restore();
    }
  };

  const drawWheel = () => {
    const ctx = canvasContext;
    let lastAngle = angleCurrent;
    const len = segments.length;
    const PI2 = Math.PI * 2;

    if (ctx) {
      // ctx.lineWidth = 1;
      //   ctx.strokeStyle = primaryColor;
      //   ctx.textBaseline = 'middle';
      //   ctx.textAlign = 'center';

      // ctx.font = '2em ' + fontFamily;

      for (let i = 1; i <= len; i++) {
        const angle = PI2 * (i / len) + angleCurrent;
        drawSegment(i - 1, lastAngle, angle);
        lastAngle = angle;
      }

      // Draw a center circle
      ctx.beginPath();
      ctx.arc(centerX, centerY, 30, 0, PI2, false);
      ctx.closePath();
      ctx.fillStyle = primaryColor;
      ctx.lineWidth = 8;
      ctx.strokeStyle = contrastColor;
      ctx.fill();
      ctx.save();

      // ctx.font = 'bold 1em ' + fontFamily;
      ctx.fillStyle = contrastColor;
      ctx.textAlign = 'center';
      ctx.fillText(buttonText, centerX, centerY + 3);
      ctx.stroke();

      // Draw outer circle
      ctx.beginPath();
      ctx.arc(centerX, centerY, size, 0, PI2, false);
      ctx.closePath();

      ctx.lineWidth = 10;
      ctx.strokeStyle = primaryColor;
      ctx.stroke();
    }
  };

  const drawNeedle = () => {
    const ctx = canvasContext;
    if (ctx) {
      ctx.lineWidth = 1;
      ctx.strokeStyle = contrastColor;
      ctx.fillStyle = contrastColor;
      ctx.beginPath();
      ctx.moveTo(centerX + 8, centerY - 30);
      ctx.lineTo(centerX - 8, centerY - 30);
      ctx.lineTo(centerX, centerY - 80);
      ctx.closePath();
      ctx.fill();

      const change = angleCurrent + Math.PI / 2;
      let i = segments.length - Math.floor((change / (Math.PI * 2)) * segments.length) - 1;
      if (i < 0) i = i + segments.length;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = primaryColor;
      // ctx.font = 'bold 1.5em ' + fontFamily;
      currentSegment = segments[i];
      isStarted && ctx.fillText(currentSegment, centerX + 10, centerY + size + 50);
    }
  };

  const clear = () => {
    const ctx = canvasContext;
    ctx?.clearRect(0, 0, 600, 600);
  };

  return (
    <div id='wheel'>
      <canvas
        id='canvas'
        width='600'
        height='600'
        className='bg-slate-200'
        style={{
          pointerEvents: isFinished && isOnlyOnce ? 'none' : 'auto',
        }}
      />
    </div>
  );
};
export default WheelComponent;
