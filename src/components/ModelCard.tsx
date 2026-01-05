import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
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

interface ModelCardProps {
  model: Model;
  index: number;
  cartItems: number[];
  addToCart: (modelId: number) => void;
  onSelectModel: (modelId: number) => void;
}

const ModelCard = ({ model, index, cartItems, addToCart, onSelectModel }: ModelCardProps) => {
  return (
    <Card
      className="hover-scale cursor-pointer group overflow-hidden border-2 hover:border-primary transition-all animate-fade-in"
      style={{ animationDelay: `${index * 0.1}s` }}
      onClick={() => onSelectModel(model.id)}
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
            <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">{model.title}</h3>
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
  );
};

export default ModelCard;
