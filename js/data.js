var ACTIVITES = [
  ["A01", "Découverte de la médina", "Nabeul", "Culture", "2 h", 20, "a01-medina.jpg", "Ruelles blanches, portes bleues et parfums d'épices."],
  ["A02", "Atelier d'initiation à la poterie", "Nabeul", "Artisanat", "1 h 30", 35, "a02-poterie.jpg", "Façonnez votre premier vase sur le tour du potier."],
  ["A03", "Parcours découverte de Kerkouane", "Kerkouane", "Culture", "2 h 30", 30, "a03-kerkouane.jpg", "Une cité punique les pieds dans la Méditerranée."],
  ["A04", "Randonnée découverte", "Djebel Abderrahmane", "Nature", "3 h", 25, "a04-randonnee.jpg", "Sentiers, pins et panoramas sur le massif."],
  ["A05", "Circuit du littoral", "Kélibia", "Nature", "3 h", 40, "a05-kelibia.jpg", "Forteresse, criques turquoise et port de pêche."],
  ["A06", "Peinture sur céramique", "Nabeul", "Artisanat", "2 h", 25, "a06-ceramique.jpg", "Décorez une assiette aux couleurs de Nabeul."],
  ["A07", "Découverte d'un marché local", "Nabeul", "Découverte", "1 h 30", 15, "a07-marche.jpg", "Agrumes, épices et saveurs du Cap Bon."],
  ["A08", "Promenade photographique", "Hammamet", "Découverte", "2 h", 30, "a08-hammamet.jpg", "Cadrez la médina et le front de mer à l'heure dorée."]
].map(function (item) { return { id: item[0], titre: item[1], lieu: item[2], categorie: item[3], duree: item[4], prix: item[5], image: "images/" + item[6], alt: item[1], accroche: item[7], description: item[7] }; });
function trouverActivite(id) { return ACTIVITES.find(function (activite) { return activite.id === id; }) || null; }
function formaterTND(montant) { return Number(montant).toFixed(2).replace(".", ",") + " TND"; }
