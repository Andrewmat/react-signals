import { useRef } from 'react';
import { Signal } from 'signal-polyfill';

export function useWatcher(notify: (this: Signal.subtle.Watcher) => void) {
  const watcherRef = useRef(new Signal.subtle.Watcher(notify));
  return watcherRef.current;
}
export function useSignal<T>(initialValue: T) {
  const signalRef = useRef(new Signal.State(initialValue));
  return signalRef.current;
}
