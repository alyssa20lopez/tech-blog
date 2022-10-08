const signupFormHandler = async (event) => {
  event.preventDefault();

  const member_name = document.querySelector('#member_name-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (member_name && password) {
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
