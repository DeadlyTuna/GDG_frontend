import { RepoCard } from "./RepoCard";
import { Skeleton } from "./Skeleton";
import { useStore } from "@/store/useStore";

export function RepoList({ repos, loading }) {
    const { sortBy, setSortBy } = useStore();

    const sortedRepos = [...repos].sort((a, b) => {
        if (sortBy === 'stars') return b.stargazers_count - a.stargazers_count;
        if (sortBy === 'forks') return b.forks_count - a.forks_count;
        // recency / default
        return new Date(b.updated_at) - new Date(a.updated_at);
    });

    if (loading && repos.length === 0) {
        return (
            <div className="space-y-4">
                <div className="h-8 w-48 bg-muted rounded animate-pulse mb-4" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-32 border rounded-lg bg-card animate-pulse" />
                    ))}
                </div>
            </div>
        );
    }

    if (repos.length === 0) return null;

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">Repositories ({repos.length})</h3>
                <select
                    className="text-sm p-2 border rounded bg-background"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                >
                    <option value="updated">Last Updated</option>
                    <option value="stars">Most Stars</option>
                    <option value="forks">Most Forks</option>
                </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sortedRepos.map((repo) => (
                    <RepoCard key={repo.id} repo={repo} />
                ))}
            </div>
        </div>
    );
}
