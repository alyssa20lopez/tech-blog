const signupFormHandler = async (event) => {
  event.preventDefault();
 
  const member_name = $("#member_name-signup").val().trim();
  const password = $("#password-signup").val().trim();

  if (member_name && password) {
    const response = await fetch('/api/signup', {
      method: 'POST',
      body: JSON.stringify({ member_name, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    const signupData = await response.json();
    if(response.status === 400 || response.status === 404){
      return alert(signupData.message);
    }
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to sign up.');
    }
  }
};

$('#signupBtn').click(signupFormHandler);
