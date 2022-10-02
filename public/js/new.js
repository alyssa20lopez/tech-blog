const newPostHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('input[name="post-title"]').value;
  const content = document.querySelector('textarea[name="post-body"]').value;

  if (!title || !content) {
    alert('You have not entered a title/body for your post!')
  } else {
    const response = await fetch('/dashboard', 
    {
      method: 'POST',
      body: JSON.stringify({ title, content }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      location.reload()
    } else {
      alert('Failed to create a new blog post!');
    }
  }
};

document
  .querySelector('.new-post')
  .addEventListener('submit', newPostHandler);