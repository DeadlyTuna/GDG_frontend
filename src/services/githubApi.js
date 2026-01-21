import axios from 'axios'

const BASE_URL = 'https://api.github.com'
const PER_PAGE = 10

/**
 * Create axios instance with default config
 */
const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Accept': 'application/vnd.github.v3+json',
    },
})

/**
 * Add request interceptor to include auth token if provided
 */
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('github_token')
    if (token) {
        config.headers.Authorization = `token ${token}`
    }
    return config
})

/**
 * Add response interceptor for error handling
 */
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            // Handle specific error codes
            switch (error.response.status) {
                case 404:
                    throw new Error('Organization not found')
                case 403:
                    if (error.response.headers['x-ratelimit-remaining'] === '0') {
                        throw new Error('API rate limit exceeded. Please add a Personal Access Token.')
                    }
                    throw new Error('Access forbidden')
                case 401:
                    throw new Error('Invalid authentication token')
                default:
                    throw new Error(error.response.data.message || 'An error occurred')
            }
        } else if (error.request) {
            throw new Error('Network error. Please check your connection.')
        } else {
            throw new Error('An unexpected error occurred')
        }
    }
)

/**
 * Fetch repositories for an organization
 * @param {string} org - Organization name
 * @param {number} page - Page number (default: 1)
 * @param {string|null} token - Optional GitHub Personal Access Token
 * @returns {Promise<Array>} - Array of repositories
 */
export async function fetchOrgRepos(org, page = 1, token = null) {
    if (token) {
        localStorage.setItem('github_token', token)
    }

    const response = await api.get(`/orgs/${org}/repos`, {
        params: {
            per_page: PER_PAGE,
            page,
            sort: 'updated',
            direction: 'desc',
        },
    })

    return response.data
}

/**
 * Fetch organization information
 * @param {string} org - Organization name
 * @param {string|null} token - Optional GitHub Personal Access Token
 * @returns {Promise<Object>} - Organization data
 */
export async function fetchOrgInfo(org, token = null) {
    if (token) {
        localStorage.setItem('github_token', token)
    }

    const response = await api.get(`/orgs/${org}`)
    return response.data
}

/**
 * Fetch language statistics for a repository
 * @param {string} owner - Repository owner
 * @param {string} repo - Repository name
 * @param {string|null} token - Optional GitHub Personal Access Token
 * @returns {Promise<Object>} - Language statistics
 */
export async function fetchRepoLanguages(owner, repo, token = null) {
    if (token) {
        localStorage.setItem('github_token', token)
    }

    const response = await api.get(`/repos/${owner}/${repo}/languages`)
    return response.data
}

/**
 * Clear stored GitHub token
 */
export function clearGitHubToken() {
    localStorage.removeItem('github_token')
}
