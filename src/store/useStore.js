import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useStore = create(
    persist(
        (set) => ({
            // Search State
            searchQuery: '',
            setSearchQuery: (query) => set({ searchQuery: query }),

            // Data State
            organization: null,
            repositories: [],
            loading: false,
            error: null,

            // Pagination & Sorting
            page: 1,
            hasMore: true,
            sortBy: 'updated', // 'updated', 'stars', 'forks'

            // Auth (Optional PAT)
            pat: '',
            setPat: (token) => set({ pat: token }),

            // Actions
            setOrganization: (org) => set({ organization: org, error: null }),
            setRepositories: (repos) => set({ repositories: repos }),
            setLoading: (isLoading) => set({ loading: isLoading }),
            setError: (err) => set({ error: err, loading: false, organization: null, repositories: [] }),
            setPage: (page) => set({ page }),
            setSortBy: (sort) => set({ sortBy: sort }),

            // Caching
            lastFetched: 0,
            lastQuery: '',
            setFetchMeta: (query, time) => set({ lastQuery: query, lastFetched: time }),

            resetState: () => set({ organization: null, repositories: [], error: null, page: 1, hasMore: true }),
        }),
        {
            name: 'github-dashboard-storage',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                searchQuery: state.searchQuery,
                pat: state.pat,
                sortBy: state.sortBy,
                organization: state.organization,
                repositories: state.repositories,
                lastFetched: state.lastFetched,
                lastQuery: state.lastQuery
            }),
            // User asked for Result Persistence. Let's persist basic data too, but maybe clear it on long stale?
            // For now, let's persist everything relevant to restore the view.
        }
    )
);
