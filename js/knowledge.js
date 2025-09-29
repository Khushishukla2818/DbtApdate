// Knowledge page functionality for tabs and FAQ search
class KnowledgeManager {
    constructor() {
        this.currentTab = 'aadhaar-linking';
        this.faqs = [];
        this.init();
    }

    init() {
        this.setupTabNavigation();
        this.loadFAQs();
        this.setupFAQSearch();
    }

    setupTabNavigation() {
        const tabButtons = document.querySelectorAll('.tab-button');
        const tabPanels = document.querySelectorAll('.tab-panel');

        tabButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetTab = button.getAttribute('data-tab');
                
                // Update active button
                tabButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Update active panel
                tabPanels.forEach(panel => panel.classList.remove('active'));
                const targetPanel = document.getElementById(targetTab);
                if (targetPanel) {
                    targetPanel.classList.add('active');
                }
                
                this.currentTab = targetTab;
                
                // Load tab-specific content
                if (targetTab === 'myths-faqs') {
                    this.renderFAQs();
                }
            });
        });
    }

    async loadFAQs() {
        try {
            // Try to load from data file
            const response = await fetch('data/faqs.json');
            if (response.ok) {
                this.faqs = await response.json();
            } else {
                // Fallback to inline FAQs
                this.faqs = this.getDefaultFAQs();
            }
        } catch (error) {
            console.error('Failed to load FAQs:', error);
            this.faqs = this.getDefaultFAQs();
        }
    }

    getDefaultFAQs() {
        return [
            {
                id: 1,
                category: "dbt",
                question: {
                    en: "What is DBT and how does it work?",
                    hi: "DBT क्या है और यह कैसे काम करता है?"
                },
                answer: {
                    en: "Direct Benefit Transfer (DBT) is a government initiative to transfer subsidies and benefits directly to beneficiary accounts. It eliminates intermediaries, reduces leakage, and ensures transparent delivery of benefits.",
                    hi: "प्रत्यक्ष लाभ अंतरण (DBT) सरकार की एक पहल है जो सब्सिडी और लाभ सीधे लाभार्थी के खाते में स्थानांतरित करती है। यह बिचौलियों को हटाती है, रिसाव को कम करती है और लाभों की पारदर्शी डिलीवरी सुनिश्चित करती है।"
                },
                tags: ["dbt", "definition", "benefits"]
            },
            {
                id: 2,
                category: "seeding",
                question: {
                    en: "How do I check my Aadhaar seeding status?",
                    hi: "मैं अपनी आधार सीडिंग स्थिति कैसे जांच सकता हूं?"
                },
                answer: {
                    en: "You can check your Aadhaar seeding status through: 1) Your bank's online portal or mobile app, 2) NPCI Aadhaar Mapper portal, 3) Visiting your bank branch, 4) Calling bank customer service.",
                    hi: "आप अपनी आधार सीडिंग स्थिति इन तरीकों से जांच सकते हैं: 1) अपने बैंक के ऑनलाइन पोर्टल या मोबाइल ऐप से, 2) NPCI आधार मैपर पोर्टल से, 3) अपनी बैंक शाखा जाकर, 4) बैंक कस्टमर सर्विस को फोन करके।"
                },
                tags: ["seeding", "status", "check"]
            },
            {
                id: 3,
                category: "scholarship",
                question: {
                    en: "What documents are required for scholarship application?",
                    hi: "छात्रवृत्ति आवेदन के लिए कौन से दस्तावेज आवश्यक हैं?"
                },
                answer: {
                    en: "Required documents: 1) Aadhaar card, 2) Caste certificate (SC), 3) Income certificate, 4) Bank account details with IFSC code, 5) Educational certificates/marksheets, 6) Fee receipt from institution, 7) Passport size photograph, 8) Institution verification form.",
                    hi: "आवश्यक दस्तावेज: 1) आधार कार्ड, 2) जाति प्रमाण पत्र (SC), 3) आय प्रमाण पत्र, 4) IFSC कोड के साथ बैंक खाता विवरण, 5) शैक्षिक प्रमाण पत्र/मार्कशीट, 6) संस्थान से फीस रसीद, 7) पासपोर्ट साइज फोटो, 8) संस्थान सत्यापन फॉर्म।"
                },
                tags: ["documents", "application", "requirements"]
            },
            {
                id: 4,
                category: "eligibility",
                question: {
                    en: "What is the income criteria for SC scholarships?",
                    hi: "SC छात्रवृत्ति के लिए आय मापदंड क्या है?"
                },
                answer: {
                    en: "For Pre-Matric (Class 9-10): Family income should not exceed ₹2.5 lakh per annum. For Post-Matric (Class 11+): Family income should not exceed ₹2.5 lakh per annum. Income certificate from competent authority is mandatory.",
                    hi: "प्री-मैट्रिक (कक्षा 9-10) के लिए: पारिवारिक आय प्रति वर्ष ₹2.5 लाख से अधिक नहीं होनी चाहिए। पोस्ट-मैट्रिक (कक्षा 11+) के लिए: पारिवारिक आय प्रति वर्ष ₹2.5 लाख से अधिक नहीं होनी चाहिए। सक्षम प्राधिकारी से आय प्रमाण पत्र अनिवार्य है।"
                },
                tags: ["eligibility", "income", "criteria"]
            },
            {
                id: 5,
                category: "technical",
                question: {
                    en: "What to do if scholarship portal is not working?",
                    hi: "यदि छात्रवृत्ति पोर्टल काम नहीं कर रहा है तो क्या करें?"
                },
                answer: {
                    en: "If portal is not working: 1) Clear browser cache and cookies, 2) Try different browser (Chrome, Firefox, Edge), 3) Check internet connectivity, 4) Try after some time during non-peak hours, 5) Contact helpdesk: 1800-11-1111, 6) Use nearby CSC center for assistance.",
                    hi: "यदि पोर्टल काम नहीं कर रहा है: 1) ब्राउज़र कैश और कुकीज़ साफ़ करें, 2) अलग ब्राउज़र आज़माएं (Chrome, Firefox, Edge), 3) इंटरनेट कनेक्टिविटी जांचें, 4) गैर-पीक घंटों में कुछ समय बाद कोशिश करें, 5) हेल्पडेस्क से संपर्क करें: 1800-11-1111, 6) सहायता के लिए नजदीकी CSC केंद्र का उपयोग करें।"
                },
                tags: ["technical", "portal", "troubleshooting"]
            }
        ];
    }

    renderFAQs() {
        const accordion = document.getElementById('faqAccordion');
        if (!accordion) return;

        const lang = window.i18nManager ? window.i18nManager.getCurrentLanguage() : 'en';
        
        accordion.innerHTML = this.faqs.map(faq => `
            <div class="faq-item" data-faq-id="${faq.id}">
                <div class="faq-question" data-faq="${faq.id}">
                    <span>${faq.question[lang] || faq.question.en}</span>
                    <span class="faq-icon">+</span>
                </div>
                <div class="faq-answer" data-faq-answer="${faq.id}">
                    <p>${faq.answer[lang] || faq.answer.en}</p>
                </div>
            </div>
        `).join('');

        // Setup FAQ interactions
        this.setupFAQInteractions();
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

    setupFAQSearch() {
        const searchInput = document.getElementById('faqSearch');
        if (!searchInput) return;

        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            this.filterFAQs(searchTerm);
        });
    }

    filterFAQs(searchTerm) {
        const faqItems = document.querySelectorAll('.faq-item');
        const lang = window.i18nManager ? window.i18nManager.getCurrentLanguage() : 'en';

        faqItems.forEach(item => {
            const faqId = parseInt(item.getAttribute('data-faq-id'));
            const faq = this.faqs.find(f => f.id === faqId);
            
            if (!faq) {
                item.style.display = 'none';
                return;
            }

            const question = (faq.question[lang] || faq.question.en).toLowerCase();
            const answer = (faq.answer[lang] || faq.answer.en).toLowerCase();
            const tags = faq.tags.join(' ').toLowerCase();

            const matches = !searchTerm || 
                          question.includes(searchTerm) || 
                          answer.includes(searchTerm) || 
                          tags.includes(searchTerm);

            item.style.display = matches ? 'block' : 'none';
        });
    }
}

// Initialize knowledge manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new KnowledgeManager();
});