const commentFormHandler = async (event) => {
  event.preventDefault();

  const post_id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];
  const comment_text = document.querySelector('input[name="comment-body"]').value.trim();


  if (!comment_text) {
    alert('You must add text for your comment!')
  } else {
    const response = await fetch('/api/comments', 
    {
      method: 'POST',
      body: JSON.stringify({ post_id, comment_text }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.reload()
    } else {
      alert('Failed to create comment!');
    }
  }
};

document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);
