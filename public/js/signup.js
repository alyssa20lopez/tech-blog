const signupFormHandler = async (event) => {
  event.preventDefault();
 
  const member_name = document.querySelector("#member_name-signup").value.trim();
  const email = document.querySelector("#email-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();

  if (member_name && email && password) {
    const response = await fetch('/api/members', {
      method: 'POST',
      body: JSON.stringify({ member_name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to sign up.');
    }
  }
};

document.querySelector('#signup-form').addEventListener('submit', signupFormHandler);
