const postComment = async (event) => {
    event.preventDefault();
    const commentText = document.getElementById('commentText').value.trim();
    const postId = document.getElementById('postID').dataset.post_id;

    if (!commentText) {
        alert('Try again');
    }

    if (commentText) {
        const response = await fetch(`/api/comments/new`, {
            method: 'POST',
            body: JSON.stringify({
                text: commentText,
                comment_date: new Date(),
                post_id: postId
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace(`/post/${postId}`);
        } else {
            alert('Failed to post.');
        }
    }
};

document.getElementById('commentForm').addEventListener('submit', postComment);
