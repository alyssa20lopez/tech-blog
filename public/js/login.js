const loginFormHandler = async (event) => {
  event.preventDefault();

  const member_name = document.querySelector('#member_name-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (member_name && password) {
    const response = await fetch('/api/members/login', {
      method: 'POST',
      body: JSON.stringify({ member_name: member_name, password: password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to log in.');
    }
  }
};

document.querySelector('#login-form').addEventListener('submit', loginFormHandler);