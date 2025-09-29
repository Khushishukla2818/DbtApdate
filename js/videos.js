// Video tutorials page functionality
class VideoManager {
    constructor() {
        this.videos = [];
        this.filteredVideos = [];
        this.currentFilters = {
            language: 'all',
            category: 'all'
        };
        this.init();
    }

    init() {
        this.loadVideos();
        this.setupEventListeners();
        this.renderVideos();
    }

    setupEventListeners() {
        const languageFilter = document.getElementById('videoLanguageFilter');
        const categoryFilter = document.getElementById('videoCategoryFilter');

        if (languageFilter) {
            languageFilter.addEventListener('change', (e) => {
                this.currentFilters.language = e.target.value;
                this.filterVideos();
            });
        }

        if (categoryFilter) {
            categoryFilter.addEventListener('change', (e) => {
                this.currentFilters.category = e.target.value;
                this.filterVideos();
            });
        }

        // Modal handlers
        this.setupModalHandlers();
    }

    loadVideos() {
        // Mock video data - in real app would fetch from server or YouTube API
        this.videos = [
            {
                id: 1,
                title: {
                    en: 'Complete Guide to Aadhaar Seeding',
                    hi: 'आधार सीडिंग की पूरी गाइड'
                },
                description: {
                    en: 'Step-by-step tutorial on how to link your Aadhaar with bank account for DBT benefits.',
                    hi: 'DBT लाभों के लिए अपने आधार को बैंक खाते से लिंक करने के लिए चरणबद्ध ट्यूटोरियल।'
                },
                category: 'seeding',
                language: 'en',
                duration: '8:45',
                thumbnail: '#',
                videoUrl: '#',
                views: 12500,
                uploadDate: '2025-01-10',
                tags: ['aadhaar', 'seeding', 'dbt', 'banking']
            },
            {
                id: 2,
                title: {
                    en: 'आधार सीडिंग प्रक्रिया - हिंदी में',
                    hi: 'आधार सीडिंग प्रक्रिया - हिंदी में'
                },
                description: {
                    en: 'Complete Aadhaar seeding process explained in Hindi with practical examples.',
                    hi: 'व्यावहारिक उदाहरणों के साथ हिंदी में आधार सीडिंग प्रक्रिया की पूरी व्याख्या।'
                },
                category: 'seeding',
                language: 'hi',
                duration: '10:30',
                thumbnail: '#',
                videoUrl: '#',
                views: 18750,
                uploadDate: '2025-01-08',
                tags: ['आधार', 'सीडिंग', 'डीबीटी', 'बैंकिंग']
            },
            {
                id: 3,
                title: {
                    en: 'How to Apply for SC Scholarship Online',
                    hi: 'ऑनलाइन SC छात्रवृत्ति के लिए आवेदन कैसे करें'
                },
                description: {
                    en: 'Complete tutorial on applying for SC scholarships through the National Scholarship Portal.',
                    hi: 'राष्ट्रीय छात्रवृत्ति पोर्टल के माध्यम से SC छात्रवृत्ति के लिए आवेदन करने पर पूरा ट्यूटोरियल।'
                },
                category: 'application',
                language: 'en',
                duration: '15:20',
                thumbnail: '#',
                videoUrl: '#',
                views: 25600,
                uploadDate: '2025-01-05',
                tags: ['scholarship', 'application', 'nsp', 'sc']
            },
            {
                id: 4,
                title: {
                    en: 'Understanding DBT: Direct Benefit Transfer',
                    hi: 'डीबीटी को समझना: प्रत्यक्ष लाभ अंतरण'
                },
                description: {
                    en: 'Learn about Direct Benefit Transfer system and how it benefits scholarship recipients.',
                    hi: 'प्रत्यक्ष लाभ अंतरण प्रणाली के बारे में जानें और यह छात्रवृत्ति प्राप्तकर्ताओं को कैसे लाभ पहुंचाती है।'
                },
                category: 'dbt',
                language: 'en',
                duration: '6:15',
                thumbnail: '#',
                videoUrl: '#',
                views: 8900,
                uploadDate: '2025-01-12',
                tags: ['dbt', 'benefits', 'government', 'transfer']
            },
            {
                id: 5,
                title: {
                    en: 'Common Problems and Solutions',
                    hi: 'सामान्य समस्याएं और समाधान'
                },
                description: {
                    en: 'Troubleshooting guide for common issues faced during scholarship application and seeding.',
                    hi: 'छात्रवृत्ति आवेदन और सीडिंग के दौरान आने वाली सामान्य समस्याओं के लिए समस्या निवारण गाइड।'
                },
                category: 'troubleshooting',
                language: 'hi',
                duration: '12:45',
                thumbnail: '#',
                videoUrl: '#',
                views: 15300,
                uploadDate: '2025-01-03',
                tags: ['problems', 'solutions', 'help', 'support']
            },
            {
                id: 6,
                title: {
                    en: 'Bank Account Opening for Students',
                    hi: 'छात्रों के लिए बैंक खाता खोलना'
                },
                description: {
                    en: 'Guide on opening a bank account specifically for receiving scholarship benefits.',
                    hi: 'छात्रवृत्ति लाभ प्राप्त करने के लिए विशेष रूप से बैंक खाता खोलने पर गाइड।'
                },
                category: 'application',
                language: 'hi',
                duration: '9:30',
                thumbnail: '#',
                videoUrl: '#',
                views: 11200,
                uploadDate: '2025-01-01',
                tags: ['bank', 'account', 'students', 'scholarship']
            }
        ];

        this.filteredVideos = [...this.videos];
    }

