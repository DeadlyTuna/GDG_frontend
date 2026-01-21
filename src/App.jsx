import { useState, useEffect } from 'react'
import { useGitHubStore } from './store/useGitHubStore'
import SearchBar from './components/SearchBar'
import OrgHeader from './components/OrgHeader'
import SortControls from './components/SortControls'
import RepoList from './components/RepoList'
import LanguageChart from './components/LanguageChart'
import BackToTop from './components/BackToTop'
import { Github } from 'lucide-react'
import './App.css'

function App() {
    const { currentOrg, loadFromCache } = useGitHubStore()

    useEffect(() => {
        // Load cached data on mount
        loadFromCache()
    }, [loadFromCache])

    return (
        <div className="app">
            {/* Header */}
            <header className="app-header">
                <div className="container">
                    <div className="header-content">
                        <div className="logo-section">
                            <Github size={40} className="logo-icon" />
                            <div>
                                <h1 className="gradient-text">GitHub Dashboard</h1>
                                <p className="header-subtitle">Explore Organizations & Repositories</p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container">
                <div className="main-content">
                    {/* Search Section */}
                    <section className="search-section">
                        <SearchBar />
                    </section>

                    {/* Organization Info */}
                    {currentOrg && (
                        <section className="org-section fade-in">
                            <OrgHeader />
                        </section>
                    )}

                    {/* Controls & Chart */}
                    {currentOrg && (
                        <section className="controls-section fade-in">
                            <div className="controls-grid">
                                <div className="sort-controls-wrapper">
                                    <SortControls />
                                </div>
                                <div className="chart-wrapper">
                                    <LanguageChart />
                                </div>
                            </div>
                        </section>
                    )}

                    {/* Repository List */}
                    <section className="repos-section">
                        <RepoList />
                    </section>
                </div>
            </main>

            {/* Footer */}
            <footer className="app-footer">
                <div className="container">
                    <p className="footer-text">
                        Built with React + Zustand • Data from GitHub API
                    </p>
                </div>
            </footer>

            {/* Back to Top Button */}
            <BackToTop />
        </div>
    )
}

export default App
