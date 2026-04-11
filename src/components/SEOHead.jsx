import { Helmet } from 'react-helmet-async';

// ─── Constants ──────────────────────────────────────────────────────────────
const BASE_URL  = 'https://kamleshchandela-portfolio.netlify.app';
const SITE_NAME = 'Kamlesh Chandela Portfolio';
const AUTHOR    = 'Kamlesh Chandela';
const TWITTER   = '@kamleshchandela';
const LINKEDIN  = 'https://www.linkedin.com/in/kamlesh-chandela/';
const LAST_MOD  = '2026-04-11';

// OG Image — optimized Cloudinary URL (1200×630, high quality, no crop)
const OG_IMAGE     = 'https://res.cloudinary.com/dsuhb6swy/image/upload/w_1200,h_630,c_fill,q_auto,f_auto/v1767764610/Screenshot_2026-01-07_111318_cpzfzv.png';
const OG_IMAGE_SQ  = 'https://res.cloudinary.com/dsuhb6swy/image/upload/w_400,h_400,c_fill,q_auto,f_auto/v1767764610/Screenshot_2026-01-07_111318_cpzfzv.png';

const DEFAULT_KEYWORDS =
  'Kamlesh Chandela, Full Stack Developer India, MERN Stack Developer, ' +
  'React Developer Portfolio, JavaScript Expert, UI UX Designer India, ' +
  'Hire Web Developer India, Node.js MongoDB Developer';

// ─── og:type per route ───────────────────────────────────────────────────────
const OG_TYPES = {
  '/':             'profile',   // personal portfolio homepage → profile
  '/skills':       'website',
  '/projects':     'website',
  '/hackathon':    'website',
  '/certificates': 'website',
  '/experience':   'website',
  '/contact':      'website',
};

// ─── BreadcrumbList per actual route ────────────────────────────────────────
const getBreadcrumbs = (routePath) => {
  const map = {
    '/':             [{ name: 'Home',                      url: BASE_URL }],
    '/skills':       [{ name: 'Home', url: BASE_URL }, { name: 'Skills & Tech Stack',          url: `${BASE_URL}/#skills` }],
    '/projects':     [{ name: 'Home', url: BASE_URL }, { name: 'Projects & Live Demos',        url: `${BASE_URL}/#projects` }],
    '/hackathon':    [{ name: 'Home', url: BASE_URL }, { name: 'Hackathon Projects & Wins',    url: `${BASE_URL}/#hackathon` }],
    '/certificates': [{ name: 'Home', url: BASE_URL }, { name: 'Certifications & Achievements',url: `${BASE_URL}/#certificates` }],
    '/experience':   [{ name: 'Home', url: BASE_URL }, { name: 'Work Experience & Internships',url: `${BASE_URL}/#experience` }],
    '/contact':      [{ name: 'Home', url: BASE_URL }, { name: 'Hire / Contact',               url: `${BASE_URL}/#contact` }],
  };
  return map[routePath] || map['/'];
};

// ─── JSON-LD schemas ─────────────────────────────────────────────────────────
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

