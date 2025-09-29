// Main JavaScript functionality for the government website
class GovernmentWebsite {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadDynamicContent();
        this.setupAccessibility();
    }

    setupEventListeners() {
        // Mobile menu toggle (if needed)
        this.setupMobileMenu();
        
        // Smooth scrolling for anchor links
        this.setupSmoothScrolling();
        
        // Form validations
        this.setupFormValidations();
        
        // Modal handlers
        this.setupModals();
    }

    setupMobileMenu() {
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        const navList = document.querySelector('.nav-list');
        
        if (mobileToggle && navList) {
            mobileToggle.addEventListener('click', () => {
                navList.classList.toggle('mobile-active');
            });
        }
    }

    setupSmoothScrolling() {
        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                const targetId = link.getAttribute('href').substring(1);
                const target = document.getElementById(targetId);
                
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    setupFormValidations() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                if (!this.validateForm(form)) {
                    e.preventDefault();
                }
            });
        });
    }

    validateForm(form) {
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                this.showFieldError(field, 'This field is required');
                isValid = false;
            } else {
                this.clearFieldError(field);
            }
        });

        return isValid;
    }

    showFieldError(field, message) {
        this.clearFieldError(field);
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        field.parentNode.insertBefore(errorDiv, field.nextSibling);
        field.classList.add('error');
    }

    clearFieldError(field) {
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
        field.classList.remove('error');
    }

    setupModals() {
        const modalTriggers = document.querySelectorAll('[data-modal]');
        modalTriggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                const modalId = trigger.getAttribute('data-modal');
                this.openModal(modalId);
            });
        });

        const modalCloses = document.querySelectorAll('.modal-close, .modal-overlay');
        modalCloses.forEach(close => {
            close.addEventListener('click', (e) => {
                if (e.target === close) {
                    this.closeModal();
                }
            });
        });

        // Close modal on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });
    }

    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    closeModal() {
        const activeModal = document.querySelector('.modal.active');
        if (activeModal) {
            activeModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    loadDynamicContent() {
        this.loadRecentUpdates();
        this.loadFAQs();
    }

    async loadRecentUpdates() {
        const container = document.getElementById('updatesCarousel');
        if (!container) return;

        try {
            // Load updates from JSON file first, then fall back to default
            let updates;
            try {
                const response = await fetch('data/updates.json');
                if (response.ok) {
                    updates = await response.json();
                } else {
                    throw new Error('Failed to fetch updates');
                }
            } catch {
                // Fallback to enhanced mock data
                updates = [
                    {
                        id: 1,
                        date: '2025-01-20',
                        title: { 
                            en: '₹1,200 Crore disbursed to 2.1 Lakh SC students nationwide', 
                            hi: 'देशभर में 2.1 लाख SC छात्रों को ₹1,200 करोड़ का वितरण'
                        },
                        description: { 
                            en: 'Record-breaking scholarship disbursement through DBT system completed successfully with 99.2% success rate.', 
                            hi: 'DBT सिस्टम के माध्यम से रिकॉर्ड तोड़ छात्रवृत्ति वितरण 99.2% सफलता दर के साथ पूरा हुआ।'
                        },
                        category: 'disbursement'
                    },
                    {
                        id: 2,
                        date: '2025-01-15',
                        title: { 
                            en: 'New AI-powered Aadhaar seeding verification system launched', 
                            hi: 'नई AI-संचालित आधार सीडिंग सत्यापन प्रणाली शुरू'
                        },
                        description: { 
                            en: 'Advanced verification reduces processing time by 75% and ensures 100% accuracy in seeding status.', 
                            hi: 'उन्नत सत्यापन प्रसंस्करण समय को 75% कम करता है और सीडिंग स्थिति में 100% सटीकता सुनिश्चित करता है।'
                        },
                        category: 'technology'
                    },
                    {
                        id: 3,
                        date: '2025-01-10',
                        title: { 
                            en: 'Mobile app now supports 22 Indian languages including sign language', 
                            hi: 'मोबाइल ऐप अब साइन लैंग्वेज सहित 22 भारतीय भाषाओं का समर्थन करता है'
                        },
                        description: { 
                            en: 'Enhanced accessibility features make scholarship applications easier for students with disabilities.', 
                            hi: 'बेहतर पहुंच सुविधाएं विकलांग छात्रों के लिए छात्रवृत्ति आवेदन को आसान बनाती हैं।'
                        },
                        category: 'accessibility'
                    },
                    {
                        id: 4,
                        date: '2025-01-05',
                        title: { 
                            en: 'Digital India initiative: 50,000 Common Service Centers now support scholarship applications', 
                            hi: 'डिजिटल इंडिया पहल: 50,000 कॉमन सर्विस सेंटर अब छात्रवृत्ति आवेदनों का समर्थन करते हैं'
                        },
                        description: { 
                            en: 'Rural students can now apply for scholarships at their nearest CSC with assisted application support.', 
                            hi: 'ग्रामीण छात्र अब अपने निकटतम CSC में सहायक आवेदन समर्थन के साथ छात्रवृत्ति के लिए आवेदन कर सकते हैं।'
                        },
                        category: 'rural-access'
                    },
                    {
                        id: 5,
                        date: '2024-12-28',
                        title: { 
                            en: 'Blockchain-based certificate verification system prevents scholarship fraud', 
                            hi: 'ब्लॉकचेन-आधारित प्रमाणपत्र सत्यापन प्रणाली छात्रवृत्ति धोखाधड़ी को रोकती है'
                        },
                        description: { 
                            en: 'New technology ensures tamper-proof academic certificates and reduces fraudulent applications by 95%.', 
                            hi: 'नई तकनीक छेड़छाड़-रोधी शैक्षणिक प्रमाणपत्र सुनिश्चित करती है और धोखाधड़ी वाले आवेदनों को 95% कम करती है।'
                        },
                        category: 'security'
                    }
                ];
            }

            const lang = window.i18nManager ? window.i18nManager.getCurrentLanguage() : 'en';
            
            container.innerHTML = updates.map((update, index) => `
                <div class="update-item" data-index="${index}">
                    <div class="update-date">${new Date(update.date).toLocaleDateString('en-IN', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                    })}</div>
                    <h4>${update.title[lang] || update.title.en}</h4>
                    <p>${update.description[lang] || update.description.en}</p>
                </div>
            `).join('');

            // Setup carousel navigation
            this.setupCarouselNavigation(updates.length);

            // Re-apply translations after loading content
            if (window.i18nManager) {
                window.i18nManager.applyTranslations();
            }
        } catch (error) {
            console.error('Failed to load updates:', error);
            container.innerHTML = '<div class="update-item"><p>Unable to load updates at this time.</p></div>';
        }
    }

    async loadFAQs() {
        const container = document.getElementById('faqAccordion');
        if (!container) return;

        try {
            // Mock FAQ data
            const faqs = [
                {
                    id: 1,
                    question: { en: 'What is DBT?', hi: 'DBT क्या है?' },
                    answer: { en: 'Direct Benefit Transfer is a government initiative to transfer subsidies directly to beneficiaries.', hi: 'प्रत्यक्ष लाभ अंतरण सरकार की एक पहल है जो सब्सिडी सीधे लाभार्थियों को स्थानांतरित करती है।' }
                },
                {
                    id: 2,
                    question: { en: 'How do I check my seeding status?', hi: 'मैं अपनी सीडिंग स्थिति कैसे जांच सकता हूं?' },
                    answer: { en: 'You can check your seeding status on your bank\'s online portal or visit the nearest branch.', hi: 'आप अपने बैंक के ऑनलाइन पोर्टल पर या निकटतम शाखा में जाकर अपनी सीडिंग स्थिति जांच सकते हैं।' }
                }
            ];

            container.innerHTML = faqs.map(faq => `
                <div class="faq-item">
                    <div class="faq-question" data-faq="${faq.id}">
                        <span data-i18n="faqs.${faq.id}.question">${faq.question.en}</span>
                        <span class="faq-icon">+</span>
                    </div>
                    <div class="faq-answer" data-faq-answer="${faq.id}">
                        <p data-i18n="faqs.${faq.id}.answer">${faq.answer.en}</p>
                    </div>
                </div>
            `).join('');

            // Setup FAQ interactions
            this.setupFAQInteractions();

            // Re-apply translations
            if (window.i18nManager) {
                window.i18nManager.applyTranslations();
            }
        } catch (error) {
            console.error('Failed to load FAQs:', error);
        }
    }

    setupFAQInteractions() {
        const faqQuestions = document.querySelectorAll('.faq-question');
        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                const faqId = question.getAttribute('data-faq');
                const answer = document.querySelector(`[data-faq-answer="${faqId}"]`);
                const icon = question.querySelector('.faq-icon');
                
                if (answer.classList.contains('active')) {
                    answer.classList.remove('active');
                    question.classList.remove('active');
                    icon.textContent = '+';
                } else {
                    // Close all other FAQs
                    document.querySelectorAll('.faq-answer.active').forEach(a => a.classList.remove('active'));
                    document.querySelectorAll('.faq-question.active').forEach(q => q.classList.remove('active'));
                    document.querySelectorAll('.faq-icon').forEach(i => i.textContent = '+');
                    
                    // Open current FAQ
                    answer.classList.add('active');
                    question.classList.add('active');
                    icon.textContent = '-';
                }
            });
        });
    }

    setupAccessibility() {
        // Skip to main content link
        this.addSkipLink();
        
        // Focus management
        this.setupFocusManagement();
        
        // Keyboard navigation
        this.setupKeyboardNavigation();
    }

    addSkipLink() {
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.className = 'skip-link';
        skipLink.textContent = 'Skip to main content';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: var(--gov-orange);
            color: white;
            padding: 8px;
            text-decoration: none;
            transition: top 0.3s;
            z-index: 1000;
        `;
        
        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '6px';
        });
        
        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);
    }

    setupFocusManagement() {
        // Ensure focus is visible
        const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
        const elements = document.querySelectorAll(focusableElements);
        
        elements.forEach(element => {
            element.addEventListener('focus', () => {
                element.classList.add('focused');
            });
            
            element.addEventListener('blur', () => {
                element.classList.remove('focused');
            });
        });
    }

    setupKeyboardNavigation() {
        // Arrow key navigation for tabs
        const tabButtons = document.querySelectorAll('.tab-button');
        if (tabButtons.length > 0) {
            tabButtons.forEach((button, index) => {
                button.addEventListener('keydown', (e) => {
                    let newIndex = index;
                    
                    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                        newIndex = (index + 1) % tabButtons.length;
                    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                        newIndex = (index - 1 + tabButtons.length) % tabButtons.length;
                    } else {
                        return;
                    }
                    
                    e.preventDefault();
                    tabButtons[newIndex].focus();
                    tabButtons[newIndex].click();
                });
            });
        }
    }

    // Utility function to show loading state
    showLoading(element) {
        if (element) {
            element.innerHTML = '<div class="loading"></div>';
        }
    }

    // Utility function to hide loading state
    hideLoading(element, content) {
        if (element) {
            element.innerHTML = content || '';
        }
    }

    setupCarouselNavigation(totalItems) {
        const carousel = document.getElementById('updatesCarousel');
        if (!carousel || totalItems <= 1) return;

        // Create carousel navigation
        const carouselContainer = carousel.parentElement;
        
        // Add navigation dots
        const navDots = document.createElement('div');
        navDots.className = 'carousel-nav';
        navDots.innerHTML = Array.from({ length: totalItems }, (_, i) => 
            `<div class="carousel-dot ${i === 0 ? 'active' : ''}" data-index="${i}"></div>`
        ).join('');
        
        // Add navigation arrows
        const prevArrow = document.createElement('div');
        prevArrow.className = 'carousel-arrows carousel-prev';
        prevArrow.innerHTML = '‹';
        
        const nextArrow = document.createElement('div');
        nextArrow.className = 'carousel-arrows carousel-next';
        nextArrow.innerHTML = '›';
        
        carouselContainer.style.position = 'relative';
        carouselContainer.appendChild(prevArrow);
        carouselContainer.appendChild(nextArrow);
        carouselContainer.appendChild(navDots);

        let currentIndex = 0;
        
        // Auto-scroll functionality
        let autoScrollTimer = setInterval(() => {
            currentIndex = (currentIndex + 1) % totalItems;
            this.scrollToItem(carousel, currentIndex, totalItems);
        }, 5000);

        // Dot navigation
        navDots.addEventListener('click', (e) => {
            if (e.target.classList.contains('carousel-dot')) {
                currentIndex = parseInt(e.target.getAttribute('data-index'));
                this.scrollToItem(carousel, currentIndex, totalItems);
                this.resetAutoScroll();
            }
        });

        // Arrow navigation
        prevArrow.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + totalItems) % totalItems;
            this.scrollToItem(carousel, currentIndex, totalItems);
            this.resetAutoScroll();
        });

        nextArrow.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % totalItems;
            this.scrollToItem(carousel, currentIndex, totalItems);
            this.resetAutoScroll();
        });

        // Reset auto-scroll when user interacts
        const resetAutoScroll = () => {
            clearInterval(autoScrollTimer);
            autoScrollTimer = setInterval(() => {
                currentIndex = (currentIndex + 1) % totalItems;
                this.scrollToItem(carousel, currentIndex, totalItems);
            }, 5000);
        };

        this.resetAutoScroll = resetAutoScroll;
        this.currentCarouselIndex = currentIndex;
    }

    scrollToItem(carousel, index, totalItems) {
        const items = carousel.children;
        if (items.length === 0) return;

        const itemWidth = items[0].offsetWidth + 24; // item width + gap
        carousel.scrollTo({
            left: itemWidth * index,
            behavior: 'smooth'
        });

        // Update active dot
        const dots = document.querySelectorAll('.carousel-dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });

        this.currentCarouselIndex = index;
    }

    // Utility function to format dates according to locale
    formatDate(date, locale = 'en-IN') {
        return new Date(date).toLocaleDateString(locale, {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    // Utility function to debounce search inputs
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// Initialize the main website functionality
document.addEventListener('DOMContentLoaded', () => {
    window.govWebsite = new GovernmentWebsite();
});