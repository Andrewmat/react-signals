import { useEffect, useRef } from 'react';
import { Signal } from 'signal-polyfill';

export function useSignalEffect(cb: () => void | (() => void)) {
  const pending = useRef(false);
  const watcherRef = useRef(
    new Signal.subtle.Watcher(() => {
      if (pending.current) return;
      pending.current = true;
      queueMicrotask(() => {
        pending.current = false;
        for (const s of watcherRef.current.getPending()) {
          s.get();
        }
        watcherRef.current.watch();
      });
    })
  );

  useEffect(() => {
    let destructor: void | (() => void);
    const effect = new Signal.Computed(() => {
      destructor?.();
      destructor = cb();
    });
    const watcher = watcherRef.current;
    watcher.watch(effect);
    effect.get();
    return () => {
      destructor?.();
      watcher.unwatch(effect);
    };
  }, []);
}
