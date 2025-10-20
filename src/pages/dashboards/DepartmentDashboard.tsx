import { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Badge } from '../../components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../../components/ui/dialog';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { LayoutDashboard, Calendar, FileCheck, BookOpen, TrendingUp, Bell, UserPlus, Users } from 'lucide-react';
import { toast } from 'sonner';
import type { User } from '../../App';
import { AdmissionManagement } from '../../components/AdmissionManagement';
import { PromotionManagement } from '../../components/PromotionManagement';

interface DepartmentDashboardProps {
  user: User;
  onLogout: () => void;
}

export default function DepartmentDashboard({ user, onLogout }: DepartmentDashboardProps) {
  const [activeView, setActiveView] = useState('overview');
  const [scheduleDialog, setScheduleDialog] = useState(false);
  const [viewMarksDialog, setViewMarksDialog] = useState(false);
  const [approveMarksDialog, setApproveMarksDialog] = useState(false);
  const [viewCurriculumDialog, setViewCurriculumDialog] = useState(false);
  const [updateSyllabusDialog, setUpdateSyllabusDialog] = useState(false);
  const [announcementDialog, setAnnouncementDialog] = useState(false);
  const [editAnnouncementDialog, setEditAnnouncementDialog] = useState(false);
  const [deleteAnnouncementDialog, setDeleteAnnouncementDialog] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [selectedProgram, setSelectedProgram] = useState<string>('');
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<any>(null);

  const navigation = [
    { name: 'Dashboard', icon: LayoutDashboard, onClick: () => setActiveView('overview') },
    { name: 'Admissions', icon: UserPlus, onClick: () => setActiveView('admissions') },
    { name: 'Promotions', icon: Users, onClick: () => setActiveView('promotions') },
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
                        <Button size="sm" onClick={() => {
                          setSelectedCourse({ course: 'CS-201', faculty: 'Prof. John Doe', examType: 'Midterm', students: 45 });
                          setViewMarksDialog(true);
                        }}>Review</Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        )}

        {activeView === 'admissions' && (
          <AdmissionManagement role="hod" userName={user.name} />
        )}
        {activeView === 'promotions' && (
          <PromotionManagement role="hod" userName={user.name} />
        )}
        {activeView === 'exams' && (
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Exam Schedule Management</CardTitle>
                <Button onClick={() => setScheduleDialog(true)}>Create New Schedule</Button>
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
                        <Button size="sm" variant="outline" onClick={() => {
                          setSelectedCourse({ course: 'CS-201', faculty: 'Prof. John Doe', examType: 'Midterm', students: 45 });
                          setViewMarksDialog(true);
                        }}>View</Button>
                        <Button size="sm" onClick={() => {
                          setSelectedCourse({ course: 'CS-201', faculty: 'Prof. John Doe', examType: 'Midterm', students: 45 });
                          setApproveMarksDialog(true);
                        }}>Approve</Button>
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
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSelectedProgram(program);
                          setViewCurriculumDialog(true);
                        }}
                      >
                        View Curriculum
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSelectedProgram(program);
                          setUpdateSyllabusDialog(true);
                        }}
                      >
                        Update Syllabus
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
        {activeView === 'reports' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Department Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { title: 'Student Performance Report', description: 'Semester-wise academic performance analysis' },
                    { title: 'Faculty Teaching Load', description: 'Credit hours and course allocation report' },
                    { title: 'Course Completion Report', description: 'Course completion rates and outcomes' },
                    { title: 'Attendance Summary', description: 'Department-wide attendance statistics' },
                    { title: 'Examination Analysis', description: 'Pass rates and grade distribution' },
                    { title: 'Resource Utilization', description: 'Lab and classroom usage report' },
                  ].map((report, i) => (
                    <div key={i} className="p-4 border rounded-lg hover:border-blue-500 transition-colors">
                      <h3 className="text-gray-900 mb-1">{report.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{report.description}</p>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">View Report</Button>
                        <Button size="sm" variant="outline">Download PDF</Button>
                      </div>
                    </div>
                  ))}
                  </div>
              </CardContent>
            </Card>
          </div>
        )}
        {activeView === 'announcements' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Department Announcements</CardTitle>
                  <Button onClick={() => setAnnouncementDialog(true)}>Create Announcement</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      title: 'Midterm Examination Schedule Released',
                      date: '2025-10-18',
                      priority: 'High',
                      content: 'The midterm examination schedule for Fall 2025 has been published. Students are advised to check the notice board.'
                    },
                    {
                      title: 'Workshop on AI and Machine Learning',
                      date: '2025-10-15',
                      priority: 'Medium',
                      content: 'A two-day workshop on AI/ML will be conducted on Oct 25-26. Registration is open for all faculty and students.'
                    },
                    {
                      title: 'Lab Maintenance Schedule',
                      date: '2025-10-10',
                      priority: 'Low',
                      content: 'Computer labs will be closed for maintenance on Oct 22nd. Classes will be rescheduled accordingly.'
                    },
                  ].map((announcement, i) => (
                    <div key={i} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-gray-900">{announcement.title}</h3>
                        <Badge variant={
                          announcement.priority === 'High' ? 'destructive' :
                          announcement.priority === 'Medium' ? 'default' : 'secondary'
                        }>
                          {announcement.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{announcement.content}</p>
                      <p className="text-xs text-gray-500">{announcement.date}</p>
                      <div className="flex gap-2 mt-3">
                        <Button size="sm" variant="outline" onClick={() => {
                          setSelectedAnnouncement(announcement);
                          setEditAnnouncementDialog(true);
                        }}>Edit</Button>
                        <Button size="sm" variant="outline" onClick={() => {
                          setSelectedAnnouncement(announcement);
                          setDeleteAnnouncementDialog(true);
                        }}>Delete</Button>
                      </div>
                    </div>
                ))}
              </div>
            </CardContent>
          </Card>
          </div>
        )}
      </div>
      {/* Create Schedule Dialog */}
      <Dialog open={scheduleDialog} onOpenChange={setScheduleDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create Exam Schedule</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Course</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select course" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cs201">CS-201 Data Structures</SelectItem>
                    <SelectItem value="cs301">CS-301 Database Systems</SelectItem>
                    <SelectItem value="cs401">CS-401 Software Engineering</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Exam Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="midterm">Midterm</SelectItem>
                    <SelectItem value="final">Final</SelectItem>
                    <SelectItem value="quiz">Quiz</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Date</Label>
                <Input type="date" />
              </div>
              <div className="space-y-2">
                <Label>Time</Label>
                <Input type="time" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Room</Label>
                <Input placeholder="e.g., Room 301" />
              </div>
              <div className="space-y-2">
                <Label>Duration (minutes)</Label>
                <Input type="number" placeholder="e.g., 120" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Invigilators</Label>
              <Input placeholder="Enter faculty names" />
            </div>
            <div className="space-y-2">
              <Label>Special Instructions</Label>
              <Textarea placeholder="Any special instructions..." />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setScheduleDialog(false)}>Cancel</Button>
            <Button onClick={() => {
              toast.success('Exam schedule created successfully');
              setScheduleDialog(false);
            }}>Create Schedule</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* View Marks Dialog */}
      <Dialog open={viewMarksDialog} onOpenChange={setViewMarksDialog}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>View Examination Marks - {selectedCourse?.course}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-600">Faculty</p>
                <p className="text-gray-900">{selectedCourse?.faculty}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Exam Type</p>
                <p className="text-gray-900">{selectedCourse?.examType}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Students</p>
                <p className="text-gray-900">{selectedCourse?.students}</p>
              </div>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Roll No</TableHead>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Marks Obtained</TableHead>
                  <TableHead>Total Marks</TableHead>
                  <TableHead>Percentage</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell>CS-2023-{String(i + 1).padStart(3, '0')}</TableCell>
                    <TableCell>Student {i + 1}</TableCell>
                    <TableCell>{75 + i * 5}</TableCell>
                    <TableCell>100</TableCell>
                    <TableCell>{75 + i * 5}%</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewMarksDialog(false)}>Close</Button>
            <Button onClick={() => {
              setViewMarksDialog(false);
              setApproveMarksDialog(true);
            }}>Approve These Marks</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Approve Marks Confirmation Dialog */}
      <Dialog open={approveMarksDialog} onOpenChange={setApproveMarksDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Marks Approval</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-gray-600">
              Are you sure you want to approve the marks for <strong>{selectedCourse?.course}</strong>?
              This action will make the marks visible to students and cannot be undone.
            </p>
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                Please verify all marks are correctly entered before approval.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setApproveMarksDialog(false)}>Cancel</Button>
            <Button onClick={() => {
              toast.success('Marks approved successfully');
              setApproveMarksDialog(false);
            }}>Confirm Approval</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* View Curriculum Dialog */}
      <Dialog open={viewCurriculumDialog} onOpenChange={setViewCurriculumDialog}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedProgram} - Curriculum</DialogTitle>
          </DialogHeader>
          <Tabs defaultValue="semester1">
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="semester1">Semester 1</TabsTrigger>
              <TabsTrigger value="semester2">Semester 2</TabsTrigger>
              <TabsTrigger value="semester3">Semester 3</TabsTrigger>
              <TabsTrigger value="semester4">Semester 4</TabsTrigger>
            </TabsList>
            <TabsContent value="semester1" className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Course Code</TableHead>
                    <TableHead>Course Title</TableHead>
                    <TableHead>Credit Hours</TableHead>
                    <TableHead>Type</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { code: 'CS-101', title: 'Introduction to Programming', credit: 3, type: 'Core' },
                    { code: 'CS-102', title: 'Discrete Mathematics', credit: 3, type: 'Core' },
                    { code: 'ENG-101', title: 'English Composition', credit: 3, type: 'General' },
                    { code: 'MATH-101', title: 'Calculus I', credit: 3, type: 'Core' },
                  ].map((course, i) => (
                    <TableRow key={i}>
                      <TableCell>{course.code}</TableCell>
                      <TableCell>{course.title}</TableCell>
                      <TableCell>{course.credit}</TableCell>
                      <TableCell><Badge variant="secondary">{course.type}</Badge></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="semester2">
              <p className="text-gray-600">Semester 2 curriculum details...</p>
            </TabsContent>
            <TabsContent value="semester3">
              <p className="text-gray-600">Semester 3 curriculum details...</p>
            </TabsContent>
            <TabsContent value="semester4">
              <p className="text-gray-600">Semester 4 curriculum details...</p>
            </TabsContent>
          </Tabs>
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewCurriculumDialog(false)}>Close</Button>
            <Button variant="outline">Download PDF</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Update Syllabus Dialog */}
      <Dialog open={updateSyllabusDialog} onOpenChange={setUpdateSyllabusDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Update Syllabus - {selectedProgram}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Select Course</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cs101">CS-101 Introduction to Programming</SelectItem>
                  <SelectItem value="cs201">CS-201 Data Structures</SelectItem>
                  <SelectItem value="cs301">CS-301 Database Systems</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Course Objectives</Label>
              <Textarea placeholder="Enter course objectives..." rows={3} />
            </div>
            <div className="space-y-2">
              <Label>Course Content/Topics</Label>
              <Textarea placeholder="Enter course topics and content..." rows={5} />
            </div>
            <div className="space-y-2">
              <Label>Learning Outcomes</Label>
              <Textarea placeholder="Enter expected learning outcomes..." rows={3} />
            </div>
            <div className="space-y-2">
              <Label>Recommended Books</Label>
              <Textarea placeholder="Enter recommended textbooks and references..." rows={3} />
            </div>
            <div className="space-y-2">
              <Label>Assessment Scheme</Label>
              <div className="grid grid-cols-3 gap-2">
                <Input placeholder="Assignments %" />
                <Input placeholder="Midterm %" />
                <Input placeholder="Final %" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setUpdateSyllabusDialog(false)}>Cancel</Button>
            <Button onClick={() => {
              toast.success('Syllabus updated successfully');
              setUpdateSyllabusDialog(false);
            }}>Update Syllabus</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Create Announcement Dialog */}
      <Dialog open={announcementDialog} onOpenChange={setAnnouncementDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create Department Announcement</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Announcement Title</Label>
              <Input placeholder="Enter announcement title" />
            </div>
            <div className="space-y-2">
              <Label>Priority</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Target Audience</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select audience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Department</SelectItem>
                  <SelectItem value="faculty">Faculty Only</SelectItem>
                  <SelectItem value="students">Students Only</SelectItem>
                  <SelectItem value="specific">Specific Program</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Announcement Content</Label>
              <Textarea placeholder="Enter announcement details..." rows={6} />
            </div>
            <div className="space-y-2">
              <Label>Valid Until</Label>
              <Input type="date" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAnnouncementDialog(false)}>Cancel</Button>
            <Button onClick={() => {
              toast.success('Announcement created successfully');
              setAnnouncementDialog(false);
            }}>Publish Announcement</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Edit Announcement Dialog */}
      <Dialog open={editAnnouncementDialog} onOpenChange={setEditAnnouncementDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Department Announcement</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Announcement Title</Label>
              <Input placeholder="Enter announcement title" defaultValue={selectedAnnouncement?.title} />
            </div>
            <div className="space-y-2">
              <Label>Priority</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Target Audience</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select audience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Department</SelectItem>
                  <SelectItem value="faculty">Faculty Only</SelectItem>
                  <SelectItem value="students">Students Only</SelectItem>
                  <SelectItem value="specific">Specific Program</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Announcement Content</Label>
              <Textarea placeholder="Enter announcement details..." rows={6} defaultValue={selectedAnnouncement?.content} />
            </div>
            <div className="space-y-2">
              <Label>Valid Until</Label>
              <Input type="date" defaultValue={selectedAnnouncement?.date} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditAnnouncementDialog(false)}>Cancel</Button>
            <Button onClick={() => {
              toast.success('Announcement updated successfully');
              setEditAnnouncementDialog(false);
            }}>Update Announcement</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Delete Announcement Confirmation Dialog */}
      <Dialog open={deleteAnnouncementDialog} onOpenChange={setDeleteAnnouncementDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Announcement Deletion</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-gray-600">
              Are you sure you want to delete the announcement titled <strong>{selectedAnnouncement?.title}</strong>?
              This action will permanently remove the announcement.
            </p>
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-800">
                This action cannot be undone.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteAnnouncementDialog(false)}>Cancel</Button>
            <Button onClick={() => {
              toast.success('Announcement deleted successfully');
              setDeleteAnnouncementDialog(false);
            }}>Confirm Deletion</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
