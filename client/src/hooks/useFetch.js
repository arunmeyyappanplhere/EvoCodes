import { useEffect, useState, useCallback } from 'react'
import api from '../lib/api.js'

/**
 * Fetches a list endpoint and optionally maps each raw doc through `transform`.
 *
 * Your controllers (getProjects/getBlogs/getServices) respond with a 400,
 * and getTestimonials with a 404, when the collection is empty. We treat
 * both of those as "no items" rather than a real error, since that's the
 * correct UX for a public page — an empty grid, not an error banner.
 */
export function useFetch(endpoint, { transform } = {}) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const load = useCallback(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    api
      .get(endpoint)
      .then((res) => {
        if (cancelled) return
        const raw = Array.isArray(res.data) ? res.data : []
        setData(transform ? raw.map(transform) : raw)
      })
      .catch((err) => {
        if (cancelled) return
        const status = err.response?.status
        if (status === 400 || status === 404) {
          setData([])
        } else {
          setError(err.response?.data?.error || err.message || 'Failed to load data')
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [endpoint, transform])

  useEffect(() => load(), [load])

  return { data, loading, error, refetch: load }
}