const deletePostHandler = async (event) => {
    event.preventDefault();
    if (event.target.matches('.delete-post-form button')) {
      const postId = event.target.closest('.delete-post-form').getAttribute('data-id');
  
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
  
  document.addEventListener('click', deletePostHandler);
  