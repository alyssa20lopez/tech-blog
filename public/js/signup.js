const signupFormHandler = async (event) => {
  event.preventDefault();
 
  const member_name = $("#member_name-signup").val().trim();
  const email = $("#email-signup").val().trim();
  const password = $("#password-signup").val().trim();

  if (member_name && password) {
    const response = await fetch('/api/member', {
      method: 'POST',
      body: JSON.stringify({ member_name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    const signupData = await response.json();
    if(response.status === 400 || response.status === 404){
      return alert(signupData.message);
    }
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to sign up.');
    }
  }
};

$('#signupBtn').submit(signupFormHandler);
