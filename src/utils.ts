import { useCallback, useRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CallbacksResult<T extends (...args: any) => any> = {
  push: (cb: T) => void;
  trigger: () => void;
};

/** helper to store callbacks, useful to link watcher-onStoreChange */
export function useCallbacks<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends (...args: any[]) => any
>(): CallbacksResult<T> {
  const callbacksRef = useRef<Array<T>>([]);

  const push = useCallback((callback: T) => {
    callbacksRef.current.push(callback);
  }, []);

  const trigger = useCallback(() => {
    if (!callbacksRef.current) return;
    for (const callback of callbacksRef.current) {
      callback();
    }
  }, []);

  return { push, trigger };
}
