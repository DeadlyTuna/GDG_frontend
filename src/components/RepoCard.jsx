import { Star, GitFork, Eye } from "lucide-react";

export function RepoCard({ repo }) {
    return (
        <div className="flex flex-col p-4 border rounded-lg bg-card hover:bg-accent/50 transition-colors">
            <div className="flex justify-between items-start mb-2">
                <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-primary hover:underline truncate"
                >
                    {repo.name}
                </a>
                <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground border">
                    {repo.visibility}
                </span>
            </div>

            <p className="text-sm text-muted-foreground mb-4 line-clamp-2 h-10">
                {repo.description || "No description available."}
            </p>

            <div className="mt-auto flex items-center gap-4 text-xs text-muted-foreground">
                {repo.language && (
                    <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-yellow-400" />
                        {repo.language}
                    </span>
                )}
                <span className="flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    {repo.stargazers_count}
                </span>
                <span className="flex items-center gap-1">
                    <GitFork className="w-3 h-3" />
                    {repo.forks_count}
                </span>
                <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {repo.watchers_count}
                </span>
            </div>
            <div className="text-xs text-muted-foreground mt-2">
                Updated: {new Date(repo.updated_at).toLocaleDateString()}
            </div>
        </div>
    );
}
