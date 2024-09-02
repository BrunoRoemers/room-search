import type { Listing } from "@/models/listing";
import type ListingService from "./listing-service";
import { google } from "googleapis";

export default class GoogleSheetsListingService implements ListingService {
  // add a listing to the sheet
  public async add(listing: Listing): Promise<Response> {
    return this.upsert(listing);
  }

  // get the sheets API client
  private async getSheets(): Promise<any> {
    const auth = await google.auth.getClient({
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
    return google.sheets({ version: "v4", auth });
  }

  // convert a listing to an array with one value for each column
  private toRow(listing: Listing, writeProtectedValues = false) {
    const now = new Date();
    const bedroomSizes = listing.bedrooms.map((b) => b.surfaceArea).join(", ");
    const cellRef = (offset: number) => `indirect("R[0]C[${offset}]",false)`;
    return [
      /* id */ listing.id,
      /* url */ listing.url,
      /* address */ listing.address,
      /* added by */ writeProtectedValues ? listing.addedBy : null,
      /* stars */ listing.rating,
      /* rent */ listing.rent,
      /* charges */ listing.costs,
      /* correction */ writeProtectedValues ? 0 : null,
      /* total cost */ `=${cellRef(-1)}+${cellRef(-2)}+${cellRef(-3)}`,
      /* cost per room */ `=${cellRef(-1)}/${cellRef(2)}`,
      /* surface area */ listing.netHabitableSurface,
      /* number of bedrooms */ listing.bedrooms.length,
      /* bedroom sizes */ `'${bedroomSizes}`,
      /* number of bathrooms */ listing.bathrooms.length,
      /* garden */ listing.hasGarden,
      /* terrace */ listing.hasTerrace,
      /* EPC */ listing.epcScore,
      /* construction year */ listing.constructionYear ?? "",
      /* available from */ listing.availabilityDate.toDateString(),
      /* under option */ listing.isUnderOption,
      /* email */ listing.email,
      /* phone */ `'${listing.phoneNumber ?? ""}`,
      /* status */ "to contact",
      /* notes */ null,
      /* updated by */ listing.addedBy,
      /* updated on */ now.toISOString(),
      /* added on */ writeProtectedValues ? now.toISOString() : null,
    ];
  }

  // update the listing if it exists in the sheet, otherwise add it to the bottom
  private async upsert(listing: Listing): Promise<Response> {
    const rowNr = await this.getRowNumberOfValue("A", listing.id);
    if (rowNr === null) {
      return await this.append(listing);
    } else {
      return await this.update(rowNr, listing);
    }
  }

  // (over)write a specific row in the sheet
  private async update(rowNr: number, listing: Listing): Promise<Response> {
    const sheets = await this.getSheets();
    return await sheets.spreadsheets.values.update({
      spreadsheetId: process.env.NEXT_PUBLIC_SHEET_ID,
      range: `${process.env.SHEET_TAB_NAME}!A${rowNr}`,
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
        values: [this.toRow(listing, true)],
      },
    });
  }

  // search for a value in the given column and return the row number of the first match
  private async getRowNumberOfValue(
    column: string,
    value: string,
    skipLeadingRows = 1
  ): Promise<number | null> {
    const values = await this.fetchColumn(column, skipLeadingRows);
    const index = values.findIndex((v) => v === value);
    if (index === -1) {
      return null;
    }
    return index + skipLeadingRows + 1;
  }

  // fetch all values of the given column
  private async fetchColumn(
    column: string,
    skipLeadingRows = 1
  ): Promise<string[]> {
    const firstRowNr = skipLeadingRows + 1;
    const sheets = await this.getSheets();
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.NEXT_PUBLIC_SHEET_ID,
      range: `${process.env.SHEET_TAB_NAME}!${column}${firstRowNr}:${column}`,
      majorDimension: "COLUMNS",
    });
    return response.data.values?.[0] ?? [];
  }
}
