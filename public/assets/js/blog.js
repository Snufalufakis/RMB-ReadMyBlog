const commentInputEl = document.getElementById("comment-input");
const commentButtonEl = document.getElementById("comment-button");

const blogComment = async (event) => {
  event.preventDefault();
  const blogID = window.location.pathname.substring(7);
  console.log(blogID);
  const comment = {
    comment: commentInputEl.value,
    blogID: blogID,
  };
  try {
    const response = await fetch("/api/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(comment),
    });
    await response.json();
    window.location.reload();
  } catch (error) {
    console.error(error);
  }
};

commentButtonEl?.addEventListener("click", blogComment);
