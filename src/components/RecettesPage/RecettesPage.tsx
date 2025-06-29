import { useState } from 'react'

export default function RecettesPage() {
  const [selectedCategory, setSelectedCategory] = useState('plats-principaux')

  const recipeCategories = [
    { id: 'plats-principaux', name: 'Plats Principaux', icon: '🍽️' },
    { id: 'accompagnements', name: 'Accompagnements', icon: '🥗' },
    { id: 'desserts', name: 'Desserts', icon: '🍰' }
  ]

  const recipes = {
    'plats-principaux': [
      {
        id: 1,
        name: "Manioc aux Feuilles de Patate Douce",
        time: "45 min",
        difficulty: "Facile",
        servings: "4 personnes",
        image: "🍃",
        ingredients: [
          "1kg de manioc frais",
          "500g de feuilles de patate douce", 
          "200g de poisson fumé",
          "1 oignon",
          "Huile de palme"
        ],
        instructions: [
          "Éplucher et couper le manioc en morceaux",
          "Faire bouillir le manioc dans l'eau salée pendant 20 minutes",
          "Laver et hacher finement les feuilles",
          "Faire revenir l'oignon dans l'huile de palme"
        ]
      },
      {
        id: 2,
        name: "Bâtons de Manioc Grillés",
        time: "30 min", 
        difficulty: "Facile",
        servings: "6 personnes",
        image: "🔥",
        ingredients: [
          "1.5kg de manioc frais",
          "Huile d'olive",
          "Sel",
          "Épices au choix"
        ],
        instructions: [
          "Éplucher le manioc et le couper en bâtons",
          "Faire bouillir 15 minutes dans l'eau salée",
          "Égoutter et laisser refroidir",
          "Griller au barbecue 10-15 minutes"
        ]
      }
    ],
    'accompagnements': [
      {
        id: 3,
        name: "Farine de Manioc Fermentée",
        time: "3 jours",
        difficulty: "Intermédiaire", 
        servings: "500g",
        image: "🌾",
        ingredients: [
          "2kg de manioc amer",
          "Eau propre",
          "Feuilles de bananier"
        ],
        instructions: [
          "Éplucher et râper le manioc",
          "Envelopper dans des feuilles de bananier",
          "Laisser fermenter 3 jours",
          "Faire sécher au soleil"
        ]
      }
    ],
    'desserts': [
      {
        id: 4,
        name: "Gâteau de Manioc au Coco",
        time: "1h 15min",
        difficulty: "Moyen",
        servings: "8 personnes", 
        image: "🥥",
        ingredients: [
          "500g de manioc râpé",
          "400ml de lait de coco",
          "200g de sucre",
          "3 œufs"
        ],
        instructions: [
          "Préchauffer le four à 180°C",
          "Mélanger le manioc râpé avec le lait de coco",
          "Battre les œufs avec le sucre",
          "Cuire 45 minutes"
        ]
      }
    ]
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Facile': return 'bg-green-100 text-green-800'
      case 'Moyen': return 'bg-yellow-100 text-yellow-800'
      case 'Intermédiaire': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <section className="py-16 px-4 sm:px-8 bg-gradient-to-b from-orange-50 to-white min-h-[80vh]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-orange-800 mb-6">
            Recettes Traditionnelles au Manioc
          </h1>
          <p className="text-lg sm:text-xl text-orange-700 max-w-3xl mx-auto leading-relaxed">
            Redécouvrez les saveurs authentiques du Gabon avec nos recettes traditionnelles à base de manioc
          </p>
        </div>

        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-4">
            {recipeCategories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-orange-600 text-white shadow-lg transform scale-105'
                    : 'bg-white text-orange-700 hover:bg-orange-100 shadow-md'
                }`}
              >
                <span className="text-xl">{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recipes[selectedCategory as keyof typeof recipes]?.map(recipe => (
            <div key={recipe.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="bg-gradient-to-br from-orange-400 to-red-500 p-6 text-white text-center">
                <div className="text-6xl mb-4">{recipe.image}</div>
                <h3 className="text-xl font-bold mb-2">{recipe.name}</h3>
                <div className="flex justify-center gap-4 text-sm opacity-90">
                  <span>⏱️ {recipe.time}</span>
                  <span>👥 {recipe.servings}</span>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(recipe.difficulty)}`}>
                    {recipe.difficulty}
                  </span>
                </div>

                <div className="mb-6">
                  <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                    🛒 Ingrédients
                  </h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    {recipe.ingredients.slice(0, 4).map((ingredient, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-orange-500 font-bold">•</span>
                        <span>{ingredient}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                    👨‍🍳 Préparation
                  </h4>
                  <ol className="space-y-2 text-sm text-gray-600">
                    {recipe.instructions.slice(0, 3).map((step, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="bg-orange-100 text-orange-700 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">
                          {index + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105">
                  Voir la recette complète
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 