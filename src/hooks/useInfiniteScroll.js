import { useEffect, useRef, useCallback } from 'react'

/**
 * Custom hook for infinite scrolling using Intersection Observer
 * @param {Function} callback - Function to call when element is visible
 * @param {boolean} isLoading - Whether data is currently loading
 * @param {boolean} hasMore - Whether there's more data to load
 * @returns {Function} - Ref callback to attach to the trigger element
 */
export function useInfiniteScroll(callback, isLoading, hasMore) {
    const observer = useRef(null)

    const lastElementRef = useCallback(
        (node) => {
            // Don't observe if currently loading
            if (isLoading) return

            // Disconnect previous observer
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
