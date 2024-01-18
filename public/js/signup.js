const signUpFormHandler = async (event) => {
    event.preventDefault();
    const username = document.getElementById('usernameInput').value.trim();
    const email = document.getElementById('emailInput').value.trim();
    const password = document.getElementById('passwordInput').value.trim();

    if(username && email && password ) {
        const response = await fetch (`/api/users`, {
            method: 'POST',
            body: JSON.stringify({ 
                username , 
                email , 
                password  
            }),
            headers: { 'Content-Type': 'application/json' },
        });
        
        if(response.ok){
            document.location.replace('/');
        }else{
            alert('Failed to sign up.');
        }
    }
};


document.querySelector('.sign-up-form')
document.addEventListener('submit', signUpFormHandler);
