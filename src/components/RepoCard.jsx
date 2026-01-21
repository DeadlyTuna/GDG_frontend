import { Star, GitFork, Circle } from 'lucide-react'
import './RepoCard.css'

function RepoCard({ repo }) {
    const formatDate = (dateString) => {
        const date = new Date(dateString)
        const now = new Date()
        const diffTime = Math.abs(now - date)
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

        if (diffDays === 0) return 'Today'
        if (diffDays === 1) return 'Yesterday'
        if (diffDays < 30) return `${diffDays} days ago`
        if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`
        return `${Math.floor(diffDays / 365)} years ago`
    }

    const formatNumber = (num) => {
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'k'
        }
        return num.toString()
    }

    return (
        <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="repo-card glass-card"
        >
            <div className="repo-card-header">
                <h3 className="repo-name">{repo.name}</h3>
                {repo.language && (
                    <div className="repo-language">
                        <Circle size={10} fill="currentColor" />
                        <span>{repo.language}</span>
                    </div>
                )}
            </div>

            <p className="repo-description">
                {repo.description || 'No description available'}
            </p>

            <div className="repo-stats">
                <div className="repo-stat">
                    <Star size={16} />
                    <span>{formatNumber(repo.stargazers_count)}</span>
                </div>
                <div className="repo-stat">
                    <GitFork size={16} />
                    <span>{formatNumber(repo.forks_count)}</span>
                </div>
                <div className="repo-updated">
                    Updated {formatDate(repo.updated_at)}
                </div>
            </div>
        </a>
    )
}

export default RepoCard
