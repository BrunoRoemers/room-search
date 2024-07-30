import type ScrapingService from "./scraping-service";
import type { ScrapedListing } from "@/models/scraped-listing";

export default class ImmowebScrapingService implements ScrapingService {
  supports(url: string): boolean {
    return (
      url.startsWith("https://www.immoweb.be/nl/zoekertje/") ||
      url.startsWith("https://www.immoweb.be/en/classified/") ||
      url.startsWith("https://www.immoweb.be/fr/annonce/")
    );
  }

  async scrape(url: string): Promise<ScrapedListing> {
    if (!this.supports(url)) {
      throw new Error("URL is not supported");
    }

    // TODO: implement scraping
    return {
      id: "TODO",
      url,
    };
  }
}
