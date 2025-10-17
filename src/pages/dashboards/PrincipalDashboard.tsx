import { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Progress } from '../../components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import {
  LayoutDashboard, TrendingUp, Users, DollarSign, Award,
  FileText, Bell, Activity, Target
} from 'lucide-react';
import type { User } from '../../App';

interface PrincipalDashboardProps {
  user: User;
  onLogout: () => void;
}

export default function PrincipalDashboard({ user, onLogout }: PrincipalDashboardProps) {
  const [activeView, setActiveView] = useState('overview');

  const navigation = [
    { name: 'Dashboard', icon: LayoutDashboard, onClick: () => setActiveView('overview') },
    { name: 'Academic Performance', icon: TrendingUp, onClick: () => setActiveView('academic') },
    { name: 'Financial Reports', icon: DollarSign, onClick: () => setActiveView('financial') },
    { name: 'Departmental Reports', icon: FileText, onClick: () => setActiveView('departments') },
    { name: 'Exam Results', icon: Award, onClick: () => setActiveView('results') },
    { name: 'Announcements', icon: Bell, onClick: () => setActiveView('announcements') },
    { name: 'System Monitoring', icon: Activity, onClick: () => setActiveView('monitoring') },
  ];

  const kpis = [
    { label: 'Student Pass Rate', value: '94.5%', target: '95%', progress: 94.5, icon: Award, color: 'text-green-600' },
    { label: 'Overall Attendance', value: '87.2%', target: '85%', progress: 87.2, icon: Users, color: 'text-blue-600' },
    { label: 'Fee Collection', value: '92.8%', target: '95%', progress: 92.8, icon: DollarSign, color: 'text-purple-600' },
    { label: 'Faculty Satisfaction', value: '88.5%', target: '90%', progress: 88.5, icon: Users, color: 'text-orange-600' },
  ];

  const departmentPerformance = [
    { department: 'Computer Science', students: 1200, passRate: 96, avgGPA: 3.52, facultyCount: 35 },
    { department: 'Business Administration', students: 1500, passRate: 94, avgGPA: 3.45, facultyCount: 42 },
    { department: 'Engineering', students: 2300, passRate: 93, avgGPA: 3.38, facultyCount: 73 },
  ];

  return (
    <DashboardLayout user={user} onLogout={onLogout} navigation={navigation}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-gray-900 mb-2">Principal Dashboard</h1>
          <p className="text-gray-600">Institutional Performance Overview</p>
        </div>

        {activeView === 'overview' && (
          <div className="space-y-6">
            {/* KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {kpis.map((kpi, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-sm text-gray-600">{kpi.label}</p>
                        <p className="text-gray-900">{kpi.value}</p>
                        <p className="text-xs text-gray-500">Target: {kpi.target}</p>
                      </div>
                      <kpi.icon className={`w-10 h-10 ${kpi.color}`} />
                    </div>
                    <Progress value={kpi.progress} className="h-2" />
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Department Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Department Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Department</TableHead>
                      <TableHead>Students</TableHead>
                      <TableHead>Pass Rate</TableHead>
                      <TableHead>Avg GPA</TableHead>
                      <TableHead>Faculty</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {departmentPerformance.map((dept, index) => (
                      <TableRow key={index}>
                        <TableCell>{dept.department}</TableCell>
                        <TableCell>{dept.students}</TableCell>
                        <TableCell className="text-green-600">{dept.passRate}%</TableCell>
                        <TableCell>{dept.avgGPA}</TableCell>
                        <TableCell>{dept.facultyCount}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <Users className="w-10 h-10 text-blue-600 mb-4" />
                  <p className="text-sm text-gray-600">Total Students</p>
                  <p className="text-gray-900 mb-2">5,000</p>
                  <p className="text-xs text-green-600">↑ 8% from last year</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <Users className="w-10 h-10 text-purple-600 mb-4" />
                  <p className="text-sm text-gray-600">Faculty Members</p>
                  <p className="text-gray-900 mb-2">150</p>
                  <p className="text-xs text-green-600">↑ 5% from last year</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <Award className="w-10 h-10 text-orange-600 mb-4" />
                  <p className="text-sm text-gray-600">Programs Offered</p>
                  <p className="text-gray-900 mb-2">25</p>
                  <p className="text-xs text-gray-500">Across 3 departments</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeView === 'academic' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Academic Performance Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-900">Overall Pass Rate</span>
                      <span className="text-green-600">94.5%</span>
                    </div>
                    <Progress value={94.5} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-900">Student Satisfaction</span>
                      <span className="text-blue-600">89.2%</span>
                    </div>
                    <Progress value={89.2} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-900">Placement Rate</span>
                      <span className="text-purple-600">92.0%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Semester-wise Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Semester</TableHead>
                      <TableHead>Enrolled</TableHead>
                      <TableHead>Pass Rate</TableHead>
                      <TableHead>Avg GPA</TableHead>
                      <TableHead>Distinction</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Fall 2024</TableCell>
                      <TableCell>5,000</TableCell>
                      <TableCell>94.5%</TableCell>
                      <TableCell>3.45</TableCell>
                      <TableCell>32%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Spring 2024</TableCell>
                      <TableCell>4,850</TableCell>
                      <TableCell>93.8%</TableCell>
                      <TableCell>3.42</TableCell>
                      <TableCell>30%</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        )}

        {activeView === 'financial' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <DollarSign className="w-10 h-10 text-green-600 mb-4" />
                  <p className="text-sm text-gray-600">Total Fee Collection</p>
                  <p className="text-gray-900">PKR 375M</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <DollarSign className="w-10 h-10 text-blue-600 mb-4" />
                  <p className="text-sm text-gray-600">Outstanding Fees</p>
                  <p className="text-gray-900">PKR 27M</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <DollarSign className="w-10 h-10 text-purple-600 mb-4" />
                  <p className="text-sm text-gray-600">Scholarship Distributed</p>
                  <p className="text-gray-900">PKR 15M</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Department-wise Fee Collection</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Department</TableHead>
                      <TableHead>Expected</TableHead>
                      <TableHead>Collected</TableHead>
                      <TableHead>Outstanding</TableHead>
                      <TableHead>Collection %</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Computer Science</TableCell>
                      <TableCell>PKR 90M</TableCell>
                      <TableCell>PKR 85M</TableCell>
                      <TableCell>PKR 5M</TableCell>
                      <TableCell className="text-green-600">94.4%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Business Administration</TableCell>
                      <TableCell>PKR 112M</TableCell>
                      <TableCell>PKR 104M</TableCell>
                      <TableCell>PKR 8M</TableCell>
                      <TableCell className="text-green-600">92.9%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Engineering</TableCell>
                      <TableCell>PKR 173M</TableCell>
                      <TableCell>PKR 159M</TableCell>
                      <TableCell>PKR 14M</TableCell>
                      <TableCell className="text-green-600">91.9%</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        )}

        {activeView === 'announcements' && (
          <Card>
            <CardHeader>
              <CardTitle>Create Institution-wide Announcement</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-2">Announcement Title</label>
                  <input type="text" className="w-full p-2 border rounded-md" placeholder="Enter title..." />
                </div>
                <div>
                  <label className="block text-sm mb-2">Message</label>
                  <textarea className="w-full p-2 border rounded-md" rows={6} placeholder="Enter message..." />
                </div>
                <div>
                  <label className="block text-sm mb-2">Priority</label>
                  <select className="w-full p-2 border rounded-md">
                    <option>Normal</option>
                    <option>High</option>
                    <option>Urgent</option>
                  </select>
                </div>
                <Button>Publish Announcement</Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
