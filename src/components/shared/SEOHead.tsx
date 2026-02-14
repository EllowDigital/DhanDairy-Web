import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

const SITE_URL = "https://dhandiary.netlify.app";
const SITE_NAME = "DhanDiary";

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: "website" | "article" | "product";
  twitterCard?: "summary" | "summary_large_image";
  structuredData?: object;
  noIndex?: boolean;
}

const SEOHead = ({
  title,
  description = "Track income and expenses effortlessly with DhanDiary. A free, secure, offline-first personal finance app with no ads.",
  keywords = "personal finance app, expense tracker, income tracker, budget app, money management, offline finance app, DhanDiary",
  canonical,
  ogImage = "/og-image.png",
  ogType = "website",
  twitterCard = "summary_large_image",
  structuredData,
  noIndex = false,
}: SEOHeadProps) => {
  const location = useLocation();
  const fullTitle = title
    ? `${title} | ${SITE_NAME} — Personal Finance Tracker`
    : `${SITE_NAME} — Free Personal Finance Tracker | Track Income & Expenses`;

  // Always use canonical domain
  const canonicalPath = canonical || location.pathname;
  const canonicalUrl = `${SITE_URL}${canonicalPath === "/" ? "" : canonicalPath}`;
  const ogImageUrl = ogImage.startsWith("http")
    ? ogImage
    : `${SITE_URL}${ogImage}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Sarwan Yadav — EllowDigital" />
      <meta
        name="robots"
        content={
          noIndex
            ? "noindex, nofollow"
            : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        }
      />

      {/* Canonical URL — ALWAYS canonical domain */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={ogImageUrl} />
      <meta
        property="og:image:alt"
        content={`${SITE_NAME} — Personal Finance Tracker`}
      />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:url" content={canonicalUrl} />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImageUrl} />
      <meta name="twitter:creator" content="@ellowdigital" />

      {/* Mobile & App Meta Tags */}
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content={SITE_NAME} />
      <meta name="application-name" content={SITE_NAME} />
      <meta name="theme-color" content="#2f9e77" />

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHead;
