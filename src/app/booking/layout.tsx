import ReservationMenu from "@/components/ReservationMenu";

export default function BookingLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-row p-2.5">
            {/*<ReservationMenu />*/}
            {children}
        </div>
    );
}