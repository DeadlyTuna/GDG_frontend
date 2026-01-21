import { useState, useEffect } from 'react'
import { useDebounce } from '../hooks/useDebounce'
import { useGitHubStore } from '../store/useGitHubStore'
import { Search, Key, X } from 'lucide-react'
import './SearchBar.css'

function SearchBar() {
    const [searchInput, setSearchInput] = useState('')
    const [showTokenInput, setShowTokenInput] = useState(false)
    const [token, setToken] = useState('')
    const { searchOrganization, isLoading } = useGitHubStore()

    // Debounce the search input
    const debouncedSearch = useDebounce(searchInput, 500)

    // Trigger search when debounced value changes
    useEffect(() => {
        if (debouncedSearch.trim()) {
            searchOrganization(debouncedSearch.trim(), token || null)
        }
    }, [debouncedSearch, searchOrganization, token])

    const handleSearchChange = (e) => {
        setSearchInput(e.target.value)
    }

    const handleClear = () => {
        setSearchInput('')
    }

    const handleTokenSubmit = (e) => {
        e.preventDefault()
        if (searchInput.trim()) {
            searchOrganization(searchInput.trim(), token || null)
        }
    }

    return (
        <div className="search-bar-container glass-card">
            <div className="search-bar-main">
                <div className="search-input-wrapper">
                    <Search className="search-icon" size={20} />
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search GitHub organization (e.g., facebook, google, microsoft)..."
                        value={searchInput}
                        onChange={handleSearchChange}
                        disabled={isLoading}
                    />
                    {searchInput && (
                        <button
                            className="clear-button"
                            onClick={handleClear}
                            aria-label="Clear search"
                        >
                            <X size={18} />
                        </button>
                    )}
                    {isLoading && (
                        <div className="loading-spinner" aria-label="Loading"></div>
                    )}
                </div>

                <button
                    className="token-toggle-button"
                    onClick={() => setShowTokenInput(!showTokenInput)}
                    title="Add Personal Access Token for higher rate limits"
                >
                    <Key size={20} />
                </button>
            </div>

            {showTokenInput && (
                <form className="token-input-section fade-in" onSubmit={handleTokenSubmit}>
                    <input
                        type="password"
                        className="token-input"
                        placeholder="GitHub Personal Access Token (optional)"
                        value={token}
                        onChange={(e) => setToken(e.target.value)}
                    />
                    <button type="submit" className="token-submit-button">
                        Apply
                    </button>
                </form>
            )}

            <p className="search-hint">
                💡 Tip: Add a Personal Access Token to increase API rate limits
            </p>
        </div>
    )
}

export default SearchBar
