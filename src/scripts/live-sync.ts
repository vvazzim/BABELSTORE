/**
 * Synchronisation dynamique en direct du catalogue Babel Store depuis Google Sheets.
 * Permet d'afficher immédiatement les nouveaux produits et les changements de stocks/prix
 * sans attendre le prochain re-déploiement de l'hébergeur.
 */

const DEFAULT_FEED_URL =
  'https://script.google.com/macros/s/AKfycbx04iAg8nNppFp3grWFO5MfD7STZK759kW1XdfIjyqMViwkwzpRCD2J01alQq6s0hLt/exec';

interface LiveProduct {
  id: string;
  slug: string;
  name: string;
  nameAr?: string;
  baseName?: string;
  baseNameAr?: string;
  color?: string;
  colorAr?: string;
  price: string;
  oldPrice?: string;
  quantity?: number;
  image?: string;
  images?: string[];
  category?: string;
  availability?: string;
  availabilityAr?: string;
  published?: boolean | string;
}

export function initLiveProductSync(options: {
  containerId: string;
  locale?: 'fr' | 'ar';
  emptyPlaceholderId?: string;
}) {
  if (typeof window === 'undefined') return;

  const { containerId, locale = 'fr', emptyPlaceholderId } = options;
  const container = document.getElementById(containerId);
  const emptyPlaceholder = emptyPlaceholderId ? document.getElementById(emptyPlaceholderId) : null;

  async function checkLiveUpdates() {
    try {
      // Cache de session de 45 secondes pour éviter les requêtes excessives
      const CACHE_KEY = 'babel_live_products_v1';
      const CACHE_TIME_KEY = 'babel_live_products_time';
      const cached = sessionStorage.getItem(CACHE_KEY);
      const cachedTime = Number(sessionStorage.getItem(CACHE_TIME_KEY) || '0');

      let products: LiveProduct[] = [];

      if (cached && Date.now() - cachedTime < 45_000) {
        try {
          products = JSON.parse(cached);
        } catch {
          // ignore cache parse error
        }
      }

      if (!products.length) {
        const res = await fetch(DEFAULT_FEED_URL, {
          headers: { Accept: 'application/json' }
        });
        if (!res.ok) return;

        const data = await res.json();
        if (data && data.success && Array.isArray(data.products)) {
          products = data.products;
          try {
            sessionStorage.setItem(CACHE_KEY, JSON.stringify(products));
            sessionStorage.setItem(CACHE_TIME_KEY, String(Date.now()));
          } catch {}
        }
      }

      if (!products.length) return;

      const published = products.filter(
        (p) => String(p.published).toLowerCase() !== 'false' && String(p.published).toLowerCase() !== '0'
      );

      if (!published.length) return;

      // Si le conteneur était vide ou affichait le message de synchronisation
      if (emptyPlaceholder && (!container || container.children.length === 0)) {
        emptyPlaceholder.classList.add('hidden');
      }

      const grid = container || document.getElementById('products-grid');
      if (!grid) return;

      // Récupérer les slugs déjà présents dans le DOM
      const existingCards = Array.from(grid.querySelectorAll('[data-slug]'));
      const existingSlugs = new Set(existingCards.map((el) => el.getAttribute('data-slug')));

      for (const prod of published) {
        const slug = String(prod.slug || '').trim();
        if (!slug) continue;

        const existingCard = grid.querySelector(`[data-slug="${slug}"]`);

        if (existingCard) {
          // Mettre à jour le prix si modifié dans le Sheet
          const priceEl = existingCard.querySelector('[data-price-val]');
          if (priceEl && prod.price && priceEl.textContent?.trim() !== prod.price.trim()) {
            priceEl.textContent = prod.price;
          }

          // Mettre à jour le stock / disponibilité
          if (typeof prod.quantity === 'number' && prod.quantity <= 0) {
            let outOfStockBadge = existingCard.querySelector('.out-of-stock-badge');
            if (!outOfStockBadge) {
              outOfStockBadge = document.createElement('span');
              outOfStockBadge.className =
                'out-of-stock-badge absolute right-5 top-5 z-10 rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white shadow-soft';
              outOfStockBadge.textContent = locale === 'ar' ? 'نفذت الكمية' : 'Rupture de stock';
              existingCard.querySelector('.relative')?.appendChild(outOfStockBadge);
            }
          }
        } else {
          // Produit nouvellement ajouté dans Google Sheet après le build !
          // On génère la carte dynamiquement pour l'afficher immédiatement
          const card = createDynamicProductCard(prod, locale);
          if (card) {
            grid.appendChild(card);
          }
        }
      }
    } catch (err) {
      // Échec silencieux, le contenu statique reste parfaitement visible
      console.warn('[live-sync] Notice:', err);
    }
  }

  // Lancer en différé pour ne pas bloquer l'affichage initial ultra-rapide
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(() => checkLiveUpdates());
  } else {
    setTimeout(checkLiveUpdates, 200);
  }
}

