const signInBtn = document.getElementById("sign-in-button");
const signinUsernameInput = document.getElementById("username-input");
const signinPasswordInput = document.getElementById("password-input");

const signInUser = async (e) => {
  e.preventDefault();
  console.log("clicked");
  const username = signinUsernameInput.value;
  const password = signinPasswordInput.value;

  // checks to make sure username is not empty
  if (username.trim().length === 0) {
    alert("Please enter a valid username");
    return;
  }
  // checks that password is greater than 6 characters
  if (password.trim().length < 6) {
    alert("Please enter a valid password. Password must be 6 characters long.");
    return;
  }

  // the user input to the /api/signup endpoint
  try {
    const response = await fetch("/api/users/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    console.log(await response, " Here!!!!");
    if (response.success) {
      const responseData = await response.json();
      window.location.href = "/";
    } else {
      alert("Please enter correct username and password");
    }
    // change user window to the /users endpoint
  } catch (error) {
    console.log(error, " 6 hours?");
    alert(error);
  }
};

signInBtn?.addEventListener("click", signInUser);
