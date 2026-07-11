export const locales = ['en', 'es'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export const ui = {
  en: {
    nav_work: 'Work',
    nav_about: 'About',
    nav_contact: 'Contact',
    nav_cv: 'CV',
    theme_toggle: 'Toggle color theme',
    lang_toggle: 'Switch to Spanish',
    home_kicker: 'Product Designer — UX/UI',
    home_headline: "I design for the moment trust is decided.",
    home_intro: 'Ten years of turning ambiguity into something people can trust.',
    index_label: 'Selected work',
    other_work_label: 'Other work',
    role_label: 'Role',
    dates_label: 'Dates',
    scope_label: 'Scope',
    context_label: 'Context',
    work_label: 'The Work',
    result_label: 'The Result',
    lesson_label: 'The Lesson',
    next_label: 'Next',
    coming_soon: 'Full write-up coming soon in this language.',
    footer_about_title: 'About',
    footer_about:
      "Hi, my name is Juan Miguel and I'm a designer by heart. From a young age, I was captivated by art in all its forms, influenced by my father, an engineer and artist. Growing up by the ocean, nature and the sea became a constant source of inspiration. With a background in graphic design, graffiti, furniture design, and UX/UI design, I draw from the creativity of art and multidisciplinary movements like Bauhaus. My design approach is meticulous, blending artistic vision with functionality and a deep focus on how people experience and interact with what I create. I'm passionate about working on meaningful projects—from physical objects to digital products—that bring innovative ideas to life, pushing the boundaries of design.",
    footer_contact_title: 'Contact',
    footer_contact_cta: 'Say hello',
    footer_contact_note: "If your email client doesn't open automatically, reach me directly at:",
    footer_availability: 'Open to remote roles, worldwide.',
    footer_cv_title: 'Resume',
    footer_cv_cta: 'Download CV',
    footer_rights: 'All rights reserved.',
    lexis_demo_title: 'Try it: Lexis AI',
    lexis_demo_intro:
      'A functional recreation of the Lexis AI flow from this case study — mocked for the portfolio, not connected to the real product. Ask a legal question or pick an example.',
    lexis_demo_placeholder: 'Ask a legal question…',
    lexis_demo_submit: 'Ask',
    lexis_demo_thinking: 'Searching sources',
    lexis_demo_disclaimer: 'This is a recreation for demonstration purposes, not the real Lexis AI product.',
  },
  es: {
    nav_work: 'Proyectos',
    nav_about: 'Sobre mí',
    nav_contact: 'Contacto',
    nav_cv: 'CV',
    theme_toggle: 'Cambiar tema de color',
    lang_toggle: 'Cambiar a inglés',
    home_kicker: 'Product Designer — UX/UI',
    home_headline: 'Diseño para el momento en que se decide la confianza.',
    home_intro: 'Diez años traduciendo ambigüedad en confianza.',
    index_label: 'Proyectos seleccionados',
    other_work_label: 'Otros trabajos',
    role_label: 'Rol',
    dates_label: 'Fechas',
    scope_label: 'Alcance',
    context_label: 'Contexto',
    work_label: 'El trabajo',
    result_label: 'El resultado',
    lesson_label: 'La lección',
    next_label: 'Siguiente',
    coming_soon: 'Versión completa en este idioma, próximamente.',
    footer_about_title: 'Sobre mí',
    footer_about:
      'Hola, mi nombre es Juan Miguel y soy diseñador de corazón. Desde pequeño me cautivó el arte en todas sus formas, influenciado por mi padre, ingeniero y artista. Crecer junto al mar hizo que la naturaleza y el océano se convirtieran en una fuente constante de inspiración. Con un background en diseño gráfico, graffiti, diseño de muebles y diseño UX/UI, me nutro de la creatividad del arte y de movimientos multidisciplinarios como la Bauhaus. Mi enfoque de diseño es meticuloso, combinando visión artística con funcionalidad y un profundo interés en cómo las personas experimentan e interactúan con lo que creo. Me apasiona trabajar en proyectos con propósito —desde objetos físicos hasta productos digitales— que den vida a ideas innovadoras, llevando los límites del diseño más allá.',
    footer_contact_title: 'Contacto',
    footer_contact_cta: 'Escríbeme',
    footer_contact_note: 'Si tu cliente de correo no se abre automáticamente, escríbeme directo a:',
    footer_availability: 'Disponible para roles remotos, en cualquier parte del mundo.',
    footer_cv_title: 'CV',
    footer_cv_cta: 'Descargar CV',
    footer_rights: 'Todos los derechos reservados.',
    lexis_demo_title: 'Pruébalo: Lexis IA',
    lexis_demo_intro:
      'Una recreación funcional del flujo de Lexis IA de este case study — simulada para el portafolio, sin conexión al producto real. Escribe una pregunta legal o elige un ejemplo.',
    lexis_demo_placeholder: 'Escribe una pregunta legal…',
    lexis_demo_submit: 'Preguntar',
    lexis_demo_thinking: 'Buscando fuentes',
    lexis_demo_disclaimer: 'Esto es una recreación con fines de demostración, no es el producto real de Lexis IA.',
  },
} as const;

export function t(locale: Locale) {
  return ui[locale];
}

export function otherLocale(locale: Locale): Locale {
  return locale === 'en' ? 'es' : 'en';
}

export function workPath(locale: Locale, slug?: string) {
  const base = locale === 'en' ? '/en/work' : '/es/proyectos';
  return slug ? `${base}/${slug}` : `${base}`;
}

export function homePath(locale: Locale) {
  return `/${locale}/`;
}
