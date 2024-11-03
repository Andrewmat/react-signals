import type { Signal } from 'signal-polyfill';

export type AnySignal = Parameters<Signal.subtle.Watcher['watch']>[0];
