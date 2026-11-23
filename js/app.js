var CLE_THEME = "capbon-theme";
function lireTheme() { try { return localStorage.getItem(CLE_THEME) === "dark" ? "dark" : "light"; } catch (e) { return "light"; } }
function appliquerTheme(theme) {
  document.documentElement.setAttribute("data-bs-theme", theme);
  var bouton = document.getElementById("btn-theme");
  if (bouton) { bouton.textContent = theme === "dark" ? "Mode clair" : "Mode sombre"; bouton.setAttribute("aria-pressed", String(theme === "dark")); }
}
appliquerTheme(lireTheme());
document.addEventListener("DOMContentLoaded", function () {
  var bouton = document.getElementById("btn-theme");
  if (bouton) { bouton.addEventListener("click", function () { var theme = lireTheme() === "dark" ? "light" : "dark"; try { localStorage.setItem(CLE_THEME, theme); } catch (e) {} appliquerTheme(theme); }); }
  var form = document.getElementById("form-contact");
  if (!form) { return; }
  var confirmation = document.getElementById("confirmation-contact");
  form.addEventListener("submit", function (event) { event.preventDefault(); confirmation.classList.add("d-none"); if (!form.checkValidity()) { form.classList.add("was-validated"); return; } form.classList.remove("was-validated"); form.reset(); confirmation.classList.remove("d-none"); });
  form.addEventListener("reset", function () { form.classList.remove("was-validated"); confirmation.classList.add("d-none"); });
});
