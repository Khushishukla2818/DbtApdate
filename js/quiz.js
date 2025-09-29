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