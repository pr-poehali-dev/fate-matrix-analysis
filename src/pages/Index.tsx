import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

export default function Index() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    birthdate: '',
    message: ''
  });
  const [calcBirthdate, setCalcBirthdate] = useState('');
  const [matrixResult, setMatrixResult] = useState<any>(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [selectedService, setSelectedService] = useState<{name: string, price: number} | null>(null);
  const { toast } = useToast();

  const services = [
    { id: 'basic', name: 'Базовый расчёт', price: 2500 },
    { id: 'full', name: 'Разбор всех сфер', price: 8888 },
    { id: 'child', name: 'Детская матрица', price: 3333 },
    { id: 'compatibility', name: 'Совместимость', price: 4444 }
  ];

  const handlePayment = (serviceName: string, price: number) => {
    scrollToSection('order');
    setSelectedService({ name: serviceName, price });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const serviceName = selectedService?.name || 'Консультация';
    const amount = selectedService?.price || 0;
    
    const paymentUrl = `https://www.tinkoff.ru/rm/nikitin.yuriy47/VHOhZ12345?sum=${amount}`;
    
    toast({
      title: "Переход к оплате",
      description: `Вы будете перенаправлены на страницу оплаты через СБП`,
    });
    
    setTimeout(() => {
      window.open(paymentUrl, '_blank');
    }, 1000);
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const calculateMatrix = (date: string) => {
    if (!date) return;
    
    const [year, month, day] = date.split('-').map(Number);
    const digits = [day, month, year].join('').split('').map(Number);
    const sum = digits.reduce((a, b) => a + b, 0);
    const destinyNumber = sum > 22 ? sum.toString().split('').map(Number).reduce((a, b) => a + b, 0) : sum;
    
    const personalNumber = (day + month) % 22 || 22;
    const soulNumber = digits.slice(0, 2).reduce((a, b) => a + b, 0) % 22 || 22;
    const karmaNumber = year.toString().split('').map(Number).reduce((a, b) => a + b, 0) % 22 || 22;
    
    setMatrixResult({
      destinyNumber,
      personalNumber,
      soulNumber,
      karmaNumber,
      date: new Date(date).toLocaleDateString('ru-RU')
    });
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    calculateMatrix(calcBirthdate);
  };

  const arcanaDescriptions: Record<number, { title: string; shortDesc: string }> = {
    1: { title: 'Маг', shortDesc: 'Энергия начинаний, воля и творчество' },
    2: { title: 'Жрица', shortDesc: 'Интуиция, тайные знания, мудрость' },
    3: { title: 'Императрица', shortDesc: 'Материнство, изобилие, красота' },
    4: { title: 'Император', shortDesc: 'Власть, структура, стабильность' },
    5: { title: 'Иерофант', shortDesc: 'Традиции, обучение, духовность' },
    6: { title: 'Влюблённые', shortDesc: 'Выбор, гармония, отношения' },
    7: { title: 'Колесница', shortDesc: 'Движение, победа, целеустремлённость' },
    8: { title: 'Справедливость', shortDesc: 'Баланс, закон, честность' },
    9: { title: 'Отшельник', shortDesc: 'Поиск истины, одиночество, мудрость' },
    10: { title: 'Колесо Фортуны', shortDesc: 'Судьба, циклы, перемены' },
    11: { title: 'Сила', shortDesc: 'Внутренняя сила, смелость, терпение' },
    12: { title: 'Повешенный', shortDesc: 'Жертва, новый взгляд, остановка' },
    13: { title: 'Смерть', shortDesc: 'Трансформация, завершение, обновление' },
    14: { title: 'Умеренность', shortDesc: 'Гармония, равновесие, исцеление' },
    15: { title: 'Дьявол', shortDesc: 'Зависимости, материальное, искушения' },
    16: { title: 'Башня', shortDesc: 'Разрушение, освобождение, прозрение' },
    17: { title: 'Звезда', shortDesc: 'Надежда, вдохновение, духовность' },
    18: { title: 'Луна', shortDesc: 'Подсознание, иллюзии, интуиция' },
    19: { title: 'Солнце', shortDesc: 'Радость, успех, ясность' },
    20: { title: 'Суд', shortDesc: 'Возрождение, прощение, призвание' },
    21: { title: 'Мир', shortDesc: 'Завершённость, гармония, успех' },
    22: { title: 'Шут', shortDesc: 'Спонтанность, начало, свобода' },
  };

  return (
    <div className="min-h-screen">
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Матрица Судьбы
            </h1>
            <div className="hidden md:flex gap-6">
              <button onClick={() => scrollToSection('hero')} className="text-foreground/80 hover:text-primary transition-colors">
                Главная
              </button>
              <button onClick={() => scrollToSection('about')} className="text-foreground/80 hover:text-primary transition-colors">
                О матрице
              </button>
              <button onClick={() => scrollToSection('services')} className="text-foreground/80 hover:text-primary transition-colors">
                Услуги
              </button>
              <button onClick={() => scrollToSection('calculator')} className="text-foreground/80 hover:text-primary transition-colors">
                Калькулятор
              </button>
              <button onClick={() => scrollToSection('order')} className="text-foreground/80 hover:text-primary transition-colors">
                Заказать
              </button>
            </div>
          </div>
        </div>
      </nav>

      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20"></div>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-20 w-72 h-72 bg-primary/30 rounded-full blur-3xl animate-pulse-glow"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/30 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-5xl md:text-7xl font-bold leading-tight">
                Откройте свою
                <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Матрицу Судьбы
                </span>
              </h2>
              <p className="text-xl text-foreground/80">
                Узнайте о своём предназначении, талантах и жизненном пути через древнюю систему нумерологии
              </p>
              <div className="flex gap-4">
                <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90" onClick={() => scrollToSection('calculator')}>
                  <Icon name="Sparkles" className="mr-2" size={20} />
                  Рассчитать матрицу
                </Button>
                <Button size="lg" variant="outline" onClick={() => scrollToSection('about')}>
                  Подробнее
                </Button>
              </div>
            </div>
            <div className="relative animate-float">
              <img 
                src="https://cdn.poehali.dev/projects/91b40bb1-7894-48a0-af71-ac47ba0bc6fb/files/2844b2cf-d82e-432a-a38f-362aa6162982.jpg" 
                alt="Матрица судьбы" 
                className="w-full rounded-2xl shadow-2xl"
              />
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/50 to-secondary/50 rounded-2xl blur-2xl -z-10 opacity-50"></div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-4 animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-bold">Что такое Матрица Судьбы?</h2>
              <p className="text-xl text-foreground/80">
                Древняя система самопознания, основанная на дате рождения
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 transition-all">
                <CardHeader>
                  <Icon name="BookOpen" size={40} className="text-primary mb-4" />
                  <CardTitle>Метод познания</CardTitle>
                </CardHeader>
                <CardContent className="text-foreground/80">
                  Матрица Судьбы — это метод анализа личности, основанный на дате рождения. Он объединяет нумерологию, психологию и древние эзотерические знания для глубокого понимания себя.
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 transition-all">
                <CardHeader>
                  <Icon name="Compass" size={40} className="text-secondary mb-4" />
                  <CardTitle>Ваш жизненный путь</CardTitle>
                </CardHeader>
                <CardContent className="text-foreground/80">
                  Каждая дата рождения создаёт уникальную числовую матрицу, которая раскрывает ваши таланты, жизненные задачи, кармические уроки и предназначение.
                </CardContent>
              </Card>
            </div>

            <div className="relative rounded-2xl overflow-hidden">
              <img 
                src="https://cdn.poehali.dev/projects/91b40bb1-7894-48a0-af71-ac47ba0bc6fb/files/eab83342-fea9-4ee7-b57e-6360be730769.jpg"
                alt="Познание себя"
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent flex items-end">
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-2">О чём расскажет Матрица?</h3>
                  <ul className="space-y-2 text-foreground/80">
                    <li className="flex items-center gap-2">
                      <Icon name="Check" className="text-primary" size={20} />
                      Ваши сильные стороны и таланты
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon name="Check" className="text-primary" size={20} />
                      Предназначение и жизненные задачи
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon name="Check" className="text-primary" size={20} />
                      Отношения с близкими людьми
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon name="Check" className="text-primary" size={20} />
                      Финансовый потенциал и карьера
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon name="Check" className="text-primary" size={20} />
                      Здоровье и энергетический потенциал
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="calculator" className="py-24 bg-gradient-to-b from-background to-card/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center space-y-4 mb-12 animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-bold">Калькулятор Матрицы Судьбы</h2>
              <p className="text-xl text-foreground/80">
                Получите базовый расчёт бесплатно прямо сейчас
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-card/80 backdrop-blur border-border/50">
                <CardHeader>
                  <CardTitle className="text-2xl">Введите дату рождения</CardTitle>
                  <CardDescription>Узнайте ключевые числа вашей матрицы</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleCalculate} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="calc-birthdate" className="text-lg">Дата рождения</Label>
                      <Input 
                        id="calc-birthdate" 
                        type="date" 
                        value={calcBirthdate}
                        onChange={(e) => setCalcBirthdate(e.target.value)}
                        required
                        className="text-lg p-6"
                      />
                    </div>
                    <Button type="submit" className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90" size="lg">
                      <Icon name="Calculator" className="mr-2" size={20} />
                      Рассчитать матрицу
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {!matrixResult ? (
                <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 backdrop-blur border-primary/30 flex items-center justify-center">
                  <CardContent className="text-center py-12">
                    <Icon name="Sparkles" className="mx-auto mb-4 text-primary" size={64} />
                    <p className="text-lg text-foreground/70">
                      Введите дату рождения, чтобы увидеть расчёт
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <Card className="bg-gradient-to-br from-primary/20 to-secondary/20 backdrop-blur border-primary">
                  <CardHeader>
                    <CardTitle className="text-2xl">Ваши ключевые числа</CardTitle>
                    <CardDescription>Дата рождения: {matrixResult.date}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-background/50 p-4 rounded-lg text-center">
                        <div className="text-4xl font-bold text-primary mb-2">{matrixResult.destinyNumber}</div>
                        <div className="text-sm font-semibold mb-1">{arcanaDescriptions[matrixResult.destinyNumber]?.title}</div>
                        <div className="text-xs text-foreground/60">Число судьбы</div>
                      </div>
                      <div className="bg-background/50 p-4 rounded-lg text-center">
                        <div className="text-4xl font-bold text-secondary mb-2">{matrixResult.personalNumber}</div>
                        <div className="text-sm font-semibold mb-1">{arcanaDescriptions[matrixResult.personalNumber]?.title}</div>
                        <div className="text-xs text-foreground/60">Личное число</div>
                      </div>
                      <div className="bg-background/50 p-4 rounded-lg text-center">
                        <div className="text-4xl font-bold text-primary mb-2">{matrixResult.soulNumber}</div>
                        <div className="text-sm font-semibold mb-1">{arcanaDescriptions[matrixResult.soulNumber]?.title}</div>
                        <div className="text-xs text-foreground/60">Число души</div>
                      </div>
                      <div className="bg-background/50 p-4 rounded-lg text-center">
                        <div className="text-4xl font-bold text-secondary mb-2">{matrixResult.karmaNumber}</div>
                        <div className="text-sm font-semibold mb-1">{arcanaDescriptions[matrixResult.karmaNumber]?.title}</div>
                        <div className="text-xs text-foreground/60">Кармическое число</div>
                      </div>
                    </div>
                    
                    <div className="bg-background/30 p-4 rounded-lg space-y-2">
                      <div className="flex items-start gap-2">
                        <Icon name="Info" className="text-primary mt-1" size={18} />
                        <p className="text-sm text-foreground/80">
                          Это базовый расчёт показывает ключевые энергии вашей матрицы
                        </p>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-primary/20 to-secondary/20 p-6 rounded-lg border border-primary/30">
                      <div className="flex items-start gap-3 mb-4">
                        <Icon name="Lock" className="text-primary" size={24} />
                        <div>
                          <h4 className="font-bold text-lg mb-1">Хотите узнать больше?</h4>
                          <p className="text-sm text-foreground/70 mb-3">
                            Полный разбор раскроет:
                          </p>
                          <ul className="text-sm space-y-1 text-foreground/80">
                            <li>✨ Детальное описание каждого числа</li>
                            <li>✨ Ваши таланты и предназначение</li>
                            <li>✨ Рекомендации по развитию</li>
                            <li>✨ Кармические задачи и пути решения</li>
                            <li>✨ Финансовый и любовный потенциал</li>
                          </ul>
                        </div>
                      </div>
                      <Button 
                        className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90" 
                        size="lg"
                        onClick={() => scrollToSection('order')}
                      >
                        <Icon name="Crown" className="mr-2" size={20} />
                        Заказать полный разбор
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-24 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold">Наши услуги</h2>
            <p className="text-xl text-foreground/80">
              Все консультации проводятся онлайн в удобное для вас время
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            <Card className="bg-card/80 backdrop-blur border-border/50 hover:border-primary transition-all hover:scale-105 duration-300">
              <CardHeader>
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <Icon name="FileText" className="text-primary" size={32} />
                </div>
                <CardTitle className="text-2xl">Базовый расчёт</CardTitle>
                <CardDescription className="text-lg">Письменная консультация</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-3xl font-bold text-primary">2 500 ₽</div>
                <ul className="space-y-2 text-foreground/80">
                  <li className="flex items-start gap-2">
                    <Icon name="Check" className="text-primary mt-1" size={16} />
                    <span>Расчёт вашей матрицы</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" className="text-primary mt-1" size={16} />
                    <span>Описание основных энергий</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" className="text-primary mt-1" size={16} />
                    <span>Рекомендации по развитию</span>
                  </li>
                </ul>
                <Button 
                  className="w-full bg-primary hover:bg-primary/90 mt-4" 
                  size="lg"
                  onClick={() => handlePayment('Базовый расчёт', 2500)}
                >
                  <Icon name="ShoppingCart" className="mr-2" size={18} />
                  Заказать
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-primary/20 to-secondary/20 backdrop-blur border-primary hover:scale-105 duration-300 relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-secondary text-white px-3 py-1 rounded-full text-sm font-semibold">
                Популярное
              </div>
              <CardHeader>
                <div className="w-16 h-16 rounded-full bg-primary/30 flex items-center justify-center mb-4">
                  <Icon name="Layers" className="text-primary" size={32} />
                </div>
                <CardTitle className="text-2xl">Разбор всех сфер</CardTitle>
                <CardDescription className="text-lg">Полный анализ матрицы онлайн</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-3xl font-bold text-primary">8 888 ₽</div>
                <ul className="space-y-2 text-foreground/80">
                  <li className="flex items-start gap-2">
                    <Icon name="Check" className="text-primary mt-1" size={16} />
                    <span>Детальный разбор личности</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" className="text-primary mt-1" size={16} />
                    <span>Финансы и карьера</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" className="text-primary mt-1" size={16} />
                    <span>Любовь и отношения</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" className="text-primary mt-1" size={16} />
                    <span>Здоровье и энергия</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" className="text-primary mt-1" size={16} />
                    <span>Предназначение и таланты</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" className="text-primary mt-1" size={16} />
                    <span>Кармические задачи</span>
                  </li>
                </ul>
                <Button 
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90" 
                  size="lg"
                  onClick={() => handlePayment('Разбор всех сфер', 8888)}
                >
                  <Icon name="ShoppingCart" className="mr-2" size={18} />
                  Заказать
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur border-border/50 hover:border-accent transition-all hover:scale-105 duration-300">
              <CardHeader>
                <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mb-4">
                  <Icon name="Baby" className="text-accent" size={32} />
                </div>
                <CardTitle className="text-2xl">Детская матрица</CardTitle>
                <CardDescription className="text-lg">Раскройте потенциал ребёнка</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-3xl font-bold text-accent">3 333 ₽</div>
                <ul className="space-y-2 text-foreground/80">
                  <li className="flex items-start gap-2">
                    <Icon name="Check" className="text-accent mt-1" size={16} />
                    <span>Врождённые таланты и способности</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" className="text-accent mt-1" size={16} />
                    <span>Как раскрыть потенциал ребёнка</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" className="text-accent mt-1" size={16} />
                    <span>Подходящие направления развития</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" className="text-accent mt-1" size={16} />
                    <span>Особенности характера и поведения</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" className="text-accent mt-1" size={16} />
                    <span>Советы по воспитанию</span>
                  </li>
                </ul>
                <Button 
                  className="w-full bg-accent hover:bg-accent/90" 
                  size="lg"
                  onClick={() => handlePayment('Детская матрица', 3333)}
                >
                  <Icon name="ShoppingCart" className="mr-2" size={18} />
                  Заказать
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur border-border/50 hover:border-secondary transition-all hover:scale-105 duration-300">
              <CardHeader>
                <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mb-4">
                  <Icon name="Users" className="text-secondary" size={32} />
                </div>
                <CardTitle className="text-2xl">Совместимость</CardTitle>
                <CardDescription className="text-lg">Онлайн-анализ отношений</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-3xl font-bold text-secondary">4 444 ₽</div>
                <ul className="space-y-2 text-foreground/80">
                  <li className="flex items-start gap-2">
                    <Icon name="Check" className="text-secondary mt-1" size={16} />
                    <span>Матрицы двух людей</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" className="text-secondary mt-1" size={16} />
                    <span>Глубокий анализ совместимости</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" className="text-secondary mt-1" size={16} />
                    <span>Сильные стороны отношений</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" className="text-secondary mt-1" size={16} />
                    <span>Точки роста и проработки</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" className="text-secondary mt-1" size={16} />
                    <span>Рекомендации для гармонии</span>
                  </li>
                </ul>
                <Button 
                  className="w-full bg-secondary hover:bg-secondary/90" 
                  size="lg"
                  onClick={() => handlePayment('Совместимость', 4444)}
                >
                  <Icon name="ShoppingCart" className="mr-2" size={18} />
                  Заказать
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="order" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-glow"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-12 animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-bold">Заказать консультацию</h2>
              {selectedService && (
                <div className="inline-block bg-gradient-to-r from-primary/20 to-secondary/20 px-6 py-3 rounded-full border border-primary/30">
                  <p className="text-lg font-semibold">
                    Выбрана услуга: <span className="text-primary">{selectedService.name}</span> — <span className="text-secondary">{selectedService.price.toLocaleString('ru-RU')} ₽</span>
                  </p>
                </div>
              )}
              <p className="text-xl text-foreground/80">
                Заполните форму для перехода к оплате через СБП
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <Card className="bg-card/80 backdrop-blur border-border/50">
                <CardHeader>
                  <CardTitle className="text-2xl">Форма заказа</CardTitle>
                  <CardDescription>Укажите ваши данные для расчёта матрицы</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Ваше имя</Label>
                      <Input 
                        id="name" 
                        placeholder="Введите имя" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="your@email.com" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Телефон</Label>
                      <Input 
                        id="phone" 
                        type="tel" 
                        placeholder="+7 (999) 123-45-67" 
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="birthdate">Дата рождения</Label>
                      <Input 
                        id="birthdate" 
                        type="date" 
                        value={formData.birthdate}
                        onChange={(e) => setFormData({...formData, birthdate: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Сообщение</Label>
                      <Textarea 
                        id="message" 
                        placeholder="Расскажите о вашем запросе..." 
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        rows={4}
                      />
                    </div>
                    <Button type="submit" className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90" size="lg">
                      <Icon name="Smartphone" className="mr-2" size={20} />
                      Оплатить через СБП
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <img 
                  src="https://cdn.poehali.dev/projects/91b40bb1-7894-48a0-af71-ac47ba0bc6fb/files/d78c7817-ce08-49a3-aa80-7e06dfc33b07.jpg"
                  alt="Консультация"
                  className="w-full rounded-2xl shadow-2xl"
                />
                <Card className="bg-primary/10 border-primary/30">
                  <CardContent className="pt-6 space-y-4">
                    <div className="flex gap-4">
                      <Icon name="Smartphone" className="text-primary" size={24} />
                      <div>
                        <h4 className="font-semibold mb-1">Оплата через СБП</h4>
                        <p className="text-sm text-foreground/70">
                          Мгновенный перевод через Систему Быстрых Платежей от любого банка
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <Icon name="Shield" className="text-primary" size={24} />
                      <div>
                        <h4 className="font-semibold mb-1">Безопасно</h4>
                        <p className="text-sm text-foreground/70">
                          Защищённая платёжная система с подтверждением в вашем банке
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-border bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Матрица Судьбы
            </h3>
            <p className="text-foreground/60">
              Откройте свой путь к самопознанию и гармонии
            </p>
            <div className="flex justify-center gap-6 pt-4">
              <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
                <Icon name="Mail" size={24} />
              </a>
              <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
                <Icon name="Phone" size={24} />
              </a>
              <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
                <Icon name="MessageCircle" size={24} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}