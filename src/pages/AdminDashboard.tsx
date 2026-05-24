import { useState, useEffect, useCallback } from "react";
import { Ticket, Users, ArrowRight, Loader2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import AdminLayout from "@/components/AdminLayout";
import { queueService } from "@/services/queueService";
import { departmentService } from "@/services/departmentService";
import { QueueState, Department, Doctor, QueueEntry } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const AdminDashboard = () => {
  const [queue, setQueue] = useState<QueueState | null>(null);
  const [entries, setEntries] = useState<QueueEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [calling, setCalling] = useState(false);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedDept, setSelectedDept] = useState("");
  const [selectedDoc, setSelectedDoc] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    departmentService.getDepartments().then((depts) => {
      setDepartments(depts);
      if (depts.length > 0) setSelectedDept(depts[0].id);
    });
  }, []);

  useEffect(() => {
    if (selectedDept) {
      departmentService.getDoctors(selectedDept).then((docs) => {
        setDoctors(docs);
        if (docs.length > 0) {
          setSelectedDoc(docs[0].id);
        } else {
          setSelectedDoc("");
        }
      });
    }
  }, [selectedDept]);

  const fetchQueue = useCallback(async () => {
    if (!selectedDoc) return;
    const [data, queueEntries] = await Promise.all([
      queueService.getQueueStatus(selectedDept, selectedDoc),
      queueService.getQueueEntries(selectedDoc),
    ]);
    setQueue(data);
    setEntries(queueEntries);
    setLoading(false);
  }, [selectedDept, selectedDoc]);

  useEffect(() => {
    if (selectedDoc) {
      setLoading(true);
      fetchQueue();
    } else {
      setQueue(null);
      setEntries([]);
      setLoading(false);
    }
  }, [selectedDoc, fetchQueue]);

  const handleCallNext = async () => {
    setCalling(true);
    const { newToken } = await queueService.callNextPatient(selectedDoc);
    toast({
      title: `Token ${newToken} called`,
      description: "The next patient has been notified.",
    });
    await fetchQueue();
    setCalling(false);
  };

  return (
    <AdminLayout>
      <div className="max-w-5xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-foreground">Overview</h2>
          <div className="flex gap-3">
            <Select value={selectedDept} onValueChange={setSelectedDept}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((d) => (
                  <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedDoc} onValueChange={setSelectedDoc}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Doctor" />
              </SelectTrigger>
              <SelectContent>
                {doctors.map((d) => (
                  <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-3 gap-4">
            <Skeleton className="h-40 rounded-xl" />
            <Skeleton className="h-40 rounded-xl" />
            <Skeleton className="h-40 rounded-xl" />
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
                  <span className="font-medium">Waiting Patients</span>
                </div>
                <p className="text-5xl font-bold text-foreground">{queue.waitingCount}</p>
              </div>

              <div className="bg-gradient-to-br from-blue-500/5 to-blue-500/10 border border-blue-500/20 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 text-sm text-blue-600/70 mb-4">
                  <Clock className="w-5 h-5 text-blue-500" />
                  <span className="font-medium">Est. Wait Time</span>
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
              className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {calling ? <Loader2 className="w-5 h-5 animate-spin" /> : <ArrowRight className="w-5 h-5" />}
              {calling ? "Calling..." : "Call Next Patient"}
            </button>

            {/* Queue table */}
            {entries.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50/50 hover:bg-gray-50/50">
                        <TableHead className="w-16 font-semibold text-foreground/70">Token</TableHead>
                        <TableHead className="font-semibold text-foreground/70">Patient</TableHead>
                        <TableHead className="font-semibold text-foreground/70">Type</TableHead>
                        <TableHead className="font-semibold text-foreground/70">Time</TableHead>
                        <TableHead className="font-semibold text-foreground/70">Est. Wait</TableHead>
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
                              {entry.type === "appointment" ? "Appointment" : "Walk-in"}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-muted-foreground">{entry.appointmentTime || "—"}</TableCell>
                          <TableCell className="text-muted-foreground">{entry.estimatedWaitMinutes} min</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={
                              entry.status === "in-progress" ? "bg-blue-50 text-blue-700 border-blue-200" :
                              entry.status === "completed" ? "bg-blue-50 text-blue-700 border-blue-200" :
                              "bg-orange-50 text-orange-700 border-orange-200"
                            }>
                              {entry.status === "in-progress" ? "In Progress" : entry.status === "completed" ? "Completed" : "Waiting"}
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

export default AdminDashboard;
