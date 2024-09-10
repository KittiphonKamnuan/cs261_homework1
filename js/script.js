const container = document.querySelector('.container');
const signupButton = document.querySelector('.signup-section header');
const loginButton = document.querySelector('.login-section header');

loginButton.addEventListener('click', () => {
    container.classList.add('active');
});

signupButton.addEventListener('click', () => {
    container.classList.remove('active');
});

const signupForm = document.getElementById('signupForm');
signupForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(signupForm);
    const userData = {
        fullName: formData.get('fullName'),
        email: formData.get('email'),
        password: formData.get('password'),
    };

    fetch('/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        // Handle the response from the server, e.g., show a success message
    })
    .catch(error => {
        console.error('Error:', error);
        // Handle errors, e.g., show an error message
    });
});

// Similar logic for the login form, assuming you have a login endpoint

const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(loginForm);
    const userData = {
        email: formData.get('email'),
        password: formData.get('password'),
    };

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        // Handle the response from the server, e.g., redirect to a dashboard
    })
    .catch(error => {
        console.error('Error:', error);
        // Handle errors, e.g., show an error message
    });
});
