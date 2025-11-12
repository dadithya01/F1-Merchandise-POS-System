const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('usernameInput');
const passwordInput = document.getElementById('passwordInput');
const loginPage = document.getElementById('login-page');
const appContent = document.getElementById('app-content');

const VALID_USERNAME = 'admin';
const VALID_PASSWORD = '123';

function handleLogin(event) {
    event.preventDefault();

    const enteredUsername = usernameInput.value;
    const enteredPassword = passwordInput.value;

    // 1. Validate Credentials
    if (enteredUsername === VALID_USERNAME && enteredPassword === VALID_PASSWORD) {
        // 2. Successful Login
        Swal.fire({
            icon: 'success',
            title: 'Welcome to the Dashboard!',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            background: '#1a1a1a',
            color: '#e0e0e0',
            timerProgressBar: true
        });
            // Hide login page and show application content
            loginPage.classList.add('d-none');
            appContent.classList.remove('d-none');
    } else {
        // 3. Failed Login
        Swal.fire({
            icon: 'error',
            title: 'Login Failed ❌',
            text: 'Invalid username or password.',
            confirmButtonText: 'Retry',
            background: '#1a1a1a',
            color: '#e0e0e0',
            confirmButtonColor: '#E10600'
        });
        passwordInput.value = '';
        usernameInput.value = '';
    }
}

// Attach the event listener to the form
if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
}

// --- Logout Logic (Often placed in the same file or a separate one) ---

const logoutBtn = document.getElementById('logoutBtn');

function handleLogout() {
    Swal.fire({
        title: 'Are you sure you want to log out?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Yes, log me out!',
        cancelButtonText: 'Stay logged in',
        background: '#1a1a1a',
        color: '#e0e0e0'
    }).then((result) => {
        if (result.isConfirmed) {
            // Re-show the login page and hide the app content
            appContent.classList.add('d-none');
            loginPage.classList.remove('d-none');

            // Clear inputs for security/next login attempt
            usernameInput.value = '';
            passwordInput.value = '';

            Swal.fire({
                icon: 'info',
                toast: true,
                title: 'Logged out.',
                text: 'You have successfully logged out.',
                showConfirmButton: false,
                position: 'top-end',
                timer: 1500,
                background: '#1a1a1a',
                color: '#e0e0e0'
            });
        }
    });
}

// Attach logout listener
if (logoutBtn) {
    logoutBtn.addEventListener('click', handleLogout);
}