    filterVideos() {
        this.filteredVideos = this.videos.filter(video => {
            const languageMatch = this.currentFilters.language === 'all' || 
                                 video.language === this.currentFilters.language;
            
            const categoryMatch = this.currentFilters.category === 'all' || 
                                 video.category === this.currentFilters.category;

            return languageMatch && categoryMatch;
        });

        this.renderVideos();
    }

    renderVideos() {
        const videosGrid = document.getElementById('videosGrid');
        if (!videosGrid) return;

        if (this.filteredVideos.length === 0) {
            videosGrid.innerHTML = `
                <div class="no-videos">
                    <div class="no-videos-icon">🎥</div>
                    <p data-i18n="videos.noVideos">No videos found matching your criteria</p>
                </div>
            `;
            return;
        }

        videosGrid.innerHTML = this.filteredVideos.map(video => this.createVideoCard(video)).join('');
        
        // Re-apply translations
        if (window.i18nManager) {
            window.i18nManager.applyTranslations();
        }

        // Add event listeners to video cards
        this.attachVideoEventListeners();
    }

    createVideoCard(video) {
        const lang = window.i18nManager ? window.i18nManager.getCurrentLanguage() : 'en';
        const title = video.title[lang] || video.title.en;
        const description = video.description[lang] || video.description.en;

        return `
            <div class="video-card" data-video-id="${video.id}">
                <div class="video-thumbnail">
                    <div class="thumbnail-placeholder">
                        <div class="play-icon">▶️</div>
                        <div class="video-duration">${video.duration}</div>
                    </div>
                </div>
                <div class="video-info">
                    <h4 class="video-title">${title}</h4>
                    <p class="video-description">${description}</p>
                    <div class="video-meta">
                        <div class="video-stats">
                            <span class="video-views">${this.formatViews(video.views)} views</span>
                            <span class="video-date">${this.formatDate(video.uploadDate)}</span>
                        </div>
                        <div class="video-badges">
                            <span class="language-badge ${video.language}">${video.language.toUpperCase()}</span>
                            <span class="category-badge">${this.getCategoryLabel(video.category, lang)}</span>
                        </div>
                    </div>
                </div>
                <div class="video-actions">
                    <button class="btn btn-primary play-video" data-video-id="${video.id}" data-i18n="videos.watchVideo">Watch Video</button>
                </div>
            </div>
        `;
    }

