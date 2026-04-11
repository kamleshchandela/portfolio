import { Helmet } from 'react-helmet-async';

// ─── Constants ───────────────────────────────────────────────────────────────
const BASE_URL  = 'https://kamleshchandela-portfolio.netlify.app';
const SITE_NAME = 'Kamlesh Chandela Portfolio';
const AUTHOR    = 'Kamlesh Chandela';
const TWITTER   = '@kamleshchandela';
const LINKEDIN  = 'https://www.linkedin.com/in/kamlesh-chandela/';
const LAST_MOD  = '2026-04-11';

const FALLBACK_TITLE = 'Kamlesh Chandela — Full Stack Developer & UI/UX Designer';
const FALLBACK_DESC  = 'Full Stack Developer from India specializing in React, Node.js & MongoDB. Building fast, beautiful web applications.';

// OG Image — Cloudinary auto-optimized (1200×630)
const OG_IMAGE    = 'https://res.cloudinary.com/dsuhb6swy/image/upload/w_1200,h_630,c_fill,q_auto,f_auto/v1767764610/Screenshot_2026-01-07_111318_cpzfzv.png';
const OG_IMAGE_SQ = 'https://res.cloudinary.com/dsuhb6swy/image/upload/w_400,h_400,c_fill,q_auto,f_auto/v1767764610/Screenshot_2026-01-07_111318_cpzfzv.png';

const DEFAULT_KEYWORDS =
  'Kamlesh Chandela, Full Stack Developer India, MERN Stack Developer, ' +
  'React Developer Portfolio, JavaScript Expert, UI UX Designer India, ' +
  'Hire Web Developer India, Node.js MongoDB Developer';

// ─── og:type per route ────────────────────────────────────────────────────────
const OG_TYPES = {
  '/':             'profile',
  '/skills':       'website',
  '/projects':     'website',
  '/hackathon':    'website',
  '/certificates': 'website',
  '/experience':   'website',
  '/contact':      'website',
};

// ─── Breadcrumbs per route ────────────────────────────────────────────────────
const getBreadcrumbs = (routePath) => {
  const map = {
    '/':             [{ name: 'Home', url: BASE_URL }],
    '/skills':       [{ name: 'Home', url: BASE_URL }, { name: 'Skills & Tech Stack',           url: `${BASE_URL}/#skills` }],
    '/projects':     [{ name: 'Home', url: BASE_URL }, { name: 'Projects & Live Demos',         url: `${BASE_URL}/#projects` }],
    '/hackathon':    [{ name: 'Home', url: BASE_URL }, { name: 'Hackathon Projects & Wins',     url: `${BASE_URL}/#hackathon` }],
    '/certificates': [{ name: 'Home', url: BASE_URL }, { name: 'Certifications & Achievements', url: `${BASE_URL}/#certificates` }],
    '/experience':   [{ name: 'Home', url: BASE_URL }, { name: 'Work Experience & Internships', url: `${BASE_URL}/#experience` }],
    '/contact':      [{ name: 'Home', url: BASE_URL }, { name: 'Hire / Contact',                url: `${BASE_URL}/#contact` }],
  };
  return map[routePath] || map['/'];
};

// ─── JSON-LD Schemas ──────────────────────────────────────────────────────────
const getSchemas = (routePath) => {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: AUTHOR,
    url: BASE_URL,
    image: OG_IMAGE,
    jobTitle: 'Full Stack Developer',
    description: 'Full Stack Developer specializing in React, Node.js, MongoDB, and modern UI/UX design.',
    email: 'kamlesh.b.chandela.cg@gmail.com',
    telephone: '+919979265140',
    sameAs: [
      LINKEDIN,
      'https://github.com/kamleshchandela',
      'https://leetcode.com/u/KamleshChandela/',
    ],
    knowsAbout: ['React', 'Node.js', 'MongoDB', 'JavaScript', 'HTML', 'CSS', 'Figma', 'Git', 'REST APIs', 'MERN Stack'],
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: BASE_URL,
    author: { '@type': 'Person', name: AUTHOR },
    dateModified: LAST_MOD,
    inLanguage: 'en-US',
  };

  const breadcrumbs = getBreadcrumbs(routePath);
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return [personSchema, websiteSchema, breadcrumbSchema];
};

