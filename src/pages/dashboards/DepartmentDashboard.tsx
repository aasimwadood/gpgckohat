import { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Badge } from '../../components/ui/badge';
import { LayoutDashboard, Calendar, FileCheck, BookOpen, TrendingUp, Bell } from 'lucide-react';
import type { User } from '../../App';

interface DepartmentDashboardProps {
  user: User;
  onLogout: () => void;
}

export default function DepartmentDashboard({ user, onLogout }: DepartmentDashboardProps) {
  const [activeView, setActiveView] = useState('overview');

  const navigation = [
    { name: 'Dashboard', icon: LayoutDashboard, onClick: () => setActiveView('overview') },
    { name: 'Exam Scheduling', icon: Calendar, onClick: () => setActiveView('exams') },
    { name: 'Marks Approval', icon: FileCheck, onClick: () => setActiveView('marks') },
    { name: 'Curriculum Management', icon: BookOpen, onClick: () => setActiveView('curriculum') },
    { name: 'Reports', icon: TrendingUp, onClick: () => setActiveView('reports') },
    { name: 'Announcements', icon: Bell, onClick: () => setActiveView('announcements') },
  ];

  return (
    <DashboardLayout user={user} onLogout={onLogout} navigation={navigation}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-gray-900 mb-2">Department Academic Dashboard</h1>
          <p className="text-gray-600">Computer Science Department</p>
        </div>

        {activeView === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <p className="text-sm text-gray-600">Total Students</p>
                  <p className="text-gray-900">1,200</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <p className="text-sm text-gray-600">Active Courses</p>
                  <p className="text-gray-900">45</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <p className="text-sm text-gray-600">Faculty Members</p>
                  <p className="text-gray-900">35</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <p className="text-sm text-gray-600">Avg GPA</p>
                  <p className="text-gray-900">3.52</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Pending Marks Approval</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Course</TableHead>
                      <TableHead>Exam Type</TableHead>
                      <TableHead>Submitted By</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>CS-201</TableCell>
                      <TableCell>Midterm</TableCell>
                      <TableCell>Prof. John Doe</TableCell>
                      <TableCell>2025-10-15</TableCell>
                      <TableCell>
                        <Button size="sm">Review</Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        )}

        {activeView === 'exams' && (
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Exam Schedule Management</CardTitle>
                <Button>Create New Schedule</Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Course</TableHead>
                    <TableHead>Exam Type</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Room</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>CS-201</TableCell>
                    <TableCell>Midterm</TableCell>
                    <TableCell>2025-11-15</TableCell>
                    <TableCell>9:00 AM</TableCell>
                    <TableCell>Room 301</TableCell>
                    <TableCell><Badge>Scheduled</Badge></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {activeView === 'marks' && (
          <Card>
            <CardHeader>
              <CardTitle>Approve Examination Marks</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Course</TableHead>
                    <TableHead>Faculty</TableHead>
                    <TableHead>Exam Type</TableHead>
                    <TableHead>Students</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>CS-201</TableCell>
                    <TableCell>Prof. John Doe</TableCell>
                    <TableCell>Midterm</TableCell>
                    <TableCell>45</TableCell>
                    <TableCell><Badge variant="secondary">Pending</Badge></TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">View</Button>
                        <Button size="sm">Approve</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {activeView === 'curriculum' && (
          <Card>
            <CardHeader>
              <CardTitle>Curriculum & Syllabus Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {['BS Computer Science', 'BS Software Engineering', 'BS AI'].map((program, i) => (
                  <div key={i} className="p-4 border rounded-lg">
                    <h3 className="text-gray-900 mb-2">{program}</h3>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">View Curriculum</Button>
                      <Button size="sm" variant="outline">Update Syllabus</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
