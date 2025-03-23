import Image from "next/image";
import getCar from "@/libs/getCar";
import Link from "next/link";

export default async function CarDetailPage({
  params,
}: {
  params: { cid: string };
}) {
  const CarDetail = await getCar(params.cid);
  /*
    Mock Data for Demonstration Only 
    { cid: "001", name: "Batmobile", image: "/img/batmobile.jpg" },
    { cid: "002", name: "DeLorean", image: "/img/delorean.jpg" },
    { cid: "003", name: "Mr.Bean's Car", image: "/img/mrbean.jpg" },
    { cid: "004", name: "Mystery Machine", image: "/img/mystery_machine.jpg" }, 
  const mockCarRepo = new Map();
  mockCarRepo.set("001", { name: "Batmobile", image: "/img/batmobile.jpg" });
  mockCarRepo.set("002", { name: "DeLorean", image: "/img/delorean.jpg" });
  mockCarRepo.set("003", { name: "Mr.Bean's Car", image: "/img/mrbean.jpg" });
  mockCarRepo.set("004", { name: "Mystery Machine", image: "/img/mystery_machine.jpg"});
  */

  return (
    <main className="text-center p-5">
      <h1 className="text-lg font-medium">{CarDetail.data.model}</h1>
      <div className="flex flex-row my-5">
        <Image
          src={CarDetail.data.picture}
          alt="Car Image"
          width={0}
          height={0}
          sizes="100vw"
          className="rounded-lg w-[30%]"
        />
        <div className="flex flex-col">
          <div className="text-md mx-5 text-left">
            Description : {CarDetail.data.description}
          </div>
          <div className="text-md mx-5 text-left">
            Doors : {CarDetail.data.doors}
          </div>
          <div className="text-md mx-5 text-left">
            Seats : {CarDetail.data.seats}
          </div>
          <div className="text-md mx-5 text-left">
            Large Bags : {CarDetail.data.largebags}
          </div>
          <div className="text-md mx-5 text-left">
            Small Bags: {CarDetail.data.smallbags}
          </div>
          <div className="text-md mx-5 text-left">
            Daily Rental Rate : {CarDetail.data.dayRate} (insurance included)
          </div>
          <Link
            href={`/reservations?id=${params.cid}&model=${CarDetail.data.model}`}
          >
            <button
              className="block bg-[#181A1B] text-[#52D7F7] border border-[#52D7F7] 
          font-semibold py-2 px-4 m-2 rounded z-30 bottom-0 right-0 hover:bg-[#52D7F7]
          hover:text-[#181A1B] hover:boarder-transparent"
            >
              Make Reservation
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}