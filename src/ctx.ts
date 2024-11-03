import { createContext, useContext } from 'react';
import type { Signal } from 'signal-polyfill';

export type WatcherStore = {
  watcher: Signal.subtle.Watcher;
  subscribe: (onStoreChange: () => void) => void;
};
export const watcherContext = createContext<WatcherStore | null>(null);
export function useWatcherContext() {
  const ctxValue = useContext(watcherContext);
  if (!ctxValue) {
    throw new Error('Contextual signal should be child of SignalWatcher');
  }
  return ctxValue;
}
