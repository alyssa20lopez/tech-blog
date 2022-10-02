const deleteBtn = document.getElementById("delete");
const updateForm = document.getElementById("update-form");
const post = document.getElementById("post")

const deletePost = async (event) =>{
    event.preventDefault();
    const id = post.getAttribute("data-post_id");

    const response = await fetch(`/dashboard/${id}`, {
        method: "DELETE"
    })

    if(response.ok){
        document.location.replace("/dashboard");
    }else{
        alert("Failed to delete blog post!");
    }
}

const updatePost = async (event) => {
    event.preventDefault();

    const title = document.querySelector('input[name="post-title"]').value;
    const content = document.querySelector('textarea[name="post-body"]').value;
    const id = post.getAttribute("data-post_id");

    const response = await fetch(`/dashboard/singlepost/${id}`, {
        method: "PUT",
        body: JSON.stringify({title, content}),
        headers: {'Content-Type': 'application/json'}
    })

    if(response.ok){
        document.location.replace("/dashboard");
    }else{
        alert("Failed to update blog post!");
    }
}
deleteBtn.addEventListener("click", deletePost);
updateForm.addEventListener("submit", updatePost)