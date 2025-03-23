import Link from "next/link";
import ProductCard from "./ProductCard";

type Car = {
  _id: string;
  model: string;
  description: string;
  picture: string;
  seats: number;
  doors: number;
  largebags: number;
  smallbags: number;
  automatic: boolean;
  dayRate: number;
  __v: number;
  id: string;
};

type carJson = {
  success: boolean;
  count: number;
  data: Car[];
};

export default async function CarCatalog({ carJson }: { carJson: Promise<carJson> }) {
  const carJsonReady = await carJson;
  return (
    <div>
      <div>Explore {carJsonReady.count} models in our catalog</div>
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
          <Link href={`/car/${carItem.id}`} className="w-1/5">
            <ProductCard carName={carItem.model} imgSrc={carItem.picture} />
          </Link>
        ))}
      </div>
    </div>
  );
}
