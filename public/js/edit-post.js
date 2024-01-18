async function editFormHandler(event) {
    event.preventDefault();

    const post_title = document.getElementById('post_title').value;
    const post_contents = document.getElementById('post_contents').value;

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    console.log('this is the ID from line 9: ', id);

    const response = await fetch(`/api/post/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            post_title,
            post_contents,
        }),
        headers: {
            'Content-Type': 'application/json'
        },
    });

    if (response.ok) {
        document.location.replace(`/post/${id}`);
    } else {
        alert('Failed to edit post', id);
    }
}

document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);
