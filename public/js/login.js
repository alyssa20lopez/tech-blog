const loginFormHandler = async (event) => {
  event.preventDefault();

  const user = document.querySelector('#username-login').value.trim();
  const pass = document.querySelector('#password-login').value.trim();

  if (user && pass) {
    const response = await fetch('/api/member/login', {
      method: 'POST',
      body: JSON.stringify({ user, pass }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to log in.');
    }
  }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

