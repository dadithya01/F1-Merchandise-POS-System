let currentPageId = 'homepage';

async function handleLogin(e) {
    e.preventDefault();
    const loginPage = document.getElementById('login-page');
    const appContent = document.getElementById('app-content');
    const loginErrorAlert = document.getElementById('loginErrorAlert');
    const username = document.getElementById('usernameInput').value;
    const password = document.getElementById('passwordInput').value;
    if (username === 'admin' && password === '123') {
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
        loginPage.classList.add('d-none');
        appContent.classList.remove('d-none');
        loginErrorAlert.classList.add('d-none');
        navigatePage(currentPageId);
    } else {
        await Swal.fire({
            icon: 'error',
            title: 'Invalid Pit Stop!',
            text: 'Incorrect username or password. Check your setup.',
            confirmButtonText: 'Retry',
            background: '#1a1a1a',
            color: '#e0e0e0',
            confirmButtonColor: '#E10600'
        });
        document.getElementById('passwordInput').value = '';
    }
}

async function handleLogout() {
    const loginPage = document.getElementById('login-page');
    const appContent = document.getElementById('app-content');
    const result = await Swal.fire({
        title: 'Ready for the Pit Stop?',
        text: "You will be logged out of the KPOS system.",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#E10600',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Yes, Logout',
        background: '#1a1a1a',
        color: '#e0e0e0'
    });

    if (result.isConfirmed) {
        // Use Bootstrap d-none class for hiding
        appContent.classList.add('d-none');
        loginPage.classList.remove('d-none');
        // Reset navigation state
        currentPageId = 'homepage';

        // Success message after logging out (can be a small modal or toast)
        await Swal.fire({
            icon: 'info',
            toast: true,
            title: 'Race Concluded.',
            text: 'You have successfully logged out. See you next race!',
            showConfirmButton: false,
            position: 'top-end',
            timer: 1500,
            background: '#1a1a1a',
            color: '#e0e0e0'
        });
    }
}

function initializeLogin() {
    const loginForm = document.getElementById('loginForm');
    const logoutBtn = document.getElementById('logoutBtn');

    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
}


