

export default function NutritionPage() {
  return (
    <section className="py-16 px-4 sm:px-8 bg-gradient-to-b from-blue-50 to-white min-h-[80vh]">
      <div className="max-w-6xl mx-auto">
        {/* Titre principal */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-blue-800 mb-6">
            Valeurs Nutritionnelles du Manioc
          </h1>
          <p className="text-lg sm:text-xl text-blue-700 max-w-3xl mx-auto leading-relaxed">
            Découvrez les exceptionnelles qualités nutritionnelles du manioc, 
            un superaliment naturel aux multiples bienfaits pour la santé
          </p>
        </div>

        {/* Section Composition nutritionnelle */}
        <div className="mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-800 mb-12 text-center">
            📊 Composition Nutritionnelle (pour 100g)
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                nutrient: "Calories",
                value: "160",
                unit: "kcal",
                color: "from-orange-400 to-orange-600",
                icon: "🔥"
              },
              {
                nutrient: "Glucides",
                value: "38",
                unit: "g",
                color: "from-yellow-400 to-yellow-600", 
                icon: "⚡"
              },
              {
                nutrient: "Fibres",
                value: "1.8",
                unit: "g",
                color: "from-green-400 to-green-600",
                icon: "🌱"
              },
              {
                nutrient: "Protéines",
                value: "1.4",
                unit: "g",
                color: "from-purple-400 to-purple-600",
                icon: "💪"
              }
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className={`bg-gradient-to-br ${item.color} p-6 text-white text-center`}>
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <div className="text-3xl font-bold">{item.value}</div>
                  <div className="text-sm opacity-90">{item.unit}</div>
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-bold text-gray-800">{item.nutrient}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section Vitamines et Minéraux */}
        <div className="mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-800 mb-12 text-center">
            💎 Vitamines et Minéraux Essentiels
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-blue-800 mb-6 text-center">
                🔬 Vitamines
              </h3>
              <div className="space-y-4">
                {[
                  { name: "Vitamine C", amount: "20.6mg", benefit: "Antioxydant naturel, renforce l'immunité" },
                  { name: "Vitamine K", amount: "1.9μg", benefit: "Coagulation sanguine, santé osseuse" },
                  { name: "Folates", amount: "27μg", benefit: "Formation des globules rouges" },
                  { name: "Thiamine (B1)", amount: "0.087mg", benefit: "Métabolisme énergétique" }
                ].map((vitamin, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-bold text-blue-700">{vitamin.name}</span>
                      <span className="text-blue-600 font-semibold">{vitamin.amount}</span>
                    </div>
                    <p className="text-sm text-gray-600">{vitamin.benefit}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-green-800 mb-6 text-center">
                ⚡ Minéraux
              </h3>
              <div className="space-y-4">
                {[
                  { name: "Potassium", amount: "271mg", benefit: "Régulation tension artérielle" },
                  { name: "Magnésium", amount: "21mg", benefit: "Fonction musculaire et nerveuse" },
                  { name: "Phosphore", amount: "27mg", benefit: "Santé des os et dents" },
                  { name: "Calcium", amount: "16mg", benefit: "Solidité osseuse" }
                ].map((mineral, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-bold text-green-700">{mineral.name}</span>
                      <span className="text-green-600 font-semibold">{mineral.amount}</span>
                    </div>
                    <p className="text-sm text-gray-600">{mineral.benefit}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Section Bienfaits pour la santé */}
        <div className="mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-800 mb-12 text-center">
            🏥 Bienfaits pour la Santé
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "💓",
                title: "Santé Cardiovasculaire",
                benefits: [
                  "Riche en potassium",
                  "Réduit la pression artérielle",
                  "Améliore la circulation",
                  "Protège le cœur"
                ],
                color: "border-red-200 bg-red-50"
              },
              {
                icon: "🧠",
                title: "Santé Cérébrale",
                benefits: [
                  "Améliore la concentration",
                  "Booste la mémoire",
                  "Réduit le stress oxydatif",
                  "Nourrit les neurones"
                ],
                color: "border-purple-200 bg-purple-50"
              },
              {
                icon: "🌟",
                title: "Énergie Durable",
                benefits: [
                  "Glucides complexes",
                  "Libération lente d'énergie",
                  "Évite les pics glycémiques",
                  "Soutient l'endurance"
                ],
                color: "border-yellow-200 bg-yellow-50"
              },
              {
                icon: "🦴",
                title: "Santé Osseuse",
                benefits: [
                  "Calcium et phosphore",
                  "Renforce les os",
                  "Prévient l'ostéoporose",
                  "Soutient la croissance"
                ],
                color: "border-gray-200 bg-gray-50"
              },
              {
                icon: "🛡️",
                title: "Système Immunitaire",
                benefits: [
                  "Vitamine C naturelle",
                  "Antioxydants puissants",
                  "Combat les infections",
                  "Renforce les défenses"
                ],
                color: "border-blue-200 bg-blue-50"
              },
              {
                icon: "🌱",
                title: "Digestion Saine",
                benefits: [
                  "Fibres alimentaires",
                  "Facilite la digestion",
                  "Régule le transit",
                  "Nourrit la flore intestinale"
                ],
                color: "border-green-200 bg-green-50"
              }
            ].map((benefit, index) => (
              <div key={index} className={`p-6 rounded-2xl border-2 ${benefit.color}`}>
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">{benefit.icon}</div>
                  <h3 className="text-xl font-bold text-gray-800">{benefit.title}</h3>
                </div>
                <ul className="space-y-2">
                  {benefit.benefits.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-green-500 font-bold text-sm mt-1">✓</span>
                      <span className="text-sm text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Section Comparaison avec autres aliments */}
        <div className="mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-800 mb-12 text-center">
            📈 Comparaison Nutritionnelle
          </h2>
          
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
                  <tr>
                    <th className="p-4 text-left">Aliment (100g)</th>
                    <th className="p-4 text-center">Calories</th>
                    <th className="p-4 text-center">Glucides</th>
                    <th className="p-4 text-center">Fibres</th>
                    <th className="p-4 text-center">Vitamine C</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: "Manioc", calories: "160", carbs: "38g", fiber: "1.8g", vitc: "20.6mg", highlight: true },
                    { name: "Pomme de terre", calories: "77", carbs: "17g", fiber: "2.2g", vitc: "19.7mg", highlight: false },
                    { name: "Riz blanc", calories: "130", carbs: "28g", fiber: "0.4g", vitc: "0mg", highlight: false },
                    { name: "Patate douce", calories: "86", carbs: "20g", fiber: "3.0g", vitc: "2.4mg", highlight: false }
                  ].map((food, index) => (
                    <tr key={index} className={food.highlight ? "bg-blue-50 border-2 border-blue-200" : "hover:bg-gray-50"}>
                      <td className={`p-4 font-semibold ${food.highlight ? "text-blue-800" : "text-gray-800"}`}>
                        {food.name} {food.highlight && "🌟"}
                      </td>
                      <td className="p-4 text-center">{food.calories}</td>
                      <td className="p-4 text-center">{food.carbs}</td>
                      <td className="p-4 text-center">{food.fiber}</td>
                      <td className="p-4 text-center">{food.vitc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Section Conseils nutritionnels */}
        <div className="bg-gradient-to-br from-blue-800 to-indigo-700 text-white p-8 lg:p-12 rounded-2xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">💡 Conseils Nutritionnels</h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Optimisez les bienfaits nutritionnels du manioc dans votre alimentation
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-blue-200">📋 Recommandations</h3>
              <div className="space-y-4">
                {[
                  {
                    icon: "🍽️",
                    title: "Portion idéale",
                    description: "150-200g par repas pour un adulte"
                  },
                  {
                    icon: "⏰",
                    title: "Moment optimal",
                    description: "Le matin ou avant l'exercice physique"
                  },
                  {
                    icon: "🔥",
                    title: "Préparation",
                    description: "Toujours cuire le manioc avant consommation"
                  },
                  {
                    icon: "🥗",
                    title: "Association",
                    description: "Combiner avec des légumes verts et protéines"
                  }
                ].map((tip, index) => (
                  <div key={index} className="flex items-start gap-4 bg-white/10 p-4 rounded-lg">
                    <span className="text-2xl">{tip.icon}</span>
                    <div>
                      <h4 className="font-bold mb-1">{tip.title}</h4>
                      <p className="text-sm opacity-90">{tip.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-6 text-blue-200">⚠️ Précautions</h3>
              <div className="space-y-4">
                {[
                  {
                    icon: "🔥",
                    title: "Cuisson obligatoire",
                    description: "Ne jamais consommer le manioc cru"
                  },
                  {
                    icon: "⚖️",
                    title: "Modération",
                    description: "Équilibrer avec d'autres sources de glucides"
                  },
                  {
                    icon: "👶",
                    title: "Enfants",
                    description: "Introduire progressivement chez les jeunes enfants"
                  },
                  {
                    icon: "🩺",
                    title: "Conditions médicales",
                    description: "Consulter un professionnel si diabète ou allergies"
                  }
                ].map((warning, index) => (
                  <div key={index} className="flex items-start gap-4 bg-yellow-500/20 p-4 rounded-lg border border-yellow-400/30">
                    <span className="text-2xl">{warning.icon}</span>
                    <div>
                      <h4 className="font-bold mb-1">{warning.title}</h4>
                      <p className="text-sm opacity-90">{warning.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 