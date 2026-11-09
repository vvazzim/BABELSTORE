interface SeoInput {
  title: string;
  description: string;
  path?: string;
  image?: string;
}

export function buildSeo({ title, description, path = '/', image = '/images/brand/babel-concept.jpg' }: SeoInput) {
  return {
    title,
    description,
    path,
    image,
    ogType: 'website'
  };
}
