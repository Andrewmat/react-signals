import { useSignalSync } from './sync-watcher';
import type { AnySignal } from './type';
import { useSignal } from './refs';
import { useWatcherContext } from './ctx';

/** creates signal, extracts ctx, syncs, and returns signal */
export function useContextualSignal<T>(initialValue: T) {
  const signal = useSignal(initialValue);
  const ctxValue = useWatcherContext();
  const { watcher, subscribe } = ctxValue;
  useSignalSync(signal, watcher, subscribe);
  return signal;
}

/** only syncs signal, useful for signals created outside of React */
export function useContextualSync(signal: AnySignal) {
  const ctxValue = useWatcherContext();
  const { watcher, subscribe } = ctxValue;
  return useSignalSync(signal, watcher, subscribe);
}
