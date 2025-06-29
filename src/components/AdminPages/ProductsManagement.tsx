import { useState } from 'react'
import { Plus, Edit3, Trash2, Search, Package, Save, X } from 'lucide-react'
import toast from 'react-hot-toast'

interface AdminProduct {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  inStock: boolean
}

export function ProductsManagement() {
  // Données simulées pour l'administration
  const initialProducts: AdminProduct[] = [
    {
      id: '1',
      name: 'Farine de Manioc Bio',
      description: 'Farine de manioc de qualité supérieure, sans gluten et riche en nutriments.',
      price: 8000,
      image: '/imagesproducts/farine.png',
      category: 'Farine',
      inStock: true
    },
    {
      id: '2',
      name: 'Chips de Manioc',
      description: 'Chips croustillantes et savoureuses, parfaites pour l\'apéritif.',
      price: 3000,
      image: '/imagesproducts/chips.png',
      category: 'Snacks',
      inStock: true
    },
    {
      id: '3',
      name: 'Tubercules Frais',
      description: 'Tubercules de manioc frais, directement des plantations gabonaises.',
      price: 2500,
      image: '/imagesproducts/tubercules.png',
      category: 'Tubercules',
      inStock: false
    }
  ]

  const [productsList, setProductsList] = useState<AdminProduct[]>(initialProducts)
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState<AdminProduct | null>(null)
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: 0,
    image: '',
    category: '',
    inStock: true
  })

  // Filtrer les produits
  const filteredProducts = productsList.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Ajouter un produit
  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.description || newProduct.price <= 0) {
      toast.error('Veuillez remplir tous les champs requis')
      return
    }

    const product: AdminProduct = {
      id: Date.now().toString(),
      ...newProduct
    }

    setProductsList(prev => [...prev, product])
    setNewProduct({
      name: '',
      description: '',
      price: 0,
      image: '',
      category: '',
      inStock: true
    })
    setShowAddModal(false)
    toast.success('Produit ajouté avec succès !')
  }

  // Supprimer un produit
  const handleDeleteProduct = (productId: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      setProductsList(prev => prev.filter(p => p.id !== productId))
      toast.success('Produit supprimé avec succès !')
    }
  }

  // Modifier un produit
  const handleEditProduct = (product: AdminProduct) => {
    setEditingProduct(product)
    setNewProduct({
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
      category: product.category,
      inStock: product.inStock
    })
    setShowAddModal(true)
  }

  // Sauvegarder les modifications
  const handleSaveEdit = () => {
    if (!editingProduct) return

    setProductsList(prev => prev.map(p => 
      p.id === editingProduct.id 
        ? { ...editingProduct, ...newProduct }
        : p
    ))
    
    setEditingProduct(null)
    setNewProduct({
      name: '',
      description: '',
      price: 0,
      image: '',
      category: '',
      inStock: true
    })
    setShowAddModal(false)
    toast.success('Produit modifié avec succès !')
  }

  // Formater le prix
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR').format(price) + ' FCFA'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Gestion des Produits</h1>
            <p className="text-xl text-green-100">
              Administrez votre catalogue de produits Manioc Gabon
            </p>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Barre d'outils */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            {/* Recherche */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Rechercher un produit..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Bouton d'ajout */}
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Ajouter un produit
            </button>
          </div>

          {/* Statistiques */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{productsList.length}</p>
              <p className="text-sm text-gray-500">Produits total</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {productsList.filter(p => p.inStock).length}
              </p>
              <p className="text-sm text-gray-500">En stock</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">
                {productsList.filter(p => !p.inStock).length}
              </p>
              <p className="text-sm text-gray-500">Rupture de stock</p>
            </div>
          </div>
        </div>

        {/* Liste des produits */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
              {/* Image du produit */}
              <div className="h-48 bg-gray-100 flex items-center justify-center">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Package className="w-12 h-12 text-gray-400" />
                )}
              </div>

              {/* Informations */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 text-lg">{product.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    product.inStock 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {product.inStock ? 'En stock' : 'Rupture'}
                  </span>
                </div>

                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-bold text-green-600">
                    {formatPrice(product.price)}
                  </span>
                  <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {product.category}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditProduct(product)}
                    className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Edit3 className="w-4 h-4" />
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="flex-1 bg-red-600 text-white py-2 px-3 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Message si aucun produit */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun produit trouvé</h3>
            <p className="text-gray-500">
              {searchTerm ? 'Aucun produit ne correspond à votre recherche.' : 'Commencez par ajouter votre premier produit.'}
            </p>
          </div>
        )}
      </div>

      {/* Modal d'ajout/modification */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  {editingProduct ? 'Modifier le produit' : 'Ajouter un nouveau produit'}
                </h3>
                <button
                  onClick={() => {
                    setShowAddModal(false)
                    setEditingProduct(null)
                    setNewProduct({
                      name: '',
                      description: '',
                      price: 0,
                      image: '',
                      category: '',
                      inStock: true
                    })
                  }}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              {/* Nom du produit */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom du produit *
                </label>
                <input
                  type="text"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Ex: Farine de Manioc Bio"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  value={newProduct.description}
                  onChange={(e) => setNewProduct(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Description détaillée du produit..."
                />
              </div>

              {/* Prix et catégorie */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Prix (FCFA) *
                  </label>
                  <input
                    type="number"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, price: parseInt(e.target.value) || 0 }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="0"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Catégorie
                  </label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Sélectionner une catégorie</option>
                    <option value="Tubercules">Tubercules</option>
                    <option value="Farine">Farine</option>
                    <option value="Snacks">Snacks</option>
                    <option value="Boisson">Boisson</option>
                    <option value="Autres">Autres</option>
                  </select>
                </div>
              </div>

              {/* Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL de l'image
                </label>
                <input
                  type="url"
                  value={newProduct.image}
                  onChange={(e) => setNewProduct(prev => ({ ...prev, image: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="https://exemple.com/image.jpg"
                />
              </div>

              {/* Disponibilité */}
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="inStock"
                  checked={newProduct.inStock}
                  onChange={(e) => setNewProduct(prev => ({ ...prev, inStock: e.target.checked }))}
                  className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
                <label htmlFor="inStock" className="text-sm font-medium text-gray-700">
                  Produit en stock
                </label>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex space-x-3">
              <button
                onClick={() => {
                  setShowAddModal(false)
                  setEditingProduct(null)
                  setNewProduct({
                    name: '',
                    description: '',
                    price: 0,
                    image: '',
                    category: '',
                    inStock: true
                  })
                }}
                className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={editingProduct ? handleSaveEdit : handleAddProduct}
                className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                {editingProduct ? 'Sauvegarder' : 'Ajouter'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 