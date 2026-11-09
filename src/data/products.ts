import type { Product } from '../lib/types';

// Produit de secours hors-ligne (au cas où la connexion Google Sheet échouerait temporairement lors du build cloud)
// En temps normal, tous les produits sont chargés en direct depuis le Google Sheet ("Produits").
export const products: Product[] = [
  {
    id: 'p1',
    slug: 'lampe-led-bois',
    name: 'Lampe LED Détecteur de Mouvement en Bois',
    nameAr: 'مصباح ذكي استشعار بالحركة LED بتصميم خشبي أنيق',
    baseName: 'Lampe LED Intelligente en Bois',
    baseNameAr: 'مصباح ذكي خشب',
    color: 'Noyer Foncé',
    colorAr: 'خشب الجوز الداكن',
    variantGroup: 'lampe-led-bois',
    category: 'Maison & Déco',
    collection: 'Éclairage Intelligent',
    collectionAr: 'إضاءة ذكية وعصرية',
    price: '1 600 DA',
    oldPrice: '2 500 DA',
    images: [
      'https://lh3.googleusercontent.com/d/1gfcoKAtv9AXI4MuP4NKLRcZZuu38kd-2=w1600',
      'https://lh3.googleusercontent.com/d/18TkswzWVQU2W2vpsCMBuWMwluapX2c2X=w1600',
      'https://lh3.googleusercontent.com/d/1hFUMSaYj764xGDhD_RunOhQs1vxXYHS_=w1600',
      'https://lh3.googleusercontent.com/d/1ShWdFWZit-6Ay0Rmd71PhfOygcnORQLa=w1600'
    ],
    shortDescription: 'Éclairage sans fil avec détecteur de mouvement intelligent, fixation magnétique 2 en 1 et finition bois noble.',
    shortDescriptionAr: 'إضاءة ذكية مع مستشعر حركة وشحن وتثبيت مغناطيسي.',
    features: [
      'Bois naturel noble',
      'Détecteur grand angle',
      'Éclairage doux',
      'Fixation magnétique 2 en 1',
      'Batterie USB'
    ],
    featuresAr: [
      'خشب طبيعي فاخر',
      'مستشعر حركة ذكي',
      'إضاءة مريحة للعين',
      'تثبيت مغناطيسي',
      'شحن USB'
    ],
    availability: 'Disponible (15 restants)',
    availabilityAr: 'متوفر (متبقي 15 قطعة فقط)',
    quantity: 15,
    featured: true,
    published: true,
    tags: ['lampe', 'bois', 'led', 'mouvement', 'usb']
  }
];

export const featuredProducts: Product[] = products;

