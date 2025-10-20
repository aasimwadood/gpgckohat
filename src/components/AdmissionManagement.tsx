import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Badge } from "./ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Textarea } from "./ui/textarea";
import { ScrollArea } from "./ui/scroll-area";
import { Alert, AlertDescription } from "./ui/alert";
import { Plus, CheckCircle, XCircle, Eye, AlertTriangle, FileText, Download, DollarSign } from "lucide-react";
import { toast } from "sonner";

interface Student {
  id: string;
  studentId: string;
  fullName: string;
  meritCategory: string;
  meritNumber: number;
  department: string;
  program: string;
  contactNumber: string;
  email: string;
  cnic: string;
  status: string;
  createdBy: string;
  createdAt: string;
  approvedBy?: string;
  approvedAt?: string;
  registrationNumber?: string;
  semester?: number;
  fees?: {
    registrationFee: number;
    crfFee: number;
    admissionFee: number;
    tuitionFee: number;
    examinationFee: number;
    hostelFee?: number;
    transportFee?: number;
    total: number;
    paid: boolean;
    paidAt?: string;
    receiptNumber?: string;
  };
  cancelReason?: string;
  canceledBy?: string;
  canceledAt?: string;
}

interface AdmissionSettings {
  enabled: boolean;
  session: string;
  enabledBy?: string;
  enabledAt?: string;
}

interface AdmissionManagementProps {
  role: "hod" | "faculty" | "accountant";
  userName: string;
}

const meritCategories = [
  "Open Merit",
  "Local Area",
  "Special Merit",
  "Sports Quota",
  "College Employee Child",
  "Minority Quota",
  "Disabled Person Quota"
];

const departments = [
  "Computer Science",
  "Mathematics",
  "Physics",
  "Chemistry",
  "English",
  "Urdu",
  "Botany",
  "Zoology"
];

const programs = {
  "Computer Science": ["BS Computer Science", "MPhil Computer Science"],
  "Mathematics": ["BS Mathematics", "MPhil Mathematics", "MSc Mathematics"],
  "Physics": ["BS Physics", "MPhil Physics", "MSc Physics"],
  "Chemistry": ["BS Chemistry", "MPhil Chemistry", "MSc Chemistry"],
  "English": ["BS English", "MA English"],
  "Urdu": ["BS Urdu", "MA Urdu"],
  "Botany": ["BS Botany", "MPhil Botany", "MSc Botany"],
  "Zoology": ["BS Zoology", "MPhil Zoology", "MSc Zoology"]
};

const defaultFees = {
  registrationFee: 5000,
  crfFee: 3000,
  admissionFee: 10000,
  tuitionFee: 15000,
  examinationFee: 4000,
  total: 37000
};

