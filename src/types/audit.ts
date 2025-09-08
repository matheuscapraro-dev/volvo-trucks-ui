export interface Audit {
  id: string;
  dateTimeUtc: string;
  action: "Insert" | "Update" | "Delete";
  entityId: string;
  userId: string | null;
  oldValues: string | null;
  newValues: string | null;
}
