# 🚀 GitHub Dashboard

A modern, production-grade web application for exploring GitHub Organizations and their repositories. Built with React 18, Zustand, and the GitHub API.

![GitHub Dashboard](https://img.shields.io/badge/React-18.2.0-blue?logo=react)
![Zustand](https://img.shields.io/badge/Zustand-4.4.7-purple)
![Vite](https://img.shields.io/badge/Vite-5.0.8-yellow?logo=vite)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

### Core Functionality
- 🔍 **Dynamic Search** - Real-time organization search with debouncing
- 📊 **Repository Grid** - Beautiful card-based layout with repository details
- 🎨 **Language Distribution** - Interactive pie chart showing programming language statistics
- 🔄 **Infinite Scroll** - Automatic loading of more repositories as you scroll
- ⚡ **Smart Caching** - 5-minute cache to reduce API calls and improve performance
- 🔑 **Token Support** - Optional Personal Access Token for higher rate limits

### User Experience
- 💫 **Skeleton Loading** - Smooth loading states with skeleton screens
- 🎯 **Sort Options** - Sort repositories by stars, forks, or last updated
- 🚨 **Error Handling** - User-friendly error messages with retry functionality
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- 🔝 **Back to Top** - Floating button for easy navigation
- 🎭 **Glass Morphism UI** - Modern frosted glass design aesthetic

## 🛠️ Tech Stack

### Frontend
- **React 18.2** - Modern UI library with concurrent features
- **Zustand** - Lightweight state management (simpler than Redux)
- **Axios** - Promise-based HTTP client for API requests
- **Chart.js** - Beautiful, responsive charts
- **Lucide React** - Modern icon library
- **Vite** - Next-generation frontend build tool

### API
- **GitHub REST API v3** - Official GitHub API for organization and repository data

## 📦 Installation

### Prerequisites
- Node.js 16+ and npm installed
- (Optional) GitHub Personal Access Token for higher rate limits

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/DeadlyTuna/GDG_frontend.git
   cd GDG_frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

## 🚀 Usage

### Basic Search
1. Type an organization name in the search bar (e.g., `facebook`, `google`, `microsoft`)
2. Wait 500ms for debounced search to trigger
3. View organization details and repositories

### Advanced Features
- **Add Personal Access Token**: Click the key icon to add your GitHub token
- **Sort Repositories**: Use the sort buttons to organize by stars, forks, or update date
- **Load More**: Scroll to the bottom to automatically load more repositories
- **View Language Stats**: Check the pie chart for language distribution

### Getting a GitHub Token
1. Go to [GitHub Settings → Developer Settings → Personal Access Tokens](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Select scopes: `public_repo` (for public repositories)
4. Copy the token and paste it in the dashboard

## 📁 Project Structure

```
GDG_frontend/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── SearchBar.jsx    # Search input with debouncing
│   │   ├── OrgHeader.jsx    # Organization info display
│   │   ├── SortControls.jsx # Sort buttons
│   │   ├── RepoList.jsx     # Repository grid with infinite scroll
│   │   ├── RepoCard.jsx     # Individual repository card
│   │   ├── SkeletonCard.jsx # Loading placeholder
│   │   ├── LanguageChart.jsx # Pie chart for languages
│   │   ├── ErrorState.jsx   # Error display
│   │   ├── BackToTop.jsx    # Scroll to top button
│   │   └── *.css            # Component styles
│   ├── hooks/               # Custom React hooks
│   │   ├── useDebounce.js   # Debounce hook
│   │   └── useInfiniteScroll.js # Infinite scroll hook
│   ├── services/            # API service layer
│   │   └── githubApi.js     # GitHub API functions
│   ├── store/               # State management
│   │   └── useGitHubStore.js # Zustand store
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # App entry point
│   └── index.css            # Global styles
├── index.html               # HTML entry point
├── package.json             # Dependencies
├── vite.config.js           # Vite configuration
└── README.md                # This file
```

## 🎯 Key Features Explained

### Debouncing
Prevents excessive API calls by waiting 500ms after the user stops typing before triggering a search.

```javascript
const debouncedSearch = useDebounce(searchInput, 500)
```

### Infinite Scroll
Uses Intersection Observer API to detect when the last repository card is visible and automatically loads more.

```javascript
const lastRepoRef = useInfiniteScroll(loadMoreRepos, isLoading, hasMore)
```

### Caching
Stores fetched data in localStorage for 5 minutes to reduce API calls and improve performance.

```javascript
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes
```

### State Management
Uses Zustand with persist middleware for simple, efficient state management with automatic localStorage sync.

```javascript
export const useGitHubStore = create(
    persist((set, get) => ({ /* state */ }), { name: 'github-dashboard-storage' })
)
```

## 🎨 Design Features

- **Glass Morphism**: Frosted glass effect using `backdrop-filter: blur()`
- **Gradient Text**: Eye-catching gradient headings
- **Smooth Animations**: Fade-in, slide-in, and skeleton shimmer effects
- **Responsive Grid**: Auto-adjusting grid layout (3 columns → 2 → 1)
- **Dark Theme**: Modern dark color scheme with vibrant accents

## 📊 Performance Optimizations

1. **Debounced Search** - Reduces API calls by 90%+
2. **Smart Caching** - Eliminates redundant requests
3. **Lazy Loading** - Only loads visible content
4. **Skeleton Screens** - Improves perceived performance
5. **Code Splitting** - Vite automatically splits code for faster loads

## 🔧 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## 🌐 API Rate Limits

- **Without Token**: 60 requests per hour
- **With Token**: 5,000 requests per hour

Add a Personal Access Token to avoid rate limiting!

## 🐛 Troubleshooting

### "Organization not found"
- Check spelling of organization name
- Ensure organization is public

### "Rate limit exceeded"
- Add a GitHub Personal Access Token
- Wait for rate limit to reset (shown in error message)

### "Network error"
- Check internet connection
- Verify GitHub API is accessible

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Harsh**
- GitHub: [@DeadlyTuna](https://github.com/DeadlyTuna)

## 🙏 Acknowledgments

- [GitHub API](https://docs.github.com/en/rest) - For providing the data
- [React](https://react.dev/) - For the amazing UI library
- [Zustand](https://github.com/pmndrs/zustand) - For simple state management
- [Chart.js](https://www.chartjs.org/) - For beautiful charts
- [Lucide](https://lucide.dev/) - For clean, modern icons

## 📸 Screenshots

### Main Dashboard
![Dashboard](https://via.placeholder.com/800x400?text=Add+Your+Screenshot+Here)

### Organization View
![Organization](https://via.placeholder.com/800x400?text=Add+Your+Screenshot+Here)

### Language Chart
![Chart](https://via.placeholder.com/800x400?text=Add+Your+Screenshot+Here)

---

**Built with ❤️ using React + Zustand**

*Star ⭐ this repository if you found it helpful!*
