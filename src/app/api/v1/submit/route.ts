import { ApiSubmitInput } from "@/models/api-submit-input";
import { tryDeserializeUsers } from "@/models/user";
import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const input = ApiSubmitInput.parse(await request.json());
  const users = tryDeserializeUsers(process.env.API_USERS_BASE64!);
  const currentUser = users.find((u) => u.secret === input.secret);

  console.log(
    `user "${currentUser?.name}" wants to submit "${input.url}" with ${input.rating} star rating...`
  );

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
