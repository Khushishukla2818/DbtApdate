// Community resources management
class CommunityManager {
    constructor() {
        this.resources = [];
        this.filteredResources = [];
        this.currentPage = 1;
        this.itemsPerPage = 12;
        this.currentFilter = 'all';
        this.searchTerm = '';
        this.init();
    }

    init() {
        this.loadResources();
        this.setupEventListeners();
        this.renderResources();
    }

    setupEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('resourceSearch');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchTerm = e.target.value.toLowerCase();
                this.filterResources();
            });
        }

        // Filter chips
        const filterChips = document.querySelectorAll('.filter-chip');
        filterChips.forEach(chip => {
            chip.addEventListener('click', (e) => {
                // Update active chip
                filterChips.forEach(c => c.classList.remove('active'));
                e.target.classList.add('active');
                
                this.currentFilter = e.target.getAttribute('data-filter');
                this.filterResources();
            });
        });

        // Modal handlers
        this.setupModalHandlers();
    }

    loadResources() {
        // Mock resource data - in real app would fetch from server
        this.resources = [
            {
                id: 1,
                title: { en: 'Scholarship Application Form', hi: 'छात्रवृत्ति आवेदन फॉर्म' },
                description: { en: 'Official application form for SC scholarships', hi: 'SC छात्रवृत्ति के लिए आधिकारिक आवेदन फॉर्म' },
                type: 'forms',
                language: 'both',
                format: 'PDF',
                size: '2.5 MB',
                downloadUrl: '#',
                previewUrl: '#',
                tags: ['application', 'scholarship', 'form']
            },
            {
                id: 2,
                title: { en: 'DBT Seeding Process Infographic', hi: 'DBT सीडिंग प्रक्रिया इन्फोग्राफिक' },
                description: { en: 'Visual guide for Aadhaar seeding process', hi: 'आधार सीडिंग प्रक्रिया के लिए विज़ुअल गाइड' },
                type: 'infographics',
                language: 'both',
                format: 'PNG',
                size: '1.8 MB',
                downloadUrl: '#',
                previewUrl: '#',
                tags: ['seeding', 'aadhaar', 'process']
            },
            {
                id: 3,
                title: { en: 'Income Certificate Template', hi: 'आय प्रमाण पत्र टेम्प्लेट' },
                description: { en: 'Template for income certificate documentation', hi: 'आय प्रमाण पत्र दस्तावेज़ के लिए टेम्प्लेट' },
                type: 'templates',
                language: 'both',
                format: 'DOC',
                size: '456 KB',
                downloadUrl: '#',
                previewUrl: '#',
                tags: ['income', 'certificate', 'template']
            },
            {
                id: 4,
                title: { en: 'Bank Account Seeding QR Code', hi: 'बैंक खाता सीडिंग QR कोड' },
                description: { en: 'QR code for quick access to bank seeding portal', hi: 'बैंक सीडिंग पोर्टल के लिए QR कोड' },
                type: 'qr',
                language: 'both',
                format: 'PNG',
                size: '125 KB',
                downloadUrl: '#',
                previewUrl: '#',
                tags: ['qr', 'bank', 'seeding']
            },
            {
                id: 5,
                title: { en: 'Eligibility Criteria Checklist', hi: 'पात्रता मापदंड चेकलिस्ट' },
                description: { en: 'Complete checklist for scholarship eligibility', hi: 'छात्रवृत्ति पात्रता के लिए पूरी चेकलिस्ट' },
                type: 'forms',
                language: 'both',
                format: 'PDF',
                size: '1.2 MB',
                downloadUrl: '#',
                previewUrl: '#',
                tags: ['eligibility', 'checklist', 'criteria']
            },
            {
                id: 6,
                title: { en: 'SMS Alert Templates', hi: 'SMS अलर्ट टेम्प्लेट' },
                description: { en: 'Pre-designed SMS templates for notifications', hi: 'सूचनाओं के लिए पूर्व-डिज़ाइन किए गए SMS टेम्प्लेट' },
                type: 'templates',
                language: 'both',
                format: 'TXT',
                size: '15 KB',
                downloadUrl: '#',
                previewUrl: '#',
                tags: ['sms', 'alert', 'template']
            }
        ];

        this.filteredResources = [...this.resources];
    }

    filterResources() {
        this.filteredResources = this.resources.filter(resource => {
            // Filter by type
            const typeMatch = this.currentFilter === 'all' || resource.type === this.currentFilter;
            
            // Filter by search term
            const lang = window.i18nManager ? window.i18nManager.getCurrentLanguage() : 'en';
            const title = resource.title[lang] || resource.title.en;
            const description = resource.description[lang] || resource.description.en;
            const searchMatch = this.searchTerm === '' || 
                               title.toLowerCase().includes(this.searchTerm) ||
                               description.toLowerCase().includes(this.searchTerm) ||
                               resource.tags.some(tag => tag.toLowerCase().includes(this.searchTerm));

            return typeMatch && searchMatch;
        });

        this.currentPage = 1;
        this.renderResources();
        this.renderPagination();
    }

    renderResources() {
        const grid = document.getElementById('resourcesGrid');
        if (!grid) return;

        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        const pageResources = this.filteredResources.slice(startIndex, endIndex);

        if (pageResources.length === 0) {
            grid.innerHTML = `
                <div class="no-resources">
                    <div class="no-resources-icon">📄</div>
                    <p data-i18n="community.noResources">No resources found matching your criteria</p>
                </div>
            `;
            return;
        }

        grid.innerHTML = pageResources.map(resource => this.createResourceCard(resource)).join('');
        
        // Re-apply translations
        if (window.i18nManager) {
            window.i18nManager.applyTranslations();
        }

        // Add event listeners to new cards
        this.attachResourceEventListeners();
    }

    createResourceCard(resource) {
        const lang = window.i18nManager ? window.i18nManager.getCurrentLanguage() : 'en';
        const title = resource.title[lang] || resource.title.en;
        const description = resource.description[lang] || resource.description.en;

        return `
            <div class="resource-card" data-resource-id="${resource.id}">
                <div class="resource-header">
                    <div class="resource-type">${this.getTypeIcon(resource.type)} ${this.getTypeLabel(resource.type, lang)}</div>
                    <div class="resource-format">${resource.format}</div>
                </div>
                <div class="resource-content">
                    <h4 class="resource-title">${title}</h4>
                    <p class="resource-description">${description}</p>
                    <div class="resource-meta">
                        <span class="resource-size">${resource.size}</span>
                        <span class="resource-language">${this.getLanguageLabel(resource.language, lang)}</span>
                    </div>
                </div>
                <div class="resource-actions">
                    <button class="btn btn-secondary btn-sm preview-btn" data-resource-id="${resource.id}" data-i18n="messages.preview">Preview</button>
                    <button class="btn btn-primary btn-sm download-btn" data-resource-id="${resource.id}" data-i18n="messages.download">Download</button>
                </div>
            </div>
        `;
    }

    getTypeIcon(type) {
        const icons = {
            forms: '📋',
            templates: '📝',
            infographics: '📊',
            qr: '📱'
        };
        return icons[type] || '📄';
    }

    getTypeLabel(type, lang) {
        const labels = {
            forms: { en: 'Form', hi: 'फॉर्म' },
            templates: { en: 'Template', hi: 'टेम्प्लेट' },
            infographics: { en: 'Infographic', hi: 'इन्फोग्राफिक' },
            qr: { en: 'QR Code', hi: 'QR कोड' }
        };
        return labels[type] ? (labels[type][lang] || labels[type].en) : type;
    }

    getLanguageLabel(language, lang) {
        const labels = {
            both: { en: 'English/Hindi', hi: 'अंग्रेजी/हिंदी' },
            en: { en: 'English', hi: 'अंग्रेजी' },
            hi: { en: 'Hindi', hi: 'हिंदी' }
        };
        return labels[language] ? (labels[language][lang] || labels[language].en) : language;
    }

    attachResourceEventListeners() {
        // Preview buttons
        const previewBtns = document.querySelectorAll('.preview-btn');
        previewBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const resourceId = parseInt(e.target.getAttribute('data-resource-id'));
                this.previewResource(resourceId);
            });
        });

        // Download buttons
        const downloadBtns = document.querySelectorAll('.download-btn');
        downloadBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const resourceId = parseInt(e.target.getAttribute('data-resource-id'));
                this.downloadResource(resourceId);
            });
        });
    }

    previewResource(resourceId) {
        const resource = this.resources.find(r => r.id === resourceId);
        if (!resource) return;

        const lang = window.i18nManager ? window.i18nManager.getCurrentLanguage() : 'en';
        const title = resource.title[lang] || resource.title.en;
        
        // Show preview modal
        const modal = document.getElementById('previewModal');
        const previewTitle = document.getElementById('previewTitle');
        const previewContent = document.getElementById('previewContent');
        
        if (modal && previewTitle && previewContent) {
            previewTitle.textContent = title;
            
            // Generate mock preview content based on resource type
            previewContent.innerHTML = this.generatePreviewContent(resource, lang);
            
            modal.classList.add('active');
        }
    }

    generatePreviewContent(resource, lang) {
        switch (resource.type) {
            case 'forms':
                return `
                    <div class="form-preview">
                        <h3>${resource.title[lang]}</h3>
                        <div class="form-field">
                            <label>Student Name / छात्र का नाम:</label>
                            <input type="text" placeholder="Enter your name / अपना नाम दर्ज करें" disabled>
                        </div>
                        <div class="form-field">
                            <label>Aadhaar Number / आधार संख्या:</label>
                            <input type="text" placeholder="XXXX-XXXX-XXXX" disabled>
                        </div>
                        <div class="form-field">
                            <label>Bank Account Number / बैंक खाता संख्या:</label>
                            <input type="text" placeholder="Enter account number / खाता संख्या दर्ज करें" disabled>
                        </div>
                        <p class="preview-note">${lang === 'hi' ? 'यह केवल पूर्वावलोकन है' : 'This is a preview only'}</p>
                    </div>
                `;
            case 'infographics':
                return `
                    <div class="infographic-preview">
                        <div class="step-visual">
                            <h4>Step 1: Visit Bank</h4>
                            <div class="step-icon">🏦</div>
                        </div>
                        <div class="step-visual">
                            <h4>Step 2: Fill Form</h4>
                            <div class="step-icon">📝</div>
                        </div>
                        <div class="step-visual">
                            <h4>Step 3: Submit Documents</h4>
                            <div class="step-icon">📄</div>
                        </div>
                        <p class="preview-note">${lang === 'hi' ? 'पूर्ण इन्फोग्राफिक डाउनलोड करें' : 'Download complete infographic'}</p>
                    </div>
                `;
            case 'qr':
                return `
                    <div class="qr-preview">
                        <div class="qr-code">
                            <div class="qr-placeholder">
                                <div class="qr-pattern"></div>
                                QR Code
                            </div>
                        </div>
                        <p>${lang === 'hi' ? 'स्कैन करके बैंक पोर्टल पर जाएं' : 'Scan to visit bank portal'}</p>
                    </div>
                `;
            default:
                return `
                    <div class="document-preview">
                        <div class="document-icon">📄</div>
                        <h4>${resource.title[lang]}</h4>
                        <p>${resource.description[lang]}</p>
                        <div class="document-info">
                            <span>Format: ${resource.format}</span>
                            <span>Size: ${resource.size}</span>
                        </div>
                    </div>
                `;
        }
    }

    downloadResource(resourceId) {
        const resource = this.resources.find(r => r.id === resourceId);
        if (!resource) return;

        // In a real application, this would trigger an actual download
        const lang = window.i18nManager ? window.i18nManager.getCurrentLanguage() : 'en';
        const message = lang === 'hi' 
            ? `डाउनलोड शुरू: ${resource.title[lang]}`
            : `Download started: ${resource.title[lang]}`;
        
        // Show download notification
        this.showNotification(message, 'success');
        
        // Simulate download delay
        setTimeout(() => {
            const completeMessage = lang === 'hi' 
                ? 'डाउनलोड पूर्ण!' 
                : 'Download complete!';
            this.showNotification(completeMessage, 'success');
        }, 2000);
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Style the notification
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? 'var(--gov-green)' : 'var(--gov-orange)'};
            color: white;
            padding: var(--spacing-md);
            border-radius: var(--border-radius);
            z-index: 1000;
            animation: slideIn 0.3s ease-out;
        `;
        
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    renderPagination() {
        const pagination = document.getElementById('pagination');
        if (!pagination) return;

        const totalPages = Math.ceil(this.filteredResources.length / this.itemsPerPage);
        
        if (totalPages <= 1) {
            pagination.innerHTML = '';
            return;
        }

        let paginationHTML = '';
        
        // Previous button
        if (this.currentPage > 1) {
            paginationHTML += `<button class="page-btn" data-page="${this.currentPage - 1}">‹</button>`;
        }
        
        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            if (i === this.currentPage) {
                paginationHTML += `<button class="page-btn active" data-page="${i}">${i}</button>`;
            } else if (i === 1 || i === totalPages || Math.abs(i - this.currentPage) <= 2) {
                paginationHTML += `<button class="page-btn" data-page="${i}">${i}</button>`;
            } else if (i === this.currentPage - 3 || i === this.currentPage + 3) {
                paginationHTML += `<span class="page-ellipsis">...</span>`;
            }
        }
        
        // Next button
        if (this.currentPage < totalPages) {
            paginationHTML += `<button class="page-btn" data-page="${this.currentPage + 1}">›</button>`;
        }
        
        pagination.innerHTML = paginationHTML;
        
        // Add event listeners
        const pageButtons = pagination.querySelectorAll('.page-btn');
        pageButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.currentPage = parseInt(e.target.getAttribute('data-page'));
                this.renderResources();
                this.renderPagination();
            });
        });
    }

    setupModalHandlers() {
        const modal = document.getElementById('previewModal');
        const closeBtn = document.getElementById('previewClose');
        const closePreviewBtn = document.getElementById('closePreview');
        const downloadBtn = document.getElementById('downloadBtn');

        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                modal.classList.remove('active');
            });
        }

        if (closePreviewBtn) {
            closePreviewBtn.addEventListener('click', () => {
                modal.classList.remove('active');
            });
        }

        if (downloadBtn) {
            downloadBtn.addEventListener('click', () => {
                // Download current preview resource
                modal.classList.remove('active');
            });
        }

        // Close modal on background click
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('active');
                }
            });
        }
    }
}

// Add CSS for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); }
        to { transform: translateX(0); }
    }
    @keyframes slideOut {
        from { transform: translateX(0); }
        to { transform: translateX(100%); }
    }
    .resource-card {
        background: var(--gov-white);
        border: 1px solid var(--gov-medium-gray);
        border-radius: var(--border-radius);
        padding: var(--spacing-lg);
        box-shadow: var(--box-shadow);
        transition: var(--transition);
    }
    .resource-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0,0,0,0.15);
    }
    .resources-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: var(--spacing-lg);
    }
    .filter-chip {
        padding: var(--spacing-sm) var(--spacing-md);
        border: 1px solid var(--gov-medium-gray);
        background: var(--gov-white);
        border-radius: 20px;
        cursor: pointer;
        transition: var(--transition);
    }
    .filter-chip.active {
        background: var(--gov-orange);
        color: var(--gov-white);
        border-color: var(--gov-orange);
    }
    .pagination {
        display: flex;
        justify-content: center;
        gap: var(--spacing-sm);
        margin-top: var(--spacing-xl);
    }
    .page-btn {
        padding: var(--spacing-sm) var(--spacing-md);
        border: 1px solid var(--gov-medium-gray);
        background: var(--gov-white);
        cursor: pointer;
        border-radius: var(--border-radius);
    }
    .page-btn.active {
        background: var(--gov-orange);
        color: var(--gov-white);
    }
`;
document.head.appendChild(style);

// Initialize community manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CommunityManager();
});