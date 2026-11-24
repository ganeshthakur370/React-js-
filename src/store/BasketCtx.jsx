import { createContext, useContext, useReducer, useEffect } from 'react'

const Ctx = createContext(null)

function tally(list) {
  return list.reduce((s, x) => s + x.qty, 0)
}

function punch(state, act) {
  switch (act.type) {
    case 'LOAD': return act.payload
    case 'ADD': {
      const hit = state.find(x => x.id === act.item.id)
      if (hit) return state.map(x => x.id === act.item.id ? { ...x, qty: x.qty + 1 } : x)
      return [...state, { ...act.item, qty: 1 }]
    }
    case 'INC': return state.map(x => x.id === act.id ? { ...x, qty: x.qty + 1 } : x)
    case 'DEC': return state.map(x => x.id === act.id ? { ...x, qty: Math.max(1, x.qty - 1) } : x)
    case 'REM': return state.filter(x => x.id !== act.id)
    case 'CLEAR': return []
    default: return state
  }
}

export function BasketProvider({ children }) {
  const [basket, fire] = useReducer(punch, [])

  useEffect(() => {
    const raw = localStorage.getItem('amz_basket')
    if (raw) fire({ type: 'LOAD', payload: JSON.parse(raw) })
  }, [])

  useEffect(() => {
    localStorage.setItem('amz_basket', JSON.stringify(basket))
  }, [basket])

  const addItem = item => fire({ type: 'ADD', item })
  const incQty = id => fire({ type: 'INC', id })
  const decQty = id => fire({ type: 'DEC', id })
  const remItem = id => fire({ type: 'REM', id })
  const clearAll = () => fire({ type: 'CLEAR' })

  return (
    <Ctx.Provider value={{ basket, addItem, incQty, decQty, remItem, clearAll, count: tally(basket) }}>
      {children}
    </Ctx.Provider>
  )
}

export function useBasket() {
  return useContext(Ctx)
}
