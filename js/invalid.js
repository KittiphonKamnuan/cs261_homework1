function validateSignupForm() {
    const fullNameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const alertMessage = document.getElementById('alertMessage');

    // Get values from inputs
    const fullName = fullNameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    // Array to collect error messages
    const errors = [];

    // Check if Full Name contains at least one space
    if (!fullName.includes(' ')) {
        errors.push('Full Name must contain at least one space');
    }

    // Check if the email is a Gmail address
    if (!isGmail(email)) {
        errors.push('Please use a Gmail address');
    }

    // Check if the password meets the criteria
    const passwordCheckResult = checkPasswordCriteria(password);
    if (passwordCheckResult !== true) {
        errors.push(...passwordCheckResult);
    }

    // Display all error messages together
    if (errors.length > 0) {
        alertMessage.innerHTML = errors.join('<br>');
        return false;
    }

    // Clear the alert message
    alertMessage.innerHTML = '';

    // Check if any of the fields are empty
    if (!fullName || !email || !password) {
        alertMessage.innerHTML = 'Please fill in all fields';
        return false;
    }

    // You can add more specific validation checks if needed

    return true; // Return true if validation passes
}

// Function to check if the email is a Gmail address
function isGmail(email) {
    return /@gmail\.com$/.test(email);
}

// Function to check if the password meets the criteria and return an array of error messages
function checkPasswordCriteria(password) {
    // At least one lowercase letter, one uppercase letter, one number, and a minimum length of 8 characters
    const lowercaseRegex = /[a-z]/;
    const uppercaseRegex = /[A-Z]/;
    const numberRegex = /\d/;
    const lengthRegex = /.{8,}/;

    const errors = [];

    if (!lowercaseRegex.test(password)) {
        errors.push('Password must have at least one lowercase letter');
    }

    if (!uppercaseRegex.test(password)) {
        errors.push('Password must have at least one uppercase letter');
    }

    if (!numberRegex.test(password)) {
        errors.push('Password must have at least one number');
    }

    if (!lengthRegex.test(password)) {
        errors.push('Password must have at least 8 characters');
    }

    return errors.length === 0 ? true : errors;
}
