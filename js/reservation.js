const SEUIL_REMISE = 4;
const TAUX_REMISE = 0.10;
const MIN_PARTICIPANTS = 1;
const MAX_PARTICIPANTS = 6;

const form = document.getElementById("form-reservation");
const champs = {
  nom: document.getElementById("nom"),
  prenom: document.getElementById("prenom"),
  email: document.getElementById("email"),
  telephone: document.getElementById("telephone"),
  activite: document.getElementById("activite"),
  date: document.getElementById("date"),
  participants: document.getElementById("participants"),
  conditions: document.getElementById("conditions")
};
const alerteErreurs = document.getElementById("alerte-erreurs");
const erreurType = document.getElementById("erreur-type");
const erreurDate = document.getElementById("erreur-date");
const recap = document.getElementById("recapitulatif");

function dateDuJour() {
  const d = new Date();
  const mois = String(d.getMonth() + 1).padStart(2, "0");
  const jour = String(d.getDate()).padStart(2, "0");
  return d.getFullYear() + "-" + mois + "-" + jour;
}

function formaterDate(iso) {
  const [a, m, j] = iso.split("-");
  return j + "/" + m + "/" + a;
}

function emailValide(valeur) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(valeur);
}

function telephoneValide(valeur) {
  const chiffres = valeur.replace(/\D/g, "");
  return valeur.trim() !== "" && chiffres.length >= 8 && /^[+\d\s().-]+$/.test(valeur.trim());
}

function calculerPrix(prixUnitaire, participants) {
  const sousTotal = prixUnitaire * participants;
  const remise = participants >= SEUIL_REMISE ? sousTotal * TAUX_REMISE : 0;
  return { sousTotal: sousTotal, remise: remise, total: sousTotal - remise };
}

function participantsValides() {
  const n = Number(champs.participants.value);
  return champs.participants.value !== "" && Number.isInteger(n) && n >= MIN_PARTICIPANTS && n <= MAX_PARTICIPANTS;
}

function actualiserPrix() {
  const activite = trouverActivite(champs.activite.value);
  const prix = activite ? activite.prix : 0;
  const n = participantsValides() ? Number(champs.participants.value) : 0;
  const montants = calculerPrix(prix, n);

  document.getElementById("info-prix-unitaire").textContent =
    activite ? "Prix unitaire : " + formaterTND(prix) + " par personne" : "Prix unitaire : —";
  document.getElementById("prix-unitaire").textContent = formaterTND(prix);
  document.getElementById("prix-participants").textContent = n;
  document.getElementById("prix-soustotal").textContent = formaterTND(montants.sousTotal);
  document.getElementById("prix-remise").textContent = montants.remise > 0 ? "− " + formaterTND(montants.remise) : formaterTND(0);
  document.getElementById("prix-total").textContent = formaterTND(montants.total);
  return montants;
}

function marquer(champ, valide) {
  champ.classList.toggle("is-invalid", !valide);
  champ.classList.toggle("is-valid", valide);
}

