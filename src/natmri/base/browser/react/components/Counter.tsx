import { useCounter } from 'natmri/base/browser/react/hooks/useCounter'

export function Counter() {
  const { count, inc } = useCounter()

  return <>
    <p>{ count }</p>

    <button onClick={() => inc()}>
    点击 + 1
  </button>
  </>
}