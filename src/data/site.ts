import { faqItems } from './faq';
import type { SiteData } from '../lib/types';

export const siteData: SiteData = {
  brandName: 'BABEL STORE',
  tagline: 'Sélection exclusive & tendances du quotidien',
  description:
    'Boutique algerienne dediee aux articles tendance, elegants et indispensables pour votre confort au quotidien. Qualite verifiee, livraison rapide 58 wilayas et paiement securise a la livraison.',
  primaryCTA: {
    label: 'Decouvrir la selection',
    href: '/catalogue'
  },
  secondaryCTA: {
    label: 'A propos de Babel',
    href: '/a-propos'
  },
  socialLinks: [
    {
      label: 'Instagram',
      handle: '@babelstore.dz',
      href: 'https://www.instagram.com/babelstore.dz'
    },
    {
      label: 'TikTok',
      handle: '@babelstore.dz',
      href: 'https://www.tiktok.com/@babelstore.dz'
    },
    {
      label: 'Facebook',
      handle: 'Babel Store DZ',
      href: 'https://www.facebook.com/babelstore.dz'
    }
  ],
  heroBadge: 'BABEL STORE | Livraison 58 Wilayas | Paiement a la livraison',
  email: 'babel.store.off@gmail.com',
  trustItems: [
    {
      title: 'Livraison 58 Wilayas',
      description: 'Expedition express securisee dans toute l Algerie avec confirmation directe par appel.'
    },
    {
      title: 'Paiement a la livraison',
      description: 'Payez tranquillement en especes a la reception de votre colis (COD).'
    },
    {
      title: 'Verification avant paiement',
      description: 'Vous pouvez ouvrir et verifier votre article avant de regler le livreur.'
    },
    {
      title: 'Service client reactif 7j/7',
      description: 'Une equipe a votre ecoute pour vous accompagner et repondre a toute demande.'
    }
  ]
};

export const brandAssets = {
  logo: '/images/brand/babel-logo.svg',
  banner: '/images/brand/babel-concept.jpg',
  concept: '/images/brand/babel-concept.jpg'
};

export const aboutCopy = {
  intro:
    'Chez Babel Store, notre vocation est de vous apporter le meilleur des produits tendance, pratiques et design a des prix competitifs.',
  mission:
    'Nous denichons et testons rigoureusement chaque produit pour vous garantir une experience d achat fiable, avec une livraison soignee partout en Algerie.'
};

export const arabicSiteData: SiteData = {
  brandName: 'BABEL STORE',
  tagline: 'تشكيلة مختارة من أحدث المنتجات والاتجاهات العصرية',
  description:
    'متجركم الجزائري المفضل لأحدث المنتجات العملية والمبتكرة. جودة مضمونة، توصيل سريع لكافة ولايات الوطن والدفع عند الاستلام بعد فحص المنتج.',
  primaryCTA: {
    label: 'تصفح التشكيلة',
    href: '/ar/catalogue'
  },
  secondaryCTA: {
    label: 'من نحن',
    href: '/ar/a-propos'
  },
  socialLinks: [
    {
      label: 'Instagram',
      handle: '@babelstore.dz',
      href: 'https://www.instagram.com/babelstore.dz'
    },
    {
      label: 'TikTok',
      handle: '@babelstore.dz',
      href: 'https://www.tiktok.com/@babelstore.dz'
    },
    {
      label: 'Facebook',
      handle: 'Babel Store DZ',
      href: 'https://www.facebook.com/babelstore.dz'
    }
  ],
  heroBadge: 'متجر بابل | توصيل لكافة الولايات | الدفع بعد المعاينة',
  email: 'babel.store.off@gmail.com',
  trustItems: [
    {
      title: 'توصيل سريع 58 ولاية',
      description: 'شحن موثوق وسريع مع تأكيد فوري عبر الهاتف ومتابعة مستمرة حتى باب داركم.'
    },
    {
      title: 'الدفع عند الاستلام',
      description: 'ادفع نقداً عند استلام طلبيتك بكل أمان وراحة بال.'
    },
    {
      title: 'المعاينة قبل الدفع',
      description: 'يمكنك فحص المنتج والتأكد من جودته ومطابقته قبل تسليم المبلغ للموزع.'
    },
    {
      title: 'خدمة عملاء 7/7',
      description: 'فريق عمل متفانٍ وجاهز للإجابة على جميع استفساراتكم ومساعدتكم في أي وقت.'
    }
  ]
};

export const arabicAboutCopy = {
  intro:
    'في متجر بابل، نؤمن بأن كل منتج في يومياتك يجب أن يجمع بين الأناقة والفائدة الحقيقية.',
  mission:
    'هدفنا تقديم تجربة تسوق استثنائية في الجزائر ترتكز على الشفافية، الجودة وسرعة الخدمة.'
};

export { faqItems };
