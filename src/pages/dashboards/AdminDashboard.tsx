import { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '../../components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import {
  LayoutDashboard, Users, Settings, FileText, Calendar,
  TrendingUp, Activity, Shield, Database, Plus, Edit, Trash2, Eye, Download
} from 'lucide-react';
import { toast } from 'sonner';
import type { User } from '../../App';

interface AdminDashboardProps {
  user: User;
  onLogout: () => void;
}

export default function AdminDashboard({ user, onLogout }: AdminDashboardProps) {
  const [activeView, setActiveView] = useState('overview');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<'user' | 'schedule' | 'report' | 'edit' | 'delete' | null>(null);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [targetAudience, setTargetAudience] = useState('all');
  const [userFormData, setUserFormData] = useState({
    name: '',
    email: '',
    role: 'student',
    department: ''
  });
  const [scheduleFormData, setScheduleFormData] = useState({
    department: '',
    semester: '',
    day: '',
    time: '',
    course: '',
    room: ''
  });

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

  const [usersData, setUsersData] = useState([
    { id: 'USR-001', name: 'Ahmed Khan', email: 'ahmed@college.edu.pk', role: 'student', status: 'active', department: 'Computer Science' },
    { id: 'USR-002', name: 'Prof. Sarah Ali', email: 'sarah@college.edu.pk', role: 'faculty', status: 'active', department: 'Mathematics' },
    { id: 'USR-003', name: 'Hassan Mahmood', email: 'hassan@college.edu.pk', role: 'student', status: 'active', department: 'Physics' },
    { id: 'USR-004', name: 'Dr. Principal', email: 'principal@college.edu.pk', role: 'principal', status: 'active', department: 'Administration' },
    { id: 'USR-005', name: 'Controller Exam', email: 'controller@college.edu.pk', role: 'controller', status: 'active', department: 'Examination' },
    { id: 'USR-006', name: 'Coordinator', email: 'coordinator@college.edu.pk', role: 'coordinator', status: 'active', department: 'Academic Affairs' },
    { id: 'USR-007', name: 'HoD CS', email: 'hod-cs@college.edu.pk', role: 'department', status: 'active', department: 'Computer Science' },
    { id: 'USR-008', name: 'Accountant', email: 'accountant@college.edu.pk', role: 'administration', status: 'active', department: 'Finance' },
  ]);

  const recentActivities = [
    { action: 'New user registration', user: 'Ahmed Khan', time: '5 minutes ago' },
    { action: 'Timetable updated', user: 'Coordinator', time: '15 minutes ago' },
    { action: 'Exam schedule published', user: 'Controller', time: '1 hour ago' },
    { action: 'Fee payment processed', user: 'Admin Staff', time: '2 hours ago' },
  ];
  const reportData = {
    attendance: [
      { department: 'Computer Science', totalStudents: 500, avgAttendance: 85 },
      { department: 'Mathematics', totalStudents: 300, avgAttendance: 88 },
      { department: 'Physics', totalStudents: 250, avgAttendance: 82 },
    ],
    fees: [
      { semester: 'Fall 2024', collected: 35000000, pending: 5000000, total: 40000000 },
      { semester: 'Spring 2024', collected: 38000000, pending: 2000000, total: 40000000 },
    ],
    performance: [
      { department: 'Computer Science', avgGPA: 3.45, passRate: 92 },
      { department: 'Mathematics', avgGPA: 3.52, passRate: 90 },
      { department: 'Physics', avgGPA: 3.38, passRate: 88 },
    ]
  };
  const openDialog = (type: 'user' | 'schedule' | 'report' | 'edit' | 'delete', data?: any) => {
    setDialogType(type);
    setSelectedItem(data);
    if (type === 'edit' && data) {
      setUserFormData({
        name: data.name,
        email: data.email,
        role: data.role,
        department: data.department
      });
    }
    setIsDialogOpen(true);
  };
  const handleCreateUser = () => {
    if (!userFormData.name || !userFormData.email) {
      toast.error('Please fill in all required fields');
      return;
    }
    const newUser = {
      id: `USR-${String(usersData.length + 1).padStart(3, '0')}`,
      ...userFormData,
      status: 'active'
    };
    setUsersData([...usersData, newUser]);
    toast.success('User created successfully!');
    setIsDialogOpen(false);
    setUserFormData({ name: '', email: '', role: 'student', department: '' });
  };
  const handleEditUser = () => {
    if (!selectedItem) return;
    const updatedUsers = usersData.map(u =>
      u.id === selectedItem.id
        ? { ...u, ...userFormData }
        : u
    );
    setUsersData(updatedUsers);
    toast.success('User updated successfully!');
    setIsDialogOpen(false);
  };
  const handleDeleteUser = () => {
    if (!selectedItem) return;
    setUsersData(usersData.filter(u => u.id !== selectedItem.id));
    toast.success('User deleted successfully!');
    setIsDialogOpen(false);
  };
  const handleCreateSchedule = () => {
    if (!scheduleFormData.department || !scheduleFormData.course) {
      toast.error('Please fill in all required fields');
      return;
    }
    toast.success('Schedule created successfully!');
    setIsDialogOpen(false);
    setScheduleFormData({ department: '', semester: '', day: '', time: '', course: '', room: '' });
  };
  const handleGenerateReport = (reportType: string) => {
    toast.success(`Generating ${reportType} report...`);
    setTimeout(() => {
      openDialog('report', { type: reportType });
    }, 500);
  };

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
                <Button onClick={() => openDialog('user')}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create New User
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Input placeholder="Search users..." className="max-w-md" />
              </div>
              <Tabs defaultValue="all">
                <TabsList>
                  <TabsTrigger value="all">All Users</TabsTrigger>
                  <TabsTrigger value="student">Students</TabsTrigger>
                  <TabsTrigger value="faculty">Faculty</TabsTrigger>
                  <TabsTrigger value="admin">Admin</TabsTrigger>
                  <TabsTrigger value="other">Other Roles</TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                        <TableHead>Department</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                      {usersData.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.id}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="capitalize">{user.role}</Badge>
                      </TableCell>
                          <TableCell>{user.department}</TableCell>
                      <TableCell>
                        <Badge variant="default">{user.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                              <Button size="sm" variant="outline" onClick={() => openDialog('edit', user)}>
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => openDialog('delete', user)}>
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
                <TabsContent value="student" className="mt-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {usersData.filter(u => u.role === 'student').map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>{user.id}</TableCell>
                          <TableCell>{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{user.department}</TableCell>
                          <TableCell>
                            <Badge variant="default">{user.status}</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" onClick={() => openDialog('edit', user)}>
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => openDialog('delete', user)}>
                                <Trash2 className="w-4 h-4" />
                              </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
                </TabsContent>
                <TabsContent value="faculty" className="mt-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {usersData.filter(u => u.role === 'faculty').map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>{user.id}</TableCell>
                          <TableCell>{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{user.department}</TableCell>
                          <TableCell>
                            <Badge variant="default">{user.status}</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" onClick={() => openDialog('edit', user)}>
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => openDialog('delete', user)}>
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
                <TabsContent value="admin" className="mt-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {usersData.filter(u => u.role === 'admin').map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>{user.id}</TableCell>
                          <TableCell>{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{user.department}</TableCell>
                          <TableCell>
                            <Badge variant="default">{user.status}</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" onClick={() => openDialog('edit', user)}>
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => openDialog('delete', user)}>
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
                <TabsContent value="other" className="mt-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {usersData.filter(u => !['student', 'faculty', 'admin'].includes(u.role)).map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>{user.id}</TableCell>
                          <TableCell>{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <Badge variant="secondary" className="capitalize">{user.role}</Badge>
                          </TableCell>
                          <TableCell>{user.department}</TableCell>
                          <TableCell>
                            <Badge variant="default">{user.status}</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" onClick={() => openDialog('edit', user)}>
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => openDialog('delete', user)}>
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
              </Tabs>
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
                <TabsList className="grid grid-cols-4 lg:grid-cols-8">
                  <TabsTrigger value="student">Student</TabsTrigger>
                  <TabsTrigger value="faculty">Faculty</TabsTrigger>
                  <TabsTrigger value="admin">Admin</TabsTrigger>
                  <TabsTrigger value="principal">Principal</TabsTrigger>
                  <TabsTrigger value="controller">Controller</TabsTrigger>
                  <TabsTrigger value="coordinator">Coordinator</TabsTrigger>
                  <TabsTrigger value="department">HoD</TabsTrigger>
                  <TabsTrigger value="administration">Accountant</TabsTrigger>
                </TabsList>
                <TabsContent value="student" className="mt-4">
                  <div className="space-y-4">
                    <h3 className="text-gray-900">Student Permissions</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {[
                        'View attendance',
                        'View grades',
                        'Submit assignments',
                        'View timetable',
                        'Pay fees online',
                        'Download course materials',
                        'View announcements',
                        'Update profile'
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
                <TabsContent value="faculty" className="mt-4">
                  <div className="space-y-4">
                    <h3 className="text-gray-900">Faculty Permissions</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {[
                        'Mark attendance',
                        'Upload grades',
                        'Create assignments',
                        'Upload course materials',
                        'View student records',
                        'Post announcements',
                        'Generate reports',
                        'Manage courses'
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
                <TabsContent value="admin" className="mt-4">
                  <div className="space-y-4">
                    <h3 className="text-gray-900">Admin Permissions</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {[
                        'Create users',
                        'Edit users',
                        'Delete users',
                        'Manage roles',
                        'System settings',
                        'View all reports',
                        'Manage timetables',
                        'Full system access'
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
                <TabsContent value="principal" className="mt-4">
                  <div className="space-y-4">
                    <h3 className="text-gray-900">Principal Permissions</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {[
                        'View all reports',
                        'Approve budgets',
                        'Manage departments',
                        'Strategic decisions',
                        'Faculty evaluation',
                        'Policy making',
                        'System oversight',
                        'Institutional planning'
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
                <TabsContent value="controller" className="mt-4">
                  <div className="space-y-4">
                    <h3 className="text-gray-900">Controller Permissions</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {[
                        'Manage examinations',
                        'Schedule exams',
                        'Publish results',
                        'Generate transcripts',
                        'Grade verification',
                        'Exam committee access',
                        'Result compilation',
                        'Academic records'
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
                <TabsContent value="coordinator" className="mt-4">
                  <div className="space-y-4">
                    <h3 className="text-gray-900">Coordinator Permissions</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {[
                        'Manage timetables',
                        'Course scheduling',
                        'Room allocation',
                        'Faculty coordination',
                        'Student registration',
                        'Academic planning',
                        'Semester planning',
                        'Event coordination'
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
                <TabsContent value="department" className="mt-4">
                  <div className="space-y-4">
                    <h3 className="text-gray-900">Head of Department Permissions</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {[
                        'Department management',
                        'Faculty supervision',
                        'Course approval',
                        'Budget planning',
                        'Department reports',
                        'Curriculum development',
                        'Faculty hiring',
                        'Resource allocation'
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
                <TabsContent value="administration" className="mt-4">
                  <div className="space-y-4">
                    <h3 className="text-gray-900">Accountant/Administration Permissions</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {[
                        'Fee management',
                        'Payment processing',
                        'Financial reports',
                        'Budget tracking',
                        'Invoice generation',
                        'Payment verification',
                        'Account reconciliation',
                        'Expense management'
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
              </Tabs>
            </CardContent>
          </Card>
        )}

        {activeView === 'timetable' && (
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Timetable Management</CardTitle>
                <Button onClick={() => openDialog('schedule')}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Schedule
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex gap-4">
                <div>
                  <Label>Department</Label>
                  <select className="w-48 p-2 border rounded-md">
                    <option>Computer Science</option>
                    <option>Mathematics</option>
                    <option>Physics</option>
                    <option>Chemistry</option>
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
                  <select
                    className="w-full p-2 border rounded-md"
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value)}
                  >
                    <option value="all">All Users</option>
                    <option value="students">Students Only</option>
                    <option value="faculty">Faculty Only</option>
                    <option value="department">Specific Department</option>
                  </select>
                </div>
                {targetAudience === 'department' && (
                  <div>
                    <Label>Select Department</Label>
                  <select className="w-full p-2 border rounded-md">
                      <option>Computer Science</option>
                      <option>Mathematics</option>
                      <option>Physics</option>
                      <option>Chemistry</option>
                      <option>English</option>
                      <option>Urdu</option>
                      <option>Economics</option>
                      <option>Commerce</option>
                  </select>
                </div>
                )}
                <div>
                  <Label>Message</Label>
                  <textarea className="w-full p-2 border rounded-md" rows={6} placeholder="Enter announcement message..." />
                </div>
                <div className="flex gap-4">
                  <Button onClick={() => toast.success('Announcement published!')}>Publish Now</Button>
                  <Button variant="outline" onClick={() => toast.success('Saved as draft!')}>Save as Draft</Button>
                  <Button variant="outline" onClick={() => toast.success('Scheduled for later!')}>Schedule for Later</Button>
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
                  { name: 'Attendance Report', icon: Users, type: 'attendance' },
                  { name: 'Fee Collection Report', icon: TrendingUp, type: 'fees' },
                  { name: 'Academic Performance', icon: FileText, type: 'performance' },
                  { name: 'Department Statistics', icon: Database, type: 'department' },
                  { name: 'Exam Results Summary', icon: FileText, type: 'exam' },
                  { name: 'System Usage Report', icon: Activity, type: 'usage' },
                ].map((report, i) => (
                  <Card key={i} className="cursor-pointer hover:shadow-lg transition-shadow">
                    <CardContent className="pt-6">
                      <report.icon className="w-10 h-10 text-blue-600 mb-4" />
                      <h3 className="text-gray-900 mb-2">{report.name}</h3>
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full"
                        onClick={() => handleGenerateReport(report.name)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Generate
                      </Button>
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
                      <Input defaultValue="Government Postgraduate College Kohat" />
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

                <Button onClick={() => toast.success('Settings saved successfully!')}>Save Settings</Button>
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
                    { time: '2025-10-18 10:30:15', user: 'admin@college.edu.pk', action: 'User login', ip: '192.168.1.1', status: 'Success' },
                    { time: '2025-10-18 10:25:42', user: 'faculty@college.edu.pk', action: 'Attendance marked', ip: '192.168.1.5', status: 'Success' },
                    { time: '2025-10-18 10:20:18', user: 'student@college.edu.pk', action: 'Assignment submitted', ip: '192.168.1.10', status: 'Success' },
                    { time: '2025-10-18 10:15:30', user: 'principal@college.edu.pk', action: 'Report generated', ip: '192.168.1.2', status: 'Success' },
                    { time: '2025-10-18 10:10:05', user: 'coordinator@college.edu.pk', action: 'Timetable updated', ip: '192.168.1.8', status: 'Success' },
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
        {/* Dialogs */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            {dialogType === 'user' && (
              <>
                <DialogHeader>
                  <DialogTitle>Create New User</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Full Name *</Label>
                    <Input
                      value={userFormData.name}
                      onChange={(e) => setUserFormData({ ...userFormData, name: e.target.value })}
                      placeholder="Enter full name"
                    />
                  </div>
                  <div>
                    <Label>Email Address *</Label>
                    <Input
                      type="email"
                      value={userFormData.email}
                      onChange={(e) => setUserFormData({ ...userFormData, email: e.target.value })}
                      placeholder="email@college.edu.pk"
                    />
                  </div>
                  <div>
                    <Label>Role *</Label>
                    <select
                      className="w-full p-2 border rounded-md"
                      value={userFormData.role}
                      onChange={(e) => setUserFormData({ ...userFormData, role: e.target.value })}
                    >
                      <option value="student">Student</option>
                      <option value="faculty">Faculty</option>
                      <option value="admin">Admin</option>
                      <option value="principal">Principal</option>
                      <option value="controller">Controller</option>
                      <option value="coordinator">Coordinator</option>
                      <option value="department">Head of Department</option>
                      <option value="administration">Accountant/Administration</option>
                    </select>
                  </div>
                  <div>
                    <Label>Department</Label>
                    <Input
                      value={userFormData.department}
                      onChange={(e) => setUserFormData({ ...userFormData, department: e.target.value })}
                      placeholder="Enter department"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                  <Button onClick={handleCreateUser}>Create User</Button>
                </DialogFooter>
              </>
            )}
            {dialogType === 'edit' && selectedItem && (
              <>
                <DialogHeader>
                  <DialogTitle>Edit User - {selectedItem.name}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Full Name *</Label>
                    <Input
                      value={userFormData.name}
                      onChange={(e) => setUserFormData({ ...userFormData, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Email Address *</Label>
                    <Input
                      type="email"
                      value={userFormData.email}
                      onChange={(e) => setUserFormData({ ...userFormData, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Role *</Label>
                    <select
                      className="w-full p-2 border rounded-md"
                      value={userFormData.role}
                      onChange={(e) => setUserFormData({ ...userFormData, role: e.target.value })}
                    >
                      <option value="student">Student</option>
                      <option value="faculty">Faculty</option>
                      <option value="admin">Admin</option>
                      <option value="principal">Principal</option>
                      <option value="controller">Controller</option>
                      <option value="coordinator">Coordinator</option>
                      <option value="department">Head of Department</option>
                      <option value="administration">Accountant/Administration</option>
                    </select>
                  </div>
                  <div>
                    <Label>Department</Label>
                    <Input
                      value={userFormData.department}
                      onChange={(e) => setUserFormData({ ...userFormData, department: e.target.value })}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                  <Button onClick={handleEditUser}>Update User</Button>
                </DialogFooter>
              </>
            )}
            {dialogType === 'delete' && selectedItem && (
              <>
                <DialogHeader>
                  <DialogTitle>Delete User</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to delete this user? This action cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="p-4 bg-red-50 rounded-lg">
                    <p className="text-gray-900">User: {selectedItem.name}</p>
                    <p className="text-sm text-gray-600">Email: {selectedItem.email}</p>
                    <p className="text-sm text-gray-600">Role: {selectedItem.role}</p>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                  <Button variant="destructive" onClick={handleDeleteUser}>Delete User</Button>
                </DialogFooter>
              </>
            )}
            {dialogType === 'schedule' && (
              <>
                <DialogHeader>
                  <DialogTitle>Create New Schedule</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Department *</Label>
                      <select
                        className="w-full p-2 border rounded-md"
                        value={scheduleFormData.department}
                        onChange={(e) => setScheduleFormData({ ...scheduleFormData, department: e.target.value })}
                      >
                        <option value="">Select department</option>
                        <option value="cs">Computer Science</option>
                        <option value="math">Mathematics</option>
                        <option value="physics">Physics</option>
                        <option value="chemistry">Chemistry</option>
                      </select>
                    </div>
                    <div>
                      <Label>Semester *</Label>
                      <select
                        className="w-full p-2 border rounded-md"
                        value={scheduleFormData.semester}
                        onChange={(e) => setScheduleFormData({ ...scheduleFormData, semester: e.target.value })}
                      >
                        <option value="">Select semester</option>
                        <option value="fall2024">Fall 2024</option>
                        <option value="spring2025">Spring 2025</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Day *</Label>
                      <select
                        className="w-full p-2 border rounded-md"
                        value={scheduleFormData.day}
                        onChange={(e) => setScheduleFormData({ ...scheduleFormData, day: e.target.value })}
                      >
                        <option value="">Select day</option>
                        <option value="monday">Monday</option>
                        <option value="tuesday">Tuesday</option>
                        <option value="wednesday">Wednesday</option>
                        <option value="thursday">Thursday</option>
                        <option value="friday">Friday</option>
                      </select>
                    </div>
                    <div>
                      <Label>Time *</Label>
                      <select
                        className="w-full p-2 border rounded-md"
                        value={scheduleFormData.time}
                        onChange={(e) => setScheduleFormData({ ...scheduleFormData, time: e.target.value })}
                      >
                        <option value="">Select time</option>
                        <option value="9-10:30">9:00 - 10:30</option>
                        <option value="10:45-12:15">10:45 - 12:15</option>
                        <option value="1:30-3:00">1:30 - 3:00</option>
                        <option value="3:15-4:45">3:15 - 4:45</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <Label>Course *</Label>
                    <Input
                      value={scheduleFormData.course}
                      onChange={(e) => setScheduleFormData({ ...scheduleFormData, course: e.target.value })}
                      placeholder="e.g., CS-201"
                    />
                  </div>
                  <div>
                    <Label>Room Number</Label>
                    <Input
                      value={scheduleFormData.room}
                      onChange={(e) => setScheduleFormData({ ...scheduleFormData, room: e.target.value })}
                      placeholder="e.g., Room 101"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                  <Button onClick={handleCreateSchedule}>Create Schedule</Button>
                </DialogFooter>
              </>
            )}
            {dialogType === 'report' && selectedItem && (
              <>
                <DialogHeader>
                  <DialogTitle>{selectedItem.type}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  {selectedItem.type === 'Attendance Report' && (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Department</TableHead>
                          <TableHead>Total Students</TableHead>
                          <TableHead>Avg Attendance</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {reportData.attendance.map((row, idx) => (
                          <TableRow key={idx}>
                            <TableCell>{row.department}</TableCell>
                            <TableCell>{row.totalStudents}</TableCell>
                            <TableCell>{row.avgAttendance}%</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                  {selectedItem.type === 'Fee Collection Report' && (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Semester</TableHead>
                          <TableHead>Collected</TableHead>
                          <TableHead>Pending</TableHead>
                          <TableHead>Total</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {reportData.fees.map((row, idx) => (
                          <TableRow key={idx}>
                            <TableCell>{row.semester}</TableCell>
                            <TableCell>PKR {(row.collected / 1000000).toFixed(1)}M</TableCell>
                            <TableCell>PKR {(row.pending / 1000000).toFixed(1)}M</TableCell>
                            <TableCell>PKR {(row.total / 1000000).toFixed(1)}M</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                  {selectedItem.type === 'Academic Performance' && (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Department</TableHead>
                          <TableHead>Avg GPA</TableHead>
                          <TableHead>Pass Rate</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {reportData.performance.map((row, idx) => (
                          <TableRow key={idx}>
                            <TableCell>{row.department}</TableCell>
                            <TableCell>{row.avgGPA}</TableCell>
                            <TableCell>{row.passRate}%</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                  {!['Attendance Report', 'Fee Collection Report', 'Academic Performance'].includes(selectedItem.type) && (
                    <div className="p-4 bg-gray-50 rounded-lg text-center">
                      <p className="text-gray-600">Report data will be displayed here</p>
                    </div>
                  )}
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Close</Button>
                  <Button onClick={() => toast.success('Downloading report...')}>
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
