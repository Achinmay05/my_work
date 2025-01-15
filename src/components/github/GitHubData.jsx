// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import {
//     Chart as ChartJS,
//     CategoryScale,
//     LinearScale,
//     BarElement,
//     Title,
//     Tooltip,
//     Legend
// } from 'chart.js';
// import { Bar } from "react-chartjs-2";
// import { Calendar, Users, GitBranch, Clock } from "lucide-react";

// ChartJS.register(
//     CategoryScale,
//     LinearScale,
//     BarElement,
//     Title,
//     Tooltip,
//     Legend
// );

// export default function GitHubData() {
//     // Initialize all state variables
//     const [username, setUsername] = useState("");
//     const [repos, setRepos] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [page, setPage] = useState(1);
//     const [selectedRepo, setSelectedRepo] = useState(null);
//     const [commits, setCommits] = useState([]);
//     const [contributors, setContributors] = useState([]);
//     const [repoStats, setRepoStats] = useState(null);
//     const [languageStats, setLanguageStats] = useState({});
//     const [chartData, setChartData] = useState(null);
//     const keyCounter = useRef(0);
//     const chartRef = useRef(null);


//     const apiKey = import.meta.env.VITE_GITHUB_TOKEN;
//     const headers = apiKey ? {
//         Authorization: `Bearer ${apiKey}`
//     } : {};

//     const fetchRepos = async () => {
//         setLoading(true);
//         setError(null); // Reset error at the start of the fetch

//         try {
//             const response = await axios.get(
//                 `https://api.github.com/users/${username}/repos?per_page=10&page=${page}`,
//                 { headers }
//             );

//             const reposWithKeys = response.data.map(repo => ({
//                 ...repo,
//                 uniqueKey: `${repo.id}-${keyCounter.current++}`
//             }));

//             setRepos(page === 1 ? reposWithKeys : [...repos, ...reposWithKeys]);
//         } catch (err) {
//             // Show error only if no data is present
//             if (repos.length === 0) {
//                 setError(`Error fetching repositories: ${err.message}`);
//             }
//             console.error('API Error:', err.response?.data || err.message);
//         } finally {
//             setLoading(false);
//         }
//     };


//     // Fetch language statistics
//     const fetchLanguageStats = async (repo) => {
//         try {
//             const response = await axios.get(
//                 `https://api.github.com/repos/${username}/${repo.name}/languages`,
//                 { headers }
//             );

//             const languages = response.data;
//             const total = Object.values(languages).reduce((acc, curr) => acc + curr, 0);

//             const languagePercentages = {};
//             Object.keys(languages).forEach(lang => {
//                 languagePercentages[lang] = ((languages[lang] / total) * 100).toFixed(1);
//             });

//             setLanguageStats(languagePercentages);

//             setChartData({
//                 labels: Object.keys(languagePercentages),
//                 datasets: [{
//                     label: 'Language Distribution (%)',
//                     data: Object.values(languagePercentages),
//                     backgroundColor: [
//                         'rgba(255, 99, 132, 0.5)',
//                         'rgba(54, 162, 235, 0.5)',
//                         'rgba(255, 206, 86, 0.5)',
//                         'rgba(75, 192, 192, 0.5)',
//                         'rgba(153, 102, 255, 0.5)',
//                     ],
//                     borderWidth: 1
//                 }]
//             });
//         } catch (err) {
//             console.error('Error fetching language statistics:', err);
//         }
//     };


//     const fetchRepoDetails = async (repo) => {
//         if (!repo) return;

//         setSelectedRepo(repo);
//         setLoading(true);
//         setError(null);

//         try {
//             const [commitsResponse, contributorsResponse, statsResponse] = await Promise.all([
//                 axios.get(`https://api.github.com/repos/${username}/${repo.name}/commits?per_page=10`, { headers }),
//                 axios.get(`https://api.github.com/repos/${username}/${repo.name}/contributors`, { headers }),
//                 axios.get(`https://api.github.com/repos/${username}/${repo.name}`, { headers })
//             ]);

//             setCommits(commitsResponse.data);
//             setContributors(contributorsResponse.data);
//             setRepoStats({
//                 openIssues: statsResponse.data.open_issues_count,
//                 watchers: statsResponse.data.watchers_count,
//                 network: statsResponse.data.network_count,
//                 branches: statsResponse.data.default_branch,
//                 createdAt: new Date(statsResponse.data.created_at),
//                 updatedAt: new Date(statsResponse.data.updated_at),
//             });

