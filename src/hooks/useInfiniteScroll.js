import { useEffect, useRef, useCallback } from 'react'

export function useInfiniteScroll(callback, isLoading, hasMore) {
    const observer = useRef(null)

    const lastElementRef = useCallback(
        (node) => {
            if (isLoading) return
            if (observer.current) {
                observer.current.disconnect()
            }

            // Create new observer
            observer.current = new IntersectionObserver((entries) => {
                // If element is visible and there's more data, trigger callback
                if (entries[0].isIntersecting && hasMore) {
                    callback()
                }
            })

            // Start observing the node
            if (node) {
                observer.current.observe(node)
            }
        },
        [callback, isLoading, hasMore]
    )

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (observer.current) {
                observer.current.disconnect()
            }
        }
    }, [])

    return lastElementRef
}
