import { useEffect } from "react";

const SITE_URL = (import.meta.env.VITE_SITE_URL ?? "").replace(/\/$/, "");

interface SeoOptions {
  /** Full <title> for this route. */
  title: string;
  /** Meta description for this route. */
  description: string;
  /** Path only, e.g. "/guide". Combined with VITE_SITE_URL for the canonical. */
  path: string;
  /** Absolute or root-relative social image. Defaults to the site OG image. */
  image?: string;
  /** og:type — "website" for the landing page, "article" for the guide. */
  type?: "website" | "article";
}

function setMeta(selector: string, attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

/**
 * Keeps per-route document metadata in sync in this SPA. index.html carries the
 * homepage defaults; every other route overrides them here so that crawlers,
 * link unfurlers and AI engines see a title/description/canonical that match
 * the page actually being viewed.
 */
export function useSeo({ title, description, path, image, type = "website" }: SeoOptions) {
  useEffect(() => {
    const url = `${SITE_URL}${path}`;
    const social = image ? (image.startsWith("http") ? image : `${SITE_URL}${image}`) : `${SITE_URL}/og-image.jpg`;

    document.title = title;
    setMeta('meta[name="description"]', "name", "description", description);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = url;

    setMeta('meta[property="og:title"]', "property", "og:title", title);
    setMeta('meta[property="og:description"]', "property", "og:description", description);
    setMeta('meta[property="og:url"]', "property", "og:url", url);
    setMeta('meta[property="og:type"]', "property", "og:type", type);
    setMeta('meta[property="og:image"]', "property", "og:image", social);
    setMeta('meta[name="twitter:title"]', "name", "twitter:title", title);
    setMeta('meta[name="twitter:description"]', "name", "twitter:description", description);
    setMeta('meta[name="twitter:image"]', "name", "twitter:image", social);
  }, [title, description, path, image, type]);
}
