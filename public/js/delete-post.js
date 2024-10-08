const deletePostHandler = async (event) => {
  if (event.target.matches('.delete-post-btn'))  {
  event.preventDefault();
    console.log('button click')
  
      const postId = event.target.closest('.delete-post').getAttribute('data-id');
  
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
  