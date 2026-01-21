import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { fetchOrgRepos, fetchOrgInfo } from '../services/githubApi'

const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes in milliseconds

/**
 * Zustand store for GitHub data management
 */
export const useGitHubStore = create(
    persist(
        (set, get) => ({
            // State
            currentOrg: null,
            orgInfo: null,
            repositories: [],
            isLoading: false,
            error: null,
            currentPage: 1,
            hasMore: true,
            sortBy: 'stars', // 'stars', 'forks', 'updated'
            cacheTimestamp: null,
            searchToken: null,

            /**
             * Search for an organization
             */
            searchOrganization: async (orgName, token = null) => {
                const state = get()

                // Check cache validity
                if (
                    state.currentOrg === orgName &&
                    state.cacheTimestamp &&
                    Date.now() - state.cacheTimestamp < CACHE_DURATION
                ) {
                    console.log('Using cached data')
                    return
                }

                set({
                    isLoading: true,
                    error: null,
                    currentOrg: orgName,
                    repositories: [],
                    currentPage: 1,
                    hasMore: true,
                    searchToken: token,
                })

                try {
                    // Fetch org info and repos in parallel
                    const [orgData, reposData] = await Promise.all([
                        fetchOrgInfo(orgName, token),
                        fetchOrgRepos(orgName, 1, token),
                    ])

                    set({
                        orgInfo: orgData,
                        repositories: reposData,
                        isLoading: false,
                        cacheTimestamp: Date.now(),
                        hasMore: reposData.length === 10, // If we got 10 repos, there might be more
                    })
                } catch (error) {
                    set({
                        error: error.message,
                        isLoading: false,
                        orgInfo: null,
                        repositories: [],
                    })
                }
            },

            /**
             * Load next page of repositories
             */
            loadMoreRepos: async () => {
                const state = get()
                if (state.isLoading || !state.hasMore || !state.currentOrg) return

                set({ isLoading: true })

                try {
                    const nextPage = state.currentPage + 1
                    const newRepos = await fetchOrgRepos(
                        state.currentOrg,
                        nextPage,
                        state.searchToken
                    )

                    set({
                        repositories: [...state.repositories, ...newRepos],
                        currentPage: nextPage,
                        isLoading: false,
                        hasMore: newRepos.length === 10,
                    })
                } catch (error) {
                    set({
                        error: error.message,
                        isLoading: false,
                    })
                }
            },

            /**
             * Change sort order
             */
            setSortBy: (sortBy) => {
                set({ sortBy })
            },

            /**
             * Get sorted repositories
             */
            getSortedRepos: () => {
                const { repositories, sortBy } = get()
                const sorted = [...repositories]

                switch (sortBy) {
                    case 'stars':
                        return sorted.sort((a, b) => b.stargazers_count - a.stargazers_count)
                    case 'forks':
                        return sorted.sort((a, b) => b.forks_count - a.forks_count)
                    case 'updated':
                        return sorted.sort(
                            (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
                        )
                    default:
                        return sorted
                }
            },

            /**
             * Clear error
             */
            clearError: () => {
                set({ error: null })
            },

            /**
             * Load data from cache (called on app mount)
             */
            loadFromCache: () => {
                const state = get()
                // Check if cache is still valid
                if (
                    state.cacheTimestamp &&
                    Date.now() - state.cacheTimestamp >= CACHE_DURATION
                ) {
                    console.log('Cache expired, clearing data')
                    set({
                        cacheTimestamp: null,
                    })
                }
            },

            /**
             * Reset store
             */
            reset: () => {
                set({
                    currentOrg: null,
                    orgInfo: null,
                    repositories: [],
                    isLoading: false,
                    error: null,
                    currentPage: 1,
                    hasMore: true,
                    cacheTimestamp: null,
                })
            },
        }),
        {
            name: 'github-dashboard-storage',
            partialize: (state) => ({
                currentOrg: state.currentOrg,
                orgInfo: state.orgInfo,
                repositories: state.repositories,
                currentPage: state.currentPage,
                hasMore: state.hasMore,
                sortBy: state.sortBy,
                cacheTimestamp: state.cacheTimestamp,
            }),
        }
    )
)
