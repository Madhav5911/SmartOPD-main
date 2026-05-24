import { useState, useEffect, useCallback } from "react";
import { Ticket, Users, RefreshCw, Clock } from "lucide-react";
import AdminLayout from "@/components/AdminLayout";
import { queueService } from "@/services/queueService";
import { departmentService } from "@/services/departmentService";
import { QueueState, Department, Doctor } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const QueueMonitor = () => {
  const [queue, setQueue] = useState<QueueState | null>(null);
  const [loading, setLoading] = useState(true);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedDept, setSelectedDept] = useState("");
  const [selectedDoc, setSelectedDoc] = useState("");

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
    const data = await queueService.getQueueStatus(selectedDept, selectedDoc);
    setQueue(data);
    setLoading(false);
  }, [selectedDept, selectedDoc]);

  useEffect(() => {
    if (selectedDoc) {
      setLoading(true);
      fetchQueue();
      const interval = setInterval(fetchQueue, 5000);
      return () => clearInterval(interval);
    } else {
      setQueue(null);
      setLoading(false);
    }
  }, [selectedDoc, fetchQueue]);

  return (
    <AdminLayout>
      <div className="max-w-3xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Queue Monitor</h2>
            <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
              <RefreshCw className="w-3 h-3 animate-spin text-primary" />
              Auto-updating every 5 seconds
            </p>
          </div>
          <div className="flex gap-3">
            <Select value={selectedDept} onValueChange={setSelectedDept}>
              <SelectTrigger className="w-[170px]">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((d) => (
                  <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedDoc} onValueChange={setSelectedDoc}>
              <SelectTrigger className="w-[180px]">
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
          <div className="space-y-4">
            <Skeleton className="h-48 rounded-xl" />
            <div className="grid grid-cols-2 gap-4">
              <Skeleton className="h-28 rounded-xl" />
              <Skeleton className="h-28 rounded-xl" />
            </div>
          </div>
        ) : queue ? (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-white rounded-xl p-12 text-center shadow-lg">
              <div className="flex items-center justify-center gap-2 text-primary-foreground/80 text-sm mb-4">
                <Ticket className="w-5 h-5" />
                <span className="font-medium">Now Serving</span>
              </div>
              <p className="text-8xl font-bold">{queue.currentToken}</p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-orange-500/5 to-orange-500/10 border border-orange-500/20 rounded-xl p-8 text-center shadow-sm">
                <div className="flex items-center justify-center gap-2 text-orange-600/70 text-sm mb-3">
                  <Users className="w-5 h-5 text-orange-500" />
                  <span className="font-medium">Waiting</span>
                </div>
                <p className="text-5xl font-bold text-foreground">{queue.waitingCount}</p>
              </div>
              <div className="bg-gradient-to-br from-blue-500/5 to-blue-500/10 border border-blue-500/20 rounded-xl p-8 text-center shadow-sm">
                <div className="flex items-center justify-center gap-2 text-blue-600/70 text-sm mb-3">
                  <Clock className="w-5 h-5 text-blue-500" />
                  <span className="font-medium">Est. Wait</span>
                </div>
                <p className="text-5xl font-bold text-foreground">{queue.estimatedWaitMinutes}<span className="text-2xl text-muted-foreground ml-2">min</span></p>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </AdminLayout>
  );
};

export default QueueMonitor;
