import { ImmowebClassifiedObject } from "@/models/immoweb/immoweb-classified-object";
import type ScrapingService from "./scraping-service";
import type { ScrapedListing } from "@/models/scraped-listing";
import * as cheerio from "cheerio";

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

    const $ = await this.loadUrl(url);

    const classifiedObject = this.extractClassifiedObject($);

    // TODO: implement scraping
    return {
      id: classifiedObject.id.toString(),
      url,
      address: this.formatAddress(classifiedObject),
      rent: classifiedObject.transaction.rental.monthlyRentalPrice,
      costs: classifiedObject.transaction.rental.monthlyRentalCosts,
      bedrooms: this.formatBedrooms(classifiedObject),
      bathrooms: this.formatBathrooms(classifiedObject),
    };
  }

  private async loadUrl(url: string): Promise<cheerio.CheerioAPI> {
    const res = await fetch(url);
    if (res.status !== 200) {
      throw new Error(
        `Fetching "${url}" returned status "${res.status}". Expected status 200.`
      );
    }
    const html = await res.text();
    return cheerio.load(html);
  }

  private extractClassifiedObject(
    $: cheerio.CheerioAPI
  ): ImmowebClassifiedObject {
    const $scripts = $('script[type="text/javascript"]');

    const jsCode = $scripts
      .filter((_, el) => {
        const jsCode = $(el).text().trim();
        return jsCode.startsWith("window.classified");
      })
      .first()
      .text();

    const jsonStr = jsCode.substring(
      jsCode.indexOf("{"),
      jsCode.lastIndexOf("}") + 1
    );

    const json = JSON.parse(jsonStr);
    if (process.env.NODE_ENV === "development") {
      console.log(json);
    }

    return ImmowebClassifiedObject.parse(json);
  }

  private formatAddress(
    obj: ImmowebClassifiedObject
  ): ScrapedListing["address"] {
    return `${obj.property.location.street} ${obj.property.location.number}, ${obj.property.location.postalCode} ${obj.property.location.locality}`;
  }

  private formatBedrooms(
    obj: ImmowebClassifiedObject
  ): ScrapedListing["bedrooms"] {
    if (obj.property.bedrooms.length !== obj.property.bedroomCount) {
      return new Array(obj.property.bedroomCount).fill({ surfaceArea: null });
    }

    return obj.property.bedrooms.map((b) => ({ surfaceArea: b.surface }));
  }

  private formatBathrooms(
    obj: ImmowebClassifiedObject
  ): ScrapedListing["bathrooms"] {
    if (obj.property.bathrooms.length !== obj.property.bathroomCount) {
      return new Array(obj.property.bathroomCount).fill({ surfaceArea: null });
    }

    return obj.property.bathrooms.map((b) => ({ surfaceArea: b.surface }));
  }
}
