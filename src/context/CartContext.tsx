import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import { menu, type MenuItem } from '../data/menu'

const MAX_PER_ITEM = 20

const itemsById = new Map<string, MenuItem>(
  menu.flatMap((category) => category.items).map((item) => [item.id, item]),
)

export interface CartLine {
  item: MenuItem
  quantity: number
  lineTotal: number
}

interface CartContextValue {
  lines: CartLine[]
  /** إجمالي عدد القطع */
  count: number
  /** إجمالي الأصناف بالجنيه من غير رسوم التوصيل */
  subtotal: number
  quantityOf: (id: string) => number
  setQuantity: (id: string, quantity: number) => void
  clear: () => void
  isOpen: boolean
  open: () => void
  close: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  // id الصنف ← الكمية. السلة في الذاكرة بس، وبتتمسح مع تحديث الصفحة
  const [quantities, setQuantities] = useState<Record<string, number>>({})
  const [isOpen, setIsOpen] = useState(false)

  const setQuantity = useCallback((id: string, quantity: number) => {
    setQuantities((current) => {
      const next = { ...current }
      const clamped = Math.min(Math.max(Math.round(quantity), 0), MAX_PER_ITEM)
      if (clamped === 0) delete next[id]
      else next[id] = clamped
      return next
    })
  }, [])

  const clear = useCallback(() => setQuantities({}), [])
  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])

  const value = useMemo<CartContextValue>(() => {
    const lines: CartLine[] = []
    for (const [id, quantity] of Object.entries(quantities)) {
      const item = itemsById.get(id)
      if (item) lines.push({ item, quantity, lineTotal: item.price * quantity })
    }
    return {
      lines,
      count: lines.reduce((sum, line) => sum + line.quantity, 0),
      subtotal: lines.reduce((sum, line) => sum + line.lineTotal, 0),
      quantityOf: (id) => quantities[id] ?? 0,
      setQuantity,
      clear,
      isOpen,
      open,
      close,
    }
  }, [quantities, isOpen, setQuantity, clear, open, close])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart لازم يتستخدم جوّه CartProvider')
  return context
}
