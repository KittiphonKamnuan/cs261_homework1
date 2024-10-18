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
    const username = usernameInput.value.trim().toLowerCase();
    const password = passwordInput.value.trim();
    const role = roleSelect.value;

    const isUsernameValid = username.length > 0;
    const isPasswordValid = password.length >= 6; // Assuming a minimum password length of 6 characters
    const isRoleSelected = role !== '';

    const isValid = isUsernameValid && isPasswordValid && isRoleSelected;

    loginButton.disabled = !isValid;

    // Show validation messages
    showValidationMessage(usernameInput, isUsernameValid, 'Username is required');
    showValidationMessage(passwordInput, isPasswordValid, 'Password must be at least 6 characters long');
    showValidationMessage(roleSelect, isRoleSelected, 'Please select a role');
}

function showValidationMessage(element, isValid, message) {
    const errorElement = element.nextElementSibling;
    if (!errorElement || !errorElement.classList.contains('error')) {
        const newErrorElement = document.createElement('span');
        newErrorElement.classList.add('error');
        element.parentNode.insertBefore(newErrorElement, element.nextSibling);
    }
    
    const errorMessageElement = element.nextElementSibling;
    if (!isValid) {
        errorMessageElement.textContent = message;
        errorMessageElement.style.display = 'block';
    } else {
        errorMessageElement.style.display = 'none';
    }
}

// Toggle Password Visibility
function togglePasswordVisibility() {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    eyeIcon.src = type === 'password' ? 'img/1213.jpg' : 'img/1212.jpg';
    eyeIcon.alt = type === 'password' ? 'Show password' : 'Hide password';
}

document.addEventListener('DOMContentLoaded', () => {
    // Check if there's a saved username in localStorage and set it
    const savedUsername = localStorage.getItem('rememberedUsername');
    if (savedUsername) {
        usernameInput.value = savedUsername;
        document.getElementById('rememberMe').checked = true;
    }
    validateForm();
});

// Handle Form Submit
async function handleFormSubmit(event) {
    event.preventDefault();
    const username = usernameInput.value.trim();
    const password = passwordInput.value;
    const selectedRole = roleSelect.value;

    if (document.getElementById('rememberMe').checked) {
        // Save the username in localStorage
        localStorage.setItem('rememberedUsername', username);
    } else {
        // Remove the saved username if "Remember Me" is not checked
        localStorage.removeItem('rememberedUsername');
    }

    try {
        const response = await authenticateWithTUAPI(username, password);
        if (!response.success) {
            const accountType = response.type.toLowerCase();
            const isRoleValid = (accountType === 'student' && selectedRole === 'student') ||
                                (accountType === 'staff' && selectedRole === 'lecturer');

            if (isRoleValid) {
                showMessage(`Login successful! Welcome, ${response.displayname_en} (${response.department})`, 'success');
            } else {
                showMessage('Selected role does not match your account type. Please choose the correct role.', 'error');
            }
        } else {
            showMessage('Login failed. Please check your credentials and try again.', 'error');
        }
    } catch (error) {
        showMessage('Login failed. Please check your credentials and try again.', 'error');
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

// Initial form validation
validateForm();

// Google Sign-In Handler (placeholder function)
function handleGoogleSignIn(response) {
    // Implement Google Sign-In logic here
    console.log('Google Sign-In response:', response);
}