// ─── SEOHead Component ────────────────────────────────────────────────────────
const SEOHead = ({
  title,
  description,
  ogDescription,
  routePath = '/',
  keywords  = '',
}) => {
  // ── Bulletproof guards — never render undefined/null/empty in <title> ──────
  const safeTitle   = (title       && title.trim())       ? title.trim()       : FALLBACK_TITLE;
  const safeDesc    = (description && description.trim()) ? description.trim() : FALLBACK_DESC;
  const finalOgDesc = (ogDescription && ogDescription.trim()) ? ogDescription.trim() : safeDesc;

  const canonicalUrl  = `${BASE_URL}/`;
  const finalKeywords = (keywords && keywords.trim()) ? keywords : DEFAULT_KEYWORDS;
  const schemas       = getSchemas(routePath);
  const ogType        = OG_TYPES[routePath] || 'website';

  return (
    <Helmet>
      {/* ── Primary SEO ─────────────────────────────────── */}
      <title>{safeTitle}</title>
      <meta name="title"       content={safeTitle} />
      <meta name="description" content={safeDesc} />
      <meta name="keywords"    content={finalKeywords} />
      <meta name="author"      content={AUTHOR} />
      <meta name="robots"      content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot"   content="index, follow" />
      <link rel="canonical"    href={canonicalUrl} />

      {/* ── Viewport & Theme ────────────────────────────── */}
      <meta name="viewport"     content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color"  content="#0a0a0f" />
      <meta name="color-scheme" content="dark light" />

      {/* ── Open Graph ─────────────────────────────────── */}
      <meta property="og:type"             content={ogType} />
      <meta property="og:url"              content={canonicalUrl} />
      <meta property="og:title"            content={safeTitle} />
      <meta property="og:description"      content={finalOgDesc} />
      <meta property="og:site_name"        content={SITE_NAME} />
      <meta property="og:locale"           content="en_US" />
      <meta property="og:locale:alternate" content="en_IN" />
      <meta property="og:updated_time"     content={LAST_MOD} />

      {/* OG Image — 1200×630 landscape (Facebook / LinkedIn / WhatsApp) */}
      <meta property="og:image"            content={OG_IMAGE} />
      <meta property="og:image:secure_url" content={OG_IMAGE} />
      <meta property="og:image:type"       content="image/png" />
      <meta property="og:image:width"      content="1200" />
      <meta property="og:image:height"     content="630" />
      <meta property="og:image:alt"        content={`${AUTHOR} — Full Stack Developer Portfolio`} />

      {/* OG Image — 400×400 square (Messenger / Instagram DM fallback) */}
      <meta property="og:image"            content={OG_IMAGE_SQ} />
      <meta property="og:image:secure_url" content={OG_IMAGE_SQ} />
      <meta property="og:image:type"       content="image/png" />
      <meta property="og:image:width"      content="400" />
      <meta property="og:image:height"     content="400" />
      <meta property="og:image:alt"        content={`${AUTHOR} — Full Stack Developer`} />

      {/* Profile tags — active only when og:type = "profile" (homepage) */}
      {ogType === 'profile' && [
        <meta key="fn" property="profile:first_name" content="Kamlesh" />,
        <meta key="ln" property="profile:last_name"  content="Chandela" />,
        <meta key="un" property="profile:username"   content="kamleshchandela" />,
        <meta key="gn" property="profile:gender"     content="male" />,
      ]}

      {/* ── Twitter / X Card ────────────────────────────── */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:site"        content={TWITTER} />
      <meta name="twitter:creator"     content={TWITTER} />
      <meta name="twitter:url"         content={canonicalUrl} />
      <meta name="twitter:title"       content={safeTitle} />
      <meta name="twitter:description" content={finalOgDesc} />
      <meta name="twitter:image"       content={OG_IMAGE} />
      <meta name="twitter:image:alt"   content={`${AUTHOR} — Full Stack Developer Portfolio`} />

      {/* ── LinkedIn Article Meta ──────────────────────── */}
      <meta property="article:author"         content={LINKEDIN} />
      <meta property="article:modified_time"  content={`${LAST_MOD}T00:00:00+05:30`} />
      <meta property="article:published_time" content="2026-01-01T00:00:00+05:30" />

      {/* ── Geo & Crawl ────────────────────────────────── */}
      <meta name="language"      content="English" />
      <meta name="geo.region"    content="IN" />
      <meta name="geo.country"   content="India" />
      <meta name="revisit-after" content="7 days" />

      {/* ── Performance ─────────────────────────────────── */}
      <link rel="preconnect"   href="https://res.cloudinary.com" crossOrigin="" />
      <link rel="dns-prefetch" href="https://res.cloudinary.com" />
      <link rel="preconnect"   href="https://fonts.googleapis.com" crossOrigin="" />
      <link rel="dns-prefetch" href="https://fonts.googleapis.com" />

      {/* ── JSON-LD Structured Data ────────────────────── */}
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEOHead;
