// Rule-based multilingual chatbot for the government website
class ChatBot {
    constructor() {
        this.isOpen = false;
        this.botData = {
            en: {
                greeting: "Hello! I'm your DBT Guide assistant. How can I help you today?",
                fallback: "I didn't understand that. You can ask me about DBT, Aadhaar seeding, scholarships, or eligibility criteria.",
                suggestions: "Popular topics:<br>• DBT information<br>• Aadhaar seeding<br>• Scholarship eligibility<br>• Application process<br>• Contact information",
                responses: {
                    // Greetings
                    "hello": "Hello! How can I assist you with DBT or scholarship information?",
                    "hi": "Hi there! I'm here to help with your scholarship and DBT queries.",
                    "namaste": "Namaste! How can I help you today?",
                    
                    // DBT related
                    "what is dbt": "DBT stands for Direct Benefit Transfer. It's a government initiative to transfer subsidies and benefits directly to beneficiary accounts.",
                    "dbt meaning": "Direct Benefit Transfer (DBT) ensures that government benefits reach you directly without any intermediaries.",
                    "dbt benefits": "DBT benefits include faster processing, transparency, reduced corruption, and direct money transfer to your bank account.",
                    
                    // Aadhaar seeding
                    "aadhaar seeding": "Aadhaar seeding is linking your Aadhaar number with your bank account to enable DBT. Visit your bank or use online banking to complete this.",
                    "how to seed aadhaar": "To seed Aadhaar: 1) Visit your bank branch 2) Fill the seeding form 3) Provide Aadhaar and account details 4) Bank will link them for DBT.",
                    "seeding status": "You can check your seeding status on your bank's website, NPCI mapper, or by visiting your branch.",
                    "seed bank account": "Visit your bank with Aadhaar card and bank account details. Fill the Aadhaar seeding form and submit it to the bank official.",
                    
                    // Scholarships
                    "scholarship eligibility": "SC students can apply for Pre-Matric (Class 9-10) and Post-Matric (Class 11+ and higher education) scholarships based on income criteria.",
                    "how to apply": "Apply online through the National Scholarship Portal (NSP) at scholarships.gov.in with required documents.",
                    "scholarship documents": "Required documents: Income certificate, Caste certificate, Bank account details, Aadhaar card, Educational certificates, and Fee receipt.",
                    "scholarship amount": "Scholarship amount varies by education level and course type. Check the official guidelines on NSP for exact amounts.",
                    "when scholarship": "Scholarships are typically disbursed in the academic year after verification and approval of applications.",
                    
                    // Banking
                    "bank account": "You need a savings bank account with Aadhaar seeding completed. Account should be in your name and active for receiving DBT.",
                    "which bank": "You can use any nationalized, private, or cooperative bank account that supports DBT. Most major banks are DBT enabled.",
                    "account problem": "If you're facing account issues, contact your bank branch immediately or call their customer service helpline.",
                    
                    // Technical help
                    "portal not working": "If the portal is not working, try clearing browser cache, using different browser, or contact helpdesk at 1800-11-1111.",
                    "login problem": "For login issues, check your credentials, reset password if needed, or contact the portal helpdesk for assistance.",
                    "otp not received": "If OTP is not received, check network connectivity, wait for 2-3 minutes, or use 'Resend OTP' option.",
                    
                    // Status queries
                    "application status": "You can check your application status by logging into NSP portal with your application ID and registered mobile number.",
                    "payment status": "Payment status can be tracked through NSP portal or by checking your linked bank account for DBT credits.",
                    "when will i get": "Processing time varies but typically takes 2-3 months after application submission and verification completion.",
                    
                    // Help and guidance
                    "help": "I can help you with DBT information, Aadhaar seeding, scholarship applications, eligibility criteria, and technical issues.",
                    "contact": "For direct assistance: National Helpdesk 1800-11-1111 | Email: scholarships@gov.in | Visit nearest CSC center",
                    "documents needed": "Basic documents: Aadhaar card, Bank account details, Caste certificate, Income certificate, Educational certificates, Fee receipts.",
                    
                    // Common issues
                    "rejected application": "If application is rejected, check the reason in NSP portal and reapply with correct documents during the next cycle.",
                    "incomplete verification": "Complete verification by uploading all required documents clearly. Check document specifications on NSP portal.",
                    "wrong bank details": "If bank details are wrong, log into NSP portal and update them in your profile section before the deadline."
                }
            },
            hi: {
                greeting: "नमस्ते! मैं आपका DBT गाइड असिस्टेंट हूं। आज मैं आपकी कैसे मदद कर सकता हूं?",
                fallback: "मुझे यह समझ नहीं आया। आप मुझसे DBT, आधार सीडिंग, छात्रवृत्ति या पात्रता मापदंड के बारे में पूछ सकते हैं।",
                suggestions: "लोकप्रिय विषय:<br>• डीबीटी जानकारी<br>• आधार सीडिंग<br>• छात्रवृत्ति पात्रता<br>• आवेदन प्रक्रिया<br>• संपर्क जानकारी",
                responses: {
                    // Greetings
                    "नमस्ते": "नमस्ते! DBT और छात्रवृत्ति की जानकारी के लिए मैं आपकी कैसे मदद कर सकता हूं?",
                    "हैलो": "हैलो! आपके छात्रवृत्ति और DBT प्रश्नों में मदद के लिए मैं यहां हूं।",
                    "हाय": "हाय! मैं आपकी सहायता कैसे कर सकता हूं?",
                    
                    // DBT related
                    "dbt क्या है": "DBT का मतलब है प्रत्यक्ष लाभ अंतरण। यह सरकार की पहल है जो सब्सिडी सीधे लाभार्थी के खाते में ट्रांसफर करती है।",
                    "डीबीटी क्या है": "डीबीटी का मतलब है प्रत्यक्ष लाभ अंतरण। यह सरकार की पहल है जो सब्सिडी सीधे लाभार्थी के खाते में ट्रांसफर करती है।",
                    "डीबीटी का मतलब": "प्रत्यक्ष लाभ अंतरण (DBT) यह सुनिश्चित करता है कि सरकारी लाभ बिना किसी बिचौलिये के सीधे आप तक पहुंचे।",
                    "dbt के फायदे": "DBT के फायदे: तेज प्रसंस्करण, पारदर्शिता, भ्रष्टाचार में कमी और सीधे बैंक खाते में पैसा।",
                    "डीबीटी के फायदे": "डीबीटी के फायदे: तेज प्रसंस्करण, पारदर्शिता, भ्रष्टाचार में कमी और सीधे बैंक खाते में पैसा।",
                    
                    // Aadhaar seeding
                    "आधार सीडिंग": "आधार सीडिंग का मतलब है आपके आधार को बैंक खाते से जोड़ना। अपने बैंक जाएं या ऑनलाइन बैंकिंग का उपयोग करें।",
                    "आधार कैसे सीड करें": "आधार सीड करने के लिए: 1) बैंक ब्रांच जाएं 2) सीडिंग फॉर्म भरें 3) आधार और खाता विवरण दें 4) बैंक DBT के लिए लिंक कर देगा।",
                    "सीडिंग स्टेटस": "अपनी सीडिंग स्थिति बैंक की वेबसाइट, NPCI मैपर पर या ब्रांच जाकर जांच सकते हैं।",
                    "बैंक खाता सीड": "आधार कार्ड और बैंक खाता विवरण लेकर बैंक जाएं। आधार सीडिंग फॉर्म भरकर बैंक अधिकारी को दें।",
                    
                    // Scholarships
                    "छात्रवृत्ति पात्रता": "SC छात्र आय के आधार पर प्री-मैट्रिक (कक्षा 9-10) और पोस्ट-मैट्रिक (कक्षा 11+ और उच्च शिक्षा) छात्रवृत्ति के लिए आवेदन कर सकते हैं।",
                    "आवेदन कैसे करें": "scholarships.gov.in पर राष्ट्रीय छात्रवृत्ति पोर्टल (NSP) के माध्यम से आवश्यक दस्तावेजों के साथ ऑनलाइन आवेदन करें।",
                    "छात्रवृत्ति दस्तावेज": "आवश्यक दस्तावेज: आय प्रमाण पत्र, जाति प्रमाण पत्र, बैंक खाता विवरण, आधार कार्ड, शैक्षणिक प्रमाण पत्र, और फीस रसीद।",
                    "छात्रवृत्ति राशि": "छात्रवृत्ति राशि शिक्षा स्तर और कोर्स के प्रकार के अनुसार अलग होती है। सही राशि के लिए NSP पर आधिकारिक दिशानिर्देश देखें।",
                    "छात्रवृत्ति कब मिलेगी": "छात्रवृत्ति आमतौर पर आवेदन सत्यापन और अनुमोदन के बाद शैक्षणिक वर्ष में वितरित की जाती है।",
                    
                    // Banking
                    "बैंक खाता": "आपको आधार सीडिंग के साथ बचत बैंक खाता चाहिए। खाता आपके नाम पर होना चाहिए और DBT प्राप्त करने के लिए सक्रिय होना चाहिए।",
                    "कौन सा बैंक": "आप किसी भी राष्ट्रीयकृत, निजी या सहकारी बैंक खाते का उपयोग कर सकते हैं जो DBT का समर्थन करता हो।",
                    "खाता समस्या": "अगर खाते में समस्या हो तो तुरंत अपनी बैंक ब्रांच से संपर्क करें या उनकी कस्टमर सर्विस हेल्पलाइन पर कॉल करें।",
                    
                    // Technical help
                    "पोर्टल काम नहीं कर रहा": "अगर पोर्टल काम नहीं कर रहा है तो ब्राउज़र कैश साफ़ करें, दूसरा ब्राउज़र इस्तेमाल करें या 1800-11-1111 पर हेल्पडेस्क से संपर्क करें।",
                    "लॉगिन प्रॉब्लम": "लॉगिन समस्या के लिए अपनी जानकारी चेक करें, जरूरत हो तो पासवर्ड रीसेट करें या पोर्टल हेल्पडेस्क से सहायता लें।",
                    "otp नहीं आ रहा": "अगर OTP नहीं आ रहा है तो नेटवर्क कनेक्टिविटी चेक करें, 2-3 मिनट इंतजार करें या 'OTP दोबारा भेजें' का उपयोग करें।",
                    "ओटीपी नहीं आ रहा": "अगर ओटीपी नहीं आ रहा है तो नेटवर्क कनेक्टिविटी चेक करें, 2-3 मिनट इंतजार करें या 'ओटीपी दोबारा भेजें' का उपयोग करें।",
                    
                    // Status queries
                    "आवेदन स्थिति": "आप अपनी आवेदन स्थिति अपनी आवेदन ID और पंजीकृत मोबाइल नंबर से NSP पोर्टल में लॉगिन करके जांच सकते हैं।",
                    "भुगतान स्थिति": "भुगतान स्थिति NSP पोर्टल के माध्यम से या DBT क्रेडिट के लिए अपने लिंक किए गए बैंक खाते की जांच करके ट्रैक की जा सकती है।",
                    "कब मिलेगा": "प्रसंस्करण समय अलग-अलग होता है लेकिन आमतौर पर आवेदन जमा करने और सत्यापन पूरा होने के बाद 2-3 महीने लगते हैं।",
                    
                    // Common issues
                    "आवेदन रिजेक्ट": "यदि आवेदन रिजेक्ट हो गया है, तो NSP पोर्टल में कारण जांचें और अगले चक्र में सही दस्तावेजों के साथ दोबारा आवेदन करें।",
                    "अधूरा सत्यापन": "सभी आवश्यक दस्तावेज स्पष्ट रूप से अपलोड करके सत्यापन पूरा करें। NSP पोर्टल पर दस्तावेज विशिष्टताएं जांचें।",
                    "गलत बैंक विवरण": "यदि बैंक विवरण गलत है, तो NSP पोर्टल में लॉगिन करें और डेडलाइन से पहले अपने प्रोफाइल सेक्शन में उन्हें अपडेट करें।",
                    
                    // Help
                    "मदद": "मैं DBT जानकारी, आधार सीडिंग, छात्रवृत्ति आवेदन, पात्रता मापदंड और तकनीकी समस्याओं में आपकी मदद कर सकता हूं।",
                    "संपर्क": "सीधी सहायता के लिए: राष्ट्रीय हेल्पडेस्क 1800-11-1111 | ईमेल: scholarships@gov.in | निकटतम CSC केंद्र जाएं",
                    "जरूरी दस्तावेज": "मूलभूत दस्तावेज: आधार कार्ड, बैंक खाता विवरण, जाति प्रमाण पत्र, आय प्रमाण पत्र, शैक्षणिक प्रमाण पत्र, फीस रसीदें।"
                }
            }
        };
        
        this.init();
    }

