import type { Listing } from "@/models/listing";
import type ListingService from "./listing-service";
import { google } from "googleapis";

export default class GoogleSheetsListingService implements ListingService {
  async add(listing: Listing): Promise<Response> {
    const sheets = await this.getSheets();
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.NEXT_PUBLIC_SHEET_ID,
      range: process.env.SHEET_RANGE,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            listing.id,
            listing.addedBy,
            listing.url,
            listing.rating,
            listing.address,
            listing.rent,
            listing.costs,
            listing.bedrooms.length,
            listing.bathrooms.length,
          ],
        ],
      },
    });
    return response;
  }

  private async getSheets(): Promise<any> {
    const auth = await google.auth.getClient({
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
    return google.sheets({ version: "v4", auth });
  }
}
