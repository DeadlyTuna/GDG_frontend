import { useEffect, useState } from 'react'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { useGitHubStore } from '../store/useGitHubStore'
import './LanguageChart.css'

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend)

function LanguageChart() {
    const { repositories } = useGitHubStore()
    const [languageData, setLanguageData] = useState(null)

    useEffect(() => {
        if (repositories.length === 0) {
            setLanguageData(null)
            return
        }

        // Aggregate languages from all repositories
        const languageCounts = {}
        repositories.forEach((repo) => {
            if (repo.language) {
                languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1
            }
        })

        // Sort by count and get top 8
        const sortedLanguages = Object.entries(languageCounts)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 8)

        if (sortedLanguages.length === 0) {
            setLanguageData(null)
            return
        }

        // Prepare chart data
        const labels = sortedLanguages.map(([lang]) => lang)
        const data = sortedLanguages.map(([, count]) => count)

        // Color palette
        const colors = [
            'rgba(99, 102, 241, 0.8)',
            'rgba(139, 92, 246, 0.8)',
            'rgba(236, 72, 153, 0.8)',
            'rgba(251, 146, 60, 0.8)',
            'rgba(34, 197, 94, 0.8)',
            'rgba(59, 130, 246, 0.8)',
            'rgba(168, 85, 247, 0.8)',
            'rgba(244, 63, 94, 0.8)',
        ]

        setLanguageData({
            labels,
            datasets: [
                {
                    data,
                    backgroundColor: colors,
                    borderColor: colors.map((color) => color.replace('0.8', '1')),
                    borderWidth: 2,
                },
            ],
        })
    }, [repositories])

    if (!languageData) {
        return null
    }

    const options = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    color: '#cbd5e1',
                    padding: 12,
                    font: {
                        size: 12,
                    },
                },
            },
            tooltip: {
                backgroundColor: 'rgba(30, 39, 73, 0.95)',
                titleColor: '#f8fafc',
                bodyColor: '#cbd5e1',
                borderColor: 'rgba(99, 102, 241, 0.5)',
                borderWidth: 1,
                padding: 12,
                displayColors: true,
                callbacks: {
                    label: function (context) {
                        const label = context.label || ''
                        const value = context.parsed || 0
                        const total = context.dataset.data.reduce((a, b) => a + b, 0)
                        const percentage = ((value / total) * 100).toFixed(1)
                        return `${label}: ${value} repos (${percentage}%)`
                    },
                },
            },
        },
    }

    return (
        <div className="language-chart glass-card">
            <h3 className="chart-title">Language Distribution</h3>
            <div className="chart-container">
                <Pie data={languageData} options={options} />
            </div>
        </div>
    )
}

export default LanguageChart