    attachVideoEventListeners() {
        const playButtons = document.querySelectorAll('.play-video');
        const videoCards = document.querySelectorAll('.video-card');

        playButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                const videoId = parseInt(e.target.getAttribute('data-video-id'));
                this.playVideo(videoId);
            });
        });

        videoCards.forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.classList.contains('play-video')) {
                    const videoId = parseInt(card.getAttribute('data-video-id'));
                    this.playVideo(videoId);
                }
            });
        });
    }

    playVideo(videoId) {
        const video = this.videos.find(v => v.id === videoId);
        if (!video) return;

        const lang = window.i18nManager ? window.i18nManager.getCurrentLanguage() : 'en';
        const title = video.title[lang] || video.title.en;
        const description = video.description[lang] || video.description.en;

        // Show video modal
        const modal = document.getElementById('videoModal');
        const videoTitle = document.getElementById('videoTitle');
        const videoContainer = document.getElementById('videoContainer');
        const videoDescription = document.getElementById('videoDescription');
        const videoDuration = document.getElementById('videoDuration');
        const videoLanguage = document.getElementById('videoLanguage');

        if (modal && videoTitle && videoContainer) {
            videoTitle.textContent = title;
            
            // Generate mock video player
            videoContainer.innerHTML = this.generateVideoPlayer(video);
            
            if (videoDescription) {
                videoDescription.textContent = description;
            }
            
            if (videoDuration) {
                videoDuration.textContent = video.duration;
            }
            
            if (videoLanguage) {
                videoLanguage.textContent = video.language.toUpperCase();
            }
            
            modal.classList.add('active');
            
            // Increment view count (mock)
            video.views++;
        }
    }

    generateVideoPlayer(video) {
        // In a real app, this would embed YouTube/Vimeo player
        return `
            <div class="mock-video-player">
                <div class="video-screen">
                    <div class="video-controls">
                        <div class="play-button">▶️</div>
                        <div class="video-title-overlay">${video.title.en}</div>
                    </div>
                    <div class="video-progress">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: 0%"></div>
                        </div>
                        <div class="time-display">0:00 / ${video.duration}</div>
                    </div>
                </div>
                <div class="video-info-panel">
                    <p><strong>Note:</strong> This is a demonstration player. In the actual implementation, 
                    this would be replaced with a real video player (YouTube, Vimeo, or custom video hosting).</p>
                    <p><strong>Video Content:</strong> ${video.description.en}</p>
                    <div class="video-tags">
                        ${video.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    setupModalHandlers() {
        const modal = document.getElementById('videoModal');
        const closeBtn = document.getElementById('videoClose');

        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.closeVideoModal();
            });
        }

        // Close modal on background click
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeVideoModal();
                }
            });
        }

        // Close modal on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeVideoModal();
            }
        });
    }

    closeVideoModal() {
        const modal = document.getElementById('videoModal');
        if (modal) {
            modal.classList.remove('active');
            
            // Stop any playing video
            const videoContainer = document.getElementById('videoContainer');
            if (videoContainer) {
                videoContainer.innerHTML = '';
            }
        }
    }

    getCategoryLabel(category, lang) {
        const labels = {
            seeding: { en: 'Aadhaar Seeding', hi: 'आधार सीडिंग' },
            application: { en: 'Application', hi: 'आवेदन' },
            dbt: { en: 'DBT Process', hi: 'डीबीटी प्रक्रिया' },
            troubleshooting: { en: 'Troubleshooting', hi: 'समस्या निवारण' }
        };
        return labels[category] ? (labels[category][lang] || labels[category].en) : category;
    }

    formatViews(views) {
        if (views >= 1000000) {
            return Math.floor(views / 1000000) + 'M';
        } else if (views >= 1000) {
            return Math.floor(views / 1000) + 'K';
        }
        return views.toString();
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) {
            return 'Today';
        } else if (diffDays === 1) {
            return 'Yesterday';
        } else if (diffDays < 7) {
            return `${diffDays} days ago`;
        } else if (diffDays < 30) {
            return `${Math.floor(diffDays / 7)} weeks ago`;
        } else {
            return date.toLocaleDateString('en-IN', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
            });
        }
    }

    // Method to add new videos (for admin functionality)
    addVideo(videoData) {
        const newVideo = {
            id: Date.now(),
            ...videoData,
            views: 0,
            uploadDate: new Date().toISOString().split('T')[0]
        };
        
        this.videos.unshift(newVideo);
        this.filterVideos();
        return newVideo;
    }

    // Method to get video statistics
    getVideoStats() {
        const stats = {
            totalVideos: this.videos.length,
            totalViews: this.videos.reduce((sum, video) => sum + video.views, 0),
            byLanguage: {},
            byCategory: {}
        };

        this.videos.forEach(video => {
            stats.byLanguage[video.language] = (stats.byLanguage[video.language] || 0) + 1;
            stats.byCategory[video.category] = (stats.byCategory[video.category] || 0) + 1;
        });

        return stats;
    }
}

// Add CSS styles for video components
const videoStyles = document.createElement('style');
videoStyles.textContent = `
    .videos-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
        gap: var(--spacing-lg);
        margin-top: var(--spacing-lg);
    }
    
    .video-card {
        background: var(--gov-white);
        border: 1px solid var(--gov-medium-gray);
        border-radius: var(--border-radius);
        overflow: hidden;
        box-shadow: var(--box-shadow);
        transition: var(--transition);
        cursor: pointer;
    }
    
    .video-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0,0,0,0.15);
    }
    
    .video-thumbnail {
        position: relative;
        aspect-ratio: 16/9;
        background: var(--gov-light-gray);
        overflow: hidden;
    }
    
    .thumbnail-placeholder {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(45deg, #ddd, #eee);
        position: relative;
    }
    
    .play-icon {
        font-size: 48px;
        opacity: 0.8;
    }
    
    .video-duration {
        position: absolute;
        bottom: 8px;
        right: 8px;
        background: rgba(0,0,0,0.8);
        color: white;
        padding: 2px 6px;
        border-radius: 4px;
        font-size: 12px;
    }
    
    .video-info {
        padding: var(--spacing-lg);
    }
    
    .video-title {
        font-size: var(--font-size-large);
        margin-bottom: var(--spacing-sm);
        color: var(--gov-blue);
    }
    
    .video-description {
        color: var(--gov-dark-gray);
        margin-bottom: var(--spacing-md);
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
    
    .video-meta {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: var(--spacing-sm);
    }
    
    .video-stats {
        font-size: var(--font-size-small);
        color: var(--gov-dark-gray);
    }
    
    .video-badges {
        display: flex;
        gap: var(--spacing-xs);
    }
    
    .language-badge, .category-badge {
        padding: var(--spacing-xs) var(--spacing-sm);
        border-radius: 12px;
        font-size: var(--font-size-small);
        font-weight: 600;
    }
    
    .language-badge {
        background: var(--gov-orange);
        color: var(--gov-white);
    }
    
    .category-badge {
        background: var(--gov-light-gray);
        color: var(--gov-text);
    }
    
    .video-actions {
        padding: 0 var(--spacing-lg) var(--spacing-lg);
    }
    
    .mock-video-player {
        width: 100%;
        max-width: 800px;
    }
    
    .video-screen {
        aspect-ratio: 16/9;
        background: #000;
        position: relative;
        border-radius: var(--border-radius);
        overflow: hidden;
    }
    
    .video-controls {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        color: white;
    }
    
    .video-progress {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,0.8);
        padding: var(--spacing-sm);
    }
    
    .video-info-panel {
        padding: var(--spacing-lg);
        background: var(--gov-light-gray);
        margin-top: var(--spacing-md);
        border-radius: var(--border-radius);
    }
    
    .tag {
        display: inline-block;
        background: var(--gov-orange);
        color: white;
        padding: var(--spacing-xs) var(--spacing-sm);
        border-radius: 12px;
        font-size: var(--font-size-small);
        margin-right: var(--spacing-xs);
        margin-bottom: var(--spacing-xs);
    }
    
    .video-filters {
        display: flex;
        gap: var(--spacing-lg);
        margin-bottom: var(--spacing-xl);
        flex-wrap: wrap;
    }
    
    @media (max-width: 768px) {
        .videos-grid {
            grid-template-columns: 1fr;
        }
        
        .video-filters {
            flex-direction: column;
            gap: var(--spacing-md);
        }
        
        .video-meta {
            flex-direction: column;
            align-items: flex-start;
        }
    }
`;
document.head.appendChild(videoStyles);

// Initialize video manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new VideoManager();
});