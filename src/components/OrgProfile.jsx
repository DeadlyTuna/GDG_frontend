import { Skeleton } from "@/components/Skeleton";

export function OrgProfile({ org, loading }) {
    if (loading) {
        return (
            <div className="flex flex-col items-center p-6 space-y-4 border rounded-lg shadow-sm bg-card">
                <Skeleton className="w-24 h-24 rounded-full" />
                <div className="space-y-2 text-center w-full">
                    <Skeleton className="h-6 w-1/2 mx-auto" />
                    <Skeleton className="h-4 w-3/4 mx-auto" />
                </div>
            </div>
        );
    }

    if (!org) return null;

    return (
        <div className="flex flex-col items-center p-6 space-y-4 border rounded-lg shadow-sm bg-card transition-all hover:shadow-md">
            <img
                src={org.avatar_url}
                alt={org.login}
                className="w-24 h-24 rounded-full border-2 border-border"
                loading="lazy"
            />
            <div className="text-center space-y-1">
                <h2 className="text-2xl font-bold">{org.name || org.login}</h2>
                <p className="text-muted-foreground text-sm">@{org.login}</p>
                {org.description && (
                    <p className="text-sm text-foreground/80 max-w-sm mx-auto">{org.description}</p>
                )}
            </div>
            <div className="flex gap-4 text-sm text-muted-foreground">
                {org.location && <span>📍 {org.location}</span>}
                {org.blog && <a href={org.blog.startsWith('http') ? org.blog : `https://${org.blog}`} target="_blank" rel="noopener noreferrer" className="hover:text-primary hover:underline">🔗 Website</a>}
            </div>
        </div>
    );
}
