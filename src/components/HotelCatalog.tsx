import Link from "next/link";
import ProductCard from "./ProductCard";
import Image from "next/image";

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
            <div className="group relative overflow-hidden rounded-xl bg-gray-800 
                transition-all duration-300 border-white hover:scale-105 hover:shadow-2xl 
                hover:shadow-[#52D7F7]/20 hover:border hover:border-[#52D7F7]/30 ">
                {/* Image container */}
                <div className="relative h-48 overflow-hidden">
                    <Image
                        src={carItem.picture}
                        alt={carItem.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {/* Optional overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content container */}
                <div className="p-4">
                    <h3 className="text-xl font-semibold text-[#52D7F7] mb-2 
                        transition-colors duration-300 group-hover:text-white">
                        {carItem.name}
                    </h3>
                    
                </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
