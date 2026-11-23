var activite = document.getElementById("activite");
var pers = document.getElementById("participants");
var prix = document.getElementById("prix-unitaire");
var sous = document.getElementById("prix-soustotal");
var rem = document.getElementById("prix-remise");
var total = document.getElementById("prix-total");
var message = document.getElementById("alerte-erreurs");
var form = document.getElementById("form-reservation");

function calculerPrix() {
    var choix = trouverActivite(activite.value);
    var prixUnitaire = choix == null ? 0 : choix.prix;
    var nb = Number(pers.value);
    var somme = prixUnitaire * nb;
    var reduction = 0;
    if (nb >= 4) { reduction = somme * 0.10; }
    document.getElementById("info-prix-unitaire").innerHTML = choix == null ? "Prix unitaire : —" : "Prix unitaire : " + formaterTND(prixUnitaire) + " par personne";
    prix.innerHTML = formaterTND(prixUnitaire);
    document.getElementById("prix-participants").innerHTML = nb > 0 ? nb : 0;
    sous.innerHTML = formaterTND(somme);
    rem.innerHTML = formaterTND(reduction);
    total.innerHTML = formaterTND(somme - reduction);
}

for (var i = 0; i < ACTIVITES.length; i++) {
    var option = document.createElement("option");
    option.value = ACTIVITES[i].id;
    option.innerHTML = ACTIVITES[i].titre + " — " + ACTIVITES[i].lieu + " (" + ACTIVITES[i].prix + " TND)";
    activite.appendChild(option);
}

var aujourdHui = new Date();
var dateMin = aujourdHui.getFullYear() + "-" + String(aujourdHui.getMonth() + 1).padStart(2, "0") + "-" + String(aujourdHui.getDate()).padStart(2, "0");
document.getElementById("date").min = dateMin;

var parametres = new URLSearchParams(window.location.search);
if (trouverActivite(parametres.get("activite")) != null) { activite.value = parametres.get("activite"); }
if (parametres.get("date") >= dateMin) { document.getElementById("date").value = parametres.get("date"); }

activite.addEventListener("change", calculerPrix);
pers.addEventListener("input", calculerPrix);
document.getElementById("btn-calculer").addEventListener("click", calculerPrix);

form.addEventListener("submit", function(event) {
    event.preventDefault();
    var nom = document.getElementById("nom").value;
    var prenom = document.getElementById("prenom").value;
    var date = document.getElementById("date").value;
    var type = form.querySelector('input[name="type"]:checked');
    var ok = document.getElementById("conditions").checked;
    var nb = Number(pers.value);
    form.classList.add("was-validated");

    if (nom == "" || prenom == "" || !form.checkValidity() || trouverActivite(activite.value) == null || date < dateMin || nb < 1 || nb > 6 || type == null || ok == false) {
        message.innerHTML = "Merci de remplir correctement tous les champs obligatoires.";
        message.classList.remove("d-none");
    } else {
        calculerPrix();
        message.classList.add("d-none");
        document.getElementById("recap-nom").innerHTML = prenom + " " + nom;
        document.getElementById("recap-activite").innerHTML = activite.options[activite.selectedIndex].text;
        document.getElementById("recap-date").innerHTML = date.split("-").reverse().join("/");
        document.getElementById("recap-participants").innerHTML = pers.value + " (" + type.value.toLowerCase() + ")";
        document.getElementById("recap-total").innerHTML = total.innerHTML;
        document.getElementById("recapitulatif").classList.remove("d-none");
    }
});

form.addEventListener("reset", function() {
    setTimeout(function() {
        form.classList.remove("was-validated");
        message.classList.add("d-none");
        document.getElementById("recapitulatif").classList.add("d-none");
        calculerPrix();
    }, 0);
});

calculerPrix();
