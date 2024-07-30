import { ApiSubmitInput } from "@/models/api-submit-input";
import { tryDeserializeUsers } from "@/models/user";
import GoogleSheetsListingService from "@/services/listing/google-sheets-listing-service";
import ImmowebScrapingService from "@/services/scraping/immoweb-scraping-service";
import { NextResponse } from "next/server";

const listingService = new GoogleSheetsListingService();
const scrapingService = new ImmowebScrapingService();

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

  const scrapedListing = await scrapingService.scrape(input.url);

  const response = await listingService.add({
    ...scrapedListing,
    addedBy: currentUser.name,
    rating: input.rating,
  });

  return NextResponse.json(
    { message: response.statusText },
    { status: response.status }
  );
}
