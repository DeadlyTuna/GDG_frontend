import { useEffect } from 'react';
import { SearchInput } from '@/components/SearchInput';
import { OrgProfile } from '@/components/OrgProfile';
import { RepoList } from '@/components/RepoList';
import { ErrorDisplay } from '@/components/ErrorDisplay';
import { useStore } from '@/store/useStore';
import { useDebounce } from '@/hooks/useDebounce';
import { fetchOrg, fetchRepos } from '@/services/github';

function App() {
    const {
        searchQuery, setSearchQuery,
        organization, setOrganization,
        repositories, setRepositories,
        loading, setLoading,
        error, setError,
        pat, setPat,
        lastFetched, lastQuery, setFetchMeta
    } = useStore();

    const debouncedSearch = useDebounce(searchQuery, 500);

    useEffect(() => {
        const loadData = async () => {
            const query = debouncedSearch.trim();
            if (!query) {
                setOrganization(null);
                setRepositories([]);
                setError(null);
                return;
            }

            // Cache check: 5 minutes
            const now = Date.now();
            if (query === lastQuery && (now - lastFetched < 5 * 60 * 1000) && organization) {
                // Data is fresh enough
                return;
            }

            setLoading(true);
            setError(null);

            try {
                const orgData = await fetchOrg(query, pat);
                setOrganization(orgData);

                const reposData = await fetchRepos(query, 1, 100, pat);
                setRepositories(reposData);

                setFetchMeta(query, now);

            } catch (err) {
                console.error(err);
                setError(err.message);
                setOrganization(null);
                setRepositories([]);
            } finally {
                setLoading(false);
            }
        };

        if (debouncedSearch) {
            loadData();
        }
    }, [debouncedSearch, pat, setOrganization, setRepositories, setLoading, setError, lastFetched, lastQuery, setFetchMeta, organization]);

    return (
        <div className="min-h-screen bg-background text-foreground p-4 md:p-8 font-sans transition-colors duration-300">
            <div className="max-w-5xl mx-auto space-y-8">

                {/* Header */}
                <header className="flex flex-col md:flex-row items-center justify-between gap-4 pb-6 border-b">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-primary rounded-lg">
                            <svg className="w-6 h-6 text-primary-foreground" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.79 24 17.31 24 12c0-6.627-5.373-12-12-12z" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold tracking-tight">GitHub Explorer</h1>
                    </div>
                    <div className="w-full md:w-96 space-y-2">
                        <SearchInput
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <details className="text-xs text-muted-foreground">
                            <summary className="cursor-pointer hover:text-primary">Settings (PAT)</summary>
                            <div className="mt-2 p-2 border rounded bg-card">
                                <label className="block mb-1">Personal Access Token (for higher rate limits):</label>
                                <input
                                    type="password"
                                    value={pat}
                                    onChange={(e) => setPat(e.target.value)}
                                    className="w-full p-1 border rounded bg-background"
                                    placeholder="ghp_..."
                                />
                            </div>
                        </details>
                    </div>
                </header>

                {/* Content */}
                <main className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <ErrorDisplay message={error} />

                    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8 items-start">
                        <div className="md:sticky md:top-8">
                            <OrgProfile org={organization} loading={loading} />
                        </div>

                        <div className="min-w-0">
                            <RepoList repos={repositories} loading={loading} />

                            {!loading && !organization && !error && (
                                <div className="text-center py-12 text-muted-foreground border-2 border-dashed rounded-lg">
                                    <p className="text-lg">No organization selected</p>
                                    <p className="text-sm">Type an organization name above to explore.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default App
