const signIn = document.getElementById("sign-in-button-header");
const signOut = document.getElementById("sign-out-button-header");
const signUp = document.getElementById("sign-up-button-header");

const signOutUser = async (event) => {
  event.preventDefault();
  console.log("signing out");
  try {
    const res = await fetch("/api/users/signout", {
      method: "POST",
    });
    await res.json();
  } catch (error) {
    console.error(error);
    alert(error);
  }
  window.location.href = "/signin";
};

const goToSignInPage = (event) => {
  event.preventDefault();
  window.location.href = "/signin";
};

const goToSignUpPage = (event) => {
  event.preventDefault();
  window.location.href = "/signup";
};

signOut?.addEventListener("click", signOutUser);
signIn?.addEventListener("click", goToSignInPage);
signUp?.addEventListener("click", goToSignUpPage);
