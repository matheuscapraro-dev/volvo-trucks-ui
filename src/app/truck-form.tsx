"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Truck } from "@/types/truck";
import { useCreateTruck, useUpdateTruck } from "@/hooks/use-trucks";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const currentYear = new Date().getFullYear();
const truckSchema = z.object({
  model: z.enum(["FH", "FM", "VM"], {
    message: "Please select a valid model.",
  }),
  chassisCode: z.string().min(1, "Chassis code is required."),
  color: z.string().min(1, "Color is required."),
  manufacturingYear: z
    .number({
      message: "Year must be a number.",
    })
    .int({ message: "Year must be an integer." })
    .min(1980, { message: "Year must be 1980 or later." })
    .max(currentYear + 1, {
      message: "Year cannot be in the distant future.",
    }),
  plant: z.enum(["Brazil", "Sweden", "UnitedStates", "France"], {
    message: "Please select a valid plant.",
  }),
});

type TruckFormValues = z.infer<typeof truckSchema>;

interface TruckFormProps {
  truck?: Truck | null;
  onClose: () => void;
}

export function TruckForm({ truck, onClose }: TruckFormProps) {
  const isEditing = !!truck;

  const form = useForm<TruckFormValues>({
    resolver: zodResolver(truckSchema),
    defaultValues: isEditing
      ? truck
      : {
          model: undefined,
          manufacturingYear: currentYear,
          chassisCode: "",
          color: "",
          plant: undefined,
        },
  });

  const createMutation = useCreateTruck();
  const updateMutation = useUpdateTruck();

  const isPending = createMutation.isPending || updateMutation.isPending;

  const onSubmit = (values: TruckFormValues) => {
    if (isEditing) {
      updateMutation.mutate(
        { id: truck.id, ...values },
        { onSuccess: onClose }
      );
    } else {
      createMutation.mutate(values, { onSuccess: onClose });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="model"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Model</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a model" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="FH">FH</SelectItem>
                  <SelectItem value="FM">FM</SelectItem>
                  <SelectItem value="VM">VM</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="manufacturingYear"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Manufacturing Year</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder={`e.g., ${currentYear}`}
                  value={field.value ?? ""}
                  onChange={(e) => {
                    const val = e.target.value;
                    field.onChange(val === "" ? undefined : Number(val));
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="chassisCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Chassis Code</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g., YV2B4C3A9LB654321"
                  {...field}
                  disabled={isEditing}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Color</FormLabel>
              <FormControl>
                <Input placeholder="e.g., White" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="plant"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Plant</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a plant" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Brazil">Brazil</SelectItem>
                  <SelectItem value="Sweden">Sweden</SelectItem>
                  <SelectItem value="UnitedStates">United States</SelectItem>
                  <SelectItem value="France">France</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
