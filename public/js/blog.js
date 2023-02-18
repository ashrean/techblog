const postFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#title-input').value.trim();
    const text = document.querySelector('#text-input').value.trim();
    if (title && text) {
      const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({ title, text }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to create post.');
      }
    }
  };

  document
    .querySelector('#new-post')
    .addEventListener('submit', postFormHandler);

  const deleteBtnArr = document.querySelectorAll('.delete-post');
  if(deleteBtnArr) {
    deleteBtnArr.forEach((btn) => {
      btn.addEventListener('click', async (event) => {
        event.preventDefault();
        const id = event.target.getAttribute('data-id');
        const response = await fetch(`/api/posts/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          document.location.replace('/dashboard');
        } else {
          alert('Failed to delete post.');
        }
      });
    });
  }
