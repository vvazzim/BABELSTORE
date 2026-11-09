import { faqItems } from './faq';
import type { SiteData } from '../lib/types';

export const siteData: SiteData = {
  brandName: 'BUBLE STORE DZ',
  tagline: 'Sélection exclusive & tendances du quotidien',
  description:
    'Boutique algérienne dédiée aux articles tendance, élégants et indispensables pour votre confort au quotidien. Qualité vérifiée, livraison rapide 58 wilayas et paiement sécurisé à la livraison.',
  primaryCTA: {
    label: 'Découvrir la sélection',
    href: '/catalogue'
  },
  secondaryCTA: {
    label: 'À propos de Buble Store',
    href: '/a-propos'
  },
  socialLinks: [
    {
      label: 'Instagram',
      handle: '@bublestore.dz',
      href: 'https://www.instagram.com/bublestore.dz'
    },
    {
      label: 'TikTok',
      handle: '@bublestore.dz',
      href: 'https://www.tiktok.com/@bublestore.dz'
    },
    {
      label: 'Facebook',
      handle: 'Buble Store DZ',
      href: 'https://www.facebook.com/bublestore.dz'
    }
  ],
  heroBadge: 'BUBLE STORE DZ | Livraison 58 Wilayas | Paiement à la livraison',
  email: 'babel.store.off@gmail.com',
  trustItems: [
    {
      title: 'Livraison 58 Wilayas',
      description: 'Expédition express sécurisée dans toute l Algérie avec confirmation directe par appel.'
    },
    {
      title: 'Paiement à la livraison',
      description: 'Payez tranquillement en espèces à la réception de votre colis (COD).'
    },
    {
      title: 'Vérification avant paiement',
      description: 'Vous pouvez ouvrir et vérifier votre article avant de régler le livreur.'
    },
    {
      title: 'Service client réactif 7j/7',
      description: 'Une équipe à votre écoute pour vous accompagner et répondre à toute demande.'
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
    'Chez Buble Store DZ, notre vocation est de vous apporter le meilleur des produits tendance, pratiques et design à des prix compétitifs.',
  mission:
    'Nous dénichons et testons rigoureusement chaque produit pour vous garantir une expérience d achat fiable, avec une livraison soignée partout en Algérie.'
};

export const arabicSiteData: SiteData = {
  brandName: 'BUBLE STORE DZ',
  tagline: 'تشكيلة مختارة من أحدث المنتجات والاتجاهات العصرية',
  description:
    'متجركم الجزائري المفضل BUBLE STORE DZ لأحدث المنتجات العملية والمبتكرة. جودة مضمونة، توصيل سريع لكافة ولايات الوطن والدفع عند الاستلام بعد فحص المنتج.',
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
      handle: '@bublestore.dz',
      href: 'https://www.instagram.com/bublestore.dz'
    },
    {
      label: 'TikTok',
      handle: '@bublestore.dz',
      href: 'https://www.tiktok.com/@bublestore.dz'
    },
    {
      label: 'Facebook',
      handle: 'Buble Store DZ',
      href: 'https://www.facebook.com/bublestore.dz'
    }
  ],
  heroBadge: 'BUBLE STORE DZ | توصيل لكافة الولايات | الدفع بعد المعاينة',
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
