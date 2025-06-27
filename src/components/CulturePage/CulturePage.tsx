import React from 'react'

export default function CulturePage() {
  return (
    <section className="py-16 px-4 sm:px-8 bg-gradient-to-b from-green-50 to-white min-h-[80vh]">
      <div className="max-w-6xl mx-auto">
        {/* Titre principal */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-emerald-800 mb-6">
            Culture du Manioc au Gabon
          </h1>
          <p className="text-lg sm:text-xl text-emerald-700 max-w-3xl mx-auto leading-relaxed">
            Découvrez l'histoire, les traditions et les techniques de culture du manioc, 
            aliment de base emblématique du Gabon
          </p>
        </div>

        {/* Section Histoire */}
        <div className="mb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-emerald-800 mb-6">
                🌿 Histoire et Origines
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p className="text-lg">
                  Le manioc (Manihot esculenta) est cultivé au Gabon depuis des siècles. 
                  Originaire d'Amérique du Sud, cette plante s'est parfaitement adaptée 
                  au climat tropical gabonais.
                </p>
                <p>
                  Introduit par les premiers explorateurs, le manioc est rapidement devenu 
                  un pilier de l'alimentation gabonaise, particulièrement apprécié pour sa 
                  résistance aux conditions climatiques difficiles et sa facilité de culture.
                </p>
                <p>
                  Aujourd'hui, le Gabon produit plus de <strong>230 000 tonnes</strong> de 
                  manioc par an, faisant de cette culture l'une des plus importantes du pays.
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-100 to-emerald-50 p-8 rounded-2xl">
              <div className="text-6xl mb-4 text-center">🌱</div>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-emerald-600">230k</div>
                  <div className="text-sm text-gray-600">Tonnes/an</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-emerald-600">85%</div>
                  <div className="text-sm text-gray-600">Des familles</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-emerald-600">12</div>
                  <div className="text-sm text-gray-600">Mois/cycle</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-emerald-600">40%</div>
                  <div className="text-sm text-gray-600">Calories/jour</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section Techniques de culture */}
        <div className="mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-emerald-800 mb-12 text-center">
            🚜 Techniques de Culture Traditionnelles
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "🌱",
                title: "Préparation du Sol",
                description: "Défrichage et brûlis traditionnel pour enrichir le sol en cendres nutritives"
              },
              {
                icon: "✂️",
                title: "Bouturage",
                description: "Plantation de boutures de 20-25cm provenant de plants mères sélectionnés"
              },
              {
                icon: "🌧️",
                title: "Saison des Pluies",
                description: "Plantation en début de saison des pluies (octobre-novembre) pour optimiser la croissance"
              },
              {
                icon: "🥔",
                title: "Récolte",
                description: "Récolte après 8-12 mois, tubercules pouvant peser jusqu'à 2kg chacun"
              }
            ].map((step, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <div className="text-4xl mb-4 text-center">{step.icon}</div>
                <h3 className="text-xl font-bold text-emerald-800 mb-3 text-center">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section Variétés */}
        <div className="mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-emerald-800 mb-12 text-center">
            🌿 Variétés Cultivées au Gabon
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Manioc Doux",
                characteristics: "Faible teneur en cyanure, consommation directe possible",
                uses: "Bouilli, grillé, en tubercules",
                color: "from-green-400 to-green-600"
              },
              {
                name: "Manioc Amer", 
                characteristics: "Riche en amidon, nécessite transformation",
                uses: "Farine, tapioca, boissons fermentées",
                color: "from-emerald-400 to-emerald-600"
              },
              {
                name: "Manioc Rouge",
                characteristics: "Chair rougeâtre, très nutritif",
                uses: "Plats traditionnels, cérémonies",
                color: "from-orange-400 to-red-500"
              }
            ].map((variety, index) => (
              <div key={index} className="relative overflow-hidden rounded-2xl shadow-lg">
                <div className={`bg-gradient-to-br ${variety.color} p-8 text-white`}>
                  <h3 className="text-2xl font-bold mb-4">{variety.name}</h3>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold mb-1">Caractéristiques:</h4>
                      <p className="text-sm opacity-90">{variety.characteristics}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Utilisations:</h4>
                      <p className="text-sm opacity-90">{variety.uses}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section Importance culturelle */}
        <div className="mb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-8 rounded-2xl">
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">🏛️</div>
                <h3 className="text-2xl font-bold text-emerald-800">Patrimoine Culturel</h3>
              </div>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-emerald-600 font-bold">•</span>
                  <span>Aliment de base dans 90% des foyers gabonais</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-600 font-bold">•</span>
                  <span>Présent dans les cérémonies traditionnelles</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-600 font-bold">•</span>
                  <span>Symbole de sécurité alimentaire</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-600 font-bold">•</span>
                  <span>Transmission de savoir ancestral</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-emerald-800 mb-6">
                🎭 Importance Culturelle
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p className="text-lg">
                  Au-delà de son importance nutritionnelle, le manioc occupe une place 
                  centrale dans la culture gabonaise. Il est présent dans les rites de 
                  passage, les célébrations et les traditions culinaires familiales.
                </p>
                <p>
                  Les techniques de transformation du manioc se transmettent de mère en 
                  fille depuis des générations. Chaque région du Gabon a développé ses 
                  propres méthodes de préparation et ses spécialités culinaires.
                </p>
                <p>
                  Le manioc représente également un symbole de résilience pour le peuple 
                  gabonais, capable de nourrir les familles même pendant les périodes difficiles.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section Défis et perspectives */}
        <div className="bg-gradient-to-br from-emerald-800 to-green-700 text-white p-8 lg:p-12 rounded-2xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">🚀 Défis et Perspectives</h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Moderniser la culture du manioc tout en préservant les traditions
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-green-200">Défis Actuels</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-yellow-400">⚠️</span>
                  <span>Vieillissement des agriculteurs</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-yellow-400">⚠️</span>
                  <span>Méthodes de culture traditionnelles limitées</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-yellow-400">⚠️</span>
                  <span>Accès limité aux marchés urbains</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-yellow-400">⚠️</span>
                  <span>Transformation artisanale uniquement</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-4 text-green-200">Solutions Innovantes</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-green-400">✅</span>
                  <span>Formation des jeunes agriculteurs</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400">✅</span>
                  <span>Techniques de culture améliorées</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400">✅</span>
                  <span>Développement de coopératives</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400">✅</span>
                  <span>Unités de transformation modernes</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 