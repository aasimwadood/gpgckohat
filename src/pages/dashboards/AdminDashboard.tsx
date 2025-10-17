import { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import {
  LayoutDashboard, Users, Settings, FileText, Calendar,
  TrendingUp, Activity, Shield, Database
} from 'lucide-react';
import type { User } from '../../App';

interface AdminDashboardProps {
  user: User;
  onLogout: () => void;
}

export default function AdminDashboard({ user, onLogout }: AdminDashboardProps) {
  const [activeView, setActiveView] = useState('overview');

  const navigation = [
    { name: 'Dashboard', icon: LayoutDashboard, onClick: () => setActiveView('overview') },
    { name: 'User Management', icon: Users, onClick: () => setActiveView('users') },
    { name: 'Role Management', icon: Shield, onClick: () => setActiveView('roles') },
    { name: 'Timetable', icon: Calendar, onClick: () => setActiveView('timetable') },
    { name: 'Announcements', icon: FileText, onClick: () => setActiveView('announcements') },
    { name: 'Reports', icon: TrendingUp, onClick: () => setActiveView('reports') },
    { name: 'System Settings', icon: Settings, onClick: () => setActiveView('settings') },
    { name: 'System Logs', icon: Activity, onClick: () => setActiveView('logs') },
  ];

  const systemStats = [
    { label: 'Total Users', value: '5,234', icon: Users, color: 'text-blue-600', change: '+12%' },
    { label: 'Active Students', value: '5,000', icon: Users, color: 'text-green-600', change: '+8%' },
    { label: 'Faculty Members', value: '150', icon: Users, color: 'text-purple-600', change: '+5%' },
    { label: 'System Uptime', value: '99.9%', icon: Activity, color: 'text-orange-600', change: 'Stable' },
  ];

  const users = [
    { id: 'USR-001', name: 'Ahmed Khan', email: 'ahmed@college.edu.pk', role: 'student', status: 'active' },
    { id: 'USR-002', name: 'Prof. Sarah Ali', email: 'sarah@college.edu.pk', role: 'faculty', status: 'active' },
    { id: 'USR-003', name: 'Hassan Mahmood', email: 'hassan@college.edu.pk', role: 'student', status: 'active' },
    { id: 'USR-004', name: 'Dr. Principal', email: 'principal@college.edu.pk', role: 'principal', status: 'active' },
  ];

  const recentActivities = [
    { action: 'New user registration', user: 'Ahmed Khan', time: '5 minutes ago' },
    { action: 'Timetable updated', user: 'Coordinator', time: '15 minutes ago' },
    { action: 'Exam schedule published', user: 'Controller', time: '1 hour ago' },
    { action: 'Fee payment processed', user: 'Admin Staff', time: '2 hours ago' },
  ];

  return (
    <DashboardLayout user={user} onLogout={onLogout} navigation={navigation}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Complete system overview and management</p>
        </div>

        {activeView === 'overview' && (
          <div className="space-y-6">
            {/* System Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {systemStats.map((stat, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-sm text-gray-600">{stat.label}</p>
                        <p className="text-gray-900">{stat.value}</p>
                      </div>
                      <stat.icon className={`w-10 h-10 ${stat.color}`} />
                    </div>
                    <Badge variant="secondary" className="text-xs">{stat.change}</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent System Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <Activity className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-gray-900">{activity.action}</p>
                        <p className="text-sm text-gray-600">By {activity.user} • {activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setActiveView('users')}>
                <CardContent className="pt-6 text-center">
                  <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-gray-900 mb-2">Manage Users</h3>
                  <p className="text-sm text-gray-600">Create and manage user accounts</p>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setActiveView('timetable')}>
                <CardContent className="pt-6 text-center">
                  <Calendar className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-gray-900 mb-2">Manage Timetable</h3>
                  <p className="text-sm text-gray-600">Schedule classes and events</p>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setActiveView('reports')}>
                <CardContent className="pt-6 text-center">
                  <TrendingUp className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="text-gray-900 mb-2">View Reports</h3>
                  <p className="text-sm text-gray-600">Generate system reports</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeView === 'users' && (
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>User Management</CardTitle>
                <Button>Create New User</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Input placeholder="Search users..." className="max-w-md" />
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.id}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="capitalize">{user.role}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="default">{user.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">Edit</Button>
                          <Button size="sm" variant="outline">Deactivate</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {activeView === 'roles' && (
          <Card>
            <CardHeader>
              <CardTitle>Role-Based Access Control</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="student">
                <TabsList>
                  <TabsTrigger value="student">Student</TabsTrigger>
                  <TabsTrigger value="faculty">Faculty</TabsTrigger>
                  <TabsTrigger value="admin">Admin</TabsTrigger>
                  <TabsTrigger value="principal">Principal</TabsTrigger>
                </TabsList>
                <TabsContent value="student" className="mt-4">
                  <div className="space-y-4">
                    <h3 className="text-gray-900">Student Permissions</h3>
                    <div className="space-y-2">
                      {[
                        'View attendance',
                        'View grades',
                        'Submit assignments',
                        'View timetable',
                        'Pay fees online',
                        'Download course materials',
                      ].map((permission, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <input type="checkbox" defaultChecked className="w-4 h-4" />
                          <span className="text-gray-700">{permission}</span>
                        </div>
                      ))}
                    </div>
                    <Button>Update Permissions</Button>
                  </div>
                </TabsContent>
                {/* Similar content for other tabs */}
              </Tabs>
            </CardContent>
          </Card>
        )}

        {activeView === 'timetable' && (
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Timetable Management</CardTitle>
                <Button>Create New Schedule</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex gap-4">
                <div>
                  <Label>Department</Label>
                  <select className="w-48 p-2 border rounded-md">
                    <option>Computer Science</option>
                    <option>Business Administration</option>
                    <option>Engineering</option>
                  </select>
                </div>
                <div>
                  <Label>Semester</Label>
                  <select className="w-48 p-2 border rounded-md">
                    <option>Fall 2024</option>
                    <option>Spring 2025</option>
                  </select>
                </div>
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
                  <TableRow>
                    <TableCell>10:45 - 12:15</TableCell>
                    <TableCell>CS-301</TableCell>
                    <TableCell>CS-301</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>CS-301</TableCell>
                    <TableCell>-</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {activeView === 'announcements' && (
          <Card>
            <CardHeader>
              <CardTitle>Manage Announcements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label>Title</Label>
                  <Input placeholder="Announcement title" />
                </div>
                <div>
                  <Label>Target Audience</Label>
                  <select className="w-full p-2 border rounded-md">
                    <option>All Users</option>
                    <option>Students Only</option>
                    <option>Faculty Only</option>
                    <option>Specific Department</option>
                  </select>
                </div>
                <div>
                  <Label>Message</Label>
                  <textarea className="w-full p-2 border rounded-md" rows={6} placeholder="Enter announcement message..." />
                </div>
                <div className="flex gap-4">
                  <Button>Publish Now</Button>
                  <Button variant="outline">Save as Draft</Button>
                  <Button variant="outline">Schedule for Later</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {activeView === 'reports' && (
          <Card>
            <CardHeader>
              <CardTitle>Generate Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { name: 'Attendance Report', icon: Users },
                  { name: 'Fee Collection Report', icon: TrendingUp },
                  { name: 'Academic Performance', icon: FileText },
                  { name: 'Department Statistics', icon: Database },
                  { name: 'Exam Results Summary', icon: FileText },
                  { name: 'System Usage Report', icon: Activity },
                ].map((report, i) => (
                  <Card key={i} className="cursor-pointer hover:shadow-lg transition-shadow">
                    <CardContent className="pt-6">
                      <report.icon className="w-10 h-10 text-blue-600 mb-4" />
                      <h3 className="text-gray-900 mb-2">{report.name}</h3>
                      <Button size="sm" variant="outline" className="w-full">Generate</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {activeView === 'settings' && (
          <Card>
            <CardHeader>
              <CardTitle>System Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-gray-900 mb-4">General Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <Label>Institution Name</Label>
                      <Input defaultValue="College Management System" />
                    </div>
                    <div>
                      <Label>Academic Year</Label>
                      <Input defaultValue="2024-2025" />
                    </div>
                    <div>
                      <Label>Current Semester</Label>
                      <select className="w-full p-2 border rounded-md">
                        <option>Fall 2024</option>
                        <option>Spring 2025</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-gray-900 mb-4">Email Notifications</h3>
                  <div className="space-y-2">
                    {[
                      'Send attendance alerts',
                      'Send fee payment reminders',
                      'Send exam schedule notifications',
                      'Send grade upload notifications',
                    ].map((setting, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <input type="checkbox" defaultChecked className="w-4 h-4" />
                        <span className="text-gray-700">{setting}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Button>Save Settings</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {activeView === 'logs' && (
          <Card>
            <CardHeader>
              <CardTitle>System Activity Logs</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>IP Address</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { time: '2025-10-17 10:30:15', user: 'admin@college.edu.pk', action: 'User login', ip: '192.168.1.1', status: 'Success' },
                    { time: '2025-10-17 10:25:42', user: 'faculty@college.edu.pk', action: 'Attendance marked', ip: '192.168.1.5', status: 'Success' },
                    { time: '2025-10-17 10:20:18', user: 'student@college.edu.pk', action: 'Assignment submitted', ip: '192.168.1.10', status: 'Success' },
                  ].map((log, i) => (
                    <TableRow key={i}>
                      <TableCell>{log.time}</TableCell>
                      <TableCell>{log.user}</TableCell>
                      <TableCell>{log.action}</TableCell>
                      <TableCell>{log.ip}</TableCell>
                      <TableCell>
                        <Badge variant="default">{log.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
