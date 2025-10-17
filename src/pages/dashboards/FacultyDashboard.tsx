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
import {
  LayoutDashboard, Users, CheckCircle, FileText, Upload,
  BookOpen, MessageSquare, Calendar, TrendingUp
} from 'lucide-react';
import type { User } from '../../App';

interface FacultyDashboardProps {
  user: User;
  onLogout: () => void;
}

export default function FacultyDashboard({ user, onLogout }: FacultyDashboardProps) {
  const [activeView, setActiveView] = useState('overview');

  const navigation = [
    { name: 'Dashboard', icon: LayoutDashboard, onClick: () => setActiveView('overview') },
    { name: 'My Courses', icon: BookOpen, onClick: () => setActiveView('courses') },
    { name: 'Attendance', icon: CheckCircle, onClick: () => setActiveView('attendance') },
    { name: 'Assignments', icon: FileText, onClick: () => setActiveView('assignments') },
    { name: 'Upload Marks', icon: Upload, onClick: () => setActiveView('marks') },
    { name: 'Course Materials', icon: Upload, onClick: () => setActiveView('materials') },
    { name: 'Announcements', icon: MessageSquare, onClick: () => setActiveView('announcements') },
    { name: 'Class Schedule', icon: Calendar, onClick: () => setActiveView('schedule') },
  ];

  const courses = [
    { code: 'CS-201', name: 'Data Structures', students: 45, section: 'A' },
    { code: 'CS-301', name: 'Database Systems', students: 38, section: 'B' },
    { code: 'CS-401', name: 'Software Engineering', students: 42, section: 'A' },
  ];

  const students = [
    { id: '2021-CS-101', name: 'Ahmed Khan', attendance: 85, marks: 82 },
    { id: '2021-CS-102', name: 'Sara Ali', attendance: 92, marks: 88 },
    { id: '2021-CS-103', name: 'Hassan Mahmood', attendance: 78, marks: 75 },
    { id: '2021-CS-104', name: 'Ayesha Siddiqui', attendance: 95, marks: 92 },
    { id: '2021-CS-105', name: 'Usman Tariq', attendance: 88, marks: 85 },
  ];

  const assignments = [
    { id: 1, course: 'CS-201', title: 'Binary Tree Implementation', dueDate: '2025-10-22', submissions: 35, total: 45 },
    { id: 2, course: 'CS-301', title: 'SQL Queries Practice', dueDate: '2025-10-25', submissions: 30, total: 38 },
    { id: 3, course: 'CS-401', title: 'UML Diagrams Project', dueDate: '2025-10-28', submissions: 38, total: 42 },
  ];

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
                          <Button size="sm" variant="outline">View Details</Button>
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
                      <Button size="sm" variant="outline">Grade</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
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
                    <Input type="date" className="max-w-xs" />
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
                    <Button>Submit Attendance</Button>
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
                <Button>Create New Assignment</Button>
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
                          <Button size="sm" variant="outline">View</Button>
                          <Button size="sm" variant="outline">Grade</Button>
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
                  <Button>Submit Marks</Button>
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
                <Button>Upload New Material</Button>
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
                  {['Lecture 1: Introduction', 'Lecture 2: Arrays', 'Lab Manual', 'Assignment Guidelines'].map((item, i) => (
                    <div key={i} className="flex justify-between items-center p-3 border rounded-lg">
                      <span className="text-gray-900">{item}</span>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">Edit</Button>
                        <Button size="sm" variant="outline">Delete</Button>
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
                <Button>Post Announcement</Button>
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
      </div>
    </DashboardLayout>
  );
}
