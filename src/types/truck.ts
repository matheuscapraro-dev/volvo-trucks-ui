import { Auditable } from "./auditable";

export type TruckModel = "FH" | "FM" | "VM";
export type Plant = "Brazil" | "Sweden" | "UnitedStates" | "France";

export interface Truck extends Auditable {
  id: string;
  model: TruckModel;
  manufacturingYear: number;
  chassisCode: string;
  color: string;
  plant: Plant;
}

export type CreateTruckPayload = Omit<Truck, "id" | keyof Auditable>;
export type UpdateTruckPayload = Omit<Truck, "chassisCode" | keyof Auditable>;
