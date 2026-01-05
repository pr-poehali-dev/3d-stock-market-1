import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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

interface ModelViewerProps {
  selectedModel: number | null;
  models: Model[];
  onClose: () => void;
}

const ModelViewer = ({ selectedModel, models, onClose }: ModelViewerProps) => {
  if (!selectedModel) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <Card className="max-w-4xl w-full animate-scale-in" onClick={(e) => e.stopPropagation()}>
        <CardHeader className="relative">
          <Button variant="ghost" size="icon" className="absolute top-4 right-4" onClick={onClose}>
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
                <div className="text-9xl animate-float">{models.find((m) => m.id === selectedModel)?.image}</div>
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
  );
};

export default ModelViewer;
