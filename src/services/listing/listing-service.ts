import type { Listing } from "@/models/listing";

export default interface ListingService {
  add(listing: Listing): Promise<Response>;
}
