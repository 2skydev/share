import { useLayoutEffect, useState } from 'react'

import { type Exome, subscribe } from 'exome'

export function useStore<T extends Exome>(store: T): Readonly<T> {
  const [, render] = useState(0)

  useLayoutEffect(() => subscribe(store, () => render(n => n + 1)), [store])

  return store
}
