export interface Auditable {
  createdOnUtc: string;
  createdBy: string | null;
  modifiedOnUtc: string | null;
  modifiedBy: string | null;
}
