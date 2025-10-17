import { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Progress } from '../../components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import {
  LayoutDashboard, Calendar, BookOpen, FileText, DollarSign,
  Bell, User as UserIcon, CheckCircle, Clock, AlertCircle, TrendingUp
} from 'lucide-react';
import type { User } from '../../App';

interface StudentDashboardProps {
  user: User;
  onLogout: () => void;
}

export default function StudentDashboard({ user, onLogout }: StudentDashboardProps) {
  const [activeView, setActiveView] = useState('overview');

  const navigation = [
    { name: 'Dashboard', icon: LayoutDashboard, onClick: () => setActiveView('overview') },
    { name: 'My Timetable', icon: Calendar, onClick: () => setActiveView('timetable') },
    { name: 'Attendance', icon: CheckCircle, onClick: () => setActiveView('attendance') },
    { name: 'Assignments', icon: FileText, onClick: () => setActiveView('assignments') },
    { name: 'Results & Grades', icon: TrendingUp, onClick: () => setActiveView('results') },
    { name: 'Fee Payment', icon: DollarSign, onClick: () => setActiveView('fees') },
    { name: 'Course Materials', icon: BookOpen, onClick: () => setActiveView('materials') },
    { name: 'Profile', icon: UserIcon, onClick: () => setActiveView('profile') },
  ];

  const notifications = [
    { id: 1, message: 'Mid-term exam schedule released', type: 'info', time: '2 hours ago' },
    { id: 2, message: 'New assignment posted in Data Structures', type: 'warning', time: '5 hours ago' },
    { id: 3, message: 'Fee payment deadline: Oct 25', type: 'urgent', time: '1 day ago' },
  ];

  const attendance = [
    { course: 'Data Structures', present: 25, total: 30, percentage: 83 },
    { course: 'Database Systems', present: 28, total: 30, percentage: 93 },
    { course: 'Web Development', present: 22, total: 30, percentage: 73 },
    { course: 'Software Engineering', present: 27, total: 30, percentage: 90 },
  ];

  const assignments = [
    { course: 'Data Structures', title: 'Binary Tree Implementation', dueDate: '2025-10-22', status: 'pending' },
    { course: 'Web Development', title: 'Responsive Website Design', dueDate: '2025-10-20', status: 'submitted' },
    { course: 'Database Systems', title: 'SQL Queries Practice', dueDate: '2025-10-25', status: 'pending' },
  ];

  const results = [
    { course: 'Data Structures', quiz1: 85, quiz2: 78, midterm: 82, assignment: 90 },
    { course: 'Database Systems', quiz1: 92, quiz2: 88, midterm: 90, assignment: 95 },
    { course: 'Web Development', quiz1: 88, quiz2: 85, midterm: 87, assignment: 92 },
  ];

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
                  {attendance.map((item, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-900">{item.course}</span>
                        <span className={`${
                          item.percentage >= 75 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {item.present}/{item.total} ({item.percentage}%)
                        </span>
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
                  {assignments.map((assignment, index) => (
                    <TableRow key={index}>
                      <TableCell>{assignment.course}</TableCell>
                      <TableCell>{assignment.title}</TableCell>
                      <TableCell>{assignment.dueDate}</TableCell>
                      <TableCell>
                        <Badge variant={assignment.status === 'submitted' ? 'default' : 'secondary'}>
                          {assignment.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">
                          {assignment.status === 'submitted' ? 'View' : 'Submit'}
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
                    <Button>Pay Now</Button>
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
                        <Button size="sm" variant="outline">Download</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Spring 2024</TableCell>
                      <TableCell>PKR 72,000</TableCell>
                      <TableCell>Feb 10, 2024</TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">Download</Button>
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
                <TabsContent value="data-structures" className="space-y-3 mt-4">
                  {['Lecture 1: Introduction to Data Structures', 'Lecture 2: Arrays and Linked Lists', 'Lecture 3: Stacks and Queues'].map((item, i) => (
                    <div key={i} className="flex justify-between items-center p-3 border rounded-lg">
                      <span className="text-gray-900">{item}</span>
                      <Button size="sm" variant="outline">Download</Button>
                    </div>
                  ))}
                </TabsContent>
                <TabsContent value="database" className="space-y-3 mt-4">
                  {['Lecture 1: Database Fundamentals', 'Lecture 2: SQL Basics', 'Lecture 3: Normalization'].map((item, i) => (
                    <div key={i} className="flex justify-between items-center p-3 border rounded-lg">
                      <span className="text-gray-900">{item}</span>
                      <Button size="sm" variant="outline">Download</Button>
                    </div>
                  ))}
                </TabsContent>
                <TabsContent value="web" className="space-y-3 mt-4">
                  {['Lecture 1: HTML & CSS Basics', 'Lecture 2: JavaScript Fundamentals', 'Lecture 3: React Introduction'].map((item, i) => (
                    <div key={i} className="flex justify-between items-center p-3 border rounded-lg">
                      <span className="text-gray-900">{item}</span>
                      <Button size="sm" variant="outline">Download</Button>
                    </div>
                  ))}
                </TabsContent>
              </Tabs>
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
      </div>
    </DashboardLayout>
  );
}
