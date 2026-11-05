import type { Product } from '../types'

export const products: Product[] = [
  // Tubercules
  { 
    id: 1, 
    name: 'Manioc frais', 
    description: 'Tubercules de manioc fraîchement récoltés', 
    tag: 'Best-seller', 
    price: '2500 FCFA/kg', 
    priceValue: 2500, 
    image: '/imagesproducts/tubercules.jpg', 
    category: 'tubercules' 
  },
  { 
    id: 2, 
    name: 'Manioc doux', 
    description: 'Variété douce, idéale pour la consommation directe', 
    price: '3000 FCFA/kg', 
    priceValue: 3000, 
    image: '/imagesproducts/tubercule.jpg', 
    category: 'tubercules' 
  },
  { 
    id: 3, 
    name: 'Manioc amer', 
    description: 'Variété traditionnelle pour transformation', 
    price: '2000 FCFA/kg', 
    priceValue: 2000, 
    image: '/imagesproducts/racines.jpg', 
    category: 'tubercules' 
  },
  
  // Feuilles
  { 
    id: 4, 
    name: 'Feuilles fraîches', 
    description: 'Feuilles de manioc fraîches pour cuisine', 
    price: '500 FCFA/botte', 
    priceValue: 500, 
    image: '/imagesproducts/feuilles.jpg', 
    category: 'feuilles' 
  },
  { 
    id: 5, 
    name: 'Feuilles séchées', 
    description: 'Feuilles séchées pour conservation longue durée', 
    price: '1500 FCFA/sachet', 
    priceValue: 1500, 
    image: '/imagesproducts/piler.jpg', 
    category: 'feuilles' 
  },
  
  // Bâtons de manioc
  { 
    id: 6, 
    name: 'Bâtons traditionnels', 
    description: 'Bâtons de manioc enveloppés dans les feuilles, comme à la maison', 
    tag: 'Best-seller', 
    price: '1500 FCFA/kg', 
    priceValue: 1500, 
    image: '/imagesproducts/maniocdivers.jpg', 
    category: 'batons' 
  },
  { 
    id: 7, 
    name: 'Bâtons premium', 
    description: 'Bâtons de qualité supérieure, séchage contrôlé', 
    price: '2000 FCFA/kg', 
    priceValue: 2000, 
    image: '/imagesproducts/batons.jpg', 
    category: 'batons' 
  },
  { 
    id: 13, 
    name: 'Bâtons épicés', 
    description: 'Bâtons de manioc assaisonnés aux épices locales', 
    price: '2500 FCFA/kg', 
    priceValue: 2500, 
    image: '/imagesproducts/batons.jpg', 
    category: 'batons' 
  },
  
  // Transformés
  { 
    id: 8, 
    name: 'Tapioca', 
    description: 'Perles de tapioca pour desserts', 
    price: '3500 FCFA/kg', 
    priceValue: 3500, 
    image: '/imagesproducts/tapioca.jpg', 
    category: 'transformes' 
  },
  { 
    id: 9, 
    name: 'Chips de manioc', 
    description: 'Chips croustillants et naturels', 
    tag: 'Nouveau', 
    price: '2000 FCFA/sachet', 
    priceValue: 2000, 
    image: '/imagesproducts/chips.jpg', 
    category: 'transformes' 
  },
  { 
    id: 10, 
    name: 'Pain de manioc', 
    description: 'Pain traditionnel sans gluten', 
    price: '1000 FCFA/unité', 
    priceValue: 1000, 
    image: '/imagesproducts/farine.jpg', 
    category: 'transformes' 
  },
  
  // Bio
  { 
    id: 11, 
    name: 'Manioc bio certifié', 
    description: 'Cultivé sans pesticides, certifié bio', 
    tag: 'Bio', 
    price: '4000 FCFA/kg', 
    priceValue: 4000, 
    image: '/imagesproducts/tubercules.jpg', 
    category: 'bio' 
  },
  { 
    id: 12, 
    name: 'Farine bio', 
    description: 'Farine de manioc biologique', 
    price: '3000 FCFA/kg', 
    priceValue: 3000, 
    image: '/imagesproducts/tapioca.jpg', 
    category: 'bio' 
  }
] 