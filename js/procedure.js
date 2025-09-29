// Interactive Procedure Guide functionality
class ProcedureGuideManager {
    constructor() {
        this.currentCase = 'fresh';
        this.currentStep = 1;
        this.totalSteps = 5;
        this.stepData = {};
        this.checklist = [];
        this.init();
    }

    async init() {
        // Set global reference for interactive elements
        window.procedureGuide = this;
        
        await this.loadStepData();
        this.setupEventListeners();
        this.loadCase(this.currentCase);
    }

    setupEventListeners() {
        // Case selection buttons
        const caseButtons = document.querySelectorAll('.case-btn');
        caseButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const caseType = e.target.getAttribute('data-case');
                this.selectCase(caseType);
            });
        });

        // Navigation buttons
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const startBtn = document.getElementById('startBtn');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.previousStep());
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextStep());
        }
        if (startBtn) {
            startBtn.addEventListener('click', () => this.startLearning());
        }

        // Modal handlers
        this.setupModalHandlers();
    }

    async loadStepData() {
        try {
            // Load step data from external JSON file
            const response = await fetch('data/procedures.json');
            if (response.ok) {
                this.stepData = await response.json();
            } else {
                // Fallback to basic step data
                this.loadFallbackStepData();
            }
        } catch (error) {
            console.error('Failed to load step data:', error);
            this.loadFallbackStepData();
        }
    }

    loadFallbackStepData() {
        this.stepData = {
            fresh: {
                title: { en: 'Fresh Aadhaar Seeding', hi: 'नई आधार सीडिंग' },
                steps: [
                    {
                        title: { en: 'Visit Base Portal', hi: 'बेस पोर्टल पर जाएं' },
                        content: { 
                            en: 'Go to your bank\'s official website or visit the nearest branch to start the seeding process.',
                            hi: 'आधार सीडिंग प्रक्रिया शुरू करने के लिए अपने बैंक की आधिकारिक वेबसाइट पर जाएं या निकटतम शाखा में जाएं।'
                        },
                        checklist: [
                            { en: 'Identify your bank\'s official website', hi: 'अपने बैंक की आधिकारिक वेबसाइट पहचानें' },
                            { en: 'Locate Aadhaar seeding section', hi: 'आधार सीडिंग सेक्शन खोजें' },
                            { en: 'Ensure secure connection (https)', hi: 'सुरक्षित कनेक्शन सुनिश्चित करें (https)' }
                        ],
                        action: 'portal'
                    },
                    {
                        title: { en: 'Send Request', hi: 'अनुरोध भेजें' },
                        content: { 
                            en: 'Fill out the online form or submit a physical application at the bank branch.',
                            hi: 'ऑनलाइन फॉर्म भरें या बैंक शाखा में भौतिक आवेदन जमा करें।'
                        },
                        checklist: [
                            { en: 'Download seeding form', hi: 'सीडिंग फॉर्म डाउनलोड करें' },
                            { en: 'Read instructions carefully', hi: 'निर्देशों को ध्यान से पढ़ें' },
                            { en: 'Prepare required documents', hi: 'आवश्यक दस्तावेज तैयार करें' }
                        ],
                        action: 'form'
                    },
                    {
                        title: { en: 'Provide Aadhaar Details', hi: 'आधार विवरण प्रदान करें' },
                        content: { 
                            en: 'Enter your 12-digit Aadhaar number carefully and verify all details.',
                            hi: 'अपना 12-अंकीय आधार नंबर सावधानी से दर्ज करें और सभी विवरणों को सत्यापित करें।'
                        },
                        checklist: [
                            { en: 'Enter Aadhaar number correctly', hi: 'आधार नंबर सही तरीके से दर्ज करें' },
                            { en: 'Verify name matches Aadhaar', hi: 'नाम आधार से मेल खाता है सत्यापित करें' },
                            { en: 'Check address details', hi: 'पता विवरण जांचें' }
                        ],
                        action: 'aadhaar'
                    },
                    {
                        title: { en: 'Provide Bank Details', hi: 'बैंक विवरण प्रदान करें' },
                        content: { 
                            en: 'Enter your bank account number and IFSC code accurately.',
                            hi: 'अपना बैंक खाता संख्या और IFSC कोड सटीक रूप से दर्ज करें।'
                        },
                        checklist: [
                            { en: 'Enter account number correctly', hi: 'खाता संख्या सही तरीके से दर्ज करें' },
                            { en: 'Verify IFSC code', hi: 'IFSC कोड सत्यापित करें' },
                            { en: 'Confirm account holder name', hi: 'खाता धारक का नाम पुष्टि करें' }
                        ],
                        action: 'bank'
                    },
                    {
                        title: { en: 'Confirm & Submit', hi: 'पुष्टि करें और जमा करें' },
                        content: { 
                            en: 'Review all information and submit your seeding request.',
                            hi: 'सभी जानकारी की समीक्षा करें और अपना सीडिंग अनुरोध जमा करें।'
                        },
                        checklist: [
                            { en: 'Review all entered details', hi: 'सभी दर्ज विवरणों की समीक्षा करें' },
                            { en: 'Submit the application', hi: 'आवेदन जमा करें' },
                            { en: 'Save confirmation receipt', hi: 'पुष्टि रसीद सेव करें' }
                        ],
                        action: 'confirm'
                    }
                ]
            },
            reseeding: {
                title: { en: 'Aadhaar Re-Seeding', hi: 'आधार री-सीडिंग' },
                steps: [
                    {
                        title: { en: 'Check Current Status', hi: 'वर्तमान स्थिति जांचें' },
                        content: { 
                            en: 'First verify your current seeding status before proceeding with re-seeding.',
                            hi: 'री-सीडिंग के साथ आगे बढ़ने से पहले अपनी वर्तमान सीडिंग स्थिति सत्यापित करें।'
                        },
                        checklist: [
                            { en: 'Check seeding status online', hi: 'ऑनलाइन सीडिंग स्थिति जांचें' },
                            { en: 'Identify the issue', hi: 'समस्या की पहचान करें' },
                            { en: 'Gather updated documents', hi: 'अपडेटेड दस्तावेज इकट्ठा करें' }
                        ],
                        action: 'status'
                    },
                    {
                        title: { en: 'Contact Bank Branch', hi: 'बैंक शाखा से संपर्क करें' },
                        content: { 
                            en: 'Visit your bank branch or contact customer service to initiate re-seeding process.',
                            hi: 'री-सीडिंग प्रक्रिया शुरू करने के लिए अपनी बैंक शाखा में जाएं या कस्टमर सर्विस से संपर्क करें।'
                        },
                        checklist: [
                            { en: 'Visit nearest bank branch', hi: 'निकटतम बैंक शाखा में जाएं' },
                            { en: 'Carry original Aadhaar card', hi: 'मूल आधार कार्ड ले जाएं' },
                            { en: 'Explain the re-seeding requirement', hi: 'री-सीडिंग की आवश्यकता समझाएं' }
                        ],
                        action: 'form'
                    },
                    {
                        title: { en: 'Verify Updated Details', hi: 'अपडेटेड विवरण सत्यापित करें' },
                        content: { 
                            en: 'Provide updated Aadhaar details if any changes have been made.',
                            hi: 'यदि कोई बदलाव किया गया है तो अपडेटेड आधार विवरण प्रदान करें।'
                        },
                        checklist: [
                            { en: 'Check name spelling matches', hi: 'नाम की वर्तनी मेल खाती है जांचें' },
                            { en: 'Verify address is current', hi: 'पता वर्तमान है सत्यापित करें' },
                            { en: 'Confirm mobile number', hi: 'मोबाइल नंबर की पुष्टि करें' }
                        ],
                        action: 'aadhaar'
                    },
                    {
                        title: { en: 'Re-verify Bank Details', hi: 'बैंक विवरण पुनः सत्यापित करें' },
                        content: { 
                            en: 'Confirm your bank account details are correct and active.',
                            hi: 'पुष्टि करें कि आपके बैंक खाते का विवरण सही और सक्रिय है।'
                        },
                        checklist: [
                            { en: 'Account is active and operational', hi: 'खाता सक्रिय और परिचालित है' },
                            { en: 'IFSC code is correct', hi: 'IFSC कोड सही है' },
                            { en: 'Account holder name matches', hi: 'खाता धारक का नाम मेल खाता है' }
                        ],
                        action: 'bank'
                    },
                    {
                        title: { en: 'Complete Re-Seeding', hi: 'री-सीडिंग पूरी करें' },
                        content: { 
                            en: 'Submit the re-seeding application and track the status.',
                            hi: 'री-सीडिंग आवेदन जमा करें और स्थिति ट्रैक करें।'
                        },
                        checklist: [
                            { en: 'Submit re-seeding form', hi: 'री-सीडिंग फॉर्म जमा करें' },
                            { en: 'Get acknowledgment receipt', hi: 'पावती रसीद प्राप्त करें' },
                            { en: 'Track status regularly', hi: 'नियमित रूप से स्थिति ट्रैक करें' }
                        ],
                        action: 'confirm'
                    }
                ]
            },
            bankchange: {
                title: { en: 'Bank Account Change', hi: 'बैंक खाता परिवर्तन' },
                steps: [
                    {
                        title: { en: 'Prepare Documentation', hi: 'दस्तावेज तैयार करें' },
                        content: { 
                            en: 'Gather all required documents for changing bank account details.',
                            hi: 'बैंक खाता विवरण बदलने के लिए सभी आवश्यक दस्तावेज इकट्ठा करें।'
                        },
                        checklist: [
                            { en: 'New bank account details', hi: 'नए बैंक खाते का विवरण' },
                            { en: 'Account closure certificate (old bank)', hi: 'खाता बंद प्रमाण पत्र (पुराना बैंक)' },
                            { en: 'New bank account proof', hi: 'नए बैंक खाते का प्रमाण' }
                        ],
                        action: 'documents'
                    },
                    {
                        title: { en: 'Close Old Seeding', hi: 'पुराना सीडिंग बंद करें' },
                        content: { 
                            en: 'Inform your old bank about closing the Aadhaar seeding link.',
                            hi: 'आधार सीडिंग लिंक बंद करने के बारे में अपने पुराने बैंक को सूचित करें।'
                        },
                        checklist: [
                            { en: 'Visit old bank branch', hi: 'पुराने बैंक शाखा में जाएं' },
                            { en: 'Submit delink application', hi: 'डिलिंक आवेदन जमा करें' },
                            { en: 'Get confirmation receipt', hi: 'पुष्टि रसीद प्राप्त करें' }
                        ],
                        action: 'form'
                    },
                    {
                        title: { en: 'Update Aadhaar Information', hi: 'आधार जानकारी अपडेट करें' },
                        content: { 
                            en: 'Ensure your Aadhaar details are current before linking to new bank.',
                            hi: 'नए बैंक से लिंक करने से पहले सुनिश्चित करें कि आपका आधार विवरण वर्तमान है।'
                        },
                        checklist: [
                            { en: 'Verify Aadhaar details are updated', hi: 'सत्यापित करें कि आधार विवरण अपडेटेड है' },
                            { en: 'Check mobile number is linked', hi: 'जांचें कि मोबाइल नंबर लिंक है' },
                            { en: 'Confirm address is current', hi: 'पुष्टि करें कि पता वर्तमान है' }
                        ],
                        action: 'aadhaar'
                    },
                    {
                        title: { en: 'Link New Bank Account', hi: 'नया बैंक खाता लिंक करें' },
                        content: { 
                            en: 'Visit your new bank to link Aadhaar with the new account.',
                            hi: 'नए खाते के साथ आधार लिंक करने के लिए अपने नए बैंक में जाएं।'
                        },
                        checklist: [
                            { en: 'Visit new bank branch', hi: 'नई बैंक शाखा में जाएं' },
                            { en: 'Submit fresh seeding form', hi: 'नया सीडिंग फॉर्म जमा करें' },
                            { en: 'Provide all required documents', hi: 'सभी आवश्यक दस्तावेज प्रदान करें' }
                        ],
                        action: 'bank'
                    },
                    {
                        title: { en: 'Verify & Complete', hi: 'सत्यापित करें और पूरा करें' },
                        content: { 
                            en: 'Confirm the bank change process is completed successfully.',
                            hi: 'पुष्टि करें कि बैंक परिवर्तन प्रक्रिया सफलतापूर्वक पूरी हो गई है।'
                        },
                        checklist: [
                            { en: 'Check new seeding status', hi: 'नई सीडिंग स्थिति जांचें' },
                            { en: 'Test with small transaction', hi: 'छोटे लेनदेन के साथ परीक्षण करें' },
                            { en: 'Update scholarship portal', hi: 'छात्रवृत्ति पोर्टल अपडेट करें' }
                        ],
                        action: 'confirm'
                    }
                ]
            }
        };
    }

    selectCase(caseType) {
        this.currentCase = caseType;
        
        // Update active case button
        const caseButtons = document.querySelectorAll('.case-btn');
        caseButtons.forEach(btn => btn.classList.remove('active'));
        document.querySelector(`[data-case="${caseType}"]`).classList.add('active');
        
        this.loadCase(caseType);
    }

    loadCase(caseType) {
        this.currentStep = 1;
        this.checklist = [];
        this.updateProgress();
        this.displayStep();
        this.updateNavigation();
        this.updateChecklist();
    }

    startLearning() {
        this.currentStep = 1;
        this.displayStep();
        this.updateProgress();
        this.updateNavigation();
        this.updateChecklist();
    }

    displayStep() {
        const stepContent = document.getElementById('stepContent');
        if (!stepContent) return;

        const lang = window.i18nManager ? window.i18nManager.getCurrentLanguage() : 'en';
        const caseData = this.stepData[this.currentCase];
        
        // Check if caseData exists and has steps
        if (!caseData || !caseData.steps) {
            console.error('Case data not found for:', this.currentCase);
            stepContent.innerHTML = '<p>Loading step data...</p>';
            return;
        }
        
        const step = caseData.steps[this.currentStep - 1];

        if (!step) return;

        stepContent.innerHTML = this.generateStepContent(step, lang);
        stepContent.classList.add('fade-in');
        
        // Remove animation class after animation completes
        setTimeout(() => {
            stepContent.classList.remove('fade-in');
        }, 300);

        // Setup step-specific interactions
        this.setupStepInteractions(step.action, step);
    }

    generateStepContent(step, lang) {
        const title = step.title[lang] || step.title.en;
        const content = step.content[lang] || step.content.en;
        const description = step.description ? (step.description[lang] || step.description.en) : '';
        const estimatedTime = step.estimatedTime ? (step.estimatedTime[lang] || step.estimatedTime.en) : '';
        const tips = step.tips || [];

        const baseHTML = `
            <div class="step-header">
                <h3>${title}</h3>
                ${description ? `<div class="step-description">${description}</div>` : ''}
                ${estimatedTime ? `<div class="estimated-time">⏱️ ${estimatedTime}</div>` : ''}
            </div>
            <div class="step-content-body">${content}</div>
            ${tips.length > 0 ? `
                <div class="step-tips">
                    <h4>💡 Tips:</h4>
                    <ul>
                        ${tips.map(tip => `<li>${tip[lang] || tip.en}</li>`).join('')}
                    </ul>
                </div>
            ` : ''}
        `;

        switch (step.action) {
            case 'portal':
                return baseHTML + `
                    <div class="interactive-simulation">
                        <h4>🏦 Interactive Bank Portal Simulation</h4>
                        <div class="portal-mock">
                            <div class="browser-frame">
                                <div class="browser-header">
                                    <span class="url-bar">🔒 https://bank-portal.gov.in</span>
                                </div>
                                <div class="portal-content">
                                    <div class="bank-menu">
                                        <button class="menu-item" onclick="window.procedureGuide.simulatePortalClick('home')">🏠 Home</button>
                                        <button class="menu-item active" onclick="window.procedureGuide.simulatePortalClick('aadhaar')">🔗 Aadhaar Seeding</button>
                                        <button class="menu-item" onclick="window.procedureGuide.simulatePortalClick('services')">📋 Services</button>
                                    </div>
                                    <div class="portal-main" id="portalMain">
                                        <h4>Aadhaar Seeding Service</h4>
                                        <p>Link your Aadhaar with your bank account for Direct Benefit Transfer</p>
                                        <button class="btn btn-primary" onclick="window.procedureGuide.startPortalProcess()">Start Aadhaar Seeding</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            
            case 'form':
                return `
                    <div class="step-form">
                        <h3>${title}</h3>
                        <p>${content}</p>
                        <div class="form-simulation">
                            <div class="sim-disclaimer">This is a simulation for learning purposes</div>
                            <div class="sim-form">
                                <h4>Aadhaar Seeding Request Form</h4>
                                <div class="form-group">
                                    <label>Account Holder Name:</label>
                                    <input type="text" placeholder="Enter your full name" disabled>
                                </div>
                                <div class="form-group">
                                    <label>Mobile Number:</label>
                                    <input type="tel" placeholder="+91-XXXXXXXXXX" disabled>
                                </div>
                                <div class="form-group">
                                    <label>Email Address:</label>
                                    <input type="email" placeholder="your.email@example.com" disabled>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            
            case 'aadhaar':
                return baseHTML + `
                    <div class="interactive-simulation">
                        <div class="sim-disclaimer">🎓 Interactive Learning Simulation</div>
                        <div class="aadhaar-form-sim">
                            <h4>📋 Aadhaar Details Entry</h4>
                            <div class="form-group aadhaar-input">
                                <label>Aadhaar Number (12 digits):</label>
                                <input type="text" id="simulatedAadhaar" placeholder="XXXX-XXXX-XXXX" maxlength="14">
                                <div class="format-hint">Format: 1234-5678-9012</div>
                                <div class="validation-message" id="aadhaarValidation"></div>
                            </div>
                            <div class="form-group">
                                <label>Name as per Aadhaar:</label>
                                <input type="text" id="aadhaarName" placeholder="Enter name exactly as on Aadhaar">
                                <div class="validation-message" id="nameValidation"></div>
                            </div>
                            <div class="form-group">
                                <label>Date of Birth:</label>
                                <input type="date" id="aadhaarDOB">
                            </div>
                            <div class="sim-progress">
                                <div class="progress-item" id="aadhaarProgress">
                                    <span class="progress-icon">⏳</span>
                                    <span>Enter valid Aadhaar details to continue</span>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            
            case 'bank':
                return `
                    <div class="step-bank">
                        <h3>${title}</h3>
                        <p>${content}</p>
                        <div class="form-simulation">
                            <div class="sim-disclaimer">This is a simulation for learning purposes</div>
                            <div class="sim-form">
                                <h4>Bank Account Details</h4>
                                <div class="bank-selection">
                                    <label>Select Your Bank:</label>
                                    <div class="popular-banks">
                                        <div class="bank-option" data-bank="sbi">State Bank of India</div>
                                        <div class="bank-option" data-bank="hdfc">HDFC Bank</div>
                                        <div class="bank-option" data-bank="icici">ICICI Bank</div>
                                        <div class="bank-option" data-bank="pnb">Punjab National Bank</div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label>Account Number:</label>
                                    <input type="text" id="simulatedAccount" placeholder="Enter your account number">
                                </div>
                                <div class="form-group ifsc-input">
                                    <label>IFSC Code:</label>
                                    <input type="text" id="simulatedIFSC" placeholder="BANK0001234" class="ifsc-format">
                                    <div class="format-hint">Format: BANK0001234 (11 characters)</div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            
            case 'confirm':
                return `
                    <div class="step-confirm">
                        <h3>${title}</h3>
                        <p>${content}</p>
                        <div class="confirmation-summary">
                            <div class="summary-section">
                                <span class="summary-label">Aadhaar Number:</span>
                                <span class="summary-value">XXXX-XXXX-1234</span>
                            </div>
                            <div class="summary-section">
                                <span class="summary-label">Account Number:</span>
                                <span class="summary-value">XXXXXXXXX1234</span>
                            </div>
                            <div class="summary-section">
                                <span class="summary-label">IFSC Code:</span>
                                <span class="summary-value">SBIN0001234</span>
                            </div>
                            <div class="summary-section">
                                <span class="summary-label">Bank Name:</span>
                                <span class="summary-value">State Bank of India</span>
                            </div>
                        </div>
                        <div class="simulation-result">
                            <div class="result-icon result-success">✅</div>
                            <div class="result-message">Seeding Request Submitted Successfully!</div>
                            <div class="result-details">
                                Your Aadhaar seeding request has been submitted. You will receive a confirmation SMS within 24 hours. 
                                The seeding process typically takes 2-3 working days to complete.
                            </div>
                        </div>
                    </div>
                `;
            
            default:
                return `
                    <div class="step-default">
                        <h3>${title}</h3>
                        <p>${content}</p>
                    </div>
                `;
        }
    }

    setupStepInteractions(action) {
        switch (action) {
            case 'aadhaar':
                this.setupAadhaarValidation();
                break;
            case 'bank':
                this.setupBankSelection();
                break;
        }
    }

    setupAadhaarValidation() {
        const aadhaarInput = document.getElementById('simulatedAadhaar');
        const validationDiv = document.getElementById('aadhaarValidation');
        
        if (aadhaarInput && validationDiv) {
            aadhaarInput.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
                
                // Format as XXXX-XXXX-XXXX
                if (value.length > 8) {
                    value = value.slice(0, 4) + '-' + value.slice(4, 8) + '-' + value.slice(8, 12);
                } else if (value.length > 4) {
                    value = value.slice(0, 4) + '-' + value.slice(4, 8);
                }
                
                e.target.value = value;
                
                // Validate
                const cleanValue = value.replace(/-/g, '');
                if (cleanValue.length === 12) {
                    validationDiv.className = 'validation-message success';
                    validationDiv.textContent = '✓ Valid Aadhaar format';
                    this.updateChecklistItem(2, true); // Mark Aadhaar entry as complete
                } else if (cleanValue.length > 0) {
                    validationDiv.className = 'validation-message error';
                    validationDiv.textContent = '⚠ Aadhaar must be 12 digits';
                    this.updateChecklistItem(2, false);
                } else {
                    validationDiv.textContent = '';
                    this.updateChecklistItem(2, false);
                }
            });
        }
    }

    setupBankSelection() {
        const bankOptions = document.querySelectorAll('.bank-option');
        bankOptions.forEach(option => {
            option.addEventListener('click', () => {
                bankOptions.forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');
                
                const bank = option.getAttribute('data-bank');
                this.populateIFSC(bank);
                this.updateChecklistItem(3, true); // Mark bank selection as complete
            });
        });
    }

    populateIFSC(bank) {
        const ifscInput = document.getElementById('simulatedIFSC');
        if (!ifscInput) return;

        const ifscCodes = {
            sbi: 'SBIN0001234',
            hdfc: 'HDFC0001234',
            icici: 'ICIC0001234',
            pnb: 'PUNB0001234'
        };

        ifscInput.value = ifscCodes[bank] || '';
    }

    updateProgress() {
        const progressFill = document.getElementById('progressFill');
        const steps = document.querySelectorAll('.step');
        
        if (progressFill) {
            const progress = (this.currentStep / this.totalSteps) * 100;
            progressFill.style.width = `${progress}%`;
        }

        // Update step indicators
        steps.forEach((step, index) => {
            const stepNumber = index + 1;
            step.classList.remove('active', 'completed');
            
            if (stepNumber < this.currentStep) {
                step.classList.add('completed');
            } else if (stepNumber === this.currentStep) {
                step.classList.add('active');
            }
        });
    }

    updateNavigation() {
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const startBtn = document.getElementById('startBtn');

        if (prevBtn) {
            prevBtn.disabled = this.currentStep <= 1;
        }

        if (nextBtn) {
            nextBtn.style.display = this.currentStep < this.totalSteps ? 'inline-block' : 'none';
        }

        if (startBtn) {
            startBtn.style.display = this.currentStep === this.totalSteps ? 'inline-block' : 'none';
        }
    }

    updateChecklist() {
        const checklistContainer = document.getElementById('actionChecklist');
        if (!checklistContainer) return;

        const lang = window.i18nManager ? window.i18nManager.getCurrentLanguage() : 'en';
        const caseData = this.stepData[this.currentCase];
        const step = caseData.steps[this.currentStep - 1];

        if (!step || !step.checklist) return;

        checklistContainer.innerHTML = step.checklist.map((item, index) => `
            <li id="checklist-item-${index}">
                <div class="checklist-icon pending">${index + 1}</div>
                <span>${item[lang] || item.en}</span>
            </li>
        `).join('');
    }

    updateChecklistItem(index, completed) {
        const item = document.getElementById(`checklist-item-${index}`);
        if (item) {
            const icon = item.querySelector('.checklist-icon');
            if (completed) {
                icon.classList.remove('pending');
                icon.classList.add('completed', 'animate');
                icon.textContent = '✓';
            } else {
                icon.classList.remove('completed', 'animate');
                icon.classList.add('pending');
                icon.textContent = index + 1;
            }
        }
    }

    previousStep() {
        if (this.currentStep > 1) {
            this.currentStep--;
            this.displayStep();
            this.updateProgress();
            this.updateNavigation();
            this.updateChecklist();
        }
    }

    nextStep() {
        if (this.currentStep < this.totalSteps) {
            this.currentStep++;
            this.displayStep();
            this.updateProgress();
            this.updateNavigation();
            this.updateChecklist();
        }
    }

    setupModalHandlers() {
        const modal = document.getElementById('completionModal');
        const goHomeBtn = document.getElementById('goHomeBtn');
        const restartBtn = document.getElementById('restartBtn');

        if (goHomeBtn) {
            goHomeBtn.addEventListener('click', () => {
                window.location.href = 'index.html';
            });
        }

        if (restartBtn) {
            restartBtn.addEventListener('click', () => {
                this.restartGuide();
            });
        }

        // Show completion modal when reaching final step
        if (this.currentStep === this.totalSteps) {
            setTimeout(() => {
                if (modal) {
                    modal.classList.add('active');
                }
            }, 2000);
        }
    }

    restartGuide() {
        this.currentStep = 1;
        this.displayStep();
        this.updateProgress();
        this.updateNavigation();
        this.updateChecklist();
        
        const modal = document.getElementById('completionModal');
        if (modal) {
            modal.classList.remove('active');
        }
    }
}

// Initialize procedure guide when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ProcedureGuideManager();
});