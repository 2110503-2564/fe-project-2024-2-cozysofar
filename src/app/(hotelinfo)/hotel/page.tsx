import HotelCatalog from "@/components/HotelCatalog";
import getHotels from "@/libs/getHotels";
import { Suspense } from "react";
import { LinearProgress } from "@mui/material";

export default function Car() {
  const hotels = getHotels();

  return (
    <main className="text-center p-5">
      <h1 className="text-xl font-medium">Select Your Hotel</h1>
      <Suspense fallback = {<p>Loading ... <LinearProgress/></p>}>
        <HotelCatalog hotelJson={hotels} />
      </Suspense>
      
    </main>
  );
}
