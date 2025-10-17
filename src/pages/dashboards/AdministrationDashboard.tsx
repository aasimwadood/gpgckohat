import { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { LayoutDashboard, DollarSign, BookOpen, HelpCircle, Calendar } from 'lucide-react';
import type { User } from '../../App';

interface AdministrationDashboardProps {
  user: User;
  onLogout: () => void;
}

export default function AdministrationDashboard({ user, onLogout }: AdministrationDashboardProps) {
  const [activeView, setActiveView] = useState('overview');

  const navigation = [
    { name: 'Dashboard', icon: LayoutDashboard, onClick: () => setActiveView('overview') },
    { name: 'Finance & Fees', icon: DollarSign, onClick: () => setActiveView('finance') },
    { name: 'Library Management', icon: BookOpen, onClick: () => setActiveView('library') },
    { name: 'Helpdesk', icon: HelpCircle, onClick: () => setActiveView('helpdesk') },
    { name: 'Events & Facilities', icon: Calendar, onClick: () => setActiveView('events') },
  ];

  return (
    <DashboardLayout user={user} onLogout={onLogout} navigation={navigation}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-gray-900 mb-2">Administration Dashboard</h1>
          <p className="text-gray-600">Non-Academic Services Management</p>
        </div>

        {activeView === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <DollarSign className="w-10 h-10 text-green-600 mb-4" />
                  <p className="text-sm text-gray-600">Fee Collection (This Month)</p>
                  <p className="text-gray-900">PKR 25M</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <BookOpen className="w-10 h-10 text-blue-600 mb-4" />
                  <p className="text-sm text-gray-600">Library Books Issued</p>
                  <p className="text-gray-900">1,234</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <HelpCircle className="w-10 h-10 text-purple-600 mb-4" />
                  <p className="text-sm text-gray-600">Active Support Tickets</p>
                  <p className="text-gray-900">18</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <Calendar className="w-10 h-10 text-orange-600 mb-4" />
                  <p className="text-sm text-gray-600">Upcoming Events</p>
                  <p className="text-gray-900">5</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setActiveView('finance')}>
                <CardContent className="pt-6 text-center">
                  <DollarSign className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-gray-900 mb-2">Finance & Accounts</h3>
                  <p className="text-sm text-gray-600">Manage fees, payments, and financial reports</p>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setActiveView('library')}>
                <CardContent className="pt-6 text-center">
                  <BookOpen className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-gray-900 mb-2">Library Management</h3>
                  <p className="text-sm text-gray-600">Manage book inventory and issuance</p>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setActiveView('helpdesk')}>
                <CardContent className="pt-6 text-center">
                  <HelpCircle className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="text-gray-900 mb-2">Helpdesk & Support</h3>
                  <p className="text-sm text-gray-600">Handle student queries and support tickets</p>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setActiveView('events')}>
                <CardContent className="pt-6 text-center">
                  <Calendar className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                  <h3 className="text-gray-900 mb-2">Events & Facilities</h3>
                  <p className="text-sm text-gray-600">Manage campus events and facilities</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeView === 'finance' && (
          <Tabs defaultValue="challans">
            <TabsList>
              <TabsTrigger value="challans">Fee Challans</TabsTrigger>
              <TabsTrigger value="payments">Payments</TabsTrigger>
              <TabsTrigger value="scholarships">Scholarships</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>

            <TabsContent value="challans" className="mt-4">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Generate Fee Challans</CardTitle>
                    <Button>Generate Bulk Challans</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm mb-2">Student ID</label>
                        <input type="text" className="w-full p-2 border rounded-md" placeholder="Enter student ID" />
                      </div>
                      <div>
                        <label className="block text-sm mb-2">Semester</label>
                        <select className="w-full p-2 border rounded-md">
                          <option>Fall 2024</option>
                          <option>Spring 2025</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm mb-2">Amount</label>
                        <input type="number" className="w-full p-2 border rounded-md" placeholder="PKR" />
                      </div>
                    </div>
                    <Button>Generate Challan</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="payments" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Tracking</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>2021-CS-101</TableCell>
                        <TableCell>Ahmed Khan</TableCell>
                        <TableCell>PKR 75,000</TableCell>
                        <TableCell>2025-09-15</TableCell>
                        <TableCell><Badge>Paid</Badge></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>2021-CS-102</TableCell>
                        <TableCell>Sara Ali</TableCell>
                        <TableCell>PKR 75,000</TableCell>
                        <TableCell>-</TableCell>
                        <TableCell><Badge variant="secondary">Pending</Badge></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="scholarships" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Scholarship Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Ahmed Khan</TableCell>
                        <TableCell>Merit-Based</TableCell>
                        <TableCell>100%</TableCell>
                        <TableCell><Badge>Active</Badge></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reports" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Financial Reports</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      'Monthly Collection Report',
                      'Outstanding Fees Report',
                      'Scholarship Distribution Report',
                      'Department-wise Collection',
                    ].map((report, i) => (
                      <div key={i} className="p-4 border rounded-lg flex justify-between items-center">
                        <span className="text-gray-900">{report}</span>
                        <Button size="sm" variant="outline">Generate</Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}

        {activeView === 'library' && (
          <Tabs defaultValue="inventory">
            <TabsList>
              <TabsTrigger value="inventory">Book Inventory</TabsTrigger>
              <TabsTrigger value="issuance">Issue/Return</TabsTrigger>
              <TabsTrigger value="fines">Fines</TabsTrigger>
            </TabsList>

            <TabsContent value="inventory" className="mt-4">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Book Inventory</CardTitle>
                    <Button>Add New Book</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Book ID</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Author</TableHead>
                        <TableHead>Available</TableHead>
                        <TableHead>Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>BK-001</TableCell>
                        <TableCell>Data Structures and Algorithms</TableCell>
                        <TableCell>Cormen</TableCell>
                        <TableCell>8</TableCell>
                        <TableCell>10</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="issuance" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Issue/Return Books</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm mb-2">Student ID</label>
                        <input type="text" className="w-full p-2 border rounded-md" />
                      </div>
                      <div>
                        <label className="block text-sm mb-2">Book ID</label>
                        <input type="text" className="w-full p-2 border rounded-md" />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button>Issue Book</Button>
                      <Button variant="outline">Return Book</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="fines" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Library Fines</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead>Book</TableHead>
                        <TableHead>Days Overdue</TableHead>
                        <TableHead>Fine</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Ahmed Khan</TableCell>
                        <TableCell>Data Structures</TableCell>
                        <TableCell>5</TableCell>
                        <TableCell>PKR 50</TableCell>
                        <TableCell><Badge variant="secondary">Unpaid</Badge></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}

        {activeView === 'helpdesk' && (
          <Card>
            <CardHeader>
              <CardTitle>Support Tickets</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ticket ID</TableHead>
                    <TableHead>Student</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>TKT-001</TableCell>
                    <TableCell>Ahmed Khan</TableCell>
                    <TableCell>Technical</TableCell>
                    <TableCell>Portal Login Issue</TableCell>
                    <TableCell><Badge variant="secondary">Open</Badge></TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline">Resolve</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>TKT-002</TableCell>
                    <TableCell>Sara Ali</TableCell>
                    <TableCell>Financial</TableCell>
                    <TableCell>Fee Receipt Missing</TableCell>
                    <TableCell><Badge>In Progress</Badge></TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline">View</Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {activeView === 'events' && (
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Campus Events & Facilities</CardTitle>
                <Button>Create Event</Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Event</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Venue</TableHead>
                    <TableHead>Capacity</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Annual Sports Day</TableCell>
                    <TableCell>2025-11-01</TableCell>
                    <TableCell>Sports Complex</TableCell>
                    <TableCell>1000</TableCell>
                    <TableCell><Badge>Scheduled</Badge></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Career Fair 2025</TableCell>
                    <TableCell>2025-11-15</TableCell>
                    <TableCell>Main Auditorium</TableCell>
                    <TableCell>500</TableCell>
                    <TableCell><Badge>Scheduled</Badge></TableCell>
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
