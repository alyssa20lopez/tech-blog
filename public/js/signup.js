const signupFormHandler = async (event) => {
  event.preventDefault();

  const user = document.querySelector('#username-signup').value.trim();
  const pass = document.querySelector('#password-signup').value.trim();

  if (user && pass) {
    const response = await fetch('/api/members', {
      method: 'POST',
      body: JSON.stringify({ user, pass }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to sign up.');
    }
  }
};

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
