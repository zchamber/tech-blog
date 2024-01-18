async function loginFormHandler(event) {
    event.preventDefault();

    const email = document.getElementById('emailInput').value.trim();
    const password = document.getElementById('passwordInput').value.trim();
    
    if (email && password) {
        console.log(email, password);
        const response = await fetch(`/api/users/login`, {
            method: 'POST',
            body: JSON.stringify({ 
                email, 
                password 
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.table(response);
            if (response.ok) {
                    document.location.replace('/dashboard');
            } else {
            alert('Failed to log in.');
        }
    }
}


document.querySelector('.login-form')
document.addEventListener('submit', loginFormHandler);
