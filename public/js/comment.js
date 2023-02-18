

const commentFormHandler = async (event) => {
    event.preventDefault();

    const comment = document.querySelector('#comment-input').value.trim();
    const windowArray = window.location.href.split('/');
    const post_id = windowArray[windowArray.length - 1];

    if (comment) {
      const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ comment, post_id }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.url.includes('login')) {
        document.location.replace(window.location.href);
      } else {
        document.location.replace('/login');
      }
    }
  };

  document
    .querySelector('#comment-form')
    .addEventListener('submit', commentFormHandler);
