import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Handles smooth scrolling for anchor links and hash navigation
 */
const SmoothScroll = () => {
  const location = useLocation();

  // Handle hash links on page load and route change
  useEffect(() => {
    if (location.hash) {
      const elementId = location.hash.replace("#", "");
      const element = document.getElementById(elementId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  }, [location]);

  // Handle anchor link clicks
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");

      if (!anchor) return;

      const href = anchor.getAttribute("href");

      // Handle same-page anchor links
      if (href?.startsWith("#")) {
        e.preventDefault();
        const elementId = href.replace("#", "");
        const element = document.getElementById(elementId);

        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
          // Update URL without triggering navigation
          window.history.pushState(null, "", href);
        }
      }

      // Handle links with hash to same page
      if (href?.includes("#") && !href.startsWith("http")) {
        const [path, hash] = href.split("#");
        const currentPath = window.location.pathname;

        if (path === currentPath || path === "" || path === "/") {
          e.preventDefault();
          const element = document.getElementById(hash);

          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
            window.history.pushState(null, "", `#${hash}`);
          }
        }
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
};

export default SmoothScroll;
