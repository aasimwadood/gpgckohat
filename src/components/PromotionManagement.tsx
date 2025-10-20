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
import { ScrollArea } from "./ui/scroll-area";
import { Alert, AlertDescription } from "./ui/alert";
import { CheckCircle, XCircle, Eye, AlertTriangle, TrendingUp, GraduationCap, FileText, DollarSign } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { Checkbox } from "./ui/checkbox";

interface PromotionStudent {
  id: string;
  registrationNumber: string;
  fullName: string;
  department: string;
  program: string;
  currentSemester: number;
  cgpa: number;
  academicStanding: "Pass" | "1st Probation" | "2nd Probation" | "Ceased";
  eligibleForPromotion: boolean;
  maxCourses: number;
  registeredCourses: string[];
  feeStatus: "Pending" | "Paid";
  promotionStatus: "Pending Registration" | "Registration Complete" | "Pending Fee" | "Promoted";
}

interface Course {
  id: string;
  code: string;
  name: string;
  creditHours: number;
  semester: number;
}

const availableCourses: Course[] = [
  { id: "1", code: "CS-201", name: "Data Structures", creditHours: 3, semester: 2 },
  { id: "2", code: "CS-202", name: "Object Oriented Programming", creditHours: 3, semester: 2 },
  { id: "3", code: "CS-203", name: "Database Systems", creditHours: 3, semester: 2 },
  { id: "4", code: "CS-204", name: "Discrete Mathematics", creditHours: 3, semester: 2 },
  { id: "5", code: "CS-205", name: "Computer Networks", creditHours: 3, semester: 2 },
  { id: "6", code: "MTH-201", name: "Linear Algebra", creditHours: 3, semester: 2 },
  { id: "7", code: "ENG-201", name: "Technical Writing", creditHours: 2, semester: 2 },
];

