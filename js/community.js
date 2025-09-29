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
        // Comprehensive resource data for government scholarship portal
        this.resources = [
            // Forms
            {
                id: 1,
                title: { en: 'Scholarship Application Form', hi: 'छात्रवृत्ति आवेदन फॉर्म' },
                description: { en: 'Official application form for SC scholarships with detailed instructions', hi: 'विस्तृत निर्देशों के साथ SC छात्रवृत्ति के लिए आधिकारिक आवेदन फॉर्म' },
                type: 'forms',
                language: 'both',
                format: 'PDF',
                size: '2.5 MB',
                downloadUrl: 'attached_assets/scholarship_application_form.txt',
                previewUrl: '#',
                tags: ['application', 'scholarship', 'form', 'official']
            },
            {
                id: 2,
                title: { en: 'Eligibility Criteria Checklist', hi: 'पात्रता मापदंड चेकलिस्ट' },
                description: { en: 'Complete checklist for scholarship eligibility verification', hi: 'छात्रवृत्ति पात्रता सत्यापन के लिए पूरी चेकलिस्ट' },
                type: 'forms',
                language: 'both',
                format: 'PDF',
                size: '1.2 MB',
                downloadUrl: 'attached_assets/eligibility_checklist.txt',
                previewUrl: '#',
                tags: ['eligibility', 'checklist', 'criteria', 'verification']
            },
            {
                id: 3,
                title: { en: 'Document Verification Form', hi: 'दस्तावेज़ सत्यापन फॉर्म' },
                description: { en: 'Form for uploading and verifying required documents', hi: 'आवश्यक दस्तावेज़ अपलोड और सत्यापन के लिए फॉर्म' },
                type: 'forms',
                language: 'both',
                format: 'PDF',
                size: '1.8 MB',
                downloadUrl: 'attached_assets/document_verification_form.txt',
                previewUrl: '#',
                tags: ['documents', 'verification', 'upload', 'required']
            },
            
            // Templates
            {
                id: 4,
                title: { en: 'Income Certificate Template', hi: 'आय प्रमाण पत्र टेम्प्लेट' },
                description: { en: 'Standard template for income certificate documentation', hi: 'आय प्रमाण पत्र दस्तावेज़ के लिए मानक टेम्प्लेट' },
                type: 'templates',
                language: 'both',
                format: 'DOC',
                size: '456 KB',
                downloadUrl: 'attached_assets/income_certificate_template.txt',
                previewUrl: '#',
                tags: ['income', 'certificate', 'template', 'documentation']
            },
            {
                id: 5,
                title: { en: 'Caste Certificate Template', hi: 'जाति प्रमाण पत्र टेम्प्लेट' },
                description: { en: 'Template for SC caste certificate application', hi: 'SC जाति प्रमाण पत्र आवेदन के लिए टेम्प्लेट' },
                type: 'templates',
                language: 'both',
                format: 'DOC',
                size: '512 KB',
                downloadUrl: 'attached_assets/caste_certificate_template.txt',
                previewUrl: '#',
                tags: ['caste', 'certificate', 'sc', 'template']
            },
            {
                id: 6,
                title: { en: 'SMS Alert Templates', hi: 'SMS अलर्ट टेम्प्लेट' },
                description: { en: 'Pre-designed SMS templates for student notifications', hi: 'छात्र सूचनाओं के लिए पूर्व-डिज़ाइन किए गए SMS टेम्प्लेट' },
                type: 'templates',
                language: 'both',
                format: 'TXT',
                size: '15 KB',
                downloadUrl: 'attached_assets/sms_templates.txt',
                previewUrl: '#',
                tags: ['sms', 'alert', 'template', 'notifications']
            },
            {
                id: 7,
                title: { en: 'Press Release Template', hi: 'प्रेस रिलीज़ टेम्प्लेट' },
                description: { en: 'Template for announcing scholarship programs', hi: 'छात्रवृत्ति कार्यक्रमों की घोषणा के लिए टेम्प्लेट' },
                type: 'templates',
                language: 'both',
                format: 'DOC',
                size: '320 KB',
                downloadUrl: 'attached_assets/press_release_template.txt',
                previewUrl: '#',
                tags: ['press', 'release', 'announcement', 'media']
            },
            
            // Infographics
            {
                id: 8,
                title: { en: 'DBT Seeding Process Infographic', hi: 'DBT सीडिंग प्रक्रिया इन्फोग्राफिक' },
                description: { en: 'Step-by-step visual guide for Aadhaar seeding process', hi: 'आधार सीडिंग प्रक्रिया के लिए चरणबद्ध विज़ुअल गाइड' },
                type: 'infographics',
                language: 'both',
                format: 'PNG',
                size: '1.8 MB',
                downloadUrl: 'attached_assets/dbt_seeding_infographic.txt',
                previewUrl: '#',
                tags: ['seeding', 'aadhaar', 'process', 'visual']
            },
            {
                id: 9,
                title: { en: 'Scholarship Timeline Infographic', hi: 'छात्रवृत्ति समयसीमा इन्फोग्राफिक' },
                description: { en: 'Visual timeline showing scholarship application deadlines', hi: 'छात्रवृत्ति आवेदन की समय सीमा दिखाने वाली विज़ुअल टाइमलाइन' },
                type: 'infographics',
                language: 'both',
                format: 'PNG',
                size: '2.1 MB',
                downloadUrl: 'attached_assets/scholarship_timeline.txt',
                previewUrl: '#',
                tags: ['timeline', 'deadline', 'schedule', 'calendar']
            },
            {
                id: 10,
                title: { en: 'Document Requirements Chart', hi: 'दस्तावेज़ आवश्यकताएं चार्ट' },
                description: { en: 'Visual chart of all required documents for application', hi: 'आवेदन के लिए सभी आवश्यक दस्तावेजों का विज़ुअल चार्ट' },
                type: 'infographics',
                language: 'both',
                format: 'PNG',
                size: '1.5 MB',
                downloadUrl: 'attached_assets/document_requirements_chart.txt',
                previewUrl: '#',
                tags: ['documents', 'requirements', 'chart', 'checklist']
            },
            
            // QR Codes
            {
                id: 11,
                title: { en: 'NSP Portal QR Code', hi: 'NSP पोर्टल QR कोड' },
                description: { en: 'QR code for quick access to National Scholarship Portal', hi: 'राष्ट्रीय छात्रवृत्ति पोर्टल के लिए QR कोड' },
                type: 'qr',
                language: 'both',
                format: 'PNG',
                size: '125 KB',
                downloadUrl: 'attached_assets/nsp_portal_qr.txt',
                previewUrl: '#',
                tags: ['qr', 'nsp', 'portal', 'scholarship']
            },
            {
                id: 12,
                title: { en: 'Bank Account Seeding QR Code', hi: 'बैंक खाता सीडिंग QR कोड' },
                description: { en: 'QR code for quick access to bank account seeding portal', hi: 'बैंक खाता सीडिंग पोर्टल के लिए QR कोड' },
                type: 'qr',
                language: 'both',
                format: 'PNG',
                size: '128 KB',
                downloadUrl: 'attached_assets/bank_seeding_qr.txt',
                previewUrl: '#',
                tags: ['qr', 'bank', 'seeding', 'account']
            },
            {
                id: 13,
                title: { en: 'Help Desk Contact QR', hi: 'हेल्प डेस्क संपर्क QR' },
                description: { en: 'QR code with help desk contact information', hi: 'हेल्प डेस्क संपर्क जानकारी के साथ QR कोड' },
                type: 'qr',
                language: 'both',
                format: 'PNG',
                size: '95 KB',
                downloadUrl: 'attached_assets/help_desk_qr.txt',
                previewUrl: '#',
                tags: ['qr', 'help', 'contact', 'support']
            },
            
            // Guidelines and Announcements
            {
                id: 14,
                title: { en: 'Official Guidelines 2024-25', hi: 'आधिकारिक दिशानिर्देश 2024-25' },
                description: { en: 'Complete guidelines for scholarship scheme 2024-25', hi: 'छात्रवृत्ति योजना 2024-25 के लिए पूर्ण दिशानिर्देश' },
                type: 'guidelines',
                language: 'both',
                format: 'PDF',
                size: '4.2 MB',
                downloadUrl: 'attached_assets/official_guidelines_2024_25.txt',
                previewUrl: '#',
                tags: ['guidelines', 'official', '2024-25', 'rules']
            },
            {
                id: 15,
                title: { en: 'Recent Policy Updates', hi: 'हाल की नीति अपडेट' },
                description: { en: 'Latest policy changes and updates for SC scholarships', hi: 'SC छात्रवृत्ति के लिए नीतिगत बदलाव और अपडेट' },
                type: 'announcements',
                language: 'both',
                format: 'PDF',
                size: '1.8 MB',
                downloadUrl: 'attached_assets/policy_updates.txt',
                previewUrl: '#',
                tags: ['policy', 'updates', 'changes', 'announcements']
            },
            {
                id: 16,
                title: { en: 'FAQ Document', hi: 'FAQ दस्तावेज़' },
                description: { en: 'Frequently asked questions and answers', hi: 'अक्सर पूछे जाने वाले प्रश्न और उत्तर' },
                type: 'guidelines',
                language: 'both',
                format: 'PDF',
                size: '2.1 MB',
                downloadUrl: 'attached_assets/faq_document.txt',
                previewUrl: '#',
                tags: ['faq', 'questions', 'answers', 'help']
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
            qr: '📱',
            guidelines: '📖',
            announcements: '📢'
        };
        return icons[type] || '📄';
    }

    getTypeLabel(type, lang) {
        const labels = {
            forms: { en: 'Form', hi: 'फॉर्म' },
            templates: { en: 'Template', hi: 'टेम्प्लेट' },
            infographics: { en: 'Infographic', hi: 'इन्फोग्राफिक' },
            qr: { en: 'QR Code', hi: 'QR कोड' },
            guidelines: { en: 'Guidelines', hi: 'दिशानिर्देश' },
            announcements: { en: 'Announcements', hi: 'घोषणाएं' }
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
                        <div class="form-section">
                            <h4>${lang === 'hi' ? 'व्यक्तिगत जानकारी' : 'Personal Information'}</h4>
                            <div class="form-field">
                                <label>${lang === 'hi' ? 'छात्र का नाम' : 'Student Name'}:</label>
                                <input type="text" placeholder="${lang === 'hi' ? 'अपना पूरा नाम दर्ज करें' : 'Enter your full name'}" disabled>
                            </div>
                            <div class="form-field">
                                <label>${lang === 'hi' ? 'आधार संख्या' : 'Aadhaar Number'}:</label>
                                <input type="text" placeholder="XXXX-XXXX-XXXX" disabled>
                            </div>
                            <div class="form-field">
                                <label>${lang === 'hi' ? 'जन्म तिथि' : 'Date of Birth'}:</label>
                                <input type="date" disabled>
                            </div>
                        </div>
                        <div class="form-section">
                            <h4>${lang === 'hi' ? 'बैंक विवरण' : 'Bank Details'}</h4>
                            <div class="form-field">
                                <label>${lang === 'hi' ? 'बैंक खाता संख्या' : 'Bank Account Number'}:</label>
                                <input type="text" placeholder="${lang === 'hi' ? 'खाता संख्या दर्ज करें' : 'Enter account number'}" disabled>
                            </div>
                            <div class="form-field">
                                <label>${lang === 'hi' ? 'IFSC कोड' : 'IFSC Code'}:</label>
                                <input type="text" placeholder="ABCD0123456" disabled>
                            </div>
                        </div>
                        <p class="preview-note">${lang === 'hi' ? 'यह केवल पूर्वावलोकन है - पूरा फॉर्म डाउनलोड करें' : 'This is a preview only - download complete form'}</p>
                    </div>
                `;
            case 'templates':
                return `
                    <div class="template-preview">
                        <h3>${resource.title[lang]}</h3>
                        <div class="template-content">
                            <div class="letterhead">
                                <h4>${lang === 'hi' ? 'सरकारी प्रमाण पत्र टेम्प्लेट' : 'Government Certificate Template'}</h4>
                                <p>${lang === 'hi' ? 'भारत सरकार' : 'Government of India'}</p>
                            </div>
                            <div class="template-body">
                                <p><strong>${lang === 'hi' ? 'प्रमाणित किया जाता है कि:' : 'This is to certify that:'}</strong></p>
                                <p>[${lang === 'hi' ? 'नाम' : 'Name'}] _________________</p>
                                <p>[${lang === 'hi' ? 'पिता का नाम' : 'Father\'s Name'}] _________________</p>
                                <p>[${lang === 'hi' ? 'पता' : 'Address'}] _________________</p>
                                <br>
                                <p>${lang === 'hi' ? 'अधिकारी की मुहर एवं हस्ताक्षर' : 'Officer Seal & Signature'}</p>
                            </div>
                        </div>
                        <p class="preview-note">${lang === 'hi' ? 'पूरा टेम्प्लेट डाउनलोड करें' : 'Download complete template'}</p>
                    </div>
                `;
            case 'infographics':
                return `
                    <div class="infographic-preview">
                        <h3>${resource.title[lang]}</h3>
                        <div class="infographic-steps">
                            <div class="step-visual">
                                <div class="step-number">1</div>
                                <div class="step-icon">🏦</div>
                                <h4>${lang === 'hi' ? 'बैंक में जाएं' : 'Visit Bank'}</h4>
                                <p>${lang === 'hi' ? 'नजदीकी बैंक शाखा में जाएं' : 'Visit nearest bank branch'}</p>
                            </div>
                            <div class="step-visual">
                                <div class="step-number">2</div>
                                <div class="step-icon">📝</div>
                                <h4>${lang === 'hi' ? 'फॉर्म भरें' : 'Fill Form'}</h4>
                                <p>${lang === 'hi' ? 'आधार सीडिंग फॉर्म भरें' : 'Fill Aadhaar seeding form'}</p>
                            </div>
                            <div class="step-visual">
                                <div class="step-number">3</div>
                                <div class="step-icon">📄</div>
                                <h4>${lang === 'hi' ? 'दस्तावेज़ जमा करें' : 'Submit Documents'}</h4>
                                <p>${lang === 'hi' ? 'आधार कार्ड और पासबुक जमा करें' : 'Submit Aadhaar and passbook'}</p>
                            </div>
                            <div class="step-visual">
                                <div class="step-number">4</div>
                                <div class="step-icon">✅</div>
                                <h4>${lang === 'hi' ? 'सत्यापन पूर्ण' : 'Verification Complete'}</h4>
                                <p>${lang === 'hi' ? 'सीडिंग पूर्ण होने का SMS प्राप्त करें' : 'Receive SMS confirmation'}</p>
                            </div>
                        </div>
                        <p class="preview-note">${lang === 'hi' ? 'पूर्ण इन्फोग्राफिक डाउनलोड करें' : 'Download complete infographic'}</p>
                    </div>
                `;
            case 'qr':
                return `
                    <div class="qr-preview">
                        <h3>${resource.title[lang]}</h3>
                        <div class="qr-code">
                            <div class="qr-placeholder">
                                <div class="qr-pattern">
                                    ▅▅▅ ▅ ▅▅▅<br>
                                    ▅ ▅ ▅ ▅ ▅<br>
                                    ▅▅▅ ▅ ▅▅▅<br>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>
                                    ▅ ▅▅ ▅ ▅▅<br>
                                    ▅▅▅ ▅ ▅▅▅
                                </div>
                            </div>
                        </div>
                        <div class="qr-info">
                            <p><strong>${lang === 'hi' ? 'QR कोड की जानकारी:' : 'QR Code Information:'}</strong></p>
                            <p>${lang === 'hi' ? '• तुरंत पहुंच के लिए स्कैन करें' : '• Scan for instant access'}</p>
                            <p>${lang === 'hi' ? '• सभी मोबाइल डिवाइस के साथ संगत' : '• Compatible with all mobile devices'}</p>
                            <p>${lang === 'hi' ? '• सुरक्षित सरकारी लिंक' : '• Secure government link'}</p>
                        </div>
                        <p class="preview-note">${lang === 'hi' ? 'उच्च गुणवत्ता QR कोड डाउनलोड करें' : 'Download high-quality QR code'}</p>
                    </div>
                `;
            case 'guidelines':
                return `
                    <div class="guidelines-preview">
                        <h3>${resource.title[lang]}</h3>
                        <div class="guidelines-content">
                            <div class="guidelines-section">
                                <h4>${lang === 'hi' ? '1. पात्रता मापदंड' : '1. Eligibility Criteria'}</h4>
                                <ul>
                                    <li>${lang === 'hi' ? 'अनुसूचित जाति का प्रमाण पत्र आवश्यक' : 'SC certificate required'}</li>
                                    <li>${lang === 'hi' ? 'पारिवारिक आय सीमा: ₹2.5 लाख प्रति वर्ष' : 'Family income limit: ₹2.5 lakhs per annum'}</li>
                                    <li>${lang === 'hi' ? 'न्यूनतम 50% अंक आवश्यक' : 'Minimum 50% marks required'}</li>
                                </ul>
                            </div>
                            <div class="guidelines-section">
                                <h4>${lang === 'hi' ? '2. आवश्यक दस्तावेज़' : '2. Required Documents'}</h4>
                                <ul>
                                    <li>${lang === 'hi' ? 'आधार कार्ड की प्रति' : 'Copy of Aadhaar Card'}</li>
                                    <li>${lang === 'hi' ? 'आय प्रमाण पत्र' : 'Income Certificate'}</li>
                                    <li>${lang === 'hi' ? 'जाति प्रमाण पत्र' : 'Caste Certificate'}</li>
                                    <li>${lang === 'hi' ? 'बैंक खाता विवरण' : 'Bank Account Details'}</li>
                                </ul>
                            </div>
                            <div class="guidelines-section">
                                <h4>${lang === 'hi' ? '3. आवेदन प्रक्रिया' : '3. Application Process'}</h4>
                                <p>${lang === 'hi' ? 'NSP पोर्टल पर ऑनलाइन आवेदन करें और सभी आवश्यक दस्तावेज़ अपलोड करें।' : 'Apply online on NSP portal and upload all required documents.'}</p>
                            </div>
                        </div>
                        <p class="preview-note">${lang === 'hi' ? 'पूर्ण दिशानिर्देश डाउनलोड करें' : 'Download complete guidelines'}</p>
                    </div>
                `;
            case 'announcements':
                return `
                    <div class="announcements-preview">
                        <h3>${resource.title[lang]}</h3>
                        <div class="announcement-content">
                            <div class="announcement-header">
                                <div class="announcement-date">${lang === 'hi' ? 'दिनांक: 15 सितंबर 2024' : 'Date: September 15, 2024'}</div>
                                <div class="announcement-ref">${lang === 'hi' ? 'संदर्भ संख्या: SC/2024/001' : 'Ref No: SC/2024/001'}</div>
                            </div>
                            <div class="announcement-body">
                                <h4>${lang === 'hi' ? 'महत्वपूर्ण सूचना' : 'Important Notice'}</h4>
                                <p>${lang === 'hi' ? 'अनुसूचित जाति छात्रवृत्ति योजना 2024-25 के लिए आवेदन प्रक्रिया शुरू की गई है।' : 'Application process for SC Scholarship Scheme 2024-25 has been initiated.'}</p>
                                <h5>${lang === 'hi' ? 'मुख्य बिंदु:' : 'Key Points:'}</h5>
                                <ul>
                                    <li>${lang === 'hi' ? 'आवेदन की अंतिम तिथि: 31 अक्टूबर 2024' : 'Last date for application: October 31, 2024'}</li>
                                    <li>${lang === 'hi' ? 'ऑनलाइन आवेदन केवल NSP पोर्टल पर' : 'Online application only on NSP portal'}</li>
                                    <li>${lang === 'hi' ? 'सभी दस्तावेज़ PDF फॉर्मेट में अपलोड करें' : 'Upload all documents in PDF format'}</li>
                                </ul>
                            </div>
                        </div>
                        <p class="preview-note">${lang === 'hi' ? 'पूर्ण घोषणा डाउनलोड करें' : 'Download complete announcement'}</p>
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
                        <p class="preview-note">${lang === 'hi' ? 'डाउनलोड करने के लिए क्लिक करें' : 'Click to download'}</p>
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