import { useState, useEffect, useCallback } from "react";
import { Ticket, ArrowRight, Loader2, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AdminLayout from "@/components/AdminLayout";
import { queueService } from "@/services/queueService";
import { authService } from "@/services/authService";
import { QueueState, QueueEntry } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const DoctorMyQueue = () => {
  const [queue, setQueue] = useState<QueueState | null>(null);
  const [entries, setEntries] = useState<QueueEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [calling, setCalling] = useState(false);
  const { toast } = useToast();

  // TEMP doctor mapping
  const doctorId =
    authService.getCurrentUser()?.email?.includes("doc-5")
      ? "doc-5"
      : authService.getCurrentUser()?.email?.includes("doc-4")
      ? "doc-4"
      : "doc-1";

  const fetchQueue = useCallback(async () => {
    const [data, queueEntries] = await Promise.all([
      queueService.getQueueStatus(undefined, doctorId),
      queueService.getQueueEntries(doctorId),
    ]);

    setQueue(data);
    setEntries(queueEntries);
    setLoading(false);
  }, [doctorId]);

  useEffect(() => {
    fetchQueue();
    const interval = setInterval(fetchQueue, 5000);
    return () => clearInterval(interval);
  }, [fetchQueue]);

  const handleCallNext = async () => {
    setCalling(true);
    const { newToken } = await queueService.callNextPatient(doctorId);
    toast({ title: `Token ${newToken} called`, description: "Next patient notified." });
    await fetchQueue();
    setCalling(false);
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl">
        <h2 className="text-xl font-semibold text-foreground mb-6">My Queue</h2>

        {loading ? (
          <div className="grid md:grid-cols-3 gap-4">
            <Skeleton className="h-36 rounded-xl" />
            <Skeleton className="h-36 rounded-xl" />
            <Skeleton className="h-36 rounded-xl" />
          </div>
        ) : queue ? (
          <>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 text-sm text-primary/70 mb-4">
                  <Ticket className="w-5 h-5 text-primary" />
                  <span className="font-medium">Current Token</span>
                </div>
                <p className="text-5xl font-bold text-primary">{queue.currentToken}</p>
              </div>

              <div className="bg-gradient-to-br from-orange-500/5 to-orange-500/10 border border-orange-500/20 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 text-sm text-orange-600/70 mb-4">
                  <Users className="w-5 h-5 text-orange-500" />
                  <span className="font-medium">Waiting</span>
                </div>
                <p className="text-5xl font-bold text-foreground">{queue.waitingCount}</p>
              </div>

              <div className="bg-gradient-to-br from-blue-500/5 to-blue-500/10 border border-blue-500/20 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 text-sm text-blue-600/70 mb-4">
                  <Clock className="w-5 h-5 text-blue-500" />
                  <span className="font-medium">Est. Wait</span>
                </div>
                <p className="text-5xl font-bold text-foreground">
                  {queue.estimatedWaitMinutes}
                  <span className="text-lg text-muted-foreground ml-2">min</span>
                </p>
              </div>
            </div>

            <button 
              onClick={handleCallNext} 
              disabled={calling}
              className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all mb-8"
            >
              {calling ? <Loader2 className="w-5 h-5 animate-spin" /> : <ArrowRight className="w-5 h-5" />}
              {calling ? "Calling..." : "Call Next Patient"}
            </button>

            {entries.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50/50 hover:bg-gray-50/50 border-gray-100">
                        <TableHead className="w-16 font-semibold text-foreground/70">Token</TableHead>
                        <TableHead className="font-semibold text-foreground/70">Patient</TableHead>
                        <TableHead className="font-semibold text-foreground/70">Type</TableHead>
                        <TableHead className="font-semibold text-foreground/70">Wait</TableHead>
                        <TableHead className="w-28 font-semibold text-foreground/70">Status</TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      {entries.map((entry) => (
                        <TableRow key={entry.tokenNumber} className="hover:bg-gray-50/30 border-gray-100">
                          <TableCell className="font-bold text-primary text-lg">{entry.tokenNumber}</TableCell>
                          <TableCell className="font-medium text-foreground">{entry.patientName}</TableCell>

                          <TableCell>
                            <Badge variant="outline" className={entry.type === "appointment" ? "bg-blue-50 text-blue-700 border-blue-200" : "bg-gray-100 text-gray-700 border-gray-200"}>
                              {entry.type === "appointment" ? "Appt" : "Walk-in"}
                            </Badge>
                          </TableCell>

                          <TableCell className="text-muted-foreground">{entry.estimatedWaitMinutes} min</TableCell>

                          <TableCell>
                            <Badge variant="outline" className="capitalize bg-blue-50 text-blue-700 border-blue-200">
                              {entry.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}
          </>
        ) : null}
      </div>
    </AdminLayout>
  );
};

export default DoctorMyQueue;
