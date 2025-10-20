import { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Checkbox } from '../../components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from '../../components/ui/dialog';
import FYPManagement from '../../components/FYPManagement';
import CourseFileReport from '../../components/CourseFileReport';
import { AdmissionManagement } from '../../components/AdmissionManagement';
import {
  LayoutDashboard, Users, CheckCircle, FileText, Upload,
  BookOpen, MessageSquare, Calendar, Eye, Edit, Trash2, Plus, Award, Download, UserPlus
} from 'lucide-react';
import { toast } from 'sonner';
import type { User } from '../../App';

interface FacultyDashboardProps {
  user: User;
  onLogout: () => void;
}

export default function FacultyDashboard({ user, onLogout }: FacultyDashboardProps) {
  const [activeView, setActiveView] = useState('overview');
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<'course' | 'assignment' | 'material' | 'grade' | 'view-assignment' | 'edit-material' | 'delete-material' | null>(null);
  const [assignmentForm, setAssignmentForm] = useState({
    course: '',
    title: '',
    description: '',
    dueDate: '',
    totalMarks: ''
  });
  const [materialForm, setMaterialForm] = useState({
    title: '',
    type: 'lecture'
  });
  const [gradeData, setGradeData] = useState<any>({});

  const navigation = [
    { name: 'Dashboard', icon: LayoutDashboard, onClick: () => setActiveView('overview') },
    { name: 'My Courses', icon: BookOpen, onClick: () => setActiveView('courses') },
    { name: 'Attendance', icon: CheckCircle, onClick: () => setActiveView('attendance') },
    { name: 'Assignments', icon: FileText, onClick: () => setActiveView('assignments') },
    { name: 'Upload Marks', icon: Upload, onClick: () => setActiveView('marks') },
    { name: 'Admissions', icon: UserPlus, onClick: () => setActiveView('admissions') },
    { name: 'Course Materials', icon: Upload, onClick: () => setActiveView('materials') },
    { name: 'Announcements', icon: MessageSquare, onClick: () => setActiveView('announcements') },
    { name: 'Class Schedule', icon: Calendar, onClick: () => setActiveView('schedule') },
    { name: 'FYP Supervision', icon: Award, onClick: () => setActiveView('fyp') },
    { name: 'Course File Report', icon: FileText, onClick: () => setActiveView('course-file') },
  ];

  const courses = [
    { code: 'CS-201', name: 'Data Structures', students: 45, section: 'A', credits: 3 },
    { code: 'CS-301', name: 'Database Systems', students: 38, section: 'B', credits: 3 },
    { code: 'CS-401', name: 'Software Engineering', students: 42, section: 'A', credits: 4 },
  ];

  const students = [
    { id: '2021-CS-101', name: 'Ahmed Khan', attendance: 85, marks: 82 },
    { id: '2021-CS-102', name: 'Sara Ali', attendance: 92, marks: 88 },
    { id: '2021-CS-103', name: 'Hassan Mahmood', attendance: 78, marks: 75 },
    { id: '2021-CS-104', name: 'Ayesha Siddiqui', attendance: 95, marks: 92 },
    { id: '2021-CS-105', name: 'Usman Tariq', attendance: 88, marks: 85 },
  ];

  const [assignments, setAssignments] = useState([
    { id: 1, course: 'CS-201', title: 'Binary Tree Implementation', dueDate: '2025-10-22', submissions: 35, total: 45, description: 'Implement a binary tree with insert, delete, and search operations' },
    { id: 2, course: 'CS-301', title: 'SQL Queries Practice', dueDate: '2025-10-25', submissions: 30, total: 38, description: 'Practice complex SQL queries with joins and subqueries' },
    { id: 3, course: 'CS-401', title: 'UML Diagrams Project', dueDate: '2025-10-28', submissions: 38, total: 42, description: 'Create UML diagrams for a complete software project' },
  ]);

  const [materials, setMaterials] = useState([
    { id: 1, course: 'CS-201', title: 'Lecture 1: Introduction', type: 'lecture' },
    { id: 2, course: 'CS-201', title: 'Lecture 2: Arrays', type: 'lecture' },
    { id: 3, course: 'CS-201', title: 'Lab Manual', type: 'lab' },
    { id: 4, course: 'CS-201', title: 'Assignment Guidelines', type: 'assignment' },
  ]);

  const [editMaterialData, setEditMaterialData] = useState<any>(null);

  const openDialog = (type: 'course' | 'assignment' | 'material' | 'grade' | 'view-assignment' | 'edit-material' | 'delete-material', data?: any) => {
    setDialogType(type as any);
    if (data) {
      if (type === 'assignment') {
        setAssignmentForm({
          course: data.course || '',
          title: data.title || '',
          description: data.description || '',
          dueDate: data.dueDate || '',
          totalMarks: data.totalMarks || '100'
        });
      } else if (type === 'grade') {
        setGradeData(data);
      } else if (type === 'edit-material') {
        setEditMaterialData(data);
        setMaterialForm({
          title: data.title || '',
          type: data.type || 'lecture'
        });
      }
    }
    setIsDialogOpen(true);
  };

  const handleCreateAssignment = () => {
    if (!assignmentForm.course || !assignmentForm.title || !assignmentForm.dueDate) {
      toast.error('Please fill in all required fields');
      return;
    }

    const newAssignment = {
      id: assignments.length + 1,
      course: assignmentForm.course,
      title: assignmentForm.title,
      description: assignmentForm.description,
      dueDate: assignmentForm.dueDate,
      submissions: 0,
      total: courses.find(c => c.code === assignmentForm.course)?.students || 0
    };

    setAssignments([...assignments, newAssignment]);
    toast.success('Assignment created successfully!');
    setIsDialogOpen(false);
    setAssignmentForm({ course: '', title: '', description: '', dueDate: '', totalMarks: '' });
  };

  const handleUploadMaterial = () => {
    if (!materialForm.title) {
      toast.error('Please enter material title');
      return;
    }

    const newMaterial = {
      id: materials.length + 1,
      course: selectedCourse?.code || 'CS-201',
      title: materialForm.title,
      type: materialForm.type
    };

    setMaterials([...materials, newMaterial]);
    toast.success('Material uploaded successfully!');
    setIsDialogOpen(false);
    setMaterialForm({ title: '', type: 'lecture' });
  };

  const handleDeleteMaterial = (id: number) => {
    setMaterials(materials.filter(m => m.id !== id));
    toast.success('Material deleted successfully!');
  };

  const handleGradeSubmission = () => {
    toast.success('Grades submitted successfully!');
    setIsDialogOpen(false);
  };

  return (
    <DashboardLayout user={user} onLogout={onLogout} navigation={navigation}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-gray-900 mb-2">Faculty Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user.name}!</p>
        </div>

        {activeView === 'overview' && (
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Courses</p>
                      <p className="text-gray-900">3</p>
                    </div>
                    <BookOpen className="w-10 h-10 text-blue-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Students</p>
                      <p className="text-gray-900">125</p>
                    </div>
                    <Users className="w-10 h-10 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Pending Assignments</p>
                      <p className="text-gray-900">22</p>
                    </div>
                    <FileText className="w-10 h-10 text-orange-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Today's Classes</p>
                      <p className="text-gray-900">2</p>
                    </div>
                    <Calendar className="w-10 h-10 text-purple-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* My Courses */}
            <Card>
              <CardHeader>
                <CardTitle>My Courses</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Course Code</TableHead>
                      <TableHead>Course Name</TableHead>
                      <TableHead>Section</TableHead>
                      <TableHead>Students</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {courses.map((course, index) => (
                      <TableRow key={index}>
                        <TableCell>{course.code}</TableCell>
                        <TableCell>{course.name}</TableCell>
                        <TableCell>{course.section}</TableCell>
                        <TableCell>{course.students}</TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setSelectedCourse(course);
                              openDialog('course', course);
                            }}
                          >
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Recent Assignments */}
            <Card>
              <CardHeader>
                <CardTitle>Assignment Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {assignments.map((assignment) => (
                    <div key={assignment.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="text-gray-900">{assignment.title}</h4>
                        <p className="text-sm text-gray-600">
                          {assignment.course} • Due: {assignment.dueDate}
                        </p>
                      </div>
                      <div className="text-right mr-4">
                        <p className="text-gray-900">{assignment.submissions}/{assignment.total}</p>
                        <p className="text-sm text-gray-600">Submissions</p>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openDialog('grade', assignment)}
                      >
                        Grade
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeView === 'courses' && (
          <Card>
            <CardHeader>
              <CardTitle>My Courses - Detailed View</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="cs-201">
                <TabsList className="mb-4">
                  <TabsTrigger value="cs-201">CS-201</TabsTrigger>
                  <TabsTrigger value="cs-301">CS-301</TabsTrigger>
                  <TabsTrigger value="cs-401">CS-401</TabsTrigger>
                </TabsList>
                <TabsContent value="cs-201">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <p className="text-sm text-gray-600">Course Code</p>
                        <p className="text-gray-900">CS-201</p>
                      </div>
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <p className="text-sm text-gray-600">Total Students</p>
                        <p className="text-gray-900">45</p>
                      </div>
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <p className="text-sm text-gray-600">Section</p>
                        <p className="text-gray-900">A</p>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <h4 className="text-gray-900 mb-4">Course Description</h4>
                      <p className="text-gray-600">
                        This course covers fundamental data structures including arrays, linked lists, stacks, queues, trees, and graphs.
                        Students will learn to implement and analyze these structures for efficient problem-solving.
                      </p>
                    </div>

                    <div className="border-t pt-4">
                      <h4 className="text-gray-900 mb-4">Student List</h4>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Student ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Attendance</TableHead>
                            <TableHead>Marks</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {students.map((student) => (
                            <TableRow key={student.id}>
                              <TableCell>{student.id}</TableCell>
                              <TableCell>{student.name}</TableCell>
                              <TableCell>{student.attendance}%</TableCell>
                              <TableCell>{student.marks}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="cs-301">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 bg-green-50 rounded-lg">
                        <p className="text-sm text-gray-600">Course Code</p>
                        <p className="text-gray-900">CS-301</p>
                      </div>
                      <div className="p-4 bg-green-50 rounded-lg">
                        <p className="text-sm text-gray-600">Total Students</p>
                        <p className="text-gray-900">38</p>
                      </div>
                      <div className="p-4 bg-green-50 rounded-lg">
                        <p className="text-sm text-gray-600">Section</p>
                        <p className="text-gray-900">B</p>
                      </div>
                    </div>
                    <div className="border-t pt-4">
                      <h4 className="text-gray-900 mb-4">Course Description</h4>
                      <p className="text-gray-600">
                        Comprehensive study of database concepts, design, and implementation. Topics include SQL, normalization,
                        transactions, and database security. Students will design and develop database applications.
                      </p>
                    </div>
                    <div className="border-t pt-4">
                      <h4 className="text-gray-900 mb-4">Student List</h4>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Student ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Attendance</TableHead>
                            <TableHead>Marks</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {students.slice(0, 3).map((student) => (
                            <TableRow key={student.id}>
                              <TableCell>{student.id.replace('CS', 'DB')}</TableCell>
                              <TableCell>{student.name}</TableCell>
                              <TableCell>{student.attendance - 2}%</TableCell>
                              <TableCell>{student.marks - 3}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="cs-401">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <p className="text-sm text-gray-600">Course Code</p>
                        <p className="text-gray-900">CS-401</p>
                      </div>
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <p className="text-sm text-gray-600">Total Students</p>
                        <p className="text-gray-900">42</p>
                      </div>
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <p className="text-sm text-gray-600">Section</p>
                        <p className="text-gray-900">A</p>
                      </div>
                    </div>
                    <div className="border-t pt-4">
                      <h4 className="text-gray-900 mb-4">Course Description</h4>
                      <p className="text-gray-600">
                        Study of software engineering principles, methodologies, and tools. Topics include requirements analysis,
                        design patterns, testing, and project management. Students work on team-based software projects.
                      </p>
                    </div>
                    <div className="border-t pt-4">
                      <h4 className="text-gray-900 mb-4">Student List</h4>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Student ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Attendance</TableHead>
                            <TableHead>Marks</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {students.map((student) => (
                            <TableRow key={student.id}>
                              <TableCell>{student.id.replace('CS', 'SE')}</TableCell>
                              <TableCell>{student.name}</TableCell>
                              <TableCell>{student.attendance + 3}%</TableCell>
                              <TableCell>{student.marks + 2}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )}

        {activeView === 'attendance' && (
          <Card>
            <CardHeader>
              <CardTitle>Mark Attendance</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="cs-201">
                <TabsList>
                  <TabsTrigger value="cs-201">CS-201</TabsTrigger>
                  <TabsTrigger value="cs-301">CS-301</TabsTrigger>
                  <TabsTrigger value="cs-401">CS-401</TabsTrigger>
                </TabsList>
                <TabsContent value="cs-201" className="mt-4">
                  <div className="mb-4">
                    <Label>Date</Label>
                    <Input type="date" className="max-w-xs" defaultValue={new Date().toISOString().split('T')[0]} />
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Present</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {students.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell>{student.id}</TableCell>
                          <TableCell>{student.name}</TableCell>
                          <TableCell>
                            <Checkbox defaultChecked />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <div className="mt-4">
                    <Button onClick={() => toast.success('Attendance submitted successfully!')}>
                      Submit Attendance
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="cs-301" className="mt-4">
                  <div className="mb-4">
                    <Label>Date</Label>
                    <Input type="date" className="max-w-xs" defaultValue={new Date().toISOString().split('T')[0]} />
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Present</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {students.slice(0, 3).map((student) => (
                        <TableRow key={student.id}>
                          <TableCell>{student.id.replace('CS', 'DB')}</TableCell>
                          <TableCell>{student.name}</TableCell>
                          <TableCell>
                            <Checkbox defaultChecked />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <div className="mt-4">
                    <Button onClick={() => toast.success('Attendance submitted successfully!')}>
                      Submit Attendance
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="cs-401" className="mt-4">
                  <div className="mb-4">
                    <Label>Date</Label>
                    <Input type="date" className="max-w-xs" defaultValue={new Date().toISOString().split('T')[0]} />
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Present</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {students.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell>{student.id.replace('CS', 'SE')}</TableCell>
                          <TableCell>{student.name}</TableCell>
                          <TableCell>
                            <Checkbox defaultChecked />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <div className="mt-4">
                    <Button onClick={() => toast.success('Attendance submitted successfully!')}>
                      Submit Attendance
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )}

        {activeView === 'assignments' && (
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Manage Assignments</CardTitle>
                <Button onClick={() => openDialog('assignment')}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Assignment
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Course</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Submissions</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assignments.map((assignment) => (
                    <TableRow key={assignment.id}>
                      <TableCell>{assignment.course}</TableCell>
                      <TableCell>{assignment.title}</TableCell>
                      <TableCell>{assignment.dueDate}</TableCell>
                      <TableCell>{assignment.submissions}/{assignment.total}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => openDialog('view-assignment', assignment)}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => openDialog('grade', assignment)}
                          >
                            Grade
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {activeView === 'marks' && (
          <Card>
            <CardHeader>
              <CardTitle>Upload Marks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label>Select Course</Label>
                    <select className="w-full p-2 border rounded-md">
                      <option>CS-201: Data Structures</option>
                      <option>CS-301: Database Systems</option>
                      <option>CS-401: Software Engineering</option>
                    </select>
                  </div>
                  <div>
                    <Label>Exam Type</Label>
                    <select className="w-full p-2 border rounded-md">
                      <option>Quiz 1</option>
                      <option>Quiz 2</option>
                      <option>Midterm</option>
                      <option>Final</option>
                      <option>Assignment</option>
                    </select>
                  </div>
                  <div>
                    <Label>Total Marks</Label>
                    <Input type="number" placeholder="100" />
                  </div>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Marks Obtained</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {students.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell>{student.id}</TableCell>
                        <TableCell>{student.name}</TableCell>
                        <TableCell>
                          <Input type="number" placeholder="0" className="w-24" />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <div className="flex gap-4">
                  <Button onClick={() => toast.success('Marks submitted successfully!')}>
                    Submit Marks
                  </Button>
                  <Button variant="outline">Import from Excel</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {activeView === 'materials' && (
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Course Materials</CardTitle>
                <Button onClick={() => openDialog('material')}>
                  <Upload className="w-4 h-4 mr-2" />
                  Upload New Material
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="cs-201">
                <TabsList>
                  <TabsTrigger value="cs-201">CS-201</TabsTrigger>
                  <TabsTrigger value="cs-301">CS-301</TabsTrigger>
                  <TabsTrigger value="cs-401">CS-401</TabsTrigger>
                </TabsList>
                <TabsContent value="cs-201" className="space-y-3 mt-4">
                  {materials.filter(m => m.course === 'CS-201').map((item) => (
                    <div key={item.id} className="flex justify-between items-center p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-blue-500" />
                        <span className="text-gray-900">{item.title}</span>
                        <Badge variant="outline">{item.type}</Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openDialog('edit-material', item)}
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openDialog('delete-material', item)}
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )}

        {activeView === 'announcements' && (
          <Card>
            <CardHeader>
              <CardTitle>Create Announcement</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label>Course</Label>
                  <select className="w-full p-2 border rounded-md">
                    <option>All Courses</option>
                    <option>CS-201: Data Structures</option>
                    <option>CS-301: Database Systems</option>
                    <option>CS-401: Software Engineering</option>
                  </select>
                </div>
                <div>
                  <Label>Subject</Label>
                  <Input placeholder="Enter announcement subject" />
                </div>
                <div>
                  <Label>Message</Label>
                  <Textarea rows={6} placeholder="Enter announcement message..." />
                </div>
                <Button onClick={() => toast.success('Announcement posted successfully!')}>
                  Post Announcement
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {activeView === 'schedule' && (
          <Card>
            <CardHeader>
              <CardTitle>My Class Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Time</TableHead>
                    <TableHead>Monday</TableHead>
                    <TableHead>Tuesday</TableHead>
                    <TableHead>Wednesday</TableHead>
                    <TableHead>Thursday</TableHead>
                    <TableHead>Friday</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>9:00 - 10:30</TableCell>
                    <TableCell>CS-201 (Sec A)</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>CS-201 (Sec A)</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>CS-201 (Sec A)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>10:45 - 12:15</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>CS-301 (Sec B)</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>CS-301 (Sec B)</TableCell>
                    <TableCell>-</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>1:30 - 3:00</TableCell>
                    <TableCell>CS-401 (Sec A)</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>CS-401 (Sec A)</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>Office Hours</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {activeView === 'fyp' && (
          <Card>
            <CardHeader>
              <CardTitle>FYP Supervision</CardTitle>
            </CardHeader>
            <CardContent>
              <FYPManagement role="faculty" />
            </CardContent>
          </Card>
        )}
        {activeView === 'course-file' && (
          <Card>
            <CardHeader>
              <CardTitle>Course File Report</CardTitle>
            </CardHeader>
            <CardContent>
              <CourseFileReport />
            </CardContent>
          </Card>
        )}
        {activeView === 'admissions' && (
          <Card>
            <CardHeader>
              <CardTitle>Admissions Management</CardTitle>
            </CardHeader>
            <CardContent>
              <AdmissionManagement role="faculty" userName={user.name} />
            </CardContent>
          </Card>
        )}
        {/* Dialogs */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            {dialogType === 'course' && selectedCourse && (
              <>
                <DialogHeader>
                  <DialogTitle>Course Details - {selectedCourse.name}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Course Code</Label>
                      <p className="text-gray-900">{selectedCourse.code}</p>
                    </div>
                    <div>
                      <Label>Section</Label>
                      <p className="text-gray-900">{selectedCourse.section}</p>
                    </div>
                    <div>
                      <Label>Total Students</Label>
                      <p className="text-gray-900">{selectedCourse.students}</p>
                    </div>
                    <div>
                      <Label>Credits</Label>
                      <p className="text-gray-900">{selectedCourse.credits}</p>
                    </div>
                  </div>
                  <div>
                    <Label>Description</Label>
                    <p className="text-gray-600">
                      Complete course covering all fundamental and advanced topics with practical implementations.
                    </p>
                  </div>
                </div>
              </>
            )}

            {dialogType === 'assignment' && (
              <>
                <DialogHeader>
                  <DialogTitle>Create New Assignment</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Select Course *</Label>
                    <select
                      className="w-full p-2 border rounded-md"
                      value={assignmentForm.course}
                      onChange={(e) => setAssignmentForm({ ...assignmentForm, course: e.target.value })}
                    >
                      <option value="">Select a course</option>
                      {courses.map(course => (
                        <option key={course.code} value={course.code}>
                          {course.code}: {course.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label>Assignment Title *</Label>
                    <Input
                      value={assignmentForm.title}
                      onChange={(e) => setAssignmentForm({ ...assignmentForm, title: e.target.value })}
                      placeholder="Enter assignment title"
                    />
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Textarea
                      value={assignmentForm.description}
                      onChange={(e) => setAssignmentForm({ ...assignmentForm, description: e.target.value })}
                      placeholder="Enter assignment description"
                      rows={4}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Due Date *</Label>
                      <Input
                        type="date"
                        value={assignmentForm.dueDate}
                        onChange={(e) => setAssignmentForm({ ...assignmentForm, dueDate: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>Total Marks</Label>
                      <Input
                        type="number"
                        value={assignmentForm.totalMarks}
                        onChange={(e) => setAssignmentForm({ ...assignmentForm, totalMarks: e.target.value })}
                        placeholder="100"
                      />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                  <Button onClick={handleCreateAssignment}>Create Assignment</Button>
                </DialogFooter>
              </>
            )}

            {dialogType === 'material' && (
              <>
                <DialogHeader>
                  <DialogTitle>Upload New Material</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Material Title *</Label>
                    <Input
                      value={materialForm.title}
                      onChange={(e) => setMaterialForm({ ...materialForm, title: e.target.value })}
                      placeholder="e.g., Lecture 5: Binary Trees"
                    />
                  </div>
                  <div>
                    <Label>Material Type</Label>
                    <select
                      className="w-full p-2 border rounded-md"
                      value={materialForm.type}
                      onChange={(e) => setMaterialForm({ ...materialForm, type: e.target.value })}
                    >
                      <option value="lecture">Lecture</option>
                      <option value="lab">Lab Manual</option>
                      <option value="assignment">Assignment</option>
                      <option value="reference">Reference Material</option>
                    </select>
                  </div>
                  <div>
                    <Label>Upload File</Label>
                    <Input type="file" />
                    <p className="text-xs text-gray-500 mt-1">Supported formats: PDF, PPT, DOCX (Max 10MB)</p>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                  <Button onClick={handleUploadMaterial}>Upload Material</Button>
                </DialogFooter>
              </>
            )}

            {dialogType === 'view-assignment' && gradeData && (
              <>
                <DialogHeader>
                  <DialogTitle>Assignment Details - {gradeData.title}</DialogTitle>
                  <DialogDescription>
                    {gradeData.course} • Due: {gradeData.dueDate}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-600">Total Submissions</p>
                      <p className="text-gray-900">{gradeData.submissions}/{gradeData.total}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">On Time</p>
                      <p className="text-gray-900">{gradeData.submissions - 2}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Late</p>
                      <p className="text-gray-900">2</p>
                    </div>
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Submission Time</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {students.slice(0, 5).map((student, idx) => (
                        <TableRow key={student.id}>
                          <TableCell>{student.id}</TableCell>
                          <TableCell>{student.name}</TableCell>
                          <TableCell>{idx % 3 === 0 ? gradeData.dueDate : '2025-10-' + (18 + idx)}</TableCell>
                          <TableCell>
                            <Badge variant={idx % 3 === 0 ? 'default' : 'secondary'}>
                              {idx % 3 === 0 ? 'On Time' : 'Late'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button size="sm" variant="outline">
                              <Download className="w-4 h-4 mr-1" />
                              Download
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Close</Button>
                  <Button onClick={() => {
                    setDialogType('grade');
                  }}>Grade Submissions</Button>
                </DialogFooter>
              </>
            )}
            {dialogType === 'grade' && gradeData && (
              <>
                <DialogHeader>
                  <DialogTitle>Grade Assignment - {gradeData.title}</DialogTitle>
                  <DialogDescription>
                    {gradeData.course} • Due: {gradeData.dueDate}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Submitted</TableHead>
                        <TableHead>Grade</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {students.slice(0, 5).map((student) => (
                        <TableRow key={student.id}>
                          <TableCell>{student.id}</TableCell>
                          <TableCell>{student.name}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-green-50">Yes</Badge>
                          </TableCell>
                          <TableCell>
                            <Input type="number" placeholder="0-100" className="w-20" />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                  <Button onClick={handleGradeSubmission}>Submit Grades</Button>
                </DialogFooter>
              </>
            )}

            {dialogType === 'edit-material' && editMaterialData && (
              <>
                <DialogHeader>
                  <DialogTitle>Edit Material - {editMaterialData.title}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Material Title *</Label>
                    <Input
                      value={materialForm.title}
                      onChange={(e) => setMaterialForm({ ...materialForm, title: e.target.value })}
                      placeholder="e.g., Lecture 5: Binary Trees"
                    />
                  </div>
                  <div>
                    <Label>Material Type</Label>
                    <select
                      className="w-full p-2 border rounded-md"
                      value={materialForm.type}
                      onChange={(e) => setMaterialForm({ ...materialForm, type: e.target.value })}
                    >
                      <option value="lecture">Lecture</option>
                      <option value="lab">Lab Manual</option>
                      <option value="assignment">Assignment</option>
                      <option value="reference">Reference Material</option>
                    </select>
                  </div>
                  <div>
                    <Label>Upload File</Label>
                    <Input type="file" />
                    <p className="text-xs text-gray-500 mt-1">Supported formats: PDF, PPT, DOCX (Max 10MB)</p>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                  <Button onClick={handleUploadMaterial}>Update Material</Button>
                </DialogFooter>
              </>
            )}

            {dialogType === 'delete-material' && editMaterialData && (
              <>
                <DialogHeader>
                  <DialogTitle>Delete Material - {editMaterialData.title}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <p className="text-gray-600">Are you sure you want to delete this material?</p>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                  <Button onClick={() => handleDeleteMaterial(editMaterialData.id)}>Delete Material</Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}