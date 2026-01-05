import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import ModelCard from '@/components/ModelCard';
import ModelViewer from '@/components/ModelViewer';
import Icon from '@/components/ui/icon';

const categories = [
  { id: 'all', name: 'Все категории', icon: 'Grid3x3' },
  { id: 'characters', name: 'Персонажи', icon: 'User' },
  { id: 'architecture', name: 'Архитектура', icon: 'Building2' },
  { id: 'furniture', name: 'Мебель', icon: 'Armchair' },
  { id: 'nature', name: 'Природа', icon: 'Trees' },
  { id: 'vehicles', name: 'Транспорт', icon: 'Car' },
  { id: 'props', name: 'Объекты', icon: 'Box' },
];

const models = [
  {
    id: 1,
    title: 'Футуристический робот',
    category: 'characters',
    price: 2999,
    rating: 4.9,
    reviews: 234,
    author: 'CyberArtist',
    image: '🤖',
    polygons: '45K',
    formats: ['FBX', 'OBJ', 'GLTF'],
  },
  {
    id: 2,
    title: 'Современный офис',
    category: 'architecture',
    price: 4499,
    rating: 4.8,
    reviews: 156,
    author: 'ArchMaster',
    image: '🏢',
    polygons: '120K',
    formats: ['FBX', 'MAX', '3DS'],
  },
  {
    id: 3,
    title: 'Дизайнерский стул',
    category: 'furniture',
    price: 1499,
    rating: 4.7,
    reviews: 89,
    author: 'FurnitureX',
    image: '🪑',
    polygons: '12K',
    formats: ['OBJ', 'FBX'],
  },
  {
    id: 4,
    title: 'Тропический остров',
    category: 'nature',
    price: 5999,
    rating: 5.0,
    reviews: 412,
    author: 'NatureDesign',
    image: '🏝️',
    polygons: '250K',
    formats: ['FBX', 'BLEND', 'GLTF'],
  },
  {
    id: 5,
    title: 'Спорткар',
    category: 'vehicles',
    price: 6999,
    rating: 4.9,
    reviews: 523,
    author: 'VehiclePro',
    image: '🏎️',
    polygons: '180K',
    formats: ['MAX', 'FBX', 'OBJ'],
  },
  {
    id: 6,
    title: 'Волшебный кристалл',
    category: 'props',
    price: 899,
    rating: 4.6,
    reviews: 67,
    author: 'MagicProps',
    image: '💎',
    polygons: '8K',
    formats: ['GLTF', 'OBJ'],
  },
];

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cartItems, setCartItems] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedModel, setSelectedModel] = useState<number | null>(null);

  const filteredModels = models.filter(
    (model) =>
      (selectedCategory === 'all' || model.category === selectedCategory) &&
      (searchQuery === '' || model.title.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const addToCart = (modelId: number) => {
    if (!cartItems.includes(modelId)) {
      setCartItems([...cartItems, modelId]);
    }
  };

  const removeFromCart = (modelId: number) => {
    setCartItems(cartItems.filter((id) => id !== modelId));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-orange-50">
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        cartItems={cartItems}
        removeFromCart={removeFromCart}
        models={models}
      />

      <section className="py-12 bg-gradient-to-r from-primary via-secondary to-accent text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-8xl animate-float">🎨</div>
          <div className="absolute top-20 right-20 text-6xl animate-float" style={{ animationDelay: '1s' }}>
            🤖
          </div>
          <div className="absolute bottom-10 left-1/3 text-7xl animate-float" style={{ animationDelay: '2s' }}>
            💎
          </div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-5xl font-bold mb-4 animate-fade-in">Премиальные 3D модели</h2>
          <p className="text-xl mb-8 text-white/90 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Более 10,000 моделей от лучших 3D-художников мира
          </p>
          <div className="flex gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <Button size="lg" variant="secondary" className="h-12 px-8">
              <Icon name="Upload" size={20} className="mr-2" />
              Загрузить модель
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 px-8 bg-white/10 border-white/30 hover:bg-white/20 text-white"
            >
              Узнать больше
            </Button>
          </div>
        </div>
      </section>

      <section className="py-8 border-b bg-white/60 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                className="flex items-center gap-2 whitespace-nowrap hover-scale"
                onClick={() => setSelectedCategory(category.id)}
              >
                <Icon name={category.icon} size={16} />
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-bold">
            {selectedCategory === 'all' ? 'Все модели' : categories.find((c) => c.id === selectedCategory)?.name}
          </h3>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Icon name="SlidersHorizontal" size={16} className="mr-2" />
              Фильтры
            </Button>
            <Button variant="outline" size="sm">
              <Icon name="ArrowUpDown" size={16} className="mr-2" />
              Сортировка
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredModels.map((model, index) => (
            <ModelCard
              key={model.id}
              model={model}
              index={index}
              cartItems={cartItems}
              addToCart={addToCart}
              onSelectModel={setSelectedModel}
            />
          ))}
        </div>

        <ModelViewer selectedModel={selectedModel} models={models} onClose={() => setSelectedModel(null)} />
      </main>

      <footer className="bg-gradient-to-r from-purple-900 to-blue-900 text-white py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-xl mb-4">3D Stock</h3>
              <p className="text-white/80 text-sm">Маркет-плейс премиальных 3D моделей для профессионалов</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Категории</h4>
              <ul className="space-y-2 text-sm text-white/80">
                <li>Персонажи</li>
                <li>Архитектура</li>
                <li>Мебель</li>
                <li>Природа</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Поддержка</h4>
              <ul className="space-y-2 text-sm text-white/80">
                <li>Помощь</li>
                <li>Условия использования</li>
                <li>Политика конфиденциальности</li>
                <li>Контакты</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Подписка</h4>
              <p className="text-sm text-white/80 mb-4">Получайте новости о новых моделях</p>
              <div className="flex gap-2">
                <input
                  placeholder="Email"
                  className="flex-1 px-3 py-2 rounded-md bg-white/10 border border-white/30 text-white placeholder:text-white/50"
                />
                <Button variant="secondary">OK</Button>
              </div>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm text-white/60">
            © 2026 3D Stock. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
