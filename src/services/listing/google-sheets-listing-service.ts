import type { Listing } from "@/models/listing";
import type ListingService from "./listing-service";
import { google } from "googleapis";

export default class GoogleSheetsListingService implements ListingService {
  // add a listing to the sheet
  async add(listing: Listing): Promise<Response> {
    // TODO if exists, update the listing
    return this.append(listing);
  }

  // get the sheets API client
  private async getSheets(): Promise<any> {
    const auth = await google.auth.getClient({
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
    return google.sheets({ version: "v4", auth });
  }

  // convert a listing to an array with one value for each column
  private toRow(listing: Listing) {
    return [
      listing.id,
      listing.addedBy,
      listing.url,
      listing.rating,
      listing.address,
      listing.rent,
      listing.costs,
      listing.bedrooms.length,
      listing.bathrooms.length,
      listing.availabilityDate.toDateString(),
    ];
  }

  // TODO upsert

  // TODO test
  private async update(range: string, listing: Listing): Promise<Response> {
    const sheets = await this.getSheets();
    // TODO fix
    return await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.NEXT_PUBLIC_SHEET_ID,
      range: `${process.env.SHEET_TAB_NAME}!${range}`,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [this.toRow(listing)],
      },
    });
  }

  // add a row to the bottom of the sheet
  private async append(listing: Listing): Promise<Response> {
    const sheets = await this.getSheets();
    return await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.NEXT_PUBLIC_SHEET_ID,
      range: process.env.SHEET_TAB_NAME,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [this.toRow(listing)],
      },
    });
  }
}
