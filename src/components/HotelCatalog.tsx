import Link from "next/link";
import ProductCard from "./ProductCard";

type Hotel = {
  name : string;
  addaress : string;
  district : string;
  province : string;
  postalcode : string;
  tel : string;
  picture : string;
  description : string;
  id : string;
};

type hotelJson = {
  success: boolean;
  count: number;
  data: Hotel[];
};

export default async function HotelCatalog({ hotelJson }: { hotelJson: Promise<hotelJson> }) {
  const carJsonReady = await hotelJson;
  return (
    <div>
      <div>Explore {carJsonReady.count} Hotel in our catalog</div>
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
        {carJsonReady.data.map((carItem) => (
          <Link href={`/hotel/${carItem.id}`} className="w-1/5">
            <ProductCard carName={carItem.name} imgSrc={carItem.picture} />
          </Link>
        ))}
      </div>
    </div>
  );
}
