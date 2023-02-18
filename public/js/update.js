const updateFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#title-update').value.trim();
    const text = document.querySelector('#text-update').value.trim();
    const id = document.querySelector('#post-id').textContent.trim();
    if (title && text) {
      const response = await fetch('/api/posts/' + id, {
        method: 'PUT',
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
    .querySelector('#update-post')
    .addEventListener('submit', updateFormHandler);