export function AdmissionManagement({ role, userName }: AdmissionManagementProps) {
  const [admissionSettings, setAdmissionSettings] = useState<AdmissionSettings>({
    enabled: true,
    session: "2024-2025",
    enabledBy: "Dr. Ahmed Khan",
    enabledAt: "2024-09-01T10:00:00"
  });

  const [students, setStudents] = useState<Student[]>([
    {
      id: "1",
      studentId: "TEMP-001",
      fullName: "Ali Hassan",
      meritCategory: "Open Merit",
      meritNumber: 15,
      department: "Computer Science",
      program: "BS Computer Science",
      contactNumber: "+92-300-1234567",
      email: "ali.hassan@student.gpck.edu.pk",
      cnic: "17201-1234567-1",
      status: "Pending Fee Submission",
      createdBy: "Dr. Muhammad Asif",
      createdAt: "2024-09-15T14:30:00",
      fees: {
        ...defaultFees,
        paid: false
      }
    },
    {
      id: "2",
      studentId: "TEMP-002",
      fullName: "Fatima Khan",
      meritCategory: "Local Area",
      meritNumber: 8,
      department: "Mathematics",
      program: "BS Mathematics",
      contactNumber: "+92-301-9876543",
      email: "fatima.khan@student.gpck.edu.pk",
      cnic: "17201-9876543-2",
      status: "Fee Approved - Eligible for Enrollment",
      createdBy: "Dr. Sara Ahmed",
      createdAt: "2024-09-14T11:20:00",
      approvedBy: "Mr. Imran Ali (Accountant)",
      approvedAt: "2024-09-16T09:15:00",
      fees: {
        ...defaultFees,
        paid: true,
        paidAt: "2024-09-16T09:00:00",
        receiptNumber: "FEE-2024-001"
      }
    },
    {
      id: "3",
      studentId: "GPCK-2024-CS-001",
      fullName: "Ahmed Raza",
      meritCategory: "Sports Quota",
      meritNumber: 3,
      department: "Computer Science",
      program: "BS Computer Science",
      contactNumber: "+92-333-5555555",
      email: "ahmed.raza@student.gpck.edu.pk",
      cnic: "17201-5555555-5",
      status: "Admitted to 1st Semester",
      createdBy: "Dr. Muhammad Asif",
      createdAt: "2024-09-10T10:00:00",
      approvedBy: "Mr. Imran Ali (Accountant)",
      approvedAt: "2024-09-12T14:30:00",
      registrationNumber: "GPCK-2024-CS-001",
      semester: 1,
      fees: {
        ...defaultFees,
        paid: true,
        paidAt: "2024-09-12T14:00:00",
        receiptNumber: "FEE-2024-002"
      }
    }
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isFeeDialogOpen, setIsFeeDialogOpen] = useState(false);
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  // New student form state
  const [newStudent, setNewStudent] = useState({
    fullName: "",
    meritCategory: "",
    meritNumber: "",
    department: "",
    program: "",
    contactNumber: "",
    email: "",
    cnic: ""
  });

  const [cancelReason, setCancelReason] = useState("");
  const [feeDetails, setFeeDetails] = useState({
    receiptNumber: "",
    hostelFee: "",
    transportFee: ""
  });

  const handleEnableAdmission = () => {
    setAdmissionSettings({
      enabled: true,
      session: "2024-2025",
      enabledBy: userName,
      enabledAt: new Date().toISOString()
    });
    toast.success("Admission module enabled for session 2024-2025");
  };

  const handleDisableAdmission = () => {
    setAdmissionSettings({
      ...admissionSettings,
      enabled: false
    });
    toast.success("Admission module disabled");
  };

  const handleAddStudent = () => {
    if (!newStudent.fullName || !newStudent.meritCategory || !newStudent.department || !newStudent.program) {
      toast.error("Please fill all required fields");
      return;
    }

    const tempId = `TEMP-${String(students.length + 1).padStart(3, '0')}`;
    const student: Student = {
      id: String(students.length + 1),
      studentId: tempId,
      fullName: newStudent.fullName,
      meritCategory: newStudent.meritCategory,
      meritNumber: Number(newStudent.meritNumber),
      department: newStudent.department,
      program: newStudent.program,
      contactNumber: newStudent.contactNumber,
      email: newStudent.email,
      cnic: newStudent.cnic,
      status: "Pending Fee Submission",
      createdBy: userName,
      createdAt: new Date().toISOString(),
      fees: {
        ...defaultFees,
        paid: false
      }
    };

    setStudents([...students, student]);
    setIsAddDialogOpen(false);
    setNewStudent({
      fullName: "",
      meritCategory: "",
      meritNumber: "",
      department: "",
      program: "",
      contactNumber: "",
      email: "",
      cnic: ""
    });
    toast.success(`Student record created for ${student.fullName}`);
  };

  const handleApproveFee = () => {
    if (!selectedStudent || !feeDetails.receiptNumber) {
      toast.error("Please enter receipt number");
      return;
    }

    const updatedStudents = students.map(s => {
      if (s.id === selectedStudent.id) {
        return {
          ...s,
          status: "Fee Approved - Eligible for Enrollment",
          approvedBy: userName,
          approvedAt: new Date().toISOString(),
          fees: {
            ...s.fees!,
            hostelFee: feeDetails.hostelFee ? Number(feeDetails.hostelFee) : undefined,
            transportFee: feeDetails.transportFee ? Number(feeDetails.transportFee) : undefined,
            total: s.fees!.total + (feeDetails.hostelFee ? Number(feeDetails.hostelFee) : 0) + (feeDetails.transportFee ? Number(feeDetails.transportFee) : 0),
            paid: true,
            paidAt: new Date().toISOString(),
            receiptNumber: feeDetails.receiptNumber
          }
        };
      }
      return s;
    });

    setStudents(updatedStudents);
    setIsFeeDialogOpen(false);
    setFeeDetails({ receiptNumber: "", hostelFee: "", transportFee: "" });
    toast.success(`Fee approved for ${selectedStudent.fullName}`);
  };

  const handleConfirmAdmission = (studentId: string) => {
    const student = students.find(s => s.id === studentId);
    if (!student) return;

    const deptCode = student.department.substring(0, 2).toUpperCase();
    const regNumber = `GPCK-2024-${deptCode}-${String(students.filter(s => s.department === student.department && s.registrationNumber).length + 1).padStart(3, '0')}`;

    const updatedStudents = students.map(s => {
      if (s.id === studentId) {
        return {
          ...s,
          studentId: regNumber,
          status: "Admitted to 1st Semester",
          registrationNumber: regNumber,
          semester: 1
        };
      }
      return s;
    });

    setStudents(updatedStudents);
    toast.success(`Admission confirmed. Registration Number: ${regNumber}`);
  };

  const handleCancelAdmission = () => {
    if (!selectedStudent || !cancelReason) {
      toast.error("Please provide a reason for cancellation");
      return;
    }

    const updatedStudents = students.map(s => {
      if (s.id === selectedStudent.id) {
        return {
          ...s,
          status: "Admission Canceled",
          cancelReason: cancelReason,
          canceledBy: userName,
          canceledAt: new Date().toISOString()
        };
      }
      return s;
    });

    setStudents(updatedStudents);
    setIsCancelDialogOpen(false);
    setCancelReason("");
    toast.success(`Admission canceled for ${selectedStudent.fullName}`);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Pending Fee Submission":
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-300"><AlertTriangle className="h-3 w-3 mr-1" />Pending Fee</Badge>;
      case "Fee Approved - Eligible for Enrollment":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300"><CheckCircle className="h-3 w-3 mr-1" />Fee Approved</Badge>;
      case "Admitted to 1st Semester":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-300"><CheckCircle className="h-3 w-3 mr-1" />Admitted</Badge>;
      case "Admission Canceled":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-300"><XCircle className="h-3 w-3 mr-1" />Canceled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const generateReport = () => {
    toast.success("Admission report generated successfully");
  };

  return (
    <div className="space-y-6">
      {/* Admission Module Control - Only for HOD */}
      {role === "hod" && (
        <Card>
          <CardHeader>
            <CardTitle>Admission Module Control</CardTitle>
            <CardDescription>Enable or disable the admission module for the current session</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm">Current Session: <span className="font-semibold">{admissionSettings.session}</span></p>
                <p className="text-sm text-muted-foreground mt-1">
                  Status: {admissionSettings.enabled ? (
                    <span className="text-green-600">Enabled</span>
                  ) : (
                    <span className="text-red-600">Disabled</span>
                  )}
                </p>
                {admissionSettings.enabledBy && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Last modified by: {admissionSettings.enabledBy} on {new Date(admissionSettings.enabledAt!).toLocaleString()}
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                {admissionSettings.enabled ? (
                  <Button variant="destructive" onClick={handleDisableAdmission}>
                    <XCircle className="h-4 w-4 mr-2" />
                    Disable Admission
                  </Button>
                ) : (
                  <Button onClick={handleEnableAdmission}>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Enable Admission
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Add Student - Only for Faculty and HOD */}
      {(role === "faculty" || role === "hod") && admissionSettings.enabled && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Student Admission Records</CardTitle>
              <CardDescription>Create and manage new student admission records</CardDescription>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Student
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Create New Student Record</DialogTitle>
                  <DialogDescription>Enter student details for admission</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        value={newStudent.fullName}
                        onChange={(e) => setNewStudent({ ...newStudent, fullName: e.target.value })}
                        placeholder="Enter full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cnic">CNIC *</Label>
                      <Input
                        id="cnic"
                        value={newStudent.cnic}
                        onChange={(e) => setNewStudent({ ...newStudent, cnic: e.target.value })}
                        placeholder="17201-1234567-1"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="meritCategory">Merit Category *</Label>
                      <Select value={newStudent.meritCategory} onValueChange={(value) => setNewStudent({ ...newStudent, meritCategory: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {meritCategories.map((cat) => (
                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="meritNumber">Merit Number *</Label>
                      <Input
                        id="meritNumber"
                        type="number"
                        value={newStudent.meritNumber}
                        onChange={(e) => setNewStudent({ ...newStudent, meritNumber: e.target.value })}
                        placeholder="Enter merit number"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="department">Department *</Label>
                      <Select value={newStudent.department} onValueChange={(value) => setNewStudent({ ...newStudent, department: value, program: "" })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          {departments.map((dept) => (
                            <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="program">Program *</Label>
                      <Select value={newStudent.program} onValueChange={(value) => setNewStudent({ ...newStudent, program: value })} disabled={!newStudent.department}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select program" />
                        </SelectTrigger>
                        <SelectContent>
                          {newStudent.department && programs[newStudent.department as keyof typeof programs]?.map((prog) => (
                            <SelectItem key={prog} value={prog}>{prog}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="contactNumber">Contact Number *</Label>
                      <Input
                        id="contactNumber"
                        value={newStudent.contactNumber}
                        onChange={(e) => setNewStudent({ ...newStudent, contactNumber: e.target.value })}
                        placeholder="+92-300-1234567"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={newStudent.email}
                        onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                        placeholder="student@example.com"
                      />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
                  <Button onClick={handleAddStudent}>Create Student Record</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardHeader>
        </Card>
      )}

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Total Applications</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{students.length}</div>
            <p className="text-xs text-muted-foreground">For session {admissionSettings.session}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Pending Fees</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{students.filter(s => s.status === "Pending Fee Submission").length}</div>
            <p className="text-xs text-muted-foreground">Awaiting payment</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Fee Approved</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{students.filter(s => s.status === "Fee Approved - Eligible for Enrollment").length}</div>
            <p className="text-xs text-muted-foreground">Ready for admission</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Admitted</CardTitle>
            <CheckCircle className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{students.filter(s => s.status === "Admitted to 1st Semester").length}</div>
            <p className="text-xs text-muted-foreground">Successfully enrolled</p>
          </CardContent>
        </Card>
      </div>

      {/* Students List */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Admission Applications</CardTitle>
            <CardDescription>Manage student admission records and fee verification</CardDescription>
          </div>
          <Button variant="outline" onClick={generateReport}>
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All ({students.length})</TabsTrigger>
              <TabsTrigger value="pending">Pending Fee ({students.filter(s => s.status === "Pending Fee Submission").length})</TabsTrigger>
              <TabsTrigger value="approved">Fee Approved ({students.filter(s => s.status === "Fee Approved - Eligible for Enrollment").length})</TabsTrigger>
              <TabsTrigger value="admitted">Admitted ({students.filter(s => s.status === "Admitted to 1st Semester").length})</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <ScrollArea className="h-[500px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Merit</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created By</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {students.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell>{student.studentId}</TableCell>
                        <TableCell>{student.fullName}</TableCell>
                        <TableCell>{student.department}</TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>{student.meritCategory}</div>
                            <div className="text-muted-foreground">#{student.meritNumber}</div>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(student.status)}</TableCell>
                        <TableCell className="text-sm">{student.createdBy}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setSelectedStudent(student);
                                setIsViewDialogOpen(true);
                              }}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            {role === "accountant" && student.status === "Pending Fee Submission" && (
                              <Button
                                variant="default"
                                size="sm"
                                onClick={() => {
                                  setSelectedStudent(student);
                                  setIsFeeDialogOpen(true);
                                }}
                              >
                                <DollarSign className="h-4 w-4 mr-1" />
                                Verify Fee
                              </Button>
                            )}
                            {(role === "hod" || role === "faculty") && student.status === "Fee Approved - Eligible for Enrollment" && (
                              <Button
                                variant="default"
                                size="sm"
                                onClick={() => handleConfirmAdmission(student.id)}
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Confirm
                              </Button>
                            )}
                            {(role === "hod" || role === "faculty") && student.status === "Admitted to 1st Semester" && (
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => {
                                  setSelectedStudent(student);
                                  setIsCancelDialogOpen(true);
                                }}
                              >
                                <XCircle className="h-4 w-4 mr-1" />
                                Cancel
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="pending">
              <ScrollArea className="h-[500px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Program</TableHead>
                      <TableHead>Total Fee</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {students.filter(s => s.status === "Pending Fee Submission").map((student) => (
                      <TableRow key={student.id}>
                        <TableCell>{student.studentId}</TableCell>
                        <TableCell>{student.fullName}</TableCell>
                        <TableCell>{student.department}</TableCell>
                        <TableCell>{student.program}</TableCell>
                        <TableCell>PKR {student.fees?.total.toLocaleString()}</TableCell>
                        <TableCell>
                          {role === "accountant" && (
                            <Button
                              variant="default"
                              size="sm"
                              onClick={() => {
                                setSelectedStudent(student);
                                setIsFeeDialogOpen(true);
                              }}
                            >
                              <DollarSign className="h-4 w-4 mr-1" />
                              Verify Fee
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="approved">
              <ScrollArea className="h-[500px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Fee Receipt</TableHead>
                      <TableHead>Approved By</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {students.filter(s => s.status === "Fee Approved - Eligible for Enrollment").map((student) => (
                      <TableRow key={student.id}>
                        <TableCell>{student.studentId}</TableCell>
                        <TableCell>{student.fullName}</TableCell>
                        <TableCell>{student.department}</TableCell>
                        <TableCell>{student.fees?.receiptNumber}</TableCell>
                        <TableCell className="text-sm">{student.approvedBy}</TableCell>
                        <TableCell>
                          {(role === "hod" || role === "faculty") && (
                            <Button
                              variant="default"
                              size="sm"
                              onClick={() => handleConfirmAdmission(student.id)}
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Confirm Admission
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="admitted">
              <ScrollArea className="h-[500px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Registration No.</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Program</TableHead>
                      <TableHead>Semester</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {students.filter(s => s.status === "Admitted to 1st Semester").map((student) => (
                      <TableRow key={student.id}>
                        <TableCell>{student.registrationNumber}</TableCell>
                        <TableCell>{student.fullName}</TableCell>
                        <TableCell>{student.department}</TableCell>
                        <TableCell>{student.program}</TableCell>
                        <TableCell>{student.semester}st</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setSelectedStudent(student);
                                setIsViewDialogOpen(true);
                              }}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            {(role === "hod" || role === "faculty") && (
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => {
                                  setSelectedStudent(student);
                                  setIsCancelDialogOpen(true);
                                }}
                              >
                                <XCircle className="h-4 w-4 mr-1" />
                                Cancel
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* View Student Details Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Student Details</DialogTitle>
            <DialogDescription>Complete information about the student</DialogDescription>
          </DialogHeader>
          {selectedStudent && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Student ID</Label>
                  <p>{selectedStudent.studentId}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Status</Label>
                  <div className="mt-1">{getStatusBadge(selectedStudent.status)}</div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Full Name</Label>
                  <p>{selectedStudent.fullName}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">CNIC</Label>
                  <p>{selectedStudent.cnic}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Merit Category</Label>
                  <p>{selectedStudent.meritCategory}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Merit Number</Label>
                  <p>#{selectedStudent.meritNumber}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Department</Label>
                  <p>{selectedStudent.department}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Program</Label>
                  <p>{selectedStudent.program}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Contact Number</Label>
                  <p>{selectedStudent.contactNumber}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Email</Label>
                  <p>{selectedStudent.email}</p>
                </div>
              </div>

              {selectedStudent.registrationNumber && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-muted-foreground">Registration Number</Label>
                    <p>{selectedStudent.registrationNumber}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Semester</Label>
                    <p>{selectedStudent.semester}st Semester</p>
                  </div>
                </div>
              )}

              <div className="border-t pt-4">
                <Label className="text-muted-foreground">Fee Details</Label>
                <div className="mt-2 space-y-2">
                  <div className="flex justify-between"><span>Registration Fee:</span><span>PKR {selectedStudent.fees?.registrationFee.toLocaleString()}</span></div>
                  <div className="flex justify-between"><span>CRF Fee:</span><span>PKR {selectedStudent.fees?.crfFee.toLocaleString()}</span></div>
                  <div className="flex justify-between"><span>Admission Fee:</span><span>PKR {selectedStudent.fees?.admissionFee.toLocaleString()}</span></div>
                  <div className="flex justify-between"><span>Tuition Fee:</span><span>PKR {selectedStudent.fees?.tuitionFee.toLocaleString()}</span></div>
                  <div className="flex justify-between"><span>Examination Fee:</span><span>PKR {selectedStudent.fees?.examinationFee.toLocaleString()}</span></div>
                  {selectedStudent.fees?.hostelFee && (
                    <div className="flex justify-between"><span>Hostel Fee:</span><span>PKR {selectedStudent.fees.hostelFee.toLocaleString()}</span></div>
                  )}
                  {selectedStudent.fees?.transportFee && (
                    <div className="flex justify-between"><span>Transport Fee:</span><span>PKR {selectedStudent.fees.transportFee.toLocaleString()}</span></div>
                  )}
                  <div className="flex justify-between border-t pt-2"><span>Total:</span><span>PKR {selectedStudent.fees?.total.toLocaleString()}</span></div>
                  {selectedStudent.fees?.paid && (
                    <>
                      <div className="flex justify-between text-green-600"><span>Receipt Number:</span><span>{selectedStudent.fees.receiptNumber}</span></div>
                      <div className="flex justify-between text-sm text-muted-foreground"><span>Paid At:</span><span>{new Date(selectedStudent.fees.paidAt!).toLocaleString()}</span></div>
                    </>
                  )}
                </div>
              </div>

              <div className="border-t pt-4">
                <Label className="text-muted-foreground">Audit Trail</Label>
                <div className="mt-2 space-y-2 text-sm">
                  <p>Created by: {selectedStudent.createdBy} on {new Date(selectedStudent.createdAt).toLocaleString()}</p>
                  {selectedStudent.approvedBy && (
                    <p>Approved by: {selectedStudent.approvedBy} on {new Date(selectedStudent.approvedAt!).toLocaleString()}</p>
                  )}
                  {selectedStudent.canceledBy && (
                    <>
                      <p className="text-red-600">Canceled by: {selectedStudent.canceledBy} on {new Date(selectedStudent.canceledAt!).toLocaleString()}</p>
                      <p className="text-red-600">Reason: {selectedStudent.cancelReason}</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Fee Verification Dialog */}
      <Dialog open={isFeeDialogOpen} onOpenChange={setIsFeeDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Verify Fee Payment</DialogTitle>
            <DialogDescription>Record fee payment details for {selectedStudent?.fullName}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Alert>
              <AlertDescription>
                <div className="space-y-1">
                  <div className="flex justify-between"><span>Registration Fee:</span><span>PKR {selectedStudent?.fees?.registrationFee.toLocaleString()}</span></div>
                  <div className="flex justify-between"><span>CRF Fee:</span><span>PKR {selectedStudent?.fees?.crfFee.toLocaleString()}</span></div>
                  <div className="flex justify-between"><span>Admission Fee:</span><span>PKR {selectedStudent?.fees?.admissionFee.toLocaleString()}</span></div>
                  <div className="flex justify-between"><span>Tuition Fee:</span><span>PKR {selectedStudent?.fees?.tuitionFee.toLocaleString()}</span></div>
                  <div className="flex justify-between"><span>Examination Fee:</span><span>PKR {selectedStudent?.fees?.examinationFee.toLocaleString()}</span></div>
                  <div className="flex justify-between border-t mt-2 pt-2"><span>Total:</span><span>PKR {selectedStudent?.fees?.total.toLocaleString()}</span></div>
                </div>
              </AlertDescription>
            </Alert>

            <div className="space-y-2">
              <Label htmlFor="receiptNumber">Fee Receipt Number *</Label>
              <Input
                id="receiptNumber"
                value={feeDetails.receiptNumber}
                onChange={(e) => setFeeDetails({ ...feeDetails, receiptNumber: e.target.value })}
                placeholder="FEE-2024-XXX"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="hostelFee">Hostel Fee (Optional)</Label>
                <Input
                  id="hostelFee"
                  type="number"
                  value={feeDetails.hostelFee}
                  onChange={(e) => setFeeDetails({ ...feeDetails, hostelFee: e.target.value })}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="transportFee">Transport Fee (Optional)</Label>
                <Input
                  id="transportFee"
                  type="number"
                  value={feeDetails.transportFee}
                  onChange={(e) => setFeeDetails({ ...feeDetails, transportFee: e.target.value })}
                  placeholder="0"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsFeeDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleApproveFee}>Approve Fee Payment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Cancel Admission Dialog */}
      <Dialog open={isCancelDialogOpen} onOpenChange={setIsCancelDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel Admission</DialogTitle>
            <DialogDescription>Cancel admission for {selectedStudent?.fullName}</DialogDescription>
          </DialogHeader>
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              This action will cancel the student's admission. This can only be done within one month of admission.
            </AlertDescription>
          </Alert>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="cancelReason">Reason for Cancellation *</Label>
              <Textarea
                id="cancelReason"
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                placeholder="Enter detailed reason for cancellation..."
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCancelDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleCancelAdmission}>Confirm Cancellation</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
