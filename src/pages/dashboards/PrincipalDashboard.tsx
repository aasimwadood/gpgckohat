import { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Progress } from '../../components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Badge } from '../../components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../../components/ui/dialog';
import {
  LayoutDashboard, TrendingUp, Users, DollarSign, Award,
  FileText, Bell, Activity, Target, Download, Eye, AlertCircle
} from 'lucide-react';
import { toast } from 'sonner';
import type { User } from '../../App';

interface PrincipalDashboardProps {
  user: User;
  onLogout: () => void;
}

export default function PrincipalDashboard({ user, onLogout }: PrincipalDashboardProps) {
  const [activeView, setActiveView] = useState('overview');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<any>(null);

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
    { department: 'Computer Science', students: 1200, passRate: 96, avgGPA: 3.52, facultyCount: 35, attendance: 88 },
    { department: 'Mathematics', students: 800, passRate: 94, avgGPA: 3.48, facultyCount: 25, attendance: 86 },
    { department: 'Physics', students: 650, passRate: 93, avgGPA: 3.42, facultyCount: 22, attendance: 85 },
    { department: 'Chemistry', students: 720, passRate: 92, avgGPA: 3.40, facultyCount: 24, attendance: 87 },
    { department: 'English', students: 500, passRate: 95, avgGPA: 3.55, facultyCount: 18, attendance: 90 },
  ];

  const examResults = [
    {
      semester: 'Fall 2024',
      department: 'Computer Science',
      totalStudents: 1200,
      appeared: 1180,
      passed: 1132,
      failed: 48,
      passPercentage: 95.9,
      avgGPA: 3.52,
      toppers: ['Ahmed Khan (3.95)', 'Sara Ali (3.92)', 'Hassan Mahmood (3.88)']
    },
    {
      semester: 'Fall 2024',
      department: 'Mathematics',
      totalStudents: 800,
      appeared: 790,
      passed: 742,
      failed: 48,
      passPercentage: 93.9,
      avgGPA: 3.48,
      toppers: ['Ayesha Siddiqui (3.97)', 'Usman Tariq (3.90)', 'Fatima Khan (3.85)']
    },
    {
      semester: 'Fall 2024',
      department: 'Physics',
      totalStudents: 650,
      appeared: 640,
      passed: 595,
      failed: 45,
      passPercentage: 93.0,
      avgGPA: 3.42,
      toppers: ['Ali Raza (3.93)', 'Zainab Shah (3.89)', 'Hamza Ahmed (3.84)']
    }
  ];

  const systemHealth = [
    { service: 'Application Server', status: 'Healthy', uptime: '99.9%', responseTime: '120ms' },
    { service: 'Database Server', status: 'Healthy', uptime: '99.8%', responseTime: '45ms' },
    { service: 'Authentication Service', status: 'Healthy', uptime: '100%', responseTime: '35ms' },
    { service: 'File Storage', status: 'Warning', uptime: '98.5%', responseTime: '200ms' },
    { service: 'Email Service', status: 'Healthy', uptime: '99.7%', responseTime: '150ms' },
  ];

  const systemMetrics = [
    { metric: 'Active Users (Now)', value: '2,847', change: '+12%' },
    { metric: 'Peak Users (Today)', value: '3,542', change: '+8%' },
    { metric: 'Total Requests (24h)', value: '1.2M', change: '+15%' },
    { metric: 'Error Rate', value: '0.02%', change: '-5%' },
    { metric: 'Avg Response Time', value: '98ms', change: '-12%' },
    { metric: 'Server CPU Usage', value: '45%', change: '+3%' },
  ];

  const viewDepartmentReport = (dept: any) => {
    setSelectedReport(dept);
    setIsDialogOpen(true);
  };

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
                <CardTitle>Department Performance Overview</CardTitle>
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
                      <TableHead>Action</TableHead>
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
                        <TableCell>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => viewDepartmentReport(dept)}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                        </TableCell>
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
                  <p className="text-xs text-gray-500">Across 5 departments</p>
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
                    <TableRow>
                      <TableCell>Fall 2023</TableCell>
                      <TableCell>4,700</TableCell>
                      <TableCell>93.2%</TableCell>
                      <TableCell>3.38</TableCell>
                      <TableCell>28%</TableCell>
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
                <div className="flex justify-between items-center">
                  <CardTitle>Department-wise Fee Collection</CardTitle>
                  <Button size="sm" variant="outline" onClick={() => toast.success('Downloading report...')}>
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
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
                      <TableCell>Mathematics</TableCell>
                      <TableCell>PKR 60M</TableCell>
                      <TableCell>PKR 56M</TableCell>
                      <TableCell>PKR 4M</TableCell>
                      <TableCell className="text-green-600">93.3%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Physics</TableCell>
                      <TableCell>PKR 49M</TableCell>
                      <TableCell>PKR 45M</TableCell>
                      <TableCell>PKR 4M</TableCell>
                      <TableCell className="text-green-600">91.8%</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        )}

        {activeView === 'departments' && (
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Departmental Reports</CardTitle>
                <Button size="sm" variant="outline" onClick={() => toast.success('Downloading all departmental reports...')}>
                  <Download className="w-4 h-4 mr-2" />
                  Download All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Department</TableHead>
                    <TableHead>Total Students</TableHead>
                    <TableHead>Faculty</TableHead>
                    <TableHead>Attendance</TableHead>
                    <TableHead>Pass Rate</TableHead>
                    <TableHead>Avg GPA</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {departmentPerformance.map((dept, index) => (
                    <TableRow key={index}>
                      <TableCell>{dept.department}</TableCell>
                      <TableCell>{dept.students}</TableCell>
                      <TableCell>{dept.facultyCount}</TableCell>
                      <TableCell>{dept.attendance}%</TableCell>
                      <TableCell>
                        <Badge variant={dept.passRate >= 90 ? 'default' : 'secondary'}>
                          {dept.passRate}%
                        </Badge>
                      </TableCell>
                      <TableCell>{dept.avgGPA}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => viewDepartmentReport(dept)}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => toast.success(`Downloading ${dept.department} report...`)}
                          >
                            <Download className="w-4 h-4" />
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

        {activeView === 'results' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Exam Results - Fall 2024</CardTitle>
                  <Button size="sm" variant="outline" onClick={() => toast.success('Downloading consolidated results...')}>
                    <Download className="w-4 h-4 mr-2" />
                    Download Report
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {examResults.map((result, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-gray-900 mb-1">{result.department}</h3>
                          <p className="text-sm text-gray-600">{result.semester}</p>
                        </div>
                        <Badge variant="default" className="bg-green-600">
                          Pass Rate: {result.passPercentage}%
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div className="p-3 bg-blue-50 rounded">
                          <p className="text-xs text-gray-600">Total Students</p>
                          <p className="text-gray-900">{result.totalStudents}</p>
                        </div>
                        <div className="p-3 bg-green-50 rounded">
                          <p className="text-xs text-gray-600">Appeared</p>
                          <p className="text-gray-900">{result.appeared}</p>
                        </div>
                        <div className="p-3 bg-green-50 rounded">
                          <p className="text-xs text-gray-600">Passed</p>
                          <p className="text-green-600">{result.passed}</p>
                        </div>
                        <div className="p-3 bg-red-50 rounded">
                          <p className="text-xs text-gray-600">Failed</p>
                          <p className="text-red-600">{result.failed}</p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-600">Average GPA</span>
                          <span className="text-gray-900">{result.avgGPA}</span>
                        </div>
                        <Progress value={(result.avgGPA / 4) * 100} className="h-2" />
                      </div>

                      <div>
                        <p className="text-sm text-gray-600 mb-2">Top Performers:</p>
                        <div className="flex flex-wrap gap-2">
                          {result.toppers.map((topper, idx) => (
                            <Badge key={idx} variant="outline" className="bg-yellow-50">
                              🏆 {topper}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeView === 'monitoring' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>System Health Status</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Service</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Uptime</TableHead>
                      <TableHead>Response Time</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {systemHealth.map((service, index) => (
                      <TableRow key={index}>
                        <TableCell>{service.service}</TableCell>
                        <TableCell>
                          <Badge
                            variant={service.status === 'Healthy' ? 'default' : 'secondary'}
                            className={service.status === 'Healthy' ? 'bg-green-600' : 'bg-orange-500'}
                          >
                            {service.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{service.uptime}</TableCell>
                        <TableCell>{service.responseTime}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Metrics (Last 24 Hours)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {systemMetrics.map((metric, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <p className="text-sm text-gray-600">{metric.metric}</p>
                      <div className="flex items-baseline justify-between mt-2">
                        <p className="text-gray-900">{metric.value}</p>
                        <span className={`text-xs ${
                          metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {metric.change}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5" />
                    <div>
                      <p className="text-gray-900">File Storage Service - High Response Time</p>
                      <p className="text-sm text-gray-600">Response time above threshold (200ms). Investigating...</p>
                      <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                    <Activity className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="text-gray-900">System Update Completed Successfully</p>
                      <p className="text-sm text-gray-600">All services updated to latest version</p>
                      <p className="text-xs text-gray-500 mt-1">5 hours ago</p>
                    </div>
                  </div>
                </div>
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
                <Button onClick={() => toast.success('Announcement published successfully!')}>
                  Publish Announcement
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Department Report Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            {selectedReport && (
              <>
                <DialogHeader>
                  <DialogTitle>Detailed Report - {selectedReport.department}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-3 bg-blue-50 rounded">
                      <p className="text-xs text-gray-600">Total Students</p>
                      <p className="text-gray-900">{selectedReport.students}</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded">
                      <p className="text-xs text-gray-600">Faculty Count</p>
                      <p className="text-gray-900">{selectedReport.facultyCount}</p>
                    </div>
                    <div className="p-3 bg-purple-50 rounded">
                      <p className="text-xs text-gray-600">Pass Rate</p>
                      <p className="text-green-600">{selectedReport.passRate}%</p>
                    </div>
                    <div className="p-3 bg-orange-50 rounded">
                      <p className="text-xs text-gray-600">Avg GPA</p>
                      <p className="text-gray-900">{selectedReport.avgGPA}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-gray-900 mb-3">Performance Metrics</h4>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-gray-600">Attendance Rate</span>
                          <span className="text-gray-900">{selectedReport.attendance}%</span>
                        </div>
                        <Progress value={selectedReport.attendance} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-gray-600">Pass Rate</span>
                          <span className="text-gray-900">{selectedReport.passRate}%</span>
                        </div>
                        <Progress value={selectedReport.passRate} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-gray-600">GPA Performance</span>
                          <span className="text-gray-900">{selectedReport.avgGPA}/4.0</span>
                        </div>
                        <Progress value={(selectedReport.avgGPA / 4) * 100} className="h-2" />
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-700">
                      The {selectedReport.department} department is performing well with {selectedReport.students} students
                      and {selectedReport.facultyCount} faculty members. The pass rate of {selectedReport.passRate}%
                      and average GPA of {selectedReport.avgGPA} indicate strong academic performance.
                    </p>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Close</Button>
                  <Button onClick={() => toast.success(`Downloading ${selectedReport.department} report...`)}>
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
