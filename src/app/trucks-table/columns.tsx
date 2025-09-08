"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Truck } from "@/types/truck";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";

interface ColumnActionsProps {
  onEdit: (truck: Truck) => void;
  onDelete: (truck: Truck) => void;
  onViewAudits: (truck: Truck) => void;
}

export const getColumns = ({
  onEdit,
  onDelete,
  onViewAudits,
}: ColumnActionsProps): ColumnDef<Truck>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "model",
    header: "Model",
  },
  {
    accessorKey: "manufacturingYear",
    header: "Year",
    enableSorting: true,
  },
  {
    accessorKey: "chassisCode",
    header: "Chassis Code",
  },
  {
    accessorKey: "color",
    header: "Color",
  },
  {
    accessorKey: "plant",
    header: "Plant",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const truck = row.original;
      return (
        <div className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => onViewAudits(truck)}>
                View audit history
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onEdit(truck)}>
                Edit truck
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-500 focus:bg-red-500/10 focus:text-red-500"
                onClick={() => onDelete(truck)}
              >
                Delete truck
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
