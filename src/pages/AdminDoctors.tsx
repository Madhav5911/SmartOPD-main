import { useState, useEffect } from "react";
import AdminLayout from "@/components/AdminLayout";
import { departmentService } from "@/services/departmentService";
import { Department, Doctor } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const AdminDoctors = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      departmentService.getDoctors(),
      departmentService.getDepartments(),
    ]).then(([docs, depts]) => {
      setDoctors(docs);
      setDepartments(depts);
      setLoading(false);
    });
  }, []);

  const getDeptName = (id: string) => departments.find((d) => d.id === id)?.name ?? id;

  return (
    <AdminLayout>
      <div className="max-w-5xl">
        <h2 className="text-xl font-semibold text-foreground mb-6">
          Doctors
          {!loading && (
            <span className="ml-2 text-sm font-normal text-muted-foreground">
              ({doctors.length} total)
            </span>
          )}
        </h2>

        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-12 rounded-lg" />
            ))}
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50/50 hover:bg-gray-50/50 border-gray-100">
                    <TableHead className="font-semibold text-foreground/70">Name</TableHead>
                    <TableHead className="font-semibold text-foreground/70">Department</TableHead>
                    <TableHead className="font-semibold text-foreground/70">Specialization</TableHead>
                    <TableHead className="w-28 font-semibold text-foreground/70">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {doctors.map((doctor) => (
                    <TableRow key={doctor.id} className="hover:bg-gray-50/30 border-gray-100">
                      <TableCell className="font-medium text-foreground">{doctor.name}</TableCell>
                      <TableCell className="text-muted-foreground">{getDeptName(doctor.departmentId)}</TableCell>
                      <TableCell className="text-muted-foreground">{doctor.specialization}</TableCell>
                      <TableCell>
                      <Badge variant="outline" className={doctor.available ? "bg-blue-50 text-blue-700 border-blue-200" : "bg-red-50 text-red-700 border-red-200"}>
                          {doctor.available ? "Available" : "Unavailable"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminDoctors;
