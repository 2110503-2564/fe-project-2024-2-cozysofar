import { useEffect, useState } from "react";
import Link from "next/link";
import Card from "./Card";

interface VenueItem {
  _id: string,
  name: string,
  address: string,
  district: string,
  province: string,
  postalcode: string,
  tel: string,
  picture: string,
  dailyrate: number,
  __v: number,
  id: string
}

interface VenueJson {
  success: boolean,
  count: number,
  pagination: Object,
  data: VenueItem[]
}

export default async function VenueCatalog( {venuesJson}: {venuesJson : Promise<VenueJson>} ) {
    const venuesJsonReady : VenueJson = await venuesJson 

  return (
    <div>
      <div>Explore {venuesJsonReady.count} venues in our catalog</div>
      <div
        style={{
          margin: "20px",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-around",
          alignContent: "space-around",
        }}
      >
        {venuesJsonReady.data.map((venueItem: VenueItem) => (
          <Link key={venueItem.id} href={`/venue/${venueItem.id}`} className="w-1/5">
            <Card venueName={venueItem.name} imgSrc={venueItem.picture} />
          </Link>
        ))}
      </div>
    </div>
  );
}
