import { Signal } from 'signal-polyfill';
import { useStandaloneSignal } from './signal-standalone';
import { SignalWatcher } from './signal-watcher';
import { useContextualSignal, useContextualSync } from './signal-contextual';
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
  useContextualSync(externalCount);

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

export default App;
