const signOut = document.getElementById("signOutBtn");
signOut.addEventListener("click", async (event) => {
  event.preventDefault();
  console.log("signing out");
  try {
    const res = await fetch("/api/signout", {
      method: "POST",
    });
    await res.json();
  } catch (error) {
    console.error(error);
    alert(error);
  }
  window.location.href = "/homepage";
});
