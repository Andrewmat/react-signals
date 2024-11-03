import { useCallbacks } from './utils';
import { useSignal, useWatcher } from './refs';
import { useSignalSync } from './sync-watcher';
import type { AnySignal } from './type';

/** Contains both watcher and signal in one place, not ideal */
export function useStandaloneSignal<T>(initialValue: T) {
  const callbacks = useCallbacks<() => void>();
  const watcher = useWatcher(callbacks.trigger);
  const signal = useSignal(initialValue);
  useSignalSync(signal, watcher, callbacks.push);
  return signal;
}

export function useStandaloneSync(signal: AnySignal) {
  const callbacks = useCallbacks<() => void>();
  const watcher = useWatcher(callbacks.trigger);
  return useSignalSync(signal, watcher, callbacks.push);
}
