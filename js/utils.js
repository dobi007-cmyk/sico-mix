// Notification system
function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => {
        document.body.removeChild(notification);
    });
    
    const notification = document.createElement('div');
    notification.className = 'notification';
    
    const bgColor = type === 'success' ? 'var(--primary)' : 
                   type === 'error' ? 'var(--danger)' : 
                   type === 'warning' ? 'var(--warning)' : 'var(--gray)';
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${bgColor};
        color: white;
        padding: 15px 25px;
        border-radius: var(--border-radius);
        box-shadow: var(--shadow-hover);
        z-index: 1001;
        font-weight: 500;
        display: flex;
        align-items: center;
        gap: 10px;
        animation: slideIn 0.3s ease;
    `;
    
    const icon = type === 'success' ? 'fa-check-circle' :
                type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle';
    
    notification.innerHTML = `
        <i class="fas ${icon}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Confirmation modal
function showConfirmation(title, message, onConfirm) {
    const confirmationModal = document.getElementById('confirmationModal');
    const confirmationTitle = document.getElementById('confirmationTitle');
    const confirmationMessage = document.getElementById('confirmationMessage');
    const confirmActionBtn = document.getElementById('confirmActionBtn');
    const cancelActionBtn = document.getElementById('cancelActionBtn');
    const closeConfirmationModal = document.getElementById('closeConfirmationModal');
    
    if (!confirmationModal || !confirmationTitle || !confirmationMessage) {
        console.error('Confirmation modal elements not found');
        return;
    }
    
    confirmationTitle.textContent = title;
    confirmationMessage.textContent = message;
    confirmationModal.classList.add('active');
    
    const handleConfirm = () => {
        onConfirm();
        confirmationModal.classList.remove('active');
        // Remove event listeners
        confirmActionBtn.removeEventListener('click', handleConfirm);
        cancelActionBtn.removeEventListener('click', handleCancel);
        closeConfirmationModal.removeEventListener('click', handleCancel);
    };
    
    const handleCancel = () => {
        confirmationModal.classList.remove('active');
        // Remove event listeners
        confirmActionBtn.removeEventListener('click', handleConfirm);
        cancelActionBtn.removeEventListener('click', handleCancel);
        closeConfirmationModal.removeEventListener('click', handleCancel);
    };
    
    // Add event listeners
    confirmActionBtn.addEventListener('click', handleConfirm);
    cancelActionBtn.addEventListener('click', handleCancel);
    closeConfirmationModal.addEventListener('click', handleCancel);
}

// Add notification styles if not present
if (!document.querySelector('#notification-styles')) {
    const style = document.createElement('style');
    style.id = 'notification-styles';
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

// Helper functions
function formatDate(date, lang = 'pl') {
    const d = new Date(date);
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const locales = {
        'pl': 'pl-PL',
        'uk': 'uk-UA',
        'en': 'en-US'
    };
    return d.toLocaleDateString(locales[lang] || 'pl-PL', options);
}

function downloadFile(filename, content, type = 'application/json') {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function readFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (e) => reject(e);
        reader.readAsText(file);
    });
}

function debounce(func, wait) {
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
