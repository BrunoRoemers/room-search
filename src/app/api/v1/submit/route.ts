import { Data } from "@/models/data";
import { tryDeserializeUsers } from "@/models/user";
import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const data = Data.parse(await request.json());

  const users = tryDeserializeUsers(process.env.API_USERS_BASE64!);
  const currentUser = users.find((u) => u.secret === data.secret);
  console.log(`current user: ${currentUser?.name}`);
  if (!currentUser) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

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