//             await fetchLanguageStats(repo);

//             // Scroll to Language Distribution Chart on mobile devices
//             if (window.innerWidth < 768 && chartRef.current) {
//                 chartRef.current.scrollIntoView({ behavior: "smooth" });
//             }
//         } catch (err) {
//             setError(`Error fetching repository details: ${err.message}`);
//             console.error('API Error:', err.response?.data || err.message);
//         } finally {
//             setLoading(false);
//         }
//     };






//     // Load repositories when component mounts or when username/page changes
//     useEffect(() => {
//         if (username) {
//             fetchRepos();
//         }
//     }, [username, page]);

//     const loadMore = () => {
//         setPage(prevPage => prevPage + 1);
//     };

//     const formatDate = (date) => {
//         return new Date(date).toLocaleDateString('en-US', {
//             year: 'numeric',
//             month: 'short',
//             day: 'numeric',
//             hour: '2-digit',
//             minute: '2-digit'
//         });
//     };

//     const chartOptions = {
//         responsive: true,
//         maintainAspectRatio: false,
//         plugins: {
//             legend: {
//                 position: 'top',
//             },
//             title: {
//                 display: true,
//                 text: 'Repository Language Distribution'
//             }
//         },
//         scales: {
//             y: {
//                 beginAtZero: true,
//                 ticks: {
//                     callback: value => `${value}%`
//                 }
//             }
//         }
//     };

//     return (
//         <div className="container mx-auto p-4">
//             {/* Search Input */}
//             <div className="flex gap-2 mb-4 text-black">
//                 <input
//                     type="text"
//                     className="w-1/4 h-8 p-2 border rounded text-sm"
//                     placeholder="Enter GitHub username"
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                 />
//                 <button
//                     className=" h-8 px-3 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
//                     onClick={() => {
//                         setPage(1);
//                         fetchRepos();
//                     }}
//                     disabled={loading}
//                 >
//                     {loading ? 'Searching...' : 'Search'}
//                 </button>
//             </div>

//             {/* Error Message */}
//             {error && (
//                 <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
//                     <p>{error}</p>
//                 </div>
//             )}

//             {/* Loading Message */}
//             {loading && !selectedRepo && (
//                 <div className="text-center py-4">
//                     <p>Loading repositories...</p>
//                 </div>
//             )}

//             <div className="flex flex-col md:flex-row gap-6">
//                 {/* Repository List */}
//                 <div className="w-full md:w-1/3 sticky top-0 h-screen flex flex-col">
//                     <h2 className="text-xl font-bold mb-4">Repositories</h2>
//                     <div
//                         className="grid grid-cols-1 gap-4 overflow-y-auto flex-1"
//                         style={{ maxHeight: "calc(100vh - 4rem)" }} // Adjust height for title and button
//                     >
//                         {repos.map((repo) => (
//                             <div
//                                 key={repo.uniqueKey}
//                                 className={`border rounded p-4 hover:shadow-md cursor-pointer ${selectedRepo?.id === repo.id ? 'border-blue-500 bg-blue-50' : ''
//                                     }`}
//                                 onClick={() => fetchRepoDetails(repo)}
//                             >
//                                 <h3 className="text-lg font-semibold text-blue-500">
//                                     {repo.name}
//                                 </h3>
//                                 <p className="text-sm text-gray-600 my-2">
//                                     {repo.description || "No description available."}
//                                 </p>
//                                 <div className="flex gap-4 text-sm text-gray-500">
//                                     <span>⭐ {repo.stargazers_count}</span>
//                                     <span>🍴 {repo.forks_count}</span>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>

//                     {repos.length > 0 && (
//                         <button
//                             className="h-8 text-sm mt-4 mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
//                             onClick={loadMore}
//                             disabled={loading}
//                         >
//                             {loading ? 'Loading...' : 'Load More'}
//                         </button>
//                     )}
//                 </div>




//                 {/* Details Column */}
//                 <div className="w-full md:w-2/3">
//                     {selectedRepo && (
//                         <div className="border rounded-lg p-6">
//                             <h2 className="text-2xl font-bold mb-4">{selectedRepo.name}</h2>

