import { useSyncExternalStore } from 'react';
import type { AnySignal } from './type';
import type { Signal } from 'signal-polyfill';

export function useSignalRender(
  signal: AnySignal,
  watcher: Signal.subtle.Watcher,
  subscribe: (onStoreChange: () => void) => void
) {
  const signalValue = useSyncExternalStore(
    (onStoreChange) => {
      subscribe(onStoreChange);
      watcher.watch(signal);
      return () => {
        watcher.unwatch(signal);
      };
    },
    () => signal.get()
  );
  return signalValue;
}
