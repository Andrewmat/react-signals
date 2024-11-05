import { useSignalRender } from './sync-watcher';
import type { AnySignal } from './type';
import { useSignal } from './refs';
import { useWatcherContext } from './ctx';

/** creates signal, extracts ctx, syncs, and returns signal */
export function useContextualSignal<T>(initialValue: T) {
  const signal = useSignal(initialValue);
  const ctxValue = useWatcherContext();
  const { watcher, subscribe } = ctxValue;
  useSignalRender(signal, watcher, subscribe);
  return signal;
}

/** only syncs signal, useful for signals created outside of React */
export function useContextualRender(signal: AnySignal) {
  const ctxValue = useWatcherContext();
  const { watcher, subscribe } = ctxValue;
  return useSignalRender(signal, watcher, subscribe);
}
