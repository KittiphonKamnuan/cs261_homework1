// DOM Elements
const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('passwordInput');
const roleSelect = document.getElementById('role');
const loginButton = document.getElementById('loginButton');
const togglePasswordButton = document.getElementById('togglePassword');
const messageElement = document.getElementById('message');
const eyeIcon = document.getElementById('eyeIcon');

// Event Listeners
loginForm.addEventListener('submit', handleFormSubmit);
usernameInput.addEventListener('input', validateForm);
passwordInput.addEventListener('input', validateForm);
roleSelect.addEventListener('change', validateForm);
togglePasswordButton.addEventListener('click', togglePasswordVisibility);

// Form Validation
function validateForm() {
    const isValid = usernameInput.value.trim() !== '' && 
                    passwordInput.value.trim() !== '' && 
                    roleSelect.value !== '';
    loginButton.disabled = !isValid;
}

// Toggle Password Visibility
function togglePasswordVisibility() {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    eyeIcon.src = type === 'password' ? 'img/1213.jpg' : 'img/1212.jpg';
    eyeIcon.alt = type === 'password' ? 'Show password' : 'Hide password';
}

// Handle Form Submit
async function handleFormSubmit(event) {
    event.preventDefault();
    const username = usernameInput.value.trim();
    const password = passwordInput.value;

    try {
        const response = await authenticateWithTUAPI(username, password);
        if (!response.success) {
            showMessage(`Login successful! Welcome, ${response.displayname_en} (${response.department})`, 'success');
        }
    } catch (error) {
        showMessage('Login failed. Please try again.', 'error');
    }
}

// TU API Authentication
async function authenticateWithTUAPI(username, password) {
    try {
        const response = await fetch('https://restapi.tu.ac.th/api/v1/auth/Ad/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Application-Key': 'TUce8ebe796d66cb8fab75a309d97313858aabb8ab12527f50f6093f9168c64bfbfabdae8117c844c83176aebdb1e5b50e'
            },
            body: JSON.stringify({ UserName: username, PassWord: password })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return await response.json();
    } catch (error) {
        console.error('TU API Error:', error);
        throw error;
    }
}

// Show Message
function showMessage(message, type = 'info') {
    messageElement.textContent = message;
    messageElement.className = `message ${type}`;
}