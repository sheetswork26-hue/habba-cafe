import { useEffect, useState } from 'react'
import { getOpenStatus } from '../lib/cairoTime'

/** حالة «مفتوح/مقفول» بتوقيت القاهرة، وبتتحدّث كل نص دقيقة */
export function useOpenStatus() {
  const [status, setStatus] = useState(() => getOpenStatus())

  useEffect(() => {
    const id = window.setInterval(() => setStatus(getOpenStatus()), 30_000)
    return () => window.clearInterval(id)
  }, [])

  return status
}
