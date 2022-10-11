const loginFormHandler = async (event) => {
  event.preventDefault();

  const member_name = document.querySelector('#member_name-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (member_name && password) {
    const response = await fetch('/api/members/login', {
      method: 'POST',
      body: JSON.stringify({ member_name, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    // const loginData = await response.json();
    // if(response.status === 400 || response.status === 404){
    //   return alert(loginData.message);
    // }
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to log in.');
    }
    // response.json().then(data => console.log(data))
  }
};

document.querySelector('#login-form').addEventListener('submit', loginFormHandler);