// Quiz functionality for government website
class QuizManager {
    constructor() {
        this.currentQuiz = null;
        this.questions = [];
        this.currentQuestionIndex = 0;
        this.userAnswers = [];
        this.score = 0;
        this.quizData = this.getQuizData();
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.showQuizSelection();
    }

    setupEventListeners() {
        // Quiz selection
        const startQuizButtons = document.querySelectorAll('.start-quiz');
        startQuizButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const quizType = e.target.getAttribute('data-quiz');
                this.startQuiz(quizType);
            });
        });

        // Navigation buttons
        const prevBtn = document.getElementById('prevQuestion');
        const nextBtn = document.getElementById('nextQuestion');
        const submitBtn = document.getElementById('submitQuiz');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.previousQuestion());
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextQuestion());
        }
        if (submitBtn) {
            submitBtn.addEventListener('click', () => this.submitQuiz());
        }

        // Results buttons
        const certificateBtn = document.getElementById('generateCertificate');
        const retakeBtn = document.getElementById('retakeQuiz');
        const backBtn = document.getElementById('backToSelection');

        if (certificateBtn) {
            certificateBtn.addEventListener('click', () => this.generateCertificate());
        }
        if (retakeBtn) {
            retakeBtn.addEventListener('click', () => this.retakeQuiz());
        }
        if (backBtn) {
            backBtn.addEventListener('click', () => this.showQuizSelection());
        }
    }

    getQuizData() {
        return {
            'dbt-basics': {
                title: { en: 'DBT Basics', hi: 'डीबीटी बेसिक्स' },
                questions: [
                    {
                        question: { 
                            en: 'What does DBT stand for?', 
                            hi: 'DBT का पूरा नाम क्या है?' 
                        },
                        options: {
                            en: ['Direct Benefit Transfer', 'Digital Bank Transfer', 'Database Transaction', 'Digital Benefit Trust'],
                            hi: ['प्रत्यक्ष लाभ अंतरण', 'डिजिटल बैंक ट्रांसफर', 'डेटाबेस लेनदेन', 'डिजिटल लाभ ट्रस्ट']
                        },
                        correct: 0,
                        explanation: {
                            en: 'DBT stands for Direct Benefit Transfer, a government initiative to transfer subsidies directly to beneficiaries.',
                            hi: 'DBT का मतलब प्रत्यक्ष लाभ अंतरण है, यह सरकार की पहल है जो सब्सिडी सीधे लाभार्थियों को स्थानांतरित करती है।'
                        }
                    },
                    {
                        question: { 
                            en: 'What is the main advantage of DBT?', 
                            hi: 'DBT का मुख्य फायदा क्या है?' 
                        },
                        options: {
                            en: ['Eliminates middlemen', 'Increases paperwork', 'Reduces transparency', 'Makes process slower'],
                            hi: ['बिचौलियों को खत्म करता है', 'कागजी कार्रवाई बढ़ाता है', 'पारदर्शिता कम करता है', 'प्रक्रिया को धीमा बनाता है']
                        },
                        correct: 0,
                        explanation: {
                            en: 'DBT eliminates middlemen, ensuring direct transfer of benefits to beneficiaries.',
                            hi: 'DBT बिचौलियों को खत्म करता है, लाभार्थियों को सीधे लाभ पहुंचाने को सुनिश्चित करता है।'
                        }
                    },
                    {
                        question: { 
                            en: 'Which document is mandatory for receiving DBT benefits?', 
                            hi: 'DBT लाभ प्राप्त करने के लिए कौन सा दस्तावेज अनिवार्य है?' 
                        },
                        options: {
                            en: ['Aadhaar Card', 'Passport', 'Driving License', 'Voter ID'],
                            hi: ['आधार कार्ड', 'पासपोर्ट', 'ड्राइविंग लाइसेंस', 'वोटर आईडी']
                        },
                        correct: 0,
                        explanation: {
                            en: 'Aadhaar Card is mandatory for DBT as it provides unique identification for benefit transfer.',
                            hi: 'डीबीटी के लिए आधार कार्ड अनिवार्य है क्योंकि यह लाभ हस्तांतरण के लिए अद्वितीय पहचान प्रदान करता है।'
                        }
                    },
                    {
                        question: { 
                            en: 'DBT helps in reducing which of the following?', 
                            hi: 'DBT निम्नलिखित में से किसे कम करने में मदद करता है?' 
                        },
                        options: {
                            en: ['Leakages and corruption', 'Digital literacy', 'Bank accounts', 'Government schemes'],
                            hi: ['रिसाव और भ्रष्टाचार', 'डिजिटल साक्षरता', 'बैंक खाते', 'सरकारी योजनाएं']
                        },
                        correct: 0,
                        explanation: {
                            en: 'DBT significantly reduces leakages and corruption by ensuring direct transfer to beneficiaries.',
                            hi: 'DBT लाभार्थियों को सीधे हस्तांतरण सुनिश्चित करके रिसाव और भ्रष्टाचार को काफी कम करता है।'
                        }
                    },
                    {
                        question: { 
                            en: 'For successful DBT, what must be linked with your bank account?', 
                            hi: 'सफल DBT के लिए, आपके बैंक खाते के साथ क्या जुड़ा होना चाहिए?' 
                        },
                        options: {
                            en: ['Aadhaar number', 'PAN card', 'Mobile number only', 'Email address'],
                            hi: ['आधार नंबर', 'पैन कार्ड', 'केवल मोबाइल नंबर', 'ईमेल पता']
                        },
                        correct: 0,
                        explanation: {
                            en: 'Your Aadhaar number must be linked with your bank account for successful DBT transfers.',
                            hi: 'सफल DBT ट्रांसफर के लिए आपका आधार नंबर आपके बैंक खाते से जुड़ा होना चाहिए।'
                        }
                    }
                ]
            },
            'aadhaar-seeding': {
                title: { en: 'Aadhaar Seeding', hi: 'आधार सीडिंग' },
                questions: [
                    {
                        question: { 
                            en: 'What is Aadhaar seeding?', 
                            hi: 'आधार सीडिंग क्या है?' 
                        },
                        options: {
                            en: ['Linking Aadhaar with bank account', 'Creating new Aadhaar', 'Updating Aadhaar details', 'Cancelling Aadhaar'],
                            hi: ['आधार को बैंक खाते से जोड़ना', 'नया आधार बनाना', 'आधार विवरण अपडेट करना', 'आधार रद्द करना']
                        },
                        correct: 0,
                        explanation: {
                            en: 'Aadhaar seeding is the process of linking your Aadhaar number with your bank account.',
                            hi: 'आधार सीडिंग आपके आधार नंबर को आपके बैंक खाते से जोड़ने की प्रक्रिया है।'
                        }
                    },
                    {
                        question: { 
                            en: 'How many digits does an Aadhaar number have?', 
                            hi: 'आधार नंबर में कितने अंक होते हैं?' 
                        },
                        options: {
                            en: ['12 digits', '10 digits', '16 digits', '8 digits'],
                            hi: ['12 अंक', '10 अंक', '16 अंक', '8 अंक']
                        },
                        correct: 0,
                        explanation: {
                            en: 'Aadhaar number is a unique 12-digit identification number issued by UIDAI.',
                            hi: 'आधार नंबर UIDAI द्वारा जारी किया गया एक अद्वितीय 12-अंकीय पहचान संख्या है।'
                        }
                    },
                    {
                        question: { 
                            en: 'Where can you check your Aadhaar seeding status?', 
                            hi: 'आप अपना आधार सीडिंग स्टेटस कहाँ चेक कर सकते हैं?' 
                        },
                        options: {
                            en: ['Bank website or branch', 'Post office', 'Police station', 'Municipal office'],
                            hi: ['बैंक वेबसाइट या शाखा', 'डाकघर', 'पुलिस स्टेशन', 'नगरपालिका कार्यालय']
                        },
                        correct: 0,
                        explanation: {
                            en: 'You can check your Aadhaar seeding status on your bank\'s website or by visiting the branch.',
                            hi: 'आप अपने बैंक की वेबसाइट पर या शाखा में जाकर अपना आधार सीडिंग स्टेटस चेक कर सकते हैं।'
                        }
                    },
                    {
                        question: { 
                            en: 'What is required along with Aadhaar for seeding?', 
                            hi: 'सीडिंग के लिए आधार के साथ और क्या आवश्यक है?' 
                        },
                        options: {
                            en: ['Bank account details', 'PAN card', 'Driving license', 'Voter ID'],
                            hi: ['बैंक खाता विवरण', 'पैन कार्ड', 'ड्राइविंग लाइसेंस', 'वोटर आईडी']
                        },
                        correct: 0,
                        explanation: {
                            en: 'Bank account details including account number and IFSC code are required for Aadhaar seeding.',
                            hi: 'आधार सीडिंग के लिए खाता संख्या और IFSC कोड सहित बैंक खाता विवरण आवश्यक है।'
                        }
                    },
                    {
                        question: { 
                            en: 'What happens if name in Aadhaar doesn\'t match bank records?', 
                            hi: 'यदि आधार में नाम बैंक रिकॉर्ड से मेल नहीं खाता तो क्या होता है?' 
                        },
                        options: {
                            en: ['Seeding will fail', 'Seeding will succeed automatically', 'Bank will change the name', 'Nothing happens'],
                            hi: ['सीडिंग असफल हो जाएगी', 'सीडिंग अपने आप सफल हो जाएगी', 'बैंक नाम बदल देगा', 'कुछ नहीं होता']
                        },
                        correct: 0,
                        explanation: {
                            en: 'If the name in Aadhaar doesn\'t match bank records, the seeding process will fail and needs to be corrected.',
                            hi: 'यदि आधार में नाम बैंक रिकॉर्ड से मेल नहीं खाता, तो सीडिंग प्रक्रिया असफल हो जाएगी और इसे सुधारना होगा।'
                        }
                    },
                    {
                        question: { 
                            en: 'How long does Aadhaar seeding typically take?', 
                            hi: 'आधार सीडिंग में आमतौर पर कितना समय लगता है?' 
                        },
                        options: {
                            en: ['2-3 working days', '1 hour', '1 week', '1 month'],
                            hi: ['2-3 कार्य दिवस', '1 घंटा', '1 सप्ताह', '1 महीना']
                        },
                        correct: 0,
                        explanation: {
                            en: 'Aadhaar seeding typically takes 2-3 working days to complete after submission.',
                            hi: 'आधार सीडिंग आमतौर पर जमा करने के बाद पूरी होने में 2-3 कार्य दिवस लगते हैं।'
                        }
                    }
                ]
            },
            'scholarship-process': {
                title: { en: 'Scholarship Application', hi: 'छात्रवृत्ति आवेदन' },
                questions: [
                    {
                        question: { 
                            en: 'Which portal is used for scholarship applications?', 
                            hi: 'छात्रवृत्ति आवेदन के लिए कौन सा पोर्टल उपयोग किया जाता है?' 
                        },
                        options: {
                            en: ['National Scholarship Portal', 'Aadhaar Portal', 'Bank Portal', 'Education Portal'],
                            hi: ['राष्ट्रीय छात्रवृत्ति पोर्टल', 'आधार पोर्टल', 'बैंक पोर्टल', 'शिक्षा पोर्टल']
                        },
                        correct: 0,
                        explanation: {
                            en: 'National Scholarship Portal (NSP) is the official portal for scholarship applications.',
                            hi: 'राष्ट्रीय छात्रवृत्ति पोर्टल (NSP) छात्रवृत्ति आवेदन के लिए आधिकारिक पोर्टल है।'
                        }
                    },
                    {
                        question: { 
                            en: 'What is the minimum percentage required for most SC scholarships?', 
                            hi: 'अधिकांश SC छात्रवृत्ति के लिए न्यूनतम प्रतिशत क्या आवश्यक है?' 
                        },
                        options: {
                            en: ['50%', '60%', '70%', '75%'],
                            hi: ['50%', '60%', '70%', '75%']
                        },
                        correct: 0,
                        explanation: {
                            en: 'Most SC scholarships require a minimum of 50% marks in the previous qualifying examination.',
                            hi: 'अधिकांश SC छात्रवृत्ति के लिए पिछली योग्यता परीक्षा में न्यूनतम 50% अंक आवश्यक हैं।'
                        }
                    },
                    {
                        question: { 
                            en: 'Which document is mandatory for caste verification?', 
                            hi: 'जाति सत्यापन के लिए कौन सा दस्तावेज अनिवार्य है?' 
                        },
                        options: {
                            en: ['Caste Certificate', 'Income Certificate', 'Domicile Certificate', 'Birth Certificate'],
                            hi: ['जाति प्रमाण पत्र', 'आय प्रमाण पत्र', 'निवास प्रमाण पत्र', 'जन्म प्रमाण पत्र']
                        },
                        correct: 0,
                        explanation: {
                            en: 'Valid Caste Certificate issued by competent authority is mandatory for SC scholarship verification.',
                            hi: 'SC छात्रवृत्ति सत्यापन के लिए सक्षम प्राधिकारी द्वारा जारी वैध जाति प्रमाण पत्र अनिवार्य है।'
                        }
                    },
                    {
                        question: { 
                            en: 'What is the annual family income limit for most SC scholarships?', 
                            hi: 'अधिकांश SC छात्रवृत्ति के लिए वार्षिक पारिवारिक आय सीमा क्या है?' 
                        },
                        options: {
                            en: ['₹2.5 lakh', '₹5 lakh', '₹8 lakh', '₹10 lakh'],
                            hi: ['₹2.5 लाख', '₹5 लाख', '₹8 लाख', '₹10 लाख']
                        },
                        correct: 0,
                        explanation: {
                            en: 'The annual family income limit for most SC scholarships is ₹2.5 lakh from all sources.',
                            hi: 'अधिकांश SC छात्रवृत्ति के लिए सभी स्रोतों से वार्षिक पारिवारिक आय सीमा ₹2.5 लाख है।'
                        }
                    },
                    {
                        question: { 
                            en: 'When does the scholarship application period typically open?', 
                            hi: 'छात्रवृत्ति आवेदन अवधि आमतौर पर कब खुलती है?' 
                        },
                        options: {
                            en: ['July-August', 'January-February', 'October-November', 'April-May'],
                            hi: ['जुलाई-अगस्त', 'जनवरी-फरवरी', 'अक्टूबर-नवंबर', 'अप्रैल-मई']
                        },
                        correct: 0,
                        explanation: {
                            en: 'The scholarship application period typically opens in July-August for the academic year.',
                            hi: 'शैक्षणिक वर्ष के लिए छात्रवृत्ति आवेदन अवधि आमतौर पर जुलाई-अगस्त में खुलती है।'
                        }
                    },
                    {
                        question: { 
                            en: 'What happens if you don\'t renew your scholarship annually?', 
                            hi: 'यदि आप अपनी छात्रवृत्ति का वार्षिक नवीनीकरण नहीं करते तो क्या होता है?' 
                        },
                        options: {
                            en: ['Scholarship gets discontinued', 'Automatic renewal', 'Grace period given', 'Nothing happens'],
                            hi: ['छात्रवृत्ति बंद हो जाती है', 'स्वचालित नवीनीकरण', 'छूट अवधि मिलती है', 'कुछ नहीं होता']
                        },
                        correct: 0,
                        explanation: {
                            en: 'If you don\'t renew your scholarship annually, it gets discontinued and you need to reapply.',
                            hi: 'यदि आप अपनी छात्रवृत्ति का वार्षिक नवीनीकरण नहीं करते, तो यह बंद हो जाती है और आपको पुनः आवेदन करना होगा।'
                        }
                    },
                    {
                        question: { 
                            en: 'Which bank account type is recommended for scholarship?', 
                            hi: 'छात्रवृत्ति के लिए किस प्रकार का बैंक खाता अनुशंसित है?' 
                        },
                        options: {
                            en: ['Savings Account', 'Current Account', 'Fixed Deposit', 'Recurring Deposit'],
                            hi: ['बचत खाता', 'चालू खाता', 'सावधि जमा', 'आवर्ती जमा']
                        },
                        correct: 0,
                        explanation: {
                            en: 'Savings account in the student\'s name is recommended for receiving scholarship amounts.',
                            hi: 'छात्रवृत्ति राशि प्राप्त करने के लिए छात्र के नाम पर बचत खाता अनुशंसित है।'
                        }
                    },
                    {
                        question: { 
                            en: 'How long after approval does scholarship amount typically credit?', 
                            hi: 'अप्रूवल के कितने समय बाद छात्रवृत्ति राशि आमतौर पर क्रेडिट होती है?' 
                        },
                        options: {
                            en: ['2-4 weeks', '2-3 days', '2-3 months', '6 months'],
                            hi: ['2-4 सप्ताह', '2-3 दिन', '2-3 महीने', '6 महीने']
                        },
                        correct: 0,
                        explanation: {
                            en: 'After approval, scholarship amount typically credits to the account within 2-4 weeks.',
                            hi: 'अप्रूवल के बाद, छात्रवृत्ति राशि आमतौर पर 2-4 सप्ताह के भीतर खाते में क्रेडिट हो जाती है।'
                        }
                    }
                ]
            }
        };
    }

    startQuiz(quizType) {
        this.currentQuiz = quizType;
        this.questions = this.quizData[quizType].questions;
        this.currentQuestionIndex = 0;
        this.userAnswers = new Array(this.questions.length).fill(null);
        this.score = 0;

        this.hideAllSections();
        document.getElementById('quizContainer').classList.remove('hidden');
        
        this.displayQuestion();
        this.updateProgress();
        this.updateNavigation();
    }

    hideAllSections() {
        document.getElementById('quizSelection').classList.add('hidden');
        document.getElementById('quizContainer').classList.add('hidden');
        document.getElementById('quizResults').classList.add('hidden');
    }

    displayQuestion() {
        const question = this.questions[this.currentQuestionIndex];
        const lang = window.i18nManager ? window.i18nManager.getCurrentLanguage() : 'en';
        
        // Set quiz title
        const quizTitle = document.getElementById('quizTitle');
        if (quizTitle) {
            quizTitle.textContent = this.quizData[this.currentQuiz].title[lang] || this.quizData[this.currentQuiz].title.en;
        }

        // Set question text
        const questionText = document.getElementById('questionText');
        if (questionText) {
            questionText.textContent = question.question[lang] || question.question.en;
        }

        // Set options
        const optionsContainer = document.getElementById('optionsContainer');
        if (optionsContainer) {
            optionsContainer.innerHTML = '';
            const options = question.options[lang] || question.options.en;
            
            options.forEach((option, index) => {
                const optionDiv = document.createElement('div');
                optionDiv.className = 'option';
                
                const radio = document.createElement('input');
                radio.type = 'radio';
                radio.name = 'answer';
                radio.value = index;
                radio.id = `option${index}`;
                radio.checked = this.userAnswers[this.currentQuestionIndex] === index;
                
                radio.addEventListener('change', () => {
                    this.userAnswers[this.currentQuestionIndex] = parseInt(radio.value);
                    this.updateNavigation();
                });

                const label = document.createElement('label');
                label.htmlFor = `option${index}`;
                label.textContent = option;

                optionDiv.appendChild(radio);
                optionDiv.appendChild(label);
                optionsContainer.appendChild(optionDiv);
            });
        }
    }

    updateProgress() {
        const currentQuestion = document.getElementById('currentQuestion');
        const totalQuestions = document.getElementById('totalQuestions');
        const progressFill = document.getElementById('quizProgress');

        if (currentQuestion) {
            currentQuestion.textContent = this.currentQuestionIndex + 1;
        }
        if (totalQuestions) {
            totalQuestions.textContent = this.questions.length;
        }
        if (progressFill) {
            const progress = ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
            progressFill.style.width = `${progress}%`;
        }
    }

    updateNavigation() {
        const prevBtn = document.getElementById('prevQuestion');
        const nextBtn = document.getElementById('nextQuestion');
        const submitBtn = document.getElementById('submitQuiz');

        if (prevBtn) {
            prevBtn.disabled = this.currentQuestionIndex === 0;
        }

        const hasAnswer = this.userAnswers[this.currentQuestionIndex] !== null;
        const isLastQuestion = this.currentQuestionIndex === this.questions.length - 1;

        if (nextBtn && submitBtn) {
            if (isLastQuestion) {
                nextBtn.style.display = 'none';
                submitBtn.style.display = hasAnswer ? 'inline-block' : 'none';
            } else {
                nextBtn.style.display = hasAnswer ? 'inline-block' : 'none';
                submitBtn.style.display = 'none';
            }
        }
    }

    previousQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            this.displayQuestion();
            this.updateProgress();
            this.updateNavigation();
        }
    }

    nextQuestion() {
        if (this.currentQuestionIndex < this.questions.length - 1) {
            this.currentQuestionIndex++;
            this.displayQuestion();
            this.updateProgress();
            this.updateNavigation();
        }
    }

    submitQuiz() {
        // Calculate score
        this.score = 0;
        this.userAnswers.forEach((answer, index) => {
            if (answer === this.questions[index].correct) {
                this.score++;
            }
        });

        this.showResults();
    }

    showResults() {
        this.hideAllSections();
        document.getElementById('quizResults').classList.remove('hidden');

        const percentage = Math.round((this.score / this.questions.length) * 100);
        
        // Update score display
        document.getElementById('scorePercentage').textContent = `${percentage}%`;
        document.getElementById('correctCount').textContent = this.score;
        document.getElementById('incorrectCount').textContent = this.questions.length - this.score;
        document.getElementById('scorePercent').textContent = `${percentage}%`;

        // Generate review
        this.generateAnswerReview();
    }

    generateAnswerReview() {
        const reviewContainer = document.getElementById('reviewContainer');
        if (!reviewContainer) return;

        const lang = window.i18nManager ? window.i18nManager.getCurrentLanguage() : 'en';
        reviewContainer.innerHTML = '';

        this.questions.forEach((question, index) => {
            const reviewItem = document.createElement('div');
            reviewItem.className = 'review-item';
            
            const userAnswer = this.userAnswers[index];
            const isCorrect = userAnswer === question.correct;
            const options = question.options[lang] || question.options.en;

            reviewItem.innerHTML = `
                <div class="review-question">
                    <h5>Question ${index + 1}: ${question.question[lang] || question.question.en}</h5>
                </div>
                <div class="review-answer ${isCorrect ? 'correct' : 'incorrect'}">
                    <strong>Your Answer:</strong> ${userAnswer !== null ? options[userAnswer] : 'Not answered'}
                    ${!isCorrect ? `<br><strong>Correct Answer:</strong> ${options[question.correct]}` : ''}
                </div>
                <div class="review-explanation">
                    <strong>Explanation:</strong> ${question.explanation[lang] || question.explanation.en}
                </div>
            `;

            reviewContainer.appendChild(reviewItem);
        });
    }

    generateCertificate() {
        const percentage = Math.round((this.score / this.questions.length) * 100);
        const lang = window.i18nManager ? window.i18nManager.getCurrentLanguage() : 'en';
        
        if (percentage < 70) {
            alert(lang === 'hi' 
                ? 'प्रमाण पत्र के लिए कम से कम 70% स्कोर आवश्यक है।' 
                : 'Minimum 70% score required for certificate.');
            return;
        }

        // Create certificate using jsPDF
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        // Certificate content
        const title = lang === 'hi' ? 'प्रमाण पत्र' : 'Certificate of Completion';
        const subtitle = lang === 'hi' ? 'यह प्रमाणित करता है कि' : 'This certifies that';
        const studentName = 'Student'; // In real app, would get from user input
        const hasCompleted = lang === 'hi' ? 'ने सफलतापूर्वक पूरा किया है' : 'has successfully completed';
        const quizTitle = this.quizData[this.currentQuiz].title[lang];
        const scoreText = lang === 'hi' ? `स्कोर: ${percentage}%` : `Score: ${percentage}%`;
        const date = new Date().toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-IN');

        // Add content to PDF
        doc.setFontSize(24);
        doc.text(title, 105, 30, { align: 'center' });
        
        doc.setFontSize(16);
        doc.text(subtitle, 105, 60, { align: 'center' });
        
        doc.setFontSize(20);
        doc.text(studentName, 105, 80, { align: 'center' });
        
        doc.setFontSize(16);
        doc.text(hasCompleted, 105, 100, { align: 'center' });
        
        doc.setFontSize(18);
        doc.text(quizTitle, 105, 120, { align: 'center' });
        
        doc.setFontSize(14);
        doc.text(scoreText, 105, 140, { align: 'center' });
        doc.text(date, 105, 160, { align: 'center' });
        
        doc.text('DBTGuide - Government of India', 105, 200, { align: 'center' });

        // Save the PDF
        doc.save(`certificate-${this.currentQuiz}-${Date.now()}.pdf`);
    }

    retakeQuiz() {
        this.startQuiz(this.currentQuiz);
    }

    showQuizSelection() {
        this.hideAllSections();
        document.getElementById('quizSelection').classList.remove('hidden');
        this.currentQuiz = null;
    }
}

// Initialize quiz when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new QuizManager();
});