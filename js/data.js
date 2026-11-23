const ACTIVITES = [
  {
    id: "A01", titre: "Découverte de la médina", lieu: "Nabeul", categorie: "Culture",
    duree: "2 h", prix: 20, image: "images/a01-medina.jpg",
    alt: "Ruelle blanche de la médina avec une grande porte bleue cloutée et des bougainvilliers",
    accroche: "Ruelles blanches, portes bleues et parfums d'épices.",
    description: "Cette balade guidée vous emmène au cœur de la médina de Nabeul, entre ruelles blanchies à la chaux et portes bleues cloutées. Votre guide raconte l'histoire des familles de commerçants et l'architecture des maisons traditionnelles. Vous passez devant les ateliers et les boutiques où l'on travaille encore la céramique et les tissus. La visite se termine par une pause thé à la menthe dans un café typique."
  },
  {
    id: "A02", titre: "Atelier d'initiation à la poterie", lieu: "Nabeul", categorie: "Artisanat",
    duree: "1 h 30", prix: 35, image: "images/a02-poterie.jpg",
    alt: "Mains modelant un vase d'argile sur un tour de potier dans un atelier",
    accroche: "Façonnez votre premier vase sur le tour du potier.",
    description: "Dans un atelier de Nabeul, un maître potier vous apprend à centrer l'argile et à monter la forme d'un vase sur le tour. Vous découvrez les gestes qui se transmettent de génération en génération. Chaque participant façonne sa propre pièce et choisit une finition. Le matériel et le tablier sont fournis, aucune expérience n'est nécessaire."
  },
  {
    id: "A03", titre: "Parcours découverte de Kerkouane", lieu: "Kerkouane", categorie: "Culture",
    duree: "2 h 30", prix: 30, image: "images/a03-kerkouane.jpg",
    alt: "Colonnes et murs de pierre d'une cité antique au bord de la mer",
    accroche: "Une cité punique les pieds dans la Méditerranée.",
    description: "Kerkouane est l'un des rares sites puniques conservés, installé face à la mer. Un guide vous fait lire le plan des maisons, des rues et des bains. Vous découvrez comment vivaient les habitants il y a plus de deux mille ans. Le parcours se poursuit par la nécropole et se termine par un point de vue sur la côte."
  },
  {
    id: "A04", titre: "Randonnée découverte", lieu: "Djebel Abderrahmane", categorie: "Nature",
    duree: "3 h", prix: 25, image: "images/a04-randonnee.jpg",
    alt: "Randonneur sur un sentier de montagne bordé de pins",
    accroche: "Sentiers, pins et panoramas sur le massif.",
    description: "Cette randonnée de difficulté modérée traverse les sentiers du massif du Djebel Abderrahmane. Vous marchez à travers les pins et la garrigue avec un guide qui présente la faune et la flore. Plusieurs haltes panoramiques permettent de photographier la plaine du Cap Bon. Prévoyez de bonnes chaussures, de l'eau et un chapeau."
  },
  {
    id: "A05", titre: "Circuit du littoral", lieu: "Kélibia", categorie: "Nature",
    duree: "3 h", prix: 40, image: "images/a05-kelibia.jpg",
    alt: "Fort sur une colline dominant la plage et la mer turquoise",
    accroche: "Forteresse, criques turquoise et port de pêche.",
    description: "Ce circuit commence par la forteresse qui domine la ville de Kélibia et sa baie. Vous longez ensuite le littoral pour rejoindre des criques de sable blanc à l'eau turquoise. Une halte au port de pêche permet de rencontrer les pêcheurs au retour des barques. Le parcours alterne marche tranquille, baignade facultative et temps d'observation."
  },
  {
    id: "A06", titre: "Peinture sur céramique", lieu: "Nabeul", categorie: "Artisanat",
    duree: "2 h", prix: 25, image: "images/a06-ceramique.jpg",
    alt: "Grande assiette en céramique peinte de motifs bleus, pinceau et pots de couleur",
    accroche: "Décorez une assiette aux couleurs de Nabeul.",
    description: "Cet atelier vous invite à peindre un plat ou une assiette en céramique, une spécialité reconnue de Nabeul. Un artisan présente les motifs traditionnels : fleurs, étoiles et frises géométriques. Vous composez ensuite votre propre décor avec des pinceaux fins et des émaux colorés. La pièce est cuite après l'atelier puis récupérable quelques jours plus tard."
  },
  {
    id: "A07", titre: "Découverte d'un marché local", lieu: "Nabeul", categorie: "Découverte",
    duree: "1 h 30", prix: 15, image: "images/a07-marche.jpg",
    alt: "Étals colorés d'un marché avec oranges, piments et épices",
    accroche: "Agrumes, épices et saveurs du Cap Bon.",
    description: "Accompagné d'un guide, vous parcourez les allées d'un marché local de Nabeul. Vous goûtez des agrumes, des dattes et des spécialités selon la saison. Le guide explique comment reconnaître les épices, les huiles et les produits de la région. Cette visite est idéale pour comprendre le quotidien des habitants et rapporter des souvenirs authentiques."
  },
  {
    id: "A08", titre: "Promenade photographique", lieu: "Hammamet", categorie: "Découverte",
    duree: "2 h", prix: 30, image: "images/a08-hammamet.jpg",
    alt: "Forteresse de Hammamet au coucher du soleil avec palmiers et appareil photo",
    accroche: "Cadrez la médina et le front de mer à l'heure dorée.",
    description: "Cette promenade à Hammamet est pensée pour les amateurs de photographie, débutants comme confirmés. Un photographe local vous montre comment composer une image à partir des remparts, des ruelles et du front de mer. Le départ est fixé à l'heure où la lumière devient dorée. Chaque participant repart avec des conseils personnalisés, que ce soit avec un appareil photo ou un téléphone."
  }
];

const CATEGORIES = ["Toutes", "Culture", "Artisanat", "Nature", "Découverte"];

function trouverActivite(id) {
  for (let i = 0; i < ACTIVITES.length; i++) {
    if (ACTIVITES[i].id === id) {
      return ACTIVITES[i];
    }
  }
  return null;
}

function formaterTND(montant) {
  return montant.toFixed(2).replace(".", ",") + " TND";
}
