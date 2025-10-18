import { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Progress } from '../../components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '../../components/ui/dialog';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import {
  LayoutDashboard, Calendar, BookOpen, FileText, DollarSign,
  Bell, User as UserIcon, CheckCircle, Clock, AlertCircle, TrendingUp, Download, Eye, Upload
} from 'lucide-react';
import { toast } from 'sonner';
import type { User } from '../../App';

interface StudentDashboardProps {
  user: User;
  onLogout: () => void;
}

export default function StudentDashboard({ user, onLogout }: StudentDashboardProps) {
  const [activeView, setActiveView] = useState('overview');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<'attendance' | 'assignment' | 'payment' | 'material' | 'fyp-submit' | null>(null);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const navigation = [
    { name: 'Dashboard', icon: LayoutDashboard, onClick: () => setActiveView('overview') },
    { name: 'My Timetable', icon: Calendar, onClick: () => setActiveView('timetable') },
    { name: 'Attendance', icon: CheckCircle, onClick: () => setActiveView('attendance') },
    { name: 'Assignments', icon: FileText, onClick: () => setActiveView('assignments') },
    { name: 'Results & Grades', icon: TrendingUp, onClick: () => setActiveView('results') },
    { name: 'Fee Payment', icon: DollarSign, onClick: () => setActiveView('fees') },
    { name: 'Course Materials', icon: BookOpen, onClick: () => setActiveView('materials') },
    { name: 'Final Year Project', icon: FileText, onClick: () => setActiveView('fyp') },
    { name: 'Profile', icon: UserIcon, onClick: () => setActiveView('profile') },
  ];

  const notifications = [
    { id: 1, message: 'Mid-term exam schedule released', type: 'info', time: '2 hours ago' },
    { id: 2, message: 'New assignment posted in Data Structures', type: 'warning', time: '5 hours ago' },
    { id: 3, message: 'Fee payment deadline: Oct 25', type: 'urgent', time: '1 day ago' },
  ];

  const attendanceData = [
    {
      course: 'Data Structures',
      present: 25,
      total: 30,
      percentage: 83,
      details: [
        { date: '2025-10-15', status: 'Present' },
        { date: '2025-10-13', status: 'Present' },
        { date: '2025-10-10', status: 'Absent' },
        { date: '2025-10-08', status: 'Present' },
        { date: '2025-10-06', status: 'Present' },
      ]
    },
    {
      course: 'Database Systems',
      present: 28,
      total: 30,
      percentage: 93,
      details: [
        { date: '2025-10-15', status: 'Present' },
        { date: '2025-10-12', status: 'Present' },
        { date: '2025-10-09', status: 'Present' },
        { date: '2025-10-07', status: 'Present' },
        { date: '2025-10-05', status: 'Absent' },
      ]
    },
    {
      course: 'Web Development',
      present: 22,
      total: 30,
      percentage: 73,
      details: [
        { date: '2025-10-14', status: 'Present' },
        { date: '2025-10-11', status: 'Absent' },
        { date: '2025-10-09', status: 'Present' },
        { date: '2025-10-07', status: 'Absent' },
        { date: '2025-10-04', status: 'Present' },
      ]
    },
    {
      course: 'Software Engineering',
      present: 27,
      total: 30,
      percentage: 90,
      details: [
        { date: '2025-10-16', status: 'Present' },
        { date: '2025-10-14', status: 'Present' },
        { date: '2025-10-11', status: 'Present' },
        { date: '2025-10-09', status: 'Absent' },
        { date: '2025-10-07', status: 'Present' },
      ]
    },
  ];

  const assignments = [
    {
      id: 1,
      course: 'Data Structures',
      title: 'Binary Tree Implementation',
      dueDate: '2025-10-22',
      status: 'pending',
      description: 'Implement a binary search tree with insert, delete, and search operations in C++.',
      totalMarks: 100
    },
    {
      id: 2,
      course: 'Web Development',
      title: 'Responsive Website Design',
      dueDate: '2025-10-20',
      status: 'submitted',
      description: 'Create a fully responsive website using HTML, CSS, and JavaScript.',
      totalMarks: 100,
      submittedDate: '2025-10-18',
      grade: 85
    },
    {
      id: 3,
      course: 'Database Systems',
      title: 'SQL Queries Practice',
      dueDate: '2025-10-25',
      status: 'pending',
      description: 'Complete 20 SQL queries covering joins, subqueries, and aggregation.',
      totalMarks: 50
    },
  ];

  const results = [
    { course: 'Data Structures', quiz1: 85, quiz2: 78, midterm: 82, assignment: 90 },
    { course: 'Database Systems', quiz1: 92, quiz2: 88, midterm: 90, assignment: 95 },
    { course: 'Web Development', quiz1: 88, quiz2: 85, midterm: 87, assignment: 92 },
  ];

  const courseMaterials = [
    {
      course: 'Data Structures',
      materials: [
        { id: 1, title: 'Lecture 1: Introduction to Data Structures', type: 'PDF', size: '2.5 MB', uploadDate: '2025-09-01' },
        { id: 2, title: 'Lecture 2: Arrays and Linked Lists', type: 'PDF', size: '3.2 MB', uploadDate: '2025-09-08' },
        { id: 3, title: 'Lecture 3: Stacks and Queues', type: 'PDF', size: '2.8 MB', uploadDate: '2025-09-15' },
        { id: 4, title: 'Lab Manual - Trees', type: 'PDF', size: '1.5 MB', uploadDate: '2025-09-22' },
      ]
    },
    {
      course: 'Database Systems',
      materials: [
        { id: 5, title: 'Lecture 1: Database Fundamentals', type: 'PDF', size: '2.1 MB', uploadDate: '2025-09-02' },
        { id: 6, title: 'Lecture 2: SQL Basics', type: 'PDF', size: '3.5 MB', uploadDate: '2025-09-09' },
        { id: 7, title: 'Lecture 3: Normalization', type: 'PDF', size: '2.7 MB', uploadDate: '2025-09-16' },
      ]
    },
    {
      course: 'Web Development',
      materials: [
        { id: 8, title: 'Lecture 1: HTML & CSS Basics', type: 'PDF', size: '4.2 MB', uploadDate: '2025-09-03' },
        { id: 9, title: 'Lecture 2: JavaScript Fundamentals', type: 'PDF', size: '3.8 MB', uploadDate: '2025-09-10' },
        { id: 10, title: 'Lecture 3: React Introduction', type: 'PDF', size: '5.1 MB', uploadDate: '2025-09-17' },
      ]
    }
  ];

  const openDialog = (type: 'attendance' | 'assignment' | 'payment' | 'material' | 'fyp-submit', data?: any) => {
    setDialogType(type);
    setSelectedItem(data);
    setIsDialogOpen(true);
  };

  const handlePayment = () => {
    toast.success('Redirecting to payment gateway...');
    setTimeout(() => {
      toast.success('Payment completed successfully!');
      setIsDialogOpen(false);
    }, 1500);
  };

  const handleDownloadReceipt = (semester: string) => {
    toast.success(`Downloading receipt for ${semester}...`);
  };

  const handleSubmitAssignment = () => {
    toast.success('Assignment submitted successfully!');
    setIsDialogOpen(false);
  };

  const handleDownloadMaterial = (material: any) => {
    toast.success(`Downloading ${material.title}...`);
  };

  return (
    <DashboardLayout user={user} onLogout={onLogout} navigation={navigation}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-gray-900 mb-2">Student Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user.name}!</p>
        </div>

        {activeView === 'overview' && (
          <div className="space-y-6">
            {/* Notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Recent Notifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {notifications.map((notif) => (
                    <div key={notif.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <AlertCircle className={`w-5 h-5 flex-shrink-0 ${
                        notif.type === 'urgent' ? 'text-red-500' :
                        notif.type === 'warning' ? 'text-orange-500' : 'text-blue-500'
                      }`} />
                      <div className="flex-1">
                        <p className="text-gray-900">{notif.message}</p>
                        <p className="text-sm text-gray-500">{notif.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Overall Attendance</p>
                      <p className="text-gray-900">85%</p>
                    </div>
                    <CheckCircle className="w-10 h-10 text-green-500" />
                  </div>
                  <Progress value={85} className="h-2" />
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Current CGPA</p>
                      <p className="text-gray-900">3.45</p>
                    </div>
                    <TrendingUp className="w-10 h-10 text-blue-500" />
                  </div>
                  <p className="text-sm text-gray-500">Semester GPA: 3.52</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Pending Assignments</p>
                      <p className="text-gray-900">2</p>
                    </div>
                    <FileText className="w-10 h-10 text-orange-500" />
                  </div>
                  <p className="text-sm text-gray-500">Due this week</p>
                </CardContent>
              </Card>
            </div>

            {/* Attendance Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Attendance Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {attendanceData.map((item, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-900">{item.course}</span>
                        <div className="flex items-center gap-2">
                          <span className={`${
                            item.percentage >= 75 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {item.present}/{item.total} ({item.percentage}%)
                          </span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => openDialog('attendance', item)}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                        </div>
                      </div>
                      <Progress
                        value={item.percentage}
                        className={`h-2 ${item.percentage < 75 ? '[&>div]:bg-red-500' : ''}`}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeView === 'timetable' && (
          <Card>
            <CardHeader>
              <CardTitle>Class Timetable</CardTitle>
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
                    <TableCell>Data Structures</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>Data Structures</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>Data Structures</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>10:45 - 12:15</TableCell>
                    <TableCell>Web Development</TableCell>
                    <TableCell>Database Systems</TableCell>
                    <TableCell>Web Development</TableCell>
                    <TableCell>Database Systems</TableCell>
                    <TableCell>-</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>1:30 - 3:00</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>Software Eng.</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>Software Eng.</TableCell>
                    <TableCell>Lab Session</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {activeView === 'attendance' && (
          <Card>
            <CardHeader>
              <CardTitle>Detailed Attendance</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Course</TableHead>
                    <TableHead>Present</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Percentage</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {attendanceData.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.course}</TableCell>
                      <TableCell>{item.present}</TableCell>
                      <TableCell>{item.total}</TableCell>
                      <TableCell>
                        <Badge variant={item.percentage >= 75 ? 'default' : 'destructive'}>
                          {item.percentage}%
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openDialog('attendance', item)}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {activeView === 'assignments' && (
          <Card>
            <CardHeader>
              <CardTitle>Assignments</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Course</TableHead>
                    <TableHead>Assignment</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assignments.map((assignment) => (
                    <TableRow key={assignment.id}>
                      <TableCell>{assignment.course}</TableCell>
                      <TableCell>{assignment.title}</TableCell>
                      <TableCell>{assignment.dueDate}</TableCell>
                      <TableCell>
                        <Badge variant={assignment.status === 'submitted' ? 'default' : 'secondary'}>
                          {assignment.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openDialog('assignment', assignment)}
                        >
                          {assignment.status === 'submitted' ? (
                            <>
                              <Eye className="w-4 h-4 mr-1" />
                              View
                            </>
                          ) : (
                            <>
                              <Upload className="w-4 h-4 mr-1" />
                              Submit
                            </>
                          )}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {activeView === 'results' && (
          <Card>
            <CardHeader>
              <CardTitle>Results & Grades</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Course</TableHead>
                    <TableHead>Quiz 1</TableHead>
                    <TableHead>Quiz 2</TableHead>
                    <TableHead>Midterm</TableHead>
                    <TableHead>Assignments</TableHead>
                    <TableHead>Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results.map((result, index) => {
                    const total = Math.round((result.quiz1 + result.quiz2 + result.midterm + result.assignment) / 4);
                    return (
                      <TableRow key={index}>
                        <TableCell>{result.course}</TableCell>
                        <TableCell>{result.quiz1}/100</TableCell>
                        <TableCell>{result.quiz2}/100</TableCell>
                        <TableCell>{result.midterm}/100</TableCell>
                        <TableCell>{result.assignment}/100</TableCell>
                        <TableCell className="text-blue-600">{total}%</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {activeView === 'fees' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Fee Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                    <div>
                      <p className="text-gray-900">Fall 2024 Semester Fee</p>
                      <p className="text-sm text-gray-600">Paid on: September 15, 2024</p>
                    </div>
                    <Badge variant="default" className="bg-green-600">Paid</Badge>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-orange-50 rounded-lg">
                    <div>
                      <p className="text-gray-900">Spring 2025 Semester Fee</p>
                      <p className="text-sm text-gray-600">Due: October 25, 2025</p>
                      <p className="text-gray-900 mt-1">Amount: PKR 75,000</p>
                    </div>
                    <Button onClick={() => openDialog('payment', { amount: 75000, semester: 'Spring 2025' })}>
                      Pay Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment History</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Semester</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Date Paid</TableHead>
                      <TableHead>Receipt</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Fall 2024</TableCell>
                      <TableCell>PKR 75,000</TableCell>
                      <TableCell>Sep 15, 2024</TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDownloadReceipt('Fall 2024')}
                        >
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Spring 2024</TableCell>
                      <TableCell>PKR 72,000</TableCell>
                      <TableCell>Feb 10, 2024</TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDownloadReceipt('Spring 2024')}
                        >
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        )}

        {activeView === 'materials' && (
          <Card>
            <CardHeader>
              <CardTitle>Course Materials</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="data-structures">
                <TabsList>
                  <TabsTrigger value="data-structures">Data Structures</TabsTrigger>
                  <TabsTrigger value="database">Database Systems</TabsTrigger>
                  <TabsTrigger value="web">Web Development</TabsTrigger>
                </TabsList>
                {courseMaterials.map((courseData, idx) => (
                  <TabsContent
                    key={idx}
                    value={courseData.course.toLowerCase().replace(/ /g, '-')}
                    className="space-y-3 mt-4"
                  >
                    {courseData.materials.map((material) => (
                      <div
                        key={material.id}
                        className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <FileText className="w-5 h-5 text-blue-500" />
                            <div>
                              <p className="text-gray-900">{material.title}</p>
                              <p className="text-sm text-gray-500">
                                {material.type} • {material.size} • Uploaded: {material.uploadDate}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => openDialog('material', material)}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDownloadMaterial(material)}
                          >
                            <Download className="w-4 h-4 mr-1" />
                            Download
                          </Button>
                        </div>
                      </div>
                    ))}
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        )}

        {activeView === 'fyp' && (
          <Card>
            <CardHeader>
              <CardTitle>Final Year Project</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Project Title</p>
                    <p className="text-gray-900">AI-Based Chatbot for Customer Support</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Supervisor</p>
                    <p className="text-gray-900">Dr. Jane Doe</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <p className="text-gray-900">In Progress</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Last Submission Date</p>
                    <p className="text-gray-900">Oct 10, 2025</p>
                  </div>
                </div>
                <div className="pt-4">
                  <Button onClick={() => openDialog('fyp-submit')}>Submit Project</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {activeView === 'profile' && (
          <Card>
            <CardHeader>
              <CardTitle>Student Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Student ID</p>
                    <p className="text-gray-900">2021-CS-101</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Name</p>
                    <p className="text-gray-900">{user.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="text-gray-900">{user.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Department</p>
                    <p className="text-gray-900">Computer Science</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Program</p>
                    <p className="text-gray-900">BS Computer Science</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Current Semester</p>
                    <p className="text-gray-900">5th Semester</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">CGPA</p>
                    <p className="text-gray-900">3.45/4.00</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Enrollment Year</p>
                    <p className="text-gray-900">2021</p>
                  </div>
                </div>
                <div className="pt-4">
                  <Button>Edit Profile</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Dialogs */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            {dialogType === 'attendance' && selectedItem && (
              <>
                <DialogHeader>
                  <DialogTitle>Attendance Details - {selectedItem.course}</DialogTitle>
                  <DialogDescription>
                    Total: {selectedItem.present}/{selectedItem.total} ({selectedItem.percentage}%)
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedItem.details.map((detail: any, idx: number) => (
                        <TableRow key={idx}>
                          <TableCell>{detail.date}</TableCell>
                          <TableCell>
                            <Badge variant={detail.status === 'Present' ? 'default' : 'destructive'}>
                              {detail.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </>
            )}

            {dialogType === 'assignment' && selectedItem && (
              <>
                <DialogHeader>
                  <DialogTitle>{selectedItem.title}</DialogTitle>
                  <DialogDescription>
                    {selectedItem.course} • Due: {selectedItem.dueDate}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Description</Label>
                    <p className="text-gray-700 mt-1">{selectedItem.description}</p>
                  </div>
                  <div>
                    <Label>Total Marks</Label>
                    <p className="text-gray-700 mt-1">{selectedItem.totalMarks}</p>
                  </div>

                  {selectedItem.status === 'submitted' ? (
                    <>
                      <div>
                        <Label>Submitted Date</Label>
                        <p className="text-gray-700 mt-1">{selectedItem.submittedDate}</p>
                      </div>
                      <div>
                        <Label>Grade</Label>
                        <p className="text-gray-700 mt-1">{selectedItem.grade}/{selectedItem.totalMarks}</p>
                      </div>
                    </>
                  ) : (
                    <div>
                      <Label>Upload Assignment</Label>
                      <Input type="file" className="mt-2" />
                      <p className="text-xs text-gray-500 mt-1">Accepted formats: PDF, DOCX, ZIP (Max 10MB)</p>
                    </div>
                  )}
                </div>
                {selectedItem.status === 'pending' && (
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleSubmitAssignment}>Submit Assignment</Button>
                  </DialogFooter>
                )}
              </>
            )}

            {dialogType === 'payment' && selectedItem && (
              <>
                <DialogHeader>
                  <DialogTitle>Fee Payment</DialogTitle>
                  <DialogDescription>
                    {selectedItem.semester} Semester Fee
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-600">Amount to Pay</p>
                    <p className="text-gray-900">PKR {selectedItem.amount.toLocaleString()}</p>
                  </div>
                  <div>
                    <Label>Payment Method</Label>
                    <select className="w-full p-2 border rounded-md mt-2">
                      <option>Credit/Debit Card</option>
                      <option>Bank Transfer</option>
                      <option>EasyPaisa</option>
                      <option>JazzCash</option>
                    </select>
                  </div>
                  <div>
                    <Label>Card Number</Label>
                    <Input type="text" placeholder="1234 5678 9012 3456" className="mt-2" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Expiry Date</Label>
                      <Input type="text" placeholder="MM/YY" className="mt-2" />
                    </div>
                    <div>
                      <Label>CVV</Label>
                      <Input type="text" placeholder="123" className="mt-2" />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                  <Button onClick={handlePayment}>Pay Now</Button>
                </DialogFooter>
              </>
            )}

            {dialogType === 'material' && selectedItem && (
              <>
                <DialogHeader>
                  <DialogTitle>Material Details</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Title</Label>
                    <p className="text-gray-700 mt-1">{selectedItem.title}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Type</Label>
                      <p className="text-gray-700 mt-1">{selectedItem.type}</p>
                    </div>
                    <div>
                      <Label>Size</Label>
                      <p className="text-gray-700 mt-1">{selectedItem.size}</p>
                    </div>
                  </div>
                  <div>
                    <Label>Upload Date</Label>
                    <p className="text-gray-700 mt-1">{selectedItem.uploadDate}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg border-2 border-dashed">
                    <p className="text-center text-gray-500">Preview not available</p>
                    <p className="text-center text-sm text-gray-400 mt-2">Download to view the document</p>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Close</Button>
                  <Button onClick={() => handleDownloadMaterial(selectedItem)}>
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </DialogFooter>
              </>
            )}

            {dialogType === 'fyp-submit' && (
              <>
                <DialogHeader>
                  <DialogTitle>Submit Final Year Project</DialogTitle>
                  <DialogDescription>
                    Upload your final year project report and any additional files.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Project Title</Label>
                    <p className="text-gray-700 mt-1">AI-Based Chatbot for Customer Support</p>
                  </div>
                  <div>
                    <Label>Upload Report</Label>
                    <Input type="file" className="mt-2" />
                    <p className="text-xs text-gray-500 mt-1">Accepted formats: PDF, DOCX (Max 10MB)</p>
                  </div>
                  <div>
                    <Label>Upload Additional Files</Label>
                    <Input type="file" className="mt-2" multiple />
                    <p className="text-xs text-gray-500 mt-1">Accepted formats: PDF, DOCX, ZIP (Max 10MB)</p>
                  </div>
                  <div>
                    <Label>Project Description</Label>
                    <Textarea className="mt-2" placeholder="Enter a brief description of your project." />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                  <Button onClick={handleSubmitAssignment}>Submit Project</Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}