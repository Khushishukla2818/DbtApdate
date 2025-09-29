// Administrator Panel JavaScript
class AdminManager {
    constructor() {
        this.isLoggedIn = false;
        this.students = [];
        this.campaigns = [];
        this.dashboardData = {
            totalStudents: 0,
            messagesSent: 0,
            deliveryRate: 0,
            activeCampaigns: 0
        };
        this.currentTab = 'students';
        this.init();
    }

    init() {
        this.checkLoginStatus();
        this.setupEventListeners();
        this.loadMockData();
        this.updateDashboard();
    }

    checkLoginStatus() {
        // Check if user is already logged in (stored in localStorage for demo)
        this.isLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
        this.showAppropriateView();
    }

    showAppropriateView() {
        const loginSection = document.getElementById('adminLogin');
        const panelSection = document.getElementById('adminPanel');
        const adminUser = document.getElementById('adminUser');

        if (this.isLoggedIn) {
            if (loginSection) loginSection.style.display = 'none';
            if (panelSection) panelSection.classList.remove('hidden');
            if (adminUser) adminUser.style.display = 'flex';
        } else {
            if (loginSection) loginSection.style.display = 'block';
            if (panelSection) panelSection.classList.add('hidden');
            if (adminUser) adminUser.style.display = 'none';
        }
    }

