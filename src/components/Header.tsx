import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';

interface Model {
  id: number;
  title: string;
  category: string;
  price: number;
  rating: number;
  reviews: number;
  author: string;
  image: string;
  polygons: string;
  formats: string[];
}

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  cartItems: number[];
  removeFromCart: (modelId: number) => void;
  models: Model[];
}

const Header = ({ searchQuery, setSearchQuery, cartItems, removeFromCart, models }: HeaderProps) => {
  const cartModels = models.filter((model) => cartItems.includes(model.id));
  const cartTotal = cartModels.reduce((sum, model) => sum + model.price, 0);

  return (
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
                                <Button variant="ghost" size="icon" onClick={() => removeFromCart(model.id)}>
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
  );
};

export default Header;
