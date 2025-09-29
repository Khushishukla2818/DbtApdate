// Internationalization (i18n) system for the government website
class I18nManager {
    constructor() {
        this.currentLang = localStorage.getItem('lang') || 'en';
        this.translations = {};
        this.isLoaded = false;
        this.init();
    }

    async init() {
        await this.loadTranslations(this.currentLang);
        this.updatePageLanguage();
        this.setupLanguageSelector();
        this.applyTranslations();
    }

    async loadTranslations(lang) {
        try {
            const response = await fetch(`i18n/${lang}.json`);
            const translations = await response.json();
            this.translations[lang] = translations;
            this.isLoaded = true;
        } catch (error) {
            console.error('Failed to load translations for', lang, error);
            // Fallback to English if current language fails
            if (lang !== 'en') {
                await this.loadTranslations('en');
            }
        }
    }

    setupLanguageSelector() {
        const selector = document.getElementById('languageSelector');
        if (selector) {
            selector.value = this.currentLang;
            selector.addEventListener('change', (e) => {
                this.switchLanguage(e.target.value);
            });
        }
    }

    async switchLanguage(lang) {
        if (lang === this.currentLang) return;
        
        this.currentLang = lang;
        localStorage.setItem('lang', lang);
        
        // Load translations if not already loaded
        if (!this.translations[lang]) {
            await this.loadTranslations(lang);
        }
        
        this.updatePageLanguage();
        this.applyTranslations();
        
        // Update language selector in case there are multiple on page
        const selectors = document.querySelectorAll('#languageSelector');
        selectors.forEach(selector => {
            selector.value = lang;
        });
    }

    updatePageLanguage() {
        // Update HTML lang attribute
        document.documentElement.lang = this.currentLang;
        
        // Update page direction for RTL languages (Arabic, Hebrew, etc.)
        const rtlLanguages = ['ar', 'he', 'ur'];
        if (rtlLanguages.includes(this.currentLang)) {
            document.documentElement.dir = 'rtl';
        } else {
            document.documentElement.dir = 'ltr';
        }
        
        // Update meta description if available
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc && this.translations[this.currentLang]?.meta?.description) {
            metaDesc.content = this.translations[this.currentLang].meta.description;
        }
    }

    applyTranslations() {
        if (!this.isLoaded || !this.translations[this.currentLang]) return;

        // Apply translations to elements with data-i18n attribute
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.getTranslation(key);
            if (translation) {
                element.textContent = translation;
            }
        });

        // Apply translations to placeholder attributes
        const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
        placeholderElements.forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            const translation = this.getTranslation(key);
            if (translation) {
                element.placeholder = translation;
            }
        });

        // Apply translations to title attributes
        const titleElements = document.querySelectorAll('[data-i18n-title]');
        titleElements.forEach(element => {
            const key = element.getAttribute('data-i18n-title');
            const translation = this.getTranslation(key);
            if (translation) {
                element.title = translation;
            }
        });
    }

    getTranslation(key) {
        const keys = key.split('.');
        let translation = this.translations[this.currentLang];
        
        for (const k of keys) {
            if (translation && translation[k]) {
                translation = translation[k];
            } else {
                return null;
            }
        }
        
        return translation;
    }

    // Template string replacement for SMS and dynamic content
    formatTemplate(template, variables = {}) {
        return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
            return variables[key] || match;
        });
    }

    // Get current language
    getCurrentLanguage() {
        return this.currentLang;
    }

    // Check if language is RTL
    isRTL() {
        const rtlLanguages = ['ar', 'he', 'ur'];
        return rtlLanguages.includes(this.currentLang);
    }
}

// Initialize i18n when DOM is loaded
let i18nManager;
document.addEventListener('DOMContentLoaded', () => {
    i18nManager = new I18nManager();
});

// Export for use in other modules
window.i18nManager = i18nManager;