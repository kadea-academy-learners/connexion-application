const formulaire = document.getElementById("register");
const myNames = document.getElementById("names");
const myMail = document.getElementById("email");
const myAge = document.getElementById("ages");
const myPassword = document.getElementById("passwords");
document.getElementById("toast-container")

formulaire.addEventListener("submit", async (e) => {
  e.preventDefault();

  const userData = {
    names: myNames.value.trim(),
    emails: myMail.value.trim(),
    age: myAge.value,
    password: myPassword.value,
  };

  try {
    const response = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Échec de l’enregistrement");
    }

    await response.json();

    formulaire.reset();

    window.location.href = "../pages/welcome.html";

  } catch (error) {
    console.error(error);
    alert("Erreur lors de l’inscription");
  }
});
