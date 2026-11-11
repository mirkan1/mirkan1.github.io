export const site = {
  url: 'https://mirkan1.github.io',
  name: 'Renas Mirkan KILIC',
  profiles: [
    'https://github.com/mirkan1',
    'https://linkedin.com/in/raqux'
  ]
};

export const pages = [
  {
    path: '/',
    title: 'Renas Mirkan KILIC | Software Developer',
    description: 'Portfolio of Renas Mirkan KILIC, a capable software developer focused on problem solving, adaptability, and useful software.',
    index: true
  },
  {
    path: '/work/',
    title: 'Projects | Renas Mirkan KILIC',
    description: 'Explore Renas Mirkan KILIC\'s projects, including Effortl3ssAI, a Python JotForm API wrapper, data reporting tools and reverse engineering.',
    index: true
  },
  {
    path: '/certifications/',
    title: 'Certifications | Renas Mirkan KILIC',
    description: 'View Renas Mirkan KILIC\'s Python and Django web programming certification and certificate image.',
    index: true
  },
  {
    path: '/privacy/',
    title: 'Privacy | Renas Mirkan KILIC',
    description: 'Privacy policy page for Renas Mirkan KILIC\'s portfolio. This page is currently under construction.',
    index: false
  }
];

export function getPage(pathname) {
  const path = `${pathname.replace(/\/+$/, '')}/`;
  return pages.find(page => page.path === path);
}
