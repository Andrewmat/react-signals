import { Signal } from 'signal-polyfill';
import { useStandaloneSignal, useStandaloneRender } from './signal-standalone';
import { SignalWatcher } from './signal-watcher';
import { useContextualSignal, useContextualRender } from './signal-contextual';
import { useSignalEffect } from './signal-effect';
import { useSignal } from './refs';
import './App.css';

function App() {
  return (
    <div className="grid">
      <span className="label">
        <summary>Standalone</summary>
        <details>One watcher per state</details>
      </span>
      <StandaloneCounter />
      <StandaloneCounter />

      <SignalWatcher>
        <span className="label">
          <summary>Contextual</summary>
          <details>Only one watcher in a context</details>
        </span>
        <ContextualCounter />
        <ContextualCounter />
      </SignalWatcher>

      <SignalWatcher>
        <span className="label">
          <summary>External & Shared</summary>
          <details>
            Signal created outside of React, used by two different components
          </details>
        </span>
        <ExternalCounter />

        <span className="label">
          <summary>Effect</summary>
          <details>Effect</details>
        </span>
        <EffectCounter />
        <EffectCounter />
      </SignalWatcher>
    </div>
  );
}

function StandaloneCounter() {
  const count = useStandaloneSignal(0);

  return (
    <button type="button" onClick={() => count.set(count.get() + 1)}>
      Count {count.get()}
    </button>
  );
}

function ContextualCounter() {
  const count = useContextualSignal(0);

  return (
    <button type="button" onClick={() => count.set(count.get() + 1)}>
      Count {count.get()}
    </button>
  );
}

const externalCount = new Signal.State(0);
function ExternalCounter() {
  useContextualRender(externalCount);

  return (
    <>
      <SharedCounter count={externalCount} />
      <SharedCounter count={externalCount} />
    </>
  );
}

function SharedCounter({ count }: { count: Signal.State<number> }) {
  return (
    <button type="button" onClick={() => count.set(count.get() + 1)}>
      Count {count.get()}
    </button>
  );
}

function EffectCounter() {
  const countSignal = useSignal(0);
  useSignalEffect(() => {
    console.log(
      `internal: ${countSignal.get()} external: ${externalCount.get()}`
    );
  });
  useStandaloneRender(countSignal);

  return (
    <button
      type="button"
      onClick={() => countSignal.set(countSignal.get() + 1)}
    >
      Count {countSignal.get()}
    </button>
  );
}

export default App;
