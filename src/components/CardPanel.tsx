"use client";
import { useReducer } from "react";
import Card from "./Card";
import Link from "next/link";

/* Mock Data */
const mockVenueRepo = [
  { vid: "001", name: "The Bloom Pavilion", image: "/img/bloom.jpg" },
  { vid: "002", name: "Spark Space", image: "/img/sparkspace.jpg" },
  { vid: "003", name: "The Grand Table", image: "/img/grandtable.jpg" },
];
export default function CardPanel() {
  const ratingReducer = (
    ratingList: Map<string, number>,
    action: { type: string; venueName: string; rating: number }
  ) => {
    switch (action.type) {
      case "add": {
        return new Map(ratingList).set(action.venueName, action.rating);
      }
      case "remove": {
        const updatedList = new Map(ratingList);
        updatedList.delete(action.venueName);
        return updatedList;
      }
      default:
        return ratingList;
    }
  };

  const [ratingList, dispatchRating] = useReducer(
    ratingReducer,
    new Map([
      ["The Bloom Pavilion", 0],
      ["Spark Space", 0],
      ["The Grand Table", 0],
    ])
  );

  return (
    <div>
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
        {mockVenueRepo.map((venueItem) => (
          <Link href={`/venue/${venueItem.vid}`} className="w-1/5">
            <Card
              venueName={venueItem.name}
              imgSrc={venueItem.image}
              onRating={(venue: string, rating: number) =>
                dispatchRating({ type: "add", venueName: venue, rating })
              }
            />
          </Link>
        ))}
      </div>
      <div className="w-full text-xl font-medium">
        <h3>Venue List with Ratings : {ratingList.size}</h3>
        <ul>
          <ul>
            {Array.from(ratingList.entries()).map(([venue, rating]) => (
              <li
                data-testid={venue}
                key={venue}
                onClick={() =>
                  dispatchRating({
                    type: "remove",
                    venueName: venue,
                    rating: 0,
                  })
                }
              >
                {venue + " Rating"}: {rating}
              </li>
            ))}
          </ul>
        </ul>
      </div>
    </div>
  );
}
