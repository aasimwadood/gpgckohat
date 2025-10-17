import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card, CardContent } from '../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { DollarSign, AlertCircle, CheckCircle } from 'lucide-react';
import type { User } from '../App';

interface FeeStructurePageProps {
  user: User | null;
  onLogout: () => void;
}

export default function FeeStructurePage({ user, onLogout }: FeeStructurePageProps) {
  const feeStructure = {
    ms: [
      { program: 'MS Computer Science', admission: 10000, tuition: 35000, total: 45000 },
      { program: 'MS Mathematics', admission: 10000, tuition: 30000, total: 40000 },
      { program: 'MS Physics', admission: 10000, tuition: 32000, total: 42000 },
      { program: 'MS Chemistry', admission: 10000, tuition: 32000, total: 42000 },
    ],
    mba: [
      { program: 'MBA (General)', admission: 12000, tuition: 40000, total: 52000 },
      { program: 'MS Finance', admission: 10000, tuition: 38000, total: 48000 },
    ],
    mphil: [
      { program: 'M.Phil Computer Science', admission: 12000, tuition: 38000, total: 50000 },
      { program: 'M.Phil Mathematics', admission: 12000, tuition: 35000, total: 47000 },
      { program: 'M.Phil English', admission: 12000, tuition: 33000, total: 45000 },
    ],
    phd: [
      { program: 'PhD Computer Science', admission: 15000, tuition: 45000, total: 60000 },
      { program: 'PhD Mathematics', admission: 15000, tuition: 42000, total: 57000 },
      { program: 'PhD Physics', admission: 15000, tuition: 43000, total: 58000 },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header user={user} onLogout={onLogout} />

      {/* Page Header */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-white mb-4">Fee Structure</h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            Transparent and affordable fee structure for all postgraduate programs.
          </p>
        </div>
      </section>

      {/* Fee Tables */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="ms" className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8">
              <TabsTrigger value="ms">MS Programs</TabsTrigger>
              <TabsTrigger value="mba">MBA Programs</TabsTrigger>
              <TabsTrigger value="mphil">M.Phil Programs</TabsTrigger>
              <TabsTrigger value="phd">PhD Programs</TabsTrigger>
            </TabsList>

            {Object.entries(feeStructure).map(([key, programs]) => (
              <TabsContent key={key} value={key}>
                <Card>
                  <CardContent className="p-6">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Program</TableHead>
                          <TableHead>Admission Fee</TableHead>
                          <TableHead>Tuition Fee (Per Semester)</TableHead>
                          <TableHead>Total (Per Semester)</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {programs.map((program, index) => (
                          <TableRow key={index}>
                            <TableCell className="text-gray-900">{program.program}</TableCell>
                            <TableCell>PKR {program.admission.toLocaleString()}</TableCell>
                            <TableCell>PKR {program.tuition.toLocaleString()}</TableCell>
                            <TableCell className="text-blue-600">
                              PKR {program.total.toLocaleString()}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Additional Fees */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-gray-900 mb-8">Additional Fees & Charges</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-gray-900">One-Time Charges</h3>
                </div>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>Application Fee</TableCell>
                      <TableCell className="text-right">PKR 2,000</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Security Deposit (Refundable)</TableCell>
                      <TableCell className="text-right">PKR 5,000</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Student Card Fee</TableCell>
                      <TableCell className="text-right">PKR 500</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Library Fee</TableCell>
                      <TableCell className="text-right">PKR 2,000</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-gray-900">Miscellaneous Charges</h3>
                </div>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>Late Fee (Per Day)</TableCell>
                      <TableCell className="text-right">PKR 100</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Duplicate ID Card</TableCell>
                      <TableCell className="text-right">PKR 300</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Transcript (Per Copy)</TableCell>
                      <TableCell className="text-right">PKR 1,000</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Degree Issuance</TableCell>
                      <TableCell className="text-right">PKR 3,000</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Scholarship & Financial Aid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white">
              <CardContent className="p-8">
                <CheckCircle className="w-12 h-12 mb-4" />
                <h3 className="text-white mb-4">Scholarships Available</h3>
                <ul className="space-y-2">
                  {[
                    'Merit-based scholarships (up to 100%)',
                    'Need-based financial assistance',
                    'HEC funded scholarships',
                    'Provincial government scholarships',
                    'Endowment fund scholarships',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
              <CardContent className="p-8">
                <DollarSign className="w-12 h-12 mb-4" />
                <h3 className="text-white mb-4">Fee Payment Options</h3>
                <ul className="space-y-2">
                  {[
                    'Online payment through bank portal',
                    'Bank challan payment',
                    'Installment plan available (conditions apply)',
                    'Credit card payment accepted',
                    'Payment deadline: 15th of each semester',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Important Notes */}
      <section className="py-16 bg-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-yellow-200">
            <CardContent className="p-8">
              <div className="flex items-start gap-4">
                <AlertCircle className="w-8 h-8 text-yellow-600 flex-shrink-0" />
                <div>
                  <h3 className="text-gray-900 mb-4">Important Notes</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Fees are subject to revision as per college policy.</li>
                    <li>• Admission fee is non-refundable.</li>
                    <li>• Late fee will be charged after the due date.</li>
                    <li>• Security deposit will be refunded after course completion.</li>
                    <li>• Students must clear all dues before receiving degrees/transcripts.</li>
                    <li>• Fees do not include thesis/dissertation printing and binding costs.</li>
                    <li>• Hostel and transportation fees are separate (if availed).</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
