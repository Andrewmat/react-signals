import { type PropsWithChildren } from 'react';
import { useCallbacks } from './utils';
import { watcherContext } from './ctx';
import { useWatcher } from './refs';

/* setups watcher and provides context for it */
export function SignalWatcher({ children }: PropsWithChildren) {
  const callbacks = useCallbacks<() => void>();
  const watcher = useWatcher(callbacks.trigger);

  return (
    <watcherContext.Provider value={{ watcher, subscribe: callbacks.push }}>
      {children}
    </watcherContext.Provider>
  );
}
