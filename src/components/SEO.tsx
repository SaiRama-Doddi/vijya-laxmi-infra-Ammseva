import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalPath?: string;
  image?: string;
  type?: "website" | "article";
  schema?: Record<string, unknown> | Array<Record<string, unknown>>;
}

const BASE_URL = "https://vijayalakshmiinfa.com";
const DEFAULT_IMAGE = `${BASE_URL}/og-image.jpg`;

export function SEO({
  title,
  description,
  keywords,
  canonicalPath,
  image = DEFAULT_IMAGE,
  type = "website",
  schema,
}: SEOProps) {
  const { pathname } = useLocation();
  const currentPath = canonicalPath || pathname;
  const canonicalUrl = `${BASE_URL}${currentPath.startsWith("/") ? currentPath : `/${currentPath}`}`;
  const fullTitle = title.includes("Vijaya Lakshmi Infra")
    ? title
    : `${title} | Vijaya Lakshmi Infra`;

  useEffect(() => {
    // 1. Update Title
    document.title = fullTitle;

    // Helper to update or create meta tags
    const setMetaTag = (attrName: string, attrValue: string, content: string) => {
      let element = document.querySelector(`meta[${attrName}="${attrValue}"]`) as HTMLMetaElement | null;
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // 2. Standard Meta Tags
    setMetaTag("name", "description", description);
    if (keywords) {
      setMetaTag("name", "keywords", keywords);
    }
    setMetaTag("name", "robots", "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1");

    // 3. Canonical Link
    let canonicalTag = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalTag) {
      canonicalTag = document.createElement("link");
      canonicalTag.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute("href", canonicalUrl);

    // 4. Open Graph Tags
    setMetaTag("property", "og:title", fullTitle);
    setMetaTag("property", "og:description", description);
    setMetaTag("property", "og:url", canonicalUrl);
    setMetaTag("property", "og:type", type);
    setMetaTag("property", "og:image", image.startsWith("http") ? image : `${BASE_URL}${image}`);
    setMetaTag("property", "og:site_name", "Vijaya Lakshmi Infra");
    setMetaTag("property", "og:locale", "en_IN");

    // 5. Twitter Card Tags
    setMetaTag("name", "twitter:card", "summary_large_image");
    setMetaTag("name", "twitter:title", fullTitle);
    setMetaTag("name", "twitter:description", description);
    setMetaTag("name", "twitter:image", image.startsWith("http") ? image : `${BASE_URL}${image}`);

    // 6. Page-Specific JSON-LD Schema
    const schemaScriptId = "page-specific-jsonld";
    let schemaScript = document.getElementById(schemaScriptId) as HTMLScriptElement | null;

    if (schema) {
      if (!schemaScript) {
        schemaScript = document.createElement("script");
        schemaScript.id = schemaScriptId;
        schemaScript.type = "application/ld+json";
        document.head.appendChild(schemaScript);
      }
      schemaScript.textContent = JSON.stringify(
        Array.isArray(schema)
          ? {
              "@context": "https://schema.org",
              "@graph": schema,
            }
          : {
              "@context": "https://schema.org",
              ...schema,
            }
      );
    } else if (schemaScript) {
      schemaScript.remove();
    }

    return () => {
      // Clean up page-specific schema when unmounting
      const script = document.getElementById(schemaScriptId);
      if (script) {
        script.remove();
      }
    };
  }, [fullTitle, description, keywords, canonicalUrl, image, type, schema]);

  return null;
}

