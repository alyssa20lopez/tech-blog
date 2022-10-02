const newCommentHandler = async (event) => {
  event.preventDefault();

  const commentInput = document.querySelector('#comment-input').value.trim();
  const content = commentInput.value.trim();
  const post_id = window.location.pathname.replace('/single/','');

  if (!content) {
    alert('You must add text for your comment!')
  } else {
    const response = await fetch('/commentRoutes', 
    {
      method: 'POST',
      body: JSON.stringify({ content, post_id }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      location.reload()
    } else {
      alert('Failed to create comment!');
    }
  }
};

document
  .querySelector('.comment-form')
  .addEventListener('submit', newCommentHandler);
