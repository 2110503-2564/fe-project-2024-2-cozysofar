export interface ReservationItem {
  carId: string;
  carModel: string;
  numofDays: number;
  pickupDate: string;
  returnDate: string;
}

export interface CarItem {
  id: string;
  model: string;
}

export interface CarResponse {
  data: CarItem[];
}