    init() {
        this.setupChatWidget();
        this.setupEventListeners();
    }

    setupChatWidget() {
        const chatWidget = document.getElementById('chatWidget');
        if (!chatWidget) return;

        // Initialize chat with greeting
        setTimeout(() => {
            this.addBotMessage(this.getCurrentLanguageData().greeting);
        }, 1000);
    }

    setupEventListeners() {
        const chatToggle = document.getElementById('chatToggle');
        const chatClose = document.getElementById('chatClose');
        const chatSend = document.getElementById('chatSend');
        const chatInput = document.getElementById('chatInput');

        if (chatToggle) {
            chatToggle.addEventListener('click', () => {
                this.toggleChat();
            });
        }

        if (chatClose) {
            chatClose.addEventListener('click', () => {
                this.closeChat();
            });
        }

        if (chatSend) {
            chatSend.addEventListener('click', () => {
                this.sendMessage();
            });
        }

        if (chatInput) {
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.sendMessage();
                }
            });

            // Show typing indicator
            let typingTimer;
            chatInput.addEventListener('input', () => {
                clearTimeout(typingTimer);
                typingTimer = setTimeout(() => {
                    // Could show "Bot is thinking..." here
                }, 1000);
            });
        }
    }

    toggleChat() {
        const chatWindow = document.getElementById('chatWindow');
        if (chatWindow) {
            if (this.isOpen) {
                this.closeChat();
            } else {
                this.openChat();
            }
        }
    }

    openChat() {
        const chatWindow = document.getElementById('chatWindow');
        if (chatWindow) {
            chatWindow.classList.add('active');
            this.isOpen = true;
            
            // Focus on input
            const input = document.getElementById('chatInput');
            if (input) {
                setTimeout(() => input.focus(), 100);
            }
        }
    }

    closeChat() {
        const chatWindow = document.getElementById('chatWindow');
        if (chatWindow) {
            chatWindow.classList.remove('active');
            this.isOpen = false;
        }
    }

    sendMessage() {
        const input = document.getElementById('chatInput');
        if (!input || !input.value.trim()) return;

        const message = input.value.trim();
        input.value = '';

        // Add user message
        this.addUserMessage(message);

        // Process and respond
        setTimeout(() => {
            const response = this.processMessage(message);
            this.addBotMessage(response);
        }, 500);
    }

    addUserMessage(message) {
        const chatMessages = document.getElementById('chatMessages');
        if (!chatMessages) return;

        const messageDiv = document.createElement('div');
        messageDiv.className = 'chat-message user';
        messageDiv.innerHTML = `
            <div class="message-bubble user">${this.escapeHtml(message)}</div>
        `;

        chatMessages.appendChild(messageDiv);
        this.scrollToBottom();
    }

    addBotMessage(message) {
        const chatMessages = document.getElementById('chatMessages');
        if (!chatMessages) return;

        const messageDiv = document.createElement('div');
        messageDiv.className = 'chat-message bot';
        messageDiv.innerHTML = `
            <div class="message-bubble bot">${message}</div>
        `;

        chatMessages.appendChild(messageDiv);
        this.scrollToBottom();
    }

    scrollToBottom() {
        const chatMessages = document.getElementById('chatMessages');
        if (chatMessages) {
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }

    processMessage(message) {
        const langData = this.getCurrentLanguageData();
        const normalizedMessage = this.normalizeMessage(message);
        
        // Check for exact matches first
        if (langData.responses[normalizedMessage]) {
            return langData.responses[normalizedMessage];
        }

        // Fuzzy matching for partial matches
        const bestMatch = this.findBestMatch(normalizedMessage, langData.responses);
        if (bestMatch) {
            return langData.responses[bestMatch];
        }

        // Return fallback response with helpful suggestions
        return langData.fallback + "<br><br>" + langData.suggestions;
    }

    normalizeMessage(message) {
        return message.toLowerCase()
                     .replace(/[^\p{L}\p{N}\s]/gu, ' ')  // Unicode-safe: preserves letters and numbers in all scripts
                     .replace(/\s+/g, ' ')
                     .trim();
    }

    findBestMatch(input, responses) {
        const inputWords = input.split(' ');
        let bestMatch = '';
        let maxScore = 0;

        for (const key in responses) {
            const keyWords = key.split(' ');
            let score = 0;

            // Calculate similarity score
            inputWords.forEach(inputWord => {
                keyWords.forEach(keyWord => {
                    if (inputWord.includes(keyWord) || keyWord.includes(inputWord)) {
                        score++;
                    }
                });
            });

            // Normalize score
            const normalizedScore = score / Math.max(inputWords.length, keyWords.length);
            
            if (normalizedScore > 0.3 && normalizedScore > maxScore) {
                maxScore = normalizedScore;
                bestMatch = key;
            }
        }

        return maxScore > 0.3 ? bestMatch : null;
    }

    getCurrentLanguageData() {
        const currentLang = window.i18nManager ? window.i18nManager.getCurrentLanguage() : 'en';
        return this.botData[currentLang] || this.botData['en'];
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Method to add custom responses or update bot data
    updateBotData(language, responses) {
        if (this.botData[language]) {
            this.botData[language].responses = {
                ...this.botData[language].responses,
                ...responses
            };
        }
    }

    // Method to get chat history (could be useful for analytics)
    getChatHistory() {
        const messages = document.querySelectorAll('.chat-message');
        const history = [];
        
        messages.forEach(message => {
            const bubble = message.querySelector('.message-bubble');
            if (bubble) {
                history.push({
                    type: message.classList.contains('user') ? 'user' : 'bot',
                    message: bubble.textContent,
                    timestamp: new Date()
                });
            }
        });
        
        return history;
    }

    // Method to clear chat history
    clearChat() {
        const chatMessages = document.getElementById('chatMessages');
        if (chatMessages) {
            chatMessages.innerHTML = '';
            // Re-add greeting
            setTimeout(() => {
                this.addBotMessage(this.getCurrentLanguageData().greeting);
            }, 300);
        }
    }
}

// Initialize chatbot when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ChatBot();
});