import { useCallback, useState, useRef, useEffect, useMemo } from 'react';
import fscreen from 'fscreen';

export function useFullScreen() {
  const [active, setActive] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onChange = () => {
      setActive(fscreen.fullscreenElement === ref.current);
    };
    fscreen.addEventListener('fullscreenchange', onChange);
    return () => fscreen.removeEventListener('fullscreenchange', onChange);
  }, []);

  const enter = useCallback(() => {
    if (fscreen.fullscreenElement) {
      return fscreen.exitFullscreen().then(() => {
        return fscreen.requestFullscreen(ref.current);
      });
    } else if (ref.current) {
      return fscreen.requestFullscreen(ref.current);
    }
  }, []);

  const exit = useCallback(() => {
    if (fscreen.fullscreenElement === ref.current) {
      return fscreen.exitFullscreen();
    }
    return Promise.resolve();
  }, []);

  return useMemo(
    () => ({
      active,
      enter,
      exit,
      ref,
    }),
    [active, enter, exit]
  );
}
