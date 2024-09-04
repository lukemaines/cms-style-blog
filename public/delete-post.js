const deletePostHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const postId = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to delete post');
      }
    }
  };
  
  document.querySelector('.post-list').addEventListener('click', deletePostHandler);
  