    setupEventListeners() {
        // Login form
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleLogin();
            });
        }

        // Logout button
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                this.handleLogout();
            });
        }

        // Tab navigation
        const tabButtons = document.querySelectorAll('.admin-tabs .tab-button');
        tabButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const tabId = e.target.getAttribute('data-tab');
                this.switchTab(tabId);
            });
        });

        // CSV Upload
        this.setupCsvUpload();

        // SMS Campaign
        this.setupSmsHandlers();

        // Dashboard
        this.setupDashboardHandlers();

        // Student management
        this.setupStudentHandlers();
    }

    handleLogin() {
        // Demo login - accept any credentials
        this.isLoggedIn = true;
        localStorage.setItem('adminLoggedIn', 'true');
        
        const adminName = document.getElementById('adminName');
        if (adminName) {
            adminName.textContent = 'Administrator';
        }
        
        this.showAppropriateView();
        this.showNotification('Login successful', 'success');
    }

    handleLogout() {
        this.isLoggedIn = false;
        localStorage.removeItem('adminLoggedIn');
        this.showAppropriateView();
        this.showNotification('Logged out successfully', 'info');
    }

    switchTab(tabId) {
        // Update tab buttons
        const tabButtons = document.querySelectorAll('.admin-tabs .tab-button');
        tabButtons.forEach(btn => btn.classList.remove('active'));
        document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');

        // Update tab panels
        const tabPanels = document.querySelectorAll('.admin-tabs .tab-panel');
        tabPanels.forEach(panel => panel.classList.remove('active'));
        document.getElementById(tabId).classList.add('active');

        this.currentTab = tabId;

        // Load tab-specific data
        switch (tabId) {
            case 'students':
                this.renderStudentsTable();
                break;
            case 'sms':
                this.renderCampaignHistory();
                break;
            case 'dashboard':
                this.renderDashboard();
                break;
        }
    }

    setupCsvUpload() {
        const csvUpload = document.getElementById('csvUpload');
        const uploadDropzone = document.getElementById('uploadDropzone');

        if (csvUpload) {
            csvUpload.addEventListener('change', (e) => {
                this.handleCsvUpload(e.target.files[0]);
            });
        }

        if (uploadDropzone) {
            // Drag and drop functionality
            uploadDropzone.addEventListener('dragover', (e) => {
                e.preventDefault();
                uploadDropzone.classList.add('drag-over');
            });

            uploadDropzone.addEventListener('dragleave', () => {
                uploadDropzone.classList.remove('drag-over');
            });

            uploadDropzone.addEventListener('drop', (e) => {
                e.preventDefault();
                uploadDropzone.classList.remove('drag-over');
                const file = e.dataTransfer.files[0];
                if (file && file.type === 'text/csv') {
                    this.handleCsvUpload(file);
                } else {
                    this.showNotification('Please upload a CSV file', 'error');
                }
            });
        }
    }

    handleCsvUpload(file) {
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const csv = e.target.result;
                const students = this.parseCsv(csv);
                this.importStudents(students);
                this.showNotification(`Imported ${students.length} students successfully`, 'success');
            } catch (error) {
                this.showNotification('Error parsing CSV file', 'error');
            }
        };
        reader.readAsText(file);
    }

    parseCsv(csv) {
        const lines = csv.split('\n').filter(line => line.trim());
        const headers = lines[0].split(',');
        const students = [];

        for (let i = 1; i < lines.length; i++) {
            const values = lines[i].split(',');
            if (values.length >= headers.length) {
                const student = {
                    id: Date.now() + i,
                    studentId: values[0]?.trim(),
                    name: values[1]?.trim(),
                    phone: values[2]?.trim(),
                    lang: values[3]?.trim() || 'en',
                    aadhaar: values[4]?.trim(),
                    bankAccount: values[5]?.trim(),
                    ifsc: values[6]?.trim(),
                    scholarshipType: values[7]?.trim(),
                    email: values[8]?.trim(),
                    status: 'pending',
                    uploadDate: new Date().toISOString()
                };
                students.push(student);
            }
        }

        return students;
    }

    importStudents(newStudents) {
        this.students = [...this.students, ...newStudents];
        this.updateDashboard();
        this.renderStudentsTable();
        
        // Save to localStorage for demo
        localStorage.setItem('adminStudents', JSON.stringify(this.students));
    }

    setupStudentHandlers() {
        const studentSearch = document.getElementById('studentSearch');
        const scholarshipFilter = document.getElementById('scholarshipFilter');

        if (studentSearch) {
            studentSearch.addEventListener('input', () => {
                this.renderStudentsTable();
            });
        }

        if (scholarshipFilter) {
            scholarshipFilter.addEventListener('change', () => {
                this.renderStudentsTable();
            });
        }
    }

    renderStudentsTable() {
        const tableBody = document.getElementById('studentsTableBody');
        if (!tableBody) return;

        const searchTerm = document.getElementById('studentSearch')?.value.toLowerCase() || '';
        const scholarshipFilter = document.getElementById('scholarshipFilter')?.value || 'all';

        let filteredStudents = this.students.filter(student => {
            const matchesSearch = !searchTerm || 
                student.name.toLowerCase().includes(searchTerm) ||
                student.studentId.toLowerCase().includes(searchTerm) ||
                student.phone.includes(searchTerm);
            
            const matchesFilter = scholarshipFilter === 'all' || 
                student.scholarshipType === scholarshipFilter;

            return matchesSearch && matchesFilter;
        });

        if (filteredStudents.length === 0) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="6" style="text-align: center; padding: 2rem;">
                        No students found matching criteria
                    </td>
                </tr>
            `;
            return;
        }

        tableBody.innerHTML = filteredStudents.map(student => `
            <tr>
                <td>${student.studentId}</td>
                <td>${student.name}</td>
                <td>${student.phone}</td>
                <td>${student.scholarshipType}</td>
                <td><span class="status-badge ${student.status}">${this.capitalizeFirst(student.status)}</span></td>
                <td>
                    <div class="action-buttons">
                        <button class="btn btn-sm btn-secondary" onclick="adminManager.editStudent('${student.id}')">Edit</button>
                        <button class="btn btn-sm btn-primary" onclick="adminManager.sendSingleSms('${student.id}')">SMS</button>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    setupSmsHandlers() {
        const previewBtn = document.getElementById('previewCampaign');
        const sendBtn = document.getElementById('sendCampaign');
        const messageTemplate = document.getElementById('messageTemplate');
        const targetLanguage = document.getElementById('targetLanguage');
        const targetScholarship = document.getElementById('targetScholarship');

        if (previewBtn) {
            previewBtn.addEventListener('click', () => {
                this.previewCampaign();
            });
        }

        if (sendBtn) {
            sendBtn.addEventListener('click', () => {
                this.sendCampaign();
            });
        }

        // Auto-update preview when inputs change
        [messageTemplate, targetLanguage, targetScholarship].forEach(element => {
            if (element) {
                element.addEventListener('input', () => {
                    this.updateCampaignPreview();
                });
                element.addEventListener('change', () => {
                    this.updateCampaignPreview();
                });
            }
        });
    }

    updateCampaignPreview() {
        const messageTemplate = document.getElementById('messageTemplate')?.value || '';
        const targetLanguage = document.getElementById('targetLanguage')?.value || 'all';
        const targetScholarship = document.getElementById('targetScholarship')?.value || 'all';

        // Calculate targeted students
        const targetedStudents = this.students.filter(student => {
            const langMatch = targetLanguage === 'all' || student.lang === targetLanguage;
            const scholarshipMatch = targetScholarship === 'all' || student.scholarshipType === targetScholarship;
            return langMatch && scholarshipMatch;
        });

        // Update targeted count
        const targetedCount = document.getElementById('targetedCount');
        if (targetedCount) {
            targetedCount.textContent = targetedStudents.length;
        }

        // Update message preview
        const messagePreview = document.getElementById('messagePreview');
        if (messagePreview && targetedStudents.length > 0) {
            const sampleStudent = targetedStudents[0];
            const previewMessage = this.formatMessageTemplate(messageTemplate, sampleStudent);
            messagePreview.textContent = previewMessage;
        }
    }

    formatMessageTemplate(template, student) {
        return template
            .replace(/\{\{name\}\}/g, student.name)
            .replace(/\{\{amount\}\}/g, '₹5,000')
            .replace(/\{\{status\}\}/g, student.status)
            .replace(/\{\{studentId\}\}/g, student.studentId);
    }

    previewCampaign() {
        this.updateCampaignPreview();
        this.showNotification('Campaign preview updated', 'info');
    }

    sendCampaign() {
        const campaignName = document.getElementById('campaignName')?.value;
        const messageTemplate = document.getElementById('messageTemplate')?.value;
        const targetLanguage = document.getElementById('targetLanguage')?.value;
        const targetScholarship = document.getElementById('targetScholarship')?.value;
        const scheduleTime = document.getElementById('scheduleTime')?.value;

        if (!campaignName || !messageTemplate) {
            this.showNotification('Please fill in campaign name and message template', 'error');
            return;
        }

        // Create campaign object
        const campaign = {
            id: Date.now(),
            name: campaignName,
            message: messageTemplate,
            targetLanguage: targetLanguage,
            targetScholarship: targetScholarship,
            scheduleTime: scheduleTime,
            status: scheduleTime ? 'scheduled' : 'sent',
            sentAt: scheduleTime ? null : new Date().toISOString(),
            targetedCount: this.students.filter(student => {
                const langMatch = targetLanguage === 'all' || student.lang === targetLanguage;
                const scholarshipMatch = targetScholarship === 'all' || student.scholarshipType === targetScholarship;
                return langMatch && scholarshipMatch;
            }).length
        };

        this.campaigns.push(campaign);
        this.dashboardData.messagesSent += campaign.targetedCount;
        this.dashboardData.activeCampaigns = this.campaigns.filter(c => c.status === 'scheduled').length;

        // Save to localStorage
        localStorage.setItem('adminCampaigns', JSON.stringify(this.campaigns));

        // Clear form
        document.getElementById('campaignName').value = '';
        document.getElementById('messageTemplate').value = '';
        document.getElementById('scheduleTime').value = '';

        const message = scheduleTime ? 'Campaign scheduled successfully' : 'Campaign sent successfully';
        this.showNotification(message, 'success');

        this.renderCampaignHistory();
        this.updateDashboard();
    }

    renderCampaignHistory() {
        const historyList = document.getElementById('campaignHistoryList');
        if (!historyList) return;

        const historyStatus = document.getElementById('historyStatus')?.value || 'all';
        
        let filteredCampaigns = this.campaigns;
        if (historyStatus !== 'all') {
            filteredCampaigns = this.campaigns.filter(campaign => campaign.status === historyStatus);
        }

        if (filteredCampaigns.length === 0) {
            historyList.innerHTML = `
                <div class="no-campaigns">
                    <p>No campaigns found</p>
                </div>
            `;
            return;
        }

        historyList.innerHTML = filteredCampaigns.map(campaign => `
            <div class="campaign-item">
                <div class="campaign-header">
                    <div class="campaign-name">${campaign.name}</div>
                    <div class="campaign-status ${campaign.status}">${this.capitalizeFirst(campaign.status)}</div>
                </div>
                <div class="campaign-meta">
                    <span>Targeted: ${campaign.targetedCount} students</span> |
                    <span>Language: ${campaign.targetLanguage === 'all' ? 'All' : campaign.targetLanguage.toUpperCase()}</span> |
                    <span>Scholarship: ${campaign.targetScholarship === 'all' ? 'All' : campaign.targetScholarship}</span>
                    ${campaign.sentAt ? `| <span>Sent: ${new Date(campaign.sentAt).toLocaleString()}</span>` : ''}
                </div>
                <div class="campaign-message">
                    "${campaign.message.substring(0, 100)}${campaign.message.length > 100 ? '...' : ''}"
                </div>
            </div>
        `).join('');
    }

    setupDashboardHandlers() {
        const downloadReportBtn = document.getElementById('downloadReport');
        const refreshDashboardBtn = document.getElementById('refreshDashboard');

        if (downloadReportBtn) {
            downloadReportBtn.addEventListener('click', () => {
                this.downloadReport();
            });
        }

        if (refreshDashboardBtn) {
            refreshDashboardBtn.addEventListener('click', () => {
                this.updateDashboard();
                this.renderDashboard();
                this.showNotification('Dashboard refreshed', 'success');
            });
        }
    }

    renderDashboard() {
        this.updateKPIs();
        this.renderCharts();
    }

    updateKPIs() {
        document.getElementById('totalStudents').textContent = this.students.length;
        document.getElementById('messagesSent').textContent = this.dashboardData.messagesSent;
        document.getElementById('deliveryRate').textContent = `${this.dashboardData.deliveryRate}%`;
        document.getElementById('activeCampaigns').textContent = this.dashboardData.activeCampaigns;
    }

    renderCharts() {
        this.renderMessagesChart();
        this.renderScholarshipChart();
    }

    renderMessagesChart() {
        const canvas = document.getElementById('messagesChart');
        if (!canvas || !window.Chart) return;

        const ctx = canvas.getContext('2d');
        
        // Generate mock data for the last 7 days
        const labels = [];
        const data = [];
        for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            labels.push(date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }));
            data.push(Math.floor(Math.random() * 500) + 100);
        }

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Messages Sent',
                    data: data,
                    borderColor: '#FF9933',
                    backgroundColor: 'rgba(255, 153, 51, 0.1)',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    renderScholarshipChart() {
        const canvas = document.getElementById('scholarshipChart');
        if (!canvas || !window.Chart) return;

        const ctx = canvas.getContext('2d');
        
        // Count scholarship types
        const scholarshipCounts = {
            'PreMatric': 0,
            'PostMatric': 0
        };

        this.students.forEach(student => {
            if (scholarshipCounts.hasOwnProperty(student.scholarshipType)) {
                scholarshipCounts[student.scholarshipType]++;
            }
        });

        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Pre-Matric', 'Post-Matric'],
                datasets: [{
                    data: [scholarshipCounts.PreMatric, scholarshipCounts.PostMatric],
                    backgroundColor: ['#FF9933', '#138808'],
                    borderColor: ['#FF9933', '#138808'],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }

    downloadReport() {
        const reportData = {
            generatedAt: new Date().toISOString(),
            totalStudents: this.students.length,
            totalCampaigns: this.campaigns.length,
            messagesSent: this.dashboardData.messagesSent,
            students: this.students,
            campaigns: this.campaigns
        };

        const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `admin-report-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        this.showNotification('Report downloaded successfully', 'success');
    }

    updateDashboard() {
        this.dashboardData.totalStudents = this.students.length;
        this.dashboardData.activeCampaigns = this.campaigns.filter(c => c.status === 'scheduled').length;
        this.dashboardData.deliveryRate = Math.floor(Math.random() * 20) + 80; // Mock delivery rate
    }

    loadMockData() {
        // Load from localStorage if available
        const savedStudents = localStorage.getItem('adminStudents');
        const savedCampaigns = localStorage.getItem('adminCampaigns');

        if (savedStudents) {
            this.students = JSON.parse(savedStudents);
        } else {
            // Generate some mock students
            this.students = [
                {
                    id: 1,
                    studentId: 'SC001',
                    name: 'Rahul Kumar',
                    phone: '+91-9876543210',
                    lang: 'hi',
                    aadhaar: '1234-5678-9012',
                    bankAccount: '123456789012',
                    ifsc: 'SBIN0001234',
                    scholarshipType: 'PostMatric',
                    email: 'rahul@example.com',
                    status: 'completed',
                    uploadDate: new Date().toISOString()
                },
                {
                    id: 2,
                    studentId: 'SC002',
                    name: 'Priya Sharma',
                    phone: '+91-9876543211',
                    lang: 'en',
                    aadhaar: '1234-5678-9013',
                    bankAccount: '123456789013',
                    ifsc: 'HDFC0001234',
                    scholarshipType: 'PreMatric',
                    email: 'priya@example.com',
                    status: 'pending',
                    uploadDate: new Date().toISOString()
                }
            ];
        }

        if (savedCampaigns) {
            this.campaigns = JSON.parse(savedCampaigns);
        }

        this.dashboardData.messagesSent = this.campaigns.reduce((total, campaign) => {
            return total + (campaign.status === 'sent' ? campaign.targetedCount : 0);
        }, 0);
    }

    // Utility methods
    editStudent(studentId) {
        const student = this.students.find(s => s.id == studentId);
        if (student) {
            // In a real app, this would open an edit modal
            const newName = prompt('Enter new name:', student.name);
            if (newName) {
                student.name = newName;
                this.renderStudentsTable();
                localStorage.setItem('adminStudents', JSON.stringify(this.students));
                this.showNotification('Student updated successfully', 'success');
            }
        }
    }

    sendSingleSms(studentId) {
        const student = this.students.find(s => s.id == studentId);
        if (student) {
            const message = prompt('Enter SMS message:', `Dear ${student.name}, your scholarship status has been updated.`);
            if (message) {
                // Simulate SMS sending
                this.dashboardData.messagesSent++;
                this.showNotification(`SMS sent to ${student.name}`, 'success');
                this.updateKPIs();
            }
        }
    }

    capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        const colors = {
            success: '#138808',
            error: '#dc3545',
            info: '#FF9933',
            warning: '#ffc107'
        };

        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${colors[type] || colors.info};
            color: white;
            padding: 1rem;
            border-radius: 4px;
            z-index: 1000;
            animation: slideIn 0.3s ease-out;
            max-width: 300px;
            word-wrap: break-word;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Global instance for easy access from HTML onclick handlers
let adminManager;

// Initialize admin manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    adminManager = new AdminManager();
});