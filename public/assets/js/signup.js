const signUpBtn = document.getElementById("signUpBtn");
const userNameInput = document.getElementById("userNameInput");
const passwordInput = document.getElementById("passwordInput");

signUpBtn.addEventListener("click", async (event) => {
  event.preventDefault();
  const username = userNameInput.value;
  const password = passwordInput.value;

  if (username.trim().length === 0) {
    alert("Please enter a valid username");
    return;
  }

  if (password.trim().length < 6) {
    alert("Password must be at least 6 characters long");
  }

  try {
    const response = await fetch("/api/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const user = await response.json();
    console.log(user);
    window.location.href = "blogs";
  } catch (error) {
    alert(error);
  }
});
