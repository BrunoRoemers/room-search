import { ApiSubmitInput } from "@/models/api-submit-input";
import { tryDeserializeUsers } from "@/models/user";
import GoogleSheetsListingService from "@/services/listing/google-sheets-listing-service";
import { NextResponse } from "next/server";

const listingService = new GoogleSheetsListingService();

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

  const response = await listingService.add({
    id: "TODO",
    addedBy: currentUser.name,
    url: input.url,
    rating: input.rating,
  });

  return NextResponse.json(
    { message: response.statusText },
    { status: response.status }
  );
}
