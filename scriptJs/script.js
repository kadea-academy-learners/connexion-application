document.addEventListener("DOMContentLoaded", () =>{
    const formulaire = document.getElementById("register");
    const myNames = document.getElementById("names");
    const myMail = document.getElementById("email");
    const myAge = document.getElementById("ages");
    const myPassword = document.getElementById("passwords");

    formulaire.addEventListener("submit", async (e)=>{
       e.preventDefault();

       const userData ={
         names: myNames.value.trim(),
         emails : myMail.value.trim(),
         age : myAge.value,
         password: myPassword.value,
       }

       
       try {
         const response = await fetch("http://localhost:3000/users", {
            method : "POST",
            headers : {
                "Content-Type": "application/json",
            },

             body: JSON.stringify(userData),
         });

         
       const resultat = await response.json();
        console.log(resultat);
        alert("Utilisateur enregistré !");
         formulaire.reset();
            myPassword.value = "";
       } catch (error) {
          console.error("Erreur :", error);
       }

    })
})