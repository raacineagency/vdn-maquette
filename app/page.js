'use client';

import { useState, useEffect, useRef } from 'react';

// ==========================================
// DEDICATED E-COMMERCE PRODUCTS DATABASE
// ==========================================
const PRODUCTS_DATABASE = {
  "1": {
    id: "1",
    title: "Whey Isolate Gold",
    brand: "QNT Sport",
    price: 34.90,
    oldPrice: 39.90,
    img: "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?fit=crop&w=600&h=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?fit=crop&w=600&h=800&q=80",
      "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?fit=crop&w=600&h=800&q=80",
      "https://images.unsplash.com/photo-1546554137-f86b9593a222?fit=crop&w=600&h=800&q=80"
    ],
    rating: 4.9,
    reviewsCount: 142,
    tag: "Performance",
    flavors: ["Chocolat Belge", "Vanille Intense", "Fraise Sauvage"],
    sizes: ["908 g (30 shakers)", "2000 g (66 shakers)"],
    benefits: [
      "Isolat de whey pur à 100% avec assimilation ultra-rapide",
      "Zéro glucide, zéro graisse et sans lactose ajouté",
      "Enrichi en BCAA naturels (plus de 20%) pour la récupération"
    ],
    shortDesc: "Une formule premium d'isolat de whey ultra-filtrée à absorption rapide, idéale pour la construction et la définition musculaire. Sans lactose et très faible en sucre.",
    description: "La Whey Isolate Gold de QNT Sport représente le summum de la technologie des poudres protéinées. Obtenue par microfiltration à flux croisé (CFM), elle préserve toutes les fractions peptidiques importantes pour la récupération. Idéale à consommer immédiatement après l'entraînement.",
    usage: "Mélanger 1 dosette (30g) avec 200-250 ml d'eau froide ou de lait végétal. Consommer de préférence directement après l'effort ou en collation le matin.",
    ingredients: [
      { name: "Protéine (Isolat de Whey)", amount: "26.4 g" },
      { name: "BCAA totaux", amount: "6.2 g" },
      { name: "Glucides", amount: "0.8 g" },
      { name: "dont Sucres", amount: "0.2 g" },
      { name: "Lipides", amount: "0.3 g" }
    ],
    faq: [
      { q: "Quand dois-je consommer cet isolat ?", a: "Pour des résultats optimaux, consommez une portion immédiatement après votre entraînement pour stopper le catabolisme et accélérer la synthèse des protéines." },
      { q: "Est-il adapté aux personnes intolérantes au lactose ?", a: "Oui, notre isolat subit une filtration poussée qui élimine la quasi-totalité du lactose, la rendant extrêmement digeste." },
      { q: "Puis-je le mélanger avec du lait ?", a: "Oui, mais pour une absorption ultra-rapide après l'effort, l'eau est recommandée car le lait ralentit légèrement la digestion." }
    ]
  },
  "2": {
    id: "2",
    title: "Vegan Protein",
    brand: "Aqeelab Nutrition",
    price: 29.90,
    img: "https://images.unsplash.com/photo-1546554137-f86b9593a222?fit=crop&w=600&h=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1546554137-f86b9593a222?fit=crop&w=600&h=800&q=80",
      "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?fit=crop&w=600&h=800&q=80",
      "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?fit=crop&w=600&h=800&q=80"
    ],
    rating: 4.8,
    reviewsCount: 96,
    tag: "Bio & Végétal",
    flavors: ["Vanille Sauvage", "Chocolat Intense", "Caramel Salé"],
    sizes: ["750 g", "1500 g"],
    benefits: [
      "Protéines de Pois, Riz et Courge 100% végétales",
      "Sans soja, sans gluten et hypoallergénique",
      "Riche en acides aminés essentiels et texture ultra-crémeuse"
    ],
    shortDesc: "Source saine et complète de protéines végétales hypoallergéniques (pois, riz, courge). Sans soja, sans gluten, texture crémeuse et goût irrésistible de vanille sauvage.",
    description: "Vegan Protein combine trois sources de protéines complémentaires pour offrir un profil complet d'acides aminés. Facilement digestible, elle convient parfaitement aux végétariens, végétaliens et personnes intolérantes au lactose.",
    usage: "Diluer 1 dosette (30g) dans 250ml de lait d'amande ou d'eau. Secouer vigoureusement. À consommer au petit-déjeuner ou après le sport.",
    ingredients: [
      { name: "Protéine de Pois & Riz", amount: "23.1 g" },
      { name: "Fibres Alimentaires", amount: "2.1 g" },
      { name: "Glucides", amount: "1.4 g" },
      { name: "Lipides", amount: "1.2 g" },
      { name: "Fer", amount: "4.2 mg" }
    ],
    faq: [
      { q: "La protéine végétale construit-elle autant de muscle que la whey ?", a: "Oui, la combinaison de protéines de pois et de riz fournit un profil d'acides aminés complet (BCAA) équivalent à la protéine de lait pour la synthèse musculaire." },
      { q: "La texture n'est-elle pas trop granuleuse ?", a: "Non, notre procédé de micronisation ultra-fin garantit une texture onctueuse et sans grumeaux, même avec de l'eau simple." }
    ]
  },
  "3": {
    id: "3",
    title: "Ventre Plat Probiotiques",
    brand: "VDN",
    price: 24.90,
    img: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?fit=crop&w=600&h=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?fit=crop&w=600&h=800&q=80",
      "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?fit=crop&w=600&h=800&q=80",
      "https://images.unsplash.com/photo-1611926653458-09294b3142bf?fit=crop&w=600&h=800&q=80"
    ],
    rating: 4.7,
    reviewsCount: 112,
    tag: "Digestion",
    flavors: ["Neutre (Gélules)"],
    sizes: ["30 gélules (Cure 1 mois)", "90 gélules (Cure 3 mois)"],
    benefits: [
      "20 milliards de ferments lactiques UFC par gélule",
      "5 souches microbiotiques scientifiquement sélectionnées",
      "Enrichi en fenouil et charbon végétal contre les ballonnements"
    ],
    shortDesc: "Synergie exclusive de 5 souches microbiotiques dosées à 20 milliards d'UFC par gélule et d'extraits de plantes pour réduire les ballonnements et affiner la taille.",
    description: "Ventre Plat Probiotiques agit en profondeur sur la flore intestinale pour améliorer la digestion et le confort intestinal. Les extraits de fenouil et de charbon actif complètent l'action en captant les gaz intestinaux.",
    usage: "Prendre 1 gélule le matin à jeun avec un grand verre d'eau. Cure de 30 jours renouvelable.",
    ingredients: [
      { name: "Souches Microbiotiques", amount: "20 Milliards UFC" },
      { name: "Extrait de Fenouil", amount: "150 mg" },
      { name: "Charbon Végétal Actif", amount: "100 mg" },
      { name: "Vitamine B6", amount: "1.4 mg" }
    ],
    faq: [
      { q: "Faut-il conserver ce produit au réfrigérateur ?", a: "Non, nos gélules sont thermo-protectrices, mais nous conseillons de les garder dans un endroit frais, sec et à l'abri de la lumière." },
      { q: "Au bout de combien de temps verrai-je les effets ?", a: "Les premiers bienfaits sur le confort digestif et les ballonnements apparaissent généralement en 7 à 10 jours de prise quotidienne." }
    ]
  },
  "4": {
    id: "4",
    title: "PH 1000 Electrolytes",
    brand: "Precision Fuel",
    price: 19.90,
    img: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?fit=crop&w=600&h=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?fit=crop&w=600&h=800&q=80",
      "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?fit=crop&w=600&h=800&q=80",
      "https://images.unsplash.com/photo-1611926653458-09294b3142bf?fit=crop&w=600&h=800&q=80"
    ],
    rating: 4.9,
    reviewsCount: 53,
    tag: "Hydratation",
    flavors: ["Citron", "Fruits des Bois"],
    sizes: ["10 comprimés effervescents", "30 comprimés (Format Eco)"],
    benefits: [
      "1000mg de Sodium par litre pour compenser la transpiration",
      "Idéal pour l'endurance et les entraînements intensifs",
      "Formule sans calories et sans glucides superflus"
    ],
    shortDesc: "Comprimés effervescents riches en sodium et minéraux essentiels pour maintenir une hydratation optimale durant les efforts intenses et prolongés.",
    description: "Conçu pour les athlètes d'endurance, PH 1000 compense les pertes de sodium liées à la transpiration. Évite les crampes et maintient la pression osmotique cellulaire.",
    usage: "Dissoudre 1 comprimé effervescent dans 500ml d'eau. À consommer pendant l'effort ou dans les heures précédant un entraînement intense.",
    ingredients: [
      { name: "Sodium", amount: "1000 mg" },
      { name: "Potassium", amount: "250 mg" },
      { name: "Calcium", amount: "48 mg" },
      { name: "Magnésium", amount: "24 mg" }
    ],
    faq: [
      { q: "Qu'est-ce que l'hyponatrémie ?", a: "Il s'agit d'une baisse excessive de sodium dans le sang causée par une consommation trop élevée d'eau pure lors d'un long effort. Les électrolytes empêchent ce phénomène dangereux." },
      { q: "Puis-je le consommer au quotidien ?", a: "Seulement en cas de forte chaleur, d'effort prolongé ou de sudation importante. Sinon, l'eau courante suffit." }
    ]
  },
  "5": {
    id: "5",
    title: "Pack Minceur Complet",
    brand: "VDN",
    price: 69.90,
    img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?fit=crop&w=600&h=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?fit=crop&w=600&h=800&q=80",
      "https://images.unsplash.com/photo-1550572017-edd951b55104?fit=crop&w=600&h=800&q=80",
      "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?fit=crop&w=600&h=800&q=80"
    ],
    rating: 4.9,
    reviewsCount: 185,
    tag: "Conseil Inclus",
    flavors: ["Chocolat (Protéine incluse)", "Vanille (Protéine incluse)"],
    sizes: ["Cure Initiale (30 jours)", "Cure Intense (60 jours)"],
    benefits: [
      "Combinaison Brûleur Jour/Nuit et Probiotiques Ventre Plat",
      "Guide alimentaire PDF complet inclus (conçu par Sarah Vidal)",
      "Objectif perte de poids ciblée et digestion améliorée"
    ],
    shortDesc: "Le pack ultime pour enclencher une perte de poids saine et durable : brûleur de graisse, probiotiques digestion, et un guide nutritionnel PDF complet rédigé par Sarah Vidal.",
    description: "Ce pack réunit les trois piliers essentiels de l'amincissement : l'activation de la thermogenèse, le rééquilibrage du microbiote intestinal, et un plan d'action alimentaire clair et structuré.",
    usage: "Suivre la posologie indiquée sur chaque flacon. Télécharger le guide PDF via le lien reçu par e-mail après votre commande.",
    ingredients: [
      { name: "Brûleur de Graisse (flacon)", amount: "60 gélules" },
      { name: "Ventre Plat Probiotiques", amount: "30 gélules" },
      { name: "Guide Nutritionnel Vidal", amount: "Format PDF" }
    ],
    faq: [
      { q: "Le guide PDF est-il envoyé directement ?", a: "Oui, vous recevrez un lien de téléchargement unique par email immédiatement après confirmation de votre commande." },
      { q: "Puis-je suivre ce pack si je suis végétarien ?", a: "Tout à fait, les gélules du pack et la protéine végétale associée sont 100% d'origine végétale." }
    ]
  },
  "6": {
    id: "6",
    title: "Creatine Monohydrate",
    brand: "QNT Sport",
    price: 19.90,
    img: "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?fit=crop&w=600&h=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?fit=crop&w=600&h=800&q=80",
      "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?fit=crop&w=600&h=800&q=80",
      "https://images.unsplash.com/photo-1546554137-f86b9593a222?fit=crop&w=600&h=800&q=80"
    ],
    rating: 4.8,
    reviewsCount: 84,
    tag: "Créatine",
    flavors: ["Neutre en Poudre"],
    sizes: ["300 g (100 doses)", "500 g (166 doses)"],
    benefits: [
      "Créatine monohydrate pure de qualité pharmaceutique (Creapure)",
      "Micronisation fine pour un mélange instantané sans résidus",
      "Augmente la force explosive et le volume musculaire"
    ],
    shortDesc: "Créatine monohydrate pure micronisée à 200 mesh pour une dissolution parfaite. Augmente la force, la puissance musculaire et accélère la récupération.",
    description: "La créatine monohydrate micronisée augmente les réserves de phosphocréatine dans les muscles, permettant de régénérer l'ATP plus rapidement durant les efforts explosifs.",
    usage: "Prendre 3g (1 cuillère doseuse) par jour, de préférence après l'entraînement ou au cours d'un repas avec un jus de fruit.",
    ingredients: [
      { name: "Créatine Monohydrate Pure", amount: "3000 mg" }
    ],
    faq: [
      { q: "Faut-il faire une phase de charge ?", a: "Non, les études montrent qu'une prise constante de 3g par jour est tout aussi efficace à moyen terme et évite les troubles digestifs liés aux surdoses." },
      { q: "Dois-je la prendre les jours de repos ?", a: "Oui, la créatine fonctionne par saturation cellulaire. Il est important de la prendre tous les jours à la même heure, y compris les jours sans entraînement." }
    ]
  },
  "7": {
    id: "7",
    title: "Brûleur Jour/Nuit",
    brand: "VDN",
    price: 45.00,
    img: "https://images.unsplash.com/photo-1550572017-edd951b55104?fit=crop&w=600&h=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1550572017-edd951b55104?fit=crop&w=600&h=800&q=80",
      "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?fit=crop&w=600&h=800&q=80",
      "https://images.unsplash.com/photo-1611926653458-09294b3142bf?fit=crop&w=600&h=800&q=80"
    ],
    rating: 4.7,
    reviewsCount: 91,
    tag: "Minceur",
    flavors: ["Neutre (Gélules)"],
    sizes: ["120 gélules (Cure 1 mois)", "240 gélules (Cure 2 mois)"],
    benefits: [
      "Chronobiologie : formule thermogénique le jour, drainante la nuit",
      "Active le métabolisme de base et brûle plus de calories",
      "Améliore le sommeil et évite le stockage nocturne des lipides"
    ],
    shortDesc: "Double action jour et nuit. Stimule la combustion des graisses en journée (thé vert, guarana) et favorise le drainage et la détente en soirée sans caféine.",
    description: "Une formule chronobiologique qui respecte le rythme de votre corps. Les gélules Jour augmentent la dépense calorique tandis que les gélules Nuit bloquent le stockage des graisses et limitent la rétention d'eau.",
    usage: "Prendre 2 gélules Jour au petit-déjeuner et 2 gélules Nuit au dîner avec un grand verre d'eau.",
    ingredients: [
      { name: "Extrait de Thé Vert (Jour)", amount: "300 mg" },
      { name: "Cétones de Framboise (Jour)", amount: "100 mg" },
      { name: "Picolinate de Chrome (Nuit)", amount: "40 mcg" },
      { name: "Mélisse & Reine des prés (Nuit)", amount: "200 mg" }
    ],
    faq: [
      { q: "La formule Nuit contient-elle des excitants ?", a: "Non, les gélules Nuit ne contiennent aucune caféine ni guarana. Elles contiennent des plantes apaisantes (mélisse) pour favoriser le sommeil." },
      { q: "Puis-je l'associer à d'autres compléments ?", a: "Oui, l'association avec nos probiotiques Ventre Plat est fortement recommandée pour une efficacité minceur dédoublée." }
    ]
  },
  "8": {
    id: "8",
    title: "Ashwagandha KSM-66",
    brand: "VDN",
    price: 19.90,
    img: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?fit=crop&w=600&h=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1611926653458-09294b3142bf?fit=crop&w=600&h=800&q=80",
      "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?fit=crop&w=600&h=800&q=80",
      "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?fit=crop&w=600&h=800&q=80"
    ],
    rating: 4.9,
    reviewsCount: 67,
    tag: "Détente",
    flavors: ["Neutre (Gélules)"],
    sizes: ["60 gélules", "120 gélules"],
    benefits: [
      "Extrait KSM-66 breveté, hautement concentré en withanolides",
      "Réduit le stress, l'anxiété et régule le taux de cortisol",
      "Améliore l'endurance mentale et physique au quotidien"
    ],
    shortDesc: "Extrait breveté de racine d'Ashwagandha bio KSM-66 à haute concentration. Aide à réduire le cortisol (stress), favorise la détente et un sommeil réparateur.",
    description: "L'Ashwagandha KSM-66 est l'extrait de racine le plus étudié cliniquement. En tant que plante adaptogène, elle régule les hormones de stress et soutient le système nerveux face au surmenage.",
    usage: "Prendre 1 à 2 gélules par jour avec un grand verre d'eau, de préférence le soir au dîner.",
    ingredients: [
      { name: "Ashwagandha KSM-66 bio", amount: "600 mg" },
      { name: "dont Withanolides", amount: "30 mg" }
    ],
    faq: [
      { q: "Qu'est-ce qu'une plante adaptogène ?", a: "C'est une plante qui augmente la capacité du corps à s'adapter aux différents stress (émotionnel, physique, environnemental) en régulant les systèmes hormonaux sans effet excitant ni sédatif." },
      { q: "Combien de temps doit durer la cure ?", a: "Nous recommandons des cures de 6 à 8 semaines, suivies d'une pause de 2 semaines avant de reprendre si nécessaire." }
    ]
  },
  "9": {
    id: "9",
    title: "Collagen Glow Premium",
    brand: "VDN",
    price: 34.90,
    img: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?fit=crop&w=600&h=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1611926653458-09294b3142bf?fit=crop&w=600&h=800&q=80",
      "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?fit=crop&w=600&h=800&q=80",
      "https://images.unsplash.com/photo-1550572017-edd951b55104?fit=crop&w=600&h=800&q=80"
    ],
    rating: 5.0,
    reviewsCount: 12,
    tag: "Nouveau",
    flavors: ["Pêche Abricot", "Neutre"],
    sizes: ["300 g (30 doses)"],
    benefits: [
      "Collagène marin breveté Peptan® de type 1 ultra-pur",
      "Acide hyaluronique et vitamine C pour une beauté éclatante",
      "Hydrate la peau de l'intérieur et renforce cheveux et ongles"
    ],
    shortDesc: "Hydrolysat de collagène marin de type I breveté Peptan®, enrichi en acide hyaluronique et vitamine C pour une peau ferme, des cheveux éclatants et des articulations souples.",
    description: "Collagen Glow redynamise la production naturelle de collagène. Son faible poids moléculaire (2000 Daltons) garantit une assimilation cellulaire maximale pour des effets visibles sous 4 semaines.",
    usage: "Mélanger 1 dosette (10g) par jour dans un verre d'eau, un smoothie ou votre boisson chaude préférée.",
    ingredients: [
      { name: "Peptides de Collagène Peptan®", amount: "8000 mg" },
      { name: "Acide Hyaluronique", amount: "150 mg" },
      { name: "Vitamine C", amount: "80 mg" }
    ],
    faq: [
      { q: "Quelle est l'origine du collagène ?", a: "Notre collagène provient de poissons sauvages de pêches durables. Il est certifié sans métaux lourds ni polluants." },
      { q: "Pourquoi l'enrichir en vitamine C ?", a: "La vitamine C est un cofacteur indispensable à la synthèse naturelle de collagène par le corps humain. Sans elle, l'assimilation est moins efficace." }
    ]
  },
  "10": {
    id: "10",
    title: "Clear Whey Isolate",
    brand: "Aqeelab Nutrition",
    price: 39.90,
    img: "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?fit=crop&w=600&h=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?fit=crop&w=600&h=800&q=80",
      "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?fit=crop&w=600&h=800&q=80",
      "https://images.unsplash.com/photo-1546554137-f86b9593a222?fit=crop&w=600&h=800&q=80"
    ],
    rating: 4.9,
    reviewsCount: 18,
    tag: "Performance",
    flavors: ["Cerise Sauvage", "Mangue Passion", "Pastèque Fraîche"],
    sizes: ["500 g (20 shakers)"],
    benefits: [
      "Isolat de protéine hydrolysée à texture de jus de fruit",
      "Zéro lipides, zéro sucre, zéro goût laiteux",
      "Boisson désaltérante hyperprotéinée à absorption instantanée"
    ],
    shortDesc: "Une alternative ultra-légère et rafraîchissante à la whey classique. Goût fruité de fruits rouges, texture similaire à un jus de fruits, riche en protéines.",
    description: "Grâce à une hydrolyse avancée de l'isolat, Clear Whey offers une boisson protéinée légère, translucide, sans aspect laiteux, parfaite pour s'hydrater après le sport.",
    usage: "Mélanger 1 dosette (25g) avec 300-400ml d'eau froide. Laisser reposer 1 minute pour que la mousse s'estompe.",
    ingredients: [
      { name: "Isolat de Protéine de Lactosérum", amount: "20 g" },
      { name: "BCAA", amount: "4.7 g" },
      { name: "Glucides & Lipides", amount: "< 0.1 g" }
    ],
    faq: [
      { q: "Pourquoi y a-t-il de la mousse lors du mélange ?", a: "L'isolat de whey pure et très fluide a naturellement tendance à mousser à la dissolution. Il suffit de laisser reposer le shaker 60 secondes pour obtenir un jus de fruits limpide." },
      { q: "Est-ce acide en bouche ?", a: "Non, c'est une saveur acidulée et fruitée très agréable, idéale en période estivale ou après une séance intense." }
    ]
  },
  "11": {
    id: "11",
    title: "Pâte à Tartiner Choco-Noisette",
    brand: "VDN",
    price: 6.50,
    img: "https://images.unsplash.com/photo-1568254183919-78a4f43a2877?fit=crop&w=600&h=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1568254183919-78a4f43a2877?fit=crop&w=600&h=800&q=80",
      "https://images.unsplash.com/photo-1546554137-f86b9593a222?fit=crop&w=600&h=800&q=80",
      "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?fit=crop&w=600&h=800&q=80"
    ],
    rating: 4.8,
    reviewsCount: 29,
    tag: "Sans Sucre",
    flavors: ["Chocolat Noisette", "Chocolat Blanc Noisette"],
    sizes: ["250 g", "500 g (Format Familial)"],
    benefits: [
      "22% de vraies noisettes grillées sélectionnées",
      "Enrichie en protéines de whey de haute qualité (21%)",
      "Sans huile de palme et sans sucres ajoutés"
    ],
    shortDesc: "Une pâte à tartiner gourmande et saine, enrichie en protéines, sans huile de palme et sans sucres ajoutés. Le plaisir sans culpabilité.",
    description: "Idéale pour accompagner vos pancakes protéinés ou vos tartines du matin, cette recette authentique contient 22% de noisettes sélectionnées et du vrai cacao maigre.",
    usage: "À déguster sur des pancakes, des tartines complètes ou à incorporer dans vos recettes de desserts sains.",
    ingredients: [
      { name: "Noisettes", amount: "22%" },
      { name: "Protéines (isolat de whey)", amount: "21 g / 100g" },
      { name: "dont Sucres", amount: "1.8 g / 100g" },
      { name: "Huile de Tournesol", amount: "Présent" }
    ],
    faq: [
      { q: "Qu'est-ce qui remplace le sucre ?", a: "Nous utilisons du maltitol, un édulcorant d'origine végétale issu du maïs, qui possède un indice glycémique très bas et deux fois moins de calories que le sucre de table." },
      { q: "La pâte est-elle ferme en hiver ?", a: "Comme elle ne contient pas d'huile de palme hydrogénée, sa texture s'adoucit à température ambiante (20-22°C). Ne pas la placer au réfrigérateur." }
    ]
  },
  "12": {
    id: "12",
    title: "Infusion Sommeil & Relaxation",
    brand: "VDN",
    price: 12.90,
    img: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?fit=crop&w=600&h=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1576092768241-dec231879fc3?fit=crop&w=600&h=800&q=80",
      "https://images.unsplash.com/photo-1611926653458-09294b3142bf?fit=crop&w=600&h=800&q=80",
      "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?fit=crop&w=600&h=800&q=80"
    ],
    rating: 4.9,
    reviewsCount: 41,
    tag: "Bio",
    flavors: ["Mélange Apaisant Bio"],
    sizes: ["20 sachets biodégradables", "En vrac (100g)"],
    benefits: [
      "Camomille, verveine et tilleul 100% certifiés Agriculture Biologique",
      "1,9mg de mélatonine naturelle par tasse pour s'endormir plus vite",
      "Soutient un sommeil profond et réparateur sans accoutumance"
    ],
    shortDesc: "Un mélange d'herbes bio apaisantes (camomille, verveine, tilleul) et de mélatonine naturelle pour accélérer l'endormissement et améliorer la qualité de vos nuits.",
    description: "Spécialement formulée par nos nutritionnistes, cette tisane allie l'efficacité millénaire des plantes apaisantes à la recherche scientifique moderne pour favoriser un sommeil profond.",
    usage: "Laisser infuser 1 sachet ou 2g en vrac dans de l'eau à 90°C pendant 5 à 7 minutes. À boire 30 minutes avant le coucher.",
    ingredients: [
      { name: "Camomille & Tilleul bio", amount: "40%" },
      { name: "Verveine & Menthe poivrée", amount: "30%" },
      { name: "Mélatonine végétale", amount: "1.9 mg / tasse" }
    ],
    faq: [
      { q: "Y a-t-il un risque d'accoutumance ?", a: "Non, notre infusion n'est pas un somnifère chimique. La mélatonine végétale régule simplement l'horloge biologique naturelle sans perturber le cycle de sommeil profond." },
      { q: "Puis-je la donner aux enfants ?", a: "Non, en raison de la présence de mélatonine active, elle est réservée aux adultes et adolescents de plus de 12 ans." }
    ]
  }
};

