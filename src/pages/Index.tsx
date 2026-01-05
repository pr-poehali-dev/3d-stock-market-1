import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
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

  const cartModels = models.filter((model) => cartItems.includes(model.id));
  const cartTotal = cartModels.reduce((sum, model) => sum + model.price, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-orange-50">
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/70 border-b border-purple-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center text-2xl animate-float">
                🎨
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  3D Stock
                </h1>
                <p className="text-xs text-muted-foreground">Маркет-плейс 3D моделей</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="relative">
                <Icon name="Bell" size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full"></span>
              </Button>
              <Button variant="ghost" size="icon">
                <Icon name="User" size={20} />
              </Button>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="relative">
                    <Icon name="ShoppingCart" size={20} />
                    {cartItems.length > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-accent">
                        {cartItems.length}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-lg">
                  <div className="flex flex-col h-full">
                    <h2 className="text-2xl font-bold mb-6">Корзина</h2>
                    {cartModels.length === 0 ? (
                      <div className="flex-1 flex flex-col items-center justify-center text-center">
                        <div className="text-6xl mb-4">🛒</div>
                        <p className="text-muted-foreground">Корзина пуста</p>
                      </div>
                    ) : (
                      <>
                        <div className="flex-1 overflow-auto space-y-4 mb-6">
                          {cartModels.map((model) => (
                            <Card key={model.id} className="hover-scale">
                              <CardContent className="p-4">
                                <div className="flex gap-4">
                                  <div className="text-4xl">{model.image}</div>
                                  <div className="flex-1">
                                    <h3 className="font-semibold">{model.title}</h3>
                                    <p className="text-sm text-muted-foreground">{model.author}</p>
                                    <p className="text-lg font-bold text-primary mt-2">₽{model.price}</p>
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeFromCart(model.id)}
                                  >
                                    <Icon name="X" size={16} />
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                        <div className="border-t pt-4 space-y-4">
                          <div className="flex justify-between items-center text-lg">
                            <span className="font-semibold">Итого:</span>
                            <span className="text-2xl font-bold text-primary">₽{cartTotal}</span>
                          </div>
                          <Button className="w-full h-12 text-lg" size="lg">
                            Оформить заказ
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          <div className="mt-6 relative">
            <Icon name="Search" size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Поиск моделей..."
              className="pl-12 h-12 bg-white/80 backdrop-blur-sm border-purple-200 focus:border-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </header>

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
            <Button size="lg" variant="outline" className="h-12 px-8 bg-white/10 border-white/30 hover:bg-white/20 text-white">
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
            <Card
              key={model.id}
              className="hover-scale cursor-pointer group overflow-hidden border-2 hover:border-primary transition-all animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => setSelectedModel(model.id)}
            >
              <CardHeader className="p-0 relative">
                <div className="aspect-square bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center text-8xl group-hover:scale-110 transition-transform">
                  {model.image}
                </div>
                <Badge className="absolute top-4 right-4 bg-accent">{model.category}</Badge>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">
                      {model.title}
                    </h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Icon name="User" size={14} />
                      {model.author}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">₽{model.price}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1 mb-4">
                  <Icon name="Star" size={16} className="text-yellow-500 fill-yellow-500" />
                  <span className="font-semibold">{model.rating}</span>
                  <span className="text-sm text-muted-foreground">({model.reviews})</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary" className="text-xs">
                    <Icon name="Triangle" size={12} className="mr-1" />
                    {model.polygons}
                  </Badge>
                  {model.formats.map((format) => (
                    <Badge key={format} variant="outline" className="text-xs">
                      {format}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0 gap-2">
                <Button
                  className="flex-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(model.id);
                  }}
                  disabled={cartItems.includes(model.id)}
                >
                  <Icon name={cartItems.includes(model.id) ? 'Check' : 'ShoppingCart'} size={16} className="mr-2" />
                  {cartItems.includes(model.id) ? 'В корзине' : 'В корзину'}
                </Button>
                <Button variant="outline" size="icon" onClick={(e) => e.stopPropagation()}>
                  <Icon name="Heart" size={16} />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {selectedModel && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
            onClick={() => setSelectedModel(null)}
          >
            <Card className="max-w-4xl w-full animate-scale-in" onClick={(e) => e.stopPropagation()}>
              <CardHeader className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4"
                  onClick={() => setSelectedModel(null)}
                >
                  <Icon name="X" size={20} />
                </Button>
                <h2 className="text-2xl font-bold">3D Визуализатор</h2>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="preview" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="preview">Предпросмотр</TabsTrigger>
                    <TabsTrigger value="details">Детали</TabsTrigger>
                    <TabsTrigger value="reviews">Отзывы</TabsTrigger>
                  </TabsList>
                  <TabsContent value="preview" className="space-y-4">
                    <div className="aspect-video bg-gradient-to-br from-purple-100 via-blue-100 to-orange-100 rounded-lg flex items-center justify-center relative overflow-hidden">
                      <div className="text-9xl animate-float">
                        {models.find((m) => m.id === selectedModel)?.image}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 text-white">
                        <p className="text-sm font-medium">Интерактивный 3D просмотр</p>
                        <p className="text-xs opacity-80">Используйте мышь для вращения модели</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Icon name="RotateCw" size={16} className="mr-2" />
                        Вращать
                      </Button>
                      <Button variant="outline" size="sm">
                        <Icon name="ZoomIn" size={16} className="mr-2" />
                        Увеличить
                      </Button>
                      <Button variant="outline" size="sm">
                        <Icon name="Maximize" size={16} className="mr-2" />
                        Полный экран
                      </Button>
                    </div>
                  </TabsContent>
                  <TabsContent value="details" className="space-y-4">
                    {models
                      .filter((m) => m.id === selectedModel)
                      .map((model) => (
                        <div key={model.id} className="space-y-4">
                          <div>
                            <h3 className="font-bold text-xl mb-2">{model.title}</h3>
                            <p className="text-muted-foreground">Автор: {model.author}</p>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-muted-foreground">Полигоны</p>
                              <p className="font-semibold">{model.polygons}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Форматы</p>
                              <p className="font-semibold">{model.formats.join(', ')}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Рейтинг</p>
                              <p className="font-semibold">{model.rating} / 5.0</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Отзывов</p>
                              <p className="font-semibold">{model.reviews}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                  </TabsContent>
                  <TabsContent value="reviews" className="space-y-4">
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <Card key={i}>
                          <CardContent className="p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold">
                                U
                              </div>
                              <div>
                                <p className="font-semibold">User {i}</p>
                                <div className="flex gap-1">
                                  {[...Array(5)].map((_, j) => (
                                    <Icon key={j} name="Star" size={12} className="text-yellow-500 fill-yellow-500" />
                                  ))}
                                </div>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Отличная модель! Высокое качество и детализация. Рекомендую!
                            </p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        )}
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
                <Input placeholder="Email" className="bg-white/10 border-white/30 text-white" />
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
