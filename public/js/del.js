const delPost = async (event) => {
    event.preventDefault();

    const postId = document.getElementById('postID').dataset.post_id;
    const response = await fetch(`/api/post/${postId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    })

    if (response.ok) {
        document.location.replace("/dashboard");
    } else {
        alert("Server error: Please try again");
    }

}
document.getElementById('delPostbtn').addEventListener('click', delPost);