function createDynamicProductCard(prod: LiveProduct, locale: 'fr' | 'ar'): HTMLElement | null {
  const isAr = locale === 'ar';
  const slug = prod.slug;
  const title = isAr
    ? prod.baseNameAr || prod.nameAr || prod.baseName || prod.name
    : prod.baseName || prod.name;
  const imageAlt = isAr ? prod.nameAr || prod.name : prod.name;
  const categoryLabel = prod.category || (isAr ? 'متجر بابل' : 'Babel Store');

  // Résolution des images
  let images: string[] = [];
  if (Array.isArray(prod.images) && prod.images.length) {
    images = prod.images;
  } else if (typeof prod.image === 'string' && prod.image) {
    images = [prod.image];
  }

  const primaryImg = images[0] || '/images/brand/babel-concept.jpg';
  const detailLink = isAr ? `/ar/produit/${slug}` : `/produit/${slug}`;
  const detailLabel = isAr ? 'عرض المنتج' : 'Voir le produit';

  const article = document.createElement('article');
  article.className =
    'group overflow-hidden rounded-3xl border border-brand-line bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-premium animate-fade-in';
  article.setAttribute('data-product-card', '');
  article.setAttribute('data-slug', slug);

  article.innerHTML = `
    <a href="${detailLink}" class="block">
      <div class="relative overflow-hidden bg-brand-pearl p-3">
        <span class="absolute left-5 top-5 z-10 rounded-full bg-brand-cognac px-3 py-1 text-xs font-semibold text-white shadow-soft">
          ${isAr ? 'جديد' : 'Nouveau'}
        </span>
        <div class="overflow-hidden rounded-[1.25rem] bg-white">
          <img
            src="${primaryImg}"
            alt="${imageAlt}"
            class="aspect-[4/5] w-full object-cover transition duration-300 group-hover:scale-[1.02]"
            loading="lazy"
            referrerpolicy="no-referrer"
          />
        </div>
      </div>
      <div class="p-5">
        <div class="text-xs font-semibold uppercase tracking-brand text-brand-muted">${categoryLabel}</div>
        <h3 class="mt-2 text-base font-semibold text-brand-charcoal sm:text-lg">${title}</h3>
        <div class="mt-4 flex items-end justify-between gap-4">
          <div>
            ${
              prod.oldPrice
                ? `<div dir="ltr" class="inline-block whitespace-nowrap text-sm text-brand-muted line-through">${prod.oldPrice}</div>`
                : ''
            }
            <div dir="ltr" data-price-val class="inline-block whitespace-nowrap text-lg font-semibold text-brand-charcoal">
              ${prod.price}
            </div>
          </div>
          <span class="inline-flex items-center gap-1 text-sm font-semibold text-brand-cognac group-hover:text-brand-charcoal">
            ${detailLabel}
            <svg viewBox="0 0 20 20" class="h-4 w-4 fill-current ${isAr ? 'rotate-180' : ''}">
              <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
            </svg>
          </span>
        </div>
      </div>
    </a>
  `;

  return article;
}