export function PromotionManagement({ role, userName }: { role: string; userName: string }) {
  const [students, setStudents] = useState<PromotionStudent[]>([
    {
      id: "1",
      registrationNumber: "GPCK-2023-CS-001",
      fullName: "Ahmed Raza",
      department: "Computer Science",
      program: "BS Computer Science",
      currentSemester: 1,
      cgpa: 3.2,
      academicStanding: "Pass",
      eligibleForPromotion: true,
      maxCourses: 7,
      registeredCourses: [],
      feeStatus: "Pending",
      promotionStatus: "Pending Registration"
    },
    {
      id: "2",
      registrationNumber: "GPCK-2023-CS-002",
      fullName: "Fatima Ali",
      department: "Computer Science",
      program: "BS Computer Science",
      currentSemester: 1,
      cgpa: 2.3,
      academicStanding: "1st Probation",
      eligibleForPromotion: true,
      maxCourses: 7,
      registeredCourses: ["CS-201", "CS-202", "CS-203"],
      feeStatus: "Pending",
      promotionStatus: "Registration Complete"
    },
    {
      id: "3",
      registrationNumber: "GPCK-2023-CS-003",
      fullName: "Hassan Khan",
      department: "Computer Science",
      program: "BS Computer Science",
      currentSemester: 1,
      cgpa: 1.8,
      academicStanding: "2nd Probation",
      eligibleForPromotion: true,
      maxCourses: 7,
      registeredCourses: ["CS-201", "CS-202", "MTH-201"],
      feeStatus: "Paid",
      promotionStatus: "Promoted"
    },
    {
      id: "4",
      registrationNumber: "GPCK-2023-CS-004",
      fullName: "Sara Ahmed",
      department: "Computer Science",
      program: "BS Computer Science",
      currentSemester: 1,
      cgpa: 1.5,
      academicStanding: "Ceased",
      eligibleForPromotion: true,
      maxCourses: 3,
      registeredCourses: ["CS-201", "CS-202", "CS-203"],
      feeStatus: "Pending",
      promotionStatus: "Pending Fee"
    }
  ]);

  const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isFeeDialogOpen, setIsFeeDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<PromotionStudent | null>(null);
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [feeReceiptNumber, setFeeReceiptNumber] = useState("");

  const getStandingBadge = (standing: string) => {
    switch (standing) {
      case "Pass":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300"><CheckCircle className="h-3 w-3 mr-1" />Pass</Badge>;
      case "1st Probation":
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-300"><AlertTriangle className="h-3 w-3 mr-1" />1st Probation</Badge>;
      case "2nd Probation":
        return <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-300"><AlertTriangle className="h-3 w-3 mr-1" />2nd Probation</Badge>;
      case "Ceased":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-300"><XCircle className="h-3 w-3 mr-1" />Ceased</Badge>;
      default:
        return <Badge>{standing}</Badge>;
    }
  };

  const getPromotionStatusBadge = (status: string) => {
    switch (status) {
      case "Pending Registration":
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-300">Pending Registration</Badge>;
      case "Registration Complete":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-300">Registration Complete</Badge>;
      case "Pending Fee":
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-300">Pending Fee</Badge>;
      case "Promoted":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300"><CheckCircle className="h-3 w-3 mr-1" />Promoted</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const handleCourseToggle = (courseCode: string) => {
    if (selectedCourses.includes(courseCode)) {
      setSelectedCourses(selectedCourses.filter(c => c !== courseCode));
    } else {
      if (selectedStudent && selectedCourses.length >= selectedStudent.maxCourses) {
        toast.error(`Maximum ${selectedStudent.maxCourses} courses allowed for ${selectedStudent.academicStanding} status`);
        return;
      }
      setSelectedCourses([...selectedCourses, courseCode]);
    }
  };

  const handleRegisterCourses = () => {
    if (!selectedStudent || selectedCourses.length === 0) {
      toast.error("Please select at least one course");
      return;
    }

    const updatedStudents = students.map(s => {
      if (s.id === selectedStudent.id) {
        return {
          ...s,
          registeredCourses: selectedCourses,
          promotionStatus: "Pending Fee" as const
        };
      }
      return s;
    });

    setStudents(updatedStudents);
    setIsRegisterDialogOpen(false);
    setSelectedCourses([]);
    toast.success(`Courses registered for ${selectedStudent.fullName}`);
  };

  const handleVerifyFee = () => {
    if (!selectedStudent || !feeReceiptNumber) {
      toast.error("Please enter receipt number");
      return;
    }

    const updatedStudents = students.map(s => {
      if (s.id === selectedStudent.id) {
        return {
          ...s,
          feeStatus: "Paid" as const,
          promotionStatus: "Promoted" as const
        };
      }
      return s;
    });

    setStudents(updatedStudents);
    setIsFeeDialogOpen(false);
    setFeeReceiptNumber("");
    toast.success(`Fee verified and student promoted to Semester ${selectedStudent.currentSemester + 1}`);
  };

  const handleConfirmPromotion = (studentId: string) => {
    const student = students.find(s => s.id === studentId);
    if (!student) return;

    const updatedStudents = students.map(s => {
      if (s.id === studentId) {
        return {
          ...s,
          currentSemester: s.currentSemester + 1,
          promotionStatus: "Pending Registration" as const,
          registeredCourses: [],
          feeStatus: "Pending" as const
        };
      }
      return s;
    });

    setStudents(updatedStudents);
    toast.success(`${student.fullName} promoted to Semester ${student.currentSemester + 1}`);
  };

  return (
    <div className="space-y-6">
      {/* Statistics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Eligible Students</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{students.filter(s => s.eligibleForPromotion).length}</div>
            <p className="text-xs text-muted-foreground">For next semester</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">On Probation</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{students.filter(s => s.academicStanding.includes("Probation")).length}</div>
            <p className="text-xs text-muted-foreground">Require attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Pending Fee</CardTitle>
            <DollarSign className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{students.filter(s => s.feeStatus === "Pending").length}</div>
            <p className="text-xs text-muted-foreground">Awaiting payment</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Promoted</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{students.filter(s => s.promotionStatus === "Promoted").length}</div>
            <p className="text-xs text-muted-foreground">Successfully promoted</p>
          </CardContent>
        </Card>
      </div>

      {/* Promotion List */}
      <Card>
        <CardHeader>
          <CardTitle>Student Promotion Management</CardTitle>
          <CardDescription>Manage course registration and semester promotions</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All ({students.length})</TabsTrigger>
              <TabsTrigger value="pending-reg">Pending Registration ({students.filter(s => s.promotionStatus === "Pending Registration").length})</TabsTrigger>
              <TabsTrigger value="pending-fee">Pending Fee ({students.filter(s => s.promotionStatus === "Pending Fee" || s.promotionStatus === "Registration Complete").length})</TabsTrigger>
              <TabsTrigger value="promoted">Promoted ({students.filter(s => s.promotionStatus === "Promoted").length})</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <ScrollArea className="h-[500px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Reg. No.</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Current Sem.</TableHead>
                      <TableHead>CGPA</TableHead>
                      <TableHead>Standing</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {students.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell>{student.registrationNumber}</TableCell>
                        <TableCell>{student.fullName}</TableCell>
                        <TableCell>{student.currentSemester}</TableCell>
                        <TableCell>
                          <span className={student.cgpa < 2.0 ? "text-red-600" : student.cgpa < 2.5 ? "text-yellow-600" : "text-green-600"}>
                            {student.cgpa.toFixed(2)}
                          </span>
                        </TableCell>
                        <TableCell>{getStandingBadge(student.academicStanding)}</TableCell>
                        <TableCell>{getPromotionStatusBadge(student.promotionStatus)}</TableCell>
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
                            {(role === "student" || role === "faculty" || role === "hod") && student.promotionStatus === "Pending Registration" && (
                              <Button
                                variant="default"
                                size="sm"
                                onClick={() => {
                                  setSelectedStudent(student);
                                  setSelectedCourses(student.registeredCourses);
                                  setIsRegisterDialogOpen(true);
                                }}
                              >
                                <FileText className="h-4 w-4 mr-1" />
                                Register
                              </Button>
                            )}
                            {role === "accountant" && (student.promotionStatus === "Pending Fee" || student.promotionStatus === "Registration Complete") && (
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
                            {(role === "hod" || role === "department") && student.promotionStatus === "Promoted" && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleConfirmPromotion(student.id)}
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Confirm
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

            <TabsContent value="pending-reg">
              <ScrollArea className="h-[500px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Reg. No.</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Current Sem.</TableHead>
                      <TableHead>Standing</TableHead>
                      <TableHead>Max Courses</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {students.filter(s => s.promotionStatus === "Pending Registration").map((student) => (
                      <TableRow key={student.id}>
                        <TableCell>{student.registrationNumber}</TableCell>
                        <TableCell>{student.fullName}</TableCell>
                        <TableCell>{student.currentSemester}</TableCell>
                        <TableCell>{getStandingBadge(student.academicStanding)}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{student.maxCourses} courses</Badge>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => {
                              setSelectedStudent(student);
                              setSelectedCourses(student.registeredCourses);
                              setIsRegisterDialogOpen(true);
                            }}
                          >
                            <FileText className="h-4 w-4 mr-1" />
                            Register Courses
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="pending-fee">
              <ScrollArea className="h-[500px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Reg. No.</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Courses Registered</TableHead>
                      <TableHead>Fee Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {students.filter(s => s.promotionStatus === "Pending Fee" || s.promotionStatus === "Registration Complete").map((student) => (
                      <TableRow key={student.id}>
                        <TableCell>{student.registrationNumber}</TableCell>
                        <TableCell>{student.fullName}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{student.registeredCourses.length} courses</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-300">
                            {student.feeStatus}
                          </Badge>
                        </TableCell>
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

            <TabsContent value="promoted">
              <ScrollArea className="h-[500px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Reg. No.</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Previous Sem.</TableHead>
                      <TableHead>Standing</TableHead>
                      <TableHead>Fee Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {students.filter(s => s.promotionStatus === "Promoted").map((student) => (
                      <TableRow key={student.id}>
                        <TableCell>{student.registrationNumber}</TableCell>
                        <TableCell>{student.fullName}</TableCell>
                        <TableCell>{student.currentSemester}</TableCell>
                        <TableCell>{getStandingBadge(student.academicStanding)}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">
                            {student.feeStatus}
                          </Badge>
                        </TableCell>
                        <TableCell>
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

      {/* Course Registration Dialog */}
      <Dialog open={isRegisterDialogOpen} onOpenChange={setIsRegisterDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Register Courses</DialogTitle>
            <DialogDescription>
              Select courses for {selectedStudent?.fullName} - Semester {selectedStudent ? selectedStudent.currentSemester + 1 : ""}
            </DialogDescription>
          </DialogHeader>
          {selectedStudent && (
            <div className="space-y-4">
              <Alert>
                <AlertDescription>
                  <div className="space-y-1">
                    <p><strong>Academic Standing:</strong> {selectedStudent.academicStanding}</p>
                    <p><strong>Maximum Courses Allowed:</strong> {selectedStudent.maxCourses}</p>
                    <p><strong>Current CGPA:</strong> {selectedStudent.cgpa.toFixed(2)}</p>
                    {selectedStudent.academicStanding !== "Pass" && (
                      <p className="text-yellow-600 mt-2">⚠️ Student is on {selectedStudent.academicStanding} status</p>
                    )}
                  </div>
                </AlertDescription>
              </Alert>

              <div className="space-y-2">
                <Label>Available Courses for Semester {selectedStudent.currentSemester + 1}</Label>
                <ScrollArea className="h-[300px] border rounded-md p-4">
                  <div className="space-y-3">
                    {availableCourses.map((course) => (
                      <div key={course.id} className="flex items-start space-x-3 p-3 border rounded-md hover:bg-gray-50">
                        <Checkbox
                          id={course.code}
                          checked={selectedCourses.includes(course.code)}
                          onCheckedChange={() => handleCourseToggle(course.code)}
                          disabled={!selectedCourses.includes(course.code) && selectedCourses.length >= selectedStudent.maxCourses}
                        />
                        <div className="flex-1">
                          <Label htmlFor={course.code} className="cursor-pointer">
                            <div>{course.code} - {course.name}</div>
                            <div className="text-sm text-muted-foreground">Credit Hours: {course.creditHours}</div>
                          </Label>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                <p className="text-sm text-muted-foreground">
                  Selected: {selectedCourses.length} / {selectedStudent.maxCourses} courses
                </p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRegisterDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleRegisterCourses}>Register Courses</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Student Details Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Student Promotion Details</DialogTitle>
            <DialogDescription>Complete information about student's promotion status</DialogDescription>
          </DialogHeader>
          {selectedStudent && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Registration Number</Label>
                  <p>{selectedStudent.registrationNumber}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Full Name</Label>
                  <p>{selectedStudent.fullName}</p>
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

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label className="text-muted-foreground">Current Semester</Label>
                  <p>{selectedStudent.currentSemester}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">CGPA</Label>
                  <p className={selectedStudent.cgpa < 2.0 ? "text-red-600" : selectedStudent.cgpa < 2.5 ? "text-yellow-600" : "text-green-600"}>
                    {selectedStudent.cgpa.toFixed(2)}
                  </p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Academic Standing</Label>
                  <div className="mt-1">{getStandingBadge(selectedStudent.academicStanding)}</div>
                </div>
              </div>

              <div>
                <Label className="text-muted-foreground">Promotion Status</Label>
                <div className="mt-1">{getPromotionStatusBadge(selectedStudent.promotionStatus)}</div>
              </div>

              {selectedStudent.registeredCourses.length > 0 && (
                <div>
                  <Label className="text-muted-foreground">Registered Courses</Label>
                  <div className="mt-2 space-y-2">
                    {selectedStudent.registeredCourses.map((courseCode, index) => {
                      const course = availableCourses.find(c => c.code === courseCode);
                      return (
                        <div key={index} className="flex justify-between border p-2 rounded">
                          <span>{courseCode} - {course?.name}</span>
                          <Badge variant="outline">{course?.creditHours} CH</Badge>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Fee Status</Label>
                  <Badge variant="outline" className={selectedStudent.feeStatus === "Paid" ? "bg-green-50 text-green-700 border-green-300" : "bg-yellow-50 text-yellow-700 border-yellow-300"}>
                    {selectedStudent.feeStatus}
                  </Badge>
                </div>
                <div>
                  <Label className="text-muted-foreground">Maximum Courses Allowed</Label>
                  <p>{selectedStudent.maxCourses} courses</p>
                </div>
              </div>

              {selectedStudent.academicStanding !== "Pass" && (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    Student is on <strong>{selectedStudent.academicStanding}</strong> status. 
                    {selectedStudent.academicStanding === "Ceased" && " Can only register maximum 3 courses."}
                    {selectedStudent.academicStanding === "2nd Probation" && " This is the final warning."}
                  </AlertDescription>
                </Alert>
              )}
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
            <DialogTitle>Verify Semester Fee</DialogTitle>
            <DialogDescription>Record fee payment for {selectedStudent?.fullName}</DialogDescription>
          </DialogHeader>
          {selectedStudent && (
            <div className="space-y-4 py-4">
              <Alert>
                <AlertDescription>
                  <div className="space-y-1">
                    <div className="flex justify-between"><span>Tuition Fee:</span><span>PKR 15,000</span></div>
                    <div className="flex justify-between"><span>Examination Fee:</span><span>PKR 4,000</span></div>
                    <div className="flex justify-between"><span>Lab Fee:</span><span>PKR 2,000</span></div>
                    <div className="flex justify-between border-t mt-2 pt-2"><span>Total:</span><span>PKR 21,000</span></div>
                  </div>
                </AlertDescription>
              </Alert>

              <div className="space-y-2">
                <Label htmlFor="feeReceipt">Fee Receipt Number *</Label>
                <Input
                  id="feeReceipt"
                  value={feeReceiptNumber}
                  onChange={(e) => setFeeReceiptNumber(e.target.value)}
                  placeholder="FEE-2024-XXX"
                />
              </div>

              <div className="bg-blue-50 p-3 rounded-md">
                <p className="text-sm text-blue-900">
                  After fee verification, the student will be automatically promoted to Semester {selectedStudent.currentSemester + 1}.
                </p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsFeeDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleVerifyFee}>Verify & Promote</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
