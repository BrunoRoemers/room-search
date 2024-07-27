import { Data } from "@/shared/data";
import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const data = Data.parse(await request.json());
  // TODO validate secret
  const auth = await google.auth.getClient({
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  const sheets = google.sheets({ version: "v4", auth });

  const response = await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.NEXT_PUBLIC_SHEET_ID,
    range: process.env.SHEET_RANGE,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [["hello world", "123"]],
    },
  });

  return NextResponse.json(
    { message: response.statusText },
    { status: response.status }
  );
}
