import type { ScrapedListing } from "@/models/scraped-listing";

export default interface ScrapingService {
  supports(url: string): boolean;
  scrape(url: string): Promise<ScrapedListing>;
}
