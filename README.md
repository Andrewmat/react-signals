# React Signals

A simple implementation of the Signals proposal in React.

## Why

This is only to experiment and learn. I don't expect to improve on this. Feel free to fork and continue experimenting!

## How

Considering that signals are single pieces of state that are not inside React, I thought it was best to `useSyncExternalStore`.
I also used a lot of useRef for watchers/signals.

The only issue I found is to link the watcher `notify` function with the `onStoreChange` callback that `useSyncExternalStore` expects. I hacked a hook `useCallbacks` for this.

## API

I had a lot of alternatives for this API:

* "standalone": creates its own watcher
* "contextual": uses the watcher in the context created by `<SignalWatcher />`
* "sync": accepts an external signal
* "signal": reates a signal and returns it

So 4 hooks were created:

* `useStandaloneSignal`
* `useStandaloneRender`
* `useContextualSignal`
* `useContextualRender`

I also created an effect using the example from the proposal doc, and a React effect hook `useSignalEffect`

```tsx
useSignalEffect(() => {
  console.log(counter.get())
})
```
