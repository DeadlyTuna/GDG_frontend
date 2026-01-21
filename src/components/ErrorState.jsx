import { AlertCircle, RefreshCw } from 'lucide-react'
import { useGitHubStore } from '../store/useGitHubStore'
import './ErrorState.css'

function ErrorState({ error }) {
    const { clearError, reset } = useGitHubStore()

    const getErrorIcon = () => {
        if (error.includes('404') || error.includes('not found')) {
            return '🔍'
        }
        if (error.includes('403') || error.includes('rate limit')) {
            return '⚠️'
        }
        if (error.includes('Network')) {
            return '📡'
        }
        return '❌'
    }

    const getErrorTitle = () => {
        if (error.includes('404') || error.includes('not found')) {
            return 'Organization Not Found'
        }
        if (error.includes('403') || error.includes('rate limit')) {
            return 'Rate Limit Exceeded'
        }
        if (error.includes('Network')) {
            return 'Network Error'
        }
        return 'Something Went Wrong'
    }

    const getErrorSuggestion = () => {
        if (error.includes('404') || error.includes('not found')) {
            return 'Please check the organization name and try again.'
        }
        if (error.includes('403') || error.includes('rate limit')) {
            return 'Add a Personal Access Token to increase your API rate limit.'
        }
        if (error.includes('Network')) {
            return 'Please check your internet connection and try again.'
        }
        return 'Please try again or contact support if the problem persists.'
    }

    const handleRetry = () => {
        clearError()
        reset()
    }

    return (
        <div className="error-state">
            <div className="error-state-content glass-card">
                <div className="error-icon">{getErrorIcon()}</div>

                <div className="error-header">
                    <AlertCircle size={24} className="error-alert-icon" />
                    <h3>{getErrorTitle()}</h3>
                </div>

                <p className="error-message">{error}</p>
                <p className="error-suggestion">{getErrorSuggestion()}</p>

                <button className="error-retry-button" onClick={handleRetry}>
                    <RefreshCw size={18} />
                    <span>Try Again</span>
                </button>
            </div>
        </div>
    )
}

export default ErrorState
