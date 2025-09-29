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
            // Mock data for recent updates
            const updates = [
                {
                    id: 1,
                    date: '2025-01-15',
                    title: { en: 'Scholarship disbursement completed for 50,000 students', hi: '50,000 छात्रों के लिए छात्रवृत्ति वितरण पूरा' },
                    description: { en: 'Direct benefit transfer successful', hi: 'प्रत्यक्ष लाभ अंतरण सफल' }
                },
                {
                    id: 2,
                    date: '2025-01-10',
                    title: { en: 'New online portal features launched', hi: 'नई ऑनलाइन पोर्टल सुविधाएं शुरू' },
                    description: { en: 'Enhanced user experience', hi: 'बेहतर उपयोगकर्ता अनुभव' }
                },
                {
                    id: 3,
                    date: '2025-01-05',
                    title: { en: 'Mobile app now supports 12 regional languages', hi: 'मोबाइल ऐप अब 12 क्षेत्रीय भाषाओं का समर्थन करता है' },
                    description: { en: 'Better accessibility for rural students', hi: 'ग्रामीण छात्रों के लिए बेहतर पहुंच' }
                }
            ];

            container.innerHTML = updates.map(update => `
                <div class="update-item">
                    <div class="update-date">${new Date(update.date).toLocaleDateString()}</div>
                    <h4 data-i18n="updates.${update.id}.title">${update.title.en}</h4>
                    <p data-i18n="updates.${update.id}.desc">${update.description.en}</p>
                </div>
            `).join('');

            // Re-apply translations after loading content
            if (window.i18nManager) {
                window.i18nManager.applyTranslations();
            }
        } catch (error) {
            console.error('Failed to load updates:', error);
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
    new GovernmentWebsite();
});