const logout = async () => {

  const response = await fetch('/api/members/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert('Failed to log out.');
  }
};

document.querySelector('#logout').addEventListener('click', logout);
