export interface ReservationItem {
  carId: string;
  carModel: string;
  numofDays: number;
  pickupDate: string;
  pickupLocation: string;
  returnDate: string;
  returnLocation: string;
}

export interface CarItem {
  id: string;
  model: string;
}

export interface CarResponse {
  data: CarItem[];
}