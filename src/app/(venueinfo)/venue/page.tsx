import VenueCatalog from "@/components/VenueCatalog";
import getVenues from "@/libs/getVenues";
interface VenueItem {
  _id: string;
  name: string;
  address: string;
  district: string;
  province: string;
  postalcode: string;
  tel: string;
  picture: string;
  dailyrate: number;
  __v: number;
  id: string;
}

interface VenueJson {
  success: boolean;
  count: number;
  pagination: Object;
  data: VenueItem[];
}

export default async function VenuesPage() {
  const venuePromise = await getVenues(); // Always defined

  return (
    <main className="text-center p-5">
      {venuePromise ? (
        <VenueCatalog venuesJson={venuePromise} />
      ) : (
        <p>Loading...</p>
      )}
    </main>
  );
}