//                             {/* Repository Statistics */}
//                             {repoStats && (
//                                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//                                     <div className="border rounded p-3">
//                                         <div className="flex items-center gap-2">
//                                             <GitBranch size={16} />
//                                             <span className="text-sm font-medium">Branch</span>
//                                         </div>
//                                         <p className="text-lg font-bold">{repoStats.branches}</p>
//                                     </div>
//                                     <div className="border rounded p-3">
//                                         <div className="flex items-center gap-2">
//                                             <Users size={16} />
//                                             <span className="text-sm font-medium">Watchers</span>
//                                         </div>
//                                         <p className="text-lg font-bold">{repoStats.watchers}</p>
//                                     </div>
//                                     <div className="border rounded p-3">
//                                         <div className="flex items-center gap-2">
//                                             <Calendar size={16} />
//                                             <span className="text-sm font-medium">Created</span>
//                                         </div>
//                                         <p className="text-sm font-medium">
//                                             {repoStats.createdAt.toLocaleDateString()}
//                                         </p>
//                                     </div>
//                                     <div className="border rounded p-3">
//                                         <div className="flex items-center gap-2">
//                                             <Clock size={16} />
//                                             <span className="text-sm font-medium">Updated</span>
//                                         </div>
//                                         <p className="text-sm font-medium">
//                                             {repoStats.updatedAt.toLocaleDateString()}
//                                         </p>
//                                     </div>
//                                 </div>
//                             )}

//                             {/* Language Chart */}
//                             {chartData && (
//                                 <div className="mb-6">
//                                     <h3 className="text-xl font-bold mb-3">Language Distribution</h3>
//                                     <div className="h-64">
//                                         <Bar data={chartData} options={chartOptions} />
//                                     </div>
//                                     <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
//                                         {Object.entries(languageStats).map(([language, percentage]) => (
//                                             <div key={language} className="border rounded p-2">
//                                                 <p className="font-medium">{language}</p>
//                                                 <p className="text-sm text-gray-500">{percentage}%</p>
//                                             </div>
//                                         ))}
//                                     </div>
//                                 </div>
//                             )}

//                             {/* Commit History */}
//                             <div className="mb-6">
//                                 <h3 className="text-xl font-bold mb-2">Recent Commits</h3>
//                                 <div className="space-y-2">
//                                     {commits.map((commit) => (
//                                         <div
//                                             key={commit.sha}
//                                             className="border rounded p-2"
//                                         >
//                                             <div className="flex items-start justify-between">
//                                                 <div>
//                                                     <p className="font-medium text-sm">
//                                                         {commit.commit.message.split('\n')[0]}
//                                                     </p>
//                                                     <p className="text-sm text-gray-500">
//                                                         {commit.commit.author.name} committed on {
//                                                             formatDate(commit.commit.author.date)
//                                                         }
//                                                     </p>
//                                                 </div>
//                                                 <a
//                                                     href={commit.html_url}
//                                                     target="_blank"
//                                                     rel="noopener noreferrer"
//                                                     className="text-blue-500 text-sm hover:underline"
//                                                 >
//                                                     {commit.sha.substring(0, 7)}
//                                                 </a>
//                                             </div>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>

//                             {/* Contributors */}
//                             <div>
//                                 <h3 className="text-xl font-bold mb-3">Top Contributors</h3>
//                                 <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//                                     {contributors.slice(0, 6).map((contributor) => (
//                                         <div
//                                             key={contributor.id}
//                                             className="flex items-center gap-3 border rounded p-3"
//                                         >
//                                             <img
//                                                 src={contributor.avatar_url}
//                                                 alt={contributor.login}
//                                                 className="w-10 h-10 rounded-full"
//                                             />
//                                             <div>
//                                                 <p className="font-medium">{contributor.login}</p>
//                                                 <p className="text-sm text-gray-500">
//                                                     {contributor.contributions} commits
//                                                 </p>
//                                             </div>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );

// };



