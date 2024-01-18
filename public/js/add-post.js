
async function newFormHandler(event) {
    event.preventDefault();
    const post_title = document.getElementById('post_title').value;
    const post_contents = document.getElementById('post_content').value;

    const response = await fetch(`/api/post`, {
        method: 'POST', 
        body: JSON.stringify({
            post_title,
            post_contents,
        }),
        headers: {
            'Content-Type': 'application/json'
        },
    });

    if (response.ok) {
        document.location.replace(`/dashboard`);
    }
    else {
        alert('failed to post article');
    }
  
}

    document
    .querySelector('.new-post-form')
    .addEventListener('submit', newFormHandler);