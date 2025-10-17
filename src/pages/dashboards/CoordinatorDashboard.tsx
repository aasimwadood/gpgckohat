import { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { LayoutDashboard, Calendar, Clock, Users, AlertCircle } from 'lucide-react';
import type { User } from '../../App';

interface CoordinatorDashboardProps {
  user: User;
  onLogout: () => void;
}

export default function CoordinatorDashboard({ user, onLogout }: CoordinatorDashboardProps) {
  const [activeView, setActiveView] = useState('overview');

  const navigation = [
    { name: 'Dashboard', icon: LayoutDashboard, onClick: () => setActiveView('overview') },
    { name: 'Timetable Management', icon: Calendar, onClick: () => setActiveView('timetable') },
    { name: 'Academic Calendar', icon: Calendar, onClick: () => setActiveView('calendar') },
    { name: 'Faculty Coordination', icon: Users, onClick: () => setActiveView('faculty') },
    { name: 'Scheduling Conflicts', icon: AlertCircle, onClick: () => setActiveView('conflicts') },
  ];

  return (
    <DashboardLayout user={user} onLogout={onLogout} navigation={navigation}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-gray-900 mb-2">Coordinator Dashboard</h1>
          <p className="text-gray-600">Academic Logistics & Coordination</p>
        </div>

        {activeView === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <Calendar className="w-10 h-10 text-blue-600 mb-4" />
                  <p className="text-sm text-gray-600">Active Timetables</p>
                  <p className="text-gray-900">15</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <Clock className="w-10 h-10 text-green-600 mb-4" />
                  <p className="text-sm text-gray-600">Total Classes</p>
                  <p className="text-gray-900">250</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <Users className="w-10 h-10 text-purple-600 mb-4" />
                  <p className="text-sm text-gray-600">Faculty Coordinated</p>
                  <p className="text-gray-900">150</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <AlertCircle className="w-10 h-10 text-orange-600 mb-4" />
                  <p className="text-sm text-gray-600">Pending Conflicts</p>
                  <p className="text-gray-900">3</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Academic Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { event: 'Mid-term Examinations', date: '2025-11-15', department: 'All Departments' },
                    { event: 'Workshop: Industry Collaboration', date: '2025-10-25', department: 'Computer Science' },
                    { event: 'Faculty Meeting', date: '2025-10-20', department: 'All Departments' },
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center p-3 border rounded-lg">
                      <div>
                        <h4 className="text-gray-900">{item.event}</h4>
                        <p className="text-sm text-gray-600">{item.department}</p>
                      </div>
                      <p className="text-sm text-gray-500">{item.date}</p>
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
              <div className="flex justify-between items-center">
                <CardTitle>Timetable Management</CardTitle>
                <Button>Create New Timetable</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex gap-4">
                <select className="p-2 border rounded-md">
                  <option>Computer Science</option>
                  <option>Business Administration</option>
                  <option>Engineering</option>
                </select>
                <select className="p-2 border rounded-md">
                  <option>Semester 1</option>
                  <option>Semester 3</option>
                  <option>Semester 5</option>
                </select>
              </div>
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
                    <TableCell>CS-201</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>CS-201</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>CS-201</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <div className="mt-4 flex gap-2">
                <Button>Save Timetable</Button>
                <Button variant="outline">Publish</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {activeView === 'calendar' && (
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Academic Calendar</CardTitle>
                <Button>Add Event</Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Event</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>End Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Mid-term Break</TableCell>
                    <TableCell>2025-11-01</TableCell>
                    <TableCell>2025-11-05</TableCell>
                    <TableCell>Holiday</TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline">Edit</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Final Exams</TableCell>
                    <TableCell>2025-12-15</TableCell>
                    <TableCell>2025-12-25</TableCell>
                    <TableCell>Examination</TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline">Edit</Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {activeView === 'conflicts' && (
          <Card>
            <CardHeader>
              <CardTitle>Scheduling Conflicts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { issue: 'Room A-101 double booked on Monday 9:00 AM', priority: 'High' },
                  { issue: 'Prof. John Doe scheduled for two classes at same time', priority: 'Critical' },
                  { issue: 'Lab equipment unavailable for CS-301 practical', priority: 'Medium' },
                ].map((conflict, i) => (
                  <div key={i} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-gray-900">{conflict.issue}</p>
                      <span className={`text-xs px-2 py-1 rounded ${
                        conflict.priority === 'Critical' ? 'bg-red-100 text-red-700' :
                        conflict.priority === 'High' ? 'bg-orange-100 text-orange-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {conflict.priority}
                      </span>
                    </div>
                    <Button size="sm" variant="outline">Resolve</Button>
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
