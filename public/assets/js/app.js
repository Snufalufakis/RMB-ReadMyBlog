const signInBtn = document.getElementById("signInBtn");
const userName = document.getElementById("userNameInput");
const passwordI = document.getElementById("passwordInput");

signUpBtn.addEventListener("click", () => {
  window.location.href = "/signup";
  console.log("signing up");
});

signInBtn.addEventListener("click", async (event) => {
  event.preventDefault();
  console.log("signing in");
  const username = userName.value;
  const password = passwordI.value;
  try {
    const response = await fetch("/api/signin", {
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
    window.location.href = "/blogs";
  } catch (error) {
    alert(error);
  }
});
