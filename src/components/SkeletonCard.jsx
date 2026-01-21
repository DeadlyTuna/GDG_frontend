import './SkeletonCard.css'

function SkeletonCard() {
    return (
        <div className="skeleton-card glass-card">
            <div className="skeleton-header">
                <div className="skeleton-title"></div>
                <div className="skeleton-badge"></div>
            </div>
            <div className="skeleton-description">
                <div className="skeleton-line"></div>
                <div className="skeleton-line"></div>
                <div className="skeleton-line short"></div>
            </div>
            <div className="skeleton-stats">
                <div className="skeleton-stat"></div>
                <div className="skeleton-stat"></div>
                <div className="skeleton-stat"></div>
            </div>
        </div>
    )
}

export default SkeletonCard
