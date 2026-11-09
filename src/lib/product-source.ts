import { products as localProducts } from '../data/products';
import type { Product } from './types';

const PRODUCTS_FEED_URL =
  import.meta.env.PRODUCTS_FEED_URL || import.meta.env.PUBLIC_PRODUCTS_FEED_URL || '';

const SPREADSHEET_ID =
  import.meta.env.GOOGLE_SPREADSHEET_ID ||
  import.meta.env.PUBLIC_GOOGLE_SPREADSHEET_ID ||
  '';

const parseCsv = (csvText: string): Record<string, unknown>[] => {
  const lines: string[] = [];
  let currentLine = '';
  let inQuotes = false;

  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    if (char === '"') {
      inQuotes = !inQuotes;
      currentLine += char;
    } else if (char === '\n' && !inQuotes) {
      lines.push(currentLine);
      currentLine = '';
    } else if (char === '\r' && !inQuotes) {
      // ignore
    } else {
      currentLine += char;
    }
  }
  if (currentLine) lines.push(currentLine);
  if (lines.length < 2) return [];

  const parseRow = (line: string): string[] => {
    const row: string[] = [];
    let field = '';
    let inQ = false;
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        if (inQ && line[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQ = !inQ;
        }
      } else if (char === ',' && !inQ) {
        row.push(field.trim());
        field = '';
      } else {
        field += char;
      }
    }
    row.push(field.trim());
    return row;
  };

  const headers = parseRow(lines[0]).map((h) => h.replace(/^["']|["']$/g, '').trim());
  const rows: Record<string, unknown>[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = parseRow(lines[i]);
    const row: Record<string, unknown> = {};
    let hasValue = false;
    for (let h = 0; h < headers.length; h++) {
      const val = (values[h] || '').replace(/^["']|["']$/g, '').trim();
      row[headers[h]] = val;
      if (val) hasValue = true;
    }
    if (hasValue && row.id) rows.push(row);
  }

  return rows;
};

const fetchDirectGoogleSheetCsv = async (sheetId: string) => {
  if (!sheetId) return null;
  const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=Produits`;
  try {
    console.info(`[product-source] Fetching direct Google Sheet CSV from: ${csvUrl}`);
    const res = await fetch(csvUrl, { cache: 'no-store' });
    if (!res.ok) {
      console.warn(`[product-source] Direct CSV request returned status ${res.status}`);
      return null;
    }
    const csvText = await res.text();
    const rows = parseCsv(csvText);
    console.info(`[product-source] Loaded ${rows.length} product rows directly from Google Sheet CSV.`);
    return rows;
  } catch (err) {
    console.warn(`[product-source] Direct Google Sheet CSV fetch failed:`, err);
    return null;
  }
};

const IS_DEV = import.meta.env.DEV;
const PRODUCT_CACHE_TTL_MS = IS_DEV ? 0 : 60_000;

const defaultProduct: Product = {
  id: 'sheet-product',
  slug: 'produit',
  name: 'Produit Babel Store',
  nameAr: 'منتج متجر بابل',
  baseName: 'Produit Babel Store',
  baseNameAr: 'منتج متجر بابل',
  color: '',
  colorAr: '',
  variantGroup: '',
  category: 'Général',
  collection: 'Babel Collection',
  collectionAr: 'تشكيلة بابل',
  price: '0 DA',
  images: ['/images/brand/babel-concept.jpg'],
  shortDescription: '',
  shortDescriptionAr: '',
  features: [],
  featuresAr: [],
  reasons: [],
  reasonsAr: [],
  availability: 'Disponible',
  availabilityAr: 'متوفر',
  featured: false,
  published: true,
  tags: []
};
let cachedProductsPromise: Promise<Product[]> | null = null;
let cachedProductsAt = 0;

const cleanCellText = (val: unknown): string => {
  let str = String(val ?? '').trim();
  if (str.includes('│')) {
    str = str.split('│')[0].trim();
  }
  return str;
};

const splitList = (value: unknown) =>
  String(value || '')
    .replace(/│/g, '|')
    .split('|')
    .map((item) => cleanCellText(item))
    .filter(Boolean);

const splitColorList = (value: unknown) =>
  String(value || '')
    .split(/\s*[\/|,]\s*/)
    .map((item) => cleanCellText(item))
    .filter(Boolean);

const splitCategoryList = (value: unknown) =>
  String(value || '')
    .split(/\s*[\/|,]\s*/)
    .map((item) => cleanCellText(item).toLowerCase())
    .filter(Boolean);

const normalizeBoolean = (value: unknown, fallback = false) => {
  const normalized = String(value ?? '').trim().toLowerCase();
  if (!normalized) return fallback;
  return ['true', '1', 'yes', 'oui'].includes(normalized);
};

const normalizeDriveImage = (value: unknown) => {
  const input = String(value || '').trim();
  if (!input) return '';

  const fileMatch = input.match(/\/file\/d\/([^/]+)/);
  if (fileMatch) return `https://lh3.googleusercontent.com/d/${fileMatch[1]}=w1600`;

  const idMatch = input.match(/[?&]id=([^&]+)/);
  if (idMatch) return `https://lh3.googleusercontent.com/d/${idMatch[1]}=w1600`;

  const lhMatch = input.match(/googleusercontent\.com\/d\/([^=/]+)/);
  if (lhMatch) return `https://lh3.googleusercontent.com/d/${lhMatch[1]}=w1600`;

  return input;
};

const normalizeDriveImages = (value: unknown) => {
  if (Array.isArray(value)) {
    return value.map((item) => normalizeDriveImage(item)).filter(Boolean);
  }

  const input = String(value || '').trim();
  if (!input) return [];

  const folderMatch = input.match(/\/folders\/([a-zA-Z0-9_-]+)/);
  if (folderMatch) {
    const folderId = folderMatch[1];
    if (folderId === '1hcbUYsHjZOEk1SRRgV8nZ9ow6wO1P5Lp') {
      return [
        'https://lh3.googleusercontent.com/d/1gfcoKAtv9AXI4MuP4NKLRcZZuu38kd-2=w1600',
        'https://lh3.googleusercontent.com/d/18TkswzWVQU2W2vpsCMBuWMwluapX2c2X=w1600',
        'https://lh3.googleusercontent.com/d/1hFUMSaYj764xGDhD_RunOhQs1vxXYHS_=w1600',
        'https://lh3.googleusercontent.com/d/1ShWdFWZit-6Ay0Rmd71PhfOygcnORQLa=w1600'
      ];
    }
  }

  if (input.includes('|') || input.includes('│')) {
    return input
      .replace(/│/g, '|')
      .split('|')
      .map((item) => normalizeDriveImage(item))
      .filter(Boolean);
  }

  const image = normalizeDriveImage(input);
  return image ? [image] : [];
};

const normalizeProduct = (row: Record<string, unknown>, index: number): Product => {
  const images = normalizeDriveImages(row.images || row.image);
  const quantityValue = Number.parseInt(String(row.quantity ?? ''), 10);
  const quantity = Number.isFinite(quantityValue) ? quantityValue : undefined;
  const published = normalizeBoolean(row.published, true);
  const featured = normalizeBoolean(row.featured, false);

  const rawName = cleanCellText(row.name || row.slug || `Produit ${index + 1}`);
  const rawNameAr = cleanCellText(row.nameAr);
  const baseName = cleanCellText(row.baseName || rawName);
  const baseNameAr = cleanCellText(row.baseNameAr || rawNameAr);
  const rawDesc = cleanCellText(row.shortDescription);
  const rawDescAr = cleanCellText(row.shortDescriptionAr);

  return {
    id: cleanCellText(row.id || `sheet-product-${index + 1}`),
    slug: cleanCellText(row.slug || `produit-${index + 1}`),
    name: rawName || defaultProduct.name,
    nameAr: rawNameAr,
    baseName: baseName || rawName || defaultProduct.baseName,
    baseNameAr: baseNameAr,
    color: cleanCellText(row.color),
    colorAr: cleanCellText(row.colorAr),
    variantGroup: cleanCellText(row.variantGroup),
    category: cleanCellText(row.category) || defaultProduct.category,
    collection: cleanCellText(row.collection) || defaultProduct.collection,
    collectionAr: cleanCellText(row.collectionAr),
    price: cleanCellText(row.price) || defaultProduct.price,
    oldPrice: cleanCellText(row.oldPrice),
    images: images.length ? images : defaultProduct.images,
    shortDescription: rawDesc || defaultProduct.shortDescription,
    shortDescriptionAr: rawDescAr,
    features: splitList(row.features),
    featuresAr: splitList(row.featuresAr),
    reasons: splitList(row.reasons),
    reasonsAr: splitList(row.reasonsAr),
    availability: cleanCellText(row.availability) || (typeof quantity === 'number' ? (quantity > 0 ? 'Disponible' : 'Rupture de stock') : 'Disponible'),
    availabilityAr: cleanCellText(row.availabilityAr) || (typeof quantity === 'number' ? (quantity > 0 ? 'متوفر' : 'غير متوفر') : 'متوفر'),
    quantity,
    published,
    featured,
    tags: splitList(row.tags)
  };
};

const extractRows = (payload: unknown): Record<string, unknown>[] => {
  if (Array.isArray(payload)) return payload as Record<string, unknown>[];

  if (payload && typeof payload === 'object') {
    const value = payload as { products?: unknown; data?: unknown; items?: unknown };
    if (Array.isArray(value.products)) return value.products as Record<string, unknown>[];
    if (Array.isArray(value.data)) return value.data as Record<string, unknown>[];
    if (Array.isArray(value.items)) return value.items as Record<string, unknown>[];
  }

  return [];
};

const fetchSheetProducts = async () => {
  if (!PRODUCTS_FEED_URL) {
    console.warn('[product-source] PRODUCTS_FEED_URL is missing. Using local fallback products.');
    return null;
  }

  try {
    const requestUrl = new URL(PRODUCTS_FEED_URL);

    if (IS_DEV) {
      requestUrl.searchParams.set('_ts', String(Date.now()));
    }

    console.info(`[product-source] PRODUCTS_FEED_URL=${requestUrl.toString()}`);

    const response = await fetch(requestUrl.toString(), {
      headers: { Accept: 'application/json' },
      cache: 'no-store'
    });

    if (!response.ok) {
      console.error(
        `[product-source] Feed request failed with status ${response.status} for ${requestUrl.toString()}`
      );
      return null;
    }

    const rawText = await response.text();
    let payload: unknown;

    try {
      payload = JSON.parse(rawText);
    } catch {
      console.error(
        `[product-source] Feed response is not valid JSON for ${requestUrl.toString()}. First 300 chars: ${rawText.slice(0, 300)}`
      );
      return null;
    }

    const payloadKeys =
      payload && typeof payload === 'object'
        ? Object.keys(payload as Record<string, unknown>).join(',')
        : typeof payload;

    console.info(`[product-source] Feed payload keys=${payloadKeys}`);

    const rows = extractRows(payload);
    console.info(`[product-source] Feed rows count=${rows.length}`);

    if (rows.length === 0) {
      console.info(`[product-source] Apps Script n'a renvoye aucun produit, essai direct via Google Sheet CSV (${SPREADSHEET_ID})...`);
      const csvRows = await fetchDirectGoogleSheetCsv(SPREADSHEET_ID);
      if (csvRows && csvRows.length > 0) {
        console.info(`[product-source] Succes ! ${csvRows.length} produit(s) charges directement depuis le Google Sheet en CSV.`);
        const products = csvRows.map(normalizeProduct);
        const publishedProducts = products.filter((product) => product.published !== false);
        return publishedProducts.length ? publishedProducts : null;
      }

      const payloadMessage =
        payload && typeof payload === 'object' && 'message' in (payload as Record<string, unknown>)
          ? String((payload as Record<string, unknown>).message || '')
          : '';

      if (payloadMessage.toLowerCase().includes('commande')) {
        console.error(
          `[product-source] ERREUR CRITIQUE DE DEPLOIEMENT GOOGLE APPS SCRIPT :\n` +
          `Le script Google Apps Script (${requestUrl.toString()}) a repondu "Commande enregistree" lors d'un appel GET.\n` +
          `Cela signifie que le deploiement Apps Script execute une ancienne version ou doGet() traitait uniquement les commandes.\n` +
          `POUR REPARER :\n` +
          `1. Ouvrez votre Google Sheet > Extensions > Apps Script\n` +
          `2. Collez la version 2.0.0 de google-apps-script.js\n` +
          `3. Cliquez sur Deployer > Gerer les deploiements > Modifier (crayon) > Version : "Nouvelle version" > Deployer.`
        );
      } else {
        console.warn(
          `[product-source] Feed returned no rows for ${requestUrl.toString()}${
            payloadMessage ? `. Message: ${payloadMessage}` : ''
          }. Using local fallback products.`
        );
      }
      return null;
    }

    const products = rows.map(normalizeProduct);
    const publishedProducts = products.filter((product) => product.published !== false);

    console.info(`[product-source] Loaded ${products.length} total product(s) from sheet feed.`);
    console.info(`[product-source] Loaded ${publishedProducts.length} published product(s) from sheet feed.`);

    return publishedProducts.length ? publishedProducts : null;
  } catch (error) {
    console.error(`[product-source] Feed fetch crashed for ${PRODUCTS_FEED_URL}:`, error);
    return null;
  }
};

export const getProducts = async () => {
  const now = Date.now();
  const isCacheExpired = !cachedProductsAt || now - cachedProductsAt > PRODUCT_CACHE_TTL_MS;

  if (IS_DEV) {
    cachedProductsPromise = null;
    cachedProductsAt = 0;
  }

  if (!cachedProductsPromise || isCacheExpired) {
    cachedProductsPromise = (async () => {
      const sheetProducts = await fetchSheetProducts();
      if (sheetProducts && sheetProducts.length > 0) {
        console.info(`[product-source] Returning ${sheetProducts.length} product(s) directly from Google Sheet.`);
        return sheetProducts;
      }

      console.warn('[product-source] No products returned from Google Sheet.');
      return [];
    })();

    cachedProductsAt = now;
  }

  return cachedProductsPromise;
};

export const getProductGroupKey = (product: Product): string => {
  if (product.variantGroup && product.variantGroup.trim()) {
    return product.variantGroup.trim().toLowerCase();
  }
  const base = (product.baseName || product.name || '')
    .trim()
    .toLowerCase()
    .replace(/\s+(noir|blanc|rose|bleu|rouge|vert|gris|dore|argent|black|white|pink|blue|red)\b/gi, '');
  return base || product.slug || product.id;
};

export const mergeProductVariants = (products: Product[]): Product[] => {
  const groups = new Map<string, Product[]>();

  for (const product of products) {
    const key = getProductGroupKey(product);
    if (!groups.has(key)) {
      groups.set(key, []);
    }
    groups.get(key)!.push(product);
  }

  const mergedList: Product[] = [];

  for (const [, variants] of groups.entries()) {
    if (variants.length === 1) {
      mergedList.push(variants[0]);
      continue;
    }

    const primary = variants[0];
    const allColorsFr = Array.from(new Set(variants.flatMap((v) => splitColorList(v.color))));
    const allColorsAr = Array.from(new Set(variants.flatMap((v) => splitColorList(v.colorAr || v.color))));
    const allImages = Array.from(new Set(variants.flatMap((v) => v.images))).filter(Boolean);
    const totalQuantity = variants.reduce(
      (acc, v) => acc + (typeof v.quantity === 'number' ? v.quantity : 0),
      0
    );
    const hasInStock = variants.some(
      (v) =>
        v.availability?.toLowerCase() === 'disponible' ||
        (typeof v.quantity === 'number' && v.quantity > 0)
    );

    const mergedProduct: Product = {
      ...primary,
      name: primary.baseName || primary.name,
      baseName: primary.baseName || primary.name,
      color: allColorsFr.join(' / '),
      colorAr: allColorsAr.join(' / '),
      images: allImages.length ? allImages : primary.images,
      quantity: totalQuantity > 0 ? totalQuantity : primary.quantity,
      availability: hasInStock ? 'Disponible' : primary.availability,
      availabilityAr: hasInStock ? 'متوفر' : primary.availabilityAr,
      featured: variants.some((v) => v.featured)
    };

    mergedList.push(mergedProduct);
  }

  return mergedList;
};

export const getFeaturedProducts = (products: Product[]) =>
  getCatalogProducts(products).filter((product) => product.featured);

export const getCatalogProducts = (products: Product[]) => mergeProductVariants(products);

const hasTag = (product: Product, patterns: string[]) => {
  const haystack = [product.slug, product.category, product.collection, ...product.tags].join(' ').toLowerCase();
  return patterns.some((pattern) => haystack.includes(pattern));
};

export const getProductCategoryKeys = (product: Product) => {
  const categories = new Set<string>();
  const categoryValues = splitCategoryList(product.category);

  categoryValues.forEach((value) => {
    if (value.includes('voiture') || value.includes('car')) categories.add('voiture');
    if (value.includes('beaute') || value.includes('beauty') || value.includes('maquillage')) categories.add('beaute');
    if (value.includes('organisation') || value.includes('organisateur') || value.includes('rangement')) categories.add('organisation');
    if (value.includes('maison') || value.includes('home') || value.includes('accessoires du quotidien')) categories.add('maison');
  });

  if (hasTag(product, ['voiture', 'car'])) categories.add('voiture');
  if (hasTag(product, ['beaute', 'beauty', 'makeup', 'maquillage'])) categories.add('beaute');
  if (hasTag(product, ['organisation', 'organisateur', 'rangement'])) categories.add('organisation');
  if (hasTag(product, ['maison', 'home'])) categories.add('maison');
  if (hasTag(product, ['miroir-lumineux'])) categories.add('voiture');

  return categories.size ? Array.from(categories) : ['maison'];
};

export const getProductCategoryKey = (product: Product) => getProductCategoryKeys(product)[0];

export const getProductCategoryLabel = (product: Product, locale: 'fr' | 'ar' = 'fr') => {
  const labels = {
    fr: {
      maison: 'Maison',
      voiture: 'Voiture',
      organisation: 'Organisation',
      beaute: 'Beaute'
    },
    ar: {
      maison: 'المنزل',
      voiture: 'السيارة',
      organisation: 'التنظيم',
      beaute: 'الجمال'
    }
  };

  return getProductCategoryKeys(product)
    .map((key) => labels[locale][key as keyof (typeof labels)['fr']])
    .join(' / ');
};

export const isPromotionProduct = (product: Product) =>
  Boolean(product.oldPrice) || hasTag(product, ['solde', 'promo', 'promotion', 'reduction']);

export const isNewProduct = (product: Product) => hasTag(product, ['nouveau', 'nouveaute', 'new']);

export const isPopularProduct = (product: Product) =>
  product.featured || hasTag(product, ['tendance', 'best seller', 'bestseller', 'populaire']);

export const getProductBadge = (product: Product, locale: 'fr' | 'ar' = 'fr') => {
  if (isPromotionProduct(product)) {
    return locale === 'ar'
      ? { label: 'تخفيض', tone: 'sale' }
      : { label: 'Solde', tone: 'sale' };
  }

  if (hasTag(product, ['best seller', 'bestseller'])) {
    return locale === 'ar'
      ? { label: '⭐ الأكثر مبيعاً', tone: 'best' }
      : { label: '⭐ Best seller', tone: 'best' };
  }

  if (isPopularProduct(product)) {
    return locale === 'ar'
      ? { label: '🔥 رائج', tone: 'trend' }
      : { label: '🔥 Tendance', tone: 'trend' };
  }

  return null;
};

const uniqueProducts = (products: Product[]) =>
  products.filter((product, index, list) => index === list.findIndex((item) => item.id === product.id));

export const getPromotionProducts = (products: Product[]) => uniqueProducts(products.filter(isPromotionProduct)).slice(0, 4);

export const getNewArrivalProducts = (products: Product[]) => {
  const matches = uniqueProducts(products.filter(isNewProduct));
  return (matches.length ? matches : uniqueProducts(products)).slice(0, 4);
};

export const getPopularProducts = (products: Product[]) => {
  const matches = uniqueProducts(products.filter(isPopularProduct));
  return (matches.length ? matches : uniqueProducts(products)).slice(0, 4);
};

export const getAvailableColors = (
  products: Product[],
  productSlug: string,
  variantGroup?: string,
  locale: 'fr' | 'ar' = 'fr'
) => {
  const target = products.find((p) => p.slug === productSlug);
  const targetKey = target
    ? getProductGroupKey(target)
    : (variantGroup || productSlug).toLowerCase();

  const matching = products.filter((item) => getProductGroupKey(item) === targetKey);
  return Array.from(
    new Set(
      matching.flatMap((item) =>
        splitColorList(locale === 'ar' ? item.colorAr || item.color : item.color)
      )
    )
  );
};

export const getProductColors = (product: Product, locale: 'fr' | 'ar' = 'fr') =>
  splitColorList(locale === 'ar' ? product.colorAr || product.color : product.color);

export const getVariants = (products: Product[], product: Product) => {
  const groupKey = getProductGroupKey(product);
  return products.filter((item) => getProductGroupKey(item) === groupKey);
};

export const getSimilarProducts = (products: Product[], product: Product) =>
  products
    .filter(
      (item) =>
        item.id !== product.id &&
        getProductCategoryKeys(item).some((category) => getProductCategoryKeys(product).includes(category))
    )
    .filter((item, index, list) => index === list.findIndex((entry) => entry.id === item.id))
    .slice(0, 4);