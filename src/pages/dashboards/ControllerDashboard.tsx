import { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Badge } from '../../components/ui/badge';
import { LayoutDashboard, Calendar, FileCheck, FileText, Award, Settings } from 'lucide-react';
import type { User } from '../../App';

interface ControllerDashboardProps {
  user: User;
  onLogout: () => void;
}

export default function ControllerDashboard({ user, onLogout }: ControllerDashboardProps) {
  const [activeView, setActiveView] = useState('overview');

  const navigation = [
    { name: 'Dashboard', icon: LayoutDashboard, onClick: () => setActiveView('overview') },
    { name: 'Exam Schedules', icon: Calendar, onClick: () => setActiveView('schedules') },
    { name: 'Results Management', icon: FileCheck, onClick: () => setActiveView('results') },
    { name: 'Transcript Generation', icon: FileText, onClick: () => setActiveView('transcripts') },
    { name: 'Exam Policies', icon: Settings, onClick: () => setActiveView('policies') },
    { name: 'Result Queries', icon: Award, onClick: () => setActiveView('queries') },
  ];

  return (
    <DashboardLayout user={user} onLogout={onLogout} navigation={navigation}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-gray-900 mb-2">Controller of Examination</h1>
          <p className="text-gray-600">Examination and Results Management</p>
        </div>

        {activeView === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <p className="text-sm text-gray-600">Upcoming Exams</p>
                  <p className="text-gray-900">12</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <p className="text-sm text-gray-600">Pending Results</p>
                  <p className="text-gray-900">8</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <p className="text-sm text-gray-600">Transcript Requests</p>
                  <p className="text-gray-900">25</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <p className="text-sm text-gray-600">Result Queries</p>
                  <p className="text-gray-900">5</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Exam Schedule Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Department</TableHead>
                      <TableHead>Exam Type</TableHead>
                      <TableHead>Start Date</TableHead>
                      <TableHead>End Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Computer Science</TableCell>
                      <TableCell>Midterm</TableCell>
                      <TableCell>2025-11-15</TableCell>
                      <TableCell>2025-11-20</TableCell>
                      <TableCell><Badge>Scheduled</Badge></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Business Administration</TableCell>
                      <TableCell>Midterm</TableCell>
                      <TableCell>2025-11-15</TableCell>
                      <TableCell>2025-11-20</TableCell>
                      <TableCell><Badge>Scheduled</Badge></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        )}

        {activeView === 'schedules' && (
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Create Exam Schedule</CardTitle>
                <Button>New Schedule</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm mb-2">Department</label>
                    <select className="w-full p-2 border rounded-md">
                      <option>Computer Science</option>
                      <option>Business Administration</option>
                      <option>Engineering</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm mb-2">Exam Type</label>
                    <select className="w-full p-2 border rounded-md">
                      <option>Midterm</option>
                      <option>Final</option>
                      <option>Quiz</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm mb-2">Semester</label>
                    <select className="w-full p-2 border rounded-md">
                      <option>Fall 2024</option>
                      <option>Spring 2025</option>
                    </select>
                  </div>
                </div>
                <Button>Generate Schedule</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {activeView === 'results' && (
          <Card>
            <CardHeader>
              <CardTitle>Finalize Results</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Course</TableHead>
                    <TableHead>Exam</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Students</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>CS-201</TableCell>
                    <TableCell>Midterm</TableCell>
                    <TableCell>Computer Science</TableCell>
                    <TableCell>45</TableCell>
                    <TableCell><Badge variant="secondary">Pending Approval</Badge></TableCell>
                    <TableCell>
                      <Button size="sm">Finalize</Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {activeView === 'transcripts' && (
          <Card>
            <CardHeader>
              <CardTitle>Transcript Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Program</TableHead>
                    <TableHead>Request Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>2021-CS-101</TableCell>
                    <TableCell>Ahmed Khan</TableCell>
                    <TableCell>BS Computer Science</TableCell>
                    <TableCell>2025-10-15</TableCell>
                    <TableCell><Badge variant="secondary">Pending</Badge></TableCell>
                    <TableCell>
                      <Button size="sm">Generate</Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {activeView === 'queries' && (
          <Card>
            <CardHeader>
              <CardTitle>Result Rechecking Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Exam</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Ahmed Khan</TableCell>
                    <TableCell>CS-201</TableCell>
                    <TableCell>Midterm</TableCell>
                    <TableCell>Marks discrepancy</TableCell>
                    <TableCell><Badge variant="secondary">Under Review</Badge></TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline">Review</Button>
                    </TableCell>
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
