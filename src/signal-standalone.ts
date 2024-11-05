import { useCallbacks } from './utils';
import { useSignal, useWatcher } from './refs';
import { useSignalRender } from './sync-watcher';
import type { AnySignal } from './type';

/** Contains both watcher and signal in one place, not ideal */
export function useStandaloneSignal<T>(initialValue: T) {
  const callbacks = useCallbacks<() => void>();
  const watcher = useWatcher(callbacks.trigger);
  const signal = useSignal(initialValue);
  useSignalRender(signal, watcher, callbacks.push);
  return signal;
}

export function useStandaloneRender(signal: AnySignal) {
  const callbacks = useCallbacks<() => void>();
  const watcher = useWatcher(callbacks.trigger);
  return useSignalRender(signal, watcher, callbacks.push);
}
