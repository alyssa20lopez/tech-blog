const loginFormHandler = async (event) => {
  event.preventDefault();

  const member_name = $('#member_name-login').val().trim();
  const password = $('#password-login').val().trim();

  if (member_name && password) {
    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ member_name, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    const loginData = await response.json();
    if(response.status === 400 || response.status === 404){
      return alert(loginData.message);
    }
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to log in.');
    }
    // response.json().then(data => console.log(data))
  }
};

$('#submit').submit(loginFormHandler);
