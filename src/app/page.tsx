"use client";

import * as React from "react";
import { Truck } from "@/types/truck";
import { useGetTrucks, useDeleteTruck } from "@/hooks/use-trucks";
import { getColumns } from "./trucks-table/columns";
import { DataTable } from "./trucks-table/data-table";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AuditLogDialog } from "@/components/audit-log-dialog";
import { TruckForm } from "./truck-form";
import { handleApiError } from "@/lib/handle-api-error";

export default function TrucksPage() {
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const [isAuditLogOpen, setIsAuditLogOpen] = React.useState(false);
  const [selectedTruck, setSelectedTruck] = React.useState<Truck | null>(null);

  const { data, isLoading, isError, error } = useGetTrucks();

  React.useEffect(() => {
    if (isError) handleApiError(error, "Failed to load trucks.");
  }, [isError, error]);

  const deleteMutation = useDeleteTruck();

  const handleOpenForm = React.useCallback((truck: Truck | null) => {
    setSelectedTruck(truck);
    setIsFormOpen(true);
  }, []);

  const handleCloseForm = React.useCallback(() => {
    setIsFormOpen(false);
    setSelectedTruck(null);
  }, []);

  const handleOpenDeleteDialog = React.useCallback((truck: Truck) => {
    setSelectedTruck(truck);
    setIsDeleteDialogOpen(true);
  }, []);

  const handleCloseDeleteDialog = React.useCallback(() => {
    setIsDeleteDialogOpen(false);
    setSelectedTruck(null);
  }, []);

  const handleDeleteConfirm = React.useCallback(() => {
    if (selectedTruck) {
      deleteMutation.mutate(selectedTruck.id, {
        onSuccess: handleCloseDeleteDialog,
      });
    }
  }, [selectedTruck, deleteMutation, handleCloseDeleteDialog]);

  const handleOpenAuditLog = React.useCallback((truck: Truck) => {
    setSelectedTruck(truck);
    setIsAuditLogOpen(true);
  }, []);

  const handleCloseAuditLog = React.useCallback(() => {
    setIsAuditLogOpen(false);
    setSelectedTruck(null);
  }, []);

  const columns = React.useMemo(
    () =>
      getColumns({
        onEdit: handleOpenForm,
        onDelete: handleOpenDeleteDialog,
        onViewAudits: handleOpenAuditLog,
      }),
    [handleOpenForm, handleOpenDeleteDialog, handleOpenAuditLog]
  );

  if (isLoading) {
    return (
      <div className="p-4 space-y-4">
        <div className="flex justify-between items-center">
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-10 w-44" />
        </div>

        <div className="flex space-x-2 mb-2">
          <Skeleton className="h-8 w-[150px] lg:w-[250px]" />
          <Skeleton className="h-8 w-[120px]" />
          <Skeleton className="h-8 w-[120px]" />
          <Skeleton className="h-8 w-[100px]" />
        </div>

        <div className="border rounded-md overflow-hidden">
          <div className="space-y-2 p-2">
            {[...Array(3)].map((_, rowIdx) => (
              <div key={rowIdx} className="grid grid-cols-[180px,120px gap-2">
                {[...Array(2)].map((_, colIdx) => (
                  <Skeleton key={colIdx} className="h-10 w-full" />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-96 rounded-md border border-dashed">
        <h2 className="text-xl font-semibold text-destructive">
          Error loading trucks
        </h2>
        <p className="text-muted-foreground">{error.message}</p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Trucks Management</h1>
        <Button onClick={() => handleOpenForm(null)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Truck
        </Button>
      </div>

      <DataTable columns={columns} data={data ?? []} />

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {selectedTruck ? "Edit Truck" : "Add New Truck"}
            </DialogTitle>
          </DialogHeader>
          <TruckForm truck={selectedTruck} onClose={handleCloseForm} />
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              truck with chassis code:{" "}
              <strong className="font-mono">
                {selectedTruck?.chassisCode}
              </strong>
              .
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCloseDeleteDialog}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              disabled={deleteMutation.isPending}
              className="bg-red-600 hover:bg-red-700"
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AuditLogDialog
        truckId={selectedTruck?.id ?? null}
        isOpen={isAuditLogOpen}
        onClose={handleCloseAuditLog}
      />
    </div>
  );
}
