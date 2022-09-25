const addTitleInput = document.getElementById("addTitleInput");
const addDescInput = document.getElementById("addDescInput");
const createBlogBtn = document.getElementById("submitBlogButton");

const uploadBlog = async (event) => {
  event.preventDefault();
  const title = addTitleInput.value;
  const description = addDescInput.value;

  const blog = {
    title: title,
    description: description,
    location: location,
  };
  try {
    const response = await fetch("/api/blogs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(blog),
    });
    await response.json();
    window.location.href = "/";
  } catch (error) {
    alert(error);
  }
};

createBlogBtn?.addEventListener("click", uploadBlog);
