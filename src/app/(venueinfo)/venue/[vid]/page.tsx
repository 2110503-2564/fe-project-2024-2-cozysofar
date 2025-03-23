import Image from "next/image";
import getVenue from "@/libs/getVenue";

export default async function CarDetailPage({
  params,
}: {
  params: { vid: string };
}) {
  const VenueDetail = await getVenue(params.vid);
  return (
    <main className="text-center p-5">
      <div className="flex flex-row my-5">
        <Image
          src={VenueDetail.data.picture}
          alt="Car Image"
          width={0}
          height={0}
          sizes="100vw"
          className="rounded-lg w-[30%]"
        />
        <div className="flex flex-col">
          <div className="text-md text-white mx-5 text-left">
            {VenueDetail.data.name}
          </div>
          <div className="text-md text-white mx-5 text-left">
            {VenueDetail.data.address}
          </div>
          <div className="text-md text-white mx-5 text-left">
            {VenueDetail.data.district}
          </div>
          <div className="text-md text-white mx-5 text-left">
            {VenueDetail.data.province}
          </div>
          <div className="text-md text-white mx-5 text-left">
            {VenueDetail.data.postalcode}
          </div>
          <div className="text-md text-white mx-5 text-left">
            {VenueDetail.data.tel}
          </div>
          <div className="text-md text-white mx-5 text-left">
            {VenueDetail.data.dailyrate}
          </div>
        </div>
      </div>
    </main>
  );
}
