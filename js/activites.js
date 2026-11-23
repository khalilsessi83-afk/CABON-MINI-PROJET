var rech = document.getElementById("recherche");
var cat = "Toutes";
var cartes = [];
var nb = document.getElementById("compteur");
var zero = document.getElementById("aucun-resultat");
var tri = document.getElementById("tri");

function afficherCartes() {
    var liste = ACTIVITES.slice();
    if (tri.value == "prix-asc") { liste.sort(function(a, b) { return a.prix - b.prix; }); }
    else if (tri.value == "prix-desc") { liste.sort(function(a, b) { return b.prix - a.prix; }); }
    var html = "";
    for (var i = 0; i < liste.length; i++) {
        var a = liste[i];
        html += '<div class="col-12 col-md-6 col-lg-4 col-xl-3 activity" data-categorie="' + a.categorie + '"><article class="card activity-card h-100"><div class="vignette"><img src="' + a.image + '" class="card-img-top" alt="' + a.alt + '" loading="lazy"><span class="badge badge-cat cat-' + a.categorie + '">' + a.categorie + '</span></div><div class="card-body d-flex flex-column"><h2 class="card-title h5">' + a.titre + '</h2><p class="lieu mb-1">' + a.lieu + ' · ' + a.duree + '</p><p class="accroche flex-grow-1">' + a.accroche + '</p><p class="prix mb-3">' + a.prix + ' TND <small>/ personne</small></p><div class="d-grid gap-2"><button type="button" class="btn btn-outline-cb" data-id="' + a.id + '" data-bs-toggle="modal" data-bs-target="#modalActivite">Voir les détails</button><a class="btn btn-cb" href="reservation.html?activite=' + a.id + '">Réserver</a></div></div></article></div>';
    }
    document.getElementById("liste-activites").innerHTML = html;
    cartes = document.getElementsByClassName("activity");
    chercher();
}

function chercher() {
    var mot = rech.value.toLowerCase();
    var nombre = 0;
    for (var i = 0; i < cartes.length; i++) {
        var texte = cartes[i].innerText.toLowerCase();
        var categorie = cartes[i].getAttribute("data-categorie");
        if (texte.includes(mot) && (cat == "Toutes" || categorie == cat)) { cartes[i].style.display = ""; nombre++; }
        else { cartes[i].style.display = "none"; }
    }
    nb.innerHTML = nombre + (nombre > 1 ? " activités affichées" : " activité affichée") + " sur " + ACTIVITES.length;
    zero.classList.toggle("d-none", nombre != 0);
}

function details(id) {
    var activite = trouverActivite(id);
    if (activite == null) { return; }
    document.getElementById("modalTitre").innerHTML = activite.titre;
    document.getElementById("modalImage").src = activite.image;
    document.getElementById("modalImage").alt = activite.alt;
    document.getElementById("modalCategorie").innerHTML = activite.categorie;
    document.getElementById("modalLieu").innerHTML = activite.lieu;
    document.getElementById("modalDuree").innerHTML = activite.duree;
    document.getElementById("modalPrix").innerHTML = activite.prix + " TND par personne";
    document.getElementById("modalId").innerHTML = activite.id;
    document.getElementById("modalDescription").innerHTML = activite.description;
    document.getElementById("modalReserver").href = "reservation.html?activite=" + activite.id;
}

rech.addEventListener("input", chercher);
tri.addEventListener("change", afficherCartes);
document.getElementById("filtres-categories").addEventListener("click", function(event) {
    var bouton = event.target.closest("button[data-categorie]");
    if (bouton == null) { return; }
    cat = bouton.getAttribute("data-categorie");
    var boutons = document.querySelectorAll(".btn-filtre");
    for (var i = 0; i < boutons.length; i++) { boutons[i].classList.toggle("active", boutons[i] == bouton); boutons[i].setAttribute("aria-pressed", boutons[i] == bouton); }
    chercher();
});
document.getElementById("btn-effacer").addEventListener("click", function() { rech.value = ""; tri.value = "defaut"; cat = "Toutes"; afficherCartes(); });
document.getElementById("modalActivite").addEventListener("show.bs.modal", function(event) { details(event.relatedTarget.getAttribute("data-id")); });
afficherCartes();
