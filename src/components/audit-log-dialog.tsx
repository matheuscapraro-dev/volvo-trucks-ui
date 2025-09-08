"use client";

import { useGetTruckAudits } from "@/hooks/use-trucks";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Audit } from "@/types/audit";

interface AuditLogDialogProps {
  truckId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

const ValueDisplay = ({ jsonString }: { jsonString: string | null }) => {
  if (!jsonString || jsonString.trim() === "" || jsonString.trim() === "{}") {
    return <span className="text-muted-foreground/50">N/A</span>;
  }

  try {
    const data: unknown = JSON.parse(jsonString);

    let entries: [string, unknown][] = [];

    if (Array.isArray(data)) {
      const values = data as { Key: string; Value: unknown }[];
      entries = values.map(({ Key, Value }) => [Key, Value]);
    } else if (typeof data === "object" && data !== null) {
      entries = Object.entries(data);
    }

    if (entries.length === 0) {
      return <span className="text-muted-foreground/50">N/A</span>;
    }

    return (
      <div className="space-y-1">
        {entries.map(([Key, Value]) => (
          <div key={Key} className="flex text-xs">
            <span className="w-2/5 font-semibold text-muted-foreground">
              {Key}:
            </span>
            <span className="w-3/5 font-mono">{String(Value)}</span>
          </div>
        ))}
      </div>
    );
  } catch (error) {
    console.error("Invalid JSON:", error);
    return <span className="text-destructive text-xs">Invalid format</span>;
  }
};

export function AuditLogDialog({
  truckId,
  isOpen,
  onClose,
}: AuditLogDialogProps) {
  const { data, isLoading, isError } = useGetTruckAudits(truckId);

  const getActionVariant = (action: Audit["action"]) => {
    switch (action) {
      case "Insert":
        return "default";
      case "Update":
        return "secondary";
      case "Delete":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[80vw] sm:max-w-[80vw]">
        <DialogHeader>
          <DialogTitle>Audit History</DialogTitle>
        </DialogHeader>
        <div className="max-h-[70vh] overflow-y-auto p-0 m-0">
          {isLoading && (
            <div className="space-y-2 p-4">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          )}
          {isError && (
            <p className="text-destructive text-center p-4">
              Failed to load history.
            </p>
          )}
          {data && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Action</TableHead>
                  <TableHead className="w-[180px]">Date (UTC)</TableHead>
                  <TableHead className="w-auto">Old Values</TableHead>
                  <TableHead className="w-auto">New Values</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((log: Audit) => (
                  <TableRow key={log.id}>
                    <TableCell>
                      <Badge variant={getActionVariant(log.action)}>
                        {log.action}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-mono text-xs">
                      {new Date(log.dateTimeUtc).toLocaleString()}
                    </TableCell>
                    <TableCell className="max-w-20">
                      <ValueDisplay jsonString={log.oldValues} />
                    </TableCell>
                    <TableCell className="max-w-20">
                      <ValueDisplay jsonString={log.newValues} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