function valider() {
  const erreurs = [];

  const nomOk = champs.nom.value.trim() !== "";
  marquer(champs.nom, nomOk);
  if (!nomOk) { erreurs.push("Le nom est obligatoire."); }

  const prenomOk = champs.prenom.value.trim() !== "";
  marquer(champs.prenom, prenomOk);
  if (!prenomOk) { erreurs.push("Le prénom est obligatoire."); }

  const emailOk = emailValide(champs.email.value.trim());
  marquer(champs.email, emailOk);
  if (!emailOk) { erreurs.push("L'adresse e-mail est absente ou invalide."); }

  const telOk = telephoneValide(champs.telephone.value);
  marquer(champs.telephone, telOk);
  if (!telOk) { erreurs.push("Le téléphone est obligatoire (au moins 8 chiffres)."); }

  const actOk = trouverActivite(champs.activite.value) !== null;
  marquer(champs.activite, actOk);
  if (!actOk) { erreurs.push("Choisissez une activité."); }


  const dateSaisie = champs.date.value;
  let dateOk = true;
  if (dateSaisie === "") {
    dateOk = false;
    erreurDate.textContent = "Choisissez une date de réservation.";
    erreurs.push("La date souhaitée est obligatoire.");
  } else if (dateSaisie < dateDuJour()) {
    dateOk = false;
    erreurDate.textContent = "Cette date est passée : choisissez aujourd'hui ou une date future.";
    erreurs.push("La date souhaitée est passée (" + formaterDate(dateSaisie) + ").");
  }
  marquer(champs.date, dateOk);

  const nbOk = participantsValides();
  marquer(champs.participants, nbOk);
  if (!nbOk) { erreurs.push("Le nombre de participants doit être un entier entre 1 et 6."); }

  const typeOk = form.querySelector('input[name="type"]:checked') !== null;
  erreurType.classList.toggle("d-none", typeOk);
  if (!typeOk) { erreurs.push("Choisissez un type de participation."); }

  const condOk = champs.conditions.checked;
  marquer(champs.conditions, condOk);
  if (!condOk) { erreurs.push("Vous devez accepter les conditions de simulation."); }

  return erreurs;
}

function afficherErreurs(erreurs) {
  recap.classList.add("d-none");
  alerteErreurs.innerHTML = "<strong>Merci de corriger les points suivants :</strong><ul class=\"mb-0\">" +
    erreurs.map(function (e) { return "<li>" + e + "</li>"; }).join("") + "</ul>";
  alerteErreurs.classList.remove("d-none");
  alerteErreurs.focus();
}

function afficherRecap(montants) {
  const activite = trouverActivite(champs.activite.value);
  const n = Number(champs.participants.value);
  const type = form.querySelector('input[name="type"]:checked').value;
  document.getElementById("recap-nom").textContent = champs.prenom.value.trim() + " " + champs.nom.value.trim();
  document.getElementById("recap-activite").textContent = activite.id + " — " + activite.titre + " (" + activite.lieu + ")";
  document.getElementById("recap-date").textContent = formaterDate(champs.date.value);
  document.getElementById("recap-participants").textContent = n + " (" + type.toLowerCase() + ")";
  document.getElementById("recap-total").textContent = formaterTND(montants.total) +
    (montants.remise > 0 ? " (remise de " + formaterTND(montants.remise) + " incluse)" : "");
  recap.classList.remove("d-none");
  recap.focus();
  recap.scrollIntoView({ behavior: "smooth", block: "center" });
}

function remplirListeActivites() {
  for (const a of ACTIVITES) {
    const option = document.createElement("option");
    option.value = a.id;
    option.textContent = a.titre + " — " + a.lieu + " (" + a.prix + " TND)";
    champs.activite.appendChild(option);
  }
}

function lireParametresUrl() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("activite");
  if (id && trouverActivite(id)) { champs.activite.value = id; }
  const date = params.get("date");
  if (date && /^\d{4}-\d{2}-\d{2}$/.test(date) && date >= dateDuJour()) { champs.date.value = date; }
}

remplirListeActivites();
champs.date.min = dateDuJour();
lireParametresUrl();
actualiserPrix();

champs.activite.addEventListener("change", actualiserPrix);
champs.participants.addEventListener("input", actualiserPrix);
document.getElementById("btn-calculer").addEventListener("click", actualiserPrix);

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const erreurs = valider();
  if (erreurs.length > 0) {
    afficherErreurs(erreurs);
    return;
  }
  alerteErreurs.classList.add("d-none");
  afficherRecap(actualiserPrix());
});

form.addEventListener("reset", function () {

  setTimeout(function () {
    form.querySelectorAll(".is-valid, .is-invalid").forEach(function (el) {
      el.classList.remove("is-valid", "is-invalid");
    });
    erreurType.classList.add("d-none");
    alerteErreurs.classList.add("d-none");
    recap.classList.add("d-none");
    actualiserPrix();
  }, 0);
});
