"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreateTruckPayload, UpdateTruckPayload } from "@/types/truck";
import { toast } from "sonner";
import { truckService } from "@/services/truck";
import { handleApiError } from "@/lib/handle-api-error";

const TRUCKS_QUERY_KEY = ["trucks"];

export function useGetTrucks() {
  return useQuery({
    queryKey: TRUCKS_QUERY_KEY,
    queryFn: truckService.getTrucks,
  });
}

export function useCreateTruck() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateTruckPayload) =>
      truckService.createTruck(payload),
    onSuccess: () => {
      toast.success("Truck created successfully.");
      queryClient.invalidateQueries({ queryKey: ["trucks"] });
    },
    onError: (error) => handleApiError(error, "Failed to create truck."),
  });
}

export function useUpdateTruck() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateTruckPayload) =>
      truckService.updateTruck(payload),
    onSuccess: () => {
      toast.success("Truck updated successfully.");
      queryClient.invalidateQueries({ queryKey: TRUCKS_QUERY_KEY });
    },
    onError: (error) => handleApiError(error, "Failed to update truck."),
  });
}

export function useDeleteTruck() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => truckService.deleteTruck(id),
    onSuccess: () => {
      toast.success("Truck deleted successfully.");
      queryClient.invalidateQueries({ queryKey: TRUCKS_QUERY_KEY });
    },
    onError: (error) => handleApiError(error, "Failed to delete truck."),
  });
}

export function useGetTruckAudits(truckId: string | null) {
  return useQuery({
    queryKey: ["truckAudits", truckId],
    queryFn: () => truckService.getTruckAudits(truckId!),
    enabled: !!truckId,
  });
}
