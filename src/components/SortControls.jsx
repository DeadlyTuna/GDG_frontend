import { useGitHubStore } from '../store/useGitHubStore'
import { Star, GitFork, Clock } from 'lucide-react'
import './SortControls.css'

function SortControls() {
    const { sortBy, setSortBy } = useGitHubStore()

    const sortOptions = [
        { value: 'stars', label: 'Stars', icon: Star },
        { value: 'forks', label: 'Forks', icon: GitFork },
        { value: 'updated', label: 'Recently Updated', icon: Clock },
    ]

    return (
        <div className="sort-controls glass-card">
            <h3 className="sort-title">Sort by</h3>
            <div className="sort-buttons">
                {sortOptions.map(({ value, label, icon: Icon }) => (
                    <button
                        key={value}
                        className={`sort-button ${sortBy === value ? 'active' : ''}`}
                        onClick={() => setSortBy(value)}
                    >
                        <Icon size={18} />
                        <span>{label}</span>
                    </button>
                ))}
            </div>
        </div>
    )
}

export default SortControls
