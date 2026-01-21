import { useGitHubStore } from '../store/useGitHubStore'
import { Building2, Users, BookMarked } from 'lucide-react'
import './OrgHeader.css'

function OrgHeader() {
    const { orgInfo, repositories } = useGitHubStore()

    if (!orgInfo) return null

    return (
        <div className="org-header glass-card">
            <div className="org-avatar-section">
                {orgInfo.avatar_url ? (
                    <img
                        src={orgInfo.avatar_url}
                        alt={`${orgInfo.login} avatar`}
                        className="org-avatar"
                    />
                ) : (
                    <div className="org-avatar-placeholder">
                        <Building2 size={48} />
                    </div>
                )}
            </div>

            <div className="org-info-section">
                <h2 className="org-name">{orgInfo.name || orgInfo.login}</h2>
                {orgInfo.description && (
                    <p className="org-description">{orgInfo.description}</p>
                )}

                <div className="org-stats">
                    <div className="org-stat">
                        <BookMarked size={18} />
                        <span>{orgInfo.public_repos} repositories</span>
                    </div>
                    {orgInfo.followers !== undefined && (
                        <div className="org-stat">
                            <Users size={18} />
                            <span>{orgInfo.followers} followers</span>
                        </div>
                    )}
                </div>

                {orgInfo.blog && (
                    <a
                        href={orgInfo.blog.startsWith('http') ? orgInfo.blog : `https://${orgInfo.blog}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="org-website"
                    >
                        🌐 {orgInfo.blog}
                    </a>
                )}
            </div>
        </div>
    )
}

export default OrgHeader
