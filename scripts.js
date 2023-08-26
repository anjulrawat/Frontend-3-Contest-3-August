document.addEventListener('DOMContentLoaded', () => {
    const signupButton = document.getElementById('signup-btn');
    const errorMessage = document.getElementById('error-message');
    const successMessage = document.getElementById('success-message');

    signupButton.addEventListener('click', () => {
        const fullName = document.getElementById('fullname').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        if (fullName && email && password && confirmPassword) {
            if (password === confirmPassword) {
                const accessToken = generateAccessToken();
                const userState = { fullName, email, accessToken };
                localStorage.setItem('userState', JSON.stringify(userState));
                successMessage.textContent = 'Signup successful! Redirecting...';
                errorMessage.textContent = '';
                setTimeout(() => {
                    window.location.href = 'profile.html';
                }, 1500);
            } else {
                errorMessage.textContent = 'Passwords do not match.';
                successMessage.textContent = '';
            }
        } else {
            errorMessage.textContent = 'Please fill in all fields.';
            successMessage.textContent = '';
        }
    });

    const profileFullName = document.getElementById('profile-fullname');
    const profileEmail = document.getElementById('profile-email');
    const profileToken = document.getElementById('profile-token');
    const logoutButton = document.getElementById('logout-btn');

    if (localStorage.getItem('userState')) {
        const userState = JSON.parse(localStorage.getItem('userState'));
        profileFullName.textContent = userState.fullName;
        profileEmail.textContent = userState.email;
        profileToken.textContent = userState.accessToken;
    }

    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('userState');
        window.location.href = 'index.html';
    });

    function generateAccessToken() {
        const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let token = '';
        for (let i = 0; i < 16; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            token += charset[randomIndex];
        }
        return token;
    }
});
