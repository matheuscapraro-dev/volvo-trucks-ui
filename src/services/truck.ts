import { CreateTruckPayload, Truck, UpdateTruckPayload } from "@/types/truck";
import { apiClient } from "@/lib/api-client";
import { Audit } from "@/types/audit";

const TRUCKS_ENDPOINT = "/api/Trucks";

export const truckService = {
  getTrucks: (): Promise<Truck[]> => apiClient.get<Truck[]>(TRUCKS_ENDPOINT),

  createTruck: (payload: CreateTruckPayload): Promise<Truck> =>
    apiClient.post<Truck>(TRUCKS_ENDPOINT, payload),

  updateTruck: (payload: UpdateTruckPayload): Promise<void> =>
    apiClient.put<void>(`${TRUCKS_ENDPOINT}/${payload.id}`, payload),

  deleteTruck: (id: string): Promise<void> =>
    apiClient.del<void>(`${TRUCKS_ENDPOINT}/${id}`),

  getTruckAudits: (id: string): Promise<Audit[]> =>
    apiClient.get<Audit[]>(`${TRUCKS_ENDPOINT}/${id}/audits`),
};