// ─── SEOHead Component ───────────────────────────────────────────────────────
// Props:
//  title       → full page title (used as-is in <title> & og:title)
//  description → Google meta description (150-160 chars)
//  ogDescription → Social-optimized description (punchier, shorter, for FB/LinkedIn/WhatsApp)
//  routePath   → actual location.pathname (for OG type, breadcrumbs, structured data)
//  keywords    → comma-separated keywords
const SEOHead = ({
  title,
  description,
  ogDescription,
  routePath = '/',
  keywords = '',
}) => {
  const canonicalUrl  = `${BASE_URL}/`;
  const finalKeywords = keywords || DEFAULT_KEYWORDS;
  const schemas       = getSchemas(routePath);
  const ogType        = OG_TYPES[routePath] || 'website';

  // OG description: use dedicated social copy if provided, otherwise fallback to meta desc
  const finalOgDesc = ogDescription || description;

  // OG title: strip the long "— Open to Work" suffix if present, keep it punchy for social
  const ogTitle = title;

  return (
    <Helmet>
      {/* ── Language ──────────────────────────────────────── */}
      <html lang="en" />

      {/* ── Primary SEO ───────────────────────────────────── */}
      <title>{title}</title>
      <meta name="title"       content={title} />
      <meta name="description" content={description} />
      <meta name="keywords"    content={finalKeywords} />
      <meta name="author"      content={AUTHOR} />
      <meta name="robots"      content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot"   content="index, follow" />
      <link rel="canonical"    href={canonicalUrl} />

      {/* ── Viewport & Colors ────────────────────────────── */}
      <meta name="viewport"     content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color"  content="#0a0a0f" />
      <meta name="color-scheme" content="dark light" />

      {/* ── Open Graph (Facebook · LinkedIn · WhatsApp · Slack · Discord) ── */}
      {/*    og:type = "profile" on homepage → LinkedIn & Facebook parse it better */}
      <meta property="og:type"              content={ogType} />
      <meta property="og:url"               content={canonicalUrl} />
      <meta property="og:title"             content={ogTitle} />
      <meta property="og:description"       content={finalOgDesc} />
      <meta property="og:site_name"         content={SITE_NAME} />
      <meta property="og:locale"            content="en_US" />
      <meta property="og:locale:alternate"  content="en_IN" />
      <meta property="og:updated_time"      content={LAST_MOD} />

      {/* Primary OG Image — 1200×630 (landscape, WhatsApp / Facebook / LinkedIn) */}
      <meta property="og:image"             content={OG_IMAGE} />
      <meta property="og:image:secure_url"  content={OG_IMAGE} />
      <meta property="og:image:type"        content="image/png" />
      <meta property="og:image:width"       content="1200" />
      <meta property="og:image:height"      content="630" />
      <meta property="og:image:alt"         content={`${AUTHOR} — Full Stack Developer & UI/UX Designer Portfolio`} />

      {/* Secondary OG Image — 400×400 square (Messenger, Instagram DM fallback) */}
      <meta property="og:image"             content={OG_IMAGE_SQ} />
      <meta property="og:image:secure_url"  content={OG_IMAGE_SQ} />
      <meta property="og:image:type"        content="image/png" />
      <meta property="og:image:width"       content="400" />
      <meta property="og:image:height"      content="400" />
      <meta property="og:image:alt"         content={`${AUTHOR} — Full Stack Developer`} />

      {/* Profile meta (active when og:type = "profile") */}
      {ogType === 'profile' && (
        <>
          <meta property="profile:first_name" content="Kamlesh" />
          <meta property="profile:last_name"  content="Chandela" />
          <meta property="profile:username"   content="kamleshchandela" />
          <meta property="profile:gender"     content="male" />
        </>
      )}

      {/* ── Twitter / X Card ────────────────────────────── */}
      {/*    summary_large_image = full-width card (max engagement) */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:site"        content={TWITTER} />
      <meta name="twitter:creator"     content={TWITTER} />
      <meta name="twitter:url"         content={canonicalUrl} />
      <meta name="twitter:title"       content={ogTitle} />
      <meta name="twitter:description" content={finalOgDesc} />
      <meta name="twitter:image"       content={OG_IMAGE} />
      <meta name="twitter:image:alt"   content={`${AUTHOR} — Full Stack Developer Portfolio`} />

      {/* ── LinkedIn Article Meta ────────────────────────── */}
      <meta property="article:author"        content={LINKEDIN} />
      <meta property="article:modified_time" content={`${LAST_MOD}T00:00:00+05:30`} />
      <meta property="article:published_time" content="2026-01-01T00:00:00+05:30" />

      {/* ── Geo & Crawl Hints ───────────────────────────── */}
      <meta name="language"      content="English" />
      <meta name="geo.region"    content="IN" />
      <meta name="geo.country"   content="India" />
      <meta name="revisit-after" content="7 days" />

      {/* ── Performance Hints ───────────────────────────── */}
      <link rel="preconnect"   href="https://res.cloudinary.com" crossOrigin="" />
      <link rel="dns-prefetch" href="https://res.cloudinary.com" />
      <link rel="preconnect"   href="https://fonts.googleapis.com" crossOrigin="" />
      <link rel="dns-prefetch" href="https://fonts.googleapis.com" />

      {/* ── JSON-LD Structured Data ──────────────────────── */}
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEOHead;
