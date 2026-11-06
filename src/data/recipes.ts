export type RecipeCategory = 'plats' | 'accompagnements' | 'desserts'

export interface Recipe {
  id: string
  name: string
  category: RecipeCategory
  image: string
  emoji: string
  time: string
  difficulty: 'Facile' | 'Moyen'
  servings: string
  intro: string
  ingredients: string[]
  steps: string[]
  tip?: string
  /** Shop product ids used by the recipe — "Acheter les ingrédients" adds them to the cart. */
  productIds: number[]
}

export const recipeCategories: { id: RecipeCategory | 'all'; name: string; emoji: string }[] = [
  { id: 'all', name: 'Toutes', emoji: '✨' },
  { id: 'plats', name: 'Plats', emoji: '🍲' },
  { id: 'accompagnements', name: 'Accompagnements', emoji: '🥢' },
  { id: 'desserts', name: 'Desserts', emoji: '🍰' },
]

export const recipes: Recipe[] = [
  {
    id: 'feuilles-huile-palme',
    name: 'Feuilles de manioc à l’huile de palme',
    category: 'plats',
    image: '/imagesproducts/piler.jpg',
    emoji: '🌿',
    time: '2 h',
    difficulty: 'Moyen',
    servings: '6 personnes',
    intro: 'Le grand classique des repas de famille : des feuilles pilées mijotées longuement avec du poisson fumé.',
    ingredients: [
      '1 kg de feuilles de manioc pilées',
      '300 g de poisson fumé',
      '200 ml d’huile de palme',
      '1 gros oignon',
      '2 gousses d’ail',
      '1 piment',
      '2 c. à soupe de pâte d’arachide (facultatif)',
      'Sel',
    ],
    steps: [
      'Rincez les feuilles pilées à l’eau claire et égouttez-les.',
      'Faites-les cuire dans 1,5 L d’eau, à feu doux, pendant 1 heure en remuant de temps en temps.',
      'Ajoutez l’oignon émincé, l’ail écrasé et le piment entier.',
      'Ajoutez le poisson fumé émietté, l’huile de palme et la pâte d’arachide.',
      'Laissez mijoter 30 minutes jusqu’à ce que la sauce épaississe. Salez.',
      'Servez chaud avec des bâtons de manioc.',
    ],
    tip: 'Plus elles mijotent, plus elles sont fondantes. Le lendemain, c’est encore meilleur.',
    productIds: [4, 6],
  },
  {
    id: 'poisson-braise-batons',
    name: 'Poisson braisé et bâtons de manioc',
    category: 'plats',
    image: '/imagesproducts/batons.jpg',
    emoji: '🐟',
    time: '45 min',
    difficulty: 'Facile',
    servings: '4 personnes',
    intro: 'Le duo des maquis de Libreville : poisson mariné, grillé sur la braise, et bâtons tièdes.',
    ingredients: [
      '2 poissons (bar ou capitaine), vidés',
      '2 bâtons de manioc',
      '2 citrons verts',
      '3 gousses d’ail',
      '1 morceau de gingembre',
      '1 piment',
      '1 oignon',
      'Huile, sel',
    ],
    steps: [
      'Mixez l’ail, le gingembre, le piment et le jus d’un citron avec un filet d’huile.',
      'Entaillez les poissons, frottez-les de marinade et laissez reposer 30 minutes.',
      'Faites griller 8 à 10 minutes par face sur la braise ou au four très chaud.',
      'Réchauffez les bâtons 10 minutes à la vapeur, dans leurs feuilles.',
      'Servez avec l’oignon émincé, le second citron et un peu de piment.',
    ],
    productIds: [6],
  },
  {
    id: 'frites-manioc',
    name: 'Frites de manioc',
    category: 'accompagnements',
    image: '/imagesproducts/tubercules.jpg',
    emoji: '🍟',
    time: '40 min',
    difficulty: 'Facile',
    servings: '4 personnes',
    intro: 'Croustillantes dehors, fondantes dedans. Le secret : une précuisson à l’eau.',
    ingredients: ['1 kg de manioc doux', 'Huile de friture', 'Sel', '1 gousse d’ail (facultatif)'],
    steps: [
      'Épluchez le manioc et retirez la fibre centrale.',
      'Coupez-le en bâtonnets épais.',
      'Faites bouillir 15 minutes dans l’eau salée, jusqu’à ce qu’ils soient tendres.',
      'Égouttez et séchez-les bien dans un torchon propre.',
      'Faites frire à 180 °C pendant 5 à 6 minutes, jusqu’à ce qu’ils soient dorés.',
      'Salez aussitôt et servez.',
    ],
    tip: 'Ne sautez pas la précuisson : c’est elle qui rend les frites moelleuses.',
    productIds: [2],
  },
  {
    id: 'foufou',
    name: 'Foufou de manioc',
    category: 'accompagnements',
    image: '/imagesproducts/tapioca.jpg',
    emoji: '🥣',
    time: '20 min',
    difficulty: 'Facile',
    servings: '4 personnes',
    intro: 'Une pâte souple et élastique, parfaite pour saucer les plats mijotés.',
    ingredients: ['500 g de farine de manioc', '750 ml d’eau'],
    steps: [
      'Portez l’eau à ébullition.',
      'Hors du feu, versez la farine en pluie.',
      'Remuez vigoureusement avec une spatule en bois pour éviter les grumeaux.',
      'Remettez sur feu doux 3 à 4 minutes en travaillant la pâte jusqu’à ce qu’elle soit lisse.',
      'Façonnez des boules avec les mains mouillées.',
    ],
    productIds: [12],
  },
  {
    id: 'chips-maison',
    name: 'Chips de manioc maison',
    category: 'accompagnements',
    image: '/imagesproducts/chips.jpg',
    emoji: '🥔',
    time: '30 min',
    difficulty: 'Facile',
    servings: '4 personnes',
    intro: 'L’apéritif qui disparaît en cinq minutes.',
    ingredients: ['500 g de manioc doux', 'Huile de friture', 'Sel', 'Piment en poudre'],
    steps: [
      'Épluchez le manioc et tranchez-le très finement, à la mandoline.',
      'Rincez les tranches puis séchez-les soigneusement.',
      'Faites frire en petites quantités 2 à 3 minutes, jusqu’à ce qu’elles soient dorées.',
      'Égouttez sur du papier absorbant.',
      'Assaisonnez de sel et de piment encore chaudes.',
    ],
    productIds: [2, 9],
  },
  {
    id: 'gateau-coco',
    name: 'Gâteau de manioc au coco',
    category: 'desserts',
    image: '/imagesproducts/racines.jpg',
    emoji: '🥥',
    time: '1 h 15',
    difficulty: 'Moyen',
    servings: '8 personnes',
    intro: 'Moelleux, doré et naturellement sans gluten.',
    ingredients: [
      '1 kg de manioc doux râpé',
      '400 ml de lait de coco',
      '150 g de sucre',
      '2 œufs',
      '50 g de beurre fondu',
      '1 c. à café de vanille',
      '1 pincée de sel',
    ],
    steps: [
      'Préchauffez le four à 180 °C.',
      'Pressez le manioc râpé dans un torchon pour retirer l’excès de jus.',
      'Mélangez tous les ingrédients jusqu’à obtenir une pâte homogène.',
      'Versez dans un moule beurré.',
      'Faites cuire 50 à 60 minutes, jusqu’à ce que le dessus soit bien doré.',
      'Laissez refroidir avant de découper.',
    ],
    productIds: [2],
  },
  {
    id: 'tapioca-coco',
    name: 'Tapioca au lait de coco',
    category: 'desserts',
    image: '/imagesproducts/tapioca.jpg',
    emoji: '🍮',
    time: '30 min',
    difficulty: 'Facile',
    servings: '4 personnes',
    intro: 'Des perles fondantes dans un lait de coco tiède. Simple et réconfortant.',
    ingredients: ['100 g de perles de tapioca', '400 ml de lait de coco', '300 ml d’eau', '60 g de sucre', '1 mangue'],
    steps: [
      'Faites cuire les perles 15 minutes dans l’eau bouillante, jusqu’à ce qu’elles soient translucides.',
      'Égouttez et rincez-les à l’eau froide.',
      'Faites chauffer le lait de coco avec le sucre.',
      'Ajoutez les perles et laissez cuire 5 minutes à feu doux.',
      'Servez tiède ou frais, avec des dés de mangue.',
    ],
    productIds: [8],
  },
]