import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { Bar } from "react-chartjs-2";
import { Calendar, Users, GitBranch, Clock } from "lucide-react";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function GitHubData() {
    // Initialize all state variables
    const [username, setUsername] = useState("");
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [selectedRepo, setSelectedRepo] = useState(null);
    const [commits, setCommits] = useState([]);
    const [contributors, setContributors] = useState([]);
    const [repoStats, setRepoStats] = useState(null);
    const [languageStats, setLanguageStats] = useState({});
    const [chartData, setChartData] = useState(null);
    const keyCounter = useRef(0);
    const chartRef = useRef(null);
    const detailsRef = useRef(null);

    const apiKey = import.meta.env.VITE_GITHUB_TOKEN;
    const headers = apiKey ? {
        Authorization: `Bearer ${apiKey}`
    } : {};

    const fetchRepos = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(
                `https://api.github.com/users/${username}/repos?per_page=10&page=${page}`,
                { headers }
            );

            const reposWithKeys = response.data.map(repo => ({
                ...repo,
                uniqueKey: `${repo.id}-${keyCounter.current++}`
            }));

            setRepos(page === 1 ? reposWithKeys : [...repos, ...reposWithKeys]);
        } catch (err) {
            if (repos.length === 0) {
                setError(`Error fetching repositories: ${err.message}`);
            }
            console.error('API Error:', err.response?.data || err.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchLanguageStats = async (repo) => {
        try {
            const response = await axios.get(
                `https://api.github.com/repos/${username}/${repo.name}/languages`,
                { headers }
            );

            const languages = response.data;
            const total = Object.values(languages).reduce((acc, curr) => acc + curr, 0);

            const languagePercentages = {};
            Object.keys(languages).forEach(lang => {
                languagePercentages[lang] = ((languages[lang] / total) * 100).toFixed(1);
            });

            setLanguageStats(languagePercentages);

            setChartData({
                labels: Object.keys(languagePercentages),
                datasets: [{
                    label: 'Language Distribution (%)',
                    data: Object.values(languagePercentages),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.5)',
                        'rgba(54, 162, 235, 0.5)',
                        'rgba(255, 206, 86, 0.5)',
                        'rgba(75, 192, 192, 0.5)',
                        'rgba(153, 102, 255, 0.5)',
                    ],
                    borderWidth: 1
                }]
            });
        } catch (err) {
            console.error('Error fetching language statistics:', err);
        }
    };

    const fetchRepoDetails = async (repo) => {
        if (!repo) return;

        setSelectedRepo(repo);
        setLoading(true);
        setError(null);

        try {
            const [commitsResponse, contributorsResponse, statsResponse] = await Promise.all([
                axios.get(`https://api.github.com/repos/${username}/${repo.name}/commits?per_page=10`, { headers }),
                axios.get(`https://api.github.com/repos/${username}/${repo.name}/contributors`, { headers }),
                axios.get(`https://api.github.com/repos/${username}/${repo.name}`, { headers })
            ]);

            setCommits(commitsResponse.data);
            setContributors(contributorsResponse.data);
            setRepoStats({
                openIssues: statsResponse.data.open_issues_count,
                watchers: statsResponse.data.watchers_count,
                network: statsResponse.data.network_count,
                branches: statsResponse.data.default_branch,
                createdAt: new Date(statsResponse.data.created_at),
                updatedAt: new Date(statsResponse.data.updated_at),
            });

            await fetchLanguageStats(repo);

            // Only scroll on mobile devices
            if (window.innerWidth < 768 && detailsRef.current) {
                setTimeout(() => {
                    detailsRef.current.scrollIntoView({ behavior: "smooth" });
                }, 100);
            }
        } catch (err) {
            setError(`Error fetching repository details: ${err.message}`);
            console.error('API Error:', err.response?.data || err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (username) {
            fetchRepos();
        }
    }, [username, page]);

    const loadMore = () => {
        setPage(prevPage => prevPage + 1);
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Repository Language Distribution'
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: value => `${value}%`
                }
            }
        }
    };

    return (
        <div className="container mx-auto p-4">
            {/* Search Input */}
            <div className="flex gap-2 mb-4 text-black">
                <input
                    type="text"
                    className="w-full md:w-1/4 h-8 p-2 border rounded text-sm"
                    placeholder="Enter GitHub username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <button
                    className="h-8 px-3 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={() => {
                        setPage(1);
                        fetchRepos();
                    }}
                    disabled={loading}
                >
                    {loading ? 'Searching...' : 'Search'}
                </button>
            </div>

            {/* Error Message */}
            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                    <p>{error}</p>
                </div>
            )}

            {/* Loading Message */}
            {loading && !selectedRepo && (
                <div className="text-center py-4">
                    <p>Loading repositories...</p>
                </div>
            )}

            <div className="flex flex-col md:flex-row gap-6">
                {/* Repository List */}
                <div className="w-full md:w-1/3">
                    <h2 className="text-xl font-bold mb-4">Repositories</h2>
                    <div className="grid grid-cols-1 gap-4">
                        {repos.map((repo) => (
                            <div
                                key={repo.uniqueKey}
                                className={`border rounded p-4 hover:shadow-md cursor-pointer ${
                                    selectedRepo?.id === repo.id ? 'border-blue-500 bg-blue-50' : ''
                                }`}
                                onClick={() => fetchRepoDetails(repo)}
                            >
                                <h3 className="text-lg font-semibold text-blue-500">
                                    {repo.name}
                                </h3>
                                <p className="text-sm text-gray-600 my-2">
                                    {repo.description || "No description available."}
                                </p>
                                <div className="flex gap-4 text-sm text-gray-500">
                                    <span>⭐ {repo.stargazers_count}</span>
                                    <span>🍴 {repo.forks_count}</span>
                                </div>
                            </div>
                        ))}

                        {repos.length > 0 && (
                            <button
                                className="w-full h-8 text-sm mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                                onClick={loadMore}
                                disabled={loading}
                            >
                                {loading ? 'Loading...' : 'Load More'}
                            </button>
                        )}
                    </div>
                </div>

                {/* Details Section */}
                {selectedRepo && (
                    <div ref={detailsRef} className="w-full md:w-2/3">
                        <div className="border rounded-lg p-6">
                            <h2 className="text-2xl font-bold mb-4">{selectedRepo.name}</h2>

                            {/* Repository Statistics */}
                            {repoStats && (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                                    <div className="border rounded p-3">
                                        <div className="flex items-center gap-2">
                                            <GitBranch size={16} />
                                            <span className="text-sm font-medium">Branch</span>
                                        </div>
                                        <p className="text-lg font-bold">{repoStats.branches}</p>
                                    </div>
                                    <div className="border rounded p-3">
                                        <div className="flex items-center gap-2">
                                            <Users size={16} />
                                            <span className="text-sm font-medium">Watchers</span>
                                        </div>
                                        <p className="text-lg font-bold">{repoStats.watchers}</p>
                                    </div>
                                    <div className="border rounded p-3">
                                        <div className="flex items-center gap-2">
                                            <Calendar size={16} />
                                            <span className="text-sm font-medium">Created</span>
                                        </div>
                                        <p className="text-sm font-medium">
                                            {repoStats.createdAt.toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div className="border rounded p-3">
                                        <div className="flex items-center gap-2">
                                            <Clock size={16} />
                                            <span className="text-sm font-medium">Updated</span>
                                        </div>
                                        <p className="text-sm font-medium">
                                            {repoStats.updatedAt.toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Language Chart */}
                            {chartData && (
                                <div className="mb-6">
                                    <h3 className="text-xl font-bold mb-3">Language Distribution</h3>
                                    <div className="h-64" ref={chartRef}>
                                        <Bar data={chartData} options={chartOptions} />
                                    </div>
                                    <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {Object.entries(languageStats).map(([language, percentage]) => (
                                            <div key={language} className="border rounded p-2">
                                                <p className="font-medium">{language}</p>
                                                <p className="text-sm text-gray-500">{percentage}%</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Commit History */}
                            <div className="mb-6">
                                <h3 className="text-xl font-bold mb-2">Recent Commits</h3>
                                <div className="space-y-2">
                                    {commits.map((commit) => (
                                        <div
                                            key={commit.sha}
                                            className="border rounded p-2"
                                        >
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <p className="font-medium text-sm">
                                                        {commit.commit.message.split('\n')[0]}
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        {commit.commit.author.name} committed on {
                                                            formatDate(commit.commit.author.date)
                                                        }
                                                    </p>
                                                </div>
                                                <a
                                                    href={commit.html_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-500 text-sm hover:underline"
                                                >
                                                    {commit.sha.substring(0, 7)}
                                                </a>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Contributors */}
                            <div>
                                <h3 className="text-xl font-bold mb-3">Top Contributors</h3>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {contributors.slice(0, 6).map((contributor) => (
                                        <div
                                            key={contributor.id}
                                            className="flex items-center gap-3 border rounded p-3"
                                        >
                                            <img
                                                src={contributor.avatar_url}
                                                alt={contributor.login}
                                                className="w-10 h-10 rounded-full"
                                            />
                                            <div>
                                                <p className="font-medium">{contributor.login}</p>
                                                <p className="text-sm text-gray-500">
                                                    {contributor.contributions} commits
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            </div>
    );
};
    
