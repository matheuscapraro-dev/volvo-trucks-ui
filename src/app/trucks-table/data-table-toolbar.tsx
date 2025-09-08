"use client";

import { Table } from "@tanstack/react-table";
import { X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";

const modelOptions = [
  { value: "FH", label: "FH" },
  { value: "FM", label: "FM" },
  { value: "VM", label: "VM" },
];

const plantOptions = [
  { value: "Brazil", label: "Brazil" },
  { value: "Sweden", label: "Sweden" },
  { value: "United States", label: "United States" },
  { value: "France", label: "France" },
];

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter by chassis code..."
          value={
            (table.getColumn("chassisCode")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("chassisCode")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("model") && (
          <DataTableFacetedFilter
            column={table.getColumn("model")}
            title="Model"
            options={modelOptions}
          />
        )}
        {table.getColumn("plant") && (
          <DataTableFacetedFilter
            column={table.getColumn("plant")}
            title="Plant"
            options={plantOptions}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="ml-2 h-9">
            Columns
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {table
            .getAllColumns()
            .filter((column) => column.getCanHide())
            .map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              );
            })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
