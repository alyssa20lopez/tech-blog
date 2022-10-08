const loginFormHandler = async (event) => {
  event.preventDefault();

  const member_name = document.querySelector('#member_name-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  const response = await fetch('/api/member/login', {
    method: 'POST',
    body: JSON.stringify({ member_name, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to log in.');
    }
    response.json().then(data => console.log(data))
};

document.querySelector('#submit');
document.addEventListener('submit', loginFormHandler);