// Map objective name or tag to target tag in database
const filterCategoryMap = {
  'sport': 'Performance',
  'minceur': 'Minceur',
  'sante': 'Digestion',
  'snack': 'Sans Sucre',
  'packs': 'Conseil Inclus'
};

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [cart, setCart] = useState([]);
  const [activePage, setActivePage] = useState('home'); // home, category, product, cart
  const [currentProductId, setCurrentProductId] = useState(null);
  const [currentCategoryTag, setCurrentCategoryTag] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoCode, setPromoCode] = useState('');
  const [promoMessage, setPromoMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [footerDropdownOpen, setFooterDropdownOpen] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(null);

  // Home Page Products Tabs State
  const [activeFilterTab, setActiveFilterTab] = useState('all');

  // Product Details States
  const [detailQty, setDetailQty] = useState(1);
  const [detailSelectedFlavor, setDetailSelectedFlavor] = useState('');
  const [detailSelectedSize, setDetailSelectedSize] = useState('');
  const [detailActiveTab, setDetailActiveTab] = useState('desc');
  const [detailMainImage, setDetailMainImage] = useState('');
  const [expandedDetailFaq, setExpandedDetailFaq] = useState(null);

  // Category Sidebar Filters State
  const [sidebarCategories, setSidebarCategories] = useState([]); // Selected categories checkboxes
  const [sidebarBrands, setSidebarBrands] = useState([]); // Selected brands checkboxes
  const [sidebarPriceMin, setSidebarPriceMin] = useState(0);
  const [sidebarPriceMax, setSidebarPriceMax] = useState(100);
  const [sidebarRatingMin, setSidebarRatingMin] = useState(0);
  const [sidebarSortVal, setSidebarSortVal] = useState('default');
  const [sidebarMobileOpen, setSidebarMobileOpen] = useState(false);

  // Collapsed states for filters
  const [filterSectionsCollapsed, setFilterSectionsCollapsed] = useState({
    categories: false,
    brands: false,
    price: false,
    rating: false
  });

  // Timers and refs
  const slideInterval = useRef(null);
  const dropdownRef = useRef(null);

  // Initialize Cart from localStorage (safely on client mount)
  useEffect(() => {
    const savedCart = localStorage.getItem('vdn_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Save Cart to localStorage on change
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('vdn_cart', JSON.stringify(cart));
    } else {
      localStorage.removeItem('vdn_cart');
    }
  }, [cart]);

  // Handle Navbar Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle Hash Routing
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash || '#home';
      if (hash.startsWith('#product/')) {
        const productId = hash.replace('#product/', '');
        if (PRODUCTS_DATABASE[productId]) {
          setCurrentProductId(productId);
          const prod = PRODUCTS_DATABASE[productId];
          setDetailMainImage(prod.img);
          setDetailSelectedFlavor(prod.flavors && prod.flavors.length > 0 ? prod.flavors[0] : '');
          setDetailSelectedSize(prod.sizes && prod.sizes.length > 0 ? prod.sizes[0] : '');
          setDetailQty(1);
          setDetailActiveTab('desc');
          setExpandedDetailFaq(null);
          setActivePage('product');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          setActivePage('home');
        }
      } else if (hash.startsWith('#category')) {
        const parts = hash.split('/');
        const tag = parts.length > 1 ? decodeURIComponent(parts[1]) : null;
        setCurrentCategoryTag(tag);
        
        // Reset/init sidebar values based on all products in database
        const allProducts = Object.values(PRODUCTS_DATABASE);
        const prices = allProducts.map(p => p.price);
        const minPrice = Math.floor(Math.min(...prices));
        const maxPrice = Math.ceil(Math.max(...prices));
        
        setSidebarPriceMin(minPrice);
        setSidebarPriceMax(maxPrice);
        setSidebarRatingMin(0);
        setSidebarSortVal('default');
        setSidebarCategories(tag ? [tag] : []);
        setSidebarBrands([]);
        
        setActivePage('category');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#cart') {
        setActivePage('cart');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setActivePage('home');
      }
    };

    window.addEventListener('hashchange', handleHash);
    // Initial check
    handleHash();

    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Hero Slider Autoplay
  useEffect(() => {
    if (activePage === 'home') {
      slideInterval.current = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % 2);
      }, 6000);
    } else {
      clearInterval(slideInterval.current);
    }
    return () => clearInterval(slideInterval.current);
  }, [activePage]);

  // Click outside listener for footer dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setFooterDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Navigation functions
  const navigateTo = (page, hashValue = '') => {
    setMobileMenuOpen(false);
    if (page === 'home') {
      window.location.hash = '#home';
    } else if (page === 'category') {
      window.location.hash = hashValue ? `#category/${encodeURIComponent(hashValue)}` : '#category';
    } else if (page === 'product') {
      window.location.hash = `#product/${hashValue}`;
    } else if (page === 'cart') {
      window.location.hash = '#cart';
    }
  };

  // Cart operations
  const getCartItemKey = (id, flavor, size) => `${id}_${flavor || ''}_${size || ''}`;

  const addToCart = (id, flavor = '', size = '') => {
    const prod = PRODUCTS_DATABASE[id];
    if (!prod) return;

    const selectedFlavor = flavor || (prod.flavors && prod.flavors.length > 0 ? prod.flavors[0] : '');
    const selectedSize = size || (prod.sizes && prod.sizes.length > 0 ? prod.sizes[0] : '');
    const key = getCartItemKey(id, selectedFlavor, selectedSize);

    setCart(prevCart => {
      const idx = prevCart.findIndex(item => item.key === key);
      if (idx > -1) {
        const newCart = [...prevCart];
        newCart[idx].quantity += 1;
        return newCart;
      } else {
        return [...prevCart, {
          id,
          key,
          title: prod.title,
          brand: prod.brand,
          price: prod.price,
          img: prod.img,
          quantity: 1,
          flavor: selectedFlavor,
          size: selectedSize
        }];
      }
    });

    setCartOpen(true);
  };

  const updateCartItemQty = (key, delta) => {
    setCart(prevCart => {
      const idx = prevCart.findIndex(item => item.key === key);
      if (idx === -1) return prevCart;

      const newCart = [...prevCart];
      if (newCart[idx].quantity + delta <= 0) {
        newCart.splice(idx, 1);
      } else {
        newCart[idx].quantity += delta;
      }
      return newCart;
    });
  };

  const removeCartItem = (key) => {
    setCart(prevCart => prevCart.filter(item => item.key !== key));
  };

  const changeCartItemVariation = (key, type, newValue) => {
    setCart(prevCart => {
      const idx = prevCart.findIndex(item => item.key === key);
      if (idx === -1) return prevCart;

      const item = { ...prevCart[idx] };
      if (type === 'flavor') item.flavor = newValue;
      if (type === 'size') item.size = newValue;

      const newKey = getCartItemKey(item.id, item.flavor, item.size);
      item.key = newKey;

      const newCart = [...prevCart];
      newCart.splice(idx, 1);

      // Check if newKey already exists
      const existingIdx = newCart.findIndex(i => i.key === newKey);
      if (existingIdx > -1) {
        newCart[existingIdx].quantity += item.quantity;
      } else {
        newCart.push(item);
      }
      return newCart;
    });
  };

  // Cart calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartTotalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const shippingThreshold = 50.00;
  const shippingCost = cartSubtotal === 0 ? 0 : (cartSubtotal >= shippingThreshold ? 0 : 4.90);
  const promoDiscountAmount = cartSubtotal * promoDiscount;
  const cartTotalAmount = Math.max(0, cartSubtotal + shippingCost - promoDiscountAmount);

  // Apply promo code
  const handleApplyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (code === 'VDN10') {
      setPromoDiscount(0.10);
      setPromoMessage('Code VDN10 appliqué : -10% de réduction sur vos produits !');
    } else if (code === '') {
      setPromoDiscount(0);
      setPromoMessage('');
    } else {
      setPromoDiscount(0);
      setPromoMessage('Code promo invalide.');
    }
  };

  // Checkout redirect placeholder
  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('Votre panier est vide.');
      return;
    }
    alert('Redirection sécurisée vers la passerelle de paiement...');
  };

  // Details Page associated products selector
  const getAssociatedProducts = (prodId) => {
    const prod = PRODUCTS_DATABASE[prodId];
    if (!prod) return [];
    const all = Object.values(PRODUCTS_DATABASE);
    let related = all.filter(p => p.id !== prodId && p.tag === prod.tag);
    const others = all.filter(p => p.id !== prodId && p.tag !== prod.tag);
    return related.concat(others).slice(0, 4);
  };

  // Sidebar Filter toggles
  const handleCategoryCheckboxChange = (tag) => {
    setSidebarCategories(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleBrandCheckboxChange = (brand) => {
    setSidebarBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  // Category page filtering & sorting logic
  const getFilteredProducts = () => {
    const all = Object.values(PRODUCTS_DATABASE);
    let results = all.filter(p => {
      // Search query in header
      if (searchQuery) {
        const q = searchQuery.toLowerCase().trim();
        const matchesSearch = p.title.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.tag.toLowerCase().includes(q);
        if (!matchesSearch) return false;
      }

      // Sidebar Categories
      if (sidebarCategories.length > 0 && !sidebarCategories.includes(p.tag)) return false;

      // Sidebar Brands
      if (sidebarBrands.length > 0 && !sidebarBrands.includes(p.brand)) return false;

      // Price range
      if (p.price < sidebarPriceMin || p.price > sidebarPriceMax) return false;

      // Min Rating
      if (p.rating < sidebarRatingMin) return false;

      return true;
    });

    // Sorting
    if (sidebarSortVal === 'price-asc') {
      results.sort((a, b) => a.price - b.price);
    } else if (sidebarSortVal === 'price-desc') {
      results.sort((a, b) => b.price - a.price);
    } else if (sidebarSortVal === 'name-asc') {
      results.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sidebarSortVal === 'name-desc') {
      results.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sidebarSortVal === 'rating') {
      results.sort((a, b) => b.rating - a.rating);
    } else {
      // Default: Popularity / review count
      results.sort((a, b) => b.reviewsCount - a.reviewsCount);
    }

    return results;
  };

  const handleResetCategoryFilters = () => {
    const all = Object.values(PRODUCTS_DATABASE);
    const prices = all.map(p => p.price);
    setSidebarPriceMin(Math.floor(Math.min(...prices)));
    setSidebarPriceMax(Math.ceil(Math.max(...prices)));
    setSidebarRatingMin(0);
    setSidebarCategories([]);
    setSidebarBrands([]);
    setSidebarSortVal('default');
  };

  // Helper variables for tags/brands counts
  const allProductsList = Object.values(PRODUCTS_DATABASE);
  const allUniqueTags = [...new Set(allProductsList.map(p => p.tag))].sort();
  const allUniqueBrands = [...new Set(allProductsList.map(p => p.brand))].sort();

  return (
    <>
      {/* ANNOUNCEMENT BAR */}
      <div className="announcement-bar">
        <span>Livraison gratuite dès 50€ d&apos;achat &nbsp;&nbsp;&bull;&nbsp;&nbsp; Accompagnement par nos diététiciennes diplômées</span>
      </div>

      {/* NAVBAR */}
      <div className={`navbar-wrapper ${isScrolled ? 'scrolled' : ''}`}>
        {/* Top row: Logo, Search, Actions */}
        <div className="navbar-top">
          <div className="navbar-top-container">
            <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('home'); }} className="logo">
              <img src="/logo%20boutique%202.png" alt="Vidal Nutrition" style={{ height: '42px', width: 'auto', display: 'block' }} />
            </a>
            
            {/* CENTER: Search bar */}
            <div className="search-container">
              <i className="fa-solid fa-magnifying-glass search-icon"></i>
              <input
                type="text"
                className="search-input"
                placeholder="Rechercher un produit, une marque..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (activePage !== 'category') {
                    navigateTo('category');
                  }
                }}
              />
            </div>

            {/* RIGHT: Actions */}
            <div className="nav-right">
              <a href="#dietitian" className="btn-rdv-header"><i className="fa-regular fa-calendar-check"></i> RDV Diététicienne</a>
              <button className="nav-btn" onClick={() => setCartOpen(true)} aria-label="Open cart">
                <i className="fa-solid fa-bag-shopping"></i>
                <span className="cart-badge">{cartTotalItemsCount}</span>
              </button>
              <button className="mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
                <i className="fa-solid fa-bars"></i>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom row: Navigation Links */}
        <div className="navbar-bottom">
          <div className="navbar-bottom-container">
            <ul className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
              {/* 1. OBJECTIFS (Mega Dropdown) */}
              <li className="nav-item">
                <span className="nav-link">Objectifs <i className="fa-solid fa-chevron-down"></i></span>
                <div className="dropdown-panel mega-dropdown cols-4">
                  <div className="dropdown-col">
                    <h4>Perte de poids</h4>
                    <ul className="dropdown-links">
                      <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('category', 'Minceur'); }}>Brûleurs</a></li>
                      <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('category', 'Minceur'); }}>Coupe-faim</a></li>
                      <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('category', 'Minceur'); }}>Draineurs</a></li>
                      <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('category', 'Minceur'); }}>Packs minceur</a></li>
                    </ul>
                    <h4 style={{ marginTop: '15px' }}>Ventre plat & digestion</h4>
                    <ul className="dropdown-links">
                      <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('category', 'Digestion'); }}>Probiotiques</a></li>
                      <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('category', 'Digestion'); }}>Draineurs</a></li>
                      <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('category', 'Digestion'); }}>Enzymes</a></li>
                    </ul>
                  </div>
                  <div className="dropdown-col">
                    <h4>Énergie & fatigue</h4>
                    <ul className="dropdown-links">
                      <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('category', 'Digestion'); }}>Boosters</a></li>
                      <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('category', 'Digestion'); }}>Magnésium</a></li>
                      <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('category', 'Digestion'); }}>Adaptogènes</a></li>
                    </ul>
                    <h4 style={{ marginTop: '15px' }}>Sommeil & stress</h4>
                    <ul className="dropdown-links">
                      <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('category', 'Digestion'); }}>Mélatonine</a></li>
                      <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('category', 'Détente'); }}>Plantes relaxantes</a></li>
                    </ul>
                  </div>
                  <div className="dropdown-col">
                    <h4>Prise de muscle</h4>
                    <ul className="dropdown-links">
                      <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('category', 'Performance'); }}>Gainers</a></li>
                      <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('category', 'Créatine'); }}>Créatine</a></li>
                      <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('category', 'Performance'); }}>Acides Aminés</a></li>
                      <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('category', 'Performance'); }}>Packs Performance</a></li>
                    </ul>
                    <h4 style={{ marginTop: '15px' }}>Endurance & Hydratation</h4>
                    <ul className="dropdown-links">
                      <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('category', 'Hydratation'); }}>Électrolytes</a></li>
                      <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('category', 'Hydratation'); }}>Boissons d&apos;effort</a></li>
                    </ul>
                  </div>
                  <div className="dropdown-col">
                    <h4>Santé au naturel</h4>
                    <ul className="dropdown-links">
                      <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('category', 'Bio'); }}>Vitamines Bio</a></li>
                      <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('category', 'Bio & Végétal'); }}>Oméga 3 Premium</a></li>
                      <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('category', 'Nouveau'); }}>Collagène Marin</a></li>
                      <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('category', 'Bio'); }}>Plantes Bio</a></li>
                    </ul>
                  </div>
                </div>
              </li>

              {/* 2. NUTRITION SPORTIVE */}
              <li className="nav-item">
                <span className="nav-link">Nutrition Sportive <i className="fa-solid fa-chevron-down"></i></span>
                <div className="dropdown-panel mega-dropdown cols-3">
                  <div className="dropdown-col">
                    <h4>Protéines</h4>
                    <ul className="dropdown-links">
                      <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('category', 'Performance'); }}>Whey Isolate</a></li>
                      <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('category', 'Bio & Végétal'); }}>Protéines Végétales</a></li>
                      <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('category', 'Performance'); }}>Clear Whey</a></li>
                      <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('category', 'Performance'); }}>Gainer & Masse</a></li>
                    </ul>
                  </div>
                  <div className="dropdown-col">
                    <h4>Force & Récupération</h4>
                    <ul className="dropdown-links">
                      <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('category', 'Créatine'); }}>Créatine Pure</a></li>
                      <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('category', 'Performance'); }}>BCAA & EAA</a></li>
                      <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('category', 'Performance'); }}>Pré-Workout & Boosters</a></li>
                    </ul>
                  </div>
                  <div className="dropdown-col">
                    <h4>Hydratation & endurance</h4>
                    <ul className="dropdown-links">
                      <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('category', 'Hydratation'); }}>Pastilles Électrolytes</a></li>
                      <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('category', 'Hydratation'); }}>Gels Énergétiques</a></li>
                    </ul>
                  </div>
                </div>
              </li>

              {/* 3. MINCEUR */}
              <li className="nav-item">
                <span className="nav-link">Minceur <i className="fa-solid fa-chevron-down"></i></span>
                <div className="dropdown-panel mega-dropdown cols-3">
                  <div className="dropdown-col">
                    <h4>Brûler les graisses</h4>
                    <ul className="dropdown-links">
                      <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('category', 'Minceur'); }}>Brûleur Jour & Nuit</a></li>
                      <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('category', 'Minceur'); }}>Carnitine active</a></li>
                      <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('category', 'Minceur'); }}>Thermogéniques puissants</a></li>
                    </ul>
                  </div>
                  <div className="dropdown-col">
                    <h4>Contrôle du poids</h4>
                    <ul className="dropdown-links">
                      <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('category', 'Minceur'); }}>Coupe-faim naturels</a></li>
                      <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('category', 'Digestion'); }}>Draineurs détoxifiants</a></li>
                      <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('category', 'Digestion'); }}>Probiotiques Ventre Plat</a></li>
                    </ul>
                  </div>
                  <div className="dropdown-col">
                    <h4>Packs & Programmes</h4>
                    <ul className="dropdown-links">
                      <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('category', 'Conseil Inclus'); }}>Pack Minceur Complet</a></li>
                      <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('category', 'Conseil Inclus'); }}>Cure Détox Éclair</a></li>
                    </ul>
                  </div>
                </div>
              </li>

              {/* 4. SANTÉ & BIEN-ÊTRE */}
              <li className="nav-item">
                <span className="nav-link">Santé & Bien-être <i className="fa-solid fa-chevron-down"></i></span>
                <div className="dropdown-panel mega-dropdown cols-3">
                  <div className="dropdown-col">
                    <h4>Micro-Nutrition</h4>
                    <ul className="dropdown-links">
                      <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('category', 'Bio'); }}>Multivitamines Bio</a></li>
                      <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('category', 'Bio & Végétal'); }}>Oméga 3 Epax</a></li>
                      <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('category', 'Digestion'); }}>Magnésium Bisglycinate</a></li>
                      <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('category', 'Nouveau'); }}>Collagène Peptan®</a></li>
                    </ul>
                  </div>
                  <div className="dropdown-col">
                    <h4>Digestion & Transit</h4>
                    <ul className="dropdown-links">
                      <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('category', 'Digestion'); }}>Flore Intestinale</a></li>
                      <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('category', 'Digestion'); }}>Enzymes Digestives</a></li>
                    </ul>
                  </div>
                  <div className="dropdown-col">
                    <h4>Stress, Sommeil & Détente</h4>
                    <ul className="dropdown-links">
                      <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('category', 'Détente'); }}>Ashwagandha KSM-66</a></li>
                      <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('category', 'Bio'); }}>Infusion Sommeil Bio</a></li>
                    </ul>
                  </div>
                </div>
              </li>

              {/* 5. ALIMENTATION SAINE */}
              <li className="nav-item">
                <span className="nav-link">Alimentation Saine <i className="fa-solid fa-chevron-down"></i></span>
                <div className="dropdown-panel mega-dropdown cols-3">
                  <div className="dropdown-col">
                    <h4>Snacks & En-cas</h4>
                    <ul className="dropdown-links">
                      <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('category', 'Sans Sucre'); }}>Barres Protéinées</a></li>
                      <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('category', 'Sans Sucre'); }}>Cookies Healthy</a></li>
                      <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('category', 'Sans Sucre'); }}>Chips de Soja Protéinées</a></li>
                    </ul>
                  </div>
                  <div className="dropdown-col">
                    <h4>Petit-déjeuner & cuisine</h4>
                    <ul className="dropdown-links">
                      <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('category', 'Sans Sucre'); }}>Pâtes à Tartiner Protéinées</a></li>
                      <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('category', 'Sans Sucre'); }}>Flav Drops (Arômes)</a></li>
                    </ul>
                  </div>
                  <div className="dropdown-col">
                    <h4>Superfoods</h4>
                    <ul className="dropdown-links">
                      <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('category', 'Bio'); }}>Spiruline & Chlorella Bio</a></li>
                      <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('category', 'Bio'); }}>Graines de Chia Bio</a></li>
                    </ul>
                  </div>
                </div>
              </li>

              {/* 6. PROGRAMMES & PACKS */}
              <li className="nav-item">
                <span className="nav-link">Programmes & Packs <i className="fa-solid fa-chevron-down"></i></span>
                <div className="dropdown-panel simple-dropdown">
                  <ul className="dropdown-links">
                    <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('category', 'Conseil Inclus'); }}><i className="fa-solid fa-fire" style={{ marginRight: '6px' }}></i> Pack Minceur Complet</a></li>
                    <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('category', 'Performance'); }}><i className="fa-solid fa-dumbbell" style={{ marginRight: '6px' }}></i> Pack Performance Sport</a></li>
                    <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('category', 'Digestion'); }}><i className="fa-solid fa-heart-pulse" style={{ marginRight: '6px' }}></i> Pack Santé Colon</a></li>
                  </ul>
                </div>
              </li>

              {/* 7. SERVICES */}
              <li className="nav-item">
                <span className="nav-link">Services <i className="fa-solid fa-chevron-down"></i></span>
                <div className="dropdown-panel simple-dropdown">
                  <ul className="dropdown-links">
                    <li><a href="#dietitian"><i className="fa-solid fa-user-doctor" style={{ marginRight: '6px' }}></i> Bilan Nutritionnel (49€)</a></li>
                    <li><a href="#dietitian"><i className="fa-solid fa-calendar-check" style={{ marginRight: '6px' }}></i> Consultation Suivi (29€)</a></li>
                    <li><a href="#dietitian"><i className="fa-solid fa-house-chimney" style={{ marginRight: '6px' }}></i> Cabinet Béziers</a></li>
                  </ul>
                </div>
              </li>

              <li><a href="#faqs" className="nav-link" onClick={() => navigateTo('home')}>FAQ</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      {activePage === 'home' && (
        <main id="home-page-content">
          {/* HERO SLIDER */}
          <section className="hero">
            <div className="hero-slider">
              {/* Slide 1 */}
              <div className={`hero-slide ${currentSlide === 0 ? 'active' : ''}`}>
                <div className="hero-bg" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1920&q=80')" }}></div>
                <div className="hero-container">
                  <div className="hero-content">
                    <h2>Prenez soin de votre corps avec <em>VDN</em></h2>
                    <p className="hero-desc">Des compléments d&apos;une pureté exceptionnelle et des conseils sur-mesure validés par nos diététiciennes diplômées.</p>
                    <div className="hero-actions">
                      <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('category'); }} className="btn btn-primary">Découvrir la Boutique</a>
                      <a href="#dietitian" className="btn btn-outline">Prendre RDV en Ligne</a>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Slide 2 */}
              <div className={`hero-slide ${currentSlide === 1 ? 'active' : ''}`}>
                <div className="hero-bg" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1920&q=80')" }}></div>
                <div className="hero-container">
                  <div className="hero-content">
                    <h2>Votre cabinet de nutrition à <em>Béziers</em></h2>
                    <p className="hero-desc">Bilan personnalisé et suivi individuel en cabinet ou en ligne avec nos diététiciennes diplômées.</p>
                    <div className="hero-actions">
                      <a href="#dietitian" className="btn btn-primary">Prendre Rendez-vous</a>
                      <a href="tel:0689205302" className="btn btn-outline">Appeler le Cabinet</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="hero-controls">
              <button className="hero-arrow prev-slide" onClick={() => setCurrentSlide(prev => (prev - 1 + 2) % 2)} aria-label="Previous slide"><i className="fa-solid fa-chevron-left"></i></button>
              <button className="hero-arrow next-slide" onClick={() => setCurrentSlide(prev => (prev + 1) % 2)} aria-label="Next slide"><i className="fa-solid fa-chevron-right"></i></button>
            </div>
          </section>

          {/* TRUST BAR */}
          <section className="trust-bar">
            <div className="trust-container">
              <div className="trust-item">
                <div className="trust-icon"><i className="fa-solid fa-truck-fast"></i></div>
                <div className="trust-text">
                  <h4>Livraison 48h</h4>
                  <p>Gratuite dès 50€</p>
                </div>
              </div>
              <div className="trust-item">
                <div className="trust-icon"><i className="fa-solid fa-user-doctor"></i></div>
                <div className="trust-text">
                  <h4>Sarah Vidal</h4>
                  <p>Diététicienne D.E.</p>
                </div>
              </div>
              <div className="trust-item">
                <div className="trust-icon"><i className="fa-solid fa-award"></i></div>
                <div className="trust-text">
                  <h4>Premium</h4>
                  <p>Ingrédients brevetés</p>
                </div>
              </div>
              <div className="trust-item">
                <div className="trust-icon"><i className="fa-solid fa-house-medical"></i></div>
                <div className="trust-text">
                  <h4>Cabinet Béziers</h4>
                  <p><a href="tel:0689205302">06 89 20 53 02</a></p>
                </div>
              </div>
              <div className="trust-item">
                <div className="trust-icon"><i className="fa-solid fa-shield-halved"></i></div>
                <div className="trust-text">
                  <h4>Sécurisé</h4>
                  <p>Paiement garanti SSL</p>
                </div>
              </div>
              <div className="trust-item">
                <div className="trust-icon"><i className="fa-solid fa-heart"></i></div>
                <div className="trust-text">
                  <h4>Satisfait</h4>
                  <p>Ou remboursé 14j</p>
                </div>
              </div>
            </div>
          </section>

          {/* NOS CATÉGORIES GRID */}
          <section className="section" id="categories">
            <div className="container">
              <div className="section-title-wrap">
                <h2>Nos Catégories</h2>
                <p>Découvrez notre gamme complète de compléments alimentaires, d&apos;alimentation saine et d&apos;accompagnements.</p>
              </div>
              <div className="product-categories-grid">
                <a href="#" className="prod-category-card" onClick={(e) => { e.preventDefault(); navigateTo('category', 'Performance'); }}>
                  <div className="prod-category-img-wrap">
                    <img src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&q=80" alt="Nutrition Sportive" />
                  </div>
                  <h3>Nutrition Sportive</h3>
                  <span>Whey, Créatine, Performance</span>
                </a>
                
                <a href="#" className="prod-category-card" onClick={(e) => { e.preventDefault(); navigateTo('category', 'Minceur'); }}>
                  <div className="prod-category-img-wrap">
                    <img src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80" alt="Minceur" />
                  </div>
                  <h3>Minceur</h3>
                  <span>Brûleurs, Coupe-faim, Drainants</span>
                </a>
                
                <a href="#" className="prod-category-card" onClick={(e) => { e.preventDefault(); navigateTo('category', 'Digestion'); }}>
                  <div className="prod-category-img-wrap">
                    <img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80" alt="Santé & Bien-être" />
                  </div>
                  <h3>Santé & Bien-être</h3>
                  <span>Vitamines, Probiotiques, Sommeil</span>
                </a>
                
                <a href="#" className="prod-category-card" onClick={(e) => { e.preventDefault(); navigateTo('category', 'Sans Sucre'); }}>
                  <div className="prod-category-img-wrap">
                    <img src="https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=600&q=80" alt="Alimentation Saine" />
                  </div>
                  <h3>Alimentation Saine</h3>
                  <span>Barres, Collations, Cuisine healthy</span>
                </a>
                
                <a href="#" className="prod-category-card" onClick={(e) => { e.preventDefault(); navigateTo('category', 'Conseil Inclus'); }}>
                  <div className="prod-category-img-wrap">
                    <img src="https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=600&q=80" alt="Programmes & Packs" />
                  </div>
                  <h3>Programmes & Packs</h3>
                  <span>Packs minceur, Sport & Santé</span>
                </a>
              </div>
            </div>
          </section>

          {/* PRODUCTS Grid (Meilleures Ventes) */}
          <section className="section section-bg" id="shop">
            <div className="container">
              <div className="section-title-wrap">
                <h2>Nos Meilleures Ventes</h2>
                <p>Une sélection de compléments de premier choix plébiscités par nos praticiens en nutrition.</p>
              </div>
              
              <div className="filter-tabs">
                <button className={`filter-btn ${activeFilterTab === 'all' ? 'active' : ''}`} onClick={() => setActiveFilterTab('all')}>Tous</button>
                <button className={`filter-btn ${activeFilterTab === 'sport' ? 'active' : ''}`} onClick={() => { setActiveFilterTab('sport'); navigateTo('category', 'Performance'); }}>Nutrition Sportive</button>
                <button className={`filter-btn ${activeFilterTab === 'minceur' ? 'active' : ''}`} onClick={() => { setActiveFilterTab('minceur'); navigateTo('category', 'Minceur'); }}>Minceur</button>
                <button className={`filter-btn ${activeFilterTab === 'sante' ? 'active' : ''}`} onClick={() => { setActiveFilterTab('sante'); navigateTo('category', 'Digestion'); }}>Santé & Bien-être</button>
                <button className={`filter-btn ${activeFilterTab === 'snack' ? 'active' : ''}`} onClick={() => { setActiveFilterTab('snack'); navigateTo('category', 'Sans Sucre'); }}>Alimentation Saine</button>
                <button className={`filter-btn ${activeFilterTab === 'packs' ? 'active' : ''}`} onClick={() => { setActiveFilterTab('packs'); navigateTo('category', 'Conseil Inclus'); }}>Programmes & Packs</button>
              </div>

              <div className="products-grid">
                {/* Dynamically render first 8 products from DB */}
                {Object.values(PRODUCTS_DATABASE).slice(0, 8).map(prod => {
                  const stars = '★'.repeat(Math.round(prod.rating));
                  return (
                    <div className="product-card" key={prod.id} style={{ cursor: 'pointer' }} onClick={() => navigateTo('product', prod.id)}>
                      <div className="product-image-container">
                        {prod.oldPrice && <span className="product-tag-badge">PROMO</span>}
                        <img src={prod.img} alt={prod.title} className="product-img" style={{ objectFit: 'cover' }} />
                        <div className="product-actions-overlay">
                          <button
                            className="action-icon-btn quick-add"
                            onClick={(e) => { e.stopPropagation(); addToCart(prod.id); }}
                            aria-label="Ajout rapide"
                          >
                            <i className="fa-solid fa-basket-shopping"></i>
                          </button>
                        </div>
                      </div>
                      <div className="product-content">
                        <div className="product-meta">
                          <span className="product-brand">{prod.brand}</span>
                          <span className="product-category-tag">{prod.tag}</span>
                        </div>
                        <a href="#" className="product-title" onClick={(e) => { e.preventDefault(); e.stopPropagation(); navigateTo('product', prod.id); }}>{prod.title}</a>
                        <div className="product-rating">
                          <span className="product-stars">{stars}</span>
                          <span className="product-reviews">({prod.reviewsCount} avis)</span>
                        </div>
                        <div className="product-footer">
                          <div className="product-price-box">
                            {prod.oldPrice && <span className="product-old-price">{prod.oldPrice.toFixed(2).replace('.', ',')} €</span>}
                            <span className="product-price">{prod.price.toFixed(2).replace('.', ',')} €</span>
                          </div>
                          <button
                            className="add-cart-btn"
                            onClick={(e) => { e.stopPropagation(); addToCart(prod.id); }}
                          >
                            Ajouter
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* DIETITIAN SERVICES SECTION */}
          <section className="section" id="dietitian-services" style={{ paddingTop: '80px', paddingBottom: '60px' }}>
            <div className="container">
              <div className="section-title-wrap">
                <h2>Votre Diététicien en Ligne</h2>
                <p>Bénéficiez de consultations à distance personnalisées pour un suivi nutritionnel adapté à vos besoins réels.</p>
              </div>
              <div className="services-grid">
                <div className="service-card">
                  <div className="service-icon-wrap"><i className="fa-solid fa-clipboard-question"></i></div>
                  <h3>Consultation diététique à distance - Le bilan</h3>
                  <p>Bilan complet de votre alimentation et de vos objectifs personnalisés.</p>
                  <a href="#dietitian" className="service-link">En savoir plus <i className="fa-solid fa-arrow-right"></i></a>
                </div>

                <div className="service-card">
                  <div className="service-icon-wrap"><i className="fa-solid fa-utensils"></i></div>
                  <h3>Consultation diététique à distance - La Remise</h3>
                  <p>Programme nutritionnel sur mesure adapté à votre mode de vie.</p>
                  <a href="#dietitian" className="service-link">En savoir plus <i className="fa-solid fa-arrow-right"></i></a>
                </div>

                <div className="service-card">
                  <div className="service-icon-wrap"><i className="fa-solid fa-heart-pulse"></i></div>
                  <h3>Consultation diététique à distance - Le Suivi</h3>
                  <p>Accompagnement régulier pour atteindre et maintenir vos objectifs.</p>
                  <a href="#dietitian" className="service-link">En savoir plus <i className="fa-solid fa-arrow-right"></i></a>
                </div>
              </div>
            </div>
          </section>

          {/* NEW ARRIVALS SECTION */}
          <section className="section section-bg" id="new-arrivals" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
            <div className="container">
              <div className="section-title-wrap">
                <h2>Nos Nouveautés</h2>
                <p>Découvrez les dernières innovations sélectionnées par notre équipe de nutritionnistes pour optimiser vos résultats.</p>
              </div>
              
              <div className="products-grid">
                {/* Dynamically render last 4 products from DB (9, 10, 11, 12) */}
                {Object.values(PRODUCTS_DATABASE).slice(8, 12).map(prod => {
                  const stars = '★'.repeat(Math.round(prod.rating));
                  return (
                    <div className="product-card" key={prod.id} style={{ cursor: 'pointer' }} onClick={() => navigateTo('product', prod.id)}>
                      <div className="product-image-container">
                        <span className="product-tag-badge">Nouveau</span>
                        <img src={prod.img} alt={prod.title} className="product-img" style={{ objectFit: 'cover' }} />
                        <div className="product-actions-overlay">
                          <button
                            className="action-icon-btn quick-add"
                            onClick={(e) => { e.stopPropagation(); addToCart(prod.id); }}
                            aria-label="Ajout rapide"
                          >
                            <i className="fa-solid fa-basket-shopping"></i>
                          </button>
                        </div>
                      </div>
                      <div className="product-content">
                        <div className="product-meta">
                          <span className="product-brand">{prod.brand}</span>
                          <span className="product-category-tag">{prod.tag}</span>
                        </div>
                        <a href="#" className="product-title" onClick={(e) => { e.preventDefault(); e.stopPropagation(); navigateTo('product', prod.id); }}>{prod.title}</a>
                        <div className="product-rating">
                          <span className="product-stars">{stars}</span>
                          <span className="product-reviews">({prod.reviewsCount} avis)</span>
                        </div>
                        <div className="product-footer">
                          <div className="product-price-box">
                            {prod.oldPrice && <span className="product-old-price">{prod.oldPrice.toFixed(2).replace('.', ',')} €</span>}
                            <span className="product-price">{prod.price.toFixed(2).replace('.', ',')} €</span>
                          </div>
                          <button
                            className="add-cart-btn"
                            onClick={(e) => { e.stopPropagation(); addToCart(prod.id); }}
                          >
                            Ajouter
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* DIETITIAN BOOKING SECTION */}
          <section className="section section-bg" id="dietitian">
            <div className="container">
              <div className="dietitian-banner">
                {/* Left Column: Info & Actions */}
                <div className="dietitian-info" style={{ padding: '60px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px' }}>
                    <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&q=80" alt="Sarah Vidal" style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '50%', border: '3px solid var(--rose)' }} />
                    <div>
                      <h4 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--rose)' }}>Sarah Vidal</h4>
                      <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)' }}>Diététicienne-Nutritionniste D.E.</p>
                      <div style={{ color: 'var(--peach)', fontSize: '11px', marginTop: '4px' }}>★★★★★ <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px', marginLeft: '4px' }}>4.9 (120+ avis)</span></div>
                    </div>
                  </div>
                  
                  <h2 style={{ fontSize: '38px', lineHeight: '1.2', marginBottom: '16px', fontWeight: '700' }}>Votre Diététicienne Diplômée en Ligne</h2>
                  <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.7', marginBottom: '30px' }}>Prenez rendez-vous pour un accompagnement nutritionnel sur-mesure. Rééquilibrage alimentaire, perte de poids durable ou préparation sportive, nous définissons ensemble la méthode idéale pour votre réussite.</p>
                  
                  <div style={{ display: 'flex', gap: '16px', justifyContent: 'flex-start', flexWrap: 'wrap', marginTop: '10px' }}>
                    <a href="tel:0689205302" className="dietitian-cta-btn" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'var(--rose)', color: 'var(--dark)', padding: '14px 28px', borderRadius: '30px', textDecoration: 'none', fontWeight: '700' }}><i className="fa-solid fa-phone"></i> Appeler le 06 89 20 53 02</a>
                    <a href="https://wa.me/33689205302" className="dietitian-cta-btn secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: 'var(--white)', padding: '14px 28px', borderRadius: '30px', textDecoration: 'none', fontWeight: '700' }}><i className="fa-brands fa-whatsapp"></i> Écrire sur WhatsApp</a>
                  </div>
                </div>

                {/* Right Column: Benefits */}
                <div className="benefits-widget" style={{ padding: '60px', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: 'rgba(255,255,255,0.02)', borderLeft: '1px solid rgba(255,255,255,0.06)' }}>
                  <h3 style={{ fontSize: '22px', fontWeight: '700', color: 'var(--rose)', marginBottom: '24px' }}>Pourquoi choisir notre accompagnement ?</h3>
                  
                  <div className="dietitian-features" style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginBottom: '32px' }}>
                    <div className="dietitian-feature" style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                      <i className="fa-solid fa-circle-check" style={{ color: 'var(--rose)', fontSize: '18px', marginTop: '2px' }}></i>
                      <span style={{ fontSize: '14px', lineHeight: '1.5', color: 'rgba(255,255,255,0.9)' }}><strong>100% sur-mesure</strong> : Vos menus sont élaborés selon vos goûts, vos contraintes et vos objectifs.</span>
                    </div>
                    <div className="dietitian-feature" style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                      <i className="fa-solid fa-circle-check" style={{ color: 'var(--rose)', fontSize: '18px', marginTop: '2px' }}></i>
                      <span style={{ fontSize: '14px', lineHeight: '1.5', color: 'rgba(255,255,255,0.9)' }}><strong>Bilan complet sous 24h</strong> : Réception de votre plan alimentaire et de vos fiches conseils en PDF.</span>
                    </div>
                    <div className="dietitian-feature" style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                      <i className="fa-solid fa-circle-check" style={{ color: 'var(--rose)', fontSize: '18px', marginTop: '2px' }}></i>
                      <span style={{ fontSize: '14px', lineHeight: '1.5', color: 'rgba(255,255,255,0.9)' }}><strong>Remboursement mutuelle</strong> : Facture fournie pour une prise en charge par votre complémentaire santé.</span>
                    </div>
                    <div className="dietitian-feature" style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                      <i className="fa-solid fa-circle-check" style={{ color: 'var(--rose)', fontSize: '18px', marginTop: '2px' }}></i>
                      <span style={{ fontSize: '14px', lineHeight: '1.5', color: 'rgba(255,255,255,0.9)' }}><strong>Suivi & motivation</strong> : Échanges réguliers pour ajuster le programme et maintenir vos progrès.</span>
                    </div>
                  </div>

                  <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '20px', textAlign: 'center' }}>
                    <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', marginBottom: '6px' }}><i className="fa-solid fa-info-circle" style={{ color: 'var(--rose)' }}></i> Première consultation remboursée par de nombreuses mutuelles</p>
                    <span style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--peach)', letterSpacing: '0.5px' }}>Cabinet Béziers & Consultation à distance</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* TESTIMONIALS SECTION */}
          <section className="section" id="testimonials" style={{ paddingTop: '80px', paddingBottom: '80px', overflow: 'hidden', background: 'var(--bg-cream)' }}>
            <div className="container">
              <div className="section-title-wrap" style={{ textAlign: 'center', marginBottom: '50px' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'var(--rose-light)', color: 'var(--rose)', padding: '8px 16px', borderRadius: '30px', fontSize: '13px', fontWeight: '700', marginBottom: '16px' }}>
                  <i className="fa-solid fa-star"></i> Évalué 4.9/5 par nos clients
                </div>
                <h2>Avis & Témoignages</h2>
                <p>Découvrez les retours d&apos;expérience de nos clients sur nos produits et nos programmes d&apos;accompagnement.</p>
              </div>
            </div>

            {/* Testimonials Marquee Track 1 (Left to Right) */}
            <div className="testimonials-marquee-wrapper" style={{ marginBottom: '24px' }}>
              <div className="testimonials-marquee marquee-left">
                <div className="testimonial-card">
                  <div className="testimonial-header">
                    <div className="avatar-initials bg-grad-1">JD</div>
                    <div>
                      <h4>Julien D.</h4>
                      <span className="verified-badge"><i className="fa-solid fa-circle-check"></i> Achat vérifié</span>
                    </div>
                    <div className="stars">★★★★★</div>
                  </div>
                  <p>&quot;Le Pack Minceur Complet a fonctionné au-delà de mes attentes. Moins de fatigue et des résultats visibles en 3 semaines.&quot;</p>
                  <span className="reviewed-product">Produit : Pack Minceur Complet</span>
                </div>
                <div className="testimonial-card">
                  <div className="testimonial-header">
                    <div className="avatar-initials bg-grad-2">AM</div>
                    <div>
                      <h4>Amélie M.</h4>
                      <span className="verified-badge"><i className="fa-solid fa-circle-check"></i> Achat vérifié</span>
                    </div>
                    <div className="stars">★★★★★</div>
                  </div>
                  <p>&quot;Les conseils de Sarah ont totalement changé ma relation avec l&apos;alimentation. Le bilan en ligne est hyper détaillé.&quot;</p>
                  <span className="reviewed-product">Service : Consultation Bilan</span>
                </div>
                <div className="testimonial-card">
                  <div className="testimonial-header">
                    <div className="avatar-initials bg-grad-3">TL</div>
                    <div>
                      <h4>Thomas L.</h4>
                      <span className="verified-badge"><i className="fa-solid fa-circle-check"></i> Achat vérifié</span>
                    </div>
                    <div className="stars">★★★★★</div>
                  </div>
                  <p>&quot;La protéine végétale au chocolat est délicieuse, elle se mélange super bien et pas de ballonnements.&quot;</p>
                  <span className="reviewed-product">Produit : Protéine Végétale</span>
                </div>
                <div className="testimonial-card">
                  <div className="testimonial-header">
                    <div className="avatar-initials bg-grad-4">SR</div>
                    <div>
                      <h4>Sophie R.</h4>
                      <span className="verified-badge"><i className="fa-solid fa-circle-check"></i> Achat vérifié</span>
                    </div>
                    <div className="stars">★★★★★</div>
                  </div>
                  <p>&quot;Très satisfaite de mon programme personnalisé. J&apos;ai perdu 5 kg sans frustration et en gardant toute mon énergie.&quot;</p>
                  <span className="reviewed-product">Service : Suivi Diététique</span>
                </div>
                <div className="testimonial-card">
                  <div className="testimonial-header">
                    <div className="avatar-initials bg-grad-5">MK</div>
                    <div>
                      <h4>Mathieu K.</h4>
                      <span className="verified-badge"><i className="fa-solid fa-circle-check"></i> Achat vérifié</span>
                    </div>
                    <div className="stars">★★★★★</div>
                  </div>
                  <p>&quot;La créatine monohydrate est top. J&apos;ai gagné en force et en récupération sur mes séances de musculation.&quot;</p>
                  <span className="reviewed-product">Produit : Creatine Monohydrate</span>
                </div>
              </div>
            </div>

            {/* Testimonials Marquee Track 2 (Right to Left) */}
            <div className="testimonials-marquee-wrapper">
              <div className="testimonials-marquee marquee-right">
                <div className="testimonial-card">
                  <div className="testimonial-header">
                    <div className="avatar-initials bg-grad-6">EL</div>
                    <div>
                      <h4>Emma L.</h4>
                      <span className="verified-badge"><i className="fa-solid fa-circle-check"></i> Achat vérifié</span>
                    </div>
                    <div className="stars">★★★★★</div>
                  </div>
                  <p>&quot;Le Brûleur Jour/Nuit m&apos;a aidé à débloquer ma perte de poids tout en améliorant mon sommeil.&quot;</p>
                  <span className="reviewed-product">Produit : Brûleur Jour/Nuit</span>
                </div>
                <div className="testimonial-card">
                  <div className="testimonial-header">
                    <div className="avatar-initials bg-grad-7">NB</div>
                    <div>
                      <h4>Nicolas B.</h4>
                      <span className="verified-badge"><i className="fa-solid fa-circle-check"></i> Achat vérifié</span>
                    </div>
                    <div className="stars">★★★★★</div>
                  </div>
                  <p>&quot;L&apos;Ashwagandha KSM-66 est magique pour réduire le stress du travail. Je dors beaucoup mieux.&quot;</p>
                  <span className="reviewed-product">Produit : Ashwagandha KSM-66</span>
                </div>
                <div className="testimonial-card">
                  <div className="testimonial-header">
                    <div className="avatar-initials bg-grad-8">CP</div>
                    <div>
                      <h4>Chloé P.</h4>
                      <span className="verified-badge"><i className="fa-solid fa-circle-check"></i> Achat vérifié</span>
                    </div>
                    <div className="stars">★★★★★</div>
                  </div>
                  <p>&quot;Super pâte à tartiner protéinée, sans sucres ajoutés et avec un vrai goût de noisette !&quot;</p>
                  <span className="reviewed-product">Produit : Pâte à Tartiner</span>
                </div>
                <div className="testimonial-card">
                  <div className="testimonial-header">
                    <div className="avatar-initials bg-grad-9">AL</div>
                    <div>
                      <h4>Alexandre G.</h4>
                      <span className="verified-badge"><i className="fa-solid fa-circle-check"></i> Achat vérifié</span>
                    </div>
                    <div className="stars">★★★★★</div>
                  </div>
                  <p>&quot;Le pack remise de programme m&apos;a redonné un plan d&apos;action clair pour ma nutrition sportive.&quot;</p>
                  <span className="reviewed-product">Service : Consultation Remise</span>
                </div>
                <div className="testimonial-card">
                  <div className="testimonial-header">
                    <div className="avatar-initials bg-grad-10">LV</div>
                    <div>
                      <h4>Léa V.</h4>
                      <span className="verified-badge"><i className="fa-solid fa-circle-check"></i> Achat vérifié</span>
                    </div>
                    <div className="stars">★★★★★</div>
                  </div>
                  <p>&quot;Les oméga 3 Premium sont d&apos;une pureté incroyable. Pas de retour désagréable, très digeste.&quot;</p>
                  <span className="reviewed-product">Produit : Omega 3 Premium</span>
                </div>
              </div>
            </div>
          </section>

          {/* FAQS SECTION */}
          <section className="section" id="faqs">
            <div className="container">
              <div className="section-title-wrap">
                <h2>Questions Fréquentes</h2>
                <p>Tout ce que vous devez savoir sur nos produits, le cabinet de Béziers et nos consultations en ligne.</p>
              </div>
              
              <div className="faq-grid">
                {[
                  { q: "Comment se déroule la consultation à distance ?", a: "Une fois votre réservation effectuée, vous recevez un lien de visioconférence (ou un appel téléphonique selon votre préférence). La diététicienne réalise un bilan complet et vous transmet ensuite votre plan nutritionnel personnalisé par e-mail sous 24h." },
                  { q: "Les compléments alimentaires conviennent-ils aux végétariens ?", a: "La majorité de notre gamme VDN est d'origine végétale et convient parfaitement aux végétariens et végétaliens. Les fiches produits mentionnent systématiquement cette indication." },
                  { q: "Quels sont les délais de livraison ?", a: "Toute commande passée avant 14h est expédiée le jour même. La livraison standard à domicile ou en point relais s'effectue sous 48 heures ouvrées." },
                  { q: "Puis-je me rendre directement au cabinet physique ?", a: "Absolument ! Notre cabinet physique est situé à Béziers. Vous pouvez planifier votre séance en cabinet en prenant contact directement au 06 89 20 53 02." }
                ].map((faq, idx) => (
                  <div key={idx} className={`faq-item ${expandedFaq === idx ? 'active' : ''}`}>
                    <div className="faq-header" onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}>
                      <h3>{faq.q}</h3>
                      <span className="faq-icon"><i className="fa-solid fa-chevron-down"></i></span>
                    </div>
                    <div className="faq-content" style={{ maxHeight: expandedFaq === idx ? '200px' : '0px' }}>
                      <p>{faq.a}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* NEWSLETTER */}
          <section className="section section-bg">
            <div className="container">
              <div className="newsletter-banner">
                <h2>Rejoignez la Communauté VDN</h2>
                <p>Recevez nos articles de nutrition, nos conseils diététiques hebdomadaires et bénéficiez de 10% de réduction sur votre premier achat.</p>
                <form className="newsletter-form" onSubmit={(e) => {
                  e.preventDefault();
                  const email = e.target.querySelector('input').value;
                  alert(`Merci de vous être inscrit à la newsletter VDN avec l'adresse : ${email}. Vous recevrez bientôt vos 10% de réduction.`);
                  e.target.reset();
                }}>
                  <input type="email" placeholder="Votre adresse e-mail..." className="newsletter-input" required />
                  <button type="submit" className="newsletter-btn">S&apos;inscrire</button>
                </form>
              </div>
            </div>
          </section>
        </main>
      )}

      {activePage === 'category' && (
        <main id="category-page-content" style={{ minHeight: '80vh', background: 'var(--bg-cream)', padding: '120px 0 60px 0' }}>
          <div className="container">
            <div className="breadcrumb-nav">
              <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('home'); }}>Accueil</a>
              <span className="breadcrumb-separator"><i className="fa-solid fa-chevron-right"></i></span>
              <span style={{ color: 'var(--text-mid)' }}>{currentCategoryTag || 'Tous les produits'}</span>
            </div>
            
            <div className="category-page-header">
              <h1>{currentCategoryTag || 'Tous les produits'}</h1>
              <p>{currentCategoryTag ? `Tous nos produits dans la catégorie "${currentCategoryTag}"` : 'Découvrez notre sélection de compléments alimentaires premium'}</p>
            </div>

            <div className="category-page-grid">
              {/* SIDEBAR FILTERS */}
              <aside className={`category-sidebar ${sidebarMobileOpen ? 'mobile-open' : ''}`} id="category-sidebar">
                <button className="sidebar-close-btn" onClick={() => setSidebarMobileOpen(false)} aria-label="Close filters"><i className="fa-solid fa-xmark"></i></button>
                
                {/* Categories */}
                <div className={`filter-section ${filterSectionsCollapsed.categories ? 'collapsed' : ''}`}>
                  <div className="filter-section-title" onClick={() => setFilterSectionsCollapsed(p => ({ ...p, categories: !p.categories }))}>
                    Catégorie <i className="fa-solid fa-chevron-down"></i>
                  </div>
                  <div className="filter-section-body">
                    {allUniqueTags.map(tag => {
                      const count = allProductsList.filter(p => p.tag === tag).length;
                      return (
                        <label className="filter-checkbox-row" key={tag}>
                          <input
                            type="checkbox"
                            className="filter-checkbox"
                            checked={sidebarCategories.includes(tag)}
                            onChange={() => handleCategoryCheckboxChange(tag)}
                          />
                          {tag}
                          <span className="filter-count">{count}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Brands */}
                <div className={`filter-section ${filterSectionsCollapsed.brands ? 'collapsed' : ''}`}>
                  <div className="filter-section-title" onClick={() => setFilterSectionsCollapsed(p => ({ ...p, brands: !p.brands }))}>
                    Marque <i className="fa-solid fa-chevron-down"></i>
                  </div>
                  <div className="filter-section-body">
                    {allUniqueBrands.map(brand => {
                      const count = allProductsList.filter(p => p.brand === brand).length;
                      return (
                        <label className="filter-checkbox-row" key={brand}>
                          <input
                            type="checkbox"
                            className="filter-checkbox"
                            checked={sidebarBrands.includes(brand)}
                            onChange={() => handleBrandCheckboxChange(brand)}
                          />
                          {brand}
                          <span className="filter-count">{count}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Price */}
                <div className={`filter-section ${filterSectionsCollapsed.price ? 'collapsed' : ''}`}>
                  <div className="filter-section-title" onClick={() => setFilterSectionsCollapsed(p => ({ ...p, price: !p.price }))}>
                    Prix <i className="fa-solid fa-chevron-down"></i>
                  </div>
                  <div className="filter-section-body">
                    <div className="price-range-wrapper">
                      <div className="price-range-inputs">
                        <input
                          type="number"
                          className="price-range-input"
                          value={sidebarPriceMin}
                          onChange={(e) => setSidebarPriceMin(parseFloat(e.target.value) || 0)}
                          placeholder="Min"
                          min="0"
                        />
                        <span className="price-range-separator">—</span>
                        <input
                          type="number"
                          className="price-range-input"
                          value={sidebarPriceMax}
                          onChange={(e) => setSidebarPriceMax(parseFloat(e.target.value) || 9999)}
                          placeholder="Max"
                          min="0"
                        />
                      </div>
                      <div className="price-slider-track">
                        <div className="price-slider-fill" style={{ left: '0%', width: '100%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Rating */}
                <div className={`filter-section ${filterSectionsCollapsed.rating ? 'collapsed' : ''}`}>
                  <div className="filter-section-title" onClick={() => setFilterSectionsCollapsed(p => ({ ...p, rating: !p.rating }))}>
                    Note minimum <i className="fa-solid fa-chevron-down"></i>
                  </div>
                  <div className="filter-section-body">
                    <label className="filter-checkbox-row">
                      <input
                        type="radio"
                        name="rating-filter"
                        value="0"
                        className="filter-checkbox"
                        checked={sidebarRatingMin === 0}
                        onChange={() => setSidebarRatingMin(0)}
                      /> Toutes les notes
                    </label>
                    <label className="filter-checkbox-row">
                      <input
                        type="radio"
                        name="rating-filter"
                        value="4.5"
                        className="filter-checkbox"
                        checked={sidebarRatingMin === 4.5}
                        onChange={() => setSidebarRatingMin(4.5)}
                      /> ★★★★★ 4.5+
                    </label>
                    <label className="filter-checkbox-row">
                      <input
                        type="radio"
                        name="rating-filter"
                        value="4.8"
                        className="filter-checkbox"
                        checked={sidebarRatingMin === 4.8}
                        onChange={() => setSidebarRatingMin(4.8)}
                      /> ★★★★★ 4.8+
                    </label>
                  </div>
                </div>

                {/* Actions */}
                <div className="filter-actions">
                  <button className="filter-apply-btn" onClick={() => setSidebarMobileOpen(false)}><i className="fa-solid fa-check"></i> Appliquer</button>
                  <button className="filter-reset-btn" onClick={handleResetCategoryFilters}>Réinitialiser</button>
                </div>
              </aside>

              {/* PRODUCTS AREA */}
              <div className="category-products-area">
                <div className="category-top-bar">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
                    <button className="mobile-filter-toggle" onClick={() => setSidebarMobileOpen(true)}>
                      <i className="fa-solid fa-sliders"></i> Filtres
                    </button>
                    <span className="category-results-count"><strong>{getFilteredProducts().length}</strong> produit{getFilteredProducts().length > 1 ? 's' : ''} trouvé{getFilteredProducts().length > 1 ? 's' : ''}</span>
                  </div>
                  <div className="category-sort-box">
                    <span className="category-sort-label">Trier par :</span>
                    <select className="category-sort-select" value={sidebarSortVal} onChange={(e) => setSidebarSortVal(e.target.value)}>
                      <option value="default">Popularité</option>
                      <option value="price-asc">Prix croissant</option>
                      <option value="price-desc">Prix décroissant</option>
                      <option value="name-asc">Nom A-Z</option>
                      <option value="name-desc">Nom Z-A</option>
                      <option value="rating">Meilleures notes</option>
                    </select>
                  </div>
                </div>

                <div className="category-products-grid" id="category-products-grid">
                  {getFilteredProducts().length === 0 ? (
                    <div className="category-no-results" style={{ gridColumn: '1 / -1' }}>
                      <i className="fa-solid fa-magnifying-glass"></i>
                      <h3>Aucun produit trouvé</h3>
                      <p>Essayez de modifier vos filtres pour voir plus de résultats.</p>
                    </div>
                  ) : (
                    getFilteredProducts().map(p => {
                      const oldPriceHtml = p.oldPrice ? <span className="cat-prod-old-price">{p.oldPrice.toFixed(2).replace('.', ',')} €</span> : null;
                      const stars = '★'.repeat(Math.round(p.rating));
                      return (
                        <div className="category-product-card" key={p.id} onClick={() => navigateTo('product', p.id)} style={{ cursor: 'pointer' }}>
                          {p.tag && <span className="cat-prod-tag">{p.tag}</span>}
                          <div className="cat-prod-img">
                            <img src={p.img} alt={p.title} loading="lazy" />
                          </div>
                          <div className="cat-prod-body">
                            <div className="cat-prod-brand">{p.brand}</div>
                            <div className="cat-prod-title">{p.title}</div>
                            <div className="cat-prod-rating">{stars} <span>({p.reviewsCount} avis)</span></div>
                            <div className="cat-prod-price-row">
                              <span className="cat-prod-price">{p.price.toFixed(2).replace('.', ',')} €</span>
                              {oldPriceHtml}
                            </div>
                          </div>
                          <button className="cat-prod-quick-add" onClick={(e) => { e.stopPropagation(); addToCart(p.id); }}>
                            <i className="fa-solid fa-basket-shopping"></i> Ajout rapide
                          </button>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {activePage === 'product' && currentProductId && PRODUCTS_DATABASE[currentProductId] && (() => {
        const prod = PRODUCTS_DATABASE[currentProductId];
        const stars = '★'.repeat(Math.round(prod.rating));
        const oldPriceHtml = prod.oldPrice ? <span className="product-detail-old-price">{prod.oldPrice.toFixed(2).replace('.', ',')} €</span> : null;
        const associated = getAssociatedProducts(currentProductId);

        return (
          <main id="product-page-content" style={{ minHeight: '80vh', background: 'var(--bg-cream)', padding: '120px 0 60px 0' }}>
            <div className="container" id="product-detail-container">
              <div className="breadcrumb-nav">
                <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('home'); }}>Accueil</a>
                <span className="breadcrumb-separator"><i className="fa-solid fa-chevron-right"></i></span>
                <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('category'); }}>Boutique</a>
                <span className="breadcrumb-separator"><i className="fa-solid fa-chevron-right"></i></span>
                <span style={{ color: 'var(--text-mid)' }}>{prod.title}</span>
              </div>
              
              <div className="product-detail-grid">
                <div className="product-detail-gallery">
                  <div className="product-detail-main-img">
                    <img src={detailMainImage || prod.img} alt={prod.title} id="main-detail-img" />
                  </div>
                  <div className="product-detail-thumbnails">
                    {prod.images && prod.images.map((imgSrc, idx) => (
                      <div
                        className={`product-detail-thumb ${(detailMainImage || prod.img) === imgSrc ? 'active' : ''}`}
                        key={idx}
                        onClick={() => setDetailMainImage(imgSrc)}
                      >
                        <img src={imgSrc} alt={`${prod.title} thumbnail ${idx}`} />
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="product-detail-info">
                  <div>
                    <span className="product-detail-brand">{prod.brand}</span>
                    <h1 className="product-detail-title">{prod.title}</h1>
                  </div>
                  
                  <div className="product-detail-rating">
                    <span className="product-detail-stars">{stars}</span>
                    <span className="product-detail-reviews">4.9 ({prod.reviewsCount} avis clients)</span>
                  </div>
                  
                  <div className="product-detail-price-box">
                    <span className="product-detail-price">{prod.price.toFixed(2).replace('.', ',')} €</span>
                    {oldPriceHtml}
                  </div>
                  
                  <p className="product-detail-short-desc">{prod.shortDesc}</p>
                  
                  {/* Flavor variations selector */}
                  {prod.flavors && prod.flavors.length > 0 && (
                    <div className="product-detail-variations">
                      <label className="product-detail-variation-label">Saveur :</label>
                      <div className="cart-item-select-wrapper" style={{ maxWidth: '280px' }}>
                        <select
                          className="cart-item-select"
                          value={detailSelectedFlavor}
                          onChange={(e) => setDetailSelectedFlavor(e.target.value)}
                        >
                          {prod.flavors.map(f => <option value={f} key={f}>{f}</option>)}
                        </select>
                      </div>
                    </div>
                  )}

                  {/* Size variations selector */}
                  {prod.sizes && prod.sizes.length > 0 && (
                    <div className="product-detail-variations" style={{ marginTop: '16px' }}>
                      <label className="product-detail-variation-label">Format :</label>
                      <div className="cart-item-select-wrapper" style={{ maxWidth: '280px' }}>
                        <select
                          className="cart-item-select"
                          value={detailSelectedSize}
                          onChange={(e) => setDetailSelectedSize(e.target.value)}
                        >
                          {prod.sizes.map(s => <option value={s} key={s}>{s}</option>)}
                        </select>
                      </div>
                    </div>
                  )}

                  {/* Benefits checkmark list */}
                  {prod.benefits && (
                    <div className="product-detail-benefits" style={{ marginTop: '24px' }}>
                      {prod.benefits.map((b, idx) => (
                        <div className="product-detail-benefit" key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '8px' }}>
                          <i className="fa-solid fa-circle-check" style={{ color: 'var(--dark)', marginTop: '3px' }}></i>
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div className="product-detail-actions" style={{ marginTop: '24px' }}>
                    <div className="product-detail-qty-box">
                      <button className="product-detail-qty-btn" onClick={() => setDetailQty(prev => Math.max(1, prev - 1))}>-</button>
                      <span className="product-detail-qty-val">{detailQty}</span>
                      <button className="product-detail-qty-btn" onClick={() => setDetailQty(prev => prev + 1)}>+</button>
                    </div>
                    <button className="product-detail-add-btn" onClick={() => {
                      for (let i = 0; i < detailQty; i++) {
                        addToCart(prod.id, detailSelectedFlavor, detailSelectedSize);
                      }
                    }}>
                      <i className="fa-solid fa-basket-shopping"></i> Ajouter au panier
                    </button>
                  </div>
                  
                  <div className="product-detail-trust-list">
                    <div className="product-detail-trust-item">
                      <i className="fa-solid fa-truck-fast"></i>
                      <span>Livraison gratuite dès 50€ d&apos;achat en 48h</span>
                    </div>
                    <div className="product-detail-trust-item">
                      <i className="fa-solid fa-shield-halved"></i>
                      <span>Paiement 100% sécurisé et garanti</span>
                    </div>
                    <div className="product-detail-trust-item">
                      <i className="fa-solid fa-leaf"></i>
                      <span>Sélectionné par nos diététiciennes diplômées</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="product-tabs-container">
                <div className="product-tabs-headers">
                  <span className={`product-tab-header ${detailActiveTab === 'desc' ? 'active' : ''}`} onClick={() => setDetailActiveTab('desc')}>Description</span>
                  <span className={`product-tab-header ${detailActiveTab === 'usage' ? 'active' : ''}`} onClick={() => setDetailActiveTab('usage')}>Conseils d&apos;utilisation</span>
                  <span className={`product-tab-header ${detailActiveTab === 'ingredients' ? 'active' : ''}`} onClick={() => setDetailActiveTab('ingredients')}>Composition</span>
                  <span className={`product-tab-header ${detailActiveTab === 'faq' ? 'active' : ''}`} onClick={() => setDetailActiveTab('faq')}>FAQ Produit</span>
                  <span className={`product-tab-header ${detailActiveTab === 'reviews' ? 'active' : ''}`} onClick={() => setDetailActiveTab('reviews')}>Avis Clients ({prod.reviewsCount})</span>
                </div>
                
                {detailActiveTab === 'desc' && (
                  <div className="product-tab-panel active">
                    <p>{prod.description}</p>
                    <p style={{ marginTop: '15px' }}>Nos compléments alimentaires sont rigoureusement sélectionnés pour leur biodisponibilité élevée et leur tolérance digestive optimale. Conçus en collaboration avec des professionnels de santé.</p>
                  </div>
                )}
                
                {detailActiveTab === 'usage' && (
                  <div className="product-tab-panel active">
                    <p>{prod.usage}</p>
                    <p style={{ marginTop: '15px', fontWeight: 600, color: 'var(--rose)' }}><i className="fa-solid fa-triangle-exclamation"></i> Précautions d&apos;emploi :</p>
                    <p>Ne pas dépasser la dose journalière recommandée. Les compléments alimentaires doivent être utilisés dans le cadre d&apos;un mode de vie sain et ne pas remplacer un régime alimentaire varié et équilibré. Tenir hors de portée des enfants.</p>
                  </div>
                )}
                
                {detailActiveTab === 'ingredients' && (
                  <div className="product-tab-panel active">
                    <p>Tableau des valeurs nutritionnelles moyennes pour une portion journalière :</p>
                    <table className="nutrition-table">
                      <thead>
                        <tr>
                          <th>Composant actif</th>
                          <th>Quantité par portion</th>
                        </tr>
                      </thead>
                      <tbody>
                        {prod.ingredients && prod.ingredients.map((ing, idx) => (
                          <tr key={idx}>
                            <td>{ing.name}</td>
                            <td>{ing.amount}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                
                {detailActiveTab === 'faq' && (
                  <div className="product-tab-panel active">
                    {prod.faq && prod.faq.length > 0 ? (
                      <div className="product-faq-accordion">
                        {prod.faq.map((f, idx) => (
                          <div className={`product-faq-item ${expandedDetailFaq === idx ? 'active' : ''}`} key={idx}>
                            <div className="product-faq-header" onClick={() => setExpandedDetailFaq(expandedDetailFaq === idx ? null : idx)}>
                              <span>{f.q}</span>
                              <span className="product-faq-icon"><i className="fa-solid fa-chevron-down"></i></span>
                            </div>
                            <div className="product-faq-content" style={{ maxHeight: expandedDetailFaq === idx ? '150px' : '0px' }}>
                              <p>{f.a}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p>Aucune question fréquente pour ce produit pour le moment.</p>
                    )}
                  </div>
                )}
                
                {detailActiveTab === 'reviews' && (
                  <div className="product-tab-panel active">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                      <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: '16px', padding: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                          <span style={{ fontWeight: 700, color: 'var(--dark)' }}>Sophie L.</span>
                          <span style={{ color: '#F5A623' }}>★★★★★</span>
                        </div>
                        <p>&quot;Produit de très grande qualité. J&apos;ai vu la différence sur ma récupération en quelques jours. Je recommande !&quot;</p>
                      </div>
                      <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: '16px', padding: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                          <span style={{ fontWeight: 700, color: 'var(--dark)' }}>Marc A.</span>
                          <span style={{ color: '#F5A623' }}>★★★★★</span>
                        </div>
                        <p>&quot;Excellent goût et miscibilité parfaite. Une des meilleures compositions du marché.&quot;</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Related products */}
              {associated.length > 0 && (
                <div className="related-products-section">
                  <h2>Produits associés</h2>
                  <div className="related-products-grid">
                    {associated.map(rp => {
                      const rpOldPrice = rp.oldPrice ? <span className="related-old-price">{rp.oldPrice.toFixed(2).replace('.', ',')} €</span> : null;
                      return (
                        <div className="related-product-card" key={rp.id} onClick={() => navigateTo('product', rp.id)}>
                          {rp.tag && <span className="related-tag">{rp.tag}</span>}
                          <div className="related-product-img">
                            <img src={rp.img} alt={rp.title} />
                          </div>
                          <div className="related-product-card-body">
                            <span className="related-brand">{rp.brand}</span>
                            <span className="related-title">{rp.title}</span>
                            <div className="related-price-row">
                              <span className="related-price">{rp.price.toFixed(2).replace('.', ',')} €</span>
                              {rpOldPrice}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </main>
        );
      })()}

      {activePage === 'cart' && (
        <main id="cart-page-content" style={{ minHeight: '80vh', background: 'var(--bg-cream)', padding: '120px 0 60px 0' }}>
          <div className="container">
            <h1 className="cart-page-title">Mon Panier</h1>
            
            {cart.length === 0 ? (
              <div className="cart-page-empty">
                <i className="fa-solid fa-basket-shopping"></i>
                <h2>Votre panier est vide</h2>
                <p style={{ color: 'var(--text-mid)', margin: '10px 0 30px 0' }}>Découvrez nos compléments alimentaires et commencez vos achats.</p>
                <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('home'); }} className="dietitian-cta-btn" style={{ background: 'var(--rose)', color: 'var(--dark)', padding: '12px 30px', borderRadius: '30px', textDecoration: 'none', fontWeight: 700, display: 'inline-block' }}>Retour à la boutique</a>
              </div>
            ) : (
              <div className="cart-page-grid">
                {/* Left side: Items */}
                <div className="cart-page-items" id="cart-page-items-container">
                  {cart.map(item => {
                    const prod = PRODUCTS_DATABASE[item.id];
                    return (
                      <div className="cart-page-item" key={item.key}>
                        <div className="cart-page-item-img">
                          <img src={item.img} alt={item.title} />
                        </div>
                        <div className="cart-page-item-info">
                          <span className="cart-page-item-brand">{item.brand}</span>
                          <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('product', item.id); }} className="cart-page-item-title">{item.title}</a>
                          
                          {/* Variations select lists in cart */}
                          {prod && (
                            <div className="cart-item-variations" style={{ maxWidth: '250px' }}>
                              {prod.flavors && prod.flavors.length > 0 && (
                                <div className="cart-item-select-wrapper">
                                  <select
                                    className="cart-item-select"
                                    value={item.flavor}
                                    onChange={(e) => changeCartItemVariation(item.key, 'flavor', e.target.value)}
                                  >
                                    {prod.flavors.map(f => <option value={f} key={f}>{f}</option>)}
                                  </select>
                                </div>
                              )}
                              {prod.sizes && prod.sizes.length > 0 && (
                                <div className="cart-item-select-wrapper">
                                  <select
                                    className="cart-item-select"
                                    value={item.size}
                                    onChange={(e) => changeCartItemVariation(item.key, 'size', e.target.value)}
                                  >
                                    {prod.sizes.map(s => <option value={s} key={s}>{s}</option>)}
                                  </select>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                        <div className="cart-page-item-qty">
                          <div className="quantity-selector">
                            <button className="qty-btn" onClick={() => updateCartItemQty(item.key, -1)}>-</button>
                            <span className="qty-value">{item.quantity}</span>
                            <button className="qty-btn" onClick={() => updateCartItemQty(item.key, 1)}>+</button>
                          </div>
                        </div>
                        <div className="cart-page-item-price-box">
                          <span>{(item.price * item.quantity).toFixed(2).replace('.', ',')} €</span>
                          <span className="cart-page-item-price-unit">{item.price.toFixed(2).replace('.', ',')} € / unité</span>
                        </div>
                        <button className="cart-page-item-remove" onClick={() => removeCartItem(item.key)} aria-label="Supprimer l'article">
                          <i className="fa-solid fa-trash-can"></i>
                        </button>
                      </div>
                    );
                  })}
                </div>
                
                {/* Right side: Summary */}
                <div className="cart-page-summary">
                  <h3 className="cart-summary-title">Résumé de la commande</h3>
                  
                  <div className="cart-summary-row">
                    <span>Sous-total</span>
                    <span>{cartSubtotal.toFixed(2).replace('.', ',')} €</span>
                  </div>
                  
                  <div className="cart-summary-row">
                    <span>Livraison</span>
                    <span>{shippingCost === 0 ? 'Gratuite' : `${shippingCost.toFixed(2).replace('.', ',')} €`}</span>
                  </div>

                  {promoDiscount > 0 && (
                    <div className="cart-summary-row" style={{ color: 'var(--mint)', fontWeight: '600' }}>
                      <span>Code promo ({promoCode.toUpperCase()})</span>
                      <span>-{promoDiscountAmount.toFixed(2).replace('.', ',')} €</span>
                    </div>
                  )}
                  
                  <div className="cart-summary-row total">
                    <span>Total (TTC)</span>
                    <span>{cartTotalAmount.toFixed(2).replace('.', ',')} €</span>
                  </div>

                  <div style={{ marginTop: '10px' }}>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--dark)', display: 'block', marginBottom: '8px' }}>Code Promo</label>
                    <div className="cart-promo-box">
                      <input
                        type="text"
                        className="cart-promo-input"
                        placeholder="Ex: VDN10"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                      />
                      <button className="cart-promo-btn" onClick={handleApplyPromo}>Appliquer</button>
                    </div>
                    {promoMessage && (
                      <div id="promo-message" style={{ fontSize: '12px', marginTop: '6px', fontWeight: 600, color: promoMessage.includes('appliqué') ? 'var(--mint)' : 'var(--rose)' }}>
                        {promoMessage}
                      </div>
                    )}
                  </div>
                  
                  <button className="cart-checkout-btn" onClick={handleCheckout}><i className="fa-solid fa-credit-card"></i> Passer au paiement</button>
                  
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', color: 'var(--text-mid)', fontSize: '12px', marginTop: '10px' }}>
                    <i className="fa-solid fa-lock" style={{ color: 'var(--mint)' }}></i> Paiement 100% sécurisé SSL
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      )}

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('home'); }} className="logo" style={{ marginBottom: '20px', display: 'inline-block' }}>
              <img src="/logo%20boutique%202.png" alt="Vidal Nutrition" style={{ height: '50px', width: 'auto', display: 'block' }} />
            </a>
            <p>Boutique officielle de compléments alimentaires haut de gamme et cabinet de diététique clinique et sportive.</p>
            <div className="social-icons">
              <a href="#" className="social-icon" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a>
              <a href="#" className="social-icon" aria-label="Facebook"><i className="fa-brands fa-facebook-f"></i></a>
              <a href="#" className="social-icon" aria-label="TikTok"><i className="fa-brands fa-tiktok"></i></a>
              <a href="#" className="social-icon" aria-label="Twitter"><i className="fa-brands fa-twitter"></i></a>
            </div>
          </div>
          <div className="footer-col" style={{ minWidth: '250px' }} ref={dropdownRef}>
            <h4>Nos Produits</h4>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginBottom: '12px', lineHeight: 1.4 }}>Accédez rapidement à toutes nos gammes de compléments alimentaires :</p>
            
            <div className="footer-dropdown-container" style={{ position: 'relative', width: '100%' }}>
              <button
                className="footer-dropdown-btn"
                onClick={(e) => { e.stopPropagation(); setFooterDropdownOpen(!footerDropdownOpen); }}
                style={{ width: '100%', display: 'inline-flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--white)', padding: '14px 20px', borderRadius: '30px', cursor: 'pointer', fontSize: '14px', fontWeight: 600 }}
              >
                <span>Choisir une catégorie...</span>
                <i className="fa-solid fa-chevron-down" style={{ transition: 'all 0.3s', transform: footerDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)', fontSize: '12px', marginLeft: '10px' }}></i>
              </button>
              
              {footerDropdownOpen && (
                <div className="footer-dropdown-menu" style={{ display: 'block', position: 'absolute', bottom: 'calc(100% + 10px)', left: 0, width: '100%', minWidth: '280px', background: '#161514', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)', zIndex: 999, maxHeight: '320px', overflowY: 'auto', padding: '20px' }}>
                  {/* Nutrition Sportive */}
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--rose)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}><i className="fa-solid fa-dumbbell"></i> Nutrition Sportive</div>
                    <ul style={{ listStyle: 'none', paddingLeft: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <li><a href="#" onClick={(e) => { e.preventDefault(); setFooterDropdownOpen(false); navigateTo('category', 'Performance'); }} style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '13px' }}>Whey & Isolat</a></li>
                      <li><a href="#" onClick={(e) => { e.preventDefault(); setFooterDropdownOpen(false); navigateTo('category', 'Performance'); }} style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '13px' }}>Acides Aminés (BCAA, EAA)</a></li>
                      <li><a href="#" onClick={(e) => { e.preventDefault(); setFooterDropdownOpen(false); navigateTo('category', 'Créatine'); }} style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '13px' }}>Créatine Monohydrate</a></li>
                      <li><a href="#" onClick={(e) => { e.preventDefault(); setFooterDropdownOpen(false); navigateTo('category', 'Performance'); }} style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '13px' }}>Pré-Workout & Énergie</a></li>
                    </ul>
                  </div>
                  {/* Minceur */}
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--rose)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}><i className="fa-solid fa-fire"></i> Minceur</div>
                    <ul style={{ listStyle: 'none', paddingLeft: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <li><a href="#" onClick={(e) => { e.preventDefault(); setFooterDropdownOpen(false); navigateTo('category', 'Minceur'); }} style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '13px' }}>Brûleurs de Graisse</a></li>
                      <li><a href="#" onClick={(e) => { e.preventDefault(); setFooterDropdownOpen(false); navigateTo('category', 'Minceur'); }} style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '13px' }}>Coupe-Faim & Draineurs</a></li>
                    </ul>
                  </div>
                  {/* Santé & Bien-être */}
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--rose)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}><i className="fa-solid fa-heart-pulse"></i> Santé & Bien-être</div>
                    <ul style={{ listStyle: 'none', paddingLeft: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <li><a href="#" onClick={(e) => { e.preventDefault(); setFooterDropdownOpen(false); navigateTo('category', 'Digestion'); }} style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '13px' }}>Ventre Plat & Probiotiques</a></li>
                      <li><a href="#" onClick={(e) => { e.preventDefault(); setFooterDropdownOpen(false); navigateTo('category', 'Détente'); }} style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '13px' }}>Sommeil & Adaptogènes</a></li>
                      <li><a href="#" onClick={(e) => { e.preventDefault(); setFooterDropdownOpen(false); navigateTo('category', 'Bio & Végétal'); }} style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '13px' }}>Vitamines & Oméga 3</a></li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="footer-col">
            <h4>Nos Services</h4>
            <ul className="footer-links">
              <li><a href="#dietitian" className="footer-link">Bilan Diététique (49€)</a></li>
              <li><a href="#dietitian" className="footer-link">Programme Remise (39€)</a></li>
              <li><a href="#dietitian" className="footer-link">Suivi Mensuel (29€)</a></li>
              <li><a href="tel:0689205302" className="footer-link">Cabinet Physique Béziers</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Aide & Infos</h4>
            <ul className="footer-links">
              <li><a href="#" className="footer-link">Mentions Légales</a></li>
              <li><a href="#" className="footer-link">CGV / CGU</a></li>
              <li><a href="#" className="footer-link">Politique de retour</a></li>
              <li><a href="#" className="footer-link">Contactez-nous</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 Vidal Diet Nutrition. Tous droits réservés.</p>
          <div className="footer-bottom-links">
            <a href="#" className="footer-link" style={{ marginLeft: '16px' }}>Sécurité</a>
            <a href="#" className="footer-link" style={{ marginLeft: '16px' }}>Confidentialité</a>
          </div>
        </div>
      </footer>

      {/* PREMIUM CART DRAWER */}
      <div className={`cart-drawer-overlay ${cartOpen ? 'active' : ''}`} onClick={() => setCartOpen(false)}></div>
      <div className={`cart-drawer ${cartOpen ? 'active' : ''}`}>
        <div className="cart-drawer-header">
          <h3>Votre Panier ({cartTotalItemsCount})</h3>
          <button className="close-cart-btn" onClick={() => setCartOpen(false)} aria-label="Close cart"><i className="fa-solid fa-xmark"></i></button>
        </div>
        
        <div className="cart-shipping-banner">
          <div className="shipping-progress-text">
            {cartSubtotal === 0
              ? 'Ajoutez 50,00 € pour bénéficier de la livraison gratuite !'
              : (cartSubtotal >= shippingThreshold
                ? 'Félicitations ! Vous bénéficiez de la livraison gratuite !'
                : `Ajoutez encore ${(shippingThreshold - cartSubtotal).toFixed(2).replace('.', ',')} € pour bénéficier de la livraison gratuite !`
              )
            }
          </div>
          <div className="shipping-progress-bar">
            <div
              className="shipping-progress-fill"
              style={{
                width: `${Math.min(100, (cartSubtotal / shippingThreshold) * 100)}%`,
                backgroundColor: cartSubtotal >= shippingThreshold ? 'var(--mint)' : 'var(--rose)'
              }}
            ></div>
          </div>
        </div>

        <div className="cart-items-list">
          {cart.length === 0 ? (
            <div className="cart-empty-message" style={{ display: 'block' }}>
              <i className="fa-solid fa-basket-shopping"></i>
              <p>Votre panier est vide</p>
            </div>
          ) : (
            cart.map(item => {
              const prod = PRODUCTS_DATABASE[item.id];
              return (
                <div className="cart-item" key={item.key}>
                  <img src={item.img} alt={item.title} className="cart-item-img" />
                  <div className="cart-item-info">
                    <span className="cart-item-title">{item.title}</span>
                    <span className="cart-item-brand">{item.brand}</span>
                    <span className="cart-item-price">{(item.price * item.quantity).toFixed(2).replace('.', ',')} €</span>
                    
                    {/* Variations selectors in sidebar cart */}
                    {prod && (
                      <div className="cart-item-variations">
                        {prod.flavors && prod.flavors.length > 0 && (
                          <div className="cart-item-select-wrapper">
                            <select
                              className="cart-item-select"
                              value={item.flavor}
                              onChange={(e) => changeCartItemVariation(item.key, 'flavor', e.target.value)}
                            >
                              {prod.flavors.map(f => <option value={f} key={f}>{f}</option>)}
                            </select>
                          </div>
                        )}
                        {prod.sizes && prod.sizes.length > 0 && (
                          <div className="cart-item-select-wrapper">
                            <select
                              className="cart-item-select"
                              value={item.size}
                              onChange={(e) => changeCartItemVariation(item.key, 'size', e.target.value)}
                            >
                              {prod.sizes.map(s => <option value={s} key={s}>{s}</option>)}
                            </select>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="cart-item-actions">
                      <div className="quantity-selector">
                        <button className="qty-btn" onClick={() => updateCartItemQty(item.key, -1)}>-</button>
                        <span className="qty-value">{item.quantity}</span>
                        <button className="qty-btn" onClick={() => updateCartItemQty(item.key, 1)}>+</button>
                      </div>
                      <button className="remove-item-btn" onClick={() => removeCartItem(item.key)} aria-label="Supprimer"><i className="fa-solid fa-trash-can"></i></button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="cart-footer">
          <div className="cart-total-row">
            <span>Sous-total</span>
            <span>{cartSubtotal.toFixed(2).replace('.', ',')} €</span>
          </div>
          <button className="checkout-btn" onClick={() => { setCartOpen(false); navigateTo('cart'); }}>Voir mon panier</button>
        </div>
      </div>
    </>
  );
}
