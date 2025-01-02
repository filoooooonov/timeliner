export const pageview = (GA_MEASUREMENT_ID: string, url: string) => {
  if (typeof window.gtag !== "undefined") {
    window.gtag("config", GA_MEASUREMENT_ID, {
      page_location: url,
    });
  }
};
