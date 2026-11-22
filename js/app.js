

/* ---- Thème : appliqué tout de suite pour éviter un clignotement ---- */
const CLE_THEME = "capbon-theme";

function lireTheme() {
  try {
    return localStorage.getItem(CLE_THEME) === "dark" ? "dark" : "light";
  } catch (e) {
    return "light"; // localStorage indisponible : thème clair par défaut
  }
}

function appliquerTheme(theme) {
  document.documentElement.setAttribute("data-bs-theme", theme);
  const bouton = document.getElementById("btn-theme");
  if (bouton) {
    bouton.textContent = theme === "dark" ? "Mode clair" : "Mode sombre";
    bouton.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
  }
}

appliquerTheme(lireTheme());

document.addEventListener("DOMContentLoaded", function () {
  appliquerTheme(lireTheme());

  const bouton = document.getElementById("btn-theme");
  if (bouton) {
    bouton.addEventListener("click", function () {
      const nouveau = lireTheme() === "dark" ? "light" : "dark";
      try {
        localStorage.setItem(CLE_THEME, nouveau);
      } catch (e) { /* ignoré */ }
      appliquerTheme(nouveau);
    });
  }

  /* ---- Formulaire de contact (page contact.html uniquement) ---- */
  const formContact = document.getElementById("form-contact");
  if (formContact) {
    const confirmation = document.getElementById("confirmation-contact");

    formContact.addEventListener("submit", function (event) {
      event.preventDefault();               // rien n'est envoyé
      confirmation.classList.add("d-none");
      if (!formContact.checkValidity()) {   // validation HTML5
        formContact.classList.add("was-validated");
        return;
      }
      formContact.classList.remove("was-validated");
      formContact.reset();
      confirmation.classList.remove("d-none");
    });

    formContact.addEventListener("reset", function () {
      formContact.classList.remove("was-validated");
      confirmation.classList.add("d-none");
    });
  }
});
