import { useGitHubStore } from '../store/useGitHubStore'
import { useInfiniteScroll } from '../hooks/useInfiniteScroll'
import RepoCard from './RepoCard'
import SkeletonCard from './SkeletonCard'
import ErrorState from './ErrorState'
import './RepoList.css'

function RepoList() {
    const {
        getSortedRepos,
        isLoading,
        error,
        hasMore,
        loadMoreRepos,
        currentOrg,
    } = useGitHubStore()

    const repositories = getSortedRepos()

    // Infinite scroll hook
    const lastRepoRef = useInfiniteScroll(loadMoreRepos, isLoading, hasMore)

    // Error state
    if (error && repositories.length === 0) {
        return <ErrorState error={error} />
    }

    // Empty state (no search yet)
    if (!currentOrg && !isLoading) {
        return (
            <div className="empty-state">
                <div className="empty-state-content glass-card">
                    <div className="empty-state-icon">🔍</div>
                    <h3>Start Exploring</h3>
                    <p>Search for a GitHub organization to view their repositories</p>
                    <div className="empty-state-examples">
                        <span>Try:</span>
                        <code>facebook</code>
                        <code>google</code>
                        <code>microsoft</code>
                    </div>
                </div>
            </div>
        )
    }

    // Loading state (initial load)
    if (isLoading && repositories.length === 0) {
        return (
            <div className="repo-grid grid grid-cols-3">
                {Array.from({ length: 9 }).map((_, index) => (
                    <SkeletonCard key={index} />
                ))}
            </div>
        )
    }

    // No repositories found
    if (repositories.length === 0 && currentOrg) {
        return (
            <div className="empty-state">
                <div className="empty-state-content glass-card">
                    <div className="empty-state-icon">📭</div>
                    <h3>No Repositories Found</h3>
                    <p>This organization doesn't have any public repositories</p>
                </div>
            </div>
        )
    }

    return (
        <div className="repo-list-container">
            <div className="repo-grid grid grid-cols-3">
                {repositories.map((repo, index) => {
                    // Attach ref to the last element for infinite scroll
                    if (index === repositories.length - 1) {
                        return (
                            <div key={repo.id} ref={lastRepoRef}>
                                <RepoCard repo={repo} />
                            </div>
                        )
                    }
                    return <RepoCard key={repo.id} repo={repo} />
                })}
            </div>

            {/* Loading more indicator */}
            {isLoading && repositories.length > 0 && (
                <div className="loading-more">
                    <div className="loading-spinner-large"></div>
                    <p>Loading more repositories...</p>
                </div>
            )}

            {/* No more results */}
            {!hasMore && repositories.length > 0 && (
                <div className="no-more-results">
                    <p>🎉 You've reached the end!</p>
                </div>
            )}
        </div>
    )
}

export default RepoList
