const conteneur = document.getElementById("liste-activites");
const champRecherche = document.getElementById("recherche");
const groupeFiltres = document.getElementById("filtres-categories");
const selectTri = document.getElementById("tri");
const boutonEffacer = document.getElementById("btn-effacer");
const compteur = document.getElementById("compteur");
const messageVide = document.getElementById("aucun-resultat");
const modalElement = document.getElementById("modalActivite");

let categorieActive = "Toutes";

function normaliser(texte) {
  return texte.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();
}

function creerCarte(a) {
  return `
    <div class="col-12 col-md-6 col-lg-4 col-xl-3" data-id="${a.id}">
      <article class="card activity-card h-100">
        <div class="vignette">
          <img src="${a.image}" class="card-img-top" alt="${a.alt}" loading="lazy">
          <span class="badge badge-cat cat-${a.categorie}">${a.categorie}</span>
        </div>
        <div class="card-body d-flex flex-column">
          <h2 class="card-title h5">${a.titre}</h2>
          <p class="lieu mb-1">${a.lieu} · ${a.duree}</p>
          <p class="accroche flex-grow-1">${a.accroche}</p>
          <p class="prix mb-3">${a.prix} TND <small>/ personne</small></p>
          <div class="d-grid gap-2">
            <button type="button" class="btn btn-outline-cb btn-details" data-id="${a.id}"
                    data-bs-toggle="modal" data-bs-target="#modalActivite">Voir les détails</button>
            <a class="btn btn-cb" href="reservation.html?activite=${a.id}">Réserver</a>
          </div>
        </div>
      </article>
    </div>`;
}

function filtrerActivites() {
  const motCle = normaliser(champRecherche.value);
  const resultat = [];
  for (let i = 0; i < ACTIVITES.length; i++) {
    const a = ACTIVITES[i];
    const bonneCategorie = categorieActive === "Toutes" || a.categorie === categorieActive;
    const texte = normaliser(a.titre + " " + a.lieu);
    const bonMotCle = motCle === "" || texte.includes(motCle);
    if (bonneCategorie && bonMotCle) {
      resultat.push(a);
    }
  }
  return resultat;
}

function trierActivites(liste) {
  const copie = liste.slice();
  if (selectTri.value === "prix-asc") {
    copie.sort(function (x, y) { return x.prix - y.prix; });
  } else if (selectTri.value === "prix-desc") {
    copie.sort(function (x, y) { return y.prix - x.prix; });
  }
  return copie;
}

function afficher() {
  const liste = trierActivites(filtrerActivites());
  let html = "";
  for (const a of liste) {
    html += creerCarte(a);
  }
  conteneur.innerHTML = html;

  const n = liste.length;
  compteur.textContent = n === 0 ? "0 activité affichée sur " + ACTIVITES.length
                                 : n + (n > 1 ? " activités affichées" : " activité affichée") + " sur " + ACTIVITES.length;
  messageVide.classList.toggle("d-none", n !== 0);
}

champRecherche.addEventListener("input", afficher);
selectTri.addEventListener("change", afficher);

groupeFiltres.addEventListener("click", function (event) {
  const bouton = event.target.closest("button[data-categorie]");
  if (!bouton) { return; }
  categorieActive = bouton.dataset.categorie;
  const boutons = groupeFiltres.querySelectorAll("button");
  boutons.forEach(function (b) {
    const actif = b === bouton;
    b.classList.toggle("active", actif);
    b.setAttribute("aria-pressed", actif ? "true" : "false");
  });
  afficher();
});

boutonEffacer.addEventListener("click", function () {
  champRecherche.value = "";
  selectTri.value = "defaut";
  groupeFiltres.querySelector('[data-categorie="Toutes"]').click();
  champRecherche.focus();
});

modalElement.addEventListener("show.bs.modal", function (event) {
  const declencheur = event.relatedTarget;
  const a = trouverActivite(declencheur.dataset.id);
  if (!a) { return; }
  document.getElementById("modalTitre").textContent = a.titre;
  const img = document.getElementById("modalImage");
  img.src = a.image;
  img.alt = a.alt;
  const cat = document.getElementById("modalCategorie");
  cat.textContent = a.categorie;
  cat.className = "badge cat-" + a.categorie;
  document.getElementById("modalLieu").textContent = a.lieu;
  document.getElementById("modalDuree").textContent = a.duree;
  document.getElementById("modalPrix").textContent = a.prix + " TND par personne";
  document.getElementById("modalId").textContent = a.id;
  document.getElementById("modalDescription").textContent = a.description;
  document.getElementById("modalReserver").href = "reservation.html?activite=" + a.id;
});

afficher();
